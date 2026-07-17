import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    c as t,
    u as a,
    L as i,
    S as s,
    U as o,
    G as r,
    B as l,
    A as c
} from "./index-DwXWGlRe.js";
import {
    L as n
} from "./vendor-react-jZB-dUQe.js";
import {
    W as d
} from "./wallet-y1OErQw9.js";
import {
    C as x
} from "./credit-card-oykfqiGA.js";
import {
    H as m
} from "./headphones-vW0Q5Zf1.js";
import {
    m as u
} from "./vendor-motion-CQ1Esm1h.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-supabase-Bd7Ft8C2.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h = t("Key", [
        ["path", {
            d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",
            key: "g0fldk"
        }],
        ["path", {
            d: "m21 2-9.6 9.6",
            key: "1j0ho8"
        }],
        ["circle", {
            cx: "7.5",
            cy: "15.5",
            r: "5.5",
            key: "yqb3hr"
        }]
    ]),
    y = t("Scale", [
        ["path", {
            d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
            key: "7g6ntu"
        }],
        ["path", {
            d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
            key: "ijws7r"
        }],
        ["path", {
            d: "M7 21h10",
            key: "1b0cd5"
        }],
        ["path", {
            d: "M12 3v18",
            key: "108xh3"
        }],
        ["path", {
            d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
            key: "3gwbw2"
        }]
    ]),
    p = t("Server", [
        ["rect", {
            width: "20",
            height: "8",
            x: "2",
            y: "2",
            rx: "2",
            ry: "2",
            key: "ngkwjq"
        }],
        ["rect", {
            width: "20",
            height: "8",
            x: "2",
            y: "14",
            rx: "2",
            ry: "2",
            key: "iecqi9"
        }],
        ["line", {
            x1: "6",
            x2: "6.01",
            y1: "6",
            y2: "6",
            key: "16zg32"
        }],
        ["line", {
            x1: "6",
            x2: "6.01",
            y1: "18",
            y2: "18",
            key: "nzw8ys"
        }]
    ]),
    g = () => {
        const {
            t: t,
            isRTL: g
        } = a(), b = [{
            icon: d,
            title: t("aboutPage.solutions.wallets.title"),
            desc: t("aboutPage.solutions.wallets.desc")
        }, {
            icon: i,
            title: t("aboutPage.solutions.custodial.title"),
            desc: t("aboutPage.solutions.custodial.desc")
        }, {
            icon: x,
            title: t("aboutPage.solutions.fiat.title"),
            desc: t("aboutPage.solutions.fiat.desc")
        }, {
            icon: s,
            title: t("aboutPage.solutions.security.title"),
            desc: t("aboutPage.solutions.security.desc")
        }, {
            icon: m,
            title: t("aboutPage.solutions.support.title"),
            desc: t("aboutPage.solutions.support.desc")
        }, {
            icon: y,
            title: t("aboutPage.solutions.compliance.title"),
            desc: t("aboutPage.solutions.compliance.desc")
        }], j = [{
            icon: p,
            title: t("aboutPage.security.coldHot.title"),
            desc: t("aboutPage.security.coldHot.desc")
        }, {
            icon: h,
            title: t("aboutPage.security.encryption.title"),
            desc: t("aboutPage.security.encryption.desc")
        }, {
            icon: o,
            title: t("aboutPage.security.aml.title"),
            desc: t("aboutPage.security.aml.desc")
        }, {
            icon: r,
            title: t("aboutPage.security.regulatory.title"),
            desc: t("aboutPage.security.regulatory.desc")
        }], w = [{
            icon: s,
            title: t("aboutPage.why.regulated.title"),
            desc: t("aboutPage.why.regulated.desc")
        }, {
            icon: i,
            title: t("aboutPage.why.enterprise.title"),
            desc: t("aboutPage.why.enterprise.desc")
        }, {
            icon: r,
            title: t("aboutPage.why.scalability.title"),
            desc: t("aboutPage.why.scalability.desc")
        }, {
            icon: m,
            title: t("aboutPage.why.support.title"),
            desc: t("aboutPage.why.support.desc")
        }];
        return e.jsxs("div", {
            className: "min-h-screen bg-background " + (g ? "rtl" : "ltr"),
            children: [e.jsx("header", {
                className: "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50",
                children: e.jsxs("div", {
                    className: "container mx-auto px-4 py-4 flex justify-between items-center",
                    children: [e.jsxs(n, {
                        to: "/",
                        className: "flex items-center gap-3",
                        children: [e.jsx("div", {
                            className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary",
                            children: e.jsx(s, {
                                className: "h-6 w-6 text-primary-foreground"
                            })
                        }), e.jsx("span", {
                            className: "text-2xl font-bold text-foreground",
                            children: "iBlockchain"
                        })]
                    }), e.jsx(n, {
                        to: "/",
                        children: e.jsxs(l, {
                            variant: "outline",
                            className: "gap-2",
                            children: [e.jsx(c, {
                                className: "h-4 w-4 " + (g ? "" : "rotate-180")
                            }), t("aboutPage.backHome")]
                        })
                    })]
                })
            }), e.jsxs("section", {
                className: "pt-32 pb-20 px-4 relative overflow-hidden",
                children: [e.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"
                }), e.jsx("div", {
                    className: "container mx-auto relative z-10",
                    children: e.jsxs(u.div, {
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: .6
                        },
                        className: "max-w-4xl mx-auto text-center",
                        children: [e.jsx(u.span, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "inline-block text-primary font-semibold text-lg mb-4 tracking-wider",
                            children: t("aboutPage.hero.badge")
                        }), e.jsx(u.h1, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: .1
                            },
                            className: "text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight",
                            children: t("aboutPage.hero.title")
                        })]
                    })
                })]
            }), e.jsx("section", {
                className: "py-20 px-4",
                children: e.jsx("div", {
                    className: "container mx-auto",
                    children: e.jsxs(u.div, {
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
                        className: "max-w-4xl mx-auto",
                        children: [e.jsxs("h2", {
                            className: "text-2xl md:text-4xl font-bold text-foreground mb-6 flex items-center gap-3",
                            children: [e.jsx(r, {
                                className: "h-8 w-8 text-primary"
                            }), t("aboutPage.vision.title")]
                        }), e.jsx("p", {
                            className: "text-lg text-muted-foreground leading-relaxed",
                            children: t("aboutPage.vision.content")
                        })]
                    })
                })
            }), e.jsx("section", {
                className: "py-20 px-4 bg-card/30",
                children: e.jsxs("div", {
                    className: "container mx-auto",
                    children: [e.jsxs(u.div, {
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
                        children: [e.jsx("h2", {
                            className: "text-2xl md:text-4xl font-bold text-foreground mb-4",
                            children: t("aboutPage.solutions.title")
                        }), e.jsx("p", {
                            className: "text-muted-foreground text-lg max-w-3xl mx-auto",
                            children: t("aboutPage.solutions.subtitle")
                        })]
                    }), e.jsx("div", {
                        className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
                        children: b.map((t, a) => e.jsxs(u.div, {
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
                                delay: .1 * a
                            },
                            className: "bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all",
                            children: [e.jsx("div", {
                                className: "w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4",
                                children: e.jsx(t.icon, {
                                    className: "h-7 w-7 text-primary"
                                })
                            }), e.jsx("h3", {
                                className: "text-xl font-semibold text-foreground mb-3",
                                children: t.title
                            }), e.jsx("p", {
                                className: "text-muted-foreground",
                                children: t.desc
                            })]
                        }, a))
                    })]
                })
            }), e.jsx("section", {
                className: "py-20 px-4",
                children: e.jsxs("div", {
                    className: "container mx-auto",
                    children: [e.jsxs(u.div, {
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
                        children: [e.jsx("h2", {
                            className: "text-2xl md:text-4xl font-bold text-foreground mb-4",
                            children: t("aboutPage.security.title")
                        }), e.jsx("p", {
                            className: "text-muted-foreground text-lg max-w-3xl mx-auto",
                            children: t("aboutPage.security.subtitle")
                        })]
                    }), e.jsx("div", {
                        className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto",
                        children: j.map((t, a) => e.jsxs(u.div, {
                            initial: {
                                opacity: 0,
                                x: g ? 30 : -30
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                delay: .1 * a
                            },
                            className: "flex gap-4 items-start",
                            children: [e.jsx("div", {
                                className: "w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0",
                                children: e.jsx(t.icon, {
                                    className: "h-6 w-6 text-primary"
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("h3", {
                                    className: "text-lg font-semibold text-foreground mb-2",
                                    children: t.title
                                }), e.jsx("p", {
                                    className: "text-muted-foreground",
                                    children: t.desc
                                })]
                            })]
                        }, a))
                    })]
                })
            }), e.jsx("section", {
                className: "py-20 px-4 bg-card/30",
                children: e.jsxs("div", {
                    className: "container mx-auto",
                    children: [e.jsx(u.div, {
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
                        children: e.jsx("h2", {
                            className: "text-2xl md:text-4xl font-bold text-foreground mb-4",
                            children: t("aboutPage.why.title")
                        })
                    }), e.jsx("div", {
                        className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8",
                        children: w.map((t, a) => e.jsxs(u.div, {
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
                                delay: .1 * a
                            },
                            className: "text-center",
                            children: [e.jsx("div", {
                                className: "w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4",
                                children: e.jsx(t.icon, {
                                    className: "h-8 w-8 text-primary"
                                })
                            }), e.jsx("h3", {
                                className: "text-lg font-semibold text-foreground mb-2",
                                children: t.title
                            }), e.jsx("p", {
                                className: "text-muted-foreground text-sm",
                                children: t.desc
                            })]
                        }, a))
                    })]
                })
            }), e.jsx("section", {
                className: "py-20 px-4",
                children: e.jsx("div", {
                    className: "container mx-auto",
                    children: e.jsxs(u.div, {
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
                        className: "max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-12 border border-primary/30",
                        children: [e.jsx("h2", {
                            className: "text-2xl md:text-4xl font-bold text-foreground mb-6",
                            children: t("aboutPage.cta.title")
                        }), e.jsx("p", {
                            className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto",
                            children: t("aboutPage.cta.subtitle")
                        }), e.jsx(n, {
                            to: "/auth",
                            children: e.jsxs(l, {
                                size: "lg",
                                className: "text-lg px-8 py-6 bg-primary hover:bg-primary/90",
                                children: [t("aboutPage.cta.button"), e.jsx(c, {
                                    className: "h-5 w-5 " + (g ? "mr-2 rotate-180" : "ml-2")
                                })]
                            })
                        })]
                    })
                })
            }), e.jsx("footer", {
                className: "py-8 px-4 border-t border-border/50",
                children: e.jsx("div", {
                    className: "container mx-auto text-center text-muted-foreground",
                    children: e.jsx("p", {
                        children: t("footer.rights")
                    })
                })
            })]
        })
    };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
export {
    g as
    default
};