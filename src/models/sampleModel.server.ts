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
import {
  modelDef as commonModelDef,
  SampleModelType,
  schema as commonSchema,
} from "./sampleModel";

const schema: VulcanGraphqlSchemaServer = merge({}, commonSchema, {
  // An API-only field, that will appear in the graphql schema
  // but not used in the browser
  someServerOnlyField: {
    type: String,
    optional: true,
    canRead: ["guests"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true,
  },
});

export interface SampleModelTypeServer extends SampleModelType {
  someServerOnlyField: string;
}

const modelDef: CreateGraphqlModelOptionsServer = merge({}, commonModelDef, {
  schema,
  // add other server only options here,
  // like callbacks
  graphql: {},
});
export const SampleModel = createGraphqlModelServer(modelDef);

export const SampleModelConnector = createMongooseConnector<SampleModelType>(
  SampleModel
);
