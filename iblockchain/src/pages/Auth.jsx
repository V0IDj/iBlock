import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, ArrowLeft, Eye, EyeOff, LoaderCircle, User, Smartphone, Mail, Lock } from "lucide-react";

export function Auth() {
  const { t, isRTL, dir, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const code = Math.floor(1e5 + 9e5 * Math.random()).toString();
      const { error } = await supabase.functions.invoke("send-verification-code", {
        body: { email: signupForm.email, code, password: signupForm.password, fullName: signupForm.fullName, phone: signupForm.phone, language },
      });
      if (error) throw error;
      sessionStorage.setItem("pendingVerificationEmail", signupForm.email);
      toast({ title: "Code sent", description: "Check your email for the verification code." });
      navigate("/verify-email?email=" + encodeURIComponent(signupForm.email));
    } catch (err) {
      toast({ title: "Error", description: err.message || "Failed to send verification code", variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div
      dir={dir}
      className="min-h-screen bg-background flex items-center justify-center p-4 mesh-bg"
    >
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">iBlockchain</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              {mode === "login" ? t("auth.login") : t("auth.signup")}
            </CardTitle>
            <CardDescription>
              {mode === "login" ? t("auth.loginDesc") : t("auth.signupDesc")}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="mt-1.5"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" variant="premium" className="w-full" disabled={loading}>
                  {loading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                  {t("auth.login")}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("auth.fullName")}</Label>
                  <div className="relative">
                    <User className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="fullName" placeholder={t("auth.fullNamePlaceholder") || "Full Name"} value={signupForm.fullName} onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })} className={`mt-0 ${isRTL ? "pr-10" : "pl-10"}`} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("auth.phone")}</Label>
                  <div className="relative">
                    <Smartphone className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="phone" type="tel" placeholder="+1234567890" value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} className={`mt-0 ${isRTL ? "pr-10" : "pl-10"}`} dir="ltr" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t("auth.email")}</Label>
                  <div className="relative">
                    <Mail className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="signup-email" type="email" placeholder="example@email.com" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className={`mt-0 ${isRTL ? "pr-10" : "pl-10"}`} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t("auth.password")}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className={`mt-0 ${isRTL ? "pr-10" : "pl-10"}`} required minLength={6} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
                    <Input id="confirmPassword" type="password" placeholder="••••••••" value={signupForm.confirmPassword} onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })} className={`mt-0 ${isRTL ? "pr-10" : "pl-10"}`} required minLength={6} />
                  </div>
                </div>
                <Button type="submit" variant="premium" className="w-full" disabled={loading}>
                  {loading && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                  {t("auth.signup")}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            {mode === "login" && (
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t("auth.forgotPassword")}
              </Link>
            )}
            <div className="text-sm text-muted-foreground">
              {mode === "login"
                ? `${t("auth.noAccount")} `
                : `${t("auth.hasAccount")} `}
              <Link
                to={mode === "login" ? "/auth?mode=signup" : "/auth"}
                className="text-primary hover:underline"
              >
                {mode === "login" ? t("auth.createOne") : t("nav.login")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
