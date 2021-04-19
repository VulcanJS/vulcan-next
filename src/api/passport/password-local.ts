//@see http://www.passportjs.org/packages/passport-local/
import Local from "passport-local";
import { debugMongo } from "~/lib/debuggers";
import { findUserByCredentials } from "~/models/user";
import { connectToDb } from "../middlewares/mongoConnection";

export const localStrategy = new Local.Strategy(function (
  email,
  password,
  done
) {
  // TODO: logic a bit duplicated with MongoConnection handler + not tested
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI env variable is not defined");
  const isLocalMongo = mongoUri.match(/localhost/);
  connectToDb(mongoUri)
    .then(() => {
      debugMongo("Connected to db from route passport local strategy");
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
      console.error(
        `\nCould not connect to Mongo database on URI ${mongoUri} during Passport local strategy.`
      );
      if (isLocalMongo) {
        console.error("Did you forget to run 'yarn run start:mongo'?\n");
      }
      console.error(err);
      done(err);
    });
});
