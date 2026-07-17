import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield } from "lucide-react";

const footerData = {
  en: [
    {
      title: "Company",
      links: [
        { label: "Overview", href: "#home" },
        { label: "Features", href: "#services" },
        { label: "About Us", href: "/about-us" },
        { label: "Crypto Prices", href: "/prices" },
      ],
    },
    {
      title: "Wallet",
      links: [
        { label: "Deposit", href: "/dashboard/deposit" },
        { label: "Withdraw", href: "/dashboard/withdrawal" },
        { label: "Transactions", href: "/dashboard/transactions" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Live Support", href: "/dashboard/support" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms-of-service" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ],
  ar: [
    {
      title: "الشركة",
      links: [
        { label: "نظرة عامة", href: "#home" },
        { label: "الخدمات", href: "#services" },
        { label: "من نحن", href: "/about-us" },
        { label: "أسعار العملات", href: "/prices" },
      ],
    },
    {
      title: "المحفظة",
      links: [
        { label: "إيداع", href: "/dashboard/deposit" },
        { label: "سحب", href: "/dashboard/withdrawal" },
        { label: "المعاملات", href: "/dashboard/transactions" },
      ],
    },
    {
      title: "الدعم",
      links: [
        { label: "الدعم المباشر", href: "/dashboard/support" },
        { label: "تواصل معنا", href: "#contact" },
      ],
    },
    {
      title: "قانوني",
      links: [
        { label: "شروط الخدمة", href: "/terms-of-service" },
        { label: "سياسة الخصوصية", href: "/privacy-policy" },
      ],
    },
  ],
};

const staticText = {
  en: { tagline: "Your Trusted Gateway to Digital Asset Recovery", rights: "All Rights Reserved." },
  ar: { tagline: "بوابتك الموثوقة لاسترداد الأصول الرقمية", rights: "جميع الحقوق محفوظة." },
};

export function EnhancedFooter() {
  const { language, isRTL } = useLanguage();
  const links = footerData[language] || footerData.en;
  const text = staticText[language] || staticText.en;

  return (
    <footer className="border-t border-border bg-card/30 pt-16 pb-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">iBlockchain</span>
            </Link>
            <p className="text-sm text-muted-foreground">{text.tagline}</p>
          </motion.div>
          {links.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <h4 className="font-bold text-foreground mb-4 text-sm">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
              {language === "ar" ? "شروط الخدمة" : "Terms of Service"}
            </Link>
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="text-primary">iBlockchain</span>. {text.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
