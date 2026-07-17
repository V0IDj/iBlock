import {
    b as e,
    u as r,
    s as t,
    j as o,
    P as n,
    e as l,
    g as i,
    f as a,
    i as s
} from "./vendor-ui-H0MweODj.js";
import {
    r as c
} from "./vendor-react-jZB-dUQe.js";
import {
    v as d,
    b as u
} from "./index-DwXWGlRe.js";
var p = "ScrollArea",
    [f, h] = e(p),
    [v, w] = f(p),
    b = c.forwardRef((e, l) => {
        const {
            __scopeScrollArea: i,
            type: a = "hover",
            dir: s,
            scrollHideDelay: d = 600,
            ...u
        } = e, [p, f] = c.useState(null), [h, w] = c.useState(null), [b, m] = c.useState(null), [g, S] = c.useState(null), [x, y] = c.useState(null), [E, T] = c.useState(0), [C, R] = c.useState(0), [P, j] = c.useState(!1), [_, L] = c.useState(!1), D = r(l, e => f(e)), A = t(s);
        return o.jsx(v, {
            scope: i,
            type: a,
            dir: A,
            scrollHideDelay: d,
            scrollArea: p,
            viewport: h,
            onViewportChange: w,
            content: b,
            onContentChange: m,
            scrollbarX: g,
            onScrollbarXChange: S,
            scrollbarXEnabled: P,
            onScrollbarXEnabledChange: j,
            scrollbarY: x,
            onScrollbarYChange: y,
            scrollbarYEnabled: _,
            onScrollbarYEnabledChange: L,
            onCornerWidthChange: T,
            onCornerHeightChange: R,
            children: o.jsx(n.div, {
                dir: A,
                ...u,
                ref: D,
                style: {
                    position: "relative",
                    "--radix-scroll-area-corner-width": E + "px",
                    "--radix-scroll-area-corner-height": C + "px",
                    ...e.style
                }
            })
        })
    });
b.displayName = p;
var m = "ScrollAreaViewport",
    g = c.forwardRef((e, t) => {
        const {
            __scopeScrollArea: l,
            children: i,
            nonce: a,
            ...s
        } = e, d = w(m, l), u = c.useRef(null), p = r(t, u, d.onViewportChange);
        return o.jsxs(o.Fragment, {
            children: [o.jsx("style", {
                dangerouslySetInnerHTML: {
                    __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
                },
                nonce: a
            }), o.jsx(n.div, {
                "data-radix-scroll-area-viewport": "",
                ...s,
                ref: p,
                style: {
                    overflowX: d.scrollbarXEnabled ? "scroll" : "hidden",
                    overflowY: d.scrollbarYEnabled ? "scroll" : "hidden",
                    ...e.style
                },
                children: o.jsx("div", {
                    ref: d.onContentChange,
                    style: {
                        minWidth: "100%",
                        display: "table"
                    },
                    children: i
                })
            })]
        })
    });
g.displayName = m;
var S = "ScrollAreaScrollbar",
    x = c.forwardRef((e, r) => {
        const {
            forceMount: t,
            ...n
        } = e, l = w(S, e.__scopeScrollArea), {
            onScrollbarXEnabledChange: i,
            onScrollbarYEnabledChange: a
        } = l, s = "horizontal" === e.orientation;
        return c.useEffect(() => (s ? i(!0) : a(!0), () => {
            s ? i(!1) : a(!1)
        }), [s, i, a]), "hover" === l.type ? o.jsx(y, { ...n,
            ref: r,
            forceMount: t
        }) : "scroll" === l.type ? o.jsx(E, { ...n,
            ref: r,
            forceMount: t
        }) : "auto" === l.type ? o.jsx(T, { ...n,
            ref: r,
            forceMount: t
        }) : "always" === l.type ? o.jsx(C, { ...n,
            ref: r
        }) : null
    });
