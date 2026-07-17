import { useLanguage } from "../contexts/LanguageContext";
import { Wallet } from "lucide-react";
export function DashboardPortfolio() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><Wallet className="h-6 w-6" />{isAr ? "المحفظة" : "Portfolio"}</h1><p className="text-muted-foreground mt-1">{isAr ? "نظرة شاملة على أصولك" : "Your asset overview"}</p></div>;
}