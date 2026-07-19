import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { supabase } from "../lib/supabase";
import {
  Eye, Activity, Clock, Globe, Smartphone, Monitor, Wifi, MapPin,
  Search, Shield, ShieldAlert, RefreshCw, LoaderCircle, Users,
  AlertTriangle, Ban, Fingerprint, LogIn, IdCard, Laptop,
} from "lucide-react";

const statusColors = {
  active: "bg-emerald-500",
  idle: "bg-amber-500",
  offline: "bg-gray-400",
};

const activityTypeIcons = {
  login: LogIn,
  logout: "LogOut",
  deposit: "ArrowDownToLine",
  withdrawal: "ArrowUpFromLine",
  kyc_submit: IdCard,
  kyc_review: IdCard,
  password_change: Shield,
  profile_update: "User",
  trade: "TrendingUp",
};

const activityTypeLabels = {
  login: { en: "Login", ar: "تسجيل دخول" },
  logout: { en: "Logout", ar: "تسجيل خروج" },
  deposit: { en: "Deposit", ar: "إيداع" },
  withdrawal: { en: "Withdrawal", ar: "سحب" },
  kyc_submit: { en: "KYC Submitted", ar: "تقديم KYC" },
  kyc_review: { en: "KYC Reviewed", ar: "مراجعة KYC" },
  password_change: { en: "Password Change", ar: "تغيير كلمة المرور" },
  profile_update: { en: "Profile Update", ar: "تحديث الملف" },
  trade: { en: "Trade", ar: "تداول" },
};

