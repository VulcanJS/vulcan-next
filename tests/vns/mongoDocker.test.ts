/**
 * Test the run of a local mongo database
 */
import {
  connectToDb,
  closeDbConnection,
} from "../../src/api/middlewares/mongoConnection";
import { spawn } from "child_process";
import debug from "debug";
const debugMongo = debug("vn:mongo");
// TODO: setup dotenv like in Next
// @see https://github.com/VulcanJS/vulcan-next-starter/issues/47
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
  afterEach(() => {
    closeDbConnection();
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
      } finally {
        killedResolve();
      }
    });
    const res = await connectToDb(MONGO_LOCAL_URI); // you can define a .env.test to configure this
    expect(res).toBeTruthy();
    child.kill();
    await killedChild;
  });
});
