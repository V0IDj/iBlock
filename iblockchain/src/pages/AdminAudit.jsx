import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { ClipboardList, RefreshCw, Search, Filter, LoaderCircle, ChevronDown, ChevronRight } from "lucide-react";

const sectionIcons = { deposit_requests: "💰", withdrawal_requests: "📤", client_finances: "💵", deposit_wallets: "🏦", kyc_documents: "🪪", notifications: "🔔", messages: "💬" };
const sectionLabels = { deposit_requests: { ar: "طلبات الإيداع", en: "Deposit Requests" }, withdrawal_requests: { ar: "طلبات السحب", en: "Withdrawal Requests" }, client_finances: { ar: "الأرصدة المالية", en: "Client Finances" }, deposit_wallets: { ar: "محافظ الإيداع", en: "Deposit Wallets" }, kyc_documents: { ar: "وثائق التحقق", en: "KYC Documents" }, notifications: { ar: "الإشعارات", en: "Notifications" }, messages: { ar: "الرسائل", en: "Messages" } };

export function AdminAudit() {
  const { language } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [profiles, setProfiles] = useState({});
  const isAr = language === "ar";

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const [logRes, profRes] = await Promise.all([
      supabase.from("admin_audit_log").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    if (logRes.data) setLogs(logRes.data);
    if (profRes.data) {
      const map = {};
      profRes.data.forEach(p => { map[p.user_id] = { full_name: p.full_name, email: p.email }; });
      setProfiles(map);
    }
    setLoading(false);
  };

  const getUserName = (userId) => {
    if (!userId || typeof userId !== "string") return "-";
    const p = profiles[userId];
    return p ? p.full_name || p.email : userId.slice(0, 8) + "...";
  };

  const formatDetail = (log) => {
    const d = log.details;
    if (!d) return "-";
    const t = d;
    const user = getUserName(t.user_id);
    if (log.table_name === "deposit_requests") {
      const amt = t.amount ? `$${Number(t.amount).toLocaleString()}` : "";
      const sym = t.crypto_symbol || "";
      const st = t.status || "";
      if (log.action === "INSERT") return isAr ? `إيداع جديد ${amt} ${sym} - ${user}` : `New deposit ${amt} ${sym} - ${user}`;
      return isAr ? `تحديث إيداع ${amt} ${sym} → ${st} - ${user}` : `Deposit updated ${amt} ${sym} → ${st} - ${user}`;
    }
    if (log.table_name === "withdrawal_requests") {
      const amt = t.amount ? `$${Number(t.amount).toLocaleString()}` : "";
      const st = t.status || "";
      const net = t.network || "";
      if (log.action === "INSERT") return isAr ? `طلب سحب ${amt} شبكة ${net} - ${user}` : `Withdrawal ${amt} on ${net} - ${user}`;
      return isAr ? `تحديث سحب ${amt} → ${st} - ${user}` : `Withdrawal updated ${amt} → ${st} - ${user}`;
    }
    if (log.table_name === "client_finances") {
      const cap = t.capital != null ? `$${Number(t.capital).toLocaleString()}` : "";
      const prof = t.profits != null ? `$${Number(t.profits).toLocaleString()}` : "";
      return isAr ? `تحديث مالي - رأس المال: ${cap}, أرباح: ${prof} - ${user}` : `Finance - Capital: ${cap}, Profits: ${prof} - ${user}`;
    }
    if (log.table_name === "kyc_documents") {
      const st = String(t.status || "");
      const label = isAr ? { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" }[st] || st : st;
      if (log.action === "UPDATE") return isAr ? `مراجعة KYC → ${label} - ${user}` : `KYC → ${label} - ${user}`;
      return isAr ? `تقديم KYC - ${user}` : `KYC submitted - ${user}`;
    }
    return JSON.stringify(t).slice(0, 120);
  };

  const sections = [...new Set(logs.map(l => l.table_name))];
  const filtered = logs.filter(l => {
    const matchSearch = !search || (l.admin_email || "").toLowerCase().includes(search.toLowerCase()) || formatDetail(l).toLowerCase().includes(search.toLowerCase());
    const matchSection = sectionFilter === "all" || l.table_name === sectionFilter;
    const matchAction = actionFilter === "all" || l.action === actionFilter;
    return matchSearch && matchSection && matchAction;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              {isAr ? "سجل المراقبة" : "Admin Audit Log"}
              <Badge variant="secondary" className="ml-2">{filtered.length}</Badge>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Input placeholder={isAr ? "بحث..." : "Search..."} value={search} onChange={e => setSearch(e.target.value)} className="w-56 h-9" />
            <select value={sectionFilter} onChange={e => setSectionFilter(e.target.value)} className="h-9 rounded-lg border border-input bg-background px-3 text-sm w-44">
              <option value="all">{isAr ? "الكل" : "All"}</option>
              {sections.map(s => <option key={s} value={s}>{sectionIcons[s] || "📋"} {sectionLabels[s]?.[isAr ? "ar" : "en"] || s}</option>)}
            </select>
            <select value={actionFilter} onChange={e => setActionFilter(e.target.value)} className="h-9 rounded-lg border border-input bg-background px-3 text-sm w-36">
              <option value="all">{isAr ? "الكل" : "All"}</option>
              <option value="INSERT">{isAr ? "إضافة" : "Create"}</option>
              <option value="UPDATE">{isAr ? "تعديل" : "Update"}</option>
              <option value="DELETE">{isAr ? "حذف" : "Delete"}</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد سجلات" : "No entries found"}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="w-8"></th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date & Time"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "المسؤول" : "Admin"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "العملية" : "Action"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "القسم" : "Section"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
              </tr></thead>
              <tbody>
                {filtered.map(log => {
                  const isExpanded = expanded === log.id;
                  return (
                    <>
                      <tr key={log.id} className="border-b hover:bg-muted/30 cursor-pointer" onClick={() => setExpanded(isExpanded ? null : log.id)}>
                        <td className="p-2">{isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}</td>
                        <td className="p-4 text-xs whitespace-nowrap">{new Date(log.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="p-4 text-sm">{log.admin_email === "system@historical" ? <Badge variant="outline" className="text-xs bg-amber-50 border-amber-300 text-amber-700">{isAr ? "نظام" : "System"}</Badge> : <span className="font-medium">{log.admin_email || "-"}</span>}</td>
                        <td className="p-4">
                          {log.action === "INSERT" ? <Badge className="bg-green-600 text-white">{isAr ? "إضافة" : "Create"}</Badge> :
                           log.action === "UPDATE" ? <Badge className="bg-blue-600 text-white">{isAr ? "تعديل" : "Update"}</Badge> :
                           log.action === "DELETE" ? <Badge variant="destructive">{isAr ? "حذف" : "Delete"}</Badge> :
                           <Badge variant="secondary">{log.action}</Badge>}
                        </td>
                        <td className="p-4"><span className="mr-1">{sectionIcons[log.table_name] || "📋"}</span><Badge variant="outline">{sectionLabels[log.table_name]?.[isAr ? "ar" : "en"] || log.table_name}</Badge></td>
                        <td className="p-4 max-w-md text-sm">{formatDetail(log)}</td>
                      </tr>
                      {isExpanded && log.details && (
                        <tr key={`${log.id}-details`}>
                          <td colSpan={6} className="bg-muted/30 p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {Object.entries(typeof log.details === "string" ? JSON.parse(log.details) : log.details).filter(([k]) => !["id", "created_at", "updated_at"].includes(k)).map(([k, v]) => {
                                let label = k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
                                let val = v == null ? "-" : String(v);
                                if (k === "user_id" && typeof v === "string") { val = getUserName(v); label = isAr ? "العميل" : "Client"; }
                                if (["amount", "capital", "profits", "total_recovered", "amount_due"].includes(k)) val = v != null ? `$${Number(v).toLocaleString()}` : "-";
                                return <div key={k}><p className="text-xs text-muted-foreground font-medium">{label}</p><p className="text-sm break-all">{val}</p></div>;
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}