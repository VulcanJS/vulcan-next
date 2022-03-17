import type { Connector } from "@vulcanjs/crud/server";
import type {
  VulcanGraphqlModel,
  VulcanGraphqlModelServer,
  VulcanGenericDataSource,
} from "@vulcanjs/graphql/server";

import models from "~/models/index.server";

interface ModelDataSources {
  [typeName: string]: VulcanGenericDataSource;
}
/**
 * Build a default graphql context for a list of models
 *
 * NOTE: when coding custom mutation or resolvers, you DON'T need to rely on this context
 * It is used internally by Vulcan to generate the default query and mutation resolvers,
 * and field/relation resolvers for the dataSources
 * @param models
 */
export const createDataSources = (): ModelDataSources => {
  const dataSources = models.reduce((dataSources, model) => {
    // TODO: we should find a way to guarantee that all models have a default connector
    const connector = model.graphql.connector || createMongooseConnector(model);
    return {
      ...dataSources,
      [model.name]:
        model.graphql.dataSource || createMongooseDataSource(model, connector),
    };
  });
  return dataSources;
};

import { MongoDataSource } from "apollo-datasource-mongodb";
import type { Model } from "mongoose";
import { createMongooseConnector } from "@vulcanjs/mongo";
/**
 * Create a mongoose data source
 * @param model
 * @param connector
 * @returns
 */
const createMongooseDataSource = (
  model: VulcanGraphqlModelServer,
  connector: Connector
) => {
  const rawCollection = connector.getRawCollection();
  if (!rawCollection) {
    console.warn(`Model ${model.name} has no rawCollection in its connector. If it is not a Mongoose model, please
    manually provide a dataSource in model.graphql options.`);
    return undefined;
  }
  // TODO: check that it's a mongoose model?
  const mongooseModel = rawCollection as unknown as Model<any>;
  return new MongoDataSource(mongooseModel);
};
