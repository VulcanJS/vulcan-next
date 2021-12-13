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
  schema as schemaShared,
  modelDef as modelDefShared,
} from "./advancedModel";

const schema: VulcanGraphqlSchemaServer = merge(
  {},
  schemaShared,
  {} as VulcanGraphqlSchemaServer
);

export interface SampleModelType extends VulcanDocument {
  someField: string;
}

const modelDef: CreateGraphqlModelOptionsServer = merge({}, modelDefShared, {
  schema,
  // add other server only options here
  graphql: {
    /* ...*/
  },
} as CreateGraphqlModelOptionsServer);
export const SampleModel = createGraphqlModelServer(modelDef);

export const SampleModelConnector =
  createMongooseConnector<SampleModelType>(SampleModel);
