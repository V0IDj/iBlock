import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { useToast } from "../hooks/useToast";
import { ShoppingCart, DollarSign, RefreshCw, LoaderCircle, Wallet } from "lucide-react";

const assets = [
  { name: "Bitcoin", symbol: "BTC", price: 67500, change: 2.4, category: "crypto" },
  { name: "Ethereum", symbol: "ETH", price: 3450, change: -1.2, category: "crypto" },
  { name: "Solana", symbol: "SOL", price: 145, change: 5.7, category: "crypto" },
  { name: "Gold", symbol: "XAU", price: 2345, change: 0.5, category: "metal" },
  { name: "Silver", symbol: "XAG", price: 28.45, change: -0.3, category: "metal" },
  { name: "WTI Crude", symbol: "WTI", price: 78.5, change: 1.2, category: "energy" },
  { name: "Brent Oil", symbol: "BRENT", price: 82.3, change: 0.8, category: "energy" },
  { name: "S&P 500", symbol: "SPX", price: 5432, change: 0.3, category: "stock" },
  { name: "NASDAQ", symbol: "NDX", price: 18765, change: -0.5, category: "stock" },
  { name: "EUR/USD", symbol: "EUR", price: 1.08, change: 0.1, category: "forex" },
];

export function DashboardBuySell() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState("buy");
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleOrder = () => {
    if (!amount || Number(amount) <= 0) { toast({ title: "Error", description: "Enter a valid amount", variant: "destructive" }); return; }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast({ title: orderType === "buy" ? "Purchase submitted!" : "Sale submitted!", description: `${orderType === "buy" ? "Buy" : "Sell"} order for ${selectedAsset.symbol} is being processed.` });
      setAmount("");
    }, 1500);
  };

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div><h1 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart className="h-6 w-6" />{language === "ar" ? "شراء وبيع" : "Buy & Sell"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "شراء وبيع الأصول" : "Buy and sell assets"}</p></div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card><CardHeader><CardTitle>{language === "ar" ? "الأصول" : "Assets"}</CardTitle></CardHeader>
            <CardContent><div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assets.map((a, i) => (
                <div key={a.symbol} onClick={() => setSelectedAsset(a)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedAsset.symbol === a.symbol ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold">{a.name}</p><p className="text-xs text-muted-foreground">{a.symbol}</p>
                      <Badge variant="outline" className="mt-1 text-[10px]">{a.category}</Badge></div>
                    <div className="text-end">
                      <p className="font-bold text-primary">${a.price.toLocaleString()}</p>
                      <p className={`text-xs ${a.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>{a.change >= 0 ? "+" : ""}{a.change}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div></CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>{language === "ar" ? "طلب" : "Order"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={orderType} onValueChange={setOrderType}>
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="buy" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">{language === "ar" ? "شراء" : "Buy"}</TabsTrigger>
                  <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">{language === "ar" ? "بيع" : "Sell"}</TabsTrigger>
                </TabsList>
              </Tabs>
              <div><p className="text-sm text-muted-foreground">{language === "ar" ? "الأصل" : "Asset"}</p><p className="font-semibold">{selectedAsset.name} ({selectedAsset.symbol})</p></div>
              <div><p className="text-sm text-muted-foreground">{language === "ar" ? "السعر" : "Price"}</p><p className="font-semibold text-primary">${selectedAsset.price.toLocaleString()}</p></div>
              <div><p className="text-sm text-muted-foreground">{language === "ar" ? "المبلغ (USD)" : "Amount (USD)"}</p>
                <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1" /></div>
              <div className="rounded-lg bg-muted/20 p-3 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{language === "ar" ? "الكمية" : "Quantity"}</span><span>{(Number(amount || 0) / selectedAsset.price).toFixed(6)} {selectedAsset.symbol}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{language === "ar" ? "الإجمالي" : "Total"}</span><span className="font-semibold">${Number(amount || 0).toFixed(2)}</span></div>
              </div>
              <Button className="w-full h-12 text-base font-semibold" onClick={handleOrder} disabled={processing || !amount}>
                {processing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <><ShoppingCart className="h-5 w-5 mr-2" />{orderType === "buy" ? (language === "ar" ? "تأكيد الشراء" : "Confirm Buy") : (language === "ar" ? "تأكيد البيع" : "Confirm Sell")}</>}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}