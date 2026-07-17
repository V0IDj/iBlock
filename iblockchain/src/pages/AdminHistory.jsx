import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { supabase } from "../lib/supabase";
import { History, Search, LoaderCircle } from "lucide-react";

export function AdminHistory() {
  const { language } = useLanguage();
  const [transactions, setTransactions] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAr = language === "ar";

  useEffect(() => {
    (async () => {
      const [d, w, p] = await Promise.all([
        supabase.from("deposit_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("withdrawal_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("user_id, full_name, email"),
      ]);
      const combined = [
        ...(d.data || []).map(x => ({ ...x, type: "deposit", details: x.crypto_symbol, extra: x.tx_hash })),
        ...(w.data || []).map(x => ({ ...x, type: "withdrawal", details: x.network, extra: x.wallet_address })),
      ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setTransactions(combined);
      if (p.data) setProfiles(p.data);
      setLoading(false);
    })();
  }, []);

  const getClient = (uid) => profiles.find(p => p.user_id === uid);

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" />{isAr ? "سجل المعاملات" : "Transaction History"}</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد معاملات" : "No transactions"}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "العميل" : "Client"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التفاصيل" : "Details"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
              </tr></thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={`${t.type}-${t.id}`} className="border-b hover:bg-muted/30">
                    <td className="p-4"><Badge className={t.type === "deposit" ? "bg-emerald-600" : "bg-orange-600"}>{t.type === "deposit" ? (isAr ? "إيداع" : "Deposit") : (isAr ? "سحب" : "Withdrawal")}</Badge></td>
                    <td className="p-4"><p className="font-medium">{getClient(t.user_id)?.full_name || "-"}</p><p className="text-xs text-muted-foreground">{getClient(t.user_id)?.email}</p></td>
                    <td className="p-4 font-semibold">${Number(t.amount).toLocaleString()}</td>
                    <td className="p-4 text-xs text-muted-foreground">{t.details}{t.extra && <p className="font-mono truncate max-w-[200px]">{t.extra}</p>}</td>
                    <td className="p-4"><Badge variant={t.status === "approved" ? "default" : t.status === "rejected" ? "destructive" : "secondary"}>{t.status}</Badge></td>
                    <td className="p-4 text-sm whitespace-nowrap">{new Date(t.created_at).toLocaleDateString(isAr ? "ar" : "en")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}