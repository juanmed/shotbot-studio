import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { SERVICE_VALUES } from "@/lib/siteData";

const ServiceSection = () => {
  const { t } = useI18n();

  return (
    <section id="service" className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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

        <div className="space-y-0">
          {SERVICE_VALUES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="border-t border-border py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-2 md:gap-12 items-baseline group"
            >
              <h3 className="font-display text-lg md:text-xl font-800 tracking-tight text-foreground group-hover:text-gradient-chrome transition-all duration-500">
                {t(item.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/60 transition-colors duration-500">
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
