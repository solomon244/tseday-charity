export function formatLabel(value: string): string {
  return value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatSubmitted(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function formatCurrency(amount: number, currency = "ETB"): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function adminJson<T>(url: string, init?: RequestInit): Promise<{ data?: T; error?: string; status: number }> {
  const res = await fetch(url, { credentials: "include", ...init });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string };
  if (!res.ok) {
    return { error: (data as { error?: string }).error ?? "Request failed", status: res.status };
  }
  return { data, status: res.status };
}
