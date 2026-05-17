import { Router } from "express";
import { isDbConfigured } from "@/lib/db/connect";
import { subscribeEmail } from "@/lib/newsletterStore";

export const newsletterRouter = Router();

newsletterRouter.post("/", async (req, res) => {
  if (!isDbConfigured()) {
    res.status(503).json({
      error: "Database is not configured. Set MONGODB_URI in backend .env.local.",
    });
    return;
  }

  try {
    const email = String((req.body as { email?: string }).email ?? "").trim();
    if (!email || !email.includes("@")) {
      res.status(400).json({ error: "Valid email is required" });
      return;
    }

    const entry = await subscribeEmail(email);
    res.json({ ok: true, email: entry.email, subscribedAt: entry.subscribedAt });
  } catch {
    res.status(500).json({ error: "Could not subscribe" });
  }
});
