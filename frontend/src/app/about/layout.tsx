import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Tseday Charity Association's mission, vision, and values serving vulnerable communities in North Shewa, Ethiopia.",
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
