import { useLanguage } from "../contexts/LanguageContext";
import { Coins } from "lucide-react";
export function DashboardStaking() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><Coins className="h-6 w-6" />{isAr ? "الستاكينغ" : "Staking"}</h1><p className="text-muted-foreground mt-1">{isAr ? "اكسب أرباحاً من عملاتك" : "Earn on your crypto"}</p></div>;
}