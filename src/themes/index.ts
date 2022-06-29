import { createTheme, PaletteMode } from '@mui/material';

export const Theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: '53px',
      padding: '16px',
      '@media (min-width: 600px)': {
        minHeight: '53px',
      },
    },
  },
  palette: {
    background: {
      default: '#EEF1F5',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#5076ff',
      dark: '#4a5275',
      light: '#9797ad',
      contrastText: '#999999',
      '100': '#FFFFFF',
    },
    secondary: {
      main: '#0054ff',
      dark: '#F4F4F4',
      light: '#F7A181',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536,
    },
  },

  typography: {
    button: {
      textTransform: 'none',
    },
  },
});
