"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const fieldClasses =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink transition-colors placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";
const labelClasses = "block text-sm font-semibold text-ink";
const submitClasses =
  "mt-6 w-full rounded-full bg-brand-600 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (signInError) {
      setError(
        signInError.message ||
          "Sign in failed. Check your email and password and try again.",
      );
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="sign-in-email" className={labelClasses}>
          Email
        </label>
        <input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={fieldClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="sign-in-password" className={labelClasses}>
          Password
        </label>
        <input
          id="sign-in-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          className={fieldClasses}
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={loading} className={submitClasses}>
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <p className="mt-6 text-center text-sm text-muted">
        New to Verdant Table?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          Create an account
        </Link>
      </p>
      <p className="mt-3 text-center text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-brand-700">
          ← Back to home
        </Link>
      </p>
    </form>
  );
}
