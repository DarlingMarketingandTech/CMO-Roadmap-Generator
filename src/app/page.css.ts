import { style } from '@vanilla-extract/css';
import { vars } from '../styles/tokens.css';

export const page = style({
  minHeight: '100vh',
  backgroundColor: vars.color.surface,
});

/* ─── HERO ─── */

export const hero = style({
  background: vars.color.brand,
  color: vars.color.white,
  padding: `${vars.space['24']} ${vars.space['6']}`,
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['16']} ${vars.space['4']}`,
    },
  },
});

export const heroInner = style({
  maxWidth: '820px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
});

export const heroEyebrow = style({
  display: 'inline-block',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: vars.space['5'],
  border: `1px solid rgba(201,169,110,0.35)`,
  borderRadius: vars.radius.full,
  padding: `${vars.space['1']} ${vars.space['4']}`,
});

export const heroTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['4xl'],
  fontWeight: vars.fontWeight.bold,
  lineHeight: vars.lineHeight.tight,
  marginBottom: vars.space['6'],
  color: vars.color.white,
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: vars.fontSize['3xl'],
    },
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize['2xl'],
    },
  },
});

export const heroSubtitle = style({
  fontSize: vars.fontSize.lg,
  color: vars.color.accentLight,
  lineHeight: vars.lineHeight.relaxed,
  maxWidth: '560px',
  margin: `0 auto ${vars.space['10']}`,
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.base,
    },
  },
});

export const heroCta = style({
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

export const heroStats = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.space['12'],
  marginTop: vars.space['16'],
  paddingTop: vars.space['10'],
  borderTop: `1px solid rgba(255,255,255,0.1)`,
  '@media': {
    'screen and (max-width: 480px)': {
      gap: vars.space['8'],
    },
  },
});

export const heroStat = style({
  textAlign: 'center',
});

export const heroStatValue = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.accent,
  lineHeight: '1',
  marginBottom: vars.space['1'],
});

export const heroStatLabel = style({
  fontSize: vars.fontSize.sm,
  color: 'rgba(255,255,255,0.55)',
});

/* ─── SECTION WRAPPERS ─── */

export const sectionLight = style({
  padding: `${vars.space['20']} ${vars.space['6']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['16']} ${vars.space['4']}`,
    },
  },
});

export const sectionDark = style({
  backgroundColor: vars.color.brand,
  color: vars.color.white,
  padding: `${vars.space['20']} ${vars.space['6']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['16']} ${vars.space['4']}`,
    },
  },
});

export const sectionAlt = style({
  backgroundColor: '#F0EDE8',
  padding: `${vars.space['20']} ${vars.space['6']}`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['16']} ${vars.space['4']}`,
    },
  },
});

export const container = style({
  maxWidth: '1100px',
  margin: '0 auto',
});

export const containerNarrow = style({
  maxWidth: '680px',
  margin: '0 auto',
  textAlign: 'center',
  marginBottom: vars.space['12'],
});

/* ─── SECTION HEADER ─── */

export const sectionTag = style({
  display: 'inline-block',
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: vars.space['3'],
});

export const sectionTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space['4'],
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.xl,
    },
  },
});

export const sectionTitleLight = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space['4'],
  color: vars.color.white,
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.xl,
    },
  },
});

export const sectionDesc = style({
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
  color: vars.color.textSecondary,
  maxWidth: '560px',
  margin: '0 auto',
});

export const sectionDescLight = style({
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
  color: 'rgba(255,255,255,0.65)',
  maxWidth: '560px',
  margin: '0 auto',
});

/* ─── HOW IT WORKS ─── */

export const stepsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['8'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '480px',
      margin: '0 auto',
    },
  },
});

export const stepCard = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space['8'],
  boxShadow: vars.shadow.sm,
  transition: `box-shadow ${vars.transition.base}`,
  ':hover': {
    boxShadow: vars.shadow.md,
  },
});

export const stepNumber = style({
  width: '52px',
  height: '52px',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent,
  color: vars.color.brand,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: vars.fontWeight.bold,
  fontSize: vars.fontSize.xl,
  marginBottom: vars.space['5'],
  fontFamily: vars.font.serif,
});

