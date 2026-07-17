import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Textarea } from "../components/ui/Textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Eye, CircleCheckBig, CircleX, LoaderCircle, ArrowDownToLine } from "lucide-react";

export function AdminDeposits() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [deposits, setDeposits] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const isAr = language === "ar";

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [d, p] = await Promise.all([
      supabase.from("deposit_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    if (d.data) setDeposits(d.data);
    if (p.data) setProfiles(p.data);
    setLoading(false);
  };

  const getProfile = (uid) => profiles.find(p => p.user_id === uid);

  const handleAction = async (status) => {
    if (!selected) return;
    setSaving(true);
    const { error } = await supabase.from("deposit_requests").update({ status }).eq("id", selected.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const prof = getProfile(selected.user_id);
      const clientName = prof?.full_name || prof?.email || "Unknown";
      const msg = comment
        ? `$${Number(selected.amount).toLocaleString()} - ${selected.crypto_symbol}\n${comment}`
        : `$${Number(selected.amount).toLocaleString()} - ${selected.crypto_symbol}`;
      await supabase.from("notifications").insert({
        user_id: selected.user_id,
        title: status === "approved" ? (isAr ? "✅ تمت الموافقة على الإيداع" : "✅ Deposit Approved") : (isAr ? "❌ تم رفض الإيداع" : "❌ Deposit Rejected"),
        message: msg,
      });
      // Create transaction_log entry
      const logDesc = `${isAr ? "إيداع" : "Deposit"} ${status === "approved" ? (isAr ? "مقبول" : "approved") : status === "rejected" ? (isAr ? "مرفوض" : "rejected") : status} - ${selected.crypto_symbol}`;
      const fullDesc = comment ? `${logDesc} | ${comment}` : logDesc;
      const { data: existingLog } = await supabase.from("transaction_log").select("id").eq("reference_id", selected.id).eq("type", "deposit").limit(1);
      if (existingLog && existingLog.length > 0) {
        await supabase.from("transaction_log").update({ status, description: fullDesc, metadata: { crypto_symbol: selected.crypto_symbol, tx_hash: selected.tx_hash, admin_comment: comment || null, client_name: clientName } }).eq("id", existingLog[0].id);
      } else {
        await supabase.from("transaction_log").insert({
          user_id: selected.user_id, type: "deposit", amount: selected.amount, currency: "USD",
          status, description: fullDesc, reference_id: selected.id,
          metadata: { crypto_symbol: selected.crypto_symbol, tx_hash: selected.tx_hash, admin_comment: comment || null, client_name: clientName },
        });
      }
      toast({ title: "Updated", description: isAr ? "?? ????? ?????" : "Deposit updated" });
      setOpen(false);
      fetchData();
    }
    setSaving(false);
  };

  const statusBadge = (s) => {
    if (s === "approved") return <Badge variant="default">{isAr ? "?????" : "Approved"}</Badge>;
    if (s === "rejected") return <Badge variant="destructive">{isAr ? "?????" : "Rejected"}</Badge>;
    return <Badge variant="secondary">{isAr ? "????" : "Pending"}</Badge>;
  };

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isAr ? "????? ???????" : "Deposit Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        {deposits.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "?? ???? ?????" : "No deposits"}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isAr ? "??????" : "Client"}</TableHead>
                <TableHead>{isAr ? "??????" : "Crypto"}</TableHead>
                <TableHead>{isAr ? "??????" : "Amount"}</TableHead>
                <TableHead>{isAr ? "??????" : "Status"}</TableHead>
                <TableHead>{isAr ? "???????" : "Date"}</TableHead>
                <TableHead>{isAr ? "?????????" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map(d => {
                const prof = getProfile(d.user_id);
                return (
                  <TableRow key={d.id}>
                    <TableCell>{prof?.full_name || prof?.email || "-"}</TableCell>
                    <TableCell><Badge variant="outline">{d.crypto_symbol}</Badge></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{statusBadge(d.status)}</TableCell>
                    <TableCell>{new Date(d.created_at).toLocaleDateString(isAr ? "ar" : "en")}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => { setSelected(d); setComment(""); setOpen(true); }}>
                        <Eye className="h-4 w-4 mr-1" />
                        {isAr ? "??????" : "Review"}
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
            <DialogTitle>{isAr ? "?????? ??? ?????" : "Review Deposit"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Client"}</p><p className="font-medium">{getProfile(selected.user_id)?.full_name || getProfile(selected.user_id)?.email}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Crypto"}</p><p className="font-medium">{selected.crypto_symbol}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Amount"}</p><p className="font-medium"></p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Status"}</p>{statusBadge(selected.status)}</div>
                {selected.tx_hash && <div className="col-span-2"><p className="text-muted-foreground">TX Hash</p><p className="font-mono text-xs break-all">{selected.tx_hash}</p></div>}
              </div>
              <div>
                <Label>{isAr ? "????? (???? ?? ???????)" : "Comment (shown in notification)"}</Label>
                <Textarea value={comment} onChange={e => setComment(e.target.value)} className="mt-1" />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleAction("approved")} disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin mr-2" /> : <CircleCheckBig className="h-4 w-4 mr-2" />}
                  {isAr ? "????" : "Approve"}
                </Button>
                <Button onClick={() => handleAction("rejected")} disabled={saving} variant="destructive" className="flex-1">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin mr-2" /> : <CircleX className="h-4 w-4 mr-2" />}
                  {isAr ? "???" : "Reject"}
                </Button>
                <Button onClick={() => handleAction("completed")} disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {isAr ? "?????" : "Complete"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
