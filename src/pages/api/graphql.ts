import express, { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
import { buildApolloSchema } from "@vulcanjs/graphql/server";

import mongoConnection from "~/lib/api/middlewares/mongoConnection";
import corsOptions from "~/lib/api/cors";
import { contextFromReq } from "~/lib/api/context";
import models from "~/models/index.server";

// will trigger seed
import runSeed from "~/lib/api/runSeed";

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

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");

// Define the server (using Express for easier middleware usage)
const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => contextFromReq(req as Request),
  introspection: process.env.NODE_ENV !== "production",
  playground:
    process.env.NODE_ENV !== "production"
      ? {
          settings: {
            "request.credentials": "include",
          },
        }
      : false,
  formatError: (err) => {
    // This function is mandatory to log error messages, even in development
    // You may enhance this function, eg by plugging an error tracker like Sentry in production
    console.error(err);
    return err;
  },
});

const app = express();

app.set("trust proxy", true);

const gqlPath = "/api/graphql";
// setup cors
app.use(gqlPath, cors(corsOptions));
// init the db
app.use(gqlPath, mongoConnection(mongoUri));

server.applyMiddleware({ app, path: "/api/graphql" });

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Seed in development
runSeed();
