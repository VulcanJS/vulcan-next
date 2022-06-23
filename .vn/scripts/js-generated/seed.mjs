import debug from 'debug';
import mongoose from 'mongoose';
import { createMutator } from '@vulcanjs/crud/server';
import merge2 from 'lodash/merge.js';
import { mergeModelDefinitionServer, createGraphqlModelServer, createContext } from '@vulcanjs/graphql/server';
import { createMongooseConnector } from '@vulcanjs/mongo';
import SimpleSchema from 'simpl-schema';
import { createGraphqlModel } from '@vulcanjs/graphql';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import 'react-dom/server.js';
import '@mui/material';
import 'passport';
import 'cookie';
import Local from 'passport-local';
import '@hapi/iron';
import { MongoId } from '@vulcanjs/mongo-apollo';
import { addDefaultMongoConnector } from '@vulcanjs/mongo-apollo/server';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var debugMongo = debug("vn:mongo");
debug("vn:account");
var globalNode = __spreadValues({
  mongooseCache: void 0
}, global);
var mongooseCache = globalNode.mongooseCache;
if (!mongooseCache) {
  globalNode.mongooseCache = { connectPromise: null };
  mongooseCache = globalNode.mongooseCache;
}
var connectToDb = async (mongoUri, options) => {
  if (mongooseCache == null ? void 0 : mongooseCache.connectPromise) {
    debugMongo("Running connectToDb, already connected or connecting to Mongo, waiting for promise");
    await mongooseCache.connectPromise;
  }
  if (![1, 2].includes(mongoose.connection.readyState)) {
    debugMongo("Call mongoose connect");
    mongooseCache.connectPromise = mongoose.connect(mongoUri, __spreadValues({}, options || {}));
    await (mongooseCache == null ? void 0 : mongooseCache.connectPromise);
  }
};
var connectToAppDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri)
    throw new Error("MONGO_URI env variable is not defined");
  const isLocalMongo = mongoUri.match(/localhost/);
  try {
    await connectToDb(mongoUri, {
      serverSelectionTimeoutMS: isLocalMongo ? 3e3 : void 0
    });
  } catch (err) {
    console.error(`
Could not connect to Mongo database on URI ${mongoUri}.`);
    if (isLocalMongo) {
      console.error("Did you forget to run 'yarn run start:mongo'?\n");
    }
    console.error(err);
    throw err;
  }
};
async function closeDbConnection() {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.error("Could not close mongoose connection");
    console.error(err);
    throw err;
  }
}
var passwordAuthSchema = {
  password: {
    type: String,
    optional: false,
    canRead: [],
    canCreate: ["guests", "anyone"],
    canUpdate: ["owners"]
  }
};
var emailVerificationSchema = {
  isVerified: {
    type: String,
    default: false,
    optional: true,
    canRead: ["owners"],
    canCreate: ["admins"],
    canUpdate: ["admins"]
  }
};
var schema = __spreadValues(__spreadValues({
  _id: {
    type: String,
    optional: true,
    canRead: ["guests", "anyone"]
  },
  userId: {
    type: String,
    optional: true,
    canRead: ["guests", "anyone"]
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    }
  },
  username: {
    type: String,
    optional: true,
    canRead: ["guests", "anyone"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true
  },
  isAdmin: {
    type: Boolean,
    label: "Admin",
    input: "checkbox",
    optional: true,
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests", "anyone"]
  },
  email: {
    type: String,
    optional: false,
    regEx: SimpleSchema.RegEx.Email,
    input: "text",
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canRead: ["owners", "admins"],
    searchable: true,
    unique: true
  },
  groups: {
    type: Array,
    optional: true,
    input: "checkboxgroup",
    canCreate: ["admins"],
    canUpdate: ["admins"],
    canRead: ["guests", "anyone"]
  },
  "groups.$": {
    type: String,
    optional: true
  }
}, passwordAuthSchema), emailVerificationSchema);
var modelDef = {
  name: "VulcanUser",
  graphql: {
    typeName: "VulcanUser",
    multiTypeName: "VulcanUsers"
  },
  schema,
  permissions: {
    canCreate: ["guests", "anyone"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"]
  }
};
var User = createGraphqlModel(modelDef);
var transport = {
  streamTransport: true,
  newline: "unix",
  buffer: true,
  debug: true
};
if (process.env.SMTP_HOST) {
  transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: !!process.env.SMTP_SECURE
  };
} else {
  console.warn("SMTP Transport not set during development");
  console.warn("If you run auth test using Cypress, use 'yarn run dev:test' instead!");
}
nodemailer.createTransport(transport);

