import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { ChartLine, TrendingUp, Coins, Fuel, DollarSign, BarChart3 } from "lucide-react";

const categories = {
  metals: {
    en: "Gold & Metals",
    ar: "الذهب والمعادن",
    icon: Coins,
    assets: [
      { id: "xau", symbol: "OANDA:XAUUSD", nameEn: "Gold (XAU/USD)", nameAr: "الذهب", descEn: "Spot Gold vs US Dollar", descAr: "الذهب مقابل الدولار", interval: "60" },
      { id: "xag", symbol: "OANDA:XAGUSD", nameEn: "Silver (XAG/USD)", nameAr: "الفضة", descEn: "Spot Silver vs US Dollar", descAr: "الفضة مقابل الدولار", interval: "240" },
      { id: "xpt", symbol: "OANDA:XPTUSD", nameEn: "Platinum (XPT/USD)", nameAr: "البلاتين", descEn: "Spot Platinum vs US Dollar", descAr: "البلاتين مقابل الدولار", interval: "240" },
    ],
  },
  oil: {
    en: "Oil & Energy",
    ar: "النفط والطاقة",
    icon: Fuel,
    assets: [
      { id: "wti", symbol: "TVC:USOIL", nameEn: "Crude Oil WTI", nameAr: "نفط WTI", descEn: "West Texas Intermediate", descAr: "خام غرب تكساس", interval: "60" },
      { id: "brent", symbol: "TVC:UKOIL", nameEn: "Brent Oil", nameAr: "نفط برنت", descEn: "Brent Crude (UK)", descAr: "خام برنت", interval: "240" },
      { id: "ngas", symbol: "TVC:GAS", nameEn: "Natural Gas", nameAr: "الغاز الطبيعي", descEn: "Henry Hub Natural Gas", descAr: "الغاز الطبيعي", interval: "240" },
    ],
  },
  forex: {
    en: "Forex Majors",
    ar: "الفوركس",
    icon: DollarSign,
    assets: [
      { id: "eurusd", symbol: "FX:EURUSD", nameEn: "Euro / US Dollar", nameAr: "يورو/دولار", descEn: "Euro vs US Dollar", descAr: "اليورو مقابل الدولار", interval: "60" },
      { id: "gbpusd", symbol: "FX:GBPUSD", nameEn: "Pound / US Dollar", nameAr: "جنيه/دولار", descEn: "British Pound vs US Dollar", descAr: "الجنيه مقابل الدولار", interval: "240" },
      { id: "usdjpy", symbol: "FX:USDJPY", nameEn: "Dollar / Yen", nameAr: "دولار/ين", descEn: "US Dollar vs Japanese Yen", descAr: "الدولار مقابل الين", interval: "240" },
    ],
  },
  indices: {
    en: "Global Indices",
    ar: "المؤشرات العالمية",
    icon: BarChart3,
    assets: [
      { id: "spx", symbol: "FOREXCOM:SPXUSD", nameEn: "S&P 500", nameAr: "إس آند بي 500", descEn: "US Large Cap Index", descAr: "مؤشر الأسهم الأمريكية", interval: "60" },
      { id: "nasdaq", symbol: "FOREXCOM:NSXUSD", nameEn: "NASDAQ 100", nameAr: "ناسداك 100", descEn: "US Tech Index", descAr: "مؤشر التكنولوجيا", interval: "240" },
      { id: "dji", symbol: "FOREXCOM:DJI", nameEn: "Dow Jones", nameAr: "داو جونز", descEn: "Dow Jones Industrial Average", descAr: "مؤشر داو جونز", interval: "240" },
    ],
  },
};

