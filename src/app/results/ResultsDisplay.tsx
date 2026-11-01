'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { IndustrySegment } from '@/lib/types';
import type { ContactConversation } from '@/lib/contact-cta';
import type { RoadmapPreview } from '@/lib/roadmap-preview';
import BrandWordmark from '@/components/brand/BrandWordmark';
import { springEntrance } from '@/lib/motion';
import ResultsLeadForm from './ResultsLeadForm';
import ResultsToolbar from './ResultsToolbar';
import styles from './page.module.css';

interface ResultsDisplayProps {
  /** The short version only (D18). The full plan is sent by email. */
  preview: RoadmapPreview;
  /** Canonical compact token for the validated answers shown in this roadmap. */
  roadmapToken: string;
  /** Server-resolved conversation link. The label comes from the starting action. */
  contact: ContactConversation;
  /** True when Darling MarTech receives a copy of each email request. */
  ownerGetsCopy: boolean;
}

const SEGMENT_COPY: Record<IndustrySegment, string> = {
  healthcare: 'Healthcare / regulated marketing lens',
  professional: 'Professional services lens',
  local: 'Local service business lens',
  saas: 'B2B SaaS lens',
  ecommerce: 'E-commerce / DTC lens',
  general: 'Cross-industry baseline',
};

export default function ResultsDisplay({
  preview,
  roadmapToken,
  contact,
  ownerGetsCopy,
}: ResultsDisplayProps) {
  const { headline, executiveSummary, industrySegment, topPriorities, startingAction } = preview;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <motion.div
          className={styles.headerInner}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <span className={styles.headerEyebrow}>{headline}</span>
          <h1 className={styles.headerTitle}>Your 90-day marketing plan: the short version</h1>
          <p className={styles.headerSubtitle}>
            Here is where to start and what matters most. The full plan, with every step in order,
            comes by email.
          </p>
        </motion.div>
      </header>

      <div className={styles.body}>
        <div className={styles.container}>
          <ResultsToolbar roadmapToken={roadmapToken} />

          <div className={styles.printDocumentTitle}>Darling MarTech · 90-day marketing plan summary</div>

          <motion.section
            className={styles.executiveBriefing}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.04 }}
          >
            <div className={styles.executiveLabel}>Summary</div>
            <h2 className={styles.executiveTitle}>What to do first, and why</h2>
            <p className={styles.executiveBody}>{executiveSummary}</p>
            {industrySegment !== 'general' && (
              <div className={styles.industryPill}>{SEGMENT_COPY[industrySegment]}</div>
            )}
          </motion.section>

          <motion.section
            className={styles.prioritiesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.08 }}
          >
            <span className={styles.sectionTag}>Immediate focus</span>
            <h2 className={styles.sectionTitle}>Top 3 priorities</h2>
            <p className={`${styles.leadIntro} ${styles.leadIntroSpaced}`}>
              These are the highest-scored areas for your business, in priority order.
            </p>
            <div className={styles.prioritiesGrid}>
              {topPriorities.map((title, i) => (
                <div key={title} className={styles.priorityCard}>
                  <div className={styles.priorityNumber}>0{i + 1}</div>
                  <div className={styles.priorityTitle}>{title}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {startingAction && (
            <motion.section
              className={styles.startingSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springEntrance, delay: 0.1 }}
            >
              <span className={styles.sectionTag}>First action</span>
              <h2 className={styles.sectionTitle}>Starting action</h2>
              <p className={`${styles.leadIntro} ${styles.leadIntroSpaced}`}>
                {startingAction.moduleTitle}. Do this before the later work in the module.
              </p>
              <div
                className={
                  startingAction.prerequisite ? styles.startingLayout : styles.startingLayoutSingle
                }
              >
                <div className={styles.startingMain}>
                  <div className={styles.startingLabel}>Task</div>
                  <p className={styles.startingBody}>{startingAction.task}</p>
                  <div className={styles.startingLabel}>Output to keep</div>
                  <p className={styles.startingBody}>{startingAction.output}</p>
                  <div className={styles.startingLabel}>Completion</div>
                  {startingAction.completionStates.map((state) => (
                    <div key={state.id} className={styles.startingState}>
                      <div className={styles.startingStateLabel}>{state.label}</div>
                      <p className={styles.startingBody}>{state.requirement}</p>
                    </div>
                  ))}
                  <div className={styles.startingLabel}>Access</div>
                  <p className={styles.startingBody}>{startingAction.access}</p>
                  {startingAction.scopeNote && (
                    <>
                      <div className={styles.startingLabel}>Scope</div>
                      <p className={styles.startingBody}>{startingAction.scopeNote}</p>
                    </>
                  )}
                  <p className={styles.startingEffort}>
                    {startingAction.effortLabel}:{' '}
                    {startingAction.effort.charAt(0).toUpperCase() + startingAction.effort.slice(1)}.
                    This band describes the whole module, not this starting task.
                  </p>
                </div>
                {startingAction.prerequisite && (
                  <aside className={styles.startingPrerequisite}>
                    <div className={styles.startingLabel}>Before deeper analysis</div>
                    <p className={styles.startingBody}>{startingAction.prerequisite.summary}</p>
                    <p className={styles.startingBody}>{startingAction.prerequisite.gapVersusBaseline}</p>
                    <p className={styles.startingBody}>{startingAction.prerequisite.blockedWork}</p>
                  </aside>
                )}
              </div>
            </motion.section>
          )}

          <ResultsLeadForm
            roadmapToken={roadmapToken}
            contact={contact}
            moduleCount={preview.moduleCount}
            ownerGetsCopy={ownerGetsCopy}
          />

          <motion.div
            className={`${styles.ctaSection} ${styles.hideOnPrint}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.2 }}
          >
            <div className={styles.ctaTitle}>{preview.ctaHeadline}</div>
            <p className={styles.ctaDesc}>{contact.purpose}</p>
            <a href={contact.href} className={styles.ctaButton}>
              {contact.label}
            </a>
            <div>
              <Link href="/intake" className={styles.ctaSecondary}>
                ← Start over
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className={styles.pageFooter}>
        <div className={styles.footerBrandRow}>
          <BrandWordmark size="compact" />
        </div>
        <p>90-day roadmap tool · © {new Date().getFullYear()} Darling MarTech</p>
      </footer>
    </div>
  );
}
