import { Request } from "express";
import { createMutator } from "@vulcanjs/graphql/server";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector, UserTypeServer } from "~/models/user.server";
import { contextFromReq } from "~/lib/api/context";
import runSeed from "~/lib/api/runSeed";
import { sendVerificationEmail } from "~/lib/api/account";
import {
  generateToken,
  hashToken,
  StorableTokenConnector,
} from "~/models/storableToken.server";
import { getRootUrl } from "~/lib/api/utils";
import { routes } from "~/lib/routes";
import { debugAccount } from "~/lib/debuggers";

type SignupBody = Pick<UserTypeServer, "email" | "password">;

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body as SignupBody;

    // NOTE: the mutator is the function used by the create mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    const user: Partial<UserTypeServer> = { email, password };
    let fullUser: UserTypeServer;
    const context = await contextFromReq((req as unknown) as Request);
    // create mutator should return the created user
    // NOTE: we use the mutator and not the model connector so callbacks are applied
    // like hashing the password
    // in the future, we may want connectors to trigger callbacks
    // Check that the user doesn't exist already
    const foundUser = await UserConnector.findOne({ email });
    // if foundUser exist, DO NOT CREATE AGAIN,
    // BUT DO NOT FAIL SIGNUP EITHER! That would leak user existence information
    if (!foundUser) {
      const createMutatorRes = await createMutator<UserTypeServer>({
        model: User,
        data: user,
        context,
        asAdmin: true, // so we get all fields back
      });
      fullUser = createMutatorRes.data;
    } else if (foundUser.isVerified) {
      // If user is found AND verified, we return already.
      // If not verified, we trigger the verification workflow again
      return res.status(200).send({ done: true });
    } else {
      // found but not verified => send new token
      fullUser = foundUser;
    }

    // create verification token and send it
    // TODO: 99% shared with send-reset-password-email, to factor
    // delete previous requests
    const userId = fullUser._id;
    await StorableTokenConnector.delete({ userId });
    debugAccount(`Deleting email verification token for userId ${userId}`);
    // create the reset url with token
    const token = generateToken();
    const hashedToken = hashToken(token);
    const expiresAt = new Date();
    const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4;
    expiresAt.setHours(
      expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS
    );
    await StorableTokenConnector.create({
      hashedToken,
      expiresAt: expiresAt.toISOString(),
      userId,
      kind: "verifyEmail",
    });

    const verificationUrl = `${getRootUrl(req)}${
      routes.account.verifyEmail.href
    }/${token}`;

    await sendVerificationEmail({ email: fullUser.email, verificationUrl });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}

// Seed in development if necessary
runSeed();
