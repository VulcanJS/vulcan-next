import {
  closeDbConnection,
  connectToAppDb,
} from "~/core/server/mongoose/connection";
import runSeed from "~/core/server/runSeed";

// No top-level async for Node 14
async function run() {
  await connectToAppDb();
  await runSeed();
  await closeDbConnection();
}
run();
