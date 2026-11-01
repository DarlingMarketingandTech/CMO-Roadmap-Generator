import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import { computeFlags } from './flags';
import { applyIndustryModuleLens } from './industry';
import { ALL_MODULES } from './modules';
import {
  computeModuleScores,
  getEngagementFormatRecommendation,
  SERVICE_OFFERING,
  SERVICE_PATH_NOTE,
} from './rules';
import type { IntakeAnswers, Roadmap } from './types';

const CMO_004_BASELINE_HASH = '6c51827e741cb5c4d49280829ff96cea8e5816eae8d96eb1cf7cea6c554eb217';
const CMO_005_BASELINE_HASH = '451f240ca9e2a62ae9db73047817a0940b6f6738f00a36e667818ef243f7472b';

const UNCHANGED_DEMOS = [
  'local-visibility',
  'ecom-conversion',
  'healthcare-booking-ux',
  'saas-growth-blind',
  'ecom-traffic-gap',
] as const;

/** Words that describe a law practice. Professional Services also covers accounting, consulting, and finance. */
const LEGAL_ASSUMPTION =
  /\battorney\b|\blegal practice\b|\blegal lens\b|\bmatters\b|\bcases\b|\bbars?\b|case management|practice-area|retained matters|first consult/i;

interface BaselineEntry {
  id: string;
  roadmap: Roadmap;
}

