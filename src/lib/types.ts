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

export interface IntakeAnswers {
  businessType: BusinessType;
  businessStage: BusinessStage;
  primaryGoal: PrimaryGoal;
  bottleneck: Bottleneck;
  activeChannels: ActiveChannels;
  stackMaturity: StackMaturity;
  teamCapacity: TeamCapacity;
}

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

export interface Roadmap {
  phases: RoadmapPhase[];
  topPriorities: string[];
  primaryService: ServiceRecommendation;
  secondaryService: ServiceRecommendation;
  whyThisRoadmap: string;
  answers: IntakeAnswers;
}
