//@see http://www.passportjs.org/packages/passport-local/
import Local from "passport-local";
import { findUserByCredentials } from "~/models/user";

export const localStrategy = new Local.Strategy(function (
  email,
  password,
  done
) {
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
});
