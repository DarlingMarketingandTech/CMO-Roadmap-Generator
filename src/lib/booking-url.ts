/**
 * Booking / strategy CTA URLs.
 *
 * - Server (API route, emails): `STRATEGY_BOOKING_URL` overrides everything (keeps a private Cal link off the client bundle if desired).
 * - Client-visible links: set `NEXT_PUBLIC_BOOKING_URL` so the results page matches the email button without exposing server-only env.
 * - Fallback: mailto using `STRATEGY_CONTACT_EMAIL` (available on server) or default address.
 */

const MAILTO_SUBJECT = 'Book a strategy conversation';

function mailtoFallback(): string {
  const email = process.env.STRATEGY_CONTACT_EMAIL?.trim() || 'strategy@example.com';
  return `mailto:${email}?subject=${encodeURIComponent(MAILTO_SUBJECT)}`;
}

/** Use in Route Handlers / Server Components: full resolution order. */
export function resolveBookingUrl(): string {
  const serverOnly = process.env.STRATEGY_BOOKING_URL?.trim();
  if (serverOnly) return serverOnly;
  const publicUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (publicUrl) return publicUrl;
  return mailtoFallback();
}

/**
 * Use in Client Components: only `NEXT_PUBLIC_*` is guaranteed in the browser.
 * Pass a rich mailto from `buildMailtoHref` when no public booking URL is set.
 */
export function getClientBookingPrimaryHref(mailtoFallbackHref: string): string {
  const publicUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (publicUrl) return publicUrl;
  return mailtoFallbackHref;
}