export const stepTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space['3'],
  color: vars.color.text,
});

export const stepDescription = style({
  fontSize: vars.fontSize.base,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
});

/* ─── WHO IT'S FOR ─── */

export const audienceGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: vars.space['6'],
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      maxWidth: '480px',
      margin: '0 auto',
    },
  },
});

export const audienceCard = style({
  border: `1px solid rgba(255,255,255,0.12)`,
  borderRadius: vars.radius.lg,
  padding: vars.space['8'],
  backgroundColor: 'rgba(255,255,255,0.04)',
  transition: `all ${vars.transition.base}`,
  ':hover': {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(201,169,110,0.4)',
  },
});

export const audienceIcon = style({
  fontSize: '2.25rem',
  marginBottom: vars.space['4'],
  lineHeight: '1',
});

export const audienceTitle = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space['3'],
  color: vars.color.accent,
});

export const audienceDesc = style({
  fontSize: vars.fontSize.sm,
  color: 'rgba(255,255,255,0.65)',
  lineHeight: vars.lineHeight.relaxed,
});

/* ─── WHAT YOU GET ─── */

export const deliverablesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['4'],
  '@media': {
    'screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const deliverableItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space['3'],
  padding: `${vars.space['4']} ${vars.space['5']}`,
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  boxShadow: vars.shadow.sm,
});

export const deliverableCheck = style({
  width: '22px',
  height: '22px',
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.success,
  color: vars.color.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.bold,
});

export const deliverableText = style({
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.text,
});

/* ─── FINAL CTA ─── */

export const finalCta = style({
  textAlign: 'center',
  padding: `${vars.space['20']} ${vars.space['6']}`,
  background: `linear-gradient(135deg, ${vars.color.brand} 0%, ${vars.color.brandMid} 100%)`,
  '@media': {
    'screen and (max-width: 768px)': {
      padding: `${vars.space['16']} ${vars.space['4']}`,
    },
  },
});

export const finalCtaTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  marginBottom: vars.space['4'],
});

export const finalCtaDesc = style({
  fontSize: vars.fontSize.md,
  color: 'rgba(255,255,255,0.65)',
  marginBottom: vars.space['8'],
  maxWidth: '480px',
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

/* ─── FOOTER ─── */

export const footer = style({
  backgroundColor: vars.color.brand,
  borderTop: `1px solid rgba(255,255,255,0.07)`,
  padding: `${vars.space['8']} ${vars.space['6']}`,
  textAlign: 'center',
  color: 'rgba(255,255,255,0.4)',
  fontSize: vars.fontSize.sm,
});

export const footerBrand = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.base,
  color: 'rgba(255,255,255,0.6)',
  marginBottom: vars.space['2'],
  fontWeight: vars.fontWeight.medium,
});

/* ─── DEMO PROFILES ─── */

export const demoGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['5'],
  '@media': {
    'screen and (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const demoCard = style({
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space['6'],
  boxShadow: vars.shadow.sm,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: vars.space['3'],
  transition: `box-shadow ${vars.transition.base}, border-color ${vars.transition.base}`,
  ':hover': {
    boxShadow: vars.shadow.md,
    borderColor: vars.color.borderStrong,
  },
});

export const demoCardTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  lineHeight: vars.lineHeight.snug,
});

export const demoCardBlurb = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  flex: 1,
});

export const demoCardActions = style({
  display: 'flex',
  flexWrap: 'wrap' as const,
  gap: vars.space['3'],
  marginTop: vars.space['2'],
});

export const demoLinkPrimary = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.brand,
  backgroundColor: vars.color.accent,
  padding: `${vars.space['2']} ${vars.space['4']}`,
  borderRadius: vars.radius.md,
  transition: `background ${vars.transition.fast}`,
  ':hover': {
    backgroundColor: vars.color.accentLight,
  },
});

export const demoLinkSecondary = style({
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textSecondary,
  padding: `${vars.space['2']} ${vars.space['3']}`,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  ':hover': {
    color: vars.color.text,
    borderColor: vars.color.borderStrong,
  },
});
