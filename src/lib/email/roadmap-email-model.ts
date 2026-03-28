import type { Roadmap } from '../types';

/** Serializable view of a roadmap for email rendering — no duplicate scoring logic. */
export interface RoadmapEmailPhaseSummary {
  phaseLabel: string;
  phaseTitle: string;
  days: string;
  moduleTitles: string[];
}

export interface RoadmapEmailModel {
  recipientFirstName: string;
  companyLine: string | null;
  topPriorities: string[];
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
  const phases: RoadmapEmailPhaseSummary[] = roadmap.phases.map((p) => ({
    phaseLabel: `Phase ${p.phase}`,
    phaseTitle: p.title,
    days: p.days,
    moduleTitles: p.modules.map((m) => m.title),
  }));

  return {
    recipientFirstName: first,
    companyLine: company?.trim() ? company.trim() : null,
    topPriorities: roadmap.topPriorities,
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
