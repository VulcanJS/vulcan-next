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
/*
// Uncomment to enable app-wide Apollo SSR
// Otherwise you'll need to call withApollo on each page
import { withApollo } from "@vulcanjs/next-apollo";
import { getDataFromTree } from "@apollo/client/react/ssr";
*/

// import environment from '@vulcanjs/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, just a test

function VNSApp({ Component, pageProps }: AppProps) {
  useMuiApp(); // comment to disable Material UI
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
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SCThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

// Neeeded for next-i18n next to work
// Comment if you don't need i18n
VNSApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

// export default withApollo()(MyApp, { ssr: false }) // uncomment to enable Apollo but without SSR
// export default withApollo()(MyApp); // uncomment to enable Apollo and SSR
export default appWithTranslation(VNSApp);
