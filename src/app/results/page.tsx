import Link from 'next/link';
import { composeRoadmap } from '@/lib/compose-roadmap';
import type { IntakeAnswers } from '@/lib/types';
import ResultsDisplay from './ResultsDisplay';
import * as styles from './page.css';

interface ResultsPageProps {
  searchParams: Promise<{ answers?: string | string[] }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const answersParam = params.answers;

  if (!answersParam || typeof answersParam !== 'string') {
    return <ErrorState />;
  }

  try {
    const json = Buffer.from(decodeURIComponent(answersParam), 'base64').toString('utf-8');
    const answers = JSON.parse(json) as IntakeAnswers;

    // Basic validation
    if (
      !answers.businessType ||
      !answers.businessStage ||
      !answers.primaryGoal ||
      !answers.bottleneck ||
      !answers.stackMaturity ||
      !answers.teamCapacity
    ) {
      return <ErrorState />;
    }

    if (!answers.activeChannels) {
      answers.activeChannels = [];
    }

    const roadmap = composeRoadmap(answers);
    return <ResultsDisplay roadmap={roadmap} />;
  } catch {
    return <ErrorState />;
  }
}

function ErrorState() {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorTitle}>Something Went Wrong</div>
      <p className={styles.errorDesc}>
        We could not generate your roadmap. This usually happens if you navigated here directly or
        your session expired.
      </p>
      <Link href="/intake" className={styles.errorLink}>
        Take the Assessment →
      </Link>
    </div>
  );
}
