import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "Sign In | Verdant Table Catering",
  description:
    "Sign in to your Verdant Table account to review catering orders and plan your next event.",
};

export default function SignInPage() {
  return (
    <main className="flex-1 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Welcome back
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Sign in to your account
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Pick up where you left off — your saved events and menu picks
              are waiting.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <SignInForm />
          </div>
        </div>
      </div>
    </main>
  );
}
