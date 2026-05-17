"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Loader2, Mail, MessageSquare, Users } from "lucide-react";
import type { AdminStats } from "@/lib/adminTypes";
import { adminJson, formatCurrency, formatLabel } from "./adminUtils";

export function AdminOverview() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err, status } = await adminJson<AdminStats>("/api/admin/stats");
    if (status === 401) {
      router.refresh();
      return;
    }
    if (err || !data) {
      setError(err ?? "Could not load overview.");
      setStats(null);
    } else {
      setStats(data);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-8 text-gray-600 shadow-soft dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading overview...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        {error ?? "Overview unavailable."}
      </div>
    );
  }

  const pendingVolunteers =
    (stats.volunteers.byStatus.received ?? 0) + (stats.volunteers.byStatus.under_review ?? 0);

  const cards = [
    {
      label: "Volunteer applications",
      value: stats.volunteers.total,
      sub: `${pendingVolunteers} pending review`,
      icon: Users,
      accent: "text-tsedey-blue",
    },
    {
      label: "Contact messages",
      value: stats.contacts.total,
      sub: `${stats.contacts.new} new`,
      icon: MessageSquare,
      accent: "text-tsedey-orange",
    },
    {
      label: "Donation pledges",
      value: stats.donations.total,
      sub: `${formatCurrency(stats.donations.amountTotal)} total · ${stats.donations.recorded} pending`,
      icon: Heart,
      accent: "text-tsedey-red",
    },
    {
      label: "Newsletter subscribers",
      value: stats.newsletter.total,
      sub: "Active subscriptions",
      icon: Mail,
      accent: "text-tsedey-cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.label}</p>
                <p className="mt-2 text-3xl font-heading font-bold text-tsedey-navy dark:text-white">{c.value}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{c.sub}</p>
              </div>
              <c.icon className={`h-8 w-8 shrink-0 opacity-80 ${c.accent}`} />
            </div>
          </div>
        ))}
      </div>

      {stats.volunteers.total > 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Volunteers by status</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(stats.volunteers.byStatus).map(([status, count]) => (
              <li
                key={status}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2 text-sm dark:bg-gray-950/50"
              >
                <span className="text-gray-700 dark:text-gray-200">{formatLabel(status)}</span>
                <span className="font-semibold text-tsedey-navy dark:text-white">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

