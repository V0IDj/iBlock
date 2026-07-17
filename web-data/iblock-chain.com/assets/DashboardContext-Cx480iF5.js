import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as t,
    f as a
} from "./vendor-react-jZB-dUQe.js";
import {
    a as s,
    s as n
} from "./index-DwXWGlRe.js";
const i = t.createContext(null),
    r = () => {
        const e = t.useContext(i);
        if (!e) throw new Error("useDashboardData must be used within DashboardProvider");
        return e
    },
    o = ({
        children: r
    }) => {
        const [o, u] = t.useState(null), [l, d] = t.useState(null), [c, m] = t.useState(null), [f, _] = t.useState(null), [h, g] = t.useState(null), [p, b] = t.useState(!0), [v, y] = t.useState(!1), w = a(), {
            notifications: S,
            unreadCount: q,
            markAsRead: A,
            markAllAsRead: C
        } = (e => {
            const [a, i] = t.useState([]), [r, o] = t.useState([]), [u, l] = t.useState(0), [d, c] = t.useState(!0), {
                toast: m
            } = s(), f = t.useCallback(async () => {
                if (!e) return;
                const {
                    data: t
                } = await n.from("notifications").select("*").eq("user_id", e).order("created_at", {
                    ascending: !1
                }).limit(20);
                t && (i(t), l(t.filter(e => !e.is_read).length)), c(!1)
            }, [e]), _ = t.useCallback(async () => {
                if (!e) return;
                const {
                    data: t
                } = await n.from("messages").select("*").eq("user_id", e).eq("sender_role", "admin").order("created_at", {
                    ascending: !1
                }).limit(20);
                t && o(t)
            }, [e]);
            return t.useEffect(() => {
                if (!e) return;
                f(), _();
                const t = n.channel("notifications-realtime").on("postgres_changes", {
                        event: "INSERT",
                        schema: "public",
                        table: "notifications",
                        filter: `user_id=eq.${e}`
                    }, e => {
                        const t = e.new;
                        i(e => [t, ...e]), l(e => e + 1), m({
                            title: t.title,
                            description: t.message
                        })
                    }).subscribe(),
                    a = n.channel("messages-realtime").on("postgres_changes", {
                        event: "INSERT",
                        schema: "public",
                        table: "messages",
                        filter: `user_id=eq.${e}`
                    }, e => {
                        const t = e.new;
                        "admin" === t.sender_role && (o(e => [t, ...e]), m({
                            title: "💬 رسالة جديدة من الإدارة",
                            description: t.content.substring(0, 100) + (t.content.length > 100 ? "..." : "")
                        }))
                    }).subscribe(),
                    s = n.channel("finance-realtime").on("postgres_changes", {
                        event: "UPDATE",
                        schema: "public",
                        table: "client_finances",
                        filter: `user_id=eq.${e}`
                    }, e => {
                        const t = e.new;
                        t.amount_due > 0 && "paid" !== t.payment_status && m({
                            title: "💰 تنبيه: رسوم مستحقة",
                            description: t.payment_due_message || `مبلغ مستحق: $${t.amount_due}`,
                            variant: "destructive"
                        }), t.admin_message && m({
                            title: "📢 رسالة من الإدارة",
                            description: t.admin_message
                        })
                    }).subscribe();
                return () => {
                    n.removeChannel(t), n.removeChannel(a), n.removeChannel(s)
                }
            }, [e, f, _, m]), {
                notifications: a,
                messages: r,
                unreadCount: u,
                loading: d,
                markAsRead: async e => {
                    await n.from("notifications").update({
                        is_read: !0
                    }).eq("id", e), i(t => t.map(t => t.id === e ? { ...t,
                        is_read: !0
                    } : t)), l(e => Math.max(0, e - 1))
                },
                markAllAsRead: async () => {
                    e && (await n.from("notifications").update({
                        is_read: !0
                    }).eq("user_id", e).eq("is_read", !1), i(e => e.map(e => ({ ...e,
                        is_read: !0
                    }))), l(0))
                },
                refetch: f
            }
        })(null == o ? void 0 : o.id);
        t.useEffect(() => {
            const {
                data: {
                    subscription: e
                }
            } = n.auth.onAuthStateChange((e, t) => {
                d(t), u((null == t ? void 0 : t.user) ? ? null), (null == t ? void 0 : t.user) || w("/auth")
            });
            return n.auth.getSession().then(({
                data: {
                    session: e
                }
            }) => {
                d(e), u((null == e ? void 0 : e.user) ? ? null), (null == e ? void 0 : e.user) || w("/auth")
            }), () => e.unsubscribe()
        }, [w]), t.useEffect(() => {
            o && (async () => {
                if (o) try {
                    const {
                        data: e
                    } = await n.from("user_roles").select("role").eq("user_id", o.id).in("role", ["admin", "super_admin"]), t = !!e && e.length > 0;
                    if (y(t), t) return void w("/admin");
                    const {
                        data: a
                    } = await n.from("profiles").select("full_name, email, wallet_id, country").eq("user_id", o.id).single();
                    a && m(a);
                    const {
                        data: s
                    } = await n.from("kyc_documents").select("status").eq("user_id", o.id).single();
                    _(s);
                    const {
                        data: i
                    } = await n.from("client_finances").select("capital, profits, total_recovered, currency, admin_message, amount_due, payment_due_message, payment_deadline, payment_status").eq("user_id", o.id).single();
                    i && g(i)
                } catch (e) {} finally {
                    b(!1)
                }
            })()
        }, [o, w]);
        const k = !f;
        return e.jsx(i.Provider, {
            value: {
                user: o,
                session: l,
                profile: c,
                kyc: f,
                finances: h,
                loading: p,
                isAdmin: v,
                notifications: S,
                unreadCount: q,
                markAsRead: A,
                markAllAsRead: C,
                handleLogout: async () => {
                    await n.auth.signOut(), w("/")
                },
                needsKyc: k
            },
            children: r
        })
    };
export {
    o as D, r as u
};