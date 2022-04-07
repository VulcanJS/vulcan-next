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

// src/lib/debuggers.ts
import debug from "debug";
var debugMongo = debug("vn:mongo");
var debugAccount = debug("vn:account");

// src/lib/api/mongoose/connection.ts
import mongoose from "mongoose";
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

// src/lib/api/runSeed.ts
import mongoose2 from "mongoose";

// src/lib/api/seed.ts
import { createMutator, getModelConnector } from "@vulcanjs/graphql/server";

// src/models/user.server.ts
import merge from "lodash/merge.js";
import {
  createGraphqlModelServer,
  mergeModelDefinitionServer
} from "@vulcanjs/graphql/server";
import { createMongooseConnector } from "@vulcanjs/mongo";

// src/models/user.ts
import SimpleSchema from "simpl-schema";
import {
  createGraphqlModel
} from "@vulcanjs/graphql";
var passwordAuthSchema = {
  password: {
    type: String,
    optional: false,
    canRead: [],
    canCreate: ["guests"],
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
    canRead: ["guests"]
  },
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"]
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
    canRead: ["guests"],
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
    canRead: ["guests"]
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
    canRead: ["guests"]
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
    canCreate: ["guests"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"]
  }
};
var User = createGraphqlModel(modelDef);

// src/lib/api/account/accountManagement.ts
import crypto from "crypto";

// src/lib/api/mail/transports.ts
import nodemailer from "nodemailer";
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
var localMailTransport = nodemailer.createTransport(transport);

// src/lib/api/account/emails/resetPasswordToken.tsx
import ReactDOMServer from "react-dom/server.js";
import { Typography } from "@mui/material";

// src/lib/api/account/emails/verifyEmail.tsx
import ReactDOMServer2 from "react-dom/server.js";
import { Typography as Typography2 } from "@mui/material";

// src/lib/api/account/accountManagement.ts
import passport from "passport";

// src/lib/api/account/emails/resetPasswordSuccess.tsx
import ReactDOMServer3 from "react-dom/server.js";
import { Typography as Typography3 } from "@mui/material";

// src/lib/api/account/emails/changePasswordSuccess.tsx
import ReactDOMServer4 from "react-dom/server.js";
import { Typography as Typography4 } from "@mui/material";

// src/lib/api/account/accountManagement.ts
var checkPasswordForUser = (user, passwordToTest) => {
  var _a, _b;
  if (!(user.salt && user.hash)) {
    console.warn(`User ${user && JSON.stringify(user)} has no salt/hash. Coming from Meteor? Will try to use legacy Meteor password, until the user changes their password.`);
    const storedHashedPassword = (_b = (_a = user == null ? void 0 : user.services) == null ? void 0 : _a.password) == null ? void 0 : _b.bcrypt;
    if (!storedHashedPassword)
      throw new Error("User has no Meteor password either.");
    const userInput = new crypto.Hash("sha256").update(passwordToTest).digest("hex");
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
  const user = await UserConnector.findOne({ email });
  if (!user) {
    return null;
  }
  const passwordsMatch = checkPasswordForUser(user, password);
  if (!passwordsMatch) {
    return null;
  }
  return user;
}

// src/lib/api/account/auth-cookies.ts
import { serialize, parse } from "cookie";
var MAX_AGE = 60 * 60 * 8;

// src/lib/api/account/passport/password-local.ts
import Local from "passport-local";
var localStrategy = new Local.Strategy({
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

// src/lib/api/account/session.ts
import Iron from "@hapi/iron";
var TOKEN_SECRET = process.env.TOKEN_SECRET;
if (!TOKEN_SECRET)
  throw new Error("Authentication not set for this application");

// src/lib/api/account/utils.ts
import crypto2 from "crypto";
var hashPassword = (password) => {
  const salt = crypto2.randomBytes(16).toString("hex");
  const hash = crypto2.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex");
  return { salt, hash };
};

// src/models/user.server.ts
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
var schema2 = merge({}, schema, __spreadValues({}, passwordAuthSchema2));
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
User2.graphql.connector = UserConnector;

// src/lib/api/seed.ts
var seed = async (context) => {
  var _a;
  if ((_a = process.env.MONGO_URI) == null ? void 0 : _a.match(/lbke-demo/)) {
    console.log("Using demo database, skip seeding");
    return;
  }
  const UserConnector2 = getModelConnector(context, User2);
  const seedAdminUser = async () => {
    const count = await UserConnector2.count({ isAdmin: true });
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

// src/lib/api/context.ts
import debug2 from "debug";

// src/models/sampleModel.server.ts
import {
  createGraphqlModelServer as createGraphqlModelServer2
} from "@vulcanjs/graphql/server";
import { createMongooseConnector as createMongooseConnector2 } from "@vulcanjs/mongo";
import merge2 from "lodash/merge.js";

// src/models/sampleModel.ts
import {
  createGraphqlModel as createGraphqlModel2
} from "@vulcanjs/graphql";
var schema3 = {
  _id: {
    type: String,
    optional: true,
    canRead: ["guests"]
  },
  userId: {
    type: String,
    optional: true,
    canRead: ["guests"]
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
    canRead: ["guests"],
    canUpdate: ["admins", "owners"],
    canCreate: ["members"]
  },
  demoRelationFieldUserId: {
    type: String,
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
    canCreate: ["member"],
    canUpdate: ["owners", "admins"],
    canDelete: ["owners", "admins"],
    canRead: ["members", "admins"]
  }
};
var SampleModel = createGraphqlModel2(modelDef3);

// src/models/sampleModel.server.ts
var schema4 = merge2({}, schema3, {
  demoServerOnlyField: {
    type: String,
    optional: true,
    canRead: ["guests"],
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
        const tenUsers = await UserConnector.find({}, { limit: 10 });
        const filtered = tenUsers.filter((u) => {
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
var SampleModel2 = createGraphqlModelServer2(modelDef4);
var SampleModelConnector = createMongooseConnector2(SampleModel2);
SampleModel2.graphql.connector = SampleModelConnector;

// src/models/index.server.ts
import { addDefaultMongoConnector } from "@vulcanjs/mongo-apollo";
var models = [User2, SampleModel2];
addDefaultMongoConnector(models);
var index_server_default = models;

// src/lib/api/context.ts
import { createContext as createVulcanDefaultContext } from "@vulcanjs/graphql/server";
var debugGraphqlContext = debug2("vn:graphql:context");
var createContextForModels = createVulcanDefaultContext(index_server_default);
var createContextBase = async () => __spreadValues({}, await createContextForModels(null));

// src/lib/api/runSeed.ts
async function runSeed() {
  if (process.env.NODE_ENV !== "production") {
    try {
      await connectToAppDb();
      debugMongo("Connected to db, seeding admin and restaurants");
      const contextBase2 = await createContextBase();
      await seed_default(contextBase2);
      const seedRestaurants = async () => {
        const db = mongoose2.connection;
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