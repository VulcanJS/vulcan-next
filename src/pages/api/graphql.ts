import express, { Request } from "express";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";

import { buildApolloSchema, createDataSources } from "@vulcanjs/graphql/server";

import corsOptions from "~/core/server/cors";
import models from "~/core/models.server";

import { contextFromReq } from "~/core/server/context";
import { connectToAppDbMiddleware } from "~/core/server/middlewares/mongoAppConnection";

// 1. DEFINING YOUR GRAPHQL SCHEMAS + GENERATING CRUD OPERATIONS WITH VULCAN FIRE + IMPORT 3RD PARTY REUSABLE RESOLVERS AND TYPES

/**
 * Mongo uses ObjectId for _id, instead of normal strings
 * This scalar handles the conversion for you
 *
 * You may remove it if you prefer string ids (as Meteor does)
 * @see https://stackoverflow.com/questions/27896979/difference-between-storing-an-objectid-and-its-string-form-in-mongodb
 */
import {
  objectIdTypeDefs,
  objectIdResolvers,
} from "@vulcanjs/mongo-apollo/server";

/**
 * Generate basic CRUD resolvers with Vulcan Fire
 * @see https://vulcan-docs.vercel.app/docs/vulcan-fire/customTopLevelResolvers
 */
const vulcanRawSchema = buildApolloSchema(models);

/**
 * Add your custom GraphQL types here if needed
 * @see https://vulcan-docs.vercel.app/docs/vulcan-fire/customTopLevelResolvers
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

/**
 * Add your custom resolvers here if needed
 * @see https://vulcan-docs.vercel.app/docs/vulcan-fire/customTopLevelResolvers
 */
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

// 2. MERGING SCHEMAS AND MAKING THEM EXECUTABLE
/*
Merging schema happens in 2 steps:
1. Merge typedefs and resolvers
=> this allow you to reuse Vulcan scalars in your own schema,
such as "JSON"
2. Make executable only after everything is merged
*/
const mergedSchema = {
  ...vulcanRawSchema,
  // order matters (Vulcan will use Mongo typedefs, and your custom typedefs might use Vulcan etc.)
  typeDefs: mergeTypeDefs([
    objectIdTypeDefs,
    vulcanRawSchema.typeDefs,
    customTypeDefs,
  ]),
  resolvers: mergeResolvers([
    objectIdResolvers,
    vulcanRawSchema.resolvers,
    customResolvers,
  ]),
};
const executableSchema = makeExecutableSchema(mergedSchema);

// 3. SINITIALIZING THE GRAPHQL SERVER (Apollo and Express)

const app = express();

/**
 * This function generates optimized Apollo Data Sources for your Vulcan Models
 * @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 */
const createDataSourcesForModels = createDataSources(models);

const server = new ApolloServer({
  schema: executableSchema,
  // @see https://www.apollographql.com/docs/apollo-server/security/cors#preventing-cross-site-request-forgery-csrf
  csrfPrevention: true,
  // @see https://github.com/apollographql/apollo-server/blob/main/CHANGELOG.md#v390
  cache: "bounded" as const,
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
    !!process.env.ALLOW_INTROSPECTION || process.env.NODE_ENV !== "production",
  plugins: [
    // If you prefer Playground:
    // @see https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault()
      : ApolloServerPluginLandingPageLocalDefault({
          includeCookies: true,
          // Removed the need for a complex CORS/cookies configuration, Apollo Studio runs in localhost
          embed: true,
        }),
  ],
  formatError: (err) => {
    // This function is mandatory to log error messages, even in development
    // You may enhance this function, eg by plugging an error tracker like Sentry in production
    console.error(err);
    return err;
  },
});

// Starts Apollo
await server.start();

app.set("trust proxy", true);
const gqlPath = "/api/graphql";
// init the db
app.use(gqlPath, connectToAppDbMiddleware);

// Ties Apollo to Express on router /api/graphql => your server is now running and available on /api/graphql
server.applyMiddleware({ app, path: "/api/graphql", cors: corsOptions });

/**
 * @see https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
