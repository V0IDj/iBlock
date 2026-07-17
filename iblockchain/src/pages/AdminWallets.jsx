import { useLanguage } from "../contexts/LanguageContext";
export function AdminWallets() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "إدارة المحافظ" : "Wallet Management"}</h1><p className="text-muted-foreground">{isAr ? "إدارة محافظ الإيداع" : "Manage deposit wallets"}</p></div>;
}