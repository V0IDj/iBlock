import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as r
} from "./index-DwXWGlRe.js";
import {
    m as i
} from "./vendor-motion-CQ1Esm1h.js";
import {
    Z as t
} from "./zap-D7iOxRjn.js";
import {
    E as a
} from "./eye-BXdavUtB.js";
import {
    H as o
} from "./headphones-vW0Q5Zf1.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const s = [{
        icon: t,
        titleEn: "Fast & Efficient Transactions",
        titleAr: "معاملات سريعة وفعالة",
        descEn: "Experience lightning-fast transactions without the hassle. iBlockchain ensures that your trades are processed quickly and reliably.",
        descAr: "تمتع بمعاملات سريعة كالبرق بدون عناء. تضمن iBlockchain معالجة صفقاتك بسرعة وموثوقية."
    }, {
        icon: a,
        titleEn: "Transparent and Fair",
        titleAr: "شفافة وعادلة",
        descEn: "We believe in transparency. With iBlockchain, you'll always know where your assets stand. No hidden fees, no surprises.",
        descAr: "نؤمن بالشفافية. مع iBlockchain، ستعرف دائماً أين تقف أصولك. لا رسوم مخفية، لا مفاجآت."
    }, {
        icon: o,
        titleEn: "24/7 Customer Support",
        titleAr: "دعم العملاء على مدار الساعة",
        descEn: "Our dedicated support team is available around the clock to assist you with any questions or concerns.",
        descAr: "فريق الدعم المخصص لدينا متاح على مدار الساعة لمساعدتك في أي استفسارات."
    }],
    n = () => {
        const {
            language: t,
            isRTL: a
        } = r();
        return e.jsx("section", {
            className: "py-24 px-4",
            dir: a ? "rtl" : "ltr",
            children: e.jsxs("div", {
                className: "container mx-auto",
                children: [e.jsxs(i.div, {
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
                    transition: {
                        duration: .6
                    },
                    className: "mb-16",
                    children: [e.jsx(i.span, {
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
                        children: "ar" === t ? "لماذا تختار iBlockchain؟" : "Why Choose iBlockchain?"
                    }), e.jsx("h2", {
                        className: "text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4",
                        children: "ar" === t ? "أمان بلا تنازلات" : "Uncompromised Security"
                    }), e.jsx("p", {
                        className: "text-muted-foreground max-w-2xl leading-relaxed",
                        children: "ar" === t ? "أمانك هو أولويتنا القصوى. تستخدم iBlockchain تشفيراً متطوراً، ومصادقة ثنائية، وحلول تخزين بارد لحماية أصولك الرقمية." : "Your security is our highest priority. iBlockchain employs cutting-edge encryption, two-factor authentication, and cold storage solutions to protect your digital assets."
                    })]
                }), e.jsx("div", {
                    className: "grid md:grid-cols-3 gap-8",
                    children: s.map((r, a) => e.jsxs(i.div, {
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
                            duration: .5,
                            delay: .15 * a
                        },
                        whileHover: {
                            y: -8,
                            scale: 1.02
                        },
                        className: "group glass-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300",
                        children: [e.jsx(i.div, {
                            whileHover: {
                                rotate: 360,
                                scale: 1.2
                            },
                            transition: {
                                duration: .6
                            },
                            className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors",
                            children: e.jsx(r.icon, {
                                className: "w-7 h-7 text-primary"
                            })
                        }), e.jsx("h3", {
                            className: "text-lg font-bold text-foreground mb-3",
                            children: "ar" === t ? r.titleAr : r.titleEn
                        }), e.jsx("p", {
                            className: "text-sm text-muted-foreground leading-relaxed",
                            children: "ar" === t ? r.descAr : r.descEn
                        })]
                    }, a))
                })]
            })
        })
    };
export {
    n as
    default
};