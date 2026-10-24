import { notFound } from 'next/navigation';
import { composeRoadmap } from '@/lib/compose-roadmap';
import { parseIntakeAnswersFromResultsParams } from '@/lib/encode-answers';
import ResultsDisplay from './ResultsDisplay';

interface ResultsPageProps {
  searchParams: Promise<{ q?: string | string[]; answers?: string | string[] }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const parsed = parseIntakeAnswersFromResultsParams(params);

  if (!parsed) {
    // A missing or malformed roadmap link is a document that does not exist.
    // notFound() renders ./not-found.tsx with HTTP 404 instead of a 200 error view.
    notFound();
  }

  const roadmap = composeRoadmap(parsed.answers);

  return <ResultsDisplay roadmap={roadmap} roadmapToken={parsed.token} />;
}
