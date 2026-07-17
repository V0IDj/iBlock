import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { Label } from "../ui/Label";
import { useToast } from "../../hooks/useToast";
import { Send } from "lucide-react";

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
  const [form, setForm] = useState({ country: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "We will get back to you soon." });
    setForm({ country: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              Contact Us
            </span>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              {t("contact.title")}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 space-y-6"
          >
            <div>
              <Label htmlFor="country">{t("contact.country")}</Label>
              <Select
                id="country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="mt-1.5"
                required
              >
                <option value="">{t("contact.country")}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="subject">{t("contact.subject")}</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1.5"
                rows={5}
                required
              />
            </div>
            <Button type="submit" variant="premium" className="w-full">
              <Send className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t("contact.send")}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
