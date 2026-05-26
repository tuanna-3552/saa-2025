/**
 * Shared bi-directional sort indicator used across all admin tables.
 * Active arrow uses currentColor (inherits gold/white from parent button).
 * Inactive arrow uses a fixed dim white so it stays visible regardless of parent opacity.
 */
const DIM = "rgba(255,255,255,0.3)";

export function SortIcon({ dir }: { dir: "asc" | "desc" | null }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M6 10L12 3L18 10H6Z" fill={dir === "asc" ? "currentColor" : DIM} />
      <path d="M6 14L12 21L18 14H6Z" fill={dir === "desc" ? "currentColor" : DIM} />
    </svg>
  );
}
