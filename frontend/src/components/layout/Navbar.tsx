// src/components/layout/Navbar.tsx
"use client";

import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown, Sprout, Briefcase, GraduationCap, Home, Droplets, ShieldCheck, Handshake } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { DonationModal } from "@/components/shared/DonationModal";
import { VolunteerModal } from "@/components/shared/VolunteerModal";
import { NAV_LINKS, ORGANIZATION } from "@/lib/constants";
import { DONATION_MODAL_EVENT, VOLUNTEER_MODAL_EVENT } from "@/lib/ctaEvents";
import { useLang } from "@/components/layout/LangProvider";
import { navLabels, programsMenuCopy } from "@/lib/siteCopy";

// Dropdown menu items for Programs
const programsDropdown = [
  { href: "/programs#agriculture", label: "Sustainable Agriculture", description: "Climate-smart farming and food security support.", icon: Sprout },
  { href: "/programs#livelihoods", label: "Livelihood Support", description: "Skills, enterprise, and income pathways for families.", icon: Briefcase },
  { href: "/programs#nutrition", label: "Nutrition & Health", description: "Nutrition assistance for mothers and children.", icon: Heart },
  { href: "/programs#education", label: "Education & Training", description: "School access and practical skills development.", icon: GraduationCap },
  { href: "/programs#idp", label: "IDP Support", description: "Relief and stabilization services for displaced families.", icon: Home },
  { href: "/programs#wash", label: "Water & Sanitation", description: "Safe water and hygiene systems in communities.", icon: Droplets },
  { href: "/programs#gender-protection", label: "Gender Protection", description: "Safety, rights, and support for women, girls, and vulnerable groups.", icon: ShieldCheck },
  { href: "/programs#peace-building", label: "Peace Building", description: "Dialogue, reconciliation, and social cohesion in conflict-affected communities.", icon: Handshake },
];

function LangToggleFallback({ overlay }: { overlay?: boolean }) {
  return (
    <div
      className={`h-9 w-[4.5rem] animate-pulse rounded-full ${overlay ? "bg-white/25" : "bg-gray-200/80 dark:bg-gray-700"}`}
      aria-hidden
    />
  );
}

