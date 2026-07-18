import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { motion } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { Clock, Coins, TrendingUp, Percent, LoaderCircle, Lock } from "lucide-react";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", apy: 4.5, minStake: 0.001, lockDays: 30, tvl: "$2.4B" },
  { symbol: "ETH", name: "Ethereum", apy: 5.2, minStake: 0.01, lockDays: 30, tvl: "$1.8B" },
  { symbol: "SOL", name: "Solana", apy: 7.8, minStake: 1, lockDays: 14, tvl: "$890M" },
  { symbol: "BNB", name: "BNB", apy: 3.2, minStake: 0.1, lockDays: 30, tvl: "$450M" },
  { symbol: "USDT", name: "Tether", apy: 8.5, minStake: 100, lockDays: 7, tvl: "$3.2B" },
  { symbol: "XRP", name: "Ripple", apy: 6.1, minStake: 50, lockDays: 14, tvl: "$320M" },
];

const coinImages = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  BNB: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
};

export function DashboardStaking() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [staking, setStaking] = useState(false);
  const isAr = language === "ar";

  const handleStake = (sym) => {
    const coin = cryptos.find(c => c.symbol === sym);
    if (!coin || !amount || Number(amount) < coin.minStake) {
      toast({ title: "Error", description: isAr ? `الحد الأدنى للستاكينغ هو ${coin?.minStake} ${sym}` : `Minimum stake is ${coin?.minStake} ${sym}`, variant: "destructive" }); return;
    }
    setStaking(true);
    setTimeout(() => { setStaking(false); toast({ title: isAr ? "تم الستاكينغ!" : "Staking Successful!", description: isAr ? `تم إيداع ${amount} ${sym} بعائد ${coin.apy}% سنوياً` : `Staked ${amount} ${sym} at ${coin.apy}% APY` }); setAmount(""); setSelected(null); }, 2000);
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <h1 className="text-2xl font-bold text-foreground">{isAr ? "الستاكينغ" : "Staking"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "اكسب أرباحاً من عملاتك المحتفظ بها" : "Earn rewards on your crypto holdings"}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: isAr ? "إجمالي المُودع" : "Total Staked", value: "$0", icon: Lock },
          { label: isAr ? "الأرباح المكتسبة" : "Earned", value: "$0", icon: TrendingUp },
          { label: isAr ? "أعلى عائد" : "Best APY", value: "8.5%", icon: Percent },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
                <div><p className="text-xs text-muted-foreground">{s.label}</p><p className="text-xl font-bold text-foreground">{s.value}</p></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryptos.map((coin, i) => (
          <motion.div key={coin.symbol} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <Card className={`border-border/50 bg-card/80 backdrop-blur-sm transition-all ${selected === coin.symbol ? "ring-2 ring-primary" : ""}`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={coinImages[coin.symbol]} alt={coin.symbol} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-foreground">{coin.name}</p>
                      <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/30 text-lg px-3 py-1">{coin.apy}% APY</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="bg-muted/10 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{isAr ? "الحد الأدنى" : "Min Stake"}</p>
                    <p className="text-sm font-medium text-foreground">{coin.minStake} {coin.symbol}</p>
                  </div>
                  <div className="bg-muted/10 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">{isAr ? "مدة القفل" : "Lock Period"}</p>
                    <p className="text-sm font-medium text-foreground flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> {coin.lockDays}d</p>
                  </div>
                  <div className="bg-muted/10 rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">TVL</p>
                    <p className="text-sm font-medium text-foreground">{coin.tvl}</p>
                  </div>
                </div>
                {selected === coin.symbol ? (
                  <div className="space-y-3">
                    <Input type="number" placeholder={`${coin.minStake} ${coin.symbol}`} value={amount} onChange={e => setAmount(e.target.value)} className="bg-background/50" />
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => handleStake(coin.symbol)} disabled={staking}>
                        {staking ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <><Coins className="h-4 w-4 me-1" />{isAr ? "تأكيد الستاكينغ" : "Confirm Stake"}</>}
                      </Button>
                      <Button variant="outline" onClick={() => { setSelected(null); setAmount(""); }}>{isAr ? "إلغاء" : "Cancel"}</Button>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => setSelected(coin.symbol)}>
                    <Coins className="h-4 w-4 me-2" />{isAr ? "ابدأ الستاكينغ" : "Start Staking"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}