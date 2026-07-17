import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, CheckCircle2, Lock, LoaderCircle } from "lucide-react";

export function ResetPassword() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isValidLink, setIsValidLink] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let recovered = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") { recovered = true; setIsValidLink(true); setChecking(false); }
      if (event === "SIGNED_IN" && session && !recovered) { setIsValidLink(true); setChecking(false); }
    });
    const url = window.location.href;
    if (url.includes("type=recovery") || url.includes("token_hash")) {
      setTimeout(() => setChecking(false), 3000);
    } else {
      setChecking(false);
    }
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSuccess(true);
      toast({ title: "Success", description: "Password updated successfully" });
      setTimeout(() => navigate("/dashboard"), 2000);
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success || isValidLink) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <Card className="w-full max-w-md glass-card border-border/50 relative z-10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">iBlockchain</span>
            </div>
            <CardTitle className="text-2xl">{t("reset.title")}</CardTitle>
            <CardDescription>{t("reset.desc")}</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium">{t("reset.success")}</p>
                <p className="text-sm text-muted-foreground">{t("reset.redirecting")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t("reset.newPassword")}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className={isRTL ? "pr-10" : "pl-10"} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("reset.confirmNewPassword")}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={isRTL ? "pr-10" : "pl-10"} required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary" disabled={loading}>
                  {loading ? <LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {t("reset.submit")}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md glass-card border-border/50">
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">{t("reset.invalidLink")}</p>
          <Button className="mt-4" onClick={() => navigate("/auth")}>{t("forgot.backToLogin")}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
