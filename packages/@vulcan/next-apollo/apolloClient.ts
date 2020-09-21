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
import { ApolloClient } from "@apollo/client";
import { InMemoryCache, NormalizedCacheObject } from "@apollo/client/cache";
import { createHttpLink } from "apollo-link-http";
import { from } from "apollo-link";
import fetch from "isomorphic-unfetch";
import { NextPageContext } from "next";
import { isServerRenderCtx } from "@vulcan/next-utils";

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

// graphqlUri must be specified at apollo client initialization
export default function createApolloClient(
  graphqlUri: string,
  initialState: NormalizedCacheObject,
  ctx?: NextPageContext
) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    name: "default-client",
    connectToDevTools: !Boolean(ctx),
    ssrMode: Boolean(ctx),
    link: from([errorLink, httpLink(graphqlUri, ctx)]),
    cache: new InMemoryCache().restore(initialState),
  });
}
