import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql/server";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector, UserType } from "~/models/user.server";

import { contextFromReq } from "~/lib/api/context";
import {
  checkPasswordForUser,
  sendChangePasswordSuccessEmail,
} from "~/lib/api/account";

interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}
/**
 * Change the password for a logged in user
 *
 * @param res.body
 */
export default async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { oldPassword, newPassword } = body as ChangePasswordBody;
    // context computation step œis shared with graphql endpoint
    const context = await contextFromReq((req as unknown) as Request);

    // Important: we get userId from the context, so user has to be logged in
    // + we expect "contextFromReq" to correctly compute those values
    const userId = context.userId || context.currentUser?._id;
    if (!userId) {
      return res.status(500).end("User is not authenticated");
    }
    const user = context.currentUser;
    if (!user) {
      // TODO: capture this case in Sentry. It should not happen if the context is correct
      return res
        .status(500)
        .end("Fatal error, please reach out Technical team.");
    }
    // Check if old password is correct
    const isPasswordValid = await checkPasswordForUser(user, oldPassword);
    if (!isPasswordValid) {
      return res.status(500).end("Wrong password");
    }

    // NOTE: the mutator is the function used by the update mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    // In particular, the update callback will take care of hashing the password
    // TODO: in the future, calling the Connector should be sufficient => callbacks run should happen at the db level,
    // not within mutators
    await updateMutator({
      model: User,
      data: { password: newPassword },
      context,
      dataId: userId,
      asAdmin: true,
    });
    // TODO: setup a real mail
    // this is not mandatory for password change, yet you'd want to notify the user incase this change was not voluntary.
    sendChangePasswordSuccessEmail({ email: user.email });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
