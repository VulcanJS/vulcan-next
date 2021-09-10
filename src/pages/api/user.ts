import { getSession } from "~/api/passport/iron";
import runSeed from "~/api/runSeed";
import { UserConnector } from "~/models/user";

export default async function user(req, res) {
  const session = await getSession(req);
  // Get fresh data about the user
  const user = session?._id
    ? await UserConnector.findOneById(session._id)
    : null;
  // TODO: apply usual security like mutators would do!
  res.status(200).json({ user: user || null });
}

// Seed in development if necessary
runSeed();
