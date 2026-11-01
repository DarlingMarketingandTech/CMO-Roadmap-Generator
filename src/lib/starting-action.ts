import { ALL_MODULES } from './modules';
import type { IntakeAnswers, Roadmap, RoadmapModule } from './types';

/** The catalog band covers the whole module. It is not an estimate of the starting task. */
export const OVERALL_MODULE_EFFORT_LABEL = 'Overall module effort';

/** Catalog outcome bullets remain, and this label keeps them behind the starting task. */
export const LATER_PROGRAM_LABEL = 'Later work in this module';

const STARTING_MODULE_IDS = ['website-conversion', 'crm-cleanup', 'attribution-cleanup'] as const;

type StartingModuleId = (typeof STARTING_MODULE_IDS)[number];

export interface StartingCompletionState {
  id: 'note-complete' | 'access-check-complete';
  label: string;
  requirement: string;
}

export interface AttributionPrerequisite {
  moduleId: 'kpi-baseline';
  summary: string;
  gapVersusBaseline: string;
  blockedWork: string;
}

export interface StartingAction {
  moduleId: StartingModuleId;
  moduleTitle: string;
  task: string;
  output: string;
  completionStates: StartingCompletionState[];
  access: string;
  scopeNote: string | null;
  prerequisite: AttributionPrerequisite | null;
  effort: RoadmapModule['effort'];
  effortLabel: typeof OVERALL_MODULE_EFFORT_LABEL;
  laterProgramLabel: typeof LATER_PROGRAM_LABEL;
}

function isStartingModule(id: string): id is StartingModuleId {
  return (STARTING_MODULE_IDS as readonly string[]).includes(id);
}

function hasNamedChannel(answers: IntakeAnswers): boolean {
  return answers.activeChannels.length > 0 && !answers.activeChannels.includes('none');
}

function founderScope(): string {
  return 'This note is the whole first action. Founder capacity limits the scope of the module. It does not set a staff count or a time budget.';
}

function limitedPassScope(): string {
  return 'One pass over the current list. This task does not assign additional people.';
}

function goalSentence(answers: IntakeAnswers): string {
  switch (answers.primaryGoal) {
    case 'more-bookings':
      return 'For Increase Bookings / Appointments, that result is a booked appointment.';
    case 'more-leads':
      return 'For Generate More Leads, that result is a new inquiry.';
    case 'retention':
      return 'For Improve Retention / LTV, that result is a repeat customer or repeat purchase.';
    case 'launch': {
      const result = 'For Launch, that result is a first inquiry or first order.';
      return answers.businessStage === 'pre-launch'
        ? `${result} A pre-launch stage means the business has not gone live.`
        : result;
    }
    case 'roi-clarity':
      return 'For Understand Marketing ROI, the intake has not supplied a number that ties a result to spend.';
    case 'brand-awareness':
      return 'For Build Brand Awareness, the intake has not supplied a visibility measure.';
  }
}

function websiteAction(answers: IntakeAnswers, effort: RoadmapModule['effort'], title: string): StartingAction {
  const founder = answers.teamCapacity === 'founder-only';
  if (!hasNamedChannel(answers)) {
    return {
      moduleId: 'website-conversion',
      moduleTitle: title,
      task: 'The intake did not name an active channel. Write the one request the first page should make of a visitor.',
      output: 'A note that states the desired customer action for that first page.',
      completionStates: [
        {
          id: 'note-complete',
          label: 'Starting note complete',
          requirement: 'The note names the desired customer action.',
        },
      ],
      access: 'The goal already selected in intake is the only setup this task uses.',
      scopeNote: founder ? founderScope() : null,
      prerequisite: null,
      effort,
      effortLabel: OVERALL_MODULE_EFFORT_LABEL,
      laterProgramLabel: LATER_PROGRAM_LABEL,
    };
  }

  return {
    moduleId: 'website-conversion',
    moduleTitle: title,
    task: 'Open the page a person reaches from one of your active channels. Record where inquiries arrive, what the page currently asks the visitor to do, and the one request you want that page to make.',
    output:
      'A note naming the page you opened, the desired customer action, the current request on that page, and where inquiries arrive.',
    completionStates: [
      {
        id: 'note-complete',
        label: 'Starting note complete',
        requirement:
          'The note names the desired customer action, the current request on that page, and where inquiries arrive.',
      },
    ],
    access: 'Access to a page you already use. The intake does not store a page address.',
    scopeNote: founder ? founderScope() : null,
    prerequisite: null,
    effort,
    effortLabel: OVERALL_MODULE_EFFORT_LABEL,
    laterProgramLabel: LATER_PROGRAM_LABEL,
  };
}

