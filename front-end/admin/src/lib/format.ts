/** Format ISO date + time as dd/MM/yyyy HH:mm (Vietnam display format). */
export function formatDateTime(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()} ${hh}:${min}`;
}

/** Format ISO date only as dd/MM/yyyy. */
export function formatDateShort(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function formatDate(iso: string, style: "short" | "medium" = "short"): string {
  try {
    const opts: Intl.DateTimeFormatOptions =
      style === "medium"
        ? { day: "2-digit", month: "short", year: "numeric" }
        : { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(iso).toLocaleDateString("en-GB", opts);
  } catch {
    return iso;
  }
}
