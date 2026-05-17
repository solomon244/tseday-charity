import { isDbConfigured, connectDB } from "@/lib/db/connect";
import { NewsletterSubscriptionModel } from "@/lib/db/models/NewsletterSubscription";
import { escapeRegex, type SortOrder } from "@/lib/listQuery";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

export async function subscribeEmail(email: string): Promise<{ email: string; subscribedAt: string }> {
  if (!isDbConfigured()) {
    throw new Error("Database not configured");
  }
  await connectDB();
  const normalized = email.trim().toLowerCase();
  const existing = await NewsletterSubscriptionModel.findOne({ email: normalized });
  if (existing) {
    return {
      email: existing.email,
      subscribedAt: existing.subscribedAt.toISOString(),
    };
  }
  const doc = await NewsletterSubscriptionModel.create({
    email: normalized,
    subscribedAt: new Date(),
  });
  return {
    email: doc.email,
    subscribedAt: doc.subscribedAt.toISOString(),
  };
}

export type NewsletterListParams = {
  query?: string;
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export async function listNewsletterSubscribers(params: NewsletterListParams = {}) {
  if (!isDbConfigured()) {
    return { items: [] as NewsletterSubscriber[], total: 0 };
  }

  const { query = "", order = "desc", page = 1, pageSize = 10 } = params;
  await connectDB();

  const filter: Record<string, unknown> = {};
  if (query) {
    filter.email = new RegExp(escapeRegex(query), "i");
  }

  const sortDir = order === "asc" ? 1 : -1;
  const skip = (page - 1) * pageSize;

  const [docs, total] = await Promise.all([
    NewsletterSubscriptionModel.find(filter)
      .sort({ subscribedAt: sortDir })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    NewsletterSubscriptionModel.countDocuments(filter),
  ]);

  return {
    items: docs.map((d) => ({
      id: String(d._id),
      email: d.email,
      subscribedAt: d.subscribedAt.toISOString(),
    })),
    total,
  };
}