x.displayName = S;
var y = c.forwardRef((e, r) => {
        const {
            forceMount: t,
            ...n
        } = e, i = w(S, e.__scopeScrollArea), [a, s] = c.useState(!1);
        return c.useEffect(() => {
            const e = i.scrollArea;
            let r = 0;
            if (e) {
                const t = () => {
                        window.clearTimeout(r), s(!0)
                    },
                    o = () => {
                        r = window.setTimeout(() => s(!1), i.scrollHideDelay)
                    };
                return e.addEventListener("pointerenter", t), e.addEventListener("pointerleave", o), () => {
                    window.clearTimeout(r), e.removeEventListener("pointerenter", t), e.removeEventListener("pointerleave", o)
                }
            }
        }, [i.scrollArea, i.scrollHideDelay]), o.jsx(l, {
            present: t || a,
            children: o.jsx(T, {
                "data-state": a ? "visible" : "hidden",
                ...n,
                ref: r
            })
        })
    }),
    E = c.forwardRef((e, r) => {
        const {
            forceMount: t,
            ...n
        } = e, a = w(S, e.__scopeScrollArea), s = "horizontal" === e.orientation, d = k(() => p("SCROLL_END"), 100), [u, p] = (f = "hidden", h = {
            hidden: {
                SCROLL: "scrolling"
            },
            scrolling: {
                SCROLL_END: "idle",
                POINTER_ENTER: "interacting"
            },
            interacting: {
                SCROLL: "interacting",
                POINTER_LEAVE: "idle"
            },
            idle: {
                HIDE: "hidden",
                SCROLL: "scrolling",
                POINTER_ENTER: "interacting"
            }
        }, c.useReducer((e, r) => h[e][r] ? ? e, f));
        var f, h;
        return c.useEffect(() => {
            if ("idle" === u) {
                const e = window.setTimeout(() => p("HIDE"), a.scrollHideDelay);
                return () => window.clearTimeout(e)
            }
        }, [u, a.scrollHideDelay, p]), c.useEffect(() => {
            const e = a.viewport,
                r = s ? "scrollLeft" : "scrollTop";
            if (e) {
                let t = e[r];
                const o = () => {
                    const o = e[r];
                    t !== o && (p("SCROLL"), d()), t = o
                };
                return e.addEventListener("scroll", o), () => e.removeEventListener("scroll", o)
            }
        }, [a.viewport, s, p, d]), o.jsx(l, {
            present: t || "hidden" !== u,
            children: o.jsx(C, {
                "data-state": "hidden" === u ? "hidden" : "visible",
                ...n,
                ref: r,
                onPointerEnter: i(e.onPointerEnter, () => p("POINTER_ENTER")),
                onPointerLeave: i(e.onPointerLeave, () => p("POINTER_LEAVE"))
            })
        })
    }),
    T = c.forwardRef((e, r) => {
        const t = w(S, e.__scopeScrollArea),
            {
                forceMount: n,
                ...i
            } = e,
            [a, s] = c.useState(!1),
            d = "horizontal" === e.orientation,
            u = k(() => {
                if (t.viewport) {
                    const e = t.viewport.offsetWidth < t.viewport.scrollWidth,
                        r = t.viewport.offsetHeight < t.viewport.scrollHeight;
                    s(d ? e : r)
                }
            }, 10);
        return F(t.viewport, u), F(t.content, u), o.jsx(l, {
            present: n || a,
            children: o.jsx(C, {
                "data-state": a ? "visible" : "hidden",
                ...i,
                ref: r
            })
        })
    }),
    C = c.forwardRef((e, r) => {
        const {
            orientation: t = "vertical",
            ...n
        } = e, l = w(S, e.__scopeScrollArea), i = c.useRef(null), a = c.useRef(0), [s, d] = c.useState({
            content: 0,
            viewport: 0,
            scrollbar: {
                size: 0,
                paddingStart: 0,
                paddingEnd: 0
            }
        }), u = Y(s.viewport, s.content), p = { ...n,
            sizes: s,
            onSizesChange: d,
            hasThumb: Boolean(u > 0 && u < 1),
            onThumbChange: e => i.current = e,
            onThumbPointerUp: () => a.current = 0,
            onThumbPointerDown: e => a.current = e
        };

        function f(e, r) {
            return function(e, r, t, o = "ltr") {
                const n = I(t),
                    l = n / 2,
                    i = r || l,
                    a = n - i,
                    s = t.scrollbar.paddingStart + i,
                    c = t.scrollbar.size - t.scrollbar.paddingEnd - a,
                    d = t.content - t.viewport,
                    u = "ltr" === o ? [0, d] : [-1 * d, 0];
                return O([s, c], u)(e)
            }(e, a.current, s, r)
        }
        return "horizontal" === t ? o.jsx(R, { ...p,
            ref: r,
            onThumbPositionChange: () => {
                if (l.viewport && i.current) {
                    const e = M(l.viewport.scrollLeft, s, l.dir);
                    i.current.style.transform = `translate3d(${e}px, 0, 0)`
                }
            },
            onWheelScroll: e => {
                l.viewport && (l.viewport.scrollLeft = e)
            },
            onDragScroll: e => {
                l.viewport && (l.viewport.scrollLeft = f(e, l.dir))
            }
        }) : "vertical" === t ? o.jsx(P, { ...p,
            ref: r,
            onThumbPositionChange: () => {
                if (l.viewport && i.current) {
                    const e = M(l.viewport.scrollTop, s);
                    i.current.style.transform = `translate3d(0, ${e}px, 0)`
                }
            },
            onWheelScroll: e => {
                l.viewport && (l.viewport.scrollTop = e)
            },
            onDragScroll: e => {
                l.viewport && (l.viewport.scrollTop = f(e))
            }
        }) : null
    }),
    R = c.forwardRef((e, t) => {
        const {
            sizes: n,
            onSizesChange: l,
            ...i
        } = e, a = w(S, e.__scopeScrollArea), [s, d] = c.useState(), u = c.useRef(null), p = r(t, u, a.onScrollbarXChange);
        return c.useEffect(() => {
            u.current && d(getComputedStyle(u.current))
        }, [u]), o.jsx(L, {
            "data-orientation": "horizontal",
            ...i,
            ref: p,
            sizes: n,
            style: {
                bottom: 0,
                left: "rtl" === a.dir ? "var(--radix-scroll-area-corner-width)" : 0,
                right: "ltr" === a.dir ? "var(--radix-scroll-area-corner-width)" : 0,
                "--radix-scroll-area-thumb-width": I(n) + "px",
                ...e.style
            },
            onThumbPointerDown: r => e.onThumbPointerDown(r.x),
            onDragScroll: r => e.onDragScroll(r.x),
            onWheelScroll: (r, t) => {
                if (a.viewport) {
                    const o = a.viewport.scrollLeft + r.deltaX;
                    e.onWheelScroll(o), U(o, t) && r.preventDefault()
                }
            },
            onResize: () => {
                u.current && a.viewport && s && l({
                    content: a.viewport.scrollWidth,
                    viewport: a.viewport.offsetWidth,
                    scrollbar: {
                        size: u.current.clientWidth,
                        paddingStart: X(s.paddingLeft),
                        paddingEnd: X(s.paddingRight)
                    }
                })
            }
        })
    }),
    P = c.forwardRef((e, t) => {
        const {
            sizes: n,
            onSizesChange: l,
            ...i
        } = e, a = w(S, e.__scopeScrollArea), [s, d] = c.useState(), u = c.useRef(null), p = r(t, u, a.onScrollbarYChange);
        return c.useEffect(() => {
            u.current && d(getComputedStyle(u.current))
        }, [u]), o.jsx(L, {
            "data-orientation": "vertical",
            ...i,
            ref: p,
            sizes: n,
            style: {
                top: 0,
                right: "ltr" === a.dir ? 0 : void 0,
                left: "rtl" === a.dir ? 0 : void 0,
                bottom: "var(--radix-scroll-area-corner-height)",
                "--radix-scroll-area-thumb-height": I(n) + "px",
                ...e.style
            },
            onThumbPointerDown: r => e.onThumbPointerDown(r.y),
            onDragScroll: r => e.onDragScroll(r.y),
            onWheelScroll: (r, t) => {
                if (a.viewport) {
                    const o = a.viewport.scrollTop + r.deltaY;
                    e.onWheelScroll(o), U(o, t) && r.preventDefault()
                }
            },
            onResize: () => {
                u.current && a.viewport && s && l({
                    content: a.viewport.scrollHeight,
                    viewport: a.viewport.offsetHeight,
                    scrollbar: {
                        size: u.current.clientHeight,
                        paddingStart: X(s.paddingTop),
                        paddingEnd: X(s.paddingBottom)
                    }
                })
            }
        })
    }),
    [j, _] = f(S),
    L = c.forwardRef((e, t) => {
        const {
            __scopeScrollArea: l,
            sizes: s,
            hasThumb: d,
            onThumbChange: u,
            onThumbPointerUp: p,
            onThumbPointerDown: f,
            onThumbPositionChange: h,
            onDragScroll: v,
            onWheelScroll: b,
            onResize: m,
            ...g
        } = e, x = w(S, l), [y, E] = c.useState(null), T = r(t, e => E(e)), C = c.useRef(null), R = c.useRef(""), P = x.viewport, _ = s.content - s.viewport, L = a(b), D = a(h), A = k(m, 10);

        function N(e) {
            if (C.current) {
                const r = e.clientX - C.current.left,
                    t = e.clientY - C.current.top;
                v({
                    x: r,
                    y: t
                })
            }
        }
        return c.useEffect(() => {
            const e = e => {
                const r = e.target;
                (null == y ? void 0 : y.contains(r)) && L(e, _)
            };
            return document.addEventListener("wheel", e, {
                passive: !1
            }), () => document.removeEventListener("wheel", e, {
                passive: !1
            })
        }, [P, y, _, L]), c.useEffect(D, [s, D]), F(y, A), F(x.content, A), o.jsx(j, {
            scope: l,
            scrollbar: y,
            hasThumb: d,
            onThumbChange: a(u),
            onThumbPointerUp: a(p),
            onThumbPositionChange: D,
            onThumbPointerDown: a(f),
            children: o.jsx(n.div, { ...g,
                ref: T,
                style: {
                    position: "absolute",
                    ...g.style
                },
                onPointerDown: i(e.onPointerDown, e => {
                    if (0 === e.button) {
                        e.target.setPointerCapture(e.pointerId), C.current = y.getBoundingClientRect(), R.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", x.viewport && (x.viewport.style.scrollBehavior = "auto"), N(e)
                    }
                }),
                onPointerMove: i(e.onPointerMove, N),
                onPointerUp: i(e.onPointerUp, e => {
                    const r = e.target;
                    r.hasPointerCapture(e.pointerId) && r.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = R.current, x.viewport && (x.viewport.style.scrollBehavior = ""), C.current = null
                })
            })
        })
    }),
    D = "ScrollAreaThumb",
    A = c.forwardRef((e, r) => {
        const {
            forceMount: t,
            ...n
        } = e, i = _(D, e.__scopeScrollArea);
        return o.jsx(l, {
            present: t || i.hasThumb,
            children: o.jsx(N, {
                ref: r,
                ...n
            })
        })
    }),
    N = c.forwardRef((e, t) => {
        const {
            __scopeScrollArea: l,
            style: a,
            ...s
        } = e, d = w(D, l), u = _(D, l), {
            onThumbPositionChange: p
        } = u, f = r(t, e => u.onThumbChange(e)), h = c.useRef(void 0), v = k(() => {
            h.current && (h.current(), h.current = void 0)
        }, 100);
        return c.useEffect(() => {
            const e = d.viewport;
            if (e) {
                const r = () => {
                    if (v(), !h.current) {
                        const r = B(e, p);
                        h.current = r, p()
                    }
                };
                return p(), e.addEventListener("scroll", r), () => e.removeEventListener("scroll", r)
            }
        }, [d.viewport, v, p]), o.jsx(n.div, {
            "data-state": u.hasThumb ? "visible" : "hidden",
            ...s,
            ref: f,
            style: {
                width: "var(--radix-scroll-area-thumb-width)",
                height: "var(--radix-scroll-area-thumb-height)",
                ...a
            },
            onPointerDownCapture: i(e.onPointerDownCapture, e => {
                const r = e.target.getBoundingClientRect(),
                    t = e.clientX - r.left,
                    o = e.clientY - r.top;
                u.onThumbPointerDown({
                    x: t,
                    y: o
                })
            }),
            onPointerUp: i(e.onPointerUp, u.onThumbPointerUp)
        })
    });
