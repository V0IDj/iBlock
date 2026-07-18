import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAdmin } from "../../contexts/AdminContext";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Sheet, SheetTrigger, SheetContent } from "../ui/Sheet";
import {
  LayoutDashboard, Users, FileText, ArrowDownToLine, ArrowUpFromLine,
  History, MessageSquare, Store, CirclePlus, Wallet, ClipboardList,
  Menu, Shield, LogOut,
} from "lucide-react";

const navItems = [
  { key: "overview", path: "/admin", icon: LayoutDashboard, badge: null },
  { key: "clients", path: "/admin/clients", icon: Users, badge: null },
  { key: "kyc", path: "/admin/kyc", icon: FileText, badgeKey: "kyc" },
  { key: "deposits", path: "/admin/deposits", icon: ArrowDownToLine, badge: null },
  { key: "withdrawals", path: "/admin/withdrawals", icon: ArrowUpFromLine, badge: null },
  { key: "history", path: "/admin/history", icon: History, badge: null },
  { key: "messages", path: "/admin/messages", icon: MessageSquare, badge: null },
  { key: "market", path: "/admin/market", icon: Store, badge: null },
];

const superAdminItems = [
  { key: "new-transaction", path: "/admin/new-transaction", icon: CirclePlus, badge: null },
  { key: "wallets", path: "/admin/wallets", icon: Wallet, badge: null },
  { key: "audit", path: "/admin/audit", icon: ClipboardList, badge: null },
];

export function AdminLayout() {
  const { language, t, isRTL } = useLanguage();
  const { isSuperAdmin, loading, kycDocs, handleLogout, refetch: refreshData } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAr = language === "ar";

  const pendingKyc = kycDocs?.filter((d) => d.status === "pending").length || 0;

  const allItems = [
    ...navItems.map((item) => ({
      ...item,
      badge: item.badgeKey === "kyc" ? pendingKyc : item.badge,
      label: adminLabels[item.key]?.[language] || adminLabels[item.key]?.en || item.key,
    })),
    ...(isSuperAdmin
      ? superAdminItems.map((item) => ({
          ...item,
          label: adminLabels[item.key]?.[language] || adminLabels[item.key]?.en || item.key,
        }))
      : []),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background mesh-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 glow-primary animate-pulse-slow">
              <Shield className="h-10 w-10 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground">{isAr ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-primary">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <span className="text-lg font-bold block leading-tight">
              {isAr ? "لوحة التحكم" : "Admin Panel"}
            </span>
            {isSuperAdmin && (
              <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                {isAr ? "مشرف أعلى" : "Super Admin"}
              </span>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          {isAr ? "القائمة الرئيسية" : "Main Menu"}
        </p>
        {allItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.key}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md glow-primary"
                  : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span
                  className={`ml-auto text-[10px] rounded-full px-2 py-0.5 min-w-[22px] text-center font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {isAr ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background mesh-bg grid-pattern flex" dir={isRTL ? "rtl" : "ltr"}>
      <aside className="hidden md:flex w-[260px] glass-sidebar border-e border-border/30 flex-col flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden glass-nav px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-[260px] glass-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold">{isAr ? "لوحة التحكم" : "Admin"}</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

const adminLabels = {
  overview: { en: "Overview", ar: "نظرة عامة" },
  clients: { en: "Clients", ar: "العملاء" },
  kyc: { en: "KYC Requests", ar: "طلبات KYC" },
  deposits: { en: "Deposits", ar: "الإيداعات" },
  withdrawals: { en: "Withdrawals", ar: "السحوبات" },
  history: { en: "Transaction History", ar: "سجل المعاملات" },
  messages: { en: "Messages", ar: "الرسائل" },
  market: { en: "Market Control", ar: "إدارة السوق" },
  "new-transaction": { en: "New Transaction", ar: "إضافة معاملة" },
  wallets: { en: "Wallet Management", ar: "إدارة المحافظ" },
  audit: { en: "Audit Log", ar: "سجل المراقبة" },
};
