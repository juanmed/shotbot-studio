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

    // Robot Arm scroll showcase
    "arm.precision": "정밀함",
    "arm.precisionDesc": "6축 로봇이 손으로는 불가능한 카메라 앵글을 구현합니다",
    "arm.cinematic": "시네마틱",
    "arm.cinematicDesc": "할리우드급 슬로우 모션 & 궤도 트래킹 촬영",
    "arm.starMoment": "당신의",
    "arm.starMomentHighlight": "스타",
    "arm.starMomentEnd": "순간",

    // Service
    "service.subtitle": "우리가 하는 일",
    "service.title": "왜 특별한가",
    "service.description": "로봇 카메라 팔을 이벤트에 대여하세요. 설치부터 촬영까지 — 당신은 빛나기만 하면 됩니다.",
    "service.roboticTitle": "로봇 정밀 촬영",
    "service.roboticDesc": "6축 로봇 팔이 시네마틱 정밀함으로 움직이며 부드러운 궤도 촬영을 만들어냅니다.",
    "service.slowmoTitle": "슬로우 모션 매직",
    "service.slowmoDesc": "고속 카메라가 점프, 회전, 표정 — 모든 디테일을 숨 막히는 슬로우 모션으로 포착합니다.",
    "service.deliveryTitle": "즉시 전달",
    "service.deliveryDesc": "현장에서 편집된 클립이 몇 분 안에 휴대폰으로 전달됩니다. 공유 준비 완료.",
    "service.eventTitle": "어디서든 가능",
    "service.eventDesc": "웨딩, 브랜드 론칭, 기업 행사, 프라이빗 파티 — 어떤 행사에도 놀라움을 선사합니다.",

    // Portfolio
    "portfolio.subtitle": "우리의 작업",
    "portfolio.title": "포트폴리오",
    "portfolio.fashion.title": "패션 나이트 NYC",
    "portfolio.fashion.category": "프라이빗 이벤트",
    "portfolio.club.title": "클럽 느와르 오프닝",
    "portfolio.club.category": "나이트라이프",
    "portfolio.wedding.title": "로랑 × 블레이크 웨딩",
    "portfolio.wedding.category": "웨딩",
    "portfolio.corporate.title": "스칸딕 브랜드 론칭",
    "portfolio.corporate.category": "기업 행사",

    // Perfect For
    "perfectFor.subtitle": "어떤 이벤트에 적합한가요",
    "perfectFor.title": "모든 특별한 순간에",
    "perfectFor.wedding": "웨딩",
    "perfectFor.weddingDesc": "첫 키스부터 부케 토스까지 — 영화 같은 순간으로",
    "perfectFor.corporate": "기업 행사",
    "perfectFor.corporateDesc": "브랜드 론칭, 컨퍼런스, 시상식에 프리미엄 콘텐츠를",
    "perfectFor.party": "프라이빗 파티",
    "perfectFor.partyDesc": "생일, 졸업, VIP 파티를 잊을 수 없는 경험으로",
    "perfectFor.nightlife": "나이트라이프",
    "perfectFor.nightlifeDesc": "클럽, 페스티벌, 오프닝에 강렬한 비주얼 임팩트를",
    "perfectFor.fashion": "패션 이벤트",
    "perfectFor.fashionDesc": "런웨이, 팝업, 쇼룸에서 에디토리얼급 영상을",
    "perfectFor.content": "콘텐츠 크리에이션",
    "perfectFor.contentDesc": "인플루언서, 브랜드를 위한 SNS용 프리미엄 영상 제작",

    // How It Works
    "howItWorks.subtitle": "프로세스",
    "howItWorks.title": "이용 방법",
    "howItWorks.step1Title": "문의하기",
    "howItWorks.step1Desc": "이벤트 정보를 알려주세요. 날짜, 장소, 스타일을 맞춰드립니다.",
    "howItWorks.step2Title": "설치 & 촬영",
    "howItWorks.step2Desc": "전문 팀이 현장에 로봇을 설치하고 촬영을 진행합니다.",
    "howItWorks.step3Title": "즉시 전달",
    "howItWorks.step3Desc": "편집된 영상이 현장에서 바로 휴대폰으로 전달됩니다.",

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
    "hero.line1": "YOUR MOMENT.",
    "hero.line2": "PERFECTED.",
    "hero.description": "A cinematic robotic arm that orbits around you — capturing stunning slow-motion videos that turn heads.",
    "hero.cta": "Book Now",
    "hero.scroll": "Scroll",
    "hero.imgAlt": "Glamorous event scene",

    // Robot Arm scroll showcase
    "arm.precision": "PRECISION",
    "arm.precisionDesc": "6-axis robotic movement for impossible camera angles",
    "arm.cinematic": "CINEMATIC",
    "arm.cinematicDesc": "Hollywood-grade slow-motion and orbital tracking shots",
    "arm.starMoment": "YOUR",
    "arm.starMomentHighlight": "STAR",
    "arm.starMomentEnd": "MOMENT",

    // Service
    "service.subtitle": "What We Do",
    "service.title": "Why It's Special",
    "service.description": "Rent our robotic camera arm for your event. We set up, we shoot, you shine.",
    "service.roboticTitle": "Robotic Precision",
    "service.roboticDesc": "Our 6-axis arm moves with cinematic precision, creating smooth orbital shots impossible by hand.",
    "service.slowmoTitle": "Slow-Motion Magic",
    "service.slowmoDesc": "High-speed cameras capture every detail — your jump, your spin, your expression — in breathtaking slow motion.",
    "service.deliveryTitle": "Instant Delivery",
    "service.deliveryDesc": "Clips are edited on-site and delivered to your phone within minutes. Share-ready perfection.",
    "service.eventTitle": "Event Ready",
    "service.eventDesc": "Weddings, brand launches, corporate events, private parties — we bring the wow factor anywhere.",

    // Portfolio
    "portfolio.subtitle": "Our Work",
    "portfolio.title": "PORTFOLIO",
    "portfolio.fashion.title": "Fashion Night NYC",
    "portfolio.fashion.category": "Private Event",
    "portfolio.club.title": "Club Noir Opening",
    "portfolio.club.category": "Nightlife",
    "portfolio.wedding.title": "Laurent × Blake Wedding",
    "portfolio.wedding.category": "Wedding",
    "portfolio.corporate.title": "Scandic Brand Launch",
    "portfolio.corporate.category": "Corporate",

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

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
};
