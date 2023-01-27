import { colors, createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(155, 28, 141, 1)",
    },
    secondary: {
      main: "#006993",
    },
    common: {
      black: "#202020",
      white: "#fff",
    },
    info: {
      main: "#006993",
    },
    success: {
      main: "#6ACC47",
    },
  },
  typography: {},
  spacing: 4,
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "rgba(155, 28, 141, 1)",
      },
      root: {
        textTransform: "capitalize",
        width: "162px",
        height: "48px",
        borderRadius: "20px",
      },
    },
    MuiTextField: {
      root: {},
    },
  },
});
