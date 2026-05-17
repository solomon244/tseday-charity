export type VolunteerStatus =
  | "received"
  | "under_review"
  | "approved"
  | "scheduled"
  | "declined";

export interface VolunteerApplication {
  refId: string;
  submittedAt: string;
  status: VolunteerStatus;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  motivation: string;
}
