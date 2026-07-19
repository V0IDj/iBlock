import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { supabase } from "../lib/supabase";
import { History, Search, Lock, LoaderCircle } from "lucide-react";

export function AdminHistory() {
  const { language, isRTL } = useLanguage();
  const [transactions, setTransactions] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const isAr = language === "ar";

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [d, w, p] = await Promise.all([
      supabase.from("deposit_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("withdrawal_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    const combined = [
      ...(d.data || []).map(x => ({ ...x, type: "deposit", crypto_symbol: x.crypto_symbol, tx_hash: x.tx_hash })),
      ...(w.data || []).map(x => ({ ...x, type: "withdrawal", network: x.network, wallet_address: x.wallet_address, admin_note: x.admin_note })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setTransactions(combined);
    if (p.data) setProfiles(p.data);
    setLoading(false);
  };

  const getClient = (uid) => profiles.find(p => p.user_id === uid);

  const filtered = transactions.filter(t => {
    if (tab === "deposits" && t.type !== "deposit") return false;
    if (tab === "withdrawals" && t.type !== "withdrawal") return false;
    if (!search) return true;
    const q = search.toLowerCase();
    const prof = getClient(t.user_id);
    return prof?.full_name?.toLowerCase().includes(q) || prof?.email?.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
  });

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {isAr ? "سجل جميع المعاملات" : "All Transactions History"}
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            {isAr ? "للقراءة فقط - لا يمكن التعديل أو الحذف" : "Read-only — cannot edit or delete"}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3">
          <div className="relative w-full sm:w-64">
            <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={isAr ? "بحث بالاسم أو الإيميل..." : "Search by name or email..."}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={isRTL ? "pr-10" : "pl-10"}
            />
          </div>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">{isAr ? "الكل" : "All"} ({transactions.length})</TabsTrigger>
              <TabsTrigger value="deposits">{isAr ? "إيداعات" : "Deposits"}</TabsTrigger>
              <TabsTrigger value="withdrawals">{isAr ? "سحوبات" : "Withdrawals"}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد معاملات" : "No transactions found"}</p>
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
                {filtered.map(t => {
                  const prof = getClient(t.user_id);
                  return (
                    <tr key={`${t.type}-${t.id}`} className="border-b hover:bg-muted/30">
                      <td className="p-4">
                        {t.type === "deposit" ? (
                          <Badge className="bg-emerald-600">{isAr ? "إيداع" : "Deposit"}</Badge>
                        ) : (
                          <Badge className="bg-orange-600">{isAr ? "سحب" : "Withdrawal"}</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-sm">{prof?.full_name || "-"}</p>
                        <p className="text-xs text-muted-foreground">{prof?.email}</p>
                      </td>
                      <td className="p-4 font-semibold">${Number(t.amount).toLocaleString()}</td>
                      <td className="p-4 text-xs text-muted-foreground max-w-[200px]">
                        {t.type === "deposit" && t.crypto_symbol && <span>{t.crypto_symbol}</span>}
                        {t.type === "withdrawal" && t.network && <span>{t.network}</span>}
                        {t.wallet_address && <p className="font-mono truncate">{t.wallet_address}</p>}
                        {t.admin_note && <p className="text-amber-600 mt-0.5">{t.admin_note}</p>}
                      </td>
                      <td className="p-4">
                        <Badge variant={t.status === "approved" ? "default" : t.status === "rejected" ? "destructive" : "secondary"}>
                          {t.status === "approved" ? (isAr ? "مقبول" : "Approved") : t.status === "rejected" ? (isAr ? "مرفوض" : "Rejected") : (isAr ? "قيد المراجعة" : "Pending")}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm whitespace-nowrap">
                        {new Date(t.created_at).toLocaleDateString(isAr ? "ar" : "en")}
                        <br />
                        <span className="text-xs text-muted-foreground">
                          {new Date(t.created_at).toLocaleTimeString(isAr ? "ar" : "en", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
