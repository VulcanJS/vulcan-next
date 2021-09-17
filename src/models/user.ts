import crypto from "crypto";

import { VulcanDocument, VulcanSchema } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

export interface UserType extends VulcanDocument {
  email: string;
  hash?: string;
  salt?: string;
  isAdmin?: boolean;
  groups?: Array<string>;
}

const guaranteeOwnership = (data) => {
  // TODO: put _id into userId to guarantee ownership
  data.userId = data._id;
  return data;
};
const hashPassword = (password: string) => {
  const salt = (crypto as any).randomBytes(16).toString("hex");
  const hash = (crypto as any)
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

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

const passwordAuthSchema = {
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
  // Temporary field, used only in the frontend, must be deleted on mutations
  password: {
    type: String,
    optional: false,
    canRead: [],
    canCreate: ["guests"],
    canUpdate: ["owners"],
  },
};

const emailVerificationSchema = {
  isVerified: {
    type: String,
    default: false,
    optional: true,
    // can be forced by admins/mods
    canRead: ["admins"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
  },
};

const schema: VulcanSchema = {
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

  ...emailVerificationSchema,
};

export const User = createGraphqlModel({
  name: "VulcanUser",
  graphql: {
    typeName: "VulcanUser", // TODO: automatically create from a modelName property
    multiTypeName: "VulcanUsers",
    callbacks: {
      create: {
        before: [handlePasswordCreation],
        after: [guaranteeOwnership],
      },
      update: {
        before: [handlePasswordUpdate],
      },
    },
    queryResolvers: buildDefaultQueryResolvers({ typeName: "VulcanUser" }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName: "VulcanUser",
    }),
  },
  schema,
  permissions: {
    canCreate: ["guests"], // signup is enabled
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
});

export const UserConnector = createMongooseConnector<UserType>(User);
