import type {
  Flags,
  IndustrySegment,
  IntakeAnswers,
  ServiceRecommendation,
  RecommendedEngagement,
  EngagementFormatRecommendation,
  PrimaryCta,
  RoadmapExplainability,
  InfluentialAnswer,
  FlagExplanation,
  PriorityTrackScore,
  ModuleScoreMap,
  BusinessSummary,
} from './types';
import { ALL_MODULES, ALL_MODULE_IDS } from './modules';
import { QUESTIONS } from './questions';
import {
  applyIndustryScoreAdjustments,
  getIndustryClosingSentence,
  resolveIndustrySegment,
} from './industry';

// -----------------------------------------------------------------------------
// Darling MarTech–aligned offering names (keep in sync with modules + sales).
// -----------------------------------------------------------------------------

export const SERVICE_OFFERING = {
  BRAND_STRATEGY: 'Brand Strategy & Positioning',
  GTM: 'Go-To-Market Planning',
  MARTECH_AUDIT: 'MarTech Audit',
  WEBSITE_CRO: 'Website Redesign & Conversion UX',
  CRM: 'CRM / Lead Flow Cleanup',
  LOCAL_SEO: 'Local SEO / GEO Optimization',
  CONVERSION_OPT: 'Conversion Optimization',
  LIFECYCLE_EMAIL: 'Lifecycle / Email Automation',
  ATTRIBUTION: 'Attribution / Reporting Cleanup',
} as const;

/**
 * Scoring weights — tune here only; higher = more likely to appear earlier in the roadmap.
 * All modules start at 0; rules add/subtract; floor boosts keep essentials in contention.
 */
const W = {
  CRITICAL: 10,
  HIGH: 9,
  STRONG: 8,
  MEDIUM: 6,
  MODERATE: 5,
  LIGHT: 4,
  LOW: 3,
  PENALTY_HEAVY: -5,
  PENALTY_MID: -3,
  PENALTY_LIGHT: -2,
} as const;

// -----------------------------------------------------------------------------
// Module scoring
// -----------------------------------------------------------------------------

export function computeModuleScores(flags: Flags, answers: IntakeAnswers): ModuleScoreMap {
  const scores: ModuleScoreMap = {};
  for (const id of ALL_MODULE_IDS) {
    scores[id] = 0;
  }

  // --- Brand & messaging ---
  if (flags.needsBrandClarity) {
    scores['brand-strategy'] += W.CRITICAL;
    scores['gtm-planning'] += W.LIGHT;
  }

  // --- Stage: pre-launch ---
  if (flags.isPreLaunch) {
    scores['gtm-planning'] += W.CRITICAL;
    scores['brand-strategy'] += W.STRONG;
    scores['kpi-baseline'] += W.MODERATE;
    scores['conversion-optimization'] += W.PENALTY_HEAVY;
    scores['attribution-cleanup'] += W.PENALTY_MID;
    scores['email-automation'] += W.PENALTY_LIGHT;
  }

  // --- Stack & data hygiene ---
  if (flags.hasMessyStack) {
    scores['martech-audit'] += W.HIGH;
    scores['crm-cleanup'] += W.MEDIUM;
  }

  // --- Reporting & ROI ---
  if (flags.needsROIClarity) {
    scores['kpi-baseline'] += W.HIGH;
    scores['attribution-cleanup'] += W.HIGH;
    scores['martech-audit'] += W.LOW;
  }

  // --- Local / healthcare + bookings ---
  if (flags.needsBookings && flags.isLocalOrHealthcare) {
    scores['local-seo'] += W.CRITICAL;
    scores['website-conversion'] += W.STRONG;
    scores['crm-cleanup'] += W.LIGHT;
  }

  // --- Demand gen ---
  if (flags.needsLeadGen) {
    scores['website-conversion'] += W.MEDIUM;
    scores['crm-cleanup'] += W.MEDIUM;
    scores['email-automation'] += W.MODERATE;
  }

  // --- Active channels (optimize before adding more) ---
  if (flags.hasActiveChannels && !flags.isEarlyStage) {
    scores['conversion-optimization'] += W.MEDIUM;
    scores['email-automation'] += W.MEDIUM;
    scores['attribution-cleanup'] += W.LIGHT;
  }

  // --- Conversion & e-commerce ---
  if (flags.needsConversionLift) {
    scores['website-conversion'] += W.CRITICAL;
    scores['conversion-optimization'] += W.STRONG;
    scores['kpi-baseline'] += W.LOW;
  }
  if (flags.isEcommerce) {
    scores['conversion-optimization'] += W.STRONG;
    scores['website-conversion'] += W.MEDIUM;
    scores['email-automation'] += W.LIGHT;
    scores['attribution-cleanup'] += W.LOW;
  }

  // --- Bandwidth: automate & systematize ---
  if (flags.needsWorkflowRelief) {
    scores['martech-audit'] += W.MEDIUM;
    scores['crm-cleanup'] += W.MEDIUM;
    scores['email-automation'] += W.MODERATE;
  }

  // --- Primary goal overlays ---
  if (answers.primaryGoal === 'brand-awareness') {
    scores['brand-strategy'] += W.STRONG;
    scores['gtm-planning'] += W.MODERATE;
    scores['website-conversion'] += W.LIGHT;
  }
  if (answers.primaryGoal === 'retention') {
    scores['email-automation'] += W.HIGH;
    scores['crm-cleanup'] += W.MEDIUM;
    scores['kpi-baseline'] += W.LIGHT;
  }
  if (answers.primaryGoal === 'launch') {
    scores['gtm-planning'] += W.CRITICAL;
    scores['brand-strategy'] += W.MEDIUM;
    scores['website-conversion'] += W.MODERATE;
  }

  // --- Floors so untouched tracks still surface when nothing else dominates ---
  if (scores['kpi-baseline'] <= 0) scores['kpi-baseline'] = W.LOW;
  if (scores['website-conversion'] <= 0) scores['website-conversion'] = 2;
  if (scores['email-automation'] <= 0) scores['email-automation'] = 1;

  applyIndustryScoreAdjustments(scores, resolveIndustrySegment(answers), answers);

  return scores;
}

