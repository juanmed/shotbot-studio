import { BRAND_NAME } from "@/lib/constants";
import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg font-700 text-gradient-gold">
          {BRAND_NAME}
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
