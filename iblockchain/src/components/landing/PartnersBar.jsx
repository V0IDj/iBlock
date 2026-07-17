import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const partners = [
  { name: "Chainlink", icon: "🔗" },
  { name: "CoinBase", icon: "🔵" },
  { name: "Binance", icon: "🟡" },
  { name: "Ledger", icon: "🟠" },
  { name: "MetaMask", icon: "🦊" },
  { name: "Trezor", icon: "🟢" },
];

export function PartnersBar() {
  const { t } = useLanguage();

  return (
    <section className="py-12 border-y border-border/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-8">
          Featured on major global platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-lg font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-2xl">{partner.icon}</span>
              <span>{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
