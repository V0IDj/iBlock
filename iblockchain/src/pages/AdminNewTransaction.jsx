import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";

import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { CirclePlus, LoaderCircle, CheckCircle2 } from "lucide-react";

const types = [
  { value: "deposit", ar: "إيداع", en: "Deposit" },
  { value: "withdrawal", ar: "سحب", en: "Withdrawal" },
  { value: "capital_update", ar: "تحديث رأس المال", en: "Capital Update" },
  { value: "profit_update", ar: "تحديث الأرباح", en: "Profit Update" },
  { value: "recovery_update", ar: "تحديث الاسترداد", en: "Recovery Update" },
];

const statuses = [
  { value: "pending", ar: "قيد المراجعة", en: "Pending" },
  { value: "approved", ar: "مقبول", en: "Approved" },
  { value: "completed", ar: "مكتمل", en: "Completed" },
  { value: "rejected", ar: "مرفوض", en: "Rejected" },
];

export function AdminNewTransaction() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { profiles } = useAdmin();
  const isAr = language === "ar";

  const [userId, setUserId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState("completed");
  const [description, setDescription] = useState("");
  const [adminComment, setAdminComment] = useState("");
  const [sendNotif, setSendNotif] = useState(true);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!userId || !type || !amount || Number(amount) <= 0) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSaving(true);
    const prof = profiles.find(p => p.user_id === userId);
    const clientName = prof?.full_name || prof?.email || "Unknown";
    const typeLabel = types.find(t => t.value === type)?.[isAr ? "ar" : "en"] || type;
    const desc = description || typeLabel;

    const { error } = await supabase.from("transaction_log").insert({
      user_id: userId,
      type,
      amount: Number(amount),
      currency,
      status,
      description: adminComment ? `${desc} | ${adminComment}` : desc,
      metadata: { admin_comment: adminComment || null, client_name: clientName, created_by_admin: true },
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setSaving(false);
      return;
    }

    // Update client_finances for certain types
    if (["capital_update", "profit_update", "recovery_update", "deposit", "withdrawal"].includes(type) && status !== "rejected") {
      const { data: fin } = await supabase.from("client_finances").select("*").eq("user_id", userId).single();
      if (fin) {
        const updates = {};
        const amt = Number(amount);
        if (type === "deposit" || type === "capital_update") updates.capital = Number(fin.capital) + amt;
        if (type === "withdrawal") updates.capital = Math.max(0, Number(fin.capital) - amt);
        if (type === "profit_update") updates.profits = Number(fin.profits) + amt;
        if (type === "recovery_update") updates.total_recovered = Number(fin.total_recovered) + amt;
        if (Object.keys(updates).length > 0) await supabase.from("client_finances").update(updates).eq("user_id", userId);
      }
    }

    if (sendNotif) {
      const label = types.find(t => t.value === type)?.[isAr ? "ar" : "en"] || type;
      await supabase.from("notifications").insert({
        user_id: userId,
        title: `💼 ${label} - $${Number(amount).toLocaleString()}`,
        message: adminComment || description || label,
      });
    }

    toast({ title: "Success", description: "Transaction added" });
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setUserId(""); setType(""); setAmount(""); setDescription(""); setAdminComment(""); setStatus("completed");
    }, 2000);
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "إضافة معاملة جديدة" : "Add New Transaction"}</h1>
        <p className="text-muted-foreground text-sm mt-1">{isAr ? "إنشاء معاملة يدوية وتسجيلها" : "Create a manual transaction"}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{isAr ? "تفاصيل المعاملة" : "Transaction Details"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>{isAr ? "العميل *" : "Client *"}</Label>
            <select value={userId} onChange={e => setUserId(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
              <option value="">{isAr ? "اختر العميل" : "Select client"}</option>
              {profiles.map(p => <option key={p.user_id} value={p.user_id}>{p.full_name || p.email} — {p.email}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "نوع المعاملة *" : "Transaction Type *"}</Label>
            <select value={type} onChange={e => setType(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
              <option value="">{isAr ? "اختر النوع" : "Select type"}</option>
              {types.map(t => <option key={t.value} value={t.value}>{isAr ? t.ar : t.en}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isAr ? "المبلغ *" : "Amount *"}</Label>
              <Input type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>{isAr ? "العملة" : "Currency"}</Label>
              <select value={currency} onChange={e => setCurrency(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                <option value="USD">USD</option>
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "الحالة" : "Status"}</Label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
              {statuses.map(s => <option key={s.value} value={s.value}>{isAr ? s.ar : s.en}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "الوصف" : "Description"}</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder={isAr ? "وصف المعاملة (اختياري)" : "Transaction description (optional)"} />
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "تعليق الأدمن" : "Admin Comment"}</Label>
            <Textarea value={adminComment} onChange={e => setAdminComment(e.target.value)} placeholder={isAr ? "ملاحظة تظهر للعميل في الإشعار..." : "Note shown to client in notification..."} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="sendNotif" checked={sendNotif} onChange={e => setSendNotif(e.target.checked)} className="rounded" />
            <Label htmlFor="sendNotif" className="cursor-pointer text-sm">{isAr ? "إرسال إشعار للعميل" : "Send notification to client"}</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={saving || done} className="w-full" size="lg">
            {saving ? <><LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> {isAr ? "جاري الإضافة..." : "Adding..."}</> :
             done ? <><CheckCircle2 className="h-4 w-4 mr-2" /> {isAr ? "تمت الإضافة ✓" : "Added ✓"}</> :
             <><CirclePlus className="h-4 w-4 mr-2" /> {isAr ? "إضافة المعاملة" : "Add Transaction"}</>}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}