import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { useTracking } from "../../hooks/useTracking";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ScrollArea } from "../ui/ScrollArea";
import { Sheet, SheetTrigger, SheetContent } from "../ui/Sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/DropdownMenu";
import {
  LayoutDashboard, Wallet, Search, ChartLine, ShoppingCart, ArrowDownUp,
  Coins, ArrowDownToLine, ArrowUpFromLine, Receipt, Gift, MessageSquare,
  Bell, User, LogOut, Menu, X, Globe, Shield, Clock, CheckCheck, FileText,
  CircleAlert,
} from "lucide-react";

const navItems = [
  { key: "overview", path: "/dashboard", icon: LayoutDashboard },
  { key: "portfolio", path: "/dashboard/portfolio", icon: Wallet },
  { key: "market", path: "/dashboard/market", icon: Search },
  { key: "markets", path: "/dashboard/markets", icon: ChartLine },
  { key: "buysell", path: "/dashboard/buy-sell", icon: ShoppingCart },
  { key: "swap", path: "/dashboard/swap", icon: ArrowDownUp },
  { key: "staking", path: "/dashboard/staking", icon: Coins },
  { key: "deposit", path: "/dashboard/deposit", icon: ArrowDownToLine },
  { key: "withdrawal", path: "/dashboard/withdrawal", icon: ArrowUpFromLine },
  { key: "transactions", path: "/dashboard/transactions", icon: Receipt },
  { key: "referral", path: "/dashboard/referral", icon: Gift },
  { key: "support", path: "/dashboard/support", icon: MessageSquare },
  { key: "notifications", path: "/dashboard/notifications", icon: Bell },
  { key: "account", path: "/dashboard/account", icon: User },
];

const navLabels = {
  overview: { en: "Overview", ar: "نظرة عامة" },
  portfolio: { en: "Portfolio", ar: "المحفظة" },
  market: { en: "Market", ar: "السوق" },
  markets: { en: "Live Markets", ar: "الأسواق الحية" },
  buysell: { en: "Buy & Sell", ar: "شراء وبيع" },
  swap: { en: "Swap", ar: "تبادل" },
  staking: { en: "Staking", ar: "ستاكينغ" },
  deposit: { en: "Deposit", ar: "إيداع" },
  withdrawal: { en: "Withdraw", ar: "سحب" },
  transactions: { en: "Transactions", ar: "المعاملات" },
  referral: { en: "Referral", ar: "الإحالة" },
  support: { en: "Support", ar: "الدعم" },
  notifications: { en: "Notifications", ar: "الإشعارات" },
  account: { en: "My Account", ar: "حسابي" },
};

