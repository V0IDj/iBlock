import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { ChartLine, Coins, Fuel, DollarSign, TrendingUp } from "lucide-react";

const categories = {
  metals: { en: "Gold & Metals", ar: "الذهب والمعادن", icon: Coins, assets: [
    { id: "gold", symbol: "XAU/USD", nameEn: "Gold (XAU/USD)", nameAr: "الذهب", descEn: "Spot Gold vs US Dollar", descAr: "الذهب مقابل الدولار" },
    { id: "silver", symbol: "XAG/USD", nameEn: "Silver (XAG/USD)", nameAr: "الفضة", descEn: "Spot Silver vs US Dollar", descAr: "الفضة مقابل الدولار" },
  ]},
  oil: { en: "Oil & Energy", ar: "النفط والطاقة", icon: Fuel, assets: [
    { id: "wti", symbol: "USOIL", nameEn: "Crude Oil WTI", nameAr: "نفط WTI", descEn: "West Texas Intermediate", descAr: "خام غرب تكساس" },
    { id: "brent", symbol: "UKOIL", nameEn: "Crude Oil Brent", nameAr: "نفط برنت", descEn: "Brent Crude (UK)", descAr: "خام برنت" },
  ]},
  forex: { en: "Forex Majors", ar: "الفوركس", icon: DollarSign, assets: [
    { id: "eurusd", symbol: "EUR/USD", nameEn: "Euro / US Dollar", nameAr: "يورو/دولار", descEn: "Euro vs US Dollar", descAr: "اليورو مقابل الدولار" },
    { id: "gbpusd", symbol: "GBP/USD", nameEn: "Pound / US Dollar", nameAr: "جنيه/دولار", descEn: "British Pound vs US Dollar", descAr: "الجنيه مقابل الدولار" },
    { id: "usdjpy", symbol: "USD/JPY", nameEn: "Dollar / Yen", nameAr: "دولار/ين", descEn: "US Dollar vs Japanese Yen", descAr: "الدولار مقابل الين" },
  ]},
  indices: { en: "Global Indices", ar: "المؤشرات العالمية", icon: TrendingUp, assets: [
    { id: "spx", symbol: "S&P 500", nameEn: "S&P 500", nameAr: "إس آند بي 500", descEn: "US Large Cap Index", descAr: "مؤشر الأسهم الأمريكية" },
    { id: "nasdaq", symbol: "NASDAQ", nameEn: "NASDAQ 100", nameAr: "ناسداك 100", descEn: "US Tech Index", descAr: "مؤشر التكنولوجيا" },
    { id: "dax", symbol: "DAX 40", nameEn: "DAX 40", nameAr: "داكس", descEn: "German Stock Index", descAr: "مؤشر الأسهم الألماني" },
  ]},
};

export function DashboardMarkets() {
  const { language, isRTL } = useLanguage();
  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div><h1 className="text-2xl font-bold flex items-center gap-2"><ChartLine className="h-6 w-6" />{language === "ar" ? "الأسواق الحية" : "Live Markets"}</h1><p className="text-muted-foreground mt-1">{language === "ar" ? "أسعار حية للذهب والنفط والفوركس" : "Live prices for gold, oil, forex & indices"}</p></div>
      <Tabs defaultValue="metals">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1">
          {Object.entries(categories).map(([key, cat]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2 py-2.5">
              <cat.icon className="h-4 w-4" /><span className="text-xs md:text-sm">{language === "ar" ? cat.ar : cat.en}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(categories).map(([key, cat]) => (
          <TabsContent key={key} value={key} className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2">
              {cat.assets.map(a => (
                <Card key={a.id} className="flex-1 min-w-[200px]">
                  <CardContent className="p-4">
                    <p className="font-semibold">{language === "ar" ? a.nameAr : a.nameEn}</p>
                    <p className="text-xs text-muted-foreground mt-1">{language === "ar" ? a.descAr : a.descEn}</p>
                    <p className="text-xs text-muted-foreground mt-2 font-mono">{a.symbol}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}