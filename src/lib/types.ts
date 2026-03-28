export type BusinessType =
  | 'b2b-saas'
  | 'local-service'
  | 'healthcare'
  | 'ecommerce'
  | 'professional-service'
  | 'agency'
  | 'nonprofit'
  | 'other';

export type BusinessStage =
  | 'pre-launch'
  | 'early'
  | 'growth'
  | 'established'
  | 'enterprise';

export type PrimaryGoal =
  | 'more-leads'
  | 'more-bookings'
  | 'roi-clarity'
  | 'brand-awareness'
  | 'retention'
  | 'launch';

export type Bottleneck =
  | 'unclear-messaging'
  | 'no-leads'
  | 'messy-stack'
  | 'poor-conversion'
  | 'no-reporting'
  | 'team-capacity';

export type ActiveChannel =
  | 'seo'
  | 'paid-search'
  | 'social-media'
  | 'email'
  | 'content'
  | 'events'
  | 'referral'
  | 'none';

export type ActiveChannels = ActiveChannel[];

export type StackMaturity = 'none' | 'basic' | 'messy' | 'solid' | 'advanced';

export type TeamCapacity =
  | 'founder-only'
  | 'small-team'
  | 'dedicated-marketer'
  | 'full-team';

/** Vertical lens derived from `businessType` (see `industry.ts`). */
export type IndustrySegment =
  | 'healthcare'
  | 'legal'
  | 'local'
  | 'saas'
  | 'ecommerce'
  | 'general';

export interface IntakeAnswers {
  businessType: BusinessType;
  businessStage: BusinessStage;
  primaryGoal: PrimaryGoal;
  bottleneck: Bottleneck;
  activeChannels: ActiveChannels;
  stackMaturity: StackMaturity;
  teamCapacity: TeamCapacity;
}

/**
 * Derived booleans from raw answers. Used by scoring, services, and explainability.
 * Add new flags here when new intake dimensions should drive the engine.
 */
export interface Flags {
  isPreLaunch: boolean;
  isFounderOnly: boolean;
  hasMessyStack: boolean;
  needsBrandClarity: boolean;
  needsLeadGen: boolean;
  needsBookings: boolean;
  needsROIClarity: boolean;
  isLocalOrHealthcare: boolean;
  hasActiveChannels: boolean;
  isEarlyStage: boolean;
  /** Poor on-site or funnel conversion (bottleneck). */
  needsConversionLift: boolean;
  /** E-commerce / DTC — used to weight conversion and lifecycle work. */
  isEcommerce: boolean;
  /** Bandwidth constraint — prioritize systems that reduce manual work. */
  needsWorkflowRelief: boolean;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  phase: 1 | 2 | 3;
  week: string;
  outcomes: string[];
  effort: 'low' | 'medium' | 'high';
}

export interface RoadmapPhase {
  phase: 1 | 2 | 3;
  title: string;
  days: string;
  modules: RoadmapModule[];
}

export interface ServiceRecommendation {
  title: string;
  description: string;
  isPrimary: boolean;
}

/** Suggested way to engage (fixed scope, audit, retainer, etc.). */
export interface RecommendedEngagement {
  title: string;
  description: string;
}

export type EngagementFormatType = 'audit-advisory' | 'project-build' | 'embedded-fractional';

/** High-level engagement shape (audit vs build vs embedded). */
export interface EngagementFormatRecommendation {
  format: EngagementFormatType;
  title: string;
  rationale: string;
}

/** Service-specific commercial CTA on the results page. */
export interface PrimaryCta {
  headline: string;
  buttonLabel: string;
  mailtoSubject: string;
  mailtoBodyIntro: string;
}

export interface InfluentialAnswer {
  questionLabel: string;
  answerLabel: string;
  /** Plain-language link to how this shaped the roadmap. */
  impact: string;
}

export interface FlagExplanation {
  id: keyof Flags;
  label: string;
  description: string;
}

export interface PriorityTrackScore {
  moduleId: string;
  title: string;
  score: number;
}

export interface RoadmapExplainability {
  influentialAnswers: InfluentialAnswer[];
  triggeredFlags: FlagExplanation[];
  topPriorityTracks: PriorityTrackScore[];
  /** Short bullets for PDF / print — non-technical. */
  whySummaryBullets: string[];
}

export interface BusinessSummary {
  headline: string;
  details: { label: string; value: string }[];
}

export interface Roadmap {
  phases: RoadmapPhase[];
  topPriorities: string[];
  primaryService: ServiceRecommendation;
  secondaryService: ServiceRecommendation;
  /** Time-boxed next step (sprint / program framing). */
  recommendedEngagement: RecommendedEngagement;
  /** Audit vs project vs fractional — orthogonal to service line. */
  engagementFormat: EngagementFormatRecommendation;
  whyThisRoadmap: string;
  explainability: RoadmapExplainability;
  businessSummary: BusinessSummary;
  executiveSummary: string;
  watchOuts: string[];
  industrySegment: IndustrySegment;
  primaryCta: PrimaryCta;
  answers: IntakeAnswers;
}

/** Raw scores before ordering and cap — useful for tests and tuning. */
export type ModuleScoreMap = Record<string, number>;
