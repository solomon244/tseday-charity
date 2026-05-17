import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Tseday Charity Association in North Shewa, Ethiopia for partnerships, donations, volunteer opportunities, and program inquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
