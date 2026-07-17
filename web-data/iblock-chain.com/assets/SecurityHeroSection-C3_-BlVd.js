import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as a,
    S as t,
    L as r,
    F as i
} from "./index-DwXWGlRe.js";
import {
    m as s
} from "./vendor-motion-CQ1Esm1h.js";
import {
    E as n
} from "./eye-BXdavUtB.js";
import "./vendor-react-jZB-dUQe.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const o = () => {
    const {
        language: o,
        isRTL: d
    } = a();
    return e.jsxs("section", {
        className: "relative py-24 px-4 overflow-hidden",
        dir: d ? "rtl" : "ltr",
        children: [e.jsx("div", {
            className: "absolute inset-0 mesh-bg"
        }), e.jsx("div", {
            className: "absolute inset-0 grid-pattern"
        }), e.jsx("div", {
            className: "container mx-auto relative z-10",
            children: e.jsxs("div", {
                className: "grid lg:grid-cols-2 gap-12 items-center",
                children: [e.jsx(s.div, {
                    initial: {
                        opacity: 0,
                        x: -60,
                        scale: .7
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
                        duration: .8,
                        type: "spring"
                    },
                    className: "flex justify-center",
                    children: e.jsxs("div", {
                        className: "relative w-[300px] h-[300px] md:w-[380px] md:h-[380px] flex items-center justify-center",
                        children: [e.jsx(s.div, {
                            className: "absolute inset-0 rounded-full border border-primary/10",
                            animate: {
                                rotate: 360
                            },
                            transition: {
                                duration: 30,
                                repeat: 1 / 0,
                                ease: "linear"
                            },
                            style: {
                                borderStyle: "dashed"
                            }
                        }), e.jsx(s.div, {
                            className: "absolute inset-8 md:inset-10 rounded-full border border-primary/15 bg-primary/[0.02]",
                            animate: {
                                rotate: -360
                            },
                            transition: {
                                duration: 25,
                                repeat: 1 / 0,
                                ease: "linear"
                            },
                            style: {
                                borderStyle: "dashed"
                            }
                        }), e.jsx("div", {
                            className: "absolute inset-16 md:inset-20 rounded-full border border-primary/20 bg-primary/[0.04]"
                        }), e.jsx(s.div, {
                            className: "absolute inset-0 rounded-full border border-primary/10",
                            animate: {
                                scale: [1, 1.08, 1],
                                opacity: [.15, 0, .15]
                            },
                            transition: {
                                duration: 4,
                                repeat: 1 / 0,
                                ease: "easeInOut"
                            }
                        }), e.jsx(s.div, {
                            className: "relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-primary/10 flex items-center justify-center",
                            animate: {
                                scale: [1, 1.08, 1],
                                boxShadow: ["0 0 0px hsl(213 94% 58% / 0)", "0 0 50px hsl(213 94% 58% / 0.3)", "0 0 0px hsl(213 94% 58% / 0)"]
                            },
                            transition: {
                                duration: 3,
                                repeat: 1 / 0,
                                ease: "easeInOut"
                            },
                            children: e.jsx(t, {
                                className: "w-12 h-12 md:w-16 md:h-16 text-primary"
                            })
                        }), [r, i, n].map((a, t) => e.jsx(s.div, {
                            className: "absolute w-11 h-11 rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-gold-sm",
                            style: {
                                top: 50 + 42 * Math.sin(2 * t * Math.PI / 3) + "%",
                                left: 50 + 42 * Math.cos(2 * t * Math.PI / 3) + "%",
                                transform: "translate(-50%, -50%)"
                            },
                            animate: {
                                y: [0, -10, 0]
                            },
                            transition: {
                                duration: 3,
                                repeat: 1 / 0,
                                delay: .5 * t
                            },
                            children: e.jsx(a, {
                                className: "w-5 h-5 text-primary"
                            })
                        }, t))]
                    })
                }), e.jsxs(s.div, {
                    initial: {
                        opacity: 0,
                        x: 60
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
                    children: [e.jsx(s.span, {
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
                        children: "ar" === o ? "أمان لا يُضاهى" : "Unmatched Security"
                    }), e.jsx("h2", {
                        className: "text-3xl md:text-4xl font-extrabold mb-5 text-foreground tracking-tight",
                        children: "ar" === o ? "أصولك الرقمية محمية على مدار الساعة" : "Your digital assets, protected around the clock"
                    }), e.jsx("p", {
                        className: "text-muted-foreground leading-relaxed text-base md:text-lg mb-4",
                        children: "ar" === o ? "تستخدم iBlockchain تشفيراً عسكرياً متعدد الطبقات، ومصادقة بيومترية متقدمة، وتخزيناً بارداً لحماية أصولك من أي تهديد." : "iBlockchain uses military-grade multi-layer encryption, advanced biometric authentication, and cold storage to protect your assets from any threat."
                    }), e.jsx("p", {
                        className: "text-muted-foreground leading-relaxed text-base md:text-lg",
                        children: "ar" === o ? "مع المراقبة المستمرة والتحقق الثنائي، يمكنك إدارة محفظتك وإجراء عمليات التحويل بثقة تامة." : "With continuous monitoring and two-factor verification, you can manage your wallet and make transfers with complete confidence."
                    })]
                })]
            })
        })]
    })
};
export {
    o as
    default
};