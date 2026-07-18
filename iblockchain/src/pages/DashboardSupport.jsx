import { useState, useEffect } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { ScrollArea } from "../components/ui/ScrollArea";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { MessageSquare, Send, LoaderCircle } from "lucide-react";

export function DashboardSupport() {
  const { language } = useLanguage();
  const { user } = useDashboard();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const isAr = language === "ar";

  useEffect(() => {
    if (!user) return;
    loadMessages();
    const channel = supabase.channel("support-messages")
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `user_id=eq.${user.id}` },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const loadMessages = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert({ user_id: user.id, sender_role: "user", content: input.trim() });
    if (!error) setInput("");
    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          {isAr ? "الدعم والمراسلات" : "Support & Messages"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isAr ? "تواصل مع فريق الدعم" : "Chat with support team"}
        </p>
      </div>
      <Card className="flex flex-col" style={{ height: "calc(100vh - 250px)", minHeight: 400 }}>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {isAr ? "المحادثة" : "Conversation"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>{isAr ? "لا توجد رسائل بعد" : "No messages yet"}</p>
                <p className="text-xs mt-1">
                  {isAr ? "أرسل رسالة لبدء المحادثة" : "Send a message to start"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender_role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender_role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${
                        msg.sender_role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}>
                        {(() => {
                          const diff = Date.now() - new Date(msg.created_at).getTime();
                          const mins = Math.floor(diff / 60000);
                          const hours = Math.floor(diff / 3600000);
                          const days = Math.floor(diff / 86400000);
                          if (mins < 1) return isAr ? "الآن" : "just now";
                          if (mins < 60) return isAr ? `منذ ${mins} دقيقة` : `${mins}m ago`;
                          if (hours < 24) return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
                          if (days < 7) return isAr ? `منذ ${days} يوم` : `${days}d ago`;
                          return new Date(msg.created_at).toLocaleDateString(isAr ? "ar" : "en", { month: "short", day: "numeric" });
                        })()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <div className="border-t p-3 flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={isAr ? "اكتب رسالتك..." : "Type your message..."}
              disabled={sending}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              size="icon"
            >
              {sending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
