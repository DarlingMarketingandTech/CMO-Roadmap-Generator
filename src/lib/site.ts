/**
 * The main Darling MarTech website. The tool links back to it and sends
 * "discuss this plan" visitors to its contact page.
 *
 * Owner-approved on November 1, 2026: the website's Vercel address until the
 * custom domain is live. NEXT_PUBLIC_MAIN_SITE_URL overrides it without a code
 * change. An invalid or example.com override is ignored.
 */
export const DEFAULT_MAIN_SITE_URL = 'https://darling-martech-website-project-v4.vercel.app';

const RESERVED_EXAMPLE_HOSTS = ['example.com', 'example.net', 'example.org'];

export function isReservedExampleHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  return RESERVED_EXAMPLE_HOSTS.some(
    (reserved) => host === reserved || host.endsWith(`.${reserved}`),
  );
}

/** An http(s) URL that is not a reserved example host, or null. */
export function usableWebUrl(value: string | undefined): string | null {
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

export function mainSiteUrl(override = process.env.NEXT_PUBLIC_MAIN_SITE_URL): string {
  return (usableWebUrl(override) ?? DEFAULT_MAIN_SITE_URL).replace(/\/+$/, '');
}

export function mainSiteContactUrl(override?: string): string {
  return `${mainSiteUrl(override)}/contact`;
}
