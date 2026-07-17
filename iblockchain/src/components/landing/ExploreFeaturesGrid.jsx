import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { CreditCard, Bell, Download, ChartPie, Shield, Globe } from "lucide-react";

const features = [
  { icon: CreditCard, titleEn: "Spend your funds in real life", titleAr: "أنفق أموالك في الحياة الواقعية", descEn: "Use your crypto assets for everyday purchases with our virtual card.", descAr: "استخدم أصولك الرقمية للمشتريات اليومية مع بطاقتنا الافتراضية." },
  { icon: Bell, titleEn: "Powerful notifications", titleAr: "إشعارات قوية", descEn: "Stay informed with real-time alerts on all your transactions and market movements.", descAr: "ابقَ على اطلاع مع تنبيهات فورية لجميع معاملاتك وحركات السوق." },
  { icon: Download, titleEn: "Never start from zero", titleAr: "لا تبدأ من الصفر أبداً", descEn: "Import your existing wallets and start managing them all in one place.", descAr: "استورد محافظك الحالية وابدأ بإدارتها جميعاً في مكان واحد." },
  { icon: ChartPie, titleEn: "Easily organize your portfolio", titleAr: "نظّم محفظتك بسهولة", descEn: "Track all your assets with a clear, intuitive portfolio overview.", descAr: "تتبع جميع أصولك مع نظرة عامة واضحة وبديهية لمحفظتك." },
  { icon: Shield, titleEn: "Next level security", titleAr: "أمان من المستوى التالي", descEn: "Advanced encryption and biometric authentication protect your assets.", descAr: "تشفير متقدم ومصادقة بيومترية تحمي أصولك." },
  { icon: Globe, titleEn: "Available for every currency", titleAr: "متاح لجميع العملات", descEn: "Support for hundreds of cryptocurrencies and tokens across multiple networks.", descAr: "دعم لمئات العملات الرقمية والتوكنات عبر شبكات متعددة." },
];

export function ExploreFeaturesGrid() {
  const { language, isRTL } = useLanguage();

  return (
    <section className="py-24 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4"
          >
            {language === "ar" ? "المميزات" : "Features"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {language === "ar" ? "استكشف العملات الرقمية بطريقة جديدة" : "Explore crypto in a whole new way"}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">
                  {language === "ar" ? feature.titleAr : feature.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === "ar" ? feature.descAr : feature.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
