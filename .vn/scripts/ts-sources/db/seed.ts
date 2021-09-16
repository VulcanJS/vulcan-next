import {
  closeDbConnection,
  connectToAppDb,
} from "~/lib/api/mongoose/connection";
import runSeed from "~/lib/api/runSeed";

await connectToAppDb();
await runSeed();
await closeDbConnection();
