import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const OCCASIONS = [
  "perfectFor.wedding",
  "perfectFor.brand",
  "perfectFor.launch",
  "perfectFor.party",
  "perfectFor.vip",
  "perfectFor.corporate",
] as const;

const PerfectForSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-py px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("perfectFor.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-800 tracking-tight text-foreground">
            {t("perfectFor.title")}
          </h2>
        </motion.div>

        {/* Minimal tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {OCCASIONS.map((key, i) => (
            <motion.span
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="font-display text-sm md:text-base font-600 tracking-tight text-foreground/80 border border-border px-5 py-2.5 hover:border-foreground/25 hover:text-foreground transition-all duration-300"
            >
              {t(key)}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PerfectForSection;
