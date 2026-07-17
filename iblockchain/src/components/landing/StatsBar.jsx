import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Users, ShieldCheck, TrendingUp, Clock } from "lucide-react";

const stats = [
  { value: "+5000", key: "clients", icon: Users },
  { value: "$50M+", key: "recovered", icon: ShieldCheck },
  { value: "95%", key: "successRate", icon: TrendingUp },
  { value: "24/7", key: "support", icon: Clock },
];

export function StatsBar() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">
                {t(`stats.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
