import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { composeRoadmap } from './compose-roadmap';
import { DEMO_PROFILES } from './demo-profiles';
import { roadmapPreview } from './roadmap-preview';

describe('CMO-007 results preview (D18)', () => {
  it('carries the short version and none of the emailed full-plan detail', () => {
    for (const demo of DEMO_PROFILES) {
      const roadmap = composeRoadmap(demo.answers);
      const preview = roadmapPreview(roadmap);
      const serialized = JSON.stringify(preview);

      assert.deepEqual(preview.topPriorities, roadmap.topPriorities, demo.id);
      assert.equal(
        preview.moduleCount,
        roadmap.phases.reduce((sum, phase) => sum + phase.modules.length, 0),
        demo.id,
      );

      const gated = [
        roadmap.whyThisRoadmap,
        roadmap.primaryService.description,
        roadmap.secondaryService.description,
        roadmap.engagementFormat.rationale,
        roadmap.recommendedEngagement.description,
        ...roadmap.watchOuts,
        ...roadmap.phases.flatMap((phase) =>
          phase.modules.flatMap((mod) => [mod.description, ...mod.outcomes]),
        ),
      ];
      for (const text of gated) {
        assert.equal(serialized.includes(text), false, `${demo.id}: ${text.slice(0, 50)}`);
      }
    }
  });
});
