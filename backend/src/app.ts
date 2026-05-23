import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { adminRouter } from "@/routes/admin";
import { contactRouter } from "@/routes/contact";
import { donationsRouter } from "@/routes/donations";
import { newsletterRouter } from "@/routes/newsletter";
import { newsRouter } from "@/routes/news";
import { impactStoriesRouter } from "@/routes/impactStories";
import { volunteerRouter } from "@/routes/volunteer";

export function createApp() {
  const app = express();
  const frontendUrl = process.env.FRONTEND_URL?.trim() || "http://localhost:3000";

  app.use(
    cors({
      origin: frontendUrl,
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "tseday-charity-api" });
  });

  app.use("/api/volunteer", volunteerRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/newsletter", newsletterRouter);
  app.use("/api/news", newsRouter);
  app.use("/api/impact-stories", impactStoriesRouter);
  app.use("/api/donations", donationsRouter);
  app.use("/api/admin", adminRouter);

  return app;
}
