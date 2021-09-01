import { NextApiRequest, NextApiResponse } from "next";
import { UserConnector } from "~/models/user";
import { encryptSession } from "~/api/passport/iron";
import {
  generateToken,
  hashToken,
  StorableTokenConnector,
} from "~/models/storableToken.server";

export default async function sendResetPasswordEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = req.body?.email;
    if (!email) {
      res.status(500).end("email not found");
    }

    // verify that an user corresponds to this email adress
    const user = await UserConnector.findOne({ email });
    if (user) {
      // create the url
      const token = generateToken();
      const hashedToken = hashToken(token);
      const expiresAt = new Date();
      const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;
      expiresAt.setHours(
        expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS
      );
      const userId = user._id;
      await StorableTokenConnector.create({ hashedToken, expiresAt, userId });
      // TODO: put the app URL here, maybe imported from src/pages/vns/debug/about.tsx but it doesn't seems complete right now
      const url = `rootUrl/reset-password/${token}`;

      // send the mail
      console.log(
        `MAIL: reset password for the email ${email}\nwith the url ${url}`
      ); //TODO: send the real email
    }
    // send a 200 status even if there's no user corresponding to the email for better security.
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
