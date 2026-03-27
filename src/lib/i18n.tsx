import { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "ko" | "en";

type Translations = { [key: string]: string };

const translations: Record<Locale, Translations> = {
  ko: {
    // Brand
    "brand.tagline": "이벤트 촬영의 미래",
    "brand.description": "시네마틱 로봇 팔이 당신을 중심으로 회전하며 촬영 — 모든 이벤트를 잊을 수 없는 순간으로 만듭니다.",

    // CTA
    "cta.primary": "예약 문의",
    "cta.secondary": "포트폴리오 보기",

    // Nav
    "nav.service": "서비스",
    "nav.portfolio": "포트폴리오",
    "nav.faq": "FAQ",
    "nav.contact": "문의하기",

    // Hero
    "hero.line1": "당신이 주인공인",
    "hero.line2": "그 순간.",
    "hero.description": "로봇 카메라 팔이 당신을 중심으로 공전하며 — 잊을 수 없는 시네마틱 영상을 만들어냅니다.",
    "hero.cta": "예약 문의",
    "hero.scroll": "스크롤",
    "hero.imgAlt": "화려한 이벤트 현장",
    "hero.microcopy": "무료 상담 · 맞춤 견적 · 24시간 내 응답",

    // Scroll showcase
    "showcase.phase1Title": "시네마틱 모션",
    "showcase.phase1Desc": "로봇 팔이 당신을 중심으로 부드럽게 공전하며 영화 같은 궤도 촬영을 만들어냅니다",
    "showcase.phase2Title": "압도적인 비주얼",
    "showcase.phase2Desc": "고속 카메라와 정밀한 로봇 움직임이 만나 숨이 멎는 슬로우 모션을 탄생시킵니다",
    "showcase.phase3Title": "글래머 & 판타지",
    "showcase.phase3Desc": "일상을 벗어난 환상적인 순간 — 모든 시선이 당신에게 집중됩니다",
    "showcase.phase4Title": "시선을 사로잡다",
    "showcase.phase4Desc": "SNS에서 멈출 수 없는 콘텐츠. 한 번 보면 잊을 수 없는 영상",

    // Service — emotional outcomes
    "service.subtitle": "왜 특별한가",
    "service.title": "보는 순간 알게 됩니다",
    "service.description": "포즈를 취하세요. 나머지는 로봇이 합니다. 영화 같은 영상이 바로 당신의 손안에.",
    "service.v1Title": "시네마틱 모션",
    "service.v1Desc": "카메라가 당신을 중심으로 공전합니다. 영화에서만 보던 궤도 촬영이 현실이 됩니다.",
    "service.v2Title": "SNS를 멈추는 콘텐츠",
    "service.v2Desc": "스크롤을 멈추게 하는 슬로우 모션. 필터 없이도 완벽한, 공유하고 싶은 영상.",
    "service.v3Title": "이벤트의 중심",
    "service.v3Desc": "게스트들이 줄 서서 촬영합니다. 당신의 이벤트를 화제의 중심으로 만드세요.",
    "service.v4Title": "잊을 수 없는 경험",
    "service.v4Desc": "사진이 아닌 경험. 게스트들이 오래도록 기억하고 이야기할 특별한 순간을 선사합니다.",
    "service.v5Title": "프리미엄 브랜드 이미지",
    "service.v5Desc": "럭셔리한 비주얼이 당신의 브랜드와 이벤트에 프리미엄 아이덴티티를 더합니다.",

    // Portfolio
    "portfolio.subtitle": "우리의 작업",
    "portfolio.title": "포트폴리오",
    "portfolio.filter.all": "전체",
    "portfolio.filter.wedding": "웨딩",
    "portfolio.filter.party": "파티",
    "portfolio.filter.brand": "브랜드",
    "portfolio.filter.corporate": "기업",
    "portfolio.filter.nightlife": "나이트라이프",
    "portfolio.cat.party": "프라이빗 이벤트",
    "portfolio.cat.nightlife": "나이트라이프",
    "portfolio.cat.wedding": "웨딩",
    "portfolio.cat.corporate": "기업 행사",
    "portfolio.cat.brand": "브랜드 론칭",
    "portfolio.item.fashionNight": "패션 나이트 NYC",
    "portfolio.item.fashionNightDesc": "VIP 게스트를 위한 글래머러스 로봇 촬영",
    "portfolio.item.clubNoir": "클럽 느와르 오프닝",
    "portfolio.item.clubNoirDesc": "클럽 오프닝의 강렬한 에너지를 담은 시네마틱 영상",
    "portfolio.item.laurentWedding": "로랑 × 블레이크 웨딩",
    "portfolio.item.laurentWeddingDesc": "첫 번째 댄스를 영화 같은 순간으로",
    "portfolio.item.scandicLaunch": "스칸딕 브랜드 론칭",
    "portfolio.item.scandicLaunchDesc": "프리미엄 브랜드 런칭 이벤트의 하이라이트",
    "portfolio.item.goldGala": "골드 갈라 나이트",
    "portfolio.item.goldGalaDesc": "화려한 갈라 파티의 글래머러스 순간들",
    "portfolio.item.brandReveal": "럭셔리 브랜드 리빌",
    "portfolio.item.brandRevealDesc": "브랜드 론칭의 드라마틱한 카메라 워크",
    "portfolio.item.firstDance": "첫 번째 댄스",
    "portfolio.item.firstDanceDesc": "신랑 신부의 아름다운 첫 댄스",
    "portfolio.item.djNight": "DJ 나이트 서울",
    "portfolio.item.djNightDesc": "서울 나이트라이프의 에너지를 담은 시네마틱 촬영",

    // Perfect For
    "perfectFor.subtitle": "어디에 어울릴까요",
    "perfectFor.title": "모든 특별한 순간에",
    "perfectFor.wedding": "웨딩",
    "perfectFor.brand": "브랜드 활성화",
    "perfectFor.launch": "론칭 이벤트",
    "perfectFor.party": "프라이빗 파티",
    "perfectFor.vip": "VIP 경험",
    "perfectFor.corporate": "기업 행사",

    // How It Works
    "howItWorks.subtitle": "프로세스",
    "howItWorks.title": "이용 방법",
    "howItWorks.stepLabel": "STEP",
    "howItWorks.step1Title": "이벤트를 알려주세요",
    "howItWorks.step1Desc": "날짜, 장소, 분위기만 알려주세요. 맞춤 경험을 준비합니다.",
    "howItWorks.step2Title": "우리가 세팅합니다",
    "howItWorks.step2Desc": "전문 팀이 현장에 도착해 로봇을 설치하고 모든 촬영을 진행합니다.",
    "howItWorks.step3Title": "잊을 수 없는 결과물",
    "howItWorks.step3Desc": "편집된 영상이 현장에서 바로 전달됩니다. 게스트들은 특별한 순간을 간직합니다.",

    // Testimonials
    "testimonials.subtitle": "후기",
    "testimonials.title": "고객 후기",
    "testimonials.1.quote": "게스트들이 열광했어요. 영상 퀄리티가 상상 이상이었습니다.",
    "testimonials.1.name": "박지현",
    "testimonials.1.role": "웨딩 신부",
    "testimonials.2.quote": "브랜드 론칭 이벤트에서 가장 화제가 된 콘텐츠였습니다. 압도적이에요.",
    "testimonials.2.name": "이승우",
    "testimonials.2.role": "마케팅 디렉터",
    "testimonials.3.quote": "클럽 오프닝에 Shotbot을 불렀는데, SNS에서 폭발적인 반응이었어요.",
    "testimonials.3.name": "김소연",
    "testimonials.3.role": "이벤트 기획자",

    // FAQ
    "faq.subtitle": "자주 묻는 질문",
    "faq.title": "FAQ",
    "faq.q1": "촬영 비용은 얼마인가요?",
    "faq.a1": "이벤트 규모, 시간, 장소에 따라 맞춤 견적을 드립니다. 문의 양식을 통해 연락주세요.",
    "faq.q2": "어떤 이벤트에서 이용할 수 있나요?",
    "faq.a2": "웨딩, 기업 행사, 브랜드 론칭, 클럽, 페스티벌, 프라이빗 파티 등 모든 이벤트에서 이용 가능합니다.",
    "faq.q3": "영상은 언제 받을 수 있나요?",
    "faq.a3": "현장에서 편집된 하이라이트 클립은 몇 분 안에 전달됩니다. 풀 영상은 이벤트 후 48시간 이내에 전달됩니다.",
    "faq.q4": "설치에 얼마나 걸리나요?",
    "faq.a4": "전문 팀이 이벤트 시작 전 약 1시간 내에 설치를 완료합니다.",
    "faq.q5": "야외 이벤트에서도 가능한가요?",
    "faq.a5": "네, 야외와 실내 모두 가능합니다. 날씨와 장소 조건에 따라 최적의 세팅을 준비합니다.",

    // Contact
    "contact.subtitle": "함께 일해요",
    "contact.titlePrefix": "GET",
    "contact.description": "이벤트를 잊을 수 없게 만들 준비가 되셨나요? 연락주세요.",
    "contact.name": "이름",
    "contact.email": "이메일",
    "contact.eventType": "이벤트 유형",
    "contact.eventWedding": "웨딩",
    "contact.eventCorporate": "기업 행사",
    "contact.eventParty": "프라이빗 파티",
    "contact.eventBrand": "브랜드 론칭",
    "contact.eventNightlife": "나이트라이프 / 클럽",
    "contact.eventOther": "기타",
    "contact.date": "이벤트 날짜",
    "contact.message": "이벤트에 대해 알려주세요...",
    "contact.send": "문의 보내기",
    "contact.toastTitle": "문의가 전송되었습니다!",
    "contact.toastDesc": "감사합니다, {name}님! 24시간 이내에 답변 드리겠습니다.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "개인정보처리방침",
    "footer.terms": "이용약관",
  },
  en: {
    // Brand
    "brand.tagline": "The future of event photography",
    "brand.description": "A cinematic robotic arm that orbits around you — turning every event into an unforgettable visual experience.",

    // CTA
    "cta.primary": "Book Now",
    "cta.secondary": "View Portfolio",

    // Nav
    "nav.service": "Service",
    "nav.portfolio": "Portfolio",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    // Hero
    "hero.line1": "THE MOMENT",
    "hero.line2": "IS YOURS.",
    "hero.description": "A robotic camera arm orbits around you — creating cinematic slow-motion content that stops the scroll.",
    "hero.cta": "Book Now",
    "hero.scroll": "Scroll",
    "hero.imgAlt": "Glamorous event scene",
    "hero.microcopy": "Free consultation · Custom quote · 24h response",

    // Scroll showcase
    "showcase.phase1Title": "CINEMATIC\nMOTION",
    "showcase.phase1Desc": "The arm orbits around you in smooth arcs, creating film-grade orbital shots",
    "showcase.phase2Title": "STUNNING\nVISUALS",
    "showcase.phase2Desc": "High-speed cameras meet robotic precision — breathtaking slow-motion that stops the scroll",
    "showcase.phase3Title": "GLAMOUR\n& FANTASY",
    "showcase.phase3Desc": "An otherworldly moment where all eyes are on you — pure visual drama",
    "showcase.phase4Title": "MADE TO\nTURN HEADS",
    "showcase.phase4Desc": "Content so striking it demands attention. Once seen, never forgotten",

    // Service — emotional outcomes
    "service.subtitle": "Why It's Special",
    "service.title": "You'll Know It\nWhen You See It",
    "service.description": "Strike a pose. The robot does the rest. Cinematic footage, straight to your phone.",
    "service.v1Title": "Cinematic Motion",
    "service.v1Desc": "The camera orbits around you in sweeping arcs. The kind of shot you've only seen in films — now it's yours.",
    "service.v2Title": "Scroll-Stopping Content",
    "service.v2Desc": "Slow-motion so striking it freezes the feed. No filters needed. Just share-ready perfection.",
    "service.v3Title": "The Main Attraction",
    "service.v3Desc": "Guests line up. Crowds gather. Your event becomes the one everyone talks about.",
    "service.v4Title": "Unforgettable Moments",
    "service.v4Desc": "Not just photos — an experience. Something your guests will remember and share long after the night ends.",
    "service.v5Title": "Premium Visual Identity",
    "service.v5Desc": "Luxury-grade visuals that elevate your brand, your event, and your reputation.",

    // Portfolio
    "portfolio.subtitle": "Our Work",
    "portfolio.title": "PORTFOLIO",
    "portfolio.filter.all": "All",
    "portfolio.filter.wedding": "Weddings",
    "portfolio.filter.party": "Parties",
    "portfolio.filter.brand": "Brand",
    "portfolio.filter.corporate": "Corporate",
    "portfolio.filter.nightlife": "Nightlife",
    "portfolio.cat.party": "Private Event",
    "portfolio.cat.nightlife": "Nightlife",
    "portfolio.cat.wedding": "Wedding",
    "portfolio.cat.corporate": "Corporate",
    "portfolio.cat.brand": "Brand Launch",
    "portfolio.item.fashionNight": "Fashion Night NYC",
    "portfolio.item.fashionNightDesc": "Glamorous robotic shots for VIP guests",
    "portfolio.item.clubNoir": "Club Noir Opening",
    "portfolio.item.clubNoirDesc": "Cinematic energy captured at a club launch",
    "portfolio.item.laurentWedding": "Laurent × Blake Wedding",
    "portfolio.item.laurentWeddingDesc": "First dance turned into a cinematic moment",
    "portfolio.item.scandicLaunch": "Scandic Brand Launch",
    "portfolio.item.scandicLaunchDesc": "Premium highlight reel for a brand reveal",
    "portfolio.item.goldGala": "Gold Gala Night",
    "portfolio.item.goldGalaDesc": "Glamorous moments from a luxury gala evening",
    "portfolio.item.brandReveal": "Luxury Brand Reveal",
    "portfolio.item.brandRevealDesc": "Dramatic camera work for a brand launch",
    "portfolio.item.firstDance": "First Dance",
    "portfolio.item.firstDanceDesc": "A beautiful first dance captured cinematically",
    "portfolio.item.djNight": "DJ Night Seoul",
    "portfolio.item.djNightDesc": "Seoul nightlife energy in cinematic slow-motion",

    // Perfect For
    "perfectFor.subtitle": "Who It's For",
    "perfectFor.title": "Perfect For Every Occasion",
    "perfectFor.wedding": "Weddings",
    "perfectFor.weddingDesc": "From the first kiss to the bouquet toss — captured like a film",
    "perfectFor.corporate": "Corporate Events",
    "perfectFor.corporateDesc": "Premium content for launches, conferences, and award shows",
    "perfectFor.party": "Private Parties",
    "perfectFor.partyDesc": "Birthdays, graduations, VIP celebrations made unforgettable",
    "perfectFor.nightlife": "Nightlife",
    "perfectFor.nightlifeDesc": "Clubs, festivals, and openings with maximum visual impact",
    "perfectFor.fashion": "Fashion Events",
    "perfectFor.fashionDesc": "Editorial-quality footage at runways, pop-ups, and showrooms",
    "perfectFor.content": "Content Creation",
    "perfectFor.contentDesc": "Premium social-ready video for influencers and brands",

    // How It Works
    "howItWorks.subtitle": "Process",
    "howItWorks.title": "How It Works",
    "howItWorks.step1Title": "Inquire",
    "howItWorks.step1Desc": "Tell us about your event — date, venue, and style. We'll tailor the experience.",
    "howItWorks.step2Title": "Setup & Shoot",
    "howItWorks.step2Desc": "Our team arrives, sets up the robotic arm, and runs the entire shoot.",
    "howItWorks.step3Title": "Instant Delivery",
    "howItWorks.step3Desc": "Edited clips delivered to your phone on-site. Full videos within 48 hours.",

    // Testimonials
    "testimonials.subtitle": "What They Say",
    "testimonials.title": "Testimonials",
    "testimonials.1.quote": "Our guests couldn't stop talking about it. The video quality was beyond anything we imagined.",
    "testimonials.1.name": "Jihyun Park",
    "testimonials.1.role": "Bride",
    "testimonials.2.quote": "The most talked-about content from our brand launch. Absolutely stunning.",
    "testimonials.2.name": "Seungwoo Lee",
    "testimonials.2.role": "Marketing Director",
    "testimonials.3.quote": "We booked Shotbot for our club opening. The social media response was explosive.",
    "testimonials.3.name": "Soyeon Kim",
    "testimonials.3.role": "Event Planner",

    // FAQ
    "faq.subtitle": "Questions",
    "faq.title": "FAQ",
    "faq.q1": "How much does it cost?",
    "faq.a1": "We provide custom quotes based on event size, duration, and location. Reach out through the contact form.",
    "faq.q2": "What types of events can you cover?",
    "faq.a2": "Weddings, corporate events, brand launches, clubs, festivals, private parties — any occasion.",
    "faq.q3": "When do I receive the videos?",
    "faq.a3": "Highlight clips are delivered on-site within minutes. Full videos within 48 hours after the event.",
    "faq.q4": "How long does setup take?",
    "faq.a4": "Our team completes setup in about one hour before the event starts.",
    "faq.q5": "Do you work outdoors?",
    "faq.a5": "Yes, indoor and outdoor. We prepare optimal setups for any weather and venue conditions.",

    // Contact
    "contact.subtitle": "Let's Work Together",
    "contact.titlePrefix": "GET",
    "contact.description": "Ready to make your event unforgettable? Drop us a line.",
    "contact.name": "Your Name",
    "contact.email": "Email",
    "contact.eventType": "Event Type",
    "contact.eventWedding": "Wedding",
    "contact.eventCorporate": "Corporate Event",
    "contact.eventParty": "Private Party",
    "contact.eventBrand": "Brand Launch",
    "contact.eventNightlife": "Nightlife / Club",
    "contact.eventOther": "Other",
    "contact.date": "Event Date",
    "contact.message": "Tell us about your event...",
    "contact.send": "Send Inquiry",
    "contact.toastTitle": "Inquiry Sent!",
    "contact.toastDesc": "Thanks {name}! We'll get back to you within 24 hours.",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("ko");

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[locale]?.[key] || translations.en[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

const fallbackT = (key: string) => key;
const fallbackValue: I18nContextType = { locale: "ko", setLocale: () => {}, t: fallbackT };

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  return context ?? fallbackValue;
};
