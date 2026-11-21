import { useTheme } from "@mui/material/styles";
import { colors } from "./colors";

export function useDarkTheme() {
  const theme = useTheme();
  return {
    palette: {
      mode: "dark",

      primary: {
        main: colors.blue[400],
        light: colors.blue[200],
        dark: colors.blue[800],
        subtle: colors.blue[950],
        contrastText: "#000", // colors.blue[50],
      },

      secondary: {
        main: colors.teal[400],
        light: colors.teal[200],
        dark: colors.teal[800],
        subtle: colors.teal[950],
        contrastText: "#000", //"#fff",
      },

      success: {
        main: colors.green[400],
        light: colors.green[200],
        dark: colors.green[800],
        subtle: colors.green[950],
        contrastText: "#000", // colors.green[50],
      },

      warning: {
        main: colors.amber[400],
        light: colors.amber[200],
        dark: colors.amber[800],
        subtle: colors.amber[950],
        contrastText: "#000", // colors.amber[50],
      },

      info: {
        main: colors.cyan[400],
        light: colors.cyan[200],
        dark: colors.cyan[800],
        subtle: colors.cyan[950],
        contrastText: "#000", // colors.cyan[50],
      },

      error: {
        main: colors.red[400],
        light: colors.red[200],
        dark: colors.red[800],
        subtle: colors.red[950],
        contrastText: "#000", //colors.red[50],
      },

      background: {
        default: "#1F1F1F",
        paper: "#090909",
        drawer: "#090909",
      },
      text: {
        primary: "#fff",
        secondary: colors.gray[200],
        disabled: colors.gray[500],
      },
      divider: colors.neutral[600],
    },
  };
}
