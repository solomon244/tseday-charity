import { Router } from "express";
import { findNewsBySlug, listNewsArticles } from "@/lib/newsStore";

export const newsRouter = Router();

newsRouter.get("/", async (req, res) => {
  const slug = String(req.query.slug ?? "").trim();
  try {
    if (slug) {
      const article = await findNewsBySlug(slug, true);
      if (!article) {
        res.status(404).json({ error: "Article not found" });
        return;
      }
      res.json({ article });
      return;
    }

    const { items } = await listNewsArticles({
      publishedOnly: true,
      sortBy: "date",
      order: "desc",
      page: 1,
      pageSize: 100,
    });
    res.json({ items });
  } catch {
    res.status(500).json({ error: "Could not load news" });
  }
});