const tickerSymbols = [
  { proName: "OANDA:XAUUSD", title: "Gold" },
  { proName: "OANDA:XAGUSD", title: "Silver" },
  { proName: "TVC:USOIL", title: "WTI" },
  { proName: "TVC:UKOIL", title: "Brent" },
  { proName: "FX:EURUSD", title: "EUR/USD" },
  { proName: "FX:GBPUSD", title: "GBP/USD" },
  { proName: "FX:USDJPY", title: "USD/JPY" },
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
  { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
  { proName: "FOREXCOM:DJI", title: "Dow Jones" },
];

function TradingViewWidget({ symbol, interval = "60", height = 520 }) {
  const { language } = useLanguage();
  const containerId = `tv-chart-${symbol.replace(/[^a-zA-Z0-9]/g, "")}-${Math.random().toString(36).slice(2, 7)}`;
  const config = {
    autosize: true,
    symbol,
    interval,
    timezone: "Etc/UTC",
    theme: "light",
    style: "1",
    allow_symbol_change: false,
    hide_top_toolbar: false,
    hide_legend: false,
    withdateranges: true,
    save_image: false,
    backgroundColor: "rgba(255, 255, 255, 1)",
    gridColor: "rgba(220, 230, 245, 0.6)",
    support_host: "https://www.tradingview.com",
    locale: language === "ar" ? "ar" : "en",
  };
  const src = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=${language === "ar" ? "ar" : "en"}#${encodeURIComponent(JSON.stringify(config))}`;

  return (
    <div className="tradingview-widget-container" style={{ height, width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}>
        <iframe scrolling="no" allowtransparency="true" frameBorder="0"
          src={src}
          title="advanced chart TradingView widget"
          lang={language === "ar" ? "ar" : "en"}
          style={{ userSelect: "none", boxSizing: "border-box", display: "block", height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}

export function DashboardMarkets() {
  const { language, isRTL } = useLanguage();
  const isAr = language === "ar";
  const [activeTab, setActiveTab] = useState("metals");
  const [activeAsset, setActiveAsset] = useState(categories.metals.assets[0].id);
  const currentCat = categories[activeTab];
  const currentAsset = currentCat?.assets.find(a => a.id === activeAsset) || currentCat?.assets[0];

  const tickerSrc = `https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=${language === "ar" ? "ar" : "en"}#${encodeURIComponent(JSON.stringify({
    symbols: tickerSymbols,
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: "adaptive",
    colorTheme: "light",
    width: "100%",
    height: 44,
    utm_source: "iblock-chain.com",
    utm_medium: "widget",
    utm_campaign: "ticker-tape",
    page_uri: "iblock-chain.com/dashboard/markets",
  }))}`;

  return (
    <div className="space-y-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
            <ChartLine className="h-7 w-7 text-primary" />
            {isAr ? "الأسواق الحية العالمية" : "Live Global Markets"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isAr ? "رسوم بيانية مباشرة احترافية: الذهب، النفط، الفوركس والمؤشرات العالمية" : "Professional live charts: gold, oil, forex & global indices"}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700">{isAr ? "بث مباشر" : "Live Stream"}</span>
        </div>
      </div>

      <Card className="glass-card overflow-hidden">
        <div className="p-2">
          <div className="tradingview-widget-container" style={{ width: "100%", height: 44 }}>
            <iframe scrolling="no" allowtransparency="true" frameBorder="0"
              src={tickerSrc}
              title="ticker tape TradingView widget"
              lang={language === "ar" ? "ar" : "en"}
              style={{ userSelect: "none", boxSizing: "border-box", display: "block", height: 44, width: "100%" }}
            />
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setActiveAsset(categories[v]?.assets[0]?.id); }}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1 glass-card">
          {Object.entries(categories).map(([key, cat]) => (
            <TabsTrigger key={key} value={key}
              className="flex items-center gap-2 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <cat.icon className="h-4 w-4" />
              <span className="text-xs md:text-sm">{isAr ? cat.ar : cat.en}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(categories).map(([key, cat]) => (
          <TabsContent key={key} value={key} className="space-y-4 mt-4">
            <div className="flex flex-wrap gap-2">
              {cat.assets.map(a => (
                <Button
                  key={a.id}
                  variant={activeAsset === a.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveAsset(a.id)}
                  className="rounded-full"
                >
                  {isAr ? a.nameAr : a.nameEn}
                </Button>
              ))}
            </div>

            {currentAsset && activeTab === key && (
              <Card className="glass-card overflow-hidden">
                <CardHeader className="pb-3 border-b border-border/40">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {isAr ? currentAsset.nameAr : currentAsset.nameEn}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{isAr ? currentAsset.descAr : currentAsset.descEn}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <TradingViewWidget symbol={currentAsset.symbol} interval={currentAsset.interval} height={520} />
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cat.assets.filter(a => a.id !== activeAsset).map(a => (
                <Card key={a.id} className="glass-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{isAr ? a.nameAr : a.nameEn}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <TradingViewWidget symbol={a.symbol} interval={a.interval} height={300} />
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