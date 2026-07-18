import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ScrollArea } from "../ui/ScrollArea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/DropdownMenu";
import {
  LayoutDashboard, Wallet, Search, ChartLine, ShoppingCart, ArrowDownUp,
  Coins, ArrowDownToLine, ArrowUpFromLine, Receipt, Gift, MessageSquare,
  Bell, User, LogOut, Menu, X, Globe, Shield, Clock, CheckCheck
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

export function DashboardLayout() {
  const navigate = useNavigate();
  const { language, t, isRTL, toggleLanguage } = useLanguage();
  const { profile, loading, needsKyc, handleLogout, unreadCount, notifications, markAsRead, markAllAsRead } = useDashboard();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  if (needsKyc) {
    return (
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <nav className="glass-nav sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">iBlockchain</span>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="glass-button">
              <LogOut className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("dashboard.logout")}
            </Button>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-12">
          <div className="glass-card max-w-2xl mx-auto p-8 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">{t("dashboard.kycRequired")}</h2>
            <p className="text-muted-foreground mb-6">{t("dashboard.kycDesc")}</p>
            <Button asChild size="lg" className="glow-primary">
              <Link to="/kyc">{t("dashboard.startVerification")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold">iBlockchain</span>
            <p className="text-xs text-muted-foreground">{profile?.wallet_id || ""}</p>
          </div>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.key}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{t(`dashboard.${item.key}`)}</span>
              {item.key === "notifications" && unreadCount > 0 && (
                <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-xs">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </ScrollArea>
      <div className="p-4 border-t border-border/50 space-y-2">
        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="w-full justify-start">
          <Globe className="h-4 w-4 mr-2" />
          {language === "en" ? "Arabic" : "English"}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          {t("dashboard.logout")}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="glass-sidebar flex flex-col h-full">
          <NavContent />
        </div>
      </div>

      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex items-center gap-x-4 glass-nav px-4 py-3 shadow-sm lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="hidden sm:flex">
            <Globe className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center animate-pulse"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-xl border-white/10">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <h3 className="font-semibold">{language === "ar" ? "الإشعارات" : "Notifications"}</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-primary hover:text-primary/80">
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
                  notifications.slice(0, 10).map(n => (
                    <div key={n.id} onClick={() => { markAsRead(n.id); navigate(`/notification/${n.id}`); }}
                      className={`p-3 cursor-pointer hover:bg-accent/50 transition-colors ${n.is_read ? "" : "bg-primary/5"}`}>
                      <div className="flex items-start gap-3 w-full">
                        <div className="mt-0.5"><Bell className="h-4 w-4 text-muted-foreground" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{n.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(n.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {!n.is_read && <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
              {notifications.length > 0 && (
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                    <Link to="/dashboard/notifications">{language === "ar" ? "عرض كل الإشعارات" : "View all notifications"}</Link>
                  </Button>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              className="fixed inset-y-0 left-0 z-50 w-72 glass-sidebar"
            >
              <div className="absolute right-4 top-4">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <NavContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
