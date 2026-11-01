import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  handleSendRoadmap,
  ROADMAP_EMAIL_SUBJECT,
  type EmailTransport,
  type OutgoingEmail,
} from '../app/api/send-roadmap/handler';
import { composeRoadmap } from './compose-roadmap';
import { CONSULT_CTA_LABEL } from './contact-cta';
import { DEMO_PROFILES } from './demo-profiles';
import { encodeIntakeAnswersCompact } from './encode-answers';
import { DEFAULT_MAIN_SITE_URL } from './site';

const clinic = DEMO_PROFILES.find((item) => item.id === 'clinic-bookings');
assert.ok(clinic);
const token = encodeIntakeAnswersCompact(clinic.answers);

function fakeTransport(fail: (message: OutgoingEmail) => boolean = () => false) {
  const sent: OutgoingEmail[] = [];
  const transport: EmailTransport = async (message) => {
    sent.push(message);
    return fail(message) ? { ok: false, error: 'provider down' } : { ok: true, id: `id-${sent.length}` };
  };
  return { sent, transport };
}

function post(body: Record<string, unknown>) {
  return new Request('http://localhost/api/send-roadmap', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const visitor = { name: 'Ada Lovelace', email: 'ada@roadmap.test', company: 'Analytical Clinic' };

describe('CMO-007 email my plan', () => {
  it('sends the full plan with a consult link, and a lead copy to the owner', async () => {
    const { sent, transport } = fakeTransport();
    const response = await handleSendRoadmap(post({ ...visitor, roadmapToken: token }), {
      transport,
      from: 'plans@roadmap.test',
      leadNotifyEmail: 'owner@roadmap.test',
    });
    assert.equal(response.status, 200);
    assert.equal(sent.length, 2);

    const [plan, lead] = sent;
    assert.equal(plan.to, visitor.email);
    assert.equal(plan.subject, ROADMAP_EMAIL_SUBJECT);
    assert.ok(plan.html.includes(CONSULT_CTA_LABEL));
    assert.ok(plan.html.includes(`${DEFAULT_MAIN_SITE_URL}/contact`));
    // Full plan: every scheduled module with its description, plus the reasoning.
    const roadmap = composeRoadmap(clinic.answers);
    for (const phase of roadmap.phases) {
      for (const mod of phase.modules) {
        assert.ok(plan.html.includes(mod.title.replaceAll('&', '&amp;')), mod.title);
      }
    }
    assert.ok(plan.html.includes('Why this plan'));
    assert.equal(/example\.(com|net|org)/.test(plan.html), false);

    assert.equal(lead.to, 'owner@roadmap.test');
    assert.equal(lead.replyTo, visitor.email);
    assert.match(lead.subject, /Analytical Clinic/);
    assert.ok(lead.html.includes('ada@roadmap.test'));
    assert.ok(lead.html.includes('Healthcare'));
  });

  it('sends no lead copy when no owner inbox is configured', async () => {
    const { sent, transport } = fakeTransport();
    const response = await handleSendRoadmap(post({ email: visitor.email, roadmapToken: token }), {
      transport,
      from: 'plans@roadmap.test',
    });
    assert.equal(response.status, 200);
    assert.equal(sent.length, 1);
  });

  it('reports a provider failure and skips the lead copy', async () => {
    const { sent, transport } = fakeTransport(() => true);
    const response = await handleSendRoadmap(post({ ...visitor, roadmapToken: token }), {
      transport,
      from: 'plans@roadmap.test',
      leadNotifyEmail: 'owner@roadmap.test',
    });
    assert.equal(response.status, 502);
    assert.equal(sent.length, 1);
  });

  it('still succeeds for the visitor when only the lead copy fails', async () => {
    const { sent, transport } = fakeTransport((message) => message.to === 'owner@roadmap.test');
    const response = await handleSendRoadmap(post({ ...visitor, roadmapToken: token }), {
      transport,
      from: 'plans@roadmap.test',
      leadNotifyEmail: 'owner@roadmap.test',
    });
    assert.equal(response.status, 200);
    assert.equal(sent.length, 2);
  });

  it('does not name settings to the visitor when delivery is not configured', async () => {
    const response = await handleSendRoadmap(post({ ...visitor, roadmapToken: token }), {
      transport: null,
      from: 'plans@roadmap.test',
    });
    assert.equal(response.status, 503);
    const body = (await response.json()) as { error?: string };
    assert.equal(/RESEND|API_KEY|FROM/.test(body.error ?? ''), false);
  });

  it('sends nothing when the honeypot is filled', async () => {
    const { sent, transport } = fakeTransport();
    const response = await handleSendRoadmap(
      post({ ...visitor, roadmapToken: token, _hp: 'bot' }),
      { transport, from: 'plans@roadmap.test', leadNotifyEmail: 'owner@roadmap.test' },
    );
    assert.equal(response.status, 400);
    assert.equal(sent.length, 0);
  });
});
