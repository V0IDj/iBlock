import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Eye, CircleCheckBig, CircleX, LoaderCircle } from "lucide-react";

export function AdminWithdrawals() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const isAr = language === "ar";

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [r, p] = await Promise.all([
      supabase.from("withdrawal_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    if (r.data) setRequests(r.data);
    if (p.data) setProfiles(p.data);
    setLoading(false);
  };

  const getProfile = (uid) => profiles.find(p => p.user_id === uid);

  const handleAction = async (status) => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase.from("withdrawal_requests").update({ status, admin_note: note || null }).eq("id", selected.id);
    if (error) {
      toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" });
    } else {
      const prof = getProfile(selected.user_id);
      const clientName = prof?.full_name || prof?.email || "Unknown";
      const msg = note ? `$${Number(selected.amount).toLocaleString()} - ${selected.network}\n${note}` : `$${Number(selected.amount).toLocaleString()} - ${selected.network}`;
      await supabase.from("notifications").insert({
        user_id: selected.user_id,
        title: status === "approved" ? (isAr ? "✅ تمت الموافقة على السحب" : "✅ Withdrawal Approved") : status === "completed" ? (isAr ? "✅ تم إتمام السحب" : "✅ Withdrawal Completed") : (isAr ? "❌ تم رفض السحب" : "❌ Withdrawal Rejected"),
        message: msg,
      });
      const logDesc = `${isAr ? "سحب" : "Withdrawal"} ${status === "approved" ? (isAr ? "مقبول" : "approved") : status === "completed" ? (isAr ? "مكتمل" : "completed") : status === "rejected" ? (isAr ? "مرفوض" : "rejected") : status} - ${selected.network}`;
      const fullDesc = note ? `${logDesc} | ${note}` : logDesc;
      const { data: existingLog } = await supabase.from("transaction_log").select("id").eq("reference_id", selected.id).eq("type", "withdrawal").limit(1);
      const meta = { network: selected.network, wallet_address: selected.wallet_address, admin_note: note || null, client_name: clientName };
      if (existingLog && existingLog.length > 0) {
        await supabase.from("transaction_log").update({ status, description: fullDesc, metadata: meta }).eq("id", existingLog[0].id);
      } else {
        await supabase.from("transaction_log").insert({ user_id: selected.user_id, type: "withdrawal", amount: selected.amount, currency: "USD", status, description: fullDesc, reference_id: selected.id, metadata: meta });
      }
      toast({ title: "Updated", description: isAr ? "تم تحديث الطلب" : "Updated" });
      setOpen(false);
      fetchData();
    }
    setSaving(false);
  };

  const statusBadge = (s) => {
    if (s === "approved") return <Badge variant="default">{isAr ? "مقبول" : "Approved"}</Badge>;
    if (s === "rejected") return <Badge variant="destructive">{isAr ? "مرفوض" : "Rejected"}</Badge>;
    return <Badge variant="secondary">{isAr ? "معلق" : "Pending"}</Badge>;
  };

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAr ? "طلبات السحب" : "Withdrawal Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد طلبات سحب" : "No withdrawal requests"}</p>
        ) : (
          <Table>
            <TableHeader><TableRow>
              <TableHead>{isAr ? "العميل" : "Client"}</TableHead>
              <TableHead>{isAr ? "المبلغ" : "Amount"}</TableHead>
              <TableHead>{isAr ? "الشبكة" : "Network"}</TableHead>
              <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
              <TableHead>{isAr ? "التاريخ" : "Date"}</TableHead>
              <TableHead>{isAr ? "الإجراءات" : "Actions"}</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {requests.map(r => {
                const prof = getProfile(r.user_id);
                return (
                  <TableRow key={r.id}>
                    <TableCell>{prof?.full_name || prof?.email || "-"}</TableCell>
                    <TableCell>${Number(r.amount).toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline">{r.network}</Badge></TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleDateString(isAr ? "ar" : "en")}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => { setSelected(r); setNote(r.admin_note || ""); setOpen(true); }}>
                        <Eye className="h-4 w-4 mr-1" />{isAr ? "مراجعة" : "Review"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isAr ? "مراجعة طلب سحب" : "Review Withdrawal"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">{isAr ? "العميل" : "Client"}</p><p className="font-medium">{getProfile(selected.user_id)?.full_name || getProfile(selected.user_id)?.email}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</p><p className="font-medium">${Number(selected.amount).toLocaleString()}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "الشبكة" : "Network"}</p><p className="font-medium">{selected.network}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "الحالة" : "Status"}</p>{statusBadge(selected.status)}</div>
                <div className="col-span-2"><p className="text-muted-foreground">{isAr ? "عنوان المحفظة" : "Wallet Address"}</p><p className="font-mono text-xs break-all">{selected.wallet_address}</p></div>
              </div>
              <div>
                <Label>{isAr ? "ملاحظة الأدمن (تظهر في الإشعار وسجل المعاملات)" : "Admin Note (shown in notification & transaction log)"}</Label>
                <Textarea value={note} onChange={e => setNote(e.target.value)} className="mt-1" placeholder={isAr ? "أضف ملاحظة..." : "Add a note..."} />
              </div>
              <div className="flex gap-3">
                {selected.status !== "approved" && <Button onClick={() => handleAction("approved")} disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin mr-2" /> : <CircleCheckBig className="h-4 w-4 mr-2" />}{isAr ? "قبول" : "Approve"}</Button>}
                {selected.status !== "rejected" && <Button onClick={() => handleAction("rejected")} disabled={saving} variant="destructive" className="flex-1">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin mr-2" /> : <CircleX className="h-4 w-4 mr-2" />}{isAr ? "رفض" : "Reject"}</Button>}
                {selected.status !== "completed" && <Button onClick={() => handleAction("completed")} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin mr-2" /> : <CircleCheckBig className="h-4 w-4 mr-2" />}{isAr ? "إتمام العملية" : "Complete"}</Button>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}