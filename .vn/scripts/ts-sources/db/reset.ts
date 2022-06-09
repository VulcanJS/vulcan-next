import mongoose from "mongoose";
import {
  closeDbConnection,
  connectToAppDb,
} from "~/core/server/mongoose/connection";

async function run() {
  await connectToAppDb();
  await mongoose.connection.db.dropDatabase();
  await closeDbConnection();
}
run();
