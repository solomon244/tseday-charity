import { Router } from "express";
import { isDbConfigured } from "@/lib/db/connect";
import { recordDonation } from "@/lib/donationStore";

export const donationsRouter = Router();

donationsRouter.post("/", async (req, res) => {
  if (!isDbConfigured()) {
    res.status(503).json({
      error: "Database is not configured. Set MONGODB_URI in backend .env.local.",
    });
    return;
  }

  try {
    const body = req.body as Record<string, unknown>;
    const amount = Number(body.amount);
    const frequency = body.frequency === "monthly" ? "monthly" : "one-time";
    const cause = String(body.cause ?? "").trim();
    const paymentMethod = String(body.paymentMethod ?? "").trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      res.status(400).json({ error: "Invalid amount" });
      return;
    }
    if (!cause || !paymentMethod) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const entry = await recordDonation({
      amount,
      currency: String(body.currency ?? "ETB").trim() || "ETB",
      frequency,
      cause,
      paymentMethod,
    });

    res.json({
      ok: true,
      refId: entry.refId,
      status: entry.status,
      submittedAt: entry.submittedAt,
    });
  } catch {
    res.status(500).json({ error: "Could not record donation" });
  }
});
