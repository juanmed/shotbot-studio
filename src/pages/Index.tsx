import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RobotArmSection from "@/components/RobotArmSection";
import PortfolioSection from "@/components/PortfolioSection";
import MidPageCTA from "@/components/MidPageCTA";
import ServiceSection from "@/components/ServiceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PerfectForSection from "@/components/PerfectForSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      {/* 1. Desire + understanding */}
      <HeroSection />
      {/* 2. Visual magic */}
      <RobotArmSection />
      {/* 3. Proof */}
      <PortfolioSection />
      {/* CTA break */}
      <MidPageCTA
        headlineKey="midCta.afterPortfolio"
        primaryKey="cta.primary"
        secondaryKey="cta.secondary"
        secondaryHref="#service"
      />
      {/* 4. Why it matters */}
      <ServiceSection />
      {/* 5. Trust */}
      <TestimonialsSection />
      {/* CTA break */}
      <MidPageCTA
        headlineKey="midCta.afterTestimonials"
        primaryKey="cta.primary"
        secondaryHref={undefined}
      />
      {/* 6. Confidence */}
      <PerfectForSection />
      <HowItWorksSection />
      {/* 7. Objection handling */}
      <FAQSection />
      {/* 8. Action */}
      <ContactSection />
      <FloatingCTA />
      <Footer />
    </main>
  );
};

export default Index;
