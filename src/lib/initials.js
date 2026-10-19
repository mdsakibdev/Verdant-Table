/**
 * Initials for the navbar avatar. "Jane Doe" → "JD", "Plato" → "P".
 *
 * @param {string} name - Full (or partial) display name.
 * @returns {string} Uppercase 1–2 character initial string.
 */
export function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}
