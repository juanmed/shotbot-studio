/**
 * ============================================
 * SITE DATA — Single source of truth for all content
 * ============================================
 *
 * Edit this file to update portfolio items, testimonials,
 * FAQ entries, service values, hero videos, navigation, etc.
 *
 * All translatable text uses i18n keys (see i18n.tsx).
 * All media assets are imported at the top for easy swapping.
 */

import { Instagram, MessageCircle, Mail, type LucideIcon } from "lucide-react";

// ── Asset imports (swap these when real media is ready) ──────────
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";

// ── Types ────────────────────────────────────────────────────────

export type MediaOrientation = "portrait" | "landscape";
export type MediaType = "image" | "video";
export type PortfolioCategory = "all" | "wedding" | "party" | "brand" | "corporate" | "nightlife";

export interface PortfolioItem {
  id: string;
  poster: string;
  /** Optional source URL for video playback (e.g. mp4, YouTube embed) */
  sourceUrl?: string;
  mediaType: MediaType;
  orientation: MediaOrientation;
  titleKey: string;
  categoryKey: string;
  category: PortfolioCategory;
  descriptionKey?: string;
  width: number;
  height: number;
}

export interface PortfolioCategoryFilter {
  key: PortfolioCategory;
  labelKey: string;
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface ServiceValue {
  titleKey: string;
  descKey: string;
}

export interface ShowcasePhase {
  titleKey: string;
  descKey: string;
  position: "left" | "right" | "center";
  highlight?: boolean;
}

export interface ProcessStep {
  num: string;
  titleKey: string;
  descKey: string;
}

export interface Testimonial {
  quoteKey: string;
  nameKey: string;
  roleKey: string;
}

export interface FAQItem {
  questionKey: string;
  answerKey: string;
}

export interface QuickContactLink {
  icon: LucideIcon;
  labelKey: string;
  href: string;
  external: boolean;
}

// ── Navigation ───────────────────────────────────────────────────

export const NAV_LINKS: NavLink[] = [
  { labelKey: "nav.service", href: "#service" },
  { labelKey: "nav.portfolio", href: "#portfolio" },
  { labelKey: "nav.faq", href: "#faq" },
  { labelKey: "nav.contact", href: "#contact" },
];

// ── Hero videos (YouTube IDs — replace with your own) ────────────

export const HERO_VIDEO_IDS = ["TpKQTbpT5ko", "_Tln3TFsFH0", "fg5H18wtEnM"];

// ── Showcase phases (robot arm scroll section) ───────────────────

export const SHOWCASE_PHASES: ShowcasePhase[] = [
  { titleKey: "showcase.phase1Title", descKey: "showcase.phase1Desc", position: "left" },
  { titleKey: "showcase.phase2Title", descKey: "showcase.phase2Desc", position: "right", highlight: true },
  { titleKey: "showcase.phase3Title", descKey: "showcase.phase3Desc", position: "left" },
  { titleKey: "showcase.phase4Title", descKey: "showcase.phase4Desc", position: "center", highlight: true },
];

// ── Service value propositions ───────────────────────────────────

export const SERVICE_VALUES: ServiceValue[] = [
  { titleKey: "service.v1Title", descKey: "service.v1Desc" },
  { titleKey: "service.v2Title", descKey: "service.v2Desc" },
  { titleKey: "service.v3Title", descKey: "service.v3Desc" },
  { titleKey: "service.v4Title", descKey: "service.v4Desc" },
  { titleKey: "service.v5Title", descKey: "service.v5Desc" },
];

// ── Portfolio ────────────────────────────────────────────────────

export const PORTFOLIO_CATEGORIES: PortfolioCategoryFilter[] = [
  { key: "all", labelKey: "portfolio.filter.all" },
  { key: "wedding", labelKey: "portfolio.filter.wedding" },
  { key: "party", labelKey: "portfolio.filter.party" },
  { key: "brand", labelKey: "portfolio.filter.brand" },
  { key: "corporate", labelKey: "portfolio.filter.corporate" },
  { key: "nightlife", labelKey: "portfolio.filter.nightlife" },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "fashion-night",
    poster: portfolio1,
    mediaType: "video",
    orientation: "portrait",
    titleKey: "portfolio.item.fashionNight",
    categoryKey: "portfolio.cat.party",
    category: "party",
    descriptionKey: "portfolio.item.fashionNightDesc",
    width: 768,
    height: 1024,
  },
  {
    id: "club-noir",
    poster: portfolio2,
    mediaType: "video",
    orientation: "landscape",
    titleKey: "portfolio.item.clubNoir",
    categoryKey: "portfolio.cat.nightlife",
    category: "nightlife",
    descriptionKey: "portfolio.item.clubNoirDesc",
    width: 1024,
    height: 768,
  },
  {
    id: "laurent-wedding",
    poster: portfolio3,
    mediaType: "video",
    orientation: "portrait",
    titleKey: "portfolio.item.laurentWedding",
    categoryKey: "portfolio.cat.wedding",
    category: "wedding",
    descriptionKey: "portfolio.item.laurentWeddingDesc",
    width: 768,
    height: 1024,
  },
  {
    id: "scandic-launch",
    poster: portfolio4,
    mediaType: "image",
    orientation: "landscape",
    titleKey: "portfolio.item.scandicLaunch",
    categoryKey: "portfolio.cat.corporate",
    category: "corporate",
    descriptionKey: "portfolio.item.scandicLaunchDesc",
    width: 1024,
    height: 768,
  },
  {
    id: "gold-gala",
    poster: portfolio5,
    mediaType: "video",
    orientation: "portrait",
    titleKey: "portfolio.item.goldGala",
    categoryKey: "portfolio.cat.party",
    category: "party",
    descriptionKey: "portfolio.item.goldGalaDesc",
    width: 768,
    height: 1024,
  },
  {
    id: "brand-reveal",
    poster: portfolio6,
    mediaType: "video",
    orientation: "landscape",
    titleKey: "portfolio.item.brandReveal",
    categoryKey: "portfolio.cat.brand",
    category: "brand",
    descriptionKey: "portfolio.item.brandRevealDesc",
    width: 1024,
    height: 768,
  },
  {
    id: "first-dance",
    poster: portfolio7,
    mediaType: "video",
    orientation: "portrait",
    titleKey: "portfolio.item.firstDance",
    categoryKey: "portfolio.cat.wedding",
    category: "wedding",
    descriptionKey: "portfolio.item.firstDanceDesc",
    width: 768,
    height: 1024,
  },
  {
    id: "dj-night",
    poster: portfolio8,
    mediaType: "video",
    orientation: "landscape",
    titleKey: "portfolio.item.djNight",
    categoryKey: "portfolio.cat.nightlife",
    category: "nightlife",
    descriptionKey: "portfolio.item.djNightDesc",
    width: 1024,
    height: 768,
  },
];

