import { useLanguage } from "../contexts/LanguageContext";
import { ChartLine } from "lucide-react";
export function DashboardMarkets() {
  const { language } = useLanguage();
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><ChartLine className="h-6 w-6" />{language === "ar" ? "الأسواق" : "Markets"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "جميع الأسواق" : "All markets"}</p></div>;
}