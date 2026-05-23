import { isDbConfigured, connectDB } from "@/lib/db/connect";
import { NewsArticleModel } from "@/lib/db/models/NewsArticle";
import { DEFAULT_NEWS_ARTICLES } from "@/lib/newsSeed";
import { escapeRegex, type SortOrder } from "@/lib/listQuery";

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

export interface NewsArticleInput {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  imageEmoji: string;
  body: string[];
  published?: boolean;
}

function toRecord(doc: {
  _id: unknown;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags?: string[];
  imageEmoji?: string;
  body?: string[];
  published?: boolean;
  updatedAt?: Date;
}): NewsArticleRecord {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    category: doc.category,
    tags: doc.tags ?? [],
    imageEmoji: doc.imageEmoji ?? "📰",
    body: doc.body ?? [],
    published: doc.published !== false,
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export async function ensureNewsSeeded() {
  if (!isDbConfigured()) return;
  await connectDB();
  const count = await NewsArticleModel.countDocuments();
  if (count > 0) return;
  await NewsArticleModel.insertMany([...DEFAULT_NEWS_ARTICLES]);
}

export type NewsListParams = {
  query?: string;
  publishedOnly?: boolean;
  sortBy?: "date" | "title";
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export async function listNewsArticles(params: NewsListParams = {}) {
  if (!isDbConfigured()) {
    return { items: [] as NewsArticleRecord[], total: 0 };
  }

  await ensureNewsSeeded();

  const {
    query = "",
    publishedOnly = false,
    sortBy = "date",
    order = "desc",
    page = 1,
    pageSize = 20,
  } = params;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;
  if (query) {
    const rx = new RegExp(escapeRegex(query), "i");
    filter.$or = [{ title: rx }, { excerpt: rx }, { category: rx }, { slug: rx }];
  }

  const sort: Record<string, 1 | -1> = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const skip = (page - 1) * pageSize;
  const [docs, total] = await Promise.all([
    NewsArticleModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    NewsArticleModel.countDocuments(filter),
  ]);

  return { items: docs.map((d) => toRecord(d)), total };
}

export async function findNewsBySlug(slug: string, publishedOnly = false) {
  if (!isDbConfigured()) return null;
  await ensureNewsSeeded();
  await connectDB();
  const filter: Record<string, unknown> = { slug };
  if (publishedOnly) filter.published = true;
  const doc = await NewsArticleModel.findOne(filter).lean();
  return doc ? toRecord(doc) : null;
}

export async function createNewsArticle(input: NewsArticleInput) {
  if (!isDbConfigured()) throw new Error("Database not configured");
  await connectDB();
  const doc = await NewsArticleModel.create({
    ...input,
    published: input.published !== false,
  });
  return toRecord(doc);
}

export async function updateNewsArticle(id: string, input: Partial<NewsArticleInput>) {
  if (!isDbConfigured()) return null;
  await connectDB();
  const doc = await NewsArticleModel.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true, runValidators: true },
  ).lean();
  return doc ? toRecord(doc) : null;
}

export async function deleteNewsArticle(id: string) {
  if (!isDbConfigured()) return false;
  await connectDB();
  const result = await NewsArticleModel.findByIdAndDelete(id);
  return Boolean(result);
}

export async function countNewsArticles(publishedOnly = false) {
  if (!isDbConfigured()) return 0;
  await ensureNewsSeeded();
  await connectDB();
  const filter = publishedOnly ? { published: true } : {};
  return NewsArticleModel.countDocuments(filter);
}
