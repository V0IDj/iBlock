import {
    t,
    c as n,
    e,
    g as a,
    m as r,
    b as o,
    d as s
} from "./ar-B5cCq_yy.js";

function u(n, e) {
    const a = t(n),
        r = t(e),
        o = a.getTime() - r.getTime();
    return o < 0 ? -1 : o > 0 ? 1 : o
}

function i(n) {
    const e = t(n);
    return + function(n) {
        const e = t(n);
        return e.setHours(23, 59, 59, 999), e
    }(e) === + function(n) {
        const e = t(n),
            a = e.getMonth();
        return e.setFullYear(e.getFullYear(), a + 1, 0), e.setHours(23, 59, 59, 999), e
    }(e)
}

function c(n, e) {
    const a = t(n),
        r = t(e),
        o = u(a, r),
        s = Math.abs(function(n, e) {
            const a = t(n),
                r = t(e);
            return 12 * (a.getFullYear() - r.getFullYear()) + (a.getMonth() - r.getMonth())
        }(a, r));
    let c;
    if (s < 1) c = 0;
    else {
        1 === a.getMonth() && a.getDate() > 27 && a.setDate(30), a.setMonth(a.getMonth() - o * s);
        let e = u(a, r) === -o;
        i(t(n)) && 1 === s && 1 === u(n, r) && (e = !1), c = o * (s - Number(e))
    }
    return 0 === c ? 0 : c
}

function f(n, e, a) {
    const r = function(n, e) {
        return +t(n) - +t(e)
    }(n, e) / 1e3;
    return (o = null == a ? void 0 : a.roundingMethod, t => {
        const n = (o ? Math[o] : Math.trunc)(t);
        return 0 === n ? 0 : n
    })(r);
    var o
}

function l(i, l) {
    return function(n, i, l) {
        const m = s(),
            h = (null == l ? void 0 : l.locale) ? ? m.locale ? ? e,
            M = u(n, i);
        if (isNaN(M)) throw new RangeError("Invalid time value");
        const D = Object.assign({}, l, {
            addSuffix: null == l ? void 0 : l.addSuffix,
            comparison: M
        });
        let d, g;
        M > 0 ? (d = t(i), g = t(n)) : (d = t(n), g = t(i));
        const X = f(g, d),
            x = (a(g) - a(d)) / 1e3,
            b = Math.round((X - x) / 60);
        let v;
        if (b < 2) return (null == l ? void 0 : l.includeSeconds) ? X < 5 ? h.formatDistance("lessThanXSeconds", 5, D) : X < 10 ? h.formatDistance("lessThanXSeconds", 10, D) : X < 20 ? h.formatDistance("lessThanXSeconds", 20, D) : X < 40 ? h.formatDistance("halfAMinute", 0, D) : X < 60 ? h.formatDistance("lessThanXMinutes", 1, D) : h.formatDistance("xMinutes", 1, D) : 0 === b ? h.formatDistance("lessThanXMinutes", 1, D) : h.formatDistance("xMinutes", b, D);
        if (b < 45) return h.formatDistance("xMinutes", b, D);
        if (b < 90) return h.formatDistance("aboutXHours", 1, D);
        if (b < r) {
            const t = Math.round(b / 60);
            return h.formatDistance("aboutXHours", t, D)
        }
        if (b < 2520) return h.formatDistance("xDays", 1, D);
        if (b < o) {
            const t = Math.round(b / r);
            return h.formatDistance("xDays", t, D)
        }
        if (b < 2 * o) return v = Math.round(b / o), h.formatDistance("aboutXMonths", v, D);
        if (v = c(g, d), v < 12) {
            const t = Math.round(b / o);
            return h.formatDistance("xMonths", t, D)
        } {
            const t = v % 12,
                n = Math.trunc(v / 12);
            return t < 3 ? h.formatDistance("aboutXYears", n, D) : t < 9 ? h.formatDistance("overXYears", n, D) : h.formatDistance("almostXYears", n + 1, D)
        }
    }(i, function(t) {
        return n(t, Date.now())
    }(i), l)
}
export {
    l as f
};