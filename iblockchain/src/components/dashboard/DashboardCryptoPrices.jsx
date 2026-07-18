import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const defaultCoins = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 64059, price_change_percentage_24h: -0.23, image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 1841.13, price_change_percentage_24h: -1.71, image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 0.9993, price_change_percentage_24h: 0.01, image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 566.17, price_change_percentage_24h: -1.55, image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 1.09, price_change_percentage_24h: -0.32, image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 75.19, price_change_percentage_24h: -0.64, image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png" },
  { id: "tron", symbol: "trx", name: "TRON", current_price: 0.3227, price_change_percentage_24h: -0.09, image: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.0727, price_change_percentage_24h: -0.93, image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.1660, price_change_percentage_24h: 2.50, image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 6.59, price_change_percentage_24h: 0.13, image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png" },
];

function MiniSparkline({ data, isPositive }) {
  if (!data || data.length < 2) {
    const pts = Array.from({ length: 20 }, (_, i) =>
      `${5 * i},${(isPositive ? 30 + 0.5 * i : 40 - 0.3 * i) + 5 * Math.sin(0.8 * i)}`
    ).join(" ");
    return (
      <svg width="80" height="32" viewBox="0 0 100 50" className="inline-block">
        <polyline fill="none" stroke={isPositive ? "hsl(var(--primary))" : "hsl(0, 70%, 55%)"} strokeWidth="2" points={pts} />
      </svg>
    );
  }
  const filtered = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 20)) === 0);
  const min = Math.min(...filtered);
  const max = Math.max(...filtered) - min || 1;
  const pts = filtered.map((v, i) => `${(i / (filtered.length - 1)) * 100},${48 - ((v - min) / max) * 46}`).join(" ");
  return (
    <svg width="80" height="32" viewBox="0 0 100 50" className="inline-block">
      <polyline fill="none" stroke={isPositive ? "hsl(var(--primary))" : "hsl(0, 70%, 55%)"} strokeWidth="2" points={pts} />
    </svg>
  );
}

export function DashboardCryptoPrices() {
  const { language } = useLanguage();
  const [coins, setCoins] = useState(defaultCoins);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let timeout;
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple,solana,dogecoin,cardano,tron,avalanche-2&order=market_cap_desc&sparkline=true&price_change_percentage=24h"
        );
        if (res.status === 429) { timeout = setTimeout(fetchPrices, 30000); return; }
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data && data.length > 0) {
          const seen = new Set();
          setCoins(data.filter(c => !seen.has(c.id) && (seen.add(c.id), true)));
          setLive(true);
        }
      } catch {}
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {language === "ar" ? "أسعار العملات الرقمية" : "Crypto Prices"}
          </div>
          {live && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-muted-foreground font-normal">LIVE</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {coins.map((coin) => {
            const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0;
            return (
              <div key={coin.id} className="flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-sm text-foreground">{coin.name}</p>
                    <p className="text-xs text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MiniSparkline data={coin.sparkline_in_7d?.price} isPositive={isPositive} />
                  <div className="text-right min-w-[90px]">
                    <p className="font-semibold text-sm text-foreground">
                      ${coin.current_price >= 1
                        ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : coin.current_price.toFixed(4)}
                    </p>
                    <p className={`text-xs flex items-center justify-end gap-0.5 ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {isPositive ? "+" : ""}{coin.price_change_percentage_24h?.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}