function NotificationsDropdown({ notifications, unreadCount, onMarkAsRead, onMarkAllAsRead }) {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();

  const cleanText = (t) => t?.replace(/admin/gi, language === "ar" ? "فريق المعالجة" : "processing team")
    .replace(/الأدمن|ادمن|للأدمن|الإدارة/g, "فريق المعالجة") || "";

  const relativeTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return language === "ar" ? "الآن" : "just now";
    if (mins < 60) return language === "ar" ? `منذ ${mins} دقيقة` : `${mins} min ago`;
    if (hours < 24) return language === "ar" ? `منذ ${hours} ساعة` : `${hours}h ago`;
    if (days < 7) return language === "ar" ? `منذ ${days} يوم` : `${days}d ago`;
    return new Date(date).toLocaleDateString(language === "ar" ? "ar" : "en", { month: "short", day: "numeric" });
  };

  const getIcon = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes("message") || t.includes("رسالة")) return MessageSquare;
    if (t.includes("alert") || t.includes("تنبيه") || t.includes("رسوم")) return CircleAlert;
    return Bell;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-80 bg-card/95 backdrop-blur-xl border-white/10">
        <div className="flex items-center justify-between p-3 border-b border-border">
          <h3 className="font-semibold text-foreground">{language === "ar" ? "الإشعارات" : "Notifications"}</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs text-primary hover:text-primary/80">
              <CheckCheck className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
              {language === "ar" ? "قراءة الكل" : "Mark all read"}
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
              <Bell className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm">{language === "ar" ? "لا توجد إشعارات" : "No notifications"}</p>
            </div>
          ) : (
            notifications.slice(0, 10).map(n => {
              const Icon = getIcon(n.title);
              return (
                <div key={n.id} className={`p-3 cursor-pointer focus:bg-accent/50 ${n.is_read ? "" : "bg-primary/5"}`}
                  onClick={() => { onMarkAsRead(n.id); navigate(`/notification/${n.id}`); }}>
                  <div className="flex items-start gap-3 w-full">
                    <div className="mt-0.5">
                      {n.title?.includes("رسالة") || n.title?.includes("message") ? <MessageSquare className="h-4 w-4 text-primary" /> :
                       n.title?.includes("تنبيه") || n.title?.includes("alert") || n.title?.includes("رسوم") ? <CircleAlert className="h-4 w-4 text-destructive" /> :
                       <Bell className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{cleanText(n.title)}</p>
                        {!n.is_read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{cleanText(n.message)}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{relativeTime(n.created_at)}</span>
                      </div>
                    </div>
                    {!n.is_read && <span className="h-4 w-4 text-muted-foreground hover:text-primary" />}
                  </div>
                </div>
              );
            })
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <div className="border-t border-border" />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/dashboard/notifications")}>
                {language === "ar" ? "عرض كل الإشعارات" : "View all notifications"}
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DashboardLayout() {
  const navigate = useNavigate();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { profile, loading, needsKyc, handleLogout, unreadCount, notifications, markAsRead, markAllAsRead, user } = useDashboard();
  const location = useLocation();

  useTracking(user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAr = language === "ar";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">{isAr ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  if (needsKyc) {
    return (
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <nav className="glass-nav sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">iBlockchain</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="glass-button">
              <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isAr ? "تسجيل الخروج" : "Logout"}
            </Button>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-12">
          <div className="glass-card max-w-2xl mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CircleAlert className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{isAr ? "التحقق من الهوية مطلوب" : "KYC Required"}</h2>
            <p className="text-muted-foreground mb-6">{isAr ? "يجب عليك إكمال عملية التحقق من الهوية" : "You must complete identity verification"}</p>
            <Button onClick={() => navigate("/kyc")} size="lg" className="glow-primary">
              <FileText className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isAr ? "بدء عملية التحقق" : "Start Verification"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentPage = navItems.find(i => i.path === location.pathname);
  const pageTitle = currentPage ? (navLabels[currentPage.key]?.[language] || navLabels[currentPage.key]?.en) : "";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">iBlockchain</span>
            <p className="text-xs text-muted-foreground -mt-0.5">Banking Platform</p>
          </div>
        </div>
        {profile && (
          <div className="mt-4 p-3 rounded-xl bg-muted/50">
            <p className="text-sm font-medium text-foreground truncate">{profile.full_name || profile.email}</p>
            <p className="text-xs text-muted-foreground truncate">{profile.email}</p>
          </div>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const label = navLabels[item.key]?.[language] || navLabels[item.key]?.en || item.key;
          return (
            <button
              key={item.key}
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span className="truncate">{label}</span>
              {item.key === "notifications" && unreadCount > 0 && (
                <span className={`ml-auto text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold ${
                  isActive ? "bg-white/25 text-white" : "bg-destructive text-destructive-foreground"
                }`}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/8 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-[18px] w-[18px]" />
          {isAr ? "تسجيل الخروج" : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex" dir={isRTL ? "rtl" : "ltr"}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute -bottom-32 right-1/3 w-[350px] h-[350px] rounded-full bg-blue-300/[0.04] blur-[100px]" />
      </div>

      <aside className="hidden md:flex w-[260px] glass-sidebar border-e border-border/40 flex-col flex-shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass-nav sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="glass-button rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="p-0 w-[260px] glass-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">iBlockchain</span>
            </div>
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-foreground">{pageTitle}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="hidden sm:inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 gap-2 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 rounded-lg px-3"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language === "en" ? "English" : "العربية"}</span>
            </button>
            <NotificationsDropdown notifications={notifications} unreadCount={unreadCount} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
            <div className="hidden md:flex items-center gap-2 ml-2 glass-button rounded-xl px-3 py-2 cursor-pointer" onClick={() => navigate("/dashboard/account")}>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground max-w-[120px] truncate">{profile?.full_name || profile?.email || ""}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
