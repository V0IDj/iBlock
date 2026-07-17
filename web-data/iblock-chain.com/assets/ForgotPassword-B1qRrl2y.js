import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as s,
    L as r
} from "./vendor-react-jZB-dUQe.js";
import {
    u as t,
    a,
    S as o,
    B as i,
    I as l,
    A as m,
    s as c
} from "./index-DwXWGlRe.js";
import {
    C as n,
    a as d,
    b as x,
    c as u,
    d as f
} from "./card-DPfJUZyV.js";
import {
    L as p
} from "./label-B5afVXpU.js";
import {
    M as h
} from "./mail-DIkk4pEO.js";
import {
    A as j
} from "./arrow-left-3vVe7vOy.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-motion-CQ1Esm1h.js";
import "./vendor-supabase-Bd7Ft8C2.js";
const g = () => {
    const {
        t: g,
        isRTL: b
    } = t(), [v, N] = s.useState(""), [y, w] = s.useState(!1), [k, L] = s.useState(!1), {
        toast: S
    } = a(), T = b ? j : m, D = b ? "right-3" : "left-3", E = b ? "pr-10" : "pl-10";
    return e.jsxs("div", {
        className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden",
        dir: b ? "rtl" : "ltr",
        children: [e.jsx("div", {
            className: "absolute inset-0 bg-hero-pattern"
        }), e.jsx("div", {
            className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
        }), e.jsxs(n, {
            className: "w-full max-w-md glass-card border-border/50 relative z-10",
            children: [e.jsxs(d, {
                className: "text-center",
                children: [e.jsxs(r, {
                    to: "/auth",
                    className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors",
                    children: [e.jsx(T, {
                        className: "h-4 w-4"
                    }), g("forgot.backToLogin")]
                }), e.jsxs("div", {
                    className: "flex items-center justify-center gap-3 mb-4",
                    children: [e.jsx("div", {
                        className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary",
                        children: e.jsx(o, {
                            className: "h-7 w-7 text-primary-foreground"
                        })
                    }), e.jsx("span", {
                        className: "text-2xl font-bold text-foreground",
                        children: "iBlockchain"
                    })]
                }), e.jsx(x, {
                    className: "text-2xl text-foreground",
                    children: g("forgot.title")
                }), e.jsx(u, {
                    className: "text-muted-foreground",
                    children: g("forgot.desc")
                })]
            }), e.jsx(f, {
                children: k ? e.jsxs("div", {
                    className: "text-center space-y-4",
                    children: [e.jsx("div", {
                        className: "w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto",
                        children: e.jsx(h, {
                            className: "h-8 w-8 text-primary"
                        })
                    }), e.jsx("p", {
                        className: "text-foreground font-medium",
                        children: g("forgot.checkEmail")
                    }), e.jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: g("forgot.checkEmailDesc")
                    }), e.jsx(r, {
                        to: "/auth",
                        children: e.jsx(i, {
                            variant: "outline",
                            className: "mt-4",
                            children: g("forgot.backToLogin")
                        })
                    })]
                }) : e.jsxs("form", {
                    onSubmit: async e => {
                        if (e.preventDefault(), !v) return;
                        w(!0);
                        const {
                            error: s
                        } = await c.auth.resetPasswordForEmail(v, {
                            redirectTo: `${window.location.origin}/reset-password`
                        });
                        s ? S({
                            title: g("forgot.error"),
                            description: s.message,
                            variant: "destructive"
                        }) : (L(!0), S({
                            title: g("forgot.sent"),
                            description: g("forgot.sentDesc")
                        })), w(!1)
                    },
                    className: "space-y-4",
                    children: [e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(p, {
                            htmlFor: "email",
                            children: g("auth.email")
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(h, {
                                className: `absolute ${D} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(l, {
                                id: "email",
                                type: "email",
                                placeholder: "example@email.com",
                                value: v,
                                onChange: e => N(e.target.value),
                                className: E,
                                required: !0
                            })]
                        })]
                    }), e.jsx(i, {
                        type: "submit",
                        className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary",
                        disabled: y,
                        children: g(y ? "auth.loading" : "forgot.submit")
                    })]
                })
            })]
        })]
    })
};
export {
    g as
    default
};