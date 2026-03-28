'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { IndustrySegment, Roadmap } from '@/lib/types';
import { getClientBookingPrimaryHref } from '@/lib/booking-url';
import { encodeIntakeAnswersCompact } from '@/lib/encode-answers';
import { buildMailtoHref } from '@/lib/rules';
import BrandWordmark from '@/components/brand/BrandWordmark';
import { springEntrance } from '@/lib/motion';
import ResultsLeadForm from './ResultsLeadForm';
import ResultsToolbar from './ResultsToolbar';
import styles from './page.module.css';

interface ResultsDisplayProps {
  roadmap: Roadmap;
  shareQ?: string;
  shareAnswersLegacy?: string;
}

const PHASE_LABELS: Record<number, string> = {
  1: 'Phase 1',
  2: 'Phase 2',
  3: 'Phase 3',
};

const PHASE_HEADER_CLASS: Record<1 | 2 | 3, string> = {
  1: styles.phaseHeader1,
  2: styles.phaseHeader2,
  3: styles.phaseHeader3,
};

const EFFORT_CLASS: Record<'low' | 'medium' | 'high', string> = {
  low: styles.effortLow,
  medium: styles.effortMedium,
  high: styles.effortHigh,
};

const SEGMENT_COPY: Record<IndustrySegment, string> = {
  healthcare: 'Healthcare / regulated marketing lens',
  legal: 'Legal & professional services lens',
  local: 'Local service business lens',
  saas: 'B2B SaaS lens',
  ecommerce: 'E-commerce / DTC lens',
  general: 'Cross-industry baseline',
};

