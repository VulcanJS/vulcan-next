import express from "express";
import cors from "cors";
import corsOptions from "~/lib/api/cors";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

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
  }
  type User {
    name: String
  }
`;
const resolvers = {
  Query: {
    users() {
      return [{ name: "Rick" }, { name: "Morty" }];
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
app.use(gqlPath, cors(corsOptions));
// You could init the db connection here too
server.applyMiddleware({ app, path: "/api/graphql" });

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
