import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    L as r
} from "./vendor-react-jZB-dUQe.js";
import {
    u as s,
    S as t
} from "./index-DwXWGlRe.js";
import {
    m as a
} from "./vendor-motion-CQ1Esm1h.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const l = {
        en: [{
            title: "Company",
            links: [{
                label: "Overview",
                href: "#home"
            }, {
                label: "Features",
                href: "#services"
            }, {
                label: "About Us",
                href: "/about-us"
            }, {
                label: "Crypto Prices",
                href: "/prices"
            }]
        }, {
            title: "Wallet",
            links: [{
                label: "Deposit",
                href: "/dashboard/deposit"
            }, {
                label: "Withdraw",
                href: "/dashboard/withdrawal"
            }, {
                label: "Transactions",
                href: "/dashboard/transactions"
            }]
        }, {
            title: "Support",
            links: [{
                label: "Live Support",
                href: "/dashboard/support"
            }, {
                label: "Contact Us",
                href: "#contact"
            }]
        }, {
            title: "Legal",
            links: [{
                label: "Terms of Service",
                href: "/terms-of-service"
            }, {
                label: "Privacy Policy",
                href: "/privacy-policy"
            }]
        }],
        ar: [{
            title: "الشركة",
            links: [{
                label: "نظرة عامة",
                href: "#home"
            }, {
                label: "الخدمات",
                href: "#services"
            }, {
                label: "من نحن",
                href: "/about-us"
            }, {
                label: "أسعار العملات",
                href: "/prices"
            }]
        }, {
            title: "المحفظة",
            links: [{
                label: "إيداع",
                href: "/dashboard/deposit"
            }, {
                label: "سحب",
                href: "/dashboard/withdrawal"
            }, {
                label: "المعاملات",
                href: "/dashboard/transactions"
            }]
        }, {
            title: "الدعم",
            links: [{
                label: "الدعم المباشر",
                href: "/dashboard/support"
            }, {
                label: "تواصل معنا",
                href: "#contact"
            }]
        }, {
            title: "قانوني",
            links: [{
                label: "شروط الخدمة",
                href: "/terms-of-service"
            }, {
                label: "سياسة الخصوصية",
                href: "/privacy-policy"
            }]
        }]
    },
    i = {
        en: {
            tagline: "Your Trusted Gateway to Digital Asset Recovery",
            rights: "All Rights Reserved."
        },
        ar: {
            tagline: "بوابتك الموثوقة لاسترداد الأصول الرقمية",
            rights: "جميع الحقوق محفوظة."
        }
    },
    o = () => {
        const {
            language: o,
            isRTL: n
        } = s(), c = l[o] || l.en, d = i[o] || i.en;
        return e.jsx("footer", {
            className: "border-t border-border bg-card/30 pt-16 pb-8",
            dir: n ? "rtl" : "ltr",
            children: e.jsxs("div", {
                className: "container mx-auto px-4",
                children: [e.jsxs("div", {
                    className: "grid grid-cols-2 md:grid-cols-5 gap-8 mb-12",
                    children: [e.jsxs(a.div, {
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
                        className: "col-span-2 md:col-span-1",
                        children: [e.jsxs(r, {
                            to: "/",
                            className: "flex items-center gap-2 mb-4",
                            children: [e.jsx("div", {
                                className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center",
                                children: e.jsx(t, {
                                    className: "h-6 w-6 text-primary-foreground"
                                })
                            }), e.jsx("span", {
                                className: "text-xl font-bold text-foreground",
                                children: "iBlockchain"
                            })]
                        }), e.jsx("p", {
                            className: "text-sm text-muted-foreground",
                            children: d.tagline
                        })]
                    }), c.map((s, t) => e.jsxs(a.div, {
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
                            delay: .1 * t
                        },
                        children: [e.jsx("h4", {
                            className: "font-bold text-foreground mb-4 text-sm",
                            children: s.title
                        }), e.jsx("ul", {
                            className: "space-y-2",
                            children: s.links.map(s => e.jsx("li", {
                                children: s.href.startsWith("/") ? e.jsx(r, {
                                    to: s.href,
                                    className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                    children: s.label
                                }) : e.jsx("a", {
                                    href: s.href,
                                    className: "text-sm text-muted-foreground hover:text-primary transition-colors",
                                    children: s.label
                                })
                            }, s.label))
                        })]
                    }, s.title))]
                }), e.jsxs("div", {
                    className: "border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4",
                    children: [e.jsxs("div", {
                        className: "flex gap-6 text-sm text-muted-foreground",
                        children: [e.jsx(r, {
                            to: "/terms-of-service",
                            className: "hover:text-foreground transition-colors",
                            children: "ar" === o ? "شروط الخدمة" : "Terms of Service"
                        }), e.jsx(r, {
                            to: "/privacy-policy",
                            className: "hover:text-foreground transition-colors",
                            children: "ar" === o ? "سياسة الخصوصية" : "Privacy Policy"
                        })]
                    }), e.jsxs("p", {
                        className: "text-sm text-muted-foreground",
                        children: ["© 2026 ", e.jsx("span", {
                            className: "text-primary",
                            children: "iBlockchain"
                        }), ". ", d.rights]
                    })]
                })]
            })
        })
    };
export {
    o as
    default
};