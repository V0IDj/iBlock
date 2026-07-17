import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/Button";
import { Shield, ArrowRight } from "lucide-react";

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden mesh-bg">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-6">
              <Shield className="h-4 w-4" />
              <span>{t("hero.badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("hero.title").split("\n").map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {line.includes("Security") || line.includes("الثقة") ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              {t("hero.subtitle")}
            </p>

            <div className="flex items-center gap-4">
              <Button size="lg" variant="premium" asChild>
                <Link to="/auth?mode=signup">
                  {t("nav.getStarted")}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2" : "ml-2"}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">{t("nav.login")}</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute inset-4 border-2 border-primary/30 rounded-full animate-rotate-slow" />
              <div className="absolute inset-8 border-2 border-emerald-500/20 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center animate-float">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
