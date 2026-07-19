import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "../hooks/useToast";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Switch } from "../components/ui/Switch";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { supabase } from "../lib/supabase";
import { Search, SquarePen, Bell, MessageSquare, LoaderCircle } from "lucide-react";

export function AdminClients() {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const { profiles, kycDocs, finances, setFinances, isSuperAdmin } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [editFinance, setEditFinance] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMsg, setNotifMsg] = useState("");
  const [msgContent, setMsgContent] = useState("");
  const [sendNotif, setSendNotif] = useState(false);
  const [adminComment, setAdminComment] = useState("");
  const [saving, setSaving] = useState(false);
  const isAr = language === "ar";

  const filtered = profiles.filter(p =>
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    (p.full_name && p.full_name.toLowerCase().includes(search.toLowerCase()))
  );

  const getClientKyc = (userId) => kycDocs.find(d => d.user_id === userId);
  const getClientFinance = (userId) => finances[userId] || null;

  const saveFinances = async () => {
    if (!editFinance || !selectedClient) return;
    setSaving(true);
    const old = getClientFinance(selectedClient.user_id);
    const { error } = await supabase.from("client_finances").update({
      capital: editFinance.capital,
      profits: editFinance.profits,
      total_recovered: editFinance.total_recovered,
      notes: editFinance.notes,
      withdrawal_locked: editFinance.withdrawal_locked ?? true,
      withdrawal_lock_message: editFinance.withdrawal_lock_message ?? null,
    }).eq("user_id", selectedClient.user_id);
    if (error) {
      toast({ title: isAr ? "خطأ" : "Error", description: t("admin.updateError"), variant: "destructive" });
    } else {
      const changes = [];
      if (old && editFinance.capital !== old.capital) {
        const diff = editFinance.capital - old.capital;
        changes.push({
          type: "capital_update", amount: Math.abs(diff),
          desc: isAr ? `${diff > 0 ? "زيادة" : "خفض"} رأس المال من $${old.capital.toLocaleString()} إلى $${editFinance.capital.toLocaleString()}`
                     : `Capital ${diff > 0 ? "increased" : "decreased"} from $${old.capital.toLocaleString()} to $${editFinance.capital.toLocaleString()}`
        });
      }
      if (old && editFinance.profits !== old.profits) {
        const diff = editFinance.profits - old.profits;
        changes.push({
          type: "profit_update", amount: Math.abs(diff),
          desc: isAr ? `${diff > 0 ? "زيادة" : "خفض"} الأرباح من $${old.profits.toLocaleString()} إلى $${editFinance.profits.toLocaleString()}`
                     : `Profits ${diff > 0 ? "increased" : "decreased"} from $${old.profits.toLocaleString()} to $${editFinance.profits.toLocaleString()}`
        });
      }
      if (old && editFinance.total_recovered !== old.total_recovered) {
        const diff = editFinance.total_recovered - old.total_recovered;
        changes.push({
          type: "recovery_update", amount: Math.abs(diff),
          desc: isAr ? `${diff > 0 ? "زيادة" : "خفض"} الاسترداد من $${old.total_recovered.toLocaleString()} إلى $${editFinance.total_recovered.toLocaleString()}`
                     : `Recovery ${diff > 0 ? "increased" : "decreased"} from $${old.total_recovered.toLocaleString()} to $${editFinance.total_recovered.toLocaleString()}`
        });
      }

      if (changes.length > 0) {
        const baseMetadata = {
          admin_action: true, admin_comment: adminComment || null,
          old_values: { capital: old?.capital, profits: old?.profits, total_recovered: old?.total_recovered },
          new_values: { capital: editFinance.capital, profits: editFinance.profits, total_recovered: editFinance.total_recovered },
          client_name: selectedClient.full_name || selectedClient.email
        };
        const baseNotification = changes.map(c => c.desc).join("\n");
        await Promise.all(changes.map(c =>
          supabase.from("transaction_log").insert({
            user_id: selectedClient.user_id,
            type: c.type, amount: c.amount, currency: "USD", status: "completed",
            description: adminComment ? `${c.desc} | ${adminComment}` : c.desc,
            metadata: baseMetadata,
          })
        ));
      }
      if (sendNotif && changes.length > 0) {
        await supabase.from("notifications").insert({
          user_id: selectedClient.user_id,
          title: isAr ? "📊 تحديث مالي على حسابك" : "📊 Financial Update on Your Account",
          message: adminComment ? `${baseNotification}\n\n${adminComment}` : baseNotification,
        });
      }
      toast({ title: isAr ? "تم التحديث" : "Updated", description: t("admin.clientUpdated") });
      setEditOpen(false);
      setAdminComment("");
      setSendNotif(false);
      const { data } = await supabase.from("client_finances").select("*");
      if (data) setFinances(data);
    }
    setSaving(false);
  };

  const sendNotification = async () => {
    if (!selectedClient || !notifTitle || !notifMsg) return;
    const { error } = await supabase.from("notifications").insert({
      user_id: selectedClient.user_id,
      title: notifTitle,
      message: notifMsg,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to send", variant: "destructive" });
    } else {
      toast({ title: "Sent", description: "Notification sent" });
      setNotifOpen(false);
      setNotifTitle("");
      setNotifMsg("");
    }
  };

  const sendMessage = async () => {
    if (!selectedClient || !msgContent) return;
    const { error } = await supabase.from("messages").insert({
      user_id: selectedClient.user_id,
      sender_role: "admin",
      content: msgContent,
    });
    if (error) {
      toast({ title: "Error", description: "Failed to send", variant: "destructive" });
    } else {
      toast({ title: "Sent", description: "Message sent" });
      setMsgOpen(false);
      setMsgContent("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle>{isAr ? "إدارة العملاء" : "Client Management"}</CardTitle>
          <div className="relative w-64">
            <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-3 h-4 w-4 text-muted-foreground`} />
            <Input
              placeholder={isAr ? "بحث..." : "Search..."}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={isRTL ? "pr-10" : "pl-10"}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isAr ? "الاسم" : "Name"}</TableHead>
                <TableHead>{isAr ? "البريد" : "Email"}</TableHead>
                {isSuperAdmin && <TableHead>{isAr ? "الهاتف" : "Phone"}</TableHead>}
                <TableHead>KYC</TableHead>
                <TableHead>{isAr ? "رأس المال" : "Capital"}</TableHead>
                <TableHead>{isAr ? "الأرباح" : "Profits"}</TableHead>
                <TableHead>{isAr ? "المسترد" : "Recovered"}</TableHead>
                <TableHead>{isAr ? "الإجراءات" : "Actions"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(client => {
                const kyc = getClientKyc(client.user_id);
                const fin = getClientFinance(client.user_id);
                return (
                  <TableRow key={client.id}>
                    <TableCell>{client.full_name || "-"}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    {isSuperAdmin && <TableCell dir="ltr">{client.phone || "-"}</TableCell>}
                    <TableCell>
                      <Badge variant={kyc?.status === "approved" ? "default" : kyc?.status === "pending" ? "secondary" : kyc?.status === "rejected" ? "destructive" : "outline"}>
                        {kyc?.status === "approved" ? (isAr ? "موثق" : "Verified") : kyc?.status === "pending" ? (isAr ? "معلق" : "Pending") : kyc?.status === "rejected" ? (isAr ? "مرفوض" : "Rejected") : (isAr ? "لم يقدم" : "Not submitted")}
                      </Badge>
                    </TableCell>
                    <TableCell>${Number(fin?.capital || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">${Number(fin?.profits || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-blue-600">${Number(fin?.total_recovered || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog open={editOpen && selectedClient?.id === client.id} onOpenChange={o => { setEditOpen(o); if (o) { setSelectedClient(client); setEditFinance(fin || { capital: 0, profits: 0, total_recovered: 0, notes: "", withdrawal_locked: true, withdrawal_lock_message: "" }); setAdminComment(""); setSendNotif(false); } }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><SquarePen className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>{isAr ? "تعديل البيانات المالية" : "Edit Finances"} - {client.full_name || client.email}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <Label>{isAr ? "رأس المال (USD)" : "Capital (USD)"}</Label>
                                <Input type="number" value={editFinance?.capital || 0} onChange={e => setEditFinance(f => f ? { ...f, capital: parseFloat(e.target.value) || 0 } : null)} />
                              </div>
                              <div>
                                <Label>{isAr ? "الأرباح (USD)" : "Profits (USD)"}</Label>
                                <Input type="number" value={editFinance?.profits || 0} onChange={e => setEditFinance(f => f ? { ...f, profits: parseFloat(e.target.value) || 0 } : null)} />
                              </div>
                              <div>
                                <Label>{isAr ? "المسترد (USD)" : "Recovered (USD)"}</Label>
                                <Input type="number" value={editFinance?.total_recovered || 0} onChange={e => setEditFinance(f => f ? { ...f, total_recovered: parseFloat(e.target.value) || 0 } : null)} />
                              </div>
                              <div>
                                <Label>{isAr ? "ملاحظات" : "Notes"}</Label>
                                <Input value={editFinance?.notes || ""} onChange={e => setEditFinance(f => f ? { ...f, notes: e.target.value } : null)} />
                              </div>
                              <div className="border-t pt-4 space-y-3">
                                <div className="flex items-center justify-between border rounded-lg p-3 bg-amber-50 dark:bg-amber-950/30">
                                  <div>
                                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">{isAr ? "🔒 تجميد السحب" : "🔒 Freeze Withdrawals"}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{isAr ? "عند التفعيل، يرى العميل رسالة عند محاولة السحب" : "When ON, client sees a message when attempting to withdraw"}</p>
                                  </div>
                                  <Switch checked={editFinance?.withdrawal_locked ?? true} onCheckedChange={e => setEditFinance(f => f ? { ...f, withdrawal_locked: e } : null)} />
                                </div>
                                {(editFinance?.withdrawal_locked ?? true) && (
                                  <div>
                                    <Label className="text-xs">{isAr ? "رسالة التجميد" : "Lock message"}</Label>
                                    <Textarea value={editFinance?.withdrawal_lock_message || ""} onChange={e => setEditFinance(f => f ? { ...f, withdrawal_lock_message: e.target.value } : null)} rows={3} className="mt-1 text-xs" />
                                  </div>
                                )}
                              </div>
                              <div className="border-t pt-4">
                                <Label className="text-sm font-semibold">{isAr ? "تعليق على العملية" : "Transaction comment"}</Label>
                                <Textarea value={adminComment} onChange={e => setAdminComment(e.target.value)} className="mt-1" />
                              </div>
                              <div className="flex items-center justify-between border rounded-lg p-3 bg-muted/30">
                                <div className="flex items-center gap-2">
                                  <Bell className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{isAr ? "إرسال إشعار" : "Send notification"}</span>
                                </div>
                                <Switch checked={sendNotif} onCheckedChange={setSendNotif} />
                              </div>
                              <Button onClick={saveFinances} className="w-full" disabled={saving}>
                                {saving && <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />}
                                {isAr ? "حفظ التغييرات" : "Save Changes"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={notifOpen && selectedClient?.id === client.id} onOpenChange={o => { setNotifOpen(o); if (o) setSelectedClient(client); }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><Bell className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{isAr ? "إرسال إشعار" : "Send Notification"} - {client.full_name || client.email}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <Label>{isAr ? "عنوان الإشعار" : "Notification title"}</Label>
                                <Input value={notifTitle} onChange={e => setNotifTitle(e.target.value)} />
                              </div>
                              <div>
                                <Label>{isAr ? "نص الإشعار" : "Notification message"}</Label>
                                <Textarea value={notifMsg} onChange={e => setNotifMsg(e.target.value)} />
                              </div>
                              <Button onClick={sendNotification} className="w-full">{isAr ? "إرسال" : "Send"}</Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog open={msgOpen && selectedClient?.id === client.id} onOpenChange={o => { setMsgOpen(o); if (o) setSelectedClient(client); }}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{isAr ? "إرسال رسالة" : "Send Message"} - {client.full_name || client.email}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <Label>{isAr ? "نص الرسالة" : "Message"}</Label>
                                <Textarea value={msgContent} onChange={e => setMsgContent(e.target.value)} rows={5} />
                              </div>
                              <Button onClick={sendMessage} className="w-full">{isAr ? "إرسال" : "Send"}</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}