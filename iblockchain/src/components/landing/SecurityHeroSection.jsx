import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield } from "lucide-react";

export function SecurityHeroSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 mesh-bg border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {t("security.title")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              {t("security.subtitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("security.desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-rotate-slow" />
              <div className="absolute inset-4 border border-primary/10 rounded-full animate-rotate-slow" style={{ animationDirection: "reverse" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center animate-float">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
