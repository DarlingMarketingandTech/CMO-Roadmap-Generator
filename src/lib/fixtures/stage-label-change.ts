import type { Roadmap } from '../types';

/**
 * D17 renamed the stage answers. Saved baselines predate that change, so tests
 * apply exactly this rename to a saved roadmap before comparing. Scores, module
 * order, phases, services, and every other string must still match.
 */
export const CMO_007_STAGE_LABELS: Record<string, string> = {
  'Pre-Launch': 'Getting ready to open',
  'Early Stage': 'Just getting started',
  'Growth Stage': 'Steady and ready to grow',
  Established: 'Well established',
};

export function withCmo007StageLabels(saved: Roadmap): Roadmap {
  const [type, stage] = saved.businessSummary.headline.split(' · ');
  return {
    ...saved,
    businessSummary: {
      ...saved.businessSummary,
      headline: `${type} · ${CMO_007_STAGE_LABELS[stage] ?? stage}`,
    },
    explainability: {
      ...saved.explainability,
      influentialAnswers: saved.explainability.influentialAnswers.map((row) =>
        row.questionLabel === 'Stage'
          ? { ...row, answerLabel: CMO_007_STAGE_LABELS[row.answerLabel] ?? row.answerLabel }
          : row,
      ),
    },
  };
}
