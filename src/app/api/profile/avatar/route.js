import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { deleteAvatar, saveAvatar } from "@/lib/profile-images";

const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB, after the browser-side resize

async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Stores the uploaded avatar bytes. The client then calls
 * `authClient.updateUser({ image })` so Better Auth refreshes the session
 * cookie (and every `useSession()` consumer) through its normal endpoint.
 */
export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: "You need to be signed in." },
      { status: 401 },
    );
  }

  let file;
  try {
    const formData = await request.formData();
    file = formData.get("file");
  } catch {
    return Response.json(
      { error: "Expected a multipart form upload." },
      { status: 400 },
    );
  }

  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ error: "That file is not an image." }, { status: 415 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return Response.json(
      { error: "Images must be 2 MB or smaller." },
      { status: 413 },
    );
  }

  await saveAvatar(session.user.id, {
    contentType: file.type,
    bytes: Buffer.from(await file.arrayBuffer()),
  });

  // Version query so a re-upload replaces the previous image everywhere.
  return Response.json({
    image: `/api/profile/avatar/${session.user.id}?v=${Date.now()}`,
  });
}

/**
 * Removes the stored avatar; the client then clears `user.image`.
 */
export async function DELETE() {
  const session = await getSession();
  if (!session) {
    return Response.json(
      { error: "You need to be signed in." },
      { status: 401 },
    );
  }

  await deleteAvatar(session.user.id);
  return Response.json({ image: null });
}
