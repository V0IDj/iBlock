import { useLanguage } from "../contexts/LanguageContext";
import { TrendingUp } from "lucide-react";
export function DashboardPrices() {
  const { language } = useLanguage();
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6" />{language === "ar" ? "أسعار العملات" : "Crypto Prices"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "أسعار مباشرة" : "Live prices"}</p></div>;
}