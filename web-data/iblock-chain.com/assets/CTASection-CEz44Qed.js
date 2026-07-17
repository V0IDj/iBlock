import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as t,
    L as a
} from "./vendor-react-jZB-dUQe.js";
import {
    c as i,
    u as o,
    B as s
} from "./index-DwXWGlRe.js";
import {
    m as n,
    u as r,
    a as l
} from "./vendor-motion-CQ1Esm1h.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c = i("Rocket", [
        ["path", {
            d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
            key: "m3kijz"
        }],
        ["path", {
            d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
            key: "1fmvmk"
        }],
        ["path", {
            d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
            key: "1f8sc4"
        }],
        ["path", {
            d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
            key: "qeys4"
        }]
    ]),
    d = "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color",
    y = [{
        symbol: "BTC",
        icon: `${d}/btc.png`,
        color: "#F7931A",
        x: 18,
        y: 22
    }, {
        symbol: "ETH",
        icon: `${d}/eth.png`,
        color: "#627EEA",
        x: 45,
        y: 15
    }, {
        symbol: "BNB",
        icon: `${d}/bnb.png`,
        color: "#F3BA2F",
        x: 72,
        y: 25
    }, {
        symbol: "SOL",
        icon: `${d}/sol.png`,
        color: "#9945FF",
        x: 30,
        y: 50
    }, {
        symbol: "XRP",
        icon: `${d}/xrp.png`,
        color: "#00AAE4",
        x: 60,
        y: 45
    }, {
        symbol: "ADA",
        icon: `${d}/ada.png`,
        color: "#0033AD",
        x: 85,
        y: 55
    }, {
        symbol: "DOT",
        icon: `${d}/dot.png`,
        color: "#E6007A",
        x: 15,
        y: 65
    }, {
        symbol: "AVAX",
        icon: `${d}/avax.png`,
        color: "#E84142",
        x: 50,
        y: 70
    }, {
        symbol: "MATIC",
        icon: `${d}/matic.png`,
        color: "#8247E5",
        x: 78,
        y: 72
    }],
    x = [
        [0, 1],
        [1, 2],
        [0, 3],
        [1, 4],
        [2, 5],
        [3, 4],
        [4, 5],
        [3, 6],
        [4, 7],
        [5, 8],
        [6, 7],
        [7, 8],
        [0, 4],
        [1, 3],
        [2, 4],
        [6, 4],
        [7, 5],
        [3, 7]
    ];

