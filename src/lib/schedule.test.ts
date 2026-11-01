import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { withCmo007StageLabels } from './fixtures/stage-label-change';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import { roadmapToEmailModel } from './email/roadmap-email-model';
import { computeFlags } from './flags';
import { computeModuleScores } from './rules';
import {
  EMPTY_PHASE_MESSAGE,
  PHASE_WINDOW_NOTE,
  schedulePhaseViews,
} from './schedule-presentation';
import type { Roadmap } from './types';

const CMO_003_BASELINE_HASH = 'ca99f950c934ffdff5030dab9df58a1de9c35b255a787366e8c80dd140946d14';
const CMO_004_BASELINE_HASH = '6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217';

/** Modules the CMO-003 selector placed even though their final score was not positive. */
const NOT_RECOMMENDED: Record<string, string[]> = {
  'clinic-bookings': ['brand-strategy'],
  'saas-reporting': [],
  'local-visibility': ['brand-strategy', 'gtm-planning', 'martech-audit'],
  'law-differentiation': [],
  'ecom-conversion': ['brand-strategy', 'gtm-planning'],
  'manual-workflow': ['brand-strategy'],
  'healthcare-booking-ux': ['brand-strategy'],
  'law-reputation-site': [],
  'saas-growth-blind': [],
  'ecom-traffic-gap': ['brand-strategy', 'gtm-planning'],
  'home-services-local': ['brand-strategy'],
  'prelaunch-brand': [],
};

interface BaselineModule {
  id: string;
  week: string;
  effort: string;
}

interface BaselinePhase {
  phase: number;
  days: string;
  modules: BaselineModule[];
}

interface BaselineEntry {
  id: string;
  roadmap: Roadmap & { phases: Array<Roadmap['phases'][number] & { modules: BaselineModule[] }> };
}

const cmo003 = JSON.parse(
  readFileSync(new URL('./fixtures/demo-roadmap-baseline-cmo003.json', import.meta.url), 'utf8'),
) as BaselineEntry[];

function placedModules(roadmap: { phases: BaselinePhase[] }) {
  return roadmap.phases.flatMap((phase) =>
    phase.modules.map((mod) => ({
      id: mod.id,
      phase: phase.phase,
      days: phase.days,
    })),
  );
}

