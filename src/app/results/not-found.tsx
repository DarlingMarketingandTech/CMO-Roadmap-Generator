import Link from 'next/link';
import SiteFooter from '@/components/brand/SiteFooter';
import SiteHeader from '@/components/brand/SiteHeader';
import styles from './page.module.css';

/**
 * Rendered with HTTP 404 when a results URL has no roadmap input or the
 * input fails the shared intake contract. Links never expire; they are
 * invalid or incomplete.
 */
export default function ResultsNotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main id="main" className={styles.errorState}>
        <h1 className={styles.errorTitle}>This plan link is invalid or incomplete</h1>
        <p className={styles.errorDesc}>
          We could not load a plan from this link. It may have been cut off when it was copied.
          Open the full link again, or answer the questions to make a new plan.
        </p>
        <Link href="/intake" className={styles.errorLink}>
          Start the questions →
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
