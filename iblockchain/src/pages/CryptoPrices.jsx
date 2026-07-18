import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { EnhancedFooter } from "../components/landing/EnhancedFooter";
import { Globe, ArrowLeft, Search } from "lucide-react";

export function CryptoPrices() {
  const { t, isRTL, toggleLanguage, language } = useLanguage();
  const [prices, setPrices] = useState([]);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h"
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setPrices(data);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (e) { console.warn("Failed to fetch prices:", e); }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = prices.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <nav className="glass-nav sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Globe className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">iBlockchain</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleLanguage}>
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/auth">{t("nav.login")}</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{language === "ar" ? "أسعار العملات الرقمية" : "Cryptocurrency Prices"}</h1>
            <p className="text-muted-foreground">{language === "ar" ? "أسعار حية من السوق العالمي" : "Live prices from the global market"}</p>
            {lastUpdated && (
              <p className="text-xs text-muted-foreground mt-1">
                {language === "ar" ? "آخر تحديث: " : "Last updated: "}{lastUpdated}
              </p>
            )}
          </motion.div>

          <div className="relative mb-6 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("common.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">#</th>
                    <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase">{language === "ar" ? "العملة" : "Coin"}</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">{language === "ar" ? "السعر" : "Price"}</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase">24h</th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">
                      {language === "ar" ? "القيمة السوقية" : "Market Cap"}
                    </th>
                    <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">
                      {language === "ar" ? "الحجم" : "Volume"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((coin, i) => (
                    <motion.tr
                      key={coin.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-sm">{coin.market_cap_rank}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-medium text-sm">{coin.name}</div>
                            <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right text-sm font-medium">
                        ${coin.current_price?.toLocaleString()}
                      </td>
                      <td className={`p-4 text-right text-sm ${coin.price_change_percentage_24h >= 0 ? "text-success" : "text-destructive"}`}>
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                      <td className="p-4 text-right text-sm text-muted-foreground hidden md:table-cell">
                        ${(coin.market_cap / 1e9)?.toFixed(2)}B
                      </td>
                      <td className="p-4 text-right text-sm text-muted-foreground hidden md:table-cell">
                        ${(coin.total_volume / 1e9)?.toFixed(2)}B
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            {language === "ar" ? "البيانات مقدمة من CoinGecko • يتم التحديث كل 60 ثانية" : "Data provided by CoinGecko • Updates every 60 seconds"}
          </p>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
