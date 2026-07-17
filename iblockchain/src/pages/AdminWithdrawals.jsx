import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
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
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      const prof = getProfile(selected.user_id);
      const msg = note
        ? `$${Number(selected.amount).toLocaleString()} - ${selected.network}\n${note}`
        : `$${Number(selected.amount).toLocaleString()} - ${selected.network}`;
      await supabase.from("notifications").insert({
        user_id: selected.user_id,
        title: status === "approved" ? (isAr ? "? ??? ???????? ??? ?????" : "? Withdrawal Approved") : (isAr ? "? ?? ??? ?????" : "? Withdrawal Rejected"),
        message: msg,
      });
      toast({ title: "Updated", description: isAr ? "?? ????? ?????" : "Updated" });
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
        <CardTitle>{isAr ? "????? ?????" : "Withdrawal Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "?? ???? ?????" : "No requests"}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isAr ? "??????" : "Client"}</TableHead>
                <TableHead>{isAr ? "??????" : "Amount"}</TableHead>
                <TableHead>{isAr ? "??????" : "Network"}</TableHead>
                <TableHead>{isAr ? "??????" : "Status"}</TableHead>
                <TableHead>{isAr ? "???????" : "Date"}</TableHead>
                <TableHead>{isAr ? "?????????" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map(r => {
                const prof = getProfile(r.user_id);
                return (
                  <TableRow key={r.id}>
                    <TableCell>{prof?.full_name || prof?.email || "-"}</TableCell>
                    <TableCell></TableCell>
                    <TableCell><Badge variant="outline">{r.network}</Badge></TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleDateString(isAr ? "ar" : "en")}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => { setSelected(r); setNote(r.admin_note || ""); setOpen(true); }}>
                        <Eye className="h-4 w-4 mr-1" />{isAr ? "??????" : "Review"}
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
            <DialogTitle>{isAr ? "?????? ??? ???" : "Review Withdrawal"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Client"}</p><p className="font-medium">{getProfile(selected.user_id)?.full_name || getProfile(selected.user_id)?.email}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Amount"}</p><p className="font-medium"></p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Network"}</p><p className="font-medium">{selected.network}</p></div>
                <div><p className="text-muted-foreground">{isAr ? "??????" : "Status"}</p>{statusBadge(selected.status)}</div>
                <div className="col-span-2"><p className="text-muted-foreground">{isAr ? "????? ???????" : "Wallet Address"}</p><p className="font-mono text-xs break-all">{selected.wallet_address}</p></div>
              </div>
              <div>
                <Label>{isAr ? "?????? (???? ?? ???????)" : "Note (shown in notification)"}</Label>
                <Textarea value={note} onChange={e => setNote(e.target.value)} className="mt-1" />
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
