import mongoose from "mongoose";
import { closeDbConnection, connectToAppDb } from "~/api/mongoose/connection";

await connectToAppDb();
await mongoose.connection.db.dropDatabase();
await closeDbConnection();
