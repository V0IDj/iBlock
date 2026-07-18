import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/Select";
import { useToast } from "../hooks/useToast";
import { supabase } from "../lib/supabase";
import { ShoppingCart, DollarSign, RefreshCw, LoaderCircle, Wallet, ArrowRightLeft, CreditCard, Gem, Fuel, Coins, Boxes, Building2, CircleDollarSign, Zap, Clock } from "lucide-react";

const categoryLabels = {
  crypto: { en: "Crypto", ar: "عملات رقمية" },
  metal: { en: "Metals", ar: "معادن" },
  energy: { en: "Energy", ar: "طاقة" },
  commodity: { en: "Commodities", ar: "سلع" },
  stock: { en: "Stocks", ar: "أسهم" },
  forex: { en: "Forex", ar: "فوركس" },
  plan: { en: "Plans", ar: "خطط" },
  service: { en: "Services", ar: "خدمات" },
};

export function DashboardBuySell() {
  const { language } = useLanguage();
  const { finances } = useDashboard();
  const { toast } = useToast();
  const isAr = language === "ar";

  const [assets, setAssets] = useState([]);
  const [paymentWallets, setPaymentWallets] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderType, setOrderType] = useState("buy");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [targetAsset, setTargetAsset] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("balance");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [txHash, setTxHash] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardLast4, setCardLast4] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardPhone, setCardPhone] = useState("");
  const [cardNote, setCardNote] = useState("");
  const [processing, setProcessing] = useState(false);

  const balance = finances?.capital || 0;

  const fetchData = async (refreshPrices = true) => {
    setLoading(true);
    if (refreshPrices) await supabase.functions.invoke("refresh-market-prices").catch(() => null);
    const [assetsRes, walletsRes, holdingsRes, ordersRes] = await Promise.all([
      supabase.from("market_assets").select("*").eq("is_active", true).order("category", { ascending: true }),
      supabase.from("market_payment_wallets").select("*").eq("is_active", true).order("crypto_symbol", { ascending: true }),
      supabase.from("client_market_holdings").select("*").order("updated_at", { ascending: false }),
      supabase.from("market_orders").select("*").order("created_at", { ascending: false }).limit(8),
    ]);
    if (assetsRes.data) { setAssets(assetsRes.data); if (!selectedAsset && assetsRes.data.length) setSelectedAsset(assetsRes.data[0]); }
    if (walletsRes.data) setPaymentWallets(walletsRes.data);
    if (holdingsRes.data) setHoldings(holdingsRes.data);
    if (ordersRes.data) setRecentOrders(ordersRes.data);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const categories = useMemo(() => {
    const cats = new Set(assets.map(a => a.category));
    return ["crypto", "metal", "energy", "commodity", "stock", "forex", "plan", "service"].filter(c => cats.has(c));
  }, [assets]);

  const categoryCounts = useMemo(() => {
    const counts = {}; assets.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; }); return counts;
  }, [assets]);

  const filteredAssets = useMemo(() =>
    assets.filter(a => categoryFilter === "all" || a.category === categoryFilter)
      .sort((a, b) => a.name.localeCompare(b.name)),
    [assets, categoryFilter]
  );

  const activeHolding = holdings.find(h => h.asset_id === selectedAsset?.id);
  const estimatedQty = selectedAsset?.current_price ? (Number(amount || 0) / Number(selectedAsset.current_price)) : 0;
  const selectedWalletData = paymentWallets.find(w => w.id === selectedWallet);

  const executeOrder = async (type) => {
    if (!selectedAsset || !amount || Number(amount) <= 0) { toast({ title: "Error", description: "Enter a valid amount", variant: "destructive" }); return; }
    if (type === "sell" && activeHolding && Number(amount) > Number(activeHolding.invested_amount)) {
      toast({ title: "Error", description: "Insufficient asset holdings", variant: "destructive" }); return;
    }
    if (type === "trade" && !targetAsset) { toast({ title: "Error", description: "Select a target asset", variant: "destructive" }); return; }
    if (paymentMethod === "external_crypto" && !selectedWallet) { toast({ title: "Error", description: "Select payment wallet", variant: "destructive" }); return; }
    if (paymentMethod === "external_crypto" && !txHash) { toast({ title: "Error", description: "Enter transaction hash", variant: "destructive" }); return; }
    if (paymentMethod === "card" && (!cardHolder || !cardLast4 || !cardExpiry)) { toast({ title: "Error", description: "Enter required card details", variant: "destructive" }); return; }

    setProcessing(true);
    try {
      const { error } = await supabase.rpc("execute_market_order", {
        _asset_id: selectedAsset.id,
        _order_type: type,
        _payment_method: paymentMethod,
        _amount: Number(amount),
        _target_asset_id: type === "trade" ? targetAsset?.id : null,
        _wallet_address: paymentMethod === "external_crypto" ? (selectedWalletData?.wallet_address || null) : null,
        _tx_hash: paymentMethod === "external_crypto" ? (txHash || null) : paymentMethod === "card" ? JSON.stringify({ card_holder: cardHolder, card_last4: cardLast4, expiry: cardExpiry, phone: cardPhone, note: cardNote }) : null,
      });
      if (error) throw error;
      toast({ title: isAr ? "تم تنفيذ العملية" : "Order completed", description: isAr ? "تم تسجيل طلب السوق بنجاح" : "Your market order was recorded successfully" });
      setAmount(""); setTxHash(""); setCardHolder(""); setCardLast4(""); setCardExpiry(""); setCardPhone(""); setCardNote("");
      await fetchData(false);
    } catch (err) {
      toast({ title: isAr ? "خطأ" : "Error", description: err.message || "Order failed", variant: "destructive" });
    }
    setProcessing(false);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><LoaderCircle className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isAr ? "السوق" : "Market"}</h1>
          <p className="text-muted-foreground mt-1">{isAr ? "شراء وبيع وتداول الأصول" : "Buy, sell, and trade available assets"}</p>
        </div>
        <Badge variant="outline" className="w-fit text-sm py-2 px-3">
          <Wallet className="h-4 w-4 mr-2" />{isAr ? "الرصيد" : "Balance"}: ${balance.toLocaleString()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle>{isAr ? "الأصول المتوفرة" : "Available Assets"}</CardTitle>
                <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-auto">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 h-auto w-full md:w-auto gap-1 bg-muted/30 p-1">
                    <TabsTrigger value="all" className="gap-1.5">{isAr ? "الكل" : "All"} <span className="rounded-full bg-background/70 px-1.5 text-[10px] text-muted-foreground">{assets.length}</span></TabsTrigger>
                    {categories.map(cat => (
                      <TabsTrigger key={cat} value={cat} className="gap-1.5">
                        {categoryLabels[cat]?.[language] || cat}
                        <span className="rounded-full bg-background/70 px-1.5 text-[10px] text-muted-foreground">{categoryCounts[cat] || 0}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAssets.map((asset, i) => (
                  <div key={asset.id} className="space-y-3">
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      className={`premium-card group text-start w-full rounded-xl border p-0 overflow-hidden transition-all ${selectedAsset?.id === asset.id ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" : "border-border/50 bg-background/75 hover:bg-card"}`}
                    >
                      <div className="h-24 bg-primary/10 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/30 to-primary/5" />
                        <div className="h-14 w-14 rounded-2xl bg-background/80 text-primary flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 relative">
                          {asset.category === "crypto" ? <Coins className="h-8 w-8" /> :
                           asset.category === "metal" ? <Gem className="h-8 w-8" /> :
                           asset.category === "energy" ? <Fuel className="h-8 w-8" /> :
                           asset.category === "commodity" ? <Boxes className="h-8 w-8" /> :
                           asset.category === "stock" ? <Building2 className="h-8 w-8" /> :
                           <CircleDollarSign className="h-8 w-8" />}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-background/5 to-transparent" />
                        <Badge className="absolute top-3 end-3" variant="secondary">{categoryLabels[asset.category]?.[language] || asset.category}</Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-foreground">{asset.name}</p>
                            <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                          </div>
                          <div className="text-end">
                            <p className="font-bold text-primary">${Number(asset.current_price).toLocaleString()}</p>
                            <Badge variant="secondary" className="mt-1 text-[10px]">+{Number(asset.profit_rate)}%</Badge>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{asset.description}</p>
                      </div>
                    </button>
                    {selectedAsset?.id === asset.id && (
                      <div className="rounded-xl border border-primary/20 bg-background/85 p-4 shadow-lg shadow-primary/5 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Input type="number" min="0" placeholder={isAr ? "المبلغ بالدولار" : "Amount in USD"} value={amount} onChange={e => setAmount(e.target.value)} />
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger><SelectValue placeholder={isAr ? "طريقة الدفع" : "Payment method"} /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="balance">{isAr ? "من الرصيد" : "Balance"}</SelectItem>
                              <SelectItem value="external_crypto">{isAr ? "تحويل كريبتو" : "Crypto transfer"}</SelectItem>
                              <SelectItem value="card">{isAr ? "بطاقة" : "Card request"}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {paymentMethod === "external_crypto" && (
                          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-3">
                            <p className="text-sm font-semibold">{isAr ? "حوّل قيمة الطلب إلى إحدى محافظ الدفع ثم أدخل Hash العملية" : "Transfer the order amount to one of the payment wallets, then enter the transaction hash"}</p>
                            <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                              <SelectTrigger><SelectValue placeholder={isAr ? "اختر محفظة التحويل" : "Select transfer wallet"} /></SelectTrigger>
                              <SelectContent>
                                {paymentWallets.map(w => (
                                  <SelectItem key={w.id} value={w.id}>{w.crypto_symbol} · {w.network}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {selectedWalletData && (
                              <div className="rounded-lg bg-background/80 p-3 text-xs"><p className="font-mono break-all text-foreground">{selectedWalletData.wallet_address}</p><p className="mt-1 text-muted-foreground">{selectedWalletData.instructions}</p></div>
                            )}
                            <Input value={txHash} onChange={e => setTxHash(e.target.value)} placeholder={isAr ? "Hash العملية بعد التحويل" : "Transaction hash after transfer"} />
                          </div>
                        )}
                        {paymentMethod === "card" && (
                          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 space-y-3">
                            <p className="text-sm font-semibold">{isAr ? "أدخل بيانات البطاقة لإكمال الطلب" : "Enter card details to process the order"}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <Input value={cardHolder} onChange={e => setCardHolder(e.target.value)} placeholder={isAr ? "اسم حامل البطاقة" : "Card holder name"} />
                              <Input value={cardLast4} maxLength={4} onChange={e => setCardLast4(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder={isAr ? "آخر 4 أرقام" : "Last 4 digits"} />
                              <Input value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder={isAr ? "تاريخ الانتهاء MM/YY" : "Expiry MM/YY"} />
                              <Input value={cardPhone} onChange={e => setCardPhone(e.target.value)} placeholder={isAr ? "رقم الهاتف" : "Phone number"} />
                            </div>
                            <Textarea value={cardNote} onChange={e => setCardNote(e.target.value)} placeholder={isAr ? "ملاحظة إضافية" : "Additional note"} />
                          </div>
                        )}
                        <div className="rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground flex justify-between gap-3">
                          <span>{isAr ? "السعر المحدث" : "Updated price"}</span>
                          <span className="font-semibold text-primary">${Number(asset.current_price).toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <Button onClick={() => executeOrder("buy")} disabled={processing || !amount}>
                            <ShoppingCart className="h-4 w-4 mr-2" />{isAr ? "شراء الآن" : "Buy Now"}
                          </Button>
                          <Button variant="outline" onClick={() => executeOrder("sell")} disabled={processing || !amount}>
                            <DollarSign className="h-4 w-4 mr-2" />{isAr ? "بيع الآن" : "Sell Now"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{isAr ? "تنفيذ عملية السوق" : "Execute Market Order"}</CardTitle></CardHeader>
            <CardContent>
              <Tabs value={orderType} onValueChange={setOrderType}>
                <TabsList className="grid grid-cols-3 mb-6 h-auto bg-primary/5 p-1">
                  <TabsTrigger value="buy" className="h-12 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ShoppingCart className="h-4 w-4" />{isAr ? "شراء" : "Buy"}</TabsTrigger>
                  <TabsTrigger value="sell" className="h-12 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><DollarSign className="h-4 w-4" />{isAr ? "بيع" : "Sell"}</TabsTrigger>
                  <TabsTrigger value="trade" className="h-12 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ArrowRightLeft className="h-4 w-4" />{isAr ? "تداول" : "Trade"}</TabsTrigger>
                </TabsList>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{isAr ? "الأصل" : "Asset"}</Label>
                      <Select value={selectedAsset?.id || ""} onValueChange={v => setSelectedAsset(assets.find(a => a.id === v))}>
                        <SelectTrigger><SelectValue placeholder={isAr ? "اختر أصلاً" : "Select asset"} /></SelectTrigger>
                        <SelectContent>
                          {assets.map(a => <SelectItem key={a.id} value={a.id}>{a.name} ({a.symbol})</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {orderType === "trade" && (
                      <div className="space-y-2">
                        <Label>{isAr ? "التداول إلى" : "Trade To"}</Label>
                        <Select value={targetAsset?.id || ""} onValueChange={v => setTargetAsset(assets.find(a => a.id === v))}>
                          <SelectTrigger><SelectValue placeholder={isAr ? "اختر أصلاً" : "Select asset"} /></SelectTrigger>
                          <SelectContent>
                            {assets.filter(a => a.id !== selectedAsset?.id).map(a => <SelectItem key={a.id} value={a.id}>{a.name} ({a.symbol})</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>{isAr ? "المبلغ بالدولار" : "Amount in USD"}</Label>
                      <Input type="number" min="0" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
                    </div>
                    {orderType === "buy" && (
                      <div className="space-y-2">
                        <Label>{isAr ? "طريقة الدفع" : "Payment Method"}</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="balance">{isAr ? "من الرصيد المتوفر" : "Platform balance"}</SelectItem>
                            <SelectItem value="external_crypto">{isAr ? "تحويل كريبتو" : "Crypto transfer"}</SelectItem>
                            <SelectItem value="card">{isAr ? "بطاقة - قيد المعالجة" : "Card - processing"}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-muted/20 p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{isAr ? "السعر" : "Price"}</span><span>${Number(selectedAsset?.current_price || 0).toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">{isAr ? "الكمية التقديرية" : "Estimated quantity"}</span><span>{estimatedQty.toLocaleString(undefined, { maximumFractionDigits: 8 })} {selectedAsset?.symbol}</span></div>
                    {selectedAsset?.terms && <div className="flex justify-between text-sm"><span className="text-muted-foreground">{isAr ? "الشروط" : "Terms"}</span><span className="max-w-[55%] text-end">{selectedAsset.terms}</span></div>}
                    {orderType === "trade" && targetAsset && <div className="flex justify-between text-sm"><span className="text-muted-foreground">{isAr ? "الأصل الجديد" : "Target asset"}</span><span>{targetAsset.name}</span></div>}
                    <div className="border-t border-border/50 pt-2 flex justify-between font-semibold">
                      <span>{isAr ? "الإجمالي" : "Total"}</span>
                      <span className="text-primary">${Number(amount || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 text-base font-semibold" onClick={() => executeOrder(orderType)} disabled={processing || !amount || !selectedAsset}>
                    {processing ? <LoaderCircle className="h-5 w-5 animate-spin" /> :
                      orderType === "buy" ? (isAr ? "تأكيد الشراء" : "Confirm Buy") :
                      orderType === "sell" ? (isAr ? "تأكيد البيع" : "Confirm Sell") :
                      (isAr ? "تأكيد التداول" : "Confirm Trade")}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">{isAr ? "ممتلكاتي في السوق" : "My Market Holdings"}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {holdings.length === 0 ? (
                <p className="text-sm text-muted-foreground">{isAr ? "لا توجد ممتلكات بعد" : "No holdings yet"}</p>
              ) : holdings.map(h => {
                const asset = assets.find(a => a.id === h.asset_id);
                return (
                  <div key={h.id} className="rounded-lg border border-border/50 p-3">
                    <div className="flex justify-between"><span className="font-medium">{asset?.symbol || "Asset"}</span><span className="text-primary">${Number(h.invested_amount).toLocaleString()}</span></div>
                    <p className="text-xs text-muted-foreground mt-1">{Number(h.quantity).toLocaleString(undefined, { maximumFractionDigits: 6 })} · {isAr ? "ربح" : "Profit"} ${Number(h.profit_amount).toLocaleString()}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            <Card><CardContent className="p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Zap className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium text-sm">{isAr ? "تنفيذ فوري" : "Instant Execution"}</p><p className="text-xs text-muted-foreground mt-1">{isAr ? "الرصيد والبيع والتداول تنفذ مباشرة" : "Balance, sell, and trade orders run instantly"}</p></div>
            </CardContent></Card>
            <Card><CardContent className="p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10"><Clock className="h-5 w-5 text-primary" /></div>
              <div><p className="font-medium text-sm">{isAr ? "قيد المعالجة" : "Processing"}</p><p className="text-xs text-muted-foreground mt-1">{isAr ? "الشحن الخارجي والبطاقة يتم استلامها للمعالجة" : "External crypto and card requests are processed securely"}</p></div>
            </CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">{isAr ? "آخر عمليات السوق" : "Recent Market Orders"}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">{isAr ? "لا توجد عمليات" : "No orders yet"}</p>
              ) : recentOrders.map(o => {
                const asset = assets.find(a => a.id === o.asset_id);
                return (
                  <div key={o.id} className="flex items-center justify-between rounded-lg bg-muted/20 p-3 text-sm">
                    <div>
                      <p className="font-medium capitalize">{o.order_type} · {asset?.symbol || "-"}</p>
                      <p className="text-xs text-muted-foreground">${Number(o.amount).toLocaleString()}</p>
                    </div>
                    <Badge variant={o.status === "completed" ? "default" : "secondary"}>{o.status}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}