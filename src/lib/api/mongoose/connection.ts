import { debugMongo } from "~/lib/debuggers";
import mongoose, { ConnectOptions } from "mongoose";

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

/**
 * Connect to any mongo database
 *
 * NOTE: do not use directly, prefer using "connectToMainDb"
 * @param mongoUri
 * @param options
 */
export const connectToDb = async (
  mongoUri: string,
  options?: ConnectOptions
) => {
  if (mongooseCache?.connectPromise) {
    debugMongo(
      "Running connectToDb, already connected or connecting to Mongo, waiting for promise"
    );

    await mongooseCache.connectPromise;
  }
  if (![1, 2].includes(mongoose.connection.readyState)) {
    debugMongo("Call mongoose connect");
    (mongooseCache as MongooseCache).connectPromise = mongoose.connect(
      mongoUri,
      {
        ...(options || {}),
      }
    );
    // Wait for connection
    await mongooseCache?.connectPromise;
  }
};

/**
 * Connect to the application main database
 *
 * Mongo URI is provided throught the MONGO_URI environment variable
 */
export const connectToAppDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");
  const isLocalMongo = mongoUri.match(/localhost/);
  try {
    await connectToDb(mongoUri, {
      // fail the seed early during development
      serverSelectionTimeoutMS: isLocalMongo ? 3000 : undefined,
    });
  } catch (err) {
    console.error(`\nCould not connect to Mongo database on URI ${mongoUri}.`);
    if (isLocalMongo) {
      console.error("Did you forget to run 'yarn run start:mongo'?\n");
    }
    console.error(err);
    // rethrow
    throw err;
  }
};

export async function closeDbConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    // Catch locally error
    console.error("Could not close mongoose connection");
    console.error(err);
    throw err;
  }
}
