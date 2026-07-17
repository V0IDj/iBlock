import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as s,
    S as a,
    B as r,
    b as t,
    U as i
} from "./index-DwXWGlRe.js";
import {
    A as n,
    u as l
} from "./AdminContext-D1hNZ7v4.js";
import {
    f as o,
    g as d,
    r as m,
    O as c
} from "./vendor-react-jZB-dUQe.js";
import {
    S as x,
    a as p,
    M as h,
    b as u,
    H as f
} from "./sheet-BfTmQ9Ej.js";
import {
    L as j
} from "./log-out-DVrz8Lo2.js";
import {
    F as g
} from "./file-text-DpWW3j06.js";
import {
    A as b
} from "./arrow-down-to-line-BjfOUbed.js";
import {
    A as y
} from "./arrow-up-from-line-BU6jw5rV.js";
import {
    H as w
} from "./history-CnrDEAdP.js";
import {
    M as v
} from "./message-square-BGg6T5wc.js";
import {
    S as N
} from "./store-B787pman.js";
import {
    C as k
} from "./circle-plus-Qvk2rRUH.js";
import {
    W as C
} from "./wallet-y1OErQw9.js";
import {
    C as A
} from "./clipboard-list-BA0FakSB.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-motion-CQ1Esm1h.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const M = () => {
        const {
            language: n,
            isRTL: M
        } = s(), {
            isSuperAdmin: L,
            loading: S,
            handleLogout: H,
            kycDocs: q
        } = l(), D = o(), O = d(), [T, W] = m.useState(!1), z = q.filter(e => "pending" === e.status).length, F = [{
            key: "overview",
            path: "/admin",
            icon: f,
            label: {
                ar: "نظرة عامة",
                en: "Overview"
            }
        }, {
            key: "clients",
            path: "/admin/clients",
            icon: i,
            label: {
                ar: "العملاء",
                en: "Clients"
            }
        }, {
            key: "kyc",
            path: "/admin/kyc",
            icon: g,
            label: {
                ar: "طلبات KYC",
                en: "KYC Requests"
            },
            badge: z
        }, {
            key: "deposits",
            path: "/admin/deposits",
            icon: b,
            label: {
                ar: "الإيداعات",
                en: "Deposits"
            }
        }, {
            key: "withdrawals",
            path: "/admin/withdrawals",
            icon: y,
            label: {
                ar: "السحوبات",
                en: "Withdrawals"
            }
        }, {
            key: "history",
            path: "/admin/history",
            icon: w,
            label: {
                ar: "سجل المعاملات",
                en: "Transaction History"
            }
        }, {
            key: "messages",
            path: "/admin/messages",
            icon: v,
            label: {
                ar: "الرسائل",
                en: "Messages"
            }
        }, {
            key: "market",
            path: "/admin/market",
            icon: N,
            label: {
                ar: "إدارة السوق",
                en: "Market Control"
            }
        }, ...L ? [{
            key: "new-transaction",
            path: "/admin/new-transaction",
            icon: k,
            label: {
                ar: "إضافة معاملة",
                en: "New Transaction"
            }
        }, {
            key: "wallets",
            path: "/admin/wallets",
            icon: C,
            label: {
                ar: "إدارة المحافظ",
                en: "Wallet Management"
            }
        }, {
            key: "audit",
            path: "/admin/audit",
            icon: A,
            label: {
                ar: "سجل المراقبة",
                en: "Audit Log"
            }
        }] : []];
        if (S) return e.jsx("div", {
            className: "min-h-screen bg-background mesh-bg flex items-center justify-center",
            children: e.jsxs("div", {
                className: "text-center",
                children: [e.jsx("div", {
                    className: "relative",
                    children: e.jsx("div", {
                        className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 glow-primary animate-pulse-slow",
                        children: e.jsx(a, {
                            className: "h-10 w-10 text-primary"
                        })
                    })
                }), e.jsx("p", {
                    className: "text-muted-foreground",
                    children: "ar" === n ? "جاري التحميل..." : "Loading..."
                })]
            })
        });
        const K = () => e.jsxs("div", {
            className: "flex flex-col h-full",
            children: [e.jsx("div", {
                className: "p-5 border-b border-border/50",
                children: e.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [e.jsx("div", {
                        className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center glow-primary",
                        children: e.jsx(a, {
                            className: "h-6 w-6 text-primary"
                        })
                    }), e.jsxs("div", {
                        children: [e.jsx("span", {
                            className: "text-lg font-bold text-foreground block leading-tight",
                            children: "ar" === n ? "لوحة التحكم" : "Admin Panel"
                        }), L && e.jsx("span", {
                            className: "text-[10px] font-semibold text-amber-500 uppercase tracking-wider",
                            children: "ar" === n ? "مشرف أعلى" : "Super Admin"
                        })]
                    })]
                })
            }), e.jsxs("nav", {
                className: "flex-1 p-3 space-y-1 overflow-y-auto",
                children: [e.jsx("p", {
                    className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2",
                    children: "ar" === n ? "القائمة الرئيسية" : "Main Menu"
                }), F.map(s => {
                    const a = O.pathname === s.path;
                    return e.jsxs("button", {
                        onClick: () => {
                            D(s.path), W(!1)
                        },
                        className: t("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200", a ? "bg-primary text-primary-foreground shadow-md glow-primary" : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"),
                        children: [e.jsx(s.icon, {
                            className: "h-[18px] w-[18px] flex-shrink-0"
                        }), e.jsx("span", {
                            className: "truncate",
                            children: s.label[n] || s.label.en
                        }), s.badge && s.badge > 0 && e.jsx("span", {
                            className: t("ml-auto text-[10px] rounded-full px-2 py-0.5 min-w-[22px] text-center font-bold", a ? "bg-white/20 text-white" : "bg-destructive text-destructive-foreground"),
                            children: s.badge
                        })]
                    }, s.key)
                })]
            }), e.jsx("div", {
                className: "p-3 border-t border-border/50",
                children: e.jsxs("button", {
                    onClick: H,
                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200",
                    children: [e.jsx(j, {
                        className: "h-[18px] w-[18px]"
                    }), "ar" === n ? "تسجيل الخروج" : "Logout"]
                })
            })]
        });
        return e.jsxs("div", {
            className: "min-h-screen bg-background mesh-bg grid-pattern flex",
            dir: M ? "rtl" : "ltr",
            children: [e.jsx("aside", {
                className: "hidden md:flex w-[260px] glass-sidebar border-e border-border/30 flex-col flex-shrink-0 sticky top-0 h-screen",
                children: e.jsx(K, {})
            }), e.jsxs("div", {
                className: "flex-1 flex flex-col min-w-0",
                children: [e.jsx("header", {
                    className: "md:hidden glass-nav px-4 py-3 flex items-center justify-between sticky top-0 z-40",
                    children: e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsxs(x, {
                            open: T,
                            onOpenChange: W,
                            children: [e.jsx(p, {
                                asChild: !0,
                                children: e.jsx(r, {
                                    variant: "ghost",
                                    size: "icon",
                                    className: "rounded-xl",
                                    children: e.jsx(h, {
                                        className: "h-5 w-5"
                                    })
                                })
                            }), e.jsx(u, {
                                side: M ? "right" : "left",
                                className: "p-0 w-[260px] glass-sidebar",
                                children: e.jsx(K, {})
                            })]
                        }), e.jsx("div", {
                            className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center",
                            children: e.jsx(a, {
                                className: "h-5 w-5 text-primary"
                            })
                        }), e.jsx("span", {
                            className: "font-bold text-foreground",
                            children: "ar" === n ? "لوحة التحكم" : "Admin"
                        })]
                    })
                }), e.jsx("main", {
                    className: "flex-1 p-4 md:p-8 overflow-auto",
                    children: e.jsx(c, {})
                })]
            })]
        })
    },
    L = () => e.jsx(n, {
        children: e.jsx(M, {})
    });
export {
    L as
    default
};