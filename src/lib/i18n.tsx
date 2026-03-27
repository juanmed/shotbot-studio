import { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "ko" | "en";

type Translations = {
  [key: string]: string;
};

const translations: Record<Locale, Translations> = {
  ko: {
    // Brand
    "brand.tagline": "이벤트 촬영의 미래",
    "brand.description": "당신을 중심으로 회전하며 촬영하는 시네마틱 로봇 팔 — 모든 이벤트에서 놀라운 콘텐츠를 만들어냅니다.",

    // Nav
    "nav.service": "서비스",
    "nav.portfolio": "포트폴리오",
    "nav.contact": "예약하기",

    // Hero
    "hero.line1": "당신의 순간.",
    "hero.line2": "완벽하게.",
    "hero.description": "당신을 중심으로 회전하는 시네마틱 로봇 팔 — 시선을 사로잡는 슬로우 모션 영상과 사진을 촬영합니다.",
    "hero.cta": "예약하기",
    "hero.scroll": "스크롤",
    "hero.imgAlt": "화려한 이벤트 현장",

    // Robot Arm
    "arm.precision": "정밀함",
    "arm.precisionDesc": "불가능한 카메라 앵글을 위한 6축 로봇 움직임",
    "arm.cinematic": "시네마틱",
    "arm.cinematicDesc": "할리우드급 슬로우 모션과 궤도 트래킹 촬영",
    "arm.starMoment": "당신의",
    "arm.starMomentHighlight": "스타",
    "arm.starMomentEnd": "순간",

    // Service
    "service.subtitle": "우리가 하는 일",
    "service.titlePrefix": "THE",
    "service.titleSuffix": "EXPERIENCE",
    "service.description": "이벤트에 로봇 카메라 팔을 대여하세요. 우리가 설치하고, 촬영하고, 당신이 빛납니다. 그만큼 간단합니다.",
    "service.roboticTitle": "로봇 정밀 촬영",
    "service.roboticDesc": "6축 로봇 팔이 시네마틱한 정밀함으로 움직이며, 손으로는 불가능한 부드러운 궤도 촬영을 만들어냅니다.",
    "service.slowmoTitle": "슬로우 모션 매직",
    "service.slowmoDesc": "고속 카메라가 모든 디테일을 포착합니다 — 점프, 회전, 표정까지 — 숨 막히는 슬로우 모션으로.",
    "service.deliveryTitle": "즉시 전달",
    "service.deliveryDesc": "현장에서 편집된 클립이 몇 분 안에 휴대폰으로 전달됩니다. 공유 준비 완료, 필터 불필요한 완벽함.",
    "service.eventTitle": "이벤트 대응",
    "service.eventDesc": "결혼식부터 브랜드 론칭, 기업 행사부터 프라이빗 파티까지 — 모든 행사에 놀라움을 선사합니다.",

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
    "contact.message": "이벤트에 대해 알려주세요...",
    "contact.send": "문의 보내기",
    "contact.toastTitle": "문의가 전송되었습니다!",
    "contact.toastDesc": "감사합니다, {name}님! 24시간 이내에 답변 드리겠습니다.",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  en: {
    // Brand
    "brand.tagline": "The future of event photography",
    "brand.description": "A cinematic robotic arm that captures stunning videos and photos of you — creating jaw-dropping content at any event.",

    // Nav
    "nav.service": "Service",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Get Shotbot",

    // Hero
    "hero.line1": "YOUR MOMENT.",
    "hero.line2": "PERFECTED.",
    "hero.description": "A cinematic robotic arm that orbits around you — capturing stunning slow-motion videos and photos that turn heads.",
    "hero.cta": "Book Shotbot",
    "hero.scroll": "Scroll",
    "hero.imgAlt": "Glamorous event scene",

    // Robot Arm
    "arm.precision": "PRECISION",
    "arm.precisionDesc": "6-axis robotic movement for impossible camera angles",
    "arm.cinematic": "CINEMATIC",
    "arm.cinematicDesc": "Hollywood-grade slow-motion and orbital tracking shots",
    "arm.starMoment": "YOUR",
    "arm.starMomentHighlight": "STAR",
    "arm.starMomentEnd": "MOMENT",

    // Service
    "service.subtitle": "What We Do",
    "service.titlePrefix": "THE",
    "service.titleSuffix": "EXPERIENCE",
    "service.description": "Rent our robotic camera arm for your event. We set up, we shoot, you shine. It's that simple.",
    "service.roboticTitle": "Robotic Precision",
    "service.roboticDesc": "Our 6-axis robotic arm moves with cinematic precision, creating smooth orbital shots that are impossible to achieve by hand.",
    "service.slowmoTitle": "Slow-Motion Magic",
    "service.slowmoDesc": "High-speed cameras capture every detail — your jump, your spin, your expression — in breathtaking slow motion.",
    "service.deliveryTitle": "Instant Delivery",
    "service.deliveryDesc": "Your clips are edited on-site and delivered to your phone within minutes. Share-ready, filter-free perfection.",
    "service.eventTitle": "Event Ready",
    "service.eventDesc": "From weddings to brand launches, corporate events to private parties — we bring the wow factor to any occasion.",

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
    "contact.message": "Tell us about your event...",
    "contact.send": "Send Inquiry",
    "contact.toastTitle": "Inquiry Sent!",
    "contact.toastDesc": "Thanks {name}! We'll get back to you within 24 hours.",

    // Footer
    "footer.rights": "All rights reserved.",
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
