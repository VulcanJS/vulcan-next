# GraphQL Client

## Apollo Client for GraphQL API consumption

### Apollo Client setup based on official with-apollo example

See [official example](https://github.com/vercel/next.js/blob/canary/examples/with-apollo)

### Deprecated isomorphic setup

See branch `example/apollo-ssr-and-server-redirect` for a previous setup of Apollo. It demoes a powerful setup that can handle Apollo with SSR and authentication.
However, this architecture led to a HUGE increase of complexity for a very low perceived values.
We dropped it in favour in an "opt-in" approach of Apollo SSR and a client-only pattern for authentication management similar to Vercel's dashboard architecture.
See [Public is the new private ticket](https://github.com/VulcanJS/vulcan-next/issues/71) for more details.

### Optional, per-page Apollo Provider and SSR

We extend [`next-with-apollo`](https://github.com/lfades/next-with-apollo) with a simpler API. Apollo SSR is enabled page per page, for a granular optimization.

```js
withApollo(MyPage); // add ApolloProvider with the default apollo client, but no SSR
withApollo(MyPage, { ssr: true }); // will fetch data during server-side render automatically
MyPage; // no SSR, no Apollo Provider
```

With have a non-regression test for SSR, so no surprise with component that suddenly appear in loading state.

### Pass cookies to Apollo client during server render

This allow to make authenticated calls

### Cross-domain connection

Enable NEXT_PUBLIC_CROSS_DOMAIN_GRAPHQL_URI=1 to connect to APIs from 3rd party applications. This is useful if you must connected
to an existing Vulcan graphql API (a legacy Meteor API, another Vulcan Next application, or a Vulcan Express backend).

In particular, this will enable crendentials inclusion so login cookie works as expected.