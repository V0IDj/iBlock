import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, Globe, Lock, Search, TrendingUp, Scale } from "lucide-react";

const services = [
  { key: "transparency", icon: Shield },
  { key: "integration", icon: Globe },
  { key: "security", icon: Lock },
  { key: "fraud", icon: Search },
  { key: "crypto", icon: TrendingUp },
  { key: "legal", icon: Scale },
];

export function ServicesSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {t("services.title")}
          </span>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {t(`services.${service.key}`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`services.${service.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
