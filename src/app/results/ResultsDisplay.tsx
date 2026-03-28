'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Roadmap } from '@/lib/types';
import * as styles from './page.css';

interface ResultsDisplayProps {
  roadmap: Roadmap;
}

const PHASE_LABELS: Record<number, string> = {
  1: 'Phase 1',
  2: 'Phase 2',
  3: 'Phase 3',
};

export default function ResultsDisplay({ roadmap }: ResultsDisplayProps) {
  const { phases, topPriorities, primaryService, secondaryService, whyThisRoadmap } = roadmap;

  return (
    <div className={styles.page}>
      {/* ─── HEADER ─── */}
      <header className={styles.pageHeader}>
        <motion.div
          className={styles.headerInner}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
        >
          <span className={styles.headerEyebrow}>Your Personalized Plan</span>
          <h1 className={styles.headerTitle}>Your 90-Day Marketing Roadmap</h1>
          <p className={styles.headerSubtitle}>
            A phased, prioritized marketing plan built specifically for your business — ready to
            execute starting today.
          </p>
        </motion.div>
      </header>

      <div className={styles.body}>
        <div className={styles.container}>
          {/* ─── TOP PRIORITIES ─── */}
          <motion.section
            className={styles.prioritiesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className={styles.sectionTag}>Start Here</span>
            <h2 className={styles.sectionTitle}>Your Top 3 Priorities</h2>
            <div className={styles.prioritiesGrid}>
              {topPriorities.map((title, i) => (
                <div key={title} className={styles.priorityCard}>
                  <div className={styles.priorityNumber}>0{i + 1}</div>
                  <div className={styles.priorityTitle}>{title}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── PHASES ─── */}
          <motion.section
            className={styles.phasesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <span className={styles.sectionTag}>Your Roadmap</span>
            <h2 className={styles.sectionTitle}>90-Day Execution Plan</h2>

            <div className={styles.phasesTimeline}>
              {phases.map((phase) => (
                <div key={phase.phase} className={styles.phaseBlock}>
                  {/* Phase header */}
                  <div className={styles.phaseHeader[phase.phase]}>
                    <div>
                      <div className={styles.phaseLabel}>{PHASE_LABELS[phase.phase]}</div>
                      <div className={styles.phaseName}>{phase.title}</div>
                    </div>
                    <div className={styles.phaseDays}>{phase.days}</div>
                  </div>

                  {/* Modules */}
                  <div className={styles.phaseModules}>
                    {phase.modules.map((mod) => (
                      <div key={mod.id} className={styles.moduleCard}>
                        <div className={styles.moduleHeader}>
                          <div className={styles.moduleTitle}>{mod.title}</div>
                          <div className={styles.moduleMeta}>
                            <span className={styles.moduleWeek}>{mod.week}</span>
                            <span className={styles.effortBadge[mod.effort]}>
                              {mod.effort.charAt(0).toUpperCase() + mod.effort.slice(1)} effort
                            </span>
                          </div>
                        </div>
                        <p className={styles.moduleDescription}>{mod.description}</p>
                        <div className={styles.outcomesLabel}>Expected Outcomes</div>
                        <ul className={styles.outcomesList}>
                          {mod.outcomes.map((outcome) => (
                            <li key={outcome} className={styles.outcomeItem}>
                              <span className={styles.outcomeDot} />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── WHY THIS ROADMAP ─── */}
          <motion.div
            className={styles.whySection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className={styles.whyTitle}>Why This Roadmap</div>
            <p className={styles.whyText}>{whyThisRoadmap}</p>
          </motion.div>

          {/* ─── SERVICES ─── */}
          <motion.section
            className={styles.servicesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={styles.sectionTag}>Next Steps</span>
            <h2 className={styles.sectionTitle}>Recommended Services</h2>
            <div className={styles.servicesGrid}>
              {/* Primary */}
              <div className={styles.serviceCardPrimary}>
                <div className={styles.serviceBadge}>Primary Recommendation</div>
                <div className={styles.serviceTitle}>{primaryService.title}</div>
                <p className={styles.serviceDesc}>{primaryService.description}</p>
              </div>
              {/* Secondary */}
              <div className={styles.serviceCard}>
                <div className={styles.serviceSecondaryBadge}>Also Consider</div>
                <div className={styles.serviceTitle}>{secondaryService.title}</div>
                <p className={styles.serviceDesc}>{secondaryService.description}</p>
              </div>
            </div>
          </motion.section>

          {/* ─── CTA ─── */}
          <motion.div
            className={styles.ctaSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className={styles.ctaTitle}>Ready to Get Started?</div>
            <p className={styles.ctaDesc}>
              Book a strategy conversation and we will help you execute this roadmap with expert
              guidance every step of the way.
            </p>
            <a href="mailto:strategy@example.com" className={styles.ctaButton}>
              Book a Strategy Conversation
            </a>
            <div>
              <Link href="/" className={styles.ctaSecondary}>
                ← Start Over
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className={styles.pageFooter}>
        <p>CMO Roadmap Generator · © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
