import { motion } from "framer-motion";
import { BRAND_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt={t("hero.imgAlt")}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-8"
        >
          {t("brand.tagline")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display text-5xl md:text-8xl lg:text-9xl font-800 tracking-tighter leading-[0.9]"
        >
          <span className="text-foreground">{t("hero.line1")}</span>
          <br />
          <span className="text-gradient-chrome">{t("hero.line2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-body text-base md:text-lg text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a
            href="#contact"
            className="px-10 py-4 bg-foreground text-background font-display font-700 text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors duration-300"
          >
            {t("hero.cta")}
          </a>
          <a
            href="#portfolio"
            className="px-10 py-4 border border-border text-foreground font-display font-700 text-xs tracking-[0.2em] uppercase hover:border-foreground/30 transition-colors duration-300"
          >
            {t("cta.secondary")}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{t("hero.scroll")}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-6 bg-foreground/20"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
