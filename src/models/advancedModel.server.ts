/**
 * I am a sample model
 * Replace me with your own
 */
import { VulcanDocument } from "@vulcanjs/schema";
import {
  CreateGraphqlModelOptionsServer,
  createGraphqlModelServer,
  VulcanGraphqlSchemaServer,
} from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";
import merge from "lodash/merge";
import { modelDef as modelDefShared } from "./sampleModel";

const schema: VulcanGraphqlSchemaServer = {
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

const modelDef: CreateGraphqlModelOptionsServer = merge({}, modelDefShared, {
  schema,
  // add other server only options here
  graphql: {
    /* ...*/
  },
});
export const SampleModel = createGraphqlModelServer(modelDef);

export const SampleModelConnector = createMongooseConnector<SampleModelType>(
  SampleModel
);
