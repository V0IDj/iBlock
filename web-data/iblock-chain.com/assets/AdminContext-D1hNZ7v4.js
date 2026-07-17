import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as t,
    f as s
} from "./vendor-react-jZB-dUQe.js";
import {
    a,
    u as n,
    s as r
} from "./index-DwXWGlRe.js";
const i = t.createContext(null),
    u = () => {
        const e = t.useContext(i);
        if (!e) throw new Error("useAdminData must be used within AdminProvider");
        return e
    },
    o = ({
        children: u
    }) => {
        const [o, d] = t.useState(null), [l, c] = t.useState(!1), [m, f] = t.useState(!1), [h, p] = t.useState(!0), [v, _] = t.useState([]), [S, g] = t.useState([]), [w, y] = t.useState([]), b = s(), {
            toast: j
        } = a(), {
            t: x
        } = n();
        t.useEffect(() => {
            const {
                data: {
                    subscription: e
                }
            } = r.auth.onAuthStateChange((e, t) => {
                d((null == t ? void 0 : t.user) ? ? null), (null == t ? void 0 : t.user) || b("/auth")
            });
            return r.auth.getSession().then(({
                data: {
                    session: e
                }
            }) => {
                d((null == e ? void 0 : e.user) ? ? null), (null == e ? void 0 : e.user) || b("/auth")
            }), () => e.unsubscribe()
        }, [b]);
        const A = async () => {
            const [{
                data: e
            }, {
                data: t
            }, {
                data: s
            }] = await Promise.all([r.from("profiles").select("id, user_id, full_name, email, country, phone, created_at, updated_at").order("created_at", {
                ascending: !1
            }), r.from("kyc_documents").select("*").order("submitted_at", {
                ascending: !1
            }), r.from("client_finances").select("*")]);
            e && _(e), t && g(t), s && y(s)
        };
        t.useEffect(() => {
            o && (async () => {
                if (!o) return;
                const {
                    data: e
                } = await r.from("user_roles").select("role").eq("user_id", o.id).in("role", ["admin", "super_admin"]), t = (null == e ? void 0 : e.map(e => e.role)) || [], s = t.includes("admin") || t.includes("super_admin"), a = t.includes("super_admin");
                if (!s) return j({
                    title: x("admin.unauthorized"),
                    description: x("admin.noPermission"),
                    variant: "destructive"
                }), void b("/dashboard");
                c(!0), f(a), await A(), p(!1)
            })()
        }, [o, b, j, x]);
        return l || h ? e.jsx(i.Provider, {
            value: {
                user: o,
                isSuperAdmin: m,
                loading: h,
                profiles: v,
                kycDocs: S,
                finances: w,
                setProfiles: _,
                setKycDocs: g,
                setFinances: y,
                handleLogout: async () => {
                    await r.auth.signOut(), b("/")
                },
                refreshData: A
            },
            children: u
        }) : null
    };
export {
    o as A, u
};