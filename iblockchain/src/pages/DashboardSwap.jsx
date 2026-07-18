import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/Select";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { ArrowDownUp, Info, TrendingUp, TrendingDown, RefreshCw, LoaderCircle } from "lucide-react";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin" }, { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" }, { symbol: "SOL", name: "Solana" },
  { symbol: "BNB", name: "BNB" }, { symbol: "XRP", name: "Ripple" },
];
const prices = { BTC: 67500, ETH: 3450, USDT: 1, SOL: 145, BNB: 610, XRP: 0.52 };

const cryptoImage = (s) => `https://assets.coingecko.com/coins/images/${ {BTC:1,ETH:279,USDT:325,SOL:4128,BNB:825,XRP:44}[s] || 1}/small/${s.toLowerCase()}.png`;

export function DashboardSwap() {
  const { language, isRTL } = useLanguage();
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [swapping, setSwapping] = useState(false);
  const { toast } = useToast();
  const isAr = language === "ar";

  const rate = prices[fromCrypto] / prices[toCrypto];

  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) setToAmount((Number(fromAmount) * rate).toFixed(6));
    else setToAmount("");
  }, [fromAmount, fromCrypto, toCrypto, rate]);

  const popularPairs = [
    { from: "BTC", to: "ETH", change: 2.4 }, { from: "ETH", to: "USDT", change: -1.2 },
    { from: "SOL", to: "USDT", change: 5.7 }, { from: "BNB", to: "ETH", change: 0.8 },
    { from: "XRP", to: "USDT", change: -0.5 },
  ];

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "تبادل العملات" : "Swap Crypto"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "تبادل فوري بين العملات الرقمية" : "Instant swap between cryptocurrencies"}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ArrowDownUp className="h-5 w-5 text-primary" />{isAr ? "تبادل فوري" : "Instant Swap"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">{isAr ? "من" : "From"}</label>
                <div className="flex gap-3">
                  <Select value={fromCrypto} onValueChange={setFromCrypto}>
                    <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {cryptos.map(c => <SelectItem key={c.symbol} value={c.symbol} disabled={c.symbol === toCrypto}>{c.symbol} - {c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="0.00" value={fromAmount} onChange={e => setFromAmount(e.target.value)} className="flex-1 text-lg" />
                </div>
                <p className="text-xs text-muted-foreground">≈ ${fromAmount ? (Number(fromAmount) * prices[fromCrypto]).toLocaleString() : "0.00"} USD</p>
              </div>
              <div className="flex justify-center">
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => { setFromCrypto(toCrypto); setToCrypto(fromCrypto); setFromAmount(toAmount); }}>
                  <ArrowDownUp className="h-4 w-4 text-primary" />
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">{isAr ? "إلى" : "To"}</label>
                <div className="flex gap-3">
                  <Select value={toCrypto} onValueChange={setToCrypto}>
                    <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {cryptos.map(c => <SelectItem key={c.symbol} value={c.symbol} disabled={c.symbol === fromCrypto}>{c.symbol} - {c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input type="number" placeholder="0.00" value={toAmount} readOnly className="flex-1 text-lg bg-background/30" />
                </div>
                <p className="text-xs text-muted-foreground">≈ ${toAmount ? (Number(toAmount) * prices[toCrypto]).toLocaleString() : "0.00"} USD</p>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1"><Info className="h-4 w-4" />{isAr ? "سعر الصرف" : "Exchange Rate"}</span>
                <span className="font-medium">1 {fromCrypto} = {rate.toFixed(6)} {toCrypto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{isAr ? "رسوم الشبكة" : "Network Fee"}</span>
                <span>~0.1%</span>
              </div>
              <Button className="w-full h-12 text-lg font-semibold" onClick={() => {
                if (!fromAmount || Number(fromAmount) <= 0) return;
                setSwapping(true);
                setTimeout(() => { setSwapping(false); toast({ title: isAr ? "تم التبادل!" : "Swap Successful!" }); setFromAmount(""); setToAmount(""); }, 2000);
              }} disabled={swapping || !fromAmount}>
                {swapping ? <RefreshCw className="h-5 w-5 animate-spin" /> : (isAr ? "تبادل الآن" : "Swap Now")}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader><CardTitle>{isAr ? "أزواج شائعة" : "Popular Pairs"}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {popularPairs.map((p, i) => {
                const r = prices[p.from] / prices[p.to];
                return (
                  <button key={i} onClick={() => { setFromCrypto(p.from); setToCrypto(p.to); }}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-2">
                      <img src={cryptoImage(p.from)} alt={p.from} className="w-5 h-5 rounded-full" />
                      <span className="font-medium text-sm">{p.from}/{p.to}</span>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-medium">{r.toFixed(4)}</p>
                      <p className={`text-xs flex items-center gap-0.5 ${p.change > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {p.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(p.change)}%
                      </p>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}