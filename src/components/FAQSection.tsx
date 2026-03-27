import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { FAQ_ITEMS } from "@/lib/siteData";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItemComponent = ({ question, answer, index }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-border group"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="font-display text-base md:text-lg font-600 text-foreground pr-4 group-hover:text-foreground/80 transition-colors duration-300">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-all duration-400 ease-out ${open ? "rotate-180 text-foreground" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-400 ease-out ${open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="font-body text-sm text-muted-foreground leading-relaxed pr-8">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const { t } = useI18n();

  return (
    <section id="faq" className="section-py px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
          {FAQ_ITEMS.map((faq, i) => (
            <FAQItemComponent key={i} question={t(faq.questionKey)} answer={t(faq.answerKey)} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14"
        >
          <p className="font-body text-sm text-muted-foreground mb-5">
            {t("faq.stillQuestions")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-foreground/20 text-foreground font-display font-700 text-[11px] tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
          >
            {t("cta.primary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
