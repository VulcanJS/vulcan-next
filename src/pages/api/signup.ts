import { Request } from "express";
import { createMutator } from "@vulcanjs/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserType } from "~/models/user";
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

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // NOTE: the mutator is the function used by the create mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    let user = req.body as UserType;
    const context = await contextFromReq((req as unknown) as Request);
    // create mutator should return the created user
    // NOTE: we use the mutator and not the model connector so callbacks are applied
    // like hashing the password
    // in the future, we may want connectors to trigger callbacks
    const createMutatorRes = await createMutator<UserType>({
      model: User,
      data: user,
      context,
      asAdmin: true, // so we get all fields back
    });
    user = createMutatorRes.data;

    // create verification token and send it
    // TODO: 99% sahred with send-reset-password-email, to factor
    // delete previous requests
    const userId = user._id;
    await StorableTokenConnector.delete({ userId });
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
    });

    const verificationUrl = `${getRootUrl(req)}${
      routes.account.verifyEmail.href
    }/${token}`;

    await sendVerificationEmail({ email: user.email, verificationUrl });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}

// Seed in development if necessary
runSeed();
