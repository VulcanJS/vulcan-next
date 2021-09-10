import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector, UserType } from "~/models/user";
import {
  StorableTokenConnector,
  hashToken,
} from "~/models/storableToken.server";

import { contextFromReq } from "~/api/context";
import { checkPasswordForUser } from "~/api/passport/account";

/**
 * Change the password for any user
 *
 * @param res.body
 * If logged in: { oldPassword, newPassword} (+ we get userId from the context)
 * If not logged in: {token, newPassword}
 */
export default async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    const { token, newPassword } = body;
    // context computation step œis shared with graphql endpoint
    const context = await contextFromReq((req as unknown) as Request);

    let userId;

    if (token) {
      // Scenario 1: reset the password for a logged out user
      const storedToken = await StorableTokenConnector.findOne({
        hashedToken: hashToken(token),
      });
      console.log(storedToken);
      if (token.expiresAt > new Date()) {
        return res.status(500).send("Invalid token");
      }
      // TODO: do the same for verification of users
      const user = (null as unknown) as UserType; // token.user
      if (!user) {
        return res.status(500).send("Invalid token");
      }
      if (!user) {
        return res.status(500).end("User not found");
      }
      userId = user._id;
      // TODO: we need a kind of token validation
      // we need to get a token from the email and check its validity
      // @see https://stackoverflow.com/questions/20277020/how-to-reset-change-password-in-node-js-with-passport-js
      throw new Error(
        "Reset password email workflow not yet implemented, need to add a token system"
      );
    } else {
      // Scenario 2: change the password for a logged in user
      userId = context.userId || context.currentUser?._id;
      if (!userId) {
        return res.status(500).end("User is not authenticated");
      }
      const user = context.currentUser;
      if (!user) {
        return res
          .status(500)
          .end("User authenticated, but context.currentUser not defined");
      }
      // Check if old password is correct
      const { oldPassword } = req.body;
      const isValid = await checkPasswordForUser(user, oldPassword);
      if (!isValid) {
        return res.status(500).end("User not found/wrong password");
      }
    }

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
    // TODO: setup a real mail
    console.log(`MAIL SIMULATION: Your password has been changed succesfully.`);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
