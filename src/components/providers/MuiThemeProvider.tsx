import { ThemeProvider, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import defaultTheme from "~/lib/style/defaultTheme";
import React, { createContext, useContext, useState } from "react";

// @ts-expect-error-next-line
declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

type UseMuiThemeOutput = [Object, (newTheme: Object) => void];
const useMuiTheme = (): UseMuiThemeOutput => {
  const [muiTheme, setMuiTheme] = useState(defaultTheme);
  return [muiTheme, setMuiTheme];
};

const MuiThemeContext = createContext<UseMuiThemeOutput>([
  defaultTheme,
  () => {},
]);

/**
 * Can be called anywhere, will provide current theme
 * + a setter to change the theme
 *
 * Internally use "useState" to remember the current theme.
 */
export const useMuiThemeContext = (): UseMuiThemeOutput => {
  return useContext(MuiThemeContext);
};

/**
 * Provides the theme
 */
export const MuiThemeProvider = ({ children }) => {
  const value = useMuiTheme();
  return (
    <MuiThemeContext.Provider value={value}>
      {/*<StyledEngineProvider injectFirst>*/}
      <ThemeProvider theme={value[0]}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
      {/*</StyledEngineProvider>*/}
    </MuiThemeContext.Provider>
  );
};
