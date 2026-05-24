// src/app/page.tsx
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { QuickStats } from "@/components/sections/QuickStats";
import { ImpactMapSection } from "@/components/sections/ImpactMapSection";
import { ProgramHighlights } from "@/components/sections/ProgramHighlights";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { GalleryShowcase } from "@/components/sections/GalleryShowcase";
import { DonationImpact } from "@/components/sections/DonationImpact";
import { GetInvolved } from "@/components/sections/GetInvolved";
import { SectionWave } from "@/components/shared/SectionWave";

export const metadata: Metadata = {
  title: "Home",
  description: "Support Tseday Charity Association to deliver food aid, livelihood support, and community resilience programs in North Shewa, Ethiopia.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-theme-page">
      <Hero />
      <SectionWave fillClass="fill-theme-surface" />
      <PartnersSection />
      <SectionWave fillClass="fill-theme-surface" flip />
      <TrustSection />
      <SectionWave fillClass="fill-theme-muted" />
      <QuickStats />
      <SectionWave fillClass="fill-theme-surface" />
      <ProgramHighlights />
      <SectionWave fillClass="fill-theme-surface" flip />
      <FeaturedStory />
      <SectionWave fillClass="fill-theme-page" />
      <GalleryShowcase />
      <SectionWave fillClass="fill-theme-page" flip />
      <DonationImpact />
      <SectionWave fillClass="fill-theme-surface" />
      <GetInvolved />
      <SectionWave fillClass="fill-theme-muted" />
      <ImpactMapSection />
    </main>
  );
}
