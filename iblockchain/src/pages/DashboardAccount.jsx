import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../hooks/useToast";
import { WalletCard } from "../components/dashboard/WalletCard";
import { supabase } from "../lib/supabase";
import { User, Mail, MapPin, Smartphone, Shield, FileText, CheckCircle, LoaderCircle, ShieldCheck, LockKeyhole, X } from "lucide-react";

export function DashboardAccount() {
  const { language } = useLanguage();
  const { user, profile, kyc, finances } = useDashboard();
  const { toast } = useToast();
  const isAr = language === "ar";

  const [show2fa, setShow2fa] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [factorId, setFactorId] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [loading2fa, setLoading2fa] = useState(false);

  const handleEnable2fa = async () => {
    setLoading2fa(true);
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "iBlockchain Auth",
      });
      if (error) throw error;
      if (data) {
        setQrCode(data.totp.qr_code);
        setSecret(data.totp.secret);
        setFactorId(data.id);
        setShow2fa(true);
      }
    } catch (err) {
      toast({ title: "Error", description: err.message || "Failed to start 2FA setup", variant: "destructive" });
    }
    setLoading2fa(false);
  };

  const handleVerify2fa = async () => {
    if (!verifyCode || verifyCode.length !== 6) {
      toast({ title: "Error", description: isAr ? "أدخل رمز مكون من 6 أرقام" : "Enter a 6-digit code", variant: "destructive" });
      return;
    }
    setVerifying(true);
    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: verifyCode,
      });
      if (error) throw error;
      setEnrolled(true);
      setShow2fa(false);
      toast({ title: isAr ? "تم التفعيل!" : "2FA Enabled!", description: isAr ? "تم تفعيل المصادقة الثنائية بنجاح" : "Two-factor authentication enabled successfully" });
    } catch (err) {
      toast({ title: isAr ? "رمز خاطئ" : "Invalid Code", description: isAr ? "الرمز غير صحيح، حاول مرة أخرى" : "Code is incorrect, try again", variant: "destructive" });
    }
    setVerifying(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "حسابي" : "My Account"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "معلومات حسابك ومحفظتك" : "Your account and wallet info"}</p>
      </div>

      <WalletCard
        fullName={profile?.full_name || null}
        email={profile?.email || user?.email || ""}
        walletId={profile?.wallet_id || ""}
        country={profile?.country}
        capital={finances?.capital || 0}
        profits={finances?.profits || 0}
        totalRecovered={finances?.total_recovered || 0}
        currency={finances?.currency || "USD"}
      />

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
            <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium">{profile?.email || user?.email}</p></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div><p className="text-xs text-muted-foreground">{isAr ? "الدولة" : "Country"}</p><p className="font-medium">{profile?.country || "-"}</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5" />{isAr ? "المصادقة الثنائية (2FA)" : "Two-Factor Authentication (2FA)"}</CardTitle>
        </CardHeader>
        <CardContent>
          {enrolled ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="font-medium text-emerald-400">{isAr ? "المصادقة الثنائية مفعّلة" : "2FA is Enabled"}</p>
                <p className="text-xs text-muted-foreground mt-1">{isAr ? "حسابك محمي بطبقة أمان إضافية" : "Your account is protected with an extra security layer"}</p>
              </div>
            </div>
          ) : show2fa ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Shield className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-300">
                  {isAr ? "امسح الرمز أدناه بتطبيق المصادقة (Google Authenticator أو Authy) ثم أدخل الرمز المكون من 6 أرقام" : "Scan the QR code below with your authenticator app (Google Authenticator or Authy) then enter the 6-digit code"}
                </p>
              </div>
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">{isAr ? "أو أدخل الرمز يدوياً:" : "Or enter manually:"}</p>
                <code className="text-xs bg-muted/30 px-3 py-1 rounded font-mono select-all">{secret}</code>
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="000000"
                  value={verifyCode}
                  onChange={e => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="text-center text-2xl tracking-[0.5em] font-mono"
                  maxLength={6}
                  dir="ltr"
                />
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleVerify2fa} disabled={verifying}>
                    {verifying ? <LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
                    {isAr ? "تأكيد التفعيل" : "Verify & Enable"}
                  </Button>
                  <Button variant="outline" onClick={() => { setShow2fa(false); setVerifyCode(""); }}>
                    {isAr ? "إلغاء" : "Cancel"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {isAr ? "أضف طبقة حماية إضافية لحسابك باستخدام تطبيق المصادقة" : "Add an extra layer of security to your account using an authenticator app"}
              </p>
              <Button variant="outline" onClick={handleEnable2fa} disabled={loading2fa}>
                <LockKeyhole className="h-4 w-4 mr-2" />
                {isAr ? "تفعيل المصادقة الثنائية" : "Enable 2FA"}
              </Button>
            </div>
          )}
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
              {kyc?.status === "approved"
                ? (isAr ? "مُوثق" : "Verified")
                : kyc?.status === "pending"
                  ? (isAr ? "قيد المراجعة" : "Pending")
                  : (isAr ? "مرفوض" : "Rejected")}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}