// import debug from "debug";
// const debugApollo = debug("vn:apollo");

/**
 * @see https://github.com/vercel/next.js/examples/with-apollo/lib/apolloClient.js
 */
import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
// import { concatPagination } from "@apollo/client/utilities";
import errorLink from "./links/error";
import merge from "deepmerge";

const isClient = typeof window !== "undefined";

// Create client-side Apollo client once only
let apolloClient;

export interface CreateApolloClientOptions {
  graphqlUri?: string;
}
export function createApolloClient({ graphqlUri }: CreateApolloClientOptions) {
  return new ApolloClient({
    ssrMode: !isClient,
    connectToDevTools: isClient,
    // TODO: we can pass cookies here to authenticate from the server
    link: from([
      errorLink,
      new HttpLink({
        uri: graphqlUri, // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
      }),
    ]),
    cache: new InMemoryCache(/*{
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }*/),
  });
}

export const rehydrateApolloInitialState = (
  apolloClient: ApolloClient<any>,
  initialState?: any
) => {
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    apolloClient.cache.restore(data);
  }
};

export function initializeApollo(
  initialState = null,
  options: CreateApolloClientOptions
) {
  const _apolloClient = apolloClient ?? createApolloClient(options);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  rehydrateApolloInitialState(_apolloClient, initialState);

  // For SSG and SSR always create a new Apollo Client
  if (!isClient) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState, options: CreateApolloClientOptions) {
  const store = useMemo(() => initializeApollo(initialState, options), [
    initialState,
    options,
  ]);
  return store;
}
