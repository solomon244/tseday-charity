import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const impactStorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    beneficiary: { type: String, required: true },
    location: { type: String, required: true },
    program: { type: String, required: true },
    image: { type: String, required: true },
    outcome: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
  },
  { collection: "impact_stories", timestamps: true },
);

export type ImpactStoryDoc = InferSchemaType<typeof impactStorySchema>;

export const ImpactStoryModel =
  (mongoose.models.ImpactStory as Model<ImpactStoryDoc>) ??
  mongoose.model<ImpactStoryDoc>("ImpactStory", impactStorySchema);
