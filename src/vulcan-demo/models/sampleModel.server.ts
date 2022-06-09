/**
 * I am a sample model
 * Replace me with your own
 */
import {
  CreateGraphqlModelOptionsServer,
  createGraphqlModelServer,
  VulcanGraphqlSchemaServer,
} from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";
import merge from "lodash/merge.js";
import {
  modelDef as commonModelDef,
  SampleModelType,
  schema as commonSchema,
} from "./sampleModel";
import { User, UserMongooseModel } from "~/account/models/user.server";

const schema: VulcanGraphqlSchemaServer = merge({}, commonSchema, {
  // An API-only field, that will appear in the graphql schema
  // but not used in the browser
  demoServerOnlyField: {
    type: String,
    optional: true,
    canRead: ["guests", "anyone"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true,
  },
  /**
   * Demo of an avanced field resolver
   *
   *
   * Use only as a last resort for advanced use case,
   * prefer relations for more basic use cases
   *
   * NOTE: a field resolver is tied to a specific document,
   * it is used to enhance each document of your collection,
   * for instance getting Twitter account info of your user based on their id.
   *
   * If you want to define a new "static", "top-level" query/mutation,
   * => just add it in src/pages/api/graphql using usual Apollo syntax
   *
   *
   * @example
   * query withResolved { sample(input:{}) { result {
   *   someId
   *   resolvedField(someArgument: "hello", anotherArgument: 42)
   * }}}
   */
  demoCustomResolverField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    resolveAs: {
      // fieldName can be the same as the initial type (useful for "virtual" fields that do not exist in the database at all)
      fieldName: "demoResolvedField",
      // Return type of your field
      typeName: "String",
      // Will keep "someId" in the graphql schema
      addOriginalField: true,
      arguments: "someArgument: String, anotherArgument: Int",
      description: "A resolved field",
      // query withResolved { sample { result { someId(someArgument: "hello", anotherArgument: 42) }}}
      resolver: async (
        document: SampleModelTypeServer,
        args: { someArgument: string; anotherArgument: number },
        context,
        info
      ) => {
        // Here, you can get a value based on "document.someId" (or any other field)
        // "context" contains:
        // - currentUser and userId for authenticated user
        // - HTTP request
        // - each model and connector (but you should import them explicitely, this only is used internally by Vulcan)
        // Permissions are automatically checked for you based on "canRead" field

        // Example with a data source, useful if you get users from known ids or fields
        //const UserDataSource = getModelDataSource(context, User);
        // const tenUsers = await UserDataSource.findByFields({}, { limit: 10 });

        // Here we need a custom call, we need to call mongoose
        const tenUsers = await UserMongooseModel.find({}, null, { limit: 10 });
        const filtered = tenUsers.filter((u) =>
          u.email?.match(document.demoCustomResolverField)
        );
        return `
        Initial Id is: ${document.demoCustomResolverField}
        Args are: ${args.someArgument}, ${args.anotherArgument}`;
      },
    },
  },
} as VulcanGraphqlSchemaServer);

export interface SampleModelTypeServer extends SampleModelType {
  demoServerOnlyField: string;
  demoCustomResolverField: string;
  demoResolvedField: string;
}

const modelDef: CreateGraphqlModelOptionsServer = merge({}, commonModelDef, {
  schema,
  // add other server only options here,
  // like callbacks
  graphql: {
    ...commonModelDef.graphql, // NOT: not mandatory but will please TS until we can figure nested partial types
    // Expert feature: you can customize resolvers for CRUD operations here
    // mutationResolvers: { },
    // queryResolvers: {}
  },
} as Partial<CreateGraphqlModelOptionsServer>);
export const SampleModel = createGraphqlModelServer(modelDef);

/**
 * Defining a connector explicitely let us reuse it when creating custom resolver
 *
 * This is optional, a connector is automatically created for you during graphql context creation
 */
const SampleModelConnector =
  createMongooseConnector<SampleModelType>(SampleModel);
// We registrer the connector within the model
// (Note: since the connector depends on the model, it can not be done during model creation,
// you have to do this afterward)
SampleModel.crud.connector = SampleModelConnector;
