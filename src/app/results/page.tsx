import { notFound } from 'next/navigation';
import { composeRoadmap } from '@/lib/compose-roadmap';
import { contactForRoadmap } from '@/lib/contact-cta';
import { parseIntakeAnswersFromResultsParams } from '@/lib/encode-answers';
import { roadmapPreview } from '@/lib/roadmap-preview';
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
  const contact = contactForRoadmap(roadmap);

  // D18: only the short version crosses to the client. The full plan is sent by email.
  return (
    <ResultsDisplay
      preview={roadmapPreview(roadmap)}
      roadmapToken={parsed.token}
      contact={contact}
      ownerGetsCopy={Boolean(process.env.LEAD_NOTIFY_EMAIL?.trim())}
    />
  );
}
