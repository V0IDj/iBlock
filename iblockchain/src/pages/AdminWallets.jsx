import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAdmin } from "../contexts/AdminContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Badge } from "../components/ui/Badge";
import { Switch } from "../components/ui/Switch";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Wallet, Plus, Save, Trash2, LoaderCircle } from "lucide-react";

const coinMeta = {
  ETH: { color: "from-blue-500 to-indigo-600", icon: "Ξ" }, USDT: { color: "from-emerald-500 to-green-600", icon: "₮" },
  SOL: { color: "from-purple-500 to-violet-600", icon: "◎" }, BTC: { color: "from-orange-500 to-yellow-600", icon: "₿" },
  TRX: { color: "from-red-500 to-rose-600", icon: "₮" },
};

export function AdminWallets() {
  const { language } = useLanguage();
  const { isSuperAdmin } = useAdmin();
  const { toast } = useToast();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [newWallet, setNewWallet] = useState({ crypto_name: "", crypto_symbol: "", wallet_address: "", network: "" });
  const [saving, setSaving] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const isAr = language === "ar";

  useEffect(() => { fetchWallets(); }, []);

  const fetchWallets = async () => {
    const { data } = await supabase.from("deposit_wallets").select("*").order("created_at", { ascending: true });
    if (data) setWallets(data);
    setLoading(false);
  };

  const updateWallet = async (id, field, value) => {
    setWallets(w => w.map(w => w.id === id ? { ...w, [field]: value } : w));
  };

  const saveWallet = async (wallet) => {
    setSavingId(wallet.id);
    const { error } = await supabase.from("deposit_wallets").update({ wallet_address: wallet.wallet_address, network: wallet.network, is_active: wallet.is_active }).eq("id", wallet.id);
    toast(error ? { title: isAr ? "خطأ" : "Error", variant: "destructive" } : { title: "Saved", description: `${wallet.crypto_symbol} updated` });
    setSavingId(null);
  };

  const deleteWallet = async (wallet) => {
    if (!confirm(isAr ? `هل تريد حذف محفظة ${wallet.crypto_symbol}؟` : `Delete ${wallet.crypto_symbol} wallet?`)) return;
    const { error } = await supabase.from("deposit_wallets").delete().eq("id", wallet.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); setWallets(w => w.filter(w => w.id !== wallet.id)); }
  };

  const addWallet = async () => {
    if (!newWallet.crypto_name || !newWallet.crypto_symbol || !newWallet.wallet_address || !newWallet.network) {
      toast({ title: "Error", description: "All fields required", variant: "destructive" }); return;
    }
    setSaving(true);
    const { error } = await supabase.from("deposit_wallets").insert({ crypto_name: newWallet.crypto_name, crypto_symbol: newWallet.crypto_symbol.toUpperCase(), wallet_address: newWallet.wallet_address, network: newWallet.network, is_active: true });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Added" }); setAddMode(false); setNewWallet({ crypto_name: "", crypto_symbol: "", wallet_address: "", network: "" }); fetchWallets(); }
    setSaving(false);
  };

  if (loading) return <p className="text-center text-muted-foreground py-8">{isAr ? "جاري التحميل..." : "Loading..."}</p>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" />{isAr ? "إدارة المحافظ" : "Wallet Management"}</CardTitle>
          <Button onClick={() => setAddMode(!addMode)} variant={addMode ? "secondary" : "default"} size="sm">
            <Plus className="h-4 w-4 mr-1" />{isAr ? "إضافة" : "Add"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {addMode && (
          <div className="border-2 border-dashed border-primary/40 rounded-xl p-4 space-y-4 bg-primary/5">
            <h4 className="font-semibold text-sm">{isAr ? "إضافة محفظة جديدة" : "Add New Wallet"}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label className="text-xs">{isAr ? "اسم العملة" : "Currency Name"}</Label><Input value={newWallet.crypto_name} onChange={e => setNewWallet(w => ({ ...w, crypto_name: e.target.value }))} className="mt-1" /></div>
              <div><Label className="text-xs">{isAr ? "الرمز" : "Symbol"}</Label><Input value={newWallet.crypto_symbol} onChange={e => setNewWallet(w => ({ ...w, crypto_symbol: e.target.value }))} className="mt-1" dir="ltr" /></div>
              <div><Label className="text-xs">{isAr ? "عنوان المحفظة" : "Wallet Address"}</Label><Input value={newWallet.wallet_address} onChange={e => setNewWallet(w => ({ ...w, wallet_address: e.target.value }))} className="mt-1 font-mono" dir="ltr" /></div>
              <div><Label className="text-xs">{isAr ? "الشبكة" : "Network"}</Label><Input value={newWallet.network} onChange={e => setNewWallet(w => ({ ...w, network: e.target.value }))} className="mt-1" dir="ltr" /></div>
            </div>
            <Button onClick={addWallet} disabled={saving} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />{saving ? (isAr ? "جاري..." : "Adding...") : (isAr ? "إضافة المحفظة" : "Add Wallet")}
            </Button>
          </div>
        )}
        {wallets.map(w => {
          const meta = coinMeta[w.crypto_symbol] || { color: "from-gray-500 to-gray-600", icon: w.crypto_symbol.charAt(0) };
          return (
            <div key={w.id} className="border rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center text-white font-bold text-lg`}>{meta.icon}</div>
                  <div><p className="font-semibold">{w.crypto_name} ({w.crypto_symbol})</p><Badge variant={w.is_active ? "default" : "secondary"}>{w.is_active ? (isAr ? "نشط" : "Active") : (isAr ? "غير نشط" : "Inactive")}</Badge></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${w.id}`} className="text-sm">{isAr ? "نشط" : "Active"}</Label>
                    <Switch id={`active-${w.id}`} checked={w.is_active} onCheckedChange={e => updateWallet(w.id, "is_active", e)} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>{isAr ? "العنوان" : "Address"}</Label><Input value={w.wallet_address} onChange={e => updateWallet(w.id, "wallet_address", e.target.value)} className="font-mono text-sm" dir="ltr" /></div>
                <div><Label>{isAr ? "الشبكة" : "Network"}</Label><Input value={w.network} onChange={e => updateWallet(w.id, "network", e.target.value)} dir="ltr" /></div>
              </div>
              <Button onClick={() => saveWallet(w)} disabled={savingId === w.id} className="w-full sm:w-auto">
                <Save className="h-4 w-4 mr-2" />{savingId === w.id ? (isAr ? "جاري الحفظ..." : "Saving...") : (isAr ? "حفظ التغييرات" : "Save Changes")}
              </Button>
              {isSuperAdmin && <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteWallet(w)}><Trash2 className="h-4 w-4" /></Button>}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}