// src/app/layout.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Noto_Sans_Ethiopic, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LangProvider } from "@/components/layout/LangProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ORGANIZATION } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-ethiopic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tsedeycharity.org"),
  title: {
    default: "Tseday Charity Association | NGO North Shewa Ethiopia",
    template: "%s | Tseday Charity Association - North Shewa, Ethiopia",
  },
  description: "Building resilient and self-reliant communities in North Shewa through sustainable livelihoods, improved nutrition, and access to essential services.",
  keywords: ["charity", "nonprofit", "Ethiopia", "North Shewa", "humanitarian", "IDP support"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: ORGANIZATION.name,
    title: "Tseday Charity Association | NGO North Shewa Ethiopia",
    description: "Building resilient and self-reliant communities in North Shewa through sustainable livelihoods, improved nutrition, and access to essential services.",
    images: [
      {
        url: "/gallery/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Tseday Charity community support activities in North Shewa, Ethiopia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tseday Charity Association | NGO North Shewa Ethiopia",
    description: "Building resilient and self-reliant communities in North Shewa through sustainable livelihoods, improved nutrition, and essential services.",
    images: ["/gallery/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: "https://www.tsedeycharity.org",
    logo: "https://www.tsedeycharity.org/gallery/logo.jpg",
    sameAs: [
      "https://www.facebook.com/",
      "https://www.instagram.com/",
      "https://www.linkedin.com/",
      "https://x.com/",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: ORGANIZATION.email,
        areaServed: "ET",
        availableLanguage: ["English", "Amharic"],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${notoEthiopic.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <LangProvider>
              <Navbar />
              {children}
              <Footer />
            </LangProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}