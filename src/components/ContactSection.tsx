import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, MessageCircle, Mail } from "lucide-react";
import { BRAND_NAME, SITE_CONFIG } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    eventType: "",
    date: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("contact.toastTitle"),
      description: t("contact.toastDesc", { name: formData.name }),
    });
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border px-0 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-foreground/30 transition-colors duration-300";

  const quickLinks = [
    {
      icon: Instagram,
      labelKey: "contact.quickInstagram",
      href: SITE_CONFIG.contact.instagram,
      external: true,
    },
    {
      icon: MessageCircle,
      labelKey: "contact.quickKakao",
      href: SITE_CONFIG.contact.kakao,
      external: true,
    },
    {
      icon: MessageCircle,
      labelKey: "contact.quickWhatsapp",
      href: SITE_CONFIG.contact.whatsapp,
      external: true,
    },
    {
      icon: Mail,
      labelKey: "contact.quickEmail",
      href: `mailto:${SITE_CONFIG.contact.email}`,
      external: false,
    },
  ];

  return (
    <section id="contact" className="section-py px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            {t("contact.titlePrefix")}{" "}
            <span className="text-gradient-chrome">{BRAND_NAME}</span>
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-5 max-w-md mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center mb-6">
                    <ArrowRight className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-800 text-foreground mb-2">
                    {t("contact.toastTitle")}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {t("contact.toastDesc", { name: formData.name })}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        emailOrPhone: "",
                        eventType: "",
                        date: "",
                        location: "",
                        message: "",
                      });
                    }}
                    className="mt-8 font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground border-b border-border hover:border-foreground/30 pb-1 transition-colors"
                  >
                    {t("contact.send")}
                  </button>
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.name")}
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    autoComplete="name"
                  />
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder={t("contact.emailOrPhone")}
                    required
                    maxLength={255}
                    value={formData.emailOrPhone}
                    onChange={handleChange}
                    className={inputClasses}
                    autoComplete="email"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <select
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="" disabled>
                      {t("contact.eventType")}
                    </option>
                    <option value="wedding">{t("contact.eventWedding")}</option>
                    <option value="corporate">{t("contact.eventCorporate")}</option>
                    <option value="party">{t("contact.eventParty")}</option>
                    <option value="brand">{t("contact.eventBrand")}</option>
                    <option value="nightlife">{t("contact.eventNightlife")}</option>
                    <option value="other">{t("contact.eventOther")}</option>
                  </select>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={inputClasses}
                    aria-label={t("contact.date")}
                  />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder={t("contact.location")}
                  maxLength={200}
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClasses}
                  autoComplete="address-level2"
                />
                <textarea
                  name="message"
                  placeholder={t("contact.message")}
                  rows={3}
                  maxLength={1000}
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses + " resize-none mt-2"}
                />

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-4 mt-6 font-display font-700 text-[11px] tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors duration-300 group"
                >
                  {t("contact.send")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <p className="font-body text-[10px] text-muted-foreground/50 text-center mt-3 tracking-wide">
                  {t("contact.trust")}
                </p>
              </form>
            )}
          </motion.div>

          {/* Quick contact sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground font-600">
              {t("contact.quickTitle")}
            </p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.labelKey}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 py-3 px-4 border border-border hover:border-foreground/20 hover:bg-secondary/20 transition-all duration-300 group"
                >
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="font-body text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                    {t(link.labelKey)}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-2 pt-6 border-t border-border">
              <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
                {SITE_CONFIG.contact.email}
              </p>
              <p className="font-body text-[11px] text-muted-foreground mt-1">
                {SITE_CONFIG.contact.phone}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