// src/account/server/accountManagement.ts
var checkPasswordForUser = (user, passwordToTest) => {
  var _a, _b;
  if (!(user.salt && user.hash)) {
    console.warn(`User ${user && JSON.stringify(user)} has no salt/hash. Coming from Meteor? Will try to use legacy Meteor password, until the user changes their password.`);
    const storedHashedPassword = (_b = (_a = user == null ? void 0 : user.services) == null ? void 0 : _a.password) == null ? void 0 : _b.bcrypt;
    if (!storedHashedPassword)
      throw new Error("User has no Meteor password either.");
    new crypto.Hash("sha256").update(passwordToTest).digest("hex");
    throw new Error("Bcrypt not enabled in this app");
  }
  const hash = crypto.pbkdf2Sync(passwordToTest, user.salt, 1e3, 64, "sha512").toString("hex");
  const passwordsMatch = user.hash === hash;
  return passwordsMatch;
};
async function findUserByCredentials({
  email,
  password
}) {
  const user = await UserMongooseModel.findOne({ email });
  if (!user) {
    return null;
  }
  const passwordsMatch = checkPasswordForUser(user, password);
  if (!passwordsMatch) {
    return null;
  }
  return user;
}
new Local.Strategy({
  usernameField: "email",
  passwordField: "password"
}, function(email, password, done) {
  connectToAppDb().then(() => {
    debugMongo("Connected to db from passport local auth strategy");
    findUserByCredentials({ email, password }).then((user) => {
      if (!user) {
        done(new Error("Email/password not matching"));
      } else if (!(user.isAdmin || user.isVerified)) {
        done(new Error("Account not verified. Please open the verification link we have sent you when you signed up."));
      } else {
        done(null, user);
      }
    }).catch((error) => {
      done(error);
    });
  }).catch((err) => {
    debugMongo("Could not connect to db from passport local auth strategy", err);
    done(err);
  });
});
var hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { salt, hash };
};

// src/account/models/user.server.ts
var guaranteeOwnership = (data) => {
  data.userId = data._id;
  return data;
};
var handlePasswordCreation = (data, props) => {
  const { password } = data;
  const { hash, salt } = hashPassword(password);
  data.hash = hash;
  data.salt = salt;
  data.password = null;
  return data;
};
var handlePasswordUpdate = (data) => {
  const { password } = data;
  if (password) {
    const { hash, salt } = hashPassword(data.password);
    data.hash = hash;
    data.salt = salt;
    data.password = null;
  }
  return data;
};
var passwordAuthSchema2 = {
  hash: {
    type: String,
    canRead: [],
    canCreate: [],
    canUpdate: []
  },
  salt: {
    type: String,
    canRead: [],
    canCreate: [],
    canUpdate: []
  }
};
var schema2 = merge2({}, schema, __spreadValues({}, passwordAuthSchema2));
var modelDef2 = mergeModelDefinitionServer(modelDef, {
  graphql: {
    callbacks: {
      create: {
        before: [handlePasswordCreation],
        after: [guaranteeOwnership]
      },
      update: {
        before: [handlePasswordUpdate]
      }
    }
  },
  schema: schema2
});
var User2 = createGraphqlModelServer(modelDef2);
var UserConnector = createMongooseConnector(User2);
User2.crud.connector = UserConnector;
var UserMongooseModel = UserConnector.getRawCollection();

