import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as t,
    u as n,
    f as r,
    L as a
} from "./vendor-react-jZB-dUQe.js";
import {
    c as l,
    b as i,
    u as s,
    a as o,
    B as c,
    s as u,
    A as d
} from "./index-DwXWGlRe.js";
import {
    C as p,
    a as m,
    b as f,
    c as v,
    d as g
} from "./card-DPfJUZyV.js";
import {
    M as h
} from "./mail-DIkk4pEO.js";
import {
    A as x
} from "./arrow-left-3vVe7vOy.js";
import "./vendor-query-B_NCFfKJ.js";
import "./vendor-motion-CQ1Esm1h.js";
import "./vendor-supabase-Bd7Ft8C2.js";
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y = l("Dot", [
        ["circle", {
            cx: "12.1",
            cy: "12.1",
            r: "1",
            key: "18d7e5"
        }]
    ]),
    b = l("Timer", [
        ["line", {
            x1: "10",
            x2: "14",
            y1: "2",
            y2: "2",
            key: "14vaq8"
        }],
        ["line", {
            x1: "12",
            x2: "15",
            y1: "14",
            y2: "11",
            key: "17fdiu"
        }],
        ["circle", {
            cx: "12",
            cy: "14",
            r: "8",
            key: "1e1u0o"
        }]
    ]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var w = Object.defineProperty,
    j = Object.defineProperties,
    S = Object.getOwnPropertyDescriptors,
    E = Object.getOwnPropertySymbols,
    C = Object.prototype.hasOwnProperty,
    N = Object.prototype.propertyIsEnumerable,
    k = (e, t, n) => t in e ? w(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n;
var P = ["[data-lastpass-icon-root]", "com-1password-button", "[data-dashlanecreated]", '[style$="2147483647 !important;"]'].join(",");
var M = t.createContext({}),
    T = t.forwardRef((e, n) => {
        var r, a, l, i, s, o = e,
            {
                value: c,
                onChange: u,
                maxLength: d,
                textAlign: p = "left",
                pattern: m,
                placeholder: f,
                inputMode: v = "numeric",
                onComplete: g,
                pushPasswordManagerStrategy: h = "increase-width",
                pasteTransformer: x,
                containerClassName: y,
                noScriptCSSFallback: b = A,
                render: w,
                children: T
            } = o,
            O = ((e, t) => {
                var n = {};
                for (var r in e) C.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                if (null != e && E)
                    for (var r of E(e)) t.indexOf(r) < 0 && N.call(e, r) && (n[r] = e[r]);
                return n
            })(o, ["value", "onChange", "maxLength", "textAlign", "pattern", "placeholder", "inputMode", "onComplete", "pushPasswordManagerStrategy", "pasteTransformer", "containerClassName", "noScriptCSSFallback", "render", "children"]);
        let [D, I] = t.useState("string" == typeof O.defaultValue ? O.defaultValue : ""), B = null != c ? c : D, W = function(e) {
            let n = t.useRef();
            return t.useEffect(() => {
                n.current = e
            }), n.current
        }(B), F = t.useCallback(e => {
            null == u || u(e), I(e)
        }, [u]), _ = t.useMemo(() => m ? "string" == typeof m ? new RegExp(m) : m : null, [m]), L = t.useRef(null), H = t.useRef(null), V = t.useRef({
            value: B,
            onChange: F,
            isIOS: "undefined" != typeof window && (null == (a = null == (r = null == window ? void 0 : window.CSS) ? void 0 : r.supports) ? void 0 : a.call(r, "-webkit-touch-callout", "none"))
        }), $ = t.useRef({
            prev: [null == (l = L.current) ? void 0 : l.selectionStart, null == (i = L.current) ? void 0 : i.selectionEnd, null == (s = L.current) ? void 0 : s.selectionDirection]
        });
        t.useImperativeHandle(n, () => L.current, []), t.useEffect(() => {
            let e = L.current,
                t = H.current;
            if (!e || !t) return;

            function n() {
                if (document.activeElement !== e) return J(null), void Q(null);
                let t, n = e.selectionStart,
                    r = e.selectionEnd,
                    a = e.selectionDirection,
                    l = e.maxLength,
                    i = e.value,
                    s = $.current.prev,
                    o = -1,
                    c = -1;
                if (0 !== i.length && null !== n && null !== r) {
                    let e = n === r,
                        a = n === i.length && i.length < l;
                    if (e && !a) {
                        let e = n;
                        if (0 === e) o = 0, c = 1, t = "forward";
                        else if (e === l) o = e - 1, c = e, t = "backward";
                        else if (l > 1 && i.length > 1) {
                            let n = 0;
                            if (null !== s[0] && null !== s[1]) {
                                t = e < s[1] ? "backward" : "forward";
                                let r = s[0] === s[1] && s[0] < l;
                                "backward" === t && !r && (n = -1)
                            }
                            o = n + e, c = n + e + 1
                        }
                    } - 1 !== o && -1 !== c && o !== c && L.current.setSelectionRange(o, c, t)
                }
                let u = -1 !== o ? o : n,
                    d = -1 !== c ? c : r,
                    p = null != t ? t : a;
                J(u), Q(d), $.current.prev = [u, d, p]
            }
            if (V.current.value !== e.value && V.current.onChange(e.value), $.current.prev = [e.selectionStart, e.selectionEnd, e.selectionDirection], document.addEventListener("selectionchange", n, {
                    capture: !0
                }), n(), document.activeElement === e && U(!0), !document.getElementById("input-otp-style")) {
                let e = document.createElement("style");
                if (e.id = "input-otp-style", document.head.appendChild(e), e.sheet) {
                    let t = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
                    R(e.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), R(e.sheet, `[data-input-otp]:autofill { ${t} }`), R(e.sheet, `[data-input-otp]:-webkit-autofill { ${t} }`), R(e.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), R(e.sheet, "[data-input-otp] + * { pointer-events: all !important; }")
                }
            }
            let r = () => {
                t && t.style.setProperty("--root-height", `${e.clientHeight}px`)
            };
            r();
            let a = new ResizeObserver(r);
            return a.observe(e), () => {
                document.removeEventListener("selectionchange", n, {
                    capture: !0
                }), a.disconnect()
            }
        }, []);
        let [z, G] = t.useState(!1), [q, U] = t.useState(!1), [X, J] = t.useState(null), [K, Q] = t.useState(null);
        t.useEffect(() => {
            ! function(e) {
                setTimeout(e, 0), setTimeout(e, 10), setTimeout(e, 50)
            }(() => {
                var e, t, n, r;
                null == (e = L.current) || e.dispatchEvent(new Event("input"));
                let a = null == (t = L.current) ? void 0 : t.selectionStart,
                    l = null == (n = L.current) ? void 0 : n.selectionEnd,
                    i = null == (r = L.current) ? void 0 : r.selectionDirection;
                null !== a && null !== l && (J(a), Q(l), $.current.prev = [a, l, i])
            })
        }, [B, q]), t.useEffect(() => {
            void 0 !== W && B !== W && W.length < d && B.length === d && (null == g || g(B))
        }, [d, g, W, B]);
        let Y = function({
                containerRef: e,
                inputRef: n,
                pushPasswordManagerStrategy: r,
                isFocused: a
            }) {
                let [l, i] = t.useState(!1), [s, o] = t.useState(!1), [c, u] = t.useState(!1), d = t.useMemo(() => "none" !== r && ("increase-width" === r || "experimental-no-flickering" === r) && l && s, [l, s, r]), p = t.useCallback(() => {
                    let t = e.current,
                        a = n.current;
                    if (!t || !a || c || "none" === r) return;
                    let l = t,
                        s = l.getBoundingClientRect().left + l.offsetWidth - 18,
                        o = l.getBoundingClientRect().top + l.offsetHeight / 2;
                    0 === document.querySelectorAll(P).length && document.elementFromPoint(s, o) === t || (i(!0), u(!0))
                }, [e, n, c, r]);
                return t.useEffect(() => {
                    let t = e.current;
                    if (!t || "none" === r) return;

                    function n() {
                        let e = window.innerWidth - t.getBoundingClientRect().right;
                        o(e >= 40)
                    }
                    n();
                    let a = setInterval(n, 1e3);
                    return () => {
                        clearInterval(a)
                    }
                }, [e, r]), t.useEffect(() => {
                    let e = a || document.activeElement === n.current;
                    if ("none" === r || !e) return;
                    let t = setTimeout(p, 0),
                        l = setTimeout(p, 2e3),
                        i = setTimeout(p, 5e3),
                        s = setTimeout(() => {
                            u(!0)
                        }, 6e3);
                    return () => {
                        clearTimeout(t), clearTimeout(l), clearTimeout(i), clearTimeout(s)
                    }
                }, [n, a, r, p]), {
                    hasPWMBadge: l,
                    willPushPWMBadge: d,
                    PWM_BADGE_SPACE_WIDTH: "40px"
                }
            }({
                containerRef: H,
                inputRef: L,
                pushPasswordManagerStrategy: h,
                isFocused: q
            }),
            Z = t.useCallback(e => {
                let t = e.currentTarget.value.slice(0, d);
                t.length > 0 && _ && !_.test(t) ? e.preventDefault() : ("string" == typeof W && t.length < W.length && document.dispatchEvent(new Event("selectionchange")), F(t))
            }, [d, F, W, _]),
            ee = t.useCallback(() => {
                var e;
                if (L.current) {
                    let t = Math.min(L.current.value.length, d - 1),
                        n = L.current.value.length;
                    null == (e = L.current) || e.setSelectionRange(t, n), J(t), Q(n)
                }
                U(!0)
            }, [d]),
            te = t.useCallback(e => {
                var t, n;
                let r = L.current;
                if (!(x || V.current.isIOS && e.clipboardData && r)) return;
                let a = e.clipboardData.getData("text/plain"),
                    l = x ? x(a) : a;
                e.preventDefault();
                let i = null == (t = L.current) ? void 0 : t.selectionStart,
                    s = null == (n = L.current) ? void 0 : n.selectionEnd,
                    o = (i !== s ? B.slice(0, i) + l + B.slice(s) : B.slice(0, i) + l + B.slice(i)).slice(0, d);
                if (o.length > 0 && _ && !_.test(o)) return;
                r.value = o, F(o);
                let c = Math.min(o.length, d - 1),
                    u = o.length;
                r.setSelectionRange(c, u), J(c), Q(u)
            }, [d, F, _, B]),
            ne = t.useMemo(() => ({
                position: "relative",
                cursor: O.disabled ? "default" : "text",
                userSelect: "none",
                WebkitUserSelect: "none",
                pointerEvents: "none"
            }), [O.disabled]),
            re = t.useMemo(() => ({
                position: "absolute",
                inset: 0,
                width: Y.willPushPWMBadge ? `calc(100% + ${Y.PWM_BADGE_SPACE_WIDTH})` : "100%",
                clipPath: Y.willPushPWMBadge ? `inset(0 ${Y.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0,
                height: "100%",
                display: "flex",
                textAlign: p,
                opacity: "1",
                color: "transparent",
                pointerEvents: "all",
                background: "transparent",
                caretColor: "transparent",
                border: "0 solid transparent",
                outline: "0 solid transparent",
                boxShadow: "none",
                lineHeight: "1",
                letterSpacing: "-.5em",
                fontSize: "var(--root-height)",
                fontFamily: "monospace",
                fontVariantNumeric: "tabular-nums"
            }), [Y.PWM_BADGE_SPACE_WIDTH, Y.willPushPWMBadge, p]),
            ae = t.useMemo(() => t.createElement("input", ((e, t) => j(e, S(t)))(((e, t) => {
                for (var n in t || (t = {})) C.call(t, n) && k(e, n, t[n]);
                if (E)
                    for (var n of E(t)) N.call(t, n) && k(e, n, t[n]);
                return e
            })({
                autoComplete: O.autoComplete || "one-time-code"
            }, O), {
                "data-input-otp": !0,
                "data-input-otp-placeholder-shown": 0 === B.length || void 0,
                "data-input-otp-mss": X,
                "data-input-otp-mse": K,
                inputMode: v,
                pattern: null == _ ? void 0 : _.source,
                "aria-placeholder": f,
                style: re,
                maxLength: d,
                value: B,
                ref: L,
                onPaste: e => {
                    var t;
                    te(e), null == (t = O.onPaste) || t.call(O, e)
                },
                onChange: Z,
                onMouseOver: e => {
                    var t;
                    G(!0), null == (t = O.onMouseOver) || t.call(O, e)
                },
                onMouseLeave: e => {
                    var t;
                    G(!1), null == (t = O.onMouseLeave) || t.call(O, e)
                },
                onFocus: e => {
                    var t;
                    ee(), null == (t = O.onFocus) || t.call(O, e)
                },
                onBlur: e => {
                    var t;
                    U(!1), null == (t = O.onBlur) || t.call(O, e)
                }
            })), [Z, ee, te, v, re, d, K, X, O, null == _ ? void 0 : _.source, B]),
            le = t.useMemo(() => ({
                slots: Array.from({
                    length: d
                }).map((e, t) => {
                    var n;
                    let r = q && null !== X && null !== K && (X === K && t === X || t >= X && t < K),
                        a = void 0 !== B[t] ? B[t] : null;
                    return {
                        char: a,
                        placeholderChar: void 0 !== B[0] ? null : null != (n = null == f ? void 0 : f[t]) ? n : null,
                        isActive: r,
                        hasFakeCaret: r && null === a
                    }
                }),
                isFocused: q,
                isHovering: !O.disabled && z
            }), [q, z, d, K, X, O.disabled, B]),
            ie = t.useMemo(() => w ? w(le) : t.createElement(M.Provider, {
                value: le
            }, T), [T, le, w]);
        return t.createElement(t.Fragment, null, null !== b && t.createElement("noscript", null, t.createElement("style", null, b)), t.createElement("div", {
            ref: H,
            "data-input-otp-container": !0,
            style: ne,
            className: y
        }, ie, t.createElement("div", {
            style: {
                position: "absolute",
                inset: 0,
                pointerEvents: "none"
            }
        }, ae)))
    });

function R(e, t) {
    try {
        e.insertRule(t)
    } catch (n) {}
}
T.displayName = "Input";
var A = "\n[data-input-otp] {\n  --nojs-bg: white !important;\n  --nojs-fg: black !important;\n\n  background-color: var(--nojs-bg) !important;\n  color: var(--nojs-fg) !important;\n  caret-color: var(--nojs-fg) !important;\n  letter-spacing: .25em !important;\n  text-align: center !important;\n  border: 1px solid var(--nojs-fg) !important;\n  border-radius: 4px !important;\n  width: 100% !important;\n}\n@media (prefers-color-scheme: dark) {\n  [data-input-otp] {\n    --nojs-bg: black !important;\n    --nojs-fg: white !important;\n  }\n}";
const O = t.forwardRef(({
    className: t,
    containerClassName: n,
    ...r
}, a) => e.jsx(T, {
    ref: a,
    containerClassName: i("flex items-center gap-2 has-[:disabled]:opacity-50", n),
    className: i("disabled:cursor-not-allowed", t),
    ...r
}));
O.displayName = "InputOTP";
const D = t.forwardRef(({
    className: t,
    ...n
}, r) => e.jsx("div", {
    ref: r,
    className: i("flex items-center", t),
    ...n
}));
D.displayName = "InputOTPGroup";
const I = t.forwardRef(({
    index: n,
    className: r,
    ...a
}, l) => {
    const s = t.useContext(M),
        {
            char: o,
            hasFakeCaret: c,
            isActive: u
        } = s.slots[n];
    return e.jsxs("div", {
        ref: l,
        className: i("relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", u && "z-10 ring-2 ring-ring ring-offset-background", r),
        ...a,
        children: [o, c && e.jsx("div", {
            className: "pointer-events-none absolute inset-0 flex items-center justify-center",
            children: e.jsx("div", {
                className: "animate-caret-blink h-4 w-px bg-foreground duration-1000"
            })
        })]
    })
});
I.displayName = "InputOTPSlot";
t.forwardRef(({ ...t
}, n) => e.jsx("div", {
    ref: n,
    role: "separator",
    ...t,
    children: e.jsx(y, {})
})).displayName = "InputOTPSeparator";
const B = () => {
    const {
        t: l,
        isRTL: i,
        language: y
    } = s(), [w] = n(), j = w.get("email") || "", [S, E] = t.useState(""), [C, N] = t.useState(!1), [k, P] = t.useState(!1), [M, T] = t.useState(60), [R, A] = t.useState(!1), B = r(), {
        toast: W
    } = o(), F = sessionStorage.getItem("pendingVerificationEmail") || j;
    t.useEffect(() => {
        if (M > 0 && !R) {
            const e = setTimeout(() => {
                T(e => e - 1)
            }, 1e3);
            return () => clearTimeout(e)
        }
        0 === M && A(!0)
    }, [M, R]), t.useEffect(() => {
        F || B("/auth?mode=signup")
    }, [F, B]);
    const _ = i ? x : d;
    return e.jsxs("div", {
        className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden",
        dir: i ? "rtl" : "ltr",
        children: [e.jsx("div", {
            className: "absolute inset-0 bg-hero-pattern"
        }), e.jsx("div", {
            className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
        }), e.jsxs(p, {
            className: "w-full max-w-md glass-card border-border/50 relative z-10",
            children: [e.jsxs(m, {
                className: "text-center",
                children: [e.jsxs(a, {
                    to: "/auth?mode=signup",
                    className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors",
                    children: [e.jsx(_, {
                        className: "h-4 w-4"
                    }), l("auth.backToHome")]
                }), e.jsx("div", {
                    className: "flex items-center justify-center gap-3 mb-4",
                    children: e.jsx("div", {
                        className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary",
                        children: e.jsx(h, {
                            className: "h-7 w-7 text-primary-foreground"
                        })
                    })
                }), e.jsx(f, {
                    className: "text-2xl text-foreground",
                    children: l("verify.title")
                }), e.jsx(v, {
                    className: "text-muted-foreground",
                    children: l("verify.subtitle")
                }), F && e.jsxs("p", {
                    className: "text-sm text-primary mt-2 font-medium",
                    children: [l("verify.codeSent"), ": ", F]
                })]
            }), e.jsxs(g, {
                className: "space-y-6",
                children: [e.jsx("div", {
                    className: "flex justify-center",
                    children: e.jsx(O, {
                        maxLength: 6,
                        value: S,
                        onChange: e => E(e),
                        children: e.jsxs(D, {
                            children: [e.jsx(I, {
                                index: 0
                            }), e.jsx(I, {
                                index: 1
                            }), e.jsx(I, {
                                index: 2
                            }), e.jsx(I, {
                                index: 3
                            }), e.jsx(I, {
                                index: 4
                            }), e.jsx(I, {
                                index: 5
                            })]
                        })
                    })
                }), e.jsx(c, {
                    onClick: async () => {
                        if (F && 6 === S.length) {
                            N(!0);
                            try {
                                const {
                                    data: e,
                                    error: t
                                } = await u.functions.invoke("verify-signup-code", {
                                    body: {
                                        email: F,
                                        code: S
                                    }
                                });
                                if (t) throw t;
                                if (!(null == e ? void 0 : e.success)) throw new Error((null == e ? void 0 : e.error) || "Verification failed");
                                sessionStorage.removeItem("pendingVerificationEmail"), W({
                                    title: l("verify.success"),
                                    description: l("verify.redirecting")
                                }), W({
                                    title: l("verify.success"),
                                    description: l("auth.loginSuccess")
                                }), B("/auth?mode=login")
                            } catch (e) {
                                W({
                                    title: l("verify.invalidCode"),
                                    description: e.message || l("verify.tryAgain"),
                                    variant: "destructive"
                                })
                            } finally {
                                N(!1)
                            }
                        }
                    },
                    className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary",
                    disabled: C || 6 !== S.length,
                    children: l(C ? "verify.verifying" : "verify.verifyButton")
                }), e.jsx("div", {
                    className: "text-center space-y-2",
                    children: !R && M > 0 ? e.jsxs("div", {
                        className: "flex items-center justify-center gap-2 text-muted-foreground text-sm",
                        children: [e.jsx(b, {
                            className: "h-4 w-4"
                        }), e.jsxs("span", {
                            children: [l("verify.resendAfter"), " ", e.jsx("span", {
                                className: "font-mono text-primary font-semibold",
                                children: M
                            }), " ", l("verify.seconds")]
                        })]
                    }) : e.jsx("button", {
                        type: "button",
                        onClick: async () => {
                            if (F && R) {
                                P(!0);
                                try {
                                    W({
                                        title: l("verify.resendInfo"),
                                        description: l("verify.pleaseSignupAgain"),
                                        variant: "default"
                                    }), B("/auth?mode=signup")
                                } catch (e) {
                                    W({
                                        title: l("verify.sendError"),
                                        description: e.message,
                                        variant: "destructive"
                                    })
                                } finally {
                                    P(!1), T(60), A(!1)
                                }
                            }
                        },
                        disabled: k || !R,
                        className: "text-primary hover:underline text-sm disabled:opacity-50",
                        children: l(k ? "verify.resending" : "verify.resendCode")
                    })
                })]
            })]
        })]
    })
};
export {
    B as
    default
};