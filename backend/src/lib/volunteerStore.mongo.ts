import { randomBytes } from "crypto";
import { connectDB } from "@/lib/db/connect";
import { VolunteerApplicationModel } from "@/lib/db/models/VolunteerApplication";
import type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";

function makeRefId(): string {
  return `VOL-${randomBytes(4).toString("hex").toUpperCase()}`;
}

function toApplication(doc: {
  refId: string;
  submittedAt: Date;
  status: string;
  name: string;
  email: string;
  phone?: string | null;
  skills: string;
  availability: string;
  motivation: string;
}): VolunteerApplication {
  return {
    refId: doc.refId,
    submittedAt: doc.submittedAt.toISOString(),
    status: doc.status as VolunteerStatus,
    name: doc.name,
    email: doc.email,
    phone: doc.phone ?? "",
    skills: doc.skills,
    availability: doc.availability,
    motivation: doc.motivation,
  };
}

export async function readApplications(): Promise<VolunteerApplication[]> {
  await connectDB();
  const docs = await VolunteerApplicationModel.find().sort({ submittedAt: -1 }).lean();
  return docs.map((d) => toApplication(d as Parameters<typeof toApplication>[0]));
}

export async function addApplication(
  input: Omit<VolunteerApplication, "refId" | "submittedAt" | "status">,
): Promise<VolunteerApplication> {
  await connectDB();
  const submittedAt = new Date();
  const doc = await VolunteerApplicationModel.create({
    ...input,
    refId: makeRefId(),
    submittedAt,
    status: "received",
  });
  return toApplication(doc);
}

export async function findByRef(refId: string): Promise<VolunteerApplication | undefined> {
  await connectDB();
  const id = refId.trim().toUpperCase();
  const doc = await VolunteerApplicationModel.findOne({
    refId: { $regex: new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
  }).lean();
  return doc ? toApplication(doc as Parameters<typeof toApplication>[0]) : undefined;
}

export async function updateStatus(
  refId: string,
  status: VolunteerStatus,
): Promise<VolunteerApplication | undefined> {
  await connectDB();
  const id = refId.trim().toUpperCase();
  const doc = await VolunteerApplicationModel.findOneAndUpdate(
    { refId: { $regex: new RegExp(`^${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") } },
    { $set: { status } },
    { new: true },
  ).lean();
  return doc ? toApplication(doc as Parameters<typeof toApplication>[0]) : undefined;
}

export type VolunteerListParams = {
  query?: string;
  status?: VolunteerStatus | "";
  sortBy?: "submittedAt" | "name" | "status";
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
};

export async function listApplications(params: VolunteerListParams = {}) {
  await connectDB();
  const {
    query = "",
    status = "",
    sortBy = "submittedAt",
    order = "desc",
    page = 1,
    pageSize = 10,
  } = params;

  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "i");
    filter.$or = [{ refId: regex }, { name: regex }, { email: regex }];
  }

  const sortDir = order === "asc" ? 1 : -1;
  const sort: Record<string, 1 | -1> = { [sortBy]: sortDir };
  const skip = (page - 1) * pageSize;

  const [docs, total] = await Promise.all([
    VolunteerApplicationModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    VolunteerApplicationModel.countDocuments(filter),
  ]);

  return {
    items: docs.map((d) => toApplication(d as Parameters<typeof toApplication>[0])),
    total,
  };
}
