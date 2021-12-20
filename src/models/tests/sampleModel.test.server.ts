import { VulcanGraphqlModel } from "@vulcanjs/graphql";
import { buildApolloSchema } from "@vulcanjs/graphql/server";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
// Import the server version in order to generate the graphql schema

/**
 * Create an Apollo Server for integration testing of graphql resolvers
 *
 * NOTE: this won't run an actual server on localhost:3000/graphql,
 * it simply returns an Apollo server object
 *
 * Use executeOperation method to test queries
 *
 * @see https://www.apollographql.com/docs/apollo-server/testing/testing/
 */
const createTestApolloServer = (
  models: Array<VulcanGraphqlModel>,
  context: any
) => {
  // Build a Vulcan schema just for this model
  const vulcanRawSchema = buildApolloSchema(models);
  const vulcanExecutableSchema = makeExecutableSchema(vulcanRawSchema);
  // Spawn an Apollo server with just this schema
  const server = new ApolloServer({
    schema: vulcanExecutableSchema,
    debug: true,
    context: {},
  });
  return server;
};
import { SampleModel } from "../sampleModel.server";
test("can resolve a nested field", () => {
  const server = createTestApolloServer([SampleModel], {});
  const result = server.executeOperation({
    // You can use GraphQL Playground to build the query and paste it there,
    // by accessing http://localhost:3000/api/graphql in your browser during dev
    query: `{
  samples {
    results {
      _id
      demoResolvedField(
        someArgument: "someArgumentValue"
        anotherArgument: 42
      )
    }
  }
}
`,
    variables: {
      someArgument: "someArgumentValue",
      anotherArgument: 42,
    },
  });
});
