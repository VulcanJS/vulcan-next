import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql/server";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector } from "~/models/user.server";
import {
  StorableTokenConnector,
  hashToken,
} from "~/models/storableToken.server";

import { contextFromReq } from "~/lib/api/context";

interface VerifyEmailBody {
  token: string;
}
/**
 * Verify an user email, based on the provided token
 */
export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { token } = body as VerifyEmailBody;
    // context computation step is shared with graphql endpoint
    const context = await contextFromReq((req as unknown) as Request);

    // check the token and get the user from it
    // TODO: this whole part is shared with the reset-password endpoint, it needs factoring
    const storedToken = await StorableTokenConnector.findOne({
      hashedToken: hashToken(token),
    });
    if (!storedToken) {
      return res.status(500).send("Expired or invalid token");
    }
    if (new Date(storedToken.expiresAt) < new Date()) {
      return res.status(500).send("Expired or invalid token");
    }
    const { userId } = storedToken;
    const user = await UserConnector.findOneById(userId);
    if (!user) {
      return res.status(500).send("Expired or invalid token");
    }
    // Delete the token already
    await StorableTokenConnector.delete({ userId });

    // NOTE: the mutator is the function used by the update mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    // In particular, the update callback will take care of hashing the password
    await updateMutator({
      model: User,
      // TODO: only this part change between password reset and email verification
      data: { isVerified: true },
      context,
      dataId: userId,
      asAdmin: true,
    });
    // NOTE: you could send a welcome email here, saying the the account as been verified
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
