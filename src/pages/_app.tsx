import App, { AppProps } from "next/app";
// Comment if you don't need i18n
import { appWithTranslation } from "~/lib/i18n";

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
  return <Component {...pageProps} />;
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
