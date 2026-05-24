"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock, Shield } from "lucide-react";
import { AdminThemePicker } from "./components/AdminThemePicker";
import { AdminCard } from "./components/AdminCard";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center py-10">
      <div className="mb-6 flex w-full max-w-md justify-end">
        <AdminThemePicker compact />
      </div>

      <AdminCard className="w-full max-w-md" padding="lg">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--admin-sidebar-from)] to-[var(--admin-sidebar-to)] text-white shadow-md">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-tsedey-navy dark:text-white">Staff login</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sign in to manage volunteers, donations, and site content.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            try {
              const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ password }),
              });
              if (!res.ok) {
                const data = (await res.json()) as { error?: string };
                setError(data.error ?? "Sign in failed");
                return;
              }
              setPassword("");
              router.refresh();
            } catch {
              setError("Network error");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent)]/25 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              required
            />
          </div>
          {process.env.NODE_ENV !== "production" ? (
            <p className="rounded-xl border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
              Development: set <code className="font-mono">ADMIN_PASSWORD</code> in{" "}
              <code className="font-mono">.env.local</code>, or use default{" "}
              <span className="font-mono">admin</span> when unset.
            </p>
          ) : null}
          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--admin-accent)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
            Sign in
          </button>
        </form>
      </AdminCard>
    </main>
  );
}
