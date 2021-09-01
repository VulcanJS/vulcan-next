import { NextApiRequest, NextApiResponse } from "next";
import { UserConnector } from "~/models/user";
import nanoid from "nanoid";
import crypto from "crypto";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/api/context";
import { generateToken, hashToken } from "~/api/passport/account";

export default async function sendVerificationEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email: string = req.body?.email;
    if (!email) {
      res.status(500).end("email not found");
    }

    // verify that an user corresponds to this email adress
    const user = await UserConnector.findOne({ email });
    if (!user) {
      res
        .status(500)
        .end(`user not found: no user correspond to the adress ${email}`);
    }

    // create the url
    const token = generateToken();
    const hashedToken = hashToken(token);
    const expiresAt = new Date();
    const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;
    expiresAt.setHours(
      expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS
    );

    // TODO: store the HASHED token in the database. We should define a "token" model in the app.

    // TODO: put the app URL here, maybe imported from src/pages/vns/debug/about.tsx but it doesn't seems complete right now
    const url = `rootUrl/verify-email/${token}`;

    // send the mail
    console.log(`MAIL: verify email ${email}\with the url ${url}`); //TODO: send the real email
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
