import { useLanguage } from "../contexts/LanguageContext";
export function AdminAudit() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  return <div className="space-y-6"><h1 className="text-2xl font-bold">{isAr ? "سجل المراقبة" : "Audit Log"}</h1><p className="text-muted-foreground">{isAr ? "مراقبة جميع إجراءات الأدمن" : "Monitor all admin actions"}</p></div>;
}