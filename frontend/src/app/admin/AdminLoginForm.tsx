"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tsedey-navy/10 text-tsedey-navy dark:bg-tsedey-blue/20 dark:text-tsedey-cyan">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-tsedey-navy dark:text-white">Staff login</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tseday Charity staff dashboard</p>
          </div>
        </div>

        <form
          className="space-y-4"
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
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-tsedey-blue focus:outline-none focus:ring-2 focus:ring-tsedey-blue/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              required
            />
          </div>
          {process.env.NODE_ENV !== "production" ? (
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Development: set <code className="font-mono">ADMIN_PASSWORD</code> in <code className="font-mono">.env.local</code>
              , or use default password <span className="font-mono">admin</span> when unset.
            </p>
          ) : null}
          {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-tsedey-navy px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

