import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { supabase } from "../lib/supabase";
import { Store, LoaderCircle } from "lucide-react";

export function AdminMarket() {
  const { language } = useLanguage();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAr = language === "ar";

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("market_assets").select("*").order("created_at", { ascending: false });
      if (data) setAssets(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="py-12 flex justify-center"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Store className="h-5 w-5" />{isAr ? "إدارة السوق" : "Market Management"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b">
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الأصل" : "Asset"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "النوع" : "Category"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "السعر" : "Price"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الربح" : "Profit"}</th>
              <th className="p-4 text-left font-medium text-muted-foreground">{isAr ? "الحالة" : "Status"}</th>
            </tr></thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id} className="border-b hover:bg-muted/30">
                  <td className="p-4 font-medium">{a.name} <span className="text-muted-foreground">({a.symbol})</span></td>
                  <td className="p-4"><Badge variant="outline">{a.category}</Badge></td>
                  <td className="p-4">${Number(a.current_price).toLocaleString()}</td>
                  <td className="p-4">{a.profit_rate}%</td>
                  <td className="p-4"><Badge variant={a.is_active ? "default" : "secondary"}>{a.is_active ? (isAr ? "مفعل" : "Active") : (isAr ? "متوقف" : "Off")}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}