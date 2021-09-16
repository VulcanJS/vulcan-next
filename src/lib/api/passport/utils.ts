import passport from "passport";
/**
 * Generic authentication method
 *
 * For local authentication with password and email, see passwordAuth
 * @param method
 * @param req
 * @param res
 * @returns
 */
export const authenticate = (method, req, res): Promise<any> =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    })(req, res);
  });
