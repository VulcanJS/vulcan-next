import App, { AppProps } from "next/app";
// Comment if you don't need i18n
import { appWithTranslation } from "~/lib/i18n";
// Comment if you don't need Material UI
import { useMuiApp } from "@vulcanjs/next-material-ui";
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

// import environment from '@vulcanjs/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, this is just a test

function VNApp({ Component, pageProps }: AppProps) {
  useMuiApp(); // comment to disable Material UI
  const apolloClient = useApollo(pageProps.initialApolloState, {
    graphqlUri:
      process.env.NEXT_PUBLIC_GRAPHQL_URI ??
      "http://localhost:3000/api/graphql",
    crossDomainGraphqlUri:
      !!process.env.NEXT_PUBLIC_CROSS_DOMAIN_GRAPHQL_URI || false,
  }); // you can also easily setup ApolloProvider on a per-page basis
  return (
    <VulcanComponentsProvider>
      <Head>
        <title>Vulcan Next</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#5bbad5"
        ></link>
        <meta name="msapplication-TileColor" content="#da532c"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <MuiThemeProvider>
        <ApolloProvider client={apolloClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ApolloProvider>
      </MuiThemeProvider>
    </VulcanComponentsProvider>
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
