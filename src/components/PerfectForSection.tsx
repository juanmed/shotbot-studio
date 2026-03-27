import { motion } from "framer-motion";
import { Heart, Building2, PartyPopper, Music, Shirt, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const PerfectForSection = () => {
  const { t } = useI18n();

  const items = [
    { icon: Heart, titleKey: "perfectFor.wedding", descKey: "perfectFor.weddingDesc" },
    { icon: Building2, titleKey: "perfectFor.corporate", descKey: "perfectFor.corporateDesc" },
    { icon: PartyPopper, titleKey: "perfectFor.party", descKey: "perfectFor.partyDesc" },
    { icon: Music, titleKey: "perfectFor.nightlife", descKey: "perfectFor.nightlifeDesc" },
    { icon: Shirt, titleKey: "perfectFor.fashion", descKey: "perfectFor.fashionDesc" },
    { icon: Video, titleKey: "perfectFor.content", descKey: "perfectFor.contentDesc" },
  ];

  return (
    <section className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("perfectFor.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight text-foreground">
            {t("perfectFor.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <item.icon className="w-6 h-6 text-muted-foreground mb-5 group-hover:text-foreground transition-colors duration-300" />
              <h3 className="font-display text-lg font-700 mb-2 text-foreground">
                {t(item.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerfectForSection;
