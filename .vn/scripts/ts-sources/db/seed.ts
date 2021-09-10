import { closeDbConnection, connectToAppDb } from "~/api/mongoose/connection";
import runSeed from "~/api/runSeed";

await connectToAppDb();
await runSeed();
await closeDbConnection();
