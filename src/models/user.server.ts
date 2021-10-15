/**
 * Extends user.ts with server-side logic
 */
import merge from "lodash/merge";

import {
  CreateGraphqlModelOptionsServer,
  createGraphqlModelServer,
  VulcanGraphqlSchemaServer,
} from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";

import {
  schema as clientSchema,
  modelDef as clientModelDef,
  UserType as UserTypeShared,
} from "./user";
import { hashPassword } from "~/lib/api/account";

// use if you specifically want to accept only server user definition
export interface UserTypeServer extends UserTypeShared {
  hash?: string;
  salt?: string;
}
export type UserType = UserTypeServer; // reexport for isomorphic naming

/**
 * Add userId to a document
 * @param data
 */
const guaranteeOwnership = (data) => {
  // TODO: put _id into userId to guarantee ownership
  data.userId = data._id;
  return data;
};

/**
 * Store hash and salt, and remove temporary password from form document
 * @param data
 * @param props
 * @returns
 */
const handlePasswordCreation = (data, props) => {
  const { password } = data;
  // const user = await DB.findUser(...)
  const { hash, salt } = hashPassword(password);
  data.hash = hash;
  data.salt = salt;
  // Do not store the password in the database
  data.password = null;
  return data;
};

const handlePasswordUpdate = (data) => {
  const { password } = data;
  // update the hash
  if (password) {
    // const user = await DB.findUser(...)
    const { hash, salt } = hashPassword(data.password);
    data.hash = hash;
    data.salt = salt;
    // Do not store the password in the database
    data.password = null;
  }
  return data;
};

const passwordAuthSchema: VulcanGraphqlSchemaServer = {
  // password auth management
  hash: {
    type: String,
    canRead: [],
    canCreate: [],
    canUpdate: [],
  },
  salt: {
    type: String,
    canRead: [],
    canCreate: [],
    canUpdate: [],
  },
  // Example of a custom field resolver to get data from other API
  /*
  twitterId: {
    type: String,
    canRead: ["admins", "owners"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
    resolveAs: {
      type: "JSON",
      resolver:(root, args, context) => {
        return {twiterHandle: "@VulcanJS"}
      }
    }
  }
   */
};

const schema: VulcanGraphqlSchemaServer = merge({}, clientSchema, {
  ...passwordAuthSchema,
} as VulcanGraphqlSchemaServer);

const modelDef: CreateGraphqlModelOptionsServer = merge({}, clientModelDef, {
  graphql: {
    // server only fields
    callbacks: {
      create: {
        before: [handlePasswordCreation],
        after: [guaranteeOwnership],
      },
      update: {
        before: [handlePasswordUpdate],
      },
    },
  },
  schema,
});
export const User = createGraphqlModelServer(modelDef);

export const UserConnector = createMongooseConnector<UserTypeServer>(User);
