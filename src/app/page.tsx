'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import * as styles from './page.css';

const STEPS = [
  {
    number: '1',
    title: 'Answer 7 Questions',
    description:
      'Tell us about your business type, stage, goals, and current marketing situation in under 3 minutes.',
  },
  {
    number: '2',
    title: 'Get Your Personalized Roadmap',
    description:
      'Our system analyzes your answers and generates a custom 90-day marketing roadmap built for your situation.',
  },
  {
    number: '3',
    title: 'Execute With Confidence',
    description:
      'Follow your phased plan with clear priorities, effort levels, expected outcomes, and service recommendations.',
  },
];

const AUDIENCES = [
  {
    icon: '🏢',
    title: 'SMB Owners',
    description:
      'Get a clear, prioritized marketing plan without hiring a full-time CMO. Know exactly what to focus on this quarter.',
  },
  {
    icon: '📈',
    title: 'Marketing Directors',
    description:
      'Build a structured 90-day execution plan to align with leadership, justify budget, and show measurable progress.',
  },
  {
    icon: '🚀',
    title: 'Growth-Stage Companies',
    description:
      "Scale your marketing systematically. Stop guessing and start following a plan that's built for your specific stage.",
  },
];

const DELIVERABLES = [
  '3-phase, 90-day marketing roadmap',
  'Prioritized top 3 actions to take first',
  'Primary service recommendation',
  'Secondary service recommendation',
  'Personalized roadmap explanation',
  'Phase-by-phase module breakdown',
  'Expected outcomes per module',
  'Effort level for each initiative',
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' as const }}
        >
          <span className={styles.heroEyebrow}>Free Marketing Strategy Tool</span>
          <h1 className={styles.heroTitle}>
            Build Your 90-Day
            <br />
            Marketing Roadmap
          </h1>
          <p className={styles.heroSubtitle}>
            Answer 7 questions and get a personalized, phased marketing plan tailored to your
            business stage, primary goal, and team capacity.
          </p>
          <Link href="/intake" className={styles.heroCta}>
            Generate My Roadmap →
          </Link>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>7</div>
              <div className={styles.heroStatLabel}>Questions</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>3</div>
              <div className={styles.heroStatLabel}>Minutes</div>
            </div>
            <div className={styles.heroStat}>
              <div className={styles.heroStatValue}>90</div>
              <div className={styles.heroStatLabel}>Day Plan</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className={styles.sectionLight}>
        <motion.div
          className={styles.containerNarrow}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <span className={styles.sectionTag}>Simple Process</span>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionDesc}>
            Our intelligent roadmap generator analyzes your specific situation and creates a
            prioritized plan built for your business — in seconds.
          </p>
        </motion.div>
        <div className={styles.container}>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const }}
              >
                <div className={styles.stepNumber}>{step.number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO IT'S FOR ─── */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.div
            style={{ textAlign: 'center', marginBottom: '48px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionTag}>Who It's For</span>
            <h2 className={styles.sectionTitleLight}>Built for Business Leaders</h2>
            <p className={styles.sectionDescLight}>
              Whether you are a founder wearing every hat or a seasoned marketing director, this
              tool delivers a roadmap calibrated to your reality.
            </p>
          </motion.div>

          <div className={styles.audienceGrid}>
            {AUDIENCES.map((audience, i) => (
              <motion.div
                key={audience.title}
                className={styles.audienceCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.audienceIcon}>{audience.icon}</div>
                <h3 className={styles.audienceTitle}>{audience.title}</h3>
                <p className={styles.audienceDesc}>{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <motion.div
            className={styles.containerNarrow}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionTag}>Your Deliverables</span>
            <h2 className={styles.sectionTitle}>What You'll Receive</h2>
            <p className={styles.sectionDesc}>
              Every roadmap includes a complete set of strategic outputs you can start acting on
              immediately.
            </p>
          </motion.div>

          <motion.div
            className={styles.deliverablesGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {DELIVERABLES.map((item) => (
              <div key={item} className={styles.deliverableItem}>
                <div className={styles.deliverableCheck}>✓</div>
                <span className={styles.deliverableText}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.finalCta}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.finalCtaTitle}>Ready to Build Your Roadmap?</h2>
          <p className={styles.finalCtaDesc}>
            It takes less than 3 minutes. No email required. Get your personalized 90-day plan
            instantly.
          </p>
          <Link href="/intake" className={styles.ctaButton}>
            Generate My Roadmap →
          </Link>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>CMO Roadmap Generator</div>
        <p>© {new Date().getFullYear()} · Free strategic marketing planning tool</p>
      </footer>
    </div>
  );
}
