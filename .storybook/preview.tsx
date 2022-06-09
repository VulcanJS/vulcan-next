import * as React from "react";
import { withA11y } from "@storybook/addon-a11y";
import { MuiThemeProvider } from "~/core/components/providers";
import { I18nextProvider } from "react-i18next";
// Vulcan custom i18n
// FIXME: breaks ESM currently
// import { makeStringsRegistry } from "@vulcanjs/i18n";
// import { IntlProvider } from "@vulcanjs/react-i18n";

// @see https://github.com/isaachinman/next-i18next/issues/1012
import { i18n } from "next-i18next";
//import { AppLayout } from "~/components/layout";
import { GlobalAppStyle } from "~/core/components/layout/AppLayout";

// @see https://github.com/vercel/next.js/pull/28528
// import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.2
// import { RouterContext } from "next/dist/next-server/lib/router-context"; // next < 11.2
import { RouterContext } from "next/dist/shared/lib/router-context"; // next **12**

import { backgrounds } from "./backgrounds";
export const parameters = {
  // FIXME: for some reason the extension stop working when we set custom backgrounds
  backgrounds,
  // ...withContext(contexts)
  actions: { argTypesRegex: "^on[A-Z].*" },
  // @see https://storybook.js.org/addons/storybook-addon-next-router
  // allow easy mocking of the router
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

const withMui = (storyFn) => <MuiThemeProvider>{storyFn()}</MuiThemeProvider>;

const withI18n = (storyFn) => (
  <React.Suspense fallback={"Loading i18n..."}>
    {/** @ts-ignore */}
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
  </React.Suspense>
);

const withGlobalAppStyle = (storyFn) => (
  <GlobalAppStyle>{storyFn()}</GlobalAppStyle>
);

/*
const withVulcanI18n = (storyFn) => (
  <IntlProvider
    locale="fr"
    stringsRegistry={makeStringsRegistry()}
    messages={[]}
  >
    {storyFn()}
  </IntlProvider>
);*/

export const decorators = [
  withMui,
  // @see https://gist.github.com/justincy/c1075650b1d5ba448c50eaf83cbb4ffe
  withI18n,
  withGlobalAppStyle,
  withA11y,
  //withVulcanI18n,
];
