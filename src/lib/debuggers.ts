/**
 * Activate debuggers by defining DEBUG=vn:mongo
 * Client-side, define the "debug" variable in local storage
 * @see https://www.npmjs.com/package/debug
 */
import debug from "debug";
export const debugMongo = debug("vn:mongo");
export const debugAccount = debug("vn:account");
