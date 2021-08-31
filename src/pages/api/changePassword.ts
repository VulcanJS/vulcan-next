import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector } from "~/models/user";
import { decryptToken } from "~/api/passport/iron";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/api/context";

const checkCredentials = async ({ id, password }): Promise<boolean> => {
  // 1. find the user
  const user = await UserConnector.findOneById(id);
  if (!user) return false;
  // 2. check if password is correct
  // TODO
  throw new Error(
    "Credentials check not yet implemented, cannot verify your old password validity"
  );
};

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
      // Email must be passed from the body
      // TODO: this is probably not secure, we don't need a session token here but a temporary token
      const unsealedToken = await decryptToken(token);
      const { email } = unsealedToken;
      if (!email) {
        return res.status(500).send("Invalid token");
      }
      const user = await UserConnector.findOne({ email });
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
      // Check if old password is correct
      const { oldPassword } = req.body;
      const isValid = await checkCredentials({
        id: userId,
        password: oldPassword,
      });
      if (!isValid) {
        return res.status(500).end("User not found/wrong password");
      }
    }

    // NOTE: the mutator is the function used by the update mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
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
