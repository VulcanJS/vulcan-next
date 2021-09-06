/**
 * This is a dummy script, demoing our script building capabilities
 *
 * It may be extended to handle database seeding
 */
import { connectToAppDb } from "~/api/mongoose/connection";

await connectToAppDb().then(console.log).catch(console.log);
