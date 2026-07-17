import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { UserPlus, FileText, Search, ShieldCheck } from "lucide-react";

const steps = [
  { key: "step1", icon: UserPlus },
  { key: "step2", icon: FileText },
  { key: "step3", icon: Search },
  { key: "step4", icon: ShieldCheck },
];

export function HowItWorksSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="process" className="py-20 mesh-bg border-y border-border/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            {t("howItWorks.title")}
          </span>
          <p className="text-muted-foreground mt-4">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold mb-2">
                {t(`howItWorks.${step.key}`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(`howItWorks.${step.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
