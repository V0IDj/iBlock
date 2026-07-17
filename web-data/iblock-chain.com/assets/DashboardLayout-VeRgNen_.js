import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    c as s,
    u as a,
    D as r,
    d as t,
    B as i,
    e as l,
    f as n,
    g as o,
    h as c,
    S as d,
    i as m,
    j as x,
    b as h
} from "./index-DwXWGlRe.js";
import {
    C as p,
    a as u,
    b as f,
    c as j,
    d as g
} from "./card-DPfJUZyV.js";
import {
    D as b,
    u as N
} from "./DashboardContext-Cx480iF5.js";
import {
    f as y,
    g as v,
    r as w,
    O as k
} from "./vendor-react-jZB-dUQe.js";
import {
    S as C,
    a as A,
    M,
    b as R,
    H as S
} from "./sheet-BfTmQ9Ej.js";
import {
    S as z
} from "./scroll-area-WS1BGHoV.js";
import {
    B
} from "./badge-BhWyOLsv.js";
import {
    B as L
} from "./bell-JeVR80iu.js";
import {
    A as _,
    m as D
} from "./vendor-motion-CQ1Esm1h.js";
import {
    C as q
} from "./check-check-DBkOPTyt.js";
import {
    C as T
} from "./clock-BUfi1Auh.js";
import {
    f as V
} from "./formatDistanceToNow-BHouQUBs.js";
import {
    a as O,
    e as Y
} from "./ar-B5cCq_yy.js";
import {
    M as F
} from "./message-square-BGg6T5wc.js";
import {
    L as H
} from "./log-out-DVrz8Lo2.js";
import {
    F as K
} from "./file-text-DpWW3j06.js";
import {
    U as P
} from "./user-Dvk0HarL.js";
import {
    W
} from "./wallet-y1OErQw9.js";
import {
    C as Z
} from "./chart-line-B0TdU0uc.js";
import {
    S as $
} from "./shopping-cart-XmY0oH9_.js";
import {
    A as G
} from "./arrow-down-up-C_9vcqqC.js";
import {
    C as U
} from "./coins-DQbQKXUS.js";
import {
    A as E
} from "./arrow-down-to-line-BjfOUbed.js";
import {
    A as I
} from "./arrow-up-from-line-BU6jw5rV.js";
import {
    G as J
} from "./gift-61aYnvuX.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q = s("CircleAlert", [
        ["circle", {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }],
        ["line", {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }],
        ["line", {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }]
    ]),
    X = s("Receipt", [
        ["path", {
            d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
            key: "q3az6g"
        }],
        ["path", {
            d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
            key: "1h4pet"
        }],
        ["path", {
            d: "M12 17.5v-11",
            key: "1jc1ny"
        }]
    ]),
    ee = ({
        notifications: s,
        unreadCount: d,
        onMarkAsRead: m,
        onMarkAllAsRead: x
    }) => {
        const {
            language: h,
            isRTL: p
        } = a(), u = y(), f = e => e.replace(/admin/gi, "ar" === h ? "فريق المعالجة" : "processing team").replace(/الأدمن|ادمن|للأدمن|الإدارة/g, "فريق المعالجة"), j = e => {
            try {
                return V(new Date(e), {
                    addSuffix: !0,
                    locale: "ar" === h ? O : Y
                })
            } catch {
                return ""
            }
        };
        return e.jsxs(r, {
            children: [e.jsx(t, {
                asChild: !0,
                children: e.jsxs(i, {
                    variant: "ghost",
                    size: "icon",
                    className: "relative",
                    children: [e.jsx(L, {
                        className: "h-5 w-5"
                    }), e.jsx(_, {
                        children: d > 0 && e.jsx(D.div, {
                            initial: {
                                scale: 0
                            },
                            animate: {
                                scale: 1
                            },
                            exit: {
                                scale: 0
                            },
                            className: "absolute -top-1 -right-1",
                            children: e.jsx(B, {
                                variant: "destructive",
                                className: "h-5 w-5 p-0 flex items-center justify-center text-xs animate-pulse",
                                children: d > 9 ? "9+" : d
                            })
                        })
                    })]
                })
            }), e.jsxs(l, {
                align: p ? "start" : "end",
                className: "w-80 bg-card/95 backdrop-blur-xl border-white/10",
                children: [e.jsxs("div", {
                    className: "flex items-center justify-between p-3 border-b border-border",
                    children: [e.jsx("h3", {
                        className: "font-semibold text-foreground",
                        children: "ar" === h ? "الإشعارات" : "Notifications"
                    }), d > 0 && e.jsxs(i, {
                        variant: "ghost",
                        size: "sm",
                        onClick: x,
                        className: "text-xs text-primary hover:text-primary/80",
                        children: [e.jsx(q, {
                            className: "h-4 w-4 " + (p ? "ml-1" : "mr-1")
                        }), "ar" === h ? "قراءة الكل" : "Mark all read"]
                    })]
                }), e.jsx(z, {
                    className: "h-[300px]",
                    children: 0 === s.length ? e.jsxs("div", {
                        className: "flex flex-col items-center justify-center h-[200px] text-muted-foreground",
                        children: [e.jsx(L, {
                            className: "h-10 w-10 mb-3 opacity-50"
                        }), e.jsx("p", {
                            className: "text-sm",
                            children: "ar" === h ? "لا توجد إشعارات" : "No notifications"
                        })]
                    }) : s.map(s => {
                        return e.jsx(n, {
                            className: "p-3 cursor-pointer focus:bg-accent/50 " + (s.is_read ? "" : "bg-primary/5"),
                            onClick: () => {
                                m(s.id), u(`/notification/${s.id}`)
                            },
                            children: e.jsxs("div", {
                                className: "flex items-start gap-3 w-full",
                                children: [e.jsx("div", {
                                    className: "mt-0.5",
                                    children: (a = s.title, a.includes("رسالة") || a.includes("message") ? e.jsx(F, {
                                        className: "h-4 w-4 text-primary"
                                    }) : a.includes("تنبيه") || a.includes("alert") || a.includes("رسوم") ? e.jsx(Q, {
                                        className: "h-4 w-4 text-destructive"
                                    }) : e.jsx(L, {
                                        className: "h-4 w-4 text-muted-foreground"
                                    }))
                                }), e.jsxs("div", {
                                    className: "flex-1 min-w-0",
                                    children: [e.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [e.jsx("p", {
                                            className: "font-medium text-sm truncate",
                                            children: f(s.title)
                                        }), !s.is_read && e.jsx("span", {
                                            className: "h-2 w-2 rounded-full bg-primary flex-shrink-0"
                                        })]
                                    }), e.jsx("p", {
                                        className: "text-xs text-muted-foreground mt-0.5 line-clamp-2",
                                        children: f(s.message)
                                    }), e.jsxs("div", {
                                        className: "flex items-center gap-1 mt-1 text-xs text-muted-foreground",
                                        children: [e.jsx(T, {
                                            className: "h-3 w-3"
                                        }), e.jsx("span", {
                                            children: j(s.created_at)
                                        })]
                                    })]
                                }), !s.is_read && e.jsx(o, {
                                    className: "h-4 w-4 text-muted-foreground hover:text-primary"
                                })]
                            })
                        }, s.id);
                        var a
                    })
                }), s.length > 0 && e.jsxs(e.Fragment, {
                    children: [e.jsx(c, {}), e.jsx("div", {
                        className: "p-2",
                        children: e.jsx(i, {
                            variant: "ghost",
                            size: "sm",
                            className: "w-full text-xs",
                            children: "ar" === h ? "عرض كل الإشعارات" : "View all notifications"
                        })
                    })]
                })]
            })]
        })
    },
    se = [{
        key: "overview",
        path: "/dashboard",
        icon: S
    }, {
        key: "portfolio",
        path: "/dashboard/portfolio",
        icon: W
    }, {
        key: "market",
        path: "/dashboard/market",
        icon: x
    }, {
        key: "markets",
        path: "/dashboard/markets",
        icon: Z
    }, {
        key: "buysell",
        path: "/dashboard/buy-sell",
        icon: $
    }, {
        key: "swap",
        path: "/dashboard/swap",
        icon: G
    }, {
        key: "staking",
        path: "/dashboard/staking",
        icon: U
    }, {
        key: "deposit",
        path: "/dashboard/deposit",
        icon: E
    }, {
        key: "withdrawal",
        path: "/dashboard/withdrawal",
        icon: I
    }, {
        key: "transactions",
        path: "/dashboard/transactions",
        icon: X
    }, {
        key: "referral",
        path: "/dashboard/referral",
        icon: J
    }, {
        key: "support",
        path: "/dashboard/support",
        icon: F
    }, {
        key: "notifications",
        path: "/dashboard/notifications",
        icon: L
    }, {
        key: "account",
        path: "/dashboard/account",
        icon: P
    }],
    ae = {
        overview: {
            ar: "نظرة عامة",
            en: "Overview"
        },
        portfolio: {
            ar: "المحفظة",
            en: "Portfolio"
        },
        market: {
            ar: "السوق",
            en: "Market"
        },
        markets: {
            ar: "الأسواق الحية",
            en: "Live Markets"
        },
        buysell: {
            ar: "شراء وبيع",
            en: "Buy & Sell"
        },
        swap: {
            ar: "تبادل",
            en: "Swap"
        },
        staking: {
            ar: "ستاكينغ",
            en: "Staking"
        },
        deposit: {
            ar: "إيداع",
            en: "Deposit"
        },
        withdrawal: {
            ar: "سحب",
            en: "Withdraw"
        },
        transactions: {
            ar: "المعاملات",
            en: "Transactions"
        },
        referral: {
            ar: "الإحالة",
            en: "Referral"
        },
        support: {
            ar: "الدعم",
            en: "Support"
        },
        notifications: {
            ar: "الإشعارات",
            en: "Notifications"
        },
        account: {
            ar: "حسابي",
            en: "My Account"
        }
    },
    re = () => {
        const {
            language: s,
            isRTL: r
        } = a(), {
            profile: t,
            loading: l,
            needsKyc: n,
            handleLogout: o,
            notifications: c,
            unreadCount: x,
            markAsRead: b,
            markAllAsRead: S
        } = N(), z = y(), B = v(), [L, _] = w.useState(!1);
        if (l) return e.jsx("div", {
            className: "min-h-screen bg-background flex items-center justify-center",
            children: e.jsxs("div", {
                className: "text-center",
                children: [e.jsx("div", {
                    className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse",
                    children: e.jsx(d, {
                        className: "h-8 w-8 text-primary"
                    })
                }), e.jsx("p", {
                    className: "text-muted-foreground",
                    children: "ar" === s ? "جاري التحميل..." : "Loading..."
                })]
            })
        });
        if (n) return e.jsxs("div", {
            className: "min-h-screen bg-background",
            dir: r ? "rtl" : "ltr",
            children: [e.jsx("nav", {
                className: "glass-nav sticky top-0 z-50",
                children: e.jsxs("div", {
                    className: "container mx-auto px-4 py-4 flex items-center justify-between",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsx("div", {
                            className: "w-9 h-9 rounded-xl bg-primary flex items-center justify-center",
                            children: e.jsx(d, {
                                className: "h-5 w-5 text-primary-foreground"
                            })
                        }), e.jsx("span", {
                            className: "text-xl font-bold text-foreground",
                            children: "iBlockchain"
                        })]
                    }), e.jsxs(i, {
                        variant: "outline",
                        onClick: o,
                        className: "glass-button",
                        children: [e.jsx(H, {
                            className: "h-4 w-4 " + (r ? "ml-2" : "mr-2")
                        }), "ar" === s ? "تسجيل الخروج" : "Logout"]
                    })]
                })
            }), e.jsx("div", {
                className: "container mx-auto px-4 py-12",
                children: e.jsxs(p, {
                    className: "max-w-2xl mx-auto glass-card",
                    children: [e.jsxs(u, {
                        className: "text-center",
                        children: [e.jsx("div", {
                            className: "w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4",
                            children: e.jsx(Q, {
                                className: "h-8 w-8 text-amber-500"
                            })
                        }), e.jsx(f, {
                            className: "text-2xl",
                            children: "ar" === s ? "التحقق من الهوية مطلوب" : "KYC Required"
                        }), e.jsx(j, {
                            children: "ar" === s ? "يجب عليك إكمال عملية التحقق من الهوية" : "You must complete identity verification"
                        })]
                    }), e.jsx(g, {
                        className: "text-center",
                        children: e.jsxs(i, {
                            onClick: () => z("/kyc"),
                            size: "lg",
                            className: "glow-primary",
                            children: [e.jsx(K, {
                                className: "h-5 w-5 " + (r ? "ml-2" : "mr-2")
                            }), "ar" === s ? "بدء عملية التحقق" : "Start Verification"]
                        })
                    })]
                })
            })]
        });
        const D = () => e.jsxs("div", {
            className: "flex flex-col h-full",
            children: [e.jsxs("div", {
                className: "p-5 border-b border-border/50",
                children: [e.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [e.jsx("div", {
                        className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary",
                        children: e.jsx(d, {
                            className: "h-5 w-5 text-primary-foreground"
                        })
                    }), e.jsxs("div", {
                        children: [e.jsx("span", {
                            className: "text-lg font-bold text-foreground",
                            children: "iBlockchain"
                        }), e.jsx("p", {
                            className: "text-xs text-muted-foreground -mt-0.5",
                            children: "Banking Platform"
                        })]
                    })]
                }), t && e.jsxs("div", {
                    className: "mt-4 p-3 rounded-xl bg-muted/50",
                    children: [e.jsx("p", {
                        className: "text-sm font-medium text-foreground truncate",
                        children: t.full_name || t.email
                    }), e.jsx("p", {
                        className: "text-xs text-muted-foreground truncate",
                        children: t.email
                    })]
                })]
            }), e.jsx("nav", {
                className: "flex-1 p-3 space-y-0.5 overflow-y-auto",
                children: se.map(a => {
                    const r = B.pathname === a.path,
                        t = ae[a.key][s] || ae[a.key].en;
                    return e.jsxs("button", {
                        onClick: () => {
                            z(a.path), _(!1)
                        },
                        className: h("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200", r ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"),
                        children: [e.jsx(a.icon, {
                            className: "h-[18px] w-[18px]"
                        }), t, "notifications" === a.key && x > 0 && e.jsx("span", {
                            className: h("ml-auto text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center font-bold", r ? "bg-white/25 text-white" : "bg-destructive text-destructive-foreground"),
                            children: x > 9 ? "9+" : x
                        })]
                    }, a.key)
                })
            }), e.jsx("div", {
                className: "p-3 border-t border-border/50",
                children: e.jsxs("button", {
                    onClick: o,
                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/8 hover:text-destructive transition-all duration-200",
                    children: [e.jsx(H, {
                        className: "h-[18px] w-[18px]"
                    }), "ar" === s ? "تسجيل الخروج" : "Logout"]
                })
            })]
        });
        return e.jsxs("div", {
            className: "min-h-screen bg-background flex",
            dir: r ? "rtl" : "ltr",
            children: [e.jsxs("div", {
                className: "fixed inset-0 pointer-events-none overflow-hidden -z-10",
                children: [e.jsx("div", {
                    className: "absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[100px]"
                }), e.jsx("div", {
                    className: "absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]"
                }), e.jsx("div", {
                    className: "absolute -bottom-32 right-1/3 w-[350px] h-[350px] rounded-full bg-blue-300/[0.04] blur-[100px]"
                })]
            }), e.jsx("aside", {
                className: "hidden md:flex w-[260px] glass-sidebar border-e border-border/40 flex-col flex-shrink-0 sticky top-0 h-screen",
                children: e.jsx(D, {})
            }), e.jsxs("div", {
                className: "flex-1 flex flex-col min-w-0",
                children: [e.jsxs("header", {
                    className: "glass-nav sticky top-0 z-40 px-4 md:px-8 py-3 flex items-center justify-between",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-3",
                        children: [e.jsxs(C, {
                            open: L,
                            onOpenChange: _,
                            children: [e.jsx(A, {
                                asChild: !0,
                                className: "md:hidden",
                                children: e.jsx(i, {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "glass-button rounded-xl",
                                    children: e.jsx(M, {
                                        className: "h-5 w-5"
                                    })
                                })
                            }), e.jsx(R, {
                                side: r ? "right" : "left",
                                className: "p-0 w-[260px] glass-sidebar",
                                children: e.jsx(D, {})
                            })]
                        }), e.jsxs("div", {
                            className: "md:hidden flex items-center gap-2",
                            children: [e.jsx("div", {
                                className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center",
                                children: e.jsx(d, {
                                    className: "h-4 w-4 text-primary-foreground"
                                })
                            }), e.jsx("span", {
                                className: "font-bold text-foreground",
                                children: "iBlockchain"
                            })]
                        }), e.jsx("div", {
                            className: "hidden md:block",
                            children: e.jsx("h2", {
                                className: "text-lg font-semibold text-foreground",
                                children: (() => {
                                    const e = se.find(e => e.path === B.pathname);
                                    return e ? ae[e.key][s] || ae[e.key].en : ""
                                })()
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsx(m, {}), e.jsx(ee, {
                            notifications: c,
                            unreadCount: x,
                            onMarkAsRead: b,
                            onMarkAllAsRead: S
                        }), e.jsxs("div", {
                            className: "hidden md:flex items-center gap-2 ml-2 glass-button rounded-xl px-3 py-2 cursor-pointer",
                            onClick: () => z("/dashboard/account"),
                            children: [e.jsx("div", {
                                className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center",
                                children: e.jsx(P, {
                                    className: "h-4 w-4 text-primary"
                                })
                            }), e.jsx("span", {
                                className: "text-sm font-medium text-foreground max-w-[120px] truncate",
                                children: (null == t ? void 0 : t.full_name) || (null == t ? void 0 : t.email) || ""
                            })]
                        })]
                    })]
                }), e.jsx("main", {
                    className: "flex-1 p-4 md:p-8 overflow-auto",
                    children: e.jsx(k, {})
                })]
            })]
        })
    },
    te = () => e.jsx(b, {
        children: e.jsx(re, {})
    });
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
export {
    te as
    default
};