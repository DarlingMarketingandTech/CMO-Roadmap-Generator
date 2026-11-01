import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import React from 'react';
import { render } from '@react-email/render';
import { contactForRoadmap } from './contact-cta';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import { roadmapToEmailModel } from './email/roadmap-email-model';
import RoadmapEmail from '../emails/RoadmapEmail';
import { ALL_MODULES } from './modules';
import { SERVICE_OFFERING } from './rules';
import {
  LATER_PROGRAM_LABEL,
  OVERALL_MODULE_EFFORT_LABEL,
  startingActionForModule,
  startingActionForRoadmap,
  type StartingAction,
} from './starting-action';
import type { IntakeAnswers, PrimaryGoal, Roadmap, StackMaturity } from './types';

const CMO_005_BASELINE_HASH = '451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b';

const CATALOG_OUTCOMES: Record<string, string[]> = {
  'website-conversion': [
    'Full CRO audit completed',
    'Landing page improvements prioritized and deployed',
    'Lead capture forms and CTAs optimized',
    'Core Web Vitals benchmarked and improved',
  ],
  'crm-cleanup': [
    'CRM data cleaned, deduped, and enriched',
    'Lead routing rules reviewed and corrected',
    'Pipeline stages aligned to sales process',
    'Lead scoring model implemented',
  ],
  'attribution-cleanup': [
    'Attribution model defined and implemented',
    'Cross-channel reporting unified in one view',
    'ROI by channel calculated and benchmarked',
    'Budget optimization recommendations delivered',
  ],
};

function profile(id: string) {
  const found = DEMO_PROFILES.find((item) => item.id === id);
  assert.ok(found, id);
  return found;
}

const RENDERED_EMAIL_ENV = { STRATEGY_CONTACT_EMAIL: 'planner@roadmap.test' };

function emailContact(id: string) {
  return contactForRoadmap(plan(id), RENDERED_EMAIL_ENV);
}

function plan(id: string) {
  return composeRoadmap(profile(id).answers);
}

function textOf(action: StartingAction) {
  return [
    action.task,
    action.output,
    action.access,
    action.scopeNote ?? '',
    ...action.completionStates.map((state) => `${state.label} ${state.requirement}`),
  ].join('\n');
}

function answers(overrides: Partial<IntakeAnswers> = {}): IntakeAnswers {
  return {
    businessType: 'other',
    businessStage: 'growth',
    primaryGoal: 'more-leads',
    bottleneck: 'no-leads',
    activeChannels: ['email'],
    stackMaturity: 'solid',
    teamCapacity: 'small-team',
    ...overrides,
  };
}

