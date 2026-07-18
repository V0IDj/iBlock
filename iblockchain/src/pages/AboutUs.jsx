import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { ArrowLeft, Wallet, Shield, CreditCard, Lock, Headphones, Scale, Server, ShieldCheck, TrendingUp } from "lucide-react";

const solutions = [
  { key: "wallets", icon: Wallet },
  { key: "custodial", icon: Shield },
  { key: "onboarding", icon: CreditCard },
  { key: "security", icon: Lock },
  { key: "support", icon: Headphones },
  { key: "compliance", icon: Scale },
];

const securityItems = [
  { key: "storage", icon: Server },
  { key: "encryption", icon: Lock },
  { key: "aml", icon: ShieldCheck },
  { key: "regulatory", icon: Scale },
];

export function AboutUs() {
  const { t, isRTL, dir } = useLanguage();

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">iBLOCKCHAIN</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4">Transforming Digital Asset Management</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              In an increasingly digitized financial ecosystem, accessibility, security, and regulatory compliance are paramount. We envision a future where digital asset management is as seamless and reliable as traditional banking—without the complexities and risks associated with decentralized storage. Our solutions empower users with the ability to manage their cryptocurrencies efficiently within a structured, legally compliant, and highly secure framework.
            </p>
          </motion.div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">Our Solutions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Institutional-Grade Centralized Wallets</h3>
                  <p className="text-sm text-muted-foreground">Providing a secure and compliant environment for managing digital assets while ensuring ease of access and robust protection.</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">Unmatched Security</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Cold and Hot Wallet Storage</h3>
                  <p className="text-sm text-muted-foreground">Combining offline (cold storage) and online (hot wallet) solutions to optimize both security and liquidity.</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-10 text-center">Why Choose Us?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Regulated & Secure", desc: "A fully compliant platform that adheres to global financial regulations, offering users peace of mind.", icon: Shield },
                { title: "Enterprise-Grade Custodial Services", desc: "A sophisticated yet intuitive interface, designed to accommodate both retail and institutional investors.", icon: Server },
                { title: "Scalability & Future-Proof Technology", desc: "A robust infrastructure that adapts to the evolving blockchain landscape, ensuring long-term reliability.", icon: TrendingUp },
                { title: "Dedicated Customer Support", desc: "Unlike decentralized wallets, our clients benefit from 24/7 account recovery assistance and technical support.", icon: Headphones },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Join the Future */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Join the Future of Digital Asset Management</h2>
            <p className="text-muted-foreground mb-8">At iBlockchain, we don't just provide a service—we set the standard for secure, compliant, and scalable digital asset management.</p>
            <Button size="lg" variant="premium" asChild>
              <Link to="/auth?mode=signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="border-t border-border mt-16 py-6 text-center text-sm text-muted-foreground">
        © 2024 iBlockchain. All Rights Reserved.
      </div>
    </div>
  );
}
