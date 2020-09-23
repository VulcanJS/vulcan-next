/*
v3 syntax
import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
*/
import { IncomingHttpHeaders } from "http";
import { ApolloClient, from, createHttpLink } from "@apollo/client";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
// TODO: Isomorphic-unfetch will produce a window not defined after a Webpack build for unknow reason "isomorphic-unfetch";
// next-with-apollo depends on it already internally, so we had to add a Webpack alias too to bypass it
import fetch from "cross-fetch";
import { NextPageContext } from "next";
import { isServerRenderCtx } from "@vulcanjs/next-utils";
import debug from "debug";
const debugApollo = debug("vn:apollo");

import errorLink from "./links/error";

const httpLink = (graphqlUri: string, ctx?: NextPageContext) =>
  createHttpLink({
    uri: graphqlUri, // (must be absolute)
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
    headers: isServerRenderCtx(ctx)
      ? { Cookie: ctx.req.headers.cookie }
      : undefined,
    fetch, // pass our custom fetch (here we need an isomorphic call)
  });

export interface CreateApolloClientArgs {
  graphqlUri: string;
  ctx?: NextPageContext;
  initialState?: NormalizedCacheObject;
  headers?: IncomingHttpHeaders;
}

// graphqlUri must be specified at apollo client initialization
export default function createApolloClient({
  graphqlUri,
  initialState,
  ctx,
}: CreateApolloClientArgs) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  debugApollo("Creating an Apollo client");
  const client = new ApolloClient({
    name: "default-client",
    connectToDevTools: !Boolean(ctx),
    ssrMode: Boolean(ctx),
    link: from([errorLink, httpLink(graphqlUri, ctx)]),
    cache: new InMemoryCache().restore(initialState),
  });
  if (!ctx) {
    // client-side, store the Apollo client as the default upon creation
    debugApollo("Storing new Apollo client as the default client");
    if (!defaultApolloClient) {
      defaultApolloClient = client;
    } else {
      debugApollo("Default apollo client already initialized, doing nothing");
    }
  }
  return client;
}

// Create client-side Apollo client once
// We want this initialization to happen once for all
let defaultApolloClient;

/**
 * Get apollo client, either in the context of SSR rendering
 * or client side
 * @param params
 */
export const getApolloClient = (params?: CreateApolloClientArgs) => {
  if (params && isServerRenderCtx(params.ctx)) {
    // TODO: get client from request if any instead of creating it systematically
    return createApolloClient(params);
  }
  // default apolloClient, note that it won't have any caching
  // to be used in services for example, outside of React
  if (!defaultApolloClient) {
    throw new Error(
      "Apollo client not initialized, did you wrap your page with `withApollo?`"
    );
  }
  return defaultApolloClient;
};
