import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";
import {
  Shield, TrendingUp, TrendingDown, DollarSign, Wallet, Bell,
  Clock, ArrowRight, AlertTriangle, Copy,
} from "lucide-react";
import { useToast } from "../hooks/useToast";

export function DashboardOverview() {
  const { t, isRTL, language } = useLanguage();
  const { profile, finances, notifications } = useDashboard();
  const { toast } = useToast();

  const copyWalletId = () => {
    if (profile?.wallet_id) {
      navigator.clipboard.writeText(profile.wallet_id);
      toast({ title: "Copied!", description: "Wallet ID copied to clipboard" });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-1">{t("dashboard.overview")}</h1>
        <p className="text-muted-foreground text-sm">
          {language === "ar" ? "مرحباً بعودتك" : "Welcome back"}, {profile?.full_name || "User"}
        </p>
      </motion.div>

      {finances?.amount_due > 0 && finances?.payment_status !== "paid" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20"
        >
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">
              {finances.payment_due_message || `Amount Due: $${finances.amount_due}`}
            </p>
            {finances.payment_deadline && (
              <p className="text-xs text-muted-foreground">
                Due by: {new Date(finances.payment_deadline).toLocaleDateString()}
              </p>
            )}
          </div>
          <Button variant="destructive" size="sm">Pay Now</Button>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="wallet-gradient overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardDescription className="text-muted-foreground/70">
                    {language === "ar" ? "المحفظة الرئيسية" : "Global Wallet"}
                  </CardDescription>
                  <CardTitle className="text-3xl mt-2">
                    ${(finances?.capital || 0).toLocaleString()}
                  </CardTitle>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>{profile?.wallet_id || "iBC-XXXXX"}</span>
                  <button onClick={copyWalletId}>
                    <Copy className="h-3 w-3 ml-1 hover:text-primary" />
                  </button>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{profile?.full_name}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{profile?.email}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{language === "ar" ? "رأس المال" : "Capital"}</p>
                <p className="text-lg font-bold">${(finances?.capital || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{language === "ar" ? "الأرباح" : "Profits"}</p>
                <p className="text-lg font-bold text-success">+${(finances?.profits || 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{language === "ar" ? "المسترد" : "Recovered"}</p>
                <p className="text-lg font-bold text-primary">${(finances?.total_recovered || 0).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50/10 border border-amber-500/20">
        <p className="text-xs text-amber-500 flex items-center gap-2">
          <Shield className="h-3 w-3" />
          {language === "ar"
            ? "يتم قبول التحويلات فقط إلى المحافظ المدرجة في الموقع الإلكتروني."
            : "Transfers are only accepted to wallets listed on the website."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{language === "ar" ? "آخر التحديثات" : "Recent Updates"}</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {(!notifications || notifications.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {language === "ar" ? "لا توجد تحديثات حديثة" : "No recent updates"}
                </p>
              ) : (
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-accent/50">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{language === "ar" ? "حسابك" : "Your Account"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "ar" ? "حالة KYC" : "KYC Status"}
                </span>
                <Badge variant={useDashboard().kyc?.status === "approved" ? "success" : useDashboard().kyc?.status === "rejected" ? "destructive" : "warning"}>
                  {useDashboard().kyc?.status || "pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "ar" ? "حالة الحساب" : "Account Status"}
                </span>
                <Badge variant="success">{language === "ar" ? "نشط" : "Active"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "ar" ? "العملة" : "Currency"}
                </span>
                <span className="text-sm font-medium">{finances?.currency || "USD"}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
