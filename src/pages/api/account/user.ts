import { getSession } from "~/lib/api/account";
import { connectToAppDb } from "~/lib/api/mongoose/connection";
import runSeed from "~/lib/api/runSeed";
import { debugAccount } from "~/lib/debuggers";
import { UserMongooseModel } from "~/models/user.server";

export default async function user(req, res) {
  await connectToAppDb();
  const session = await getSession(req);
  // Get fresh data about the user
  const user = session?._id
    ? (await UserMongooseModel.findById(session._id))?.toObject()
    : null;
  debugAccount(
    `Got user ${user ? JSON.stringify(user) : "null"} for session._id ${
      session?._id
    }`
  );
  // TODO: apply usual security like mutators would do! In order to filter out the hash
  if (user) {
    user.hash = undefined;
    user.salt = undefined;
    user.password = undefined;
  }
  res.status(200).json({ user: user || null });
}

// Seed in development if necessary
runSeed();
