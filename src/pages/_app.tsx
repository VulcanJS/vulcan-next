import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement } from "react";
// Comment if you don't need i18n
import { appWithTranslation } from "next-i18next";

// Comment if you don't need Material UI
import { createEmotionCache } from "@vulcanjs/next-mui";
import { MuiThemeProvider } from "~/components/providers";

import Head from "next/head";
import { VulcanComponentsProvider } from "@vulcanjs/react-ui";

import debug from "debug";
import AppLayout from "~/components/layout/AppLayout";
const debugPerf = debug("vns:perf");
// @see https://nextjs.org/docs/advanced-features/measuring-performance
export function reportWebVitals(metric) {
  debugPerf(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
}

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@vulcanjs/next-apollo";
import { CacheProvider, EmotionCache } from "@emotion/react";

// import environment from '@vulcanjs/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, this is just a test

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// @see https://nextjs.org/docs/basic-features/layouts#with-typescript
// Doc says to use "ReactNode" as the return type at the time of writing (09/2021) but then that fails appWithTranslation
// , ReactElement seems more appropriate
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement; //ReactNode;
};

export interface VNAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
}

const Favicons = () => (
  <>
    {/* Favicon created using https://realfavicongenerator.net/ */}
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    ></link>
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    ></link>
    <link rel="manifest" href="/site.webmanifest"></link>
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
    <meta name="msapplication-TileColor" content="#da532c"></meta>
    <meta name="theme-color" content="#ffffff"></meta>
  </>
);

function VNApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: VNAppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState, {
    graphqlUri:
      process.env.NEXT_PUBLIC_GRAPHQL_URI ??
      "http://localhost:3000/api/graphql",
    crossDomainGraphqlUri:
      !!process.env.NEXT_PUBLIC_CROSS_DOMAIN_GRAPHQL_URI || false,
  }); // you can also easily setup ApolloProvider on a per-page basis
  // Use the layout defined at the page level, if available
  // @see https://nextjs.org/docs/basic-features/layouts
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <CacheProvider value={emotionCache}>
      <VulcanComponentsProvider>
        <Head>
          <title>Vulcan Next</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <Favicons />
        </Head>
        {/** Provide MUI theme but also mui utilities like CSS baseline, StyledEngineProvider... */}
        <MuiThemeProvider>
          <ApolloProvider client={apolloClient}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ApolloProvider>
        </MuiThemeProvider>
      </VulcanComponentsProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(VNApp);
