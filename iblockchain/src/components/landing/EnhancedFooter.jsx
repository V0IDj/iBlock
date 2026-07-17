import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Shield } from "lucide-react";

export function EnhancedFooter() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">iBlockchain</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.overview")}</a></li>
              <li><a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.features")}</a></li>
              <li><Link to="/about-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.aboutUs")}</Link></li>
              <li><Link to="/prices" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.cryptoPrices")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.wallet")}</h4>
            <ul className="space-y-3">
              <li><Link to="/dashboard/deposit" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.deposit")}</Link></li>
              <li><Link to="/dashboard/withdrawal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.withdraw")}</Link></li>
              <li><Link to="/dashboard/transactions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.transactions")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              <li><Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.terms")}</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-4">
            <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.terms")}
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} iBlockchain. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
