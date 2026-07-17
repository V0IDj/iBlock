import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { User, Mail, MapPin, Smartphone, FileText, Shield } from "lucide-react";

export function DashboardAccount() {
  const { language } = useLanguage();
  const { profile, kyc, finances } = useDashboard();
  const isAr = language === "ar";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "حسابي" : "My Account"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "معلومات حسابك ومحفظتك" : "Your account and wallet info"}</p>
      </div>

      <Card className="wallet-gradient text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/[0.04]" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">iBlockchain</h3>
                  <p className="text-sm text-white/70">{isAr ? "المحفظة الرئيسية" : "Global Wallet"}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60 uppercase tracking-wider">{isAr ? "الرصيد الإجمالي" : "Total Balance"}</p>
                <p className="text-3xl font-bold mt-1">${((finances?.capital||0)+(finances?.profits||0)+(finances?.total_recovered||0)).toLocaleString()}</p>
                <p className="text-xs text-white/60 mt-0.5">{finances?.currency || "USD"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2.5 backdrop-blur-sm mb-4">
              <span className="text-xs text-white/60">{isAr ? "رقم المحفظة:" : "Wallet ID:"}</span>
              <span className="text-sm font-mono flex-1 tracking-wider">{profile?.wallet_id}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><User className="h-4 w-4 text-white/80" /></div>
                <div><p className="text-[10px] uppercase tracking-wider text-white/50">{isAr ? "اسم الحساب" : "Account Holder"}</p><p className="text-sm font-medium">{profile?.full_name || "-"}</p></div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Mail className="h-4 w-4 text-white/80" /></div>
                <div><p className="text-[10px] uppercase tracking-wider text-white/50">Email</p><p className="text-sm font-medium truncate max-w-[140px]">{profile?.email}</p></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />{isAr ? "المعلومات الشخصية" : "Personal Information"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <User className="h-5 w-5 text-muted-foreground" />
            <div><p className="text-xs text-muted-foreground">{isAr ? "الاسم الكامل" : "Full Name"}</p><p className="font-medium">{profile?.full_name || "-"}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{profile?.email}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div><p className="text-xs text-muted-foreground">{isAr ? "الدولة" : "Country"}</p><p className="font-medium">{profile?.country || "-"}</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />{isAr ? "حالة التحقق" : "Verification Status"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span>{isAr ? "التحقق من الهوية (KYC)" : "Identity Verification (KYC)"}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${kyc?.status === "approved" ? "bg-emerald-500/10 text-emerald-400" : kyc?.status === "pending" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>
              {kyc?.status === "approved" ? (isAr ? "مُوثق" : "Verified") : kyc?.status === "pending" ? (isAr ? "قيد المراجعة" : "Pending") : (isAr ? "مرفوض" : "Rejected")}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}