export function orderModuleIdsFromScores(
  scores: ModuleScoreMap,
  maxCount: number,
): string[] {
  const sorted = ALL_MODULE_IDS.slice().sort((a, b) => scores[b] - scores[a]);
  return sorted.slice(0, maxCount);
}

/** Ordered module ids (6 founder-only, 8 otherwise). */
export function scoreModules(flags: Flags, answers: IntakeAnswers): string[] {
  const scores = computeModuleScores(flags, answers);
  const limit = flags.isFounderOnly ? 6 : 8;
  return orderModuleIdsFromScores(scores, limit);
}

// -----------------------------------------------------------------------------
// Service recommendations (primary + secondary + engagement)
// -----------------------------------------------------------------------------

export function getServiceRecommendations(
  flags: Flags,
  answers: IntakeAnswers,
): { primary: ServiceRecommendation; secondary: ServiceRecommendation } {
  let primary: ServiceRecommendation;
  let secondary: ServiceRecommendation;

  if (flags.needsBrandClarity || flags.isPreLaunch || answers.primaryGoal === 'launch') {
    primary = {
      title: SERVICE_OFFERING.BRAND_STRATEGY,
      description:
        'Clarify positioning, ICP, and messaging so every channel and page tells the same story — the foundation for efficient spend.',
      isPrimary: true,
    };
    secondary = {
      title: flags.isPreLaunch ? SERVICE_OFFERING.GTM : SERVICE_OFFERING.WEBSITE_CRO,
      description: flags.isPreLaunch
        ? 'Channel mix, launch sequencing, and milestones so you go to market with a coordinated plan, not a pile of tactics.'
        : 'Translate positioning into site structure, offers, and conversion paths that turn clarity into pipeline.',
      isPrimary: false,
    };
  } else if (flags.needsBookings && flags.isLocalOrHealthcare) {
    primary = {
      title: SERVICE_OFFERING.LOCAL_SEO,
      description:
        'Google Business Profile, local citations, reviews, and geo-targeted content to win “near me” demand and fill your calendar.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.WEBSITE_CRO,
      description:
        'Streamline booking flows, mobile UX, and trust signals so local traffic converts into appointments, not bounces.',
      isPrimary: false,
    };
  } else if (flags.needsROIClarity) {
    primary = {
      title: SERVICE_OFFERING.ATTRIBUTION,
      description:
        'Define attribution, unify reporting, and build leadership-ready dashboards so budget decisions rest on evidence.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.MARTECH_AUDIT,
      description:
        'Inventory tools and data flows, remove redundancy, and fix integrations so metrics are trustworthy end to end.',
      isPrimary: false,
    };
  } else if (flags.needsConversionLift || (flags.isEcommerce && flags.needsLeadGen)) {
    primary = {
      title: SERVICE_OFFERING.WEBSITE_CRO,
      description:
        'Homepage, category, and landing page UX plus offer clarity — the fastest lever when traffic exists but revenue lags.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.CONVERSION_OPT,
      description:
        'Structured testing and funnel fixes across key paths so gains compound without guessing.',
      isPrimary: false,
    };
  } else if (flags.needsLeadGen) {
    primary = {
      title: SERVICE_OFFERING.WEBSITE_CRO,
      description:
        'Lead magnets, forms, and landing experiences aligned to your ICP so demand turns into qualified conversations.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.CRM,
      description:
        'Routing, stages, and hygiene so every lead is owned, followed up, and visible in reporting.',
      isPrimary: false,
    };
  } else if (answers.primaryGoal === 'retention') {
    primary = {
      title: SERVICE_OFFERING.LIFECYCLE_EMAIL,
      description:
        'Onboarding, nurture, and win-back programs that increase LTV without proportionally increasing acquisition cost.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.CRM,
      description:
        'Segments, triggers, and sales handoffs so lifecycle campaigns reflect real customer behavior.',
      isPrimary: false,
    };
  } else if (flags.isEcommerce) {
    primary = {
      title: SERVICE_OFFERING.CONVERSION_OPT,
      description:
        'Product, checkout, and merchandising experiments focused on AOV, conversion, and repeat purchase.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.LIFECYCLE_EMAIL,
      description:
        'Post-purchase, replenishment, and VIP flows that turn one-time buyers into recurring revenue.',
      isPrimary: false,
    };
  } else if (flags.needsWorkflowRelief) {
    primary = {
      title: SERVICE_OFFERING.MARTECH_AUDIT,
      description:
        'Rationalize tools, integrations, and ownership so your team spends less time on manual handoffs.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.CRM,
      description:
        'Standardize lead flow, routing, and follow-up so nothing falls through when bandwidth is tight.',
      isPrimary: false,
    };
  } else {
    primary = {
      title: SERVICE_OFFERING.GTM,
      description:
        'Prioritized channel plan, offers, and 90-day execution sequence matched to your stage and capacity.',
      isPrimary: true,
    };
    secondary = {
      title: SERVICE_OFFERING.MARTECH_AUDIT,
      description:
        'Quick wins in stack and data so execution is measurable and your team spends time on growth, not rework.',
      isPrimary: false,
    };
  }

  return { primary, secondary };
}

