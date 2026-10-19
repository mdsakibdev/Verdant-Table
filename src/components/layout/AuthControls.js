"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/auth/UserAvatar";

const buttonBase =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

const signInButton = `${buttonBase} border-2 border-brand-200 text-brand-800 hover:border-brand-400 hover:text-brand-900`;
const signUpButton = `${buttonBase} bg-brand-600 text-white hover:bg-brand-700`;

export default function AuthControls({
  variant = "inline",
  onNavigate,
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isDrawer = variant === "drawer";

  if (isPending) {
    return isDrawer ? null : <div className="hidden sm:block" />;
  }

  if (!user) {
    return (
      <div
        className={
          isDrawer
            ? "flex w-full flex-col gap-3"
            : "hidden items-center gap-2 sm:flex"
        }
      >
        <Link
          href="/sign-in"
          onClick={onNavigate}
          className={`${signInButton} w-full sm:w-auto`}
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          onClick={onNavigate}
          className={`${signUpButton} w-full sm:w-auto`}
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const name = user.name || "Account";

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          onNavigate?.();
          router.push("/");
          router.refresh();
        },
      },
    });
  }

  return (
    <div
      className={
        isDrawer
          ? "flex w-full flex-col gap-3"
          : "hidden items-center gap-2 sm:flex"
      }
    >
      {/* User profile: image + name + welcome paragraph */}
      <Link
        href="/profile"
        onClick={onNavigate}
        title="Profile settings"
        className={
          isDrawer
            ? "flex items-center gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-brand-50"
            : "flex items-center gap-2 rounded-full px-2 py-1.5 transition-colors hover:bg-brand-50"
        }
      >
        <UserAvatar
          name={name}
          image={user.image}
          size={36}
        />

        <span className="flex min-w-0 flex-col items-start leading-tight">
          <span className="max-w-[160px] truncate text-sm font-semibold text-ink">
            {name}
          </span>

          <span className="mt-1 text-xs text-muted">
            Welcome back!
          </span>
        </span>
      </Link>

      {/* Sign out */}
      <button
        type="button"
        onClick={handleSignOut}
        className={`${signInButton} ${isDrawer ? "w-full" : ""}`}
      >
        Log Out
      </button>
    </div>
  );
}