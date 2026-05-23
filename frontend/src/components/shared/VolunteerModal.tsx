// src/components/shared/VolunteerModal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, HandHelping } from "lucide-react";
import { FeedbackMessageCard } from "@/components/shared/FeedbackMessageCard";
import { useLang } from "@/components/layout/LangProvider";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const { withLang } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json()) as { refId?: string; error?: string };
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setRefId(data.refId ?? null);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", skills: "", availability: "", motivation: "" });
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <HandHelping className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                    Volunteer Application
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="p-8 sm:p-10">
                  <FeedbackMessageCard
                    variant="success"
                    title="Application received!"
                    description="Thank you for volunteering. Save your reference ID to track your application anytime."
                  >
                    {refId ? (
                      <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reference ID</p>
                        <p className="mt-1 font-mono text-xl font-bold tracking-wide text-tsedey-navy dark:text-white">
                          {refId}
                        </p>
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Link
                        href={
                          refId
                            ? withLang(`/volunteer/status?ref=${encodeURIComponent(refId)}`)
                            : withLang("/volunteer/status")
                        }
                        className="inline-flex justify-center rounded-xl bg-gradient-to-r from-tsedey-navy to-tsedey-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
                      >
                        Track application status
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setRefId(null);
                          onClose();
                        }}
                        className="inline-flex justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </div>
                  </FeedbackMessageCard>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {submitError ? (
                    <FeedbackMessageCard variant="error" title="Submission failed" description={submitError} compact />
                  ) : null}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="volunteer-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        id="volunteer-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="volunteer-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        id="volunteer-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="volunteer-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="volunteer-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="volunteer-skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Skills & Experience *
                    </label>
                    <textarea
                      id="volunteer-skills"
                      name="skills"
                      rows={3}
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your relevant skills..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="volunteer-availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Availability *
                    </label>
                    <select
                      id="volunteer-availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select availability</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="weekends">Weekends only</option>
                      <option value="remote">Remote/Virtual</option>
                      <option value="short-term">Short-term project</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="volunteer-motivation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Why do you want to volunteer? *
                    </label>
                    <textarea
                      id="volunteer-motivation"
                      name="motivation"
                      rows={3}
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      placeholder="Share your motivation..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}