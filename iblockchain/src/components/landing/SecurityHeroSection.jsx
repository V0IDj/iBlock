import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield, ShieldCheck, Lock, Eye } from "lucide-react";

export function SecurityHeroSection() {
  const { language, isRTL } = useLanguage();
  const icons = [ShieldCheck, Lock, Eye];

  return (
    <section className="relative py-24 px-4 overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.7 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center"
          >
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
              />
              <motion.div
                className="absolute inset-8 md:inset-10 rounded-full border border-primary/15 bg-primary/[0.02]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
              />
              <div className="absolute inset-16 md:inset-20 rounded-full border border-primary/20 bg-primary/[0.04]" />
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/10"
                animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 flex items-center justify-center"
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0px hsl(213 94% 58% / 0)",
                    "0 0 50px hsl(213 94% 58% / 0.3)",
                    "0 0 0px hsl(213 94% 58% / 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="w-12 h-12 md:w-16 md:h-16 text-primary" />
              </motion.div>
              {icons.map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-11 h-11 rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-sm"
                  style={{
                    top: `${50 + 42 * Math.sin((2 * i * Math.PI) / 3)}%`,
                    left: `${50 + 42 * Math.cos((2 * i * Math.PI) / 3)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 * i }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4"
            >
              {language === "ar" ? "أمان لا يُضاهى" : "Unmatched Security"}
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-5 tracking-tight">
              {language === "ar" ? "أصولك الرقمية محمية على مدار الساعة" : "Your digital assets, protected around the clock"}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
              {language === "ar"
                ? "تستخدم iBlockchain تشفيراً عسكرياً متعدد الطبقات، ومصادقة بيومترية متقدمة، وتخزيناً بارداً لحماية أصولك من أي تهديد."
                : "iBlockchain uses military-grade multi-layer encryption, advanced biometric authentication, and cold storage to protect your assets from any threat."}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {language === "ar"
                ? "مع المراقبة المستمرة والتحقق الثنائي، يمكنك إدارة محفظتك وإجراء عمليات التحويل بثقة تامة."
                : "With continuous monitoring and two-factor verification, you can manage your wallet and make transfers with complete confidence."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
