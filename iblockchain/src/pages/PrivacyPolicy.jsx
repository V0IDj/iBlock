import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";
import { Shield, ArrowLeft } from "lucide-react";

export function PrivacyPolicy() {
  const { t, isRTL } = useLanguage();

  const sections = [
    { title: "Information Collection", content: "We collect information you provide directly to us, including name, email, phone number, and identity verification documents. We also automatically collect information about your use of our services." },
    { title: "Use of Information", content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send notifications related to your account, and comply with legal requirements." },
    { title: "Data Security", content: "We implement technical and administrative security measures designed to protect your personal information from unauthorized access, disclosure, alteration, and destruction." },
    { title: "Information Sharing", content: "We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our platform, or when necessary to comply with laws." },
    { title: "Your Rights", content: "You have the right to access, correct, and delete your personal information. You can also object to the processing of your data or request its restriction." },
    { title: "Cookies", content: "We use cookies and similar technologies to improve your experience on our platform and analyze site usage." },
    { title: "Policy Updates", content: "We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page." },
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
            </Link>
          </Button>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
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
