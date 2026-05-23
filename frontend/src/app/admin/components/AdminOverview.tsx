"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Heart,
  Loader2,
  Mail,
  MessageSquare,
  Newspaper,
  BookOpen,
  Users,
} from "lucide-react";
import type { AdminRecentActivity, AdminStats, AdminTab } from "@/lib/adminTypes";
import { adminJson, formatCurrency, formatLabel, formatSubmitted } from "./adminUtils";

type AdminOverviewProps = {
  onNavigate: (tab: AdminTab) => void;
};

export function AdminOverview({ onNavigate }: AdminOverviewProps) {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recent, setRecent] = useState<AdminRecentActivity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const [statsRes, recentRes] = await Promise.all([
      adminJson<AdminStats>("/api/admin/stats"),
      adminJson<AdminRecentActivity>("/api/admin/recent"),
    ]);
    if (statsRes.status === 401 || recentRes.status === 401) {
      router.refresh();
      return;
    }
    if (statsRes.err || !statsRes.data) {
      setError(statsRes.err ?? "Could not load overview.");
      setStats(null);
    } else {
      setStats(statsRes.data);
    }
    if (recentRes.data) setRecent(recentRes.data);
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

  const alerts = [
    stats.contacts.new > 0
      ? { label: `${stats.contacts.new} new contact message${stats.contacts.new === 1 ? "" : "s"}`, tab: "contacts" as const }
      : null,
    pendingVolunteers > 0
      ? { label: `${pendingVolunteers} volunteer application${pendingVolunteers === 1 ? "" : "s"} need review`, tab: "volunteers" as const }
      : null,
    stats.donations.recorded > 0
      ? { label: `${stats.donations.recorded} donation pledge${stats.donations.recorded === 1 ? "" : "s"} pending`, tab: "donations" as const }
      : null,
    (stats.news?.total ?? 0) - (stats.news?.published ?? 0) > 0
      ? {
          label: `${(stats.news?.total ?? 0) - (stats.news?.published ?? 0)} news draft${(stats.news?.total ?? 0) - (stats.news?.published ?? 0) === 1 ? "" : "s"}`,
          tab: "news" as const,
        }
      : null,
    (stats.impactStories?.total ?? 0) - (stats.impactStories?.published ?? 0) > 0
      ? {
          label: `${(stats.impactStories?.total ?? 0) - (stats.impactStories?.published ?? 0)} impact story draft${(stats.impactStories?.total ?? 0) - (stats.impactStories?.published ?? 0) === 1 ? "" : "s"}`,
          tab: "stories" as const,
        }
      : null,
  ].filter(Boolean) as { label: string; tab: AdminTab }[];

  const cards: { label: string; value: number; sub: string; icon: typeof Users; accent: string; tab: AdminTab }[] = [
    {
      label: "Volunteer applications",
      value: stats.volunteers.total,
      sub: `${pendingVolunteers} pending review`,
      icon: Users,
      accent: "text-tsedey-blue",
      tab: "volunteers",
    },
    {
      label: "Contact messages",
      value: stats.contacts.total,
      sub: `${stats.contacts.new} new`,
      icon: MessageSquare,
      accent: "text-tsedey-orange",
      tab: "contacts",
    },
    {
      label: "Donation pledges",
      value: stats.donations.total,
      sub: `${formatCurrency(stats.donations.amountTotal)} total · ${stats.donations.recorded} pending`,
      icon: Heart,
      accent: "text-tsedey-red",
      tab: "donations",
    },
    {
      label: "Newsletter subscribers",
      value: stats.newsletter.total,
      sub: "Active subscriptions",
      icon: Mail,
      accent: "text-tsedey-cyan",
      tab: "newsletter",
    },
    {
      label: "News & Updates",
      value: stats.news?.total ?? 0,
      sub: `${stats.news?.published ?? 0} published`,
      icon: Newspaper,
      accent: "text-tsedey-yellow",
      tab: "news",
    },
    {
      label: "Impact Stories",
      value: stats.impactStories?.total ?? 0,
      sub: `${stats.impactStories?.published ?? 0} published`,
      icon: BookOpen,
      accent: "text-tsedey-orange",
      tab: "stories",
    },
  ];

  return (
    <div className="space-y-6">
      {alerts.length > 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
          <div className="mb-3 flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <h2 className="text-sm font-semibold uppercase tracking-wide">Needs attention</h2>
          </div>
          <ul className="space-y-2">
            {alerts.map((a) => (
              <li key={a.label}>
                <button
                  type="button"
                  onClick={() => onNavigate(a.tab)}
                  className="flex w-full items-center justify-between rounded-xl bg-white/80 px-4 py-2.5 text-left text-sm font-medium text-amber-950 transition hover:bg-white dark:bg-gray-900/60 dark:text-amber-50 dark:hover:bg-gray-900"
                >
                  {a.label}
                  <ArrowRight className="h-4 w-4 shrink-0 opacity-70" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => onNavigate(c.tab)}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-tsedey-cyan/40 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{c.label}</p>
                <p className="mt-2 text-3xl font-heading font-bold text-tsedey-navy dark:text-white">{c.value}</p>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{c.sub}</p>
              </div>
              <c.icon className={`h-8 w-8 shrink-0 opacity-80 ${c.accent}`} />
            </div>
          </button>
        ))}
      </div>

      {recent &&
      (recent.contacts.length > 0 || recent.donations.length > 0 || recent.volunteers.length > 0) ? (
        <div className="grid gap-4 lg:grid-cols-3">
          {recent.contacts.length > 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">New messages</h2>
                <button
                  type="button"
                  onClick={() => onNavigate("contacts")}
                  className="text-xs font-semibold text-tsedey-blue hover:underline dark:text-tsedey-cyan"
                >
                  View all
                </button>
              </div>
              <ul className="space-y-2">
                {recent.contacts.map((m) => (
                  <li key={m.id} className="rounded-xl bg-gray-50 px-3 py-2 text-sm dark:bg-gray-950/50">
                    <p className="font-medium text-tsedey-navy dark:text-white">{m.subject}</p>
                    <p className="text-xs text-gray-500">
                      {m.name} · {formatSubmitted(m.submittedAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {recent.volunteers.length > 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Latest volunteers</h2>
                <button
                  type="button"
                  onClick={() => onNavigate("volunteers")}
                  className="text-xs font-semibold text-tsedey-blue hover:underline dark:text-tsedey-cyan"
                >
                  View all
                </button>
              </div>
              <ul className="space-y-2">
                {recent.volunteers.map((v) => (
                  <li key={v.refId} className="rounded-xl bg-gray-50 px-3 py-2 text-sm dark:bg-gray-950/50">
                    <p className="font-medium text-tsedey-navy dark:text-white">{v.name}</p>
                    <p className="text-xs text-gray-500">
                      {v.refId} · {formatLabel(v.status)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {recent.donations.length > 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Latest donations</h2>
                <button
                  type="button"
                  onClick={() => onNavigate("donations")}
                  className="text-xs font-semibold text-tsedey-blue hover:underline dark:text-tsedey-cyan"
                >
                  View all
                </button>
              </div>
              <ul className="space-y-2">
                {recent.donations.map((d) => (
                  <li key={d.refId} className="rounded-xl bg-gray-50 px-3 py-2 text-sm dark:bg-gray-950/50">
                    <p className="font-medium text-tsedey-navy dark:text-white">
                      {formatCurrency(d.amount, d.currency)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {d.refId} · {formatLabel(d.status)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

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
