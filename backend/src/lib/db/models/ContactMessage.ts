import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true, default: "general" },
    status: {
      type: String,
      enum: ["new", "read", "archived"],
      default: "new",
      index: true,
    },
    submittedAt: { type: Date, required: true, default: Date.now, index: true },
  },
  { collection: "contact_messages" },
);

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema>;

export const ContactMessageModel =
  (mongoose.models.ContactMessage as Model<ContactMessageDoc>) ??
  mongoose.model<ContactMessageDoc>("ContactMessage", contactMessageSchema);
