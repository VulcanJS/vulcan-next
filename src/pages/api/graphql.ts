import express, { Request } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { buildApolloSchema } from "@vulcanjs/graphql";

import mongoConnection from "~/api/middlewares/mongoConnection";
import corsOptions from "~/api/cors";
import { contextBase, contextFromReq } from "~/api/context";
import seedDatabase from "~/api/seed";
import models from "~/models";

/**
 * Example graphQL schema and resolvers generated using Vulcan declarative approach
 * http://vulcanjs.org/
 */
const vulcanRawSchema = buildApolloSchema(models);
const vulcanSchema = makeExecutableSchema(vulcanRawSchema);

/**
 * Example custom Apollo server, written by hand
 */
const typeDefs = gql`
  type Query {
    restaurants: [Restaurant]
  }
  type Restaurant {
    _id: ID!
    name: String
  }
`;
const resolvers = {
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
        throw err;
      }
    },
  },
};
const customSchema = makeExecutableSchema({ typeDefs, resolvers });
// NOTE: schema stitching can cause a bad developer experience with errors
const mergedSchema = mergeSchemas({ schemas: [vulcanSchema, customSchema] });

// Seed
// TODO: what is the best pattern to seed in a serverless context?
// We pass the default graphql context to the seed function,
// so it can access our models
seedDatabase(contextBase);
// also seed restaurant manually to demo a custom server
const seedRestaurants = async () => {
  const db = mongoose.connection;
  const count = await db.collection("restaurants").countDocuments();
  if (count === 0) {
    db.collection("restaurants").insertMany([
      {
        name: "The Restaurant at the End of the Universe",
      },
      { name: "The Last Supper" },
      { name: "Shoney's" },
      { name: "Big Bang Burger" },
      { name: "Fancy Eats" },
    ]);
  }
};
seedRestaurants();

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
