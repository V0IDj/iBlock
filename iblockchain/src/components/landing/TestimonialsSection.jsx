import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

const testimonials = [
  { initials: "AA", name: "Ahmad Al-Rashid", role: "Investor", text: "iBlockchain helped me recover my stolen crypto assets within weeks. Their team is incredibly professional and transparent throughout the entire process.", color: "bg-primary" },
  { initials: "SM", name: "Sarah Mitchell", role: "Business Owner", text: "After being scammed by a fake trading platform, I thought my money was gone forever. iBlockchain proved me wrong and recovered 95% of my funds.", color: "bg-accent" },
  { initials: "MA", name: "Mohammed Al-Fahad", role: "Crypto Trader", text: "The security features and the dedicated support team make iBlockchain stand out. I feel safe managing my portfolio through their platform.", color: "bg-emerald-500" },
  { initials: "LW", name: "Lisa Wang", role: "Financial Advisor", text: "I recommend iBlockchain to all my clients. Their recovery process is systematic, legal, and highly effective.", color: "bg-amber-500" },
  { initials: "OK", name: "Omar Khalil", role: "Entrepreneur", text: "Fast, reliable, and trustworthy. iBlockchain is the real deal when it comes to crypto recovery and asset management.", color: "bg-blue-500" },
  { initials: "FA", name: "Fatima Al-Zahra", role: "Tech Professional", text: "The platform's interface is clean and easy to use. The team responded to my queries within minutes. Exceptional service!", color: "bg-purple-500" },
];

export function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.initials}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{item.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
