import { useState, useEffect, useRef } from "react";
import { useDashboard } from "../contexts/DashboardContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { ScrollArea } from "../components/ui/ScrollArea";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { MessageSquare, Send, LoaderCircle, Paperclip, X } from "lucide-react";

export function DashboardSupport() {
  const { language } = useLanguage();
  const { user } = useDashboard();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploadPerm, setUploadPerm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const scrollRef = useRef(null);
  const fileRef = useRef(null);
  const isAr = language === "ar";

  useEffect(() => {
    if (!user) return;
    loadMessages();
    loadUploadPerm();
    const channel = supabase.channel("support-messages")
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `user_id=eq.${user.id}` },
          (payload) => {
            if (payload.new.sender_role === "admin") {
              setMessages(prev => [...prev, payload.new]);
            }
          }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") console.error("Support messages channel error");
      });
    const permChannel = supabase.channel("support-upload-perm")
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles", filter: `user_id=eq.${user.id}` },
        () => { loadUploadPerm(); }
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") console.error("Upload perm channel error");
      });
    const pollInterval = setInterval(() => { loadUploadPerm(); }, 3000);
    return () => { supabase.removeChannel(channel); supabase.removeChannel(permChannel); clearInterval(pollInterval); };
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadUploadPerm = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("upload_permission, upload_remaining").eq("user_id", user.id).single();
    if (data) setUploadPerm(data);
  };

  const canUpload = uploadPerm && (uploadPerm.upload_permission === "active" || (uploadPerm.upload_permission === "single" && uploadPerm.upload_remaining > 0));

  const loadMessages = async () => {
    if (!user) return;
    const { data } = await supabase.from("messages").select("*").eq("user_id", user.id).order("created_at", { ascending: true });
    if (data) setMessages(data);
    setLoading(false);
  };

  const sendMessage = async () => {
    if ((!input.trim() && !selectedFile) || !user) return;
    setSending(true);
    let imageUrl = null;

    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("chat-uploads").upload(filePath, selectedFile);
      if (uploadErr) {
        toast({ title: isAr ? "خطأ في الرفع" : "Upload error", description: uploadErr.message, variant: "destructive" });
        setSending(false); return;
      }
      const { data: { publicUrl } } = supabase.storage.from("chat-uploads").getPublicUrl(filePath);
      imageUrl = publicUrl;

      if (uploadPerm.upload_permission === "single") {
        const remain = uploadPerm.upload_remaining - 1;
        const newPerm = remain <= 0 ? "none" : uploadPerm.upload_permission;
        await supabase.from("profiles").update({ upload_permission: newPerm, upload_remaining: Math.max(0, remain) }).eq("user_id", user.id);
        setUploadPerm({ upload_permission: newPerm, upload_remaining: Math.max(0, remain) });
      }
    }

    const content = input.trim() || (isAr ? "📎 صورة" : "📎 Image");
    const { data, error } = await supabase
      .from("messages")
      .insert({ user_id: user.id, sender_role: "user", content, image_url: imageUrl })
      .select();
    if (!error && data) {
      setMessages(prev => [...prev, data[0]]);
      setInput("");
      setSelectedFile(null);
    }
    setSending(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: isAr ? "حجم كبير" : "File too large", description: isAr ? "الحد الأقصى 5 ميجابايت" : "Max 5MB", variant: "destructive" });
        return;
      }
      setSelectedFile(file);
    }
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
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
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
                      {msg.image_url && (
                        <img src={msg.image_url} alt="Upload" className="mb-2 rounded-lg max-h-60 w-full object-cover cursor-pointer" onClick={() => window.open(msg.image_url, "_blank")} />
                      )}
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
          <div className="border-t p-3 flex flex-col gap-2">
            {selectedFile && (
              <div className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2 text-sm">
                <span className="truncate">{selectedFile.name}</span>
                <button onClick={() => { setSelectedFile(null); if (fileRef.current) fileRef.current.value = ""; }}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
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
              {canUpload && (
                <>
                  <input type="file" ref={fileRef} onChange={handleFileSelect} accept="image/*,.pdf,.doc,.docx" className="hidden" />
                  <Button onClick={() => fileRef.current?.click()} variant="outline" size="icon" disabled={uploading}>
                    {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
                  </Button>
                </>
              )}
              <Button onClick={sendMessage} disabled={(!input.trim() && !selectedFile) || sending} size="icon">
                {sending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
