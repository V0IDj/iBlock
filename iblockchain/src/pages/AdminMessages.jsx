import { useLanguage } from "../contexts/LanguageContext";
export function AdminMessages() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "الرسائل" : "Messages"}</h1><p className="text-muted-foreground">{isAr ? "تواصل مع العملاء" : "Client communication"}</p></div>;
}