import App, { AppProps } from "next/app";
// Comment if you don't need i18n
import { appWithTranslation } from "~/lib/i18n";
// Comment if you don't need Material UI
import { useMuiApp } from "@vulcanjs/next-material-ui";
import { SCThemeProvider, MuiThemeProvider } from "~/components/providers";
import Head from "next/head";

import debug from "debug";
import AppLayout from "~/components/layout/AppLayout";
const debugPerf = debug("vns:perf");
// @see https://nextjs.org/docs/advanced-features/measuring-performance
export function reportWebVitals(metric) {
  debugPerf(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
}

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@vulcanjs/next-apollo";

// import environment from '@vulcanjs/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, this is just a test

function VNApp({ Component, pageProps }: AppProps) {
  useMuiApp(); // comment to disable Material UI
  const apolloClient = useApollo(pageProps.initialApolloState, {
    graphqlUri: "http://localhost:3000/api/graphql",
  }); // you can also easily setup ApolloProvider on a per-page basis
  return (
    <>
      <Head>
        <title>Vulcan Next</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider>
        <SCThemeProvider>
          <ApolloProvider client={apolloClient}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ApolloProvider>
        </SCThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

// Neeeded for next-i18n next to work
// Comment if you don't need i18n
VNApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(VNApp);
