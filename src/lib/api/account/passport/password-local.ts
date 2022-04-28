import Local from "passport-local";
import { debugMongo } from "~/lib/debuggers";
import { findUserByCredentials } from "../accountManagement";
import { connectToAppDb } from "../../mongoose/connection";

/**
 * Passport strategy for local password based authentication
 * @see http://www.passportjs.org/docs/username-password/
 * @see http://www.passportjs.org/packages/passport-local/
 */
export const localStrategy = new Local.Strategy(
  {
    usernameField: "email", // name of the field you'll have to provide when calling "authenticate"/"login". The default is "username".
    passwordField: "password",
  },
  function (email, password, done) {
    // TODO: logic a bit duplicated with MongoConnection handler + not tested
    connectToAppDb()
      .then(() => {
        debugMongo("Connected to db from passport local auth strategy");
        findUserByCredentials({ email, password })
          .then((user) => {
            if (!user) {
              done(new Error("Email/password not matching"));
            } else if (!(user.isAdmin || user.isVerified)) {
              done(
                new Error(
                  "Account not verified. Please open the verification link we have sent you when you signed up."
                )
              );
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
        done(err);
      });
  }
);
