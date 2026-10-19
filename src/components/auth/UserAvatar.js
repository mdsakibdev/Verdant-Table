import Image from "next/image";
import { getInitials } from "@/lib/initials";

/**
 * Avatar with a photo/initials fallback. Used by the navbar cluster and the
 * profile page — pass `size` in pixels (the initials font scales with it).
 * `alt` defaults to "" because the navbar renders the name right next to it.
 */
export default function UserAvatar({
  name,
  image,
  size = 36,
  alt = "",
  className = "",
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        width={size}
        height={size}
        unoptimized
        className={`shrink-0 rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-extrabold text-white ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {getInitials(name)}
    </span>
  );
}
