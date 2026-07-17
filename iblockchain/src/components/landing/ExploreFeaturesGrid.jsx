import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { CreditCard, Bell, Download, ChartPie, Shield, Globe } from "lucide-react";

const features = [
  { key: "spend", icon: CreditCard },
  { key: "notifications", icon: Bell },
  { key: "import", icon: Download },
  { key: "portfolio", icon: ChartPie },
  { key: "security", icon: Shield },
  { key: "currencies", icon: Globe },
];

export function ExploreFeaturesGrid() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 mesh-bg border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            {t("features.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`flex gap-4 p-6 rounded-2xl glass-card ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">
                  {t(`features.${feature.key}`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`features.${feature.key}Desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
