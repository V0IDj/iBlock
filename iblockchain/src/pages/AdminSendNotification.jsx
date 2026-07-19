import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Bell, Send, LoaderCircle, CheckCircle2 } from "lucide-react";

export function AdminSendNotification() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const isAr = language === "ar";

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("user_id, full_name, email").order("created_at", { ascending: false });
      if (data) setProfiles(data);
    })();
  }, []);

  const handleSend = async () => {
    if (!userId || !title || !message) return;
    setSaving(true);
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      title,
      message,
      is_read: false,
    });
    if (error) {
      toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isAr ? "تم الإرسال" : "Sent", description: isAr ? "تم إرسال الإشعار بنجاح" : "Notification sent successfully" });
      setDone(true);
      setTimeout(() => { setDone(false); setTitle(""); setMessage(""); setUserId(""); }, 2000);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          {isAr ? "إرسال إشعار مخصص" : "Send Custom Notification"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAr ? "أرسل إشعاراً فورياً لأي مستخدم في المنصة" : "Send an instant notification to any user on the platform"}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{isAr ? "تفاصيل الإشعار" : "Notification Details"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>{isAr ? "المستخدم *" : "User *"}</Label>
            <select
              value={userId}
              onChange={e => setUserId(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">{isAr ? "اختر المستخدم" : "Select user"}</option>
              {profiles.map(p => (
                <option key={p.user_id} value={p.user_id}>
                  {p.full_name || p.email} — {p.email}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "عنوان الإشعار *" : "Notification Title *"}</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder={isAr ? "أدخل عنوان الإشعار" : "Enter notification title"} />
          </div>
          <div className="space-y-2">
            <Label>{isAr ? "نص الإشعار *" : "Notification Message *"}</Label>
            <Textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder={isAr ? "أدخل نص الإشعار..." : "Enter notification message..."} />
          </div>
          <Button onClick={handleSend} disabled={saving || done || !userId || !title || !message} className="w-full" size="lg">
            {saving ? <><LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> {isAr ? "جاري الإرسال..." : "Sending..."}</> :
             done ? <><CheckCircle2 className="h-4 w-4 mr-2" /> {isAr ? "✓ تم الإرسال" : "✓ Sent"}</> :
             <><Send className="h-4 w-4 mr-2" /> {isAr ? "إرسال الإشعار" : "Send Notification"}</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
