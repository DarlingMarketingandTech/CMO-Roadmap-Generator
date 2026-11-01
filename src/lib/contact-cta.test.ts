import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import React from 'react';
import { render } from '@react-email/render';
import { composeRoadmap } from './compose-roadmap';
import {
  CONTACT_UNAVAILABLE_MESSAGE,
  contactConversationFor,
  contactForRoadmap,
  STRATEGY_CONVERSATION_LABEL,
} from './contact-cta';
import { DEMO_PROFILES } from './demo-profiles';
import { roadmapToEmailModel } from './email/roadmap-email-model';
import RoadmapEmail from '../emails/RoadmapEmail';
import { resolveContactDestination } from './booking-url';
import { startingActionForRoadmap } from './starting-action';

function plan(id: string) {
  const found = DEMO_PROFILES.find((item) => item.id === id);
  assert.ok(found, id);
  return composeRoadmap(found.answers);
}

const TASK_MARKERS = [
  'one request the first page should make',
  'Open the page',
  'records missing a next step',
  'has not supplied a number',
  'number unavailable',
];

function mailtoOf(href: string | null): URL {
  assert.ok(href);
  return new URL(href);
}

describe('CMO-006 contact conversation', () => {
  it('names the starting-task conversation and keeps the service card', () => {
    const cases = [
      ['clinic-bookings', 'Discuss your page note', 'Discuss local growth'],
      ['local-visibility', 'Discuss your page note', 'Book a website strategy review'],
      ['manual-workflow', 'Discuss your inquiry list', 'Book a website strategy review'],
      ['saas-reporting', 'Discuss your measurement baseline', 'Talk through your reporting gaps'],
    ] as const;

    for (const [id, label, serviceLabel] of cases) {
      const roadmap = plan(id);
      const action = startingActionForRoadmap(roadmap);
      const conversation = contactConversationFor(action);
      assert.equal(conversation.label, label, id);
      assert.equal(conversation.subject, label, id);
      assert.match(conversation.purpose, /opens a conversation about that starting task/);
      assert.match(conversation.purpose, /does not save, attach, submit, or review/);
      assert.equal(roadmap.primaryCta.buttonLabel, serviceLabel, id);
      assert.equal(
        (conversation.label as string) === roadmap.primaryCta.buttonLabel,
        false,
        id,
      );
      for (const marker of TASK_MARKERS) {
        assert.equal(conversation.subject.includes(marker), false, `${id} ${marker}`);
        assert.equal(conversation.label.includes(marker), false, `${id} ${marker}`);
      }
    }
  });

  it('uses one measurement label whether or not a current number is available', () => {
    const reporting = contactConversationFor(startingActionForRoadmap(plan('saas-reporting')));
    const growth = contactConversationFor(startingActionForRoadmap(plan('saas-growth-blind')));
    assert.equal(reporting.label, 'Discuss your measurement baseline');
    assert.equal(growth.label, 'Discuss your measurement baseline');
    assert.equal(/unavailable|current number|saved|attached|submitted/i.test(reporting.label), false);
  });

  it('falls back to a strategy conversation when the first module has no starting action', () => {
    for (const id of ['law-differentiation', 'prelaunch-brand', 'ecom-conversion'] as const) {
      const roadmap = plan(id);
      assert.equal(startingActionForRoadmap(roadmap), null, id);
      const conversation = contactConversationFor(null);
      assert.equal(conversation.label, STRATEGY_CONVERSATION_LABEL);
      assert.equal(conversation.subject, STRATEGY_CONVERSATION_LABEL);
      assert.match(conversation.purpose, /strategy conversation about the plan/);
      assert.equal(contactForRoadmap(roadmap, {}).label, STRATEGY_CONVERSATION_LABEL);
    }
  });

  it('uses a configured booking URL, then a configured email, and never an example address', () => {
    const subject = 'Discuss your inquiry list';

    const serverBooking = resolveContactDestination(subject, {
      STRATEGY_BOOKING_URL: 'https://meetings.roadmap.test/strategy?ref=site',
      NEXT_PUBLIC_BOOKING_URL: 'https://public.roadmap.test/book',
      STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test',
    });
    assert.deepEqual(serverBooking, {
      status: 'booking',
      href: 'https://meetings.roadmap.test/strategy?ref=site',
    });

    const publicBooking = resolveContactDestination(subject, {
      NEXT_PUBLIC_BOOKING_URL: 'https://public.roadmap.test/book',
      STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test',
    });
    assert.deepEqual(publicBooking, {
      status: 'booking',
      href: 'https://public.roadmap.test/book',
    });

    const email = resolveContactDestination(subject, {
      STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test',
    });
    assert.equal(email.status, 'email');
    if (email.status === 'email') {
      const url = mailtoOf(email.href);
      assert.equal(url.protocol, 'mailto:');
      assert.equal(url.pathname, 'planner@roadmap.test');
      assert.equal(url.searchParams.get('subject'), subject);
      assert.equal(url.searchParams.get('body'), null);
      assert.equal([...url.searchParams.keys()].join(','), 'subject');
    }

    assert.deepEqual(
      resolveContactDestination(subject, { STRATEGY_CONTACT_EMAIL: 'strategy@example.com' }),
      { status: 'unavailable' },
    );
    assert.deepEqual(
      resolveContactDestination(subject, {
        STRATEGY_BOOKING_URL: 'https://strategy.example.com/book',
        STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test',
      }).status,
      'email',
    );
    assert.deepEqual(
      resolveContactDestination(subject, {
        STRATEGY_BOOKING_URL: 'javascript:alert(1)',
        NEXT_PUBLIC_BOOKING_URL: 'not a url',
        STRATEGY_CONTACT_EMAIL: 'strategy@example.com',
      }),
      { status: 'unavailable' },
    );
    assert.deepEqual(resolveContactDestination(subject, {}), { status: 'unavailable' });
  });

  it('keeps personal details and the task out of the rendered email link', async () => {
    const roadmap = plan('manual-workflow');
    const contact = contactForRoadmap(roadmap, { STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test' });
    assert.equal(contact.label, 'Discuss your inquiry list');
    assert.equal(contact.href?.includes('body='), false);
    assert.equal(contact.href?.includes('Alex'), false);
    assert.equal(contact.href?.includes('records missing'), false);

    const html = await render(
      React.createElement(RoadmapEmail, {
        ...roadmapToEmailModel(roadmap, 'Alex Example', 'Example Co'),
        strategyCtaUrl: contact.href,
        strategyCtaLabel: contact.label,
        strategyCtaPurpose: contact.purpose,
      }),
    );
    assert.match(html, /Discuss your inquiry list/);
    assert.match(html, /mailto:planner@roadmap\.test\?subject=Discuss%20your%20inquiry%20list/);
    assert.equal(html.includes('strategy@example.com'), false);
    assert.equal(html.includes('body='), false);
    const href = html.match(/mailto:[^"'\s]+/)?.[0] ?? '';
    assert.equal(href.includes('Alex'), false);
    assert.equal(href.includes('Example%20Co'), false);
    assert.equal(href.includes('records'), false);

    const unavailable = contactForRoadmap(roadmap, {});
    assert.equal(unavailable.href, null);
    const unavailableHtml = await render(
      React.createElement(RoadmapEmail, {
        ...roadmapToEmailModel(roadmap, 'Alex Example', null),
        strategyCtaUrl: unavailable.href,
        strategyCtaLabel: unavailable.label,
        strategyCtaPurpose: unavailable.purpose,
      }),
      { plainText: true },
    );
    assert.match(unavailableHtml, new RegExp(CONTACT_UNAVAILABLE_MESSAGE));
    assert.equal(/mailto:/i.test(unavailableHtml), false);
    assert.equal(unavailableHtml.includes('strategy@example.com'), false);
  });
});
