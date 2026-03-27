import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const FloatingCTA = () => {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-foreground text-background font-display font-700 text-[10px] tracking-[0.2em] uppercase shadow-[0_4px_24px_hsl(0_0%_0%/0.4)] hover:bg-foreground/90 transition-colors duration-300"
        >
          {t("contact.floatingCta")}
          <ArrowUp className="w-3.5 h-3.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
