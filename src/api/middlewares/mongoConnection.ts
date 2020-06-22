/**
 * This middleware relies on Express
 *
 * @see https://developer.mongodb.com/how-to/nextjs-building-modern-applications
 * @see https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
 * @see https://github.com/vercel/next.js/discussions/12229
 */

import { Request, Response } from "express";
import mongoose from "mongoose";
// Import mongoose models here
import "~/api/mongoose/models";

export async function closeDbConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    // Catch locally error
    console.error(err);
  }
}

import debug from "debug";
const debugMongo = debug("vns:mongo");

// trigger the initial connection on app startup
export const connectToDb = async (mongoUri: string) => {
  if (![1, 2].includes(mongoose.connection.readyState)) {
    debugMongo("Call mongoose connect");
    return await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  debugMongo("Ran connectToDb, already connected or connecting to Mongo");
  return false;
};

const mongoConnectionMiddleware = () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");
  // init the first database connection on server startup
  connectToDb(mongoUri);
  // mongoose.set("useFindAndModify", false);

  // then return a middleware that checks the connection on every call
  return async (req: Request, res: Response, next) => {
    try {
      // To debug the number of connections in Mongo client: db.serverStatus().connections
      await connectToDb(mongoUri);

      // Do not forget to close connection on finish and close events
      // NOTE: actually we don't need this. Db connection close should happen on lambda destruction instead.
      // res.on("finish", closeDbConnection);
      // res.on("close", closeDbConnection);
      next();
    } catch (err) {
      res.status(500);
      res.send("Could not connect to db");
    }
  };
};

export default mongoConnectionMiddleware;

// We need to add a converter between Mongoose ID and Apollo Server
// @see https://github.com/apollographql/apollo-server/issues/1633
const ObjectId = require("mongoose").Types.ObjectId;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
