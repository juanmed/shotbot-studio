import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolioData";
import { useI18n } from "@/lib/i18n";

interface PortfolioLightboxProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const PortfolioLightbox = ({ items, activeIndex, onClose, onNext, onPrev }: PortfolioLightboxProps) => {
  const { t } = useI18n();
  const item = activeIndex !== null ? items[activeIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Media */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`relative ${
              item.orientation === "portrait"
                ? "max-w-[min(420px,85vw)] max-h-[85vh]"
                : "max-w-[min(900px,90vw)] max-h-[85vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.poster}
              alt={t(item.titleKey)}
              className="w-full h-full object-contain"
              width={item.width}
              height={item.height}
            />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background/80 to-transparent">
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
                {t(item.categoryKey)}
              </p>
              <h3 className="font-display text-base md:text-lg font-700 text-foreground">
                {t(item.titleKey)}
              </h3>
              {item.descriptionKey && (
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {t(item.descriptionKey)}
                </p>
              )}
            </div>
          </motion.div>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-[0.2em] text-muted-foreground">
            {(activeIndex ?? 0) + 1} / {items.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioLightbox;
