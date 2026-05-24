import type { Metadata } from "next";
import { Suspense } from "react";
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
  return (
    <Suspense
      fallback={
        <div className="admin-surface flex items-center justify-center gap-3 rounded-2xl border py-16 shadow-soft">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--admin-accent)] border-t-transparent" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Loading dashboard…</span>
        </div>
      }
    >
      <AdminConsole />
    </Suspense>
  );
}

