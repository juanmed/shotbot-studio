import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES, type PortfolioCategory } from "@/lib/siteData";
import PortfolioCard from "@/components/PortfolioCard";
import PortfolioLightbox from "@/components/PortfolioLightbox";

const PortfolioSection = () => {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => activeFilter === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === activeFilter),
    [activeFilter]
  );

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
  }, [filtered.length]);
  const prevItem = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-14"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`font-body text-[10px] md:text-[11px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === cat.key
                  ? "border-foreground/40 text-foreground bg-foreground/5"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-2 md:gap-3">
          {filtered.map((item, i) => (
            <div key={item.id} className="break-inside-avoid">
              <PortfolioCard item={item} index={i} onClick={() => openLightbox(i)} />
            </div>
          ))}
        </div>
      </div>

      <PortfolioLightbox
        items={filtered}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onNext={nextItem}
        onPrev={prevItem}
      />
    </section>
  );
};

export default PortfolioSection;
