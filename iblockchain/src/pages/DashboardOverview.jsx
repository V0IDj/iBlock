import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { WalletCard } from "../components/dashboard/WalletCard";
import { SecurityWarningBanner } from "../components/dashboard/SecurityWarningBanner";
import { DashboardCryptoPrices } from "../components/dashboard/DashboardCryptoPrices";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Shield, TrendingUp, TrendingDown, DollarSign, Bell, MessageSquare, X, Calendar, TriangleAlert } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

function PaymentDueBanner({ amountDue, currency, paymentMessage, paymentDeadline }) {
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);
  const isAr = language === "ar";

  if (amountDue <= 0 || dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-destructive/50 bg-destructive/10 mb-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 via-destructive/10 to-destructive/5 animate-pulse" />
        <CardContent className="relative py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-destructive/20">
                <TriangleAlert className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive mb-1">
                  {isAr ? "⚠️ رسوم مستحقة الدفع" : "⚠️ Payment Required"}
                </h3>
                {paymentMessage && <p className="text-sm text-foreground mb-2">{paymentMessage}</p>}
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-destructive" />
                    <span className="font-bold text-lg text-destructive">{currency} {amountDue.toLocaleString()}</span>
                  </div>
                  {paymentDeadline && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{isAr ? "الموعد النهائي: " : "Deadline: "}{new Date(paymentDeadline).toLocaleDateString(isAr ? "ar" : "en", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setDismissed(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function DashboardOverview() {
  const { language } = useLanguage();
  const { user, profile, kyc, finances, notifications: notifs } = useDashboard();
  const navigate = useNavigate();
  const isAr = language === "ar";

  const statCards = [
    {
      title: isAr ? "رأس المال" : "Capital",
      value: `$${finances?.capital?.toLocaleString() || "0"}`,
      sub: finances?.currency || "USD",
      icon: DollarSign,
      iconBg: "bg-blue-50",
      iconColor: "text-primary",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: isAr ? "الأرباح" : "Profits",
      value: `$${finances?.profits?.toLocaleString() || "0"}`,
      sub: isAr ? "إجمالي الأرباح" : "Total profits",
      icon: TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: isAr ? "المبلغ المسترد" : "Recovered",
      value: `$${finances?.total_recovered?.toLocaleString() || "0"}`,
      sub: isAr ? "تم استرداده بنجاح" : "Successfully recovered",
      icon: Shield,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      trend: "+5.1%",
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      <SecurityWarningBanner />

      {finances?.amount_due > 0 && finances?.payment_status !== "paid" && (
        <PaymentDueBanner
          amountDue={finances.amount_due}
          currency={finances.currency}
          paymentMessage={finances.payment_due_message}
          paymentDeadline={finances.payment_deadline}
        />
      )}

      {finances?.admin_message && (
        <Card className="glass-card border-primary/20">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-primary mb-1">
                  {isAr ? "رسالة من فريق المعالجة" : "Processing Team Message"}
                </p>
                <p className="text-foreground">
                  {finances.admin_message.replace(/admin/gi, isAr ? "فريق المعالجة" : "processing team").replace(/الأدمن|ادمن|للأدمن|الإدارة/g, "فريق المعالجة")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

      <div className="grid md:grid-cols-3 gap-5">
        {statCards.map((card, i) => (
          <Card key={i} className="glass-card premium-card border-0">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                  <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${card.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                  {card.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {card.trend}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCryptoPrices />

      <div className="grid md:grid-cols-2 gap-5">
        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              {isAr ? "حالة الحساب" : "Account Status"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <span className="text-sm text-muted-foreground">{isAr ? "التحقق من الهوية" : "Identity Verification"}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  kyc?.status === "approved" ? "bg-emerald-50 text-emerald-700" :
                  kyc?.status === "pending" ? "bg-amber-50 text-amber-700" :
                  "bg-red-50 text-red-700"
                }`}>
                  {kyc?.status === "approved" ? (isAr ? "مُوثق" : "Verified") :
                   kyc?.status === "pending" ? (isAr ? "قيد المراجعة" : "Pending") :
                   (isAr ? "مرفوض" : "Rejected")}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                <span className="text-sm text-muted-foreground">{isAr ? "حالة الحساب" : "Account Status"}</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">{isAr ? "نشط" : "Active"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              {isAr ? "آخر التحديثات" : "Recent Updates"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notifs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Bell className="h-6 w-6 opacity-40" />
                </div>
                <p className="text-sm">{isAr ? "لا توجد إشعارات" : "No notifications"}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {notifs.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => navigate(`/notification/${n.id}`)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-muted/50 ${n.is_read ? "" : "bg-primary/[0.03]"}`}
                  >
                    <div className="mt-1">
                      {!n.is_read && <span className="h-2 w-2 rounded-full bg-primary block" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.message}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {(() => {
                          const diff = Date.now() - new Date(n.created_at).getTime();
                          const mins = Math.floor(diff / 60000);
                          const hours = Math.floor(diff / 3600000);
                          const days = Math.floor(diff / 86400000);
                          if (mins < 1) return isAr ? "الآن" : "just now";
                          if (mins < 60) return isAr ? `منذ ${mins} دقيقة` : `${mins} min ago`;
                          if (hours < 24) return isAr ? `منذ ${hours} ساعة` : `${hours} hour ago`;
                          if (days < 7) return isAr ? `منذ ${days} يوم` : `${days} days ago`;
                          return new Date(n.created_at).toLocaleDateString(isAr ? "ar" : "en", { year: "numeric", month: "short", day: "numeric" });
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
