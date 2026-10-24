import type { Roadmap, RoadmapModule } from './types';

/** Shown with every phase window on the results page, in print, and in email. */
export const PHASE_WINDOW_NOTE =
  'Phase windows are suggested sequencing. This assessment has not measured available hours or task dependencies, so these day ranges are not guaranteed completion dates.';

/** Shown when a phase slice has no positive-score module. This is not a later commitment. */
export const EMPTY_PHASE_MESSAGE =
  'No additional priorities recommended for this phase based on your answers.';

export interface ScheduleModuleView {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  effort: RoadmapModule['effort'];
}

export interface SchedulePhaseView {
  phase: 1 | 2 | 3;
  phaseLabel: string;
  title: string;
  days: string;
  modules: ScheduleModuleView[];
  emptyMessage: string | null;
}

/**
 * The timing view shared by results, print, and email.
 * Catalog week strings stay on the module catalog and are not part of this view.
 */
export function schedulePhaseViews(roadmap: Roadmap): SchedulePhaseView[] {
  return roadmap.phases.map((phase) => ({
    phase: phase.phase,
    phaseLabel: `Phase ${phase.phase}`,
    title: phase.title,
    days: phase.days,
    modules: phase.modules.map((mod) => ({
      id: mod.id,
      title: mod.title,
      description: mod.description,
      outcomes: mod.outcomes,
      effort: mod.effort,
    })),
    emptyMessage: phase.modules.length === 0 ? EMPTY_PHASE_MESSAGE : null,
  }));
}
