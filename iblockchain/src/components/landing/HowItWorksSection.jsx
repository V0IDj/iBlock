import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const items = [
  {
    titleEn: "Send Crypto",
    titleAr: "إرسال العملات",
    descEn: "Easily send your cryptocurrency to any wallet with iBlockchain. Our platform ensures quick and secure transactions, giving you peace of mind every time you transfer your assets.",
    descAr: "أرسل عملاتك الرقمية بسهولة إلى أي محفظة مع iBlockchain. تضمن منصتنا معاملات سريعة وآمنة.",
    image: "/assets/send-crypto-eoVmJPcx.jpg",
  },
  {
    titleEn: "Receive Crypto",
    titleAr: "استقبال العملات",
    descEn: "Effortlessly receive crypto directly into your iBlockchain wallet. With top-notch security and easy tracking, you can manage your incoming funds without any hassle.",
    descAr: "استقبل العملات الرقمية مباشرة في محفظة iBlockchain الخاصة بك. مع أمان عالي المستوى وتتبع سهل.",
    image: "/assets/receive-crypto-BjpslNZn.jpg",
  },
  {
    titleEn: "Swap Crypto with 0% Fees",
    titleAr: "تبادل العملات بعمولة 0%",
    descEn: "Exchange your digital assets seamlessly with iBlockchain. Enjoy fast and efficient swaps between different cryptocurrencies, all within a user-friendly interface.",
    descAr: "بادل أصولك الرقمية بسلاسة مع iBlockchain. استمتع بتبادل سريع وفعال بين العملات الرقمية المختلفة.",
    image: "/assets/swap-crypto-rBO_9-5L.jpg",
  },
];

export function DoEverythingSection() {
  const { language, isRTL } = useLanguage();

  return (
    <section className="py-24 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4"
          >
            {language === "ar" ? "كيف يعمل" : "How it works"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            {language === "ar" ? "افعل كل شيء بعملاتك الرقمية" : "Do everything with your crypto"}
            <br />
            <span className="text-gradient">
              {language === "ar" ? "الكل في مكان واحد" : "all in one place"}
            </span>
          </h2>
        </motion.div>
        <div className="space-y-24">
          {items.map((item, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 60 : -60, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, type: "spring" }}
                  className={`relative flex justify-center ${isReversed ? "lg:order-2" : ""}`}
                >
                  <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 * i }}
                    className="relative w-full max-w-sm"
                  >
                    <div className="absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]" />
                    <div
                      className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm bg-white/5"
                      style={{ boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)" }}
                    >
                      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-3xl" />
                      <img src={item.image} alt={item.titleEn} loading="lazy" width={800} height={800} className="w-full aspect-square object-cover" />
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className={isReversed ? "lg:order-1" : ""}
                >
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary tracking-tight">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {language === "ar" ? item.descAr : item.descEn}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
