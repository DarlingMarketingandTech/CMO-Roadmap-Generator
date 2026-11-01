import type { IntakeAnswers, Roadmap, RoadmapPhase, RoadmapModule } from './types';
import { computeFlags } from './flags';
import {
  computeModuleScores,
  orderModuleIdsFromScores,
  getServiceRecommendations,
  generateWhyThisRoadmap,
  buildRoadmapExplainability,
  getRecommendedEngagement,
  buildBusinessSummary,
  getEngagementFormatRecommendation,
  getPrimaryCta,
  buildExecutiveSummary,
  buildWatchOuts,
} from './rules';
import { ALL_MODULES } from './modules';
import {
  resolveIndustrySegment,
  applyIndustryModuleLens,
  refineServiceCopyForIndustry,
} from './industry';

export function composeRoadmap(answers: IntakeAnswers): Roadmap {
  const flags = computeFlags(answers);
  const industrySegment = resolveIndustrySegment(answers);
  const scores = computeModuleScores(flags, answers);
  const limit = flags.isFounderOnly ? 6 : 8;
  const rankedIds = orderModuleIdsFromScores(scores, limit);
  // A final score at or below zero did not earn a recommendation. Leave it out
  // instead of backfilling past the cap or moving later modules into the gap.
  const moduleIds = rankedIds.filter((id) => (scores[id] ?? 0) > 0);

  let selectedModules = moduleIds
    .map((id) => ALL_MODULES.find((m) => m.id === id))
    .filter((m): m is RoadmapModule => m !== undefined);

  selectedModules = applyIndustryModuleLens(selectedModules, industrySegment);

  // Capacity follows team size, not how many positive modules remain.
  const phase1Count = flags.isFounderOnly ? 2 : 3;
  const phase2Count = flags.isFounderOnly ? 2 : 3;

  const phase1Modules = selectedModules.slice(0, phase1Count);
  const phase2Modules = selectedModules.slice(phase1Count, phase1Count + phase2Count);
  const phase3Modules = selectedModules.slice(phase1Count + phase2Count);

  const phases: RoadmapPhase[] = [
    {
      phase: 1,
      title: 'Foundation',
      days: 'Days 1–30',
      modules: phase1Modules,
    },
    {
      phase: 2,
      title: 'Build & Systems',
      days: 'Days 31–60',
      modules: phase2Modules,
    },
    {
      phase: 3,
      title: 'Optimize & Scale',
      days: 'Days 61–90',
      modules: phase3Modules,
    },
  ];

  const topPriorities = selectedModules.slice(0, 3).map((m) => m.title);
  let { primary, secondary } = getServiceRecommendations(flags, answers);
  ({ primary, secondary } = refineServiceCopyForIndustry(primary, secondary, industrySegment));
  const whyThisRoadmap = generateWhyThisRoadmap(flags, answers, industrySegment);
  const explainability = buildRoadmapExplainability(answers, flags, scores);
  const recommendedEngagement = getRecommendedEngagement(flags, answers);
  const engagementFormat = getEngagementFormatRecommendation(flags, answers, scores);
  const businessSummary = buildBusinessSummary(answers);
  const executiveSummary = buildExecutiveSummary(answers, flags, industrySegment, topPriorities);
  const watchOuts = buildWatchOuts(answers, flags, industrySegment);
  const primaryCta = getPrimaryCta(primary.title, flags, answers, industrySegment);

  return {
    phases,
    topPriorities,
    primaryService: primary,
    secondaryService: secondary,
    recommendedEngagement,
    engagementFormat,
    whyThisRoadmap,
    explainability,
    businessSummary,
    executiveSummary,
    watchOuts,
    industrySegment,
    primaryCta,
    answers,
  };
}
