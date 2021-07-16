import { ThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "~/lib/style/defaultTheme";
import React, { createContext, useContext, useState } from "react";

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
      <ThemeProvider theme={value[0]}>{children}</ThemeProvider>
    </MuiThemeContext.Provider>
  );
};
