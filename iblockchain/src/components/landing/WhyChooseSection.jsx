import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Zap, Eye, Clock } from "lucide-react";

const points = [
  { key: "fast", icon: Zap },
  { key: "transparent", icon: Eye },
  { key: "support", icon: Clock },
];

export function WhyChooseSection() {
  const { t } = useLanguage();

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
            Why Choose iBlockchain?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            {t("whyChoose.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <motion.div
              key={point.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <point.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`whyChoose.${point.key}`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`whyChoose.${point.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
