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
