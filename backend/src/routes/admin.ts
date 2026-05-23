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
import {
  createImpactStory,
  deleteImpactStory,
  listImpactStories,
  updateImpactStory,
  type ImpactStoryInput,
} from "@/lib/impactStoryStore";
import {
  createNewsArticle,
  deleteNewsArticle,
  listNewsArticles,
  updateNewsArticle,
  type NewsArticleInput,
} from "@/lib/newsStore";
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

adminRouter.get("/recent", requireAdmin, async (_req, res) => {
  try {
    const [contacts, donations, volunteers, news] = await Promise.all([
      listContactMessages({ page: 1, pageSize: 5, status: "new", order: "desc" }),
      listDonations({ page: 1, pageSize: 5, order: "desc" }),
      listApplications({ page: 1, pageSize: 5, order: "desc" }),
      listNewsArticles({ page: 1, pageSize: 5, order: "desc" }),
    ]);
    res.json({
      contacts: contacts.items,
      donations: donations.items,
      volunteers: volunteers.items,
      news: news.items,
    });
  } catch {
    res.status(500).json({ error: "Could not load recent activity" });
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

function parseNewsBody(body: Record<string, unknown>): NewsArticleInput | null {
  const slug = String(body.slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const title = String(body.title ?? "").trim();
  const excerpt = String(body.excerpt ?? "").trim();
  const date = String(body.date ?? "").trim();
  const category = String(body.category ?? "").trim();
  const imageEmoji = String(body.imageEmoji ?? "📰").trim() || "📰";
  const tags = Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean)
    : String(body.tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
  const bodyParagraphs = Array.isArray(body.body)
    ? body.body.map((p) => String(p).trim()).filter(Boolean)
    : String(body.body ?? "")
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

  if (!slug || !title || !excerpt || !date || !category) return null;

  return {
    slug,
    title,
    excerpt,
    date,
    category,
    tags,
    imageEmoji,
    body: bodyParagraphs,
    published: body.published !== false,
  };
}

adminRouter.get("/news", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  try {
    const { items, total } = await listNewsArticles({ query, order, page, pageSize });
    res.json({ items, total, page, pageSize });
  } catch {
    res.status(500).json({ error: "Could not load news articles" });
  }
});

adminRouter.post("/news", requireAdmin, async (req, res) => {
  try {
    const input = parseNewsBody(req.body as Record<string, unknown>);
    if (!input) {
      res.status(400).json({ error: "Invalid article payload" });
      return;
    }
    const article = await createNewsArticle(input);
    res.status(201).json({ article });
  } catch (err) {
    const message = err instanceof Error && err.message.includes("duplicate") ? "Slug already exists" : "Create failed";
    res.status(500).json({ error: message });
  }
});

adminRouter.patch("/news", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const id = String(body.id ?? "").trim();
    if (!id) {
      res.status(400).json({ error: "Article id is required" });
      return;
    }
    const input = parseNewsBody(body);
    if (!input) {
      res.status(400).json({ error: "Invalid article payload" });
      return;
    }
    if (body.published === false) input.published = false;
    const article = await updateNewsArticle(id, input);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json({ article });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

adminRouter.delete("/news", requireAdmin, async (req, res) => {
  try {
    const id = String(req.query.id ?? "").trim();
    if (!id) {
      res.status(400).json({ error: "Article id is required" });
      return;
    }
    const ok = await deleteNewsArticle(id);
    if (!ok) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

function parseImpactStoryBody(body: Record<string, unknown>): ImpactStoryInput | null {
  const slug = String(body.slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const title = String(body.title ?? "").trim();
  const summary = String(body.summary ?? "").trim();
  const beneficiary = String(body.beneficiary ?? "").trim();
  const location = String(body.location ?? "").trim();
  const program = String(body.program ?? "").trim();
  const image = String(body.image ?? "").trim();
  const outcome = Array.isArray(body.outcome)
    ? body.outcome.map((o) => String(o).trim()).filter(Boolean)
    : String(body.outcome ?? "")
        .split(/\n/)
        .map((o) => o.trim())
        .filter(Boolean);

  if (!slug || !title || !summary || !beneficiary || !location || !program || !image) return null;

  return {
    slug,
    title,
    summary,
    beneficiary,
    location,
    program,
    image,
    outcome,
    published: body.published !== false,
  };
}

adminRouter.get("/impact-stories", requireAdmin, async (req, res) => {
  const query = String(req.query.q ?? "").trim();
  const orderRaw = String(req.query.order ?? "desc").trim();
  const page = parsePositiveInt(req.query.page, 1);
  const pageSize = Math.min(parsePositiveInt(req.query.pageSize, 10), 100);
  const order = orderRaw === "asc" || orderRaw === "desc" ? orderRaw : "desc";

  try {
    const { items, total } = await listImpactStories({ query, order, page, pageSize });
    res.json({ items, total, page, pageSize });
  } catch {
    res.status(500).json({ error: "Could not load impact stories" });
  }
});

adminRouter.post("/impact-stories", requireAdmin, async (req, res) => {
  try {
    const input = parseImpactStoryBody(req.body as Record<string, unknown>);
    if (!input) {
      res.status(400).json({ error: "Invalid story payload" });
      return;
    }
    const story = await createImpactStory(input);
    res.status(201).json({ story });
  } catch (err) {
    const message = err instanceof Error && err.message.includes("duplicate") ? "Slug already exists" : "Create failed";
    res.status(500).json({ error: message });
  }
});

adminRouter.patch("/impact-stories", requireAdmin, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const id = String(body.id ?? "").trim();
    if (!id) {
      res.status(400).json({ error: "Story id is required" });
      return;
    }
    const input = parseImpactStoryBody(body);
    if (!input) {
      res.status(400).json({ error: "Invalid story payload" });
      return;
    }
    if (body.published === false) input.published = false;
    const story = await updateImpactStory(id, input);
    if (!story) {
      res.status(404).json({ error: "Story not found" });
      return;
    }
    res.json({ story });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

adminRouter.delete("/impact-stories", requireAdmin, async (req, res) => {
  try {
    const id = String(req.query.id ?? "").trim();
    if (!id) {
      res.status(400).json({ error: "Story id is required" });
      return;
    }
    const ok = await deleteImpactStory(id);
    if (!ok) {
      res.status(404).json({ error: "Story not found" });
      return;
    }
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
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
