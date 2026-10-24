import type { IntakeAnswers, ActiveChannel } from './types';
import {
  BOTTLENECK_ORDER,
  BUSINESS_TYPE_ORDER,
  CHANNEL_ORDER,
  COMPACT_SCHEMA_VERSION,
  GOAL_ORDER,
  MAX_CHANNEL_MASK,
  MAX_INTAKE_TOKEN_LENGTH,
  STACK_ORDER,
  STAGE_ORDER,
  TEAM_ORDER,
  canonicalizeIntakeAnswers,
} from './intake-schema';

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

function indexOf<T extends string>(order: readonly T[], value: T): number {
  const i = order.indexOf(value);
  if (i < 0) throw new Error(`Unknown intake value: ${value}`);
  return i;
}

function channelsToBitmask(channels: IntakeAnswers['activeChannels']): number {
  if (channels.length === 1 && channels[0] === 'none') return 0;
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
  return out;
}

type CompactPayload = readonly [
  typeof COMPACT_SCHEMA_VERSION,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

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
  const canonical = canonicalizeIntakeAnswers(answers);
  if (!canonical) throw new Error('Cannot encode invalid intake answers');
  const payload: CompactPayload = [
    COMPACT_SCHEMA_VERSION,
    indexOf(BUSINESS_TYPE_ORDER, canonical.businessType),
    indexOf(STAGE_ORDER, canonical.businessStage),
    indexOf(GOAL_ORDER, canonical.primaryGoal),
    indexOf(BOTTLENECK_ORDER, canonical.bottleneck),
    channelsToBitmask(canonical.activeChannels),
    indexOf(STACK_ORDER, canonical.stackMaturity),
    indexOf(TEAM_ORDER, canonical.teamCapacity),
  ];
  return toBase64Url(JSON.stringify(payload));
}

function boundedToken(token: string): string | null {
  const trimmed = token.trim();
  if (!trimmed || trimmed.length > MAX_INTAKE_TOKEN_LENGTH) return null;
  return trimmed;
}

function isIntegralIndex(value: unknown, length: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value < length;
}

export function decodeIntakeAnswersCompact(token: string): IntakeAnswers | null {
  try {
    const bounded = boundedToken(token);
    if (!bounded) return null;
    const raw = fromBase64Url(decodeURIComponent(bounded));
    const arr: unknown = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length !== 8 || arr[0] !== COMPACT_SCHEMA_VERSION) return null;
    const [, ti, si, gi, bi, bits, mi, ki] = arr;
    if (
      !isIntegralIndex(ti, BUSINESS_TYPE_ORDER.length) ||
      !isIntegralIndex(si, STAGE_ORDER.length) ||
      !isIntegralIndex(gi, GOAL_ORDER.length) ||
      !isIntegralIndex(bi, BOTTLENECK_ORDER.length) ||
      !isIntegralIndex(mi, STACK_ORDER.length) ||
      !isIntegralIndex(ki, TEAM_ORDER.length) ||
      typeof bits !== 'number' ||
      !Number.isInteger(bits) ||
      bits < 0 ||
      bits > MAX_CHANNEL_MASK
    ) {
      return null;
    }
    return canonicalizeIntakeAnswers({
      businessType: BUSINESS_TYPE_ORDER[ti],
      businessStage: STAGE_ORDER[si],
      primaryGoal: GOAL_ORDER[gi],
      bottleneck: BOTTLENECK_ORDER[bi],
      activeChannels: bitmaskToChannels(bits),
      stackMaturity: STACK_ORDER[mi],
      teamCapacity: TEAM_ORDER[ki],
    });
  } catch {
    return null;
  }
}

/** Decode legacy `answers` base64 JSON through the shared intake contract. */
export function decodeIntakeAnswersLegacy(encoded: string): IntakeAnswers | null {
  try {
    const bounded = boundedToken(encoded);
    if (!bounded) return null;
    const json = Buffer.from(decodeURIComponent(bounded), 'base64').toString('utf-8');
    return canonicalizeIntakeAnswers(JSON.parse(json));
  } catch {
    return null;
  }
}

export interface ParsedIntakeAnswers {
  answers: IntakeAnswers;
  /** Compact token for the validated answers. Safe to submit and to reopen. */
  token: string;
}

/**
 * Parse results URL params. A valid compact `q` wins. An invalid `q` falls
 * back to a valid legacy `answers` payload, and the returned token is derived
 * from those validated answers rather than the rejected `q` value.
 */
export function parseIntakeAnswersFromResultsParams(params: {
  q?: string | string[];
  answers?: string | string[];
}): ParsedIntakeAnswers | null {
  const q = typeof params.q === 'string' ? params.q : undefined;
  const legacy = typeof params.answers === 'string' ? params.answers : undefined;

  const fromQ = q ? decodeIntakeAnswersCompact(q) : null;
  const answers = fromQ ?? (legacy ? decodeIntakeAnswersLegacy(legacy) : null);
  if (!answers) return null;
  return { answers, token: encodeIntakeAnswersCompact(answers) };
}
