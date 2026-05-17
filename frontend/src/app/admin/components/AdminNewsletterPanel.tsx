"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, Search } from "lucide-react";
import type { NewsletterSubscriber } from "@/lib/adminTypes";
import { AdminAlerts } from "./AdminAlerts";
import { AdminPagination } from "./AdminPagination";
import { adminJson, formatSubmitted } from "./adminUtils";

export function AdminNewsletterPanel() {
  const router = useRouter();
  const [rows, setRows] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      pageSize: String(pageSize),
    });
    const { data, error: err, status } = await adminJson<{ items: NewsletterSubscriber[]; total: number }>(
      `/api/admin/newsletter?${params}`,
    );
    if (status === 401) {
      router.refresh();
      return;
    }
    if (err || !data) {
      setError(err ?? "Could not load subscribers.");
      setLoading(false);
      return;
    }
    setRows(data.items);
    setTotal(data.total);
    setLoading(false);
  }, [page, pageSize, query, router]);

  useEffect(() => {
    void load();
  }, [load]);

  function exportCsv() {
    const header = "email,subscribedAt\n";
    const body = rows.map((r) => `"${r.email}","${r.subscribedAt}"`).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <AdminAlerts notice={null} error={error} />

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Search email</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Filter by email"
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
        </label>
        <button
          type="button"
          disabled={rows.length === 0}
          onClick={exportCsv}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold disabled:opacity-50 dark:border-gray-700"
        >
          <Download className="h-4 w-4" />
          Export page CSV
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          No subscribers yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-100 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Subscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      <a href={`mailto:${r.email}`} className="font-medium text-tsedey-blue hover:underline">
                        {r.email}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatSubmitted(r.subscribedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}

