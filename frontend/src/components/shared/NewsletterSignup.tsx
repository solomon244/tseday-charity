// src/components/shared/NewsletterSignup.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Subscription failed");
      }
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-5 h-5" />
            <span className="text-sm font-medium text-primary-100">Newsletter</span>
          </div>
          <h3 className="text-xl font-heading font-bold mb-2">
            Stay Updated
          </h3>
          <p className="text-primary-100 text-sm">
            Get the latest news and impact stories from North Shewa.
          </p>
        </div>

        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-left backdrop-blur-sm"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle className="h-5 w-5 shrink-0 text-green-300" aria-hidden />
              You&apos;re subscribed!
            </p>
            <p className="mt-1 text-sm text-primary-100">Thank you — watch your inbox for updates from North Shewa.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-2 w-full sm:w-auto sm:min-w-[20rem]">
            {error ? (
              <p className="rounded-lg border border-red-300/40 bg-red-500/20 px-3 py-2 text-sm text-red-100" role="alert">
                {error}
              </p>
            ) : null}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span>Subscribing...</span>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          </div>
        )}
      </div>
    </motion.div>
  );
}