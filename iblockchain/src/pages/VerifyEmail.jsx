import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, ArrowLeft, Mail, Timer, LoaderCircle } from "lucide-react";
import { OTPInput } from "input-otp";

export function VerifyEmail() {
  const { t, isRTL, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || sessionStorage.getItem("pendingVerificationEmail") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const BackIcon = isRTL ? ArrowLeft : ArrowLeft;

  useEffect(() => { if (!email) navigate("/auth?mode=signup"); }, [email, navigate]);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setTimeout(() => setTimer(t => t - 1), 1000);
      return () => clearTimeout(interval);
    }
    if (timer === 0) setCanResend(true);
  }, [timer, canResend]);

  const handleVerify = async () => {
    if (!email || code.length !== 6) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-signup-code", { body: { email, code } });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || "Verification failed");
      sessionStorage.removeItem("pendingVerificationEmail");
      toast({ title: "Verified!", description: "Your email has been verified." });
      navigate("/auth?mode=login");
    } catch (err) {
      toast({ title: "Invalid code", description: err.message || "Please try again", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <Card className="w-full max-w-md glass-card relative z-10">
        <CardHeader className="text-center">
          <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors">
            <BackIcon className="h-4 w-4" />{t("auth.backToHome")}
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <Mail className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">{language === "ar" ? "تأكيد البريد الإلكتروني" : "Verify Email"}</CardTitle>
          <CardDescription>{language === "ar" ? "أدخل رمز التحقق المرسل إلى بريدك" : "Enter the verification code sent to your email"}</CardDescription>
          {email && <p className="text-sm text-primary mt-2 font-medium">{email}</p>}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <OTPInput value={code} onChange={setCode} maxLength={6}
              render={({ slots }) => (
                <div className="flex items-center gap-2">
                  {slots.slice(0, 3).map((slot, i) => (
                    <div key={i} className={`relative flex h-12 w-12 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md ${slot.isActive ? 'z-10 ring-2 ring-ring ring-offset-background' : ''}`}>
                      {slot.char !== null ? <div className="text-lg font-semibold">{slot.char}</div> : null}
                      {slot.isActive && slot.char === null ? <div className="animate-caret-blink h-5 w-px bg-foreground" /> : null}
                    </div>
                  ))}
                  <div className="flex items-center justify-center w-4 text-muted-foreground">-</div>
                  {slots.slice(3, 6).map((slot, i) => (
                    <div key={i + 3} className={`relative flex h-12 w-12 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md ${slot.isActive ? 'z-10 ring-2 ring-ring ring-offset-background' : ''}`}>
                      {slot.char !== null ? <div className="text-lg font-semibold">{slot.char}</div> : null}
                      {slot.isActive && slot.char === null ? <div className="animate-caret-blink h-5 w-px bg-foreground" /> : null}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
          <Button onClick={handleVerify} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary" disabled={loading || code.length !== 6}>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : (language === "ar" ? "تأكيد" : "Verify")}
          </Button>
          <div className="text-center space-y-2">
            {!canResend && timer > 0 ? (
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <Timer className="h-4 w-4" />
                <span>{language === "ar" ? "إعادة الإرسال بعد" : "Resend after"} <span className="font-mono text-primary font-semibold">{timer}</span> {language === "ar" ? "ثانية" : "s"}</span>
              </div>
            ) : (
              <button type="button" onClick={async () => {
                if (!email || resending) return;
                setResending(true);
                try {
                  toast({ title: "Info", description: "Please sign up again to receive a new code." });
                  navigate("/auth?mode=signup");
                } catch (e) { toast({ title: "Error", variant: "destructive" }); }
                setResending(false);
                setTimer(60);
                setCanResend(false);
              }} disabled={resending} className="text-primary hover:underline text-sm disabled:opacity-50">
                {language === "ar" ? "إعادة إرسال الرمز" : "Resend code"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}