import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const PortfolioSection = () => {
  const { t } = useI18n();

  const portfolioItems = [
    {
      image: portfolio1,
      title: t("portfolio.fashion.title"),
      category: t("portfolio.fashion.category"),
      alt: "Fashion event robotic photography",
    },
    {
      image: portfolio2,
      title: t("portfolio.club.title"),
      category: t("portfolio.club.category"),
      alt: "Nightclub event photography",
    },
    {
      image: portfolio3,
      title: t("portfolio.wedding.title"),
      category: t("portfolio.wedding.category"),
      alt: "Wedding cinematic capture",
    },
    {
      image: portfolio4,
      title: t("portfolio.corporate.title"),
      category: t("portfolio.corporate.category"),
      alt: "Corporate event filming",
    },
  ];

  return (
    <section id="portfolio" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            {t("portfolio.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            {t("portfolio.title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={800}
                height={1000}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2">
                  {item.category}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-700 text-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
