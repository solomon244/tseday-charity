"use client";

import { useEffect, useState } from "react";
import { FeedbackMessageCard } from "@/components/shared/FeedbackMessageCard";

export function AdminAlerts({ notice, error }: { notice: string | null; error: string | null }) {
  const [visibleNotice, setVisibleNotice] = useState(notice);
  const [visibleError, setVisibleError] = useState(error);

  useEffect(() => {
    setVisibleNotice(notice);
  }, [notice]);

  useEffect(() => {
    setVisibleError(error);
  }, [error]);

  useEffect(() => {
    if (!visibleNotice) return;
    const id = window.setTimeout(() => setVisibleNotice(null), 6000);
    return () => window.clearTimeout(id);
  }, [visibleNotice]);

  return (
    <div className="space-y-3">
      {visibleNotice ? (
        <FeedbackMessageCard
          variant="success"
          title="Success"
          description={visibleNotice}
          compact
        />
      ) : null}
      {visibleError ? (
        <FeedbackMessageCard variant="error" title="Something went wrong" description={visibleError} compact />
      ) : null}
    </div>
  );
}
