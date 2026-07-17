import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, ArrowLeft, Mail, LoaderCircle } from "lucide-react";

export function ForgotPassword() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
      toast({ title: "Sent!", description: "Check your email for the reset link." });
    }
    setLoading(false);
  };

  const BackIcon = isRTL ? ArrowLeft : ArrowLeft;
  const iconPos = isRTL ? "right-3" : "left-3";
  const inputPad = isRTL ? "pr-10" : "pl-10";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
      <Card className="w-full max-w-md glass-card border-border/50 relative z-10">
        <CardHeader className="text-center">
          <Link to="/auth" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors">
            <BackIcon className="h-4 w-4" />
            {t("forgot.backToLogin")}
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary">
              <Shield className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">iBlockchain</span>
          </div>
          <CardTitle className="text-2xl">{t("forgot.title")}</CardTitle>
          <CardDescription>{t("forgot.desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">{t("forgot.checkEmail") || "Check your email"}</p>
              <p className="text-sm text-muted-foreground">{t("forgot.checkEmailDesc") || "We sent a reset link to your email."}</p>
              <Link to="/auth">
                <Button variant="outline" className="mt-4">{t("forgot.backToLogin")}</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <div className="relative">
                  <Mail className={`absolute ${iconPos} top-3 h-4 w-4 text-muted-foreground`} />
                  <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={e => setEmail(e.target.value)} className={inputPad} required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary" disabled={loading}>
                {t(loading ? "auth.loading" : "forgot.submit")}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}