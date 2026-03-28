import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const page = style({
  minHeight: '100vh',
  backgroundColor: vars.color.surface,
});

/* ─── HEADER ─── */

export const pageHeader = style({
  background: vars.color.brand,
  color: vars.color.white,
  padding: `${vars.space['12']} ${vars.space['6']}`,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 640px)': {
      padding: `${vars.space['10']} ${vars.space['4']}`,
    },
  },
});

export const headerInner = style({
  maxWidth: '900px',
  margin: '0 auto',
});

export const headerEyebrow = style({
  display: 'inline-block',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: vars.space['4'],
  border: `1px solid rgba(201,169,110,0.3)`,
  borderRadius: vars.radius.full,
  padding: `${vars.space['1']} ${vars.space['4']}`,
});

export const headerTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['3xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  lineHeight: vars.lineHeight.tight,
  marginBottom: vars.space['4'],
  '@media': {
    'screen and (max-width: 640px)': {
      fontSize: vars.fontSize['2xl'],
    },
  },
});

export const headerSubtitle = style({
  fontSize: vars.fontSize.md,
  color: vars.color.accentLight,
  lineHeight: vars.lineHeight.relaxed,
  maxWidth: '600px',
  margin: '0 auto',
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.base,
    },
  },
});

/* ─── MAIN BODY ─── */

export const body = style({
  padding: `${vars.space['12']} ${vars.space['6']}`,
  '@media': {
    'screen and (max-width: 640px)': {
      padding: `${vars.space['8']} ${vars.space['4']}`,
    },
  },
});

export const container = style({
  maxWidth: '960px',
  margin: '0 auto',
});

/* ─── TOP PRIORITIES ─── */

export const prioritiesSection = style({
  marginBottom: vars.space['12'],
});

export const sectionTag = style({
  display: 'inline-block',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: vars.space['5'],
});

export const sectionTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  marginBottom: vars.space['6'],
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.xl,
    },
  },
});

export const prioritiesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['4'],
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '480px',
    },
  },
});

export const priorityCard = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space['6'],
  boxShadow: vars.shadow.sm,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: vars.color.accent,
  },
});

export const priorityNumber = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['3xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.border,
  lineHeight: '1',
  marginBottom: vars.space['3'],
});

export const priorityTitle = style({
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
  lineHeight: vars.lineHeight.snug,
});

/* ─── PHASES ─── */

export const phasesSection = style({
  marginBottom: vars.space['12'],
});

export const phasesTimeline = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['6'],
});

export const phaseBlock = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  overflow: 'hidden',
  boxShadow: vars.shadow.sm,
});