A.displayName = D;
var z = "ScrollAreaCorner",
    H = c.forwardRef((e, r) => {
        const t = w(z, e.__scopeScrollArea),
            n = Boolean(t.scrollbarX && t.scrollbarY);
        return "scroll" !== t.type && n ? o.jsx(W, { ...e,
            ref: r
        }) : null
    });
H.displayName = z;
var W = c.forwardRef((e, r) => {
    const {
        __scopeScrollArea: t,
        ...l
    } = e, i = w(z, t), [a, s] = c.useState(0), [d, u] = c.useState(0), p = Boolean(a && d);
    return F(i.scrollbarX, () => {
        var e;
        const r = (null == (e = i.scrollbarX) ? void 0 : e.offsetHeight) || 0;
        i.onCornerHeightChange(r), u(r)
    }), F(i.scrollbarY, () => {
        var e;
        const r = (null == (e = i.scrollbarY) ? void 0 : e.offsetWidth) || 0;
        i.onCornerWidthChange(r), s(r)
    }), p ? o.jsx(n.div, { ...l,
        ref: r,
        style: {
            width: a,
            height: d,
            position: "absolute",
            right: "ltr" === i.dir ? 0 : void 0,
            left: "rtl" === i.dir ? 0 : void 0,
            bottom: 0,
            ...e.style
        }
    }) : null
});

