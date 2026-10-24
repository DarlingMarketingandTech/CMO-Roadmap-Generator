import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { POST } from '../app/api/send-roadmap/route';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import { decodeRoadmapToken } from './email/decode-roadmap-token';
import {
  decodeIntakeAnswersCompact,
  decodeIntakeAnswersLegacy,
  encodeIntakeAnswersCompact,
  parseIntakeAnswersFromResultsParams,
} from './encode-answers';
import { canonicalizeIntakeAnswers, MAX_INTAKE_TOKEN_LENGTH } from './intake-schema';
import type { IntakeAnswers } from './types';

function legacyToken(value: unknown): string {
  return Buffer.from(JSON.stringify(value), 'utf-8').toString('base64');
}

function compactToken(payload: readonly unknown[]): string {
  return Buffer.from(JSON.stringify(payload), 'utf-8')
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function planSelection(answers: IntakeAnswers) {
  const roadmap = composeRoadmap(answers);
  return {
    industrySegment: roadmap.industrySegment,
    topPriorities: roadmap.topPriorities,
    primaryService: roadmap.primaryService.title,
    secondaryService: roadmap.secondaryService.title,
    phases: roadmap.phases.map((phase) => ({
      phase: phase.phase,
      days: phase.days,
      modules: phase.modules.map((mod) => ({
        id: mod.id,
        week: mod.week,
        labeledPhase: mod.phase,
      })),
    })),
  };
}

const clinic = DEMO_PROFILES[0];

describe('shared intake contract', () => {
  it('keeps every demo selection when a valid compact or legacy link is reopened', () => {
    assert.equal(DEMO_PROFILES.length, 12);
    for (const profile of DEMO_PROFILES) {
      const canonical = canonicalizeIntakeAnswers(profile.answers);
      assert.ok(canonical);
      const compact = encodeIntakeAnswersCompact(profile.answers);
      const reopened = decodeIntakeAnswersCompact(compact);
      assert.deepEqual(reopened, canonical);
      assert.deepEqual(decodeIntakeAnswersLegacy(legacyToken(profile.answers)), canonical);
      assert.deepEqual(planSelection(canonical), planSelection(profile.answers));
      assert.deepEqual(planSelection(reopened), planSelection(profile.answers));
    }
  });

  it('prefers a valid compact token over a different legacy payload', () => {
    const other = DEMO_PROFILES[1];
    const parsed = parseIntakeAnswersFromResultsParams({
      q: encodeIntakeAnswersCompact(clinic.answers),
      answers: legacyToken(other.answers),
    });
    assert.deepEqual(parsed?.answers, canonicalizeIntakeAnswers(clinic.answers));
  });

  it('sends the validated legacy answers when q is invalid', () => {
    const invalidQ = 'this-q-token-is-not-a-compact-intake';
    assert.equal(decodeIntakeAnswersCompact(invalidQ), null);
    const parsed = parseIntakeAnswersFromResultsParams({
      q: invalidQ,
      answers: legacyToken(clinic.answers),
    });
    const canonical = canonicalizeIntakeAnswers(clinic.answers);
    assert.deepEqual(parsed?.answers, canonical);
    assert.notEqual(parsed?.token, invalidQ);
    assert.deepEqual(decodeRoadmapToken(parsed!.token), parsed!.answers);
    assert.deepEqual(planSelection(parsed!.answers), planSelection(clinic.answers));
  });

  it('rejects malformed channel collections and unknown enums', () => {
    const base = clinic.answers;
    assert.equal(decodeIntakeAnswersLegacy(legacyToken({ ...base, activeChannels: 3 })), null);
    assert.equal(decodeIntakeAnswersLegacy(legacyToken({ ...base, activeChannels: 'seo' })), null);
    assert.equal(
      decodeIntakeAnswersLegacy(legacyToken({ ...base, activeChannels: { seo: true } })),
      null,
    );
    assert.equal(decodeIntakeAnswersLegacy(legacyToken({ ...base, businessType: 'legal' })), null);
    assert.equal(canonicalizeIntakeAnswers({ ...base, activeChannels: ['seo', 'seo'] }), null);
    assert.equal(canonicalizeIntakeAnswers({ ...base, activeChannels: ['none', 'seo'] }), null);
    assert.deepEqual(canonicalizeIntakeAnswers({ ...base, activeChannels: [] })?.activeChannels, [
      'none',
    ]);
  });

  it('rejects fractional masks, unsupported mask bits, and oversized tokens', () => {
    const fractional = compactToken([1, 0, 0, 0, 0, 1.5, 0, 0]);
    const bit128 = compactToken([1, 0, 0, 0, 0, 128, 0, 0]);
    const bit1024 = compactToken([1, 0, 0, 0, 0, 1024, 0, 0]);
    assert.equal(decodeIntakeAnswersCompact(fractional), null);
    assert.equal(decodeIntakeAnswersCompact(bit128), null);
    assert.equal(decodeIntakeAnswersCompact(bit1024), null);
    assert.equal(decodeIntakeAnswersCompact('x'.repeat(MAX_INTAKE_TOKEN_LENGTH + 1)), null);
    assert.equal(decodeRoadmapToken(legacyToken({ ...clinic.answers, activeChannels: 3 })), null);

    const none = decodeIntakeAnswersCompact(compactToken([1, 0, 0, 0, 0, 0, 0, 0]));
    const allChannels = decodeIntakeAnswersCompact(compactToken([1, 0, 0, 0, 0, 127, 0, 0]));
    assert.deepEqual(none?.activeChannels, ['none']);
    assert.deepEqual(allChannels?.activeChannels, [
      'seo',
      'paid-search',
      'social-media',
      'email',
      'content',
      'events',
      'referral',
    ]);
  });

  it('rejects a numeric-channel token in the email route before composition', async () => {
    const previousKey = process.env.RESEND_API_KEY;
    const previousFrom = process.env.RESEND_FROM;
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_FROM = 'plans@example.com';
    try {
      const response = await POST(
        new Request('http://localhost/api/send-roadmap', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            email: 'ada@example.com',
            roadmapToken: legacyToken({ ...clinic.answers, activeChannels: 3 }),
          }),
        }),
      );
      assert.equal(response.status, 400);
      const body = (await response.json()) as { error?: string };
      assert.equal(typeof body.error, 'string');
      assert.equal(body.error?.includes('RESEND'), false);
    } finally {
      if (previousKey === undefined) delete process.env.RESEND_API_KEY;
      else process.env.RESEND_API_KEY = previousKey;
      if (previousFrom === undefined) delete process.env.RESEND_FROM;
      else process.env.RESEND_FROM = previousFrom;
    }
  });
});
