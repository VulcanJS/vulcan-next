/**
 * Component inspired by next-with-apollo, with an extended API
 *
 * - you can pass "ssr: true" instead of directly passing "getDataFromTree"
 * - you can change the graphqlUri
 */
import withApollo, { WithApolloOptions } from "next-with-apollo";
import createApolloClient from "./apolloClient";
import { NextPage } from "next";
// Uncomment for v3 API
//import {
//    ApolloProvider,
//    NormalizedCacheObject
//} from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { NormalizedCacheObject } from "apollo-cache-inmemory";
import { getDataFromTree as getDataFromTreeDefault } from "@apollo/react-ssr";

// support the same options as next-with-apollo, but also additional client config + ssr activation
interface VulcanWithApolloOptions extends WithApolloOptions {
  graphqlUri?: string;
  ssr?: boolean;
}
const defaultOptions: Partial<VulcanWithApolloOptions> = {
  graphqlUri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  ssr: true,
};
const initApolloClient = (graphqlUri: string) => ({ initialState, ctx }) => {
  return createApolloClient(graphqlUri, initialState, ctx);
};
const renderWithApolloProvider = ({ Page, props }) => {
  return (
    <ApolloProvider client={props.apollo}>
      <Page {...props} />
    </ApolloProvider>
  );
};
export default (Page: NextPage, options: VulcanWithApolloOptions = {}) => {
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

  return withApollo<NormalizedCacheObject>(initApolloClient(graphqlUri), {
    render: renderWithApolloProvider,
  })(Page, withApolloOptions);
};
