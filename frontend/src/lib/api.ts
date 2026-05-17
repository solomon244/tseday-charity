/**
 * API base URL. Leave empty in development — Next.js rewrites /api/* to the backend.
 * In production (split deploy), set NEXT_PUBLIC_API_URL to your API origin.
 */
export function apiUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withApi = normalized.startsWith("/api") ? normalized : `/api${normalized}`;
  return `${base}${withApi}`;
}

/** Use on admin routes so session cookies are sent when calling the API directly. */
export const adminFetchInit: RequestInit = {
  credentials: "include",
};
