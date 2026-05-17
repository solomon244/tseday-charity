export type SortOrder = "asc" | "desc";

export function parsePositiveInt(value: unknown, fallback: number): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) return fallback;
  return n;
}

export function parseListQuery(query: Record<string, unknown>) {
  const q = String(query.q ?? "").trim();
  const sortBy = String(query.sort ?? "submittedAt").trim();
  const orderRaw = String(query.order ?? "desc").trim();
  const order: SortOrder = orderRaw === "asc" ? "asc" : "desc";
  const page = parsePositiveInt(query.page, 1);
  const pageSize = Math.min(parsePositiveInt(query.pageSize, 10), 100);
  const skip = (page - 1) * pageSize;

  return { q, sortBy, order, page, pageSize, skip };
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
