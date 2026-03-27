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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const mediaVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.3 } },
};

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

  const navBtnClasses =
    "z-10 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-full transition-all duration-300 active:scale-90";

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/96 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 md:top-8 md:right-8 ${navBtnClasses}`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className={`absolute left-3 md:left-8 top-1/2 -translate-y-1/2 ${navBtnClasses}`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className={`absolute right-3 md:right-8 top-1/2 -translate-y-1/2 ${navBtnClasses}`}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <motion.div
            key={item.id}
            variants={mediaVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-background/80 to-transparent"
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-[0.2em] text-muted-foreground/50"
          >
            {(activeIndex ?? 0) + 1} / {items.length}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioLightbox;
