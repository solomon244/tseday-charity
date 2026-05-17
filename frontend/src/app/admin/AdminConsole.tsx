"use client";

import { useCallback, useState } from "react";
import type { AdminTab } from "@/lib/adminTypes";
import { AdminShell } from "./components/AdminShell";
import { AdminOverview } from "./components/AdminOverview";
import { AdminContactsPanel } from "./components/AdminContactsPanel";
import { AdminDonationsPanel } from "./components/AdminDonationsPanel";
import { AdminNewsletterPanel } from "./components/AdminNewsletterPanel";
import { AdminVolunteerTable } from "./AdminVolunteerTable";

export function AdminConsole() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setRefreshing(false), 400);
  }, []);

  return (
    <AdminShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    >
      {activeTab === "overview" ? <AdminOverview key={`overview-${refreshKey}`} /> : null}
      {activeTab === "volunteers" ? <AdminVolunteerTable key={`volunteers-${refreshKey}`} /> : null}
      {activeTab === "contacts" ? <AdminContactsPanel key={`contacts-${refreshKey}`} /> : null}
      {activeTab === "donations" ? <AdminDonationsPanel key={`donations-${refreshKey}`} /> : null}
      {activeTab === "newsletter" ? <AdminNewsletterPanel key={`newsletter-${refreshKey}`} /> : null}
    </AdminShell>
  );
}
