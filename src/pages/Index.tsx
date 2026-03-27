import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RobotArmSection from "@/components/RobotArmSection";
import ServiceSection from "@/components/ServiceSection";
import PortfolioSection from "@/components/PortfolioSection";
import PerfectForSection from "@/components/PerfectForSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <RobotArmSection />
      <ServiceSection />
      <PortfolioSection />
      <PerfectForSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FloatingCTA />
      <Footer />
    </main>
  );
};

export default Index;
