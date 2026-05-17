"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Users,
} from "lucide-react";
import type { AdminTab } from "@/lib/adminTypes";

const TABS: { id: AdminTab; label: string; icon: typeof Users }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "volunteers", label: "Volunteers", icon: Users },
  { id: "contacts", label: "Contact", icon: MessageSquare },
  { id: "donations", label: "Donations", icon: Heart },
  { id: "newsletter", label: "Newsletter", icon: Mail },
];

type AdminShellProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  children: ReactNode;
};

export function AdminShell({
  activeTab,
  onTabChange,
  onRefresh,
  refreshing,
  children,
}: AdminShellProps) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.refresh();
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white">
            Admin dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Manage volunteers, inquiries, donations, and newsletter subscribers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onRefresh ? (
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>

      <nav
        className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-soft dark:border-gray-800 dark:bg-gray-900"
        aria-label="Admin sections"
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === id
                ? "bg-tsedey-navy text-white dark:bg-tsedey-blue"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      {children}
    </div>
  );
}

