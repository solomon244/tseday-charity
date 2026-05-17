import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";

const DATA_PATH = path.join(process.cwd(), "data", "volunteers.json");

export async function readApplications(): Promise<VolunteerApplication[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch (e: unknown) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return [];
    throw e;
  }
}

async function writeApplications(list: VolunteerApplication[]): Promise<void> {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");
}

function makeRefId(): string {
  return `VOL-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function addApplication(
  input: Omit<VolunteerApplication, "refId" | "submittedAt" | "status">,
): Promise<VolunteerApplication> {
  const list = await readApplications();
  const entry: VolunteerApplication = {
    ...input,
    refId: makeRefId(),
    submittedAt: new Date().toISOString(),
    status: "received",
  };
  list.push(entry);
  await writeApplications(list);
  return entry;
}

export async function findByRef(refId: string): Promise<VolunteerApplication | undefined> {
  const id = refId.trim().toUpperCase();
  const list = await readApplications();
  return list.find((a) => a.refId.toUpperCase() === id);
}

export async function updateStatus(
  refId: string,
  status: VolunteerStatus,
): Promise<VolunteerApplication | undefined> {
  const list = await readApplications();
  const id = refId.trim().toUpperCase();
  let updated: VolunteerApplication | undefined;
  const next = list.map((a) => {
    if (a.refId.toUpperCase() !== id) return a;
    updated = { ...a, status };
    return updated;
  });
  if (!updated) return undefined;
  await writeApplications(next);
  return updated;
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
  const {
    query = "",
    status = "",
    sortBy = "submittedAt",
    order = "desc",
    page = 1,
    pageSize = 10,
  } = params;

  const multiplier = order === "asc" ? 1 : -1;
  const apps = await readApplications();
  const filtered = apps.filter((a) => {
    const q = query.toLowerCase();
    const matchesStatus = !status || a.status === status;
    const matchesQuery =
      !q ||
      a.refId.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "submittedAt") {
      return (new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()) * multiplier;
    }
    if (sortBy === "name") {
      return a.name.localeCompare(b.name) * multiplier;
    }
    return a.status.localeCompare(b.status) * multiplier;
  });

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const items = sorted.slice(start, start + pageSize);
  return { items, total };
}
