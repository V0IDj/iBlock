import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Badge } from "../components/ui/Badge";
import { Switch } from "../components/ui/Switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/Table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Store, ClipboardList, Wallet, TrendingUp, Plus, Save, LoaderCircle } from "lucide-react";

export function AdminMarket() {
  const { language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assets, setAssets] = useState([]);
  const [paymentWallets, setPaymentWallets] = useState([]);
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [assetDialogOpen, setAssetDialogOpen] = useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [editWallet, setEditWallet] = useState(null);
  const [orderNotes, setOrderNotes] = useState({});
  const [profitInputs, setProfitInputs] = useState({});
  const [tabValue, setTabValue] = useState("assets");
  const isAr = language === "ar";

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [a, w, o, h, p] = await Promise.all([
      supabase.from("market_assets").select("*").order("created_at", { ascending: false }),
      supabase.from("market_payment_wallets").select("*").order("created_at", { ascending: false }),
      supabase.from("market_orders").select("*").order("created_at", { ascending: false }),
      supabase.from("client_market_holdings").select("*").order("updated_at", { ascending: false }),
      supabase.from("profiles").select("user_id, full_name, email"),
    ]);
    if (a.data) setAssets(a.data);
    if (w.data) setPaymentWallets(w.data);
    if (o.data) setOrders(o.data);
    if (h.data) setHoldings(h.data);
    if (p.data) setProfiles(p.data);
    setLoading(false);
  };

  const getProfile = (uid) => profiles.find(p => p.user_id === uid);
  const getAsset = (id) => assets.find(a => a.id === id);

  const stats = {
    assets: assets.length,
    pending: orders.filter(o => o.status === "pending").length,
    volume: orders.reduce((s, o) => s + Number(o.amount || 0), 0),
    profits: holdings.reduce((s, h) => s + Number(h.profit_amount || 0), 0),
  };

  const handleAssetSave = async () => {
    if (!editAsset?.name || !editAsset?.symbol) return;
    setSaving(true);
    const payload = {
      name: editAsset.name, symbol: editAsset.symbol.toUpperCase(), category: editAsset.category || "crypto",
      description: editAsset.description || null, current_price: Number(editAsset.current_price || 0),
      profit_rate: Number(editAsset.profit_rate || 0), min_trade_amount: Number(editAsset.min_trade_amount || 0),
      is_active: editAsset.is_active ?? true, terms: editAsset.terms || null,
    };
    const q = editAsset.id ? supabase.from("market_assets").update(payload).eq("id", editAsset.id) : supabase.from("market_assets").insert(payload);
    const { error } = await q;
    if (error) { toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Saved" }); setAssetDialogOpen(false); setEditAsset(null); await fetchData(); }
    setSaving(false);
  };

  const handleWalletSave = async () => {
    if (!editWallet?.crypto_symbol || !editWallet?.network || !editWallet?.wallet_address) return;
    setSaving(true);
    const payload = {
      crypto_symbol: editWallet.crypto_symbol.toUpperCase(), network: editWallet.network,
      wallet_address: editWallet.wallet_address, instructions: editWallet.instructions || null,
      is_active: editWallet.is_active ?? true,
    };
    const q = editWallet.id ? supabase.from("market_payment_wallets").update(payload).eq("id", editWallet.id) : supabase.from("market_payment_wallets").insert(payload);
    const { error } = await q;
    if (error) { toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Saved" }); setWalletDialogOpen(false); setEditWallet(null); await fetchData(); }
    setSaving(false);
  };

  const handleOrderAction = async (order, status) => {
    const note = orderNotes[order.id] || order.admin_note || null;
    const { error } = await supabase.from("market_orders").update({ status, admin_note: note }).eq("id", order.id);
    if (error) { toast({ title: isAr ? "خطأ" : "Error", description: error.message, variant: "destructive" }); }
    else {
      await supabase.from("notifications").insert({
        user_id: order.user_id,
        title: status === "approved" ? (isAr ? "✅ تمت الموافقة" : "✅ Approved") : (isAr ? "❌ تم الرفض" : "❌ Rejected"),
        message: `${getAsset(order.asset_id)?.symbol || "Market"} - $${Number(order.amount).toLocaleString()}${note ? `\n${note}` : ""}`,
      });
      toast({ title: "Updated" });
      await fetchData();
    }
  };

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div><h1 className="text-2xl font-bold">{isAr ? "إدارة السوق" : "Market Management"}</h1><p className="text-muted-foreground mt-1">{isAr ? "تحكم كامل" : "Full market control"}</p></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Store, label: isAr ? "الأصول" : "Assets", value: stats.assets },
          { icon: ClipboardList, label: isAr ? "معلقة" : "Pending", value: stats.pending },
          { icon: Wallet, label: isAr ? "الحجم" : "Volume", value: `$${stats.volume.toLocaleString()}` },
          { icon: TrendingUp, label: isAr ? "الأرباح" : "Profits", value: `$${stats.profits.toLocaleString()}` },
        ].map((s, i) => (
          <Card key={i}><CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
            <div><p className="text-sm text-muted-foreground">{s.label}</p><p className="font-bold">{s.value}</p></div>
          </CardContent></Card>
        ))}
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue}>
        <TabsList className="grid grid-cols-4 w-full lg:w-[720px]">
          <TabsTrigger value="assets">{isAr ? "الأصول" : "Assets"}</TabsTrigger>
          <TabsTrigger value="orders">{isAr ? "الطلبات" : "Orders"}</TabsTrigger>
          <TabsTrigger value="profits">{isAr ? "الأرباح" : "Profits"}</TabsTrigger>
          <TabsTrigger value="wallets">{isAr ? "محافظ" : "Wallets"}</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isAr ? "أصول السوق" : "Market Assets"}</CardTitle>
              <Dialog open={assetDialogOpen} onOpenChange={o => { setAssetDialogOpen(o); if (!o) setEditAsset(null); }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditAsset({ name: "", symbol: "", category: "crypto", description: "", current_price: 0, profit_rate: 0, min_trade_amount: 10, is_active: true, terms: "" })}>
                    <Plus className="h-4 w-4 me-2" />{isAr ? "إضافة" : "Add"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader><DialogTitle>{editAsset?.id ? (isAr ? "تعديل" : "Edit") : (isAr ? "إضافة" : "Add")} Asset</DialogTitle></DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div><Label>{isAr ? "الاسم" : "Name"}</Label><Input value={editAsset?.name || ""} onChange={e => setEditAsset(a => ({ ...a, name: e.target.value }))} /></div>
                    <div><Label>{isAr ? "الرمز" : "Symbol"}</Label><Input value={editAsset?.symbol || ""} onChange={e => setEditAsset(a => ({ ...a, symbol: e.target.value.toUpperCase() }))} /></div>
                    <div><Label>{isAr ? "النوع" : "Category"}</Label><select value={editAsset?.category || "crypto"} onChange={e => setEditAsset(a => ({ ...a, category: e.target.value }))} className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                      {["crypto", "commodity", "metal", "energy", "stock", "forex", "plan", "service"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select></div>
                    <div><Label>{isAr ? "السعر" : "Price"}</Label><Input type="number" value={editAsset?.current_price || 0} onChange={e => setEditAsset(a => ({ ...a, current_price: Number(e.target.value) }))} /></div>
                    <div><Label>{isAr ? "نسبة الربح %" : "Profit %"}</Label><Input type="number" value={editAsset?.profit_rate || 0} onChange={e => setEditAsset(a => ({ ...a, profit_rate: Number(e.target.value) }))} /></div>
                    <div><Label>{isAr ? "الحد الأدنى" : "Minimum"}</Label><Input type="number" value={editAsset?.min_trade_amount || 0} onChange={e => setEditAsset(a => ({ ...a, min_trade_amount: Number(e.target.value) }))} /></div>
                    <div className="md:col-span-2"><Label>{isAr ? "الوصف" : "Description"}</Label><Textarea value={editAsset?.description || ""} onChange={e => setEditAsset(a => ({ ...a, description: e.target.value }))} /></div>
                    <div className="md:col-span-2"><Label>{isAr ? "الشروط" : "Terms"}</Label><Textarea value={editAsset?.terms || ""} onChange={e => setEditAsset(a => ({ ...a, terms: e.target.value }))} /></div>
                    <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-3">
                      <Label>{isAr ? "مفعل" : "Active"}</Label>
                      <Switch checked={editAsset?.is_active ?? true} onCheckedChange={e => setEditAsset(a => ({ ...a, is_active: e }))} />
                    </div>
                  </div>
                  <Button onClick={handleAssetSave} disabled={saving} className="mt-4">
                    {saving ? <LoaderCircle className="h-4 w-4 animate-spin me-2" /> : <Save className="h-4 w-4 me-2" />}{isAr ? "حفظ" : "Save"}
                  </Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>{isAr ? "الأصل" : "Asset"}</TableHead>
                  <TableHead>{isAr ? "النوع" : "Type"}</TableHead>
                  <TableHead>{isAr ? "السعر" : "Price"}</TableHead>
                  <TableHead>{isAr ? "الربح" : "Profit"}</TableHead>
                  <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{isAr ? "تحكم" : "Actions"}</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {assets.map(a => (
                    <TableRow key={a.id}>
                      <TableCell>{a.name} <span className="text-muted-foreground">({a.symbol})</span></TableCell>
                      <TableCell><Badge variant="outline">{a.category}</Badge></TableCell>
                      <TableCell>${Number(a.current_price).toLocaleString()}</TableCell>
                      <TableCell>{a.profit_rate}%</TableCell>
                      <TableCell><Badge variant={a.is_active ? "default" : "secondary"}>{a.is_active ? (isAr ? "مفعل" : "Active") : (isAr ? "متوقف" : "Off")}</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm" onClick={() => { setEditAsset(a); setAssetDialogOpen(true); }}>{isAr ? "تعديل" : "Edit"}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader><CardTitle>{isAr ? "طلبات السوق" : "Market Orders"}</CardTitle></CardHeader>
            <CardContent>
              {orders.length === 0 ? <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد طلبات" : "No orders"}</p> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>{isAr ? "العميل" : "Client"}</TableHead>
                    <TableHead>{isAr ? "الأصل" : "Asset"}</TableHead>
                    <TableHead>{isAr ? "النوع" : "Type"}</TableHead>
                    <TableHead>{isAr ? "المبلغ" : "Amount"}</TableHead>
                    <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
                    <TableHead>{isAr ? "تحكم" : "Actions"}</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {orders.map(o => (
                      <TableRow key={o.id}>
                        <TableCell>{getProfile(o.user_id)?.full_name || getProfile(o.user_id)?.email || "-"}</TableCell>
                        <TableCell>{getAsset(o.asset_id)?.symbol || "-"}</TableCell>
                        <TableCell>{o.order_type}</TableCell>
                        <TableCell>${Number(o.amount).toLocaleString()}</TableCell>
                        <TableCell><Badge variant={o.status === "approved" || o.status === "completed" ? "default" : o.status === "rejected" ? "destructive" : "secondary"}>{o.status}</Badge></TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Input className="h-9 w-28" placeholder={isAr ? "ملاحظة" : "Note"} value={orderNotes[o.id] ?? o.admin_note ?? ""} onChange={e => setOrderNotes(n => ({ ...n, [o.id]: e.target.value }))} />
                            <Button size="sm" onClick={() => handleOrderAction(o, "approved")}>{isAr ? "قبول" : "Approve"}</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleOrderAction(o, "rejected")}>{isAr ? "رفض" : "Reject"}</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profits">
          <Card>
            <CardHeader><CardTitle>{isAr ? "أرباح العملاء" : "Client Holdings & Profits"}</CardTitle></CardHeader>
            <CardContent>
              {holdings.length === 0 ? <p className="text-center text-muted-foreground py-8">{isAr ? "لا توجد ممتلكات" : "No holdings"}</p> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>{isAr ? "العميل" : "Client"}</TableHead>
                    <TableHead>{isAr ? "الأصل" : "Asset"}</TableHead>
                    <TableHead>{isAr ? "الاستثمار" : "Invested"}</TableHead>
                    <TableHead>{isAr ? "الكمية" : "Quantity"}</TableHead>
                    <TableHead>{isAr ? "الربح" : "Profit"}</TableHead>
                    <TableHead>{isAr ? "حفظ" : "Save"}</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {holdings.map(h => (
                      <TableRow key={h.id}>
                        <TableCell>{getProfile(h.user_id)?.full_name || getProfile(h.user_id)?.email || "-"}</TableCell>
                        <TableCell>{getAsset(h.asset_id)?.symbol || "-"}</TableCell>
                        <TableCell>${Number(h.invested_amount).toLocaleString()}</TableCell>
                        <TableCell>{Number(h.quantity).toLocaleString(undefined, { maximumFractionDigits: 6 })}</TableCell>
                        <TableCell><Input type="number" className="w-32" value={profitInputs[h.id] ?? h.profit_amount ?? 0} onChange={e => setProfitInputs(p => ({ ...p, [h.id]: Number(e.target.value) }))} /></TableCell>
                        <TableCell><Button size="sm" onClick={async () => {
                          const val = Number(profitInputs[h.id] ?? h.profit_amount ?? 0);
                          const { error } = await supabase.from("client_market_holdings").update({ profit_amount: val }).eq("id", h.id);
                          if (error) toast({ title: isAr ? "خطأ" : "Error", variant: "destructive" });
                          else { toast({ title: "Updated" }); await fetchData(); }
                        }}>{isAr ? "حفظ" : "Save"}</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isAr ? "محافظ الدفع" : "Payment Wallets"}</CardTitle>
              <Dialog open={walletDialogOpen} onOpenChange={o => { setWalletDialogOpen(o); if (!o) setEditWallet(null); }}>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditWallet({ crypto_symbol: "", network: "", wallet_address: "", instructions: "", is_active: true })}>
                    <Plus className="h-4 w-4 me-2" />{isAr ? "إضافة" : "Add"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{isAr ? "محفظة دفع" : "Payment Wallet"}</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div><Label>{isAr ? "العملة" : "Crypto"}</Label><Input value={editWallet?.crypto_symbol || ""} onChange={e => setEditWallet(w => ({ ...w, crypto_symbol: e.target.value.toUpperCase() }))} /></div>
                    <div><Label>{isAr ? "الشبكة" : "Network"}</Label><Input value={editWallet?.network || ""} onChange={e => setEditWallet(w => ({ ...w, network: e.target.value }))} /></div>
                    <div><Label>{isAr ? "العنوان" : "Address"}</Label><Textarea value={editWallet?.wallet_address || ""} onChange={e => setEditWallet(w => ({ ...w, wallet_address: e.target.value }))} /></div>
                    <div><Label>{isAr ? "تعليمات" : "Instructions"}</Label><Textarea value={editWallet?.instructions || ""} onChange={e => setEditWallet(w => ({ ...w, instructions: e.target.value }))} /></div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <Label>{isAr ? "مفعلة" : "Active"}</Label>
                      <Switch checked={editWallet?.is_active ?? true} onCheckedChange={e => setEditWallet(w => ({ ...w, is_active: e }))} />
                    </div>
                    <Button onClick={handleWalletSave} disabled={saving} className="w-full">
                      {saving ? <LoaderCircle className="h-4 w-4 animate-spin me-2" /> : <Save className="h-4 w-4 me-2" />}{isAr ? "حفظ" : "Save"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow>
                  <TableHead>{isAr ? "العملة" : "Crypto"}</TableHead>
                  <TableHead>{isAr ? "الشبكة" : "Network"}</TableHead>
                  <TableHead>{isAr ? "العنوان" : "Address"}</TableHead>
                  <TableHead>{isAr ? "الحالة" : "Status"}</TableHead>
                  <TableHead>{isAr ? "تحكم" : "Actions"}</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {paymentWallets.map(w => (
                    <TableRow key={w.id}>
                      <TableCell>{w.crypto_symbol}</TableCell>
                      <TableCell>{w.network}</TableCell>
                      <TableCell className="font-mono text-xs max-w-[280px] truncate">{w.wallet_address}</TableCell>
                      <TableCell><Badge variant={w.is_active ? "default" : "secondary"}>{w.is_active ? (isAr ? "مفعلة" : "Active") : (isAr ? "متوقفة" : "Off")}</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm" onClick={() => { setEditWallet(w); setWalletDialogOpen(true); }}>{isAr ? "تعديل" : "Edit"}</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}