function crmAction(answers: IntakeAnswers, effort: RoadmapModule['effort'], title: string): StartingAction {
  const scopeNote =
    answers.teamCapacity === 'founder-only' || answers.bottleneck === 'team-capacity'
      ? limitedPassScope()
      : null;

  if (answers.stackMaturity === 'none') {
    return {
      moduleId: 'crm-cleanup',
      moduleTitle: title,
      task: 'List every place a new inquiry arrives that you can already see, such as an inbox, a phone, a form, a spreadsheet, or a notebook.',
      output:
        'A list of the existing inquiry sources you can already see. If one combined list does not exist, the note says so.',
      completionStates: [
        {
          id: 'note-complete',
          label: 'Starting note complete',
          requirement: 'The note names each inquiry source and says whether one list shows all of them.',
        },
      ],
      access: 'Your own view of those places. This task does not require a CRM.',
      scopeNote,
      prerequisite: null,
      effort,
      effortLabel: OVERALL_MODULE_EFFORT_LABEL,
      laterProgramLabel: LATER_PROGRAM_LABEL,
    };
  }

  return {
    moduleId: 'crm-cleanup',
    moduleTitle: title,
    task: 'Open the current inquiry list in the tool you already use and mark each record that has no next step. The intake does not name that tool.',
    output: 'A marked list of records missing a next step.',
    completionStates: [
      {
        id: 'note-complete',
        label: 'Cleanup note complete',
        requirement:
          'The saved list identifies each record with no next step. Records left unmarked already have a next step.',
      },
      {
        id: 'access-check-complete',
        label: 'Access check complete',
        requirement:
          'The note says the inquiry list could not be opened. This completes the access check. The cleanup task stays blocked. This is not completed cleanup.',
      },
    ],
    access: 'Access to the inquiry list in the tool you already use.',
    scopeNote,
    prerequisite: null,
    effort,
    effortLabel: OVERALL_MODULE_EFFORT_LABEL,
    laterProgramLabel: LATER_PROGRAM_LABEL,
  };
}

function attributionAction(
  answers: IntakeAnswers,
  effort: RoadmapModule['effort'],
  title: string,
): StartingAction {
  return {
    moduleId: 'attribution-cleanup',
    moduleTitle: title,
    task: `Write the one result the selected goal is supposed to count. ${goalSentence(answers)} List each report you already open and mark every report that does not define that result. Record one current number for that result, or write "number unavailable".`,
    output:
      'A marked list of those reports, with a written outcome definition and either a current number or an explicit "number unavailable" entry.',
    completionStates: [
      {
        id: 'note-complete',
        label: 'Starting note complete',
        requirement:
          'The note contains a written outcome definition and either a current number or an explicit "number unavailable" entry. Writing "number unavailable" documents the gap. It does not establish a usable baseline.',
      },
    ],
    access: 'Access to reports you already open.',
    scopeNote: null,
    prerequisite: {
      moduleId: 'kpi-baseline',
      summary:
        'The selected goal needs a written outcome definition and a current number before deeper analysis. KPI / Reporting Baseline is that measurement. This plan still schedules Attribution / Reporting Cleanup ahead of it.',
      gapVersusBaseline:
        'An explicit "number unavailable" entry documents the gap. A usable baseline is the written definition plus a current number.',
      blockedWork:
        'Deeper attribution and channel ROI stay blocked until the written definition and a current number both exist.',
    },
    effort,
    effortLabel: OVERALL_MODULE_EFFORT_LABEL,
    laterProgramLabel: LATER_PROGRAM_LABEL,
  };
}

/**
 * Starting guidance for one module id. Other ids return null.
 * The effort argument is the module's existing band; this function does not resize it.
 */
export function startingActionForModule(
  moduleId: string,
  answers: IntakeAnswers,
  effort: RoadmapModule['effort'],
): StartingAction | null {
  if (!isStartingModule(moduleId)) return null;
  const title = ALL_MODULES.find((mod) => mod.id === moduleId)?.title ?? moduleId;
  if (moduleId === 'website-conversion') return websiteAction(answers, effort, title);
  if (moduleId === 'crm-cleanup') return crmAction(answers, effort, title);
  return attributionAction(answers, effort, title);
}

/** The first module in phase order. Empty phases are skipped. The scheduler is not consulted again. */
export function startingActionForRoadmap(roadmap: Roadmap): StartingAction | null {
  for (const phase of roadmap.phases) {
    const first = phase.modules[0];
    if (!first) continue;
    return startingActionForModule(first.id, roadmap.answers, first.effort);
  }
  return null;
}