export function getRecommendedEngagement(
  flags: Flags,
  answers: IntakeAnswers,
): RecommendedEngagement {
  if (flags.isPreLaunch || answers.primaryGoal === 'launch') {
    return {
      title: 'Positioning & GTM sprint (2–3 weeks)',
      description:
        'A focused working session series to lock messaging, ICP, and launch sequencing before you scale spend.',
    };
  }
  if (flags.needsROIClarity) {
    return {
      title: 'Measurement baseline + attribution roadmap',
      description:
        'Start with a short audit and dashboard spec, then implement tracking and reporting in phased milestones.',
    };
  }
  if (flags.needsBookings && flags.isLocalOrHealthcare) {
    return {
      title: 'Local growth program (90 days)',
      description:
        'Weekly execution against local SEO, reputation, and booking UX with clear monthly milestones.',
    };
  }
  if (flags.needsConversionLift || flags.isEcommerce) {
    return {
      title: 'CRO workstream + test backlog',
      description:
        'A fixed-scope conversion project: diagnosis, prioritized tests, and implementation support for top journeys.',
    };
  }
  if (flags.needsLeadGen) {
    return {
      title: 'Lead engine blueprint workshop',
      description:
        'Half-day to full-day working session to align funnel architecture, then a written build plan your team can execute.',
    };
  }
  if (answers.primaryGoal === 'retention') {
    return {
      title: 'Lifecycle kickoff + automation build',
      description:
        'Define journeys and segments, then implement the highest-ROI email flows in a 4–6 week tranche.',
    };
  }
  if (flags.needsBrandClarity) {
    return {
      title: 'Brand & messaging intensive',
      description:
        'Workshops and deliverables to produce a positioning narrative, message map, and channel guidance.',
    };
  }
  if (flags.needsWorkflowRelief) {
    return {
      title: 'Systems & automation sprint',
      description:
        'A short engagement to map your stack, fix the noisiest integrations, and stand up one high-ROI automated workflow.',
    };
  }
  return {
    title: 'Strategy conversation → scoped roadmap',
    description:
      'Start with a strategy call to validate priorities; follow with a written proposal for the first 90-day engagement.',
  };
}

// -----------------------------------------------------------------------------
// Engagement format (audit vs project vs embedded) — deterministic composite score
// -----------------------------------------------------------------------------

function countStrongTracks(scores: ModuleScoreMap, threshold: number): number {
  return ALL_MODULE_IDS.filter((id) => (scores[id] ?? 0) >= threshold).length;
}

