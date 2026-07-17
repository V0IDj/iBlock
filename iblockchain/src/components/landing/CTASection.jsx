import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/Button";
import { ArrowRight, Dices, Wallet, Coins } from "lucide-react";

export function CTASection() {
  const { t, isRTL } = useLanguage();

  const cryptoIcons = [Dices, Wallet, Coins];

  return (
    <section className="py-20 mesh-bg border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {cryptoIcons.map((Icon, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + (i % 2) * 30}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${6 + i}s`,
          }}
        >
          <Icon className="h-16 w-16 text-primary" />
        </div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("cta.subtitle")}
          </p>
          <Button size="lg" variant="premium" asChild>
            <Link to="/auth?mode=signup">
              {t("nav.getStarted")}
              <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2" : "ml-2"}`} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
