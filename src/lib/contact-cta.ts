import { resolveContactDestination, type ContactEnv } from './booking-url';
import { startingActionForRoadmap, type StartingAction } from './starting-action';
import type { Roadmap } from './types';

/** Visible when the first scheduled module has no starting-action guidance. */
export const STRATEGY_CONVERSATION_LABEL = 'Book a strategy conversation';

const STARTING_CONTACT_LABELS = {
  'website-conversion': 'Discuss your page note',
  'crm-cleanup': 'Discuss your inquiry list',
  'attribution-cleanup': 'Discuss your measurement baseline',
} as const;

const STARTING_PURPOSE =
  'This opens a conversation about that starting task. It does not save, attach, submit, or review a note, list, or baseline.';

const FALLBACK_PURPOSE = 'This opens a strategy conversation about the plan.';

export interface ContactConversation {
  label: string;
  subject: string;
  purpose: string;
  href: string;
}

export function contactConversationFor(action: StartingAction | null): Omit<ContactConversation, 'href'> {
  if (!action) {
    return {
      label: STRATEGY_CONVERSATION_LABEL,
      subject: STRATEGY_CONVERSATION_LABEL,
      purpose: FALLBACK_PURPOSE,
    };
  }

  const label = STARTING_CONTACT_LABELS[action.moduleId];
  return {
    label,
    subject: label,
    purpose: STARTING_PURPOSE,
  };
}

/** Label, subject, and destination for the page button and the email button. */
export function contactForRoadmap(roadmap: Roadmap, env?: ContactEnv): ContactConversation {
  const conversation = contactConversationFor(startingActionForRoadmap(roadmap));
  const destination = resolveContactDestination(conversation.subject, env);
  return {
    ...conversation,
    href: destination.href,
  };
}
