import { Suspense } from 'react';
import SiteHeader from '@/components/brand/SiteHeader';
import IntakeForm from './IntakeForm';
import styles from './page.module.css';

function IntakeFallback() {
  return (
    <div className={styles.pageWrapper}>
      <SiteHeader />
      <main id="main" className={styles.main}>
        <p className={`${styles.questionDesc} ${styles.centerText}`}>
          Loading assessment…
        </p>
      </main>
    </div>
  );
}

export default function IntakePage() {
  return (
    <Suspense fallback={<IntakeFallback />}>
      <IntakeForm />
    </Suspense>
  );
}
