import { createHmac, timingSafeEqual } from "crypto";

function adminSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "tsedey-admin-dev-only";
}

export function createAdminSessionToken(): string {
  return createHmac("sha256", adminSecret()).update("tsedey-admin-session-v1").digest("hex");
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = createAdminSessionToken();
  const a = Buffer.from(token, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === "production" && !expected) {
    return false;
  }
  if (!expected) {
    return password === "admin";
  }
  const received = Buffer.from(password, "utf8");
  const target = Buffer.from(expected, "utf8");
  if (received.length !== target.length) return false;
  try {
    return timingSafeEqual(received, target);
  } catch {
    return false;
  }
}
