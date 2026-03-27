import { BRAND_NAME, SITE_CONFIG } from "@/lib/constants";
import { useI18n } from "@/lib/i18n";
import { Instagram } from "lucide-react";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-sm font-700 text-foreground tracking-tight">
          {BRAND_NAME}
        </p>
        <div className="flex items-center gap-6 text-muted-foreground">
          <a
            href={SITE_CONFIG.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a href="#faq" className="font-body text-xs hover:text-foreground transition-colors">
            {t("nav.faq")}
          </a>
          <a href="#contact" className="font-body text-xs hover:text-foreground transition-colors">
            {t("nav.contact")}
          </a>
        </div>
        <p className="font-body text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
