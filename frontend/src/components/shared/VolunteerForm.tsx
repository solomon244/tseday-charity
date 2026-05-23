"use client";

import { useState } from "react";
import Link from "next/link";
import { HandHelping } from "lucide-react";
import { FeedbackMessageCard } from "@/components/shared/FeedbackMessageCard";
import { useLang } from "@/components/layout/LangProvider";

export function VolunteerForm() {
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

  if (isSubmitted) {
    return (
      <FeedbackMessageCard
        variant="success"
        title="Application received!"
        description="Thank you for volunteering. Save your reference ID to track your application anytime."
      >
        {refId ? (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reference ID</p>
            <p className="mt-1 font-mono text-xl font-bold tracking-wide text-tsedey-navy dark:text-white">{refId}</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={refId ? withLang(`/volunteer/status?ref=${encodeURIComponent(refId)}`) : withLang("/volunteer/status")}
            className="inline-flex justify-center rounded-xl bg-gradient-to-r from-tsedey-navy to-tsedey-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95"
          >
            Track application status
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setRefId(null);
            }}
            className="inline-flex justify-center rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            Submit another application
          </button>
        </div>
      </FeedbackMessageCard>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
        <HandHelping className="h-6 w-6 text-primary-600" aria-hidden />
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Volunteer Application</h2>
      </div>

      {submitError ? (
        <FeedbackMessageCard variant="error" title="Submission failed" description={submitError} compact />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="volunteer-name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            id="volunteer-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="volunteer-email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email *
          </label>
          <input
            id="volunteer-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="volunteer-phone" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone Number
        </label>
        <input
          id="volunteer-phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="volunteer-skills" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="volunteer-availability" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Availability *
        </label>
        <select
          id="volunteer-availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
        <label htmlFor="volunteer-motivation" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
