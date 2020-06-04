import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import errorLink from "./links/error";
import fetch from "isomorphic-unfetch";

export default function createApolloClient(
  graphqlUrl: string,
  initialState: NormalizedCacheObject,
  ctx: Object
) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    name: "default-client",
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([
      errorLink,
      new HttpLink({
        uri: graphqlUrl, // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        fetch,
      }),
    ]),
    cache: new InMemoryCache().restore(initialState),
  });
}
