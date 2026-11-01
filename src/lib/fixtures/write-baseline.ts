// One-off generator for a key-sorted demo baseline. Usage: npx tsx src/lib/fixtures/write-baseline.ts <file>
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { composeRoadmap } from '../compose-roadmap';
import { DEMO_PROFILES } from '../demo-profiles';

const sortKeys = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(sortKeys)
    : value && typeof value === 'object'
      ? Object.fromEntries(
          Object.keys(value as object)
            .sort()
            .map((key) => [key, sortKeys((value as Record<string, unknown>)[key])]),
        )
      : value;

const target = process.argv[2];
if (!target) throw new Error('Pass the output file name.');
const body = JSON.stringify(
  sortKeys(DEMO_PROFILES.map((profile) => ({ id: profile.id, roadmap: composeRoadmap(profile.answers) }))),
);
writeFileSync(new URL(`./${target}`, import.meta.url), body);
console.log(createHash('sha256').update(body).digest('hex'));
