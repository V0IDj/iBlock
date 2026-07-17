import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as r
} from "./index-DwXWGlRe.js";
import {
    m as o
} from "./vendor-motion-CQ1Esm1h.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const a = ["Chainlink", "CoinBase", "Binance", "Ledger", "MetaMask", "Trezor"],
    i = () => {
        const {
            language: i
        } = r();
        return e.jsx("div", {
            className: "py-12 border-y border-border bg-card/30 overflow-hidden",
            children: e.jsxs("div", {
                className: "container mx-auto px-4",
                children: [e.jsx(o.p, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    className: "text-center text-sm text-muted-foreground mb-8",
                    children: "ar" === i ? "تم عرضنا على أبرز المنصات العالمية" : "Featured on major global platforms"
                }), e.jsx("div", {
                    className: "flex items-center justify-center gap-6 md:gap-12 flex-wrap",
                    children: a.map((r, a) => e.jsx(o.div, {
                        initial: {
                            opacity: 0,
                            x: -20
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .4,
                            delay: .08 * a
                        },
                        whileHover: {
                            scale: 1.1,
                            y: -4
                        },
                        className: "px-5 py-2.5 rounded-xl border border-border bg-card/60 shadow-sm backdrop-blur-sm",
                        children: e.jsx("span", {
                            className: "text-sm font-bold text-muted-foreground/60 tracking-wider",
                            children: r
                        })
                    }, r))
                })]
            })
        })
    };
export {
    i as
    default
};