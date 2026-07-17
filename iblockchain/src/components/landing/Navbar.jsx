import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/DropdownMenu";
import { Shield, Globe, Menu, X } from "lucide-react";

export function Navbar() {
  const { t, toggleLanguage, language, isRTL, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">iBlockchain</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.services")}
          </a>
          <Link to="/prices" className="text-muted-foreground hover:text-primary transition-colors">
            {language === "ar" ? "أسعار العملات" : "Prices"}
          </Link>
          <Link to="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
          <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.howItWorks")}
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.contact")}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all">
                <Globe className="h-4 w-4" />
                <span>{language === "ar" ? "العربية" : "English"}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl min-w-[120px]">
              <DropdownMenuItem
                onClick={() => setLanguage("ar")}
                className={`cursor-pointer ${language === "ar" ? "text-primary bg-primary/10" : ""}`}
              >
                <span className="mr-2">🇸🇦</span> العربية
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={`cursor-pointer ${language === "en" ? "text-primary bg-primary/10" : ""}`}
              >
                <span className="mr-2">🇺🇸</span> English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/auth">
            <button className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("nav.login")}
            </button>
          </Link>
          <Link to="/auth?mode=signup">
            <button className="text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl glow-primary transition-all">
              {t("nav.getStarted")}
            </button>
          </Link>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 overflow-hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {[
                { label: t("nav.services"), href: "#services" },
                { label: language === "ar" ? "أسعار العملات" : "Prices", to: "/prices" },
                { label: t("nav.about"), to: "/about-us" },
                { label: t("nav.howItWorks"), href: "#process" },
                { label: t("nav.contact"), href: "#contact" },
              ].map((link, i) =>
                link.to ? (
                  <Link key={i} to={link.to} onClick={() => setMobileOpen(false)}
                    className="py-2 text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a key={i} href={link.href} onClick={() => setMobileOpen(false)}
                    className="py-2 text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
