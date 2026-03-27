import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const ServiceSection = () => {
  const { t } = useI18n();

  const values = [
    { titleKey: "service.v1Title", descKey: "service.v1Desc" },
    { titleKey: "service.v2Title", descKey: "service.v2Desc" },
    { titleKey: "service.v3Title", descKey: "service.v3Desc" },
    { titleKey: "service.v4Title", descKey: "service.v4Desc" },
    { titleKey: "service.v5Title", descKey: "service.v5Desc" },
  ];

  return (
    <section id="service" className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("service.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight text-foreground leading-[1.05]">
            {t("service.title")}
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-6 max-w-lg mx-auto leading-relaxed">
            {t("service.description")}
          </p>
        </motion.div>

        {/* Value propositions — alternating layout */}
        <div className="space-y-0">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="border-t border-border py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-2 md:gap-12 items-baseline"
            >
              <h3 className="font-display text-lg md:text-xl font-800 tracking-tight text-foreground">
                {t(item.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
