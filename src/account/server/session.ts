// For the token
// https://hapi.dev/module/iron/
import Iron from "@hapi/iron";
import { Request } from "express";
import { NextApiRequest } from "next";
import { debugAccount } from "~/core/lib/debuggers";
import type { UserType } from "~/account/models/user";
import { getTokenCookie } from "./auth-cookies";

// Use an environment variable here instead of a hardcoded value for production
const getTokenSecret = () => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;
  if (!TOKEN_SECRET)
    throw new Error("Authentication not set for this application");
  return TOKEN_SECRET;
};

export function encryptSession(session: UserType) {
  const TOKEN_SECRET = getTokenSecret();
  debugAccount(`Encrypting session ${JSON.stringify(session)}`);
  return Iron.seal(session, TOKEN_SECRET, Iron.defaults);
}

/**
 * Returns the user data from the token
 * => it let's the backend check for user existence in the database
 * @param req
 */
export async function getSession(
  req: NextApiRequest | Request
): Promise<UserType | null | undefined> {
  const TOKEN_SECRET = getTokenSecret();
  const token = getTokenCookie(req);
  return token && Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}

export async function decryptToken(token: string) {
  const TOKEN_SECRET = getTokenSecret();
  return Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
}
