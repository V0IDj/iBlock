import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card } from "../ui/Card";
import { CreditCard, Copy, Check, User, Mail, MapPin } from "lucide-react";

export function WalletCard({ fullName, email, walletId, country, capital, profits, totalRecovered, currency }) {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
  const total = (capital || 0) + (profits || 0) + (totalRecovered || 0);

  return (
    <Card className="overflow-hidden border-0 shadow-xl">
      <div className="wallet-gradient p-6 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04]" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/[0.03]" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">iBlockchain</h3>
                <p className="text-sm text-white/70">{t("wallet.globalWallet")}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60 uppercase tracking-wider">{t("wallet.totalBalance")}</p>
              <p className="text-3xl font-bold mt-1">${total.toLocaleString()}</p>
              <p className="text-xs text-white/60 mt-0.5">{currency || "USD"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm border border-white/10 mb-5">
            <span className="text-xs text-white/60">{t("wallet.walletId")}:</span>
            <span className="text-sm font-mono flex-1 tracking-wider">{walletId}</span>
            <button
              onClick={() => { navigator.clipboard.writeText(walletId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="hover:bg-white/15 rounded-lg p-1.5 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><User className="h-4 w-4 text-white/80" /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">{t("wallet.accountHolder")}</p>
                <p className="text-sm font-medium">{fullName || t("wallet.notSet")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Mail className="h-4 w-4 text-white/80" /></div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50">{t("wallet.email")}</p>
                <p className="text-sm font-medium truncate max-w-[140px]">{email}</p>
              </div>
            </div>
            {country && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><MapPin className="h-4 w-4 text-white/80" /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">{t("wallet.country")}</p>
                  <p className="text-sm font-medium">{country}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}