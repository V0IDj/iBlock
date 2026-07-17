import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "../hooks/useToast";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { Search, User, Send, LoaderCircle } from "lucide-react";

export function AdminMessages() {
  const { language, isRTL } = useLanguage();
  const { profiles } = useAdmin();
  const { toast } = useToast();
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const isAr = language === "ar";

  useEffect(() => {
    loadConversations();
    const channel = supabase.channel("admin-messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        loadConversations();
        if (selectedUser) loadMessages(selectedUser);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => { if (selectedUser) loadMessages(selectedUser); }, [selectedUser]);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);

  const loadConversations = async () => {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    if (!data) { setLoading(false); return; }
    const map = new Map();
    data.forEach(m => {
      if (!map.has(m.user_id)) {
        map.set(m.user_id, { lastMessage: m.content, lastDate: m.created_at, unread: 0, userId: m.user_id });
      }
      if (m.sender_role === "user" && !m.is_read) map.get(m.user_id).unread++;
    });
    setConversations(Array.from(map.values()));
    setLoading(false);
  };

  const loadMessages = async (userId) => {
    const { data } = await supabase.from("messages").select("*").eq("user_id", userId).order("created_at", { ascending: true });
    if (data) setMessages(data);
    await supabase.from("messages").update({ is_read: true }).eq("user_id", userId).eq("sender_role", "user").eq("is_read", false);
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedUser) return;
    const { error } = await supabase.from("messages").insert({ user_id: selectedUser, content: newMsg.trim(), sender_role: "admin" });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewMsg("");
      loadMessages(selectedUser);
      loadConversations();
    }
  };

  const getProfile = (userId) => profiles.find(p => p.user_id === userId);
  const filteredConversations = conversations.filter(c => {
    const prof = getProfile(c.userId);
    return !searchTerm || prof?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || prof?.email?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    if (diff < 60000) return isAr ? "الآن" : "Now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}${isAr ? "د" : "m"}`;
    if (diff < 86400000) return new Date(date).toLocaleTimeString(isAr ? "ar" : "en", { hour: "2-digit", minute: "2-digit" });
    return new Date(date).toLocaleDateString(isAr ? "ar" : "en", { month: "short", day: "numeric" });
  };

  if (loading) return <div className="flex justify-center py-12"><LoaderCircle className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "الرسائل" : "Messages"}</h1>
        <p className="text-muted-foreground text-sm mt-1">{isAr ? "تواصل مع العملاء في الوقت الفعلي" : "Real-time client communication"}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          <div className="p-3 border-b flex-shrink-0">
            <div className="relative">
              <Search className={`absolute ${isRTL ? "right-3" : "left-3"} top-2.5 h-4 w-4 text-muted-foreground`} />
              <Input placeholder={isAr ? "بحث..." : "Search..."} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={isRTL ? "pr-10" : "pl-10"} />
            </div>
          </div>
          <CardContent className="flex-1 overflow-auto p-0">
            {filteredConversations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">{isAr ? "لا توجد محادثات" : "No conversations"}</p>
            ) : filteredConversations.map(c => {
              const prof = getProfile(c.userId);
              const isActive = selectedUser === c.userId;
              return (
                <button key={c.userId} onClick={() => setSelectedUser(c.userId)}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-border/30 text-start transition-colors ${isActive ? "bg-primary/5" : "hover:bg-muted/30"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold truncate">{prof?.full_name || prof?.email?.split("@")[0] || "User"}</p>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{timeAgo(c.lastDate)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 min-w-[20px] text-center">{c.unread}</Badge>}
                </button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedUser ? (
            <>
              <div className="p-3 border-b flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{getProfile(selectedUser)?.full_name || getProfile(selectedUser)?.email}</p>
                    <p className="text-xs text-muted-foreground">{getProfile(selectedUser)?.email}</p>
                  </div>
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender_role === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender_role === "admin" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                      <p>{msg.content}</p>
                      <p className={`text-[10px] mt-1 opacity-70 ${msg.sender_role === "admin" ? "text-end" : ""}`}>
                        {new Date(msg.created_at).toLocaleTimeString(isAr ? "ar" : "en", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t flex gap-2 flex-shrink-0">
                <Input value={newMsg} onChange={e => setNewMsg(e.target.value)}
                  placeholder={isAr ? "اكتب رسالة..." : "Type a message..."}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" className="rounded-xl flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Send className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>{isAr ? "اختر محادثة للبدء" : "Select a conversation to start"}</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}