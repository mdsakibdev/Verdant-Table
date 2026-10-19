import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/mongodb";
n
// Vercel issues a project more than one production domain when the plain
// `<project>.vercel.app` name is taken globally, so extra origins are supplied
// through the environment. `BETTER_AUTH_URL` itself is always trusted.
const trustedOrigins = (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const auth = betterAuth({
  // Atlas is a replica set → transactions enabled by passing `client`.
  // (A standalone local mongod needs `mongodbAdapter(db)` without client.)
  database: mongodbAdapter(db, { client }),
  // Omitted when unset, so local dev keeps Better Auth's default ([BETTER_AUTH_URL]).
  ...(trustedOrigins.length ? { trustedOrigins } : {}),
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
