import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";
import { Shield, ArrowLeft } from "lucide-react";

export function PrivacyPolicy() {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const sections = [
    { titleEn: "Information Collection", titleAr: "جمع المعلومات", contentEn: "We collect information you provide directly to us, including name, email, phone number, and identity verification documents. We also automatically collect information about your use of our services.", contentAr: "نقوم بجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف ووثائق التحقق من الهوية. كما نقوم تلقائياً بجمع معلومات حول استخدامك لخدماتنا." },
    { titleEn: "Use of Information", titleAr: "استخدام المعلومات", contentEn: "We use the information we collect to provide, maintain, and improve our services, process transactions, send notifications related to your account, and comply with legal requirements.", contentAr: "نستخدم المعلومات التي نجمعها لتقديم خدماتنا وصيانتها وتحسينها ومعالجة المعاملات وإرسال الإشعارات المتعلقة بحسابك والامتثال للمتطلبات القانونية." },
    { titleEn: "Data Security", titleAr: "أمن البيانات", contentEn: "We implement technical and administrative security measures designed to protect your personal information from unauthorized access, disclosure, alteration, and destruction.", contentAr: "ننفذ تدابير أمنية تقنية وإدارية مصممة لحماية معلوماتك الشخصية من الوصول غير المصرح به والإفصاح والتعديل والتدمير." },
    { titleEn: "Information Sharing", titleAr: "مشاركة المعلومات", contentEn: "We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our platform, or when necessary to comply with laws.", contentAr: "نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع مزودي الخدمة الذين يساعدوننا في تشغيل منصتنا، أو عند الضرورة للامتثال للقوانين." },
    { titleEn: "Your Rights", titleAr: "حقوقك", contentEn: "You have the right to access, correct, and delete your personal information. You can also object to the processing of your data or request its restriction.", contentAr: "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك أيضاً الاعتراض على معالجة بياناتك أو طلب تقييدها." },
    { titleEn: "Cookies", titleAr: "ملفات تعريف الارتباط", contentEn: "We use cookies and similar technologies to improve your experience on our platform and analyze site usage.", contentAr: "نستخدم ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك على منصتنا وتحليل استخدام الموقع." },
    { titleEn: "Policy Updates", titleAr: "تحديثات السياسة", contentEn: "We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.", contentAr: "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة في هذه الصفحة." },
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
            <h1 className="text-3xl font-bold mb-2">{isAr ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
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