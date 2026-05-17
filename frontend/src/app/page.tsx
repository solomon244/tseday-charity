// src/app/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { QuickStats } from "@/components/sections/QuickStats";
import { ProgramHighlights } from "@/components/sections/ProgramHighlights";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { DonationImpact } from "@/components/sections/DonationImpact";
import { GetInvolved } from "@/components/sections/GetInvolved";

export const metadata: Metadata = {
  title: "Home",
  description: "Support Tseday Charity Association to deliver food aid, livelihood support, and community resilience programs in North Shewa, Ethiopia.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-tsedey-light dark:bg-gray-950">
      <Hero />
      <TrustSection />
      <QuickStats />
      <ProgramHighlights />
      <FeaturedStory />
      <GalleryShowcase />
      <DonationImpact />
      <GetInvolved />
    </main>
  );
}