function p({
    target: a,
    duration: i = 3
}) {
    const o = t.useRef(null),
        s = r(.85 * a);
    return t.useEffect(() => {
        const e = l(s, 1.15 * a, {
            duration: i,
            ease: "linear",
            repeat: 1 / 0,
            repeatType: "loop"
        });
        return () => e.stop()
    }, [a, i, s]), t.useEffect(() => s.on("change", e => {
        o.current && (o.current.textContent = Math.floor(e).toLocaleString())
    }), [s]), e.jsx("span", {
        ref: o,
        className: "text-[10px] font-bold text-white/90",
        children: "0"
    })
}
const h = () => {
    const {
        language: i,
        isRTL: r
    } = o(), l = t.useMemo(() => function() {
        const e = [],
            t = [{
                cx: 20,
                cy: 35,
                rx: 12,
                ry: 8,
                count: 35
            }, {
                cx: 28,
                cy: 65,
                rx: 6,
                ry: 12,
                count: 20
            }, {
                cx: 48,
                cy: 30,
                rx: 8,
                ry: 6,
                count: 30
            }, {
                cx: 50,
                cy: 55,
                rx: 8,
                ry: 12,
                count: 25
            }, {
                cx: 70,
                cy: 35,
                rx: 15,
                ry: 10,
                count: 40
            }, {
                cx: 80,
                cy: 70,
                rx: 6,
                ry: 4,
                count: 12
            }];
        for (const a of t)
            for (let t = 0; t < a.count; t++) {
                const t = Math.random() * Math.PI * 2,
                    i = Math.random();
                e.push({
                    x: a.cx + Math.cos(t) * i * a.rx,
                    y: a.cy + Math.sin(t) * i * a.ry
                })
            }
        return e
    }(), []);
    return e.jsx("section", {
        className: "py-20 px-4",
        dir: r ? "rtl" : "ltr",
        children: e.jsx("div", {
            className: "container mx-auto",
            children: e.jsxs(n.div, {
                initial: {
                    opacity: 0,
                    scale: .8
                },
                whileInView: {
                    opacity: 1,
                    scale: 1
                },
                viewport: {
                    once: !0,
                    margin: "-100px"
                },
                transition: {
                    duration: 1.2,
                    type: "spring",
                    bounce: .15
                },
                className: "relative overflow-hidden rounded-[2rem] min-h-[500px] flex items-center justify-center",
                style: {
                    background: "linear-gradient(135deg, hsl(158 80% 8%) 0%, hsl(158 60% 12%) 30%, hsl(158 50% 10%) 60%, hsl(158 70% 6%) 100%)"
                },
                children: [e.jsx("div", {
                    className: "absolute inset-0 z-0",
                    children: e.jsx(n.svg, {
                        viewBox: "0 0 100 100",
                        className: "absolute inset-0 w-full h-full",
                        preserveAspectRatio: "xMidYMid slice",
                        initial: {
                            opacity: 0,
                            scale: .7
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: 2,
                            delay: .3
                        },
                        children: l.map((t, a) => e.jsx(n.circle, {
                            cx: t.x,
                            cy: t.y,
                            r: .3,
                            fill: "hsl(158 40% 50%)",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: [.15, .5, .15]
                            },
                            transition: {
                                duration: 3 + 2 * Math.random(),
                                repeat: 1 / 0,
                                delay: 2 * Math.random()
                            }
                        }, `wd-${a}`))
                    })
                }), e.jsxs("div", {
                    className: "absolute inset-0 z-[1]",
                    children: [e.jsxs(n.svg, {
                        viewBox: "0 0 100 100",
                        className: "absolute inset-0 w-full h-full",
                        preserveAspectRatio: "xMidYMid slice",
                        initial: {
                            opacity: 0,
                            scale: .5
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: 1.5,
                            delay: .5,
                            type: "spring"
                        },
                        children: [x.map(([t, a], i) => e.jsx(n.line, {
                            x1: y[t].x,
                            y1: y[t].y,
                            x2: y[a].x,
                            y2: y[a].y,
                            stroke: "hsl(158 60% 40%)",
                            strokeWidth: .15,
                            initial: {
                                pathLength: 0,
                                opacity: 0
                            },
                            whileInView: {
                                pathLength: 1,
                                opacity: 1
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                duration: 1.5,
                                delay: .8 + .05 * i
                            }
                        }, `line-${i}`)), x.map(([t, a], i) => e.jsx(n.circle, {
                            r: .4,
                            fill: "hsl(158 80% 60%)",
                            opacity: .7,
                            initial: {
                                cx: y[t].x,
                                cy: y[t].y
                            },
                            animate: {
                                cx: [y[t].x, y[a].x, y[t].x],
                                cy: [y[t].y, y[a].y, y[t].y],
                                opacity: [0, .8, 0]
                            },
                            transition: {
                                duration: 3 + 2 * Math.random(),
                                repeat: 1 / 0,
                                delay: 4 * Math.random(),
                                ease: "easeInOut"
                            }
                        }, `pulse-${i}`))]
                    }), y.map((t, a) => e.jsxs(n.div, {
                        className: "absolute flex flex-col items-center gap-1",
                        style: {
                            left: `${t.x}%`,
                            top: `${t.y}%`,
                            transform: "translate(-50%, -50%)"
                        },
                        initial: {
                            opacity: 0,
                            scale: 0
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            delay: 1 + .1 * a,
                            type: "spring",
                            stiffness: 200
                        },
                        children: [e.jsxs(n.div, {
                            className: "relative flex items-center justify-center",
                            animate: {
                                y: [0, -4, 0],
                                scale: [1, 1.05, 1]
                            },
                            transition: {
                                duration: 3 + 2 * Math.random(),
                                repeat: 1 / 0,
                                ease: "easeInOut",
                                delay: 2 * Math.random()
                            },
                            children: [e.jsx("div", {
                                className: "absolute w-10 h-10 rounded-full blur-lg opacity-30",
                                style: {
                                    background: t.color
                                }
                            }), e.jsx("div", {
                                className: "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border border-white/20 shadow-lg overflow-hidden",
                                style: {
                                    background: `linear-gradient(135deg, ${t.color}CC, ${t.color}88)`,
                                    boxShadow: `0 0 20px ${t.color}40`
                                },
                                children: e.jsx("img", {
                                    src: t.icon,
                                    alt: t.symbol,
                                    className: "w-5 h-5 md:w-6 md:h-6 object-contain"
                                })
                            })]
                        }), e.jsx("div", {
                            className: "bg-white/5 backdrop-blur-sm rounded px-1.5 py-0.5 border border-white/10",
                            children: e.jsx(p, {
                                target: Math.floor(1e6 + 9e6 * Math.random()),
                                duration: 6 + 4 * Math.random()
                            })
                        })]
                    }, t.symbol))]
                }), e.jsx("div", {
                    className: "absolute inset-0 z-[2] pointer-events-none",
                    style: {
                        background: "radial-gradient(ellipse at 50% 50%, transparent 30%, hsl(158 80% 4% / 0.6) 100%)"
                    }
                }), e.jsxs("div", {
                    className: "relative z-10 text-center px-6 py-16",
                    children: [e.jsx(n.h2, {
                        initial: {
                            opacity: 0,
                            y: 40
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            delay: .6,
                            duration: .8
                        },
                        className: "text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight",
                        children: "ar" === i ? "مستعد لتجربة\niBlockchain؟" : "Ready to experience\niBlockchain?"
                    }), e.jsx(n.p, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            delay: .8,
                            duration: .6
                        },
                        className: "text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed",
                        children: "ar" === i ? "انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا لإدارة أصولهم الرقمية بأمان وسهولة." : "Join thousands of users who trust our platform to manage their digital assets securely and effortlessly."
                    }), e.jsx(n.div, {
                        initial: {
                            opacity: 0,
                            scale: .7
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            delay: 1,
                            type: "spring",
                            stiffness: 200
                        },
                        children: e.jsx(a, {
                            to: "/auth?mode=signup",
                            children: e.jsx(n.div, {
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: .97
                                },
                                className: "inline-block",
                                children: e.jsxs(s, {
                                    size: "lg",
                                    className: "bg-white text-primary hover:bg-white/95 rounded-full px-12 py-6 font-bold text-lg gap-2 shadow-2xl border-0",
                                    children: [e.jsx(c, {
                                        className: "w-5 h-5"
                                    }), "ar" === i ? "ابدأ الآن" : "Get Started"]
                                })
                            })
                        })
                    })]
                })]
            })
        })
    })
};
export {
    h as
    default
};