export function getEngagementFormatRecommendation(
  flags: Flags,
  answers: IntakeAnswers,
  scores: ModuleScoreMap,
): EngagementFormatRecommendation {
  const strong = countStrongTracks(scores, 8);
  const messyOrDiagnosis =
    flags.hasMessyStack ||
    (flags.needsROIClarity && answers.stackMaturity !== 'advanced') ||
    (flags.needsBrandClarity && answers.businessStage === 'established');

  const hasBench =
    answers.teamCapacity === 'dedicated-marketer' || answers.teamCapacity === 'full-team';
  const matureStage =
    answers.businessStage === 'growth' ||
    answers.businessStage === 'established' ||
    answers.businessStage === 'enterprise';

  // Many high-priority tracks → sequenced project beats “always-on” embedded
  if (strong >= 6) {
    return {
      format: 'project-build',
      title: 'Phased project engagement',
      rationale:
        'Multiple work streams scored very high — the best commercial shape is usually a sequenced project with clear phase gates, not parallel embedded work across all of them.',
    };
  }

  // Embedded: you have marketers and a relatively clean baseline — steer continuously
  if (hasBench && !flags.isPreLaunch && !flags.hasMessyStack && matureStage && strong <= 5) {
    return {
      format: 'embedded-fractional',
      title: 'Embedded / fractional marketing leadership',
      rationale:
        'You have in-house marketing capacity and enough foundation that the highest ROI is often ongoing steering — weekly priorities, governance, and cross-functional alignment — not another one-off document.',
    };
  }

  // Audit / advisory: thin team, messy data, or unclear economics — diagnose before build
  if (
    flags.isFounderOnly ||
    flags.hasMessyStack ||
    messyOrDiagnosis ||
    (strong >= 5 && flags.isFounderOnly)
  ) {
    return {
      format: 'audit-advisory',
      title: 'Audit / advisory first',
      rationale:
        'Capacity, stack maturity, or measurement gaps mean the next best move is a tight diagnostic: where money leaks, what to fix first, and a sequenced plan before large build spend.',
    };
  }

  // Project build: bounded outcomes — launch, conversion, bookings, CRO, brand reset
  if (
    flags.isPreLaunch ||
    answers.primaryGoal === 'launch' ||
    flags.needsConversionLift ||
    (flags.needsBookings && flags.isLocalOrHealthcare) ||
    flags.needsLeadGen
  ) {
    return {
      format: 'project-build',
      title: 'Project-based engagement',
      rationale:
        'Your answers point to a definable outcome in 30–90 days (launch, conversion lift, local growth, or lead flow). A scoped project with milestones matches that reality better than open-ended retainers.',
    };
  }

  return {
    format: 'project-build',
    title: 'Project-based engagement',
    rationale:
      'Defaulting to a scoped project keeps scope, timeline, and success criteria explicit — you can always extend into embedded support once the foundation is stable.',
  };
}

// -----------------------------------------------------------------------------
// Commercial CTA (varies by recommended primary service)
// -----------------------------------------------------------------------------

const DEFAULT_STRATEGY_EMAIL = 'strategy@example.com';

export function getPrimaryCta(
  primaryServiceTitle: string,
  flags: Flags,
  answers: IntakeAnswers,
  segment: IndustrySegment,
): PrimaryCta {
  const map: { match: string[]; headline: string; button: string; subject: string; intro: string }[] =
    [
      {
        match: [SERVICE_OFFERING.BRAND_STRATEGY],
        headline: 'Turn this roadmap into a positioning decision',
        button: 'Start a brand strategy conversation',
        subject: 'Brand strategy conversation — CMO roadmap follow-up',
        intro:
          "I'd like to discuss brand strategy and positioning based on my CMO Roadmap Generator results.",
      },
      {
        match: [SERVICE_OFFERING.GTM],
        headline: 'Pressure-test GTM before you scale spend',
        button: 'Plan your launch strategy',
        subject: 'Go-to-market planning — roadmap follow-up',
        intro: "I'd like to talk through go-to-market priorities from my generated roadmap.",
      },
      {
        match: [SERVICE_OFFERING.MARTECH_AUDIT],
        headline: 'Get stack and data truth on paper first',
        button: 'Request a MarTech audit',
        subject: 'MarTech audit request — roadmap follow-up',
        intro: "I'd like to explore a MarTech audit aligned with my roadmap priorities.",
      },
      {
        match: [SERVICE_OFFERING.WEBSITE_CRO],
        headline: 'Make your site earn its traffic',
        button: 'Book a website strategy review',
        subject: 'Website / conversion strategy — roadmap follow-up',
        intro: "I'd like a website and conversion strategy review based on my roadmap.",
      },
      {
        match: [SERVICE_OFFERING.LOCAL_SEO],
        headline: 'Win local intent before you widen the funnel',
        button: 'Discuss local growth',
        subject: 'Local SEO / growth — roadmap follow-up',
        intro: "I'd like to discuss local SEO and booking growth from my roadmap.",
      },
      {
        match: [SERVICE_OFFERING.ATTRIBUTION],
        headline: 'Close the loop on what marketing produces',
        button: 'Talk through your reporting gaps',
        subject: 'Marketing attribution & reporting — roadmap follow-up',
        intro: "I'd like to discuss attribution and reporting fixes outlined in my roadmap.",
      },
      {
        match: [SERVICE_OFFERING.CONVERSION_OPT],
        headline: 'Ship tests that move revenue, not vanity metrics',
        button: 'Request a conversion sprint consult',
        subject: 'Conversion optimization — roadmap follow-up',
        intro: "I'd like to discuss a conversion optimization sprint aligned with my roadmap.",
      },
      {
        match: [SERVICE_OFFERING.LIFECYCLE_EMAIL],
        headline: 'Compound revenue from customers you already earned',
        button: 'Discuss lifecycle & retention',
        subject: 'Lifecycle / email strategy — roadmap follow-up',
        intro: "I'd like to discuss lifecycle email and retention plays from my roadmap.",
      },
      {
        match: [SERVICE_OFFERING.CRM],
        headline: 'Stop losing leads in handoffs',
        button: 'Review CRM & lead flow',
        subject: 'CRM / lead flow — roadmap follow-up',
        intro: "I'd like to review CRM and lead flow cleanup priorities from my roadmap.",
      },
    ];

  const row = map.find((m) => m.match.includes(primaryServiceTitle));
  const headline = row?.headline ?? 'Discuss this roadmap with a strategist';
  const button = row?.button ?? 'Book a strategy conversation';
  const subject = row?.subject ?? 'CMO Roadmap — strategy follow-up';
  let intro =
    row?.intro ??
    "I'd like to discuss executing the roadmap generated by the CMO Roadmap Generator.";

  if (segment === 'healthcare') {
    intro += ' Context: healthcare / regulated marketing.';
  } else if (segment === 'legal') {
    intro += ' Context: legal / professional services.';
  } else if (segment === 'saas') {
    intro += ' Context: B2B SaaS.';
  } else if (segment === 'ecommerce') {
    intro += ' Context: e-commerce / DTC.';
  }

  if (flags.isPreLaunch) intro += ' Stage: pre-launch.';
  if (answers.primaryGoal === 'launch') intro += ' Goal: launch.';

  return {
    headline,
    buttonLabel: button,
    mailtoSubject: subject,
    mailtoBodyIntro: intro,
  };
}

