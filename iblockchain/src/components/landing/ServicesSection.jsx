import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, ChartColumn, Fingerprint } from "lucide-react";

const services = [
  { icon: Shield, key: "transparency" },
  { icon: ChartColumn, key: "integration" },
  { icon: Fingerprint, key: "security" },
];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("features.subtitle")}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="premium-card glass-card rounded-2xl p-8 transition-all duration-300 hover:border-primary/30 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-500 group-hover:shadow-gold-md">
                <svc.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t(`features.${svc.key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`features.${svc.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
