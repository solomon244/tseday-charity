// src/components/shared/MediaCarousel.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Pause, Play, Maximize2, 
  Video
} from "lucide-react";
import { MediaLightbox } from "./MediaLightbox";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  caption: string;
  category: "Volunteers" | "Events" | "Impact" | "Community" | "Training";
  date?: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  title?: string;
  subtitle?: string;
  autoPlayInterval?: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

const categories = ["All", "Volunteers", "Events", "Impact", "Community", "Training"];

export function MediaCarousel({ 
  items, 
  title = "Our Stories & Memories", 
  subtitle = "Capturing moments of hope, service, and community transformation",
  autoPlayInterval = 5000 
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items by category
  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  // Ensure currentIndex is within bounds after filtering
  const safeIndex = Math.min(currentIndex, Math.max(0, filteredItems.length - 1));
  const currentItem = filteredItems[safeIndex];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const len = filteredItems.length;
      if (len === 0) return 0;
      return (prev + newDirection + len) % len;
    });
  }, [filteredItems.length]);

  const goToSlide = (index: number) => {
    setDirection(index > safeIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (isPaused || filteredItems.length <= 1) return;
    
    timerRef.current = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, filteredItems.length, autoPlayInterval, paginate]);

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No media items available in this category.
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-16 bg-gray-50 dark:bg-gray-800/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Media gallery carousel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentIndex(0); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary-600 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black aspect-[16/9] md:aspect-[21/9]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Media Display */}
              <div className="relative w-full h-full group">
                {currentItem.type === "video" ? (
                  <video
                    src={currentItem.url}
                    poster={currentItem.thumbnail}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    autoPlay
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={currentItem.url}
                    alt={currentItem.caption}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Caption & Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary-600/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {currentItem.category}
                    </span>
                    {currentItem.date && (
                      <span className="text-gray-300 text-sm">{currentItem.date}</span>
                    )}
                    {currentItem.type === "video" && (
                      <span className="flex items-center text-gray-300 text-sm">
                        <Video className="w-4 h-4 mr-1" /> Video
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                    {currentItem.caption}
                  </h3>
                  <button
                    onClick={() => openLightbox(safeIndex)}
                    className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                    aria-label="View full screen"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>View Full</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/50 transition-colors"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
          >
            {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => goToSlide(idx)}
              className={`relative flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden transition-all border-2 ${
                idx === safeIndex 
                  ? "border-primary-600 scale-105 shadow-lg" 
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${item.caption}`}
              aria-current={idx === safeIndex}
            >
              {item.type === "video" ? (
                <video src={item.url} poster={item.thumbnail} className="w-full h-full object-cover" muted preload="metadata" />
              ) : (
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Video className="w-5 h-5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {filteredItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === safeIndex ? "bg-primary-600 w-6" : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <MediaLightbox
        items={filteredItems}
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
      />
    </section>
  );
}