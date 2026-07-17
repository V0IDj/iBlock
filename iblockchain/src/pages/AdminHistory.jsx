import { useLanguage } from "../contexts/LanguageContext";
export function AdminHistory() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "سجل المعاملات" : "Transaction History"}</h1><p className="text-muted-foreground">{isAr ? "سجل جميع المعاملات" : "All transactions history"}</p></div>;
}