import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const partners = ["Chainlink", "CoinBase", "Binance", "Ledger", "MetaMask", "Trezor"];

export function PartnersBar() {
  const { language } = useLanguage();

  return (
    <div className="py-12 border-y border-border bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          {language === "ar" ? "تم عرضنا على أبرز المنصات العالمية" : "Featured on major global platforms"}
        </motion.p>
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {partners.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="px-5 py-2.5 rounded-xl border border-border bg-card/60 shadow-sm backdrop-blur-sm"
            >
              <span className="text-sm font-bold text-muted-foreground/60 tracking-wider">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
