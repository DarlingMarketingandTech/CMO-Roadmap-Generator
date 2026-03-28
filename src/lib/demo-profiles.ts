import type { IntakeAnswers } from './types';
import { encodeIntakeAnswersCompact } from './encode-answers';

export interface DemoProfile {
  id: string;
  title: string;
  blurb: string;
  answers: IntakeAnswers;
}

/** Preset scenarios for demos, QA, and regression checks across rule branches. */
export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'clinic-bookings',
    title: 'Healthcare clinic — more bookings',
    blurb: 'Local healthcare, bookings goal, founder capacity, SEO active.',
    answers: {
      businessType: 'healthcare',
      businessStage: 'early',
      primaryGoal: 'more-bookings',
      bottleneck: 'no-leads',
      activeChannels: ['seo', 'social-media'],
      stackMaturity: 'basic',
      teamCapacity: 'founder-only',
    },
  },
  {
    id: 'saas-reporting',
    title: 'Founder-led SaaS — messy reporting',
    blurb: 'B2B SaaS, ROI clarity goal, messy stack, small team.',
    answers: {
      businessType: 'b2b-saas',
      businessStage: 'growth',
      primaryGoal: 'roi-clarity',
      bottleneck: 'no-reporting',
      activeChannels: ['paid-search', 'content', 'email'],
      stackMaturity: 'messy',
      teamCapacity: 'small-team',
    },
  },
  {
    id: 'local-visibility',
    title: 'Local service — weak visibility',
    blurb: 'Local business, lead gen, no channels yet, basic stack.',
    answers: {
      businessType: 'local-service',
      businessStage: 'early',
      primaryGoal: 'more-leads',
      bottleneck: 'no-leads',
      activeChannels: ['none'],
      stackMaturity: 'basic',
      teamCapacity: 'small-team',
    },
  },
  {
    id: 'law-differentiation',
    title: 'Law firm — unclear differentiation',
    blurb: 'Professional services, messaging bottleneck, established stage.',
    answers: {
      businessType: 'professional-service',
      businessStage: 'established',
      primaryGoal: 'brand-awareness',
      bottleneck: 'unclear-messaging',
      activeChannels: ['referral', 'content'],
      stackMaturity: 'solid',
      teamCapacity: 'dedicated-marketer',
    },
  },
  {
    id: 'ecom-conversion',
    title: 'E-commerce — conversion focus',
    blurb: 'DTC, lead pressure + conversion pain, paid + email active.',
    answers: {
      businessType: 'ecommerce',
      businessStage: 'growth',
      primaryGoal: 'more-leads',
      bottleneck: 'poor-conversion',
      activeChannels: ['paid-search', 'email', 'social-media'],
      stackMaturity: 'solid',
      teamCapacity: 'small-team',
    },
  },
  {
    id: 'manual-workflow',
    title: 'SMB — manual workflow friction',
    blurb: 'Generic SMB, team capacity strain, messy stack, some channels.',
    answers: {
      businessType: 'other',
      businessStage: 'early',
      primaryGoal: 'more-leads',
      bottleneck: 'team-capacity',
      activeChannels: ['email', 'social-media'],
      stackMaturity: 'messy',
      teamCapacity: 'founder-only',
    },
  },
  {
    id: 'healthcare-booking-ux',
    title: 'Healthcare — weak booking flow',
    blurb: 'Medical practice, conversion bottleneck on scheduling, solid stack.',
    answers: {
      businessType: 'healthcare',
      businessStage: 'growth',
      primaryGoal: 'more-bookings',
      bottleneck: 'poor-conversion',
      activeChannels: ['seo', 'paid-search'],
      stackMaturity: 'solid',
      teamCapacity: 'small-team',
    },
  },
  {
    id: 'law-reputation-site',
    title: 'Law firm — reputation strong, site weak',
    blurb: 'Professional services, referrals work; website fails to convert inquiries.',
    answers: {
      businessType: 'professional-service',
      businessStage: 'established',
      primaryGoal: 'more-leads',
      bottleneck: 'poor-conversion',
      activeChannels: ['referral', 'content', 'seo'],
      stackMaturity: 'solid',
      teamCapacity: 'dedicated-marketer',
    },
  },
  {
    id: 'saas-growth-blind',
    title: 'SaaS — growth without reporting clarity',
    blurb: 'B2B SaaS scaling channels but leadership cannot see true ROI.',
    answers: {
      businessType: 'b2b-saas',
      businessStage: 'growth',
      primaryGoal: 'roi-clarity',
      bottleneck: 'no-reporting',
      activeChannels: ['paid-search', 'content', 'email', 'events'],
      stackMaturity: 'solid',
      teamCapacity: 'dedicated-marketer',
    },
  },
  {
    id: 'ecom-traffic-gap',
    title: 'E-commerce — traffic but weak conversion',
    blurb: 'DTC brand with channel mix; revenue per session lags.',
    answers: {
      businessType: 'ecommerce',
      businessStage: 'growth',
      primaryGoal: 'more-leads',
      bottleneck: 'poor-conversion',
      activeChannels: ['paid-search', 'social-media', 'email'],
      stackMaturity: 'advanced',
      teamCapacity: 'small-team',
    },
  },
  {
    id: 'home-services-local',
    title: 'Home services — poor local visibility',
    blurb: 'Trades / home services, lead gen goal, minimal digital presence.',
    answers: {
      businessType: 'local-service',
      businessStage: 'early',
      primaryGoal: 'more-leads',
      bottleneck: 'no-leads',
      activeChannels: ['none'],
      stackMaturity: 'basic',
      teamCapacity: 'founder-only',
    },
  },
  {
    id: 'prelaunch-brand',
    title: 'Early brand — preparing to launch',
    blurb: 'Pre-launch company building narrative and GTM before go-live.',
    answers: {
      businessType: 'b2b-saas',
      businessStage: 'pre-launch',
      primaryGoal: 'launch',
      bottleneck: 'unclear-messaging',
      activeChannels: ['none'],
      stackMaturity: 'none',
      teamCapacity: 'founder-only',
    },
  },
];

export function getDemoProfileById(id: string): DemoProfile | undefined {
  return DEMO_PROFILES.find((p) => p.id === id);
}

export function demoResultsHref(profile: DemoProfile): string {
  const q = encodeIntakeAnswersCompact(profile.answers);
  return `/results?q=${encodeURIComponent(q)}`;
}