export const phaseHeader = styleVariants({
  1: {
    background: vars.color.brand,
    padding: `${vars.space['5']} ${vars.space['6']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: vars.space['2'],
  },
  2: {
    background: vars.color.brandMid,
    padding: `${vars.space['5']} ${vars.space['6']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: vars.space['2'],
  },
  3: {
    background: '#2C3E6B',
    padding: `${vars.space['5']} ${vars.space['6']}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: vars.space['2'],
  },
});

export const phaseLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: 'rgba(255,255,255,0.55)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: vars.space['1'],
});

export const phaseName = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
});

export const phaseDays = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  backgroundColor: 'rgba(201,169,110,0.15)',
  padding: `${vars.space['1']} ${vars.space['4']}`,
  borderRadius: vars.radius.full,
  border: `1px solid rgba(201,169,110,0.25)`,
});

export const phaseModules = style({
  backgroundColor: vars.color.surfaceElevated,
  padding: vars.space['6'],
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['4'],
});

/* ─── MODULE CARD ─── */

export const moduleCard = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space['5'],
  transition: `box-shadow ${vars.transition.base}`,
  ':hover': {
    boxShadow: vars.shadow.md,
  },
});

export const moduleHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: vars.space['3'],
  marginBottom: vars.space['3'],
  flexWrap: 'wrap' as const,
});

export const moduleMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['2'],
  flexShrink: 0,
  flexWrap: 'wrap' as const,
});

export const moduleWeek = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textMuted,
  backgroundColor: vars.color.border,
  padding: `2px ${vars.space['3']}`,
  borderRadius: vars.radius.full,
});

export const effortBadge = styleVariants({
  low: {
    display: 'inline-block',
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.semibold,
    padding: `2px 8px`,
    borderRadius: vars.radius.full,
    backgroundColor: '#D1FAE5',
    color: vars.color.success,
  },
  medium: {
    display: 'inline-block',
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.semibold,
    padding: `2px 8px`,
    borderRadius: vars.radius.full,
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  high: {
    display: 'inline-block',
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.semibold,
    padding: `2px 8px`,
    borderRadius: vars.radius.full,
    backgroundColor: '#FEE2E2',
    color: vars.color.error,
  },
});

export const moduleTitle = style({
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
  lineHeight: vars.lineHeight.snug,
});

export const moduleDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  marginBottom: vars.space['4'],
});

export const outcomesLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: vars.space['2'],
});

export const outcomesList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['1'],
});

export const outcomeItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space['2'],
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.snug,
});

export const outcomeDot = style({
  width: '6px',
  height: '6px',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent,
  flexShrink: 0,
  marginTop: '5px',
});

/* ─── SERVICES ─── */

export const servicesSection = style({
  marginBottom: vars.space['12'],
});

export const servicesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['5'],
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const serviceCard = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  padding: vars.space['6'],
  boxShadow: vars.shadow.sm,
  position: 'relative',
  overflow: 'hidden',
  transition: `box-shadow ${vars.transition.base}`,
  ':hover': {
    boxShadow: vars.shadow.md,
  },
});

export const serviceCardPrimary = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `2px solid ${vars.color.accent}`,
  borderRadius: vars.radius.xl,
  padding: vars.space['6'],
  boxShadow: vars.shadow.md,
  position: 'relative',
  overflow: 'hidden',
  transition: `box-shadow ${vars.transition.base}`,
  ':hover': {
    boxShadow: vars.shadow.lg,
  },
});

export const serviceBadge = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.brand,
  backgroundColor: vars.color.accent,
  padding: `2px ${vars.space['3']}`,
  borderRadius: vars.radius.full,
  display: 'inline-block',
  marginBottom: vars.space['4'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const serviceSecondaryBadge = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.textMuted,
  backgroundColor: vars.color.border,
  padding: `2px ${vars.space['3']}`,
  borderRadius: vars.radius.full,
  display: 'inline-block',
  marginBottom: vars.space['4'],
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
});

export const serviceTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  marginBottom: vars.space['3'],
  lineHeight: vars.lineHeight.snug,
});

export const serviceDesc = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
});

/* ─── WHY THIS ROADMAP ─── */

export const whySection = style({
  backgroundColor: vars.color.brand,
  color: vars.color.white,
  borderRadius: vars.radius.xl,
  padding: vars.space['8'],
  marginBottom: vars.space['12'],
});

export const whyTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.accent,
  marginBottom: vars.space['4'],
});

export const whyText = style({
  fontSize: vars.fontSize.base,
  color: 'rgba(255,255,255,0.8)',
  lineHeight: vars.lineHeight.relaxed,
});

/* ─── CTA SECTION ─── */

export const ctaSection = style({
  textAlign: 'center',
  padding: `${vars.space['12']} ${vars.space['6']}`,
  background: `linear-gradient(135deg, ${vars.color.brand} 0%, ${vars.color.brandMid} 100%)`,
  borderRadius: vars.radius.xl,
  marginBottom: vars.space['10'],
});

export const ctaTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  marginBottom: vars.space['4'],
});

export const ctaDesc = style({
  fontSize: vars.fontSize.md,
  color: 'rgba(255,255,255,0.65)',
  marginBottom: vars.space['8'],
  maxWidth: '460px',
  margin: `0 auto ${vars.space['8']}`,
  lineHeight: vars.lineHeight.relaxed,
});

export const ctaButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  backgroundColor: vars.color.accent,
  color: vars.color.brand,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  padding: `${vars.space['4']} ${vars.space['8']}`,
  borderRadius: vars.radius.full,
  transition: `all ${vars.transition.base}`,
  ':hover': {
    backgroundColor: vars.color.accentLight,
    transform: 'translateY(-2px)',
    boxShadow: vars.shadow.lg,
  },
});

export const ctaSecondary = style({
  display: 'inline-block',
  marginTop: vars.space['4'],
  fontSize: vars.fontSize.sm,
  color: 'rgba(255,255,255,0.5)',
  transition: `color ${vars.transition.fast}`,
  ':hover': {
    color: 'rgba(255,255,255,0.8)',
  },
});

/* ─── ERROR STATE ─── */

export const errorState = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space['8'],
  textAlign: 'center',
});

export const errorTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space['4'],
  color: vars.color.text,
});

export const errorDesc = style({
  fontSize: vars.fontSize.base,
  color: vars.color.textSecondary,
  marginBottom: vars.space['8'],
  lineHeight: vars.lineHeight.relaxed,
  maxWidth: '400px',
});

export const errorLink = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  backgroundColor: vars.color.accent,
  color: vars.color.brand,
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.base,
  padding: `${vars.space['3']} ${vars.space['6']}`,
  borderRadius: vars.radius.md,
  transition: `all ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.accentLight,
  },
});

/* ─── PAGE FOOTER ─── */

export const pageFooter = style({
  backgroundColor: vars.color.brand,
  borderTop: `1px solid rgba(255,255,255,0.07)`,
  padding: `${vars.space['6']} ${vars.space['6']}`,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.35)',
  fontSize: vars.fontSize.sm,
});
