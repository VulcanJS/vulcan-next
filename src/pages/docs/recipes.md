## Magic imports

- Use the `paths` property of tsconfig.common.json.
- Add an alias in Next's Webpack config
- Add an alias in Jest moduleNameMapper config

[Relevant documentation](https://www.typescriptlang.org/docs/handbook/module-resolution.html)

### Why 2-steps?

Using TypeScript `paths` will only tell TypeScript where to find the code. However, it won't replace your import path at build time.

So, you also need Webpack to actually replace `~/components/myComponent` to `../../../components/myComponent`.

## Debugging Cypress build

See [Cypress Webpack Preprocessor doc](https://github.com/cypress-io/cypress-webpack-preprocessor), it describes a few environment variables useful to debug Cypress build.

## Mock next packages

Use a Webpack alias.

## Connect to multiple graphql API in the frontend

### Schema stitching?

Handling connections to multiple graphQL APIs is the nightmare of the modern frontend developer.

- Your backend team may not be able to provide a unique API either. So you often need a way to do schema stitching client side.
- Most documentations about schema stitching (client-side) assume that you own the schema (meaning you can get it locally), and that of course it's written in JS. But real frontend developers, most often, connect to APIs they don't own, probably written in a various set of languages...
- You can do stitching of remote schemas, but documentation is rather terse.

See  [GraphQL tools documentation](https://www.graphql-tools.com/docs/remote-schemas/) for more infos on remote schemas and stitching.

### Multiple Apollo clients?

No, you don't do that. That messes up everything. EVERYTHING. Cache, optimistic UI, development tools... See the section just below for a cleaner, simpler pattern.

### Smart replacement of the HTTP link

But there is one neat trick that "Adepts of the schema stitch" don't want you to know!

It is described in this article from [Loud noises](https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/#comment-4707415813). One user, @naveennazimudeen, proposed an extended version [in the comments of said article](https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/#comment-4707415813) to handle N services.

The idea is to use [directionnal composition](https://www.apollographql.com/docs/link/composition/#directional-composition) from Apollo Link. That's a frightening term to say that you can replace a link depending on the context. Let's see the code:

```js
// Using Apollo v2, but it should extend to newer versions
import { split } from "apollo-link"
// Compute the HTTP link depending on the context
const getHttpLink = (operation) => {
  const service = operation.getContext().service;
  let uri= "";
  if (!service || service === "main") uri = "http://localhost:3000/api/graphql";
  if (service === "user") uri = "http://my-user-service.whatever";
  if (service === "vulcan") uri = "http://localhost:3001/graphql"
  const link = httpLink(uri);
  return link.request(operation);
};

// Trick to be able to load any number of links using split, by calling a function
const multiUriHttpLink = split(
    () => true, // force to call the first (and only) branch of the split
    operation => getHttpLink(operation, ctx) // by using a function, we allow to split between any number of links
  );

// and then in your ApolloClient construction:
...
link: from([errorLink, multiUriHttpLink]),
...
```

And then you can swap the service like so:

```js
// usage
const { data, loading, error} = useQuery(MY_QUERY, { context: { service: "service1"}})
```

**Main limitation is that you can call services only one by one.** This pattern is not the recommended way to call multiple APIs, it has clear limitations. But it does the trick , especially if you need to quickly connect to many 3rd party libraries in isolated parts of your app.

Since we use the same client and only change a link, the Apollo cache is shared between services. DevTools should still work with this approach.