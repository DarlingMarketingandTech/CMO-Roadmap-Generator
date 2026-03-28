import type {
  IndustrySegment,
  IntakeAnswers,
  RoadmapModule,
  ServiceRecommendation,
  ModuleScoreMap,
} from './types';

export function resolveIndustrySegment(answers: IntakeAnswers): IndustrySegment {
  if (answers.businessType === 'ecommerce') return 'ecommerce';
  switch (answers.businessType) {
    case 'healthcare':
      return 'healthcare';
    case 'professional-service':
      return 'legal';
    case 'local-service':
      return 'local';
    case 'b2b-saas':
      return 'saas';
    default:
      return 'general';
  }
}

/** Additive score nudges so the same rules engine feels native to each vertical. */
export function applyIndustryScoreAdjustments(
  scores: ModuleScoreMap,
  segment: IndustrySegment,
  answers: IntakeAnswers,
): void {
  const bump = (id: string, n: number) => {
    scores[id] = (scores[id] ?? 0) + n;
  };

  switch (segment) {
    case 'healthcare':
      bump('website-conversion', 4);
      bump('kpi-baseline', 3);
      bump('local-seo', 2);
      bump('crm-cleanup', 3);
      if (answers.primaryGoal === 'more-bookings' || answers.bottleneck === 'poor-conversion') {
        bump('website-conversion', 2);
      }
      break;
    case 'legal':
      bump('brand-strategy', 4);
      bump('website-conversion', 4);
      bump('crm-cleanup', 3);
      bump('gtm-planning', 2);
      if (answers.bottleneck === 'unclear-messaging') {
        bump('brand-strategy', 2);
      }
      break;
    case 'local':
      bump('local-seo', 5);
      bump('website-conversion', 4);
      bump('crm-cleanup', 2);
      if (answers.primaryGoal === 'more-bookings') {
        bump('website-conversion', 2);
      }
      break;
    case 'saas':
      bump('attribution-cleanup', 4);
      bump('crm-cleanup', 3);
      bump('kpi-baseline', 3);
      bump('gtm-planning', 2);
      bump('martech-audit', 2);
      if (answers.businessStage === 'growth' || answers.businessStage === 'established') {
        bump('email-automation', 2);
      }
      break;
    case 'ecommerce':
      bump('conversion-optimization', 3);
      bump('website-conversion', 2);
      bump('attribution-cleanup', 2);
      bump('email-automation', 2);
      break;
    default:
      break;
  }
}

/** Appended to module descriptions for vertical specificity (sparse — only where it helps). */
const MODULE_LENS: Partial<
  Record<string, Partial<Record<IndustrySegment, string>>>
> = {
  'brand-strategy': {
    healthcare:
      'Healthcare lens: balance empathy and clinical credibility; align messaging with intake realities and privacy expectations.',
    legal:
      'Professional services lens: sharpen practice-area authority, ethics-safe claims, and clear “why us vs. any firm” differentiation.',
    local:
      'Local lens: tie positioning to geography, reputation, and the specific jobs customers hire you to do in your market.',
    saas:
      'B2B SaaS lens: connect narrative to buyer jobs-to-be-done, proof points, and category language your ICP already uses.',
    ecommerce:
      'DTC lens: align brand story with product promise, reviews, and the emotional job the purchase solves.',
  },
  'gtm-planning': {
    healthcare:
      'Healthcare lens: prioritize referral loops, provider co-marketing where appropriate, and compliant channel choices.',
    legal:
      'Legal lens: weight referral, content, and owned channels that support trust before the first consult.',
    local:
      'Local lens: emphasize map pack, service-area targeting, and seasonal demand patterns.',
    saas:
      'SaaS lens: align GTM to pipeline math — trials, demos, PLG vs. sales-led, and partner paths.',
    ecommerce:
      'E-commerce lens: balance paid, organic, and retention levers against margin and inventory cadence.',
  },
  'website-conversion': {
    healthcare:
      'Healthcare lens: streamline appointment requests, mobile-first UX, insurance/location clarity, and trust markers (providers, outcomes, compliance).',
    legal:
      'Legal lens: improve inquiry quality with practice-specific CTAs, intake forms, and credibility paths (cases, bars, process).',
    local:
      'Local lens: reduce friction from “near me” click to call, form, or book — especially on mobile.',
    saas:
      'SaaS lens: tighten ICP routing, demo/trial CTAs, and proof placement for evaluation-stage buyers.',
    ecommerce:
      'E-commerce lens: focus on PDP clarity, shipping/returns, urgency without gimmicks, and checkout trust.',
  },
  'local-seo': {
    healthcare:
      'Healthcare lens: GBP clinical categories, review velocity with policy care, and location-specific landing pages.',
    legal:
      'Legal lens: office-location strategy, local intent keywords, and map visibility for high-intent searches.',
    local:
      'Local lens: citations, service-area pages, and review generation tied to completed jobs.',
    saas: 'SaaS lens: still useful if you sell regionally; otherwise treat as lighter priority within this module.',
    ecommerce:
      'E-commerce lens: use where you have physical presence or showrooms; pair with local inventory/fulfillment messaging.',
  },
  'crm-cleanup': {
    healthcare:
      'Healthcare lens: align lead sources to scheduling systems; reduce dropped new-patient inquiries.',
    legal:
      'Legal lens: track matter types and intake quality so marketing feeds the right cases.',
    local:
      'Local lens: connect call tracking, form fills, and job booking to a single timeline.',
    saas:
      'SaaS lens: enforce lifecycle stages, product usage signals, and clean handoff to sales/CS.',
    ecommerce:
      'E-commerce lens: unify customer, order, and email IDs for segmentation and LTV reporting.',
  },
  'kpi-baseline': {
    healthcare:
      'Healthcare lens: measure cost per booked appointment, show-up rate, and source-level volume within privacy constraints.',
    legal:
      'Legal lens: tie marketing to qualified consults and retained matters — not just raw leads.',
    saas:
      'SaaS lens: instrument funnel from trial to expansion; cohort reporting by segment.',
    ecommerce:
      'E-commerce lens: unit economics by channel — MER, CAC, repeat rate, and margin-aware ROAS.',
  },
  'attribution-cleanup': {
    saas:
      'SaaS lens: multi-touch paths across content, product, and sales; avoid over-crediting last click.',
    ecommerce:
      'E-commerce lens: reconcile ad platforms, Shopify/analytics, and email for a single revenue story.',
    healthcare:
      'Healthcare lens: attribute to booked care where possible; separate brand vs. performance cleanly.',
    legal:
      'Legal lens: connect intake source to matter quality so spend follows profitable cases.',
  },
  'email-automation': {
    ecommerce:
      'E-commerce lens: abandoned cart, post-purchase, replenishment, and VIP tiers.',
    saas:
      'SaaS lens: onboarding activation, expansion triggers, and churn-risk plays.',
    healthcare:
      'Healthcare lens: appointment reminders and education sequences within compliance norms.',
    legal:
      'Legal lens: nurture that respects long consideration cycles and ethics rules.',
  },
  'conversion-optimization': {
    ecommerce:
      'E-commerce lens: test PDP, cart, offers, and shipping thresholds — not just homepage.',
    saas: 'SaaS lens: optimize trial-to-paid, upgrade paths, and pricing page clarity.',
    legal:
      'Professional services lens: test headline specificity, attorney proof, and form length vs. lead quality.',
    local:
      'Local lens: call vs. form vs. book — match how your customers actually convert.',
  },
  'martech-audit': {
    saas:
      'SaaS lens: prioritize product analytics, CRM, and marketing automation connectivity.',
    healthcare:
      'Healthcare lens: PHI-aware tools, scheduling integrations, and marketing-safe data flows.',
    legal:
      'Legal lens: intake, call tracking, and case management handoffs.',
    ecommerce:
      'E-commerce lens: pixel/server-side tracking, feed tools, and ESP alignment.',
  },
};

