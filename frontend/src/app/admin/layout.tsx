import type { ReactNode } from "react";
import { AdminPreferencesProvider } from "./components/AdminPreferencesProvider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminPreferencesProvider>
      <div className="min-h-screen bg-[var(--admin-page-bg)] pt-20 transition-colors duration-200 sm:pt-24">
        <div className="mx-auto w-full max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-8">{children}</div>
      </div>
    </AdminPreferencesProvider>
  );
}
