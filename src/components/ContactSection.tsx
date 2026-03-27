import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { BRAND_NAME } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
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
      title: "Inquiry Sent!",
      description: `Thanks ${formData.name}! We'll get back to you within 24 hours.`,
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
            Let's Work Together
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight">
            GET <span className="text-gradient-gold">{BRAND_NAME}</span>
          </h2>
          <p className="font-body text-muted-foreground mt-6 text-lg">
            Ready to make your event unforgettable? Drop us a line.
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
              placeholder="Your Name"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              <option value="" disabled>Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Event</option>
              <option value="party">Private Party</option>
              <option value="brand">Brand Launch</option>
              <option value="nightlife">Nightlife / Club</option>
              <option value="other">Other</option>
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
            placeholder="Tell us about your event..."
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
            Send Inquiry
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
