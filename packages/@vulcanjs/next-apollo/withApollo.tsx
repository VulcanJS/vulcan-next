/**
 * Component inspired by next-with-apollo, with an extended API
 *
 * - you can pass "ssr: true" instead of directly passing "getDataFromTree"
 * - you can change the graphqlUri
 */
import React from "react";
import withApollo, { WithApolloOptions } from "next-with-apollo";
import createApolloClient from "./apolloClient";
import { NextPage } from "next";
// Uncomment for v3 API
//import {
//    ApolloProvider,
//    NormalizedCacheObject
//} from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { NormalizedCacheObject } from "@apollo/client/cache";
import { getDataFromTree as getDataFromTreeDefault } from "@apollo/client/react/ssr";

// support the same options as next-with-apollo, but also additional client config + ssr activation
export interface VulcanWithApolloOptions extends WithApolloOptions {
  graphqlUri?: string;
  ssr?: boolean;
}
const defaultOptions: Partial<VulcanWithApolloOptions> = {
  graphqlUri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  ssr: true,
};
const initApolloClient = (graphqlUri: string) => ({ initialState, ctx }) => {
  return createApolloClient({ graphqlUri, initialState, ctx });
};
const renderWithApolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};
const vulcanWithApollo = (
  Page: NextPage,
  options: VulcanWithApolloOptions = {}
) => {
  const mergedOptions = { ...defaultOptions, ...options };
  const {
    graphqlUri,
    ssr,
    getDataFromTree: getDataFromTreeFromOptions,
    render: renderFromOption,
  } = mergedOptions;

  const getDataFromTree =
    getDataFromTreeFromOptions || (ssr && getDataFromTreeDefault);

  const withApolloOptions = { getDataFromTree, renderFromOption };

  // next-with-apollo is using typings from Apollo v2, we need to ignore the error until it's updated 2654
  // @ts-ignore
  return withApollo<NormalizedCacheObject>(initApolloClient(graphqlUri), {
    render: renderWithApolloProvider,
  })(Page, withApolloOptions);
};

export default vulcanWithApollo;