describe('CMO-006 starting actions', () => {
  it('keeps recommendation output on the CMO-005 baseline and adds guidance beside it', () => {
    const bytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo005.json', import.meta.url),
    );
    assert.equal(createHash('sha256').update(bytes).digest('hex'), CMO_005_BASELINE_HASH);
    const saved = JSON.parse(bytes.toString('utf8')) as { id: string; roadmap: Roadmap }[];

    for (const id of ['clinic-bookings', 'manual-workflow', 'saas-reporting'] as const) {
      const current = plan(id);
      const previous = saved.find((entry) => entry.id === id)?.roadmap;
      assert.ok(previous);
      assert.deepEqual(current, previous, id);
      assert.equal('startingAction' in current, false);
    }
  });

  it('asks a clinic to name the desired action, the current request, and where inquiries arrive', () => {
    const roadmap = plan('clinic-bookings');
    const action = startingActionForRoadmap(roadmap);
    assert.ok(action);
    assert.equal(roadmap.phases[0].modules[0].id, 'website-conversion');
    assert.equal(action.moduleId, 'website-conversion');
    assert.equal(action.effort, 'high');
    assert.equal(action.effortLabel, OVERALL_MODULE_EFFORT_LABEL);
    assert.equal(action.laterProgramLabel, LATER_PROGRAM_LABEL);
    assert.equal(action.prerequisite, null);
    assert.deepEqual(
      action.completionStates.map((state) => state.id),
      ['note-complete'],
    );

    const completion = action.completionStates[0].requirement;
    assert.match(completion, /desired customer action/);
    assert.match(completion, /current request/);
    assert.match(completion, /where inquiries arrive/);
    assert.equal(/reread/i.test(textOf(action)), false);
    assert.match(action.task, /Open the page/);
    assert.match(action.access, /page you already use/);
    assert.match(action.scopeNote ?? '', /whole first action/);
    assert.equal(/hour/i.test(textOf(action)), false);
    assert.equal(roadmap.primaryService.title, SERVICE_OFFERING.LOCAL_SEO);
    assert.equal(roadmap.primaryCta.buttonLabel, 'Discuss local growth');
    assert.equal(roadmap.primaryCta.buttonLabel.includes('page note'), false);
  });

  it('asks for the desired customer action when no channel is named', () => {
    const visible = plan('local-visibility');
    const action = startingActionForRoadmap(visible);
    assert.ok(action);
    assert.equal(action.moduleId, 'website-conversion');
    assert.equal(action.scopeNote, null);
    const completion = action.completionStates[0].requirement;
    assert.match(action.task, /one request the first page should make/);
    assert.match(action.output, /desired customer action/);
    assert.match(completion, /desired customer action/);
    assert.equal(/current request|inquiries arrive/i.test(completion), false);
    assert.equal(/no live page|no current traffic|no evidence of a live page/i.test(textOf(action)), false);
    assert.equal(/reread/i.test(textOf(action)), false);

    const founder = startingActionForRoadmap(plan('home-services-local'));
    assert.ok(founder);
    assert.match(founder.scopeNote ?? '', /whole first action/);
    assert.equal(/current request/i.test(founder.completionStates[0].requirement), false);
  });

  it('asks a manual workflow to mark inquiry records, and keeps blocked access out of completed cleanup', () => {
    const roadmap = plan('manual-workflow');
    const action = startingActionForRoadmap(roadmap);
    assert.ok(action);
    assert.equal(roadmap.phases[0].modules[0].id, 'crm-cleanup');
    assert.equal(action.moduleId, 'crm-cleanup');
    assert.equal(action.effort, 'medium');
    assert.equal(action.effortLabel, OVERALL_MODULE_EFFORT_LABEL);
    assert.equal(action.prerequisite, null);
    assert.match(action.output, /records missing a next step/);
    assert.match(action.scopeNote ?? '', /One pass/);
    assert.match(action.scopeNote ?? '', /does not assign additional people/);

    const done = action.completionStates.find((state) => state.id === 'note-complete');
    const blocked = action.completionStates.find((state) => state.id === 'access-check-complete');
    assert.ok(done);
    assert.ok(blocked);
    assert.match(done.requirement, /no next step/);
    assert.match(blocked.label, /Access check complete/);
    assert.match(blocked.requirement, /cleanup task stays blocked/);
    assert.match(blocked.requirement, /not completed cleanup/);
    assert.equal(roadmap.primaryService.title, SERVICE_OFFERING.WEBSITE_CRO);
    assert.equal(roadmap.primaryCta.buttonLabel, 'Book a website strategy review');
  });

  it('lists inquiry sources when there is no stack and does not require a CRM', () => {
    for (const maturity of ['basic', 'messy', 'solid', 'advanced'] as const) {
      const action = startingActionForModule('crm-cleanup', answers({ stackMaturity: maturity }), 'medium');
      assert.ok(action);
      assert.equal(action.completionStates.some((state) => state.id === 'access-check-complete'), true);
      assert.match(action.output, /records missing a next step/);
    }

    const none = startingActionForModule(
      'crm-cleanup',
      answers({ stackMaturity: 'none', bottleneck: 'messy-stack', teamCapacity: 'founder-only' }),
      'medium',
    );
    assert.ok(none);
    assert.match(none.output, /inquiry sources/);
    assert.match(none.completionStates[0].requirement, /whether one list shows all of them/);
    assert.deepEqual(
      none.completionStates.map((state) => state.id),
      ['note-complete'],
    );
    assert.equal(/CRM|lead scoring|next step/i.test(none.output), false);
    assert.match(none.access, /does not require a CRM/);
    assert.match(none.scopeNote ?? '', /One pass/);
  });

  it('shows the measurement prerequisite beside attribution and keeps the schedule', () => {
    const roadmap = plan('saas-reporting');
    const action = startingActionForRoadmap(roadmap);
    assert.ok(action);
    const phase1 = roadmap.phases[0].modules.map((mod) => mod.id);
    assert.ok(phase1.indexOf('attribution-cleanup') < phase1.indexOf('kpi-baseline'));
    assert.equal(action.moduleId, 'attribution-cleanup');
    assert.equal(action.effort, 'high');
    assert.equal(action.effortLabel, OVERALL_MODULE_EFFORT_LABEL);
    assert.ok(action.prerequisite);
    assert.equal(action.prerequisite.moduleId, 'kpi-baseline');
    assert.match(action.prerequisite.summary, /KPI \/ Reporting Baseline/);
    assert.match(action.prerequisite.summary, /ahead of it/);
    assert.match(action.prerequisite.gapVersusBaseline, /number unavailable/);
    assert.match(action.prerequisite.gapVersusBaseline, /usable baseline/);
    assert.match(action.prerequisite.blockedWork, /channel ROI/);
    assert.match(action.prerequisite.blockedWork, /blocked/);
    assert.match(action.completionStates[0].requirement, /written outcome definition/);
    assert.match(action.completionStates[0].requirement, /current number/);
    assert.match(action.completionStates[0].requirement, /number unavailable/);
    assert.match(action.completionStates[0].requirement, /documents the gap/);
    assert.match(action.completionStates[0].requirement, /does not establish a usable baseline/);
    assert.match(action.task, /has not supplied a number that ties a result to spend/);
    assert.equal(/estimate/i.test(textOf(action)), false);
    assert.equal(roadmap.primaryService.title, SERVICE_OFFERING.ATTRIBUTION);
    assert.equal(roadmap.primaryCta.buttonLabel, 'Talk through your reporting gaps');
    assert.equal(roadmap.primaryCta.buttonLabel.includes('measurement'), false);
  });

  it('uses the selected goal for the attribution outcome and withholds a usable baseline', () => {
    const expectGoal = (goal: PrimaryGoal, pattern: RegExp, stage?: IntakeAnswers['businessStage']) => {
      const action = startingActionForModule(
        'attribution-cleanup',
        answers({ primaryGoal: goal, businessStage: stage ?? 'growth' }),
        'high',
      );
      assert.ok(action);
      assert.match(action.task, pattern);
      assert.match(action.prerequisite?.blockedWork ?? '', /channel ROI/);
      assert.match(action.completionStates[0].requirement, /does not establish a usable baseline/);
    };

    expectGoal('more-bookings', /booked appointment/);
    expectGoal('more-leads', /new inquiry/);
    expectGoal('retention', /repeat customer or repeat purchase/);
    expectGoal('launch', /first inquiry or first order/);
    expectGoal('launch', /has not gone live/, 'pre-launch');
    expectGoal('roi-clarity', /ties a result to spend/);
    expectGoal('brand-awareness', /visibility measure/);
  });

  it('leaves every other first module without a starting action and keeps catalog outcomes', () => {
    assert.equal(startingActionForRoadmap(plan('prelaunch-brand')), null);
    assert.equal(startingActionForRoadmap(plan('ecom-conversion')), null);
    assert.equal(startingActionForRoadmap(plan('law-differentiation')), null);
    assert.equal(startingActionForModule('local-seo', answers(), 'medium'), null);
    assert.equal(startingActionForModule('kpi-baseline', answers(), 'medium'), null);

    for (const [id, outcomes] of Object.entries(CATALOG_OUTCOMES)) {
      assert.deepEqual(ALL_MODULES.find((mod) => mod.id === id)?.outcomes, outcomes);
    }
    assert.equal(
      ALL_MODULES.find((mod) => mod.id === 'brand-strategy')?.description.includes('brand voice'),
      true,
    );

    const skipped = {
      answers: answers(),
      phases: [
        { phase: 1 as const, title: 'Foundation', days: 'Days 1–30', modules: [] },
        {
          phase: 2 as const,
          title: 'Build & Systems',
          days: 'Days 31–60',
          modules: [ALL_MODULES.find((mod) => mod.id === 'crm-cleanup')!],
        },
      ],
    } as Roadmap;
    const deferred = startingActionForRoadmap(skipped);
    assert.equal(deferred?.moduleId, 'crm-cleanup');
  });

  it('passes the module effort band through and does not rename it as task effort', () => {
    const action = startingActionForModule('website-conversion', answers(), 'low');
    assert.ok(action);
    assert.equal(action.effort, 'low');
    assert.equal(action.effortLabel, OVERALL_MODULE_EFFORT_LABEL);
    assert.equal(/low effort|task effort|hours|days/i.test(textOf(action)), false);
  });

  it('includes the starting action in email and leaves later program outcomes on the page', async () => {
    const clinic = roadmapToEmailModel(plan('clinic-bookings'), 'Alex Example', 'Example Co');
    assert.ok(clinic.startingAction);
    assert.equal(clinic.startingAction.effortLabel, OVERALL_MODULE_EFFORT_LABEL);
    assert.match(clinic.startingAction.task, /Open the page/);
    assert.match(clinic.startingAction.output, /desired customer action|current request|inquiries arrive/);
    assert.match(clinic.startingAction.completion, /desired customer action/);
    assert.match(clinic.startingAction.completion, /current request/);
    assert.match(clinic.startingAction.completion, /where inquiries arrive/);
    assert.match(clinic.startingAction.access, /page you already use/);
    assert.equal(clinic.startingAction.prerequisite, null);
    assert.equal('outcomes' in clinic.startingAction, false);

    const clinicContact = emailContact('clinic-bookings');
    const clinicHtml = await render(
      React.createElement(RoadmapEmail, {
        ...clinic,
        strategyCtaUrl: clinicContact.href,
        strategyCtaLabel: clinicContact.label,
        strategyCtaPurpose: clinicContact.purpose,
      }),
      { plainText: true },
    );
    assert.match(clinicHtml, /starting action/i);
    assert.match(clinicHtml, /Overall module effort/);
    assert.match(clinicHtml, /desired customer action/);
    // D18: the email is now the full plan. Later outcomes appear under the later-work label.
    assert.ok(clinicHtml.includes('Later work in this module'));
    assert.ok(
      clinicHtml.indexOf('Later work in this module') < clinicHtml.indexOf('Full CRO audit completed'),
    );
    assert.match(clinicHtml, /Discuss your page note/);
    assert.equal(clinicHtml.includes('Discuss local growth'), false);
    assert.equal(clinicHtml.includes('strategy@example.com'), false);
    const clinicMailto = clinicHtml.match(/mailto:\S+/)?.[0] ?? '';
    assert.equal(clinicMailto, 'mailto:planner@roadmap.test?subject=Discuss%20your%20page%20note');
    assert.equal(clinicMailto.includes('body='), false);

    const manual = roadmapToEmailModel(plan('manual-workflow'), 'Alex Example', null);
    assert.match(manual.startingAction?.completion ?? '', /not completed cleanup/);
    assert.equal(manual.startingAction?.prerequisite, null);

    const saas = roadmapToEmailModel(plan('saas-reporting'), 'Alex Example', null);
    assert.match(saas.startingAction?.prerequisite ?? '', /KPI \/ Reporting Baseline/);
    assert.match(saas.startingAction?.prerequisite ?? '', /channel ROI/);
    assert.match(saas.startingAction?.prerequisite ?? '', /number unavailable/);
    const saasContact = emailContact('saas-reporting');
    const saasHtml = await render(
      React.createElement(RoadmapEmail, {
        ...saas,
        strategyCtaUrl: saasContact.href,
        strategyCtaLabel: saasContact.label,
        strategyCtaPurpose: saasContact.purpose,
      }),
      { plainText: true },
    );
    assert.match(saasHtml, /before deeper analysis/i);
    // D18: the full-plan email lists attribution outcomes as later work, after the prerequisite.
    assert.ok(
      saasHtml.indexOf('Before deeper analysis') <
        saasHtml.indexOf('ROI by channel calculated and benchmarked'),
    );

    const noChannel = roadmapToEmailModel(plan('local-visibility'), 'Alex Example', null);
    assert.match(noChannel.startingAction?.task ?? '', /one request the first page should make/);
    assert.equal(
      /no live page|no current traffic/i.test(
        [
          noChannel.startingAction?.task,
          noChannel.startingAction?.output,
          noChannel.startingAction?.completion,
          noChannel.startingAction?.access,
        ].join('\n'),
      ),
      false,
    );
    const noChannelContact = emailContact('local-visibility');
    const noChannelHtml = await render(
      React.createElement(RoadmapEmail, {
        ...noChannel,
        strategyCtaUrl: noChannelContact.href,
        strategyCtaLabel: noChannelContact.label,
        strategyCtaPurpose: noChannelContact.purpose,
      }),
      { plainText: true },
    );
    assert.match(noChannelHtml, /one request the first page should make/);
    assert.equal(/no live page|no current traffic/i.test(noChannelHtml), false);

    const ecommerce = roadmapToEmailModel(plan('ecom-conversion'), 'Alex Example', null);
    assert.equal(ecommerce.startingAction, null);
    const ecommerceContact = emailContact('ecom-conversion');
    const ecommerceHtml = await render(
      React.createElement(RoadmapEmail, {
        ...ecommerce,
        strategyCtaUrl: ecommerceContact.href,
        strategyCtaLabel: ecommerceContact.label,
        strategyCtaPurpose: ecommerceContact.purpose,
      }),
      { plainText: true },
    );
    assert.equal(/starting action/i.test(ecommerceHtml), false);
    assert.match(ecommerceHtml, /Book a strategy conversation/);
    assert.match(noChannelHtml, /Discuss your page note/);
    assert.match(saasHtml, /Discuss your measurement baseline/);

    const button = plan('saas-reporting').primaryCta.buttonLabel;
    assert.equal(saasHtml.includes(button), false);
    assert.equal(saasHtml.includes('strategy@example.com'), false);
  });
});
