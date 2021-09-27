/**
 * Helpers for email/password based authentication and account management
 *
 * /!\ Those methods expects the connection with the database to be already established
 * - Either create a UserConnector that guarantees that the connection is always established
 * - Or establish the connection before you run those function, using "connectoToAppDb()" helper
 */
import crypto from "crypto";
import { UserTypeServer, UserConnector } from "~/models/user.server";
import { localMailTransport } from "~/lib/api/mail/transports";
import { resetPasswordTokenEmailParameters } from "./emails/resetPasswordToken";
import { verifyEmailEmailParameters } from "./emails/verifyEmail";

import passport from "passport";
import { resetPasswordSuccessEmailParameters } from "./emails/resetPasswordSuccess";
import { changePasswordSuccessEmailParameters } from "./emails/changePasswordSuccess";
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
      } else if (token) {
        resolve(token);
      } else {
        // This occurs when the request has an incorrect body, eg you are using "username" instead of "emails"
        reject(new Error("Unexpected error during authentication"));
      }
    })(req, res);
  });
/**
 * Check that the provided password is the user's password
 * @param user
 * @param passwordToTest
 * @returns
 */
export const checkPasswordForUser = (
  user: Pick<UserTypeServer, "hash" | "salt">,
  passwordToTest: string
): boolean => {
  const hash = (crypto as any)
    .pbkdf2Sync(passwordToTest, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === hash;
  return passwordsMatch;
};
/**
 * Find an user during authentication
 * Return null if not found/password mismatch
 * @param param0
 */
export async function findUserByCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserTypeServer | null> {
  // Here you should lookup for the user in your DB and compare the password:
  //
  const user = await UserConnector.findOne({ email });
  // NOTE: we should NEVER differentiate the return type depending on whether the email is found or the password is mismatching
  // otherwise attacker could guess whether an user has an account or not in the application
  if (!user) {
    return null;
  }
  // const user = await DB.findUser(...)
  const passwordsMatch = checkPasswordForUser(user, password);
  if (!passwordsMatch) {
    return null;
  }
  return user;
}

const logMail = (res) => {
  console.info(
    "Sent an email",
    JSON.stringify(res?.envelope, null, 2),
    (res as any)?.message?.toString()
  );
};

export const sendResetPasswordEmail = async ({ email, resetUrl }) => {
  const res = await localMailTransport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    ...resetPasswordTokenEmailParameters({ resetUrl }),
  });
  logMail(res);
};

export const sendVerificationEmail = async ({ email, verificationUrl }) => {
  const res = await localMailTransport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    ...verifyEmailEmailParameters({ verificationUrl }),
  });
  logMail(res);
};

export const sendResetPasswordSuccessEmail = async ({ email }) => {
  const res = await localMailTransport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    ...resetPasswordSuccessEmailParameters(),
  });
  logMail(res);
};

export const sendChangePasswordSuccessEmail = async ({ email }) => {
  const res = await localMailTransport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    ...changePasswordSuccessEmailParameters(),
  });
  logMail(res);
};
