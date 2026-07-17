import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { ArrowUpFromLine, CircleX, Clock, CheckCircle2, LoaderCircle } from "lucide-react";

const NETWORKS = ["ERC20", "TRC20", "BEP20", "SOL"];

export function DashboardWithdrawal() {
  const { language } = useLanguage();
  const { user } = useDashboard();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ERC20");
  const [sending, setSending] = useState(false);
  const [locked, setLocked] = useState(false);
  const [lockMsg, setLockMsg] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAr = language === "ar";

  useEffect(() => { checkLock(); fetchHistory(); }, [user]);

  const checkLock = async () => {
    if (!user) return;
    const { data } = await supabase.from("client_finances").select("withdrawal_locked, withdrawal_lock_message").eq("user_id", user.id).maybeSingle();
    if (data) { setLocked(data.withdrawal_locked ?? true); setLockMsg(data.withdrawal_lock_message || ""); }
    setLoading(false);
  };

  const fetchHistory = async () => {
    if (!user) return;
    const { data } = await supabase.from("withdrawal_requests").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10);
    if (data) setHistory(data);
  };

  const statusIcon = (s) => {
    if (s === "approved") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (s === "rejected") return <CircleX className="h-4 w-4 text-destructive" />;
    return <Clock className="h-4 w-4 text-amber-500" />;
  };

  const statusText = (s) => {
    if (s === "approved") return isAr ? "مقبول" : "Approved";
    if (s === "rejected") return isAr ? "مرفوض" : "Rejected";
    return isAr ? "قيد المعالجة" : "Processing";
  };

  if (loading) return <div className="flex justify-center py-12"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;

  if (locked) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <CircleX className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-destructive">{isAr ? "السحب غير متاح حالياً" : "Withdrawals Unavailable"}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line text-start">
              {lockMsg || (isAr ? "عزيزي العميل، نأسف لإبلاغك بأن عمليات السحب غير متاحة حالياً." : "Dear Valued Customer, We regret to inform you that withdrawals are currently unavailable.")}
            </p>
            <Button variant="outline" onClick={() => { setLocked(false); setAmount(""); }}>{isAr ? "إغلاق" : "Close"}</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "سحب" : "Withdraw"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "أدخل بيانات السحب" : "Enter withdrawal details"}</p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>{isAr ? "المبلغ (USD)" : "Amount (USD)"}</Label>
            <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label>{isAr ? "عنوان المحفظة" : "Wallet Address"}</Label>
            <Input placeholder="0x..." value={address} onChange={e => setAddress(e.target.value)} className="mt-1 font-mono text-xs" />
          </div>
          <div>
            <Label>{isAr ? "الشبكة" : "Network"}</Label>
            <select value={network} onChange={e => setNetwork(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm mt-1">
              {NETWORKS.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <Button onClick={async () => {
            if (!amount || !address) return; setSending(true);
            try {
              const { data: { session } } = await supabase.auth.getSession();
              if (!session?.user) return;
              const { error } = await supabase.from("withdrawal_requests").insert({ user_id: session.user.id, amount: parseFloat(amount), wallet_address: address, network, status: "pending" });
              if (error) throw error;
              toast({ title: isAr ? "تم الإرسال" : "Submitted" });
              fetchHistory(); setAmount(""); setAddress("");
            } catch (err) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
            setSending(false);
          }} disabled={!amount || !address || sending} className="w-full">
            {sending ? <LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> : <ArrowUpFromLine className="h-4 w-4 mr-2" />}
            {sending ? (isAr ? "جاري الإرسال..." : "Sending...") : (isAr ? "إرسال طلب السحب" : "Submit Withdrawal")}
          </Button>
        </div>
      </Card>

      {history.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">{isAr ? "سجل طلبات السحب" : "Withdrawal History"}</h2>
          <div className="space-y-2">
            {history.map(r => (
              <Card key={r.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {statusIcon(r.status)}
                    <div>
                      <p className="font-medium">${Number(r.amount).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{r.network}</p>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-medium">{statusText(r.status)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString(isAr ? "ar" : "en")}</p>
                  </div>
                </div>
                {r.admin_note && <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">💬 {r.admin_note}</p>}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}