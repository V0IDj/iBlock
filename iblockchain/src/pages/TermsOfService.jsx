import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";
import { Shield, ArrowLeft } from "lucide-react";

export function TermsOfService() {
  const { t, isRTL } = useLanguage();

  const sections = [
    { title: "Acceptance of Terms", content: "By using iBlockchain services, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, you may not use our services." },
    { title: "Service Description", content: "iBlockchain provides digital asset management services, including secure centralized wallets, regulated custodial services, and fiat-to-crypto conversion services." },
    { title: "Account Requirements", content: "You must be 18 years or older to use our services. You must complete the identity verification process (KYC) and provide accurate and complete information." },
    { title: "Account Security", content: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account." },
    { title: "Prohibited Use", content: "It is prohibited to use our services for any illegal activities, including money laundering, terrorist financing, fraud, or any activity that violates applicable laws." },
    { title: "Fees and Payments", content: "Some services may be subject to fees. You will be informed of any applicable fees before completing a transaction. All fees are non-refundable unless otherwise stated." },
    { title: "Limitation of Liability", content: "iBlockchain shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services." },
    { title: "Modifications", content: "We reserve the right to modify these terms at any time. You will be notified of any material changes, and your continued use of the services constitutes your acceptance of the modified terms." },
    { title: "Governing Law", content: "These terms shall be governed by and construed in accordance with applicable laws, and any disputes shall be resolved through binding arbitration." },
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
            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
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
