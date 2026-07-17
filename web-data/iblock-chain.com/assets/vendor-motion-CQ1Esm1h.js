import {
    j as t
} from "./vendor-ui-H0MweODj.js";
import {
    r as e
} from "./vendor-react-jZB-dUQe.js";
const n = e.createContext({});

function i(t) {
    const n = e.useRef(null);
    return null === n.current && (n.current = t()), n.current
}
const s = "undefined" != typeof window,
    o = s ? e.useLayoutEffect : e.useEffect,
    r = e.createContext(null);

function a(t, e) {
    -1 === t.indexOf(e) && t.push(e)
}

function l(t, e) {
    const n = t.indexOf(e);
    n > -1 && t.splice(n, 1)
}
const u = (t, e, n) => n > e ? e : n < t ? t : n;
let h = () => {},
    c = () => {};
const d = {},
    p = t => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);

function m(t) {
    return "object" == typeof t && null !== t
}
const f = t => /^0[^.\s]+$/u.test(t);

function g(t) {
    let e;
    return () => (void 0 === e && (e = t()), e)
}
const y = t => t,
    v = (t, e) => n => e(t(n)),
    x = (...t) => t.reduce(v),
    w = (t, e, n) => {
        const i = e - t;
        return 0 === i ? 1 : (n - t) / i
    };
class T {
    constructor() {
        this.subscriptions = []
    }
    add(t) {
        return a(this.subscriptions, t), () => l(this.subscriptions, t)
    }
    notify(t, e, n) {
        const i = this.subscriptions.length;
        if (i)
            if (1 === i) this.subscriptions[0](t, e, n);
            else
                for (let s = 0; s < i; s++) {
                    const i = this.subscriptions[s];
                    i && i(t, e, n)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const P = t => 1e3 * t,
    S = t => t / 1e3;

function b(t, e) {
    return e ? t * (1e3 / e) : 0
}
const A = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t;

function E(t, e, n, i) {
    if (t === e && n === i) return y;
    const s = e => function(t, e, n, i, s) {
        let o, r, a = 0;
        do {
            r = e + (n - e) / 2, o = A(r, i, s) - t, o > 0 ? n = r : e = r
        } while (Math.abs(o) > 1e-7 && ++a < 12);
        return r
    }(e, 0, 1, t, n);
    return t => 0 === t || 1 === t ? t : A(s(t), e, i)
}
const M = t => e => e <= .5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
    C = t => e => 1 - t(1 - e),
    V = E(.33, 1.53, .69, .99),
    D = C(V),
    k = M(D),
    R = t => (t *= 2) < 1 ? .5 * D(t) : .5 * (2 - Math.pow(2, -10 * (t - 1))),
    L = t => 1 - Math.sin(Math.acos(t)),
    j = C(L),
    B = M(L),
    F = E(.42, 0, 1, 1),
    I = E(0, 0, .58, 1),
    O = E(.42, 0, .58, 1),
    U = t => Array.isArray(t) && "number" != typeof t[0];

function W(t, e) {
    return U(t) ? t[((t, e, n) => {
        const i = e - t;
        return ((n - t) % i + i) % i + t
    })(0, t.length, e)] : t
}
const $ = t => Array.isArray(t) && "number" == typeof t[0],
    N = {
        linear: y,
        easeIn: F,
        easeInOut: O,
        easeOut: I,
        circIn: L,
        circInOut: B,
        circOut: j,
        backIn: D,
        backInOut: k,
        backOut: V,
        anticipate: R
    },
    Y = t => {
        if ($(t)) {
            c(4 === t.length, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
            const [e, n, i, s] = t;
            return E(e, n, i, s)
        }
        return "string" == typeof t ? (c(void 0 !== N[t], `Invalid easing type '${t}'`, "invalid-easing-type"), N[t]) : t
    },
    X = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"],
    z = {
        value: null,
        addProjectionMetrics: null
    };

function K(t, e) {
    let n = !1,
        i = !0;
    const s = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        },
        o = () => n = !0,
        r = X.reduce((t, n) => (t[n] = function(t, e) {
            let n = new Set,
                i = new Set,
                s = !1,
                o = !1;
            const r = new WeakSet;
            let a = {
                    delta: 0,
                    timestamp: 0,
                    isProcessing: !1
                },
                l = 0;

            function u(e) {
                r.has(e) && (h.schedule(e), t()), l++, e(a)
            }
            const h = {
                schedule: (t, e = !1, o = !1) => {
                    const a = o && s ? n : i;
                    return e && r.add(t), a.has(t) || a.add(t), t
                },
                cancel: t => {
                    i.delete(t), r.delete(t)
                },
                process: t => {
                    a = t, s ? o = !0 : (s = !0, [n, i] = [i, n], n.forEach(u), e && z.value && z.value.frameloop[e].push(l), l = 0, n.clear(), s = !1, o && (o = !1, h.process(t)))
                }
            };
            return h
        }(o, e ? n : void 0), t), {}),
        {
            setup: a,
            read: l,
            resolveKeyframes: u,
            preUpdate: h,
            update: c,
            preRender: p,
            render: m,
            postRender: f
        } = r,
        g = () => {
            const o = d.useManualTiming ? s.timestamp : performance.now();
            n = !1, d.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(o - s.timestamp, 40), 1)), s.timestamp = o, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), h.process(s), c.process(s), p.process(s), m.process(s), f.process(s), s.isProcessing = !1, n && e && (i = !1, t(g))
        };
    return {
        schedule: X.reduce((e, o) => {
            const a = r[o];
            return e[o] = (e, o = !1, r = !1) => (n || (n = !0, i = !0, s.isProcessing || t(g)), a.schedule(e, o, r)), e
        }, {}),
        cancel: t => {
            for (let e = 0; e < X.length; e++) r[X[e]].cancel(t)
        },
        state: s,
        steps: r
    }
}
const {
    schedule: H,
    cancel: G,
    state: q,
    steps: Z
} = K("undefined" != typeof requestAnimationFrame ? requestAnimationFrame : y, !0);
let _;

function J() {
    _ = void 0
}
const Q = {
        now: () => (void 0 === _ && Q.set(q.isProcessing || d.useManualTiming ? q.timestamp : performance.now()), _),
        set: t => {
            _ = t, queueMicrotask(J)
        }
    },
    tt = t => e => "string" == typeof e && e.startsWith(t),
    et = tt("--"),
    nt = tt("var(--"),
    it = t => !!nt(t) && st.test(t.split("/*")[0].trim()),
    st = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

function ot(t) {
    return "string" == typeof t && t.split("/*")[0].includes("var(--")
}
const rt = {
        test: t => "number" == typeof t,
        parse: parseFloat,
        transform: t => t
    },
    at = { ...rt,
        transform: t => u(0, 1, t)
    },
    lt = { ...rt,
        default: 1
    },
    ut = t => Math.round(1e5 * t) / 1e5,
    ht = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
const ct = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    dt = (t, e) => n => Boolean("string" == typeof n && ct.test(n) && n.startsWith(t) || e && ! function(t) {
        return null == t
    }(n) && Object.prototype.hasOwnProperty.call(n, e)),
    pt = (t, e, n) => i => {
        if ("string" != typeof i) return i;
        const [s, o, r, a] = i.match(ht);
        return {
            [t]: parseFloat(s),
            [e]: parseFloat(o),
            [n]: parseFloat(r),
            alpha: void 0 !== a ? parseFloat(a) : 1
        }
    },
    mt = { ...rt,
        transform: t => Math.round((t => u(0, 255, t))(t))
    },
    ft = {
        test: dt("rgb", "red"),
        parse: pt("red", "green", "blue"),
        transform: ({
            red: t,
            green: e,
            blue: n,
            alpha: i = 1
        }) => "rgba(" + mt.transform(t) + ", " + mt.transform(e) + ", " + mt.transform(n) + ", " + ut(at.transform(i)) + ")"
    };
const gt = {
        test: dt("#"),
        parse: function(t) {
            let e = "",
                n = "",
                i = "",
                s = "";
            return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
                red: parseInt(e, 16),
                green: parseInt(n, 16),
                blue: parseInt(i, 16),
                alpha: s ? parseInt(s, 16) / 255 : 1
            }
        },
        transform: ft.transform
    },
    yt = t => ({
        test: e => "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
        parse: parseFloat,
        transform: e => `${e}${t}`
    }),
    vt = yt("deg"),
    xt = yt("%"),
    wt = yt("px"),
    Tt = yt("vh"),
    Pt = yt("vw"),
    St = (() => ({ ...xt,
        parse: t => xt.parse(t) / 100,
        transform: t => xt.transform(100 * t)
    }))(),
    bt = {
        test: dt("hsl", "hue"),
        parse: pt("hue", "saturation", "lightness"),
        transform: ({
            hue: t,
            saturation: e,
            lightness: n,
            alpha: i = 1
        }) => "hsla(" + Math.round(t) + ", " + xt.transform(ut(e)) + ", " + xt.transform(ut(n)) + ", " + ut(at.transform(i)) + ")"
    },
    At = {
        test: t => ft.test(t) || gt.test(t) || bt.test(t),
        parse: t => ft.test(t) ? ft.parse(t) : bt.test(t) ? bt.parse(t) : gt.parse(t),
        transform: t => "string" == typeof t ? t : t.hasOwnProperty("red") ? ft.transform(t) : bt.transform(t),
        getAnimatableNone: t => {
            const e = At.parse(t);
            return e.alpha = 0, At.transform(e)
        }
    },
    Et = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
const Mt = "number",
    Ct = "color",
    Vt = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;

function Dt(t) {
    const e = t.toString(),
        n = [],
        i = {
            color: [],
            number: [],
            var: []
        },
        s = [];
    let o = 0;
    const r = e.replace(Vt, t => (At.test(t) ? (i.color.push(o), s.push(Ct), n.push(At.parse(t))) : t.startsWith("var(") ? (i.var.push(o), s.push("var"), n.push(t)) : (i.number.push(o), s.push(Mt), n.push(parseFloat(t))), ++o, "${}")).split("${}");
    return {
        values: n,
        split: r,
        indexes: i,
        types: s
    }
}

function kt(t) {
    return Dt(t).values
}

function Rt(t) {
    const {
        split: e,
        types: n
    } = Dt(t), i = e.length;
    return t => {
        let s = "";
        for (let o = 0; o < i; o++)
            if (s += e[o], void 0 !== t[o]) {
                const e = n[o];
                s += e === Mt ? ut(t[o]) : e === Ct ? At.transform(t[o]) : t[o]
            }
        return s
    }
}
const Lt = t => "number" == typeof t ? 0 : At.test(t) ? At.getAnimatableNone(t) : t;
const jt = {
    test: function(t) {
        var e, n;
        return isNaN(t) && "string" == typeof t && ((null == (e = t.match(ht)) ? void 0 : e.length) || 0) + ((null == (n = t.match(Et)) ? void 0 : n.length) || 0) > 0
    },
    parse: kt,
    createTransformer: Rt,
    getAnimatableNone: function(t) {
        const e = kt(t);
        return Rt(t)(e.map(Lt))
    }
};

function Bt(t, e, n) {
    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t
}

function Ft(t, e) {
    return n => n > 0 ? e : t
}
const It = (t, e, n) => t + (e - t) * n,
    Ot = (t, e, n) => {
        const i = t * t,
            s = n * (e * e - i) + i;
        return s < 0 ? 0 : Math.sqrt(s)
    },
    Ut = [gt, ft, bt];

function Wt(t) {
    const e = (n = t, Ut.find(t => t.test(n)));
    var n;
    if (h(Boolean(e), `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !Boolean(e)) return !1;
    let i = e.parse(t);
    return e === bt && (i = function({
        hue: t,
        saturation: e,
        lightness: n,
        alpha: i
    }) {
        t /= 360, n /= 100;
        let s = 0,
            o = 0,
            r = 0;
        if (e /= 100) {
            const i = n < .5 ? n * (1 + e) : n + e - n * e,
                a = 2 * n - i;
            s = Bt(a, i, t + 1 / 3), o = Bt(a, i, t), r = Bt(a, i, t - 1 / 3)
        } else s = o = r = n;
        return {
            red: Math.round(255 * s),
            green: Math.round(255 * o),
            blue: Math.round(255 * r),
            alpha: i
        }
    }(i)), i
}
const $t = (t, e) => {
        const n = Wt(t),
            i = Wt(e);
        if (!n || !i) return Ft(t, e);
        const s = { ...n
        };
        return t => (s.red = Ot(n.red, i.red, t), s.green = Ot(n.green, i.green, t), s.blue = Ot(n.blue, i.blue, t), s.alpha = It(n.alpha, i.alpha, t), ft.transform(s))
    },
    Nt = new Set(["none", "hidden"]);

function Yt(t, e) {
    return n => It(t, e, n)
}

function Xt(t) {
    return "number" == typeof t ? Yt : "string" == typeof t ? it(t) ? Ft : At.test(t) ? $t : Ht : Array.isArray(t) ? zt : "object" == typeof t ? At.test(t) ? $t : Kt : Ft
}

function zt(t, e) {
    const n = [...t],
        i = n.length,
        s = t.map((t, n) => Xt(t)(t, e[n]));
    return t => {
        for (let e = 0; e < i; e++) n[e] = s[e](t);
        return n
    }
}

function Kt(t, e) {
    const n = { ...t,
            ...e
        },
        i = {};
    for (const s in n) void 0 !== t[s] && void 0 !== e[s] && (i[s] = Xt(t[s])(t[s], e[s]));
    return t => {
        for (const e in i) n[e] = i[e](t);
        return n
    }
}
const Ht = (t, e) => {
    const n = jt.createTransformer(e),
        i = Dt(t),
        s = Dt(e);
    return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Nt.has(t) && !s.values.length || Nt.has(e) && !i.values.length ? function(t, e) {
        return Nt.has(t) ? n => n <= 0 ? t : e : n => n >= 1 ? e : t
    }(t, e) : x(zt(function(t, e) {
        const n = [],
            i = {
                color: 0,
                var: 0,
                number: 0
            };
        for (let s = 0; s < e.values.length; s++) {
            const o = e.types[s],
                r = t.indexes[o][i[o]],
                a = t.values[r] ? ? 0;
            n[s] = a, i[o]++
        }
        return n
    }(i, s), s.values), n) : (h(!0, `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Ft(t, e))
};

function Gt(t, e, n) {
    if ("number" == typeof t && "number" == typeof e && "number" == typeof n) return It(t, e, n);
    return Xt(t)(t, e)
}
const qt = t => {
        const e = ({
            timestamp: e
        }) => t(e);
        return {
            start: (t = !0) => H.update(e, t),
            stop: () => G(e),
            now: () => q.isProcessing ? q.timestamp : Q.now()
        }
    },
    Zt = (t, e, n = 10) => {
        let i = "";
        const s = Math.max(Math.round(e / n), 2);
        for (let o = 0; o < s; o++) i += Math.round(1e4 * t(o / (s - 1))) / 1e4 + ", ";
        return `linear(${i.substring(0,i.length-2)})`
    },
    _t = 2e4;

function Jt(t) {
    let e = 0;
    let n = t.next(e);
    for (; !n.done && e < _t;) e += 50, n = t.next(e);
    return e >= _t ? 1 / 0 : e
}

function Qt(t, e = 100, n) {
    const i = n({ ...t,
            keyframes: [0, e]
        }),
        s = Math.min(Jt(i), _t);
    return {
        type: "keyframes",
        ease: t => i.next(s * t).value / e,
        duration: S(s)
    }
}

function te(t, e, n) {
    const i = Math.max(e - 5, 0);
    return b(n - t(i), e - i)
}
const ee = 100,
    ne = 10,
    ie = 1,
    se = 0,
    oe = 800,
    re = .3,
    ae = .3,
    le = {
        granular: .01,
        default: 2
    },
    ue = {
        granular: .005,
        default: .5
    },
    he = .01,
    ce = 10,
    de = .05,
    pe = 1,
    me = .001;

function fe({
    duration: t = oe,
    bounce: e = re,
    velocity: n = se,
    mass: i = ie
}) {
    let s, o;
    h(t <= P(ce), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let r = 1 - e;
    r = u(de, pe, r), t = u(he, ce, S(t)), r < 1 ? (s = e => {
        const i = e * r,
            s = i * t,
            o = i - n,
            a = ye(e, r),
            l = Math.exp(-s);
        return me - o / a * l
    }, o = e => {
        const i = e * r * t,
            o = i * n + n,
            a = Math.pow(r, 2) * Math.pow(e, 2) * t,
            l = Math.exp(-i),
            u = ye(Math.pow(e, 2), r);
        return (-s(e) + me > 0 ? -1 : 1) * ((o - a) * l) / u
    }) : (s = e => Math.exp(-e * t) * ((e - n) * t + 1) - .001, o = e => Math.exp(-e * t) * (t * t * (n - e)));
    const a = function(t, e, n) {
        let i = n;
        for (let s = 1; s < ge; s++) i -= t(i) / e(i);
        return i
    }(s, o, 5 / t);
    if (t = P(t), isNaN(a)) return {
        stiffness: ee,
        damping: ne,
        duration: t
    }; {
        const e = Math.pow(a, 2) * i;
        return {
            stiffness: e,
            damping: 2 * r * Math.sqrt(i * e),
            duration: t
        }
    }
}
const ge = 12;

function ye(t, e) {
    return t * Math.sqrt(1 - e * e)
}
const ve = ["duration", "bounce"],
    xe = ["stiffness", "damping", "mass"];

function we(t, e) {
    return e.some(e => void 0 !== t[e])
}

function Te(t = ae, e = re) {
    const n = "object" != typeof t ? {
        visualDuration: t,
        keyframes: [0, 1],
        bounce: e
    } : t;
    let {
        restSpeed: i,
        restDelta: s
    } = n;
    const o = n.keyframes[0],
        r = n.keyframes[n.keyframes.length - 1],
        a = {
            done: !1,
            value: o
        },
        {
            stiffness: l,
            damping: h,
            mass: c,
            duration: d,
            velocity: p,
            isResolvedFromDuration: m
        } = function(t) {
            let e = {
                velocity: se,
                stiffness: ee,
                damping: ne,
                mass: ie,
                isResolvedFromDuration: !1,
                ...t
            };
            if (!we(t, xe) && we(t, ve))
                if (t.visualDuration) {
                    const n = t.visualDuration,
                        i = 2 * Math.PI / (1.2 * n),
                        s = i * i,
                        o = 2 * u(.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
                    e = { ...e,
                        mass: ie,
                        stiffness: s,
                        damping: o
                    }
                } else {
                    const n = fe(t);
                    e = { ...e,
                        ...n,
                        mass: ie
                    }, e.isResolvedFromDuration = !0
                }
            return e
        }({ ...n,
            velocity: -S(n.velocity || 0)
        }),
        f = p || 0,
        g = h / (2 * Math.sqrt(l * c)),
        y = r - o,
        v = S(Math.sqrt(l / c)),
        x = Math.abs(y) < 5;
    let w;
    if (i || (i = x ? le.granular : le.default), s || (s = x ? ue.granular : ue.default), g < 1) {
        const t = ye(v, g);
        w = e => {
            const n = Math.exp(-g * v * e);
            return r - n * ((f + g * v * y) / t * Math.sin(t * e) + y * Math.cos(t * e))
        }
    } else if (1 === g) w = t => r - Math.exp(-v * t) * (y + (f + v * y) * t);
    else {
        const t = v * Math.sqrt(g * g - 1);
        w = e => {
            const n = Math.exp(-g * v * e),
                i = Math.min(t * e, 300);
            return r - n * ((f + g * v * y) * Math.sinh(i) + t * y * Math.cosh(i)) / t
        }
    }
    const T = {
        calculatedDuration: m && d || null,
        next: t => {
            const e = w(t);
            if (m) a.done = t >= d;
            else {
                let n = 0 === t ? f : 0;
                g < 1 && (n = 0 === t ? P(f) : te(w, t, e));
                const o = Math.abs(n) <= i,
                    l = Math.abs(r - e) <= s;
                a.done = o && l
            }
            return a.value = a.done ? r : e, a
        },
        toString: () => {
            const t = Math.min(Jt(T), _t),
                e = Zt(e => T.next(t * e).value, t, 30);
            return t + "ms " + e
        },
        toTransition: () => {}
    };
    return T
}

function Pe({
    keyframes: t,
    velocity: e = 0,
    power: n = .8,
    timeConstant: i = 325,
    bounceDamping: s = 10,
    bounceStiffness: o = 500,
    modifyTarget: r,
    min: a,
    max: l,
    restDelta: u = .5,
    restSpeed: h
}) {
    const c = t[0],
        d = {
            done: !1,
            value: c
        },
        p = t => void 0 === a ? l : void 0 === l || Math.abs(a - t) < Math.abs(l - t) ? a : l;
    let m = n * e;
    const f = c + m,
        g = void 0 === r ? f : r(f);
    g !== f && (m = g - c);
    const y = t => -m * Math.exp(-t / i),
        v = t => g + y(t),
        x = t => {
            const e = y(t),
                n = v(t);
            d.done = Math.abs(e) <= u, d.value = d.done ? g : n
        };
    let w, T;
    const P = t => {
        var e;
        (e = d.value, void 0 !== a && e < a || void 0 !== l && e > l) && (w = t, T = Te({
            keyframes: [d.value, p(d.value)],
            velocity: te(v, t, d.value),
            damping: s,
            stiffness: o,
            restDelta: u,
            restSpeed: h
        }))
    };
    return P(0), {
        calculatedDuration: null,
        next: t => {
            let e = !1;
            return T || void 0 !== w || (e = !0, x(t), P(t)), void 0 !== w && t >= w ? T.next(t - w) : (!e && x(t), d)
        }
    }
}

function Se(t, e, {
    clamp: n = !0,
    ease: i,
    mixer: s
} = {}) {
    const o = t.length;
    if (c(o === e.length, "Both input and output ranges must be the same length", "range-length"), 1 === o) return () => e[0];
    if (2 === o && e[0] === e[1]) return () => e[1];
    const r = t[0] === t[1];
    t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
    const a = function(t, e, n) {
            const i = [],
                s = n || d.mix || Gt,
                o = t.length - 1;
            for (let r = 0; r < o; r++) {
                let n = s(t[r], t[r + 1]);
                if (e) {
                    const t = Array.isArray(e) ? e[r] || y : e;
                    n = x(t, n)
                }
                i.push(n)
            }
            return i
        }(e, i, s),
        l = a.length,
        h = n => {
            if (r && n < t[0]) return e[0];
            let i = 0;
            if (l > 1)
                for (; i < t.length - 2 && !(n < t[i + 1]); i++);
            const s = w(t[i], t[i + 1], n);
            return a[i](s)
        };
    return n ? e => h(u(t[0], t[o - 1], e)) : h
}

function be(t, e) {
    const n = t[t.length - 1];
    for (let i = 1; i <= e; i++) {
        const s = w(0, e, i);
        t.push(It(n, 1, s))
    }
}

function Ae(t) {
    const e = [0];
    return be(e, t.length - 1), e
}

function Ee({
    duration: t = 300,
    keyframes: e,
    times: n,
    ease: i = "easeInOut"
}) {
    const s = U(i) ? i.map(Y) : Y(i),
        o = {
            done: !1,
            value: e[0]
        },
        r = function(t, e) {
            return t.map(t => t * e)
        }(n && n.length === e.length ? n : Ae(e), t),
        a = Se(r, e, {
            ease: Array.isArray(s) ? s : (l = e, u = s, l.map(() => u || O).splice(0, l.length - 1))
        });
    var l, u;
    return {
        calculatedDuration: t,
        next: e => (o.value = a(e), o.done = e >= t, o)
    }
}
Te.applyToOptions = t => {
    const e = Qt(t, 100, Te);
    return t.ease = e.ease, t.duration = P(e.duration), t.type = "keyframes", t
};
const Me = t => null !== t;

function Ce(t, {
    repeat: e,
    repeatType: n = "loop"
}, i, s = 1) {
    const o = t.filter(Me),
        r = s < 0 || e && "loop" !== n && e % 2 == 1 ? 0 : o.length - 1;
    return r && void 0 !== i ? i : o[r]
}
const Ve = {
    decay: Pe,
    inertia: Pe,
    tween: Ee,
    keyframes: Ee,
    spring: Te
};

function De(t) {
    "string" == typeof t.type && (t.type = Ve[t.type])
}
class ke {
    constructor() {
        this.updateFinished()
    }
    get finished() {
        return this._finished
    }
    updateFinished() {
        this._finished = new Promise(t => {
            this.resolve = t
        })
    }
    notifyFinished() {
        this.resolve()
    }
    then(t, e) {
        return this.finished.then(t, e)
    }
}
const Re = t => t / 100;
class Le extends ke {
    constructor(t) {
        super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
            var t, e;
            const {
                motionValue: n
            } = this.options;
            n && n.updatedAt !== Q.now() && this.tick(Q.now()), this.isStopped = !0, "idle" !== this.state && (this.teardown(), null == (e = (t = this.options).onStop) || e.call(t))
        }, this.options = t, this.initAnimation(), this.play(), !1 === t.autoplay && this.pause()
    }
    initAnimation() {
        const {
            options: t
        } = this;
        De(t);
        const {
            type: e = Ee,
            repeat: n = 0,
            repeatDelay: i = 0,
            repeatType: s,
            velocity: o = 0
        } = t;
        let {
            keyframes: r
        } = t;
        const a = e || Ee;
        a !== Ee && "number" != typeof r[0] && (this.mixKeyframes = x(Re, Gt(r[0], r[1])), r = [0, 100]);
        const l = a({ ...t,
            keyframes: r
        });
        "mirror" === s && (this.mirroredGenerator = a({ ...t,
            keyframes: [...r].reverse(),
            velocity: -o
        })), null === l.calculatedDuration && (l.calculatedDuration = Jt(l));
        const {
            calculatedDuration: u
        } = l;
        this.calculatedDuration = u, this.resolvedDuration = u + i, this.totalDuration = this.resolvedDuration * (n + 1) - i, this.generator = l
    }
    updateTime(t) {
        const e = Math.round(t - this.startTime) * this.playbackSpeed;
        null !== this.holdTime ? this.currentTime = this.holdTime : this.currentTime = e
    }
    tick(t, e = !1) {
        const {
            generator: n,
            totalDuration: i,
            mixKeyframes: s,
            mirroredGenerator: o,
            resolvedDuration: r,
            calculatedDuration: a
        } = this;
        if (null === this.startTime) return n.next(0);
        const {
            delay: l = 0,
            keyframes: h,
            repeat: c,
            repeatType: d,
            repeatDelay: p,
            type: m,
            onUpdate: f,
            finalKeyframe: g
        } = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - i / this.speed, this.startTime)), e ? this.currentTime = t : this.updateTime(t);
        const y = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1),
            v = this.playbackSpeed >= 0 ? y < 0 : y > i;
        this.currentTime = Math.max(y, 0), "finished" === this.state && null === this.holdTime && (this.currentTime = i);
        let x = this.currentTime,
            w = n;
        if (c) {
            const t = Math.min(this.currentTime, i) / r;
            let e = Math.floor(t),
                n = t % 1;
            !n && t >= 1 && (n = 1), 1 === n && e--, e = Math.min(e, c + 1);
            Boolean(e % 2) && ("reverse" === d ? (n = 1 - n, p && (n -= p / r)) : "mirror" === d && (w = o)), x = u(0, 1, n) * r
        }
        const T = v ? {
            done: !1,
            value: h[0]
        } : w.next(x);
        s && (T.value = s(T.value));
        let {
            done: P
        } = T;
        v || null === a || (P = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
        const S = null === this.holdTime && ("finished" === this.state || "running" === this.state && P);
        return S && m !== Pe && (T.value = Ce(h, this.options, g, this.speed)), f && f(T.value), S && this.finish(), T
    }
    then(t, e) {
        return this.finished.then(t, e)
    }
    get duration() {
        return S(this.calculatedDuration)
    }
    get iterationDuration() {
        const {
            delay: t = 0
        } = this.options || {};
        return this.duration + S(t)
    }
    get time() {
        return S(this.currentTime)
    }
    set time(t) {
        var e;
        t = P(t), this.currentTime = t, null === this.startTime || null !== this.holdTime || 0 === this.playbackSpeed ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), null == (e = this.driver) || e.start(!1)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(t) {
        this.updateTime(Q.now());
        const e = this.playbackSpeed !== t;
        this.playbackSpeed = t, e && (this.time = S(this.currentTime))
    }
    play() {
        var t, e;
        if (this.isStopped) return;
        const {
            driver: n = qt,
            startTime: i
        } = this.options;
        this.driver || (this.driver = n(t => this.tick(t))), null == (e = (t = this.options).onPlay) || e.call(t);
        const s = this.driver.now();
        "finished" === this.state ? (this.updateFinished(), this.startTime = s) : null !== this.holdTime ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = i ? ? s), "finished" === this.state && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start()
    }
    pause() {
        this.state = "paused", this.updateTime(Q.now()), this.holdTime = this.currentTime
    }
    complete() {
        "running" !== this.state && this.play(), this.state = "finished", this.holdTime = null
    }
    finish() {
        var t, e;
        this.notifyFinished(), this.teardown(), this.state = "finished", null == (e = (t = this.options).onComplete) || e.call(t)
    }
    cancel() {
        var t, e;
        this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), null == (e = (t = this.options).onCancel) || e.call(t)
    }
    teardown() {
        this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null
    }
    stopDriver() {
        this.driver && (this.driver.stop(), this.driver = void 0)
    }
    sample(t) {
        return this.startTime = 0, this.tick(t, !0)
    }
    attachTimeline(t) {
        var e;
        return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), null == (e = this.driver) || e.stop(), t.observe(this)
    }
}
const je = t => 180 * t / Math.PI,
    Be = t => {
        const e = je(Math.atan2(t[1], t[0]));
        return Ie(e)
    },
    Fe = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: t => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
        rotate: Be,
        rotateZ: Be,
        skewX: t => je(Math.atan(t[1])),
        skewY: t => je(Math.atan(t[2])),
        skew: t => (Math.abs(t[1]) + Math.abs(t[2])) / 2
    },
    Ie = t => ((t %= 360) < 0 && (t += 360), t),
    Oe = t => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
    Ue = t => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
    We = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: Oe,
        scaleY: Ue,
        scale: t => (Oe(t) + Ue(t)) / 2,
        rotateX: t => Ie(je(Math.atan2(t[6], t[5]))),
        rotateY: t => Ie(je(Math.atan2(-t[2], t[0]))),
        rotateZ: Be,
        rotate: Be,
        skewX: t => je(Math.atan(t[4])),
        skewY: t => je(Math.atan(t[1])),
        skew: t => (Math.abs(t[1]) + Math.abs(t[4])) / 2
    };

