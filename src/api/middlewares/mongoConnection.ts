/**
 * This middleware relies on Express
 *
 * @see https://developer.mongodb.com/how-to/nextjs-building-modern-applications
 * @see https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
 * @see https://github.com/vercel/next.js/discussions/12229
 */

import { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
// Import mongoose models here
import "~/api/mongoose/models";
import { debugMongo } from "~/lib/debuggers";

export async function closeDbConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    // Catch locally error
    console.error("Could not close mongoose connection");
    console.error(err);
  }
}

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/util/mongodb.js
// We need to globally cache Mongoose connection promise so that it's reused by all calls to connectToDb
// => this avoid unexpectedly creating multiple connections + the promise is shared so .then/.catch are called as expected
interface MongooseCache {
  connectPromise: Promise<any> | null;
}
interface GlobalWithMongoose extends NodeJS.Global {
  mongooseCache: MongooseCache | undefined;
}
const globalNode: GlobalWithMongoose = {
  mongooseCache: undefined,
  ...global,
};
let mongooseCache = globalNode.mongooseCache; // shared promise, so "then" chains are called correctly for all code trying to connect (avoids race conditions)
if (!mongooseCache) {
  globalNode.mongooseCache = { connectPromise: null };
  mongooseCache = globalNode.mongooseCache;
}
export const connectToDb = async (
  mongoUri: string,
  options?: ConnectOptions
) => {
  if (mongooseCache?.connectPromise) await mongooseCache.connectPromise;
  if (![1, 2].includes(mongoose.connection.readyState)) {
    debugMongo("Call mongoose connect");
    (mongooseCache as MongooseCache).connectPromise = mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ...(options || {}),
      }
    );
  }
  debugMongo("Ran connectToDb, already connected or connecting to Mongo");
};

const mongoConnectionMiddleware = (mongoUri: string) => {
  // init the first database connection on server startup
  const isLocalMongo = mongoUri.match(/localhost/);
  connectToDb(mongoUri, {
    serverSelectionTimeoutMS: isLocalMongo ? 3000 : undefined,
  }).catch((err) => {
    console.error(
      `\nCould not connect to Mongo database on URI ${mongoUri} during route initialization.`
    );
    if (isLocalMongo) {
      console.error("Did you forget to run 'yarn run start:mongo'?\n");
    }
    console.error(err);
  });
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
      console.error(
        `\nCould not connect to Mongo database on URI ${mongoUri} during request.`
      );
      if (isLocalMongo) {
        console.error("Did you forget to run 'yarn run start:mongo'?\n");
      }
      console.error(err);
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
