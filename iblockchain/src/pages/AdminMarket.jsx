import { useLanguage } from "../contexts/LanguageContext";
export function AdminMarket() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "إدارة السوق" : "Market Management"}</h1><p className="text-muted-foreground">{isAr ? "تحكم كامل بأصول السوق" : "Full market control"}</p></div>;
}