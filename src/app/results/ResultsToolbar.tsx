'use client';

import { useCallback, useState } from 'react';
import type { IntakeAnswers } from '@/lib/types';
import { encodeIntakeAnswersCompact } from '@/lib/encode-answers';
import * as styles from './page.css';

interface ResultsToolbarProps {
  answers: IntakeAnswers;
}

export default function ResultsToolbar({ answers }: ResultsToolbarProps) {
  const [copied, setCopied] = useState(false);

  const copyShareLink = useCallback(() => {
    const q = encodeURIComponent(encodeIntakeAnswersCompact(answers));
    const url = `${window.location.origin}/results?q=${q}`;
    void navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      },
      () => {
        window.prompt('Copy this share link:', url);
      },
    );
  }, [answers]);

  return (
    <div className={styles.resultsToolbar}>
      <div className={styles.toolbarActions}>
        <button type="button" className={styles.toolbarButton} onClick={() => window.print()}>
          Save PDF / Print
        </button>
        <button type="button" className={styles.toolbarButtonSecondary} onClick={copyShareLink}>
          {copied ? 'Link copied' : 'Copy share link'}
        </button>
      </div>
      <span className={styles.toolbarHint}>
        Share links use a compact <code className={styles.toolbarCode}>?q=</code> code (no database).
        Recipients see the same roadmap. Legacy <code className={styles.toolbarCode}>?answers=</code>{' '}
        URLs still work.
      </span>
    </div>
  );
}
