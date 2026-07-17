import { useLanguage } from "../contexts/LanguageContext";
import { Search } from "lucide-react";
export function DashboardMarket() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "السوق" : "Market"}</h1><p className="text-muted-foreground mt-1">{isAr ? "تتبع أسعار العملات" : "Track crypto prices"}</p></div>;
}