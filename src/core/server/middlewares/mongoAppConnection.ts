/**
 * Similar to "mongoConnection" middleware but uses the default uri
 */
import { connectToAppDb } from "~/core/server/mongoose/connection";
/**
 * Mongoose connection is not set automatically,
 * we need to trigger the connection for each middleware!
 *
 * We can be tricked by the seed step in production, this is important
 */
export const connectToAppDbMiddleware = (req, res, next) => {
  connectToAppDb()
    .then(() => {
      return next();
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
