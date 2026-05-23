import { Router } from "express";
import { findImpactStoryBySlug, listImpactStories } from "@/lib/impactStoryStore";

export const impactStoriesRouter = Router();

impactStoriesRouter.get("/", async (req, res) => {
  const slug = String(req.query.slug ?? "").trim();
  try {
    if (slug) {
      const story = await findImpactStoryBySlug(slug, true);
      if (!story) {
        res.status(404).json({ error: "Story not found" });
        return;
      }
      res.json({ story });
      return;
    }

    const { items } = await listImpactStories({
      publishedOnly: true,
      sortBy: "updatedAt",
      order: "desc",
      page: 1,
      pageSize: 100,
    });
    res.json({ items });
  } catch {
    res.status(500).json({ error: "Could not load impact stories" });
  }
});