export function buildMailtoHref(cta: PrimaryCta, extraBodyLines: string[]): string {
  const body = [cta.mailtoBodyIntro, '', ...extraBodyLines].join('\n');
  return `mailto:${DEFAULT_STRATEGY_EMAIL}?subject=${encodeURIComponent(cta.mailtoSubject)}&body=${encodeURIComponent(body)}`;
}

// -----------------------------------------------------------------------------
// Executive summary & watch-outs (briefing-style, logic-driven)
// -----------------------------------------------------------------------------

export function buildExecutiveSummary(
  answers: IntakeAnswers,
  flags: Flags,
  segment: IndustrySegment,
  topPriorities: string[],
): string {
  const p = topPriorities;
  const one = p[0] ?? 'your first scored initiative';
  const two = p[1];
  const three = p[2];

  const segHint =
    segment === 'healthcare'
      ? 'Patient trust, scheduling UX, and local discovery are treated as revenue-critical.'
      : segment === 'legal'
        ? 'Authority and inquiry quality take precedence over raw traffic volume.'
        : segment === 'local'
          ? 'Near-me visibility and frictionless contact paths anchor the first 30 days.'
          : segment === 'saas'
            ? 'Attribution, CRM hygiene, and GTM alignment are weighted to match pipeline reality.'
            : segment === 'ecommerce'
              ? 'Conversion architecture and repeat purchase mechanics sit alongside channel work.'
              : 'The plan balances foundation, systems, and optimization for your stage.';

  let lead = '';
  if (flags.isPreLaunch) {
    lead =
      'You are pre-launch: the next 90 days prioritize a credible story, a realistic GTM sequence, and minimum viable measurement — not full-funnel optimization.';
  } else if (flags.needsROIClarity) {
    lead =
      'ROI visibility is the constraint: early work focuses on honest baselines, attribution you can defend, and cleaning the data path before scaling spend.';
  } else if (flags.needsBookings && flags.isLocalOrHealthcare) {
    lead =
      'Bookings are the north star: local intent, reputation, and low-friction scheduling beat broad awareness plays in the first phase.';
  } else if (flags.needsConversionLift || (flags.isEcommerce && answers.primaryGoal !== 'retention')) {
    lead =
      'Demand exists or is within reach; the lever is conversion — site UX, offer clarity, and structured testing before buying more traffic.';
  } else if (flags.needsBrandClarity) {
    lead =
      'Messaging is the bottleneck: sharpen positioning before you pour budget into channels that will amplify confusion.';
  } else {
    lead =
      'Your roadmap sequences foundation, then systems, then compounding optimization — calibrated to team capacity and stage.';
  }

  const stack = `Immediate sequence: (1) ${one}${two ? `, (2) ${two}` : ''}${three ? `, (3) ${three}` : ''}.`;

  return `${lead} ${segHint} ${stack}`;
}

