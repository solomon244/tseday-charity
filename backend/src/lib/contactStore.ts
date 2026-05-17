import { isDbConfigured, connectDB } from "@/lib/db/connect";
import { ContactMessageModel } from "@/lib/db/models/ContactMessage";
import { escapeRegex, type SortOrder } from "@/lib/listQuery";

export type ContactStatus = "new" | "read" | "archived";

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export interface ContactMessage extends ContactInput {
  id: string;
  status: ContactStatus;
  submittedAt: string;
}

function toMessage(doc: {
  _id: unknown;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  status?: string;
  submittedAt: Date;
}): ContactMessage {
  const status = (doc.status ?? "new") as ContactStatus;
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    type: doc.type,
    status,
    submittedAt: doc.submittedAt.toISOString(),
  };
}

export async function addContactMessage(input: ContactInput): Promise<ContactMessage> {
  if (!isDbConfigured()) {
    throw new Error("Database not configured");
  }
  await connectDB();
  const doc = await ContactMessageModel.create({
    ...input,
    status: "new",
    submittedAt: new Date(),
  });
  return toMessage(doc);
}

export type ContactListParams = {
  query?: string;
  status?: ContactStatus | "";
  sortBy?: "submittedAt" | "name" | "type";
  order?: SortOrder;
  page?: number;
  pageSize?: number;
};

export async function listContactMessages(params: ContactListParams = {}) {
  if (!isDbConfigured()) {
    return { items: [] as ContactMessage[], total: 0 };
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
    filter.$or = [{ name: regex }, { email: regex }, { subject: regex }];
  }

  const sortDir = order === "asc" ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortBy]: sortDir };
  const skip = (page - 1) * pageSize;

  const [docs, total] = await Promise.all([
    ContactMessageModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    ContactMessageModel.countDocuments(filter),
  ]);

  return {
    items: docs.map((d) => toMessage(d as Parameters<typeof toMessage>[0])),
    total,
  };
}

export async function updateContactStatus(
  id: string,
  status: ContactStatus,
): Promise<ContactMessage | undefined> {
  if (!isDbConfigured()) return undefined;
  await connectDB();
  const doc = await ContactMessageModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();
  return doc ? toMessage(doc as Parameters<typeof toMessage>[0]) : undefined;
}
