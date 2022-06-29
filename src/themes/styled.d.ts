declare module '@material-ui/core/styles' {
  interface Theme {
    background: {
      default: string;
      paper: string;
    };
    primary: {
      main: string;
      dark: string;
      light: string;
      contrastText: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
      default?: string;
      paper?: string;
    };
    primary?: {
      main?: string;
      dark?: string;
      light?: string;
      contrastText?: string;
    };
  }
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}
