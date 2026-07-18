import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";
import { Shield, ArrowLeft } from "lucide-react";

export function TermsOfService() {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const sections = [
    { titleEn: "Acceptance of Terms", titleAr: "قبول الشروط", contentEn: "By using iBlockchain services, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, you may not use our services.", contentAr: "باستخدام خدمات iBlockchain، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء من هذه الشروط، فلا يجوز لك استخدام خدماتنا." },
    { titleEn: "Service Description", titleAr: "وصف الخدمة", contentEn: "iBlockchain provides digital asset management services, including secure centralized wallets, regulated custodial services, and fiat-to-crypto conversion services.", contentAr: "تقدم iBlockchain خدمات إدارة الأصول الرقمية، بما في ذلك المحافظ المركزية الآمنة وخدمات الحفظ المنظمة وخدمات تحويل العملات التقليدية إلى رقمية." },
    { titleEn: "Account Requirements", titleAr: "متطلبات الحساب", contentEn: "You must be 18 years or older to use our services. You must complete the identity verification process (KYC) and provide accurate and complete information.", contentAr: "يجب أن يكون عمرك 18 سنة أو أكثر لاستخدام خدماتنا. يجب عليك إكمال عملية التحقق من الهوية (KYC) وتقديم معلومات دقيقة وكاملة." },
    { titleEn: "Account Security", titleAr: "أمان الحساب", contentEn: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account.", contentAr: "أنت مسؤول عن الحفاظ على سرية بيانات اعتماد حسابك. يجب عليك إبلاغنا فوراً عن أي استخدام غير مصرح به لحسابك." },
    { titleEn: "Prohibited Use", titleAr: "الاستخدام المحظور", contentEn: "It is prohibited to use our services for any illegal activities, including money laundering, terrorist financing, fraud, or any activity that violates applicable laws.", contentAr: "يمنع استخدام خدماتنا لأي أنشطة غير قانونية، بما في ذلك غسل الأموال وتمويل الإرهاب والاحتيال أو أي نشاط ينتهك القوانين المعمول بها." },
    { titleEn: "Fees and Payments", titleAr: "الرسوم والمدفوعات", contentEn: "Some services may be subject to fees. You will be informed of any applicable fees before completing a transaction. All fees are non-refundable unless otherwise stated.", contentAr: "قد تخضع بعض الخدمات للرسوم. سيتم إعلامك بأي رسوم مطبقة قبل إتمام المعاملة. جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك." },
    { titleEn: "Limitation of Liability", titleAr: "الحد من المسؤولية", contentEn: "iBlockchain shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services.", contentAr: "لا تتحمل iBlockchain المسؤولية عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناشئة عن استخدام أو عدم القدرة على استخدام خدماتنا." },
    { titleEn: "Modifications", titleAr: "التعديلات", contentEn: "We reserve the right to modify these terms at any time. You will be notified of any material changes, and your continued use of the services constitutes your acceptance of the modified terms.", contentAr: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية، واستمرارك في استخدام الخدمات يشكل قبولاً للشروط المعدلة." },
    { titleEn: "Governing Law", titleAr: "القانون المنظم", contentEn: "These terms shall be governed by and construed in accordance with applicable laws, and any disputes shall be resolved through binding arbitration.", contentAr: "تخضع هذه الشروط وتفسر وفقاً للقوانين المعمول بها، ويتم حل أي نزاعات من خلال التحكيم الملزم." },
  ];

  return (
    <div>
      <nav className="glass-nav sticky top-0 z-50">
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
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">{isAr ? "شروط الخدمة" : "Terms of Service"}</h1>
            <p className="text-sm text-muted-foreground mb-8">{isAr ? "آخر تحديث: يناير 2025" : "Last updated: January 2025"}</p>
            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-semibold mb-3">{isAr ? section.titleAr : section.titleEn}</h2>
                  <p className="text-muted-foreground leading-relaxed">{isAr ? section.contentAr : section.contentEn}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter year={2024} />
    </div>
  );
}