import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    c as r,
    u as t,
    L as i,
    G as o
} from "./index-DwXWGlRe.js";
import {
    m as a
} from "./vendor-motion-CQ1Esm1h.js";
import {
    C as s
} from "./credit-card-oykfqiGA.js";
import {
    B as n
} from "./bell-JeVR80iu.js";
import {
    C as l
} from "./chart-pie-BftVW3Mq.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c = [{
        icon: s,
        titleEn: "Spend your funds in real life",
        titleAr: "أنفق أموالك في الحياة الواقعية",
        descEn: "Use your crypto assets for everyday purchases with our virtual card.",
        descAr: "استخدم أصولك الرقمية للمشتريات اليومية مع بطاقتنا الافتراضية."
    }, {
        icon: n,
        titleEn: "Powerful notifications",
        titleAr: "إشعارات قوية",
        descEn: "Stay informed with real-time alerts on all your transactions and market movements.",
        descAr: "ابقَ على اطلاع مع تنبيهات فورية لجميع معاملاتك وحركات السوق."
    }, {
        icon: r("Download", [
            ["path", {
                d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
                key: "ih7n3h"
            }],
            ["polyline", {
                points: "7 10 12 15 17 10",
                key: "2ggqvy"
            }],
            ["line", {
                x1: "12",
                x2: "12",
                y1: "15",
                y2: "3",
                key: "1vk2je"
            }]
        ]),
        titleEn: "Never start from zero",
        titleAr: "لا تبدأ من الصفر أبداً",
        descEn: "Import your existing wallets and start managing them all in one place.",
        descAr: "استورد محافظك الحالية وابدأ بإدارتها جميعاً في مكان واحد."
    }, {
        icon: l,
        titleEn: "Easily organize your portfolio",
        titleAr: "نظّم محفظتك بسهولة",
        descEn: "Track all your assets with a clear, intuitive portfolio overview.",
        descAr: "تتبع جميع أصولك مع نظرة عامة واضحة وبديهية لمحفظتك."
    }, {
        icon: i,
        titleEn: "Next level security",
        titleAr: "أمان من المستوى التالي",
        descEn: "Advanced encryption and biometric authentication protect your assets.",
        descAr: "تشفير متقدم ومصادقة بيومترية تحمي أصولك."
    }, {
        icon: o,
        titleEn: "Available for every currency",
        titleAr: "متاح لجميع العملات",
        descEn: "Support for hundreds of cryptocurrencies and tokens across multiple networks.",
        descAr: "دعم لمئات العملات الرقمية والتوكنات عبر شبكات متعددة."
    }],
    d = () => {
        const {
            language: r,
            isRTL: i
        } = t();
        return e.jsx("section", {
            className: "py-24 px-4",
            dir: i ? "rtl" : "ltr",
            children: e.jsxs("div", {
                className: "container mx-auto",
                children: [e.jsxs(a.div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: !0
                    },
                    className: "text-center mb-16",
                    children: [e.jsx(a.span, {
                        initial: {
                            opacity: 0,
                            scale: .8
                        },
                        whileInView: {
                            opacity: 1,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        className: "inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-4",
                        children: "ar" === r ? "المميزات" : "Features"
                    }), e.jsx("h2", {
                        className: "text-3xl md:text-5xl font-extrabold text-foreground tracking-tight",
                        children: "ar" === r ? "استكشف العملات الرقمية بطريقة جديدة" : "Explore crypto in a whole new way"
                    })]
                }), e.jsx("div", {
                    className: "grid md:grid-cols-3 gap-6",
                    children: c.map((t, i) => e.jsxs(a.div, {
                        initial: {
                            opacity: 0,
                            y: 40,
                            scale: .95
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0,
                            scale: 1
                        },
                        viewport: {
                            once: !0
                        },
                        transition: {
                            duration: .5,
                            delay: .1 * i
                        },
                        whileHover: {
                            y: -10,
                            scale: 1.03
                        },
                        className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300",
                        children: [e.jsx("div", {
                            className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        }), e.jsxs("div", {
                            className: "relative z-10",
                            children: [e.jsx(a.div, {
                                whileHover: {
                                    rotate: 360
                                },
                                transition: {
                                    duration: .6
                                },
                                className: "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors",
                                children: e.jsx(t.icon, {
                                    className: "w-6 h-6 text-primary"
                                })
                            }), e.jsx("h3", {
                                className: "text-lg font-bold text-foreground mb-2",
                                children: "ar" === r ? t.titleAr : t.titleEn
                            }), e.jsx("p", {
                                className: "text-sm text-muted-foreground leading-relaxed",
                                children: "ar" === r ? t.descAr : t.descEn
                            })]
                        })]
                    }, i))
                })]
            })
        })
    };
export {
    d as
    default
};