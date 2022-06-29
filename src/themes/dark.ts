import { createTheme } from '@mui/material';

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
      default: '#575757',
      paper: '#313131',
    },
    primary: {
      main: '#282828',
      dark: '#fff',
      light: '#fff',
      contrastText: '#0F0F0F',
    },
    secondary: {
      main: '#fff',
      dark: '#3D3D3D',
      light: '#1B1B1B',
      contrastText: '#0F0F0F',
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
