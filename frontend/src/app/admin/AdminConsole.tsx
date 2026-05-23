"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAdminTab, type AdminTab } from "@/lib/adminTypes";
import { AdminShell } from "./components/AdminShell";
import { AdminOverview } from "./components/AdminOverview";
import { AdminContactsPanel } from "./components/AdminContactsPanel";
import { AdminDonationsPanel } from "./components/AdminDonationsPanel";
import { AdminNewsletterPanel } from "./components/AdminNewsletterPanel";
import { AdminNewsPanel } from "./components/AdminNewsPanel";
import { AdminImpactStoriesPanel } from "./components/AdminImpactStoriesPanel";
import { AdminVolunteerTable } from "./AdminVolunteerTable";

export function AdminConsole() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<AdminTab>(
    isAdminTab(tabFromUrl) ? tabFromUrl : "overview",
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isAdminTab(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl, activeTab]);

  const navigateTab = useCallback(
    (tab: AdminTab) => {
      setActiveTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tab);
      router.replace(`/admin?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    setTimeout(() => setRefreshing(false), 400);
  }, []);

  return (
    <AdminShell
      activeTab={activeTab}
      onTabChange={navigateTab}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    >
      {activeTab === "overview" ? (
        <AdminOverview key={`overview-${refreshKey}`} onNavigate={navigateTab} />
      ) : null}
      {activeTab === "volunteers" ? <AdminVolunteerTable key={`volunteers-${refreshKey}`} /> : null}
      {activeTab === "contacts" ? <AdminContactsPanel key={`contacts-${refreshKey}`} /> : null}
      {activeTab === "donations" ? <AdminDonationsPanel key={`donations-${refreshKey}`} /> : null}
      {activeTab === "newsletter" ? <AdminNewsletterPanel key={`newsletter-${refreshKey}`} /> : null}
      {activeTab === "news" ? <AdminNewsPanel key={`news-${refreshKey}`} /> : null}
      {activeTab === "stories" ? <AdminImpactStoriesPanel key={`stories-${refreshKey}`} /> : null}
    </AdminShell>
  );
}
