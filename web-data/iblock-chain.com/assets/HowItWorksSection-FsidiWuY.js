import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as t
} from "./index-DwXWGlRe.js";
import {
    m as i
} from "./vendor-motion-CQ1Esm1h.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const r = [{
        titleEn: "Send Crypto",
        titleAr: "إرسال العملات",
        descEn: "Easily send your cryptocurrency to any wallet with iBlockchain. Our platform ensures quick and secure transactions, giving you peace of mind every time you transfer your assets.",
        descAr: "أرسل عملاتك الرقمية بسهولة إلى أي محفظة مع iBlockchain. تضمن منصتنا معاملات سريعة وآمنة.",
        image: "/assets/send-crypto-eoVmJPcx.jpg"
    }, {
        titleEn: "Receive Crypto",
        titleAr: "استقبال العملات",
        descEn: "Effortlessly receive crypto directly into your iBlockchain wallet. With top-notch security and easy tracking, you can manage your incoming funds without any hassle.",
        descAr: "استقبل العملات الرقمية مباشرة في محفظة iBlockchain الخاصة بك. مع أمان عالي المستوى وتتبع سهل.",
        image: "/assets/receive-crypto-BjpslNZn.jpg"
    }, {
        titleEn: "Swap Crypto with 0% Fees",
        titleAr: "تبادل العملات بعمولة 0%",
        descEn: "Exchange your digital assets seamlessly with iBlockchain. Enjoy fast and efficient swaps between different cryptocurrencies, all within a user-friendly interface.",
        descAr: "بادل أصولك الرقمية بسلاسة مع iBlockchain. استمتع بتبادل سريع وفعال بين العملات الرقمية المختلفة.",
        image: "/assets/swap-crypto-rBO_9-5L.jpg"
    }],
    a = () => {
        const {
            language: a,
            isRTL: s
        } = t();
        return e.jsx("section", {
            className: "py-24 px-4",
            dir: s ? "rtl" : "ltr",
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
                    className: "text-center mb-20",
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
                        children: "ar" === a ? "كيف يعمل" : "How it works"
                    }), e.jsxs("h2", {
                        className: "text-3xl md:text-5xl font-extrabold text-foreground tracking-tight",
                        children: ["ar" === a ? "افعل كل شيء بعملاتك الرقمية" : "Do everything with your crypto", e.jsx("br", {}), e.jsx("span", {
                            className: "text-gradient",
                            children: "ar" === a ? "الكل في مكان واحد" : "all in one place"
                        })]
                    })]
                }), e.jsx("div", {
                    className: "space-y-24",
                    children: r.map((t, r) => {
                        const s = r % 2 != 0;
                        return e.jsxs("div", {
                            className: "grid lg:grid-cols-2 gap-12 items-center",
                            children: [e.jsx(i.div, {
                                initial: {
                                    opacity: 0,
                                    x: s ? 60 : -60,
                                    scale: .8
                                },
                                whileInView: {
                                    opacity: 1,
                                    x: 0,
                                    scale: 1
                                },
                                viewport: {
                                    once: !0
                                },
                                transition: {
                                    duration: .9,
                                    type: "spring"
                                },
                                className: "relative flex justify-center " + (s ? "lg:order-2" : ""),
                                children: e.jsxs(i.div, {
                                    animate: {
                                        y: [0, -14, 0]
                                    },
                                    transition: {
                                        duration: 5,
                                        repeat: 1 / 0,
                                        ease: "easeInOut",
                                        delay: .7 * r
                                    },
                                    className: "relative w-full max-w-sm",
                                    children: [e.jsx("div", {
                                        className: "absolute -inset-6 rounded-3xl bg-primary/15 blur-[50px]"
                                    }), e.jsxs("div", {
                                        className: "relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm bg-white/5",
                                        style: {
                                            boxShadow: "0 25px 60px -12px rgba(0,0,0,0.4), 0 0 40px -8px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                                        },
                                        children: [e.jsx("div", {
                                            className: "absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-3xl"
                                        }), e.jsx("img", {
                                            src: t.image,
                                            alt: t.titleEn,
                                            loading: "lazy",
                                            width: 800,
                                            height: 800,
                                            className: "w-full aspect-square object-cover"
                                        })]
                                    })]
                                })
                            }), e.jsxs(i.div, {
                                initial: {
                                    opacity: 0,
                                    x: s ? -60 : 60
                                },
                                whileInView: {
                                    opacity: 1,
                                    x: 0
                                },
                                viewport: {
                                    once: !0
                                },
                                transition: {
                                    duration: .7,
                                    delay: .15
                                },
                                className: s ? "lg:order-1" : "",
                                children: [e.jsx("h3", {
                                    className: "text-3xl md:text-4xl font-extrabold mb-4 text-primary tracking-tight",
                                    children: "ar" === a ? t.titleAr : t.titleEn
                                }), e.jsx("p", {
                                    className: "text-muted-foreground leading-relaxed text-lg",
                                    children: "ar" === a ? t.descAr : t.descEn
                                })]
                            })]
                        }, r)
                    })
                })]
            })
        })
    };
export {
    a as
    default
};