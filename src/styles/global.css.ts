import { globalStyle } from '@vanilla-extract/css';
import { vars } from './tokens.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html', {
  scrollBehavior: 'smooth',
  fontSize: '16px',
  textSizeAdjust: '100%',
});

globalStyle('body', {
  fontFamily: vars.font.sans,
  lineHeight: vars.lineHeight.normal,
  color: vars.color.text,
  backgroundColor: vars.color.surface,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});

globalStyle('button', {
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  fontFamily: 'inherit',
  fontSize: 'inherit',
});

globalStyle('img, svg', {
  maxWidth: '100%',
  display: 'block',
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  lineHeight: vars.lineHeight.tight,
  fontWeight: vars.fontWeight.bold,
});

globalStyle('ul, ol', {
  listStyle: 'none',
});

globalStyle('input, textarea, select', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
});
