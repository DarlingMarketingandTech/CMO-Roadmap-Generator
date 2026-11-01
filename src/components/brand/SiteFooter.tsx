import { mainSiteContactUrl, mainSiteUrl } from '@/lib/site';
import styles from './SiteChrome.module.css';

export default function SiteFooter() {
  const site = mainSiteUrl();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a href={site} className={styles.footerLogo} aria-label="Darling MarTech website">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-stacked-cream.png" width={160} height={79} alt="" />
        </a>
        <nav className={styles.footerNav} aria-label="Darling MarTech">
          <a href={site}>Visit the Darling MarTech website</a>
          <a href={mainSiteContactUrl()}>Contact</a>
        </nav>
        <p className={styles.footerNote}>
          90-day marketing plan tool · © {new Date().getFullYear()} Darling MarTech LLC
        </p>
      </div>
    </footer>
  );
}
