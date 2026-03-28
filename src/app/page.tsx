'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import BrandWordmark from '@/components/brand/BrandWordmark';
import { DEMO_PROFILES, demoResultsHref } from '@/lib/demo-profiles';
import {
  containerVariants,
  itemVariants,
  springEntrance,
  springStandard,
  viewportOnce,
} from '@/lib/motion';
import styles from './page.module.css';

const STEPS = [
  {
    number: '1',
    title: 'Answer 7 questions',
    description:
      'I map business type, stage, goals, and capacity in under three minutes — no account wall.',
  },
  {
    number: '2',
    title: 'Get a phased 90-day plan',
    description:
      'A rules engine scores modules from your answers and assembles phases — same inputs, same roadmap, every time.',
  },
  {
    number: '3',
    title: 'Execute with clear priorities',
    description:
      'You leave with ordered work, effort signals, expected outcomes, and how I’d engage if you want hands-on help.',
  },
];

const AUDIENCES = [
  {
    icon: '🏢',
    title: 'SMB owners',
    description:
      'A prioritized quarter plan without a full-time CMO hire — you see what to ship first and what can wait.',
  },
  {
    icon: '📈',
    title: 'Marketing directors',
    description:
      'A structured 90-day narrative for leadership: budget justification, sequencing, and proof of progress.',
  },
  {
    icon: '🚀',
    title: 'Growth-stage teams',
    description:
      'Systems thinking for scale — fewer random campaigns, more repeatable infrastructure tied to revenue.',
  },
];

const DELIVERABLES = [
  '3-phase, 90-day marketing roadmap',
  'Prioritized top 3 actions for the next 30 days',
  'Primary and supporting service recommendations (Darling MarTech–aligned)',
  'Recommended engagement shape and sprint / program',
  '“Why this roadmap” narrative plus answer, flag, and track transparency',
  'Business summary snapshot for stakeholders',
  'Phase-by-phase module breakdown',
  'Expected outcomes per module',
  'Effort level per initiative',
  'Save as PDF via print',
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTopBar}>
          <BrandWordmark size="large" />
        </div>

        <div className={styles.heroGrid}>
          <motion.div
            className={styles.heroInner}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springEntrance}
          >
            <span className={styles.heroEyebrow}>Free tool · Darling MarTech</span>
            <h1 className={styles.heroTitle}>Your next 90 days, mapped.</h1>
            <p className={styles.heroAccentLine}>Built for operators who need clarity, not another slide deck.</p>
            <p className={styles.heroSubtitle}>
              I built this so you can translate where you are today into a phased plan — stage, goal,
              bottleneck, and team capacity included.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/intake" className={styles.heroCta}>
                Generate my roadmap →
              </Link>
            </motion.div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>7</div>
                <div className={styles.heroStatLabel}>Questions</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>~3</div>
                <div className={styles.heroStatLabel}>Minutes</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.heroStatValue}>90</div>
                <div className={styles.heroStatLabel}>Day horizon</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springStandard, delay: 0.08 }}
            aria-hidden
          >
            <div className={styles.heroVisualFrame} />
            <div className={styles.heroVisualAccent} />
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.stepsLayout}>
            <motion.div
              className={styles.stepsIntro}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={springEntrance}
            >
              <span className={styles.sectionTag}>How it works</span>
              <h2 className={styles.sectionTitle}>From intake to roadmap</h2>
              <p className={styles.sectionDesc}>
                No black box — you can see what drove the plan. I use this same rigor on client work;
                the tool is the public slice.
              </p>
            </motion.div>

            <motion.div
              className={styles.stepsList}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {STEPS.map((step) => (
                <motion.article
                  key={step.number}
                  className={`card ${styles.stepCard}`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.stepNumber}>{step.number}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={`${styles.sectionHeader} ${styles.sectionHeaderCenter}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={springEntrance}
          >
            <span className={styles.sectionTag}>Who it fits</span>
            <h2 className={styles.sectionTitle}>If you own outcomes, this is for you</h2>
            <p className={styles.sectionDesc}>
              Founders, marketing leads, and growth teams use it the same way — to force rank what
              matters before spend hits the channel.
            </p>
          </motion.div>

          <div className={styles.audienceGrid}>
            {AUDIENCES.map((audience, i) => (
              <motion.div
                key={audience.title}
                className={`card ${styles.audienceCard} ${i === 2 ? styles.audienceCardWide : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ ...springEntrance, delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.audienceIcon}>{audience.icon}</div>
                <h3 className={styles.audienceTitle}>{audience.title}</h3>
                <p className={styles.audienceDesc}>{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={springEntrance}
          >
            <span className={styles.sectionTag}>Try it now</span>
            <h2 className={styles.sectionTitle}>Sample profiles</h2>
            <p className={styles.sectionDesc}>
              Open a full roadmap in one click — useful for demos or sanity-checking rule branches.
              You can also replay the same data through the wizard.
            </p>
          </motion.div>

          <div className={styles.demoGrid}>
            {DEMO_PROFILES.map((profile, i) => (
              <motion.article
                key={profile.id}
                className={`card ${styles.demoCard}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ ...springEntrance, delay: i * 0.06 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className={styles.demoCardTitle}>{profile.title}</h3>
                <p className={styles.demoCardBlurb}>{profile.blurb}</p>
                <div className={styles.demoCardActions}>
                  <Link href={demoResultsHref(profile)} className={styles.demoLinkPrimary}>
                    View roadmap →
                  </Link>
                  <Link href={`/intake?demo=${profile.id}`} className={styles.demoLinkSecondary}>
                    Walk through intake
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={`${styles.sectionHeader} ${styles.sectionHeaderCenter}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={springEntrance}
          >
            <span className={styles.sectionTag}>Deliverables</span>
            <h2 className={styles.sectionTitle}>What you get on the results page</h2>
            <p className={styles.sectionDesc}>
              Everything below is generated from your answers — built to share internally or forward
              as a pre-call brief.
            </p>
          </motion.div>

          <motion.div
            className={styles.deliverablesGrid}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ ...springEntrance, delay: 0.05 }}
          >
            {DELIVERABLES.map((item) => (
              <div key={item} className={`card ${styles.deliverableItem}`}>
                <div className={styles.deliverableCheck}>✓</div>
                <span className={styles.deliverableText}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <motion.div
            className={styles.finalCtaInner}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={springEntrance}
          >
            <h2 className={styles.finalCtaTitle}>Ready when you are</h2>
            <p className={styles.finalCtaDesc}>
              Under three minutes, no email gate for the on-page plan. If you want it in your inbox
              afterward, that option is on the results screen.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/intake" className={styles.ctaButton}>
                Generate my roadmap →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className={styles.footer}>
        <BrandWordmark href="/" size="compact" />
        <p className={styles.footerTagline}>
          © {new Date().getFullYear()} Jacob Darling · Darling MarTech — roadmap generator embed
        </p>
      </footer>
    </div>
  );
}
