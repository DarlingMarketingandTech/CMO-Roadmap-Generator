import { SERVICE_PATH_NOTE } from '../rules';
import type { Roadmap } from '../types';
import { PHASE_WINDOW_NOTE, schedulePhaseViews } from '../schedule-presentation';
import { startingActionForRoadmap } from '../starting-action';

/** Serializable view of a roadmap for email rendering — no duplicate scoring logic. */
export interface RoadmapEmailPhaseSummary {
  phaseLabel: string;
  phaseTitle: string;
  days: string;
  moduleTitles: string[];
  modules: RoadmapEmailModule[];
  emptyMessage: string | null;
}

/** Full module detail: the email is now the only place the whole plan is sent. */
export interface RoadmapEmailModule {
  title: string;
  description: string;
  effortText: string;
  outcomesLabel: string;
  outcomes: string[];
}

export interface RoadmapEmailStartingAction {
  moduleTitle: string;
  task: string;
  output: string;
  completion: string;
  access: string;
  scopeNote: string | null;
  prerequisite: string | null;
  effortLabel: string;
  effortBand: string;
}

export interface RoadmapEmailModel {
  recipientFirstName: string;
  companyLine: string | null;
  businessHeadline: string;
  executiveSummary: string;
  startingAction: RoadmapEmailStartingAction | null;
  topPriorities: string[];
  sequencingNote: string;
  phases: RoadmapEmailPhaseSummary[];
  whyThisRoadmap: string;
  whyBullets: string[];
  influentialAnswers: { question: string; answer: string; impact: string }[];
  watchOuts: string[];
  servicePathNote: string;
  primaryServiceTitle: string;
  primaryServiceBlurb: string;
  secondaryServiceTitle: string;
  secondaryServiceBlurb: string;
  engagementPathTitle: string;
  engagementPathRationale: string;
  sprintTitle: string;
  sprintDescription: string;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Builds the email payload from the already-composed roadmap (same object as the results page).
 */
export function roadmapToEmailModel(
  roadmap: Roadmap,
  recipientName?: string | null,
  company?: string | null,
): RoadmapEmailModel {
  const first = (recipientName?.trim() || '').split(/\s+/)[0] || 'there';
  const starting = startingActionForRoadmap(roadmap);
  const phases: RoadmapEmailPhaseSummary[] = schedulePhaseViews(roadmap).map((phase) => ({
    phaseLabel: phase.phaseLabel,
    phaseTitle: phase.title,
    days: phase.days,
    moduleTitles: phase.modules.map((mod) => mod.title),
    modules: phase.modules.map((mod) => {
      const isStarting = starting?.moduleId === mod.id;
      return {
        title: mod.title,
        description: mod.description,
        effortText: isStarting
          ? `${starting.effortLabel}: ${capitalize(mod.effort)}`
          : `${capitalize(mod.effort)} effort`,
        outcomesLabel: isStarting ? starting.laterProgramLabel : 'Expected outcomes',
        outcomes: mod.outcomes,
      };
    }),
    emptyMessage: phase.emptyMessage,
  }));

  return {
    recipientFirstName: first,
    companyLine: company?.trim() ? company.trim() : null,
    businessHeadline: roadmap.businessSummary.headline,
    executiveSummary: roadmap.executiveSummary,
    startingAction: starting
      ? {
          moduleTitle: starting.moduleTitle,
          task: starting.task,
          output: starting.output,
          completion: starting.completionStates
            .map((state) => `${state.label}: ${state.requirement}`)
            .join(' '),
          access: starting.access,
          scopeNote: starting.scopeNote,
          prerequisite: starting.prerequisite
            ? [
                starting.prerequisite.summary,
                starting.prerequisite.gapVersusBaseline,
                starting.prerequisite.blockedWork,
              ].join(' ')
            : null,
          effortLabel: starting.effortLabel,
          effortBand: capitalize(starting.effort),
        }
      : null,
    topPriorities: roadmap.topPriorities,
    sequencingNote: PHASE_WINDOW_NOTE,
    phases,
    whyThisRoadmap: roadmap.whyThisRoadmap,
    whyBullets: roadmap.explainability.whySummaryBullets,
    influentialAnswers: roadmap.explainability.influentialAnswers.map((row) => ({
      question: row.questionLabel,
      answer: row.answerLabel,
      impact: row.impact,
    })),
    watchOuts: roadmap.watchOuts,
    servicePathNote: SERVICE_PATH_NOTE,
    primaryServiceTitle: roadmap.primaryService.title,
    primaryServiceBlurb: roadmap.primaryService.description,
    secondaryServiceTitle: roadmap.secondaryService.title,
    secondaryServiceBlurb: roadmap.secondaryService.description,
    engagementPathTitle: roadmap.engagementFormat.title,
    engagementPathRationale: roadmap.engagementFormat.rationale,
    sprintTitle: roadmap.recommendedEngagement.title,
    sprintDescription: roadmap.recommendedEngagement.description,
  };
}
