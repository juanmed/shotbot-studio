import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const HowItWorksSection = () => {
  const { t } = useI18n();

  const steps = [
    { num: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
    { num: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
    { num: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
  ];

  return (
    <section className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("howItWorks.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 tracking-tight text-foreground">
            {t("howItWorks.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-background p-8 md:p-10"
            >
              <span className="font-display text-xs tracking-[0.3em] text-muted-foreground/40 uppercase">
                {t("howItWorks.stepLabel")} {step.num}
              </span>
              <h3 className="font-display text-lg font-800 mt-4 mb-3 text-foreground tracking-tight">
                {t(step.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
