import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Bell, Clock, CheckCheck } from "lucide-react";

export function DashboardNotifications() {
  const { language } = useLanguage();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useDashboard();
  const navigate = useNavigate();
  const isAr = language === "ar";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isAr ? "الإشعارات" : "Notifications"}</h1>
          <p className="text-muted-foreground mt-1">
            {unreadCount > 0
              ? (isAr ? `${unreadCount} إشعار غير مقروء` : `${unreadCount} unread`)
              : (isAr ? "لا توجد إشعارات جديدة" : "No new notifications")}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4 mr-1" />{isAr ? "قراءة الكل" : "Mark all read"}
          </Button>
        )}
      </div>
      {notifications.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-muted-foreground">
            <Bell className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">{isAr ? "لا توجد إشعارات" : "No notifications yet"}</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map(n => (
            <Card key={n.id} onClick={() => { markAsRead(n.id); navigate(`/notification/${n.id}`); }}
              className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${n.is_read ? "" : "border-primary/30 bg-primary/5"}`}>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {n.is_read ? <span className="h-2.5 w-2.5 rounded-full bg-muted block" /> : <span className="h-2.5 w-2.5 rounded-full bg-primary block" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{n.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(n.created_at).toLocaleDateString(isAr ? "ar" : "en", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}