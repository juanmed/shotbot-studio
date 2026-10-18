import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PORTFOLIO_ITEMS } from "@/lib/siteData";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioLightbox from "@/components/PortfolioLightbox";

const PortfolioSection = () => {
  const { t } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % PORTFOLIO_ITEMS.length : null));
  }, []);
  const prevItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length : null));
  }, []);

  return (
    <section id="portfolio" className="section-py px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("portfolio.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-800 tracking-tight text-foreground">
            {t("portfolio.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-2 md:gap-3">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div key={item.id} className="break-inside-avoid">
              <PortfolioCard item={item} index={i} onClick={() => openLightbox(i)} />
            </div>
          ))}
        </div>
      </div>

      <PortfolioLightbox
        items={PORTFOLIO_ITEMS}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextItem}
        onPrev={prevItem}
      />
    </section>
  );
};

export default PortfolioSection;
