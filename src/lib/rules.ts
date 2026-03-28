import type { Flags, IntakeAnswers, ServiceRecommendation } from './types';
import { ALL_MODULES } from './modules';

export function scoreModules(flags: Flags, answers: IntakeAnswers): string[] {
  const scores: Record<string, number> = {};

  for (const mod of ALL_MODULES) {
    scores[mod.id] = 0;
  }

  if (flags.needsBrandClarity) {
    scores['brand-strategy'] += 10;
    scores['gtm-planning'] += 4;
  }

  if (flags.isPreLaunch) {
    scores['gtm-planning'] += 10;
    scores['brand-strategy'] += 8;
    scores['kpi-baseline'] += 5;
    // De-prioritize optimization-heavy modules before launch
    scores['conversion-optimization'] -= 5;
    scores['attribution-cleanup'] -= 3;
    scores['email-automation'] -= 2;
  }

  if (flags.hasMessyStack) {
    scores['martech-audit'] += 9;
    scores['crm-cleanup'] += 7;
  }

  if (flags.needsROIClarity) {
    scores['kpi-baseline'] += 9;
    scores['attribution-cleanup'] += 9;
    scores['martech-audit'] += 3;
  }

  if (flags.needsBookings && flags.isLocalOrHealthcare) {
    scores['local-seo'] += 10;
    scores['website-conversion'] += 8;
    scores['crm-cleanup'] += 4;
  }

  if (flags.needsLeadGen) {
    scores['website-conversion'] += 7;
    scores['crm-cleanup'] += 6;
    scores['email-automation'] += 5;
  }

  if (flags.hasActiveChannels && !flags.isEarlyStage) {
    scores['conversion-optimization'] += 7;
    scores['email-automation'] += 6;
    scores['attribution-cleanup'] += 4;
  }

  if (answers.primaryGoal === 'brand-awareness') {
    scores['brand-strategy'] += 8;
    scores['gtm-planning'] += 5;
    scores['website-conversion'] += 4;
  }

  if (answers.primaryGoal === 'retention') {
    scores['email-automation'] += 9;
    scores['crm-cleanup'] += 7;
    scores['kpi-baseline'] += 4;
  }

  if (answers.primaryGoal === 'launch') {
    scores['gtm-planning'] += 10;
    scores['brand-strategy'] += 7;
    scores['website-conversion'] += 5;
  }

  // Ensure essential modules always have some score
  if (scores['kpi-baseline'] <= 0) scores['kpi-baseline'] = 3;
  if (scores['website-conversion'] <= 0) scores['website-conversion'] = 2;
  if (scores['email-automation'] <= 0) scores['email-automation'] = 1;

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  const limit = flags.isFounderOnly ? 6 : 8;
  return sorted.slice(0, limit);
}

export function getServiceRecommendations(
  flags: Flags,
  answers: IntakeAnswers,
): { primary: ServiceRecommendation; secondary: ServiceRecommendation } {
  let primary: ServiceRecommendation;
  let secondary: ServiceRecommendation;

  if (flags.needsBrandClarity || flags.isPreLaunch || answers.primaryGoal === 'launch') {
    primary = {
      title: 'Brand Strategy & Go-To-Market',
      description:
        'A comprehensive brand positioning and go-to-market engagement to build the right foundation before you scale. Includes messaging framework, ICP definition, and launch strategy.',
      isPrimary: true,
    };
    secondary = {
      title: 'Website & Conversion Audit',
      description:
        'A deep-dive audit of your website and conversion funnel to identify quick wins and prioritize the changes that will immediately improve lead quality and volume.',
      isPrimary: false,
    };
  } else if (flags.needsBookings && flags.isLocalOrHealthcare) {
    primary = {
      title: 'Local Marketing & Booking Optimization',
      description:
        'A targeted local SEO and booking-flow optimization program designed to increase appointments, fill your calendar, and grow your presence in your service area.',
      isPrimary: true,
    };
    secondary = {
      title: 'Digital Presence Audit',
      description:
        'A full audit of your digital footprint — Google Business Profile, local citations, reviews, and online reputation — with a clear action plan to improve each.',
      isPrimary: false,
    };
  } else if (flags.needsROIClarity) {
    primary = {
      title: 'Marketing Analytics & Attribution',
      description:
        'Set up proper marketing attribution, reporting dashboards, and ROI measurement frameworks so you know exactly which channels and campaigns are driving revenue.',
      isPrimary: true,
    };
    secondary = {
      title: 'MarTech Stack Optimization',
      description:
        'Audit and optimize your marketing technology stack to eliminate redundant tools, fix integrations, and create the clean data flow your reporting requires.',
      isPrimary: false,
    };
  } else if (flags.needsLeadGen) {
    primary = {
      title: 'Lead Generation System Build',
      description:
        'Build a full-funnel lead generation engine — from top-of-funnel awareness through conversion — including paid channels, content strategy, and CRM integration.',
      isPrimary: true,
    };
    secondary = {
      title: 'Conversion Rate Optimization',
      description:
        'Maximize the value of your existing traffic through targeted A/B testing, UX improvements, and messaging optimization across your key landing pages.',
      isPrimary: false,
    };
  } else if (answers.primaryGoal === 'retention') {
    primary = {
      title: 'Customer Lifecycle & Retention Program',
      description:
        'Design and deploy a full customer lifecycle marketing program — from onboarding to renewal — using automated email sequences, health scoring, and proactive outreach.',
      isPrimary: true,
    };
    secondary = {
      title: 'CRM & Lead Flow Optimization',
      description:
        'Clean up your CRM, optimize your pipeline stages, and implement lead scoring so your team focuses on the highest-value opportunities.',
      isPrimary: false,
    };
  } else {
    primary = {
      title: 'Full-Stack Marketing Strategy',
      description:
        'A comprehensive strategic marketing engagement covering positioning, channel mix, technology stack, and measurement — giving you a complete 90-day execution blueprint.',
      isPrimary: true,
    };
    secondary = {
      title: 'Quarterly Marketing Retainer',
      description:
        'Ongoing fractional CMO support to execute your roadmap, guide your team, and continuously optimize performance through data-driven iteration.',
      isPrimary: false,
    };
  }

  return { primary, secondary };
}

export function generateWhyThisRoadmap(flags: Flags, answers: IntakeAnswers): string {
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
      'Given your established stage, your roadmap is designed to optimize what is already working, fix the leaks in your funnel, and build the systems that will support your next growth phase.',
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
  } else if (flags.needsLeadGen) {
    parts.push(
      'Demand generation and lead capture improvements are woven throughout all three phases to ensure you see pipeline impact as early as possible.',
    );
  } else if (answers.primaryGoal === 'retention') {
    parts.push(
      'Retention-focused initiatives like lifecycle email and CRM optimization are prioritized because improving LTV is often more cost-effective than acquiring net-new customers.',
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

  return parts.join(' ');
}
