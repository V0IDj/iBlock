import { useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useLanguage } from "../../contexts/LanguageContext";
import { Rocket } from "lucide-react";

const CDN = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color";

const coins = [
  { symbol: "BTC", icon: `${CDN}/btc.png`, color: "#F7931A", x: 18, y: 22 },
  { symbol: "ETH", icon: `${CDN}/eth.png`, color: "#627EEA", x: 45, y: 15 },
  { symbol: "BNB", icon: `${CDN}/bnb.png`, color: "#F3BA2F", x: 72, y: 25 },
  { symbol: "SOL", icon: `${CDN}/sol.png`, color: "#9945FF", x: 30, y: 50 },
  { symbol: "XRP", icon: `${CDN}/xrp.png`, color: "#00AAE4", x: 60, y: 45 },
  { symbol: "ADA", icon: `${CDN}/ada.png`, color: "#0033AD", x: 85, y: 55 },
  { symbol: "DOT", icon: `${CDN}/dot.png`, color: "#E6007A", x: 15, y: 65 },
  { symbol: "AVAX", icon: `${CDN}/avax.png`, color: "#E84142", x: 50, y: 70 },
  { symbol: "MATIC", icon: `${CDN}/matic.png`, color: "#8247E5", x: 78, y: 72 },
];

const connections = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
  [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
  [6, 7], [7, 8], [0, 4], [1, 3], [2, 4],
  [6, 4], [7, 5], [3, 7],
];

function AnimatedNumber({ target, duration = 3 }) {
  const ref = useRef(null);
  const spring = useSpring(0.85 * target);
  const animValue = useSpring(0.85 * target);

  useEffect(() => {
    const { value } = animValue;
    // Use a simple interval as fallback
    const start = 0;
    const increment = target / (duration * 60);
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      if (ref.current) ref.current.textContent = Math.floor(current).toLocaleString();
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration, animValue]);

  return <span ref={ref} className="text-[10px] font-bold text-white/90">0</span>;
}

export function CTASection() {
  const { language, isRTL } = useLanguage();

  const dots = useMemo(() => {
    const result = [];
    const clusters = [
      { cx: 20, cy: 35, rx: 12, ry: 8, count: 35 },
      { cx: 28, cy: 65, rx: 6, ry: 12, count: 20 },
      { cx: 48, cy: 30, rx: 8, ry: 6, count: 30 },
      { cx: 50, cy: 55, rx: 8, ry: 12, count: 25 },
      { cx: 70, cy: 35, rx: 15, ry: 10, count: 40 },
      { cx: 80, cy: 70, rx: 6, ry: 4, count: 12 },
    ];
    for (const cluster of clusters) {
      for (let i = 0; i < cluster.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random();
        result.push({
          x: cluster.cx + Math.cos(angle) * dist * cluster.rx,
          y: cluster.cy + Math.sin(angle) * dist * cluster.ry,
        });
      }
    }
    return result;
  }, []);

  return (
    <section className="py-20 px-4" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
          className="relative overflow-hidden rounded-[2rem] min-h-[500px] flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, hsl(158 80% 8%) 0%, hsl(158 60% 12%) 30%, hsl(158 50% 10%) 60%, hsl(158 70% 6%) 100%)" }}
        >
          {/* Background dots */}
          <div className="absolute inset-0 z-0">
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3 }}
            >
              {dots.map((dot, i) => (
                <motion.circle
                  key={i}
                  cx={dot.x}
                  cy={dot.y}
                  r={0.3}
                  fill="hsl(158 40% 50%)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.15, 0.5, 0.15] }}
                  transition={{ duration: 3 + 2 * Math.random(), repeat: Infinity, delay: 2 * Math.random() }}
                />
              ))}
            </motion.svg>
          </div>

          {/* Crypto coins with connections */}
          <div className="absolute inset-0 z-[1]">
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
            >
              {connections.map(([from, to], i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={coins[from].x} y1={coins[from].y}
                  x2={coins[to].x} y2={coins[to].y}
                  stroke="hsl(158 60% 40%)"
                  strokeWidth={0.15}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.8 + 0.05 * i }}
                />
              ))}
              {connections.map(([from, to], i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r={0.4}
                  fill="hsl(158 80% 60%)"
                  opacity={0.7}
                  initial={{ cx: coins[from].x, cy: coins[from].y }}
                  animate={{
                    cx: [coins[from].x, coins[to].x, coins[from].x],
                    cy: [coins[from].y, coins[to].y, coins[from].y],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 3 + 2 * Math.random(), repeat: Infinity, delay: 4 * Math.random(), ease: "easeInOut" }}
                />
              ))}
            </motion.svg>

            {coins.map((coin) => (
              <motion.div
                key={coin.symbol}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: `${coin.x}%`, top: `${coin.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + 0.1 * coins.indexOf(coin), type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3 + 2 * Math.random(), repeat: Infinity, ease: "easeInOut", delay: 2 * Math.random() }}
                >
                  <div className="absolute w-10 h-10 rounded-full blur-lg opacity-30" style={{ background: coin.color }} />
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white/20 shadow-lg overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${coin.color}CC, ${coin.color}88)`, boxShadow: `0 0 20px ${coin.color}40` }}
                  >
                    <img src={coin.icon} alt={coin.symbol} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </motion.div>
                <div className="bg-white/5 backdrop-blur-sm rounded px-1.5 py-0.5 border border-white/10">
                  <AnimatedNumber target={Math.floor(1e6 + 9e6 * Math.random())} duration={6 + 4 * Math.random()} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Vignette overlay */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(158 80% 4% / 0.6) 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-6 py-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight whitespace-pre-line"
            >
              {language === "ar" ? "مستعد لتجربة iBlockchain؟" : "Ready to experience iBlockchain?"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            >
              {language === "ar"
                ? "انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا لإدارة أصولهم الرقمية بأمان وسهولة."
                : "Join thousands of users who trust our platform to manage their digital assets securely and effortlessly."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              <Link to="/auth?mode=signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
                  <button className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/95 rounded-full px-12 py-6 font-bold text-lg shadow-2xl border-0 transition-all">
                    <Rocket className="w-5 h-5" />
                    {language === "ar" ? "ابدأ الآن" : "Get Started"}
                  </button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
