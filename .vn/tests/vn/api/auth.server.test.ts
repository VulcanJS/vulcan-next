/**
 * We use an hackish solution to run Next.js API endpoints, however
 * if this fall short, we might move to running the actual dev server + an inmemory mongo
 *
 * @see https://github.com/vercel/next.js/discussions/15166
 * @see
 */
import { connectToDb } from "~/lib/api/mongoose/connection";
import { apiRoutes } from "~/lib/api/apiRoutes";
import { MongoMemoryServer } from "mongodb-memory-server"; // @see https://github.com/nodkz/mongodb-memory-server
import mongoose from "mongoose";
import request from "supertest";

import { spawn } from "child_process";

let mongod;
let mongoUri;
let serverUrl = "http://localhost:3000";
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

  // TODO: spin up the Next server as well USING THE LOCAL MONGO_URI
});
afterAll(async () => {
  // remove the collection
  // disconnect the client
  await mongoose.disconnect();
  // stop mongo server
  await mongod.stop();
});

test.skip("signup", async () => {
  const user = {
    email: "test@test.vulcan-next",
    password: "foobar",
  };
  //TODO: this tests expects the Next server to already run
  // we are not yet able to spin a server elegantly
  // @see https://github.com/vercel/next.js/discussions/28173
  const res = await request(serverUrl)
    .post(apiRoutes.account.signup.href)
    .send(user)
    .expect(200);
  expect(res.body).toEqual({ done: true });
});
test.skip("login", () => {
  // TODO
});
test.skip("change password while being logged in", () => {
  // TODO
});
