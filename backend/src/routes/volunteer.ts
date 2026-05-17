import { Router } from "express";
import { addApplication, findByRef } from "@/lib/volunteerStore";

export const volunteerRouter = Router();

volunteerRouter.post("/", async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const skills = String(body.skills ?? "").trim();
    const availability = String(body.availability ?? "").trim();
    const motivation = String(body.motivation ?? "").trim();

    if (!name || !email || !skills || !availability || !motivation) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const entry = await addApplication({
      name,
      email,
      phone,
      skills,
      availability,
      motivation,
    });

    res.json({
      refId: entry.refId,
      status: entry.status,
      submittedAt: entry.submittedAt,
    });
  } catch (err) {
    console.error("[POST /api/volunteer]", err);
    const message =
      process.env.NODE_ENV === "development" && err instanceof Error
        ? err.message
        : "Could not save application";
    res.status(500).json({ error: message });
  }
});

volunteerRouter.get("/", async (req, res) => {
  const ref = String(req.query.ref ?? "").trim();
  if (!ref) {
    res.status(400).json({ error: "Missing ref" });
    return;
  }

  const app = await findByRef(ref);
  if (!app) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    refId: app.refId,
    status: app.status,
    submittedAt: app.submittedAt,
    timelineNote:
      app.status === "approved" || app.status === "scheduled"
        ? "Our volunteer coordinator may contact you by email or phone for next steps."
        : "We review applications in order and will update this status as we progress.",
  });
});
