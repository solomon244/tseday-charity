export type AdminAccent = "brand" | "ocean" | "slate";

export const ADMIN_ACCENT_STORAGE_KEY = "tseday-admin-accent";

export const ADMIN_ACCENTS: {
  id: AdminAccent;
  label: string;
  swatch: string;
  description: string;
}[] = [
  { id: "brand", label: "Tsedey", swatch: "#1e56a0", description: "Official brand colors" },
  { id: "ocean", label: "Ocean", swatch: "#0d9488", description: "Calm teal accents" },
  { id: "slate", label: "Slate", swatch: "#475569", description: "Neutral professional" },
];

export const ADMIN_TAB_META: Record<
  string,
  { label: string; description: string }
> = {
  overview: { label: "Overview", description: "Dashboard summary and alerts" },
  volunteers: { label: "Volunteers", description: "Applications and status" },
  contacts: { label: "Contact", description: "Inquiries and messages" },
  donations: { label: "Donations", description: "Pledges and amounts" },
  newsletter: { label: "Newsletter", description: "Subscriber list" },
  news: { label: "News & Updates", description: "Articles and drafts" },
  stories: { label: "Impact Stories", description: "Published stories" },
};
