import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Star } from "lucide-react";

const testimonials = [
  { nameEn: "Ahmad Al-Rashid", nameAr: "أحمد الراشد", roleEn: "Investor", roleAr: "مستثمر", messageEn: "iBlockchain helped me recover my stolen crypto assets within weeks. Their team is incredibly professional and transparent throughout the entire process.", messageAr: "ساعدتني iBlockchain في استرداد أصولي الرقمية المسروقة خلال أسابيع. فريقهم محترف وشفاف بشكل لا يصدق.", rating: 5 },
  { nameEn: "Sarah Mitchell", nameAr: "سارة ميتشل", roleEn: "Business Owner", roleAr: "صاحبة أعمال", messageEn: "After being scammed by a fake trading platform, I thought my money was gone forever. iBlockchain proved me wrong and recovered 95% of my funds.", messageAr: "بعد أن تعرضت للاحتيال من منصة تداول وهمية، اعتقدت أن أموالي ضاعت. أثبتت iBlockchain أنني كنت مخطئة واستردت 95% من أموالي.", rating: 5 },
  { nameEn: "Mohammed Al-Fahad", nameAr: "محمد الفهد", roleEn: "Crypto Trader", roleAr: "متداول عملات رقمية", messageEn: "The security features and the dedicated support team make iBlockchain stand out. I feel safe managing my portfolio through their platform.", messageAr: "ميزات الأمان وفريق الدعم المخصص يجعلان iBlockchain متميزة. أشعر بالأمان في إدارة محفظتي.", rating: 5 },
  { nameEn: "Lisa Wang", nameAr: "ليزا وانغ", roleEn: "Financial Advisor", roleAr: "مستشارة مالية", messageEn: "I recommend iBlockchain to all my clients. Their recovery process is systematic, legal, and highly effective.", messageAr: "أوصي بـ iBlockchain لجميع عملائي. عملية الاسترداد لديهم منهجية وقانونية وفعالة للغاية.", rating: 5 },
  { nameEn: "Omar Khalil", nameAr: "عمر خليل", roleEn: "Entrepreneur", roleAr: "رائد أعمال", messageEn: "Fast, reliable, and trustworthy. iBlockchain is the real deal when it comes to crypto recovery and asset management.", messageAr: "سريعة وموثوقة وجديرة بالثقة. iBlockchain هي الخيار الحقيقي عندما يتعلق الأمر باسترداد العملات الرقمية.", rating: 5 },
  { nameEn: "Fatima Al-Zahra", nameAr: "فاطمة الزهراء", roleEn: "Tech Professional", roleAr: "محترفة تقنية", messageEn: "The platform's interface is clean and easy to use. The team responded to my queries within minutes. Exceptional service!", messageAr: "واجهة المنصة نظيفة وسهلة الاستخدام. استجاب الفريق لاستفساراتي في دقائق. خدمة استثنائية!", rating: 5 },
];

const avatarColors = ["bg-primary", "bg-accent", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-purple-500"];

export function TestimonialsSection() {
  const { language, isRTL } = useLanguage();

  return (
    <section className="py-24 px-4 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
            {language === "ar" ? "آراء العملاء" : "Testimonials"}
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {language === "ar" ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="glass-card rounded-2xl p-6 border border-border group hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} text-white flex items-center justify-center text-sm font-bold`}>
                  {(language === "ar" ? item.nameAr : item.nameEn).split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-sm">
                    {language === "ar" ? item.nameAr : item.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === "ar" ? item.roleAr : item.roleEn}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {language === "ar" ? item.messageAr : item.messageEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
