import { Suspense } from 'react';
import IntakeForm from './IntakeForm';
import * as styles from './page.css';

function IntakeFallback() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <span className={styles.headerBrand}>CMO Roadmap Generator</span>
      </header>
      <main className={styles.main}>
        <p className={styles.questionDesc} style={{ textAlign: 'center' }}>
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
