import express, { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { buildApolloSchema, createDataSources } from "@vulcanjs/graphql/server";

import mongoConnection from "~/lib/api/middlewares/mongoConnection";
import corsOptions from "~/lib/api/cors";
import models from "~/models/index.server";
import runSeed from "~/lib/api/runSeed";

import { contextFromReq } from "~/lib/api/context";
import { connectToAppDbMiddleware } from "~/lib/api/middlewares/mongoAppConnection";

/**
 * Example graphQL schema and resolvers generated using Vulcan declarative approach
 * http://vulcanjs.org/
 */
const vulcanRawSchema = buildApolloSchema(models);

/**
 * Example custom Apollo server, written by hand
 */
const customTypeDefs = gql`
  type Query {
    restaurants: [Restaurant]
  }
  type Restaurant {
    _id: ID!
    name: String
  }
`;
const customResolvers = {
  Query: {
    // Demo with mongoose
    // Expected the database to be setup with the demo "restaurant" API from mongoose
    async restaurants() {
      try {
        const db = mongoose.connection;
        const restaurants = db.collection("restaurants");
        // @ts-ignore
        const resultsCursor = (await restaurants.find(null, null)).limit(5);
        const results = await resultsCursor.toArray();
        return results;
      } catch (err) {
        console.log("Could not fetch restaurants", err);
        throw err;
      }
    },
  },
};

/*
Merging schema happens in 2 steps:
1. Merge typedefs and resolvers
=> this allow you to reuse Vulcan scalars in your own schema,
such as "JSON"
2. Make executable only after everything is merged
*/
const mergedSchema = {
  ...vulcanRawSchema,
  typeDefs: mergeTypeDefs([vulcanRawSchema.typeDefs, customTypeDefs]),
  resolvers: mergeResolvers([vulcanRawSchema.resolvers, customResolvers]),
};

const executableSchema = makeExecutableSchema(mergedSchema);

const app = express();

const createDataSourcesForModels = createDataSources(models);

// Define the server (using Express for easier middleware usage)
const server = new ApolloServer({
  schema: executableSchema,
  context: async ({ req }) => ({
    ...(await contextFromReq(req as Request)),
    /** Add your own context here (the field names must be DIFFERENT from the model names)
     * or modify "lib/api/context"
     */
  }),

  // @see https://www.apollographql.com/docs/apollo-server/data/data-sources
  dataSources: () => ({
    ...createDataSourcesForModels(),
    /* Add your own dataSources here (their name must be DIFFERENT from the model names) */
  }),
  introspection:
    !!process.env.FORCE_GRAPHQL_PLAYGROUND ||
    process.env.NODE_ENV !== "production",
  // @see https://github.com/graphql/graphql-playground/issues/1143
  // @see https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/#graphql-playground
  // We keep Graphql Playground for now until Apollo ecosystem sorts out the way we can access the web-based gql IDE
  // Apollo Studio works ok but will lead to issue with CORS, cookies etc.
  /*
  playground:
    process.env.NODE_ENV !== "production"
      ? {
          settings: {
            "request.credentials": "include",
          },
        }
      : false,*/
  plugins:
    process.env.FORCE_GRAPHQL_PLAYGROUND ||
    process.env.NODE_ENV !== "production"
      ? [
          ApolloServerPluginLandingPageGraphQLPlayground({
            // @see https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/#graphql-playground-landing-page
            // options
          }),
        ]
      : [],
  formatError: (err) => {
    // This function is mandatory to log error messages, even in development
    // You may enhance this function, eg by plugging an error tracker like Sentry in production
    console.error(err);
    return err;
  },
});
await server.start();

app.set("trust proxy", true);
const gqlPath = "/api/graphql";
// setup cors
app.use(gqlPath, cors(corsOptions));
// init the db
app.use(gqlPath, connectToAppDbMiddleware);

server.applyMiddleware({ app, path: "/api/graphql" });

// Seed in development
runSeed();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
