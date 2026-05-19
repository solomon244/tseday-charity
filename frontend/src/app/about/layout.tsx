import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tseday Charity Association is a registered non-profit NGO in Debre Birhan, Ethiopia, serving IDPs, women, and youth in North Shewa through humanitarian and development programs.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