// ── "Perfect For" occasions ──────────────────────────────────────

export const OCCASION_KEYS = [
  "perfectFor.wedding",
  "perfectFor.brand",
  "perfectFor.launch",
  "perfectFor.party",
  "perfectFor.vip",
  "perfectFor.corporate",
] as const;

// ── Process steps ────────────────────────────────────────────────

export const PROCESS_STEPS: ProcessStep[] = [
  { num: "01", titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc" },
  { num: "02", titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc" },
  { num: "03", titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc" },
];

// ── Testimonials ─────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  { quoteKey: "testimonials.1.quote", nameKey: "testimonials.1.name", roleKey: "testimonials.1.role" },
  { quoteKey: "testimonials.2.quote", nameKey: "testimonials.2.name", roleKey: "testimonials.2.role" },
  { quoteKey: "testimonials.3.quote", nameKey: "testimonials.3.name", roleKey: "testimonials.3.role" },
];

// ── FAQ ──────────────────────────────────────────────────────────

export const FAQ_ITEMS: FAQItem[] = [
  { questionKey: "faq.q1", answerKey: "faq.a1" },
  { questionKey: "faq.q2", answerKey: "faq.a2" },
  { questionKey: "faq.q3", answerKey: "faq.a3" },
  { questionKey: "faq.q4", answerKey: "faq.a4" },
  { questionKey: "faq.q5", answerKey: "faq.a5" },
];

// ── Event type options (contact form) ────────────────────────────

export const EVENT_TYPES = [
  { value: "wedding", labelKey: "contact.eventWedding" },
  { value: "corporate", labelKey: "contact.eventCorporate" },
  { value: "party", labelKey: "contact.eventParty" },
  { value: "brand", labelKey: "contact.eventBrand" },
  { value: "nightlife", labelKey: "contact.eventNightlife" },
  { value: "other", labelKey: "contact.eventOther" },
] as const;

// ── Quick contact links (built from SITE_CONFIG) ─────────────────
// Import SITE_CONFIG to resolve URLs at runtime

import { SITE_CONFIG } from "@/lib/constants";

export const QUICK_CONTACT_LINKS: QuickContactLink[] = [
  { icon: Instagram, labelKey: "contact.quickInstagram", href: SITE_CONFIG.contact.instagram, external: true },
  { icon: MessageCircle, labelKey: "contact.quickKakao", href: SITE_CONFIG.contact.kakao, external: true },
  { icon: MessageCircle, labelKey: "contact.quickWhatsapp", href: SITE_CONFIG.contact.whatsapp, external: true },
  { icon: Mail, labelKey: "contact.quickEmail", href: `mailto:${SITE_CONFIG.contact.email}`, external: false },
];