export function buildWatchOuts(
  answers: IntakeAnswers,
  flags: Flags,
  segment: IndustrySegment,
): string[] {
  const w: string[] = [];

  if (segment === 'healthcare') {
    w.push('Avoid campaigns that outpace your scheduling capacity — ads that overfill or under-deliver on access erode trust fast.');
    w.push('Keep claims and patient stories aligned with regulatory and ethics norms; let proof come from structure, not hype.');
  } else if (segment === 'legal') {
    w.push('Do not optimize for lead volume if matter quality drops — tune CTAs and intake for the cases you actually want.');
    w.push('Long consideration cycles mean nurture and credibility assets matter; avoid purely transactional messaging.');
  } else if (segment === 'local') {
    w.push('Neglecting Google Business Profile and reviews while buying ads usually wastes budget — fix the local baseline first.');
    w.push('If phone and form leads are your lifeblood, track source-level performance; “more traffic” without attribution hides what works.');
  } else if (segment === 'saas') {
    w.push('Beware last-click attribution in long B2B cycles — you will starve top-of-funnel that actually starts conversations.');
    w.push('If product, sales, and marketing use different definitions of an MQL, automation will amplify the wrong behavior.');
  } else if (segment === 'ecommerce') {
    w.push('Discounting to fix conversion often trains the wrong customers — test UX, offer structure, and shipping thresholds first.');
    w.push('MER and margin-aware ROAS beat platform-reported ROAS alone when inventory and fulfillment are tight.');
  }

  if (flags.hasMessyStack) {
    w.push('Adding new tools before rationalizing the stack usually deepens integration debt — freeze net-new vendors where possible.');
  }
  if (flags.isFounderOnly) {
    w.push('Parallel initiatives are the enemy: if everything is priority one, nothing reaches statistical significance in 90 days.');
  }
  if (flags.needsWorkflowRelief) {
    w.push('Automation without documented process often automates chaos — map the happy path before you wire triggers.');
  }

  return w.slice(0, 5);
}

// -----------------------------------------------------------------------------
// Narrative: long-form + bullets for print/PDF
// -----------------------------------------------------------------------------

export function generateWhyThisRoadmap(
  flags: Flags,
  answers: IntakeAnswers,
  industrySegment: IndustrySegment,
): string {
  const parts: string[] = [];

  if (flags.isPreLaunch) {
    parts.push(
      "Since you're pre-launch, your roadmap prioritizes building the right foundation before you invest in growth channels — positioning, messaging, and a clear go-to-market motion come first.",
    );
  } else if (flags.isEarlyStage) {
    parts.push(
      'As an early-stage business, your roadmap focuses on establishing the essentials quickly so you can start generating measurable results within your first 30 days.',
    );
  } else {
    parts.push(
      'Given your stage, your roadmap optimizes what is already working, fixes funnel leaks, and builds the systems that support your next growth chapter.',
    );
  }

  if (flags.needsBrandClarity) {
    parts.push(
      'Brand clarity is your highest-leverage fix — without a sharp message, every dollar you spend on paid media, SEO, or content will underperform.',
    );
  } else if (flags.hasMessyStack) {
    parts.push(
      'Cleaning up your marketing stack early will unlock better data, reduce wasted spend, and make every future initiative significantly more effective.',
    );
  } else if (flags.needsROIClarity) {
    parts.push(
      'Establishing proper reporting and attribution is front-loaded so you can make confident, data-driven budget decisions from the end of Phase 1 onward.',
    );
  } else if (flags.needsBookings && flags.isLocalOrHealthcare) {
    parts.push(
      'For your business type, local visibility and a frictionless booking experience have the highest direct revenue impact — so these are prioritized from the start.',
    );
  } else if (flags.needsConversionLift || (flags.isEcommerce && flags.needsLeadGen)) {
    parts.push(
      'Conversion-focused work is elevated because you already have demand signals — the fastest wins come from improving how traffic turns into revenue.',
    );
  } else if (flags.needsLeadGen) {
    parts.push(
      'Demand generation and lead capture improvements are woven throughout all three phases so you see pipeline impact as early as possible.',
    );
  } else if (answers.primaryGoal === 'retention') {
    parts.push(
      'Retention-focused initiatives like lifecycle email and CRM optimization are prioritized because improving LTV is often more cost-effective than acquiring net-new customers.',
    );
  } else if (flags.needsWorkflowRelief) {
    parts.push(
      'With bandwidth constrained, the plan emphasizes systems and automation that reduce manual marketing ops — fewer handoffs, clearer ownership, repeatable workflows.',
    );
  }

  if (flags.isFounderOnly) {
    parts.push(
      'Your roadmap has been streamlined to six focused modules — realistic for a founder-led team — so you can execute with full commitment rather than spreading yourself thin across too many fronts.',
    );
  } else {
    parts.push(
      'The three-phase structure builds momentum progressively: establish your foundation in Phase 1, build key systems in Phase 2, then compound your results with optimization in Phase 3.',
    );
  }

  const industryClose = getIndustryClosingSentence(industrySegment, flags, answers);
  if (industryClose) parts.push(industryClose);

  return parts.join(' ');
}

