import { getAvatar } from "@/lib/profile-images";

/** The driver hands back BSON Binary for stored buffers — normalise either way. */
function toBuffer(value) {
  if (Buffer.isBuffer(value)) return value;
  if (typeof value?.value === "function") return Buffer.from(value.value(true));
  if (value?.buffer) return Buffer.from(value.buffer);
  return Buffer.from(value);
}

// Route handlers are not cached by default in Next.js 16, and this one reads a
// dynamic segment + the database, so it always runs at request time.
export async function GET(_request, { params }) {
  const { userId } = await params;
  const avatar = await getAvatar(userId);

  if (!avatar?.bytes) {
    return new Response("Not found", { status: 404 });
  }

  const bytes = toBuffer(avatar.bytes);
  return new Response(bytes, {
    headers: {
      "Content-Type": avatar.contentType || "image/jpeg",
      "Content-Length": String(bytes.length),
      // The URL carries ?v=<upload time>, so long-lived caching is safe.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
