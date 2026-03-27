import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("contact.toastTitle"),
      description: t("contact.toastDesc", { name: formData.name }),
    });
    setFormData({ name: "", email: "", eventType: "", date: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border px-0 py-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/40 transition-colors duration-300";

  return (
    <section id="contact" className="section-py px-6 relative">
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            {t("contact.titlePrefix")} <span className="text-gradient-chrome">{BRAND_NAME}</span>
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-base">
            {t("contact.description")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2"
        >
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
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.email")}
              required
              maxLength={255}
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
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
              <option value="" disabled>{t("contact.eventType")}</option>
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
              required
              value={formData.date}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <textarea
            name="message"
            placeholder={t("contact.message")}
            rows={4}
            maxLength={1000}
            value={formData.message}
            onChange={handleChange}
            className={inputClasses + " resize-none border border-border px-4 mt-6"}
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-4 mt-8 font-display font-700 text-xs tracking-[0.2em] uppercase hover:bg-foreground/90 transition-colors duration-300"
          >
            {t("contact.send")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
