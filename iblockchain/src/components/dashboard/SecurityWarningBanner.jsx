import { useLanguage } from "../../contexts/LanguageContext";
import { ShieldAlert } from "lucide-react";

export function SecurityWarningBanner() {
  const { language } = useLanguage();

  return (
    <div className="rounded-lg border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 p-4">
      <div className="flex items-start gap-3">
        <ShieldAlert className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">
            {language === "ar" ? "⚠️ تنبيه أمني مهم" : "⚠️ Important Security Notice"}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            {language === "ar"
              ? "يتم التحويل فقط على المحافظ الموجودة في الموقع. أي تحويل يتم على أي عنوان آخر يُعتبر احتيالاً، حتى لو طلب منك ذلك المندوب الذي يعمل معك — فهو غير تابع لنا. التحويل فقط عن طريق المحفظة الموجودة في الموقع."
              : "Transfers are only accepted to wallets listed on this website. Any transfer to any other address is considered fraud, even if requested by a representative working with you — they are not affiliated with us. Only transfer through the wallet provided on this site."}
          </p>
        </div>
      </div>
    </div>
  );
}