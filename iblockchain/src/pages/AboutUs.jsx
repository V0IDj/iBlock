import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { ArrowLeft, Wallet, Shield, CreditCard, Lock, Headphones, Scale, Server, ShieldCheck, TrendingUp } from "lucide-react";

const solutions = [
  { key: "wallets", titleEn: "Institutional-Grade Centralized Wallets", titleAr: "محافظ مركزية على مستوى المؤسسات", descEn: "Providing a secure and compliant environment for managing digital assets while ensuring ease of access and robust protection.", descAr: "توفير بيئة آمنة ومتوافقة لإدارة الأصول الرقمية مع ضمان سهولة الوصول والحماية القوية.", icon: Wallet },
  { key: "custodial", titleEn: "Regulated Custodial Services", titleAr: "خدمات حفظ منظمة", descEn: "Offering enterprise-grade security and storage solutions for individuals, institutions, and businesses.", descAr: "تقديم حلول أمنية وتخزينية على مستوى المؤسسات للأفراد والمؤسسات والشركات.", icon: Shield },
  { key: "onboarding", titleEn: "Seamless Fiat-to-Crypto Onboarding", titleAr: "انضمام سلس من العملات التقليدية إلى الرقمية", descEn: "Enabling effortless conversions between fiat currencies and cryptocurrencies with a wide range of supported payment methods.", descAr: "تمكين التحويلات السهلة بين العملات التقليدية والرقمية مع مجموعة واسعة من طرق الدفع.", icon: CreditCard },
  { key: "security", titleEn: "Advanced Security Protocols", titleAr: "بروتوكولات أمان متقدمة", descEn: "Incorporating multi-layer encryption, cold storage solutions, and multi-factor authentication (MFA) to ensure maximum asset protection.", descAr: "تضمين تشفير متعدد الطبقات وحلول تخزين بارد وتوثيق متعدد العوامل لضمان أقصى حماية للأصول.", icon: Lock },
  { key: "support", titleEn: "24/7 Account Recovery & Support", titleAr: "استرداد الحساب والدعم على مدار الساعة", descEn: "Unlike decentralized solutions, we provide secure and efficient account recovery mechanisms, ensuring uninterrupted access to your funds.", descAr: "على عكس الحلول اللامركزية، نقدم آليات استرداد حساب آمنة وفعالة، مما يضمن وصولاً متواصلاً لأموالك.", icon: Headphones },
  { key: "compliance", titleEn: "Institutional-Grade Compliance", titleAr: "امتثال على مستوى المؤسسات", descEn: "Aligning with global financial regulations to provide a transparent, secure, and fully compliant financial environment.", descAr: "المواءمة مع اللوائح المالية العالمية لتوفير بيئة مالية شفافة وآمنة ومتوافقة بالكامل.", icon: Scale },
];

const securityItems = [
  { key: "storage", titleEn: "Cold and Hot Wallet Storage", titleAr: "تخزين المحافظ الباردة والساخنة", descEn: "Combining offline (cold storage) and online (hot wallet) solutions to optimize both security and liquidity.", descAr: "الجمع بين حلول التخزين غير المتصل (التخزين البارد) والمتصل (المحفظة الساخنة) لتحسين الأمان والسيولة.", icon: Server },
  { key: "encryption", titleEn: "End-to-End Encryption & MFA", titleAr: "تشفير شامل ومصادقة متعددة العوامل", descEn: "Providing an uncompromising security infrastructure to protect user accounts and assets.", descAr: "توفير بنية تحتية أمنية لا تقبل المساومة لحماية حسابات المستخدمين وأصولهم.", icon: Lock },
  { key: "aml", titleEn: "AML/KYC-Integrated Framework", titleAr: "إطار عمل متكامل لمكافحة غسل الأموال والتحقق من الهوية", descEn: "Ensuring full compliance with global anti-money laundering and know-your-customer standards, reinforcing trust and transparency.", descAr: "ضمان الامتثال الكامل لمعايير مكافحة غسل الأموال العالمية ومعايير اعرف عميلك، مما يعزز الثقة والشفافية.", icon: ShieldCheck },
  { key: "regulatory", titleEn: "Regulatory Licensing & Compliance", titleAr: "الترخيص والامتثال التنظيمي", descEn: "Partnering with financial authorities to ensure that all operations adhere to the latest financial regulations.", descAr: "الشراكة مع السلطات المالية لضمان امتثال جميع العمليات لأحدث اللوائح المالية.", icon: Scale },
];

