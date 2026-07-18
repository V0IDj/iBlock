import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const steps = [
  { num: "1", icon: "UserPlus", gradient: "from-blue-500 to-blue-600" },
  { num: "2", icon: "FileText", gradient: "from-emerald-500 to-green-600" },
  { num: "3", icon: "Search", gradient: "from-amber-500 to-orange-500" },
  { num: "4", icon: "ShieldCheck", gradient: "from-purple-500 to-violet-600" },
];

export function HowItWorksSection() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";

  const content = [
    { title: isAr ? "التسجيل" : "Register", desc: isAr ? "أنشئ حسابك وأكمل عملية التحقق من الهوية" : "Create your account and complete identity verification" },
    { title: isAr ? "تقديم القضية" : "Submit Case", desc: isAr ? "قدم تفاصيل قضيتك والمستندات الداعمة" : "Provide your case details and supporting documents" },
    { title: isAr ? "التحليل والتتبع" : "Analysis & Tracking", desc: isAr ? "فريقنا يحلل القضية ويتتبع الأموال" : "Our team analyzes the case and tracks the funds" },
    { title: isAr ? "الاسترداد" : "Recovery", desc: isAr ? "نسترد أموالك ونحولها إلى حسابك" : "We recover your funds and transfer them to your account" },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{isAr ? "آلية العمل" : "How It Works"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {isAr ? "خطوات بسيطة وواضحة لاسترداد أموالك" : "Simple and clear steps to recover your funds"}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8">
          {content.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6 text-2xl font-bold glow-primary">
                {i + 1}
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}