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
// Not needed as Meteor handles the mongo database
//import { createMongooseConnector } from "@vulcanjs/mongo";
import {
  vulcanResourcePermissions,
  vulcanResourceSchema,
} from "../../../meteor-backend/packages/getting-started/lib/modules/vulcanResource/vulcanResource";

const schema: VulcanSchema = {
  // base schema, shared with the backend
  ...vulcanResourceSchema,
};

export interface VulcanResourceType extends VulcanDocument {
  name: string;
  url: string;
}

const name = "VulcanResource"; // Change this value when creating your own model
const typeName = name;
const multiTypeName = "VulcanResources"; // Change this value when creating your own model
export const VulcanResource = createGraphqlModel({
  name: "vulcanResource",
  schema,
  graphql: {
    typeName,
    multiTypeName,
    queryResolvers: buildDefaultQueryResolvers({ typeName }),
    mutationResolvers: buildDefaultMutationResolvers({
      typeName,
    }),
  },
  permissions: vulcanResourcePermissions,
});

/*
Use this if you want to use Next as your BACKEND
We don't need this there, since we use Meteor as the backend
export const SampleModelConnector = createMongooseConnector<SampleModelType>(
  SampleModel
);
*/
