import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolioData";
import { useI18n } from "@/lib/i18n";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}

const PortfolioCard = ({ item, index, onClick }: PortfolioCardProps) => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden ${
        item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
      }`}
    >
      {/* Image */}
      <img
        src={item.poster}
        alt={t(item.titleKey)}
        loading="lazy"
        width={item.width}
        height={item.height}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Always-visible bottom gradient (subtle) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />

      {/* Play icon for video */}
      {item.mediaType === "video" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-foreground/30 bg-background/40 backdrop-blur-sm flex items-center justify-center">
            <Play className="w-4 h-4 md:w-5 md:h-5 text-foreground fill-foreground ml-0.5" />
          </div>
        </div>
      )}

      {/* Text info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
          {t(item.categoryKey)}
        </p>
        <h3 className="font-display text-sm md:text-base font-700 text-foreground leading-tight">
          {t(item.titleKey)}
        </h3>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
