// Node tests render this file with the classic JSX runtime. Next's compiler uses the automatic runtime.
import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { RoadmapEmailModel } from '@/lib/email/roadmap-email-model';

// Darling MarTech brand tokens (website app/globals.css).
const crimson = '#990000';
const cream = '#EEEDEB';
const white = '#FFFFFF';
const ink = '#1C1717';
const muted = '#5A5050';
const line = '#D5D0CA';
const display = 'Montserrat, Arial, Helvetica, sans-serif';
const bodyFont = 'Inter, Arial, Helvetica, sans-serif';

export interface RoadmapEmailProps extends RoadmapEmailModel {
  strategyCtaUrl: string;
  strategyCtaLabel: string;
  strategyCtaPurpose: string;
}

export default function RoadmapEmail({
  recipientFirstName,
  companyLine,
  businessHeadline,
  executiveSummary,
  startingAction,
  topPriorities,
  sequencingNote,
  phases,
  whyThisRoadmap,
  whyBullets,
  influentialAnswers,
  watchOuts,
  servicePathNote,
  primaryServiceTitle,
  primaryServiceBlurb,
  secondaryServiceTitle,
  secondaryServiceBlurb,
  engagementPathTitle,
  engagementPathRationale,
  sprintTitle,
  sprintDescription,
  strategyCtaUrl,
  strategyCtaLabel,
  strategyCtaPurpose,
}: RoadmapEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your full 90-day marketing plan: priorities, phases, and next steps.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={wordmark}>Darling MarTech</Text>
            <Heading as="h1" style={h1}>
              Your full 90-day marketing plan
            </Heading>
            <Text style={mutedParagraph}>{businessHeadline}</Text>
          </Section>

          <Text style={paragraph}>Hi {recipientFirstName},</Text>
          <Text style={paragraph}>
            {companyLine
              ? `Here is the full plan for ${companyLine}, built from your answers.`
              : 'Here is your full plan, built from your answers.'}
          </Text>

          <Heading as="h2" style={h2}>
            What to do first, and why
          </Heading>
          <Text style={paragraph}>{executiveSummary}</Text>

          {startingAction ? (
            <>
              <Heading as="h2" style={h2}>
                Starting action
              </Heading>
              <Text style={strongLine}>{startingAction.moduleTitle}</Text>
              <Text style={label}>Task</Text>
              <Text style={paragraph}>{startingAction.task}</Text>
              <Text style={label}>Output to keep</Text>
              <Text style={paragraph}>{startingAction.output}</Text>
              <Text style={label}>Completion</Text>
              <Text style={paragraph}>{startingAction.completion}</Text>
              <Text style={label}>Access</Text>
              <Text style={paragraph}>{startingAction.access}</Text>
              {startingAction.scopeNote ? (
                <>
                  <Text style={label}>Scope</Text>
                  <Text style={paragraph}>{startingAction.scopeNote}</Text>
                </>
              ) : null}
              <Text style={paragraph}>
                {startingAction.effortLabel}: {startingAction.effortBand}. This band describes the
                whole module, not this starting task.
              </Text>
              {startingAction.prerequisite ? (
                <>
                  <Heading as="h2" style={h2}>
                    Before deeper analysis
                  </Heading>
                  <Text style={paragraph}>{startingAction.prerequisite}</Text>
                </>
              ) : null}
            </>
          ) : null}

          <Heading as="h2" style={h2}>
            Top 3 priorities
          </Heading>
          <Section style={listBox}>
            {topPriorities.map((p, i) => (
              <Text key={p} style={listItem}>
                <strong style={{ color: crimson }}>{i + 1}.</strong> {p}
              </Text>
            ))}
          </Section>

          <Heading as="h2" style={h2}>
            Suggested sequencing by phase
          </Heading>
          <Text style={mutedParagraph}>{sequencingNote}</Text>
          {phases.map((phase) => (
            <Section key={phase.phaseLabel} style={phaseBlock}>
              <Text style={phaseTitle}>
                {phase.phaseLabel}: {phase.phaseTitle}{' '}
                <span style={{ color: muted, fontWeight: 400 }}>({phase.days})</span>
              </Text>
              {phase.modules.map((mod) => (
                <Section key={mod.title} style={moduleBlock}>
                  <Text style={strongLine}>{mod.title}</Text>
                  <Text style={smallMuted}>{mod.effortText}</Text>
                  <Text style={smallParagraph}>{mod.description}</Text>
                  <Text style={label}>{mod.outcomesLabel}</Text>
                  {mod.outcomes.map((outcome) => (
                    <Text key={outcome} style={bullet}>
                      • {outcome}
                    </Text>
                  ))}
                </Section>
              ))}
              {phase.emptyMessage ? <Text style={mutedParagraph}>{phase.emptyMessage}</Text> : null}
            </Section>
          ))}

          <Heading as="h2" style={h2}>
            Why this plan
          </Heading>
          <Text style={paragraph}>{whyThisRoadmap}</Text>
          {whyBullets.map((b) => (
            <Text key={b} style={bullet}>
              • {b}
            </Text>
          ))}
          <Text style={label}>Answers that shaped the plan</Text>
          {influentialAnswers.map((row) => (
            <Text key={row.question} style={smallParagraph}>
              <strong>{row.question}:</strong> {row.answer}. {row.impact}
            </Text>
          ))}

          <Hr style={hr} />

          <Heading as="h2" style={h2}>
            Recommended services
          </Heading>
          <Text style={mutedParagraph}>{servicePathNote}</Text>
          <Text style={label}>Primary</Text>
          <Text style={strongLine}>{primaryServiceTitle}</Text>
          <Text style={smallParagraph}>{primaryServiceBlurb}</Text>
          <Text style={label}>Supporting</Text>
          <Text style={strongLine}>{secondaryServiceTitle}</Text>
          <Text style={smallParagraph}>{secondaryServiceBlurb}</Text>

          <Heading as="h2" style={h2}>
            Recommended engagement path
          </Heading>
          <Text style={strongLine}>{engagementPathTitle}</Text>
          <Text style={smallParagraph}>{engagementPathRationale}</Text>
          <Text style={label}>Program shape</Text>
          <Text style={strongLine}>{sprintTitle}</Text>
          <Text style={smallParagraph}>{sprintDescription}</Text>

          <Heading as="h2" style={h2}>
            Watch-outs
          </Heading>
          {watchOuts.map((w) => (
            <Text key={w} style={bullet}>
              • {w}
            </Text>
          ))}

          <Hr style={hr} />

          <Section style={ctaBox}>
            <Text style={ctaText}>{strategyCtaPurpose}</Text>
            <Button href={strategyCtaUrl} style={button}>
              {strategyCtaLabel}
            </Button>
            <Text style={footerNote}>
              If the button does not work, copy this link:{' '}
              <Link href={strategyCtaUrl} style={link}>
                {strategyCtaUrl}
              </Link>
            </Text>
          </Section>

          <Text style={disclaimer}>
            This plan was generated by a fixed set of rules from your answers, not by AI. It is a
            planning aid, not a promise of results. Engagement terms are agreed separately.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = { backgroundColor: cream, fontFamily: bodyFont, color: ink };
const container = { margin: '0 auto', padding: '32px 28px', maxWidth: '600px', backgroundColor: white };
const header = { marginBottom: '20px', borderBottom: `1px solid ${line}`, paddingBottom: '12px' };
const wordmark = { fontFamily: display, fontSize: '14px', fontWeight: 800, color: crimson, margin: '0 0 12px' };
const h1 = { fontFamily: display, color: ink, fontSize: '26px', fontWeight: 800, lineHeight: '1.2', margin: '0 0 8px' };
const h2 = { fontFamily: display, color: ink, fontSize: '18px', fontWeight: 800, margin: '28px 0 10px' };
const paragraph = { color: ink, fontSize: '15px', lineHeight: '1.6', margin: '0 0 14px' };
const smallParagraph = { color: ink, fontSize: '14px', lineHeight: '1.55', margin: '0 0 10px' };
const mutedParagraph = { color: muted, fontSize: '14px', lineHeight: '1.55', margin: '0 0 14px' };
const smallMuted = { color: muted, fontSize: '13px', margin: '0 0 6px' };
const listBox = { backgroundColor: cream, borderRadius: '8px', padding: '14px 18px', marginBottom: '8px' };
const listItem = { color: ink, fontSize: '15px', lineHeight: '1.5', margin: '0 0 6px' };
const phaseBlock = { borderTop: `3px solid ${crimson}`, padding: '12px 0 4px', marginBottom: '16px' };
const phaseTitle = { fontFamily: display, color: ink, fontSize: '15px', fontWeight: 700, margin: '0 0 10px' };
const moduleBlock = { border: `1px solid ${line}`, borderRadius: '8px', padding: '12px 16px', marginBottom: '10px' };
const bullet = { color: ink, fontSize: '14px', lineHeight: '1.5', margin: '0 0 4px 8px' };
const label = {
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  color: crimson,
  margin: '14px 0 6px',
};
const strongLine = { fontFamily: display, color: ink, fontSize: '15px', fontWeight: 700, margin: '0 0 4px' };
const hr = { borderColor: line, margin: '28px 0' };
const ctaBox = { textAlign: 'center' as const, backgroundColor: cream, borderRadius: '8px', padding: '20px' };
const ctaText = { color: ink, fontSize: '15px', lineHeight: '1.5', margin: '0 0 14px' };
const button = {
  backgroundColor: crimson,
  color: white,
  fontFamily: display,
  fontSize: '16px',
  fontWeight: 700,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  borderRadius: '6px',
};
const footerNote = { fontSize: '12px', color: muted, margin: '16px 0 0', lineHeight: '1.5', wordBreak: 'break-all' as const };
const link = { color: crimson, textDecoration: 'underline' };
const disclaimer = { fontSize: '12px', color: muted, lineHeight: '1.5', margin: '24px 0 0' };
