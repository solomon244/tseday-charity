import { Router } from "express";
import {
  createAdminSessionToken,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from "@/lib/adminAuth";
import { getAdminStats } from "@/lib/adminStats";
import {
  listContactMessages,
  updateContactStatus,
  type ContactStatus,
} from "@/lib/contactStore";
import {
  listDonations,
  updateDonationStatus,
  type DonationStatus,
} from "@/lib/donationStore";
import { sendVolunteerApprovedEmail } from "@/lib/email/volunteerApproved";
import { listNewsletterSubscribers } from "@/lib/newsletterStore";
import { parsePositiveInt } from "@/lib/listQuery";
import { findByRef, listApplications, updateStatus } from "@/lib/volunteerStore";
import type { VolunteerStatus } from "@/lib/volunteerTypes";
import { requireAdmin } from "@/middleware/requireAdmin";

export const adminRouter = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 8 * 1000,
};

const allowedStatuses: VolunteerStatus[] = [
  "received",
  "under_review",
  "approved",
  "scheduled",
  "declined",
];

const contactStatuses: ContactStatus[] = ["new", "read", "archived"];
const donationStatuses: DonationStatus[] = ["recorded", "completed", "failed"];

adminRouter.get("/session", (req, res) => {
  const token = req.cookies?.admin_session as string | undefined;
  res.json({ authenticated: verifyAdminSessionToken(token) });
});

adminRouter.post("/login", (req, res) => {
  try {
    const password = String((req.body as { password?: string }).password ?? "").trim();
    if (!password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }
    if (!verifyAdminPassword(password)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = createAdminSessionToken();
    res.cookie("admin_session", token, COOKIE_OPTS);
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: "Invalid request body" });
  }
});

adminRouter.post("/logout", (_req, res) => {
  res.clearCookie("admin_session", { path: "/" });
  res.json({ ok: true });
});

adminRouter.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const stats = await getAdminStats();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Could not load stats" });
  }
});

adminRouter.get("/contacts", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const status = String(req.query.status ?? "").trim() as ContactStatus | "";
  const sortByRaw = String(req.query.sort ?? "submittedAt").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);

  const sortBy =
    sortByRaw === "name" || sortByRaw === "type" || sortByRaw === "submittedAt" ? sortByRaw : "submittedAt";
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  if (status && !contactStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status filter" });
    return;
  }

  try {
    const { items, total } = await listContactMessages({
      query,
      status,
      sortBy,
      order,
      page,
      pageSize,
    });
    res.json({ items, total, page, pageSize });
  } catch {
    res.status(500).json({ error: "Could not load messages" });
  }
});

adminRouter.patch("/contacts", requireAdmin, async (req, res) => {
  try {
    const body = req.body as { id?: string; status?: ContactStatus };
    const id = String(body.id ?? "").trim();
    const status = body.status;
    if (!id || !status || !contactStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }
    const updated = await updateContactStatus(id, status);
    if (!updated) {
      res.status(404).json({ error: "Message not found" });
      return;
    }
    res.json({ message: updated });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

adminRouter.get("/donations", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const status = String(req.query.status ?? "").trim() as DonationStatus | "";
  const sortByRaw = String(req.query.sort ?? "submittedAt").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);

  const sortBy =
    sortByRaw === "amount" || sortByRaw === "status" || sortByRaw === "submittedAt"
      ? sortByRaw
      : "submittedAt";
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  if (status && !donationStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status filter" });
    return;
  }

  try {
    const { items, total } = await listDonations({
      query,
      status,
      sortBy,
      order,
      page,
      pageSize,
    });
    res.json({ items, total, page, pageSize });
  } catch {
    res.status(500).json({ error: "Could not load donations" });
  }
});

adminRouter.patch("/donations", requireAdmin, async (req, res) => {
  try {
    const body = req.body as { refId?: string; status?: DonationStatus };
    const refId = String(body.refId ?? "").trim();
    const status = body.status;
    if (!refId || !status || !donationStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }
    const updated = await updateDonationStatus(refId, status);
    if (!updated) {
      res.status(404).json({ error: "Donation not found" });
      return;
    }
    res.json({ donation: updated });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

adminRouter.get("/newsletter", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  try {
    const { items, total } = await listNewsletterSubscribers({ query, order, page, pageSize });
    res.json({ items, total, page, pageSize });
  } catch {
    res.status(500).json({ error: "Could not load subscribers" });
  }
});

adminRouter.get("/volunteers", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const status = String(req.query.status ?? "").trim() as VolunteerStatus | "";
  const sortByRaw = String(req.query.sort ?? "submittedAt").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);

  const sortBy =
    sortByRaw === "name" || sortByRaw === "status" || sortByRaw === "submittedAt"
      ? sortByRaw
      : "submittedAt";
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  if (status && !allowedStatuses.includes(status)) {
    res.status(400).json({ error: "Invalid status filter" });
    return;
  }

  try {
    const { items, total } = await listApplications({
      query,
      status,
      sortBy,
      order,
      page,
      pageSize,
    });

    res.json({
      applications: items,
      items,
      total,
      page,
      pageSize,
      sortBy,
      order,
      q: query.toLowerCase(),
      status: status || null,
    });
  } catch {
    res.status(500).json({ error: "Could not load applications" });
  }
});

adminRouter.patch("/volunteers", requireAdmin, async (req, res) => {
  try {
    const body = req.body as { refId?: string; status?: VolunteerStatus };
    const refId = String(body.refId ?? "").trim();
    const status = body.status;
    if (!refId || !status || !allowedStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const previous = await findByRef(refId);
    const updated = await updateStatus(refId, status);
    if (!updated) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    let emailNotification: { sent: boolean; error?: string } | null = null;
    if (status === "approved" && previous?.status !== "approved") {
      emailNotification = await sendVolunteerApprovedEmail(updated);
    }

    res.json({ application: updated, emailNotification });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});
