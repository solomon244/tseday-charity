import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import type { VolunteerStatus } from "@/lib/volunteerTypes";

const STATUSES: VolunteerStatus[] = [
  "received",
  "under_review",
  "approved",
  "scheduled",
  "declined",
];

const volunteerApplicationSchema = new Schema(
  {
    refId: { type: String, required: true, unique: true, index: true },
    submittedAt: { type: Date, required: true, index: true },
    status: { type: String, enum: STATUSES, required: true, default: "received", index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: "" },
    skills: { type: String, required: true },
    availability: { type: String, required: true },
    motivation: { type: String, required: true },
  },
  { collection: "volunteer_applications" },
);

export type VolunteerApplicationDoc = InferSchemaType<typeof volunteerApplicationSchema>;

export const VolunteerApplicationModel =
  (mongoose.models.VolunteerApplication as Model<VolunteerApplicationDoc>) ??
  mongoose.model<VolunteerApplicationDoc>("VolunteerApplication", volunteerApplicationSchema);
