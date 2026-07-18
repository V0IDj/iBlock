import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Gift, Users, CheckCircle2, Copy, Link, Share2, DollarSign, Check, LoaderCircle } from "lucide-react";

export function DashboardReferral() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const { user } = useDashboard();
  const [code, setCode] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (user) loadReferral(); }, [user]);

  const loadReferral = async () => {
    if (!user) return;
    const { data } = await supabase.from("referrals").select("*").eq("referrer_id", user.id).order("created_at", { ascending: false });
    if (data && data.length > 0) { setCode(data[0].referral_code); setReferrals(data.filter(r => r.referred_id)); }
    else { const c = `iBC-${user.id.slice(0, 8).toUpperCase()}`; await supabase.from("referrals").insert({ referrer_id: user.id, referral_code: c }); setCode(c); }
    setLoading(false);
  };

  const link = `${window.location.origin}/auth?mode=signup&ref=${code}`;
  const completed = referrals.filter(r => r.status === "completed").length;
  const rewards = referrals.reduce((s, r) => s + Number(r.reward_amount || 0), 0);

  const copyLink = async (t) => { await navigator.clipboard.writeText(t); setCopied(true); toast({ title: language === "ar" ? "تم النسخ!" : "Copied!" }); setTimeout(() => setCopied(false), 2000); };

  if (loading) return <div className="flex justify-center h-64 items-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div><h1 className="text-2xl font-bold">{language === "ar" ? "الإحالة" : "Referral Program"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "ادعُ أصدقاءك واكسب" : "Invite friends and earn"}</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{ label: language === "ar" ? "المُحالون" : "Referrals", value: referrals.length, icon: Users, color: "text-primary" },
          { label: language === "ar" ? "مكتمل" : "Completed", value: completed, icon: CheckCircle2, color: "text-emerald-400" },
          { label: language === "ar" ? "المكافآت" : "Rewards", value: `$${rewards}`, icon: Gift, color: "text-amber-400" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <Card><CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
              <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold">{s.value}</p></div>
            </CardContent></Card>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Link className="h-5 w-5 text-primary" />Your Referral Link</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2"><Input value={link} readOnly className="bg-background/50 text-sm font-mono" /><Button variant="outline" onClick={() => copyLink(link)}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</Button></div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20"><span className="text-xs text-muted-foreground">Code:</span><Badge variant="outline" className="font-mono">{code}</Badge></div>
            <Button variant="outline" className="flex-1" onClick={() => copyLink(link)}><Share2 className="h-4 w-4 me-2" />Share Link</Button>
          </CardContent>
        </Card>
      </motion.div>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" />How It Works</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{ step: "1", title: language === "ar" ? "شارك الرابط" : "Share Link", desc: language === "ar" ? "أرسل رابط الإحالة لأصدقائك" : "Send your referral link to friends" },
              { step: "2", title: language === "ar" ? "يسجلون" : "They Sign Up", desc: language === "ar" ? "صديقك يسجل عبر رابطك" : "Your friend signs up via your link" },
              { step: "3", title: language === "ar" ? "اكسب المكافأة" : "Earn Reward", desc: language === "ar" ? "احصل على مكافأة عند إكمالهم التحقق" : "Get rewarded when they complete KYC" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-muted/10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"><span className="text-primary font-bold">{s.step}</span></div>
                <p className="font-medium text-sm">{s.title}</p><p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {referrals.length > 0 && <Card><CardHeader><CardTitle>{language === "ar" ? "سجل الإحالة" : "Referral History"}</CardTitle></CardHeader>
        <CardContent><div className="space-y-2">{referrals.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/10">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{language === "ar" ? "المستخدم المُحال" : "Referred User"}</span></div>
            <div className="flex items-center gap-3"><Badge variant={r.status === "completed" ? "default" : "secondary"}>{r.status === "completed" ? (language === "ar" ? "مكتمل" : "Completed") : (language === "ar" ? "قيد الانتظار" : "Pending")}</Badge><span className="text-sm font-medium text-primary">${r.reward_amount || 0}</span></div>
          </div>
        ))}</div></CardContent></Card>}
    </div>
  );
}