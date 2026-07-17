import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Users, Shield, DollarSign, Globe } from "lucide-react";

const trustStats = [
  { value: "30+", key: "countries" },
  { value: "50+", key: "experts" },
  { value: "10+", key: "years" },
  { value: "100%", key: "reliability" },
];

const trustPoints = [
  { key: "expert", icon: Users },
  { key: "privacy", icon: Shield },
  { key: "noUpfront", icon: DollarSign },
  { key: "global", icon: Globe },
];

export function TrustSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {t("trust.title")}
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="grid grid-cols-2 gap-6">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{t(`trust.${point.key}`)}</h4>
                <p className="text-sm text-muted-foreground">
                  {t(`trust.${point.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {trustStats.map((stat, i) => (
                <div
                  key={stat.key}
                  className="text-center p-6 rounded-2xl bg-primary/5 border border-primary/10"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {t(`trust.${stat.key}`) || stat.key}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
