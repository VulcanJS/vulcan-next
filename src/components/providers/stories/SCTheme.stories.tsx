/**
 * Demo of a theme switch button
 */
import React, { useState } from "react";
import { useSCThemeContext } from "../SCThemeProvider";
import styled from "styled-components";
import darkTheme from "~/lib/style/darkTheme";
import defaultTheme from "~/lib/style/defaultTheme";

export default {
  title: "VNS/ThemeSwitch",
  //component: useSCThemeContext //  decoractors: [(storyFn) => <div>{storyFn()}</div>
};

const ThemedDiv = styled.div`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ThemeSwitchDemo = () => {
  const [currentSCTheme, setSCTheme] = useSCThemeContext();
  const [isDark, setIsDark] = useState(false); // default is light
  const toggleSCTheme = () => {
    const nextTheme = isDark ? defaultTheme : darkTheme;
    setSCTheme(nextTheme);
    setIsDark(!isDark);
  };
  return (
    <ThemedDiv>
      <div>
        <button onClick={toggleSCTheme}>Switch Styled Components theme</button>
      </div>
      <div>Current theme:</div>
      <div>{JSON.stringify(currentSCTheme, null, 2)}</div>
    </ThemedDiv>
  );
};

export const themeSwitchDemo = () => <ThemeSwitchDemo />;
