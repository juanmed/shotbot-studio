import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BRAND_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg.jpg";

const VIDEO_IDS = ["TpKQTbpT5ko", "_Tln3TFsFH0", "fg5H18wtEnM"];

const buildEmbedUrl = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1`;

interface VideoColumnProps {
  videoId: string;
  index: number;
}

const VideoColumn = ({ videoId, index }: VideoColumnProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.8, delay: 0.3 + index * 0.2, ease: "easeOut" }}
    className="relative h-full flex-1 min-w-0 overflow-hidden"
  >
    <iframe
      src={buildEmbedUrl(videoId)}
      title={`${BRAND_NAME} showcase ${index + 1}`}
      allow="autoplay; encrypted-media"
      allowFullScreen={false}
      className="absolute inset-0 w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
      style={{ border: 0 }}
      loading="lazy"
    />
  </motion.div>
);

const HeroSection = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Layer 0 — Fallback poster image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt={t("hero.imgAlt")}
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </div>

      {/* Layer 1 — Video runway */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 flex gap-px origin-center"
      >
        {VIDEO_IDS.map((id, i) => (
          <VideoColumn key={id} videoId={id} index={i} />
        ))}
      </motion.div>

      {/* Layer 2 — Gradient overlays for readability */}
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />

      {/* Layer 3 — Subtle ambient glow */}
      <motion.div
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/20 blur-[200px] pointer-events-none"
      />

      {/* Layer 4 — Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="font-body text-[10px] md:text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6 md:mb-8"
        >
          {t("brand.tagline")}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-800 tracking-tighter leading-[0.9]"
        >
          <span className="text-foreground">{t("hero.line1")}</span>
          <br />
          <span className="text-gradient-chrome">{t("hero.line2")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="font-body text-sm sm:text-base md:text-lg text-muted-foreground mt-6 md:mt-8 max-w-md mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 md:mt-12"
        >
          <a
            href="#contact"
            className="group relative px-10 py-4 bg-foreground text-background font-display font-700 text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_hsl(0_0%_100%/0.1)]"
          >
            <span className="relative z-10">{t("hero.cta")}</span>
            <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
          <a
            href="#portfolio"
            className="px-10 py-4 border border-foreground/15 text-foreground/80 font-display font-700 text-[11px] tracking-[0.2em] uppercase hover:border-foreground/30 hover:text-foreground transition-all duration-300"
          >
            {t("cta.secondary")}
          </a>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="font-body text-[10px] md:text-[11px] text-muted-foreground/60 mt-4 tracking-wide"
        >
          {t("hero.microcopy")}
        </motion.p>
      </motion.div>

      {/* Layer 5 — Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          {t("hero.scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-5 bg-foreground/15"
        />
      </motion.div>

      {/* Layer 6 — Top & bottom edge vignettes */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