/** Pages that always use the solid nav bar (readable on any background). */
function usesSolidNav(pathname: string) {
  return (
    pathname === "/" ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/programs") ||
    pathname.startsWith("/contact")
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const { lang, withLang } = useLang();
  const labels = navLabels(lang);
  const programsCopy = programsMenuCopy(lang);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [showFloatingDonate, setShowFloatingDonate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowFloatingDonate(window.scrollY > Math.max(280, window.innerHeight * 0.7));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const openDonation = () => setIsDonateModalOpen(true);
    const openVolunteer = () => setIsVolunteerModalOpen(true);
    window.addEventListener(DONATION_MODAL_EVENT, openDonation);
    window.addEventListener(VOLUNTEER_MODAL_EVENT, openVolunteer);
    return () => {
      window.removeEventListener(DONATION_MODAL_EVENT, openDonation);
      window.removeEventListener(VOLUNTEER_MODAL_EVENT, openVolunteer);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => setIsOpen(false);

  const isHome = pathname === "/";
  const solidBar = scrolled || usesSolidNav(pathname);
  const overlay = !solidBar;
  const navItemClass = overlay
    ? "text-white/90 hover:text-white hover:bg-white/10 dark:text-white/90 dark:hover:text-white dark:hover:bg-white/10"
    : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400";
  const toggleVariant = overlay ? "overlay" : "default";
  if (isAdminRoute) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solidBar
            ? "border-b border-gray-200/90 bg-white/98 shadow-md backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/98"
            : "bg-transparent"
        } ${isHome && !scrolled ? "border-b-2 border-tsedey-cyan/40" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href={withLang("/")}
              className="flex items-center space-x-2 group"
              onClick={handleNavClick}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className={`relative h-12 w-12 overflow-hidden rounded-full ring-2 ${overlay ? "ring-white/45 dark:ring-white/35" : "ring-primary-100 dark:ring-gray-700"}`}
              >
                <Image
                  src="/gallery/logo.jpg"
                  alt="Tsedey Volunteer Service logo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span
                  className={`text-sm font-heading font-bold leading-tight ${overlay ? "text-white drop-shadow-sm" : "text-gray-900 dark:text-white"}`}
                >
                  {ORGANIZATION.name}
                </span>
                <span className={`text-xs ${overlay ? "text-white/80" : "text-gray-600 dark:text-gray-400"}`}>{ORGANIZATION.tagline}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                if (link.label === "Programs") {
                  return (
                    <div 
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setIsProgramsOpen(true)}
                      onMouseLeave={() => setIsProgramsOpen(false)}
                    >
                      <button
                        className={`flex items-center space-x-1 transition-colors font-medium py-2 px-3 rounded-lg ${navItemClass}`}
                        aria-haspopup="true"
                        aria-expanded={isProgramsOpen}
                      >
                        <span>{labels[link.label] ?? link.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isProgramsOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 top-full z-50 mt-2 w-[34rem] rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800"
                          >
                            <div className="mb-3 flex items-center justify-between px-2">
                              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{programsCopy.areas}</p>
                              <Link href={withLang("/programs")} className="text-xs font-semibold text-tsedey-blue hover:underline dark:text-tsedey-cyan" onClick={() => setIsProgramsOpen(false)}>
                                {programsCopy.viewAll}
                              </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {programsDropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={withLang(item.href)}
                                  className="rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-tsedey-cyan/30 hover:bg-gray-50 dark:hover:bg-gray-700"
                                  onClick={() => setIsProgramsOpen(false)}
                                >
                                  <div className="mb-2 flex items-center gap-2">
                                    <item.icon className="h-4 w-4 text-tsedey-blue dark:text-tsedey-cyan" />
                                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{item.label}</span>
                                  </div>
                                  <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">{item.description}</p>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={link.href}
                    href={withLang(link.href)}
                    onClick={handleNavClick}
                    className={`transition-colors font-medium py-2 px-3 rounded-lg ${navItemClass}`}
                  >
                    {labels[link.label] ?? link.label}
                  </Link>
                );
              })}
              
              {/* Theme + language */}
              <div className="ml-2 flex items-center gap-2">
                <Suspense fallback={<LangToggleFallback overlay={overlay} />}>
                  <LanguageToggle variant={toggleVariant} />
                </Suspense>
                <ThemeToggle variant={toggleVariant} />
              </div>
              
              {/* Donate Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDonateModalOpen(true)}
                className="ml-4 flex items-center space-x-2 rounded-full bg-gradient-to-r from-tsedey-red to-tsedey-orange px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:shadow-md"
              >
                <Heart className="w-4 h-4" />
                <span>{labels.Donate}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Suspense fallback={<LangToggleFallback overlay={overlay} />}>
                <LanguageToggle variant={toggleVariant} />
              </Suspense>
              <ThemeToggle variant={toggleVariant} />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  overlay
                    ? "text-white hover:bg-white/15"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {NAV_LINKS.map((link) => {
                  if (link.label === "Programs") {
                    return (
                      <div key={link.href} className="space-y-1">
                        <button
                          onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                          className="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-3 px-4 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span>{labels[link.label] ?? link.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isProgramsOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isProgramsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {programsDropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={withLang(item.href)}
                                  onClick={handleNavClick}
                                  className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                >
                                  <item.icon className="h-4 w-4" />
                                  <span>{item.label}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={link.href}
                      href={withLang(link.href)}
                      onClick={handleNavClick}
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 py-3 px-4 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      {labels[link.label] ?? link.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Donate Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                    setIsDonateModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-full font-medium mt-4 hover:bg-primary-700 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>{labels.Donate}</span>
                </motion.button>
                
                {/* Mobile Volunteer Link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsVolunteerModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 px-6 py-3 rounded-full font-medium mt-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <span>{labels.Volunteer}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Modals */}
      <DonationModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
      />
      <VolunteerModal 
        isOpen={isVolunteerModalOpen} 
        onClose={() => setIsVolunteerModalOpen(false)} 
      />
      <AnimatePresence>
        {showFloatingDonate && !isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => setIsDonateModalOpen(true)}
            className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-tsedey-red to-tsedey-orange px-5 py-3 text-sm font-bold text-white shadow-xl lg:hidden"
          >
            <Heart className="h-4 w-4" />
            {labels.Donate}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}