export default function ResultsDisplay({
  roadmap,
  shareQ,
  shareAnswersLegacy,
}: ResultsDisplayProps) {
  const roadmapToken =
    shareQ?.trim() ||
    shareAnswersLegacy?.trim() ||
    encodeIntakeAnswersCompact(roadmap.answers);
  const {
    phases,
    topPriorities,
    primaryService,
    secondaryService,
    recommendedEngagement,
    engagementFormat,
    whyThisRoadmap,
    explainability,
    businessSummary,
    executiveSummary,
    watchOuts,
    industrySegment,
    primaryCta,
  } = roadmap;

  const mailtoHref = buildMailtoHref(primaryCta, [
    `Primary service: ${primaryService.title}`,
    `Supporting: ${secondaryService.title}`,
    `Engagement shape: ${engagementFormat.title}`,
    `Sprint / program: ${recommendedEngagement.title}`,
    `Top priorities: ${topPriorities.join('; ')}`,
  ]);
  const bookingPrimaryHref = getClientBookingPrimaryHref(mailtoHref);
  const bookingIsHttp = /^https?:\/\//i.test(bookingPrimaryHref);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <motion.div
          className={styles.headerInner}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springEntrance}
        >
          <span className={styles.headerEyebrow}>Strategic briefing</span>
          <h1 className={styles.headerTitle}>Your 90-Day Marketing Roadmap</h1>
          <p className={styles.headerSubtitle}>
            A deterministic, industry-aware plan you can share, print, and take into a commercial
            conversation — primary service, engagement shape, and next step aligned to your intake.
          </p>
        </motion.div>
      </header>

      <div className={styles.body}>
        <div className={styles.container}>
          <ResultsToolbar answers={roadmap.answers} />

          <div className={styles.printDocumentTitle}>CMO Roadmap Generator — 90-Day Plan</div>

          <motion.section
            className={styles.executiveBriefing}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.04 }}
          >
            <div className={styles.executiveLabel}>Executive summary</div>
            <h2 className={styles.executiveTitle}>What to do first — and why</h2>
            <p className={styles.executiveBody}>{executiveSummary}</p>
            {industrySegment !== 'general' && (
              <div className={styles.industryPill}>{SEGMENT_COPY[industrySegment]}</div>
            )}
          </motion.section>

          <motion.section
            className={styles.businessSummary}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.08 }}
          >
            <div className={styles.businessSummaryHeadline}>{businessSummary.headline}</div>
            <div className={styles.businessSummaryGrid}>
              {businessSummary.details.map((row) => (
                <div key={row.label} className={styles.businessSummaryRow}>
                  <span className={styles.businessSummaryLabel}>{row.label}</span>
                  <span className={styles.businessSummaryValue}>{row.value}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className={styles.prioritiesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.1 }}
          >
            <span className={styles.sectionTag}>Immediate focus</span>
            <h2 className={styles.sectionTitle}>Top 3 priorities (next 30 days)</h2>
            <p className={`${styles.leadIntro} ${styles.leadIntroSpaced}`}>
              These are the highest-scored initiatives for your profile — execute in order before
              expanding scope.
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

          <motion.section
            className={styles.phasesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.14 }}
          >
            <span className={styles.sectionTag}>Roadmap</span>
            <h2 className={styles.sectionTitle}>90-day execution by phase</h2>

            <div className={styles.phasesTimeline}>
              {phases.map((phase) => (
                <div key={phase.phase} className={styles.phaseBlock}>
                  <div className={PHASE_HEADER_CLASS[phase.phase as 1 | 2 | 3]}>
                    <div>
                      <div className={styles.phaseLabel}>{PHASE_LABELS[phase.phase]}</div>
                      <div className={styles.phaseName}>{phase.title}</div>
                    </div>
                    <div className={styles.phaseDays}>{phase.days}</div>
                  </div>

                  <div className={styles.phaseModules}>
                    {phase.modules.map((mod) => (
                      <div key={mod.id} className={styles.moduleCard}>
                        <div className={styles.moduleHeader}>
                          <div className={styles.moduleTitle}>{mod.title}</div>
                          <div className={styles.moduleMeta}>
                            <span className={styles.moduleWeek}>{mod.week}</span>
                            <span className={EFFORT_CLASS[mod.effort]}>
                              {mod.effort.charAt(0).toUpperCase() + mod.effort.slice(1)} effort
                            </span>
                          </div>
                        </div>
                        <p className={styles.moduleDescription}>{mod.description}</p>
                        <div className={styles.outcomesLabel}>Expected outcomes</div>
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

          <motion.section
            className={styles.explainSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.18 }}
          >
            <span className={styles.sectionTag}>Why this roadmap</span>
            <h2 className={styles.sectionTitle}>Logic behind your plan</h2>
            <p className={`${styles.leadIntro} ${styles.leadIntroWide}`}>
              Transparent mapping from your answers to flags, scores, and sequencing — so you can
              defend this internally or with an agency partner.
            </p>

            <div className={styles.explainGrid}>
              <div className={styles.explainCard}>
                <div className={styles.explainCardTitle}>Answers that shaped the plan</div>
                <div className={styles.explainList}>
                  {explainability.influentialAnswers.map((row) => (
                    <div key={row.questionLabel} className={styles.explainItem}>
                      <span className={styles.explainItemStrong}>{row.questionLabel}</span>
                      {row.answerLabel}
                      <span className={styles.explainImpact}>{row.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.explainCard}>
                <div className={styles.explainCardTitle}>Signals we prioritized</div>
                <div className={styles.explainList}>
                  {explainability.triggeredFlags.map((f) => (
                    <div key={f.id} className={styles.explainItem}>
                      <span className={styles.explainFlagLabel}>{f.label}</span>
                      {f.description}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.explainCard}>
                <div className={styles.explainCardTitle}>Highest-ranked work streams</div>
                <div className={styles.explainList}>
                  {explainability.topPriorityTracks.map((t, i) => (
                    <div key={t.moduleId} className={styles.explainItem}>
                      <span className={styles.trackRank}>{i + 1}.</span>
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            className={styles.whySection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.22 }}
          >
            <div className={styles.whyTitle}>Narrative read</div>
            <p className={styles.whyText}>{whyThisRoadmap}</p>
            <ul className={styles.whyBullets}>
              {explainability.whySummaryBullets.map((b) => (
                <li key={b} className={styles.whyBulletItem}>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.section
            className={styles.servicesSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.26 }}
          >
            <span className={styles.sectionTag}>Commercial path</span>
            <h2 className={styles.sectionTitle}>Recommended service path</h2>
            <p className={`${styles.leadIntro} ${styles.leadIntroSpaced}`}>
              Primary and supporting services follow your scores and vertical lens — tuned for how
              buyers evaluate and convert in your category.
            </p>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCardPrimary}>
                <div className={styles.serviceBadge}>Primary</div>
                <div className={styles.serviceTitle}>{primaryService.title}</div>
                <p className={styles.serviceDesc}>{primaryService.description}</p>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceSecondaryBadge}>Supporting</div>
                <div className={styles.serviceTitle}>{secondaryService.title}</div>
                <p className={styles.serviceDesc}>{secondaryService.description}</p>
              </div>
            </div>

            <div className={styles.engagementFormatCard}>
              <span className={styles.formatPill}>Recommended engagement path</span>
              <div className={styles.engagementFormatTitle}>{engagementFormat.title}</div>
              <p className={styles.engagementFormatRationale}>{engagementFormat.rationale}</p>
            </div>

            <div className={styles.engagementCard}>
              <div className={styles.engagementLabel}>Sprint / program shape</div>
              <div className={styles.engagementTitle}>{recommendedEngagement.title}</div>
              <p className={styles.engagementDesc}>{recommendedEngagement.description}</p>
            </div>
          </motion.section>

          <motion.section
            className={styles.watchOutsSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.3 }}
          >
            <h2 className={styles.watchOutsTitle}>Watch-outs & common mistakes</h2>
            <ul className={styles.watchOutsList}>
              {watchOuts.map((line) => (
                <li key={line} className={styles.watchOutsItem}>
                  {line}
                </li>
              ))}
            </ul>
          </motion.section>

          <ResultsLeadForm roadmap={roadmap} roadmapToken={roadmapToken} />

          <motion.div
            className={`${styles.ctaSection} ${styles.hideOnPrint}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springEntrance, delay: 0.34 }}
          >
            <div className={styles.ctaTitle}>{primaryCta.headline}</div>
            <p className={styles.ctaDesc}>
              The fastest path is a short strategy conversation — we walk through your roadmap,
              pressure-test priorities, and align on scope. Prefer async? Use the pre-filled email
              link or forward your share link to your team.
            </p>
            <a href={bookingPrimaryHref} className={styles.ctaButton}>
              Book a strategy conversation
            </a>
            {bookingIsHttp && (
              <a href={mailtoHref} className={styles.ctaMailtoAlt}>
                {primaryCta.buttonLabel} →
              </a>
            )}
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
