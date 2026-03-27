import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { TESTIMONIALS } from "@/lib/siteData";
import { Quote } from "lucide-react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const TestimonialsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("testimonials.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight text-foreground">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-card-gradient border border-border p-8 flex flex-col group hover:border-foreground/10 transition-colors duration-500"
            >
              <Quote className="w-5 h-5 text-muted-foreground/20 mb-6 group-hover:text-muted-foreground/40 transition-colors duration-500" />
              <p className="font-body text-foreground/90 leading-relaxed flex-1 text-sm">
                "{t(item.quoteKey)}"
              </p>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-display text-sm font-700 text-foreground">{t(item.nameKey)}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{t(item.roleKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
