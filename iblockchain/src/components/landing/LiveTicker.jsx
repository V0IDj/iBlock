import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const defaultPrices = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400", price: 63006, change: -1.69 },
  { id: "ethereum", symbol: "eth", name: "Ethereum", image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628", price: 1835.12, change: -2.65 },
  { id: "tether", symbol: "usdt", name: "Tether", image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661", price: 0.999, change: -0.02 },
  { id: "binancecoin", symbol: "bnb", name: "BNB", image: "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970", price: 564.49, change: -2.18 },
  { id: "ripple", symbol: "xrp", name: "XRP", image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442", price: 1.09, change: -1.86 },
  { id: "solana", symbol: "sol", name: "Solana", image: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756", price: 74.68, change: -1.85 },
  { id: "tron", symbol: "trx", name: "TRON", image: "https://coin-images.coingecko.com/coins/images/1094/large/photo_2026-04-13_09-59-16.png?1776048311", price: 0.322, change: -0.36 },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", image: "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409", price: 0.0718, change: -1.90 },
  { id: "cardano", symbol: "ada", name: "Cardano", image: "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090", price: 0.161, change: -0.58 },
  { id: "avalanche-2", symbol: "avax", name: "Avalanche", image: "https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369", price: 6.49, change: -1.25 },
];

export function LiveTicker() {
  const [prices, setPrices] = useState(defaultPrices);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const ids = defaultPrices.map((p) => p.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setPrices(
            data.map((coin) => ({
              id: coin.id,
              symbol: coin.symbol,
              name: coin.name,
              image: coin.image,
              price: coin.current_price,
              change: coin.price_change_percentage_24h || 0,
            }))
          );
        }
      } catch {}
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...prices, ...prices];

  return (
    <section className="py-8 border-y border-border/50 overflow-hidden">
      <div className="flex items-center gap-4 mb-4 px-4">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase shrink-0">
          LIVE
        </span>
        <div className="h-px flex-1 bg-border/50" />
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {tickerItems.map((coin, i) => (
            <div
              key={`${coin.id}-${i}`}
              className="flex items-center gap-3 shrink-0"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-6 h-6 rounded-full"
                loading="lazy"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase">
                    {coin.symbol}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {coin.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-xs ${
                      coin.change >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    {coin.change >= 0 ? "+" : ""}
                    {coin.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
