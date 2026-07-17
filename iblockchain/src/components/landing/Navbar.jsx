import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/Button";
import { Shield, Globe, Menu, X } from "lucide-react";

export function Navbar() {
  const { t, toggleLanguage, language, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.prices"), to: "/prices" },
    { label: t("nav.about"), to: "/about-us" },
    { label: t("nav.howItWorks"), href: "#process" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className="glass-nav sticky top-0 z-50" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">iBlockchain</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, i) =>
              link.to ? (
                <Link
                  key={i}
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={i}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/auth">{t("nav.login")}</Link>
            </Button>
            <Button variant="premium" asChild>
              <Link to="/auth?mode=signup">{t("nav.getStarted")}</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link, i) =>
                link.to ? (
                  <Link
                    key={i}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                  <Globe className="h-4 w-4" />
                </Button>
                <Button variant="ghost" asChild className="flex-1">
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    {t("nav.login")}
                  </Link>
                </Button>
                <Button variant="premium" asChild className="flex-1">
                  <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}>
                    {t("nav.getStarted")}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
