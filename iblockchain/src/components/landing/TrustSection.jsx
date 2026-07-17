import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Globe, Users, Award, Shield, CircleCheckBig } from "lucide-react";

export function TrustSection() {
  const { t, isRTL } = useLanguage();

  const trustPoints = [
    { key: "experts", icon: CircleCheckBig },
    { key: "privacy", icon: CircleCheckBig },
    { key: "nofees", icon: CircleCheckBig },
    { key: "network", icon: CircleCheckBig },
  ];

  const statCards = [
    { icon: Globe, value: "30+", labelKey: "about.countries", primary: true },
    { icon: Users, value: "50+", labelKey: "about.expertsNum", primary: false },
    { icon: Award, value: "10+", labelKey: "about.experience", primary: false },
    { icon: Shield, value: "100%", labelKey: "about.reliability", primary: true },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("about.title")} <span className="text-gradient">iBlockchain</span>؟
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">{t("about.description")}</p>
            <div className="space-y-5">
              {trustPoints.map((point, i) => (
                <motion.div
                  key={point.key}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <point.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t(`about.${point.key}.title`)}</h4>
                    <p className="text-muted-foreground text-sm">{t(`about.${point.key}.desc`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]" />
              <div
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white/5"
                style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
              >
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                <img src="/assets/team-office-CCPCsHxm.jpg" alt="Our Team" loading="lazy" width={800} height={600} className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {statCards.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`glass-card rounded-2xl p-4 ${stat.primary ? "border-primary/30 glow-primary" : ""}`}
                >
                  <stat.icon className={`h-8 w-8 mb-2 ${stat.primary ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
