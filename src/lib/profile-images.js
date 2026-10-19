import { db } from "@/lib/mongodb";

const COLLECTION = "profileImages";

/**
 * Avatars live in their own collection so `user.image` stays a short URL and
 * the Better Auth session cookie cache never has to carry image bytes.
 */
function avatars() {
  return db.collection(COLLECTION);
}

/**
 * Store (or replace) a user's avatar bytes.
 *
 * @param {string} userId
 * @param {{ contentType: string, bytes: Buffer }} image
 */
export async function saveAvatar(userId, { contentType, bytes }) {
  await avatars().updateOne(
    { userId },
    { $set: { userId, contentType, bytes, updatedAt: new Date() } },
    { upsert: true },
  );
}

/**
 * @param {string} userId
 * @returns {Promise<{ contentType?: string, bytes?: unknown } | null>}
 */
export async function getAvatar(userId) {
  return avatars().findOne({ userId });
}

/**
 * @param {string} userId
 */
export async function deleteAvatar(userId) {
  await avatars().deleteOne({ userId });
}