describe('CMO-004 phase windows', () => {
  it('keeps the CMO-003 baseline fixture byte-for-byte', () => {
    const bytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo003.json', import.meta.url),
    );
    assert.equal(createHash('sha256').update(bytes).digest('hex'), CMO_003_BASELINE_HASH);
  });

  it('keeps the CMO-004 semantic baseline file without treating it as the live plan', () => {
    const bytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo004.json', import.meta.url),
    );
    assert.equal(createHash('sha256').update(bytes).digest('hex'), CMO_004_BASELINE_HASH);
    assert.notEqual(CMO_004_BASELINE_HASH, CMO_003_BASELINE_HASH);
    const saved = JSON.parse(bytes.toString('utf8')) as BaselineEntry[];
    assert.equal(saved.length, DEMO_PROFILES.length);
  });

  it('recommends only positive scores and keeps their phase placement', () => {
    assert.equal(cmo003.length, 12);
    for (const entry of cmo003) {
      const profile = DEMO_PROFILES.find((item) => item.id === entry.id);
      assert.ok(profile, entry.id);
      const flags = computeFlags(profile.answers);
      const scores = computeModuleScores(flags, profile.answers);
      const roadmap = composeRoadmap(profile.answers);
      const before = placedModules(entry.roadmap);
      const after = placedModules(roadmap);
      const expectedIds = before
        .map((mod) => mod.id)
        .filter((id) => !NOT_RECOMMENDED[entry.id].includes(id));

      assert.deepEqual(
        after.map((mod) => mod.id),
        expectedIds,
        `${entry.id} order`,
      );
      for (const mod of after) {
        const previous = before.find((item) => item.id === mod.id);
        assert.ok(previous);
        assert.equal(mod.phase, previous.phase, `${entry.id} ${mod.id} phase`);
        assert.equal(mod.days, previous.days, `${entry.id} ${mod.id} window`);
        assert.ok((scores[mod.id] ?? 0) > 0, `${entry.id} ${mod.id} score`);
      }
      for (const id of NOT_RECOMMENDED[entry.id]) {
        assert.ok((scores[id] ?? 0) <= 0, `${entry.id} ${id} should be non-positive`);
        assert.equal(
          after.some((mod) => mod.id === id),
          false,
          `${entry.id} still recommends ${id}`,
        );
      }
      assert.deepEqual(roadmap.topPriorities, entry.roadmap.topPriorities, entry.id);
      assert.equal(roadmap.primaryService.title, entry.roadmap.primaryService.title);
      assert.equal(roadmap.secondaryService.title, entry.roadmap.secondaryService.title);
      assert.equal(roadmap.recommendedEngagement.title, entry.roadmap.recommendedEngagement.title);
      assert.equal(roadmap.engagementFormat.title, entry.roadmap.engagementFormat.title);

      if (entry.id === 'saas-growth-blind') {
        assert.deepEqual(
          roadmap,
          withCmo007StageLabels(entry.roadmap),
          `${entry.id} changed beyond selection`,
        );
      }
    }
  });

  it('keeps founder and non-founder capacities when modules are omitted', () => {
    const clinic = composeRoadmap(DEMO_PROFILES[0].answers);
    assert.deepEqual(
      clinic.phases.map((phase) => phase.modules.map((mod) => mod.id)),
      [
        ['website-conversion', 'crm-cleanup'],
        ['local-seo', 'kpi-baseline'],
        ['email-automation'],
      ],
    );
    assert.equal(clinic.phases[0].days, 'Days 1–30');
    assert.equal(clinic.phases[2].modules[0].effort, 'medium');

    const ecommerce = composeRoadmap(
      DEMO_PROFILES.find((profile) => profile.id === 'ecom-conversion')!.answers,
    );
    assert.deepEqual(
      ecommerce.phases.map((phase) => phase.modules.map((mod) => mod.id)),
      [
        ['conversion-optimization', 'website-conversion', 'email-automation'],
        ['attribution-cleanup', 'crm-cleanup', 'kpi-baseline'],
        [],
      ],
    );

    const local = composeRoadmap(
      DEMO_PROFILES.find((profile) => profile.id === 'local-visibility')!.answers,
    );
    assert.deepEqual(local.phases[0].modules.map((mod) => mod.id), [
      'website-conversion',
      'crm-cleanup',
      'local-seo',
    ]);
    assert.deepEqual(local.phases[2].modules, []);
  });

  it('leaves attribution ahead of the KPI baseline as an unresolved limitation', () => {
    const roadmap = composeRoadmap(
      DEMO_PROFILES.find((profile) => profile.id === 'saas-reporting')!.answers,
    );
    const phase1 = roadmap.phases[0].modules.map((mod) => mod.id);
    assert.equal(phase1[0], 'attribution-cleanup');
    assert.ok(phase1.indexOf('attribution-cleanup') < phase1.indexOf('kpi-baseline'));
    assert.equal(roadmap.phases[0].days, 'Days 1–30');
  });

  it('does not schedule penalized pre-launch optimization just to fill a phase', () => {
    const roadmap = composeRoadmap(
      DEMO_PROFILES.find((profile) => profile.id === 'prelaunch-brand')!.answers,
    );
    const ids = roadmap.phases.flatMap((phase) => phase.modules.map((mod) => mod.id));
    assert.deepEqual(ids, [
      'gtm-planning',
      'brand-strategy',
      'martech-audit',
      'crm-cleanup',
      'kpi-baseline',
      'website-conversion',
    ]);
    assert.equal(ids.includes('conversion-optimization'), false);
    assert.equal(ids.includes('email-automation'), false);
    assert.equal(roadmap.recommendedEngagement.title, 'Positioning & GTM sprint (2–3 weeks)');
  });

  it('uses the assigned phase window in the shared results and email view', () => {
    for (const profile of DEMO_PROFILES) {
      const roadmap = composeRoadmap(profile.answers);
      const view = schedulePhaseViews(roadmap);
      const email = roadmapToEmailModel(roadmap, 'Alex Example', 'Example Co');
      const rendered = JSON.stringify({ note: PHASE_WINDOW_NOTE, view, emailPhases: email.phases });

      assert.equal(view.length, 3);
      assert.equal(email.sequencingNote, PHASE_WINDOW_NOTE);
      assert.equal(rendered.includes('Week '), false, profile.id);
      assert.deepEqual(
        email.phases.map((phase) => ({
          phaseLabel: phase.phaseLabel,
          title: phase.phaseTitle,
          days: phase.days,
          titles: phase.moduleTitles,
          emptyMessage: phase.emptyMessage,
        })),
        view.map((phase) => ({
          phaseLabel: phase.phaseLabel,
          title: phase.title,
          days: phase.days,
          titles: phase.modules.map((mod) => mod.title),
          emptyMessage: phase.emptyMessage,
        })),
        profile.id,
      );
      for (const phase of view) {
        if (phase.modules.length === 0) {
          assert.equal(phase.emptyMessage, EMPTY_PHASE_MESSAGE);
        } else {
          assert.equal(phase.emptyMessage, null);
          for (const mod of phase.modules) {
            assert.ok(mod.effort === 'low' || mod.effort === 'medium' || mod.effort === 'high');
          }
        }
      }
    }

    const ecommerce = schedulePhaseViews(
      composeRoadmap(DEMO_PROFILES.find((profile) => profile.id === 'ecom-conversion')!.answers),
    );
    assert.equal(ecommerce[2].emptyMessage, EMPTY_PHASE_MESSAGE);
    assert.equal(ecommerce[0].days, 'Days 1–30');
    assert.equal(ecommerce[0].modules[0].effort, 'medium');
    assert.equal(ecommerce[0].modules[1].effort, 'high');
  });
});
