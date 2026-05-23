import type { NewsArticle } from "@/lib/content";
import { newsArticles as staticNewsArticles } from "@/lib/content";

function apiBase() {
  if (typeof window !== "undefined") return "";
  return process.env.BACKEND_URL?.trim() || "http://127.0.0.1:4000";
}

function toArticle(item: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  imageEmoji: string;
  body: string[];
}): NewsArticle {
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    category: item.category,
    tags: item.tags,
    imageEmoji: item.imageEmoji,
    body: item.body,
  };
}

export async function fetchPublishedNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${apiBase()}/api/news`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return staticNewsArticles;
    const data = (await res.json()) as { items?: NewsArticle[] };
    if (!data.items?.length) return staticNewsArticles;
    return data.items.map(toArticle);
  } catch {
    return staticNewsArticles;
  }
}

export async function fetchPublishedNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const res = await fetch(`${apiBase()}/api/news?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return staticNewsArticles.find((a) => a.slug === slug) ?? null;
    }
    const data = (await res.json()) as { article?: NewsArticle };
    if (!data.article) return staticNewsArticles.find((a) => a.slug === slug) ?? null;
    return toArticle(data.article);
  } catch {
    return staticNewsArticles.find((a) => a.slug === slug) ?? null;
  }
}
