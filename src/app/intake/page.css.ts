import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';

export const pageWrapper = style({
  minHeight: '100vh',
  backgroundColor: vars.color.surface,
  display: 'flex',
  flexDirection: 'column',
});

/* ─── HEADER ─── */

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${vars.space['5']} ${vars.space['6']}`,
  backgroundColor: vars.color.surfaceElevated,
  borderBottom: `1px solid ${vars.color.border}`,
  position: 'sticky',
  top: 0,
  zIndex: vars.zIndex.raised,
});

export const headerBrand = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.brand,
});

export const headerStep = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textMuted,
  fontWeight: vars.fontWeight.medium,
});

/* ─── PROGRESS ─── */

export const progressTrack = style({
  height: '4px',
  backgroundColor: vars.color.border,
  position: 'relative',
  overflow: 'hidden',
});

export const progressFill = style({
  height: '100%',
  backgroundColor: vars.color.accent,
  transition: `width ${vars.transition.slow}`,
  borderRadius: vars.radius.full,
});

/* ─── MAIN CONTENT ─── */

export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${vars.space['12']} ${vars.space['6']}`,
  '@media': {
    'screen and (max-width: 640px)': {
      padding: `${vars.space['8']} ${vars.space['4']}`,
    },
  },
});

export const questionWrapper = style({
  width: '100%',
  maxWidth: '680px',
});

export const stepLabel = style({
  fontSize: vars.fontSize.xs,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.accent,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: vars.space['3'],
});

export const questionLabel = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  marginBottom: vars.space['3'],
  lineHeight: vars.lineHeight.snug,
  '@media': {
    'screen and (max-width: 480px)': {
      fontSize: vars.fontSize.xl,
    },
  },
});

export const questionDesc = style({
  fontSize: vars.fontSize.base,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.relaxed,
  marginBottom: vars.space['8'],
});

export const multiHint = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  fontSize: vars.fontSize.xs,
  color: vars.color.textMuted,
  backgroundColor: vars.color.border,
  padding: `${vars.space['1']} ${vars.space['3']}`,
  borderRadius: vars.radius.full,
  marginBottom: vars.space['5'],
  fontWeight: vars.fontWeight.medium,
});

/* ─── OPTIONS GRID ─── */

export const optionsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.space['3'],
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const optionCard = style({
  padding: `${vars.space['4']} ${vars.space['5']}`,
  backgroundColor: vars.color.surfaceElevated,
  border: `2px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  cursor: 'pointer',
  textAlign: 'left',
  transition: `all ${vars.transition.fast}`,
  ':hover': {
    borderColor: vars.color.accent,
    backgroundColor: '#FFFEF9',
    boxShadow: vars.shadow.sm,
  },
});

export const optionCardSelected = style({
  borderColor: vars.color.accent,
  backgroundColor: '#FFFEF4',
  boxShadow: `0 0 0 1px ${vars.color.accent}`,
});

export const optionLabel = style({
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.text,
  marginBottom: vars.space['1'],
  pointerEvents: 'none',
});

export const optionDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.textSecondary,
  lineHeight: vars.lineHeight.snug,
  pointerEvents: 'none',
});

export const optionCheck = style({
  width: '18px',
  height: '18px',
  borderRadius: vars.radius.sm,
  border: `2px solid ${vars.color.borderStrong}`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: vars.space['3'],
  flexShrink: 0,
  transition: `all ${vars.transition.fast}`,
  verticalAlign: 'middle',
});

export const optionCheckSelected = style({
  backgroundColor: vars.color.accent,
  borderColor: vars.color.accent,
  color: vars.color.brand,
});

export const optionHeaderRow = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: vars.space['1'],
});

/* ─── VALIDATION ERROR ─── */

export const validationError = style({
  marginTop: vars.space['4'],
  padding: `${vars.space['3']} ${vars.space['4']}`,
  backgroundColor: '#FFF5F5',
  border: `1px solid #FED7D7`,
  borderRadius: vars.radius.md,
  fontSize: vars.fontSize.sm,
  color: vars.color.error,
  fontWeight: vars.fontWeight.medium,
});

/* ─── NAVIGATION ─── */

export const navigation = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '680px',
  marginTop: vars.space['8'],
  paddingTop: vars.space['6'],
  borderTop: `1px solid ${vars.color.border}`,
});

export const backButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.medium,
  color: vars.color.textSecondary,
  padding: `${vars.space['3']} ${vars.space['5']}`,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  transition: `all ${vars.transition.fast}`,
  ':hover': {
    borderColor: vars.color.borderStrong,
    color: vars.color.text,
  },
});

export const nextButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.brand,
  backgroundColor: vars.color.accent,
  padding: `${vars.space['3']} ${vars.space['6']}`,
  borderRadius: vars.radius.md,
  transition: `all ${vars.transition.fast}`,
  marginLeft: 'auto',
  ':hover': {
    backgroundColor: vars.color.accentLight,
    transform: 'translateY(-1px)',
    boxShadow: vars.shadow.md,
  },
  ':disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
});

export const submitButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['2'],
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.bold,
  color: vars.color.white,
  backgroundColor: vars.color.brand,
  padding: `${vars.space['3']} ${vars.space['6']}`,
  borderRadius: vars.radius.md,
  transition: `all ${vars.transition.fast}`,
  marginLeft: 'auto',
  ':hover': {
    backgroundColor: vars.color.brandMid,
    transform: 'translateY(-1px)',
    boxShadow: vars.shadow.md,
  },
  ':disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
});

/* ─── EFFORT BADGE ─── */

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
