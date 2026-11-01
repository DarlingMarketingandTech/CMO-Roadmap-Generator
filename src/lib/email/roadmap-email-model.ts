import type { Roadmap } from '../types';
import { PHASE_WINDOW_NOTE, schedulePhaseViews } from '../schedule-presentation';
import { startingActionForRoadmap } from '../starting-action';

/** Serializable view of a roadmap for email rendering — no duplicate scoring logic. */
export interface RoadmapEmailPhaseSummary {
  phaseLabel: string;
  phaseTitle: string;
  days: string;
  moduleTitles: string[];
  emptyMessage: string | null;
}

/** The page also lists later program outcomes. This email view does not. */
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
  startingAction: RoadmapEmailStartingAction | null;
  topPriorities: string[];
  sequencingNote: string;
  phases: RoadmapEmailPhaseSummary[];
  primaryServiceTitle: string;
  primaryServiceBlurb: string;
  secondaryServiceTitle: string;
  secondaryServiceBlurb: string;
  engagementPathTitle: string;
  engagementPathRationale: string;
  sprintTitle: string;
}

const MAX_BLURB = 240;

function truncateBlurb(text: string): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= MAX_BLURB) return t;
  return `${t.slice(0, MAX_BLURB - 1).trimEnd()}…`;
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
    emptyMessage: phase.emptyMessage,
  }));

  return {
    recipientFirstName: first,
    companyLine: company?.trim() ? company.trim() : null,
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
          effortBand: starting.effort.charAt(0).toUpperCase() + starting.effort.slice(1),
        }
      : null,
    topPriorities: roadmap.topPriorities,
    sequencingNote: PHASE_WINDOW_NOTE,
    phases,
    primaryServiceTitle: roadmap.primaryService.title,
    primaryServiceBlurb: truncateBlurb(roadmap.primaryService.description),
    secondaryServiceTitle: roadmap.secondaryService.title,
    secondaryServiceBlurb: truncateBlurb(roadmap.secondaryService.description),
    engagementPathTitle: roadmap.engagementFormat.title,
    engagementPathRationale: truncateBlurb(roadmap.engagementFormat.rationale),
    sprintTitle: roadmap.recommendedEngagement.title,
  };
}
