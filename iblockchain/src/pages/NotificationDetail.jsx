import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { Bell, Clock, DollarSign, ArrowLeft, Shield } from "lucide-react";

export function NotificationDetail() {
  const { id } = useParams();
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAr = language === "ar";

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate("/auth"); return; }
      if (id) {
        const { data: n } = await supabase.from("notifications").select("*").eq("id", id).eq("user_id", session.user.id).single();
        if (n) {
          setNotification(n);
          if (!n.is_read) await supabase.from("notifications").update({ is_read: true }).eq("id", id);
        }
      }
      const { data: f } = await supabase.from("client_finances").select("amount_due, currency, payment_due_message, payment_deadline, payment_status").eq("user_id", session.user.id).single();
      if (f) setPayment(f);
      setLoading(false);
    })();
  }, [id, navigate]);

  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString(isAr ? "ar" : "en", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return date; }
  };

  const cleanText = (text) => {
    if (!text) return text;
    return text.replace(/admin/gi, isAr ? "فريق المعالجة" : "processing team")
      .replace(/الأدمن|ادمن|للأدمن|الإدارة/g, "فريق المعالجة");
  };

  const hasPaymentDue = payment && payment.amount_due > 0 && payment.payment_status !== "paid";

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!notification) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md w-full mx-4"><CardContent className="py-12 text-center">
        <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">{isAr ? "الإشعار غير موجود" : "Notification not found"}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mx-1" />{isAr ? "العودة للوحة التحكم" : "Back to Dashboard"}
        </Button>
      </CardContent></Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">iBlockchain</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {isAr ? "العودة" : "Back"}
          </Button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{cleanText(notification.title)}</CardTitle>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{formatDate(notification.created_at)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed text-base">{cleanText(notification.message)}</p>
            </CardContent>
          </Card>
        </motion.div>

        {hasPaymentDue && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }}>
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <DollarSign className="h-5 w-5" />
                  {isAr ? "رسوم مستحقة الدفع" : "Payment Due"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-background border">
                  <span className="text-muted-foreground">{isAr ? "المبلغ المستحق" : "Amount Due"}</span>
                  <span className="text-xl font-bold text-destructive">{payment.currency} {payment.amount_due.toLocaleString()}</span>
                </div>
                {payment.payment_due_message && <p className="text-sm text-muted-foreground">{payment.payment_due_message}</p>}
                {payment.payment_deadline && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{isAr ? "الموعد النهائي: " : "Deadline: "}{formatDate(payment.payment_deadline)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}