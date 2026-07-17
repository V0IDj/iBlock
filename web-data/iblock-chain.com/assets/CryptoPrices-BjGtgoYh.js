import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as s,
    L as t
} from "./vendor-react-jZB-dUQe.js";
import {
    u as a,
    B as r,
    S as i,
    i as n,
    I as d,
    T as o,
    r as c
} from "./index-DwXWGlRe.js";
import {
    A as l
} from "./arrow-left-3vVe7vOy.js";
import {
    m
} from "./vendor-motion-CQ1Esm1h.js";
import {
    S as x
} from "./search-ByiBxgvU.js";
import {
    R as h
} from "./refresh-cw-_KbQ2FcL.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const p = e => e >= 1e12 ? `$${(e/1e12).toFixed(2)}T` : e >= 1e9 ? `$${(e/1e9).toFixed(2)}B` : e >= 1e6 ? `$${(e/1e6).toFixed(2)}M` : `$${e.toLocaleString()}`,
    u = () => {
        const {
            language: u,
            isRTL: j
        } = a(), [g, f] = s.useState([]), [v, N] = s.useState(!0), [b, y] = s.useState(""), [w, k] = s.useState(null), _ = async () => {
            try {
                const e = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,ripple,solana,tron,dogecoin,cardano,avalanche-2,polkadot,chainlink,polygon-ecosystem-token,litecoin,uniswap,stellar,monero,near,internet-computer,aptos,sui,hedera-hashgraph,filecoin,cosmos,arbitrum,optimism,aave,render-token,injective-protocol,the-graph&order=market_cap_desc&sparkline=false&price_change_percentage=24h");
                if (!e.ok) throw new Error("API error");
                const s = await e.json();
                if (null == s ? void 0 : s.length) {
                    const e = new Set,
                        t = s.filter(s => !e.has(s.id) && (e.add(s.id), !0));
                    f(t), k(new Date)
                }
            } catch {} finally {
                N(!1)
            }
        };
        s.useEffect(() => {
            _();
            const e = setInterval(_, 6e4);
            return () => clearInterval(e)
        }, []);
        const $ = g.filter(e => e.name.toLowerCase().includes(b.toLowerCase()) || e.symbol.toLowerCase().includes(b.toLowerCase()));
        return e.jsxs("div", {
            className: "min-h-screen bg-background",
            children: [e.jsx("nav", {
                className: "sticky top-0 z-50 glass border-b border-border/50",
                children: e.jsxs("div", {
                    className: "container mx-auto px-4 py-4 flex items-center justify-between",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [e.jsx(t, {
                            to: "/",
                            children: e.jsx(r, {
                                variant: "ghost",
                                size: "icon",
                                children: e.jsx(l, {
                                    className: "h-5 w-5 " + (j ? "rotate-180" : "")
                                })
                            })
                        }), e.jsxs(t, {
                            to: "/",
                            className: "flex items-center gap-2",
                            children: [e.jsx("div", {
                                className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center",
                                children: e.jsx(i, {
                                    className: "h-5 w-5 text-primary-foreground"
                                })
                            }), e.jsx("span", {
                                className: "text-xl font-bold text-foreground hidden sm:block",
                                children: "iBlockchain"
                            })]
                        })]
                    }), e.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [e.jsx(n, {}), e.jsx(t, {
                            to: "/auth",
                            children: e.jsx(r, {
                                size: "sm",
                                children: "ar" === u ? "تسجيل الدخول" : "Login"
                            })
                        })]
                    })]
                })
            }), e.jsxs("div", {
                className: "container mx-auto px-4 py-8",
                children: [e.jsxs(m.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    className: "text-center mb-8",
                    children: [e.jsx("h1", {
                        className: "text-3xl md:text-5xl font-bold text-foreground mb-3",
                        children: "ar" === u ? "أسعار العملات الرقمية" : "Cryptocurrency Prices"
                    }), e.jsx("p", {
                        className: "text-muted-foreground text-lg",
                        children: "ar" === u ? "أسعار محدثة لحظياً من السوق العالمي" : "Live prices from the global market"
                    }), w && e.jsxs("p", {
                        className: "text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1",
                        children: [e.jsx("span", {
                            className: "w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                        }), "ar" === u ? "آخر تحديث: " : "Last updated: ", w.toLocaleTimeString("ar" === u ? "ar" : "en")]
                    })]
                }), e.jsxs("div", {
                    className: "flex gap-3 mb-6 max-w-md mx-auto",
                    children: [e.jsxs("div", {
                        className: "relative flex-1",
                        children: [e.jsx(x, {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                        }), e.jsx(d, {
                            placeholder: "ar" === u ? "ابحث عن عملة..." : "Search coin...",
                            value: b,
                            onChange: e => y(e.target.value),
                            className: "pl-9"
                        })]
                    }), e.jsx(r, {
                        variant: "outline",
                        size: "icon",
                        onClick: () => {
                            N(!0), _()
                        },
                        children: e.jsx(h, {
                            className: "h-4 w-4 " + (v ? "animate-spin" : "")
                        })
                    })]
                }), e.jsxs(m.div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        delay: .1
                    },
                    className: "glass-card rounded-2xl overflow-hidden border border-border",
                    children: [e.jsxs("div", {
                        className: "hidden md:grid grid-cols-7 gap-4 px-6 py-4 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                        children: [e.jsx("div", {
                            children: "#"
                        }), e.jsx("div", {
                            className: "col-span-2",
                            children: "ar" === u ? "العملة" : "Coin"
                        }), e.jsx("div", {
                            className: "text-end",
                            children: "ar" === u ? "السعر" : "Price"
                        }), e.jsx("div", {
                            className: "text-end",
                            children: "ar" === u ? "التغيير 24س" : "24h Change"
                        }), e.jsx("div", {
                            className: "text-end",
                            children: "ar" === u ? "القيمة السوقية" : "Market Cap"
                        }), e.jsx("div", {
                            className: "text-end",
                            children: "ar" === u ? "حجم التداول" : "Volume"
                        })]
                    }), v && 0 === g.length ? e.jsxs("div", {
                        className: "py-20 text-center",
                        children: [e.jsx("div", {
                            className: "w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"
                        }), e.jsx("p", {
                            className: "text-muted-foreground",
                            children: "ar" === u ? "جاري التحميل..." : "Loading..."
                        })]
                    }) : 0 === $.length ? e.jsx("div", {
                        className: "py-20 text-center text-muted-foreground",
                        children: "ar" === u ? "لا توجد نتائج" : "No results found"
                    }) : $.map((s, t) => {
                        var a, r;
                        const i = s.price_change_percentage_24h >= 0;
                        return e.jsxs(m.div, {
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .02 * t
                            },
                            className: "grid grid-cols-3 md:grid-cols-7 gap-4 px-4 md:px-6 py-4 border-b border-border/50 hover:bg-muted/20 transition-colors items-center",
                            children: [e.jsx("div", {
                                className: "hidden md:block text-sm text-muted-foreground font-medium",
                                children: s.market_cap_rank
                            }), e.jsxs("div", {
                                className: "col-span-1 md:col-span-2 flex items-center gap-3",
                                children: [e.jsx("img", {
                                    src: s.image,
                                    alt: s.name,
                                    className: "w-8 h-8 rounded-full"
                                }), e.jsxs("div", {
                                    children: [e.jsx("p", {
                                        className: "font-semibold text-sm text-foreground",
                                        children: s.name
                                    }), e.jsx("p", {
                                        className: "text-xs text-muted-foreground uppercase",
                                        children: s.symbol
                                    })]
                                })]
                            }), e.jsxs("div", {
                                className: "text-end",
                                children: [e.jsx("p", {
                                    className: "font-semibold text-sm text-foreground",
                                    children: (n = s.current_price, n >= 1 ? `$${n.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}` : n >= .01 ? `$${n.toFixed(4)}` : `$${n.toFixed(6)}`)
                                }), e.jsx("div", {
                                    className: "md:hidden",
                                    children: e.jsxs("span", {
                                        className: "text-xs flex items-center justify-end gap-0.5 " + (i ? "text-emerald-500" : "text-red-500"),
                                        children: [i ? e.jsx(o, {
                                            className: "h-3 w-3"
                                        }) : e.jsx(c, {
                                            className: "h-3 w-3"
                                        }), i ? "+" : "", null == (a = s.price_change_percentage_24h) ? void 0 : a.toFixed(2), "%"]
                                    })
                                })]
                            }), e.jsx("div", {
                                className: "hidden md:flex items-center justify-end",
                                children: e.jsxs("span", {
                                    className: "text-sm font-medium flex items-center gap-1 " + (i ? "text-emerald-500" : "text-red-500"),
                                    children: [i ? e.jsx(o, {
                                        className: "h-4 w-4"
                                    }) : e.jsx(c, {
                                        className: "h-4 w-4"
                                    }), i ? "+" : "", null == (r = s.price_change_percentage_24h) ? void 0 : r.toFixed(2), "%"]
                                })
                            }), e.jsx("div", {
                                className: "hidden md:block text-end text-sm text-muted-foreground",
                                children: p(s.market_cap)
                            }), e.jsx("div", {
                                className: "hidden md:block text-end text-sm text-muted-foreground",
                                children: p(s.total_volume)
                            })]
                        }, s.id);
                        var n
                    })]
                }), e.jsx("p", {
                    className: "text-center text-xs text-muted-foreground mt-6",
                    children: "ar" === u ? "البيانات مقدمة من CoinGecko • يتم التحديث كل 60 ثانية" : "Data provided by CoinGecko • Updates every 60 seconds"
                })]
            })]
        })
    };
export {
    u as
    default
};