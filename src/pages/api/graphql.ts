import express, { Request } from "express";
import cors from "cors";
//mport mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { buildApolloSchema } from "@vulcanjs/graphql";

import mongoConnection from "~/api/middlewares/mongoConnection";
import corsOptions from "~/api/cors";
import { contextBase, contextFromReq } from "~/api/context";
import seedDatabase from "~/api/seed";
import models from "~/models";

const vulcanRawSchema = buildApolloSchema(models);
const vulcanSchema = makeExecutableSchema(vulcanRawSchema);

// We pass the default graphql context to the seed function,
// so it can access our models
seedDatabase(contextBase);

/**
 * Sample, naive, Apollo server. You can move this code in `src/server`
 * and code your own API.
 *
 * Check our GraphQL framework Vulcan.js to build your server using a declarative approach
 * http://vulcanjs.org/
 */
/*
const typeDefs = gql`
  type Query {
    users: [User!]!
    restaurants: [Restaurant]
  }
  type User {
    name: String
  }
  type Restaurant {
    _id: ID!
    name: String
  }
`;
const resolvers = {
  Query: {
    users() {
      return [{ name: "Rick" }, { name: "Morty" }];
    },
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
        throw err;
      }
    },
  },
};
const customSchema = makeExecutableSchema({ typeDefs, resolvers });
*/

const mergedSchema = vulcanSchema;
// Uncomment to use merge both Vulcan schema and your custom schema instead
// NOTE: schema stitching can cause a bad developer experience with errors
// so we deactivate this feature as a default
// mergeSchemas({ schemas: [vulcanSchema, customSchema] });

// Define the server (using Express for easier middleware usage)
const server = new ApolloServer({
  schema: mergedSchema,
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
});

const app = express();

app.set("trust proxy", true);

const gqlPath = "/api/graphql";
// setup cors
app.use(gqlPath, cors(corsOptions));
// init the db
app.use(gqlPath, mongoConnection());

server.applyMiddleware({ app, path: "/api/graphql" });

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