export function generateWhySummaryBullets(flags: Flags, answers: IntakeAnswers): string[] {
  const bullets: string[] = [];
  if (flags.needsBrandClarity) {
    bullets.push('Messaging and positioning were treated as the root constraint — everything else builds on that clarity.');
  }
  if (flags.hasMessyStack) {
    bullets.push('Stack and data hygiene scored high so future campaigns and reporting rest on reliable foundations.');
  }
  if (flags.needsROIClarity) {
    bullets.push('Measurement and attribution moved up so you can defend spend and reallocate budget with confidence.');
  }
  if (flags.needsBookings && flags.isLocalOrHealthcare) {
    bullets.push('Local discovery and booking UX were weighted heavily because they map directly to revenue for your model.');
  }
  if (flags.needsConversionLift || (flags.isEcommerce && answers.primaryGoal !== 'retention')) {
    bullets.push('Conversion and on-site experience were prioritized to capture more value from existing demand.');
  }
  if (flags.needsLeadGen && !flags.needsBrandClarity) {
    bullets.push('Lead generation themes shaped several modules so pipeline growth stays central across phases.');
  }
  if (flags.isFounderOnly) {
    bullets.push('Scope was tightened for founder-only capacity — fewer parallel initiatives, clearer sequencing.');
  }
  if (bullets.length === 0) {
    bullets.push('Your answers pointed to balanced growth — the roadmap progresses foundation → systems → optimization.');
  }
  return bullets.slice(0, 5);
}

// -----------------------------------------------------------------------------
// Explainability (answers, flags, scores)
// -----------------------------------------------------------------------------

function optionLabel(questionId: keyof IntakeAnswers, value: string): string {
  const q = QUESTIONS.find((x) => x.id === questionId);
  const opt = q?.options.find((o) => o.value === value);
  return opt?.label ?? value;
}

function channelsSummary(channels: IntakeAnswers['activeChannels']): string {
  if (channels.includes('none')) return 'None yet';
  if (channels.length === 0) return '—';
  return channels.map((c) => optionLabel('activeChannels', c)).join(', ');
}

const BOTTLENECK_IMPACT: Record<IntakeAnswers['bottleneck'], string> = {
  'unclear-messaging': 'Steers the plan toward brand strategy and GTM clarity first.',
  'no-leads': 'Emphasizes demand capture, site conversion, and CRM follow-through.',
  'messy-stack': 'Raises MarTech audit and CRM cleanup in the queue.',
  'poor-conversion': 'Prioritizes website UX and structured conversion optimization.',
  'no-reporting': 'Pulls KPI baselines and attribution work earlier in the sequence.',
  'team-capacity': 'Favors automation, CRM discipline, and fewer parallel initiatives.',
};

const GOAL_IMPACT: Record<IntakeAnswers['primaryGoal'], string> = {
  'more-leads': 'Shapes the roadmap around pipeline and lead capture.',
  'more-bookings': 'Adds weight to local visibility and booking-friendly UX where relevant.',
  'roi-clarity': 'Elevates measurement, dashboards, and attribution.',
  'brand-awareness': 'Strengthens brand and GTM modules in the scoring mix.',
  retention: 'Pulls lifecycle email and CRM health to the forefront.',
  launch: 'Accelerates GTM planning and foundational messaging before scale tactics.',
};

export function buildInfluentialAnswers(answers: IntakeAnswers, flags: Flags): InfluentialAnswer[] {
  const rows: InfluentialAnswer[] = [
    {
      questionLabel: 'Biggest bottleneck',
      answerLabel: optionLabel('bottleneck', answers.bottleneck),
      impact: BOTTLENECK_IMPACT[answers.bottleneck],
    },
    {
      questionLabel: 'Primary 90-day goal',
      answerLabel: optionLabel('primaryGoal', answers.primaryGoal),
      impact: GOAL_IMPACT[answers.primaryGoal],
    },
    {
      questionLabel: 'Business type',
      answerLabel: optionLabel('businessType', answers.businessType),
      impact:
        flags.isLocalOrHealthcare && flags.needsBookings
          ? 'Local or healthcare context pairs with booking goals to emphasize local SEO and conversion.'
          : flags.isEcommerce
            ? 'E-commerce context adds weight to conversion, merchandising, and lifecycle touches.'
            : 'Informs tone and channel mix inside the phased plan.',
    },
    {
      questionLabel: 'Stage',
      answerLabel: optionLabel('businessStage', answers.businessStage),
      impact: flags.isPreLaunch
        ? 'Pre-launch stage de-emphasizes heavy optimization until launch fundamentals exist.'
        : flags.isEarlyStage
          ? 'Early stage keeps the first 30 days focused on essentials and quick wins.'
          : 'Maturity supports more optimization and measurement depth in later phases.',
    },
    {
      questionLabel: 'Active channels',
      answerLabel: channelsSummary(answers.activeChannels),
      impact: flags.hasActiveChannels
        ? 'Active channels mean optimization and attribution earn more weight than “channel zero” setups.'
        : 'Limited channels keep early focus on foundation before scaling complexity.',
    },
  ];

  if (flags.isFounderOnly) {
    rows.push({
      questionLabel: 'Team capacity',
      answerLabel: optionLabel('teamCapacity', answers.teamCapacity),
      impact: 'Founder-only capacity caps roadmap breadth so execution stays realistic.',
    });
  }

  if (flags.hasMessyStack) {
    rows.push({
      questionLabel: 'Stack maturity',
      answerLabel: optionLabel('stackMaturity', answers.stackMaturity),
      impact: 'Messy or absent tooling triggers MarTech and CRM prioritization.',
    });
  }

  return rows.slice(0, 6);
}

