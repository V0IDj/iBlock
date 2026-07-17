import { useLanguage } from "../contexts/LanguageContext";
import { ChartLine } from "lucide-react";
export function DashboardMarkets() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><ChartLine className="h-6 w-6" />{isAr ? "الأسواق الحية" : "Live Markets"}</h1><p className="text-muted-foreground mt-1">{isAr ? "أسواق عالمية" : "Global markets"}</p></div>;
}