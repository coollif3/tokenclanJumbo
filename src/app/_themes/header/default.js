export const headerTheme = {
  type: "light",
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: "#2D5FB4",
          background: "#F5F7FA",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#8595A6",
          background: "#FFFFFF",
          "&:hover": {
            color: "#475259",
            background: "#FFFFFF",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#5DCBA6",
      light: "#A67FFB",
      dark: "#5E3BB7",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FF5E5B",
      light: "#FF7EA6",
      dark: "#DF295E",
      contrastText: "#FFF",
    },
    error: {
      main: "#E73145",
      light: "#FF6A70",
      dark: "#AD001E",
      contrastText: "#FFF",
    },
    warning: {
      main: "#F39711",
      light: "#FFC84C",
      dark: "#BB6900",
      contrastText: "#FFF",
    },
    info: {
      main: "#2EB5C9",
      light: "#6FE7FC",
      dark: "#008598",
      contrastText: "#FFF",
    },
    success: {
      main: "#5DCBA6", // #
      light: "#78FFD3",
      dark: "#00A073",
      contrastText: "#FFF",
    },
    text: {
      primary: "#4E4B5C",
      secondary: "#475259",
      disabled: "#A2B2C3",
      link: "#2D5FB4",
    },
    divider: "#DEE2E6",
    background: {
      paper: "#FFFFFF",
      default: "#F5F7FA",
    },
    action: {
      active: "#475259",
      hover: "#EEE5E9",
    },
  },
};
