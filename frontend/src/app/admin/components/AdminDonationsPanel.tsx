"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import type { DonationRecord, DonationStatus } from "@/lib/adminTypes";
import { AdminAlerts } from "./AdminAlerts";
import { AdminPagination } from "./AdminPagination";
import { adminJson, formatCurrency, formatLabel, formatSubmitted } from "./adminUtils";

const STATUSES: DonationStatus[] = ["recorded", "completed", "failed"];

export function AdminDonationsPanel() {
  const router = useRouter();
  const [rows, setRows] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DonationStatus | "">("");
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
    const { data, error: err, status } = await adminJson<{ items: DonationRecord[]; total: number }>(
      `/api/admin/donations?${params}`,
    );
    if (status === 401) {
      router.refresh();
      return;
    }
    if (err || !data) {
      setError(err ?? "Could not load donations.");
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

  async function patchStatus(refId: string, status: DonationStatus) {
    setUpdating(refId);
    const { error: err, status: http } = await adminJson("/api/admin/donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refId, status }),
    });
    if (http === 401) router.refresh();
    else if (err) setError(err);
    else {
      setNotice(`Donation ${refId} marked as ${formatLabel(status)}.`);
      await load();
    }
    setUpdating(null);
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
              placeholder="Ref ID, cause, or payment method"
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
              setStatusFilter(e.target.value as DonationStatus | "");
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
      </div>

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          No donations recorded yet.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-100 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Ref</th>
                  <th className="px-4 py-3 text-left font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Cause</th>
                  <th className="px-4 py-3 text-left font-semibold">Payment</th>
                  <th className="px-4 py-3 text-left font-semibold">Submitted</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((r) => (
                  <tr key={r.refId}>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-tsedey-blue">
                      {r.refId}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-100">
                      {formatCurrency(r.amount, r.currency)}
                      <span className="ml-1 text-xs font-normal text-gray-500">({r.frequency})</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.cause}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatLabel(r.paymentMethod)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{formatSubmitted(r.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={r.status}
                          disabled={updating === r.refId}
                          onChange={(e) => void patchStatus(r.refId, e.target.value as DonationStatus)}
                          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {formatLabel(s)}
                            </option>
                          ))}
                        </select>
                        {updating === r.refId ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
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

