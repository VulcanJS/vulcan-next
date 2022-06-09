/**
 * Endpoint for when user wants to send the verification email again,
 * eg when user suspect that it's lost
 *
 * You don't need to call it after signup, as signup will already trigger a
 * first email
 *
 * TODO: this is not finished, it should reuse code from signup
 */
import { NextApiRequest, NextApiResponse } from "next";
import { UserMongooseModel } from "~/account/models/user.server";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/core/server/context";
import {
  StorableTokenConnector,
  generateToken,
  hashToken,
} from "~/account/models/storableToken.server";
import { connectToAppDb } from "~/core/server/mongoose/connection";

export default async function sendVerificationEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToAppDb();
    const email: string = req.body?.email;
    if (!email) {
      res.status(500).end("email not found");
    }

    // verify that an user corresponds to this email adress
    const user = await UserMongooseModel.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .send(`user not found: no user correspond to the adress ${email}`);
    }

    // create the url
    const token = generateToken();
    const hashedToken = hashToken(token);
    const expiresAt = new Date();
    const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;
    expiresAt.setHours(
      expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS
    );

    const userId = user._id;
    await StorableTokenConnector.create({
      hashedToken,
      expiresAt: expiresAt.toISOString(),
      userId,
    });

    // TODO: put the app URL here, maybe imported from src/pages/vn/debug/about.tsx but it doesn't seems complete right now
    const url = `rootUrl/verify-email/${token}`;

    // send the mail
    console.log(`MAIL: verify email ${email} with the url ${url}`); //TODO: send the real email
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
