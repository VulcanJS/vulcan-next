/**
 * Demo of a theme switch button
 */
import React, { useState } from "react";
import { useMuiThemeContext } from "../MuiThemeProvider";
import darkTheme from "~/lib/style/darkTheme";
import defaultTheme from "~/lib/style/defaultTheme";
import { styled } from "@material-ui/core/styles";

export default {
  title: "VN/ThemeSwitch",
  //component: useSCThemeContext //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

const ThemedDiv = styled("div")(
  ({ theme }) => `
  color: ${theme.palette.text.primary};
  background-color: ${theme.palette.background.default};
`
);

const ThemeSwitchDemo = () => {
  const [currentMuiTheme, setMuiTheme] = useMuiThemeContext();
  const [isDark, setIsDark] = useState(false); // default is light
  const toggleMuiTheme = () => {
    const nextTheme = isDark ? defaultTheme : darkTheme;
    setMuiTheme(nextTheme);
    setIsDark(!isDark);
  };
  return (
    <ThemedDiv>
      <div>
        <button onClick={toggleMuiTheme}>Switch Material UI theme</button>
      </div>
      <div>Current theme:</div>
      <div>{JSON.stringify(currentMuiTheme, null, 2)}</div>
    </ThemedDiv>
  );
};

export const themeSwitchDemo = () => <ThemeSwitchDemo />;
