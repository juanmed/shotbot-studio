import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";

export type MediaOrientation = "portrait" | "landscape";
export type MediaType = "image" | "video";

export type PortfolioCategory =
  | "all"
  | "wedding"
  | "party"
  | "brand"
  | "corporate"
  | "nightlife";

export interface PortfolioItem {
  id: string;
  poster: string;
  mediaType: MediaType;
  orientation: MediaOrientation;
  titleKey: string;
  categoryKey: string;
  category: PortfolioCategory;
  descriptionKey?: string;
  /** Width & height of the poster for aspect-ratio hints */
  width: number;
  height: number;
}

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

export const PORTFOLIO_CATEGORIES: { key: PortfolioCategory; labelKey: string }[] = [
  { key: "all", labelKey: "portfolio.filter.all" },
  { key: "wedding", labelKey: "portfolio.filter.wedding" },
  { key: "party", labelKey: "portfolio.filter.party" },
  { key: "brand", labelKey: "portfolio.filter.brand" },
  { key: "corporate", labelKey: "portfolio.filter.corporate" },
  { key: "nightlife", labelKey: "portfolio.filter.nightlife" },
];
