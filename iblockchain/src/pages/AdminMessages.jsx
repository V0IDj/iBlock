import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { useToast } from "../hooks/useToast";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { Search, User, Send, LoaderCircle, Upload, Check, X } from "lucide-react";

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
  const [uploadPerm, setUploadPerm] = useState(null);
  const [permOpen, setPermOpen] = useState(false);
  const scrollRef = useRef(null);
  const selectedUserRef = useRef(selectedUser);
  useEffect(() => { selectedUserRef.current = selectedUser; }, [selectedUser]);
  const isAr = language === "ar";

  useEffect(() => {
    loadConversations();
    const channel = supabase.channel("admin-messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        loadConversations();
        const uid = selectedUserRef.current;
        if (uid) loadMessages(uid);
      })
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") console.error("Admin messages channel error");
      });
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => { if (selectedUser) { loadMessages(selectedUser); loadUploadPerm(selectedUser); } }, [selectedUser]);
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

  const loadUploadPerm = async (userId) => {
    const { data } = await supabase.from("profiles").select("upload_permission, upload_remaining").eq("user_id", userId).single();
    if (data) setUploadPerm(data);
  };

  const setPermission = async (userId, type) => {
    const updates = type === "none"
      ? { upload_permission: "none", upload_remaining: 0 }
      : type === "single"
        ? { upload_permission: "single", upload_remaining: 1 }
        : { upload_permission: "active", upload_remaining: 0 };
    const { error } = await supabase.from("profiles").update(updates).eq("user_id", userId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isAr ? "تم التحديث" : "Updated" }); loadUploadPerm(userId); setPermOpen(false); }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedUser) return;
    const { data, error } = await supabase.from("messages").insert({ user_id: selectedUser, content: newMsg.trim(), sender_role: "admin" }).select();
    if (error) {
      toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setMessages(prev => [...prev, data[0]]);
      setNewMsg("");
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

  const permLabel = (p) => {
    if (!p || p.upload_permission === "none") return null;
    if (p.upload_permission === "active") return isAr ? "📎 نشط" : "📎 Active";
    return isAr ? `📎 رفع (${p.upload_remaining})` : `📎 Upload (${p.upload_remaining})`;
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{getProfile(selectedUser)?.full_name || getProfile(selectedUser)?.email}</p>
                      <p className="text-xs text-muted-foreground">{getProfile(selectedUser)?.email}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Button variant="outline" size="sm" onClick={() => setPermOpen(!permOpen)} className="gap-2">
                      <Upload className="h-4 w-4" />
                      {permLabel(uploadPerm) || (isAr ? "الرفع" : "Upload")}
                    </Button>
                    {permOpen && (
                      <div className="absolute top-full right-0 mt-1 z-50 bg-popover border rounded-xl shadow-lg p-2 min-w-[200px] space-y-1">
                        <p className="text-xs font-medium text-muted-foreground px-2 py-1">
                          {isAr ? "صلاحية رفع الملفات" : "File upload permission"}
                        </p>
                        <button onClick={() => setPermission(selectedUser, "none")}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/50 text-start">
                          <X className="h-4 w-4 text-destructive" /> {isAr ? "إزالة الصلاحية" : "Remove access"}
                        </button>
                        <button onClick={() => setPermission(selectedUser, "single")}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/50 text-start">
                          <Check className="h-4 w-4 text-primary" /> {isAr ? "مرة واحدة" : "One time"}
                        </button>
                        <button onClick={() => setPermission(selectedUser, "active")}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/50 text-start">
                          <Check className="h-4 w-4 text-primary" /> {isAr ? "تفعيل دائم" : "Active"}
                        </button>
                        {uploadPerm && uploadPerm.upload_permission !== "none" && (
                          <p className="text-xs text-muted-foreground px-2 pt-1 border-t">
                            {isAr ? `المتبقي: ${uploadPerm.upload_remaining}` : `Remaining: ${uploadPerm.upload_remaining}`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-auto p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender_role === "admin" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${msg.sender_role === "admin" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted rounded-bl-sm"}`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.image_url && (
                        <img src={msg.image_url} alt="Upload" className="mt-2 rounded-lg max-h-60 w-full object-cover cursor-pointer" onClick={() => window.open(msg.image_url, "_blank")} />
                      )}
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
