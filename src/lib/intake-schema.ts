import { z } from 'zod';
import type { ActiveChannel, IntakeAnswers } from './types';

/** Compact `q` tokens use schema version 1. This is an encoding version, not a rules version. */
export const COMPACT_SCHEMA_VERSION = 1;

/** Same bound for query tokens and the email request body. */
export const MAX_INTAKE_TOKEN_LENGTH = 12000;

/**
 * Channel bits 0–6 are the real channels. Bit 7 and above are unsupported.
 * Mask 0 means no active channel and canonicalizes to `none`.
 */
export const MAX_CHANNEL_MASK = 127;

export const BUSINESS_TYPE_ORDER = [
  'b2b-saas',
  'local-service',
  'healthcare',
  'ecommerce',
  'professional-service',
  'agency',
  'nonprofit',
  'other',
] as const satisfies readonly IntakeAnswers['businessType'][];

export const STAGE_ORDER = [
  'pre-launch',
  'early',
  'growth',
  'established',
  'enterprise',
] as const satisfies readonly IntakeAnswers['businessStage'][];

export const GOAL_ORDER = [
  'more-leads',
  'more-bookings',
  'roi-clarity',
  'brand-awareness',
  'retention',
  'launch',
] as const satisfies readonly IntakeAnswers['primaryGoal'][];

export const BOTTLENECK_ORDER = [
  'unclear-messaging',
  'no-leads',
  'messy-stack',
  'poor-conversion',
  'no-reporting',
  'team-capacity',
] as const satisfies readonly IntakeAnswers['bottleneck'][];

export const STACK_ORDER = [
  'none',
  'basic',
  'messy',
  'solid',
  'advanced',
] as const satisfies readonly IntakeAnswers['stackMaturity'][];

export const TEAM_ORDER = [
  'founder-only',
  'small-team',
  'dedicated-marketer',
  'full-team',
] as const satisfies readonly IntakeAnswers['teamCapacity'][];

export const CHANNEL_ORDER = [
  'seo',
  'paid-search',
  'social-media',
  'email',
  'content',
  'events',
  'referral',
  'none',
] as const satisfies readonly ActiveChannel[];

const REAL_CHANNELS = CHANNEL_ORDER.filter((channel) => channel !== 'none');

export const intakeAnswersSchema = z
  .object({
    businessType: z.enum(BUSINESS_TYPE_ORDER),
    businessStage: z.enum(STAGE_ORDER),
    primaryGoal: z.enum(GOAL_ORDER),
    bottleneck: z.enum(BOTTLENECK_ORDER),
    activeChannels: z.array(z.enum(CHANNEL_ORDER)),
    stackMaturity: z.enum(STACK_ORDER),
    teamCapacity: z.enum(TEAM_ORDER),
  })
  .strict();

/**
 * One runtime contract for the form, compact links, legacy links, and email.
 * Empty or omitted channels become `none`, matching compact mask 0.
 * Duplicate channels and `none` mixed with real channels are rejected.
 * Surviving channels are stored in compact-codec order so a share token
 * decodes to the same object that was displayed.
 */
export function canonicalizeIntakeAnswers(input: unknown): IntakeAnswers | null {
  const prepared = supplyMissingChannels(input);
  const parsed = intakeAnswersSchema.safeParse(prepared);
  if (!parsed.success) return null;
  const activeChannels = canonicalChannels(parsed.data.activeChannels);
  if (!activeChannels) return null;
  return {
    businessType: parsed.data.businessType,
    businessStage: parsed.data.businessStage,
    primaryGoal: parsed.data.primaryGoal,
    bottleneck: parsed.data.bottleneck,
    activeChannels,
    stackMaturity: parsed.data.stackMaturity,
    teamCapacity: parsed.data.teamCapacity,
  };
}

function supplyMissingChannels(input: unknown): unknown {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return input;
  const record = input as Record<string, unknown>;
  if (!Object.prototype.hasOwnProperty.call(record, 'activeChannels') || record.activeChannels == null) {
    return { ...record, activeChannels: [] };
  }
  return input;
}

function canonicalChannels(channels: readonly ActiveChannel[]): ActiveChannel[] | null {
  if (channels.length === 0) return ['none'];
  const seen = new Set<ActiveChannel>();
  for (const channel of channels) {
    if (seen.has(channel)) return null;
    seen.add(channel);
  }
  if (seen.has('none')) return seen.size === 1 ? ['none'] : null;
  return REAL_CHANNELS.filter((channel) => seen.has(channel));
}
