import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { motion } from "framer-motion";
import { Search, Star, TrendingUp, TrendingDown, ChartLine, DollarSign, Activity, LoaderCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "../lib/supabase";

const defaultCoins = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 67500, price_change_percentage_24h: 2.4, market_cap: 1.32e12, total_volume: 2.8e10, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png" },
  { id: "ethereum", symbol: "eth", name: "Ethereum", current_price: 3450, price_change_percentage_24h: -1.2, market_cap: 4.15e11, total_volume: 1.4e10, image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png" },
  { id: "tether", symbol: "usdt", name: "Tether", current_price: 1, price_change_percentage_24h: 0.01, market_cap: 1.1e11, total_volume: 4.5e10, image: "https://assets.coingecko.com/coins/images/325/small/Tether.png" },
  { id: "solana", symbol: "sol", name: "Solana", current_price: 145, price_change_percentage_24h: 5.7, market_cap: 6.3e10, total_volume: 3.2e9, image: "https://assets.coingecko.com/coins/images/4128/small/solana.png" },
  { id: "binancecoin", symbol: "bnb", name: "BNB", current_price: 610, price_change_percentage_24h: 0.8, market_cap: 9.1e10, total_volume: 1.5e9, image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png" },
  { id: "ripple", symbol: "xrp", name: "XRP", current_price: 0.52, price_change_percentage_24h: -0.5, market_cap: 2.8e10, total_volume: 9e8, image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png" },
  { id: "cardano", symbol: "ada", name: "Cardano", current_price: 0.45, price_change_percentage_24h: 3.1, market_cap: 1.6e10, total_volume: 5e8, image: "https://assets.coingecko.com/coins/images/975/small/cardano.png" },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", current_price: 0.08, price_change_percentage_24h: -2.3, market_cap: 1.1e10, total_volume: 6e8, image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png" },
  { id: "polkadot", symbol: "dot", name: "Polkadot", current_price: 7.2, price_change_percentage_24h: 1.9, market_cap: 9.5e9, total_volume: 3e8, image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png" },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", current_price: 35, price_change_percentage_24h: 4.2, market_cap: 1.3e10, total_volume: 7e8, image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png" },
];

function MiniChart({ data, positive }) {
  if (!data || data.length < 2) {
    const pts = Array.from({ length: 20 }, (_, i) => `${5 * i},${(positive ? 30 + 0.5 * i : 40 - 0.3 * i) + 5 * Math.sin(0.8 * i)}`).join(" ");
    return <svg width="80" height="32" viewBox="0 0 100 50" className="inline-block"><polyline fill="none" stroke={positive ? "hsl(var(--primary))" : "hsl(0, 70%, 55%)"} strokeWidth="2" points={pts} /></svg>;
  }
  const filtered = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 20)) === 0);
  const min = Math.min(...filtered), max = Math.max(...filtered) - min || 1;
  const pts = filtered.map((v, i) => `${(i / (filtered.length - 1)) * 100},${48 - ((v - min) / max) * 46}`).join(" ");
  return <svg width="80" height="32" viewBox="0 0 100 50" className="inline-block"><polyline fill="none" stroke={positive ? "hsl(var(--primary))" : "hsl(0, 70%, 55%)"} strokeWidth="2" points={pts} /></svg>;
}

