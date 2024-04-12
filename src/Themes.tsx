import { createTheme } from "@mui/material/styles";

export const spaceTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5dbea3", // Green
    },
    secondary: {
      main: "#a881af", // Purple
    },
    background: {
      default: "#0a0a0a", // Dark Space
      paper: "#121212", // Dark Grey
    },
    text: {
      primary: "#ffffff", // White
      secondary: "#bdbdbd", // Light Grey
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "sans-serif"',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "0.05em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
      letterSpacing: "0.04em",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: "0.03em",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: "0.02em",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
      lineHeight: 1.7,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.8,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.9,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.8,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.9,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 2,
    },
    overline: {
      fontSize: "0.625rem",
      fontWeight: 400,
      textTransform: "uppercase",
    },
  },
});
