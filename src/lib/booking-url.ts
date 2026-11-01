/**
 * Contact destinations for the results page and the roadmap email.
 *
 * Order: STRATEGY_BOOKING_URL, then NEXT_PUBLIC_BOOKING_URL, then a mailto
 * to STRATEGY_CONTACT_EMAIL. A missing or placeholder value is unavailable.
 * This module does not invent an address or a booking URL.
 */

export type ContactDestination =
  | { status: 'booking'; href: string }
  | { status: 'email'; href: string }
  | { status: 'unavailable' };

export interface ContactEnv {
  STRATEGY_BOOKING_URL?: string;
  NEXT_PUBLIC_BOOKING_URL?: string;
  STRATEGY_CONTACT_EMAIL?: string;
}

const RESERVED_EXAMPLE_HOSTS = ['example.com', 'example.net', 'example.org'];

function isReservedExampleHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return RESERVED_EXAMPLE_HOSTS.some(
    (reserved) => host === reserved || host.endsWith(`.${reserved}`),
  );
}

function usableBookingUrl(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    if (isReservedExampleHost(url.hostname)) return null;
    return trimmed;
  } catch {
    return null;
  }
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
  };
  const booking =
    usableBookingUrl(source.STRATEGY_BOOKING_URL) ?? usableBookingUrl(source.NEXT_PUBLIC_BOOKING_URL);
  if (booking) return { status: 'booking', href: booking };

  const email = usableContactEmail(source.STRATEGY_CONTACT_EMAIL);
  if (!email) return { status: 'unavailable' };

  return {
    status: 'email',
    href: `mailto:${email}?subject=${encodeURIComponent(subject)}`,
  };
}
