import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import corsOptions from "~/api/cors";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import mongoConnection from "~/api/middlewares/mongoConnection";

/**
 * Sample, naive, Apollo server. You can move this code in `src/server`
 * and code your own API.
 *
 * Check our GraphQL framework Vulcan.js to build your server using a declarative approach
 * http://vulcanjs.org/
 */
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
      const db = mongoose.connection;
      const restaurants = await db
        .collection("restaurants")
        .find(null, null)
        .limit(5)
        .toArray();
      return restaurants;
    },
  },
};
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Define the server (using Express for easier middleware usage)
const server = new ApolloServer({
  schema,
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
