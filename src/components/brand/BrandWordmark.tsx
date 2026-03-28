import Link from 'next/link';
import styles from './BrandWordmark.module.css';

type BrandWordmarkProps = {
  href?: string;
  size?: 'default' | 'compact' | 'large';
  className?: string;
};

export default function BrandWordmark({
  href = '/intake',
  size = 'default',
  className,
}: BrandWordmarkProps) {
  const sizeClass =
    size === 'compact' ? styles.compact : size === 'large' ? styles.large : '';
  const root = [styles.wordmark, sizeClass, className].filter(Boolean).join(' ');

  const inner = (
    <>
      <span className={styles.darling}>Darling</span>
      <span className={styles.martech}>MarTech</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={root}>
        {inner}
      </Link>
    );
  }

  return <span className={root}>{inner}</span>;
}
