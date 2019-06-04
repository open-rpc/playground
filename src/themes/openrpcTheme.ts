import { createMuiTheme } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        background: "white !important",
      },
    },
  },
  palette: {

  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#212121",
      paper: "black",
    },
  },
  overrides: {
    MuiTable: {
      root: {
        background: "transparent !important",
      },
    },
    MuiTypography: {
      root: {
        color: "white",
      },
    },
  },
});

export default {
  darkTheme,
  lightTheme,
};
