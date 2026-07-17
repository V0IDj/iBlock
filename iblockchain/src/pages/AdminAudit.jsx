import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { ClipboardList, RefreshCw, Search, LoaderCircle, ChevronDown, ChevronRight } from "lucide-react";

export function AdminAudit() {
  const { language } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const isAr = language === "ar";

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    const { data } = await supabase.from("transaction_log").select("*").order("created_at", { ascending: false }).limit(100);
    if (data) setLogs(data);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" />{isAr ? "سجل المراقبة" : "Audit Log"}</CardTitle>
          <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : logs.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد سجلات" : "No audit entries"}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="w-8"></th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "المبلغ" : "Amount"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
              </tr></thead>
              <tbody>
                {logs.filter(l => !search || l.description?.toLowerCase().includes(search.toLowerCase())).map(log => (
                  <>
                    <tr key={log.id} className="border-b hover:bg-muted/30 cursor-pointer" onClick={() => setExpanded(expanded === log.id ? null : log.id)}>
                      <td className="p-2">{expanded === log.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}</td>
                      <td className="p-4 text-xs whitespace-nowrap">{new Date(log.created_at).toLocaleString(isAr ? "ar" : "en")}</td>
                      <td className="p-4"><Badge variant="outline">{log.type}</Badge></td>
                      <td className="p-4">${Number(log.amount).toLocaleString()}</td>
                      <td className="p-4"><Badge variant={log.status === "completed" ? "default" : log.status === "rejected" ? "destructive" : "secondary"}>{log.status}</Badge></td>
                      <td className="p-4 max-w-md text-sm">{log.description || "-"}</td>
                    </tr>
                    {expanded === log.id && log.metadata && (
                      <tr key={`${log.id}-details`}><td colSpan={6} className="bg-muted/30 p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(typeof log.metadata === "string" ? JSON.parse(log.metadata) : log.metadata).map(([k, v]) => (
                            <div key={k}><p className="text-xs text-muted-foreground font-medium">{k}</p><p className="text-sm break-all">{String(v)}</p></div>
                          ))}
                        </div>
                      </td></tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}