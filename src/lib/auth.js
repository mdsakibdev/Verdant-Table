import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongodb";

export const auth = betterAuth({
  // Atlas is a replica set → transactions enabled by passing `client`.
  // (A standalone local mongod needs `mongodbAdapter(db)` without client.)
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    // Demo store — no email sender configured, so accounts activate instantly.
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh the session daily
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache the session for 5 minutes
    },
  },
});