// src/core/server/seed.ts
var seed = async (context) => {
  var _a;
  if ((_a = process.env.MONGO_URI) == null ? void 0 : _a.match(/lbke-demo/)) {
    console.log("Using demo database, skip seeding");
    return;
  }
  const seedAdminUser = async () => {
    const count = await UserMongooseModel.count({ isAdmin: true });
    if (count === 0) {
      console.log("No admin user found, seeding admin");
      if (!process.env.ADMIN_EMAIL) {
        throw new Error("ADMIN_EMAIL env variable not defined. Could not seed admin user");
      }
      if (!process.env.ADMIN_INITIAL_PASSWORD) {
        throw new Error("ADMIN_INITIAL_PASSWORD env variable not defined. Could not seed admin user.");
      }
      const admin = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_INITIAL_PASSWORD,
        isAdmin: true
      };
      try {
        await createMutator({
          model: User2,
          data: admin,
          context,
          asAdmin: true,
          validate: false
        });
      } catch (error) {
        console.error("Could not seed admin user", error);
      }
    } else {
      console.log(`Found ${count} Admin(s) in the database, no need to seed.`);
    }
  };
  await seedAdminUser();
};
var seed_default = seed;
var schema3 = {
  _id: {
    typeName: MongoId,
    type: String,
    optional: true,
    canRead: ["guests", "anyone"]
  },
  userId: {
    type: String,
    typeName: MongoId,
    optional: true,
    canRead: ["guests", "anyone"],
    relation: {
      fieldName: "user",
      kind: "hasOne",
      model: User
    }
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ["admins"],
    onCreate: () => {
      return new Date();
    }
  },
  someField: {
    type: String,
    optional: true,
    canRead: ["anyone"],
    canUpdate: ["admins", "owners"],
    canCreate: ["members"]
  },
  demoRelationFieldUserId: {
    type: String,
    typeName: MongoId,
    optional: true,
    relation: {
      fieldName: "resolvedFieldFromRelation",
      kind: "hasOne",
      model: User
    }
  }
};
var name = "Sample";
var typeName = name;
var multiTypeName = "Samples";
var modelDef3 = {
  name,
  schema: schema3,
  graphql: {
    typeName,
    multiTypeName
  },
  permissions: {
    canCreate: ["members"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"]
  }
};
createGraphqlModel(modelDef3);

// src/vulcan-demo/models/sampleModel.server.ts
var schema4 = merge2({}, schema3, {
  demoServerOnlyField: {
    type: String,
    optional: true,
    canRead: ["guests", "anyone"],
    canUpdate: ["admins"],
    canCreate: ["owners"],
    searchable: true
  },
  demoCustomResolverField: {
    type: String,
    optional: true,
    canRead: ["admins"],
    resolveAs: {
      fieldName: "demoResolvedField",
      typeName: "String",
      addOriginalField: true,
      arguments: "someArgument: String, anotherArgument: Int",
      description: "A resolved field",
      resolver: async (document, args, context, info) => {
        const tenUsers = await UserMongooseModel.find({}, null, { limit: 10 });
        tenUsers.filter((u) => {
          var _a;
          return (_a = u.email) == null ? void 0 : _a.match(document.demoCustomResolverField);
        });
        return `
        Initial Id is: ${document.demoCustomResolverField}
        Args are: ${args.someArgument}, ${args.anotherArgument}`;
      }
    }
  }
});
var modelDef4 = merge2({}, modelDef3, {
  schema: schema4,
  graphql: __spreadValues({}, modelDef3.graphql)
});
var SampleModel2 = createGraphqlModelServer(modelDef4);
var SampleModelConnector = createMongooseConnector(SampleModel2);
SampleModel2.crud.connector = SampleModelConnector;
var models = [User2, SampleModel2];
addDefaultMongoConnector(models);
var models_server_default = models;
debug("vn:graphql:context");
var createContextForModels = createContext(models_server_default);
var createContextBase = async () => __spreadValues({}, await createContextForModels(null));

// src/core/server/runSeed.ts
async function runSeed() {
  if (process.env.NODE_ENV !== "production") {
    try {
      await connectToAppDb();
      debugMongo("Connected to db, seeding admin and restaurants");
      const contextBase = await createContextBase();
      await seed_default(contextBase);
      const seedRestaurants = async () => {
        const db = mongoose.connection;
        const count = await db.collection("restaurants").countDocuments();
        if (count === 0) {
          await db.collection("restaurants").insertMany([
            {
              name: "The Restaurant at the End of the Universe"
            },
            { name: "The Last Supper" },
            { name: "Shoney's" },
            { name: "Big Bang Burger" },
            { name: "Fancy Eats" }
          ]);
        }
      };
      await seedRestaurants();
    } catch (err) {
      console.error(`
Could not connect to Mongo database on URI during seed step.`);
      console.error(err);
      process.exit(1);
    }
  }
}
var runSeed_default = runSeed;

// .vn/scripts/ts-sources/db/seed.ts
async function run() {
  await connectToAppDb();
  await runSeed_default();
  await closeDbConnection();
}
run();
//# sourceMappingURL=seed.mjs.map