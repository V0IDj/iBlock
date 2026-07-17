import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../hooks/useToast";
import { Send, LoaderCircle } from "lucide-react";

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Italy", "Spain", "Netherlands", "Switzerland", "Sweden", "Saudi Arabia",
  "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Egypt", "Jordan",
  "Lebanon", "Iraq", "Morocco", "Tunisia", "Algeria", "Turkey", "India",
  "Pakistan", "Bangladesh", "Indonesia", "Malaysia", "Singapore", "Japan",
  "South Korea", "China", "Brazil", "Mexico", "Argentina", "South Africa",
  "Nigeria", "Kenya", "Israel", "Other",
];

export function ContactSection() {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", country: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: form.name,
        email: form.email,
        country: form.country,
        phone: form.phone,
        message: form.message,
      });
      if (error) throw error;
      toast({ title: t("contact.success") || "Message sent", description: t("contact.successDesc") || "We will get back to you soon." });
      setForm({ name: "", email: "", country: "", phone: "", message: "" });
    } catch (err) {
      toast({ title: t("contact.error") || "Error", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full h-14 text-lg bg-background/50 border border-border/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full h-14 text-lg bg-background/50 border border-border/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full h-14 text-lg bg-background/50 border border-border/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">{language === "ar" ? "اختر الدولة" : "Select Country"}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="tel"
                placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-14 text-lg bg-background/50 border border-border/50 rounded-xl px-4 outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder={language === "ar" ? "رسالتك" : "Your Message"}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full text-lg bg-background/50 border border-border/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg rounded-xl glow-primary transition-all disabled:opacity-50"
              >
                {sending ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
                )}
                {sending
                  ? (language === "ar" ? "جاري الإرسال..." : "Sending...")
                  : (language === "ar" ? "إرسال الرسالة" : "Send Message")}
              </button>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-semibold tracking-widest mb-4">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-foreground">
                {language === "ar" ? "لأي استفسارات،" : "For any inquiries,"}
              </span>{" "}
              <span className="text-primary">
                {language === "ar" ? "لا تتردد في التواصل معنا." : "feel free to reach out."}
              </span>{" "}
              <span className="text-primary">
                {language === "ar" ? "فريقنا متاح وجاهز لمساعدتك." : "Our team is available and ready to assist you."}
              </span>{" "}
              <span className="text-foreground">
                {language === "ar" ? "سنرد على رسالتك في أقرب وقت ممكن." : "We will respond to your message as soon as possible."}
              </span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
