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
import { User } from "~/account/models/user";
import { MongoId } from "@vulcanjs/mongo-apollo";

export const schema: VulcanGraphqlSchema = {
  /** Unique id of the document in the database. You'll want to leave this field as is. */
  _id: {
    typeName: MongoId,
    type: String,
    optional: true,
    canRead: ["guests", "anyone"],
  },
  /** _id of the user that created the document. This special field is used to handle the "ownership" of the document. */
  userId: {
    type: String,
    typeName: MongoId,
    optional: true,
    canRead: ["guests", "anyone"],
    // This means you can resolve the "user" field when fetching for "samples"
    relation: {
      fieldName: "user",
      kind: "hasOne",
      // Deprecated old syntax, prefer passing a "model" directly
      //typeName: "VulcanUser"
      model: User,
    },
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
    canRead: ["anyone"],
    canUpdate: ["admins", "owners"],
    canCreate: ["members"],
  },
  // If relationDemoUserId matches an existing user, this field can resolve it
  // NOTE: the match will be done on "_id" field of the relation, this is not configurable yet
  // NOTE 2: since relations are declarative (no server code), you can also define them in the shared schema
  // this may make data fetching easier in the frontend (the client can know the relation)
  demoRelationFieldUserId: {
    type: String,
    typeName: MongoId,
    optional: true,
    relation: {
      fieldName: "resolvedFieldFromRelation",
      kind: "hasOne",
      model: User,
    },
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
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
};
export const SampleModel = createGraphqlModel(modelDef);
