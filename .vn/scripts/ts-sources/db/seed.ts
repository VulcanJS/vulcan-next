import {
  closeDbConnection,
  connectToAppDb,
} from "~/lib/api/mongoose/connection";
import runSeed from "~/lib/api/runSeed";

// No top-level async for Node 14
async function run() {
  await connectToAppDb();
  await runSeed();
  await closeDbConnection();
}
run();