export function applyIndustryModuleLens(
  modules: RoadmapModule[],
  segment: IndustrySegment,
): RoadmapModule[] {
  if (segment === 'general') return modules;
  return modules.map((m) => {
    const extra = MODULE_LENS[m.id]?.[segment];
    if (!extra) return m;
    return {
      ...m,
      description: `${m.description}\n\n${extra}`,
    };
  });
}

/** Industry-specific nuance on service cards (deterministic; layered on base branch logic). */
export function refineServiceCopyForIndustry(
  primary: ServiceRecommendation,
  secondary: ServiceRecommendation,
  segment: IndustrySegment,
): { primary: ServiceRecommendation; secondary: ServiceRecommendation } {
  if (segment === 'general') return { primary, secondary };

  const P: Record<IndustrySegment, { p?: string; s?: string }> = {
    healthcare: {
      p: ' Emphasis: trust, scheduling UX, and local discovery that respects regulatory tone.',
      s: ' Pair with clear intake routing and baseline metrics you can defend internally.',
    },
    legal: {
      p: ' Emphasis: authority, differentiation, and inquiry quality — not vanity traffic.',
      s: ' Support with CRM discipline so you see which marketing actually produces retained work.',
    },
    local: {
      p: ' Emphasis: Google Business Profile, local pack, and “click-to-call / book” friction.',
      s: ' Layer reputation and on-site UX so traffic converts on the first visit.',
    },
    saas: {
      p: ' Emphasis: pipeline attribution, lifecycle continuity, and GTM alignment to your motion.',
      s: ' Ensure stack and data flows match how sales, marketing, and product measure success.',
    },
    ecommerce: {
      p: ' Emphasis: conversion mechanics, offer clarity, and retention — not just more traffic.',
      s: ' Connect merchandising and lifecycle touches to repeat revenue.',
    },
    general: {},
  };

  const add = P[segment];
  return {
    primary: {
      ...primary,
      description: primary.description + (add.p ?? ''),
    },
    secondary: {
      ...secondary,
      description: secondary.description + (add.s ?? ''),
    },
  };
}

/** One closing sentence for the narrative “why” — vertical-specific without repeating the whole brief. */
export function getIndustryClosingSentence(
  segment: IndustrySegment,
  _flags: unknown,
  _answers: IntakeAnswers,
): string | null {
  switch (segment) {
    case 'healthcare':
      return 'Through a healthcare lens, we biased the plan toward trust, scheduling clarity, and measurable patient acquisition — not just traffic.';
    case 'legal':
      return 'For a legal practice, the roadmap leans on authority, differentiation, and inquiry quality so marketing supports the matters you actually want.';
    case 'local':
      return 'As a local service business, near-me visibility, reputation, and low-friction contact paths are treated as revenue infrastructure.';
    case 'saas':
      return 'For B2B SaaS, the sequence favors attribution honesty, CRM truth, and GTM alignment so growth spend maps to pipeline reality.';
    case 'ecommerce':
      return 'For e-commerce, conversion architecture, offer clarity, and retention mechanics are weighted alongside channel scale.';
    default:
      return null;
  }
}
