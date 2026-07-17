import {
    j as a
} from "./vendor-ui-H0MweODj.js";
import {
    r as e
} from "./vendor-react-jZB-dUQe.js";
import {
    b as s
} from "./index-DwXWGlRe.js";
const r = e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("div", {
    ref: o,
    className: s("rounded-2xl border text-card-foreground shadow-sm backdrop-blur-2xl", e),
    style: {
        background: "rgba(255, 255, 255, 0.55)",
        borderColor: "rgba(255, 255, 255, 0.7)",
        boxShadow: "0 8px 32px rgba(56, 118, 209, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
    },
    ...r
}));
r.displayName = "Card";
const o = e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("div", {
    ref: o,
    className: s("flex flex-col space-y-1.5 p-6", e),
    ...r
}));
o.displayName = "CardHeader";
const d = e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("h3", {
    ref: o,
    className: s("text-2xl font-semibold leading-none tracking-tight", e),
    ...r
}));
d.displayName = "CardTitle";
const t = e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("p", {
    ref: o,
    className: s("text-sm text-muted-foreground", e),
    ...r
}));
t.displayName = "CardDescription";
const l = e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("div", {
    ref: o,
    className: s("p-6 pt-0", e),
    ...r
}));
l.displayName = "CardContent";
e.forwardRef(({
    className: e,
    ...r
}, o) => a.jsx("div", {
    ref: o,
    className: s("flex items-center p-6 pt-0", e),
    ...r
})).displayName = "CardFooter";
export {
    r as C, o as a, d as b, t as c, l as d
};