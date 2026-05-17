import { Router } from "express";
import { isDbConfigured } from "@/lib/db/connect";
import { addContactMessage } from "@/lib/contactStore";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  if (!isDbConfigured()) {
    res.status(503).json({
      error: "Database is not configured. Set MONGODB_URI in backend .env.local.",
    });
    return;
  }

  try {
    const body = req.body as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();
    const type = String(body.type ?? "general").trim() || "general";

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const entry = await addContactMessage({ name, email, subject, message, type });
    res.json({ ok: true, id: entry.id, submittedAt: entry.submittedAt });
  } catch (err) {
    console.error("[POST /api/contact]", err);
    const message =
      process.env.NODE_ENV === "development" && err instanceof Error
        ? err.message
        : "Could not save message";
    res.status(500).json({ error: message });
  }
});
