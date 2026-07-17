import { useLanguage } from "../contexts/LanguageContext";
import { TrendingUp } from "lucide-react";
export function DashboardPrices() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="h-6 w-6" />{isAr ? "أسعار العملات" : "Crypto Prices"}</h1><p className="text-muted-foreground mt-1">{isAr ? "أسعار مباشرة ومحدثة" : "Live and updated prices"}</p></div>;
}