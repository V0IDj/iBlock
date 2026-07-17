import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { StatsBar } from "../components/landing/StatsBar";
import { PartnersBar } from "../components/landing/PartnersBar";
import { ServicesSection } from "../components/landing/ServicesSection";
import { LiveTicker } from "../components/landing/LiveTicker";
import { WhyChooseSection } from "../components/landing/WhyChooseSection";
import { SecurityHeroSection } from "../components/landing/SecurityHeroSection";
import { TrustSection } from "../components/landing/TrustSection";
import { HowItWorksSection } from "../components/landing/HowItWorksSection";
import { DoEverythingSection } from "../components/landing/DoEverythingSection";
import { ExploreFeaturesGrid } from "../components/landing/ExploreFeaturesGrid";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { CTASection } from "../components/landing/CTASection";
import { ContactSection } from "../components/landing/ContactSection";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";

export function Landing() {
  const { dir } = useLanguage();

  return (
    <div dir={dir}>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <LiveTicker />
      <PartnersBar />
      <WhyChooseSection />
      <SecurityHeroSection />
      <TrustSection />
      <HowItWorksSection />
      <DoEverythingSection />
      <ExploreFeaturesGrid />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <EnhancedFooter />
    </div>
  );
}
