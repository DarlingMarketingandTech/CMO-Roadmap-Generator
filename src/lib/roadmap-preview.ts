import { startingActionForRoadmap, type StartingAction } from './starting-action';
import type { IndustrySegment, Roadmap } from './types';

/**
 * The short version shown on the results page (D18). The full plan (module
 * detail, reasoning, services, watch-outs) is only sent by email, so this
 * object is all the page hands to the browser.
 */
export interface RoadmapPreview {
  headline: string;
  executiveSummary: string;
  industrySegment: IndustrySegment;
  topPriorities: string[];
  startingAction: StartingAction | null;
  ctaHeadline: string;
  /** Count of recommended work streams in the full plan. */
  moduleCount: number;
}

export function roadmapPreview(roadmap: Roadmap): RoadmapPreview {
  return {
    headline: roadmap.businessSummary.headline,
    executiveSummary: roadmap.executiveSummary,
    industrySegment: roadmap.industrySegment,
    topPriorities: roadmap.topPriorities,
    startingAction: startingActionForRoadmap(roadmap),
    ctaHeadline: roadmap.primaryCta.headline,
    moduleCount: roadmap.phases.reduce((sum, phase) => sum + phase.modules.length, 0),
  };
}
