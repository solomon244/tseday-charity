import { isDbConfigured, connectDB } from "@/lib/db/connect";
import { ImpactStoryModel } from "@/lib/db/models/ImpactStory";
import { DEFAULT_IMPACT_STORIES } from "@/lib/impactStorySeed";
import { escapeRegex, type SortOrder } from "@/lib/listQuery";

export interface ImpactStoryRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  beneficiary: string;
  location: string;
  program: string;
  image: string;
  outcome: string[];
  published: boolean;
  updatedAt: string;
}

export interface ImpactStoryInput {
  slug: string;
  title: string;
  summary: string;
  beneficiary: string;
  location: string;
  program: string;
  image: string;
  outcome: string[];
  published?: boolean;
}

function toRecord(doc: {
  _id: unknown;
  slug: string;
  title: string;
  summary: string;
  beneficiary: string;
  location: string;
  program: string;
  image: string;
  outcome?: string[];
  published?: boolean;
  updatedAt?: Date;
}): ImpactStoryRecord {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    beneficiary: doc.beneficiary,
    location: doc.location,
    program: doc.program,
    image: doc.image,
    outcome: doc.outcome ?? [],
    published: doc.published !== false,
    updatedAt: (doc.updatedAt ?? new Date()).toISOString(),
  };
}

export async function ensureImpactStoriesSeeded() {
  if (!isDbConfigured()) return;
  await connectDB();
  const count = await ImpactStoryModel.countDocuments();
  if (count > 0) return;
  await ImpactStoryModel.insertMany([...DEFAULT_IMPACT_STORIES]);
}

export type ImpactStoryListParams = {
  query?: string;
  publishedOnly?: boolean;
  sortBy?: "updatedAt" | "title";
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export async function listImpactStories(params: ImpactStoryListParams = {}) {
  if (!isDbConfigured()) {
    return { items: [] as ImpactStoryRecord[], total: 0 };
  }

  await ensureImpactStoriesSeeded();

  const {
    query = "",
    publishedOnly = false,
    sortBy = "updatedAt",
    order = "desc",
    page = 1,
    pageSize = 20,
  } = params;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (publishedOnly) filter.published = true;
  if (query) {
    const rx = new RegExp(escapeRegex(query), "i");
    filter.$or = [
      { title: rx },
      { summary: rx },
      { beneficiary: rx },
      { location: rx },
      { program: rx },
      { slug: rx },
    ];
  }

  const sort: Record<string, 1 | -1> = {
    [sortBy]: order === "asc" ? 1 : -1,
  };

  const skip = (page - 1) * pageSize;
  const [docs, total] = await Promise.all([
    ImpactStoryModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    ImpactStoryModel.countDocuments(filter),
  ]);

  return { items: docs.map((d) => toRecord(d)), total };
}

export async function findImpactStoryBySlug(slug: string, publishedOnly = false) {
  if (!isDbConfigured()) return null;
  await ensureImpactStoriesSeeded();
  await connectDB();
  const filter: Record<string, unknown> = { slug };
  if (publishedOnly) filter.published = true;
  const doc = await ImpactStoryModel.findOne(filter).lean();
  return doc ? toRecord(doc) : null;
}

export async function createImpactStory(input: ImpactStoryInput) {
  if (!isDbConfigured()) throw new Error("Database not configured");
  await connectDB();
  const doc = await ImpactStoryModel.create({
    ...input,
    published: input.published !== false,
  });
  return toRecord(doc);
}

export async function updateImpactStory(id: string, input: Partial<ImpactStoryInput>) {
  if (!isDbConfigured()) return null;
  await connectDB();
  const doc = await ImpactStoryModel.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true, runValidators: true },
  ).lean();
  return doc ? toRecord(doc) : null;
}

export async function deleteImpactStory(id: string) {
  if (!isDbConfigured()) return false;
  await connectDB();
  const result = await ImpactStoryModel.findByIdAndDelete(id);
  return Boolean(result);
}

export async function countImpactStories(publishedOnly = false) {
  if (!isDbConfigured()) return 0;
  await ensureImpactStoriesSeeded();
  await connectDB();
  const filter = publishedOnly ? { published: true } : {};
  return ImpactStoryModel.countDocuments(filter);
}
