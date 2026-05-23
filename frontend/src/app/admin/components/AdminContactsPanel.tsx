"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, Search } from "lucide-react";
import type { ContactMessage, ContactStatus } from "@/lib/adminTypes";
import { AdminAlerts } from "./AdminAlerts";
import { AdminPagination } from "./AdminPagination";
import { adminJson, formatLabel, formatSubmitted } from "./adminUtils";

const STATUSES: ContactStatus[] = ["new", "read", "archived"];

export function AdminContactsPanel() {
  const router = useRouter();
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "">("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      q: query,
      status: statusFilter,
      page: String(page),
      pageSize: String(pageSize),
    });
    const { data, error: err, status } = await adminJson<{ items: ContactMessage[]; total: number }>(
      `/api/admin/contacts?${params}`,
    );
    if (status === 401) {
      router.refresh();
      setLoading(false);
      return;
    }
    if (err || !data) {
      setError(err ?? "Could not load messages.");
      setLoading(false);
      return;
    }
    setRows(data.items);
    setTotal(data.total);
    setLoading(false);
  }, [page, pageSize, query, router, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function patchStatus(id: string, status: ContactStatus) {
    setUpdating(id);
    const { error: err, status: http } = await adminJson("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (http === 401) router.refresh();
    else if (err) setError(err);
    else {
      setNotice("Message status updated.");
      await load();
    }
    setUpdating(null);
  }

  function exportCsv() {
    const header = "name,email,subject,type,status,submittedAt,message\n";
    const body = rows
      .map((r) =>
        [
          `"${r.name.replace(/"/g, '""')}"`,
          `"${r.email}"`,
          `"${r.subject.replace(/"/g, '""')}"`,
          `"${r.type}"`,
          `"${r.status}"`,
          `"${r.submittedAt}"`,
          `"${r.message.replace(/"/g, '""')}"`,
        ].join(","),
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-messages-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      <AdminAlerts notice={notice} error={error} />

      <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Name, email, or subject"
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value as ContactStatus | "");
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">All</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatLabel(s)}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end md:col-span-2 md:justify-end">
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
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          No contact messages found.
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {rows.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="text-left"
                    >
                      <p className="font-semibold text-tsedey-navy dark:text-white">{r.subject}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {r.name} · <a href={`mailto:${r.email}`} className="text-tsedey-blue hover:underline">{r.email}</a>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatLabel(r.type)} · {formatSubmitted(r.submittedAt)}
                      </p>
                    </button>
                    {expanded === r.id ? (
                      <p className="mt-3 whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-950 dark:text-gray-200">
                        {r.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2 sm:shrink-0">
                    <select
                      value={r.status}
                      disabled={updating === r.id}
                      onChange={(e) => void patchStatus(r.id, e.target.value as ContactStatus)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium dark:border-gray-700 dark:bg-gray-950"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {formatLabel(s)}
                        </option>
                      ))}
                    </select>
                    {updating === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  </div>
                </div>
              </article>
            ))}
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

