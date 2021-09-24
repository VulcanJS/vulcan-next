/**
 * Model for tokens for password based authentication
 * (email verification, password reset)
 *
 * Persisted in Mongo but NOT part of the graphql schema
 * @server-only
 */
import crypto from "crypto";
import { nanoid } from "nanoid";
import { VulcanSchema } from "@vulcanjs/schema";
import { createModel } from "@vulcanjs/model";
import { createMongooseConnector } from "@vulcanjs/mongo";

const schema: VulcanSchema = {
  _id: {
    type: String,
  },
  userId: {
    type: String,
    optional: false,
    // NOTE: this is not a graphql model, there is no notion of relation
    // if you want the user, you need to query it using the UserConnector
  },
  hashedToken: {
    type: String,
    optional: false,
    canRead: ["owners"],
    canCreate: [],
    canUpdate: [],
  },
  expiresAt: {
    type: Date,
    optional: false,
    canRead: ["owners"],
    canCreate: [],
    canUpdate: [],
  },
  kind: {
    type: String,
    optional: false,
    // possible values: "verifyEmail", "resetPassword"
  },
};

export interface StorableTokenType {
  _id?: string;
  userId: string;
  hashedToken: string;
  expiresAt: string;
  kind: "verifyEmail" | "resetPassword";
}

// NOTE: this is not a graphql model, as we use it only server-side
// this "just" a model
export const StorableToken = createModel({
  name: "VulcanStorableToken",
  schema,
  // this is a server only model => no once can create tokens
  // except mutations
  permissions: {
    canCreate: [],
    canDelete: [],
    canRead: [],
    canUpdate: [],
  },
});

export const StorableTokenConnector = createMongooseConnector<StorableTokenType>(
  StorableToken
);

// helpers

/**
 * (Reusing code from Blitz)
 */
export const generateToken = () => nanoid();
/**
 * Hash password reset/email verification token
 * (Reusing code from Blitz)
 */
export const hashToken = (token: string) =>
  (crypto as any).createHash("sha256").update(token).digest("hex");

/**
 * @param token
 * @param storedToken
 * @returns
 */
export const checkToken = (token: string, storedToken: StorableTokenType) => {
  // 1. check expiration
  if (new Date(storedToken.expiresAt) < new Date()) return false;
  // 2. check equality
  // TODO: check how secure it is to do an equality
  return storedToken.hashedToken === hashToken(token);
};
