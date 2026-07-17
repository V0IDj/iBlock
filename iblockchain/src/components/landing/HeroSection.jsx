import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

const coinIcons = [
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", delay: 0, x: "10%", y: "20%" },
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", delay: 0.5, x: "80%", y: "15%" },
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", delay: 1, x: "15%", y: "70%" },
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png", delay: 1.5, x: "85%", y: "65%" },
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png", delay: 2, x: "5%", y: "45%" },
  { icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png", delay: 2.5, x: "92%", y: "40%" },
];

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative pt-32 pb-8 px-4 min-h-screen flex items-center">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[180px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Floating coins with particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${10 + 12 * i}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 8 + 0.5 * i, delay: 0.7 * i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {coinIcons.map((coin, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: coin.x, top: coin.y }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 7, delay: coin.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl scale-150" />
              <img src={coin.icon} alt="" className="w-10 h-10 md:w-14 md:h-14 relative z-10 drop-shadow-lg" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t("hero.title1")}<br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link to="/auth?mode=signup">
                <button className="inline-flex items-center gap-2 text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-primary-strong transition-all">
                  {t("hero.cta")}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 80, damping: 15 }}
            className="hidden lg:flex justify-center relative"
          >
            {/* Pulsing orbs behind the shield */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[80px]"
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-blue-400/15 blur-[60px]"
            />

            <motion.div
              animate={{ y: [0, -18, 0], rotateY: [0, 5, 0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-primary/20"
                style={{ boxShadow: "inset 0 0 30px hsl(var(--primary) / 0.1)" }}
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-primary/10 rounded-full blur-xl" />
              <img
                src="/assets/hero-shield-DaZnkDUG.png"
                alt="Blockchain Security Shield"
                className="w-[380px] md:w-[440px] drop-shadow-2xl relative z-10"
                width={1024}
                height={1024}
                style={{ filter: "drop-shadow(0 20px 40px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.15))" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
