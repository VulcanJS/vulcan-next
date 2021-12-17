/**
 * I am a sample model
 * Replace me with your own
 */
import { VulcanDocument } from "@vulcanjs/schema";
import {
  CreateGraphqlModelOptionsServer,
  createGraphqlModelServer,
  VulcanGraphqlSchemaServer,
  getModel,
  getModelConnector,
} from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";
import merge from "lodash/merge";
import {
  modelDef as commonModelDef,
  SampleModelType,
  schema as commonSchema,
} from "./sampleModel";
import { User, UserConnector } from "./user.server";

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
  // If relationDemoUserId matches an existing user, this field can resolve it
  // NOTE: the match will be done on "_id" field, this is not configurable yet
  // NOTE 2: since relations are declarative (no server code), you can also define them in the shared schema
  // this may make data fetching easier in the frontend (the client can know the relation)
  relationDemoUserId: {
    type: String,
    relation: {
      fieldName: "resolvedFieldFromRelation",
      kind: "hasOne",
      model: User,
    },
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
  someId: {
    type: String,
    optional: true,
    canRead: ["admins"],
    resolveAs: {
      fieldName: "resolvedField",
      // Return type of your field
      typeName: "String",
      // Will keep "someId" in the graphql schema
      addOriginalField: true,
      arguments: "someArgument: String, anotherArgument: Int",
      description: "A resolved field",
      // query withResolved { sample { result { someId(someArgument: "hello", anotherArgument: 42) }}}
      resolver: async (document, args, context, info) => {
        // Here, you can get a value based on "document.someId" (or any other field)
        // "context" contains:
        // - currentUser and userId for authenticated user
        // - HTTP request
        // - each model and connector (but you should import them explicitely, this only is used internally by Vulcan)
        // Permissions are automatically checked for you based on "canRead" field

        // Dumb example of how you can use a connector to fetch data from another collection
        const tenUsers = await UserConnector.find({}, { limit: 10 });
        const filtered = tenUsers.filter((u) =>
          u.email?.match(document.someId)
        );
        return `
        Initial Id is: ${document.someId}
        Args are: ${args.someArgument}, ${args.anotherArgument}`;
      },
    },
  },
} as VulcanGraphqlSchemaServer);

export interface SampleModelTypeServer extends SampleModelType {
  someServerOnlyField: string;
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

export const SampleModelConnector =
  createMongooseConnector<SampleModelType>(SampleModel);