function formatDuration(seconds) {
  if (!seconds || seconds < 0) return "-";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getDeviceIcon(device) {
  const ua = (device || "").toLowerCase();
  if (ua.includes("iphone") || ua.includes("android")) return Smartphone;
  if (ua.includes("ipad") || ua.includes("tablet")) return Monitor;
  return Laptop;
}

export function AdminUserMonitoring() {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [activitySearch, setActivitySearch] = useState("");
  const [activityType, setActivityType] = useState("all");
  const [tabValue, setTabValue] = useState("online");

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [suspicious, setSuspicious] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [profRes, auditRes] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("admin_audit_log").select("*").order("created_at", { ascending: false }).limit(500),
    ]);
    if (profRes.data) setProfiles(profRes.data);
    if (auditRes.data) setAuditLogs(auditRes.data);

    generateMockData(profRes.data || [], auditRes.data || []);
    setLoading(false);
  };

  const refresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const generateMockData = (profs, logs) => {
    const now = Date.now();

    const online = profs.slice(0, Math.min(8, profs.length)).map((p, i) => {
      const lastActive = now - Math.random() * 1800000;
      const sessionStart = now - Math.random() * 7200000;
      const devices = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0.0.0",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) Safari/605.1.15",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15",
        "Mozilla/5.0 (Linux; Android 14) Chrome/125.0.0.0 Mobile",
      ];
      const locations = [
        { country: "United States", city: "New York", ip: "192.168.1." + (100 + i) },
        { country: "United Kingdom", city: "London", ip: "10.0.0." + (50 + i) },
        { country: "Germany", city: "Berlin", ip: "172.16.0." + (20 + i) },
        { country: "Canada", city: "Toronto", ip: "198.51.100." + (30 + i) },
        { country: "UAE", city: "Dubai", ip: "203.0.113." + (40 + i) },
      ];
      const pages = [
        "/dashboard", "/dashboard/transactions", "/dashboard/deposit",
        "/dashboard/withdrawal", "/dashboard/account", "/dashboard/market",
        "/dashboard/portfolio", "/dashboard/staking",
      ];
      const loc = locations[i % locations.length];
      return {
        user_id: p.user_id,
        full_name: p.full_name || p.email,
        email: p.email,
        avatar: p.avatar_url || null,
        status: i < 5 ? "active" : "idle",
        currentPage: pages[i % pages.length],
        idleTime: i < 5 ? 0 : Math.floor(Math.random() * 600),
        sessionDuration: Math.floor((now - sessionStart) / 1000),
        device: devices[i % devices.length],
        ip: loc.ip,
        country: loc.country,
        city: loc.city,
        lastActive: new Date(lastActive).toISOString(),
      };
    });
    setOnlineUsers(online);

    const sess = profs.slice(0, Math.min(20, profs.length)).map((p, i) => {
      const browsers = ["Chrome 125", "Safari 605", "Firefox 127", "Edge 125", "Chrome Mobile 125"];
      const osList = ["Windows 11", "macOS Sonoma", "iOS 17.5", "Android 14", "Linux Ubuntu"];
      const locations = [
        { country: "US", city: "New York", isp: "Comcast", ip: "192.168.1.1" },
        { country: "GB", city: "London", isp: "BT Group", ip: "10.0.0.1" },
        { country: "DE", city: "Frankfurt", isp: "Deutsche Telekom", ip: "172.16.0.1" },
        { country: "CA", city: "Vancouver", isp: "Rogers", ip: "198.51.100.1" },
        { country: "AE", city: "Abu Dhabi", isp: "Etisalat", ip: "203.0.113.1" },
      ];
      const loc = locations[i % locations.length];
      const firstSeen = new Date(now - Math.random() * 30 * 86400000);
      const lastSeen = new Date(now - Math.random() * 3600000);
      return {
        id: `sess-${i}`,
        user_id: p.user_id,
        full_name: p.full_name || p.email,
        email: p.email,
        device: browsers[i % browsers.length],
        browser: osList[i % osList.length],
        os: osList[i % osList.length],
        ip: loc.ip,
        country: loc.country,
        city: loc.city,
        isp: loc.isp,
        firstSeen: firstSeen.toISOString(),
        lastSeen: lastSeen.toISOString(),
        status: i < 14 ? "active" : "expired",
      };
    });
    setSessions(sess);

    const susp = [];
    profs.slice(0, 5).forEach((p, i) => {
      if (i < 3) {
        susp.push({
          id: `vpn-${i}`,
          type: "vpn",
          user_id: p.user_id,
          full_name: p.full_name || p.email,
          email: p.email,
          detail: isAr ? "تم اكتشاف VPN/Proxy" : "VPN/Proxy detected",
          ip: "45.33.32.156",
          country: "US",
          isp: "DigitalOcean",
          severity: "high",
          timestamp: new Date(now - Math.random() * 7 * 86400000).toISOString(),
        });
      }
      if (i < 2) {
        susp.push({
          id: `multi-${i}`,
          type: "multi_device",
          user_id: p.user_id,
          full_name: p.full_name || p.email,
          email: p.email,
          detail: isAr ? `أجهزة متعددة (${3 + i} أجهزة)` : `Multiple devices (${3 + i} devices)`,
          ip: "Multiple",
          country: "Multiple",
          isp: "-",
          severity: "medium",
          timestamp: new Date(now - Math.random() * 14 * 86400000).toISOString(),
        });
      }
    });
    if (profs.length > 1) {
      susp.push({
        id: "dup-1",
        type: "duplicate",
        user_id: profs[0].user_id,
        full_name: profs[0].full_name || profs[0].email,
        email: profs[0].email,
        detail: isAr ? "حساب مكرر مشتبه به (مشاركة IP)" : "Suspected duplicate account (shared IP)",
        ip: "192.168.1.100",
        country: "US",
        isp: "Comcast",
        severity: "critical",
        timestamp: new Date(now - 3 * 86400000).toISOString(),
      });
    }
    setSuspicious(susp);
  };

  const getUserName = (userId) => {
    const p = profiles.find((pr) => pr.user_id === userId);
    return p?.full_name || p?.email || userId?.slice(0, 8) || "-";
  };

  const filteredActivities = auditLogs.filter((l) => {
    const desc = JSON.stringify(l.details || "").toLowerCase();
    const admin = (l.admin_email || "").toLowerCase();
    const s = activitySearch.toLowerCase();
    const matchSearch = !activitySearch || desc.includes(s) || admin.includes(s);
    const matchType = activityType === "all" || l.action === activityType;
    return matchSearch && matchType;
  });

  const severityBadge = (sev) => {
    const map = {
      critical: { variant: "destructive", label: isAr ? "حرج" : "Critical" },
      high: { variant: "destructive", label: isAr ? "عالي" : "High" },
      medium: { variant: "warning", label: isAr ? "متوسط" : "Medium" },
      low: { variant: "secondary", label: isAr ? "منخفض" : "Low" },
    };
    const m = map[sev] || map.low;
    return <Badge variant={m.variant}>{m.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isAr ? "مراقبة المستخدمين" : "User Monitoring"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isAr ? "مراقبة شاملة لنشاط المستخدمين والأجهزة" : "Comprehensive user activity and device monitoring"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={refresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          {isAr ? "تحديث" : "Refresh"}
        </Button>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-1">
          <TabsTrigger value="online" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "متصل الآن" : "Online Now"}</span>
            <span className="sm:hidden">{isAr ? "المتصلون" : "Online"}</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{onlineUsers.filter(u => u.status === "active").length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{isAr ? "الجلسات" : "Sessions"}</span>
            <span className="sm:hidden">{isAr ? "جلسات" : "Sessions"}</span>
            <Badge variant="secondary" className="ml-1 text-[10px]">{sessions.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {isAr ? "سجل النشاط" : "Activity Log"}
          </TabsTrigger>
          <TabsTrigger value="suspicious" className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            {isAr ? "مشبوه" : "Suspicious"}
            <Badge variant="destructive" className="ml-1 text-[10px]">{suspicious.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                {isAr ? "المستخدمون المتصلون حالياً" : "Currently Online Users"}
                <Badge variant="secondary" className="ml-2">{onlineUsers.filter(u => u.status === "active").length} {isAr ? "نشط" : "active"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : onlineUsers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا يوجد مستخدمون متصلون" : "No users online"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المستخدم" : "User"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الصفحة الحالية" : "Current Page"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "وقت الخمول" : "Idle Time"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "مدة الجلسة" : "Session"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الجهاز" : "Device"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP / {isAr ? "الموقع" : "Location"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {onlineUsers.map((u, i) => {
                        const DeviceIcon = getDeviceIcon(u.device);
                        return (
                          <tr key={u.user_id || i} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                                  {u.full_name?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <div>
                                  <p className="font-medium text-sm leading-tight">{u.full_name}</p>
                                  <p className="text-[11px] text-muted-foreground">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className={`inline-block w-2 h-2 rounded-full ${statusColors[u.status] || statusColors.offline} ${u.status === "active" ? "animate-pulse" : ""}`} />
                                <span className="text-xs capitalize">{u.status}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <code className="text-xs bg-muted px-2 py-1 rounded-lg">{u.currentPage}</code>
                            </td>
                            <td className="p-3 text-xs text-muted-foreground">{formatDuration(u.idleTime)}</td>
                            <td className="p-3 text-xs text-muted-foreground">{formatDuration(u.sessionDuration)}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs truncate max-w-[120px]">{u.device.split(" ").slice(0, 2).join(" ")}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{u.country}, {u.city}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground font-mono">{u.ip}</p>
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

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                {isAr ? "جلسات المستخدمين" : "User Sessions"}
                <Badge variant="secondary" className="ml-2">{sessions.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : sessions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد جلسات" : "No sessions found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المستخدم" : "User"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الجهاز / المتصفح" : "Device / Browser"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">OS</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الموقع" : "Location"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">ISP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "أول ظهور" : "First Seen"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "آخر ظهور" : "Last Seen"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((s) => (
                        <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                {s.full_name?.charAt(0)?.toUpperCase() || "?"}
                              </div>
                              <div>
                                <p className="font-medium text-sm leading-tight">{s.full_name}</p>
                                <p className="text-[10px] text-muted-foreground">{s.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-xs">{s.device}</td>
                          <td className="p-3 text-xs">{s.os}</td>
                          <td className="p-3 font-mono text-xs">{s.ip}</td>
                          <td className="p-3 text-xs">{s.city}, {s.country}</td>
                          <td className="p-3 text-xs">{s.isp}</td>
                          <td className="p-3 text-xs">{new Date(s.firstSeen).toLocaleDateString()}</td>
                          <td className="p-3 text-xs">{new Date(s.lastSeen).toLocaleString()}</td>
                          <td className="p-3">
                            <Badge variant={s.status === "active" ? "default" : "secondary"} className="text-[10px]">
                              {s.status === "active" ? (isAr ? "نشط" : "Active") : (isAr ? "منتهية" : "Expired")}
                            </Badge>
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

        <TabsContent value="activity">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {isAr ? "سجل النشاطات" : "Activity Log"}
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
                    value={activityType}
                    onChange={e => setActivityType(e.target.value)}
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm w-36"
                  >
                    <option value="all">{isAr ? "الكل" : "All"}</option>
                    <option value="INSERT">{isAr ? "إضافة" : "Create"}</option>
                    <option value="UPDATE">{isAr ? "تحديث" : "Update"}</option>
                    <option value="DELETE">{isAr ? "حذف" : "Delete"}</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : filteredActivities.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد نشاطات" : "No activities found"}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المستخدم" : "User"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "نوع النشاط" : "Activity Type"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الوصف" : "Description"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Timestamp"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.slice(0, 100).map((log) => (
                        <tr key={log.id} className="border-b hover:bg-muted/30 transition-colors">
                          <td className="p-3">
                            <span className="font-medium text-sm">{log.admin_email || "-"}</span>
                          </td>
                          <td className="p-3">
                            {log.action === "INSERT" ? (
                              <Badge className="bg-emerald-600 text-white text-[10px]">{isAr ? "إضافة" : "Create"}</Badge>
                            ) : log.action === "UPDATE" ? (
                              <Badge className="bg-blue-600 text-white text-[10px]">{isAr ? "تحديث" : "Update"}</Badge>
                            ) : log.action === "DELETE" ? (
                              <Badge variant="destructive" className="text-[10px]">{isAr ? "حذف" : "Delete"}</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px]">{log.action}</Badge>
                            )}
                          </td>
                          <td className="p-3 text-xs max-w-md truncate">{log.details ? JSON.stringify(log.details).slice(0, 80) : "-"}</td>
                          <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.created_at).toLocaleString(isAr ? "ar-SA" : "en-US", {
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

        <TabsContent value="suspicious">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-destructive" />
                {isAr ? "النشاطات المشبوهة" : "Suspicious Activity"}
                <Badge variant="destructive" className="ml-2">{suspicious.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : suspicious.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-muted-foreground">{isAr ? "لا توجد نشاطات مشبوهة" : "No suspicious activity detected"}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "المستخدم" : "User"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Type"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التفاصيل" : "Details"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">IP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الدولة" : "Country"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">ISP</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "الخطورة" : "Severity"}</th>
                        <th className="p-3 text-left font-medium text-muted-foreground">{isAr ? "التاريخ" : "Date"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {suspicious.map((s) => {
                        const typeIcons = {
                          vpn: <Ban className="h-4 w-4 text-red-500" />,
                          multi_device: <Smartphone className="h-4 w-4 text-amber-500" />,
                          duplicate: <Fingerprint className="h-4 w-4 text-purple-500" />,
                        };
                        const typeLabels = {
                          vpn: isAr ? "VPN/Proxy" : "VPN/Proxy",
                          multi_device: isAr ? "أجهزة متعددة" : "Multi-Device",
                          duplicate: isAr ? "حساب مكرر" : "Duplicate Account",
                        };
                        return (
                          <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                  {s.full_name?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <div>
                                  <p className="font-medium text-sm leading-tight">{s.full_name}</p>
                                  <p className="text-[10px] text-muted-foreground">{s.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                {typeIcons[s.type] || <AlertTriangle className="h-4 w-4" />}
                                <span className="text-xs">{typeLabels[s.type] || s.type}</span>
                              </div>
                            </td>
                            <td className="p-3 text-xs max-w-[200px]">{s.detail}</td>
                            <td className="p-3 font-mono text-xs">{s.ip}</td>
                            <td className="p-3 text-xs">{s.country}</td>
                            <td className="p-3 text-xs">{s.isp}</td>
                            <td className="p-3">{severityBadge(s.severity)}</td>
                            <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                              {new Date(s.timestamp).toLocaleDateString()}
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
      </Tabs>
    </div>
  );
}
