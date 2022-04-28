/**
 * Context creation, for graphql but also REST endpoints
 *
 * Use vulcan helper for the default context
 * + add user related context
 */
import { UserConnector, UserType } from "~/models/user.server";
import { NextApiRequest } from "next";
import { getSession } from "~/lib/api/account";
import { Request } from "express";
import debug from "debug";
import models from "~/models/index.server";
const debugGraphqlContext = debug("vn:graphql:context");

import { createContext as createVulcanDefaultContext } from "@vulcanjs/graphql/server";

const createContextForModels = createVulcanDefaultContext(models);

// TODO: isolate context creation code like we do in Vulcan + initialize the currentUser too
export const createContextBase = async () => ({
  ...(await createContextForModels(
    // @ts-ignore TODO: check why we must pass the req object here
    null
  )),
  // add some custom context here if needed
});

interface UserContext {
  userId?: string;
  currentUser?: UserType;
}
const userContextFromReq = async (
  req: Request | NextApiRequest
): Promise<UserContext> => {
  const session = await getSession(req);
  if (!session?._id) return {};
  // Refetch the user from db in order to get the freshest data
  const user = await UserConnector.findOneById(session._id);
  if (user) {
    return { userId: user._id, currentUser: user };
  }
  return {};
};
export const contextFromReq = async (req: Request) => {
  // TODO
  const userContext = await userContextFromReq(req);
  const contextBase = await createContextForModels(req);
  const context = {
    ...contextBase,
    ...userContext,
    // pass down the request to graphql context, to allow advanced usage
    req,
  };
  debugGraphqlContext("Graphql context for current request:", context);
  return context;
};