const FLAG_META: {
  key: keyof Flags;
  label: string;
  describe: (f: Flags, a: IntakeAnswers) => string;
}[] = [
  {
    key: 'isPreLaunch',
    label: 'Pre-launch focus',
    describe: () => 'Launch readiness and GTM sequencing rank above scale tactics.',
  },
  {
    key: 'isFounderOnly',
    label: 'Founder-led execution',
    describe: () => 'Roadmap length is capped so workload matches solo bandwidth.',
  },
  {
    key: 'hasMessyStack',
    label: 'Stack needs discipline',
    describe: () => 'Tools and data flows need attention before aggressive channel spend.',
  },
  {
    key: 'needsBrandClarity',
    label: 'Messaging is the bottleneck',
    describe: () => 'Positioning work is treated as prerequisite to efficient acquisition.',
  },
  {
    key: 'needsLeadGen',
    label: 'Pipeline pressure',
    describe: () => 'Lead capture, site, and CRM themes receive extra scoring weight.',
  },
  {
    key: 'needsBookings',
    label: 'Bookings goal',
    describe: () => 'Appointment or visit volume is a stated priority for the quarter.',
  },
  {
    key: 'needsROIClarity',
    label: 'ROI visibility gap',
    describe: () => 'Reporting and attribution are treated as strategic, not administrative.',
  },
  {
    key: 'isLocalOrHealthcare',
    label: 'Local or healthcare model',
    describe: () => 'Geo and trust signals matter for how demand is captured.',
  },
  {
    key: 'hasActiveChannels',
    label: 'Channels already live',
    describe: () => 'Optimization beats “start from zero” channel experiments.',
  },
  {
    key: 'isEarlyStage',
    label: 'Early-stage business',
    describe: () => 'First-phase work biases toward proof and fundamentals.',
  },
  {
    key: 'needsConversionLift',
    label: 'Conversion underperforming',
    describe: () => 'Site and funnel fixes are weighted ahead of new traffic bets.',
  },
  {
    key: 'isEcommerce',
    label: 'E-commerce / DTC',
    describe: () => 'Merchandising, checkout, and lifecycle touches influence module order.',
  },
  {
    key: 'needsWorkflowRelief',
    label: 'Team bandwidth strain',
    describe: () => 'Automation and CRM process reduce manual marketing workload.',
  },
];

export function buildTriggeredFlagExplanations(
  flags: Flags,
  answers: IntakeAnswers,
): FlagExplanation[] {
  const out: FlagExplanation[] = [];
  for (const meta of FLAG_META) {
    if (flags[meta.key]) {
      out.push({
        id: meta.key,
        label: meta.label,
        description: meta.describe(flags, answers),
      });
    }
  }
  return out.slice(0, 8);
}

export function buildTopPriorityTracks(
  scores: ModuleScoreMap,
  limit = 5,
): PriorityTrackScore[] {
  const withTitles = ALL_MODULE_IDS.map((id) => {
    const m = ALL_MODULES.find((x) => x.id === id);
    return {
      moduleId: id,
      title: m?.title ?? id,
      score: scores[id] ?? 0,
    };
  });
  withTitles.sort((a, b) => b.score - a.score);
  return withTitles.slice(0, limit);
}

export function buildRoadmapExplainability(
  answers: IntakeAnswers,
  flags: Flags,
  scores: ModuleScoreMap,
): RoadmapExplainability {
  return {
    influentialAnswers: buildInfluentialAnswers(answers, flags),
    triggeredFlags: buildTriggeredFlagExplanations(flags, answers),
    topPriorityTracks: buildTopPriorityTracks(scores, 5),
    whySummaryBullets: generateWhySummaryBullets(flags, answers),
  };
}

export function buildBusinessSummary(answers: IntakeAnswers): BusinessSummary {
  return {
    headline: `${optionLabel('businessType', answers.businessType)} · ${optionLabel('businessStage', answers.businessStage)}`,
    details: [
      { label: 'Primary goal (90 days)', value: optionLabel('primaryGoal', answers.primaryGoal) },
      { label: 'Top bottleneck', value: optionLabel('bottleneck', answers.bottleneck) },
      { label: 'Stack maturity', value: optionLabel('stackMaturity', answers.stackMaturity) },
      { label: 'Team capacity', value: optionLabel('teamCapacity', answers.teamCapacity) },
      { label: 'Active channels', value: channelsSummary(answers.activeChannels) },
    ],
  };
}
