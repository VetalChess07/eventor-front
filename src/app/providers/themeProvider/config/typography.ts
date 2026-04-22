import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Palette } from '@mui/material';

export const typographyConfig:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions)
  | undefined = {
  fontFamily: ['Inter-Regular', 'Inter-Bold'].join(','),

  h1: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '130%',
    fontFamily: 'Inter-Bold',
    '@media (max-width:600px)': {},
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '130%',
    fontFamily: 'Inter-Bold',
    '@media (max-width:600px)': {
      fontSize: '1.5rem',
    },
  },

  h3: {
    fontSize: '1.125rem',
    fontWeight: 600,
    fontFamily: 'Inter-Bold',
    lineHeight: '100%',
    color: 'var(--primary-color)',
  },

  subtitle1: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: '2rem',
  },
  subtitle2: {
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.8125rem',
    fontFamily: 'Inter-Bold',
  },
  body1: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '100%',
    color: 'var(--light)',
  },
  body2: {
    fontSize: '.75rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
    color: 'var(--primary-text-color)',
  },
  // caption: {
  //     color:"red",

  //     fontSize: '1.5rem',
  //     fontWeight: 600,
  //     lineHeight: '100%',
  //     letterSpacing:"1.5px"
  // },

  caption: {
    fontSize: '1rem',
    fontWeight: 400,
    letterSpacing: '1.5px',
  },

  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1rem',
    textTransform: 'none',
  },
};
