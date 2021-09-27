import crypto from "crypto";
export const hashPassword = (password: string) => {
  const salt = (crypto as any).randomBytes(16).toString("hex");
  const hash = (crypto as any)
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { salt, hash };
};
