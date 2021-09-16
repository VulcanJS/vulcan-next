//@see http://www.passportjs.org/packages/passport-local/
import Local from "passport-local";
import { debugMongo } from "~/lib/debuggers";
import { findUserByCredentials } from "../accountManagement";
import { connectToAppDb } from "../../mongoose/connection";

/**
 * Passport strategy for local password based authentication
 */
export const localStrategy = new Local.Strategy(function (
  email,
  password,
  done
) {
  // TODO: logic a bit duplicated with MongoConnection handler + not tested
  connectToAppDb()
    .then(() => {
      debugMongo("Connected to db from passport local auth strategy");
      findUserByCredentials({ email, password })
        .then((user) => {
          if (!user) {
            done(new Error("Email/password not matching"));
          } else {
            done(null, user);
          }
        })
        .catch((error) => {
          done(error);
        });
    })
    .catch((err) => {
      debugMongo(
        "Could not connect to db from passport local auth strategy",
        err
      );
    });
});
