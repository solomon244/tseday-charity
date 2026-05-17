"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";
import { AdminAlerts } from "./components/AdminAlerts";
import { AdminPagination } from "./components/AdminPagination";

const STATUSES: VolunteerStatus[] = ["received", "under_review", "approved", "scheduled", "declined"];
type SortField = "submittedAt" | "name" | "status";
type SortOrder = "asc" | "desc";

type AdminVolunteersResponse = {
  applications?: VolunteerApplication[];
  items?: VolunteerApplication[];
  total?: number;
};

function formatStatus(status: VolunteerStatus): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSubmitted(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en-ET", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function AdminVolunteerTable() {
  const router = useRouter();
  const [rows, setRows] = useState<VolunteerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<VolunteerStatus | "">("");
  const [sortBy, setSortBy] = useState<SortField>("submittedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        q: query,
        status: statusFilter,
        sort: sortBy,
        order: sortOrder,
        page: String(page),
        pageSize: String(pageSize),
      });
      const res = await fetch(`/api/admin/volunteers?${params.toString()}`, {
        credentials: "include",
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        setError(payload.error ?? "Could not load applications.");
        return;
      }
      const data = (await res.json()) as AdminVolunteersResponse;
      setRows(data.items ?? data.applications ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, query, router, sortBy, sortOrder, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function patchStatus(refId: string, status: VolunteerStatus) {
    setUpdating(refId);
    try {
      const res = await fetch("/api/admin/volunteers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ refId, status }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        setError(payload.error ?? "Update failed.");
        return;
      }
      const payload = (await res.json()) as {
        emailNotification?: { sent: boolean; error?: string } | null;
      };
      let msg = `Updated ${refId} to ${formatStatus(status)}.`;
      if (status === "approved") {
        if (payload.emailNotification?.sent) {
          msg += " Approval email sent to the volunteer.";
        } else if (payload.emailNotification?.error) {
          msg += ` Status saved, but email was not sent (${payload.emailNotification.error}).`;
        }
      }
      setNotice(msg);
      await load();
    } catch {
      setError("Update failed.");
    } finally {
      setUpdating(null);
    }
  }

  function resetAndSearch(nextQuery: string, nextStatus: VolunteerStatus | "") {
    setPage(1);
    setQuery(nextQuery);
    setStatusFilter(nextStatus);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Review applications, update status, and send approval emails.
      </p>

      <AdminAlerts notice={notice} error={error} />

      <div className="grid gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2 lg:grid-cols-5">
        <label className="lg:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => resetAndSearch(e.target.value, statusFilter)}
              placeholder="Name, email, or ref ID"
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Status</span>
          <select
            value={statusFilter}
            onChange={(e) => resetAndSearch(query, e.target.value as VolunteerStatus | "")}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {formatStatus(s)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => {
              setPage(1);
              setSortBy(e.target.value as SortField);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="submittedAt">Submitted</option>
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Order</span>
          <select
            value={sortOrder}
            onChange={(e) => {
              setPage(1);
              setSortOrder(e.target.value as SortOrder);
            }}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading applications...
          </div>
          <div className="space-y-2">
            <div className="h-10 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-10 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-10 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <p className="text-base font-semibold text-gray-800 dark:text-gray-100">No applications match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setStatusFilter("");
              setPage(1);
            }}
            className="mt-4 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold dark:border-gray-700"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-100 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Ref</th>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Submitted</th>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Availability</th>
                  <th className="px-4 py-3 text-left font-semibold text-tsedey-navy dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((r) => (
                  <tr key={r.refId}>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-tsedey-blue">
                      {r.refId}
                    </td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-100">
                      <p className="font-semibold">{r.name}</p>
                      <p className="mt-1 max-w-xs truncate text-xs text-gray-500 dark:text-gray-400">{r.skills}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      <p>{r.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{r.phone}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatSubmitted(r.submittedAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.availability}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          disabled={updating === r.refId}
                          onChange={(e) => void patchStatus(r.refId, e.target.value as VolunteerStatus)}
                          className="w-full min-w-[10rem] rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium dark:border-gray-700 dark:bg-gray-950"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {formatStatus(s)}
                            </option>
                          ))}
                        </select>
                        {updating === r.refId ? <Loader2 className="h-4 w-4 animate-spin text-gray-500" /> : null}
                      </div>
                    </td>
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
