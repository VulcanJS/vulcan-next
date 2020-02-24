// https://nextjs.org/docs/advanced-features/custom-app
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";

import apollo from "../lib/apolloClient";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default MyApp;
