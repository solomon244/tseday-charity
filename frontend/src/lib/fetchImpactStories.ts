import type { SuccessStory } from "@/lib/content";
import { successStories as staticStories } from "@/lib/content";

function apiBase() {
  if (typeof window !== "undefined") return "";
  return process.env.BACKEND_URL?.trim() || "http://127.0.0.1:4000";
}

function toStory(item: SuccessStory): SuccessStory {
  return {
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    beneficiary: item.beneficiary,
    location: item.location,
    program: item.program,
    image: item.image,
    outcome: item.outcome,
  };
}

export async function fetchPublishedImpactStories(): Promise<SuccessStory[]> {
  try {
    const res = await fetch(`${apiBase()}/api/impact-stories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return staticStories;
    const data = (await res.json()) as { items?: SuccessStory[] };
    if (!data.items?.length) return staticStories;
    return data.items.map(toStory);
  } catch {
    return staticStories;
  }
}

export async function fetchPublishedImpactStoryBySlug(slug: string): Promise<SuccessStory | null> {
  try {
    const res = await fetch(`${apiBase()}/api/impact-stories?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return staticStories.find((s) => s.slug === slug) ?? null;
    const data = (await res.json()) as { story?: SuccessStory };
    if (!data.story) return staticStories.find((s) => s.slug === slug) ?? null;
    return toStory(data.story);
  } catch {
    return staticStories.find((s) => s.slug === slug) ?? null;
  }
}
