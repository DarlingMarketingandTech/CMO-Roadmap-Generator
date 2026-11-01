/**
 * Contact destinations for the results page and the roadmap email.
 *
 * Order: STRATEGY_BOOKING_URL, then NEXT_PUBLIC_BOOKING_URL, then a mailto
 * to STRATEGY_CONTACT_EMAIL, then the main website's contact page (the
 * owner-approved default). A missing or placeholder override is skipped, so
 * the link always reaches a real destination.
 */

import { isReservedExampleHost, mainSiteContactUrl, usableWebUrl } from './site';

export type ContactDestination =
  | { status: 'booking'; href: string }
  | { status: 'email'; href: string }
  | { status: 'site'; href: string };

export interface ContactEnv {
  STRATEGY_BOOKING_URL?: string;
  NEXT_PUBLIC_BOOKING_URL?: string;
  STRATEGY_CONTACT_EMAIL?: string;
  NEXT_PUBLIC_MAIN_SITE_URL?: string;
}

function usableContactEmail(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null;
  const domain = trimmed.split('@')[1] ?? '';
  if (isReservedExampleHost(domain)) return null;
  return trimmed;
}

/** Subject is the only mailto parameter. The href has no body. */
export function resolveContactDestination(subject: string, env?: ContactEnv): ContactDestination {
  const source = env ?? {
    STRATEGY_BOOKING_URL: process.env.STRATEGY_BOOKING_URL,
    NEXT_PUBLIC_BOOKING_URL: process.env.NEXT_PUBLIC_BOOKING_URL,
    STRATEGY_CONTACT_EMAIL: process.env.STRATEGY_CONTACT_EMAIL,
    NEXT_PUBLIC_MAIN_SITE_URL: process.env.NEXT_PUBLIC_MAIN_SITE_URL,
  };
  const booking =
    usableWebUrl(source.STRATEGY_BOOKING_URL) ?? usableWebUrl(source.NEXT_PUBLIC_BOOKING_URL);
  if (booking) return { status: 'booking', href: booking };

  const email = usableContactEmail(source.STRATEGY_CONTACT_EMAIL);
  if (email) {
    return {
      status: 'email',
      href: `mailto:${email}?subject=${encodeURIComponent(subject)}`,
    };
  }

  return { status: 'site', href: mainSiteContactUrl(source.NEXT_PUBLIC_MAIN_SITE_URL ?? '') };
}
