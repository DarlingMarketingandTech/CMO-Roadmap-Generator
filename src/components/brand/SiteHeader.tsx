import type { ReactNode } from 'react';
import { mainSiteUrl } from '@/lib/site';
import styles from './SiteChrome.module.css';

interface SiteHeaderProps {
  /** Optional status on the right, such as the intake step counter. */
  aside?: ReactNode;
}

/** Brand header with the owner's logo and a visible link back to the main website. */
export default function SiteHeader({ aside }: SiteHeaderProps) {
  const site = mainSiteUrl();
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href={site} className={styles.logoLink} aria-label="Darling MarTech website">
          {/* Owner DM logo, horizontal lockup at 2x display size. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-horizontal.png" width={201} height={48} alt="" />
        </a>
        <div className={styles.headerAside}>
          {aside}
          <a href={site} className={styles.backLink}>
            <span aria-hidden="true">←</span> Darling MarTech site
          </a>
        </div>
      </div>
    </header>
  );
}
