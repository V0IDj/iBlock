import { useLanguage } from "../contexts/LanguageContext";
import { Gift } from "lucide-react";
export function DashboardReferral() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><Gift className="h-6 w-6" />{isAr ? "الإحالة" : "Referral Program"}</h1><p className="text-muted-foreground mt-1">{isAr ? "ادعُ أصدقاءك واكسب مكافآت" : "Invite friends and earn rewards"}</p></div>;
}