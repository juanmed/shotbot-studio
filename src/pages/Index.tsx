import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RobotArmSection from "@/components/RobotArmSection";
import ServiceSection from "@/components/ServiceSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <RobotArmSection />
      <ServiceSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
