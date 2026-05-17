import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description: "Explore Tseday Charity programs in North Shewa including sustainable agriculture, livelihoods, nutrition, education, and IDP support.",
  alternates: {
    canonical: "/programs",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
