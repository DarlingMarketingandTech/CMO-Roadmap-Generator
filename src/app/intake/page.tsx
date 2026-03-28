import { Suspense } from 'react';
import BrandWordmark from '@/components/brand/BrandWordmark';
import IntakeForm from './IntakeForm';
import styles from './page.module.css';

function IntakeFallback() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <BrandWordmark size="compact" />
      </header>
      <main className={styles.main}>
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
