import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const newsletterSubscriptionSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    subscribedAt: { type: Date, required: true, default: Date.now },
  },
  { collection: "newsletter_subscriptions" },
);

export type NewsletterSubscriptionDoc = InferSchemaType<typeof newsletterSubscriptionSchema>;

export const NewsletterSubscriptionModel =
  (mongoose.models.NewsletterSubscription as Model<NewsletterSubscriptionDoc>) ??
  mongoose.model<NewsletterSubscriptionDoc>("NewsletterSubscription", newsletterSubscriptionSchema);
