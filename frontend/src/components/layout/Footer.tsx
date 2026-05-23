// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { ORGANIZATION } from "@/lib/constants";
import { NewsletterSignup } from "@/components/shared/NewsletterSignup";
import { useLang } from "@/components/layout/LangProvider";

const footerLinks = {
  organization: [
    { href: "/about", label: "About Us" },
    { href: "/about", label: "Our Vision & Mission" },
    { href: "/about", label: "Core Values" },
    { href: "/about", label: "Our Team" },
    { href: "/contact", label: "Work With Us" },
  ],
  programs: [
    { href: "/programs", label: "Sustainable Agriculture" },
    { href: "/programs", label: "Livelihood Support" },
    { href: "/programs", label: "Nutrition & Health" },
    { href: "/programs", label: "Education & Training" },
    { href: "/programs", label: "IDP Support Services" },
    { href: "/programs", label: "Water, Sanitation & Hygiene" },
  ],
  getInvolved: [
    { href: "/donate", label: "Donate" },
    { href: "/#get-involved", label: "Volunteer" },
    { href: "/volunteer/status", label: "Volunteer status" },
    { href: "/partners", label: "Partner With Us" },
  ],
  resources: [
    { href: "/reports", label: "Annual Reports" },
    { href: "/news", label: "News & Stories" },
    { href: "/impact-stories", label: "Impact & Stories" },
    { href: "/partners", label: "Partners" },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter/X" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const { withLang } = useLang();
  if (isAdminRoute) return null;

  const localizeHref = (href: string) =>
    href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") ? href : withLang(href);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-8 border-b border-gray-800">
          <NewsletterSignup />
        </div>

        <div className="hidden grid-cols-1 gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2">
            <Link href={localizeHref("/")} className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-800">
                <Image
                  src="/gallery/logo.jpg"
                  alt="Tsedey Volunteer Service logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-heading font-bold text-white">
                {ORGANIZATION.name}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {ORGANIZATION.tagline}. Building resilient and self-reliant communities 
              in North Shewa through sustainable livelihoods, improved nutrition, 
              and access to essential services.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-sm">{ORGANIZATION.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a 
                  href={`mailto:${ORGANIZATION.email}`}
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  {ORGANIZATION.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a 
                  href={`tel:${ORGANIZATION.phone.replace(/\s/g, '')}`}
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  {ORGANIZATION.phone}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Organization Links */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4">
              Organization
            </h3>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href)}
                    className="text-sm hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4">
              Programs
            </h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href)}
                    className="text-sm hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href)}
                    className="text-sm hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localizeHref(link.href)}
                    className="text-sm hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Accordion Navigation */}
        <div className="space-y-3 sm:hidden">
          <details className="rounded-xl border border-gray-800 bg-gray-950/40 px-4 py-3">
            <summary className="cursor-pointer list-none font-heading font-semibold text-white">Organization</summary>
            <ul className="mt-3 space-y-2">
              {footerLinks.organization.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link href={localizeHref(link.href)} className="text-sm text-gray-300 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-xl border border-gray-800 bg-gray-950/40 px-4 py-3">
            <summary className="cursor-pointer list-none font-heading font-semibold text-white">Programs</summary>
            <ul className="mt-3 space-y-2">
              {footerLinks.programs.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link href={localizeHref(link.href)} className="text-sm text-gray-300 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-xl border border-gray-800 bg-gray-950/40 px-4 py-3">
            <summary className="cursor-pointer list-none font-heading font-semibold text-white">Get Involved</summary>
            <ul className="mt-3 space-y-2">
              {footerLinks.getInvolved.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link href={localizeHref(link.href)} className="text-sm text-gray-300 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <details className="rounded-xl border border-gray-800 bg-gray-950/40 px-4 py-3">
            <summary className="cursor-pointer list-none font-heading font-semibold text-white">Resources</summary>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link href={localizeHref(link.href)} className="text-sm text-gray-300 transition-colors hover:text-primary-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {ORGANIZATION.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href={localizeHref("/contact")} className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href={localizeHref("/contact")} className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href={localizeHref("/contact")} className="hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
              <Link href={localizeHref("/contact")} className="hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>🔒 Secure Donations</span>
            <span>•</span>
            <span>✅ Verified Nonprofit</span>
            <span>•</span>
            <span>🌍 Registered in Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}