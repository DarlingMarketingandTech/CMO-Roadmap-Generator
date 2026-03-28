import { decodeIntakeAnswersCompact, decodeIntakeAnswersLegacy } from '../encode-answers';
import type { IntakeAnswers } from '../types';

/**
 * Decodes the client-provided token (compact `q` or legacy `answers` base64 JSON)
 * so the API can recompute the roadmap server-side — same pipeline as the results page.
 */
export function decodeRoadmapToken(token: string): IntakeAnswers | null {
  const t = token.trim();
  if (!t) return null;
  return decodeIntakeAnswersCompact(t) ?? decodeIntakeAnswersLegacy(t);
}
