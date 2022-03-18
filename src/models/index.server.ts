// Export all your SERVER-ONLY models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "./sampleModel.server";
import { User } from "./user.server";
const models = [User, SampleModel];

// Add default connectors and dataSources creators for models that may miss some
// @see https://www.apollographql.com/docs/apollo-server/data/data-sources
import { addDefaultMongoConnector } from "@vulcanjs/mongo-apollo";
addDefaultMongoConnector(models);

export default models;
