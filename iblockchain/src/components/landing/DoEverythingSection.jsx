import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { ArrowUpFromLine, ArrowDownToLine, Repeat } from "lucide-react";

const actions = [
  { key: "send", icon: ArrowUpFromLine },
  { key: "receive", icon: ArrowDownToLine },
  { key: "swap", icon: Repeat },
];

export function DoEverythingSection() {
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
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            {t("doEverything.title").split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, i) => (
            <motion.div
              key={action.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <action.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(`doEverything.${action.key}`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`doEverything.${action.key}Desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
