import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const donationSchema = new Schema(
  {
    refId: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "ETB" },
    frequency: { type: String, enum: ["one-time", "monthly"], required: true },
    cause: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["recorded", "completed", "failed"], default: "recorded" },
    submittedAt: { type: Date, required: true, default: Date.now, index: true },
  },
  { collection: "donations" },
);

export type DonationDoc = InferSchemaType<typeof donationSchema>;

export const DonationModel =
  (mongoose.models.Donation as Model<DonationDoc>) ??
  mongoose.model<DonationDoc>("Donation", donationSchema);
