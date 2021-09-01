/**
 *
 * Seeding should be separated from the app itself,
 * using an independant script.
 *
 * However seeding using an API endpoint to trigger the seed is way easier
 * to implement,as it let's us reuse our JavaScript helpers and Vulcan directly.
 *
 * This API endpoint could for instance be triggered in a prebuild step.
 *
 */
import { NextApiRequest, NextApiResponse } from "next";

import { closeDbConnection, connectToAppDb } from "~/api/mongoose/connection";
import runSeed from "~/api/runSeed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(500).end("Debug route can not be run in production");
  }
  try {
    await connectToAppDb();
    await runSeed();
    await closeDbConnection();
    res.status(200).json({ done: true });
  } catch (err) {
    res.status(500).end({ error: err.message });
  }
}
