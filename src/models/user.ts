import crypto from "crypto";

import { VulcanDocument, VulcanSchema } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

export interface UserType extends VulcanDocument {
  email: string;
  hash?: string;
  salt?: string;
  isAdmin?: boolean;
  groups?: Array<string>;
}

/**
 * Find an user during authentication
 * Return null if not found/password mismatch
 * @param param0
 */
export async function findUserByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserType | null> {
  // Here you should lookup for the user in your DB and compare the password:
  //
  const user = await UserConnector.findOne({ email });
  // NOTE: we should NEVER differentiate the return type depending on whether the email is found or the password is mismatching
  // otherwise attacker could guess whether an user has an account or not in the application
  if (!user) {
    return null;
  }
  // const user = await DB.findUser(...)
  const hash = (crypto as any)
    .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === hash;
  if (!passwordsMatch) {
    return null;
  }
  return user;
}

const guaranteeOwnership = (data) => {
  // TODO: put _id into userId to guarantee ownership
  data.userId = data._id;
  return data;
};
const hashPassowrd = (password: string) => {
  const salt = (crypto as any).randomBytes(16).toString("hex");
  const hash = (crypto as any)
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};

const handlePasswordCreation = (data, props) => {
  const { password } = data;
  // const user = await DB.findUser(...)
  const { hash, salt } = hashPassowrd(password);
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
    const { hash, salt } = hashPassowrd(data.password);
    data.hash = hash;
    data.salt = salt;
    // Do not store the password in the database
    data.password = null;
  }
  return data;
};

const schema: VulcanSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  // userId is equivalent to _id
  // it guarantees that the user belongs to group "owners" for his own data
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  username: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true,
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
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
  // password management
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
}) as VulcanGraphqlModel;

export const UserConnector = createMongooseConnector<UserType>(User);
