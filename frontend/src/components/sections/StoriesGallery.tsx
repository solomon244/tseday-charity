// src/components/sections/StoriesGallery.tsx
"use client";

import { MediaCarousel } from "../shared/MediaCarousel";
import type { MediaItem } from "../shared/MediaCarousel";

// 📸 Replace these with your actual media files
const galleryItems: MediaItem[] = [
  {
    id: "1",
    type: "image",
    url: "/gallery/volunteers-planting.jpg", // Add to public/gallery/
    caption: "Volunteers planting trees in North Shewa community farms",
    category: "Volunteers",
    date: "March 2024",
  },
  {
    id: "2",
    type: "video",
    url: "/gallery/training-session.mp4",
    thumbnail: "/gallery/training-thumb.jpg",
    caption: "Women's livelihood skills training workshop",
    category: "Training",
    date: "April 2024",
  },
  {
    id: "3",
    type: "image",
    url: "/gallery/food-distribution.jpg",
    caption: "Nutrition support distribution for IDP families",
    category: "Impact",
    date: "February 2024",
  },
  {
    id: "4",
    type: "image",
    url: "/gallery/community-gathering.jpg",
    caption: "Annual community resilience celebration event",
    category: "Events",
    date: "May 2024",
  },
  {
    id: "5",
    type: "video",
    url: "/gallery/agriculture-demo.mp4",
    thumbnail: "/gallery/agriculture-thumb.jpg",
    caption: "Sustainable farming techniques demonstration",
    category: "Community",
    date: "March 2024",
  },
];

export function StoriesGallery() {
  return (
    <MediaCarousel
      items={galleryItems}
      title="Our Stories & Memories"
      subtitle="Capturing moments of hope, service, and community transformation in North Shewa"
      autoPlayInterval={6000}
    />
  );
}