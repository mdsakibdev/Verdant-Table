import { createAuthClient } from "better-auth/react";

// Same-origin client: the browser talks to this app's own /api/auth routes,
// so no baseURL is needed. (BETTER_AUTH_URL is server-only — it is undefined
// in the browser. Use a NEXT_PUBLIC_* var here only if the API moves hosts.)
export const authClient = createAuthClient();

// Convenience re-exports from the SAME instance, so they all share one
// session store (a second createAuthClient() would be a detached store).
export const { signIn, signUp, useSession } = authClient;
