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
import "~/lib/api/mongoose/models";
import { connectToDb } from "~/lib/api/mongoose/connection";

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
