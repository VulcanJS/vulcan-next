/**
 * I am a sample model
 * Replace me with your own
 */
import { VulcanSchema, VulcanDocument } from "@vulcanjs/schema";
import {
  buildDefaultMutationResolvers,
  buildDefaultQueryResolvers,
  createGraphqlModel,
  // VulcanGraphqlModel,
} from "@vulcanjs/graphql";
import { createMongooseConnector } from "@vulcanjs/mongo";

const schema: VulcanSchema = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"],
  },
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
  someField: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true,
  },
};

export interface SampleModelType extends VulcanDocument {
  someField: string;
}

const name = "Sample"; // Change this value when creating your own model
const typeName = name;
const multiTypeName = "Samples"; // Change this value when creating your own model
export const SampleModel = createGraphqlModel({
  name: "sample",
  schema,
  graphql: {
    typeName,
    multiTypeName,
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName,
    }),
  },
  permissions: {
    canCreate: ["member"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"],
  },
});

export const SampleModelConnector = createMongooseConnector<SampleModelType>(
  SampleModel
);
