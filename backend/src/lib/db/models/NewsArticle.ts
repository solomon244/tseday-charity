import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const newsArticleSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true, index: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageEmoji: { type: String, default: "📰" },
    body: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
  },
  { collection: "news_articles", timestamps: true },
);

export type NewsArticleDoc = InferSchemaType<typeof newsArticleSchema>;

export const NewsArticleModel =
  (mongoose.models.NewsArticle as Model<NewsArticleDoc>) ??
  mongoose.model<NewsArticleDoc>("NewsArticle", newsArticleSchema);
