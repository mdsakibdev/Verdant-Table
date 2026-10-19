import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileForm from "@/components/auth/ProfileForm";
import SectionHeading from "@/components/ui/SectionHeading";

// Reading the session is request-time data, so this page can't produce a
// static shell. `instant = false` is the documented opt-out for Cache
// Components: the route is allowed to block on the server, which is what makes
// the signed-out `redirect()` a real HTTP redirect.
export const instant = false;

export const metadata = {
  title: "Your Profile | Verdant Table Catering",
  description:
    "Update your display name and profile photo for your Verdant Table account.",
};

// Fixed locale + month/year only, so the server and the client render the
// same string (a live toLocaleDateString() can differ between the two).
const memberSinceFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;
  const memberSince = memberSinceFormat.format(new Date(user.createdAt));

  return (
    <main className="flex-1 bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Your account"
          title="Profile settings"
          description="Keep your name and photo up to date — they appear in the header and on your catering orders."
        />

        <div className="mx-auto mt-14 max-w-md">
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
            <ProfileForm user={user} memberSince={memberSince} />
          </div>
        </div>
      </div>
    </main>
  );
}
