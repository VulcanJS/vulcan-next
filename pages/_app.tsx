import { AppProps } from "next/app";
import { withVulcan } from "@vulcan/core";
// import environment from '@vulcan/multi-env-demo';

// console.log('imported environment', environment); // should display "server"/"client" depending on the environment, just a test

const IS_PROD = process.env.NODE_ENV === "production";

const graphqlUrl = IS_PROD
  ? process.env.GRAPHQL_URL
  : "http://localhost:3001/graphql";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withVulcan({ ssr: true, graphqlUrl })(MyApp);
