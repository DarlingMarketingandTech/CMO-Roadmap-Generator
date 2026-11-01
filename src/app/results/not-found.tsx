import Link from 'next/link';
import styles from './page.module.css';

/**
 * Rendered with HTTP 404 when a results URL has no roadmap input or the
 * input fails the shared intake contract. Links never expire; they are
 * invalid or incomplete.
 */
export default function ResultsNotFound() {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorTitle}>This Roadmap Link Is Invalid or Incomplete</div>
      <p className={styles.errorDesc}>
        We could not load a roadmap from this URL. Open a complete share link using the
        compact <code className={styles.inlineCode}>?q=</code> or legacy{' '}
        <code className={styles.inlineCode}>?answers=</code> format, or retake the
        assessment to generate a new plan.
      </p>
      <Link href="/intake" className={styles.errorLink}>
        Take the Assessment →
      </Link>
    </div>
  );
}
