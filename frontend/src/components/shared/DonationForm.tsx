"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, BadgeCheck, CheckCircle, ChevronDown, Smartphone, Landmark } from "lucide-react";
import { FeedbackMessageCard } from "@/components/shared/FeedbackMessageCard";

const amountOptions = [
  { value: 100, impact: "Feeds 2 children" },
  { value: 250, impact: "Feeds a family" },
  { value: 500, impact: "Trains 1 farmer" },
  { value: 1000, impact: "Supports school essentials" },
  { value: 2500, impact: "Boosts a youth enterprise" },
];

const causes = [
  "All Programs",
  "Sustainable Agriculture",
  "Nutrition & Health",
  "IDP Support Services",
  "Education & Training",
  "Water, Sanitation & Hygiene",
  "Livelihood Support",
  "Gender Protection",
  "Peace Building",
];

const paymentMethods = [
  { id: "telebirr", label: "Telebirr / Chapa", icon: Smartphone },
  { id: "cbebirr", label: "CBEBirr", icon: Landmark },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "bank", label: "Bank Transfer", icon: Landmark },
];

type DonationFormProps = {
  onSuccess?: () => void;
  className?: string;
};

export function DonationForm({ onSuccess, className }: DonationFormProps) {
  const [amount, setAmount] = useState<number | "">(250);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [cause, setCause] = useState("All Programs");
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const parsedCustomAmount = customAmount ? Number.parseFloat(customAmount) : 0;
  const finalAmount = customAmount ? parsedCustomAmount : amount;
  const hasValidAmount = Boolean(finalAmount && Number.isFinite(finalAmount) && finalAmount > 0);

  const resetForm = () => {
    setIsComplete(false);
    setAmount(250);
    setCustomAmount("");
    setFrequency("one-time");
    setCause("All Programs");
    setPaymentMethod("telebirr");
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasValidAmount) return;

    setIsProcessing(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          frequency,
          cause,
          paymentMethod,
          currency: "ETB",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Could not record donation");
      }

      setIsComplete(true);
      setTimeout(() => {
        resetForm();
        onSuccess?.();
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Could not record donation");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <div className={className}>
        <FeedbackMessageCard
          variant="success"
          title="Thank you!"
          description={`Your ${frequency === "monthly" ? "monthly " : ""}gift of ${finalAmount} ETB has been recorded.`}
        >
          <div className="rounded-xl border border-green-200/80 bg-white/90 px-4 py-3 text-sm text-green-900 shadow-sm dark:border-green-800/50 dark:bg-gray-900/60 dark:text-green-100">
            <p className="font-medium">Supporting: {cause}</p>
            <p className="mt-1 text-green-800/80 dark:text-green-200/80">
              A receipt will be sent by email. Your generosity helps families in North Shewa.
            </p>
          </div>
        </FeedbackMessageCard>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className ?? ""}`}>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Donation Frequency</label>
        <div className="flex space-x-4">
          {(["one-time", "monthly"] as const).map((freq) => (
            <button
              key={freq}
              type="button"
              onClick={() => setFrequency(freq)}
              className={`flex-1 rounded-lg border-2 px-4 py-3 font-medium transition-all ${
                frequency === freq
                  ? "border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "border-gray-200 text-gray-600 hover:border-primary-300 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              {freq === "one-time" ? "One-Time" : "Monthly"}
            </button>
          ))}
        </div>
        {frequency === "monthly" ? (
          <p className="mt-3 rounded-lg bg-tsedey-cyan/10 px-3 py-2 text-sm font-medium text-tsedey-navy dark:bg-tsedey-cyan/20 dark:text-tsedey-cyan">
            Join 120 monthly supporters creating reliable impact year-round.
          </p>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Direct my gift to</label>
        <div className="relative">
          <select
            value={cause}
            onChange={(e) => setCause(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-800 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            {causes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Select Amount (ETB)</label>
        <div className="mb-4 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          {amountOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setAmount(option.value);
                setCustomAmount("");
              }}
              className={`rounded-lg border-2 px-3 py-3 text-left transition-all ${
                amount === option.value
                  ? "border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                  : "border-gray-200 text-gray-600 hover:border-primary-300 dark:border-gray-700 dark:text-gray-400"
              }`}
            >
              <p className="text-sm font-bold">{option.value} ETB</p>
              <p className="mt-1 text-[11px] leading-tight opacity-90">{option.impact}</p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setAmount("")}
            className={`rounded-lg border-2 px-3 py-3 text-left transition-all ${
              amount === "" && customAmount
                ? "border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                : "border-gray-200 text-gray-600 hover:border-primary-300 dark:border-gray-700 dark:text-gray-400"
            }`}
          >
            <p className="text-sm font-bold">Custom</p>
            <p className="mt-1 text-[11px] leading-tight opacity-90">Choose your amount</p>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 dark:text-gray-400">ETB</span>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="Custom amount in ETB"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount("");
            }}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Method</label>
        <div className="space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 accent-primary-600"
              />
              <method.icon className="h-4 w-4 text-gray-500 dark:text-gray-300" />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
      </div>

      {submitError ? (
        <FeedbackMessageCard variant="error" title="Could not complete donation" description={submitError} compact />
      ) : null}

      <button
        type="submit"
        disabled={isProcessing || !hasValidAmount}
        className="flex w-full items-center justify-center space-x-2 rounded-lg bg-primary-600 px-8 py-4 font-semibold text-white transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isProcessing ? (
          <span>Processing...</span>
        ) : (
          <>
            <ShieldCheck className="h-5 w-5" />
            <span>Donate {finalAmount || "0"} ETB</span>
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-300">
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 dark:bg-gray-800">
          <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
          Secure
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 dark:bg-gray-800">
          <BadgeCheck className="h-3.5 w-3.5 text-tsedey-blue dark:text-tsedey-cyan" />
          Registered NGO
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 dark:bg-gray-800">
          <CheckCircle className="h-3.5 w-3.5 text-tsedey-orange" />
          Receipt emailed
        </span>
      </div>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        100% of your donation supports programs serving vulnerable communities in North Shewa.
      </p>
    </form>
  );
}
