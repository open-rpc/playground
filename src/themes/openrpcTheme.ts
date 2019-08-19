import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

export const lightTheme = createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  overrides: {
    MuiToolbar: {
      root: {
        background: "transparent !important",
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: "transparent !important",
      },
      colorDefault: {
        background: "transparent !important",
      },
      colorPrimary: {
        background: "transparent !important",
      },
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
  },
});

export const darkTheme = createMuiTheme({
  props: {
    MuiAppBar: {
      position: "sticky",
    },
    MuiCard: {
      elevation: 0,
    },
  },
  palette: {
    type: "dark",
    background: {
      default: grey[900],
      paper: "transparent",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: "transparent !important",
      },
      colorPrimary: {
        background: "transparent !important",
      },
    },
    MuiToolbar: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: grey[400],
      },
    },
  },
});

export default {
  darkTheme,
  lightTheme,
};
