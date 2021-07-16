import { ThemeProvider } from "styled-components";
import defaultTheme from "~/lib/style/defaultTheme";

import React, { createContext, useContext, useState } from "react";

type UseSCThemeOutput = [Object, (newTheme: Object) => void];
const useSCTheme = (): UseSCThemeOutput => {
  /**
   * We don't really need to track the current theme, as Styled Components Theme Provider already does it
   * However, it doesn't provide any feature to easily switch the theme, only to read it
   * So we use our own useState in order to also get a setter
   *
   * @see https://styled-components.com/docs/advanced#via-usecontext-react-hook
   */
  const [muiTheme, setSCTheme] = useState(defaultTheme);
  return [muiTheme, setSCTheme];
};

const SCThemeContext = createContext<UseSCThemeOutput>([
  defaultTheme,
  () => {},
]);

/**
 * Can be called anywhere, will provide current theme
 * + a setter to change the theme
 *
 * Internally use "useState" to remember the current theme.
 */
export const useSCThemeContext = (): UseSCThemeOutput => {
  return useContext(SCThemeContext);
};

/**
 * Provides the theme
 */
export const SCThemeProvider = ({ children }) => {
  const value = useSCTheme();
  return (
    <SCThemeContext.Provider value={value}>
      <ThemeProvider theme={value[0]}>{children}</ThemeProvider>
    </SCThemeContext.Provider>
  );
};
