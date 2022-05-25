import mongoose from 'mongoose';
import debug from 'debug';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var debugMongo = debug("vn:mongo");
debug("vn:account");
var globalNode = __spreadValues({
  mongooseCache: void 0
}, global);
var mongooseCache = globalNode.mongooseCache;
if (!mongooseCache) {
  globalNode.mongooseCache = { connectPromise: null };
  mongooseCache = globalNode.mongooseCache;
}
var connectToDb = async (mongoUri, options) => {
  if (mongooseCache == null ? void 0 : mongooseCache.connectPromise) {
    debugMongo("Running connectToDb, already connected or connecting to Mongo, waiting for promise");
    await mongooseCache.connectPromise;
  }
  if (![1, 2].includes(mongoose.connection.readyState)) {
    debugMongo("Call mongoose connect");
    mongooseCache.connectPromise = mongoose.connect(mongoUri, __spreadValues({}, options || {}));
    await (mongooseCache == null ? void 0 : mongooseCache.connectPromise);
  }
};
var connectToAppDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri)
    throw new Error("MONGO_URI env variable is not defined");
  const isLocalMongo = mongoUri.match(/localhost/);
  try {
    await connectToDb(mongoUri, {
      serverSelectionTimeoutMS: isLocalMongo ? 3e3 : void 0
    });
  } catch (err) {
    console.error(`
Could not connect to Mongo database on URI ${mongoUri}.`);
    if (isLocalMongo) {
      console.error("Did you forget to run 'yarn run start:mongo'?\n");
    }
    console.error(err);
    throw err;
  }
};
async function closeDbConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error("Could not close mongoose connection");
    console.error(err);
    throw err;
  }
}

// .vn/scripts/ts-sources/db/reset.ts
async function run() {
  await connectToAppDb();
  await mongoose.connection.db.dropDatabase();
  await closeDbConnection();
}
run();
//# sourceMappingURL=reset.mjs.map