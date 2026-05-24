"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ExternalLink,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Newspaper,
  RefreshCw,
  Users,
  X,
} from "lucide-react";
import type { AdminTab } from "@/lib/adminTypes";
import { cn } from "@/lib/cn";
import { ADMIN_TAB_META } from "./adminTheme";
import { AdminThemePicker } from "./AdminThemePicker";

const TABS: { id: AdminTab; icon: typeof Users }[] = [
  { id: "overview", icon: LayoutDashboard },
  { id: "volunteers", icon: Users },
  { id: "contacts", icon: MessageSquare },
  { id: "donations", icon: Heart },
  { id: "newsletter", icon: Mail },
  { id: "news", icon: Newspaper },
  { id: "stories", icon: BookOpen },
];

type AdminShellProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onRefresh?: () => void;
  refreshing?: boolean;
  children: ReactNode;
};

function SidebarNav({
  activeTab,
  onTabChange,
  onNavigate,
}: {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin sections">
      {TABS.map(({ id, icon: Icon }) => {
        const meta = ADMIN_TAB_META[id];
        const active = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              onTabChange(id);
              onNavigate?.();
            }}
            className={cn(
              "group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
              active
                ? "bg-white/15 text-white shadow-sm ring-1 ring-white/20"
                : "text-white/75 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                active ? "text-[var(--admin-accent-soft)]" : "text-white/60 group-hover:text-white/90",
              )}
            />
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight">{meta?.label ?? id}</span>
              <span
                className={cn(
                  "mt-0.5 block text-xs leading-snug",
                  active ? "text-white/80" : "text-white/50 group-hover:text-white/70",
                )}
              >
                {meta?.description}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  activeTab,
  onTabChange,
  onRefresh,
  refreshing,
  children,
}: AdminShellProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeMeta = ADMIN_TAB_META[activeTab];

  useEffect(() => {
    setMobileOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.refresh();
  }

  function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <Link href="/" className="flex items-center gap-3 text-white" onClick={onNavigate}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold ring-1 ring-white/20">
              T
            </span>
            <span>
              <span className="block font-heading text-sm font-bold leading-tight">Tseday Charity</span>
              <span className="text-xs text-white/60">Staff dashboard</span>
            </span>
          </Link>
          {onNavigate ? (
            <button
              type="button"
              onClick={onNavigate}
              className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
        <SidebarNav activeTab={activeTab} onTabChange={onTabChange} onNavigate={onNavigate} />
        <div className="mt-auto border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            onClick={onNavigate}
          >
            <ExternalLink className="h-4 w-4" />
            View public site
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Desktop sidebar */}
      <aside
        className="admin-sidebar hidden w-72 shrink-0 flex-col overflow-hidden rounded-2xl shadow-lg lg:flex"
        aria-label="Admin navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "admin-sidebar fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col shadow-2xl transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!mobileOpen}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="min-w-0 flex-1 space-y-4">
        <header className="admin-surface flex flex-col gap-4 rounded-2xl border p-4 shadow-soft sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="admin-toolbar-btn inline-flex h-10 w-10 items-center justify-center lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--admin-accent)]">
                  Admin
                </p>
                <h1 className="truncate font-heading text-xl font-bold text-tsedey-navy dark:text-white sm:text-2xl">
                  {activeMeta?.label ?? "Dashboard"}
                </h1>
                <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                  {activeMeta?.description ?? "Manage site content and submissions"}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <AdminThemePicker />
              {onRefresh ? (
                <button
                  type="button"
                  onClick={onRefresh}
                  className="admin-toolbar-btn inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold"
                >
                  <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void logout()}
                className="admin-toolbar-btn inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-700 hover:border-red-200 hover:bg-red-50 dark:text-red-300 dark:hover:border-red-900 dark:hover:bg-red-950/40"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </div>

          <nav
            className="flex gap-1 overflow-x-auto pb-1 lg:hidden"
            aria-label="Admin sections (mobile)"
          >
            {TABS.map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  activeTab === id
                    ? "bg-[var(--admin-accent)] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {ADMIN_TAB_META[id]?.label ?? id}
              </button>
            ))}
          </nav>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
