import type { VolunteerStatus } from "@/lib/volunteerTypes";

export type AdminTab = "overview" | "volunteers" | "contacts" | "donations" | "newsletter";

export type ContactStatus = "new" | "read" | "archived";
export type DonationStatus = "recorded" | "completed" | "failed";

export interface AdminStats {
  volunteers: { total: number; byStatus: Record<string, number> };
  contacts: { total: number; new: number };
  donations: { total: number; recorded: number; completed: number; amountTotal: number };
  newsletter: { total: number };
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

export { type VolunteerStatus };
