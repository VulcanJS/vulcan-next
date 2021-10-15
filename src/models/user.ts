import { VulcanDocument } from "@vulcanjs/schema";
import SimpleSchema from "simpl-schema";
import {
  createGraphqlModel,
  CreateGraphqlModelOptionsShared,
  VulcanGraphqlSchema,
} from "@vulcanjs/graphql";

export interface UserType extends VulcanDocument {
  email: string;
  isAdmin?: boolean;
  groups?: Array<string>;

  isVerified?: boolean;
}

const passwordAuthSchema: VulcanGraphqlSchema = {
  // Temporary field, used only in the frontend, must be deleted on mutations
  password: {
    type: String,
    optional: false,
    canRead: [],
    canCreate: ["guests"],
    canUpdate: ["owners"],
  },
};

const emailVerificationSchema: VulcanGraphqlSchema = {
  isVerified: {
    type: String,
    default: false,
    optional: true,
    // can be forced by admins/mods
    canRead: ["owners"],
    canCreate: ["admins"],
    canUpdate: ["admins"],
  },
};

export const schema: VulcanGraphqlSchema = {
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

export const modelDef: CreateGraphqlModelOptionsShared = {
  name: "VulcanUser",
  graphql: {
    typeName: "VulcanUser",
    multiTypeName: "VulcanUsers",
  },
  schema,
  permissions: {
    canCreate: ["guests"], // signup is enabled
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
};
export const User = createGraphqlModel(modelDef);
