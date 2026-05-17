import { randomBytes } from "crypto";
import { isDbConfigured, connectDB } from "@/lib/db/connect";
import { DonationModel } from "@/lib/db/models/Donation";
import { escapeRegex, type SortOrder } from "@/lib/listQuery";

export type DonationStatus = "recorded" | "completed" | "failed";

export interface DonationInput {
  amount: number;
  currency?: string;
  frequency: "one-time" | "monthly";
  cause: string;
  paymentMethod: string;
}

export interface DonationRecord extends DonationInput {
  refId: string;
  currency: string;
  status: DonationStatus;
  submittedAt: string;
}

function makeRefId(): string {
  return `DON-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function toRecord(doc: {
  refId: string;
  amount: number;
  currency: string;
  frequency: string;
  cause: string;
  paymentMethod: string;
  status: string;
  submittedAt: Date;
}): DonationRecord {
  return {
    refId: doc.refId,
    amount: doc.amount,
    currency: doc.currency,
    frequency: doc.frequency as "one-time" | "monthly",
    cause: doc.cause,
    paymentMethod: doc.paymentMethod,
    status: doc.status as DonationStatus,
    submittedAt: doc.submittedAt.toISOString(),
  };
}

export async function recordDonation(input: DonationInput): Promise<DonationRecord> {
  if (!isDbConfigured()) {
    throw new Error("Database not configured");
  }
  await connectDB();
  const submittedAt = new Date();
  const doc = await DonationModel.create({
    refId: makeRefId(),
    amount: input.amount,
    currency: input.currency ?? "ETB",
    frequency: input.frequency,
    cause: input.cause,
    paymentMethod: input.paymentMethod,
    status: "recorded",
    submittedAt,
  });
  return toRecord(doc);
}

export type DonationListParams = {
  query?: string;
  status?: DonationStatus | "";
  sortBy?: "submittedAt" | "amount" | "status";
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export async function listDonations(params: DonationListParams = {}) {
  if (!isDbConfigured()) {
    return { items: [] as DonationRecord[], total: 0 };
  }

  const {
    query = "",
    status = "",
    sortBy = "submittedAt",
    order = "desc",
    page = 1,
    pageSize = 10,
  } = params;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (query) {
    const regex = new RegExp(escapeRegex(query), "i");
    filter.$or = [{ refId: regex }, { cause: regex }, { paymentMethod: regex }];
  }

  const sortDir = order === "asc" ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortBy]: sortDir };
  const skip = (page - 1) * pageSize;

  const [docs, total] = await Promise.all([
    DonationModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    DonationModel.countDocuments(filter),
  ]);

  return {
    items: docs.map((d) => toRecord(d as Parameters<typeof toRecord>[0])),
    total,
  };
}

export async function updateDonationStatus(
  refId: string,
  status: DonationStatus,
): Promise<DonationRecord | undefined> {
  if (!isDbConfigured()) return undefined;
  await connectDB();
  const id = refId.trim().toUpperCase();
  const doc = await DonationModel.findOneAndUpdate(
    { refId: { $regex: new RegExp(`^${escapeRegex(id)}$`, "i") } },
    { $set: { status } },
    { new: true },
  ).lean();
  return doc ? toRecord(doc as Parameters<typeof toRecord>[0]) : undefined;
}
