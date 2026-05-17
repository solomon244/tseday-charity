import type { Metadata } from "next";
import { cookies } from "next/headers";
import { verifyAdminSessionToken } from "@/lib/adminAuth";
import { AdminLoginForm } from "./AdminLoginForm";
import { AdminConsole } from "./AdminConsole";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const token = cookies().get("admin_session")?.value;
  const ok = verifyAdminSessionToken(token);
  if (!ok) return <AdminLoginForm />;
  return <AdminConsole />;
}

