import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import {
  decodeIntakeAnswersCompact,
  decodeIntakeAnswersLegacy,
  encodeIntakeAnswersCompact,
} from './encode-answers';
import { COMPACT_SCHEMA_VERSION, STAGE_ORDER } from './intake-schema';
import { QUESTIONS } from './questions';
import { computeModuleScores } from './rules';
import { computeFlags } from './flags';

const CMO_007_BASELINE_HASH = 'a9f21063b4a7f238c8ad0f649da645c0efc64b1f46908fe3ba87eaab14a30091';

const base = DEMO_PROFILES.find((item) => item.id === 'saas-reporting')!.answers;

function compactToken(payload: unknown[]): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function legacyToken(value: unknown): string {
  return Buffer.from(JSON.stringify(value)).toString('base64');
}

describe('CMO-007 stage question (D17)', () => {
  it('asks in owner terms with no revenue bands and no enterprise option', () => {
    const stage = QUESTIONS.find((q) => q.id === 'businessStage');
    assert.ok(stage);
    assert.deepEqual(
      stage.options.map((option) => option.value),
      [...STAGE_ORDER],
    );
    const copy = [stage.label, stage.description, ...stage.options.flatMap((o) => [o.label, o.description ?? ''])].join(
      ' ',
    );
    assert.equal(/\$|ARR|revenue|enterprise/i.test(copy), false, copy);
  });

  it('keeps compact indexes 0–3 and reads an old enterprise link as established', () => {
    const established = { ...base, businessStage: 'established' as const };
    const token = encodeIntakeAnswersCompact(established);
    const payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as number[];
    assert.equal(payload[2], 3);

    const oldEnterprise = [...payload];
    oldEnterprise[2] = 4;
    const decoded = decodeIntakeAnswersCompact(compactToken(oldEnterprise));
    assert.equal(decoded?.businessStage, 'established');
    assert.equal(encodeIntakeAnswersCompact(decoded!), token);

    const outOfRange = [...payload];
    outOfRange[2] = 5;
    assert.equal(decodeIntakeAnswersCompact(compactToken(outOfRange)), null);
    assert.equal(payload[0], COMPACT_SCHEMA_VERSION);

    const legacy = decodeIntakeAnswersLegacy(legacyToken({ ...base, businessStage: 'enterprise' }));
    assert.equal(legacy?.businessStage, 'established');
    // Compare canonical answers: decoding also puts channels in codec order (D13).
    assert.deepEqual(composeRoadmap(legacy!), composeRoadmap(decoded!));
  });

  it('gives an old enterprise answer the established scores', () => {
    const legacy = decodeIntakeAnswersLegacy(legacyToken({ ...base, businessStage: 'enterprise' }))!;
    const established = { ...base, businessStage: 'established' as const };
    assert.deepEqual(
      computeModuleScores(computeFlags(legacy), legacy),
      computeModuleScores(computeFlags(established), established),
    );
  });

  it('pins the CMO-007 demo baseline', () => {
    const bytes = readFileSync(
      new URL('./fixtures/demo-roadmap-baseline-cmo007.json', import.meta.url),
    );
    assert.equal(createHash('sha256').update(bytes).digest('hex'), CMO_007_BASELINE_HASH);
    const saved = JSON.parse(bytes.toString('utf8')) as { id: string; roadmap: unknown }[];
    for (const profile of DEMO_PROFILES) {
      const entry = saved.find((item) => item.id === profile.id);
      assert.ok(entry, profile.id);
      assert.deepEqual(
        JSON.parse(JSON.stringify(composeRoadmap(profile.answers))),
        entry.roadmap,
        profile.id,
      );
    }
  });
});
