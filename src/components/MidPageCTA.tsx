import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface MidPageCTAProps {
  headlineKey: string;
  primaryHref?: string;
  primaryKey?: string;
  secondaryHref?: string;
  secondaryKey?: string;
}

const MidPageCTA = ({
  headlineKey,
  primaryHref = "#contact",
  primaryKey = "cta.primary",
  secondaryHref = "#portfolio",
  secondaryKey = "cta.secondary",
}: MidPageCTAProps) => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="py-16 md:py-24 px-6 text-center"
    >
      <p className="font-display text-2xl md:text-4xl font-800 tracking-tight text-foreground mb-8 max-w-lg mx-auto leading-[1.15]">
        {t(headlineKey)}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={primaryHref}
          className="btn-premium group flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-display font-700 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_0%_100%/0.08)]"
        >
          {t(primaryKey)}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </a>
        {secondaryHref && (
          <a
            href={secondaryHref}
            className="px-8 py-3.5 border border-foreground/15 text-foreground/70 font-display font-700 text-[11px] tracking-[0.2em] uppercase hover:border-foreground/30 hover:text-foreground transition-all duration-300"
          >
            {t(secondaryKey)}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default MidPageCTA;
