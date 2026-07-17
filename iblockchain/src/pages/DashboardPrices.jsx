import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Activity, LoaderCircle } from "lucide-react";

const coinIds = ["bitcoin", "ethereum", "tether", "binancecoin", "ripple", "solana", "dogecoin", "cardano", "tron", "avalanche-2"];
const defaultCoins = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 63000, price_change_percentage_24h: -1.5, image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 1830, price_change_percentage_24h: -2.5, image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1.0, price_change_percentage_24h: -0.01, image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 563, price_change_percentage_24h: -2.4, image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 1.08, price_change_percentage_24h: -2.0, image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 74.5, price_change_percentage_24h: -1.8, image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.0718, price_change_percentage_24h: -1.9, image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.160, price_change_percentage_24h: -1.0, image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png" },
  { id: "tron", symbol: "trx", name: "TRON", current_price: 0.322, price_change_percentage_24h: -0.2, image: "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 6.48, price_change_percentage_24h: -1.3, image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png" },
];

export function DashboardPrices() {
  const { language, isRTL } = useLanguage();
  const [coins, setCoins] = useState(defaultCoins);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let timer;
    const fetchPrices = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&sparkline=false&price_change_percentage_24h`);
        if (res.ok) { const d = await res.json(); if (d.length > 0) { setCoins(d); setLive(true); } }
      } catch { }
      timer = setTimeout(fetchPrices, 60000);
    };
    fetchPrices();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            {language === "ar" ? "أسعار العملات الرقمية" : "Crypto Prices"}
          </h1>
          <p className="text-muted-foreground mt-1">{language === "ar" ? "أسعار مباشرة ومحدثة" : "Live and updated cryptocurrency prices"}</p>
        </div>
        {live && <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-xs text-muted-foreground">LIVE</span></div>}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {coins.map((coin, i) => {
              const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0;
              return (
                <motion.div key={coin.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.02 * i }}
                  className="flex items-center justify-between px-6 py-3 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div><p className="font-medium text-sm">{coin.name}</p><p className="text-xs text-muted-foreground uppercase">{coin.symbol}</p></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right min-w-[90px]">
                      <p className="font-semibold text-sm">${coin.current_price >= 1 ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : coin.current_price.toFixed(4)}</p>
                      <p className={`text-xs flex items-center justify-end gap-0.5 ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {isPositive ? "+" : ""}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground text-center">{language === "ar" ? "البيانات من CoinGecko • تحديث كل 60 ثانية" : "Data from CoinGecko • Updates every 60 seconds"}</p>
    </div>
  );
}