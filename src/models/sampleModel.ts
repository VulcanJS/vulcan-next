/**
 * I am a sample model
 * Replace me with your own
 */
import { VulcanDocument } from "@vulcanjs/schema";
import {
  createGraphqlModel,
  CreateGraphqlModelOptionsShared,
  VulcanGraphqlSchema,
} from "@vulcanjs/graphql";

export const schema: VulcanGraphqlSchema = {
  /** Unique id of the document in the database. You'll want to leave this field as is. */
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  /** _id of the user that created the document. This special field is used to handle the "ownership" of the document. */
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
  /** Timestamps handled by the database (you could also define updatedAt) */
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    },
  },
  // Your own custom fields. Press ctrl+space to see the possible fields.
  someField: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
  },
};

export interface SampleModelType extends VulcanDocument {
  // List your custom fields (_id, userId, createdAt, updatedAt and slug are already in VulcanDocument type)
  someField: string;
}

const name = "Sample"; // Change this value when creating your own model
const typeName = name;
const multiTypeName = "Samples"; // Change this value when creating your own model
export const modelDef: CreateGraphqlModelOptionsShared = {
  name,
  schema,
  graphql: {
    typeName,
    multiTypeName,
  },
  permissions: {
    canCreate: ["member"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
};
export const SampleModel = createGraphqlModel(modelDef);
