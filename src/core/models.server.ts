// Export all your SERVER-ONLY models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "~/vulcan-demo/models/sampleModel.server";
import { User } from "~/account/models/user.server";
const models = [User, SampleModel];

// Add default connectors and dataSources creators for models that may miss some
// @see https://www.apollographql.com/docs/apollo-server/data/data-sources
import { addDefaultMongoConnector } from "@vulcanjs/mongo-apollo/server";
addDefaultMongoConnector(
  models
  /* {useStringId: true} // Uncomment to use String _ids in Mongo:*/
);

export default models;
