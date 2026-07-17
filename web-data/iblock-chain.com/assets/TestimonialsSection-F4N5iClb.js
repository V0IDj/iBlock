import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as r
} from "./index-DwXWGlRe.js";
import {
    m as a
} from "./vendor-motion-CQ1Esm1h.js";
import {
    S as n
} from "./star-C-mZXnlq.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const s = [{
        nameEn: "Ahmad Al-Rashid",
        nameAr: "أحمد الراشد",
        roleEn: "Investor",
        roleAr: "مستثمر",
        messageEn: "iBlockchain helped me recover my stolen crypto assets within weeks. Their team is incredibly professional and transparent throughout the entire process.",
        messageAr: "ساعدتني iBlockchain في استرداد أصولي الرقمية المسروقة خلال أسابيع. فريقهم محترف وشفاف بشكل لا يصدق.",
        rating: 5
    }, {
        nameEn: "Sarah Mitchell",
        nameAr: "سارة ميتشل",
        roleEn: "Business Owner",
        roleAr: "صاحبة أعمال",
        messageEn: "After being scammed by a fake trading platform, I thought my money was gone forever. iBlockchain proved me wrong and recovered 95% of my funds.",
        messageAr: "بعد أن تعرضت للاحتيال من منصة تداول وهمية، اعتقدت أن أموالي ضاعت. أثبتت iBlockchain أنني كنت مخطئة واستردت 95% من أموالي.",
        rating: 5
    }, {
        nameEn: "Mohammed Al-Fahad",
        nameAr: "محمد الفهد",
        roleEn: "Crypto Trader",
        roleAr: "متداول عملات رقمية",
        messageEn: "The security features and the dedicated support team make iBlockchain stand out. I feel safe managing my portfolio through their platform.",
        messageAr: "ميزات الأمان وفريق الدعم المخصص يجعلان iBlockchain متميزة. أشعر بالأمان في إدارة محفظتي.",
        rating: 5
    }, {
        nameEn: "Lisa Wang",
        nameAr: "ليزا وانغ",
        roleEn: "Financial Advisor",
        roleAr: "مستشارة مالية",
        messageEn: "I recommend iBlockchain to all my clients. Their recovery process is systematic, legal, and highly effective.",
        messageAr: "أوصي بـ iBlockchain لجميع عملائي. عملية الاسترداد لديهم منهجية وقانونية وفعالة للغاية.",
        rating: 5
    }, {
        nameEn: "Omar Khalil",
        nameAr: "عمر خليل",
        roleEn: "Entrepreneur",
        roleAr: "رائد أعمال",
        messageEn: "Fast, reliable, and trustworthy. iBlockchain is the real deal when it comes to crypto recovery and asset management.",
        messageAr: "سريعة وموثوقة وجديرة بالثقة. iBlockchain هي الخيار الحقيقي عندما يتعلق الأمر باسترداد العملات الرقمية.",
        rating: 5
    }, {
        nameEn: "Fatima Al-Zahra",
        nameAr: "فاطمة الزهراء",
        roleEn: "Tech Professional",
        roleAr: "محترفة تقنية",
        messageEn: "The platform's interface is clean and easy to use. The team responded to my queries within minutes. Exceptional service!",
        messageAr: "واجهة المنصة نظيفة وسهلة الاستخدام. استجاب الفريق لاستفساراتي في دقائق. خدمة استثنائية!",
        rating: 5
    }],
    i = ["bg-primary", "bg-accent", "bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-purple-500"];
const t = () => {
    const {
        language: t,
        isRTL: o
    } = r();
    return e.jsx("section", {
        className: "py-24 px-4 overflow-hidden",
        dir: o ? "rtl" : "ltr",
        children: e.jsxs("div", {
            className: "container mx-auto",
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
                    children: "ar" === t ? "آراء العملاء" : "Testimonials"
                }), e.jsx("h2", {
                    className: "text-3xl md:text-4xl font-extrabold text-foreground tracking-tight",
                    children: "ar" === t ? "ماذا يقول عملاؤنا" : "What Our Clients Say"
                })]
            }), e.jsx("div", {
                className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: s.map((r, s) => {
                    return e.jsxs(a.div, {
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
                            duration: .5,
                            delay: .08 * s
                        },
                        className: "glass-card rounded-2xl p-6 border border-border group hover:border-primary/20 transition-colors",
                        children: [e.jsxs("div", {
                            className: "flex items-center gap-3 mb-4",
                            children: [e.jsx("div", {
                                className: `w-10 h-10 rounded-full ${i[s%i.length]} text-white flex items-center justify-center text-sm font-bold`,
                                children: (o = "ar" === t ? r.nameAr : r.nameEn, o.split(" ").map(e => e[0]).join(""))
                            }), e.jsxs("div", {
                                children: [e.jsx("p", {
                                    className: "font-semibold text-foreground text-sm",
                                    children: "ar" === t ? r.nameAr : r.nameEn
                                }), e.jsx("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "ar" === t ? r.roleAr : r.roleEn
                                })]
                            })]
                        }), e.jsx("div", {
                            className: "flex gap-0.5 mb-3",
                            children: Array.from({
                                length: r.rating
                            }).map((r, a) => e.jsx(n, {
                                className: "w-4 h-4 text-yellow-500 fill-yellow-500"
                            }, a))
                        }), e.jsx("p", {
                            className: "text-sm text-muted-foreground leading-relaxed",
                            children: "ar" === t ? r.messageAr : r.messageEn
                        })]
                    }, s);
                    var o
                })
            })]
        })
    })
};
export {
    t as
    default
};