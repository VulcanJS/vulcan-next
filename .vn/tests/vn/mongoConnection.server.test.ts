/**
 * // @see https://jestjs.io/docs/en/next/configuration#testenvironment-string
 * @jest-environment node
 */
import { connectToDb, closeDbConnection } from "~/lib/api/mongoose/connection";
import mongoose from "mongoose";

if (!process.env.MONGO_URI)
  throw new Error("MONGO_URI env variable not defined");

const mongoUri = process.env.MONGO_URI;
describe("api/middlewares/mongoConnection", () => {
  afterEach(async () => {
    await closeDbConnection();
  });
  it("connects to mongo db", async () => {
    await connectToDb(mongoUri).then(() => {
      expect(mongoose.connection.readyState).toEqual(1);
    });
  });
  it("connects only once if already connecting", async () => {
    const promise = connectToDb(mongoUri); // you can define a .env.test to configure this
    const newPromise = connectToDb(mongoUri); // you can define a .env.test to configure this
    expect(promise).toEqual(newPromise);
  });
});
