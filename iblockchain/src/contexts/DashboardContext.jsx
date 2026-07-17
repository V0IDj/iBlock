import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [finances, setFinances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchNotifications = useCallback(async (userId) => {
    if (!userId) return { notifications: [], unreadCount: 0, messages: [] };
    const { data: notifData } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);
    const { data: msgData } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .eq("sender_role", "admin")
      .order("created_at", { ascending: false })
      .limit(20);
    const notifications = notifData || [];
    const messages = msgData || [];
    const unreadCount = notifications.filter((n) => !n.is_read).length;
    return { notifications, messages, unreadCount };
  }, []);

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) navigate("/auth");
      }
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) navigate("/auth");
    });
    return () => authListener?.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .in("role", ["admin", "super_admin"]);
        const isAdminUser = !!(roleData && roleData.length > 0);
        setIsAdmin(isAdminUser);
        if (isAdminUser) {
          navigate("/admin");
          return;
        }
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, email, wallet_id, country")
          .eq("user_id", user.id)
          .single();
        if (profileData) setProfile(profileData);
        const { data: kycData } = await supabase
          .from("kyc_documents")
          .select("status")
          .eq("user_id", user.id)
          .single();
        setKyc(kycData);
        const { data: financeData } = await supabase
          .from("client_finances")
          .select("*")
          .eq("user_id", user.id)
          .single();
        if (financeData) setFinances(financeData);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    fetchNotifications(user.id).then((data) => {
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
      setMessages(data.messages);
    });
    const notifChannel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const n = payload.new;
          setNotifications((prev) => [n, ...prev]);
          setUnreadCount((prev) => prev + 1);
          toast({ title: n.title, description: n.message });
        }
      )
      .subscribe();
    const msgChannel = supabase
      .channel("messages-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const m = payload.new;
          if (m.sender_role === "admin") {
            setMessages((prev) => [m, ...prev]);
            toast({
              title: "رسالة جديدة من الإدارة",
              description: m.content.substring(0, 100),
            });
          }
        }
      )
      .subscribe();
    const financeChannel = supabase
      .channel("finance-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "client_finances",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const f = payload.new;
          if (f.amount_due > 0 && f.payment_status !== "paid") {
            toast({
              title: "تنبيه: رسوم مستحقة",
              description: f.payment_due_message || `مبلغ مستحق: $${f.amount_due}`,
              variant: "destructive",
            });
          }
          if (f.admin_message) {
            toast({ title: "رسالة من الإدارة", description: f.admin_message });
          }
          setFinances(f);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(notifChannel);
      supabase.removeChannel(msgChannel);
      supabase.removeChannel(financeChannel);
    };
  }, [user, fetchNotifications, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const markAsRead = async (id) => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    if (!user) return;
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnreadCount(0);
  };

  const needsKyc = !kyc;

  return (
    <DashboardContext.Provider
      value={{
        user,
        session,
        profile,
        kyc,
        finances,
        loading,
        isAdmin,
        notifications,
        messages,
        unreadCount,
        markAsRead,
        markAllAsRead,
        handleLogout,
        needsKyc,
        fetchNotifications,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};
