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
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-6"
        >
          {t("brand.tagline")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-800 tracking-tighter leading-[0.9]"
        >
          <span className="text-foreground">{t("hero.line1")}</span>
          <br />
          <span className="text-gradient-gold">{t("hero.line2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-body text-lg md:text-xl text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          {t("hero.description")}
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="inline-block mt-10 px-8 py-4 bg-primary text-primary-foreground font-display font-700 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          {t("hero.cta")}
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">{t("hero.scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-primary/50"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
