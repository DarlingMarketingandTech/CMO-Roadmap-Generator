import type { IntakeAnswers, Flags } from './types';

/**
 * Maps intake answers → flags. Keep each rule a single readable expression
 * so PMs and engineers can trace “answer X → flag Y → scoring rule Z”.
 */
export function computeFlags(answers: IntakeAnswers): Flags {
  return {
    isPreLaunch: answers.businessStage === 'pre-launch',
    isFounderOnly: answers.teamCapacity === 'founder-only',
    hasMessyStack: answers.stackMaturity === 'messy' || answers.stackMaturity === 'none',
    needsBrandClarity: answers.bottleneck === 'unclear-messaging',
    needsLeadGen: answers.primaryGoal === 'more-leads' || answers.bottleneck === 'no-leads',
    needsBookings: answers.primaryGoal === 'more-bookings',
    needsROIClarity:
      answers.primaryGoal === 'roi-clarity' || answers.bottleneck === 'no-reporting',
    isLocalOrHealthcare:
      answers.businessType === 'local-service' || answers.businessType === 'healthcare',
    hasActiveChannels:
      answers.activeChannels.length > 0 && !answers.activeChannels.includes('none'),
    isEarlyStage: answers.businessStage === 'early' || answers.businessStage === 'pre-launch',
    needsConversionLift: answers.bottleneck === 'poor-conversion',
    isEcommerce: answers.businessType === 'ecommerce',
    needsWorkflowRelief: answers.bottleneck === 'team-capacity',
  };
}
