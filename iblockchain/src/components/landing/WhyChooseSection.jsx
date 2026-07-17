import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Zap, Eye, Headphones } from "lucide-react";

const features = [
  {
    icon: Zap,
    titleEn: "Fast & Efficient Transactions",
    titleAr: "معاملات سريعة وفعالة",
    descEn: "Experience lightning-fast transactions without the hassle. iBlockchain ensures that your trades are processed quickly and reliably.",
    descAr: "تمتع بمعاملات سريعة كالبرق بدون عناء. تضمن iBlockchain معالجة صفقاتك بسرعة وموثوقية.",
  },
  {
    icon: Eye,
    titleEn: "Transparent and Fair",
    titleAr: "شفافة وعادلة",
    descEn: "We believe in transparency. With iBlockchain, you'll always know where your assets stand. No hidden fees, no surprises.",
    descAr: "نؤمن بالشفافية. مع iBlockchain، ستعرف دائماً أين تقف أصولك. لا رسوم مخفية، لا مفاجآت.",
  },
  {
    icon: Headphones,
    titleEn: "24/7 Customer Support",
    titleAr: "دعم العملاء على مدار الساعة",
    descEn: "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
    descAr: "فريق الدعم المخصص لدينا متاح على مدار الساعة لمساعدتك في أي استفسارات.",
  },
];

export function WhyChooseSection() {
  const { language, isRTL } = useLanguage();

  return (
    <section className="py-24 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4"
          >
            {language === "ar" ? "لماذا تختار iBlockchain؟" : "Why Choose iBlockchain?"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            {language === "ar" ? "أمان بلا تنازلات" : "Uncompromised Security"}
          </h2>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            {language === "ar"
              ? "أمانك هو أولويتنا القصوى. تستخدم iBlockchain تشفيراً متطوراً، ومصادقة ثنائية، وحلول تخزين بارد لحماية أصولك الرقمية."
              : "Your security is our highest priority. iBlockchain employs cutting-edge encryption, two-factor authentication, and cold storage solutions to protect your digital assets."}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group glass-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-lg font-bold mb-3">
                {language === "ar" ? feature.titleAr : feature.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ar" ? feature.descAr : feature.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
