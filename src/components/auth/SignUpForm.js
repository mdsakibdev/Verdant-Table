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

export default function SignUpForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const name = fullName.trim();
    if (!name) {
      setError("Please enter your full name.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name,
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (signUpError) {
      setError(
        signUpError.message ||
          "Sign up failed. Check your details and try again.",
      );
      return;
    }
    // Better Auth signs the user in immediately (email verification is off).
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="sign-up-name" className={labelClasses}>
          Full name
        </label>
        <input
          id="sign-up-name"
          type="text"
          autoComplete="name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Jane Doe"
          className={fieldClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="sign-up-email" className={labelClasses}>
          Email
        </label>
        <input
          id="sign-up-email"
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
        <label htmlFor="sign-up-password" className={labelClasses}>
          Password
        </label>
        <input
          id="sign-up-password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          className={fieldClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="sign-up-confirm" className={labelClasses}>
          Confirm password
        </label>
        <input
          id="sign-up-confirm"
          type="password"
          autoComplete="new-password"
          required
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          placeholder="Repeat your password"
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
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          Sign in
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
