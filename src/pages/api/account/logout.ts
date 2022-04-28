import { NextApiRequest, NextApiResponse } from "next";
import { removeTokenCookie } from "~/lib/api/account";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    removeTokenCookie(res);
    res.end();
  }
}
