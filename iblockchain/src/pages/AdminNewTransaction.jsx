import { useLanguage } from "../contexts/LanguageContext";
export function AdminNewTransaction() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6 max-w-2xl mx-auto"><h1 className="text-2xl font-bold">{isAr ? "إضافة معاملة" : "New Transaction"}</h1><p className="text-muted-foreground">{isAr ? "إنشاء معاملة يدوية" : "Create manual transaction"}</p></div>;
}