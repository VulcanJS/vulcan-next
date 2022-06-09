// TODO: Unskip when updating to jest 28
import { VulcanGraphqlModel } from "@vulcanjs/graphql";
import { buildApolloSchema } from "@vulcanjs/graphql/server";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
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
const createTestApolloServer = async (
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
  await server.start();
  return server;
};
import { SampleModel } from "../sampleModel.server";

// TODO: this test doesn't pass, due to import issues,
// @see https://stackoverflow.com/questions/70420923/jest-modulenamemapper-and-npm-package-exports
// Until we fix this, you should test your server using Cypress "cy.request", as we demonstrate here:
// @see .vn/tests/vn/api/auth.server.test.ts
test.skip("can resolve a nested field", async () => {
  const server = await createTestApolloServer([SampleModel], {});
  const result = server.executeOperation({
    // You can use GraphQL Playground to build the query and paste it there,
    // by accessing http://localhost:3000/api/graphql in your browser during dev
    query: gql`
      {
        samples {
          results {
            demoResolvedField(
              someArgument: "someArgumentValue"
              anotherArgument: 42
            )
          }
        }
      }
    `,
  });
  expect(result).toEqual([{ demoResolvedField: "todo" }]);
});