function loadBaseline(name: string): BaselineEntry[] {
  return JSON.parse(
    readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8'),
  ) as BaselineEntry[];
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

function answers(overrides: Partial<IntakeAnswers> & Pick<IntakeAnswers, 'bottleneck' | 'primaryGoal' | 'businessType'>): IntakeAnswers {
  return {
    businessStage: 'growth',
    activeChannels: ['email'],
    stackMaturity: 'solid',
    teamCapacity: 'small-team',
    ...overrides,
  };
}

describe('CMO-005 recommendation correctness', () => {
  it('describes professional services without assuming a law practice', () => {
    const accountant = answers({
      businessType: 'professional-service',
      primaryGoal: 'more-leads',
      bottleneck: 'no-leads',
    });
    const roadmap = composeRoadmap(accountant);
    const rendered = collectStrings({
      roadmap,
      lenses: applyIndustryModuleLens(ALL_MODULES, 'professional'),
    }).join('\n');

    assert.equal(roadmap.industrySegment, 'professional');
    assert.equal(LEGAL_ASSUMPTION.test(rendered), false, rendered.match(LEGAL_ASSUMPTION)?.[0]);
    assert.match(roadmap.whyThisRoadmap, /does not identify a profession/);
    assert.match(
      roadmap.explainability.influentialAnswers.find((row) => row.questionLabel === 'Business type')
        ?.impact ?? '',
      /does not assume one of them/,
    );
  });

  it('raises MarTech and CRM when a solid stack is still named as the bottleneck', () => {
    const conflicting = answers({
      businessType: 'other',
      primaryGoal: 'more-leads',
      bottleneck: 'messy-stack',
      stackMaturity: 'solid',
    });
    const settled = { ...conflicting, bottleneck: 'poor-conversion' as const };
    const conflictingFlags = computeFlags(conflicting);
    const settledFlags = computeFlags(settled);
    const conflictingScores = computeModuleScores(conflictingFlags, conflicting);
    const settledScores = computeModuleScores(settledFlags, settled);
    const roadmap = composeRoadmap(conflicting);
    const selected = roadmap.phases.flatMap((phase) => phase.modules.map((mod) => mod.id));

    assert.equal(conflictingFlags.hasMessyStack, true);
    assert.equal(settledFlags.hasMessyStack, false);
    assert.ok(conflictingScores['martech-audit'] > settledScores['martech-audit']);
    assert.ok(conflictingScores['crm-cleanup'] > settledScores['crm-cleanup']);
    assert.ok(selected.includes('martech-audit'));
    assert.ok(selected.includes('crm-cleanup'));
    assert.match(roadmap.whyThisRoadmap, /Those answers disagree/);
    assert.match(roadmap.whyThisRoadmap, /follows the bottleneck/);
    assert.match(
      roadmap.explainability.influentialAnswers.map((row) => row.impact).join(' '),
      /in tension/,
    );
    assert.equal(
      roadmap.explainability.whySummaryBullets.some((bullet) =>
        bullet.startsWith('Messy or absent tooling'),
      ),
      false,
    );

    const messyMaturity = composeRoadmap({
      ...conflicting,
      bottleneck: 'no-leads',
      stackMaturity: 'messy',
    });
    assert.equal(/disagree|in tension/.test(messyMaturity.whyThisRoadmap), false);

    const withMarketer = {
      ...conflicting,
      teamCapacity: 'dedicated-marketer' as const,
    };
    const marketerFlags = computeFlags(withMarketer);
    const format = getEngagementFormatRecommendation(
      marketerFlags,
      withMarketer,
      computeModuleScores(marketerFlags, withMarketer),
    );
    assert.notEqual(format.format, 'embedded-fractional');
  });

  it('keeps the service branch order and stops claiming that it follows the scores', () => {
    assert.equal(SERVICE_PATH_NOTE.includes('follow your scores'), false);
    assert.match(SERVICE_PATH_NOTE, /can name different work than the highest-scored modules/);

    const manual = DEMO_PROFILES.find((profile) => profile.id === 'manual-workflow');
    assert.ok(manual);
    const manualFlags = computeFlags(manual.answers);
    const manualScores = computeModuleScores(manualFlags, manual.answers);
    const manualPlan = composeRoadmap(manual.answers);
    assert.equal(manualPlan.primaryService.title, SERVICE_OFFERING.WEBSITE_CRO);
    assert.ok(manualScores['crm-cleanup'] > manualScores['website-conversion']);
    assert.ok(manualScores['martech-audit'] > manualScores['website-conversion']);
    assert.notEqual(manualPlan.explainability.topPriorityTracks[0].title, manualPlan.primaryService.title);

    const bookingsAndRoi = answers({
      businessType: 'healthcare',
      primaryGoal: 'more-bookings',
      bottleneck: 'no-reporting',
    });
    const bookingsPlan = composeRoadmap(bookingsAndRoi);
    const bookingsScores = computeModuleScores(computeFlags(bookingsAndRoi), bookingsAndRoi);
    assert.equal(bookingsPlan.primaryService.title, SERVICE_OFFERING.LOCAL_SEO);
    assert.equal(bookingsPlan.recommendedEngagement.title, 'Measurement baseline + attribution roadmap');
    assert.match(bookingsPlan.executiveSummary, /^ROI visibility is the constraint/);
    assert.match(bookingsPlan.whyThisRoadmap, /service path follows bookings/);
    assert.ok(bookingsScores['local-seo'] > 0);
    assert.ok(bookingsScores['attribution-cleanup'] > 0);

    const retentionAndConversion = answers({
      businessType: 'other',
      primaryGoal: 'retention',
      bottleneck: 'poor-conversion',
    });
    const retentionPlan = composeRoadmap(retentionAndConversion);
    const retentionScores = computeModuleScores(
      computeFlags(retentionAndConversion),
      retentionAndConversion,
    );
    assert.equal(retentionPlan.primaryService.title, SERVICE_OFFERING.WEBSITE_CRO);
    assert.equal(retentionPlan.recommendedEngagement.title, 'CRO workstream + test backlog');
    assert.equal(retentionPlan.explainability.topPriorityTracks[0].moduleId, 'email-automation');
    assert.match(retentionPlan.whyThisRoadmap, /follow the conversion bottleneck/);
    assert.ok(retentionScores['email-automation'] > retentionScores['website-conversion']);
  });

  it('preserves the CMO-004 fixture and explains the CMO-005 demo differences', () => {
    const previousBytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo004.json', import.meta.url),
    );
    const nextBytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo005.json', import.meta.url),
    );
    assert.equal(createHash('sha256').update(previousBytes).digest('hex'), CMO_004_BASELINE_HASH);
    assert.equal(createHash('sha256').update(nextBytes).digest('hex'), CMO_005_BASELINE_HASH);

    const previous = loadBaseline('demo-roadmap-baseline-cmo004.json');
    const next = loadBaseline('demo-roadmap-baseline-cmo005.json');
    assert.equal(previous.length, 12);
    assert.equal(next.length, 12);

    for (const profile of DEMO_PROFILES) {
      const before = previous.find((entry) => entry.id === profile.id)?.roadmap;
      const saved = next.find((entry) => entry.id === profile.id)?.roadmap;
      const current = composeRoadmap(profile.answers);
      assert.ok(before);
      assert.ok(saved);
      assert.deepEqual(current, saved, profile.id);
      assert.deepEqual(
        current.phases.map((phase) => phase.modules.map((mod) => mod.id)),
        before.phases.map((phase) => phase.modules.map((mod) => mod.id)),
        `${profile.id} module order`,
      );
      assert.deepEqual(current.explainability.topPriorityTracks, before.explainability.topPriorityTracks);
      assert.equal(current.primaryService.title, before.primaryService.title);
      assert.equal(current.secondaryService.title, before.secondaryService.title);
      assert.equal(current.recommendedEngagement.title, before.recommendedEngagement.title);
      assert.deepEqual(current.engagementFormat, before.engagementFormat);

      if ((UNCHANGED_DEMOS as readonly string[]).includes(profile.id)) {
        assert.deepEqual(current, before, profile.id);
      }
    }

    for (const id of ['clinic-bookings', 'home-services-local', 'manual-workflow', 'prelaunch-brand']) {
      const current = composeRoadmap(DEMO_PROFILES.find((profile) => profile.id === id)!.answers);
      assert.match(current.whyThisRoadmap, /capped for a founder-led team/);
      assert.equal(current.whyThisRoadmap.includes('six focused modules'), false, id);
    }

    for (const id of ['law-differentiation', 'law-reputation-site']) {
      const current = composeRoadmap(DEMO_PROFILES.find((profile) => profile.id === id)!.answers);
      assert.equal(current.industrySegment, 'professional');
      assert.equal(LEGAL_ASSUMPTION.test(collectStrings(current).join('\n')), false, id);
    }
  });
});
