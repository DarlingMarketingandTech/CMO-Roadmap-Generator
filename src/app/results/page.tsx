import Link from 'next/link';
import { composeRoadmap } from '@/lib/compose-roadmap';
import { parseIntakeAnswersFromResultsParams } from '@/lib/encode-answers';
import ResultsDisplay from './ResultsDisplay';
import styles from './page.module.css';

interface ResultsPageProps {
  searchParams: Promise<{ q?: string | string[]; answers?: string | string[] }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const parsed = parseIntakeAnswersFromResultsParams(params);

  if (!parsed) {
    return <ErrorState />;
  }

  const roadmap = composeRoadmap(parsed.answers);

  return <ResultsDisplay roadmap={roadmap} roadmapToken={parsed.token} />;
}

function ErrorState() {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorTitle}>Something Went Wrong</div>
      <p className={styles.errorDesc}>
        We could not load your roadmap. Open a valid share link, use the compact{' '}
        <code className={styles.inlineCode}>?q=</code> or legacy{' '}
        <code className={styles.inlineCode}>?answers=</code> URL, or retake the assessment.
      </p>
      <Link href="/intake" className={styles.errorLink}>
        Take the Assessment →
      </Link>
    </div>
  );
}
