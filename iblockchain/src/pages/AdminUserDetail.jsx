import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "../hooks/useToast";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Switch } from "../components/ui/Switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { supabase } from "../lib/supabase";
import {
  ArrowLeft, DollarSign, TrendingUp, ShieldCheck, Bell, MessageSquare,
  SquarePen, Lock, Unlock, Smartphone, Monitor, Laptop, Globe, MapPin,
  Wifi, Clock, LogIn, IdCard, Shield, Search, RefreshCw, LoaderCircle,
  Activity, AlertTriangle, Ban, Fingerprint, Eye, Receipt, Edit3,
  CheckCircle, Wallet, User, Mail, Phone, Flag, Key, ShieldAlert,
  LogOut, AlertCircle, ArrowDownToLine, ArrowUpFromLine, Copy,
} from "lucide-react";

const statusColors = {
  active: "bg-emerald-500",
  idle: "bg-amber-500",
  offline: "bg-gray-400",
};

const activityTypeMeta = {
  login: { icon: LogIn, color: "text-emerald-500", bg: "bg-emerald-500/10", label: { en: "Login", ar: "تسجيل دخول" } },
  logout: { icon: LogOut, color: "text-red-500", bg: "bg-red-500/10", label: { en: "Logout", ar: "تسجيل خروج" } },
  page_view: { icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10", label: { en: "Page View", ar: "عرض صفحة" } },
  kyc_submit: { icon: IdCard, color: "text-amber-500", bg: "bg-amber-500/10", label: { en: "KYC Submitted", ar: "تقديم KYC" } },
  kyc_review: { icon: IdCard, color: "text-purple-500", bg: "bg-purple-500/10", label: { en: "KYC Review", ar: "مراجعة KYC" } },
  password_change: { icon: Shield, color: "text-red-500", bg: "bg-red-500/10", label: { en: "Password Change", ar: "تغيير كلمة المرور" } },
  profile_update: { icon: User, color: "text-cyan-500", bg: "bg-cyan-500/10", label: { en: "Profile Update", ar: "تحديث الملف" } },
  deposit: { icon: ArrowDownToLine, color: "text-emerald-500", bg: "bg-emerald-500/10", label: { en: "Deposit", ar: "إيداع" } },
  withdrawal: { icon: ArrowUpFromLine, color: "text-red-500", bg: "bg-red-500/10", label: { en: "Withdrawal", ar: "سحب" } },
};

const activityTypes = Object.keys(activityTypeMeta);

function getDeviceIcon(device) {
  const ua = (device || "").toLowerCase();
  if (ua.includes("iphone") || ua.includes("android") || ua.includes("mobile")) return Smartphone;
  if (ua.includes("ipad") || ua.includes("tablet")) return Monitor;
  return Laptop;
}

function getBrowserIcon(browser) {
  const b = (browser || "").toLowerCase();
  if (b.includes("chrome")) return "Chrome";
  if (b.includes("safari")) return "Safari";
  if (b.includes("firefox")) return "Firefox";
  if (b.includes("edge")) return "Edge";
  return "Web";
}

export function AdminUserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { profiles: allProfiles, isSuperAdmin } = useAdmin();
  const { toast } = useToast();
  const isAr = language === "ar";

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [finances, setFinances] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [adminActions, setAdminActions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [financialAudit, setFinancialAudit] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState([]);

  const [activitySearch, setActivitySearch] = useState("");
  const [activityTypeFilter, setActivityTypeFilter] = useState("all");
  const [tabValue, setTabValue] = useState("overview");

  const [notifTitle, setNotifTitle] = useState("");
  const [notifMsg, setNotifMsg] = useState("");
  const [msgContent, setMsgContent] = useState("");
  const [editFinance, setEditFinance] = useState(null);
  const [adminComment, setAdminComment] = useState("");
  const [sendNotif, setSendNotif] = useState(false);
  const [saving, setSaving] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    const [profRes, finRes, kycRes, sessRes, actRes, adminRes, transRes, holdRes, finAuditRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).single(),
      supabase.from("client_finances").select("*").eq("user_id", userId).single(),
      supabase.from("kyc_documents").select("*").eq("user_id", userId).single(),
      supabase.from("user_sessions").select("*").eq("user_id", userId).order("last_seen", { ascending: false }),
      supabase.from("user_activity_log").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(200),
      supabase.from("admin_action_log").select("*").eq("target_user_id", userId).order("created_at", { ascending: false }).limit(100),
      supabase.from("transaction_log").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(100),
      supabase.from("client_market_holdings").select("*, market_assets(name, symbol)").eq("user_id", userId),
      supabase.from("financial_audit_log").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(100),
    ]);

    if (profRes.data) setProfile(profRes.data);
    if (profRes.error) setProfile(allProfiles?.find(p => p.user_id === userId) || null);
    if (finRes.data) setFinances(finRes.data);
    if (kycRes.data) setKyc(kycRes.data);
    if (sessRes.data) setSessions(sessRes.data);
    if (actRes.data) setActivities(actRes.data);
    if (adminRes.data) setAdminActions(adminRes.data);
    if (transRes.data) setTransactions(transRes.data);
    if (holdRes.data) setHoldings(holdRes.data);
    if (finAuditRes.data) setFinancialAudit(finAuditRes.data);

    const loginAct = (actRes.data || []).filter(a => a.activity_type === "login" || a.activity_type === "password_change");
    setLoginAttempts(loginAct);

    setLoading(false);
  }, [userId, allProfiles]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const sendNotification = async () => {
    if (!profile || !notifTitle || !notifMsg) return;
    const { error } = await supabase.from("notifications").insert({
      user_id: profile.user_id,
      title: notifTitle,
      message: notifMsg,
    });
    if (error) {
      toast({ title: "Error", description: isAr ? "فشل الإرسال" : "Failed to send", variant: "destructive" });
    } else {
      toast({ title: isAr ? "تم الإرسال" : "Sent", description: isAr ? "تم إرسال الإشعار" : "Notification sent" });
      setNotifOpen(false);
      setNotifTitle("");
      setNotifMsg("");
    }
  };

  const sendMessage = async () => {
    if (!profile || !msgContent) return;
    const { error } = await supabase.from("messages").insert({
      user_id: profile.user_id,
      sender_role: "admin",
      content: msgContent,
    });
    if (error) {
      toast({ title: "Error", description: isAr ? "فشل الإرسال" : "Failed to send", variant: "destructive" });
    } else {
      toast({ title: isAr ? "تم الإرسال" : "Sent", description: isAr ? "تم إرسال الرسالة" : "Message sent" });
      setMsgOpen(false);
      setMsgContent("");
    }
  };

  const saveFinances = async () => {
    if (!editFinance || !profile) return;
    setSaving(true);
    const old = finances;
    const { error } = await supabase.from("client_finances").update({
      capital: editFinance.capital,
      profits: editFinance.profits,
      total_recovered: editFinance.total_recovered,
      notes: editFinance.notes,
      withdrawal_locked: editFinance.withdrawal_locked ?? true,
      withdrawal_lock_message: editFinance.withdrawal_lock_message ?? null,
    }).eq("user_id", profile.user_id);
    if (error) {
      toast({ title: isAr ? "خطأ" : "Error", description: isAr ? "فشل التحديث" : "Update failed", variant: "destructive" });
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
        const baseNotification = changes.map(c => c.desc).join("\n");
        await Promise.all(changes.map(c =>
          supabase.from("transaction_log").insert({
            user_id: profile.user_id,
            type: c.type, amount: c.amount, currency: "USD", status: "completed",
            description: adminComment ? `${c.desc} | ${adminComment}` : c.desc,
            metadata: { admin_action: true, admin_comment: adminComment || null },
          })
        ));
      }
      if (sendNotif && changes.length > 0) {
        await supabase.from("notifications").insert({
          user_id: profile.user_id,
          title: isAr ? "📊 تحديث مالي على حسابك" : "📊 Financial Update on Your Account",
          message: adminComment ? `${baseNotification}\n\n${adminComment}` : baseNotification,
        });
      }
      await logAdminAction("finance_edit", profile.user_id, profile.email, {
        old_values: { capital: old?.capital, profits: old?.profits, total_recovered: old?.total_recovered },
        new_values: { capital: editFinance.capital, profits: editFinance.profits, total_recovered: editFinance.total_recovered },
        admin_comment: adminComment,
      });
      toast({ title: isAr ? "تم التحديث" : "Updated", description: isAr ? "تم تحديث البيانات المالية" : "Finances updated" });
      setEditOpen(false);
      setAdminComment("");
      setSendNotif(false);
      setFinances(editFinance);
    }
    setSaving(false);
  };

  const toggleFreeze = async () => {
    if (!profile || !finances) return;
    const newLocked = !finances.withdrawal_locked;
    const { error } = await supabase.from("client_finances").update({
      withdrawal_locked: newLocked,
      withdrawal_lock_message: newLocked ? (isAr ? "تم تجميد السحب من قبل الإدارة" : "Withdrawals frozen by admin") : null,
    }).eq("user_id", profile.user_id);
    if (error) {
      toast({ title: "Error", description: isAr ? "فشل التحديث" : "Update failed", variant: "destructive" });
    } else {
      setFinances(f => ({ ...f, withdrawal_locked: newLocked }));
      await logAdminAction(newLocked ? "freeze_withdrawals" : "unfreeze_withdrawals", profile.user_id, profile.email);
      toast({ title: isAr ? "تم التحديث" : "Updated", description: newLocked ? (isAr ? "تم تجميد السحب" : "Withdrawals frozen") : (isAr ? "تم إلغاء تجميد السحب" : "Withdrawals unfrozen") });
    }
  };

  const logAdminAction = async (actionType, targetUserId, targetEmail, details = {}) => {
    await supabase.rpc("log_admin_action", {
      _action_type: actionType,
      _target_user_id: targetUserId,
      _target_user_email: targetEmail,
      _details: details,
      _page_url: `/admin/user-monitoring/${userId}`,
    });
  };

  const userStatus = sessions.some(s => s.is_active) ? "active" : sessions.length > 0 ? "idle" : "offline";
  const kycStatus = kyc?.status || "none";
  const kycLabel = {
    approved: isAr ? "موثق" : "Verified",
    pending: isAr ? "معلق" : "Pending",
    rejected: isAr ? "مرفوض" : "Rejected",
    none: isAr ? "لم يقدم" : "Not submitted",
  };
  const kycBadgeVariant = {
    approved: "default",
    pending: "secondary",
    rejected: "destructive",
    none: "outline",
  };

  const filteredActivities = activities.filter(a => {
    const desc = JSON.stringify(a.details || "").toLowerCase();
    const s = activitySearch.toLowerCase();
    const matchSearch = !activitySearch || desc.includes(s) || (a.activity_type || "").includes(s);
    const matchType = activityTypeFilter === "all" || a.activity_type === activityTypeFilter;
    return matchSearch && matchType;
  });

  const formatAmount = (val) => {
    const n = Number(val);
    return isNaN(n) ? "$0" : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold">{isAr ? "المستخدم غير موجود" : "User Not Found"}</h2>
        <p className="text-muted-foreground mt-2">{isAr ? "لم يتم العثور على مستخدم بهذا المعرف" : "No user found with this ID"}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/user-monitoring")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isAr ? "العودة للمراقبة" : "Back to Monitoring"}
        </Button>
      </div>
    );
  }

  const initials = (profile.full_name || profile.email || "?").charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin/user-monitoring")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {isAr ? "العودة" : "Back"}
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{profile.full_name || profile.email}</h1>
          <p className="text-muted-foreground text-sm mt-0.5 font-mono">{profile.user_id}</p>
        </div>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList className="w-full flex-wrap h-auto grid grid-cols-3 sm:grid-cols-6 gap-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 text-xs sm:text-sm">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "نظرة عامة" : "Overview"}</span>
            <span className="sm:hidden">{isAr ? "عامة" : "Overview"}</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2 text-xs sm:text-sm">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "الجلسات" : "Sessions"}</span>
            <span className="sm:hidden">{isAr ? "جلسات" : "Sess."}</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{sessions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2 text-xs sm:text-sm">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "النشاط" : "Activity"}</span>
            <span className="sm:hidden">{isAr ? "نشاط" : "Activ."}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 text-xs sm:text-sm">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "الأمان" : "Security"}</span>
            <span className="sm:hidden">{isAr ? "أمان" : "Secur."}</span>
          </TabsTrigger>
          <TabsTrigger value="admin-actions" className="flex items-center gap-2 text-xs sm:text-sm">
            <ShieldAlert className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "الإجراءات" : "Actions"}</span>
            <span className="sm:hidden">{isAr ? "إجراءات" : "Admin"}</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{adminActions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center gap-2 text-xs sm:text-sm">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "المالية" : "Finances"}</span>
            <span className="sm:hidden">{isAr ? "مالية" : "Fin."}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="premium-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <User className="h-3 w-3" />
                          {isAr ? "الاسم الكامل" : "Full Name"}
                        </p>
                        <p className="font-semibold">{profile.full_name || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Mail className="h-3 w-3" />
                          {isAr ? "البريد الإلكتروني" : "Email"}
                        </p>
                        <p className="font-semibold">{profile.email || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Phone className="h-3 w-3" />
                          {isAr ? "الهاتف" : "Phone"}
                        </p>
                        <p className="font-semibold" dir="ltr">{profile.phone || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Flag className="h-3 w-3" />
                          {isAr ? "الدولة" : "Country"}
                        </p>
                        <p className="font-semibold">{profile.country || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                          <Key className="h-3 w-3" />
                          {isAr ? "معرف المحفظة" : "Wallet ID"}
                        </p>
                        <p className="font-semibold font-mono text-sm">{profile.wallet_id || "-"}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{isAr ? "الحالة" : "Status"}</p>
                          <div className="flex items-center gap-2">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${statusColors[userStatus]} ${userStatus === "active" ? "animate-pulse" : ""}`} />
                            <Badge variant={userStatus === "active" ? "default" : "secondary"} className="text-[10px]">
                              {userStatus === "active" ? (isAr ? "نشط" : "Active") : userStatus === "idle" ? (isAr ? "خامل" : "Idle") : (isAr ? "غير متصل" : "Offline")}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">KYC</p>
                          <Badge variant={kycBadgeVariant[kycStatus]} className="text-[10px]">{kycLabel[kycStatus]}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: isAr ? "رأس المال" : "Capital", value: formatAmount(finances?.capital || 0), icon: DollarSign, color: "text-emerald-600" },
              { title: isAr ? "الأرباح" : "Profits", value: formatAmount(finances?.profits || 0), icon: TrendingUp, color: "text-blue-600" },
              { title: isAr ? "المسترد" : "Recovered", value: formatAmount(finances?.total_recovered || 0), icon: ShieldCheck, color: "text-primary" },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                <Card className="premium-card">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <card.icon className={`h-5 w-5 ${card.color}`} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{card.title}</p>
                        <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{isAr ? "إجراءات سريعة" : "Quick Actions"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Dialog open={notifOpen} onOpenChange={setNotifOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm"><Bell className="h-4 w-4 mr-1.5" />{isAr ? "إرسال إشعار" : "Send Notification"}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{isAr ? "إرسال إشعار" : "Send Notification"} - {profile.full_name || profile.email}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Input placeholder={isAr ? "عنوان الإشعار" : "Notification title"} value={notifTitle} onChange={e => setNotifTitle(e.target.value)} />
                        </div>
                        <div>
                          <Textarea placeholder={isAr ? "نص الإشعار" : "Notification message"} value={notifMsg} onChange={e => setNotifMsg(e.target.value)} rows={4} />
                        </div>
                        <Button onClick={sendNotification} className="w-full">{isAr ? "إرسال" : "Send"}</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={msgOpen} onOpenChange={setMsgOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-1.5" />{isAr ? "إرسال رسالة" : "Send Message"}</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{isAr ? "إرسال رسالة" : "Send Message"} - {profile.full_name || profile.email}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Textarea placeholder={isAr ? "نص الرسالة" : "Message"} value={msgContent} onChange={e => setMsgContent(e.target.value)} rows={5} />
                        </div>
                        <Button onClick={sendMessage} className="w-full">{isAr ? "إرسال" : "Send"}</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={editOpen} onOpenChange={o => { setEditOpen(o); if (o) setEditFinance(finances || { capital: 0, profits: 0, total_recovered: 0, notes: "", withdrawal_locked: true, withdrawal_lock_message: "" }); }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm"><SquarePen className="h-4 w-4 mr-1.5" />{isAr ? "تعديل المالية" : "Edit Finances"}</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{isAr ? "تعديل البيانات المالية" : "Edit Finances"} - {profile.full_name || profile.email}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{isAr ? "رأس المال (USD)" : "Capital (USD)"}</p>
                          <Input type="number" value={editFinance?.capital || 0} onChange={e => setEditFinance(f => f ? { ...f, capital: parseFloat(e.target.value) || 0 } : null)} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{isAr ? "الأرباح (USD)" : "Profits (USD)"}</p>
                          <Input type="number" value={editFinance?.profits || 0} onChange={e => setEditFinance(f => f ? { ...f, profits: parseFloat(e.target.value) || 0 } : null)} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{isAr ? "المسترد (USD)" : "Recovered (USD)"}</p>
                          <Input type="number" value={editFinance?.total_recovered || 0} onChange={e => setEditFinance(f => f ? { ...f, total_recovered: parseFloat(e.target.value) || 0 } : null)} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">{isAr ? "ملاحظات" : "Notes"}</p>
                          <Input value={editFinance?.notes || ""} onChange={e => setEditFinance(f => f ? { ...f, notes: e.target.value } : null)} />
                        </div>
                        <div className="border-t pt-4 space-y-3">
                          <div className="flex items-center justify-between border rounded-lg p-3 bg-amber-50 dark:bg-amber-950/30">
                            <div>
                              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">🔒 {isAr ? "تجميد السحب" : "Freeze Withdrawals"}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{isAr ? "عند التفعيل، يرى العميل رسالة عند محاولة السحب" : "When ON, client sees a message when attempting to withdraw"}</p>
                            </div>
                            <Switch checked={editFinance?.withdrawal_locked ?? true} onCheckedChange={e => setEditFinance(f => f ? { ...f, withdrawal_locked: e } : null)} />
                          </div>
                          {(editFinance?.withdrawal_locked ?? true) && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">{isAr ? "رسالة التجميد" : "Lock message"}</p>
                              <Textarea value={editFinance?.withdrawal_lock_message || ""} onChange={e => setEditFinance(f => f ? { ...f, withdrawal_lock_message: e.target.value } : null)} rows={3} className="text-xs" />
                            </div>
                          )}
                        </div>
                        <div className="border-t pt-4">
                          <p className="text-sm font-semibold mb-1">{isAr ? "تعليق على العملية" : "Transaction comment"}</p>
                          <Textarea value={adminComment} onChange={e => setAdminComment(e.target.value)} />
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

                  <Button
                    variant={finances?.withdrawal_locked ? "destructive" : "outline"}
                    size="sm"
                    onClick={toggleFreeze}
                  >
                    {finances?.withdrawal_locked ? (
                      <><Unlock className="h-4 w-4 mr-1.5" />{isAr ? "إلغاء تجميد السحب" : "Unfreeze"}</>
                    ) : (
                      <><Lock className="h-4 w-4 mr-1.5" />{isAr ? "تجميد السحب" : "Freeze"}</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                {isAr ? "الجلسات والأجهزة" : "Sessions & Devices"}
                <Badge variant="secondary" className="ml-2">{sessions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد جلسات" : "No sessions found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الجهاز" : "Device"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المتصفح / OS" : "Browser / OS"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الدقة" : "Resolution"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الموقع" : "Location"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">ISP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "أول ظهور" : "First Seen"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "آخر ظهور" : "Last Seen"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((s, i) => {
                        const DeviceIcon = getDeviceIcon(s.device);
                        const isCurrent = i === 0 && s.is_active;
                        return (
                          <tr key={s.id} className={`border-b hover:bg-muted/30 transition-colors ${isCurrent ? "bg-primary/5" : ""}`}>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs truncate max-w-[140px]">{s.device || "-"}</span>
                              </div>
                            </td>
                            <td className="p-3 text-xs">
                              <span>{s.browser || "-"}</span>
                              {s.os && <span className="text-muted-foreground"> / {s.os}</span>}
                            </td>
                            <td className="p-3 text-xs text-muted-foreground">{s.screen_resolution || "-"}</td>
                            <td className="p-3 font-mono text-xs">{s.ip || "-"}</td>
                            <td className="p-3 text-xs">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span>{s.city || "-"}, {s.country || "-"}</span>
                              </div>
                            </td>
                            <td className="p-3 text-xs">{s.isp || "-"}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{s.first_seen ? new Date(s.first_seen).toLocaleDateString() : "-"}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">{s.last_seen ? new Date(s.last_seen).toLocaleString() : "-"}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Badge variant={s.is_active ? "default" : "secondary"} className="text-[10px]">
                                  {s.is_active ? (isAr ? "نشط" : "Active") : (isAr ? "غير نشط" : "Inactive")}
                                </Badge>
                                {isCurrent && (
                                  <Badge variant="success" className="text-[10px]">{isAr ? "حالي" : "Current"}</Badge>
                                )}
                                {(s.vpn_detected || s.proxy_detected) && (
                                  <Badge variant="destructive" className="text-[10px]">VPN</Badge>
                                )}
                              </div>
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
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  {isAr ? "النشاطات" : "Activity Timeline"}
                  <Badge variant="secondary" className="ml-2">{filteredActivities.length}</Badge>
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={isAr ? "بحث في النشاطات..." : "Search activities..."}
                      value={activitySearch}
                      onChange={e => setActivitySearch(e.target.value)}
                      className="pl-10 h-9"
                    />
                  </div>
                  <select
                    value={activityTypeFilter}
                    onChange={e => setActivityTypeFilter(e.target.value)}
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm w-36"
                  >
                    <option value="all">{isAr ? "الكل" : "All"}</option>
                    {activityTypes.map(t => (
                      <option key={t} value={t}>{activityTypeMeta[t]?.label[isAr ? "ar" : "en"] || t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredActivities.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد نشاطات" : "No activities found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الصفحة" : "Page"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Timestamp"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.map(a => {
                        const meta = activityTypeMeta[a.activity_type];
                        const Icon = meta?.icon || Activity;
                        const color = meta?.color || "text-muted-foreground";
                        const bg = meta?.bg || "bg-muted/30";
                        const label = meta?.label?.[isAr ? "ar" : "en"] || a.activity_type;
                        return (
                          <tr key={a.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}>
                                  <Icon className={`h-4 w-4 ${color}`} />
                                </div>
                                <span className="text-xs font-medium">{label}</span>
                              </div>
                            </td>
                            <td className="p-3 text-xs max-w-[250px] truncate">
                              {a.details ? JSON.stringify(a.details).slice(0, 100) : "-"}
                            </td>
                            <td className="p-3 text-xs text-muted-foreground">
                              <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{a.page_url || "-"}</code>
                            </td>
                            <td className="p-3 font-mono text-xs">{a.ip || "-"}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(a.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
                                year: "numeric", month: "short", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                              })}
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
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  {isAr ? "VPN / Proxy" : "VPN / Proxy Detection"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.filter(s => s.vpn_detected || s.proxy_detected).length === 0 ? (
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    {isAr ? "لم يتم اكتشاف VPN أو Proxy" : "No VPN or Proxy detected"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الدولة" : "Country"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.filter(s => s.vpn_detected || s.proxy_detected).map(s => (
                          <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3 font-mono text-xs">{s.ip}</td>
                            <td className="p-3">
                              <Badge variant="destructive" className="text-[10px]">
                                {s.vpn_detected ? "VPN" : "Proxy"}
                              </Badge>
                            </td>
                            <td className="p-3 text-xs">{s.country || "-"}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                              {s.last_seen ? new Date(s.last_seen).toLocaleDateString() : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-amber-500" />
                  {isAr ? "الأجهزة والمتصفحات" : "Devices & Browsers"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">{isAr ? "الأجهزة المستخدمة" : "Devices Used"}</p>
                    <p className="text-2xl font-bold">{new Set(sessions.map(s => s.device)).size}</p>
                    <div className="mt-2 space-y-1">
                      {[...new Set(sessions.map(s => s.device))].slice(0, 5).map(d => (
                        <p key={d} className="text-xs text-muted-foreground">• {d || "-"}</p>
                      ))}
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">{isAr ? "المتصفحات" : "Browsers"}</p>
                    <p className="text-2xl font-bold">{new Set(sessions.map(s => s.browser)).size}</p>
                    <div className="mt-2 space-y-1">
                      {[...new Set(sessions.map(s => s.browser))].slice(0, 5).map(b => (
                        <p key={b} className="text-xs text-muted-foreground">• {b || "-"}</p>
                      ))}
                    </div>
                  </div>
                </div>
                {(new Set(sessions.map(s => s.device)).size > 2 || new Set(sessions.map(s => s.browser)).size > 2) && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      {isAr ? "تنبيه: تم اكتشاف استخدام أجهزة أو متصفحات متعددة" : "Alert: Multiple devices or browsers detected"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-primary" />
                  {isAr ? "محاولات تسجيل الدخول" : "Login Attempts"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loginAttempts.length === 0 ? (
                  <p className="text-muted-foreground text-sm">{isAr ? "لا توجد محاولات تسجيل دخول مسجلة" : "No login attempts recorded"}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التفاصيل" : "Details"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loginAttempts.slice(0, 20).map(a => {
                          const meta = activityTypeMeta[a.activity_type];
                          const Icon = meta?.icon || Activity;
                          return (
                            <tr key={a.id} className="border-b hover:bg-muted/30 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Icon className={`h-4 w-4 ${meta?.color || "text-muted-foreground"}`} />
                                  <span className="text-xs">{meta?.label?.[isAr ? "ar" : "en"] || a.activity_type}</span>
                                </div>
                              </td>
                              <td className="p-3 text-xs">{a.details ? JSON.stringify(a.details).slice(0, 80) : "-"}</td>
                              <td className="p-3 font-mono text-xs">{a.ip || "-"}</td>
                              <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(a.created_at).toLocaleString()}
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

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {isAr ? "سجل عناوين IP" : "IP Address History"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sessions.length === 0 ? (
                  <p className="text-muted-foreground text-sm">{isAr ? "لا توجد عناوين IP مسجلة" : "No IP addresses recorded"}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الدولة" : "Country"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المدينة" : "City"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">ISP</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "آخر ظهور" : "Last Seen"}</th>
                          <th className="p-3 text-left font-medium text-muted-foreground">VPN</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map(s => (
                          <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3 font-mono text-xs">{s.ip || "-"}</td>
                            <td className="p-3 text-xs">{s.country || "-"}</td>
                            <td className="p-3 text-xs">{s.city || "-"}</td>
                            <td className="p-3 text-xs">{s.isp || "-"}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                              {s.last_seen ? new Date(s.last_seen).toLocaleDateString() : "-"}
                            </td>
                            <td className="p-3">
                              {(s.vpn_detected || s.proxy_detected) ? (
                                <Badge variant="destructive" className="text-[10px]">VPN</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[10px]">-</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admin-actions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-primary" />
                {isAr ? "إجراءات الإدارة" : "Admin Actions"}
                <Badge variant="secondary" className="ml-2">{adminActions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {adminActions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد إجراءات إدارة" : "No admin actions recorded"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المسؤول" : "Admin"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الإجراء" : "Action"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التفاصيل" : "Details"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminActions.map(a => (
                        <tr key={a.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                {a.admin_email?.charAt(0)?.toUpperCase() || "A"}
                              </div>
                              <span className="text-xs">{a.admin_email || "-"}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant={
                              a.action_type?.includes("freeze") ? "destructive" :
                              a.action_type?.includes("edit") || a.action_type?.includes("update") ? "default" :
                              "secondary"
                            } className="text-[10px]">
                              {a.action_type?.replace(/_/g, " ") || "-"}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs max-w-[250px] truncate">
                            {a.details ? JSON.stringify(a.details).slice(0, 120) : "-"}
                          </td>
                          <td className="p-3 font-mono text-xs">{a.ip || "-"}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(a.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
                              year: "numeric", month: "short", day: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                {isAr ? "الملخص المالي" : "Financial Summary"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: isAr ? "رأس المال" : "Capital", value: formatAmount(finances?.capital || 0), color: "text-emerald-600" },
                  { label: isAr ? "الأرباح" : "Profits", value: formatAmount(finances?.profits || 0), color: "text-blue-600" },
                  { label: isAr ? "المسترد" : "Recovered", value: formatAmount(finances?.total_recovered || 0), color: "text-primary" },
                ].map((s, i) => (
                  <div key={i} className="border rounded-lg p-4">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              {finances?.notes && (
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">{isAr ? "ملاحظات" : "Notes"}</p>
                  <p className="text-sm">{finances.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                {isAr ? "المعاملات المالية" : "Transactions"}
                <Badge variant="secondary" className="ml-2">{transactions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">{isAr ? "لا توجد معاملات" : "No transactions found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(t => (
                        <tr key={t.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <Badge variant={
                              t.type === "deposit" || t.type === "capital_update" ? "default" :
                              t.type === "withdrawal" || t.type === "profit_update" ? "destructive" :
                              "secondary"
                            } className="text-[10px]">
                              {t.type?.replace(/_/g, " ") || "-"}
                            </Badge>
                          </td>
                          <td className="p-3 font-semibold">{formatAmount(t.amount)}</td>
                          <td className="p-3">
                            <Badge variant={
                              t.status === "completed" || t.status === "approved" ? "default" :
                              t.status === "rejected" ? "destructive" : "secondary"
                            } className="text-[10px]">
                              {t.status === "completed" ? (isAr ? "مكتمل" : "Completed") :
                               t.status === "approved" ? (isAr ? "مقبول" : "Approved") :
                               t.status === "rejected" ? (isAr ? "مرفوض" : "Rejected") :
                               t.status === "pending" ? (isAr ? "معلق" : "Pending") : t.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs max-w-[200px] truncate text-muted-foreground">{t.description || "-"}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(t.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
                              year: "numeric", month: "short", day: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                {isAr ? "الممتلكات السوقية" : "Market Holdings"}
                <Badge variant="secondary" className="ml-2">{holdings.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {holdings.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">{isAr ? "لا توجد ممتلكات سوقية" : "No market holdings"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الأصل" : "Asset"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الرمز" : "Symbol"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الكمية" : "Quantity"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المبلغ المستثمر" : "Invested"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الربح" : "Profit"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map(h => (
                        <tr key={h.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3 font-medium text-sm">{h.market_assets?.name || "-"}</td>
                          <td className="p-3 text-xs font-mono">{h.market_assets?.symbol || "-"}</td>
                          <td className="p-3 text-xs">{Number(h.quantity).toLocaleString()}</td>
                          <td className="p-3 text-xs">{formatAmount(h.invested_amount)}</td>
                          <td className={`p-3 text-xs font-semibold ${Number(h.profit_amount) >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {formatAmount(h.profit_amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Receipt className="h-4 w-4 text-primary" />
                {isAr ? "سجل التدقيق المالي" : "Financial Audit Log"}
                <Badge variant="secondary" className="ml-2">{financialAudit.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {financialAudit.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">{isAr ? "لا توجد إدخالات تدقيق" : "No audit entries found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الإجراء" : "Action"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "القيم القديمة" : "Old Values"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "القيم الجديدة" : "New Values"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialAudit.map(a => (
                        <tr key={a.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <Badge variant="secondary" className="text-[10px]">
                              {a.action_type?.replace(/_/g, " ") || "-"}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs">{a.amount ? formatAmount(a.amount) : "-"}</td>
                          <td className="p-3 text-xs max-w-[150px] truncate text-muted-foreground">
                            {a.old_value ? JSON.stringify(a.old_value).slice(0, 80) : "-"}
                          </td>
                          <td className="p-3 text-xs max-w-[150px] truncate text-muted-foreground">
                            {a.new_value ? JSON.stringify(a.new_value).slice(0, 80) : "-"}
                          </td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(a.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
                              year: "numeric", month: "short", day: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
