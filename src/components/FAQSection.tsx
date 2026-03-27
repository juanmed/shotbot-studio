import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-display text-base md:text-lg font-600 text-foreground pr-4 group-hover:text-foreground/80 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-6" : "max-h-0"}`}
      >
        <p className="font-body text-sm text-muted-foreground leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const { t } = useI18n();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section id="faq" className="section-py px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
            {t("faq.subtitle")}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-800 tracking-tight text-foreground">
            {t("faq.title")}
          </h2>
        </motion.div>

        <div className="border-t border-border">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
