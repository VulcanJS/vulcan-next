import { ThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "~/lib/material-ui/defaultTheme";

export default ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
