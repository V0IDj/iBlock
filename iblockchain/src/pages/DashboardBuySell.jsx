import { useLanguage } from "../contexts/LanguageContext";
import { ShoppingCart } from "lucide-react";
export function DashboardBuySell() {
  const { language } = useLanguage();
  return <div className="space-y-6"><h1 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart className="h-6 w-6" />{language === "ar" ? "شراء وبيع" : "Buy & Sell"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "شراء وبيع الأصول" : "Buy and sell assets"}</p></div>;
}