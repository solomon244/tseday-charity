// src/components/shared/MediaLightbox.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Video } from "lucide-react";
import type { MediaItem } from "./MediaCarousel";

interface MediaLightboxProps {
  items: MediaItem[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function MediaLightbox({
  items,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: MediaLightboxProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  if (!isOpen || !items.length) return null;

  const item = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />
          
          {/* Lightbox Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {items.length > 1 && (
              <>
                <button
                  onClick={onPrev}
                  className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={onNext}
                  className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Media Display */}
            <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              
              <div className={`relative w-full ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                {item.type === "video" ? (
                  <video
                    src={item.url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh] rounded-lg shadow-2xl"
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-auto max-h-[70vh] rounded-lg shadow-2xl object-contain"
                  />
                )}
              </div>

              {/* Caption & Info */}
              <div className="mt-4 text-center text-white">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="bg-primary-600/80 text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.type === "video" && (
                    <span className="flex items-center text-sm text-gray-300">
                      <Video className="w-4 h-4 mr-1" /> Video
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold">{item.caption}</h3>
                {item.date && (
                  <p className="text-gray-400 text-sm mt-1">{item.date}</p>
                )}
                
                <a
                  href={item.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 mt-3 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>

              {/* Slide Counter */}
              {items.length > 1 && (
                <div className="mt-3 text-gray-400 text-sm">
                  {currentIndex + 1} / {items.length}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}