function $e(t) {
    return t.includes("scale") ? 1 : 0
}

function Ne(t, e) {
    if (!t || "none" === t) return $e(e);
    const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let i, s;
    if (n) i = We, s = n;
    else {
        const e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        i = Fe, s = e
    }
    if (!s) return $e(e);
    const o = i[e],
        r = s[1].split(",").map(Ye);
    return "function" == typeof o ? o(r) : r[o]
}

function Ye(t) {
    return parseFloat(t.trim())
}
const Xe = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"],
    ze = (() => new Set(Xe))(),
    Ke = t => t === rt || t === wt,
    He = new Set(["x", "y", "z"]),
    Ge = Xe.filter(t => !He.has(t));
const qe = {
    width: ({
        x: t
    }, {
        paddingLeft: e = "0",
        paddingRight: n = "0"
    }) => t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({
        y: t
    }, {
        paddingTop: e = "0",
        paddingBottom: n = "0"
    }) => t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t, {
        top: e
    }) => parseFloat(e),
    left: (t, {
        left: e
    }) => parseFloat(e),
    bottom: ({
        y: t
    }, {
        top: e
    }) => parseFloat(e) + (t.max - t.min),
    right: ({
        x: t
    }, {
        left: e
    }) => parseFloat(e) + (t.max - t.min),
    x: (t, {
        transform: e
    }) => Ne(e, "x"),
    y: (t, {
        transform: e
    }) => Ne(e, "y")
};
qe.translateX = qe.x, qe.translateY = qe.y;
const Ze = new Set;
let _e = !1,
    Je = !1,
    Qe = !1;

function tn() {
    if (Je) {
        const t = Array.from(Ze).filter(t => t.needsMeasurement),
            e = new Set(t.map(t => t.element)),
            n = new Map;
        e.forEach(t => {
            const e = function(t) {
                const e = [];
                return Ge.forEach(n => {
                    const i = t.getValue(n);
                    void 0 !== i && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0))
                }), e
            }(t);
            e.length && (n.set(t, e), t.render())
        }), t.forEach(t => t.measureInitialState()), e.forEach(t => {
            t.render();
            const e = n.get(t);
            e && e.forEach(([e, n]) => {
                var i;
                null == (i = t.getValue(e)) || i.set(n)
            })
        }), t.forEach(t => t.measureEndState()), t.forEach(t => {
            void 0 !== t.suspendedScrollY && window.scrollTo(0, t.suspendedScrollY)
        })
    }
    Je = !1, _e = !1, Ze.forEach(t => t.complete(Qe)), Ze.clear()
}

function en() {
    Ze.forEach(t => {
        t.readKeyframes(), t.needsMeasurement && (Je = !0)
    })
}
class nn {
    constructor(t, e, n, i, s, o = !1) {
        this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = e, this.name = n, this.motionValue = i, this.element = s, this.isAsync = o
    }
    scheduleResolve() {
        this.state = "scheduled", this.isAsync ? (Ze.add(this), _e || (_e = !0, H.read(en), H.resolveKeyframes(tn))) : (this.readKeyframes(), this.complete())
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: t,
            name: e,
            element: n,
            motionValue: i
        } = this;
        if (null === t[0]) {
            const s = null == i ? void 0 : i.get(),
                o = t[t.length - 1];
            if (void 0 !== s) t[0] = s;
            else if (n && e) {
                const i = n.readValue(e, o);
                null != i && (t[0] = i)
            }
            void 0 === t[0] && (t[0] = o), i && void 0 === s && i.set(t[0])
        }! function(t) {
            for (let e = 1; e < t.length; e++) t[e] ? ? (t[e] = t[e - 1])
        }(t)
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(t = !1) {
        this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Ze.delete(this)
    }
    cancel() {
        "scheduled" === this.state && (Ze.delete(this), this.state = "pending")
    }
    resume() {
        "pending" === this.state && this.scheduleResolve()
    }
}
const sn = g(() => void 0 !== window.ScrollTimeline),
    on = {};

