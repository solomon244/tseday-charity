import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore Tseday Charity programs in North Shewa including agriculture, livelihoods, nutrition, education, IDP support, gender protection, and peace building.",
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
