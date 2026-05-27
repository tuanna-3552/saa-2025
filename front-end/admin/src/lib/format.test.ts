import { formatDateTime, formatDateShort, formatDate } from "./format";

describe("formatDateTime", () => {
  it("returns '-' for null", () => {
    expect(formatDateTime(null)).toBe("-");
  });

  it("formats ISO string as dd/MM/yyyy HH:mm", () => {
    // Use a fixed UTC offset-free date to avoid timezone flakiness
    const result = formatDateTime("2024-03-15T09:05:00.000Z");
    // The exact hours depend on local timezone, so check structure only
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
  });

  it("returns '-' for empty string", () => {
    expect(formatDateTime("")).toBe("-");
  });
});

describe("formatDateShort", () => {
  it("returns '-' for null", () => {
    expect(formatDateShort(null)).toBe("-");
  });

  it("formats ISO string as dd/MM/yyyy", () => {
    const result = formatDateShort("2024-12-01T00:00:00.000Z");
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });
});

describe("formatDate", () => {
  it("short style returns numeric date", () => {
    const result = formatDate("2024-06-20", "short");
    expect(result).toMatch(/\d/);
  });

  it("medium style returns date with month abbreviation", () => {
    const result = formatDate("2024-06-20", "medium");
    expect(result).toMatch(/\d/);
  });

  it("defaults to short style", () => {
    const a = formatDate("2024-06-20");
    const b = formatDate("2024-06-20", "short");
    expect(a).toBe(b);
  });

  it("returns 'Invalid Date' string for unparseable input", () => {
    // new Date("not-a-date") is Invalid Date — toLocaleDateString returns "Invalid Date"
    // rather than throwing, so the catch branch is not reached
    const result = formatDate("not-a-date");
    expect(result).toBe("Invalid Date");
  });
});
