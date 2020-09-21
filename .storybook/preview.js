import * as React from "react";
// Globally in your .storybook/preview.js.
// import { withKnobs } from "@storybook/addon-knobs"; // We don't install Knobs as a default anymore, favouring Controls instead
// import { withInfo } from "@storybook/addon-info";
import { withA11y } from "@storybook/addon-a11y";
import { MuiThemeProvider, SCThemeProvider } from "~/components/providers";
import { I18nextProvider } from "react-i18next";
import { i18n } from "~/lib/i18n";
import { AppLayout } from "~/components/layout";

// import { withContexts } from "@storybook/addon-contexts/react"
// import  { contexts } from "./contexts"

import { backgrounds } from "./backgrounds";
export const parameters = {
  // FIXME: for some reason the extension stop working when we set custom backgrounds
  backgrounds,
  // ...withContext(contexts)
  actions: { argTypesRegex: "^on[A-Z].*" },
};

// If you need to mock apollo queries
//import { MockedProvider } from "@apollo/react/testing";
//import mocks from "add path to your graphql mocks here"
//const withApolloMockProvider = (storyFn) => (
//  <MockedProvider mocks={mocks} addTypename={false}>
//    {storyFn()}
//  </MockedProvider>
//);

const withMui = (storyFn) => <MuiThemeProvider>{storyFn()}</MuiThemeProvider>;
const withSC = (storyFn) => <SCThemeProvider>{storyFn()}</SCThemeProvider>;

const withI18n = (storyFn) => (
  <React.Suspense fallback={"Loading i18n..."}>
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
  </React.Suspense>
);

const withAppLayout = (storyFn) => <AppLayout>{storyFn()}</AppLayout>;

export const decorators = [
  // @see https://gist.github.com/justincy/c1075650b1d5ba448c50eaf83cbb4ffe
  /*withApolloMockProvider*/
  withMui,
  withSC,
  withI18n,
  withAppLayout,
  withA11y,
  //withKnobs,
];
