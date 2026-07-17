import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, TrendingDown, Wallet, ChartPie } from "lucide-react";

const holdings = [
  { symbol: "BTC", name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png", amount: 0.0245, price: 67500, change: 2.4 },
  { symbol: "ETH", name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png", amount: 1.35, price: 3450, change: -1.2 },
  { symbol: "USDT", name: "Tether", image: "https://assets.coingecko.com/coins/images/325/small/Tether.png", amount: 2500, price: 1, change: 0.01 },
  { symbol: "SOL", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/small/solana.png", amount: 12.5, price: 145, change: 5.7 },
  { symbol: "BNB", name: "BNB", image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png", amount: 3.2, price: 610, change: 0.8 },
];

export function DashboardPortfolio() {
  const { language, isRTL } = useLanguage();
  const { finances } = useDashboard();
  const [showBalances, setShowBalances] = useState(true);
  const totalValue = holdings.reduce((s, h) => s + h.amount * h.price, 0);
  const totalChange = holdings.reduce((s, h) => s + h.amount * h.price * h.change / 100, 0);
  const changePercent = totalChange / (totalValue - totalChange) * 100;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{language === "ar" ? "المحفظة" : "Portfolio"}</h1>
          <p className="text-muted-foreground mt-1">{language === "ar" ? "نظرة شاملة على أصولك" : "Your asset overview"}</p>
        </div>
        <button onClick={() => setShowBalances(!showBalances)} className="p-2 hover:bg-muted rounded-lg">{showBalances ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}</button>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{language === "ar" ? "إجمالي المحفظة" : "Total Portfolio"}</p>
                <p className="text-3xl font-bold mt-1">{showBalances ? `$${totalValue.toLocaleString()}` : "••••••"}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${totalChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {totalChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{totalChange >= 0 ? "+" : ""}{showBalances ? `$${totalChange.toFixed(2)}` : "••••"} ({changePercent.toFixed(2)}%)</span>
                  <span className="text-muted-foreground ms-1">24h</span>
                </div>
              </div>
              <div className="p-4 rounded-full bg-primary/10"><ChartPie className="h-8 w-8 text-primary" /></div>
            </div>
            {finances && <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
              <div><p className="text-xs text-muted-foreground">{language === "ar" ? "رأس المال" : "Capital"}</p><p className="font-semibold">{showBalances ? `$${finances.capital?.toLocaleString()}` : "••••"}</p></div>
              <div><p className="text-xs text-muted-foreground">{language === "ar" ? "الأرباح" : "Profits"}</p><p className="font-semibold text-emerald-400">{showBalances ? `$${finances.profits?.toLocaleString()}` : "••••"}</p></div>
              <div><p className="text-xs text-muted-foreground">{language === "ar" ? "المسترد" : "Recovered"}</p><p className="font-semibold">{showBalances ? `$${finances.total_recovered?.toLocaleString()}` : "••••"}</p></div>
            </div>}
          </CardContent>
        </Card>
      </motion.div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5 text-primary" />{language === "ar" ? "الأصول" : "Holdings"}</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {holdings.map((h, i) => {
              const value = h.amount * h.price;
              const alloc = value / totalValue * 100;
              return (
                <motion.div key={h.symbol} initial={{ opacity: 0, x: isRTL ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/10 hover:bg-muted/20">
                  <div className="flex items-center gap-3">
                    <img src={h.image} alt={h.name} className="w-10 h-10 rounded-full" />
                    <div><p className="font-medium">{h.name}</p><p className="text-xs text-muted-foreground">{showBalances ? `${h.amount} ${h.symbol}` : "•••• " + h.symbol}</p></div>
                  </div>
                  <div className="text-end">
                    <p className="font-medium">{showBalances ? `$${value.toLocaleString()}` : "••••"}</p>
                    <div className={`flex items-center justify-end gap-1 text-xs ${h.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {h.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{h.change >= 0 ? "+" : ""}{h.change}%
                    </div>
                  </div>
                  <div className="hidden md:block w-24 ms-4">
                    <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{alloc.toFixed(1)}%</span></div>
                    <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${alloc}%` }} /></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}