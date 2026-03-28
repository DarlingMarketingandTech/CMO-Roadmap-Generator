import type { IntakeAnswers, ActiveChannel } from './types';

/**
 * Legacy: full JSON base64 in `answers` query param.
 */
export function encodeIntakeAnswersForQuery(answers: IntakeAnswers): string {
  const json = JSON.stringify(answers);
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(json, 'utf-8').toString('base64');
  }
  return btoa(unescape(encodeURIComponent(json)));
}

// --- Compact share encoding (`q` param): shorter, deterministic, no DB ---

const SCHEMA_VERSION = 1;

const BUSINESS_TYPE_ORDER = [
  'b2b-saas',
  'local-service',
  'healthcare',
  'ecommerce',
  'professional-service',
  'agency',
  'nonprofit',
  'other',
] as const satisfies readonly IntakeAnswers['businessType'][];

const STAGE_ORDER = [
  'pre-launch',
  'early',
  'growth',
  'established',
  'enterprise',
] as const satisfies readonly IntakeAnswers['businessStage'][];

const GOAL_ORDER = [
  'more-leads',
  'more-bookings',
  'roi-clarity',
  'brand-awareness',
  'retention',
  'launch',
] as const satisfies readonly IntakeAnswers['primaryGoal'][];

const BOTTLENECK_ORDER = [
  'unclear-messaging',
  'no-leads',
  'messy-stack',
  'poor-conversion',
  'no-reporting',
  'team-capacity',
] as const satisfies readonly IntakeAnswers['bottleneck'][];

const STACK_ORDER = ['none', 'basic', 'messy', 'solid', 'advanced'] as const satisfies readonly IntakeAnswers['stackMaturity'][];

const TEAM_ORDER = [
  'founder-only',
  'small-team',
  'dedicated-marketer',
  'full-team',
] as const satisfies readonly IntakeAnswers['teamCapacity'][];

const CHANNEL_ORDER: readonly ActiveChannel[] = [
  'seo',
  'paid-search',
  'social-media',
  'email',
  'content',
  'events',
  'referral',
  'none',
];

function indexOf<T extends string>(order: readonly T[], value: T): number {
  const i = order.indexOf(value);
  return i >= 0 ? i : 0;
}

function channelsToBitmask(channels: IntakeAnswers['activeChannels']): number {
  if (!channels.length || channels.includes('none')) return 0;
  let bits = 0;
  for (let i = 0; i < CHANNEL_ORDER.length - 1; i++) {
    const ch = CHANNEL_ORDER[i];
    if (channels.includes(ch)) bits |= 1 << i;
  }
  return bits;
}

function bitmaskToChannels(bits: number): IntakeAnswers['activeChannels'] {
  if (bits === 0) return ['none'];
  const out: ActiveChannel[] = [];
  for (let i = 0; i < CHANNEL_ORDER.length - 1; i++) {
    if (bits & (1 << i)) out.push(CHANNEL_ORDER[i]);
  }
  return out.length ? out : ['none'];
}

type CompactPayload = readonly [typeof SCHEMA_VERSION, number, number, number, number, number, number, number];

function toBase64Url(json: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(json, 'utf-8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(s: string): string {
  let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64').toString('utf-8');
  }
  return decodeURIComponent(escape(atob(b64)));
}

/** Compact URL token for `q` — typically shorter than legacy `answers` JSON base64. */
export function encodeIntakeAnswersCompact(answers: IntakeAnswers): string {
  const payload: CompactPayload = [
    SCHEMA_VERSION,
    indexOf(BUSINESS_TYPE_ORDER, answers.businessType),
    indexOf(STAGE_ORDER, answers.businessStage),
    indexOf(GOAL_ORDER, answers.primaryGoal),
    indexOf(BOTTLENECK_ORDER, answers.bottleneck),
    channelsToBitmask(answers.activeChannels ?? []),
    indexOf(STACK_ORDER, answers.stackMaturity),
    indexOf(TEAM_ORDER, answers.teamCapacity),
  ];
  return toBase64Url(JSON.stringify(payload));
}

export function decodeIntakeAnswersCompact(token: string): IntakeAnswers | null {
  try {
    const raw = fromBase64Url(decodeURIComponent(token.trim()));
    const arr = JSON.parse(raw) as number[];
    if (!Array.isArray(arr) || arr.length !== 8 || arr[0] !== SCHEMA_VERSION) return null;
    const [, ti, si, gi, bi, bits, mi, ki] = arr;
    if (
      [ti, si, gi, bi, mi, ki].some(
        (n) => typeof n !== 'number' || !Number.isInteger(n) || n < 0,
      ) ||
      typeof bits !== 'number' ||
      bits < 0
    ) {
      return null;
    }
    if (
      ti >= BUSINESS_TYPE_ORDER.length ||
      si >= STAGE_ORDER.length ||
      gi >= GOAL_ORDER.length ||
      bi >= BOTTLENECK_ORDER.length ||
      mi >= STACK_ORDER.length ||
      ki >= TEAM_ORDER.length
    ) {
      return null;
    }
    return {
      businessType: BUSINESS_TYPE_ORDER[ti],
      businessStage: STAGE_ORDER[si],
      primaryGoal: GOAL_ORDER[gi],
      bottleneck: BOTTLENECK_ORDER[bi],
      activeChannels: bitmaskToChannels(bits),
      stackMaturity: STACK_ORDER[mi],
      teamCapacity: TEAM_ORDER[ki],
    };
  } catch {
    return null;
  }
}

/** Decode legacy `answers` base64 JSON. */
export function decodeIntakeAnswersLegacy(encoded: string): IntakeAnswers | null {
  try {
    const json = Buffer.from(decodeURIComponent(encoded), 'base64').toString('utf-8');
    const answers = JSON.parse(json) as IntakeAnswers;
    if (
      !answers.businessType ||
      !answers.businessStage ||
      !answers.primaryGoal ||
      !answers.bottleneck ||
      !answers.stackMaturity ||
      !answers.teamCapacity
    ) {
      return null;
    }
    if (!answers.activeChannels) answers.activeChannels = [];
    return answers;
  } catch {
    return null;
  }
}

/**
 * Parse results URL params: prefers `q` (compact), then `answers` (legacy).
 */
export function parseIntakeAnswersFromResultsParams(params: {
  q?: string | string[];
  answers?: string | string[];
}): IntakeAnswers | null {
  const qRaw = params.q;
  const aRaw = params.answers;
  const q = typeof qRaw === 'string' ? qRaw : undefined;
  const a = typeof aRaw === 'string' ? aRaw : undefined;

  if (q) {
    const fromQ = decodeIntakeAnswersCompact(q);
    if (fromQ) return fromQ;
  }
  if (a) {
    return decodeIntakeAnswersLegacy(a);
  }
  return null;
}
