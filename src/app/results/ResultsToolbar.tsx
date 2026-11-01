'use client';

import { useCallback, useState } from 'react';
import styles from './page.module.css';

interface ResultsToolbarProps {
  /** Canonical compact token for these answers. */
  roadmapToken: string;
}

export default function ResultsToolbar({ roadmapToken }: ResultsToolbarProps) {
  const [copied, setCopied] = useState(false);

  const copyShareLink = useCallback(() => {
    const url = `${window.location.origin}/results?q=${encodeURIComponent(roadmapToken)}`;
    void navigator.clipboard.writeText(url).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      },
      () => {
        window.prompt('Copy this share link:', url);
      },
    );
  }, [roadmapToken]);

  return (
    <div className={styles.resultsToolbar}>
      <div className={styles.toolbarActions}>
        <button type="button" className={styles.toolbarButtonSecondary} onClick={copyShareLink}>
          {copied ? 'Link copied' : 'Copy share link'}
        </button>
      </div>
      <span className={styles.toolbarHint}>Anyone with the link sees this summary.</span>
    </div>
  );
}
