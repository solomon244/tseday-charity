"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck, Loader2 } from "lucide-react";

type ApiOk = {
  refId: string;
  status: string;
  submittedAt: string;
  timelineNote?: string;
};

const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  under_review: "Under review",
  approved: "Approved",
  scheduled: "Interview / onboarding scheduled",
  declined: "Not moving forward at this time",
};

export function VolunteerStatusLookup() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref")?.trim() ?? "";
  const [refInput, setRefInput] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiOk | null>(null);

  const lookup = useCallback(async (ref: string) => {
    const id = ref.trim();
    if (!id) {
      setError("Enter your reference ID.");
      setResult(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/volunteer?ref=${encodeURIComponent(id)}`);
      const data = (await res.json()) as ApiOk & { error?: string };
      if (!res.ok) {
        setResult(null);
        setError(data.error === "Not found" ? "No application matches that reference ID." : "Could not load status.");
        return;
      }
      setResult({
        refId: data.refId,
        status: data.status,
        submittedAt: data.submittedAt,
        timelineNote: data.timelineNote,
      });
    } catch {
      setResult(null);
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialRef) void lookup(initialRef);
  }, [initialRef, lookup]);

  return (
    <main className="min-h-screen bg-tsedey-light pb-16 pt-24 dark:bg-gray-950">
      <section className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-tsedey-blue shadow-sm dark:bg-gray-900">
          <ClipboardCheck className="h-3.5 w-3.5" />
          Volunteers
        </div>
        <h1 className="text-3xl font-heading font-bold text-tsedey-navy dark:text-white">Application status</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enter the reference ID emailed to you after submitting the volunteer form (for example{" "}
          <span className="font-mono text-tsedey-navy dark:text-white">VOL-AB12CD34</span>).
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void lookup(refInput);
          }}
        >
          <div>
            <label htmlFor="ref" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Reference ID
            </label>
            <input
              id="ref"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-900 shadow-sm focus:border-tsedey-blue focus:outline-none focus:ring-2 focus:ring-tsedey-blue/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="VOL-XXXXXXXX"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-tsedey-navy px-5 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Check status
          </button>
        </form>

        {error ? (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </p>
        ) : null}

        {result ? (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-soft dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Reference</p>
            <p className="font-mono text-lg font-bold text-tsedey-navy dark:text-white">{result.refId}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</p>
            <p className="text-lg font-semibold text-tsedey-blue">
              {STATUS_LABEL[result.status] ?? result.status.replace(/_/g, " ")}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Submitted
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {new Date(result.submittedAt).toLocaleString()}
            </p>
            {result.timelineNote ? (
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{result.timelineNote}</p>
            ) : null}
          </div>
        ) : null}

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Want to apply?{" "}
          <Link href="/#get-involved" className="font-semibold text-tsedey-blue hover:underline">
            Open the volunteer form
          </Link>{" "}
          from the homepage.
        </p>
      </section>
    </main>
  );
}