function X(e) {
    return e ? parseInt(e, 10) : 0
}

function Y(e, r) {
    const t = e / r;
    return isNaN(t) ? 0 : t
}

function I(e) {
    const r = Y(e.viewport, e.content),
        t = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
        o = (e.scrollbar.size - t) * r;
    return Math.max(o, 18)
}

function M(e, r, t = "ltr") {
    const o = I(r),
        n = r.scrollbar.paddingStart + r.scrollbar.paddingEnd,
        l = r.scrollbar.size - n,
        i = r.content - r.viewport,
        a = l - o,
        s = d(e, "ltr" === t ? [0, i] : [-1 * i, 0]);
    return O([0, i], [0, a])(s)
}

function O(e, r) {
    return t => {
        if (e[0] === e[1] || r[0] === r[1]) return r[0];
        const o = (r[1] - r[0]) / (e[1] - e[0]);
        return r[0] + o * (t - e[0])
    }
}

function U(e, r) {
    return e > 0 && e < r
}
var B = (e, r = () => {}) => {
    let t = {
            left: e.scrollLeft,
            top: e.scrollTop
        },
        o = 0;
    return function n() {
        const l = {
                left: e.scrollLeft,
                top: e.scrollTop
            },
            i = t.left !== l.left,
            a = t.top !== l.top;
        (i || a) && r(), t = l, o = window.requestAnimationFrame(n)
    }(), () => window.cancelAnimationFrame(o)
};

