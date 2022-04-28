import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql/server";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector } from "~/models/user.server";
import {
  StorableTokenConnector,
  hashToken,
} from "~/models/storableToken.server";

import { contextFromReq } from "~/lib/api/context";
import { sendResetPasswordSuccessEmail } from "~/lib/api/account";

interface ResetPasswordBody {
  token: string;
  newPassword: string;
}
/**
 *  Reset password as a non-authentified user
 */
export default async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { token, newPassword } = body as ResetPasswordBody;
    // context computation step œis shared with graphql endpoint
    const context = await contextFromReq((req as unknown) as Request);

    // check the token and get the user from it
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
      data: { password: newPassword },
      context,
      dataId: userId,
      asAdmin: true,
    });
    sendResetPasswordSuccessEmail({ email: user.email });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
