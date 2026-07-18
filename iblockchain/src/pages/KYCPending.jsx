import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Shield, Clock, CircleX, CircleCheckBig, LogOut, LoaderCircle } from "lucide-react";

export function KYCPending() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("kyc_documents").select("status").eq("user_id", user.id).single();
      if (data) {
        setStatus(data.status);
        if (data.status === "approved") navigate("/dashboard");
      }
      setLoading(false);
    })();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10" dir={isRTL ? "rtl" : "ltr"}>
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">iBlockchain</span>
          </div>
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); toast({ title: isAr ? "تسجيل خروج" : "Logged out", description: isAr ? "نراك قريباً" : "See you again" }); navigate("/"); }}>
            <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {t("dashboard.logout")}
          </Button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-xl mx-auto text-center">
          <CardHeader>
            {status === "pending" && (
              <>
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10 text-amber-600" />
                </div>
                <CardTitle className="text-2xl">{t("kycPending.reviewing")}</CardTitle>
                <CardDescription className="text-lg">{t("kycPending.received")}</CardDescription>
              </>
            )}
            {status === "rejected" && (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleX className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-600">{t("kycPending.rejected")}</CardTitle>
                <CardDescription className="text-lg">{t("kycPending.rejectedDesc")}</CardDescription>
              </>
            )}
            {status === "approved" && (
              <>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CircleCheckBig className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">{t("kycPending.approved")}</CardTitle>
                <CardDescription className="text-lg">{t("kycPending.approvedDesc")}</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "pending" && (
              <>
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{t("kycPending.expectedTime")}</h3>
                  <p className="text-muted-foreground">{t("kycPending.hours")}</p>
                </div>
                <p className="text-muted-foreground">{t("kycPending.emailNotice")}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{t("kycPending.lastUpdate")}</span>
                </div>
              </>
            )}
            {status === "rejected" && (
              <>
                <p className="text-muted-foreground">{t("kycPending.reuploadHint")}</p>
                <Button onClick={() => navigate("/kyc")} size="lg">{t("kycPending.reupload")}</Button>
              </>
            )}
            {status === "approved" && (
              <Button onClick={() => navigate("/dashboard")} size="lg">{t("kycPending.goToDashboard")}</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
