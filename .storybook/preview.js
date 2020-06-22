import * as React from "react";
// Globally in your .storybook/preview.js.
import { addDecorator } from "@storybook/react";
// import { withInfo } from "@storybook/addon-info";
import MuiProvider from "~/components/provider/MuiProvider";
import { I18nextProvider } from "react-i18next";
import { i18n } from "~/lib/i18n";

// If you need to mock apollo queries
//import { MockedProvider } from "@apollo/react-testing";
//import mocks from "add path to your graphql mocks here"
//const withApolloMockProvider = (storyFn) => (
//  <MockedProvider mocks={mocks} addTypename={false}>
//    {storyFn()}
//  </MockedProvider>
//);

const withMui = (storyFn) => <MuiProvider>{storyFn()}</MuiProvider>;

const withI18n = (storyFn) => (
  <React.Suspense fallback={"Loading i18n..."}>
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
  </React.Suspense>
);
[
  // @see https://gist.github.com/justincy/c1075650b1d5ba448c50eaf83cbb4ffe

  /*withApolloMockProvider*/
  withMui,
  withI18n,
].forEach(addDecorator);
