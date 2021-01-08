import { Request } from "express";
import { createMutator } from "@vulcanjs/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "~/models/user";

// TODO: factor the context creation so we can reuse it for graphql and REST endpoints
import { contextFromReq } from "~/api/context";
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // NOTE: the mutator is the function used by the create mutations in Vulcan
    // we need to use it to ensure that we run all callbacks associated to the user collection
    const user = req.body;
    // TODO: check if this is ok to compute the context from a NextApiRequest like this
    const context = await contextFromReq((req as unknown) as Request);
    await createMutator({ model: User, data: user, context });
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
