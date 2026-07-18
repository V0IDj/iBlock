import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { supabase } from "../lib/supabase";
import { Users, FileText, ArrowDownToLine, ArrowUpFromLine, DollarSign, TrendingUp, ShieldCheck, Clock } from "lucide-react";

export function AdminOverview() {
  const { language, isRTL } = useLanguage();
  const { profiles, kycDocs, finances } = useAdmin();
  const isAr = language === "ar";

  const [pendingDeposits, setPendingDeposits] = useState(0);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  const pendingKyc = kycDocs?.filter(d => d.status === "pending").length || 0;
  const financesArr = Object.values(finances || {});
  const totalCapital = financesArr.reduce((s, f) => s + Number(f.capital), 0);
  const totalProfits = financesArr.reduce((s, f) => s + Number(f.profits), 0);
  const totalRecovered = financesArr.reduce((s, f) => s + Number(f.total_recovered), 0);

  useEffect(() => {
    (async () => {
      const [depResp, witResp] = await Promise.all([
        supabase.from("deposit_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("withdrawal_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setPendingDeposits(depResp.count || 0);
      setPendingWithdrawals(witResp.count || 0);

      const [deps, withs] = await Promise.all([
        supabase.from("deposit_requests").select("id, amount, status, created_at, crypto_symbol, user_id").order("created_at", { ascending: false }).limit(3),
        supabase.from("withdrawal_requests").select("id, amount, status, created_at, network, user_id").order("created_at", { ascending: false }).limit(3),
      ]);
      const combined = [
        ...(deps.data || []).map(d => ({ ...d, type: "deposit" })),
        ...(withs.data || []).map(w => ({ ...w, type: "withdrawal" })),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
      setRecentActivity(combined);
    })();
  }, []);

  const statCards = [
    { title: isAr ? "إجمالي العملاء" : "Total Clients", value: profiles.length, icon: Users, gradient: "from-blue-500 to-blue-600" },
    { title: isAr ? "KYC معلق" : "Pending KYC", value: pendingKyc, icon: FileText, gradient: "from-amber-500 to-orange-500" },
    { title: isAr ? "إيداعات معلقة" : "Pending Deposits", value: pendingDeposits, icon: ArrowDownToLine, gradient: "from-emerald-500 to-green-600" },
    { title: isAr ? "سحوبات معلقة" : "Pending Withdrawals", value: pendingWithdrawals, icon: ArrowUpFromLine, gradient: "from-red-500 to-rose-600" },
  ];

  const financeCards = [
    { title: isAr ? "إجمالي رأس المال" : "Total Capital", value: `$${totalCapital.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600" },
    { title: isAr ? "إجمالي الأرباح" : "Total Profits", value: `$${totalProfits.toLocaleString()}`, icon: TrendingUp, color: "text-blue-600" },
    { title: isAr ? "إجمالي المسترد" : "Total Recovered", value: `$${totalRecovered.toLocaleString()}`, icon: ShieldCheck, color: "text-primary" },
  ];

  const getClientName = (userId) => {
    const p = profiles.find(p => p.user_id === userId);
    return p?.full_name || p?.email || "-";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "نظرة عامة" : "Overview"}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {isAr ? "ملخص شامل لنشاط المنصة" : "Comprehensive platform activity summary"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <Card className="relative overflow-hidden premium-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{card.title}</p>
                    <p className="text-3xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {financeCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + 0.1 * i }}
          >
            <Card className="premium-card">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <card.icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{card.title}</p>
                    <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="premium-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {isAr ? "آخر النشاطات" : "Recent Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-center py-6 text-sm">
                {isAr ? "لا توجد نشاطات" : "No recent activity"}
              </p>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((item, i) => (
                  <div key={`${item.type}-${item.id}`} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === "deposit" ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
                        {item.type === "deposit" ? <ArrowDownToLine className="h-4 w-4 text-emerald-500" /> : <ArrowUpFromLine className="h-4 w-4 text-red-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{getClientName(item.user_id)}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.type === "deposit" ? (isAr ? "إيداع" : "Deposit") : (isAr ? "سحب" : "Withdrawal")}
                          {item.crypto_symbol && ` · ${item.crypto_symbol}`}
                          {item.network && ` · ${item.network}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-semibold">${Number(item.amount).toLocaleString()}</p>
                      <Badge variant={item.status === "approved" ? "default" : item.status === "rejected" ? "destructive" : "secondary"} className="text-[10px]">
                        {item.status === "approved" ? (isAr ? "مقبول" : "Approved") : item.status === "rejected" ? (isAr ? "مرفوض" : "Rejected") : (isAr ? "معلق" : "Pending")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}