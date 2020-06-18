import App, { AppProps } from "next/app";
// Comment if you don't need i18n
import { appWithTranslation } from "~/lib/i18n";
// Comment if you don't need Material UI
import { ThemeProvider } from "@material-ui/core/styles";
import { useMuiApp } from "@vulcan/next-material-ui";
import defaultTheme from "~/lib/material-ui/defaultTheme";
import Head from "next/head";
import app from "./api/graphql";

/*
// Uncomment to enable app-wide Apollo SSR
// Otherwise you'll need to call withApollo on each page
import { withApollo } from "@vulcan/next-apollo";
import { getDataFromTree } from "@apollo/react-ssr";
*/

// import environment from '@vulcan/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, just a test

// import "@vulcan/react-i18n"; // enable i18n

function VNSApp({ Component, pageProps }: AppProps) {
  useMuiApp(); // comment to disable Material UI
  return (
    <>
      <Head>
        <title>Vulcan Next Starter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

// Neeeded for next-i18n next to work
// Comment if you don't need i18n
VNSApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // Res.locals is expected by some Express like middlewares, but does not seem to be set in production for some reason
  // @see https://github.com/i18next/i18next-http-middleware/issues/15
  // @see https://github.com/isaachinman/next-i18next/pull/738
  if (appContext.ctx && appContext.ctx.res && !appContext.ctx.res.locals) {
    appContext.ctx.res.locals = {};
  }
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

// export default withApollo()(MyApp, { ssr: false }) // uncomment to enable Apollo but without SSR
// export default withApollo()(MyApp); // uncomment to enable Apollo and SSR
export default appWithTranslation(VNSApp);
