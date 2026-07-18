import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Users, ShieldCheck, TrendingUp, Clock } from "lucide-react";

const stats = [
  { value: "+5000", key: "clients", icon: Users },
  { value: "$50M+", key: "recovered", icon: ShieldCheck },
  { value: "95%", key: "success", icon: TrendingUp },
  { value: "24/7", key: "support", icon: Clock },
];

export function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 premium-card glass-card rounded-2xl"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {t(`stats.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
