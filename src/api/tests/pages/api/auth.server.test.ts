import { connectToDb } from "~/api/mongoose/connection";
// import changePassword from "~/pages/api/changePassword";
// import login from "~/pages/api/login";
import signup from "~/pages/api/signup";
import { MongoMemoryServer } from "mongodb-memory-server"; // @see https://github.com/nodkz/mongodb-memory-server
import mongoose from "mongoose";
import { createServer } from "http";
import request from "supertest";

let mongod;
let mongoUri;
beforeAll(async () => {
  // Spin up a dummy mongo server
  mongod = await MongoMemoryServer.create();
  mongoUri = mongod.getUri();
  // const port = await mongod.getPort();
  // const dbPath = await mongod.getDbPath();
  // const dbName = await mongod.getDbName();
  // Connect mongoose client
  //await mongoose.connect(mongoUri);
  await connectToDb(mongoUri);
});
afterAll(async () => {
  // remove the collection
  // disconnect the client
  await mongoose.disconnect();
  // stop mongo server
  await mongod.stop();
});

test("signup", async () => {
  const user = {
    email: "test@test.vulcan-next",
    password: "foobar",
  };
  const server = createServer(signup);
  request(server).post("/").send(user).expect(200);
});
test.skip("login", () => {
  // TODO
});
test.skip("change password while being logged in", () => {
  // TODO
});
