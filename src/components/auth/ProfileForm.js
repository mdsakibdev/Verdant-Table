"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import UserAvatar from "@/components/auth/UserAvatar";

const AVATAR_PIXELS = 512; // stored square size, well under the 2 MB cap
const MAX_INPUT_BYTES = 8 * 1024 * 1024; // generous limit before resizing

const fieldClasses =
  "mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink transition-colors placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";
const labelClasses = "block text-sm font-semibold text-ink";
const primaryButton =
  "mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60";
const secondaryButton =
  "inline-flex items-center justify-center rounded-full border-2 border-brand-200 px-4 py-2 text-xs font-semibold text-brand-800 transition-colors hover:border-brand-400 hover:text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-60";
const dangerButton =
  "inline-flex items-center justify-center rounded-full border-2 border-red-200 px-4 py-2 text-xs font-semibold text-red-700 transition-colors hover:border-red-300 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-60";
const successClasses =
  "rounded-xl bg-brand-50 px-4 py-3 text-xs leading-5 text-brand-800";
const errorClasses =
  "rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700";

/**
 * Center-crops any image to a square and returns a resized JPEG blob, so the
 * browser (not the server) does the work and uploads stay tiny.
 */
async function toSquareJpeg(file) {
  const bitmap = await createImageBitmap(file);
  try {
    const side = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_PIXELS;
    canvas.height = AVATAR_PIXELS;
    const context = canvas.getContext("2d");
    context.drawImage(
      bitmap,
      (bitmap.width - side) / 2,
      (bitmap.height - side) / 2,
      side,
      side,
      0,
      0,
      AVATAR_PIXELS,
      AVATAR_PIXELS,
    );
    return await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.85),
    );
  } finally {
    bitmap.close?.();
  }
}

/**
 * Name + photo editor for /profile. Name changes go straight through Better
 * Auth's `updateUser`; photo bytes are uploaded first, then the returned URL
 * is saved with a second `updateUser` call so the session cookie refreshes.
 */
export default function ProfileForm({ user, memberSince }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [name, setName] = useState(user.name || "");
  const [photo, setPhoto] = useState(user.image || "");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [savingName, setSavingName] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);

  const displayName = name.trim() || user.name || "Account";

  async function handleNameSubmit(event) {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setStatus({ type: "error", message: "Please enter your name." });
      return;
    }
    if (trimmed === (user.name || "")) {
      setStatus({
        type: "success",
        message: "Your name is already up to date.",
      });
      return;
    }

    setSavingName(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setSavingName(false);

    if (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not save your name. Try again.",
      });
      return;
    }

    setStatus({ type: "success", message: "Name updated." });
    router.refresh();
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    event.target.value = ""; // lets the same file be picked again later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Please choose an image file." });
      return;
    }
    if (file.size > MAX_INPUT_BYTES) {
      setStatus({
        type: "error",
        message: "That image is over 8 MB — pick a smaller one.",
      });
      return;
    }

    setSavingPhoto(true);
    try {
      const blob = await toSquareJpeg(file);
      if (!blob) throw new Error("That image could not be processed.");

      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Upload failed.");

      const { error } = await authClient.updateUser({ image: data.image });
      if (error) throw new Error(error.message || "Could not save your photo.");

      setPhoto(data.image);
      setStatus({ type: "success", message: "Photo updated." });
      router.refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not update your photo.",
      });
    } finally {
      setSavingPhoto(false);
    }
  }

  async function handlePhotoRemove() {
    setSavingPhoto(true);
    try {
      const response = await fetch("/api/profile/avatar", { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Could not remove your photo.");
      }

      const { error } = await authClient.updateUser({ image: null });
      if (error)
        throw new Error(error.message || "Could not remove your photo.");

      setPhoto("");
      setStatus({
        type: "success",
        message: "Photo removed — your initials are back.",
      });
      router.refresh();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Could not remove your photo.",
      });
    } finally {
      setSavingPhoto(false);
    }
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">
          {displayName}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Welcome back — thanks for trusting us with your events. Keep your
          details fresh so every menu recommendation and catering quote feels
          made for you.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4">
        <UserAvatar
          name={displayName}
          image={photo}
          size={96}
          alt={`${displayName} profile photo`}
        />

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={savingPhoto}
            onClick={() => fileInputRef.current?.click()}
            className={secondaryButton}
          >
            {savingPhoto ? "Saving…" : photo ? "Change photo" : "Upload photo"}
          </button>
          {photo ? (
            <button
              type="button"
              disabled={savingPhoto}
              onClick={handlePhotoRemove}
              className={dangerButton}
            >
              Remove
            </button>
          ) : null}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handlePhotoChange}
        />

        <p className="text-center text-xs text-muted">
          Cropped square and resized to {AVATAR_PIXELS}×{AVATAR_PIXELS} before
          uploading — JPG or PNG, up to 8 MB.
        </p>
      </div>

      <form onSubmit={handleNameSubmit} noValidate>
        <label htmlFor="profile-name" className={labelClasses}>
          Full name
        </label>
        <input
          id="profile-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Jane Doe"
          className={fieldClasses}
        />
        <button type="submit" disabled={savingName} className={primaryButton}>
          {savingName ? "Saving…" : "Save name"}
        </button>
      </form>

      {status.message ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={status.type === "error" ? errorClasses : successClasses}
        >
          {status.message}
        </p>
      ) : null}

      <dl className="space-y-3 border-t border-black/5 pt-6 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Email</dt>
          <dd className="truncate font-semibold text-ink">{user.email}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted">Member since</dt>
          <dd className="font-semibold text-ink">{memberSince}</dd>
        </div>
      </dl>
    </div>
  );
}
