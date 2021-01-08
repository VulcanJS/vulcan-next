import { getSession } from "~/api/passport/iron";
import { UserConnector } from "~/models/user";

export default async function user(req, res) {
  const session = await getSession(req);
  // Get fresh data about the user
  const user = session?._id
    ? await UserConnector.findOneById(session._id)
    : null;
  res.status(200).json({ user: user || null });
}
