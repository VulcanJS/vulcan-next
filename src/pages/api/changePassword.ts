import { Request } from "express";
import { updateMutator } from "@vulcanjs/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { User, UserConnector } from "~/models/user";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/api/context";
export default async function changePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // NOTE: the mutator is the function used by the update mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    const body = req.body;
    // TODO: check if this is ok to compute the context from a NextApiRequest like this
    const context = await contextFromReq((req as unknown) as Request);

    // Use the userId as input of the mutator
    let userId: string;

    const email = body.email;
    // Either we reset the password, so we put the email on the body.
    if (email) {
      const user = await UserConnector.findOne({ email });
      userId = user._id
    } else {
      // Or we just want to change the connected user's password
      userId = (context.userId || context.currentUser?._id) as string;
    }

    if (!userId) {
      res.status(500).end("user not found");
    }    

    await updateMutator({ model: User, data: { password: body.password }, context, dataId: userId, asAdmin: true });
    console.log("MAIL: Password changed"); //TODO: send the real email
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
