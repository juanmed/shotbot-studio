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
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden ${
        item.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
      }`}
    >
      {/* Image with smooth zoom */}
      <img
        src={item.poster}
        alt={t(item.titleKey)}
        loading="lazy"
        width={item.width}
        height={item.height}
        className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:brightness-75"
      />

      {/* Hover overlay with blur sweep */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

      {/* Always-visible bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-background/70 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Play icon for video — scale + fade entrance */}
      {item.mediaType === "video" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
          <div className="w-14 h-14 rounded-full border border-foreground/25 bg-background/30 backdrop-blur-md flex items-center justify-center group-hover:shadow-[0_0_30px_hsl(0_0%_100%/0.08)] transition-shadow duration-500">
            <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
          </div>
        </div>
      )}

      {/* Text info — slide up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p className="font-body text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
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
