import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Navbar } from "../components/landing/Navbar";
import { HeroSection } from "../components/landing/HeroSection";
import { LiveTicker } from "../components/landing/LiveTicker";
import { ServicesSection } from "../components/landing/ServicesSection";
import { StatsBar } from "../components/landing/StatsBar";
import { TrustSection } from "../components/landing/TrustSection";
import { ContactSection } from "../components/landing/ContactSection";
import { LoaderCircle, ArrowRight, Shield, TrendingUp, Lock } from "lucide-react";

const PartnersBar = lazy(() => import("../components/landing/PartnersBar").then(m => ({ default: m.PartnersBar })));
const WhyChooseSection = lazy(() => import("../components/landing/WhyChooseSection").then(m => ({ default: m.WhyChooseSection })));
const SecurityHeroSection = lazy(() => import("../components/landing/SecurityHeroSection").then(m => ({ default: m.SecurityHeroSection })));
const HowItWorksSection = lazy(() => import("../components/landing/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const DoEverythingSection = lazy(() => import("../components/landing/DoEverythingSection").then(m => ({ default: m.DoEverythingSection })));
const ExploreFeaturesGrid = lazy(() => import("../components/landing/ExploreFeaturesGrid").then(m => ({ default: m.ExploreFeaturesGrid })));
const TestimonialsSection = lazy(() => import("../components/landing/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const CTASection = lazy(() => import("../components/landing/CTASection").then(m => ({ default: m.CTASection })));
const EnhancedFooter = lazy(() => import("../components/landing/EnhancedFooter").then(m => ({ default: m.EnhancedFooter })));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-12">
    <LoaderCircle className="w-6 h-6 animate-spin text-primary" />
  </div>
);

export function Landing() {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <Navbar />

      <HeroSection />

      {/* About preview */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 mesh-bg" />
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-primary font-semibold text-lg mb-4 tracking-wider"
            >
              {language === "ar" ? "من نحن" : "ABOUT US"}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              {t("aboutUs.subtitle")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {t("aboutUs.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/about-us">
                <button className="inline-flex items-center gap-2 px-8 py-6 text-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all">
                  {t("aboutUs.learnMore")}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LiveTicker />

      <StatsBar />

      <ServicesSection />

      {/* Service details - Fraud, Crypto, Legal alternating sections */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="container mx-auto relative z-10">
          {/* Fraud Recovery */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]" />
              <div
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5"
                style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <img src="/assets/security-vault-C17nKSO0.jpg" alt="Security Vault" loading="lazy" width={800} height={600} className="w-full" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("services.fraud.title")}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t("services.fraud.desc")}</p>
            </motion.div>
          </div>

          {/* Crypto Recovery */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("services.crypto.title")}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t("services.crypto.desc")}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 md:order-2"
            >
              <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]" />
              <div
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5"
                style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <img src="/assets/mobile-trading-1nFX1Fce.jpg" alt="Crypto Trading" loading="lazy" width={600} height={800} className="w-full max-h-[400px] object-cover" />
              </div>
            </motion.div>
          </div>

          {/* Legal Consultation */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]" />
              <div
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5"
                style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <img src="/assets/global-network-gjN8gHo1.jpg" alt="Global Network" loading="lazy" width={800} height={600} className="w-full" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("services.legal.title")}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{t("services.legal.desc")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense fallback={<SectionFallback />}>
        <PartnersBar />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyChooseSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <SecurityHeroSection />
      </Suspense>

      <TrustSection />

      <Suspense fallback={<SectionFallback />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <DoEverythingSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ExploreFeaturesGrid />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>

      <ContactSection />

      <Suspense fallback={<SectionFallback />}>
        <EnhancedFooter />
      </Suspense>
    </div>
  );
}
