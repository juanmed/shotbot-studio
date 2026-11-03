// ==========================================
// Site Configuration — Change here to update everywhere
// ==========================================

export const BRAND_NAME = "SelkaBot";

export const SITE_CONFIG = {
  brand: BRAND_NAME,
  taglineKey: "brand.tagline",
  descriptionKey: "brand.description",
  contact: {
    email: "hello@selkabot.com",
    phone: "010 8505 9134",
    facebook: "https://www.facebook.com/profile.php?id=61595766642947",
    tiktok: "https://tiktok.com/@shotbot",
    kakao: "https://open.kakao.com/o/smyU26Si",
    instagram: "https://www.instagram.com/selkabot",
  },
  // Web3Forms public access key: contact form submissions are emailed to the address it was created with
  web3formsKey: "c63a76f7-0c98-4bf2-a3dc-cc1c0aabb4dc",
  cta: {
    primaryKey: "cta.primary",
    secondaryKey: "cta.secondary",
  },
} as const;
