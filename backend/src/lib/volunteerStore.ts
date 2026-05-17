import { isDbConfigured } from "@/lib/db/connect";
import type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";

export type { VolunteerApplication, VolunteerStatus } from "@/lib/volunteerTypes";
export type { VolunteerListParams } from "@/lib/volunteerStore.file";

async function store() {
  return isDbConfigured()
    ? import("@/lib/volunteerStore.mongo")
    : import("@/lib/volunteerStore.file");
}

export async function readApplications(): Promise<VolunteerApplication[]> {
  const s = await store();
  return s.readApplications();
}

export async function addApplication(
  input: Omit<VolunteerApplication, "refId" | "submittedAt" | "status">,
): Promise<VolunteerApplication> {
  const s = await store();
  return s.addApplication(input);
}

export async function findByRef(refId: string): Promise<VolunteerApplication | undefined> {
  const s = await store();
  return s.findByRef(refId);
}

export async function updateStatus(
  refId: string,
  status: VolunteerStatus,
): Promise<VolunteerApplication | undefined> {
  const s = await store();
  return s.updateStatus(refId, status);
}

export async function listApplications(
  params: import("@/lib/volunteerStore.file").VolunteerListParams = {},
) {
  const s = await store();
  return s.listApplications(params);
}
