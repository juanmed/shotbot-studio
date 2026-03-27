// ==========================================
// Site Configuration — Change here to update everywhere
// ==========================================

export const BRAND_NAME = "Shotbot";

export const SITE_CONFIG = {
  brand: BRAND_NAME,
  taglineKey: "brand.tagline",
  descriptionKey: "brand.description",
  contact: {
    email: "hello@shotbot.co",
    phone: "+82 10-0000-0000",
    instagram: "https://instagram.com/shotbot",
    tiktok: "https://tiktok.com/@shotbot",
    kakao: "https://open.kakao.com/o/shotbot",
    whatsapp: "https://wa.me/821000000000",
  },
  cta: {
    primaryKey: "cta.primary",
    secondaryKey: "cta.secondary",
  },
} as const;
