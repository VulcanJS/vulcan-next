// Demo a context switch for Style Components theme
// Using @storybook/addon-contexts
// FIXME: not yet tested, as we wait for Storybook v6.0.0 official release
import darkTheme from "~/lib/style/darkTheme";
import defaultTheme from "~/lib/style/defaultTheme";
import { SCThemeProvider } from "~/src/components/providers/SCThemeProvider";
export const contexts = [
  {
    title: "Theme",
    components: [SCThemeProvider],
    params: [
      {
        name: "Default theme",
        props: { theme: defaultTheme },
        default: true,
      },
      {
        name: "Dark theme",
        props: { theme: darkTheme },
      },
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: false,
    },
  },
];
