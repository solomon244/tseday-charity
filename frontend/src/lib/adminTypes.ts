import type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";

export type AdminTab =
  | "overview"
  | "volunteers"
  | "contacts"
  | "donations"
  | "newsletter"
  | "news"
  | "stories";

export const ADMIN_TABS: AdminTab[] = [
  "overview",
  "volunteers",
  "contacts",
  "donations",
  "newsletter",
  "news",
  "stories",
];

export function isAdminTab(value: string | null | undefined): value is AdminTab {
  return Boolean(value && ADMIN_TABS.includes(value as AdminTab));
}

export type ContactStatus = "new" | "read" | "archived";
export type DonationStatus = "recorded" | "completed" | "failed";

export interface AdminStats {
  volunteers: { total: number; byStatus: Record<string, number> };
  contacts: { total: number; new: number };
  donations: { total: number; recorded: number; completed: number; amountTotal: number };
  newsletter: { total: number };
  news: { total: number; published: number };
  impactStories: { total: number; published: number };
}

export interface ImpactStoryRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  beneficiary: string;
  location: string;
  program: string;
  image: string;
  outcome: string[];
  published: boolean;
  updatedAt: string;
}

export interface NewsArticleRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  imageEmoji: string;
  body: string[];
  published: boolean;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  status: ContactStatus;
  submittedAt: string;
}

export interface DonationRecord {
  refId: string;
  amount: number;
  currency: string;
  frequency: "one-time" | "monthly";
  cause: string;
  paymentMethod: string;
  status: DonationStatus;
  submittedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface AdminRecentActivity {
  contacts: ContactMessage[];
  donations: DonationRecord[];
  volunteers: VolunteerApplication[];
  news: NewsArticleRecord[];
}

export { type VolunteerStatus };
