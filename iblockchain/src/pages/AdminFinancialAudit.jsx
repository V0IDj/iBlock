import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import {
  Receipt, Search, RefreshCw, LoaderCircle, ChevronDown, ChevronRight,
  DollarSign, ArrowDownToLine, ArrowUpFromLine, Ban, CheckCircle, Wallet, Edit3,
} from "lucide-react";

const actionTypeMeta = {
  deposit: { icon: ArrowDownToLine, color: "text-emerald-600", bg: "bg-emerald-500/10", label: { en: "Deposit", ar: "إيداع" } },
  withdrawal: { icon: ArrowUpFromLine, color: "text-red-600", bg: "bg-red-500/10", label: { en: "Withdrawal", ar: "سحب" } },
  approval: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-500/10", label: { en: "Approval", ar: "موافقة" } },
  rejection: { icon: Ban, color: "text-destructive", bg: "bg-destructive/10", label: { en: "Rejection", ar: "رفض" } },
  wallet_edit: { icon: Wallet, color: "text-blue-600", bg: "bg-blue-500/10", label: { en: "Wallet Edit", ar: "تعديل المحفظة" } },
  balance_edit: { icon: Edit3, color: "text-amber-600", bg: "bg-amber-500/10", label: { en: "Balance Edit", ar: "تعديل الرصيد" } },
  capital_update: { icon: DollarSign, color: "text-primary", bg: "bg-primary/10", label: { en: "Capital Update", ar: "تحديث رأس المال" } },
  profit_update: { icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-500/10", label: { en: "Profit Update", ar: "تحديث الأرباح" } },
  recovery_update: { icon: DollarSign, color: "text-blue-600", bg: "bg-blue-500/10", label: { en: "Recovery Update", ar: "تحديث الاسترداد" } },
};

const actionTypes = Object.keys(actionTypeMeta);

export function AdminFinancialAudit() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const [transRes, auditRes, profRes] = await Promise.all([
      supabase.from("transaction_log").select("*").order("created_at", { ascending: false }).limit(500),
      supabase.from("admin_audit_log").select("*").eq("section", "client_finances").order("created_at", { ascending: false }).limit(500),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);

    if (profRes.data) {
      const map = {};
      profRes.data.forEach((p) => { map[p.user_id] = p; });
      setProfiles(map);
    }

    const combined = [];
    if (transRes.data) {
      transRes.data.forEach((t) => {
        combined.push({
          id: `trans-${t.id}`,
          type: t.type || "unknown",
          user_id: t.user_id,
          amount: t.amount,
          currency: t.currency || "USD",
          status: t.status,
          description: t.description,
          metadata: t.metadata,
          source: "transaction_log",
          created_at: t.created_at,
        });
      });
    }
    if (auditRes.data) {
      auditRes.data.forEach((a) => {
        const d = a.details || {};
        combined.push({
          id: `audit-${a.id}`,
          type: d.type || a.action,
          user_id: d.user_id || a.admin_email,
          amount: d.amount || d.capital || d.profits || d.total_recovered || 0,
          currency: "USD",
          status: d.status || a.action,
          description: a.description || JSON.stringify(d).slice(0, 100),
          metadata: { old_values: d.old_values, new_values: d.new_values },
          source: "admin_audit_log",
          admin_email: a.admin_email,
          created_at: a.created_at,
        });
      });
    }

    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setLogs(combined);
    setLoading(false);
  };

  const getUserName = (userId) => {
    if (!userId || typeof userId !== "string") return "-";
    if (userId.includes("@")) return userId;
    const p = profiles[userId];
    return p ? p.full_name || p.email : userId.slice(0, 8) + "...";
  };

  const filtered = logs.filter((l) => {
    const userName = getUserName(l.user_id).toLowerCase();
    const desc = (l.description || "").toLowerCase();
    const s = search.toLowerCase();
    const matchSearch = !search || userName.includes(s) || desc.includes(s);
    const matchType = typeFilter === "all" || l.type === typeFilter;
    let matchDate = true;
    if (dateFrom) matchDate = matchDate && new Date(l.created_at) >= new Date(dateFrom);
    if (dateTo) {
      const end = new Date(dateTo);
      end.setHours(23, 59, 59, 999);
      matchDate = matchDate && new Date(l.created_at) <= end;
    }
    return matchSearch && matchType && matchDate;
  });

  const summaries = filtered.reduce(
    (acc, l) => {
      const amt = Number(l.amount) || 0;
      if (l.type === "deposit" || l.type === "capital_update") acc.totalDeposits += amt;
      if (l.type === "withdrawal" || l.type === "profit_update") acc.totalWithdrawals += amt;
      if (l.status === "pending" || l.status === "INSERT") acc.pending += amt;
      if (l.status === "completed" || l.status === "approved" || l.status === "UPDATE") acc.approved += amt;
      if (l.status === "rejected" || l.status === "DELETE") acc.rejected += amt;
      return acc;
    },
    { totalDeposits: 0, totalWithdrawals: 0, pending: 0, approved: 0, rejected: 0 }
  );

  const meta = (type) => actionTypeMeta[type] || { icon: DollarSign, color: "text-muted-foreground", bg: "bg-muted/30", label: { en: type, ar: type } };

  const formatAmount = (val) => {
    const n = Number(val);
    return isNaN(n) ? "-" : `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isAr ? "التدقيق المالي" : "Financial Audit"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isAr ? "سجل كامل لجميع المعاملات المالية والتعديلات" : "Complete record of all financial transactions and adjustments"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          {isAr ? "تحديث" : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: isAr ? "إجمالي الإيداعات" : "Total Deposits", value: formatAmount(summaries.totalDeposits), color: "text-emerald-600" },
          { label: isAr ? "إجمالي السحوبات" : "Total Withdrawals", value: formatAmount(summaries.totalWithdrawals), color: "text-red-600" },
          { label: isAr ? "قيد الانتظار" : "Pending", value: formatAmount(summaries.pending), color: "text-amber-600" },
          { label: isAr ? "مكتمل" : "Approved", value: formatAmount(summaries.approved), color: "text-green-600" },
          { label: isAr ? "مرفوض" : "Rejected", value: formatAmount(summaries.rejected), color: "text-destructive" },
        ].map((s, i) => (
          <Card key={i} className="premium-card">
            <CardContent className="p-4">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className={`text-lg font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              {isAr ? "سجل المعاملات" : "Transaction Records"}
              <Badge variant="secondary" className="ml-2">{filtered.length}</Badge>
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isAr ? "بحث بالبريد أو الاسم..." : "Search by email or name..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-9 rounded-lg border border-input bg-background px-3 text-sm w-40"
              >
                <option value="all">{isAr ? "جميع الأنواع" : "All Types"}</option>
                {actionTypes.map((t) => (
                  <option key={t} value={t}>{actionTypeMeta[t]?.label[isAr ? "ar" : "en"] || t}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="h-9 w-36"
                  placeholder={isAr ? "من" : "From"}
                />
                <span className="text-muted-foreground text-xs">-</span>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="h-9 w-36"
                  placeholder={isAr ? "إلى" : "To"}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {isAr ? "لا توجد معاملات مالية" : "No financial records found"}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="w-8 p-2"></th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المستخدم" : "User"}</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
                    <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => {
                    const isExpanded = expanded === l.id;
                    const m = meta(l.type);
                    const Icon = m.icon;
                    const oldVals = l.metadata?.old_values;
                    const newVals = l.metadata?.new_values;
                    const hasDetails = oldVals || newVals || l.description;
                    return (
                      <>
                        <tr
                          key={l.id}
                          className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                          onClick={() => setExpanded(isExpanded ? null : l.id)}
                        >
                          <td className="p-2">
                            {hasDetails ? (
                              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            ) : null}
                          </td>
                          <td className="p-3">
                            <span className="font-medium text-sm">{getUserName(l.user_id)}</span>
                            {l.admin_email && <p className="text-[10px] text-muted-foreground">{l.admin_email}</p>}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-7 h-7 rounded-lg ${m.bg} flex items-center justify-center`}>
                                <Icon className={`h-4 w-4 ${m.color}`} />
                              </div>
                              <span className="text-xs">{m.label[isAr ? "ar" : "en"]}</span>
                            </div>
                          </td>
                          <td className="p-3 font-semibold">{formatAmount(l.amount)}</td>
                          <td className="p-3">
                            <Badge
                              variant={
                                ["completed", "approved", "UPDATE"].includes(l.status)
                                  ? "default"
                                  : ["rejected", "DELETE"].includes(l.status)
                                  ? "destructive"
                                  : "secondary"
                              }
                              className="text-[10px]"
                            >
                              {l.status === "completed" || l.status === "approved"
                                ? isAr ? "مكتمل" : "Completed"
                                : l.status === "rejected"
                                ? isAr ? "مرفوض" : "Rejected"
                                : l.status === "pending"
                                ? isAr ? "معلق" : "Pending"
                                : l.status === "UPDATE"
                                ? isAr ? "تم التحديث" : "Updated"
                                : l.status === "INSERT"
                                ? isAr ? "تم الإضافة" : "Created"
                                : l.status === "DELETE"
                                ? isAr ? "تم الحذف" : "Deleted"
                                : l.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-xs text-muted-foreground max-w-[200px] truncate">
                            {l.description || "-"}
                          </td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(l.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
                              year: "numeric", month: "short", day: "numeric",
                              hour: "2-digit", minute: "2-digit",
                            })}
                          </td>
                        </tr>
                        {isExpanded && hasDetails && (
                          <tr key={`${l.id}-details`}>
                            <td colSpan={7} className="bg-muted/20 p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {oldVals && (
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                      {isAr ? "القيم القديمة" : "Old Values"}
                                    </h4>
                                    <div className="space-y-1.5">
                                      {Object.entries(oldVals).filter(([_, v]) => v != null).map(([k, v]) => (
                                        <div key={k} className="flex justify-between text-sm">
                                          <span className="text-muted-foreground text-xs">{k.replace(/_/g, " ")}</span>
                                          <span className="font-medium">{typeof v === "number" ? formatAmount(v) : String(v)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {newVals && (
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                      {isAr ? "القيم الجديدة" : "New Values"}
                                    </h4>
                                    <div className="space-y-1.5">
                                      {Object.entries(newVals).filter(([_, v]) => v != null).map(([k, v]) => (
                                        <div key={k} className="flex justify-between text-sm">
                                          <span className="text-muted-foreground text-xs">{k.replace(/_/g, " ")}</span>
                                          <span className="font-medium">{typeof v === "number" ? formatAmount(v) : String(v)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {l.description && (
                                  <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                      {isAr ? "الوصف" : "Description"}
                                    </h4>
                                    <p className="text-sm">{l.description}</p>
                                    {l.metadata?.admin_comment && (
                                      <>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mt-3 mb-1">
                                          {isAr ? "تعليق الإدارة" : "Admin Comment"}
                                        </h4>
                                        <p className="text-sm">{l.metadata.admin_comment}</p>
                                      </>
                                    )}
                                  </div>
                                )}
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
    </div>
  );
}
