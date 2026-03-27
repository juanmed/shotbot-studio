import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import robotArm from "@/assets/robot-arm.png";
import { BRAND_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

const RobotArmSection = () => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, -15, 10, -5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, -50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, -20, 0]);

  const textOpacity1 = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const textY1 = useTransform(scrollYProgress, [0.05, 0.15], [40, 0]);
  const textOpacity2 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const textY2 = useTransform(scrollYProgress, [0.3, 0.45], [40, 0]);
  const textOpacity3 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const textY3 = useTransform(scrollYProgress, [0.6, 0.75], [40, 0]);

  const flashOpacity = useTransform(scrollYProgress, [0.48, 0.5, 0.52], [0, 0.6, 0]);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-background">
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.3]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          >
            <div className="w-full h-full rounded-full bg-primary/20 blur-[120px]" />
          </motion.div>
        </div>

        <motion.div
          style={{ rotate, scale, x, y }}
          className="relative z-10 w-[300px] md:w-[500px] lg:w-[600px]"
        >
          <img
            src={robotArm}
            alt={`${BRAND_NAME} robotic camera arm`}
            className="w-full h-auto drop-shadow-2xl"
            width={1024}
            height={1024}
          />
        </motion.div>

        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-foreground z-20 pointer-events-none"
        />

        <motion.div
          style={{ opacity: textOpacity1, y: textY1 }}
          className="absolute top-[15%] left-8 md:left-16 z-10 max-w-xs"
        >
          <p className="font-display text-3xl md:text-5xl font-800 tracking-tight text-foreground">
            {t("arm.precision")}
          </p>
          <p className="font-body text-muted-foreground mt-2 text-sm">
            {t("arm.precisionDesc")}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity2, y: textY2 }}
          className="absolute top-[60%] right-8 md:right-16 z-10 max-w-xs text-right"
        >
          <p className="font-display text-3xl md:text-5xl font-800 tracking-tight text-gradient-gold">
            {t("arm.cinematic")}
          </p>
          <p className="font-body text-muted-foreground mt-2 text-sm">
            {t("arm.cinematicDesc")}
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity3, y: textY3 }}
          className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-10 text-center"
        >
          <p className="font-display text-3xl md:text-5xl font-800 tracking-tight text-foreground">
            {t("arm.starMoment")} <span className="text-accent">{t("arm.starMomentHighlight")}</span> {t("arm.starMomentEnd")}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RobotArmSection;
