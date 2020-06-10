import { AppProps } from "next/app";
/*
// Uncomment to enable app-wide Apollo SSR
// Otherwise you'll need to call withApollo on each page
import { withApollo } from "@vulcan/next-apollo";
import { getDataFromTree } from "@apollo/react-ssr";
*/

// import environment from '@vulcan/multi-env-demo';
// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, just a test

const IS_PROD = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// export default withApollo()(MyApp) // uncomment to enable Apollo but without SSR
// export default withApollo()(MyApp, { getDataFromTree }); // uncommant to enable Apollo and SSR
export default MyApp;
