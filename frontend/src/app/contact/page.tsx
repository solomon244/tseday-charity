// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Could not send message");
      }
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-tsedey-light dark:bg-gray-950 pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-tsedey-navy to-tsedey-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-tsedey-cyan max-w-3xl mx-auto">Get in touch with our team in North Shewa</p>
          </AnimatedSection>
        </div>
      </section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-soft flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-tsedey-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-tsedey-navy dark:text-white mb-1">Office Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">North Shewa Zone, Amhara Region<br />Ethiopia</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-soft flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-tsedey-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-tsedey-navy dark:text-white mb-1">Email Address</h3>
                    <a href="mailto:info@tsedeycharity.org" className="text-gray-600 transition-colors hover:text-tsedey-blue dark:text-gray-300 dark:hover:text-tsedey-cyan">
                      info@tsedeycharity.org
                    </a>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-soft flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-tsedey-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-tsedey-navy dark:text-white mb-1">Phone Number</h3>
                    <a href="tel:+251000000000" className="text-gray-600 transition-colors hover:text-tsedey-blue dark:text-gray-300 dark:hover:text-tsedey-cyan">
                      +251 XXX XXX XXX
                    </a>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-soft flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-tsedey-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-tsedey-navy dark:text-white mb-1">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 8:00 AM - 5:00 PM EAT</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-soft">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-heading font-bold text-tsedey-navy dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name *</label>
                        <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tsedey-cyan focus:border-transparent transition-all" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                        <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tsedey-cyan focus:border-transparent transition-all" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inquiry Type</label>
                      <select id="contact-type" name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tsedey-cyan focus:border-transparent transition-all">
                        <option value="general">General Inquiry</option>
                        <option value="donation">Donation Question</option>
                        <option value="volunteer">Volunteer Opportunity</option>
                        <option value="partnership">Partnership Proposal</option>
                        <option value="media">Media Request</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject *</label>
                      <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tsedey-cyan focus:border-transparent transition-all" placeholder="How can we help?" />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
                      <textarea id="contact-message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-tsedey-cyan focus:border-transparent transition-all resize-none" placeholder="Tell us more about your inquiry..." />
                    </div>
                    {submitError ? (
                      <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                        {submitError}
                      </p>
                    ) : null}
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-tsedey-navy to-tsedey-blue text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50">
                      {isSubmitting ? <span>Sending...</span> : <><span>Send Message</span><Send className="w-5 h-5" /></>}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}