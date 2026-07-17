import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/useToast";
import { Copy, Check, Upload, Image, LoaderCircle, ArrowDownToLine } from "lucide-react";

const cryptoImages = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  BNB: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  TRX: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
  LTC: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
  TON: "https://assets.coingecko.com/coins/images/17980/small/ton_symbol.png",
  USDC: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
};

export function DashboardDeposit() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [wallets, setWallets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef(null);
  const isAr = language === "ar";

  useEffect(() => { fetchWallets(); }, []);

  const fetchWallets = async () => {
    const { data } = await supabase.from("deposit_wallets").select("id, crypto_name, crypto_symbol, wallet_address, network").eq("is_active", true);
    if (data) setWallets(data);
  };

  const activeWallet = wallets.find(w => w.crypto_symbol === selected);
  const uniqueSymbols = [...new Set(wallets.map(w => w.crypto_symbol))];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{isAr ? "إيداع" : "Deposit"}</h1>
        <p className="text-muted-foreground mt-1">{isAr ? "اختر العملة وأرسل إثبات التحويل" : "Select currency and submit transfer proof"}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {uniqueSymbols.map(sym => {
          const img = cryptoImages[sym];
          return (
            <button key={sym} onClick={() => setSelected(sym)}
              className={`relative p-4 rounded-xl border-2 transition-all text-center ${selected === sym ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50"}`}
            >
              {img ? <img src={img} alt={sym} className="w-10 h-10 mx-auto rounded-full mb-2" /> :
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-2">{sym.charAt(0)}</div>}
              <p className="font-semibold text-sm">{sym}</p>
              <p className="text-xs text-muted-foreground">{wallets.find(w => w.crypto_symbol === sym)?.crypto_name}</p>
            </button>
          );
        })}
      </div>

      {activeWallet && (
        <Card className="p-4 bg-muted/50">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">{isAr ? "الشبكة" : "Network"}</p>
              <p className="text-sm font-medium">{activeWallet.network}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{isAr ? "عنوان المحفظة" : "Wallet Address"}</p>
              <div className="flex items-center gap-2 bg-background rounded-lg p-3 border">
                <p className="text-xs font-mono flex-1 break-all">{activeWallet.wallet_address}</p>
                <button onClick={() => { navigator.clipboard.writeText(activeWallet.wallet_address); setCopiedId(activeWallet.id); toast({ title: isAr ? "تم النسخ" : "Copied" }); setTimeout(() => setCopiedId(null), 2000); }}
                  className="shrink-0 p-2 hover:bg-muted rounded-md transition-colors">
                  {copiedId === activeWallet.id ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2">
              ⚠️ {isAr ? "تأكد من إرسال العملة على الشبكة الصحيحة" : "Make sure to send on the correct network"}
            </p>
          </div>
        </Card>
      )}

      <Card className="p-4 border-dashed border-2 border-primary/30 bg-primary/5">
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-center">{isAr ? "بعد التحويل، ارفع إيصال الدفع" : "After transfer, upload payment receipt"}</h4>
          <div>
            <Label className="text-xs">{isAr ? "المبلغ المحوّل" : "Amount Transferred"}</Label>
            <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">{isAr ? "رقم المعاملة (اختياري)" : "TX Hash (optional)"}</Label>
            <Input placeholder="0x..." value={txHash} onChange={e => setTxHash(e.target.value)} className="mt-1 font-mono text-xs" />
          </div>
          <div>
            <Label className="text-xs">{isAr ? "صورة الإيصال" : "Receipt Image"}</Label>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={e => {
              const file = e.target.files?.[0]; if (!file) return;
              if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) { toast({ title: "Error", description: "Please upload an image", variant: "destructive" }); return; }
              if (file.size > 5242880) { toast({ title: "Error", description: "Max 5MB", variant: "destructive" }); return; }
              setReceipt(file); const r = new FileReader(); r.onloadend = () => setReceiptPreview(r.result); r.readAsDataURL(file);
            }} className="hidden" />
            {receiptPreview ? (
              <div className="mt-2 relative">
                <img src={receiptPreview} alt="Receipt" className="w-full h-40 object-cover rounded-lg border" />
                <Button variant="secondary" size="sm" className="absolute top-2 right-2" onClick={() => { setReceipt(null); setReceiptPreview(null); }}>{isAr ? "تغيير" : "Change"}</Button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} className="mt-2 w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors">
                <Image className="h-8 w-8 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{isAr ? "اضغط لرفع صورة الإيصال" : "Click to upload receipt"}</span>
              </button>
            )}
          </div>
          <Button onClick={async () => {
            if (!selected || !receipt) return; setSending(true);
            try {
              const { data: { session } } = await supabase.auth.getSession();
              if (!session?.user) return;
              const ext = (receipt.name.split(".").pop() || "jpg").toLowerCase();
              const path = `${session.user.id}/${Date.now()}.${ext}`;
              const { error: uploadErr } = await supabase.storage.from("deposit-receipts").upload(path, receipt, { contentType: receipt.type });
              if (uploadErr) throw uploadErr;
              const { error: dbErr } = await supabase.from("deposit_requests").insert({ user_id: session.user.id, crypto_symbol: selected, amount: parseFloat(amount) || 0, tx_hash: txHash || null, receipt_url: path, status: "pending" });
              if (dbErr) throw dbErr;
              toast({ title: isAr ? "تم الإرسال" : "Submitted", description: isAr ? "سيتم مراجعة طلبك" : "Your request will be reviewed" });
              setSelected(null); setReceipt(null); setReceiptPreview(null); setAmount(""); setTxHash("");
            } catch (err) { toast({ title: "Error", description: err.message, variant: "destructive" }); }
            setSending(false);
          }} disabled={!receipt || sending} className="w-full">
            {sending ? <LoaderCircle className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            {sending ? (isAr ? "جاري الإرسال..." : "Submitting...") : (isAr ? "إرسال طلب الإيداع" : "Submit Deposit Request")}
          </Button>
        </div>
      </Card>
    </div>
  );
}