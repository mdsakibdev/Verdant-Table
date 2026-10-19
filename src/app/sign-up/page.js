import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up | Verdant Table Catering",
  description:
    "Create a Verdant Table account to save catering menus, manage events, and check out faster.",
};

export default function SignUpPage() {
  return (
    <main className="flex-1 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Join the table
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Create your account
            </h1>
            <p className="mt-4 text-base leading-7 text-muted">
              Save favorite menus, manage your events, and move through
              checkout faster.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <SignUpForm />
          </div>
        </div>
      </div>
    </main>
  );
}