const whyChooseItems = [
  { titleEn: "Regulated & Secure", titleAr: "منظم وآمن", descEn: "A fully compliant platform that adheres to global financial regulations, offering users peace of mind.", descAr: "منصة متوافقة بالكامل تلتزم باللوائح المالية العالمية، مما يمنح المستخدمين راحة البال." },
  { titleEn: "Enterprise-Grade Custodial Services", titleAr: "خدمات حفظ على مستوى المؤسسات", descEn: "A sophisticated yet intuitive interface, designed to accommodate both retail and institutional investors.", descAr: "واجهة متطورة وبديهية، مصممة لتناسب المستثمرين الأفراد والمؤسسات." },
  { titleEn: "Scalability & Future-Proof Technology", titleAr: "تقنية قابلة للتوسع ومستقبلية", descEn: "A robust infrastructure that adapts to the evolving blockchain landscape, ensuring long-term reliability.", descAr: "بنية تحتية قوية تتكيف مع مشهد البلوكتشين المتطور، مما يضمن الموثوقية على المدى الطويل." },
  { titleEn: "Dedicated Customer Support", titleAr: "دعم عملاء مخصص", descEn: "Unlike decentralized wallets, our clients benefit from 24/7 account recovery assistance and technical support.", descAr: "على عكس المحافظ اللامركزية، يستفيد عملاؤنا من مساعدة استرداد الحساب والدعم الفني على مدار الساعة." },
];

export function AboutUs() {
  const { t, isRTL, dir, language } = useLanguage();
  const isAr = language === "ar";

  return (
    <div dir={dir}>
      <div className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">iBlockchain</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("common.back")}
            </Link>
          </Button>
        </div>
      </div>

      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">iBLOCKCHAIN</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4">{isAr ? "تحويل إدارة الأصول الرقمية" : "Transforming Digital Asset Management"}</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-6">{isAr ? "رؤيتنا" : "Our Vision"}</h2>
            <p className="text-muted-foreground leading-relaxed">{isAr
              ? "في ظل النظام المالي الرقمي المتزايد، تعتبر إمكانية الوصول والأمان والامتثال التنظيمي أموراً بالغة الأهمية. نحن نتصور مستقبلاً تكون فيه إدارة الأصول الرقمية سلسة وموثوقة مثل الخدمات المصرفية التقليدية - دون التعقيدات والمخاطر المرتبطة بالتخزين اللامركزي. تمكن حلولنا المستخدمين من إدارة عملاتهم الرقمية بكفاءة ضمن إطار منظم وقانوني وآمن للغاية."
              : "In an increasingly digitized financial ecosystem, accessibility, security, and regulatory compliance are paramount. We envision a future where digital asset management is as seamless and reliable as traditional banking—without the complexities and risks associated with decentralized storage. Our solutions empower users with the ability to manage their cryptocurrencies efficiently within a structured, legally compliant, and highly secure framework."}
            </p>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">{isAr ? "حلولنا" : "Our Solutions"}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((item, i) => (
                <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{isAr ? item.titleAr : item.titleEn}</h3>
                  <p className="text-sm text-muted-foreground">{isAr ? item.descAr : item.descEn}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">{isAr ? "أمان لا مثيل له" : "Unmatched Security"}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityItems.map((item, i) => (
                <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{isAr ? item.titleAr : item.titleEn}</h3>
                  <p className="text-sm text-muted-foreground">{isAr ? item.descAr : item.descEn}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">{isAr ? "لماذا تختارنا؟" : "Why Choose Us?"}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseItems.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-2">{isAr ? item.titleAr : item.titleEn}</h3>
                  <p className="text-sm text-muted-foreground">{isAr ? item.descAr : item.descEn}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{isAr ? "انضم إلى مستقبل إدارة الأصول الرقمية" : "Join the Future of Digital Asset Management"}</h2>
            <p className="text-muted-foreground mb-8">{isAr ? "في iBlockchain، لا نقدم مجرد خدمة - بل نضع المعيار لإدارة أصول رقمية آمنة ومتوافقة وقابلة للتطوير." : "At iBlockchain, we don't just provide a service—we set the standard for secure, compliant, and scalable digital asset management."}</p>
            <Button size="lg" variant="premium" asChild>
              <Link to="/auth?mode=signup">{t("hero.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border mt-16 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} iBlockchain. {isAr ? "جميع الحقوق محفوظة." : "All Rights Reserved."}
      </div>
    </div>
  );
}