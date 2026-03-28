import type { RoadmapModule } from './types';

export const ALL_MODULES: RoadmapModule[] = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy & Positioning',
    description:
      'Define your brand voice, positioning, and messaging framework to clearly differentiate in the market and give every channel a consistent foundation.',
    phase: 1,
    week: 'Week 1–2',
    outcomes: [
      'Clear brand positioning statement finalized',
      'Messaging framework for all channels documented',
      'Competitive differentiation clearly defined',
      'Brand guidelines document delivered',
    ],
    effort: 'high',
  },
  {
    id: 'gtm-planning',
    title: 'Go-To-Market Planning',
    description:
      'Build a comprehensive go-to-market strategy covering your ICP, channel mix, and launch timeline so every marketing dollar is deployed with intention.',
    phase: 1,
    week: 'Week 1–2',
    outcomes: [
      'Ideal Customer Profile (ICP) fully defined',
      'GTM motion selected and documented',
      'Launch timeline with key milestones built',
      'Channel priority stack established',
    ],
    effort: 'high',
  },
  {
    id: 'martech-audit',
    title: 'MarTech Audit & Cleanup',
    description:
      'Audit and rationalize your marketing technology stack to eliminate redundancy, improve data quality, and unlock the integrations your team actually needs.',
    phase: 1,
    week: 'Week 2–3',
    outcomes: [
      'Full MarTech inventory documented',
      'Redundant or underused tools identified',
      'Integration gaps and data flow mapped',
      'Stack rationalization roadmap delivered',
    ],
    effort: 'medium',
  },
  {
    id: 'kpi-baseline',
    title: 'KPI / Reporting Baseline',
    description:
      'Establish the marketing KPIs and reporting baseline that will let you measure performance, prove ROI, and make data-driven decisions from day one.',
    phase: 1,
    week: 'Week 3–4',
    outcomes: [
      'Core KPI dashboard built and live',
      'Baseline metrics documented across channels',
      'Reporting cadence and ownership established',
      'Goal-setting framework implemented',
    ],
    effort: 'medium',
  },
  {
    id: 'website-conversion',
    title: 'Website Redesign & Conversion UX',
    description:
      'Optimize your website for conversion by improving UX, sharpening messaging clarity, and fixing lead capture — so more of your traffic becomes pipeline.',
    phase: 2,
    week: 'Week 5–7',
    outcomes: [
      'Full CRO audit completed',
      'Landing page improvements prioritized and deployed',
      'Lead capture forms and CTAs optimized',
      'Core Web Vitals benchmarked and improved',
    ],
    effort: 'high',
  },
  {
    id: 'crm-cleanup',
    title: 'CRM / Lead Flow Cleanup',
    description:
      'Clean up your CRM, fix broken lead flow processes, and ensure no prospect falls through the cracks from first touch to closed deal.',
    phase: 2,
    week: 'Week 5–6',
    outcomes: [
      'CRM data cleaned, deduped, and enriched',
      'Lead routing rules reviewed and corrected',
      'Pipeline stages aligned to sales process',
      'Lead scoring model implemented',
    ],
    effort: 'medium',
  },
  {
    id: 'local-seo',
    title: 'Local SEO / GEO Optimization',
    description:
      'Dominate local search results with a focused local SEO strategy covering your Google Business Profile, citations, reviews, and geo-targeted content.',
    phase: 2,
    week: 'Week 6–8',
    outcomes: [
      'Google Business Profile fully optimized',
      'Local citation consistency audited and fixed',
      'Local keyword strategy deployed on site',
      'Automated review generation system in place',
    ],
    effort: 'medium',
  },
  {
    id: 'conversion-optimization',
    title: 'Conversion Optimization',
    description:
      'Systematically test and optimize conversion rates across your key marketing funnels so you extract more value from existing traffic and spend.',
    phase: 3,
    week: 'Week 9–11',
    outcomes: [
      'A/B testing framework established',
      'Top 3 conversion bottlenecks identified and addressed',
      'Full funnel analysis completed',
      'CRO wins documented and rolled out site-wide',
    ],
    effort: 'medium',
  },
  {
    id: 'email-automation',
    title: 'Lifecycle / Email Automation',
    description:
      'Build automated email sequences that nurture leads and retain customers at every stage of their lifecycle — from welcome to re-engagement.',
    phase: 3,
    week: 'Week 9–10',
    outcomes: [
      'Welcome and onboarding sequence deployed',
      'Lead nurture workflow built and activated',
      'Re-engagement campaign live',
      'Lifecycle stage triggers and segments defined',
    ],
    effort: 'medium',
  },
  {
    id: 'attribution-cleanup',
    title: 'Attribution / Reporting Cleanup',
    description:
      'Fix your marketing attribution model to accurately measure cross-channel ROI, eliminate wasted spend, and give leadership clear visibility into results.',
    phase: 3,
    week: 'Week 11–12',
    outcomes: [
      'Attribution model defined and implemented',
      'Cross-channel reporting unified in one view',
      'ROI by channel calculated and benchmarked',
      'Budget optimization recommendations delivered',
    ],
    effort: 'high',
  },
];

/** Stable list of module ids — use when initializing scores or iterating rules. */
export const ALL_MODULE_IDS: string[] = ALL_MODULES.map((m) => m.id);