function k(e, r) {
    const t = a(e),
        o = c.useRef(0);
    return c.useEffect(() => () => window.clearTimeout(o.current), []), c.useCallback(() => {
        window.clearTimeout(o.current), o.current = window.setTimeout(t, r)
    }, [t, r])
}

function F(e, r) {
    const t = a(r);
    s(() => {
        let r = 0;
        if (e) {
            const o = new ResizeObserver(() => {
                cancelAnimationFrame(r), r = window.requestAnimationFrame(t)
            });
            return o.observe(e), () => {
                window.cancelAnimationFrame(r), o.unobserve(e)
            }
        }
    }, [e, t])
}
var V = b,
    q = g,
    $ = H;
const G = c.forwardRef(({
    className: e,
    children: r,
    ...t
}, n) => o.jsxs(V, {
    ref: n,
    className: u("relative overflow-hidden", e),
    ...t,
    children: [o.jsx(q, {
        className: "h-full w-full rounded-[inherit]",
        children: r
    }), o.jsx(J, {}), o.jsx($, {})]
}));
G.displayName = V.displayName;
const J = c.forwardRef(({
    className: e,
    orientation: r = "vertical",
    ...t
}, n) => o.jsx(x, {
    ref: n,
    orientation: r,
    className: u("flex touch-none select-none transition-colors", "vertical" === r && "h-full w-2.5 border-l border-l-transparent p-[1px]", "horizontal" === r && "h-2.5 flex-col border-t border-t-transparent p-[1px]", e),
    ...t,
    children: o.jsx(A, {
        className: "relative flex-1 rounded-full bg-border"
    })
}));
J.displayName = x.displayName;
export {
    G as S
};