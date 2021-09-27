/**
 * Test the run of a local mongo database
 *
 * // @see https://jestjs.io/docs/en/next/configuration#testenvironment-string
 * @jest-environment node
 */
import { connectToDb, closeDbConnection } from "~/lib/api/mongoose/connection";
import { debugMongo } from "~/lib/debuggers";
import { spawn } from "child_process";
// TODO: setup dotenv like in Next
// @see https://github.com/VulcanJS/vulcan-next/issues/47
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI =
    "mongodb+srv://johnDoe:T74OcxqL15TRt7Zn@lbke-demo-ara2d.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
}

const MONGO_LOCAL_URI = "mongodb://localhost:27017/vulcan-next-app";

describe("mongo docker", () => {
  beforeEach(() => {
    // shell.exec("yarn run start:mongo", {
    //   async: true,
    // });
  });
  afterEach(async () => {
    await closeDbConnection();
  });
  test("connects to local mongo db", async () => {
    // most of the complexity comes from running yarn run start:mongo in the background, then killing it in order to have a clean test
    const rawCmd = "yarn";
    const args = ["run", "start:mongo"];
    const child = spawn(rawCmd, args, {
      env: { ...process.env, COVERAGE: "1" },
      detached: true,
    });
    child.stdout.on("data", (data) => {
      debugMongo("STDOUT:", data.toString());
    });
    child.stderr.on("data", (data) => {
      debugMongo("STDERR:", data.toString());
    });
    let killedResolve;
    const killedChild = new Promise((resolve, reject) => {
      killedResolve = resolve;
    });
    child.on("exit", (code) => {
      // kill
      try {
        //child.kill();
        process.kill(-child.pid); // kill subprocess too
      } catch (err) {
        // NOTE: this can happen if the db is already launched manually before we run the test,
        // the process will fail immediately. That's not a problem.
        console.warn(err);
      } finally {
        killedResolve();
      }
    });
    await connectToDb(MONGO_LOCAL_URI); // you can define a .env.test to configure this
    expect(true).toBe(true);
    child.kill();
    await killedChild;
  });
});
