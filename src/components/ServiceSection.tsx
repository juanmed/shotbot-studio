import { motion } from "framer-motion";
import { Camera, Clapperboard, Sparkles, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ServiceSection = () => {
  const { t } = useI18n();

  const services = [
    { icon: Camera, titleKey: "service.roboticTitle", descKey: "service.roboticDesc" },
    { icon: Clapperboard, titleKey: "service.slowmoTitle", descKey: "service.slowmoDesc" },
    { icon: Sparkles, titleKey: "service.deliveryTitle", descKey: "service.deliveryDesc" },
    { icon: Users, titleKey: "service.eventTitle", descKey: "service.eventDesc" },
  ];

  return (
    <section id="service" className="section-py px-6 relative">
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
            {t("service.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight text-foreground">
            {t("service.title")}
          </h2>
          <p className="font-body text-muted-foreground mt-6 max-w-xl mx-auto text-base leading-relaxed">
            {t("service.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group hover:bg-secondary/20 transition-colors duration-500"
            >
              <service.icon className="w-6 h-6 text-muted-foreground mb-5 group-hover:text-foreground transition-colors duration-300" />
              <h3 className="font-display text-lg font-700 mb-3 text-foreground">
                {t(service.titleKey)}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {t(service.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
