// @see https://github.com/zeit/next.js/tree/master/examples/api-routes-apollo-server-and-client-auth
import express from "express";
import cors from "cors";
import corsOptions from "~/api/cors";
//import getConfig from "next/config";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

const app = express();

const voyagerPath = "/api/debug/graphql-voyager";
app.use(voyagerPath, cors(corsOptions));
if (process.env.NODE_ENV !== "production") {
  app.use(voyagerPath, voyagerMiddleware({ endpointUrl: "/api/graphql" }));
}

export default app;
