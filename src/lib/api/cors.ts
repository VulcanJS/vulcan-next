import { parseEnvVariableArray } from "~/lib/utils";
import debug from "debug";
const debugCors = debug("vns:cors");

const corsWhitelist = parseEnvVariableArray(
  process.env.APOLLO_SERVER_CORS_WHITELIST
);

/**
 * Accept same origin queries, and
 */
const corsOptions = {
  origin: function (origin, callback) {
    debugCors("Origin is", origin, "Allowed origins are ", corsWhitelist);
    if (!origin) {
      // same origin
      callback(null, true);
    } else if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS ${origin}`));
    }
  },
};

export default corsOptions;