function CoinDetail({ coin, open, onClose, language }) {
  if (!coin) return null;
  const isPositive = (coin.price_change_percentage_24h ?? 0) > 0;
  const color = isPositive ? "hsl(var(--primary))" : "hsl(0, 70%, 55%)";
  const chartData = coin.sparkline_in_7d?.price?.map((p, i) => ({ hour: i, price: p }))
    || Array.from({ length: 168 }, (_, i) => ({ hour: i, price: coin.current_price * (1 + 0.02 * Math.sin(0.1 * i)) }));
  const fmt = v => v >= 1000 ? `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : v >= 1 ? `$${v.toFixed(2)}` : `$${v.toFixed(6)}`;
  const fmtCap = v => v >= 1e12 ? `$${(v / 1e12).toFixed(2)}T` : v >= 1e9 ? `$${(v / 1e9).toFixed(2)}B` : v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : `$${v.toLocaleString()}`;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border/50 p-0 max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 pb-0">
          <div className="flex items-center gap-3">
            {coin.image && <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />}
            <span className="text-xl font-bold">{coin.name}</span>
            <span className="text-sm text-muted-foreground uppercase">{coin.symbol}</span>
            <Badge variant="outline" className={`ms-auto text-sm ${isPositive ? "text-emerald-400 border-emerald-400/30" : "text-red-400 border-red-400/30"}`}>
              {isPositive ? "+" : ""}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
            </Badge>
          </div>
        </div>
        <div className="px-4 sm:px-6 pt-2">
          <p className="text-2xl sm:text-3xl font-bold">{fmt(coin.current_price)}</p>
          <p className="text-sm text-muted-foreground mt-1">{language === "ar" ? "آخر 7 أيام" : "Last 7 days"}</p>
        </div>
        <div className="px-3 sm:px-4 pt-4 pb-2" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient></defs>
              <XAxis dataKey="hour" hide />
              <YAxis domain={["auto", "auto"]} hide />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                formatter={v => [fmt(v), language === "ar" ? "السعر" : "Price"]} labelFormatter={() => ""} />
              <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#chartGrad)" dot={false} activeDot={{ r: 4, fill: color }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6 pt-2 border-t border-border/30">
          {[
            { label: language === "ar" ? "القيمة السوقية" : "Market Cap", value: fmtCap(coin.market_cap) },
            { label: language === "ar" ? "حجم التداول 24س" : "24h Volume", value: fmtCap(coin.total_volume) },
            { label: language === "ar" ? "السعر الحالي" : "Current Price", value: fmt(coin.current_price) },
            { label: language === "ar" ? "التغير 24س" : "24h Change", value: `${isPositive ? "+" : ""}${(coin.price_change_percentage_24h ?? 0).toFixed(2)}%` },
          ].map((item, i) => (
            <div key={i} className="bg-muted/10 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="font-semibold mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DashboardMarket() {
  const { language, isRTL } = useLanguage();
  const [coins, setCoins] = useState(defaultCoins);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(["bitcoin", "ethereum"]);
  const [filter, setFilter] = useState("all");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&sparkline=true");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setCoins(data);
        }
      } catch { }
    })();
  }, []);

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const filtered = coins.filter(c => {
    const match = c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase());
    if (filter === "favorites") return match && favorites.includes(c.id);
    if (filter === "gainers") return match && (c.price_change_percentage_24h ?? 0) > 0;
    if (filter === "losers") return match && (c.price_change_percentage_24h ?? 0) < 0;
    return match;
  });

  const totalCap = coins.reduce((s, c) => s + c.market_cap, 0);
  const totalVol = coins.reduce((s, c) => s + c.total_volume, 0);
  const avgChange = coins.reduce((s, c) => s + (c.price_change_percentage_24h ?? 0), 0) / coins.length;
  const fmt = v => v >= 1e12 ? `$${(v / 1e12).toFixed(2)}T` : v >= 1e9 ? `$${(v / 1e9).toFixed(2)}B` : v >= 1e6 ? `$${(v / 1e6).toFixed(2)}M` : `$${v.toLocaleString()}`;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">{language === "ar" ? "السوق" : "Market"}</h1>
        <p className="text-muted-foreground text-sm mt-1">{language === "ar" ? "تتبع أسعار العملات الرقمية لحظياً" : "Track cryptocurrency prices in real-time"}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: language === "ar" ? "القيمة السوقية" : "Market Cap", value: fmt(totalCap), icon: DollarSign },
          { label: language === "ar" ? "حجم التداول 24س" : "24h Volume", value: fmt(totalVol), icon: Activity },
          { label: language === "ar" ? "متوسط التغير" : "Avg Change", value: `${avgChange.toFixed(2)}%`, icon: avgChange > 0 ? TrendingUp : TrendingDown },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10"><item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" /></div>
                <div className="min-w-0"><p className="text-[10px] sm:text-xs text-muted-foreground truncate">{item.label}</p><p className="text-sm sm:text-lg font-bold truncate">{item.value}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="p-3 sm:px-6 pb-3">
          <div className="flex flex-col gap-3">
            <div className="relative w-full">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder={language === "ar" ? "ابحث عن عملة..." : "Search coin..."} value={search} onChange={e => setSearch(e.target.value)} className="ps-9 bg-background/50" />
            </div>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="bg-muted/30 w-full grid grid-cols-4">
                <TabsTrigger value="all" className="text-xs sm:text-sm">{language === "ar" ? "الكل" : "All"}</TabsTrigger>
                <TabsTrigger value="favorites" className="text-xs sm:text-sm">⭐</TabsTrigger>
                <TabsTrigger value="gainers" className="text-emerald-400 text-xs sm:text-sm">{language === "ar" ? "رابحة" : "Gainers"}</TabsTrigger>
                <TabsTrigger value="losers" className="text-red-400 text-xs sm:text-sm">{language === "ar" ? "خاسرة" : "Losers"}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="px-2 sm:px-6">
          <div className="hidden sm:grid grid-cols-12 gap-2 px-3 py-2 text-xs text-muted-foreground border-b border-border/50 mb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-3">{language === "ar" ? "العملة" : "Coin"}</div>
            <div className="col-span-2 text-end">{language === "ar" ? "السعر" : "Price"}</div>
            <div className="col-span-2 text-end">24h %</div>
            <div className="col-span-2 text-end">{language === "ar" ? "القيمة السوقية" : "Market Cap"}</div>
            <div className="col-span-2 text-end">{language === "ar" ? "الرسم" : "Chart"}</div>
          </div>

          <div className="space-y-1">
            {filtered.map((coin, i) => {
              const isPositive = (coin.price_change_percentage_24h ?? 0) > 0;
              return (
                <motion.div key={coin.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}
                  onClick={() => setSelectedCoin(coin)} className="cursor-pointer rounded-lg hover:bg-muted/20 transition-colors">
                  {/* Mobile */}
                  <div className="flex sm:hidden items-center gap-3 px-3 py-3">
                    <button onClick={e => { e.stopPropagation(); toggleFav(coin.id); }}>
                      <Star className={`h-3.5 w-3.5 ${favorites.includes(coin.id) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                    </button>
                    <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}</span>
                    {coin.image ? <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full shrink-0" /> :
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">{coin.symbol.charAt(0).toUpperCase()}</div>}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{coin.name}</p>
                        <span className="font-semibold text-sm shrink-0 ms-2">${coin.current_price >= 1 ? coin.current_price.toLocaleString() : coin.current_price.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${isPositive ? "text-emerald-400 border-emerald-400/30" : "text-red-400 border-red-400/30"}`}>
                          {isPositive ? "+" : ""}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {/* Desktop */}
                  <div className="hidden sm:grid grid-cols-12 gap-2 items-center px-3 py-3">
                    <div className="col-span-1 flex items-center gap-1">
                      <button onClick={e => { e.stopPropagation(); toggleFav(coin.id); }} className="text-xs">
                        <Star className={`h-3.5 w-3.5 ${favorites.includes(coin.id) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                      </button>
                      <span className="text-xs text-muted-foreground">{i + 1}</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      {coin.image ? <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" /> :
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{coin.symbol.charAt(0).toUpperCase()}</div>}
                      <div><p className="font-medium text-sm">{coin.name}</p><p className="text-xs text-muted-foreground uppercase">{coin.symbol}</p></div>
                    </div>
                    <div className="col-span-2 text-end"><span className="font-medium text-sm">${coin.current_price >= 1 ? coin.current_price.toLocaleString() : coin.current_price.toFixed(4)}</span></div>
                    <div className="col-span-2 text-end">
                      <Badge variant="outline" className={`text-xs ${isPositive ? "text-emerald-400 border-emerald-400/30" : "text-red-400 border-red-400/30"}`}>
                        {isPositive ? "+" : ""}{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                      </Badge>
                    </div>
                    <div className="col-span-2 text-end text-sm text-muted-foreground">{fmt(coin.market_cap)}</div>
                    <div className="col-span-2 text-end"><MiniChart data={coin.sparkline_in_7d?.price} positive={isPositive} /></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">{language === "ar" ? "لا توجد نتائج" : "No results found"}</div>}
        </div>
      </Card>

      <CoinDetail coin={selectedCoin} open={!!selectedCoin} onClose={() => setSelectedCoin(null)} language={language} />
    </div>
  );
}