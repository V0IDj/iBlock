import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    r as s,
    f as a
} from "./vendor-react-jZB-dUQe.js";
import {
    c as r,
    u as t,
    a as i,
    s as l,
    S as n,
    B as c,
    C as d,
    I as o,
    A as m
} from "./index-DwXWGlRe.js";
import {
    C as u,
    a as x,
    b as p,
    c as h,
    d as j
} from "./card-DPfJUZyV.js";
import {
    L as y
} from "./label-B5afVXpU.js";
import {
    C as g
} from "./credit-card-oykfqiGA.js";
import {
    U as f
} from "./upload-CHf1IM_P.js";
import {
    U as b
} from "./user-Dvk0HarL.js";
import {
    A as N
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
const v = r("Camera", [
        ["path", {
            d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
            key: "1tc9qg"
        }],
        ["circle", {
            cx: "12",
            cy: "13",
            r: "3",
            key: "1vg3eu"
        }]
    ]),
    k = () => {
        const {
            t: r,
            isRTL: k
        } = t(), [w, S] = s.useState(null), [_, C] = s.useState(!1), [$, F] = s.useState(null), [D, z] = s.useState(null), [B, q] = s.useState(null), [H, I] = s.useState(null), [U, L] = s.useState(null), [P, A] = s.useState(null), [M, T] = s.useState(null), [R, E] = s.useState(null), G = a(), {
            toast: V
        } = i();
        s.useEffect(() => {
            const {
                data: {
                    subscription: e
                }
            } = l.auth.onAuthStateChange((e, s) => {
                S((null == s ? void 0 : s.user) ? ? null), (null == s ? void 0 : s.user) || G("/auth")
            });
            return l.auth.getSession().then(({
                data: {
                    session: e
                }
            }) => {
                S((null == e ? void 0 : e.user) ? ? null), (null == e ? void 0 : e.user) || G("/auth")
            }), () => e.unsubscribe()
        }, [G]);
        const J = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
            K = (e, s, a) => {
                var t;
                const i = null == (t = e.target.files) ? void 0 : t[0];
                if (i) {
                    const t = (e => J.includes(e.type) ? e.size > 5242880 ? {
                        valid: !1,
                        error: r("kyc.fileTooLarge") || "File is too large. Maximum size is 5MB."
                    } : {
                        valid: !0
                    } : {
                        valid: !1,
                        error: r("kyc.invalidFileType") || "Invalid file type. Please upload JPG, PNG, or WebP images."
                    })(i);
                    if (!t.valid) return V({
                        title: r("kyc.error"),
                        description: t.error,
                        variant: "destructive"
                    }), void(e.target.value = "");
                    s(i);
                    const l = new FileReader;
                    l.onloadend = () => {
                        a(l.result)
                    }, l.readAsDataURL(i)
                }
            },
            O = async (e, s) => {
                const {
                    data: a,
                    error: r
                } = await l.storage.from("kyc-documents").upload(s, e, {
                    upsert: !0
                });
                return r ? null : a.path
            },
            W = !!$,
            X = !!D && !!B,
            Y = W || X,
            Q = k ? N : m;
        return e.jsxs("div", {
            className: "min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10",
            dir: k ? "rtl" : "ltr",
            children: [e.jsx("nav", {
                className: "border-b border-border bg-background/95 backdrop-blur-sm",
                children: e.jsxs("div", {
                    className: "container mx-auto px-4 py-4 flex items-center justify-between",
                    children: [e.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [e.jsx(n, {
                            className: "h-8 w-8 text-primary"
                        }), e.jsx("span", {
                            className: "text-2xl font-bold text-primary",
                            children: "iBlockchain"
                        })]
                    }), e.jsxs(c, {
                        variant: "ghost",
                        onClick: () => G("/dashboard"),
                        children: [e.jsx(Q, {
                            className: "h-4 w-4 " + (k ? "ml-2" : "mr-2")
                        }), r("kyc.back")]
                    })]
                })
            }), e.jsx("div", {
                className: "container mx-auto px-4 py-12",
                children: e.jsxs("div", {
                    className: "max-w-3xl mx-auto",
                    children: [e.jsxs("div", {
                        className: "text-center mb-8",
                        children: [e.jsx("h1", {
                            className: "text-3xl font-bold text-foreground mb-4",
                            children: r("kyc.title")
                        }), e.jsx("p", {
                            className: "text-muted-foreground",
                            children: r("kyc.subtitle")
                        }), e.jsx("div", {
                            className: "mt-4 p-4 bg-primary/10 rounded-lg",
                            children: e.jsx("p", {
                                className: "text-sm text-primary font-medium",
                                children: r("kyc.optionalNote") || "يمكنك رفع جواز السفر أو الهوية (الوجهين) - أحدهما كافٍ"
                            })
                        })]
                    }), e.jsxs("form", {
                        onSubmit: async e => {
                            if (e.preventDefault(), !w) return;
                            if ($ || D || B || H) {
                                C(!0);
                                try {
                                    const e = Date.now();
                                    let s = null;
                                    $ && (s = await O($, `${w.id}/passport-${e}.${$.name.split(".").pop()}`));
                                    let a = null,
                                        t = null;
                                    D && (a = await O(D, `${w.id}/id-front-${e}.${D.name.split(".").pop()}`)), B && (t = await O(B, `${w.id}/id-back-${e}.${B.name.split(".").pop()}`));
                                    let i = null;
                                    H && (i = await O(H, `${w.id}/selfie-${e}.${H.name.split(".").pop()}`));
                                    const {
                                        error: n
                                    } = await l.from("kyc_documents").upsert({
                                        user_id: w.id,
                                        passport_url: s,
                                        id_front_url: a,
                                        id_back_url: t,
                                        selfie_url: i,
                                        status: "pending",
                                        submitted_at: (new Date).toISOString(),
                                        reviewed_at: null
                                    }, {
                                        onConflict: "user_id"
                                    });
                                    if (n) throw n;
                                    const {
                                        data: c
                                    } = await l.from("profiles").select("full_name, email").eq("user_id", w.id).single(), {
                                        data: d
                                    } = await l.from("user_roles").select("user_id").eq("role", "admin");
                                    if (d && d.length > 0) {
                                        const e = d.map(e => ({
                                            user_id: e.user_id,
                                            title: "📄 طلب KYC جديد",
                                            message: `قام ${(null==c?void 0:c.full_name)||(null==c?void 0:c.email)||"مستخدم"} بإرسال وثائق للمراجعة`,
                                            is_read: !1
                                        }));
                                        await l.from("notifications").insert(e)
                                    }
                                    V({
                                        title: r("kyc.submitSuccess"),
                                        description: r("kyc.documentsSubmitted") || "تم إرسال الوثائق للمراجعة. يمكنك متابعة استخدام حسابك."
                                    }), G("/dashboard")
                                } catch (s) {
                                    V({
                                        title: r("kyc.error"),
                                        description: r("kyc.submitError"),
                                        variant: "destructive"
                                    })
                                } finally {
                                    C(!1)
                                }
                            } else V({
                                title: r("kyc.error"),
                                description: r("kyc.pleaseUploadDocuments") || "يرجى رفع مستند واحد على الأقل",
                                variant: "destructive"
                            })
                        },
                        className: "space-y-6",
                        children: [e.jsxs(u, {
                            className: W ? "ring-2 ring-green-500" : X ? "opacity-60" : "",
                            children: [e.jsxs(x, {
                                children: [e.jsxs("div", {
                                    className: "flex items-center justify-between",
                                    children: [e.jsxs(p, {
                                        className: "flex items-center gap-2 text-lg",
                                        children: [e.jsx(g, {
                                            className: "h-5 w-5 text-primary"
                                        }), r("kyc.passport")]
                                    }), W && e.jsx(d, {
                                        className: "h-5 w-5 text-green-500"
                                    }), !W && !X && e.jsx("span", {
                                        className: "text-xs bg-muted px-2 py-1 rounded",
                                        children: r("kyc.optional") || "اختياري"
                                    })]
                                }), e.jsx(h, {
                                    children: r("kyc.passportDesc")
                                })]
                            }), e.jsx(j, {
                                children: e.jsx("div", {
                                    className: "border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                                    children: U ? e.jsxs("div", {
                                        className: "relative",
                                        children: [e.jsx("img", {
                                            src: U,
                                            alt: "Passport preview",
                                            className: "max-h-48 mx-auto rounded-lg"
                                        }), e.jsx(c, {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "mt-4",
                                            onClick: () => {
                                                F(null), L(null)
                                            },
                                            children: r("kyc.remove")
                                        })]
                                    }) : e.jsxs(y, {
                                        htmlFor: "passport",
                                        className: "cursor-pointer block",
                                        children: [e.jsx(f, {
                                            className: "h-12 w-12 mx-auto text-muted-foreground mb-4"
                                        }), e.jsx("span", {
                                            className: "text-primary font-medium",
                                            children: r("kyc.uploadHint")
                                        }), e.jsx(o, {
                                            id: "passport",
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: e => K(e, F, L)
                                        })]
                                    })
                                })
                            })]
                        }), !W && e.jsx("div", {
                            className: "text-center py-2",
                            children: e.jsxs("span", {
                                className: "text-sm text-muted-foreground",
                                children: ["— ", r("kyc.orUploadId") || "أو قم برفع الهوية", " —"]
                            })
                        }), e.jsxs(u, {
                            className: X ? "ring-2 ring-green-500" : W ? "opacity-60" : "",
                            children: [e.jsxs(x, {
                                children: [e.jsxs("div", {
                                    className: "flex items-center justify-between",
                                    children: [e.jsxs(p, {
                                        className: "flex items-center gap-2 text-lg",
                                        children: [e.jsx(g, {
                                            className: "h-5 w-5 text-primary"
                                        }), r("kyc.idFront")]
                                    }), D && e.jsx(d, {
                                        className: "h-5 w-5 text-green-500"
                                    }), !W && !X && e.jsx("span", {
                                        className: "text-xs bg-muted px-2 py-1 rounded",
                                        children: r("kyc.optional") || "اختياري"
                                    })]
                                }), e.jsx(h, {
                                    children: r("kyc.idFrontDesc")
                                })]
                            }), e.jsx(j, {
                                children: e.jsx("div", {
                                    className: "border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                                    children: P ? e.jsxs("div", {
                                        className: "relative",
                                        children: [e.jsx("img", {
                                            src: P,
                                            alt: "ID Front preview",
                                            className: "max-h-48 mx-auto rounded-lg"
                                        }), e.jsx(c, {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "mt-4",
                                            onClick: () => {
                                                z(null), A(null)
                                            },
                                            children: r("kyc.remove")
                                        })]
                                    }) : e.jsxs(y, {
                                        htmlFor: "idFront",
                                        className: "cursor-pointer block",
                                        children: [e.jsx(f, {
                                            className: "h-12 w-12 mx-auto text-muted-foreground mb-4"
                                        }), e.jsx("span", {
                                            className: "text-primary font-medium",
                                            children: r("kyc.uploadHint")
                                        }), e.jsx(o, {
                                            id: "idFront",
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: e => K(e, z, A)
                                        })]
                                    })
                                })
                            })]
                        }), e.jsxs(u, {
                            className: X ? "ring-2 ring-green-500" : W ? "opacity-60" : "",
                            children: [e.jsxs(x, {
                                children: [e.jsxs("div", {
                                    className: "flex items-center justify-between",
                                    children: [e.jsxs(p, {
                                        className: "flex items-center gap-2 text-lg",
                                        children: [e.jsx(g, {
                                            className: "h-5 w-5 text-primary"
                                        }), r("kyc.idBack")]
                                    }), B && e.jsx(d, {
                                        className: "h-5 w-5 text-green-500"
                                    }), !W && !X && e.jsx("span", {
                                        className: "text-xs bg-muted px-2 py-1 rounded",
                                        children: r("kyc.optional") || "اختياري"
                                    })]
                                }), e.jsx(h, {
                                    children: r("kyc.idBackDesc")
                                })]
                            }), e.jsx(j, {
                                children: e.jsx("div", {
                                    className: "border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                                    children: M ? e.jsxs("div", {
                                        className: "relative",
                                        children: [e.jsx("img", {
                                            src: M,
                                            alt: "ID Back preview",
                                            className: "max-h-48 mx-auto rounded-lg"
                                        }), e.jsx(c, {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "mt-4",
                                            onClick: () => {
                                                q(null), T(null)
                                            },
                                            children: r("kyc.remove")
                                        })]
                                    }) : e.jsxs(y, {
                                        htmlFor: "idBack",
                                        className: "cursor-pointer block",
                                        children: [e.jsx(f, {
                                            className: "h-12 w-12 mx-auto text-muted-foreground mb-4"
                                        }), e.jsx("span", {
                                            className: "text-primary font-medium",
                                            children: r("kyc.uploadHint")
                                        }), e.jsx(o, {
                                            id: "idBack",
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: e => K(e, q, T)
                                        })]
                                    })
                                })
                            })]
                        }), e.jsxs(u, {
                            className: H ? "ring-2 ring-green-500" : "",
                            children: [e.jsxs(x, {
                                children: [e.jsxs("div", {
                                    className: "flex items-center justify-between",
                                    children: [e.jsxs(p, {
                                        className: "flex items-center gap-2 text-lg",
                                        children: [e.jsx(v, {
                                            className: "h-5 w-5 text-primary"
                                        }), r("kyc.selfie")]
                                    }), H ? e.jsx(d, {
                                        className: "h-5 w-5 text-green-500"
                                    }) : e.jsx("span", {
                                        className: "text-xs bg-destructive/10 text-destructive px-2 py-1 rounded",
                                        children: r("kyc.required") || "مطلوب"
                                    })]
                                }), e.jsx(h, {
                                    children: r("kyc.selfieDesc")
                                })]
                            }), e.jsx(j, {
                                children: e.jsx("div", {
                                    className: "border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                                    children: R ? e.jsxs("div", {
                                        className: "relative",
                                        children: [e.jsx("img", {
                                            src: R,
                                            alt: "Selfie preview",
                                            className: "max-h-48 mx-auto rounded-lg"
                                        }), e.jsx(c, {
                                            type: "button",
                                            variant: "outline",
                                            size: "sm",
                                            className: "mt-4",
                                            onClick: () => {
                                                I(null), E(null)
                                            },
                                            children: r("kyc.remove")
                                        })]
                                    }) : e.jsxs(y, {
                                        htmlFor: "selfie",
                                        className: "cursor-pointer block",
                                        children: [e.jsx(b, {
                                            className: "h-12 w-12 mx-auto text-muted-foreground mb-4"
                                        }), e.jsx("span", {
                                            className: "text-primary font-medium",
                                            children: r("kyc.uploadHint")
                                        }), e.jsx(o, {
                                            id: "selfie",
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            onChange: e => K(e, I, E)
                                        })]
                                    })
                                })
                            })]
                        }), e.jsxs("div", {
                            className: "flex items-center gap-4 p-4 bg-muted/50 rounded-lg",
                            children: [e.jsx(d, {
                                className: "h-6 w-6 text-primary flex-shrink-0"
                            }), e.jsx("p", {
                                className: "text-sm text-muted-foreground",
                                children: r("kyc.consent")
                            })]
                        }), e.jsx(c, {
                            type: "submit",
                            className: "w-full",
                            size: "lg",
                            disabled: _ || !H || !Y,
                            children: r(_ ? "kyc.submitting" : "kyc.submit")
                        }), !Y && e.jsx("p", {
                            className: "text-center text-sm text-muted-foreground",
                            children: r("kyc.uploadHintMessage") || "يرجى رفع جواز السفر أو الهوية (الوجهين) مع الصورة الشخصية"
                        })]
                    })]
                })
            })]
        })
    };
export {
    k as
    default
};