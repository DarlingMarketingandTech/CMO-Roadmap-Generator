import type { IntakeAnswers, Flags } from './types';

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
    isEarlyStage:
      answers.businessStage === 'early' || answers.businessStage === 'pre-launch',
  };
}
