import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { supabase } from "../lib/supabase";
import { ArrowUpFromLine, ArrowDownToLine, DollarSign, TrendingUp, ShieldCheck, RefreshCw, LoaderCircle } from "lucide-react";

const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
};

export function DashboardTransactions() {
  const { language } = useLanguage();
  const { user } = useDashboard();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAr = language === "ar";

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase.from("transaction_log").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      if (data) setTransactions(data);
      setLoading(false);
    })();
  }, [user]);

  const typeLabel = (t) => {
    const labels = { deposit: isAr ? "إيداع" : "Deposit", withdrawal: isAr ? "سحب" : "Withdrawal", capital_update: isAr ? "تحديث رأس المال" : "Capital Update", profit_update: isAr ? "تحديث الأرباح" : "Profit Update", recovery_update: isAr ? "تحديث الاسترداد" : "Recovery Update" };
    return labels[t] || t;
  };

  const typeIcon = (t) => {
    switch (t) {
      case "deposit": return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      case "withdrawal": return <ArrowUpFromLine className="h-4 w-4 text-red-500" />;
      case "capital_update": return <DollarSign className="h-4 w-4 text-blue-500" />;
      case "profit_update": return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "recovery_update": return <ShieldCheck className="h-4 w-4 text-indigo-500" />;
      default: return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const statusLabel = (s) => {
    const labels = { pending: isAr ? "قيد المراجعة" : "Pending", approved: isAr ? "مقبول" : "Approved", rejected: isAr ? "مرفوض" : "Rejected", completed: isAr ? "مكتمل" : "Completed" };
    return labels[s] || s;
  };

  const filterBy = (types) => types ? transactions.filter(t => types.includes(t.type)) : transactions;

  const renderTable = (data) => {
    if (data.length === 0) return <Card><CardContent className="py-12 text-center text-muted-foreground">{isAr ? "لا توجد معاملات" : "No transactions"}</CardContent></Card>;
    return (
      <Card><CardContent className="pt-6">
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b">
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "العملة" : "Currency"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التفاصيل" : "Details"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
            </tr></thead>
            <tbody>
              {data.map(t => (
                <tr key={t.id} className="border-b hover:bg-muted/30">
                  <td className="p-4"><div className="flex items-center gap-1.5">{typeIcon(t.type)}<span className="text-xs">{typeLabel(t.type)}</span></div></td>
                  <td className="p-4 text-xs">{new Date(t.created_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="p-4 font-medium">${Number(t.amount).toLocaleString()}</td>
                  <td className="p-4 text-xs">{t.currency}</td>
                  <td className="p-4 text-xs text-muted-foreground max-w-[250px]">
                    <div className="truncate">{t.description || "—"}</div>
                    {t.metadata?.admin_comment && <div className="text-[10px] text-primary/70 mt-0.5 truncate">💬 {t.metadata.admin_comment}</div>}
                  </td>
                  <td className="p-4"><Badge className={statusStyles[t.status] || ""} variant="outline">{statusLabel(t.status)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent></Card>
    );
  };

  if (loading) return <div className="flex justify-center py-20"><LoaderCircle className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "المعاملات" : "Transactions"}</h1>
        <p className="text-muted-foreground text-sm mt-1">{isAr ? "سجل جميع العمليات المالية" : "Complete history of all financial operations"}</p>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">{isAr ? "الكل" : "All"} ({transactions.length})</TabsTrigger>
          <TabsTrigger value="deposits">{isAr ? "الإيداعات" : "Deposits"}</TabsTrigger>
          <TabsTrigger value="withdrawals">{isAr ? "السحوبات" : "Withdrawals"}</TabsTrigger>
          <TabsTrigger value="admin">{isAr ? "تحديثات الحساب" : "Account Updates"}</TabsTrigger>
        </TabsList>
        <TabsContent value="all">{renderTable(transactions)}</TabsContent>
        <TabsContent value="deposits">{renderTable(filterBy(["deposit"]))}</TabsContent>
        <TabsContent value="withdrawals">{renderTable(filterBy(["withdrawal"]))}</TabsContent>
        <TabsContent value="admin">{renderTable(filterBy(["capital_update", "profit_update", "recovery_update"]))}</TabsContent>
      </Tabs>
    </div>
  );
}