function rn(t, e) {
    const n = g(t);
    return () => on[e] ? ? n()
}
const an = rn(() => {
        try {
            document.createElement("div").animate({
                opacity: 0
            }, {
                easing: "linear(0, 1)"
            })
        } catch (t) {
            return !1
        }
        return !0
    }, "linearEasing"),
    ln = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`,
    un = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: ln([0, .65, .55, 1]),
        circOut: ln([.55, 0, 1, .45]),
        backIn: ln([.31, .01, .66, -.59]),
        backOut: ln([.33, 1.53, .69, .99])
    };

function hn(t, e) {
    return t ? "function" == typeof t ? an() ? Zt(t, e) : "ease-out" : $(t) ? ln(t) : Array.isArray(t) ? t.map(t => hn(t, e) || un.easeOut) : un[t] : void 0
}

function cn(t, e, n, {
    delay: i = 0,
    duration: s = 300,
    repeat: o = 0,
    repeatType: r = "loop",
    ease: a = "easeOut",
    times: l
} = {}, u = void 0) {
    const h = {
        [e]: n
    };
    l && (h.offset = l);
    const c = hn(a, s);
    Array.isArray(c) && (h.easing = c);
    const d = {
        delay: i,
        duration: s,
        easing: Array.isArray(c) ? "linear" : c,
        fill: "both",
        iterations: o + 1,
        direction: "reverse" === r ? "alternate" : "normal"
    };
    u && (d.pseudoElement = u);
    return t.animate(h, d)
}

function dn(t) {
    return "function" == typeof t && "applyToOptions" in t
}
class pn extends ke {
    constructor(t) {
        if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t) return;
        const {
            element: e,
            name: n,
            keyframes: i,
            pseudoElement: s,
            allowFlatten: o = !1,
            finalKeyframe: r,
            onComplete: a
        } = t;
        this.isPseudoElement = Boolean(s), this.allowFlatten = o, this.options = t, c("string" != typeof t.type, 'Mini animate() doesn\'t support "type" as a string.', "mini-spring");
        const l = function({
            type: t,
            ...e
        }) {
            return dn(t) && an() ? t.applyToOptions(e) : (e.duration ? ? (e.duration = 300), e.ease ? ? (e.ease = "easeOut"), e)
        }(t);
        this.animation = cn(e, n, i, l, s), !1 === l.autoplay && this.animation.pause(), this.animation.onfinish = () => {
            if (this.finishedTime = this.time, !s) {
                const t = Ce(i, this.options, r, this.speed);
                this.updateMotionValue ? this.updateMotionValue(t) : function(t, e, n) {
                    (t => t.startsWith("--"))(e) ? t.style.setProperty(e, n): t.style[e] = n
                }(e, n, t), this.animation.cancel()
            }
            null == a || a(), this.notifyFinished()
        }
    }
    play() {
        this.isStopped || (this.manualStartTime = null, this.animation.play(), "finished" === this.state && this.updateFinished())
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        var t, e;
        null == (e = (t = this.animation).finish) || e.call(t)
    }
    cancel() {
        try {
            this.animation.cancel()
        } catch (t) {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        const {
            state: t
        } = this;
        "idle" !== t && "finished" !== t && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel())
    }
    commitStyles() {
        var t, e;
        this.isPseudoElement || null == (e = (t = this.animation).commitStyles) || e.call(t)
    }
    get duration() {
        var t, e;
        const n = (null == (e = null == (t = this.animation.effect) ? void 0 : t.getComputedTiming) ? void 0 : e.call(t).duration) || 0;
        return S(Number(n))
    }
    get iterationDuration() {
        const {
            delay: t = 0
        } = this.options || {};
        return this.duration + S(t)
    }
    get time() {
        return S(Number(this.animation.currentTime) || 0)
    }
    set time(t) {
        this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = P(t)
    }
    get speed() {
        return this.animation.playbackRate
    }
    set speed(t) {
        t < 0 && (this.finishedTime = null), this.animation.playbackRate = t
    }
    get state() {
        return null !== this.finishedTime ? "finished" : this.animation.playState
    }
    get startTime() {
        return this.manualStartTime ? ? Number(this.animation.startTime)
    }
    set startTime(t) {
        this.manualStartTime = this.animation.startTime = t
    }
    attachTimeline({
        timeline: t,
        observe: e
    }) {
        var n;
        return this.allowFlatten && (null == (n = this.animation.effect) || n.updateTiming({
            easing: "linear"
        })), this.animation.onfinish = null, t && sn() ? (this.animation.timeline = t, y) : e(this)
    }
}
const mn = {
    anticipate: R,
    backInOut: k,
    circInOut: B
};

function fn(t) {
    "string" == typeof t.ease && t.ease in mn && (t.ease = mn[t.ease])
}
class gn extends pn {
    constructor(t) {
        fn(t), De(t), super(t), void 0 !== t.startTime && (this.startTime = t.startTime), this.options = t
    }
    updateMotionValue(t) {
        const {
            motionValue: e,
            onUpdate: n,
            onComplete: i,
            element: s,
            ...o
        } = this.options;
        if (!e) return;
        if (void 0 !== t) return void e.set(t);
        const r = new Le({ ...o,
                autoplay: !1
            }),
            a = Math.max(10, Q.now() - this.startTime),
            l = u(0, 10, a - 10);
        e.setWithVelocity(r.sample(Math.max(0, a - l)).value, r.sample(a).value, l), r.stop()
    }
}
const yn = (t, e) => "zIndex" !== e && (!("number" != typeof t && !Array.isArray(t)) || !("string" != typeof t || !jt.test(t) && "0" !== t || t.startsWith("url(")));

function vn(t) {
    t.duration = 0, t.type = "keyframes"
}
const xn = new Set(["opacity", "clipPath", "filter", "transform"]),
    wn = g(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
class Tn extends ke {
    constructor({
        autoplay: t = !0,
        delay: e = 0,
        type: n = "keyframes",
        repeat: i = 0,
        repeatDelay: s = 0,
        repeatType: o = "loop",
        keyframes: r,
        name: a,
        motionValue: l,
        element: u,
        ...h
    }) {
        var c;
        super(), this.stop = () => {
            var t, e;
            this._animation && (this._animation.stop(), null == (t = this.stopTimeline) || t.call(this)), null == (e = this.keyframeResolver) || e.cancel()
        }, this.createdAt = Q.now();
        const d = {
                autoplay: t,
                delay: e,
                type: n,
                repeat: i,
                repeatDelay: s,
                repeatType: o,
                name: a,
                motionValue: l,
                element: u,
                ...h
            },
            p = (null == u ? void 0 : u.KeyframeResolver) || nn;
        this.keyframeResolver = new p(r, (t, e, n) => this.onKeyframesResolved(t, e, d, !n), a, l, u), null == (c = this.keyframeResolver) || c.scheduleResolve()
    }
    onKeyframesResolved(t, e, n, i) {
        var s, o;
        this.keyframeResolver = void 0;
        const {
            name: r,
            type: a,
            velocity: l,
            delay: u,
            isHandoff: c,
            onUpdate: p
        } = n;
        this.resolvedAt = Q.now(),
            function(t, e, n, i) {
                const s = t[0];
                if (null === s) return !1;
                if ("display" === e || "visibility" === e) return !0;
                const o = t[t.length - 1],
                    r = yn(s, e),
                    a = yn(o, e);
                return h(r === a, `You are trying to animate ${e} from "${s}" to "${o}". "${r?o:s}" is not an animatable value.`, "value-not-animatable"), !(!r || !a) && (function(t) {
                    const e = t[0];
                    if (1 === t.length) return !0;
                    for (let n = 0; n < t.length; n++)
                        if (t[n] !== e) return !0
                }(t) || ("spring" === n || dn(n)) && i)
            }(t, r, a, l) || (!d.instantAnimations && u || null == p || p(Ce(t, n, e)), t[0] = t[t.length - 1], vn(n), n.repeat = 0);
        const m = {
                startTime: i ? this.resolvedAt && this.resolvedAt - this.createdAt > 40 ? this.resolvedAt : this.createdAt : void 0,
                finalKeyframe: e,
                ...n,
                keyframes: t
            },
            f = !c && function(t) {
                var e;
                const {
                    motionValue: n,
                    name: i,
                    repeatDelay: s,
                    repeatType: o,
                    damping: r,
                    type: a
                } = t;
                if (!((null == (e = null == n ? void 0 : n.owner) ? void 0 : e.current) instanceof HTMLElement)) return !1;
                const {
                    onUpdate: l,
                    transformTemplate: u
                } = n.owner.getProps();
                return wn() && i && xn.has(i) && ("transform" !== i || !u) && !l && !s && "mirror" !== o && 0 !== r && "inertia" !== a
            }(m),
            g = null == (o = null == (s = m.motionValue) ? void 0 : s.owner) ? void 0 : o.current,
            v = f ? new gn({ ...m,
                element: g
            }) : new Le(m);
        v.finished.then(() => {
            this.notifyFinished()
        }).catch(y), this.pendingTimeline && (this.stopTimeline = v.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = v
    }
    get finished() {
        return this._animation ? this.animation.finished : this._finished
    }
    then(t, e) {
        return this.finished.finally(t).then(() => {})
    }
    get animation() {
        var t;
        return this._animation || (null == (t = this.keyframeResolver) || t.resume(), Qe = !0, en(), tn(), Qe = !1), this._animation
    }
    get duration() {
        return this.animation.duration
    }
    get iterationDuration() {
        return this.animation.iterationDuration
    }
    get time() {
        return this.animation.time
    }
    set time(t) {
        this.animation.time = t
    }
    get speed() {
        return this.animation.speed
    }
    get state() {
        return this.animation.state
    }
    set speed(t) {
        this.animation.speed = t
    }
    get startTime() {
        return this.animation.startTime
    }
    attachTimeline(t) {
        return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop()
    }
    play() {
        this.animation.play()
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        this.animation.complete()
    }
    cancel() {
        var t;
        this._animation && this.animation.cancel(), null == (t = this.keyframeResolver) || t.cancel()
    }
}
class Pn {
    constructor(t) {
        this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean)
    }
    get finished() {
        return Promise.all(this.animations.map(t => t.finished))
    }
    getAll(t) {
        return this.animations[0][t]
    }
    setAll(t, e) {
        for (let n = 0; n < this.animations.length; n++) this.animations[n][t] = e
    }
    attachTimeline(t) {
        const e = this.animations.map(e => e.attachTimeline(t));
        return () => {
            e.forEach((t, e) => {
                t && t(), this.animations[e].stop()
            })
        }
    }
    get time() {
        return this.getAll("time")
    }
    set time(t) {
        this.setAll("time", t)
    }
    get speed() {
        return this.getAll("speed")
    }
    set speed(t) {
        this.setAll("speed", t)
    }
    get state() {
        return this.getAll("state")
    }
    get startTime() {
        return this.getAll("startTime")
    }
    get duration() {
        return Sn(this.animations, "duration")
    }
    get iterationDuration() {
        return Sn(this.animations, "iterationDuration")
    }
    runAll(t) {
        this.animations.forEach(e => e[t]())
    }
    play() {
        this.runAll("play")
    }
    pause() {
        this.runAll("pause")
    }
    cancel() {
        this.runAll("cancel")
    }
    complete() {
        this.runAll("complete")
    }
}

function Sn(t, e) {
    let n = 0;
    for (let i = 0; i < t.length; i++) {
        const s = t[i][e];
        null !== s && s > n && (n = s)
    }
    return n
}
class bn extends Pn {
    then(t, e) {
        return this.finished.finally(t).then(() => {})
    }
}

function An(t, e, n, i = 0, s = 1) {
    const o = Array.from(t).sort((t, e) => t.sortNodePosition(e)).indexOf(e),
        r = t.size,
        a = (r - 1) * i;
    return "function" == typeof n ? n(o, r) : 1 === s ? o * i : a - o * i
}
const En = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;

function Mn(t, e, n = 1) {
    c(n <= 4, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [i, s] = function(t) {
        const e = En.exec(t);
        if (!e) return [, ];
        const [, n, i, s] = e;
        return [`--${n??i}`, s]
    }(t);
    if (!i) return;
    const o = window.getComputedStyle(e).getPropertyValue(i);
    if (o) {
        const t = o.trim();
        return p(t) ? parseFloat(t) : t
    }
    return it(s) ? Mn(s, e, n + 1) : s
}
const Cn = {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10
    },
    Vn = {
        type: "keyframes",
        duration: .8
    },
    Dn = {
        type: "keyframes",
        ease: [.25, .1, .35, 1],
        duration: .3
    },
    kn = (t, {
        keyframes: e
    }) => e.length > 2 ? Vn : ze.has(t) ? t.startsWith("scale") ? {
        type: "spring",
        stiffness: 550,
        damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    } : Cn : Dn,
    Rn = t => null !== t;

function Ln(t, e) {
    return (null == t ? void 0 : t[e]) ? ? (null == t ? void 0 : t.default) ? ? t
}
const jn = (t, e, n, i = {}, s, o) => r => {
    const a = Ln(i, t) || {},
        l = a.delay || i.delay || 0;
    let {
        elapsed: u = 0
    } = i;
    u -= P(l);
    const h = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: e.getVelocity(),
        ...a,
        delay: -u,
        onUpdate: t => {
            e.set(t), a.onUpdate && a.onUpdate(t)
        },
        onComplete: () => {
            r(), a.onComplete && a.onComplete()
        },
        name: t,
        motionValue: e,
        element: o ? void 0 : s
    };
    (function({
        when: t,
        delay: e,
        delayChildren: n,
        staggerChildren: i,
        staggerDirection: s,
        repeat: o,
        repeatType: r,
        repeatDelay: a,
        from: l,
        elapsed: u,
        ...h
    }) {
        return !!Object.keys(h).length
    })(a) || Object.assign(h, kn(t, h)), h.duration && (h.duration = P(h.duration)), h.repeatDelay && (h.repeatDelay = P(h.repeatDelay)), void 0 !== h.from && (h.keyframes[0] = h.from);
    let c = !1;
    if ((!1 === h.type || 0 === h.duration && !h.repeatDelay) && (vn(h), 0 === h.delay && (c = !0)), (d.instantAnimations || d.skipAnimations) && (c = !0, vn(h), h.delay = 0), h.allowFlatten = !a.type && !a.ease, c && !o && void 0 !== e.get()) {
        const t = function(t, {
            repeat: e,
            repeatType: n = "loop"
        }, i) {
            const s = t.filter(Rn),
                o = e && "loop" !== n && e % 2 == 1 ? 0 : s.length - 1;
            return o && void 0 !== i ? i : s[o]
        }(h.keyframes, a);
        if (void 0 !== t) return void H.update(() => {
            h.onUpdate(t), h.onComplete()
        })
    }
    return a.isSync ? new Le(h) : new Tn(h)
};

function Bn(t) {
    const e = [{}, {}];
    return null == t || t.values.forEach((t, n) => {
        e[0][n] = t.get(), e[1][n] = t.getVelocity()
    }), e
}

function Fn(t, e, n, i) {
    if ("function" == typeof e) {
        const [s, o] = Bn(i);
        e = e(void 0 !== n ? n : t.custom, s, o)
    }
    if ("string" == typeof e && (e = t.variants && t.variants[e]), "function" == typeof e) {
        const [s, o] = Bn(i);
        e = e(void 0 !== n ? n : t.custom, s, o)
    }
    return e
}

function In(t, e, n) {
    const i = t.getProps();
    return Fn(i, e, void 0 !== n ? n : i.custom, t)
}
const On = new Set(["width", "height", "top", "left", "right", "bottom", ...Xe]);
class Un {
    constructor(t, e = {}) {
        this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = t => {
            var e;
            const n = Q.now();
            if (this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(t), this.current !== this.prev && (null == (e = this.events.change) || e.notify(this.current), this.dependents))
                for (const i of this.dependents) i.dirty()
        }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e.owner
    }
    setCurrent(t) {
        var e;
        this.current = t, this.updatedAt = Q.now(), null === this.canTrackVelocity && void 0 !== t && (this.canTrackVelocity = (e = this.current, !isNaN(parseFloat(e))))
    }
    setPrevFrameValue(t = this.current) {
        this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt
    }
    onChange(t) {
        return this.on("change", t)
    }
    on(t, e) {
        this.events[t] || (this.events[t] = new T);
        const n = this.events[t].add(e);
        return "change" === t ? () => {
            n(), H.read(() => {
                this.events.change.getSize() || this.stop()
            })
        } : n
    }
    clearListeners() {
        for (const t in this.events) this.events[t].clear()
    }
    attach(t, e) {
        this.passiveEffect = t, this.stopPassiveEffect = e
    }
    set(t) {
        this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t)
    }
    setWithVelocity(t, e, n) {
        this.set(e), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - n
    }
    jump(t, e = !0) {
        this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, e && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
    dirty() {
        var t;
        null == (t = this.events.change) || t.notify(this.current)
    }
    addDependent(t) {
        this.dependents || (this.dependents = new Set), this.dependents.add(t)
    }
    removeDependent(t) {
        this.dependents && this.dependents.delete(t)
    }
    get() {
        return this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const t = Q.now();
        if (!this.canTrackVelocity || void 0 === this.prevFrameValue || t - this.updatedAt > 30) return 0;
        const e = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
        return b(parseFloat(this.current) - parseFloat(this.prevFrameValue), e)
    }
    start(t) {
        return this.stop(), new Promise(e => {
            this.hasAnimated = !0, this.animation = t(e), this.events.animationStart && this.events.animationStart.notify()
        }).then(() => {
            this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation()
        })
    }
    stop() {
        this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        var t, e;
        null == (t = this.dependents) || t.clear(), null == (e = this.events.destroy) || e.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
}

function Wn(t, e) {
    return new Un(t, e)
}
const $n = t => Array.isArray(t);

function Nn(t, e, n) {
    t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, Wn(n))
}

function Yn(t) {
    return $n(t) ? t[t.length - 1] || 0 : t
}
const Xn = t => Boolean(t && t.getVelocity);

function zn(t, e) {
    const n = t.getValue("willChange");
    if (i = n, Boolean(Xn(i) && i.add)) return n.add(e);
    if (!n && d.WillChange) {
        const n = new d.WillChange("auto");
        t.addValue("willChange", n), n.add(e)
    }
    var i
}

function Kn(t) {
    return t.replace(/([A-Z])/g, t => `-${t.toLowerCase()}`)
}
const Hn = "data-" + Kn("framerAppearId");

function Gn(t) {
    return t.props[Hn]
}

function qn({
    protectedKeys: t,
    needsAnimating: e
}, n) {
    const i = t.hasOwnProperty(n) && !0 !== e[n];
    return e[n] = !1, i
}

function Zn(t, e, {
    delay: n = 0,
    transitionOverride: i,
    type: s
} = {}) {
    let {
        transition: o = t.getDefaultTransition(),
        transitionEnd: r,
        ...a
    } = e;
    i && (o = i);
    const l = [],
        u = s && t.animationState && t.animationState.getState()[s];
    for (const h in a) {
        const e = t.getValue(h, t.latestValues[h] ? ? null),
            i = a[h];
        if (void 0 === i || u && qn(u, h)) continue;
        const s = {
                delay: n,
                ...Ln(o || {}, h)
            },
            r = e.get();
        if (void 0 !== r && !e.isAnimating && !Array.isArray(i) && i === r && !s.velocity) continue;
        let c = !1;
        if (window.MotionHandoffAnimation) {
            const e = Gn(t);
            if (e) {
                const t = window.MotionHandoffAnimation(e, h, H);
                null !== t && (s.startTime = t, c = !0)
            }
        }
        zn(t, h), e.start(jn(h, e, i, t.shouldReduceMotion && On.has(h) ? {
            type: !1
        } : s, t, c));
        const d = e.animation;
        d && l.push(d)
    }
    return r && Promise.all(l).then(() => {
        H.update(() => {
            r && function(t, e) {
                const n = In(t, e);
                let {
                    transitionEnd: i = {},
                    transition: s = {},
                    ...o
                } = n || {};
                o = { ...o,
                    ...i
                };
                for (const r in o) Nn(t, r, Yn(o[r]))
            }(t, r)
        })
    }), l
}

function _n(t, e, n = {}) {
    var i;
    const s = In(t, e, "exit" === n.type ? null == (i = t.presenceContext) ? void 0 : i.custom : void 0);
    let {
        transition: o = t.getDefaultTransition() || {}
    } = s || {};
    n.transitionOverride && (o = n.transitionOverride);
    const r = s ? () => Promise.all(Zn(t, s, n)) : () => Promise.resolve(),
        a = t.variantChildren && t.variantChildren.size ? (i = 0) => {
            const {
                delayChildren: s = 0,
                staggerChildren: r,
                staggerDirection: a
            } = o;
            return function(t, e, n = 0, i = 0, s = 0, o = 1, r) {
                const a = [];
                for (const l of t.variantChildren) l.notify("AnimationStart", e), a.push(_n(l, e, { ...r,
                    delay: n + ("function" == typeof i ? 0 : i) + An(t.variantChildren, l, i, s, o)
                }).then(() => l.notify("AnimationComplete", e)));
                return Promise.all(a)
            }(t, e, i, s, r, a, n)
        } : () => Promise.resolve(),
        {
            when: l
        } = o;
    if (l) {
        const [t, e] = "beforeChildren" === l ? [r, a] : [a, r];
        return t().then(() => e())
    }
    return Promise.all([r(), a(n.delay)])
}
const Jn = t => e => e.test(t),
    Qn = [rt, wt, xt, vt, Pt, Tt, {
        test: t => "auto" === t,
        parse: t => t
    }],
    ti = t => Qn.find(Jn(t));

function ei(t) {
    return "number" == typeof t ? 0 === t : null === t || ("none" === t || "0" === t || f(t))
}
const ni = new Set(["brightness", "contrast", "saturate", "opacity"]);

function ii(t) {
    const [e, n] = t.slice(0, -1).split("(");
    if ("drop-shadow" === e) return t;
    const [i] = n.match(ht) || [];
    if (!i) return t;
    const s = n.replace(i, "");
    let o = ni.has(e) ? 1 : 0;
    return i !== n && (o *= 100), e + "(" + o + s + ")"
}
const si = /\b([a-z-]*)\(.*?\)/gu,
    oi = { ...jt,
        getAnimatableNone: t => {
            const e = t.match(si);
            return e ? e.map(ii).join(" ") : t
        }
    },
    ri = { ...rt,
        transform: Math.round
    },
    ai = {
        borderWidth: wt,
        borderTopWidth: wt,
        borderRightWidth: wt,
        borderBottomWidth: wt,
        borderLeftWidth: wt,
        borderRadius: wt,
        radius: wt,
        borderTopLeftRadius: wt,
        borderTopRightRadius: wt,
        borderBottomRightRadius: wt,
        borderBottomLeftRadius: wt,
        width: wt,
        maxWidth: wt,
        height: wt,
        maxHeight: wt,
        top: wt,
        right: wt,
        bottom: wt,
        left: wt,
        inset: wt,
        insetBlock: wt,
        insetBlockStart: wt,
        insetBlockEnd: wt,
        insetInline: wt,
        insetInlineStart: wt,
        insetInlineEnd: wt,
        padding: wt,
        paddingTop: wt,
        paddingRight: wt,
        paddingBottom: wt,
        paddingLeft: wt,
        paddingBlock: wt,
        paddingBlockStart: wt,
        paddingBlockEnd: wt,
        paddingInline: wt,
        paddingInlineStart: wt,
        paddingInlineEnd: wt,
        margin: wt,
        marginTop: wt,
        marginRight: wt,
        marginBottom: wt,
        marginLeft: wt,
        marginBlock: wt,
        marginBlockStart: wt,
        marginBlockEnd: wt,
        marginInline: wt,
        marginInlineStart: wt,
        marginInlineEnd: wt,
        backgroundPositionX: wt,
        backgroundPositionY: wt,
        ...{
            rotate: vt,
            rotateX: vt,
            rotateY: vt,
            rotateZ: vt,
            scale: lt,
            scaleX: lt,
            scaleY: lt,
            scaleZ: lt,
            skew: vt,
            skewX: vt,
            skewY: vt,
            distance: wt,
            translateX: wt,
            translateY: wt,
            translateZ: wt,
            x: wt,
            y: wt,
            z: wt,
            perspective: wt,
            transformPerspective: wt,
            opacity: at,
            originX: St,
            originY: St,
            originZ: wt
        },
        zIndex: ri,
        fillOpacity: at,
        strokeOpacity: at,
        numOctaves: ri
    },
    li = { ...ai,
        color: At,
        backgroundColor: At,
        outlineColor: At,
        fill: At,
        stroke: At,
        borderColor: At,
        borderTopColor: At,
        borderRightColor: At,
        borderBottomColor: At,
        borderLeftColor: At,
        filter: oi,
        WebkitFilter: oi
    },
    ui = t => li[t];

function hi(t, e) {
    let n = ui(t);
    return n !== oi && (n = jt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0
}
const ci = new Set(["auto", "none", "0"]);
class di extends nn {
    constructor(t, e, n, i, s) {
        super(t, e, n, i, s, !0)
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: t,
            element: e,
            name: n
        } = this;
        if (!e || !e.current) return;
        super.readKeyframes();
        for (let a = 0; a < t.length; a++) {
            let n = t[a];
            if ("string" == typeof n && (n = n.trim(), it(n))) {
                const i = Mn(n, e.current);
                void 0 !== i && (t[a] = i), a === t.length - 1 && (this.finalKeyframe = n)
            }
        }
        if (this.resolveNoneKeyframes(), !On.has(n) || 2 !== t.length) return;
        const [i, s] = t, o = ti(i), r = ti(s);
        if (ot(i) !== ot(s) && qe[n]) this.needsMeasurement = !0;
        else if (o !== r)
            if (Ke(o) && Ke(r))
                for (let a = 0; a < t.length; a++) {
                    const e = t[a];
                    "string" == typeof e && (t[a] = parseFloat(e))
                } else qe[n] && (this.needsMeasurement = !0)
    }
    resolveNoneKeyframes() {
        const {
            unresolvedKeyframes: t,
            name: e
        } = this, n = [];
        for (let i = 0; i < t.length; i++)(null === t[i] || ei(t[i])) && n.push(i);
        n.length && function(t, e, n) {
            let i, s = 0;
            for (; s < t.length && !i;) {
                const e = t[s];
                "string" == typeof e && !ci.has(e) && Dt(e).values.length && (i = t[s]), s++
            }
            if (i && n)
                for (const o of e) t[o] = hi(n, i)
        }(t, n, e)
    }
    measureInitialState() {
        const {
            element: t,
            unresolvedKeyframes: e,
            name: n
        } = this;
        if (!t || !t.current) return;
        "height" === n && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = qe[n](t.measureViewportBox(), window.getComputedStyle(t.current)), e[0] = this.measuredOrigin;
        const i = e[e.length - 1];
        void 0 !== i && t.getValue(n, i).jump(i, !1)
    }
    measureEndState() {
        var t;
        const {
            element: e,
            name: n,
            unresolvedKeyframes: i
        } = this;
        if (!e || !e.current) return;
        const s = e.getValue(n);
        s && s.jump(this.measuredOrigin, !1);
        const o = i.length - 1,
            r = i[o];
        i[o] = qe[n](e.measureViewportBox(), window.getComputedStyle(e.current)), null !== r && void 0 === this.finalKeyframe && (this.finalKeyframe = r), (null == (t = this.removedTransforms) ? void 0 : t.length) && this.removedTransforms.forEach(([t, n]) => {
            e.getValue(t).set(n)
        }), this.resolveNoneKeyframes()
    }
}

function pi(t, e, n) {
    if (null == t) return [];
    if (t instanceof EventTarget) return [t];
    if ("string" == typeof t) {
        let e = document;
        const i = (null == n ? void 0 : n[t]) ? ? e.querySelectorAll(t);
        return i ? Array.from(i) : []
    }
    return Array.from(t).filter(t => null != t)
}
const mi = (t, e) => e && "number" == typeof t ? e.transform(t) : t;

function fi(t) {
    return m(t) && "offsetHeight" in t
}
const {
    schedule: gi,
    cancel: yi
} = K(queueMicrotask, !1), vi = {
    x: !1,
    y: !1
};

function xi() {
    return vi.x || vi.y
}

function wi(t, e) {
    const n = pi(t),
        i = new AbortController;
    return [n, {
        passive: !0,
        ...e,
        signal: i.signal
    }, () => i.abort()]
}

function Ti(t) {
    return !("touch" === t.pointerType || xi())
}
const Pi = (t, e) => !!e && (t === e || Pi(t, e.parentElement)),
    Si = t => "mouse" === t.pointerType ? "number" != typeof t.button || t.button <= 0 : !1 !== t.isPrimary,
    bi = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);

function Ai(t) {
    return bi.has(t.tagName) || !0 === t.isContentEditable
}
const Ei = new WeakSet;

function Mi(t) {
    return e => {
        "Enter" === e.key && t(e)
    }
}

function Ci(t, e) {
    t.dispatchEvent(new PointerEvent("pointer" + e, {
        isPrimary: !0,
        bubbles: !0
    }))
}

function Vi(t) {
    return Si(t) && !xi()
}

function Di(t, e, n = {}) {
    const [i, s, o] = wi(t, n), r = t => {
        const i = t.currentTarget;
        if (!Vi(t)) return;
        Ei.add(i);
        const o = e(i, t),
            r = (t, e) => {
                window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", l), Ei.has(i) && Ei.delete(i), Vi(t) && "function" == typeof o && o(t, {
                    success: e
                })
            },
            a = t => {
                r(t, i === window || i === document || n.useGlobalTarget || Pi(i, t.target))
            },
            l = t => {
                r(t, !1)
            };
        window.addEventListener("pointerup", a, s), window.addEventListener("pointercancel", l, s)
    };
    return i.forEach(t => {
        (n.useGlobalTarget ? window : t).addEventListener("pointerdown", r, s), fi(t) && (t.addEventListener("focus", t => ((t, e) => {
            const n = t.currentTarget;
            if (!n) return;
            const i = Mi(() => {
                if (Ei.has(n)) return;
                Ci(n, "down");
                const t = Mi(() => {
                    Ci(n, "up")
                });
                n.addEventListener("keyup", t, e), n.addEventListener("blur", () => Ci(n, "cancel"), e)
            });
            n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e)
        })(t, s)), Ai(t) || t.hasAttribute("tabindex") || (t.tabIndex = 0))
    }), o
}

function ki(t) {
    return m(t) && "ownerSVGElement" in t
}

function Ri(t) {
    return ki(t) && "svg" === t.tagName
}
const Li = [...Qn, At, jt],
    ji = () => ({
        x: {
            min: 0,
            max: 0
        },
        y: {
            min: 0,
            max: 0
        }
    }),
    Bi = {
        current: null
    },
    Fi = {
        current: !1
    },
    Ii = "undefined" != typeof window;
const Oi = new WeakMap;

function Ui(t) {
    return null !== t && "object" == typeof t && "function" == typeof t.start
}

function Wi(t) {
    return "string" == typeof t || Array.isArray(t)
}
const $i = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
    Ni = ["initial", ...$i];

function Yi(t) {
    return Ui(t.animate) || Ni.some(e => Wi(t[e]))
}

function Xi(t) {
    return Boolean(Yi(t) || t.variants)
}
const zi = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let Ki = {};

function Hi(t) {
    Ki = t
}
class Gi {
    scrapeMotionValuesFromProps(t, e, n) {
        return {}
    }
    constructor({
        parent: t,
        props: e,
        presenceContext: n,
        reducedMotionConfig: i,
        blockInitialAnimation: s,
        visualState: o
    }, r = {}) {
        this.current = null, this.children = new Set, this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = new Map, this.KeyframeResolver = nn, this.features = {}, this.valueSubscriptions = new Map, this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
            this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }, this.renderScheduledAt = 0, this.scheduleRender = () => {
            const t = Q.now();
            this.renderScheduledAt < t && (this.renderScheduledAt = t, H.render(this.render, !1, !0))
        };
        const {
            latestValues: a,
            renderState: l
        } = o;
        this.latestValues = a, this.baseTarget = { ...a
        }, this.initialValues = e.initial ? { ...a
        } : {}, this.renderState = l, this.parent = t, this.props = e, this.presenceContext = n, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = i, this.options = r, this.blockInitialAnimation = Boolean(s), this.isControllingVariants = Yi(e), this.isVariantNode = Xi(e), this.isVariantNode && (this.variantChildren = new Set), this.manuallyAnimateOnMount = Boolean(t && t.current);
        const {
            willChange: u,
            ...h
        } = this.scrapeMotionValuesFromProps(e, {}, this);
        for (const c in h) {
            const t = h[c];
            void 0 !== a[c] && Xn(t) && t.set(a[c])
        }
    }
    mount(t) {
        var e;
        this.current = t, Oi.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((t, e) => this.bindToMotionValue(e, t)), "never" === this.reducedMotionConfig ? this.shouldReduceMotion = !1 : "always" === this.reducedMotionConfig ? this.shouldReduceMotion = !0 : (Fi.current || function() {
            if (Fi.current = !0, Ii)
                if (window.matchMedia) {
                    const t = window.matchMedia("(prefers-reduced-motion)"),
                        e = () => Bi.current = t.matches;
                    t.addEventListener("change", e), e()
                } else Bi.current = !1
        }(), this.shouldReduceMotion = Bi.current), null == (e = this.parent) || e.addChild(this), this.update(this.props, this.presenceContext)
    }
    unmount() {
        var t;
        this.projection && this.projection.unmount(), G(this.notifyUpdate), G(this.render), this.valueSubscriptions.forEach(t => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), null == (t = this.parent) || t.removeChild(this);
        for (const e in this.events) this.events[e].clear();
        for (const e in this.features) {
            const t = this.features[e];
            t && (t.unmount(), t.isMounted = !1)
        }
        this.current = null
    }
    addChild(t) {
        this.children.add(t), this.enteringChildren ? ? (this.enteringChildren = new Set), this.enteringChildren.add(t)
    }
    removeChild(t) {
        this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t)
    }
    bindToMotionValue(t, e) {
        this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
        const n = ze.has(t);
        n && this.onBindTransform && this.onBindTransform();
        const i = e.on("change", e => {
            this.latestValues[t] = e, this.props.onUpdate && H.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender()
        });
        let s;
        "undefined" != typeof window && window.MotionCheckAppearSync && (s = window.MotionCheckAppearSync(this, t, e)), this.valueSubscriptions.set(t, () => {
            i(), s && s(), e.owner && e.stop()
        })
    }
    sortNodePosition(t) {
        return this.current && this.sortInstanceNodePosition && this.type === t.type ? this.sortInstanceNodePosition(this.current, t.current) : 0
    }
    updateFeatures() {
        let t = "animation";
        for (t in Ki) {
            const e = Ki[t];
            if (!e) continue;
            const {
                isEnabled: n,
                Feature: i
            } = e;
            if (!this.features[t] && i && n(this.props) && (this.features[t] = new i(this)), this.features[t]) {
                const e = this.features[t];
                e.isMounted ? e.update() : (e.mount(), e.isMounted = !0)
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : {
            x: {
                min: 0,
                max: 0
            },
            y: {
                min: 0,
                max: 0
            }
        }
    }
    getStaticValue(t) {
        return this.latestValues[t]
    }
    setStaticValue(t, e) {
        this.latestValues[t] = e
    }
    update(t, e) {
        (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = e;
        for (let n = 0; n < zi.length; n++) {
            const e = zi[n];
            this.propEventSubscriptions[e] && (this.propEventSubscriptions[e](), delete this.propEventSubscriptions[e]);
            const i = t["on" + e];
            i && (this.propEventSubscriptions[e] = this.on(e, i))
        }
        this.prevMotionValues = function(t, e, n) {
            for (const i in e) {
                const s = e[i],
                    o = n[i];
                if (Xn(s)) t.addValue(i, s);
                else if (Xn(o)) t.addValue(i, Wn(s, {
                    owner: t
                }));
                else if (o !== s)
                    if (t.hasValue(i)) {
                        const e = t.getValue(i);
                        !0 === e.liveStyle ? e.jump(s) : e.hasAnimated || e.set(s)
                    } else {
                        const e = t.getStaticValue(i);
                        t.addValue(i, Wn(void 0 !== e ? e : s, {
                            owner: t
                        }))
                    }
            }
            for (const i in n) void 0 === e[i] && t.removeValue(i);
            return e
        }(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    addVariantChild(t) {
        const e = this.getClosestVariantNode();
        if (e) return e.variantChildren && e.variantChildren.add(t), () => e.variantChildren.delete(t)
    }
    addValue(t, e) {
        const n = this.values.get(t);
        e !== n && (n && this.removeValue(t), this.bindToMotionValue(t, e), this.values.set(t, e), this.latestValues[t] = e.get())
    }
    removeValue(t) {
        this.values.delete(t);
        const e = this.valueSubscriptions.get(t);
        e && (e(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState)
    }
    hasValue(t) {
        return this.values.has(t)
    }
    getValue(t, e) {
        if (this.props.values && this.props.values[t]) return this.props.values[t];
        let n = this.values.get(t);
        return void 0 === n && void 0 !== e && (n = Wn(null === e ? void 0 : e, {
            owner: this
        }), this.addValue(t, n)), n
    }
    readValue(t, e) {
        let n = void 0 === this.latestValues[t] && this.current ? this.getBaseTargetFromProps(this.props, t) ? ? this.readValueFromInstance(this.current, t, this.options) : this.latestValues[t];
        var i;
        return null != n && ("string" == typeof n && (p(n) || f(n)) ? n = parseFloat(n) : (i = n, !Li.find(Jn(i)) && jt.test(e) && (n = hi(t, e))), this.setBaseTarget(t, Xn(n) ? n.get() : n)), Xn(n) ? n.get() : n
    }
    setBaseTarget(t, e) {
        this.baseTarget[t] = e
    }
    getBaseTarget(t) {
        var e;
        const {
            initial: n
        } = this.props;
        let i;
        if ("string" == typeof n || "object" == typeof n) {
            const s = Fn(this.props, n, null == (e = this.presenceContext) ? void 0 : e.custom);
            s && (i = s[t])
        }
        if (n && void 0 !== i) return i;
        const s = this.getBaseTargetFromProps(this.props, t);
        return void 0 === s || Xn(s) ? void 0 !== this.initialValues[t] && void 0 === i ? void 0 : this.baseTarget[t] : s
    }
    on(t, e) {
        return this.events[t] || (this.events[t] = new T), this.events[t].add(e)
    }
    notify(t, ...e) {
        this.events[t] && this.events[t].notify(...e)
    }
    scheduleRenderMicrotask() {
        gi.render(this.render)
    }
}
class qi extends Gi {
    constructor() {
        super(...arguments), this.KeyframeResolver = di
    }
    sortInstanceNodePosition(t, e) {
        return 2 & t.compareDocumentPosition(e) ? 1 : -1
    }
    getBaseTargetFromProps(t, e) {
        const n = t.style;
        return n ? n[e] : void 0
    }
    removeValueFromRenderState(t, {
        vars: e,
        style: n
    }) {
        delete e[t], delete n[t]
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(), delete this.childSubscription);
        const {
            children: t
        } = this.props;
        Xn(t) && (this.childSubscription = t.on("change", t => {
            this.current && (this.current.textContent = `${t}`)
        }))
    }
}
class Zi {
    constructor(t) {
        this.isMounted = !1, this.node = t
    }
    update() {}
}

function _i({
    top: t,
    left: e,
    right: n,
    bottom: i
}) {
    return {
        x: {
            min: e,
            max: n
        },
        y: {
            min: t,
            max: i
        }
    }
}

function Ji(t) {
    return void 0 === t || 1 === t
}

function Qi({
    scale: t,
    scaleX: e,
    scaleY: n
}) {
    return !Ji(t) || !Ji(e) || !Ji(n)
}

function ts(t) {
    return Qi(t) || es(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY
}

function es(t) {
    return ns(t.x) || ns(t.y)
}

function ns(t) {
    return t && "0%" !== t
}

function is(t, e, n) {
    return n + e * (t - n)
}

function ss(t, e, n, i, s) {
    return void 0 !== s && (t = is(t, s, i)), is(t, n, i) + e
}

function os(t, e = 0, n = 1, i, s) {
    t.min = ss(t.min, e, n, i, s), t.max = ss(t.max, e, n, i, s)
}

function rs(t, {
    x: e,
    y: n
}) {
    os(t.x, e.translate, e.scale, e.originPoint), os(t.y, n.translate, n.scale, n.originPoint)
}
const as = .999999999999,
    ls = 1.0000000000001;

function us(t, e) {
    t.min = t.min + e, t.max = t.max + e
}

function hs(t, e, n, i, s = .5) {
    os(t, e, n, It(t.min, t.max, s), i)
}

function cs(t, e) {
    hs(t.x, e.x, e.scaleX, e.scale, e.originX), hs(t.y, e.y, e.scaleY, e.scale, e.originY)
}

function ds(t, e) {
    return _i(function(t, e) {
        if (!e) return t;
        const n = e({
                x: t.left,
                y: t.top
            }),
            i = e({
                x: t.right,
                y: t.bottom
            });
        return {
            top: n.y,
            left: n.x,
            bottom: i.y,
            right: i.x
        }
    }(t.getBoundingClientRect(), e))
}
const ps = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    },
    ms = Xe.length;

function fs(t, e, n) {
    const {
        style: i,
        vars: s,
        transformOrigin: o
    } = t;
    let r = !1,
        a = !1;
    for (const l in e) {
        const t = e[l];
        if (ze.has(l)) r = !0;
        else if (et(l)) s[l] = t;
        else {
            const e = mi(t, ai[l]);
            l.startsWith("origin") ? (a = !0, o[l] = e) : i[l] = e
        }
    }
    if (e.transform || (r || n ? i.transform = function(t, e, n) {
            let i = "",
                s = !0;
            for (let o = 0; o < ms; o++) {
                const r = Xe[o],
                    a = t[r];
                if (void 0 === a) continue;
                let l = !0;
                if ("number" == typeof a) l = a === (r.startsWith("scale") ? 1 : 0);
                else {
                    const t = parseFloat(a);
                    l = r.startsWith("scale") ? 1 === t : 0 === t
                }
                if (!l || n) {
                    const t = mi(a, ai[r]);
                    l || (s = !1, i += `${ps[r]||r}(${t}) `), n && (e[r] = t)
                }
            }
            return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i
        }(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
        const {
            originX: t = "50%",
            originY: e = "50%",
            originZ: n = 0
        } = o;
        i.transformOrigin = `${t} ${e} ${n}`
    }
}

function gs(t, {
    style: e,
    vars: n
}, i, s) {
    const o = t.style;
    let r;
    for (r in e) o[r] = e[r];
    for (r in null == s || s.applyProjectionStyles(o, i), n) o.setProperty(r, n[r])
}

function ys(t, e) {
    return e.max === e.min ? 0 : t / (e.max - e.min) * 100
}
const vs = {
        correct: (t, e) => {
            if (!e.target) return t;
            if ("string" == typeof t) {
                if (!wt.test(t)) return t;
                t = parseFloat(t)
            }
            return `${ys(t,e.target.x)}% ${ys(t,e.target.y)}%`
        }
    },
    xs = {
        correct: (t, {
            treeScale: e,
            projectionDelta: n
        }) => {
            const i = t,
                s = jt.parse(t);
            if (s.length > 5) return i;
            const o = jt.createTransformer(t),
                r = "number" != typeof s[0] ? 1 : 0,
                a = n.x.scale * e.x,
                l = n.y.scale * e.y;
            s[0 + r] /= a, s[1 + r] /= l;
            const u = It(a, l, .5);
            return "number" == typeof s[2 + r] && (s[2 + r] /= u), "number" == typeof s[3 + r] && (s[3 + r] /= u), o(s)
        }
    },
    ws = {
        borderRadius: { ...vs,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: vs,
        borderTopRightRadius: vs,
        borderBottomLeftRadius: vs,
        borderBottomRightRadius: vs,
        boxShadow: xs
    };

function Ts(t, {
    layout: e,
    layoutId: n
}) {
    return ze.has(t) || t.startsWith("origin") || (e || void 0 !== n) && (!!ws[t] || "opacity" === t)
}

function Ps(t, e, n) {
    var i;
    const s = t.style,
        o = null == e ? void 0 : e.style,
        r = {};
    if (!s) return r;
    for (const a in s)(Xn(s[a]) || o && Xn(o[a]) || Ts(a, t) || void 0 !== (null == (i = null == n ? void 0 : n.getValue(a)) ? void 0 : i.liveStyle)) && (r[a] = s[a]);
    return r
}
class Ss extends qi {
    constructor() {
        super(...arguments), this.type = "html", this.renderInstance = gs
    }
    readValueFromInstance(t, e) {
        var n, i;
        if (ze.has(e)) return (null == (n = this.projection) ? void 0 : n.isProjecting) ? $e(e) : ((t, e) => {
            const {
                transform: n = "none"
            } = getComputedStyle(t);
            return Ne(n, e)
        })(t, e); {
            const n = (i = t, window.getComputedStyle(i)),
                s = (et(e) ? n.getPropertyValue(e) : n[e]) || 0;
            return "string" == typeof s ? s.trim() : s
        }
    }
    measureInstanceViewportBox(t, {
        transformPagePoint: e
    }) {
        return ds(t, e)
    }
    build(t, e, n) {
        fs(t, e, n.transformTemplate)
    }
    scrapeMotionValuesFromProps(t, e, n) {
        return Ps(t, e, n)
    }
}
class bs extends Gi {
    constructor() {
        super(...arguments), this.type = "object"
    }
    readValueFromInstance(t, e) {
        if (function(t, e) {
                return t in e
            }(e, t)) {
            const n = t[e];
            if ("string" == typeof n || "number" == typeof n) return n
        }
    }
    getBaseTargetFromProps() {}
    removeValueFromRenderState(t, e) {
        delete e.output[t]
    }
    measureInstanceViewportBox() {
        return {
            x: {
                min: 0,
                max: 0
            },
            y: {
                min: 0,
                max: 0
            }
        }
    }
    build(t, e) {
        Object.assign(t.output, e)
    }
    renderInstance(t, {
        output: e
    }) {
        Object.assign(t, e)
    }
    sortInstanceNodePosition() {
        return 0
    }
}
const As = {
        offset: "stroke-dashoffset",
        array: "stroke-dasharray"
    },
    Es = {
        offset: "strokeDashoffset",
        array: "strokeDasharray"
    };
const Ms = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];

function Cs(t, {
    attrX: e,
    attrY: n,
    attrScale: i,
    pathLength: s,
    pathSpacing: o = 1,
    pathOffset: r = 0,
    ...a
}, l, u, h) {
    if (fs(t, a, u), l) return void(t.style.viewBox && (t.attrs.viewBox = t.style.viewBox));
    t.attrs = t.style, t.style = {};
    const {
        attrs: c,
        style: d
    } = t;
    c.transform && (d.transform = c.transform, delete c.transform), (d.transform || c.transformOrigin) && (d.transformOrigin = c.transformOrigin ? ? "50% 50%", delete c.transformOrigin), d.transform && (d.transformBox = (null == h ? void 0 : h.transformBox) ? ? "fill-box", delete c.transformBox);
    for (const p of Ms) void 0 !== c[p] && (d[p] = c[p], delete c[p]);
    void 0 !== e && (c.x = e), void 0 !== n && (c.y = n), void 0 !== i && (c.scale = i), void 0 !== s && function(t, e, n = 1, i = 0, s = !0) {
        t.pathLength = 1;
        const o = s ? As : Es;
        t[o.offset] = "" + -i, t[o.array] = `${e} ${n}`
    }(c, s, o, r, !1)
}
const Vs = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]),
    Ds = t => "string" == typeof t && "svg" === t.toLowerCase();

function ks(t, e, n) {
    const i = Ps(t, e, n);
    for (const s in t)
        if (Xn(t[s]) || Xn(e[s])) {
            i[-1 !== Xe.indexOf(s) ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s] = t[s]
        }
    return i
}
class Rs extends qi {
    constructor() {
        super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ji
    }
    getBaseTargetFromProps(t, e) {
        return t[e]
    }
    readValueFromInstance(t, e) {
        if (ze.has(e)) {
            const t = ui(e);
            return t && t.default || 0
        }
        return e = Vs.has(e) ? e : Kn(e), t.getAttribute(e)
    }
    scrapeMotionValuesFromProps(t, e, n) {
        return ks(t, e, n)
    }
    build(t, e, n) {
        Cs(t, e, this.isSVGTag, n.transformTemplate, n.style)
    }
    renderInstance(t, e, n, i) {
        ! function(t, e, n, i) {
            gs(t, e, void 0, i);
            for (const s in e.attrs) t.setAttribute(Vs.has(s) ? s : Kn(s), e.attrs[s])
        }(t, e, 0, i)
    }
    mount(t) {
        this.isSVGTag = Ds(t.tagName), super.mount(t)
    }
}
const Ls = Ni.length;

function js(t) {
    if (!t) return;
    if (!t.isControllingVariants) {
        const e = t.parent && js(t.parent) || {};
        return void 0 !== t.props.initial && (e.initial = t.props.initial), e
    }
    const e = {};
    for (let n = 0; n < Ls; n++) {
        const i = Ni[n],
            s = t.props[i];
        (Wi(s) || !1 === s) && (e[i] = s)
    }
    return e
}

function Bs(t, e) {
    if (!Array.isArray(e)) return !1;
    const n = e.length;
    if (n !== t.length) return !1;
    for (let i = 0; i < n; i++)
        if (e[i] !== t[i]) return !1;
    return !0
}
const Fs = [...$i].reverse(),
    Is = $i.length;

function Os(t) {
    return e => Promise.all(e.map(({
        animation: e,
        options: n
    }) => function(t, e, n = {}) {
        let i;
        if (t.notify("AnimationStart", e), Array.isArray(e)) {
            const s = e.map(e => _n(t, e, n));
            i = Promise.all(s)
        } else if ("string" == typeof e) i = _n(t, e, n);
        else {
            const s = "function" == typeof e ? In(t, e, n.custom) : e;
            i = Promise.all(Zn(t, s, n))
        }
        return i.then(() => {
            t.notify("AnimationComplete", e)
        })
    }(t, e, n)))
}

function Us(t) {
    let e = Os(t),
        n = Ns(),
        i = !0;
    const s = e => (n, i) => {
        var s;
        const o = In(t, i, "exit" === e ? null == (s = t.presenceContext) ? void 0 : s.custom : void 0);
        if (o) {
            const {
                transition: t,
                transitionEnd: e,
                ...i
            } = o;
            n = { ...n,
                ...i,
                ...e
            }
        }
        return n
    };

    function o(o) {
        const {
            props: r
        } = t, a = js(t.parent) || {}, l = [], u = new Set;
        let h = {},
            c = 1 / 0;
        for (let e = 0; e < Is; e++) {
            const d = Fs[e],
                p = n[d],
                m = void 0 !== r[d] ? r[d] : a[d],
                f = Wi(m),
                g = d === o ? p.isActive : null;
            !1 === g && (c = e);
            let y = m === a[d] && m !== r[d] && f;
            if (y && i && t.manuallyAnimateOnMount && (y = !1), p.protectedKeys = { ...h
                }, !p.isActive && null === g || !m && !p.prevProp || Ui(m) || "boolean" == typeof m) continue;
            const v = Ws(p.prevProp, m);
            let x = v || d === o && p.isActive && !y && f || e > c && f,
                w = !1;
            const T = Array.isArray(m) ? m : [m];
            let P = T.reduce(s(d), {});
            !1 === g && (P = {});
            const {
                prevResolvedValues: S = {}
            } = p, b = { ...S,
                ...P
            }, A = e => {
                x = !0, u.has(e) && (w = !0, u.delete(e)), p.needsAnimating[e] = !0;
                const n = t.getValue(e);
                n && (n.liveStyle = !1)
            };
            for (const t in b) {
                const e = P[t],
                    n = S[t];
                if (h.hasOwnProperty(t)) continue;
                let i = !1;
                i = $n(e) && $n(n) ? !Bs(e, n) : e !== n, i ? null != e ? A(t) : u.add(t) : void 0 !== e && u.has(t) ? A(t) : p.protectedKeys[t] = !0
            }
            p.prevProp = m, p.prevResolvedValues = P, p.isActive && (h = { ...h,
                ...P
            }), i && t.blockInitialAnimation && (x = !1);
            const E = y && v;
            x && (!E || w) && l.push(...T.map(e => {
                const n = {
                    type: d
                };
                if ("string" == typeof e && i && !E && t.manuallyAnimateOnMount && t.parent) {
                    const {
                        parent: i
                    } = t, s = In(i, e);
                    if (i.enteringChildren && s) {
                        const {
                            delayChildren: e
                        } = s.transition || {};
                        n.delay = An(i.enteringChildren, t, e)
                    }
                }
                return {
                    animation: e,
                    options: n
                }
            }))
        }
        if (u.size) {
            const e = {};
            if ("boolean" != typeof r.initial) {
                const n = In(t, Array.isArray(r.initial) ? r.initial[0] : r.initial);
                n && n.transition && (e.transition = n.transition)
            }
            u.forEach(n => {
                const i = t.getBaseTarget(n),
                    s = t.getValue(n);
                s && (s.liveStyle = !0), e[n] = i ? ? null
            }), l.push({
                animation: e
            })
        }
        let d = Boolean(l.length);
        return !i || !1 !== r.initial && r.initial !== r.animate || t.manuallyAnimateOnMount || (d = !1), i = !1, d ? e(l) : Promise.resolve()
    }
    return {
        animateChanges: o,
        setActive: function(e, i) {
            var s;
            if (n[e].isActive === i) return Promise.resolve();
            null == (s = t.variantChildren) || s.forEach(t => {
                var n;
                return null == (n = t.animationState) ? void 0 : n.setActive(e, i)
            }), n[e].isActive = i;
            const r = o(e);
            for (const t in n) n[t].protectedKeys = {};
            return r
        },
        setAnimateFunction: function(n) {
            e = n(t)
        },
        getState: () => n,
        reset: () => {
            n = Ns()
        }
    }
}

function Ws(t, e) {
    return "string" == typeof e ? e !== t : !!Array.isArray(e) && !Bs(e, t)
}

function $s(t = !1) {
    return {
        isActive: t,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}

function Ns() {
    return {
        animate: $s(!0),
        whileInView: $s(),
        whileHover: $s(),
        whileTap: $s(),
        whileDrag: $s(),
        whileFocus: $s(),
        exit: $s()
    }
}

function Ys(t, e) {
    t.min = e.min, t.max = e.max
}

function Xs(t, e) {
    Ys(t.x, e.x), Ys(t.y, e.y)
}

function zs(t, e) {
    t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin
}

function Ks(t) {
    return t.max - t.min
}

function Hs(t, e, n, i = .5) {
    t.origin = i, t.originPoint = It(e.min, e.max, t.origin), t.scale = Ks(n) / Ks(e), t.translate = It(n.min, n.max, t.origin) - t.originPoint, (t.scale >= .9999 && t.scale <= 1.0001 || isNaN(t.scale)) && (t.scale = 1), (t.translate >= -.01 && t.translate <= .01 || isNaN(t.translate)) && (t.translate = 0)
}

function Gs(t, e, n, i) {
    Hs(t.x, e.x, n.x, i ? i.originX : void 0), Hs(t.y, e.y, n.y, i ? i.originY : void 0)
}

function qs(t, e, n) {
    t.min = n.min + e.min, t.max = t.min + Ks(e)
}

function Zs(t, e, n) {
    t.min = e.min - n.min, t.max = t.min + Ks(e)
}

function _s(t, e, n) {
    Zs(t.x, e.x, n.x), Zs(t.y, e.y, n.y)
}

function Js(t, e, n, i, s) {
    return t = is(t -= e, 1 / n, i), void 0 !== s && (t = is(t, 1 / s, i)), t
}

function Qs(t, e, [n, i, s], o, r) {
    ! function(t, e = 0, n = 1, i = .5, s, o = t, r = t) {
        xt.test(e) && (e = parseFloat(e), e = It(r.min, r.max, e / 100) - r.min);
        if ("number" != typeof e) return;
        let a = It(o.min, o.max, i);
        t === o && (a -= e), t.min = Js(t.min, e, n, a, s), t.max = Js(t.max, e, n, a, s)
    }(t, e[n], e[i], e[s], e.scale, o, r)
}
const to = ["x", "scaleX", "originX"],
    eo = ["y", "scaleY", "originY"];

function no(t, e, n, i) {
    Qs(t.x, e, to, n ? n.x : void 0, i ? i.x : void 0), Qs(t.y, e, eo, n ? n.y : void 0, i ? i.y : void 0)
}

function io(t) {
    return 0 === t.translate && 1 === t.scale
}

function so(t) {
    return io(t.x) && io(t.y)
}

function oo(t, e) {
    return t.min === e.min && t.max === e.max
}

function ro(t, e) {
    return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max)
}

function ao(t, e) {
    return ro(t.x, e.x) && ro(t.y, e.y)
}

function lo(t) {
    return Ks(t.x) / Ks(t.y)
}

function uo(t, e) {
    return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint
}

function ho(t) {
    return [t("x"), t("y")]
}
const co = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
    po = co.length,
    mo = t => "string" == typeof t ? parseFloat(t) : t,
    fo = t => "number" == typeof t || wt.test(t);

function go(t, e) {
    return void 0 !== t[e] ? t[e] : t.borderRadius
}
const yo = xo(0, .5, j),
    vo = xo(.5, .95, y);

function xo(t, e, n) {
    return i => i < t ? 0 : i > e ? 1 : n(w(t, e, i))
}

function wo(t, e, n) {
    const i = Xn(t) ? t : Wn(t);
    return i.start(jn("", i, e, n)), i.animation
}

function To(t, e, n, i = {
    passive: !0
}) {
    return t.addEventListener(e, n, i), () => t.removeEventListener(e, n)
}
const Po = (t, e) => t.depth - e.depth;
class So {
    constructor() {
        this.children = [], this.isDirty = !1
    }
    add(t) {
        a(this.children, t), this.isDirty = !0
    }
    remove(t) {
        l(this.children, t), this.isDirty = !0
    }
    forEach(t) {
        this.isDirty && this.children.sort(Po), this.isDirty = !1, this.children.forEach(t)
    }
}

function bo(t) {
    return Xn(t) ? t.get() : t
}
class Ao {
    constructor() {
        this.members = []
    }
    add(t) {
        a(this.members, t), t.scheduleRender()
    }
    remove(t) {
        if (l(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
            const t = this.members[this.members.length - 1];
            t && this.promote(t)
        }
    }
    relegate(t) {
        const e = this.members.findIndex(e => t === e);
        if (0 === e) return !1;
        let n;
        for (let i = e; i >= 0; i--) {
            const t = this.members[i];
            if (!1 !== t.isPresent) {
                n = t;
                break
            }
        }
        return !!n && (this.promote(n), !0)
    }
    promote(t, e) {
        const n = this.lead;
        if (t !== n && (this.prevLead = n, this.lead = t, t.show(), n)) {
            n.instance && n.scheduleRender(), t.scheduleRender(), t.resumeFrom = n, e && (t.resumeFrom.preserveOpacity = !0), n.snapshot && (t.snapshot = n.snapshot, t.snapshot.latestValues = n.animationValues || n.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
            const {
                crossfade: i
            } = t.options;
            !1 === i && n.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(t => {
            const {
                options: e,
                resumingFrom: n
            } = t;
            e.onExitComplete && e.onExitComplete(), n && n.options.onExitComplete && n.options.onExitComplete()
        })
    }
    scheduleRender() {
        this.members.forEach(t => {
            t.instance && t.scheduleRender(!1)
        })
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
    }
}
const Eo = {
        hasAnimatedSinceResize: !0,
        hasEverUpdated: !1
    },
    Mo = ["", "X", "Y", "Z"];
let Co = 0;

function Vo(t, e, n, i) {
    const {
        latestValues: s
    } = e;
    s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0))
}

function Do(t) {
    if (t.hasCheckedOptimisedAppear = !0, t.root === t) return;
    const {
        visualElement: e
    } = t.options;
    if (!e) return;
    const n = Gn(e);
    if (window.MotionHasOptimisedAnimation(n, "transform")) {
        const {
            layout: e,
            layoutId: i
        } = t.options;
        window.MotionCancelOptimisedAnimation(n, "transform", H, !(e || i))
    }
    const {
        parent: i
    } = t;
    i && !i.hasCheckedOptimisedAppear && Do(i)
}

function ko({
    attachResizeListener: t,
    defaultParent: e,
    measureScroll: n,
    checkIsScrollRoot: i,
    resetTransform: s
}) {
    return class {
        constructor(t = {}, n = (null == e ? void 0 : e())) {
            this.id = Co++, this.animationId = 0, this.animationCommitId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
                x: 1,
                y: 1
            }, this.eventHandlers = new Map, this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
            }, this.updateProjection = () => {
                this.projectionUpdateScheduled = !1, this.nodes.forEach(jo), this.nodes.forEach($o), this.nodes.forEach(No), this.nodes.forEach(Bo)
            }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = new Map, this.latestValues = t, this.root = n ? n.root || n : this, this.path = n ? [...n.path, n] : [], this.parent = n, this.depth = n ? n.depth + 1 : 0;
            for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
            this.root === this && (this.nodes = new So)
        }
        addEventListener(t, e) {
            return this.eventHandlers.has(t) || this.eventHandlers.set(t, new T), this.eventHandlers.get(t).add(e)
        }
        notifyListeners(t, ...e) {
            const n = this.eventHandlers.get(t);
            n && n.notify(...e)
        }
        hasListeners(t) {
            return this.eventHandlers.has(t)
        }
        mount(e) {
            if (this.instance) return;
            this.isSVG = ki(e) && !Ri(e), this.instance = e;
            const {
                layoutId: n,
                layout: i,
                visualElement: s
            } = this.options;
            if (s && !s.current && s.mount(e), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (i || n) && (this.isLayoutDirty = !0), t) {
                let n, i = 0;
                const s = () => this.root.updateBlockedByResize = !1;
                H.read(() => {
                    i = window.innerWidth
                }), t(e, () => {
                    const t = window.innerWidth;
                    t !== i && (i = t, this.root.updateBlockedByResize = !0, n && n(), n = function(t, e) {
                        const n = Q.now(),
                            i = ({
                                timestamp: s
                            }) => {
                                const o = s - n;
                                o >= e && (G(i), t(o - e))
                            };
                        return H.setup(i, !0), () => G(i)
                    }(s, 250), Eo.hasAnimatedSinceResize && (Eo.hasAnimatedSinceResize = !1, this.nodes.forEach(Wo)))
                })
            }
            n && this.root.registerSharedNode(n, this), !1 !== this.options.animate && s && (n || i) && this.addEventListener("didUpdate", ({
                delta: t,
                hasLayoutChanged: e,
                hasRelativeLayoutChanged: n,
                layout: i
            }) => {
                if (this.isTreeAnimationBlocked()) return this.target = void 0, void(this.relativeTarget = void 0);
                const o = this.options.transition || s.getDefaultTransition() || Go,
                    {
                        onLayoutAnimationStart: r,
                        onLayoutAnimationComplete: a
                    } = s.getProps(),
                    l = !this.targetLayout || !ao(this.targetLayout, i),
                    u = !e && n;
                if (this.options.layoutRoot || this.resumeFrom || u || e && (l || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
                    const e = { ...Ln(o, "layout"),
                        onPlay: r,
                        onComplete: a
                    };
                    (s.shouldReduceMotion || this.options.layoutRoot) && (e.delay = 0, e.type = !1), this.startAnimation(e), this.setAnimationOrigin(t, u)
                } else e || Wo(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = i
            })
        }
        unmount() {
            this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
            const t = this.getStack();
            t && t.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), G(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Yo), this.animationId++)
        }
        getTransformTemplate() {
            const {
                visualElement: t
            } = this.options;
            return t && t.getProps().transformTemplate
        }
        willUpdate(t = !0) {
            if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) return void(this.options.onExitComplete && this.options.onExitComplete());
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Do(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
            this.isLayoutDirty = !0;
            for (let s = 0; s < this.path.length; s++) {
                const t = this.path[s];
                t.shouldResetTransform = !0, t.updateScroll("snapshot"), t.options.layoutRoot && t.willUpdate(!1)
            }
            const {
                layoutId: e,
                layout: n
            } = this.options;
            if (void 0 === e && !n) return;
            const i = this.getTransformTemplate();
            this.prevTransformTemplateValue = i ? i(this.latestValues, "") : void 0, this.updateSnapshot(), t && this.notifyListeners("willUpdate")
        }
        update() {
            this.updateScheduled = !1;
            if (this.isUpdateBlocked()) return this.unblockUpdate(), this.clearAllSnapshots(), void this.nodes.forEach(Io);
            if (this.animationId <= this.animationCommitId) return void this.nodes.forEach(Oo);
            this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(Uo), this.nodes.forEach(Ro), this.nodes.forEach(Lo)) : this.nodes.forEach(Oo), this.clearAllSnapshots();
            const t = Q.now();
            q.delta = u(0, 1e3 / 60, t - q.timestamp), q.timestamp = t, q.isProcessing = !0, Z.update.process(q), Z.preRender.process(q), Z.render.process(q), q.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0, gi.read(this.scheduleUpdate))
        }
        clearAllSnapshots() {
            this.nodes.forEach(Fo), this.sharedNodes.forEach(Xo)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, H.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            H.postRender(() => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            })
        }
        updateSnapshot() {
            !this.snapshot && this.instance && (this.snapshot = this.measure(), !this.snapshot || Ks(this.snapshot.measuredBox.x) || Ks(this.snapshot.measuredBox.y) || (this.snapshot = void 0))
        }
        updateLayout() {
            if (!this.instance) return;
            if (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead() || this.isLayoutDirty)) return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let n = 0; n < this.path.length; n++) {
                    this.path[n].updateScroll()
                }
            const t = this.layout;
            this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            }, this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
            const {
                visualElement: e
            } = this.options;
            e && e.notify("LayoutMeasure", this.layout.layoutBox, t ? t.layoutBox : void 0)
        }
        updateScroll(t = "measure") {
            let e = Boolean(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t && (e = !1), e && this.instance) {
                const e = i(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: t,
                    isRoot: e,
                    offset: n(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : e
                }
            }
        }
        resetTransform() {
            if (!s) return;
            const t = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
                e = this.projectionDelta && !so(this.projectionDelta),
                n = this.getTransformTemplate(),
                i = n ? n(this.latestValues, "") : void 0,
                o = i !== this.prevTransformTemplateValue;
            t && this.instance && (e || ts(this.latestValues) || o) && (s(this.instance, i), this.shouldResetTransform = !1, this.scheduleRender())
        }
        measure(t = !0) {
            const e = this.measurePageBox();
            let n = this.removeElementScroll(e);
            var i;
            return t && (n = this.removeTransform(n)), _o((i = n).x), _o(i.y), {
                animationId: this.root.animationId,
                measuredBox: e,
                layoutBox: n,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            var t;
            const {
                visualElement: e
            } = this.options;
            if (!e) return {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            };
            const n = e.measureViewportBox();
            if (!((null == (t = this.scroll) ? void 0 : t.wasRoot) || this.path.some(Qo))) {
                const {
                    scroll: t
                } = this.root;
                t && (us(n.x, t.offset.x), us(n.y, t.offset.y))
            }
            return n
        }
        removeElementScroll(t) {
            var e;
            const n = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            };
            if (Xs(n, t), null == (e = this.scroll) ? void 0 : e.wasRoot) return n;
            for (let i = 0; i < this.path.length; i++) {
                const e = this.path[i],
                    {
                        scroll: s,
                        options: o
                    } = e;
                e !== this.root && s && o.layoutScroll && (s.wasRoot && Xs(n, t), us(n.x, s.offset.x), us(n.y, s.offset.y))
            }
            return n
        }
        applyTransform(t, e = !1) {
            const n = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            };
            Xs(n, t);
            for (let i = 0; i < this.path.length; i++) {
                const t = this.path[i];
                !e && t.options.layoutScroll && t.scroll && t !== t.root && cs(n, {
                    x: -t.scroll.offset.x,
                    y: -t.scroll.offset.y
                }), ts(t.latestValues) && cs(n, t.latestValues)
            }
            return ts(this.latestValues) && cs(n, this.latestValues), n
        }
        removeTransform(t) {
            const e = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            };
            Xs(e, t);
            for (let n = 0; n < this.path.length; n++) {
                const t = this.path[n];
                if (!t.instance) continue;
                if (!ts(t.latestValues)) continue;
                Qi(t.latestValues) && t.updateSnapshot();
                const i = ji();
                Xs(i, t.measurePageBox()), no(e, t.latestValues, t.snapshot ? t.snapshot.layoutBox : void 0, i)
            }
            return ts(this.latestValues) && no(e, this.latestValues), e
        }
        setTargetDelta(t) {
            this.targetDelta = t, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
        }
        setOptions(t) {
            this.options = { ...this.options,
                ...t,
                crossfade: void 0 === t.crossfade || t.crossfade
            }
        }
        clearMeasurements() {
            this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== q.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(t = !1) {
            var e;
            const n = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = n.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = n.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = n.isSharedProjectionDirty);
            const i = Boolean(this.resumingFrom) || this !== n;
            if (!(t || i && this.isSharedProjectionDirty || this.isProjectionDirty || (null == (e = this.parent) ? void 0 : e.isProjectionDirty) || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
            const {
                layout: s,
                layoutId: o
            } = this.options;
            if (!this.layout || !s && !o) return;
            this.resolvedRelativeTargetAt = q.timestamp;
            const r = this.getClosestProjectingParent();
            var a, l, u;
            (r && this.linkedParentVersion !== r.layoutVersion && !r.options.layoutRoot && this.removeRelativeTarget(), this.targetDelta || this.relativeTarget || (r && r.layout ? this.createRelativeTarget(r, this.layout.layoutBox, r.layout.layoutBox) : this.removeRelativeTarget()), this.relativeTarget || this.targetDelta) && (this.target || (this.target = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            }, this.targetWithTransforms = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            }), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), a = this.target, l = this.relativeTarget, u = this.relativeParent.target, qs(a.x, l.x, u.x), qs(a.y, l.y, u.y)) : this.targetDelta ? (Boolean(this.resumingFrom) ? this.target = this.applyTransform(this.layout.layoutBox) : Xs(this.target, this.layout.layoutBox), rs(this.target, this.targetDelta)) : Xs(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, r && Boolean(r.resumingFrom) === Boolean(this.resumingFrom) && !r.options.layoutScroll && r.target && 1 !== this.animationProgress ? this.createRelativeTarget(r, this.target, r.target) : this.relativeParent = this.relativeTarget = void 0))
        }
        getClosestProjectingParent() {
            if (this.parent && !Qi(this.parent.latestValues) && !es(this.parent.latestValues)) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        createRelativeTarget(t, e, n) {
            this.relativeParent = t, this.linkedParentVersion = t.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            }, this.relativeTargetOrigin = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            }, _s(this.relativeTargetOrigin, e, n), Xs(this.relativeTarget, this.relativeTargetOrigin)
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = void 0
        }
        calcProjection() {
            var t;
            const e = this.getLead(),
                n = Boolean(this.resumingFrom) || this !== e;
            let i = !0;
            if ((this.isProjectionDirty || (null == (t = this.parent) ? void 0 : t.isProjectionDirty)) && (i = !1), n && (this.isSharedProjectionDirty || this.isTransformDirty) && (i = !1), this.resolvedRelativeTargetAt === q.timestamp && (i = !1), i) return;
            const {
                layout: s,
                layoutId: o
            } = this.options;
            if (this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !s && !o) return;
            Xs(this.layoutCorrected, this.layout.layoutBox);
            const r = this.treeScale.x,
                a = this.treeScale.y;
            ! function(t, e, n, i = !1) {
                const s = n.length;
                if (!s) return;
                let o, r;
                e.x = e.y = 1;
                for (let a = 0; a < s; a++) {
                    o = n[a], r = o.projectionDelta;
                    const {
                        visualElement: s
                    } = o.options;
                    s && s.props.style && "contents" === s.props.style.display || (i && o.options.layoutScroll && o.scroll && o !== o.root && cs(t, {
                        x: -o.scroll.offset.x,
                        y: -o.scroll.offset.y
                    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, rs(t, r)), i && ts(o.latestValues) && cs(t, o.latestValues))
                }
                e.x < ls && e.x > as && (e.x = 1), e.y < ls && e.y > as && (e.y = 1)
            }(this.layoutCorrected, this.treeScale, this.path, n), !e.layout || e.target || 1 === this.treeScale.x && 1 === this.treeScale.y || (e.target = e.layout.layoutBox, e.targetWithTransforms = {
                x: {
                    min: 0,
                    max: 0
                },
                y: {
                    min: 0,
                    max: 0
                }
            });
            const {
                target: l
            } = e;
            l ? (this.projectionDelta && this.prevProjectionDelta ? (zs(this.prevProjectionDelta.x, this.projectionDelta.x), zs(this.prevProjectionDelta.y, this.projectionDelta.y)) : this.createProjectionDeltas(), Gs(this.projectionDelta, this.layoutCorrected, l, this.latestValues), this.treeScale.x === r && this.treeScale.y === a && uo(this.projectionDelta.x, this.prevProjectionDelta.x) && uo(this.projectionDelta.y, this.prevProjectionDelta.y) || (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", l))) : this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(t = !0) {
            var e;
            if (null == (e = this.options.visualElement) || e.scheduleRender(), t) {
                const t = this.getStack();
                t && t.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = {
                x: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                },
                y: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                }
            }, this.projectionDelta = {
                x: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                },
                y: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                }
            }, this.projectionDeltaWithTransform = {
                x: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                },
                y: {
                    translate: 0,
                    scale: 1,
                    origin: 0,
                    originPoint: 0
                }
            }
        }
        setAnimationOrigin(t, e = !1) {
            const n = this.snapshot,
                i = n ? n.latestValues : {},
                s = { ...this.latestValues
                },
                o = {
                    x: {
                        translate: 0,
                        scale: 1,
                        origin: 0,
                        originPoint: 0
                    },
                    y: {
                        translate: 0,
                        scale: 1,
                        origin: 0,
                        originPoint: 0
                    }
                };
            this.relativeParent && this.relativeParent.options.layoutRoot || (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !e;
            const r = {
                    x: {
                        min: 0,
                        max: 0
                    },
                    y: {
                        min: 0,
                        max: 0
                    }
                },
                a = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
                l = this.getStack(),
                u = !l || l.members.length <= 1,
                h = Boolean(a && !u && !0 === this.options.crossfade && !this.path.some(Ho));
            let c;
            this.animationProgress = 0, this.mixTargetDelta = e => {
                const n = e / 1e3;
                var l, d, p, m, f, g;
                zo(o.x, t.x, n), zo(o.y, t.y, n), this.setTargetDelta(o), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (_s(r, this.layout.layoutBox, this.relativeParent.layout.layoutBox), p = this.relativeTarget, m = this.relativeTargetOrigin, f = r, g = n, Ko(p.x, m.x, f.x, g), Ko(p.y, m.y, f.y, g), c && (l = this.relativeTarget, d = c, oo(l.x, d.x) && oo(l.y, d.y)) && (this.isProjectionDirty = !1), c || (c = {
                    x: {
                        min: 0,
                        max: 0
                    },
                    y: {
                        min: 0,
                        max: 0
                    }
                }), Xs(c, this.relativeTarget)), a && (this.animationValues = s, function(t, e, n, i, s, o) {
                    s ? (t.opacity = It(0, n.opacity ? ? 1, yo(i)), t.opacityExit = It(e.opacity ? ? 1, 0, vo(i))) : o && (t.opacity = It(e.opacity ? ? 1, n.opacity ? ? 1, i));
                    for (let r = 0; r < po; r++) {
                        const s = `border${co[r]}Radius`;
                        let o = go(e, s),
                            a = go(n, s);
                        void 0 === o && void 0 === a || (o || (o = 0), a || (a = 0), 0 === o || 0 === a || fo(o) === fo(a) ? (t[s] = Math.max(It(mo(o), mo(a), i), 0), (xt.test(a) || xt.test(o)) && (t[s] += "%")) : t[s] = a)
                    }(e.rotate || n.rotate) && (t.rotate = It(e.rotate || 0, n.rotate || 0, i))
                }(s, i, this.latestValues, n, h, u)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = n
            }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(t) {
            var e, n, i;
            this.notifyListeners("animationStart"), null == (e = this.currentAnimation) || e.stop(), null == (i = null == (n = this.resumingFrom) ? void 0 : n.currentAnimation) || i.stop(), this.pendingAnimation && (G(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = H.update(() => {
                Eo.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Wn(0)), this.currentAnimation = wo(this.motionValue, [0, 1e3], { ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: e => {
                        this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e)
                    },
                    onStop: () => {},
                    onComplete: () => {
                        t.onComplete && t.onComplete(), this.completeAnimation()
                    }
                }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0
            })
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
            const t = this.getStack();
            t && t.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(1e3), this.currentAnimation.stop()), this.completeAnimation()
        }
        applyTransformsToTarget() {
            const t = this.getLead();
            let {
                targetWithTransforms: e,
                target: n,
                layout: i,
                latestValues: s
            } = t;
            if (e && n && i) {
                if (this !== t && this.layout && i && Jo(this.options.animationType, this.layout.layoutBox, i.layoutBox)) {
                    n = this.target || {
                        x: {
                            min: 0,
                            max: 0
                        },
                        y: {
                            min: 0,
                            max: 0
                        }
                    };
                    const e = Ks(this.layout.layoutBox.x);
                    n.x.min = t.target.x.min, n.x.max = n.x.min + e;
                    const i = Ks(this.layout.layoutBox.y);
                    n.y.min = t.target.y.min, n.y.max = n.y.min + i
                }
                Xs(e, n), cs(e, s), Gs(this.projectionDeltaWithTransform, this.layoutCorrected, e, s)
            }
        }
        registerSharedNode(t, e) {
            this.sharedNodes.has(t) || this.sharedNodes.set(t, new Ao);
            this.sharedNodes.get(t).add(e);
            const n = e.options.initialPromotionConfig;
            e.promote({
                transition: n ? n.transition : void 0,
                preserveFollowOpacity: n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(e) : void 0
            })
        }
        isLead() {
            const t = this.getStack();
            return !t || t.lead === this
        }
        getLead() {
            var t;
            const {
                layoutId: e
            } = this.options;
            return e && (null == (t = this.getStack()) ? void 0 : t.lead) || this
        }
        getPrevLead() {
            var t;
            const {
                layoutId: e
            } = this.options;
            return e ? null == (t = this.getStack()) ? void 0 : t.prevLead : void 0
        }
        getStack() {
            const {
                layoutId: t
            } = this.options;
            if (t) return this.root.sharedNodes.get(t)
        }
        promote({
            needsReset: t,
            transition: e,
            preserveFollowOpacity: n
        } = {}) {
            const i = this.getStack();
            i && i.promote(this, n), t && (this.projectionDelta = void 0, this.needsReset = !0), e && this.setOptions({
                transition: e
            })
        }
        relegate() {
            const t = this.getStack();
            return !!t && t.relegate(this)
        }
        resetSkewAndRotation() {
            const {
                visualElement: t
            } = this.options;
            if (!t) return;
            let e = !1;
            const {
                latestValues: n
            } = t;
            if ((n.z || n.rotate || n.rotateX || n.rotateY || n.rotateZ || n.skewX || n.skewY) && (e = !0), !e) return;
            const i = {};
            n.z && Vo("z", t, i, this.animationValues);
            for (let s = 0; s < Mo.length; s++) Vo(`rotate${Mo[s]}`, t, i, this.animationValues), Vo(`skew${Mo[s]}`, t, i, this.animationValues);
            t.render();
            for (const s in i) t.setStaticValue(s, i[s]), this.animationValues && (this.animationValues[s] = i[s]);
            t.scheduleRender()
        }
        applyProjectionStyles(t, e) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) return void(t.visibility = "hidden");
            const n = this.getTransformTemplate();
            if (this.needsReset) return this.needsReset = !1, t.visibility = "", t.opacity = "", t.pointerEvents = bo(null == e ? void 0 : e.pointerEvents) || "", void(t.transform = n ? n(this.latestValues, "") : "none");
            const i = this.getLead();
            if (!this.projectionDelta || !this.layout || !i.target) return this.options.layoutId && (t.opacity = void 0 !== this.latestValues.opacity ? this.latestValues.opacity : 1, t.pointerEvents = bo(null == e ? void 0 : e.pointerEvents) || ""), void(this.hasProjected && !ts(this.latestValues) && (t.transform = n ? n({}, "") : "none", this.hasProjected = !1));
            t.visibility = "";
            const s = i.animationValues || i.latestValues;
            this.applyTransformsToTarget();
            let o = function(t, e, n) {
                let i = "";
                const s = t.x.translate / e.x,
                    o = t.y.translate / e.y,
                    r = (null == n ? void 0 : n.z) || 0;
                if ((s || o || r) && (i = `translate3d(${s}px, ${o}px, ${r}px) `), 1 === e.x && 1 === e.y || (i += `scale(${1/e.x}, ${1/e.y}) `), n) {
                    const {
                        transformPerspective: t,
                        rotate: e,
                        rotateX: s,
                        rotateY: o,
                        skewX: r,
                        skewY: a
                    } = n;
                    t && (i = `perspective(${t}px) ${i}`), e && (i += `rotate(${e}deg) `), s && (i += `rotateX(${s}deg) `), o && (i += `rotateY(${o}deg) `), r && (i += `skewX(${r}deg) `), a && (i += `skewY(${a}deg) `)
                }
                const a = t.x.scale * e.x,
                    l = t.y.scale * e.y;
                return 1 === a && 1 === l || (i += `scale(${a}, ${l})`), i || "none"
            }(this.projectionDeltaWithTransform, this.treeScale, s);
            n && (o = n(s, o)), t.transform = o;
            const {
                x: r,
                y: a
            } = this.projectionDelta;
            t.transformOrigin = `${100*r.origin}% ${100*a.origin}% 0`, i.animationValues ? t.opacity = i === this ? s.opacity ? ? this.latestValues.opacity ? ? 1 : this.preserveOpacity ? this.latestValues.opacity : s.opacityExit : t.opacity = i === this ? void 0 !== s.opacity ? s.opacity : "" : void 0 !== s.opacityExit ? s.opacityExit : 0;
            for (const l in ws) {
                if (void 0 === s[l]) continue;
                const {
                    correct: e,
                    applyTo: n,
                    isCSSVariable: r
                } = ws[l], a = "none" === o ? s[l] : e(s[l], i);
                if (n) {
                    const e = n.length;
                    for (let i = 0; i < e; i++) t[n[i]] = a
                } else r ? this.options.visualElement.renderState.vars[l] = a : t[l] = a
            }
            this.options.layoutId && (t.pointerEvents = i === this ? bo(null == e ? void 0 : e.pointerEvents) || "" : "none")
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(t => {
                var e;
                return null == (e = t.currentAnimation) ? void 0 : e.stop()
            }), this.root.nodes.forEach(Io), this.root.sharedNodes.clear()
        }
    }
}

function Ro(t) {
    t.updateLayout()
}

function Lo(t) {
    var e;
    const n = (null == (e = t.resumeFrom) ? void 0 : e.snapshot) || t.snapshot;
    if (t.isLead() && t.layout && n && t.hasListeners("didUpdate")) {
        const {
            layoutBox: e,
            measuredBox: i
        } = t.layout, {
            animationType: s
        } = t.options, o = n.source !== t.layout.source;
        "size" === s ? ho(t => {
            const i = o ? n.measuredBox[t] : n.layoutBox[t],
                s = Ks(i);
            i.min = e[t].min, i.max = i.min + s
        }) : Jo(s, n.layoutBox, e) && ho(i => {
            const s = o ? n.measuredBox[i] : n.layoutBox[i],
                r = Ks(e[i]);
            s.max = s.min + r, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[i].max = t.relativeTarget[i].min + r)
        });
        const r = {
            x: {
                translate: 0,
                scale: 1,
                origin: 0,
                originPoint: 0
            },
            y: {
                translate: 0,
                scale: 1,
                origin: 0,
                originPoint: 0
            }
        };
        Gs(r, e, n.layoutBox);
        const a = {
            x: {
                translate: 0,
                scale: 1,
                origin: 0,
                originPoint: 0
            },
            y: {
                translate: 0,
                scale: 1,
                origin: 0,
                originPoint: 0
            }
        };
        o ? Gs(a, t.applyTransform(i, !0), n.measuredBox) : Gs(a, e, n.layoutBox);
        const l = !so(r);
        let u = !1;
        if (!t.resumeFrom) {
            const i = t.getClosestProjectingParent();
            if (i && !i.resumeFrom) {
                const {
                    snapshot: s,
                    layout: o
                } = i;
                if (s && o) {
                    const r = {
                        x: {
                            min: 0,
                            max: 0
                        },
                        y: {
                            min: 0,
                            max: 0
                        }
                    };
                    _s(r, n.layoutBox, s.layoutBox);
                    const a = {
                        x: {
                            min: 0,
                            max: 0
                        },
                        y: {
                            min: 0,
                            max: 0
                        }
                    };
                    _s(a, e, o.layoutBox), ao(r, a) || (u = !0), i.options.layoutRoot && (t.relativeTarget = a, t.relativeTargetOrigin = r, t.relativeParent = i)
                }
            }
        }
        t.notifyListeners("didUpdate", {
            layout: e,
            snapshot: n,
            delta: a,
            layoutDelta: r,
            hasLayoutChanged: l,
            hasRelativeLayoutChanged: u
        })
    } else if (t.isLead()) {
        const {
            onExitComplete: e
        } = t.options;
        e && e()
    }
    t.options.transition = void 0
}

function jo(t) {
    t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = Boolean(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty))
}

function Bo(t) {
    t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1
}

function Fo(t) {
    t.clearSnapshot()
}

function Io(t) {
    t.clearMeasurements()
}

function Oo(t) {
    t.isLayoutDirty = !1
}

function Uo(t) {
    const {
        visualElement: e
    } = t.options;
    e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform()
}

function Wo(t) {
    t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0
}

function $o(t) {
    t.resolveTargetDelta()
}

function No(t) {
    t.calcProjection()
}

function Yo(t) {
    t.resetSkewAndRotation()
}

function Xo(t) {
    t.removeLeadSnapshot()
}

function zo(t, e, n) {
    t.translate = It(e.translate, 0, n), t.scale = It(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint
}

function Ko(t, e, n, i) {
    t.min = It(e.min, n.min, i), t.max = It(e.max, n.max, i)
}

function Ho(t) {
    return t.animationValues && void 0 !== t.animationValues.opacityExit
}
const Go = {
        duration: .45,
        ease: [.4, 0, .1, 1]
    },
    qo = t => "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t),
    Zo = qo("applewebkit/") && !qo("chrome/") ? Math.round : y;

function _o(t) {
    t.min = Zo(t.min), t.max = Zo(t.max)
}

function Jo(t, e, n) {
    return "position" === t || "preserve-aspect" === t && (i = lo(e), s = lo(n), o = .2, !(Math.abs(i - s) <= o));
    var i, s, o
}

function Qo(t) {
    var e;
    return t !== t.root && (null == (e = t.scroll) ? void 0 : e.wasRoot)
}
const tr = ko({
        attachResizeListener: (t, e) => To(t, "resize", e),
        measureScroll: () => {
            var t, e;
            return {
                x: document.documentElement.scrollLeft || (null == (t = document.body) ? void 0 : t.scrollLeft) || 0,
                y: document.documentElement.scrollTop || (null == (e = document.body) ? void 0 : e.scrollTop) || 0
            }
        },
        checkIsScrollRoot: () => !0
    }),
    er = {
        current: void 0
    },
    nr = ko({
        measureScroll: t => ({
            x: t.scrollLeft,
            y: t.scrollTop
        }),
        defaultParent: () => {
            if (!er.current) {
                const t = new tr({});
                t.mount(window), t.setOptions({
                    layoutScroll: !0
                }), er.current = t
            }
            return er.current
        },
        resetTransform: (t, e) => {
            t.style.transform = void 0 !== e ? e : "none"
        },
        checkIsScrollRoot: t => Boolean("fixed" === window.getComputedStyle(t).position)
    }),
    ir = e.createContext({
        transformPagePoint: t => t,
        isStatic: !1,
        reducedMotion: "never"
    });

function sr(t, e) {
    if ("function" == typeof t) return t(e);
    null != t && (t.current = e)
}

function or(...t) {
    return e.useCallback(function(...t) {
        return e => {
            let n = !1;
            const i = t.map(t => {
                const i = sr(t, e);
                return n || "function" != typeof i || (n = !0), i
            });
            if (n) return () => {
                for (let e = 0; e < i.length; e++) {
                    const n = i[e];
                    "function" == typeof n ? n() : sr(t[e], null)
                }
            }
        }
    }(...t), t)
}
class rr extends e.Component {
    getSnapshotBeforeUpdate(t) {
        const e = this.props.childRef.current;
        if (e && t.isPresent && !this.props.isPresent) {
            const t = e.offsetParent,
                n = fi(t) && t.offsetWidth || 0,
                i = fi(t) && t.offsetHeight || 0,
                s = this.props.sizeRef.current;
            s.height = e.offsetHeight || 0, s.width = e.offsetWidth || 0, s.top = e.offsetTop, s.left = e.offsetLeft, s.right = n - s.width - s.left, s.bottom = i - s.height - s.top
        }
        return null
    }
    componentDidUpdate() {}
    render() {
        return this.props.children
    }
}

function ar({
    children: n,
    isPresent: i,
    anchorX: s,
    anchorY: o,
    root: r
}) {
    var a;
    const l = e.useId(),
        u = e.useRef(null),
        h = e.useRef({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }),
        {
            nonce: c
        } = e.useContext(ir),
        d = (null == (a = n.props) ? void 0 : a.ref) ? ? (null == n ? void 0 : n.ref),
        p = or(u, d);
    return e.useInsertionEffect(() => {
        const {
            width: t,
            height: e,
            top: n,
            left: a,
            right: d,
            bottom: p
        } = h.current;
        if (i || !u.current || !t || !e) return;
        const m = "left" === s ? `left: ${a}` : `right: ${d}`,
            f = "bottom" === o ? `bottom: ${p}` : `top: ${n}`;
        u.current.dataset.motionPopId = l;
        const g = document.createElement("style");
        c && (g.nonce = c);
        const y = r ? ? document.head;
        return y.appendChild(g), g.sheet && g.sheet.insertRule(`\n          [data-motion-pop-id="${l}"] {\n            position: absolute !important;\n            width: ${t}px !important;\n            height: ${e}px !important;\n            ${m}px !important;\n            ${f}px !important;\n          }\n        `), () => {
            y.contains(g) && y.removeChild(g)
        }
    }, [i]), t.jsx(rr, {
        isPresent: i,
        childRef: u,
        sizeRef: h,
        children: e.cloneElement(n, {
            ref: p
        })
    })
}
const lr = ({
    children: n,
    initial: s,
    isPresent: o,
    onExitComplete: a,
    custom: l,
    presenceAffectsLayout: u,
    mode: h,
    anchorX: c,
    anchorY: d,
    root: p
}) => {
    const m = i(ur),
        f = e.useId();
    let g = !0,
        y = e.useMemo(() => (g = !1, {
            id: f,
            initial: s,
            isPresent: o,
            custom: l,
            onExitComplete: t => {
                m.set(t, !0);
                for (const e of m.values())
                    if (!e) return;
                a && a()
            },
            register: t => (m.set(t, !1), () => m.delete(t))
        }), [o, m, a]);
    return u && g && (y = { ...y
    }), e.useMemo(() => {
        m.forEach((t, e) => m.set(e, !1))
    }, [o]), e.useEffect(() => {
        !o && !m.size && a && a()
    }, [o]), "popLayout" === h && (n = t.jsx(ar, {
        isPresent: o,
        anchorX: c,
        anchorY: d,
        root: p,
        children: n
    })), t.jsx(r.Provider, {
        value: y,
        children: n
    })
};

function ur() {
    return new Map
}

function hr(t = !0) {
    const n = e.useContext(r);
    if (null === n) return [!0, null];
    const {
        isPresent: i,
        onExitComplete: s,
        register: o
    } = n, a = e.useId();
    e.useEffect(() => {
        if (t) return o(a)
    }, [t]);
    const l = e.useCallback(() => t && s && s(a), [a, s, t]);
    return !i && s ? [!1, l] : [!0]
}
const cr = t => t.key || "";

function dr(t) {
    const n = [];
    return e.Children.forEach(t, t => {
        e.isValidElement(t) && n.push(t)
    }), n
}
const pr = ({
        children: s,
        custom: r,
        initial: a = !0,
        onExitComplete: l,
        presenceAffectsLayout: u = !0,
        mode: h = "sync",
        propagate: c = !1,
        anchorX: d = "left",
        anchorY: p = "top",
        root: m
    }) => {
        const [f, g] = hr(c), y = e.useMemo(() => dr(s), [s]), v = c && !f ? [] : y.map(cr), x = e.useRef(!0), w = e.useRef(y), T = i(() => new Map), P = e.useRef(new Set), [S, b] = e.useState(y), [A, E] = e.useState(y);
        o(() => {
            x.current = !1, w.current = y;
            for (let t = 0; t < A.length; t++) {
                const e = cr(A[t]);
                v.includes(e) ? (T.delete(e), P.current.delete(e)) : !0 !== T.get(e) && T.set(e, !1)
            }
        }, [A, v.length, v.join("-")]);
        const M = [];
        if (y !== S) {
            let t = [...y];
            for (let e = 0; e < A.length; e++) {
                const n = A[e],
                    i = cr(n);
                v.includes(i) || (t.splice(e, 0, n), M.push(n))
            }
            return "wait" === h && M.length && (t = M), E(dr(t)), b(y), null
        }
        const {
            forceRender: C
        } = e.useContext(n);
        return t.jsx(t.Fragment, {
            children: A.map(e => {
                const n = cr(e),
                    i = !(c && !f) && (y === A || v.includes(n));
                return t.jsx(lr, {
                    isPresent: i,
                    initial: !(x.current && !a) && void 0,
                    custom: r,
                    presenceAffectsLayout: u,
                    mode: h,
                    root: m,
                    onExitComplete: i ? void 0 : () => {
                        if (P.current.has(n)) return;
                        if (P.current.add(n), !T.has(n)) return;
                        T.set(n, !0);
                        let t = !0;
                        T.forEach(e => {
                            e || (t = !1)
                        }), t && (null == C || C(), E(w.current), c && (null == g || g()), l && l())
                    },
                    anchorX: d,
                    anchorY: p,
                    children: e
                }, n)
            })
        })
    },
    mr = e.createContext({
        strict: !1
    }),
    fr = {
        animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
    };
let gr = !1;

function yr() {
    return function() {
        if (gr) return;
        const t = {};
        for (const e in fr) t[e] = {
            isEnabled: t => fr[e].some(e => !!t[e])
        };
        Hi(t), gr = !0
    }(), Ki
}
const vr = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);

function xr(t) {
    return t.startsWith("while") || t.startsWith("drag") && "draggable" !== t || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || vr.has(t)
}
let wr = t => !xr(t);
try {
    "function" == typeof(Tr = require("@emotion/is-prop-valid").default) && (wr = t => t.startsWith("on") ? !xr(t) : Tr(t))
} catch {}
var Tr;
const Pr = e.createContext({});

function Sr(t) {
    const {
        initial: n,
        animate: i
    } = function(t, e) {
        if (Yi(t)) {
            const {
                initial: e,
                animate: n
            } = t;
            return {
                initial: !1 === e || Wi(e) ? e : void 0,
                animate: Wi(n) ? n : void 0
            }
        }
        return !1 !== t.inherit ? e : {}
    }(t, e.useContext(Pr));
    return e.useMemo(() => ({
        initial: n,
        animate: i
    }), [br(n), br(i)])
}

function br(t) {
    return Array.isArray(t) ? t.join(" ") : t
}
const Ar = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});

function Er(t, e, n) {
    for (const i in e) Xn(e[i]) || Ts(i, n) || (t[i] = e[i])
}

function Mr(t, n) {
    const i = {};
    return Er(i, t.style || {}, t), Object.assign(i, function({
        transformTemplate: t
    }, n) {
        return e.useMemo(() => {
            const e = {
                style: {},
                transform: {},
                transformOrigin: {},
                vars: {}
            };
            return fs(e, n, t), Object.assign({}, e.vars, e.style)
        }, [n])
    }(t, n)), i
}

function Cr(t, e) {
    const n = {},
        i = Mr(t, e);
    return t.drag && !1 !== t.dragListener && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = !0 === t.drag ? "none" : "pan-" + ("x" === t.drag ? "y" : "x")), void 0 === t.tabIndex && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n
}
const Vr = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {},
    attrs: {}
});

function Dr(t, n, i, s) {
    const o = e.useMemo(() => {
        const e = {
            style: {},
            transform: {},
            transformOrigin: {},
            vars: {},
            attrs: {}
        };
        return Cs(e, n, Ds(s), t.transformTemplate, t.style), { ...e.attrs,
            style: { ...e.style
            }
        }
    }, [n]);
    if (t.style) {
        const e = {};
        Er(e, t.style, t), o.style = { ...e,
            ...o.style
        }
    }
    return o
}
const kr = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];

function Rr(t) {
    return "string" == typeof t && !t.includes("-") && !!(kr.indexOf(t) > -1 || /[A-Z]/u.test(t))
}

function Lr(t, n, i, {
    latestValues: s
}, o, r = !1, a) {
    const l = (a ? ? Rr(t) ? Dr : Cr)(n, s, o, t),
        u = function(t, e, n) {
            const i = {};
            for (const s in t) "values" === s && "object" == typeof t.values || (wr(s) || !0 === n && xr(s) || !e && !xr(s) || t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
            return i
        }(n, "string" == typeof t, r),
        h = t !== e.Fragment ? { ...u,
            ...l,
            ref: i
        } : {},
        {
            children: c
        } = n,
        d = e.useMemo(() => Xn(c) ? c.get() : c, [c]);
    return e.createElement(t, { ...h,
        children: d
    })
}

function jr(t, e, n, i) {
    const s = {},
        o = i(t, {});
    for (const d in o) s[d] = bo(o[d]);
    let {
        initial: r,
        animate: a
    } = t;
    const l = Yi(t),
        u = Xi(t);
    e && u && !l && !1 !== t.inherit && (void 0 === r && (r = e.initial), void 0 === a && (a = e.animate));
    let h = !!n && !1 === n.initial;
    h = h || !1 === r;
    const c = h ? a : r;
    if (c && "boolean" != typeof c && !Ui(c)) {
        const e = Array.isArray(c) ? c : [c];
        for (let n = 0; n < e.length; n++) {
            const i = Fn(t, e[n]);
            if (i) {
                const {
                    transitionEnd: t,
                    transition: e,
                    ...n
                } = i;
                for (const i in n) {
                    let t = n[i];
                    if (Array.isArray(t)) {
                        t = t[h ? t.length - 1 : 0]
                    }
                    null !== t && (s[i] = t)
                }
                for (const i in t) s[i] = t[i]
            }
        }
    }
    return s
}
const Br = t => (n, s) => {
        const o = e.useContext(Pr),
            a = e.useContext(r),
            l = () => function({
                scrapeMotionValuesFromProps: t,
                createRenderState: e
            }, n, i, s) {
                return {
                    latestValues: jr(n, i, s, t),
                    renderState: e()
                }
            }(t, n, o, a);
        return s ? l() : i(l)
    },
    Fr = Br({
        scrapeMotionValuesFromProps: Ps,
        createRenderState: Ar
    }),
    Ir = Br({
        scrapeMotionValuesFromProps: ks,
        createRenderState: Vr
    }),
    Or = Symbol.for("motionComponentSymbol");

function Ur(t, n, i) {
    const s = e.useRef(i);
    e.useInsertionEffect(() => {
        s.current = i
    });
    const o = e.useRef(null);
    return e.useCallback(e => {
        var i;
        e && (null == (i = t.onMount) || i.call(t, e)), n && (e ? n.mount(e) : n.unmount());
        const r = s.current;
        if ("function" == typeof r)
            if (e) {
                const t = r(e);
                "function" == typeof t && (o.current = t)
            } else o.current ? (o.current(), o.current = null) : r(e);
        else r && (r.current = e)
    }, [n])
}
const Wr = e.createContext({});

function $r(t) {
    return t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, "current")
}

function Nr(t, n, i, s, a, l) {
    var u, h;
    const {
        visualElement: c
    } = e.useContext(Pr), d = e.useContext(mr), p = e.useContext(r), m = e.useContext(ir).reducedMotion, f = e.useRef(null);
    s = s || d.renderer, !f.current && s && (f.current = s(t, {
        visualState: n,
        parent: c,
        props: i,
        presenceContext: p,
        blockInitialAnimation: !!p && !1 === p.initial,
        reducedMotionConfig: m,
        isSVG: l
    }));
    const g = f.current,
        y = e.useContext(Wr);
    !g || g.projection || !a || "html" !== g.type && "svg" !== g.type || function(t, e, n, i) {
        const {
            layoutId: s,
            layout: o,
            drag: r,
            dragConstraints: a,
            layoutScroll: l,
            layoutRoot: u,
            layoutCrossfade: h
        } = e;
        t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : Yr(t.parent)), t.projection.setOptions({
            layoutId: s,
            layout: o,
            alwaysMeasureLayout: Boolean(r) || a && $r(a),
            visualElement: t,
            animationType: "string" == typeof o ? o : "both",
            initialPromotionConfig: i,
            crossfade: h,
            layoutScroll: l,
            layoutRoot: u
        })
    }(f.current, i, a, y);
    const v = e.useRef(!1);
    e.useInsertionEffect(() => {
        g && v.current && g.update(i, p)
    });
    const x = i[Hn],
        w = e.useRef(Boolean(x) && !(null == (u = window.MotionHandoffIsComplete) ? void 0 : u.call(window, x)) && (null == (h = window.MotionHasOptimisedAnimation) ? void 0 : h.call(window, x)));
    return o(() => {
        g && (v.current = !0, window.MotionIsMounted = !0, g.updateFeatures(), g.scheduleRenderMicrotask(), w.current && g.animationState && g.animationState.animateChanges())
    }), e.useEffect(() => {
        g && (!w.current && g.animationState && g.animationState.animateChanges(), w.current && (queueMicrotask(() => {
            var t;
            null == (t = window.MotionHandoffMarkAsComplete) || t.call(window, x)
        }), w.current = !1), g.enteringChildren = void 0)
    }), g
}

function Yr(t) {
    if (t) return !1 !== t.options.allowProjection ? t.projection : Yr(t.parent)
}

function Xr(n, {
    forwardMotionProps: i = !1,
    type: o
} = {}, r, a) {
    r && function(t) {
        const e = yr();
        for (const n in t) e[n] = { ...e[n],
            ...t[n]
        };
        Hi(e)
    }(r);
    const l = o ? "svg" === o : Rr(n),
        u = l ? Ir : Fr;

    function h(o, r) {
        let h;
        const c = { ...e.useContext(ir),
                ...o,
                layoutId: zr(o)
            },
            {
                isStatic: d
            } = c,
            p = Sr(o),
            m = u(o, d);
        if (!d && s) {
            e.useContext(mr).strict;
            const t = function(t) {
                const e = yr(),
                    {
                        drag: n,
                        layout: i
                    } = e;
                if (!n && !i) return {};
                const s = { ...n,
                    ...i
                };
                return {
                    MeasureLayout: (null == n ? void 0 : n.isEnabled(t)) || (null == i ? void 0 : i.isEnabled(t)) ? s.MeasureLayout : void 0,
                    ProjectionNode: s.ProjectionNode
                }
            }(c);
            h = t.MeasureLayout, p.visualElement = Nr(n, m, c, a, t.ProjectionNode, l)
        }
        return t.jsxs(Pr.Provider, {
            value: p,
            children: [h && p.visualElement ? t.jsx(h, {
                visualElement: p.visualElement,
                ...c
            }) : null, Lr(n, o, Ur(m, p.visualElement, r), m, d, i, l)]
        })
    }
    h.displayName = `motion.${"string"==typeof n?n:`create(${n.displayName??n.name??""})`}`;
    const c = e.forwardRef(h);
    return c[Or] = n, c
}

function zr({
    layoutId: t
}) {
    const i = e.useContext(n).id;
    return i && void 0 !== t ? i + "-" + t : t
}

function Kr(t, e) {
    if ("undefined" == typeof Proxy) return Xr;
    const n = new Map,
        i = (n, i) => Xr(n, i, t, e);
    return new Proxy((t, e) => i(t, e), {
        get: (s, o) => "create" === o ? i : (n.has(o) || n.set(o, Xr(o, void 0, t, e)), n.get(o))
    })
}
const Hr = (t, n) => n.isSVG ? ? Rr(t) ? new Rs(n) : new Ss(n, {
    allowProjection: t !== e.Fragment
});
let Gr = 0;
const qr = {
    animation: {
        Feature: class extends Zi {
            constructor(t) {
                super(t), t.animationState || (t.animationState = Us(t))
            }
            updateAnimationControlsSubscription() {
                const {
                    animate: t
                } = this.node.getProps();
                Ui(t) && (this.unmountControls = t.subscribe(this.node))
            }
            mount() {
                this.updateAnimationControlsSubscription()
            }
            update() {
                const {
                    animate: t
                } = this.node.getProps(), {
                    animate: e
                } = this.node.prevProps || {};
                t !== e && this.updateAnimationControlsSubscription()
            }
            unmount() {
                var t;
                this.node.animationState.reset(), null == (t = this.unmountControls) || t.call(this)
            }
        }
    },
    exit: {
        Feature: class extends Zi {
            constructor() {
                super(...arguments), this.id = Gr++
            }
            update() {
                if (!this.node.presenceContext) return;
                const {
                    isPresent: t,
                    onExitComplete: e
                } = this.node.presenceContext, {
                    isPresent: n
                } = this.node.prevPresenceContext || {};
                if (!this.node.animationState || t === n) return;
                const i = this.node.animationState.setActive("exit", !t);
                e && !t && i.then(() => {
                    e(this.id)
                })
            }
            mount() {
                const {
                    register: t,
                    onExitComplete: e
                } = this.node.presenceContext || {};
                e && e(this.id), t && (this.unmount = t(this.id))
            }
            unmount() {}
        }
    }
};

function Zr(t) {
    return {
        point: {
            x: t.pageX,
            y: t.pageY
        }
    }
}

function _r(t, e, n, i) {
    return To(t, e, (t => e => Si(e) && t(e, Zr(e)))(n), i)
}
const Jr = ({
        current: t
    }) => t ? t.ownerDocument.defaultView : null,
    Qr = (t, e) => Math.abs(t - e);
const ta = new Set(["auto", "scroll"]);
class ea {
    constructor(t, e, {
        transformPagePoint: n,
        contextWindow: i = window,
        dragSnapToOrigin: s = !1,
        distanceThreshold: o = 3,
        element: r
    } = {}) {
        if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = new Map, this.removeScrollListeners = null, this.onElementScroll = t => {
                this.handleScroll(t.target)
            }, this.onWindowScroll = () => {
                this.handleScroll(window)
            }, this.updatePoint = () => {
                if (!this.lastMoveEvent || !this.lastMoveEventInfo) return;
                const t = sa(this.lastMoveEventInfo, this.history),
                    e = null !== this.startEvent,
                    n = function(t, e) {
                        const n = Qr(t.x, e.x),
                            i = Qr(t.y, e.y);
                        return Math.sqrt(n ** 2 + i ** 2)
                    }(t.offset, {
                        x: 0,
                        y: 0
                    }) >= this.distanceThreshold;
                if (!e && !n) return;
                const {
                    point: i
                } = t, {
                    timestamp: s
                } = q;
                this.history.push({ ...i,
                    timestamp: s
                });
                const {
                    onStart: o,
                    onMove: r
                } = this.handlers;
                e || (o && o(this.lastMoveEvent, t), this.startEvent = this.lastMoveEvent), r && r(this.lastMoveEvent, t)
            }, this.handlePointerMove = (t, e) => {
                this.lastMoveEvent = t, this.lastMoveEventInfo = na(e, this.transformPagePoint), H.update(this.updatePoint, !0)
            }, this.handlePointerUp = (t, e) => {
                this.end();
                const {
                    onEnd: n,
                    onSessionEnd: i,
                    resumeAnimation: s
                } = this.handlers;
                if (!this.dragSnapToOrigin && this.startEvent || s && s(), !this.lastMoveEvent || !this.lastMoveEventInfo) return;
                const o = sa("pointercancel" === t.type ? this.lastMoveEventInfo : na(e, this.transformPagePoint), this.history);
                this.startEvent && n && n(t, o), i && i(t, o)
            }, !Si(t)) return;
        this.dragSnapToOrigin = s, this.handlers = e, this.transformPagePoint = n, this.distanceThreshold = o, this.contextWindow = i || window;
        const a = na(Zr(t), this.transformPagePoint),
            {
                point: l
            } = a,
            {
                timestamp: u
            } = q;
        this.history = [{ ...l,
            timestamp: u
        }];
        const {
            onSessionStart: h
        } = e;
        h && h(t, sa(a, this.history)), this.removeListeners = x(_r(this.contextWindow, "pointermove", this.handlePointerMove), _r(this.contextWindow, "pointerup", this.handlePointerUp), _r(this.contextWindow, "pointercancel", this.handlePointerUp)), r && this.startScrollTracking(r)
    }
    startScrollTracking(t) {
        let e = t.parentElement;
        for (; e;) {
            const t = getComputedStyle(e);
            (ta.has(t.overflowX) || ta.has(t.overflowY)) && this.scrollPositions.set(e, {
                x: e.scrollLeft,
                y: e.scrollTop
            }), e = e.parentElement
        }
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        }), window.addEventListener("scroll", this.onElementScroll, {
            capture: !0,
            passive: !0
        }), window.addEventListener("scroll", this.onWindowScroll, {
            passive: !0
        }), this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: !0
            }), window.removeEventListener("scroll", this.onWindowScroll)
        }
    }
    handleScroll(t) {
        const e = this.scrollPositions.get(t);
        if (!e) return;
        const n = t === window,
            i = n ? {
                x: window.scrollX,
                y: window.scrollY
            } : {
                x: t.scrollLeft,
                y: t.scrollTop
            },
            s = i.x - e.x,
            o = i.y - e.y;
        0 === s && 0 === o || (n ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += s, this.lastMoveEventInfo.point.y += o) : this.history.length > 0 && (this.history[0].x -= s, this.history[0].y -= o), this.scrollPositions.set(t, i), H.update(this.updatePoint, !0))
    }
    updateHandlers(t) {
        this.handlers = t
    }
    end() {
        this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), G(this.updatePoint)
    }
}

function na(t, e) {
    return e ? {
        point: e(t.point)
    } : t
}

function ia(t, e) {
    return {
        x: t.x - e.x,
        y: t.y - e.y
    }
}

function sa({
    point: t
}, e) {
    return {
        point: t,
        delta: ia(t, ra(e)),
        offset: ia(t, oa(e)),
        velocity: aa(e, .1)
    }
}

function oa(t) {
    return t[0]
}

function ra(t) {
    return t[t.length - 1]
}

function aa(t, e) {
    if (t.length < 2) return {
        x: 0,
        y: 0
    };
    let n = t.length - 1,
        i = null;
    const s = ra(t);
    for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > P(e)));) n--;
    if (!i) return {
        x: 0,
        y: 0
    };
    const o = S(s.timestamp - i.timestamp);
    if (0 === o) return {
        x: 0,
        y: 0
    };
    const r = {
        x: (s.x - i.x) / o,
        y: (s.y - i.y) / o
    };
    return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r
}

function la(t, e, n) {
    return {
        min: void 0 !== e ? t.min + e : void 0,
        max: void 0 !== n ? t.max + n - (t.max - t.min) : void 0
    }
}

function ua(t, e) {
    let n = e.min - t.min,
        i = e.max - t.max;
    return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), {
        min: n,
        max: i
    }
}
const ha = .35;

function ca(t, e, n) {
    return {
        min: da(t, e),
        max: da(t, n)
    }
}

function da(t, e) {
    return "number" == typeof t ? t : t[e] || 0
}
const pa = new WeakMap;
class ma {
    constructor(t) {
        this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
            x: 0,
            y: 0
        }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = {
            x: {
                min: 0,
                max: 0
            },
            y: {
                min: 0,
                max: 0
            }
        }, this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t
    }
    start(t, {
        snapToCursor: e = !1,
        distanceThreshold: n
    } = {}) {
        const {
            presenceContext: i
        } = this.visualElement;
        if (i && !1 === i.isPresent) return;
        const {
            dragSnapToOrigin: s
        } = this.getProps();
        this.panSession = new ea(t, {
            onSessionStart: t => {
                e ? (this.stopAnimation(), this.snapToCursor(Zr(t).point)) : this.pauseAnimation()
            },
            onStart: (t, e) => {
                this.stopAnimation();
                const {
                    drag: n,
                    dragPropagation: i,
                    onDragStart: s
                } = this.getProps();
                if (n && !i && (this.openDragLock && this.openDragLock(), this.openDragLock = "x" === (o = n) || "y" === o ? vi[o] ? null : (vi[o] = !0, () => {
                        vi[o] = !1
                    }) : vi.x || vi.y ? null : (vi.x = vi.y = !0, () => {
                        vi.x = vi.y = !1
                    }), !this.openDragLock)) return;
                var o;
                this.latestPointerEvent = t, this.latestPanInfo = e, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), ho(t => {
                    let e = this.getAxisMotionValue(t).get() || 0;
                    if (xt.test(e)) {
                        const {
                            projection: n
                        } = this.visualElement;
                        if (n && n.layout) {
                            const i = n.layout.layoutBox[t];
                            if (i) {
                                e = Ks(i) * (parseFloat(e) / 100)
                            }
                        }
                    }
                    this.originPoint[t] = e
                }), s && H.postRender(() => s(t, e)), zn(this.visualElement, "transform");
                const {
                    animationState: r
                } = this.visualElement;
                r && r.setActive("whileDrag", !0)
            },
            onMove: (t, e) => {
                this.latestPointerEvent = t, this.latestPanInfo = e;
                const {
                    dragPropagation: n,
                    dragDirectionLock: i,
                    onDirectionLock: s,
                    onDrag: o
                } = this.getProps();
                if (!n && !this.openDragLock) return;
                const {
                    offset: r
                } = e;
                if (i && null === this.currentDirection) return this.currentDirection = function(t, e = 10) {
                    let n = null;
                    Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x");
                    return n
                }(r), void(null !== this.currentDirection && s && s(this.currentDirection));
                this.updateAxis("x", e.point, r), this.updateAxis("y", e.point, r), this.visualElement.render(), o && o(t, e)
            },
            onSessionEnd: (t, e) => {
                this.latestPointerEvent = t, this.latestPanInfo = e, this.stop(t, e), this.latestPointerEvent = null, this.latestPanInfo = null
            },
            resumeAnimation: () => ho(t => {
                var e;
                return "paused" === this.getAnimationState(t) && (null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.play())
            })
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: s,
            distanceThreshold: n,
            contextWindow: Jr(this.visualElement),
            element: this.visualElement.current
        })
    }
    stop(t, e) {
        const n = t || this.latestPointerEvent,
            i = e || this.latestPanInfo,
            s = this.isDragging;
        if (this.cancel(), !s || !i || !n) return;
        const {
            velocity: o
        } = i;
        this.startAnimation(o);
        const {
            onDragEnd: r
        } = this.getProps();
        r && H.postRender(() => r(n, i))
    }
    cancel() {
        this.isDragging = !1;
        const {
            projection: t,
            animationState: e
        } = this.visualElement;
        t && (t.isAnimationBlocked = !1), this.endPanSession();
        const {
            dragPropagation: n
        } = this.getProps();
        !n && this.openDragLock && (this.openDragLock(), this.openDragLock = null), e && e.setActive("whileDrag", !1)
    }
    endPanSession() {
        this.panSession && this.panSession.end(), this.panSession = void 0
    }
    updateAxis(t, e, n) {
        const {
            drag: i
        } = this.getProps();
        if (!n || !fa(t, i, this.currentDirection)) return;
        const s = this.getAxisMotionValue(t);
        let o = this.originPoint[t] + n[t];
        this.constraints && this.constraints[t] && (o = function(t, {
            min: e,
            max: n
        }, i) {
            return void 0 !== e && t < e ? t = i ? It(e, t, i.min) : Math.max(t, e) : void 0 !== n && t > n && (t = i ? It(n, t, i.max) : Math.min(t, n)), t
        }(o, this.constraints[t], this.elastic[t])), s.set(o)
    }
    resolveConstraints() {
        var t;
        const {
            dragConstraints: e,
            dragElastic: n
        } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : null == (t = this.visualElement.projection) ? void 0 : t.layout, s = this.constraints;
        e && $r(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : this.constraints = !(!e || !i) && function(t, {
            top: e,
            left: n,
            bottom: i,
            right: s
        }) {
            return {
                x: la(t.x, n, s),
                y: la(t.y, e, i)
            }
        }(i.layoutBox, e), this.elastic = function(t = ha) {
            return !1 === t ? t = 0 : !0 === t && (t = ha), {
                x: ca(t, "left", "right"),
                y: ca(t, "top", "bottom")
            }
        }(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && ho(t => {
            !1 !== this.constraints && this.getAxisMotionValue(t) && (this.constraints[t] = function(t, e) {
                const n = {};
                return void 0 !== e.min && (n.min = e.min - t.min), void 0 !== e.max && (n.max = e.max - t.min), n
            }(i.layoutBox[t], this.constraints[t]))
        })
    }
    resolveRefConstraints() {
        const {
            dragConstraints: t,
            onMeasureDragConstraints: e
        } = this.getProps();
        if (!t || !$r(t)) return !1;
        const n = t.current;
        c(null !== n, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        const {
            projection: i
        } = this.visualElement;
        if (!i || !i.layout) return !1;
        const s = function(t, e, n) {
            const i = ds(t, n),
                {
                    scroll: s
                } = e;
            return s && (us(i.x, s.offset.x), us(i.y, s.offset.y)), i
        }(n, i.root, this.visualElement.getTransformPagePoint());
        let o = function(t, e) {
            return {
                x: ua(t.x, e.x),
                y: ua(t.y, e.y)
            }
        }(i.layout.layoutBox, s);
        if (e) {
            const t = e(function({
                x: t,
                y: e
            }) {
                return {
                    top: e.min,
                    right: t.max,
                    bottom: e.max,
                    left: t.min
                }
            }(o));
            this.hasMutatedConstraints = !!t, t && (o = _i(t))
        }
        return o
    }
    startAnimation(t) {
        const {
            drag: e,
            dragMomentum: n,
            dragElastic: i,
            dragTransition: s,
            dragSnapToOrigin: o,
            onDragTransitionEnd: r
        } = this.getProps(), a = this.constraints || {}, l = ho(r => {
            if (!fa(r, e, this.currentDirection)) return;
            let l = a && a[r] || {};
            o && (l = {
                min: 0,
                max: 0
            });
            const u = i ? 200 : 1e6,
                h = i ? 40 : 1e7,
                c = {
                    type: "inertia",
                    velocity: n ? t[r] : 0,
                    bounceStiffness: u,
                    bounceDamping: h,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...s,
                    ...l
                };
            return this.startAxisValueAnimation(r, c)
        });
        return Promise.all(l).then(r)
    }
    startAxisValueAnimation(t, e) {
        const n = this.getAxisMotionValue(t);
        return zn(this.visualElement, t), n.start(jn(t, n, 0, e, this.visualElement, !1))
    }
    stopAnimation() {
        ho(t => this.getAxisMotionValue(t).stop())
    }
    pauseAnimation() {
        ho(t => {
            var e;
            return null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.pause()
        })
    }
    getAnimationState(t) {
        var e;
        return null == (e = this.getAxisMotionValue(t).animation) ? void 0 : e.state
    }
    getAxisMotionValue(t) {
        const e = `_drag${t.toUpperCase()}`,
            n = this.visualElement.getProps(),
            i = n[e];
        return i || this.visualElement.getValue(t, (n.initial ? n.initial[t] : void 0) || 0)
    }
    snapToCursor(t) {
        ho(e => {
            const {
                drag: n
            } = this.getProps();
            if (!fa(e, n, this.currentDirection)) return;
            const {
                projection: i
            } = this.visualElement, s = this.getAxisMotionValue(e);
            if (i && i.layout) {
                const {
                    min: n,
                    max: o
                } = i.layout.layoutBox[e], r = s.get() || 0;
                s.set(t[e] - It(n, o, .5) + r)
            }
        })
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const {
            drag: t,
            dragConstraints: e
        } = this.getProps(), {
            projection: n
        } = this.visualElement;
        if (!$r(e) || !n || !this.constraints) return;
        this.stopAnimation();
        const i = {
            x: 0,
            y: 0
        };
        ho(t => {
            const e = this.getAxisMotionValue(t);
            if (e && !1 !== this.constraints) {
                const n = e.get();
                i[t] = function(t, e) {
                    let n = .5;
                    const i = Ks(t),
                        s = Ks(e);
                    return s > i ? n = w(e.min, e.max - i, t.min) : i > s && (n = w(t.min, t.max - s, e.min)), u(0, 1, n)
                }({
                    min: n,
                    max: n
                }, this.constraints[t])
            }
        });
        const {
            transformTemplate: s
        } = this.visualElement.getProps();
        this.visualElement.current.style.transform = s ? s({}, "") : "none", n.root && n.root.updateScroll(), n.updateLayout(), this.resolveConstraints(), ho(e => {
            if (!fa(e, t, null)) return;
            const n = this.getAxisMotionValue(e),
                {
                    min: s,
                    max: o
                } = this.constraints[e];
            n.set(It(s, o, i[e]))
        })
    }
    addListeners() {
        if (!this.visualElement.current) return;
        pa.set(this.visualElement, this);
        const t = this.visualElement.current,
            e = _r(t, "pointerdown", e => {
                const {
                    drag: n,
                    dragListener: i = !0
                } = this.getProps(), s = e.target, o = s !== t && Ai(s);
                n && i && !o && this.start(e)
            }),
            n = () => {
                const {
                    dragConstraints: t
                } = this.getProps();
                $r(t) && t.current && (this.constraints = this.resolveRefConstraints())
            },
            {
                projection: i
            } = this.visualElement,
            s = i.addEventListener("measure", n);
        i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), H.read(n);
        const o = To(window, "resize", () => this.scalePositionWithinConstraints()),
            r = i.addEventListener("didUpdate", ({
                delta: t,
                hasLayoutChanged: e
            }) => {
                this.isDragging && e && (ho(e => {
                    const n = this.getAxisMotionValue(e);
                    n && (this.originPoint[e] += t[e].translate, n.set(n.get() + t[e].translate))
                }), this.visualElement.render())
            });
        return () => {
            o(), e(), s(), r && r()
        }
    }
    getProps() {
        const t = this.visualElement.getProps(),
            {
                drag: e = !1,
                dragDirectionLock: n = !1,
                dragPropagation: i = !1,
                dragConstraints: s = !1,
                dragElastic: o = ha,
                dragMomentum: r = !0
            } = t;
        return { ...t,
            drag: e,
            dragDirectionLock: n,
            dragPropagation: i,
            dragConstraints: s,
            dragElastic: o,
            dragMomentum: r
        }
    }
}

function fa(t, e, n) {
    return !(!0 !== e && e !== t || null !== n && n !== t)
}
const ga = t => (e, n) => {
    t && H.postRender(() => t(e, n))
};
let ya = !1;
class va extends e.Component {
    componentDidMount() {
        const {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: n,
            layoutId: i
        } = this.props, {
            projection: s
        } = t;
        s && (e.group && e.group.add(s), n && n.register && i && n.register(s), ya && s.root.didUpdate(), s.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }), s.setOptions({ ...s.options,
            onExitComplete: () => this.safeToRemove()
        })), Eo.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(t) {
        const {
            layoutDependency: e,
            visualElement: n,
            drag: i,
            isPresent: s
        } = this.props, {
            projection: o
        } = n;
        return o ? (o.isPresent = s, ya = !0, i || t.layoutDependency !== e || void 0 === e || t.isPresent !== s ? o.willUpdate() : this.safeToRemove(), t.isPresent !== s && (s ? o.promote() : o.relegate() || H.postRender(() => {
            const t = o.getStack();
            t && t.members.length || this.safeToRemove()
        })), null) : null
    }
    componentDidUpdate() {
        const {
            projection: t
        } = this.props.visualElement;
        t && (t.root.didUpdate(), gi.postRender(() => {
            !t.currentAnimation && t.isLead() && this.safeToRemove()
        }))
    }
    componentWillUnmount() {
        const {
            visualElement: t,
            layoutGroup: e,
            switchLayoutGroup: n
        } = this.props, {
            projection: i
        } = t;
        ya = !0, i && (i.scheduleCheckAfterUnmount(), e && e.group && e.group.remove(i), n && n.deregister && n.deregister(i))
    }
    safeToRemove() {
        const {
            safeToRemove: t
        } = this.props;
        t && t()
    }
    render() {
        return null
    }
}

function xa(i) {
    const [s, o] = hr(), r = e.useContext(n);
    return t.jsx(va, { ...i,
        layoutGroup: r,
        switchLayoutGroup: e.useContext(Wr),
        isPresent: s,
        safeToRemove: o
    })
}
const wa = {
    pan: {
        Feature: class extends Zi {
            constructor() {
                super(...arguments), this.removePointerDownListener = y
            }
            onPointerDown(t) {
                this.session = new ea(t, this.createPanHandlers(), {
                    transformPagePoint: this.node.getTransformPagePoint(),
                    contextWindow: Jr(this.node)
                })
            }
            createPanHandlers() {
                const {
                    onPanSessionStart: t,
                    onPanStart: e,
                    onPan: n,
                    onPanEnd: i
                } = this.node.getProps();
                return {
                    onSessionStart: ga(t),
                    onStart: ga(e),
                    onMove: n,
                    onEnd: (t, e) => {
                        delete this.session, i && H.postRender(() => i(t, e))
                    }
                }
            }
            mount() {
                this.removePointerDownListener = _r(this.node.current, "pointerdown", t => this.onPointerDown(t))
            }
            update() {
                this.session && this.session.updateHandlers(this.createPanHandlers())
            }
            unmount() {
                this.removePointerDownListener(), this.session && this.session.end()
            }
        }
    },
    drag: {
        Feature: class extends Zi {
            constructor(t) {
                super(t), this.removeGroupControls = y, this.removeListeners = y, this.controls = new ma(t)
            }
            mount() {
                const {
                    dragControls: t
                } = this.node.getProps();
                t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || y
            }
            update() {
                const {
                    dragControls: t
                } = this.node.getProps(), {
                    dragControls: e
                } = this.node.prevProps || {};
                t !== e && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)))
            }
            unmount() {
                this.removeGroupControls(), this.removeListeners(), this.controls.endPanSession()
            }
        },
        ProjectionNode: nr,
        MeasureLayout: xa
    }
};

function Ta(t, e, n) {
    const {
        props: i
    } = t;
    t.animationState && i.whileHover && t.animationState.setActive("whileHover", "Start" === n);
    const s = i["onHover" + n];
    s && H.postRender(() => s(e, Zr(e)))
}

function Pa(t, e, n) {
    const {
        props: i
    } = t;
    if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
    t.animationState && i.whileTap && t.animationState.setActive("whileTap", "Start" === n);
    const s = i["onTap" + ("End" === n ? "" : n)];
    s && H.postRender(() => s(e, Zr(e)))
}
const Sa = new WeakMap,
    ba = new WeakMap,
    Aa = t => {
        const e = Sa.get(t.target);
        e && e(t)
    },
    Ea = t => {
        t.forEach(Aa)
    };

function Ma(t, e, n) {
    const i = function({
        root: t,
        ...e
    }) {
        const n = t || document;
        ba.has(n) || ba.set(n, {});
        const i = ba.get(n),
            s = JSON.stringify(e);
        return i[s] || (i[s] = new IntersectionObserver(Ea, {
            root: t,
            ...e
        })), i[s]
    }(e);
    return Sa.set(t, n), i.observe(t), () => {
        Sa.delete(t), i.unobserve(t)
    }
}
const Ca = {
    some: 0,
    all: 1
};
const Va = Kr({ ...qr,
    ...{
        inView: {
            Feature: class extends Zi {
                constructor() {
                    super(...arguments), this.hasEnteredView = !1, this.isInView = !1
                }
                startObserver() {
                    this.unmount();
                    const {
                        viewport: t = {}
                    } = this.node.getProps(), {
                        root: e,
                        margin: n,
                        amount: i = "some",
                        once: s
                    } = t, o = {
                        root: e ? e.current : void 0,
                        rootMargin: n,
                        threshold: "number" == typeof i ? i : Ca[i]
                    };
                    return Ma(this.node.current, o, t => {
                        const {
                            isIntersecting: e
                        } = t;
                        if (this.isInView === e) return;
                        if (this.isInView = e, s && !e && this.hasEnteredView) return;
                        e && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", e);
                        const {
                            onViewportEnter: n,
                            onViewportLeave: i
                        } = this.node.getProps(), o = e ? n : i;
                        o && o(t)
                    })
                }
                mount() {
                    this.startObserver()
                }
                update() {
                    if ("undefined" == typeof IntersectionObserver) return;
                    const {
                        props: t,
                        prevProps: e
                    } = this.node;
                    ["amount", "margin", "root"].some(function({
                        viewport: t = {}
                    }, {
                        viewport: e = {}
                    } = {}) {
                        return n => t[n] !== e[n]
                    }(t, e)) && this.startObserver()
                }
                unmount() {}
            }
        },
        tap: {
            Feature: class extends Zi {
                mount() {
                    const {
                        current: t
                    } = this.node;
                    t && (this.unmount = Di(t, (t, e) => (Pa(this.node, e, "Start"), (t, {
                        success: e
                    }) => Pa(this.node, t, e ? "End" : "Cancel")), {
                        useGlobalTarget: this.node.props.globalTapTarget
                    }))
                }
                unmount() {}
            }
        },
        focus: {
            Feature: class extends Zi {
                constructor() {
                    super(...arguments), this.isActive = !1
                }
                onFocus() {
                    let t = !1;
                    try {
                        t = this.node.current.matches(":focus-visible")
                    } catch (e) {
                        t = !0
                    }
                    t && this.node.animationState && (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
                }
                onBlur() {
                    this.isActive && this.node.animationState && (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
                }
                mount() {
                    this.unmount = x(To(this.node.current, "focus", () => this.onFocus()), To(this.node.current, "blur", () => this.onBlur()))
                }
                unmount() {}
            }
        },
        hover: {
            Feature: class extends Zi {
                mount() {
                    const {
                        current: t
                    } = this.node;
                    t && (this.unmount = function(t, e, n = {}) {
                        const [i, s, o] = wi(t, n), r = t => {
                            if (!Ti(t)) return;
                            const {
                                target: n
                            } = t, i = e(n, t);
                            if ("function" != typeof i || !n) return;
                            const o = t => {
                                Ti(t) && (i(t), n.removeEventListener("pointerleave", o))
                            };
                            n.addEventListener("pointerleave", o, s)
                        };
                        return i.forEach(t => {
                            t.addEventListener("pointerenter", r, s)
                        }), o
                    }(t, (t, e) => (Ta(this.node, e, "Start"), t => Ta(this.node, t, "End"))))
                }
                unmount() {}
            }
        }
    },
    ...wa,
    ...{
        layout: {
            ProjectionNode: nr,
            MeasureLayout: xa
        }
    }
}, Hr);

function Da(t) {
    const n = i(() => Wn(t)),
        {
            isStatic: s
        } = e.useContext(ir);
    if (s) {
        const [, i] = e.useState(t);
        e.useEffect(() => n.on("change", i), [])
    }
    return n
}

function ka(t) {
    return "object" == typeof t && !Array.isArray(t)
}

function Ra(t, e, n, i) {
    return null == t ? [] : "string" == typeof t && ka(e) ? pi(t, 0, i) : t instanceof NodeList ? Array.from(t) : Array.isArray(t) ? t.filter(t => null != t) : [t]
}

function La(t, e, n) {
    return t * (e + 1)
}

function ja(t, e, n, i) {
    return "number" == typeof e ? e : e.startsWith("-") || e.startsWith("+") ? Math.max(0, t + parseFloat(e)) : "<" === e ? n : e.startsWith("<") ? Math.max(0, n + parseFloat(e.slice(1))) : i.get(e) ? ? t
}

function Ba(t, e, n, i, s, o) {
    ! function(t, e, n) {
        for (let i = 0; i < t.length; i++) {
            const s = t[i];
            s.at > e && s.at < n && (l(t, s), i--)
        }
    }(t, s, o);
    for (let r = 0; r < e.length; r++) t.push({
        value: e[r],
        at: It(s, o, i[r]),
        easing: W(n, r)
    })
}

function Fa(t, e) {
    for (let n = 0; n < t.length; n++) t[n] = t[n] / (e + 1)
}

function Ia(t, e) {
    return t.at === e.at ? null === t.value ? 1 : null === e.value ? -1 : 0 : t.at - e.at
}

function Oa(t, e) {
    return !e.has(t) && e.set(t, {}), e.get(t)
}

function Ua(t, e) {
    return e[t] || (e[t] = []), e[t]
}

function Wa(t) {
    return Array.isArray(t) ? t : [t]
}

function $a(t, e) {
    return t && t[e] ? { ...t,
        ...t[e]
    } : { ...t
    }
}
const Na = t => "number" == typeof t,
    Ya = t => t.every(Na);

function Xa(t) {
    const e = {
            presenceContext: null,
            props: {},
            visualState: {
                renderState: {
                    transform: {},
                    transformOrigin: {},
                    style: {},
                    vars: {},
                    attrs: {}
                },
                latestValues: {}
            }
        },
        n = ki(t) && !Ri(t) ? new Rs(e) : new Ss(e);
    n.mount(t), Oi.set(t, n)
}

function za(t) {
    const e = new bs({
        presenceContext: null,
        props: {},
        visualState: {
            renderState: {
                output: {}
            },
            latestValues: {}
        }
    });
    e.mount(t), Oi.set(t, e)
}

function Ka(t, e, n, i) {
    const s = [];
    if (function(t, e) {
            return Xn(t) || "number" == typeof t || "string" == typeof t && !ka(e)
        }(t, e)) s.push(wo(t, ka(e) && e.default || e, n && n.default || n));
    else {
        if (null == t) return s;
        const i = Ra(t, e),
            o = i.length;
        c(Boolean(o), "No valid elements provided.", "no-valid-elements");
        for (let t = 0; t < o; t++) {
            const r = i[t],
                a = r instanceof Element ? Xa : za;
            Oi.has(r) || a(r);
            const l = Oi.get(r),
                u = { ...n
                };
            "delay" in u && "function" == typeof u.delay && (u.delay = u.delay(t, o)), s.push(...Zn(l, { ...e,
                transition: u
            }, {}))
        }
    }
    return s
}

function Ha(t, e, n) {
    const i = [],
        s = function(t, {
            defaultTransition: e = {},
            ...n
        } = {}, i, s) {
            const o = e.duration || .3,
                r = new Map,
                a = new Map,
                l = {},
                u = new Map;
            let h = 0,
                d = 0,
                p = 0;
            for (let m = 0; m < t.length; m++) {
                const n = t[m];
                if ("string" == typeof n) {
                    u.set(n, d);
                    continue
                }
                if (!Array.isArray(n)) {
                    u.set(n.name, ja(d, n.at, h, u));
                    continue
                }
                let [i, r, f = {}] = n;
                void 0 !== f.at && (d = ja(d, f.at, h, u));
                let g = 0;
                const y = (t, n, i, r = 0, a = 0) => {
                    const l = Wa(t),
                        {
                            delay: u = 0,
                            times: h = Ae(l),
                            type: m = e.type || "keyframes",
                            repeat: f,
                            repeatType: y,
                            repeatDelay: v = 0,
                            ...x
                        } = n;
                    let {
                        ease: w = e.ease || "easeOut",
                        duration: T
                    } = n;
                    const S = "function" == typeof u ? u(r, a) : u,
                        b = l.length,
                        A = dn(m) ? m : null == s ? void 0 : s[m || "keyframes"];
                    if (b <= 2 && A) {
                        let t = 100;
                        if (2 === b && Ya(l)) {
                            const e = l[1] - l[0];
                            t = Math.abs(e)
                        }
                        const n = { ...e,
                            ...x
                        };
                        void 0 !== T && (n.duration = P(T));
                        const i = Qt(n, t, A);
                        w = i.ease, T = i.duration
                    }
                    T ? ? (T = o);
                    const E = d + S;
                    1 === h.length && 0 === h[0] && (h[1] = 1);
                    const M = h.length - l.length;
                    if (M > 0 && be(h, M), 1 === l.length && l.unshift(null), f) {
                        c(f < 20, "Repeat count too high, must be less than 20", "repeat-count-high"), T = La(T, f);
                        const t = [...l],
                            e = [...h];
                        w = Array.isArray(w) ? [...w] : [w];
                        const n = [...w];
                        for (let i = 0; i < f; i++) {
                            l.push(...t);
                            for (let s = 0; s < t.length; s++) h.push(e[s] + (i + 1)), w.push(0 === s ? "linear" : W(n, s - 1))
                        }
                        Fa(h, f)
                    }
                    const C = E + T;
                    Ba(i, l, w, h, E, C), g = Math.max(S + T, g), p = Math.max(C, p)
                };
                if (Xn(i)) y(r, f, Ua("default", Oa(i, a)));
                else {
                    const t = Ra(i, r, 0, l),
                        e = t.length;
                    for (let n = 0; n < e; n++) {
                        const i = Oa(t[n], a);
                        for (const t in r) y(r[t], $a(f, t), Ua(t, i), n, e)
                    }
                }
                h = d, d += g
            }
            return a.forEach((t, i) => {
                for (const s in t) {
                    const o = t[s];
                    o.sort(Ia);
                    const a = [],
                        l = [],
                        u = [];
                    for (let t = 0; t < o.length; t++) {
                        const {
                            at: e,
                            value: n,
                            easing: i
                        } = o[t];
                        a.push(n), l.push(w(0, p, e)), u.push(i || "easeOut")
                    }
                    0 !== l[0] && (l.unshift(0), a.unshift(a[0]), u.unshift("easeInOut")), 1 !== l[l.length - 1] && (l.push(1), a.push(null)), r.has(i) || r.set(i, {
                        keyframes: {},
                        transition: {}
                    });
                    const h = r.get(i);
                    h.keyframes[s] = a;
                    const {
                        type: c,
                        ...d
                    } = e;
                    h.transition[s] = { ...d,
                        duration: p,
                        ease: u,
                        times: l,
                        ...n
                    }
                }
            }), r
        }(t, e, 0, {
            spring: Te
        });
    return s.forEach(({
        keyframes: t,
        transition: e
    }, n) => {
        i.push(...Ka(n, t, e))
    }), i
}
const Ga = function(t, e, n) {
    let i, s = [];
    if (o = t, Array.isArray(o) && o.some(Array.isArray)) s = Ha(t, e);
    else {
        const {
            onComplete: o,
            ...r
        } = n || {};
        "function" == typeof o && (i = o), s = Ka(t, e, r)
    }
    var o;
    const r = new bn(s);
    return i && r.finished.then(i), r
};
export {
    pr as A, Ga as a, Va as m, Da as u
};