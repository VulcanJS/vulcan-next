/**
 * // @see https://jestjs.io/docs/en/next/configuration#testenvironment-string
 * @jest-environment node
 */
import {
  connectToDb,
  closeDbConnection,
} from "../../src/api/middlewares/mongoConnection";
import mongoose from "mongoose";

describe("api/middlewares/mongoConnection", () => {
  afterEach(async () => {
    await closeDbConnection();
  });
  it("connects to mongo db", async () => {
    await connectToDb(process.env.MONGO_URI).then(() => {
      expect(mongoose.connection.readyState).toEqual(1);
    });
  });
  it("connects only once if already connecting", async () => {
    const promise = connectToDb(process.env.MONGO_URI); // you can define a .env.test to configure this
    const newPromise = connectToDb(process.env.MONGO_URI); // you can define a .env.test to configure this
    expect(promise).toEqual(newPromise);
  });
});
