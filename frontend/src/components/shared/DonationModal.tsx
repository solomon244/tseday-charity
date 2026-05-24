// src/components/shared/DonationModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { DonationForm } from "@/components/shared/DonationForm";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
              <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-primary-600" />
                  <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Make a Donation</h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <DonationForm onSuccess={onClose} className="p-6" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
