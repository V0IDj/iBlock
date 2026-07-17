import {
    j as e,
    P as a
} from "./vendor-ui-H0MweODj.js";
import {
    r
} from "./vendor-react-jZB-dUQe.js";
import {
    b as s,
    x as o
} from "./index-DwXWGlRe.js";
var t = r.forwardRef((r, s) => e.jsx(a.label, { ...r,
    ref: s,
    onMouseDown: e => {
        var a;
        e.target.closest("button, input, select, textarea") || (null == (a = r.onMouseDown) || a.call(r, e), !e.defaultPrevented && e.detail > 1 && e.preventDefault())
    }
}));
t.displayName = "Label";
var l = t;
const d = o("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),
    n = r.forwardRef(({
        className: a,
        ...r
    }, o) => e.jsx(l, {
        ref: o,
        className: s(d(), a),
        ...r
    }));
n.displayName = l.displayName;
export {
    n as L
};