import { colors, createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFCC00",
    },
    secondary: {
      main: "#000",
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
  typography: {
    body2: {
      fontSize: "14px",
      fontFamily: "sans-serif, MTNBrighterSans-Medium",
    },
    allVariants: {
      fontFamily: "sans-serif, MTNBrighterSans-Medium",
    },
  },
  spacing: 4,
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: "#FFCC00",
      },
      root: {
        textTransform: "capitalize",
        borderRadius: "20px",
        minWidth: "200px",
        height: "50px",
      },
    },
    MuiDialogActions: {
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        margin: ".3rem",
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: "#000",
      },
    },
  },
});
