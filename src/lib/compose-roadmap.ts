import type { IntakeAnswers, Roadmap, RoadmapPhase, RoadmapModule } from './types';
import { computeFlags } from './flags';
import { scoreModules, getServiceRecommendations, generateWhyThisRoadmap } from './rules';
import { ALL_MODULES } from './modules';

export function composeRoadmap(answers: IntakeAnswers): Roadmap {
  const flags = computeFlags(answers);
  const moduleIds = scoreModules(flags, answers);

  const selectedModules = moduleIds
    .map((id) => ALL_MODULES.find((m) => m.id === id))
    .filter((m): m is RoadmapModule => m !== undefined);

  const total = selectedModules.length;

  let phase1Count: number;
  let phase2Count: number;

  if (total <= 6) {
    phase1Count = 2;
    phase2Count = 2;
  } else {
    phase1Count = 3;
    phase2Count = 3;
  }

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
  const { primary, secondary } = getServiceRecommendations(flags, answers);
  const whyThisRoadmap = generateWhyThisRoadmap(flags, answers);

  return {
    phases,
    topPriorities,
    primaryService: primary,
    secondaryService: secondary,
    whyThisRoadmap,
    answers,
  };
}
