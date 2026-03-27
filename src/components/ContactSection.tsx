import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
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
    "w-full bg-secondary border border-border px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300";

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            {t("contact.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            {t("contact.titlePrefix")} <span className="text-gradient-gold">{BRAND_NAME}</span>
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg">
            {t("contact.description")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            rows={5}
            maxLength={1000}
            value={formData.message}
            onChange={handleChange}
            className={inputClasses + " resize-none"}
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 font-display font-700 text-sm tracking-widest uppercase hover:opacity-90 transition-opacity duration-300"
          >
            <Send className="w-4 h-4" />
            {t("contact.send")}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
