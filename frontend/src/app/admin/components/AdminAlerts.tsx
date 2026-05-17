import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AdminAlerts({ notice, error }: { notice: string | null; error: string | null }) {
  return (
    <>
      {notice ? (
        <p className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {notice}
        </p>
      ) : null}
      {error ? (
        <p className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </>
  );
}

