import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import robotArm from "@/assets/robot-arm.png";
import { BRAND_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";

interface Phase {
  titleKey: string;
  descKey: string;
  position: "left" | "right" | "center";
  highlight?: boolean;
}

const PHASES: Phase[] = [
  { titleKey: "showcase.phase1Title", descKey: "showcase.phase1Desc", position: "left" },
  { titleKey: "showcase.phase2Title", descKey: "showcase.phase2Desc", position: "right", highlight: true },
  { titleKey: "showcase.phase3Title", descKey: "showcase.phase3Desc", position: "left" },
  { titleKey: "showcase.phase4Title", descKey: "showcase.phase4Desc", position: "center", highlight: true },
];

const SCROLL_HEIGHT = "500vh";
const PHASE_COUNT = PHASES.length;

const RobotArmSection = () => {
  const { t } = useI18n();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Arm transforms: smooth cinematic arc ──
  const armRotate = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -12, 8, -6, 0]);
  const armScale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.75, 1, 1.12, 1.05, 0.95]);
  const armX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, -20, 30, -10, 0]);
  const armY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [60, -10, -30, 0]);

  // ── Ambient glow ──
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.15, 0.3, 0.15, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.8]);
  const glowX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["50%", "35%", "65%", "50%"]);

  // ── Camera flash at midpoint ──
  const flashOpacity = useTransform(scrollYProgress, [0.48, 0.5, 0.52], [0, 0.5, 0]);

  // ── Ring / orbit line ──
  const ringOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 0.12, 0.12, 0]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // ── Phase text visibility: each phase gets ~25% of scroll ──
  const phaseAnimations = useMemo(() => {
    return PHASES.map((_, i) => {
      const start = i / PHASE_COUNT;
      const fadeIn = start + 0.02;
      const peak = start + 0.12;
      const fadeOut = start + (1 / PHASE_COUNT) - 0.02;
      return { start, fadeIn, peak, fadeOut };
    });
  }, []);

  // ── Progress bar ──
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Reduced motion: show a static version
  if (prefersReducedMotion) {
    return (
      <section className="section-py px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src={robotArm}
            alt={`${BRAND_NAME} robotic camera arm`}
            className="w-64 md:w-96 mx-auto mb-12 drop-shadow-2xl"
            width={1024}
            height={1024}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PHASES.map((phase, i) => (
              <div key={i} className="text-left">
                <h3 className="font-display text-xl font-800 text-foreground mb-2">
                  {t(phase.titleKey)}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {t(phase.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Ambient glow that drifts */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale, left: glowX }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
        >
          <div className="w-full h-full rounded-full bg-accent/15 blur-[150px]" />
        </motion.div>

        {/* Orbit ring */}
        <motion.div
          style={{ opacity: ringOpacity, rotate: ringRotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[520px] md:h-[520px] rounded-full border border-foreground/[0.06] pointer-events-none"
        />

        {/* Robot arm */}
        <motion.div
          style={{
            rotate: armRotate,
            scale: armScale,
            x: armX,
            y: armY,
          }}
          className="relative z-10 w-[260px] md:w-[420px] lg:w-[500px]"
        >
          <img
            src={robotArm}
            alt={`${BRAND_NAME} robotic camera arm`}
            className="w-full h-auto"
            width={1024}
            height={1024}
            style={{
              filter: "drop-shadow(0 20px 60px hsl(0 0% 0% / 0.5))",
            }}
          />
        </motion.div>

        {/* Camera flash */}
        <motion.div
          style={{ opacity: flashOpacity }}
          className="absolute inset-0 bg-foreground/80 z-20 pointer-events-none"
        />

        {/* Phase text blocks */}
        {PHASES.map((phase, i) => {
          const anim = phaseAnimations[i];
          const opacityVal = useTransform(
            scrollYProgress,
            [anim.start, anim.fadeIn, anim.peak, anim.fadeOut],
            [0, 1, 1, 0]
          );
          const yVal = useTransform(
            scrollYProgress,
            [anim.start, anim.fadeIn, anim.peak, anim.fadeOut],
            [30, 0, 0, -20]
          );

          const positionClasses = {
            left: "left-6 md:left-12 lg:left-20 top-[18%] md:top-[20%] text-left max-w-xs md:max-w-sm",
            right: "right-6 md:right-12 lg:right-20 top-[18%] md:top-[20%] text-right max-w-xs md:max-w-sm",
            center: "left-1/2 -translate-x-1/2 bottom-[16%] md:bottom-[18%] text-center max-w-md",
          };

          return (
            <motion.div
              key={i}
              style={{ opacity: opacityVal, y: yVal }}
              className={`absolute z-10 ${positionClasses[phase.position]}`}
            >
              <h3
                className={`font-display text-2xl sm:text-3xl md:text-5xl font-800 tracking-tight leading-[1.1] ${
                  phase.highlight ? "text-gradient-chrome" : "text-foreground"
                }`}
              >
                {t(phase.titleKey)}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground mt-2 md:mt-3 leading-relaxed">
                {t(phase.descKey)}
              </p>
            </motion.div>
          );
        })}

        {/* Progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 md:w-32 z-10">
          <div className="h-px bg-border w-full">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-foreground/40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotArmSection;
