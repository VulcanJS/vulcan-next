/**
 * Extends user.ts with server-side logic
 */
import merge from "lodash/merge";

import SimpleSchema from "simpl-schema";
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
};

const schema: VulcanGraphqlSchemaServer = merge({}, clientSchema, {
  // _id, userId, and createdAT are basic field you may want to use in almost all schemas
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  // userId is the _id of the owner of the document
  // Here, it guarantees that the user belongs to group "owners" for his own data
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
  },
  username: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true,
  },
  isAdmin: {
    type: Boolean,
    label: "Admin",
    input: "checkbox",
    optional: true,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
  },

  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
    // mustComplete: true,
    input: "text",
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canRead: ["owners", "admins"],
    searchable: true,
    unique: true,
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  },
  groups: {
    type: Array,
    optional: true,
    input: "checkboxgroup",
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests"],
    // TODO: allow to manage custom groups
    // form: {
    //   options: function () {
    //     const groups = _.without(
    //       _.keys(getCollection("Users").groups),
    //       "guests",
    //       "members",
    //       "owners",
    //       "admins"
    //     );
    //     return groups.map((group) => {
    //       return { value: group, label: group };
    //     });
    //   },
    // },
  },
  "groups.$": {
    type: String,
    optional: true,
  },

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
