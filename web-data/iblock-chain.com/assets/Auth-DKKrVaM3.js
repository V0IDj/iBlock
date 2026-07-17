import {
    j as e
} from "./vendor-ui-H0MweODj.js";
import {
    u as t,
    r as s,
    f as a,
    L as r
} from "./vendor-react-jZB-dUQe.js";
import {
    c as n,
    u as i,
    a as d,
    s as o,
    S as u,
    I as c,
    L as l,
    B as h,
    A as m
} from "./index-DwXWGlRe.js";
import {
    C as p,
    a as f,
    b as v,
    c as g,
    d as _
} from "./card-DPfJUZyV.js";
import {
    L as y
} from "./label-B5afVXpU.js";
import {
    U as x
} from "./user-Dvk0HarL.js";
import {
    M as k
} from "./mail-DIkk4pEO.js";
import {
    A as b
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
const w = n("Phone", [
    ["path", {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5"
    }]
]);
var N, j, Z;
(j = N || (N = {})).assertEqual = e => {}, j.assertIs = function(e) {}, j.assertNever = function(e) {
    throw new Error
}, j.arrayToEnum = e => {
    const t = {};
    for (const s of e) t[s] = s;
    return t
}, j.getValidEnumValues = e => {
    const t = j.objectKeys(e).filter(t => "number" != typeof e[e[t]]),
        s = {};
    for (const a of t) s[a] = e[a];
    return j.objectValues(s)
}, j.objectValues = e => j.objectKeys(e).map(function(t) {
    return e[t]
}), j.objectKeys = "function" == typeof Object.keys ? e => Object.keys(e) : e => {
    const t = [];
    for (const s in e) Object.prototype.hasOwnProperty.call(e, s) && t.push(s);
    return t
}, j.find = (e, t) => {
    for (const s of e)
        if (t(s)) return s
}, j.isInteger = "function" == typeof Number.isInteger ? e => Number.isInteger(e) : e => "number" == typeof e && Number.isFinite(e) && Math.floor(e) === e, j.joinValues = function(e, t = " | ") {
    return e.map(e => "string" == typeof e ? `'${e}'` : e).join(t)
}, j.jsonStringifyReplacer = (e, t) => "bigint" == typeof t ? t.toString() : t, (Z || (Z = {})).mergeShapes = (e, t) => ({ ...e,
    ...t
});
const C = N.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]),
    T = e => {
        switch (typeof e) {
            case "undefined":
                return C.undefined;
            case "string":
                return C.string;
            case "number":
                return Number.isNaN(e) ? C.nan : C.number;
            case "boolean":
                return C.boolean;
            case "function":
                return C.function;
            case "bigint":
                return C.bigint;
            case "symbol":
                return C.symbol;
            case "object":
                return Array.isArray(e) ? C.array : null === e ? C.null : e.then && "function" == typeof e.then && e.catch && "function" == typeof e.catch ? C.promise : "undefined" != typeof Map && e instanceof Map ? C.map : "undefined" != typeof Set && e instanceof Set ? C.set : "undefined" != typeof Date && e instanceof Date ? C.date : C.object;
            default:
                return C.unknown
        }
    },
    O = N.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
class S extends Error {
    get errors() {
        return this.issues
    }
    constructor(e) {
        super(), this.issues = [], this.addIssue = e => {
            this.issues = [...this.issues, e]
        }, this.addIssues = (e = []) => {
            this.issues = [...this.issues, ...e]
        };
        const t = new.target.prototype;
        Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e
    }
    format(e) {
        const t = e || function(e) {
                return e.message
            },
            s = {
                _errors: []
            },
            a = e => {
                for (const r of e.issues)
                    if ("invalid_union" === r.code) r.unionErrors.map(a);
                    else if ("invalid_return_type" === r.code) a(r.returnTypeError);
                else if ("invalid_arguments" === r.code) a(r.argumentsError);
                else if (0 === r.path.length) s._errors.push(t(r));
                else {
                    let e = s,
                        a = 0;
                    for (; a < r.path.length;) {
                        const s = r.path[a];
                        a === r.path.length - 1 ? (e[s] = e[s] || {
                            _errors: []
                        }, e[s]._errors.push(t(r))) : e[s] = e[s] || {
                            _errors: []
                        }, e = e[s], a++
                    }
                }
            };
        return a(this), s
    }
    static assert(e) {
        if (!(e instanceof S)) throw new Error(`Not a ZodError: ${e}`)
    }
    toString() {
        return this.message
    }
    get message() {
        return JSON.stringify(this.issues, N.jsonStringifyReplacer, 2)
    }
    get isEmpty() {
        return 0 === this.issues.length
    }
    flatten(e = e => e.message) {
        const t = {},
            s = [];
        for (const a of this.issues)
            if (a.path.length > 0) {
                const s = a.path[0];
                t[s] = t[s] || [], t[s].push(e(a))
            } else s.push(e(a));
        return {
            formErrors: s,
            fieldErrors: t
        }
    }
    get formErrors() {
        return this.flatten()
    }
}
S.create = e => new S(e);
const A = (e, t) => {
    let s;
    switch (e.code) {
        case O.invalid_type:
            s = e.received === C.undefined ? "Required" : `Expected ${e.expected}, received ${e.received}`;
            break;
        case O.invalid_literal:
            s = `Invalid literal value, expected ${JSON.stringify(e.expected,N.jsonStringifyReplacer)}`;
            break;
        case O.unrecognized_keys:
            s = `Unrecognized key(s) in object: ${N.joinValues(e.keys,", ")}`;
            break;
        case O.invalid_union:
            s = "Invalid input";
            break;
        case O.invalid_union_discriminator:
            s = `Invalid discriminator value. Expected ${N.joinValues(e.options)}`;
            break;
        case O.invalid_enum_value:
            s = `Invalid enum value. Expected ${N.joinValues(e.options)}, received '${e.received}'`;
            break;
        case O.invalid_arguments:
            s = "Invalid function arguments";
            break;
        case O.invalid_return_type:
            s = "Invalid function return type";
            break;
        case O.invalid_date:
            s = "Invalid date";
            break;
        case O.invalid_string:
            "object" == typeof e.validation ? "includes" in e.validation ? (s = `Invalid input: must include "${e.validation.includes}"`, "number" == typeof e.validation.position && (s = `${s} at one or more positions greater than or equal to ${e.validation.position}`)) : "startsWith" in e.validation ? s = `Invalid input: must start with "${e.validation.startsWith}"` : "endsWith" in e.validation ? s = `Invalid input: must end with "${e.validation.endsWith}"` : N.assertNever(e.validation) : s = "regex" !== e.validation ? `Invalid ${e.validation}` : "Invalid";
            break;
        case O.too_small:
            s = "array" === e.type ? `Array must contain ${e.exact?"exactly":e.inclusive?"at least":"more than"} ${e.minimum} element(s)` : "string" === e.type ? `String must contain ${e.exact?"exactly":e.inclusive?"at least":"over"} ${e.minimum} character(s)` : "number" === e.type || "bigint" === e.type ? `Number must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${e.minimum}` : "date" === e.type ? `Date must be ${e.exact?"exactly equal to ":e.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(e.minimum))}` : "Invalid input";
            break;
        case O.too_big:
            s = "array" === e.type ? `Array must contain ${e.exact?"exactly":e.inclusive?"at most":"less than"} ${e.maximum} element(s)` : "string" === e.type ? `String must contain ${e.exact?"exactly":e.inclusive?"at most":"under"} ${e.maximum} character(s)` : "number" === e.type ? `Number must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}` : "bigint" === e.type ? `BigInt must be ${e.exact?"exactly":e.inclusive?"less than or equal to":"less than"} ${e.maximum}` : "date" === e.type ? `Date must be ${e.exact?"exactly":e.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(e.maximum))}` : "Invalid input";
            break;
        case O.custom:
            s = "Invalid input";
            break;
        case O.invalid_intersection_types:
            s = "Intersection results could not be merged";
            break;
        case O.not_multiple_of:
            s = `Number must be a multiple of ${e.multipleOf}`;
            break;
        case O.not_finite:
            s = "Number must be finite";
            break;
        default:
            s = t.defaultError, N.assertNever(e)
    }
    return {
        message: s
    }
};
let I = A;

function E(e, t) {
    const s = I,
        a = (e => {
            const {
                data: t,
                path: s,
                errorMaps: a,
                issueData: r
            } = e, n = [...s, ...r.path || []], i = { ...r,
                path: n
            };
            if (void 0 !== r.message) return { ...r,
                path: n,
                message: r.message
            };
            let d = "";
            const o = a.filter(e => !!e).slice().reverse();
            for (const u of o) d = u(i, {
                data: t,
                defaultError: d
            }).message;
            return { ...r,
                path: n,
                message: d
            }
        })({
            issueData: t,
            data: e.data,
            path: e.path,
            errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, s, s === A ? void 0 : A].filter(e => !!e)
        });
    e.common.issues.push(a)
}
class P {
    constructor() {
        this.value = "valid"
    }
    dirty() {
        "valid" === this.value && (this.value = "dirty")
    }
    abort() {
        "aborted" !== this.value && (this.value = "aborted")
    }
    static mergeArray(e, t) {
        const s = [];
        for (const a of t) {
            if ("aborted" === a.status) return $;
            "dirty" === a.status && e.dirty(), s.push(a.value)
        }
        return {
            status: e.value,
            value: s
        }
    }
    static async mergeObjectAsync(e, t) {
        const s = [];
        for (const a of t) {
            const e = await a.key,
                t = await a.value;
            s.push({
                key: e,
                value: t
            })
        }
        return P.mergeObjectSync(e, s)
    }
    static mergeObjectSync(e, t) {
        const s = {};
        for (const a of t) {
            const {
                key: t,
                value: r
            } = a;
            if ("aborted" === t.status) return $;
            if ("aborted" === r.status) return $;
            "dirty" === t.status && e.dirty(), "dirty" === r.status && e.dirty(), "__proto__" === t.value || void 0 === r.value && !a.alwaysSet || (s[t.value] = r.value)
        }
        return {
            status: e.value,
            value: s
        }
    }
}
const $ = Object.freeze({
        status: "aborted"
    }),
    R = e => ({
        status: "dirty",
        value: e
    }),
    F = e => ({
        status: "valid",
        value: e
    }),
    L = e => "aborted" === e.status,
    M = e => "dirty" === e.status,
    z = e => "valid" === e.status,
    D = e => "undefined" != typeof Promise && e instanceof Promise;
var V, U;
(U = V || (V = {})).errToObj = e => "string" == typeof e ? {
    message: e
} : e || {}, U.toString = e => "string" == typeof e ? e : null == e ? void 0 : e.message;
class K {
    constructor(e, t, s, a) {
        this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = a
    }
    get path() {
        return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath
    }
}
const B = (e, t) => {
    if (z(t)) return {
        success: !0,
        data: t.value
    };
    if (!e.common.issues.length) throw new Error("Validation failed but no issues detected.");
    return {
        success: !1,
        get error() {
            if (this._error) return this._error;
            const t = new S(e.common.issues);
            return this._error = t, this._error
        }
    }
};

function q(e) {
    if (!e) return {};
    const {
        errorMap: t,
        invalid_type_error: s,
        required_error: a,
        description: r
    } = e;
    if (t && (s || a)) throw new Error('Can\'t use "invalid_type_error" or "required_error" in conjunction with custom error map.');
    if (t) return {
        errorMap: t,
        description: r
    };
    return {
        errorMap: (t, r) => {
            const {
                message: n
            } = e;
            return "invalid_enum_value" === t.code ? {
                message: n ? ? r.defaultError
            } : void 0 === r.data ? {
                message: n ? ? a ? ? r.defaultError
            } : "invalid_type" !== t.code ? {
                message: r.defaultError
            } : {
                message: n ? ? s ? ? r.defaultError
            }
        },
        description: r
    }
}
class W {
    get description() {
        return this._def.description
    }
    _getType(e) {
        return T(e.data)
    }
    _getOrReturnCtx(e, t) {
        return t || {
            common: e.parent.common,
            data: e.data,
            parsedType: T(e.data),
            schemaErrorMap: this._def.errorMap,
            path: e.path,
            parent: e.parent
        }
    }
    _processInputParams(e) {
        return {
            status: new P,
            ctx: {
                common: e.parent.common,
                data: e.data,
                parsedType: T(e.data),
                schemaErrorMap: this._def.errorMap,
                path: e.path,
                parent: e.parent
            }
        }
    }
    _parseSync(e) {
        const t = this._parse(e);
        if (D(t)) throw new Error("Synchronous parse encountered promise.");
        return t
    }
    _parseAsync(e) {
        const t = this._parse(e);
        return Promise.resolve(t)
    }
    parse(e, t) {
        const s = this.safeParse(e, t);
        if (s.success) return s.data;
        throw s.error
    }
    safeParse(e, t) {
        const s = {
                common: {
                    issues: [],
                    async: (null == t ? void 0 : t.async) ? ? !1,
                    contextualErrorMap: null == t ? void 0 : t.errorMap
                },
                path: (null == t ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: T(e)
            },
            a = this._parseSync({
                data: e,
                path: s.path,
                parent: s
            });
        return B(s, a)
    }
    "~validate" (e) {
        var t, s;
        const a = {
            common: {
                issues: [],
                async: !!this["~standard"].async
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: e,
            parsedType: T(e)
        };
        if (!this["~standard"].async) try {
            const t = this._parseSync({
                data: e,
                path: [],
                parent: a
            });
            return z(t) ? {
                value: t.value
            } : {
                issues: a.common.issues
            }
        } catch (r) {
            (null == (s = null == (t = null == r ? void 0 : r.message) ? void 0 : t.toLowerCase()) ? void 0 : s.includes("encountered")) && (this["~standard"].async = !0), a.common = {
                issues: [],
                async: !0
            }
        }
        return this._parseAsync({
            data: e,
            path: [],
            parent: a
        }).then(e => z(e) ? {
            value: e.value
        } : {
            issues: a.common.issues
        })
    }
    async parseAsync(e, t) {
        const s = await this.safeParseAsync(e, t);
        if (s.success) return s.data;
        throw s.error
    }
    async safeParseAsync(e, t) {
        const s = {
                common: {
                    issues: [],
                    contextualErrorMap: null == t ? void 0 : t.errorMap,
                    async: !0
                },
                path: (null == t ? void 0 : t.path) || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: e,
                parsedType: T(e)
            },
            a = this._parse({
                data: e,
                path: s.path,
                parent: s
            }),
            r = await (D(a) ? a : Promise.resolve(a));
        return B(s, r)
    }
    refine(e, t) {
        const s = e => "string" == typeof t || void 0 === t ? {
            message: t
        } : "function" == typeof t ? t(e) : t;
        return this._refinement((t, a) => {
            const r = e(t),
                n = () => a.addIssue({
                    code: O.custom,
                    ...s(t)
                });
            return "undefined" != typeof Promise && r instanceof Promise ? r.then(e => !!e || (n(), !1)) : !!r || (n(), !1)
        })
    }
    refinement(e, t) {
        return this._refinement((s, a) => !!e(s) || (a.addIssue("function" == typeof t ? t(s, a) : t), !1))
    }
    _refinement(e) {
        return new Be({
            schema: this,
            typeName: et.ZodEffects,
            effect: {
                type: "refinement",
                refinement: e
            }
        })
    }
    superRefine(e) {
        return this._refinement(e)
    }
    constructor(e) {
        this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: e => this["~validate"](e)
        }
    }
    optional() {
        return qe.create(this, this._def)
    }
    nullable() {
        return We.create(this, this._def)
    }
    nullish() {
        return this.nullable().optional()
    }
    array() {
        return Se.create(this)
    }
    promise() {
        return Ke.create(this, this._def)
    }
    or(e) {
        return Ee.create([this, e], this._def)
    }
    and(e) {
        return $e.create(this, e, this._def)
    }
    transform(e) {
        return new Be({ ...q(this._def),
            schema: this,
            typeName: et.ZodEffects,
            effect: {
                type: "transform",
                transform: e
            }
        })
    }
    default (e) {
        const t = "function" == typeof e ? e : () => e;
        return new Je({ ...q(this._def),
            innerType: this,
            defaultValue: t,
            typeName: et.ZodDefault
        })
    }
    brand() {
        return new Ge({
            typeName: et.ZodBranded,
            type: this,
            ...q(this._def)
        })
    } catch (e) {
        const t = "function" == typeof e ? e : () => e;
        return new He({ ...q(this._def),
            innerType: this,
            catchValue: t,
            typeName: et.ZodCatch
        })
    }
    describe(e) {
        return new(0, this.constructor)({ ...this._def,
            description: e
        })
    }
    pipe(e) {
        return Xe.create(this, e)
    }
    readonly() {
        return Qe.create(this)
    }
    isOptional() {
        return this.safeParse(void 0).success
    }
    isNullable() {
        return this.safeParse(null).success
    }
}
const J = /^c[^\s-]{8,}$/i,
    H = /^[0-9a-z]+$/,
    Y = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
    G = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    X = /^[a-z0-9_-]{21}$/i,
    Q = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
    ee = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    te = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
let se;
const ae = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    re = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    ne = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    ie = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    de = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    oe = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    ue = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    ce = new RegExp(`^${ue}$`);

function le(e) {
    let t = "[0-5]\\d";
    e.precision ? t = `${t}\\.\\d{${e.precision}}` : null == e.precision && (t = `${t}(\\.\\d+)?`);
    return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${e.precision?"+":"?"}`
}

function he(e) {
    return new RegExp(`^${le(e)}$`)
}

function me(e) {
    let t = `${ue}T${le(e)}`;
    const s = [];
    return s.push(e.local ? "Z?" : "Z"), e.offset && s.push("([+-]\\d{2}:?\\d{2})"), t = `${t}(${s.join("|")})`, new RegExp(`^${t}$`)
}

function pe(e, t) {
    return !("v4" !== t && t || !ae.test(e)) || !("v6" !== t && t || !ne.test(e))
}

function fe(e, t) {
    if (!Q.test(e)) return !1;
    try {
        const [s] = e.split(".");
        if (!s) return !1;
        const a = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(s.length + (4 - s.length % 4) % 4, "="),
            r = JSON.parse(atob(a));
        return "object" == typeof r && null !== r && ((!("typ" in r) || "JWT" === (null == r ? void 0 : r.typ)) && (!!r.alg && (!t || r.alg === t)))
    } catch {
        return !1
    }
}

function ve(e, t) {
    return !("v4" !== t && t || !re.test(e)) || !("v6" !== t && t || !ie.test(e))
}
class ge extends W {
    _parse(e) {
        this._def.coerce && (e.data = String(e.data));
        if (this._getType(e) !== C.string) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.string,
                received: t.parsedType
            }), $
        }
        const t = new P;
        let s;
        for (const a of this._def.checks)
            if ("min" === a.kind) e.data.length < a.value && (s = this._getOrReturnCtx(e, s), E(s, {
                code: O.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: a.message
            }), t.dirty());
            else if ("max" === a.kind) e.data.length > a.value && (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.too_big,
            maximum: a.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: a.message
        }), t.dirty());
        else if ("length" === a.kind) {
            const r = e.data.length > a.value,
                n = e.data.length < a.value;
            (r || n) && (s = this._getOrReturnCtx(e, s), r ? E(s, {
                code: O.too_big,
                maximum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message
            }) : n && E(s, {
                code: O.too_small,
                minimum: a.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: a.message
            }), t.dirty())
        } else if ("email" === a.kind) te.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "email",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("emoji" === a.kind) se || (se = new RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), se.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "emoji",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("uuid" === a.kind) G.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "uuid",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("nanoid" === a.kind) X.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "nanoid",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("cuid" === a.kind) J.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "cuid",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("cuid2" === a.kind) H.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "cuid2",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("ulid" === a.kind) Y.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "ulid",
            code: O.invalid_string,
            message: a.message
        }), t.dirty());
        else if ("url" === a.kind) try {
            new URL(e.data)
        } catch {
            s = this._getOrReturnCtx(e, s), E(s, {
                validation: "url",
                code: O.invalid_string,
                message: a.message
            }), t.dirty()
        } else if ("regex" === a.kind) {
            a.regex.lastIndex = 0;
            a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
                validation: "regex",
                code: O.invalid_string,
                message: a.message
            }), t.dirty())
        } else if ("trim" === a.kind) e.data = e.data.trim();
        else if ("includes" === a.kind) e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.invalid_string,
            validation: {
                includes: a.value,
                position: a.position
            },
            message: a.message
        }), t.dirty());
        else if ("toLowerCase" === a.kind) e.data = e.data.toLowerCase();
        else if ("toUpperCase" === a.kind) e.data = e.data.toUpperCase();
        else if ("startsWith" === a.kind) e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.invalid_string,
            validation: {
                startsWith: a.value
            },
            message: a.message
        }), t.dirty());
        else if ("endsWith" === a.kind) e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.invalid_string,
            validation: {
                endsWith: a.value
            },
            message: a.message
        }), t.dirty());
        else if ("datetime" === a.kind) {
            me(a).test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
                code: O.invalid_string,
                validation: "datetime",
                message: a.message
            }), t.dirty())
        } else if ("date" === a.kind) {
            ce.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
                code: O.invalid_string,
                validation: "date",
                message: a.message
            }), t.dirty())
        } else if ("time" === a.kind) {
            he(a).test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
                code: O.invalid_string,
                validation: "time",
                message: a.message
            }), t.dirty())
        } else "duration" === a.kind ? ee.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "duration",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : "ip" === a.kind ? pe(e.data, a.version) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "ip",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : "jwt" === a.kind ? fe(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "jwt",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : "cidr" === a.kind ? ve(e.data, a.version) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "cidr",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : "base64" === a.kind ? de.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "base64",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : "base64url" === a.kind ? oe.test(e.data) || (s = this._getOrReturnCtx(e, s), E(s, {
            validation: "base64url",
            code: O.invalid_string,
            message: a.message
        }), t.dirty()) : N.assertNever(a);
        return {
            status: t.value,
            value: e.data
        }
    }
    _regex(e, t, s) {
        return this.refinement(t => e.test(t), {
            validation: t,
            code: O.invalid_string,
            ...V.errToObj(s)
        })
    }
    _addCheck(e) {
        return new ge({ ...this._def,
            checks: [...this._def.checks, e]
        })
    }
    email(e) {
        return this._addCheck({
            kind: "email",
            ...V.errToObj(e)
        })
    }
    url(e) {
        return this._addCheck({
            kind: "url",
            ...V.errToObj(e)
        })
    }
    emoji(e) {
        return this._addCheck({
            kind: "emoji",
            ...V.errToObj(e)
        })
    }
    uuid(e) {
        return this._addCheck({
            kind: "uuid",
            ...V.errToObj(e)
        })
    }
    nanoid(e) {
        return this._addCheck({
            kind: "nanoid",
            ...V.errToObj(e)
        })
    }
    cuid(e) {
        return this._addCheck({
            kind: "cuid",
            ...V.errToObj(e)
        })
    }
    cuid2(e) {
        return this._addCheck({
            kind: "cuid2",
            ...V.errToObj(e)
        })
    }
    ulid(e) {
        return this._addCheck({
            kind: "ulid",
            ...V.errToObj(e)
        })
    }
    base64(e) {
        return this._addCheck({
            kind: "base64",
            ...V.errToObj(e)
        })
    }
    base64url(e) {
        return this._addCheck({
            kind: "base64url",
            ...V.errToObj(e)
        })
    }
    jwt(e) {
        return this._addCheck({
            kind: "jwt",
            ...V.errToObj(e)
        })
    }
    ip(e) {
        return this._addCheck({
            kind: "ip",
            ...V.errToObj(e)
        })
    }
    cidr(e) {
        return this._addCheck({
            kind: "cidr",
            ...V.errToObj(e)
        })
    }
    datetime(e) {
        return "string" == typeof e ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            local: !1,
            message: e
        }) : this._addCheck({
            kind: "datetime",
            precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
            offset: (null == e ? void 0 : e.offset) ? ? !1,
            local: (null == e ? void 0 : e.local) ? ? !1,
            ...V.errToObj(null == e ? void 0 : e.message)
        })
    }
    date(e) {
        return this._addCheck({
            kind: "date",
            message: e
        })
    }
    time(e) {
        return "string" == typeof e ? this._addCheck({
            kind: "time",
            precision: null,
            message: e
        }) : this._addCheck({
            kind: "time",
            precision: void 0 === (null == e ? void 0 : e.precision) ? null : null == e ? void 0 : e.precision,
            ...V.errToObj(null == e ? void 0 : e.message)
        })
    }
    duration(e) {
        return this._addCheck({
            kind: "duration",
            ...V.errToObj(e)
        })
    }
    regex(e, t) {
        return this._addCheck({
            kind: "regex",
            regex: e,
            ...V.errToObj(t)
        })
    }
    includes(e, t) {
        return this._addCheck({
            kind: "includes",
            value: e,
            position: null == t ? void 0 : t.position,
            ...V.errToObj(null == t ? void 0 : t.message)
        })
    }
    startsWith(e, t) {
        return this._addCheck({
            kind: "startsWith",
            value: e,
            ...V.errToObj(t)
        })
    }
    endsWith(e, t) {
        return this._addCheck({
            kind: "endsWith",
            value: e,
            ...V.errToObj(t)
        })
    }
    min(e, t) {
        return this._addCheck({
            kind: "min",
            value: e,
            ...V.errToObj(t)
        })
    }
    max(e, t) {
        return this._addCheck({
            kind: "max",
            value: e,
            ...V.errToObj(t)
        })
    }
    length(e, t) {
        return this._addCheck({
            kind: "length",
            value: e,
            ...V.errToObj(t)
        })
    }
    nonempty(e) {
        return this.min(1, V.errToObj(e))
    }
    trim() {
        return new ge({ ...this._def,
            checks: [...this._def.checks, {
                kind: "trim"
            }]
        })
    }
    toLowerCase() {
        return new ge({ ...this._def,
            checks: [...this._def.checks, {
                kind: "toLowerCase"
            }]
        })
    }
    toUpperCase() {
        return new ge({ ...this._def,
            checks: [...this._def.checks, {
                kind: "toUpperCase"
            }]
        })
    }
    get isDatetime() {
        return !!this._def.checks.find(e => "datetime" === e.kind)
    }
    get isDate() {
        return !!this._def.checks.find(e => "date" === e.kind)
    }
    get isTime() {
        return !!this._def.checks.find(e => "time" === e.kind)
    }
    get isDuration() {
        return !!this._def.checks.find(e => "duration" === e.kind)
    }
    get isEmail() {
        return !!this._def.checks.find(e => "email" === e.kind)
    }
    get isURL() {
        return !!this._def.checks.find(e => "url" === e.kind)
    }
    get isEmoji() {
        return !!this._def.checks.find(e => "emoji" === e.kind)
    }
    get isUUID() {
        return !!this._def.checks.find(e => "uuid" === e.kind)
    }
    get isNANOID() {
        return !!this._def.checks.find(e => "nanoid" === e.kind)
    }
    get isCUID() {
        return !!this._def.checks.find(e => "cuid" === e.kind)
    }
    get isCUID2() {
        return !!this._def.checks.find(e => "cuid2" === e.kind)
    }
    get isULID() {
        return !!this._def.checks.find(e => "ulid" === e.kind)
    }
    get isIP() {
        return !!this._def.checks.find(e => "ip" === e.kind)
    }
    get isCIDR() {
        return !!this._def.checks.find(e => "cidr" === e.kind)
    }
    get isBase64() {
        return !!this._def.checks.find(e => "base64" === e.kind)
    }
    get isBase64url() {
        return !!this._def.checks.find(e => "base64url" === e.kind)
    }
    get minLength() {
        let e = null;
        for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
        return e
    }
    get maxLength() {
        let e = null;
        for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
        return e
    }
}

function _e(e, t) {
    const s = (e.toString().split(".")[1] || "").length,
        a = (t.toString().split(".")[1] || "").length,
        r = s > a ? s : a;
    return Number.parseInt(e.toFixed(r).replace(".", "")) % Number.parseInt(t.toFixed(r).replace(".", "")) / 10 ** r
}
ge.create = e => new ge({
    checks: [],
    typeName: et.ZodString,
    coerce: (null == e ? void 0 : e.coerce) ? ? !1,
    ...q(e)
});
class ye extends W {
    constructor() {
        super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf
    }
    _parse(e) {
        this._def.coerce && (e.data = Number(e.data));
        if (this._getType(e) !== C.number) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.number,
                received: t.parsedType
            }), $
        }
        let t;
        const s = new P;
        for (const a of this._def.checks)
            if ("int" === a.kind) N.isInteger(e.data) || (t = this._getOrReturnCtx(e, t), E(t, {
                code: O.invalid_type,
                expected: "integer",
                received: "float",
                message: a.message
            }), s.dirty());
            else if ("min" === a.kind) {
            (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), E(t, {
                code: O.too_small,
                minimum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message
            }), s.dirty())
        } else if ("max" === a.kind) {
            (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), E(t, {
                code: O.too_big,
                maximum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message
            }), s.dirty())
        } else "multipleOf" === a.kind ? 0 !== _e(e.data, a.value) && (t = this._getOrReturnCtx(e, t), E(t, {
            code: O.not_multiple_of,
            multipleOf: a.value,
            message: a.message
        }), s.dirty()) : "finite" === a.kind ? Number.isFinite(e.data) || (t = this._getOrReturnCtx(e, t), E(t, {
            code: O.not_finite,
            message: a.message
        }), s.dirty()) : N.assertNever(a);
        return {
            status: s.value,
            value: e.data
        }
    }
    gte(e, t) {
        return this.setLimit("min", e, !0, V.toString(t))
    }
    gt(e, t) {
        return this.setLimit("min", e, !1, V.toString(t))
    }
    lte(e, t) {
        return this.setLimit("max", e, !0, V.toString(t))
    }
    lt(e, t) {
        return this.setLimit("max", e, !1, V.toString(t))
    }
    setLimit(e, t, s, a) {
        return new ye({ ...this._def,
            checks: [...this._def.checks, {
                kind: e,
                value: t,
                inclusive: s,
                message: V.toString(a)
            }]
        })
    }
    _addCheck(e) {
        return new ye({ ...this._def,
            checks: [...this._def.checks, e]
        })
    }
    int(e) {
        return this._addCheck({
            kind: "int",
            message: V.toString(e)
        })
    }
    positive(e) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: V.toString(e)
        })
    }
    negative(e) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: V.toString(e)
        })
    }
    nonpositive(e) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: V.toString(e)
        })
    }
    nonnegative(e) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: V.toString(e)
        })
    }
    multipleOf(e, t) {
        return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: V.toString(t)
        })
    }
    finite(e) {
        return this._addCheck({
            kind: "finite",
            message: V.toString(e)
        })
    }
    safe(e) {
        return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: V.toString(e)
        })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: V.toString(e)
        })
    }
    get minValue() {
        let e = null;
        for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
        return e
    }
    get maxValue() {
        let e = null;
        for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
        return e
    }
    get isInt() {
        return !!this._def.checks.find(e => "int" === e.kind || "multipleOf" === e.kind && N.isInteger(e.value))
    }
    get isFinite() {
        let e = null,
            t = null;
        for (const s of this._def.checks) {
            if ("finite" === s.kind || "int" === s.kind || "multipleOf" === s.kind) return !0;
            "min" === s.kind ? (null === t || s.value > t) && (t = s.value) : "max" === s.kind && (null === e || s.value < e) && (e = s.value)
        }
        return Number.isFinite(t) && Number.isFinite(e)
    }
}
ye.create = e => new ye({
    checks: [],
    typeName: et.ZodNumber,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...q(e)
});
class xe extends W {
    constructor() {
        super(...arguments), this.min = this.gte, this.max = this.lte
    }
    _parse(e) {
        if (this._def.coerce) try {
            e.data = BigInt(e.data)
        } catch {
            return this._getInvalidInput(e)
        }
        if (this._getType(e) !== C.bigint) return this._getInvalidInput(e);
        let t;
        const s = new P;
        for (const a of this._def.checks)
            if ("min" === a.kind) {
                (a.inclusive ? e.data < a.value : e.data <= a.value) && (t = this._getOrReturnCtx(e, t), E(t, {
                    code: O.too_small,
                    type: "bigint",
                    minimum: a.value,
                    inclusive: a.inclusive,
                    message: a.message
                }), s.dirty())
            } else if ("max" === a.kind) {
            (a.inclusive ? e.data > a.value : e.data >= a.value) && (t = this._getOrReturnCtx(e, t), E(t, {
                code: O.too_big,
                type: "bigint",
                maximum: a.value,
                inclusive: a.inclusive,
                message: a.message
            }), s.dirty())
        } else "multipleOf" === a.kind ? e.data % a.value !== BigInt(0) && (t = this._getOrReturnCtx(e, t), E(t, {
            code: O.not_multiple_of,
            multipleOf: a.value,
            message: a.message
        }), s.dirty()) : N.assertNever(a);
        return {
            status: s.value,
            value: e.data
        }
    }
    _getInvalidInput(e) {
        const t = this._getOrReturnCtx(e);
        return E(t, {
            code: O.invalid_type,
            expected: C.bigint,
            received: t.parsedType
        }), $
    }
    gte(e, t) {
        return this.setLimit("min", e, !0, V.toString(t))
    }
    gt(e, t) {
        return this.setLimit("min", e, !1, V.toString(t))
    }
    lte(e, t) {
        return this.setLimit("max", e, !0, V.toString(t))
    }
    lt(e, t) {
        return this.setLimit("max", e, !1, V.toString(t))
    }
    setLimit(e, t, s, a) {
        return new xe({ ...this._def,
            checks: [...this._def.checks, {
                kind: e,
                value: t,
                inclusive: s,
                message: V.toString(a)
            }]
        })
    }
    _addCheck(e) {
        return new xe({ ...this._def,
            checks: [...this._def.checks, e]
        })
    }
    positive(e) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: V.toString(e)
        })
    }
    negative(e) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: V.toString(e)
        })
    }
    nonpositive(e) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: V.toString(e)
        })
    }
    nonnegative(e) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: V.toString(e)
        })
    }
    multipleOf(e, t) {
        return this._addCheck({
            kind: "multipleOf",
            value: e,
            message: V.toString(t)
        })
    }
    get minValue() {
        let e = null;
        for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
        return e
    }
    get maxValue() {
        let e = null;
        for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
        return e
    }
}
xe.create = e => new xe({
    checks: [],
    typeName: et.ZodBigInt,
    coerce: (null == e ? void 0 : e.coerce) ? ? !1,
    ...q(e)
});
class ke extends W {
    _parse(e) {
        this._def.coerce && (e.data = Boolean(e.data));
        if (this._getType(e) !== C.boolean) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.boolean,
                received: t.parsedType
            }), $
        }
        return F(e.data)
    }
}
ke.create = e => new ke({
    typeName: et.ZodBoolean,
    coerce: (null == e ? void 0 : e.coerce) || !1,
    ...q(e)
});
class be extends W {
    _parse(e) {
        this._def.coerce && (e.data = new Date(e.data));
        if (this._getType(e) !== C.date) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.date,
                received: t.parsedType
            }), $
        }
        if (Number.isNaN(e.data.getTime())) {
            return E(this._getOrReturnCtx(e), {
                code: O.invalid_date
            }), $
        }
        const t = new P;
        let s;
        for (const a of this._def.checks) "min" === a.kind ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.too_small,
            message: a.message,
            inclusive: !0,
            exact: !1,
            minimum: a.value,
            type: "date"
        }), t.dirty()) : "max" === a.kind ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), E(s, {
            code: O.too_big,
            message: a.message,
            inclusive: !0,
            exact: !1,
            maximum: a.value,
            type: "date"
        }), t.dirty()) : N.assertNever(a);
        return {
            status: t.value,
            value: new Date(e.data.getTime())
        }
    }
    _addCheck(e) {
        return new be({ ...this._def,
            checks: [...this._def.checks, e]
        })
    }
    min(e, t) {
        return this._addCheck({
            kind: "min",
            value: e.getTime(),
            message: V.toString(t)
        })
    }
    max(e, t) {
        return this._addCheck({
            kind: "max",
            value: e.getTime(),
            message: V.toString(t)
        })
    }
    get minDate() {
        let e = null;
        for (const t of this._def.checks) "min" === t.kind && (null === e || t.value > e) && (e = t.value);
        return null != e ? new Date(e) : null
    }
    get maxDate() {
        let e = null;
        for (const t of this._def.checks) "max" === t.kind && (null === e || t.value < e) && (e = t.value);
        return null != e ? new Date(e) : null
    }
}
be.create = e => new be({
    checks: [],
    coerce: (null == e ? void 0 : e.coerce) || !1,
    typeName: et.ZodDate,
    ...q(e)
});
class we extends W {
    _parse(e) {
        if (this._getType(e) !== C.symbol) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.symbol,
                received: t.parsedType
            }), $
        }
        return F(e.data)
    }
}
we.create = e => new we({
    typeName: et.ZodSymbol,
    ...q(e)
});
class Ne extends W {
    _parse(e) {
        if (this._getType(e) !== C.undefined) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.undefined,
                received: t.parsedType
            }), $
        }
        return F(e.data)
    }
}
Ne.create = e => new Ne({
    typeName: et.ZodUndefined,
    ...q(e)
});
class je extends W {
    _parse(e) {
        if (this._getType(e) !== C.null) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.null,
                received: t.parsedType
            }), $
        }
        return F(e.data)
    }
}
je.create = e => new je({
    typeName: et.ZodNull,
    ...q(e)
});
class Ze extends W {
    constructor() {
        super(...arguments), this._any = !0
    }
    _parse(e) {
        return F(e.data)
    }
}
Ze.create = e => new Ze({
    typeName: et.ZodAny,
    ...q(e)
});
class Ce extends W {
    constructor() {
        super(...arguments), this._unknown = !0
    }
    _parse(e) {
        return F(e.data)
    }
}
Ce.create = e => new Ce({
    typeName: et.ZodUnknown,
    ...q(e)
});
class Te extends W {
    _parse(e) {
        const t = this._getOrReturnCtx(e);
        return E(t, {
            code: O.invalid_type,
            expected: C.never,
            received: t.parsedType
        }), $
    }
}
Te.create = e => new Te({
    typeName: et.ZodNever,
    ...q(e)
});
class Oe extends W {
    _parse(e) {
        if (this._getType(e) !== C.undefined) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.void,
                received: t.parsedType
            }), $
        }
        return F(e.data)
    }
}
Oe.create = e => new Oe({
    typeName: et.ZodVoid,
    ...q(e)
});
class Se extends W {
    _parse(e) {
        const {
            ctx: t,
            status: s
        } = this._processInputParams(e), a = this._def;
        if (t.parsedType !== C.array) return E(t, {
            code: O.invalid_type,
            expected: C.array,
            received: t.parsedType
        }), $;
        if (null !== a.exactLength) {
            const e = t.data.length > a.exactLength.value,
                r = t.data.length < a.exactLength.value;
            (e || r) && (E(t, {
                code: e ? O.too_big : O.too_small,
                minimum: r ? a.exactLength.value : void 0,
                maximum: e ? a.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: a.exactLength.message
            }), s.dirty())
        }
        if (null !== a.minLength && t.data.length < a.minLength.value && (E(t, {
                code: O.too_small,
                minimum: a.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: a.minLength.message
            }), s.dirty()), null !== a.maxLength && t.data.length > a.maxLength.value && (E(t, {
                code: O.too_big,
                maximum: a.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: a.maxLength.message
            }), s.dirty()), t.common.async) return Promise.all([...t.data].map((e, s) => a.type._parseAsync(new K(t, e, t.path, s)))).then(e => P.mergeArray(s, e));
        const r = [...t.data].map((e, s) => a.type._parseSync(new K(t, e, t.path, s)));
        return P.mergeArray(s, r)
    }
    get element() {
        return this._def.type
    }
    min(e, t) {
        return new Se({ ...this._def,
            minLength: {
                value: e,
                message: V.toString(t)
            }
        })
    }
    max(e, t) {
        return new Se({ ...this._def,
            maxLength: {
                value: e,
                message: V.toString(t)
            }
        })
    }
    length(e, t) {
        return new Se({ ...this._def,
            exactLength: {
                value: e,
                message: V.toString(t)
            }
        })
    }
    nonempty(e) {
        return this.min(1, e)
    }
}

function Ae(e) {
    if (e instanceof Ie) {
        const t = {};
        for (const s in e.shape) {
            const a = e.shape[s];
            t[s] = qe.create(Ae(a))
        }
        return new Ie({ ...e._def,
            shape: () => t
        })
    }
    return e instanceof Se ? new Se({ ...e._def,
        type: Ae(e.element)
    }) : e instanceof qe ? qe.create(Ae(e.unwrap())) : e instanceof We ? We.create(Ae(e.unwrap())) : e instanceof Re ? Re.create(e.items.map(e => Ae(e))) : e
}
Se.create = (e, t) => new Se({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: et.ZodArray,
    ...q(t)
});
class Ie extends W {
    constructor() {
        super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend
    }
    _getCached() {
        if (null !== this._cached) return this._cached;
        const e = this._def.shape(),
            t = N.objectKeys(e);
        return this._cached = {
            shape: e,
            keys: t
        }, this._cached
    }
    _parse(e) {
        if (this._getType(e) !== C.object) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.object,
                received: t.parsedType
            }), $
        }
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e), {
            shape: a,
            keys: r
        } = this._getCached(), n = [];
        if (!(this._def.catchall instanceof Te && "strip" === this._def.unknownKeys))
            for (const d in s.data) r.includes(d) || n.push(d);
        const i = [];
        for (const d of r) {
            const e = a[d],
                t = s.data[d];
            i.push({
                key: {
                    status: "valid",
                    value: d
                },
                value: e._parse(new K(s, t, s.path, d)),
                alwaysSet: d in s.data
            })
        }
        if (this._def.catchall instanceof Te) {
            const e = this._def.unknownKeys;
            if ("passthrough" === e)
                for (const t of n) i.push({
                    key: {
                        status: "valid",
                        value: t
                    },
                    value: {
                        status: "valid",
                        value: s.data[t]
                    }
                });
            else if ("strict" === e) n.length > 0 && (E(s, {
                code: O.unrecognized_keys,
                keys: n
            }), t.dirty());
            else if ("strip" !== e) throw new Error("Internal ZodObject error: invalid unknownKeys value.")
        } else {
            const e = this._def.catchall;
            for (const t of n) {
                const a = s.data[t];
                i.push({
                    key: {
                        status: "valid",
                        value: t
                    },
                    value: e._parse(new K(s, a, s.path, t)),
                    alwaysSet: t in s.data
                })
            }
        }
        return s.common.async ? Promise.resolve().then(async () => {
            const e = [];
            for (const t of i) {
                const s = await t.key,
                    a = await t.value;
                e.push({
                    key: s,
                    value: a,
                    alwaysSet: t.alwaysSet
                })
            }
            return e
        }).then(e => P.mergeObjectSync(t, e)) : P.mergeObjectSync(t, i)
    }
    get shape() {
        return this._def.shape()
    }
    strict(e) {
        return V.errToObj, new Ie({ ...this._def,
            unknownKeys: "strict",
            ...void 0 !== e ? {
                errorMap: (t, s) => {
                    var a, r;
                    const n = (null == (r = (a = this._def).errorMap) ? void 0 : r.call(a, t, s).message) ? ? s.defaultError;
                    return "unrecognized_keys" === t.code ? {
                        message: V.errToObj(e).message ? ? n
                    } : {
                        message: n
                    }
                }
            } : {}
        })
    }
    strip() {
        return new Ie({ ...this._def,
            unknownKeys: "strip"
        })
    }
    passthrough() {
        return new Ie({ ...this._def,
            unknownKeys: "passthrough"
        })
    }
    extend(e) {
        return new Ie({ ...this._def,
            shape: () => ({ ...this._def.shape(),
                ...e
            })
        })
    }
    merge(e) {
        return new Ie({
            unknownKeys: e._def.unknownKeys,
            catchall: e._def.catchall,
            shape: () => ({ ...this._def.shape(),
                ...e._def.shape()
            }),
            typeName: et.ZodObject
        })
    }
    setKey(e, t) {
        return this.augment({
            [e]: t
        })
    }
    catchall(e) {
        return new Ie({ ...this._def,
            catchall: e
        })
    }
    pick(e) {
        const t = {};
        for (const s of N.objectKeys(e)) e[s] && this.shape[s] && (t[s] = this.shape[s]);
        return new Ie({ ...this._def,
            shape: () => t
        })
    }
    omit(e) {
        const t = {};
        for (const s of N.objectKeys(this.shape)) e[s] || (t[s] = this.shape[s]);
        return new Ie({ ...this._def,
            shape: () => t
        })
    }
    deepPartial() {
        return Ae(this)
    }
    partial(e) {
        const t = {};
        for (const s of N.objectKeys(this.shape)) {
            const a = this.shape[s];
            e && !e[s] ? t[s] = a : t[s] = a.optional()
        }
        return new Ie({ ...this._def,
            shape: () => t
        })
    }
    required(e) {
        const t = {};
        for (const s of N.objectKeys(this.shape))
            if (e && !e[s]) t[s] = this.shape[s];
            else {
                let e = this.shape[s];
                for (; e instanceof qe;) e = e._def.innerType;
                t[s] = e
            }
        return new Ie({ ...this._def,
            shape: () => t
        })
    }
    keyof() {
        return De(N.objectKeys(this.shape))
    }
}
Ie.create = (e, t) => new Ie({
    shape: () => e,
    unknownKeys: "strip",
    catchall: Te.create(),
    typeName: et.ZodObject,
    ...q(t)
}), Ie.strictCreate = (e, t) => new Ie({
    shape: () => e,
    unknownKeys: "strict",
    catchall: Te.create(),
    typeName: et.ZodObject,
    ...q(t)
}), Ie.lazycreate = (e, t) => new Ie({
    shape: e,
    unknownKeys: "strip",
    catchall: Te.create(),
    typeName: et.ZodObject,
    ...q(t)
});
class Ee extends W {
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e), s = this._def.options;
        if (t.common.async) return Promise.all(s.map(async e => {
            const s = { ...t,
                common: { ...t.common,
                    issues: []
                },
                parent: null
            };
            return {
                result: await e._parseAsync({
                    data: t.data,
                    path: t.path,
                    parent: s
                }),
                ctx: s
            }
        })).then(function(e) {
            for (const t of e)
                if ("valid" === t.result.status) return t.result;
            for (const a of e)
                if ("dirty" === a.result.status) return t.common.issues.push(...a.ctx.common.issues), a.result;
            const s = e.map(e => new S(e.ctx.common.issues));
            return E(t, {
                code: O.invalid_union,
                unionErrors: s
            }), $
        }); {
            let e;
            const a = [];
            for (const n of s) {
                const s = { ...t,
                        common: { ...t.common,
                            issues: []
                        },
                        parent: null
                    },
                    r = n._parseSync({
                        data: t.data,
                        path: t.path,
                        parent: s
                    });
                if ("valid" === r.status) return r;
                "dirty" !== r.status || e || (e = {
                    result: r,
                    ctx: s
                }), s.common.issues.length && a.push(s.common.issues)
            }
            if (e) return t.common.issues.push(...e.ctx.common.issues), e.result;
            const r = a.map(e => new S(e));
            return E(t, {
                code: O.invalid_union,
                unionErrors: r
            }), $
        }
    }
    get options() {
        return this._def.options
    }
}

function Pe(e, t) {
    const s = T(e),
        a = T(t);
    if (e === t) return {
        valid: !0,
        data: e
    };
    if (s === C.object && a === C.object) {
        const s = N.objectKeys(t),
            a = N.objectKeys(e).filter(e => -1 !== s.indexOf(e)),
            r = { ...e,
                ...t
            };
        for (const n of a) {
            const s = Pe(e[n], t[n]);
            if (!s.valid) return {
                valid: !1
            };
            r[n] = s.data
        }
        return {
            valid: !0,
            data: r
        }
    }
    if (s === C.array && a === C.array) {
        if (e.length !== t.length) return {
            valid: !1
        };
        const s = [];
        for (let a = 0; a < e.length; a++) {
            const r = Pe(e[a], t[a]);
            if (!r.valid) return {
                valid: !1
            };
            s.push(r.data)
        }
        return {
            valid: !0,
            data: s
        }
    }
    return s === C.date && a === C.date && +e === +t ? {
        valid: !0,
        data: e
    } : {
        valid: !1
    }
}
Ee.create = (e, t) => new Ee({
    options: e,
    typeName: et.ZodUnion,
    ...q(t)
});
class $e extends W {
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e), a = (e, a) => {
            if (L(e) || L(a)) return $;
            const r = Pe(e.value, a.value);
            return r.valid ? ((M(e) || M(a)) && t.dirty(), {
                status: t.value,
                value: r.data
            }) : (E(s, {
                code: O.invalid_intersection_types
            }), $)
        };
        return s.common.async ? Promise.all([this._def.left._parseAsync({
            data: s.data,
            path: s.path,
            parent: s
        }), this._def.right._parseAsync({
            data: s.data,
            path: s.path,
            parent: s
        })]).then(([e, t]) => a(e, t)) : a(this._def.left._parseSync({
            data: s.data,
            path: s.path,
            parent: s
        }), this._def.right._parseSync({
            data: s.data,
            path: s.path,
            parent: s
        }))
    }
}
$e.create = (e, t, s) => new $e({
    left: e,
    right: t,
    typeName: et.ZodIntersection,
    ...q(s)
});
class Re extends W {
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e);
        if (s.parsedType !== C.array) return E(s, {
            code: O.invalid_type,
            expected: C.array,
            received: s.parsedType
        }), $;
        if (s.data.length < this._def.items.length) return E(s, {
            code: O.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array"
        }), $;
        !this._def.rest && s.data.length > this._def.items.length && (E(s, {
            code: O.too_big,
            maximum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array"
        }), t.dirty());
        const a = [...s.data].map((e, t) => {
            const a = this._def.items[t] || this._def.rest;
            return a ? a._parse(new K(s, e, s.path, t)) : null
        }).filter(e => !!e);
        return s.common.async ? Promise.all(a).then(e => P.mergeArray(t, e)) : P.mergeArray(t, a)
    }
    get items() {
        return this._def.items
    }
    rest(e) {
        return new Re({ ...this._def,
            rest: e
        })
    }
}
Re.create = (e, t) => {
    if (!Array.isArray(e)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new Re({
        items: e,
        typeName: et.ZodTuple,
        rest: null,
        ...q(t)
    })
};
class Fe extends W {
    get keySchema() {
        return this._def.keyType
    }
    get valueSchema() {
        return this._def.valueType
    }
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e);
        if (s.parsedType !== C.map) return E(s, {
            code: O.invalid_type,
            expected: C.map,
            received: s.parsedType
        }), $;
        const a = this._def.keyType,
            r = this._def.valueType,
            n = [...s.data.entries()].map(([e, t], n) => ({
                key: a._parse(new K(s, e, s.path, [n, "key"])),
                value: r._parse(new K(s, t, s.path, [n, "value"]))
            }));
        if (s.common.async) {
            const e = new Map;
            return Promise.resolve().then(async () => {
                for (const s of n) {
                    const a = await s.key,
                        r = await s.value;
                    if ("aborted" === a.status || "aborted" === r.status) return $;
                    "dirty" !== a.status && "dirty" !== r.status || t.dirty(), e.set(a.value, r.value)
                }
                return {
                    status: t.value,
                    value: e
                }
            })
        } {
            const e = new Map;
            for (const s of n) {
                const a = s.key,
                    r = s.value;
                if ("aborted" === a.status || "aborted" === r.status) return $;
                "dirty" !== a.status && "dirty" !== r.status || t.dirty(), e.set(a.value, r.value)
            }
            return {
                status: t.value,
                value: e
            }
        }
    }
}
Fe.create = (e, t, s) => new Fe({
    valueType: t,
    keyType: e,
    typeName: et.ZodMap,
    ...q(s)
});
class Le extends W {
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e);
        if (s.parsedType !== C.set) return E(s, {
            code: O.invalid_type,
            expected: C.set,
            received: s.parsedType
        }), $;
        const a = this._def;
        null !== a.minSize && s.data.size < a.minSize.value && (E(s, {
            code: O.too_small,
            minimum: a.minSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: a.minSize.message
        }), t.dirty()), null !== a.maxSize && s.data.size > a.maxSize.value && (E(s, {
            code: O.too_big,
            maximum: a.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: a.maxSize.message
        }), t.dirty());
        const r = this._def.valueType;

        function n(e) {
            const s = new Set;
            for (const a of e) {
                if ("aborted" === a.status) return $;
                "dirty" === a.status && t.dirty(), s.add(a.value)
            }
            return {
                status: t.value,
                value: s
            }
        }
        const i = [...s.data.values()].map((e, t) => r._parse(new K(s, e, s.path, t)));
        return s.common.async ? Promise.all(i).then(e => n(e)) : n(i)
    }
    min(e, t) {
        return new Le({ ...this._def,
            minSize: {
                value: e,
                message: V.toString(t)
            }
        })
    }
    max(e, t) {
        return new Le({ ...this._def,
            maxSize: {
                value: e,
                message: V.toString(t)
            }
        })
    }
    size(e, t) {
        return this.min(e, t).max(e, t)
    }
    nonempty(e) {
        return this.min(1, e)
    }
}
Le.create = (e, t) => new Le({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: et.ZodSet,
    ...q(t)
});
class Me extends W {
    get schema() {
        return this._def.getter()
    }
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e);
        return this._def.getter()._parse({
            data: t.data,
            path: t.path,
            parent: t
        })
    }
}
Me.create = (e, t) => new Me({
    getter: e,
    typeName: et.ZodLazy,
    ...q(t)
});
class ze extends W {
    _parse(e) {
        if (e.data !== this._def.value) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                received: t.data,
                code: O.invalid_literal,
                expected: this._def.value
            }), $
        }
        return {
            status: "valid",
            value: e.data
        }
    }
    get value() {
        return this._def.value
    }
}

function De(e, t) {
    return new Ve({
        values: e,
        typeName: et.ZodEnum,
        ...q(t)
    })
}
ze.create = (e, t) => new ze({
    value: e,
    typeName: et.ZodLiteral,
    ...q(t)
});
class Ve extends W {
    _parse(e) {
        if ("string" != typeof e.data) {
            const t = this._getOrReturnCtx(e),
                s = this._def.values;
            return E(t, {
                expected: N.joinValues(s),
                received: t.parsedType,
                code: O.invalid_type
            }), $
        }
        if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
            const t = this._getOrReturnCtx(e),
                s = this._def.values;
            return E(t, {
                received: t.data,
                code: O.invalid_enum_value,
                options: s
            }), $
        }
        return F(e.data)
    }
    get options() {
        return this._def.values
    }
    get enum() {
        const e = {};
        for (const t of this._def.values) e[t] = t;
        return e
    }
    get Values() {
        const e = {};
        for (const t of this._def.values) e[t] = t;
        return e
    }
    get Enum() {
        const e = {};
        for (const t of this._def.values) e[t] = t;
        return e
    }
    extract(e, t = this._def) {
        return Ve.create(e, { ...this._def,
            ...t
        })
    }
    exclude(e, t = this._def) {
        return Ve.create(this.options.filter(t => !e.includes(t)), { ...this._def,
            ...t
        })
    }
}
Ve.create = De;
class Ue extends W {
    _parse(e) {
        const t = N.getValidEnumValues(this._def.values),
            s = this._getOrReturnCtx(e);
        if (s.parsedType !== C.string && s.parsedType !== C.number) {
            const e = N.objectValues(t);
            return E(s, {
                expected: N.joinValues(e),
                received: s.parsedType,
                code: O.invalid_type
            }), $
        }
        if (this._cache || (this._cache = new Set(N.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
            const e = N.objectValues(t);
            return E(s, {
                received: s.data,
                code: O.invalid_enum_value,
                options: e
            }), $
        }
        return F(e.data)
    }
    get enum() {
        return this._def.values
    }
}
Ue.create = (e, t) => new Ue({
    values: e,
    typeName: et.ZodNativeEnum,
    ...q(t)
});
class Ke extends W {
    unwrap() {
        return this._def.type
    }
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e);
        if (t.parsedType !== C.promise && !1 === t.common.async) return E(t, {
            code: O.invalid_type,
            expected: C.promise,
            received: t.parsedType
        }), $;
        const s = t.parsedType === C.promise ? t.data : Promise.resolve(t.data);
        return F(s.then(e => this._def.type.parseAsync(e, {
            path: t.path,
            errorMap: t.common.contextualErrorMap
        })))
    }
}
Ke.create = (e, t) => new Ke({
    type: e,
    typeName: et.ZodPromise,
    ...q(t)
});
class Be extends W {
    innerType() {
        return this._def.schema
    }
    sourceType() {
        return this._def.schema._def.typeName === et.ZodEffects ? this._def.schema.sourceType() : this._def.schema
    }
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e), a = this._def.effect || null, r = {
            addIssue: e => {
                E(s, e), e.fatal ? t.abort() : t.dirty()
            },
            get path() {
                return s.path
            }
        };
        if (r.addIssue = r.addIssue.bind(r), "preprocess" === a.type) {
            const e = a.transform(s.data, r);
            if (s.common.async) return Promise.resolve(e).then(async e => {
                if ("aborted" === t.value) return $;
                const a = await this._def.schema._parseAsync({
                    data: e,
                    path: s.path,
                    parent: s
                });
                return "aborted" === a.status ? $ : "dirty" === a.status || "dirty" === t.value ? R(a.value) : a
            }); {
                if ("aborted" === t.value) return $;
                const a = this._def.schema._parseSync({
                    data: e,
                    path: s.path,
                    parent: s
                });
                return "aborted" === a.status ? $ : "dirty" === a.status || "dirty" === t.value ? R(a.value) : a
            }
        }
        if ("refinement" === a.type) {
            const e = e => {
                const t = a.refinement(e, r);
                if (s.common.async) return Promise.resolve(t);
                if (t instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                return e
            };
            if (!1 === s.common.async) {
                const a = this._def.schema._parseSync({
                    data: s.data,
                    path: s.path,
                    parent: s
                });
                return "aborted" === a.status ? $ : ("dirty" === a.status && t.dirty(), e(a.value), {
                    status: t.value,
                    value: a.value
                })
            }
            return this._def.schema._parseAsync({
                data: s.data,
                path: s.path,
                parent: s
            }).then(s => "aborted" === s.status ? $ : ("dirty" === s.status && t.dirty(), e(s.value).then(() => ({
                status: t.value,
                value: s.value
            }))))
        }
        if ("transform" === a.type) {
            if (!1 === s.common.async) {
                const e = this._def.schema._parseSync({
                    data: s.data,
                    path: s.path,
                    parent: s
                });
                if (!z(e)) return $;
                const n = a.transform(e.value, r);
                if (n instanceof Promise) throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
                return {
                    status: t.value,
                    value: n
                }
            }
            return this._def.schema._parseAsync({
                data: s.data,
                path: s.path,
                parent: s
            }).then(e => z(e) ? Promise.resolve(a.transform(e.value, r)).then(e => ({
                status: t.value,
                value: e
            })) : $)
        }
        N.assertNever(a)
    }
}
Be.create = (e, t, s) => new Be({
    schema: e,
    typeName: et.ZodEffects,
    effect: t,
    ...q(s)
}), Be.createWithPreprocess = (e, t, s) => new Be({
    schema: t,
    effect: {
        type: "preprocess",
        transform: e
    },
    typeName: et.ZodEffects,
    ...q(s)
});
class qe extends W {
    _parse(e) {
        return this._getType(e) === C.undefined ? F(void 0) : this._def.innerType._parse(e)
    }
    unwrap() {
        return this._def.innerType
    }
}
qe.create = (e, t) => new qe({
    innerType: e,
    typeName: et.ZodOptional,
    ...q(t)
});
class We extends W {
    _parse(e) {
        return this._getType(e) === C.null ? F(null) : this._def.innerType._parse(e)
    }
    unwrap() {
        return this._def.innerType
    }
}
We.create = (e, t) => new We({
    innerType: e,
    typeName: et.ZodNullable,
    ...q(t)
});
class Je extends W {
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e);
        let s = t.data;
        return t.parsedType === C.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
            data: s,
            path: t.path,
            parent: t
        })
    }
    removeDefault() {
        return this._def.innerType
    }
}
Je.create = (e, t) => new Je({
    innerType: e,
    typeName: et.ZodDefault,
    defaultValue: "function" == typeof t.default ? t.default : () => t.default,
    ...q(t)
});
class He extends W {
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e), s = { ...t,
            common: { ...t.common,
                issues: []
            }
        }, a = this._def.innerType._parse({
            data: s.data,
            path: s.path,
            parent: { ...s
            }
        });
        return D(a) ? a.then(e => ({
            status: "valid",
            value: "valid" === e.status ? e.value : this._def.catchValue({
                get error() {
                    return new S(s.common.issues)
                },
                input: s.data
            })
        })) : {
            status: "valid",
            value: "valid" === a.status ? a.value : this._def.catchValue({
                get error() {
                    return new S(s.common.issues)
                },
                input: s.data
            })
        }
    }
    removeCatch() {
        return this._def.innerType
    }
}
He.create = (e, t) => new He({
    innerType: e,
    typeName: et.ZodCatch,
    catchValue: "function" == typeof t.catch ? t.catch : () => t.catch,
    ...q(t)
});
class Ye extends W {
    _parse(e) {
        if (this._getType(e) !== C.nan) {
            const t = this._getOrReturnCtx(e);
            return E(t, {
                code: O.invalid_type,
                expected: C.nan,
                received: t.parsedType
            }), $
        }
        return {
            status: "valid",
            value: e.data
        }
    }
}
Ye.create = e => new Ye({
    typeName: et.ZodNaN,
    ...q(e)
});
class Ge extends W {
    _parse(e) {
        const {
            ctx: t
        } = this._processInputParams(e), s = t.data;
        return this._def.type._parse({
            data: s,
            path: t.path,
            parent: t
        })
    }
    unwrap() {
        return this._def.type
    }
}
class Xe extends W {
    _parse(e) {
        const {
            status: t,
            ctx: s
        } = this._processInputParams(e);
        if (s.common.async) {
            return (async () => {
                const e = await this._def.in._parseAsync({
                    data: s.data,
                    path: s.path,
                    parent: s
                });
                return "aborted" === e.status ? $ : "dirty" === e.status ? (t.dirty(), R(e.value)) : this._def.out._parseAsync({
                    data: e.value,
                    path: s.path,
                    parent: s
                })
            })()
        } {
            const e = this._def.in._parseSync({
                data: s.data,
                path: s.path,
                parent: s
            });
            return "aborted" === e.status ? $ : "dirty" === e.status ? (t.dirty(), {
                status: "dirty",
                value: e.value
            }) : this._def.out._parseSync({
                data: e.value,
                path: s.path,
                parent: s
            })
        }
    }
    static create(e, t) {
        return new Xe({ in: e,
            out: t,
            typeName: et.ZodPipeline
        })
    }
}
class Qe extends W {
    _parse(e) {
        const t = this._def.innerType._parse(e),
            s = e => (z(e) && (e.value = Object.freeze(e.value)), e);
        return D(t) ? t.then(e => s(e)) : s(t)
    }
    unwrap() {
        return this._def.innerType
    }
}
var et, tt;
Qe.create = (e, t) => new Qe({
    innerType: e,
    typeName: et.ZodReadonly,
    ...q(t)
}), Ie.lazycreate, (tt = et || (et = {})).ZodString = "ZodString", tt.ZodNumber = "ZodNumber", tt.ZodNaN = "ZodNaN", tt.ZodBigInt = "ZodBigInt", tt.ZodBoolean = "ZodBoolean", tt.ZodDate = "ZodDate", tt.ZodSymbol = "ZodSymbol", tt.ZodUndefined = "ZodUndefined", tt.ZodNull = "ZodNull", tt.ZodAny = "ZodAny", tt.ZodUnknown = "ZodUnknown", tt.ZodNever = "ZodNever", tt.ZodVoid = "ZodVoid", tt.ZodArray = "ZodArray", tt.ZodObject = "ZodObject", tt.ZodUnion = "ZodUnion", tt.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", tt.ZodIntersection = "ZodIntersection", tt.ZodTuple = "ZodTuple", tt.ZodRecord = "ZodRecord", tt.ZodMap = "ZodMap", tt.ZodSet = "ZodSet", tt.ZodFunction = "ZodFunction", tt.ZodLazy = "ZodLazy", tt.ZodLiteral = "ZodLiteral", tt.ZodEnum = "ZodEnum", tt.ZodEffects = "ZodEffects", tt.ZodNativeEnum = "ZodNativeEnum", tt.ZodOptional = "ZodOptional", tt.ZodNullable = "ZodNullable", tt.ZodDefault = "ZodDefault", tt.ZodCatch = "ZodCatch", tt.ZodPromise = "ZodPromise", tt.ZodBranded = "ZodBranded", tt.ZodPipeline = "ZodPipeline", tt.ZodReadonly = "ZodReadonly";
const st = ge.create;
Te.create, Se.create;
const at = Ie.create;
Ie.strictCreate, Ee.create, $e.create, Re.create, Ve.create, Ke.create, qe.create, We.create;
const rt = () => {
    const {
        t: n,
        isRTL: N,
        language: j
    } = i(), [Z] = t(), [C, T] = s.useState("signup" !== Z.get("mode")), [O, A] = s.useState(!1), [I, E] = s.useState(""), [P, $] = s.useState(""), [R, F] = s.useState(""), [L, M] = s.useState(""), [z, D] = s.useState(""), [V, U] = s.useState({}), K = a(), {
        toast: B
    } = d(), q = at({
        email: st().email(n("auth.validation.emailInvalid")),
        password: st().min(6, n("auth.validation.passwordMin"))
    }), W = q.extend({
        fullName: st().min(2, n("auth.validation.nameMin")),
        phone: st().min(8, "ar" === j ? "رقم الهاتف مطلوب (8 أرقام على الأقل)" : "Phone number required (min 8 digits)").max(20).regex(/^[\d\s\+\-\(\)]+$/, "ar" === j ? "رقم هاتف غير صالح" : "Invalid phone number"),
        confirmPassword: st()
    }).refine(e => e.password === e.confirmPassword, {
        message: n("auth.validation.passwordMismatch"),
        path: ["confirmPassword"]
    });
    s.useEffect(() => {
        const {
            data: {
                subscription: e
            }
        } = o.auth.onAuthStateChange((e, t) => {
            (null == t ? void 0 : t.user) && K("/dashboard")
        });
        return o.auth.getSession().then(({
            data: {
                session: e
            }
        }) => {
            (null == e ? void 0 : e.user) && K("/dashboard")
        }), () => e.unsubscribe()
    }, [K]);
    const J = N ? b : m,
        H = N ? "right-3" : "left-3",
        Y = N ? "pr-10" : "pl-10";
    return e.jsxs("div", {
        className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden",
        dir: N ? "rtl" : "ltr",
        children: [e.jsx("div", {
            className: "absolute inset-0 bg-hero-pattern"
        }), e.jsx("div", {
            className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
        }), e.jsxs(p, {
            className: "w-full max-w-md glass-card border-border/50 relative z-10",
            children: [e.jsxs(f, {
                className: "text-center",
                children: [e.jsxs(r, {
                    to: "/",
                    className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors",
                    children: [e.jsx(J, {
                        className: "h-4 w-4"
                    }), n("auth.backToHome")]
                }), e.jsxs("div", {
                    className: "flex items-center justify-center gap-3 mb-4",
                    children: [e.jsx("div", {
                        className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center glow-primary",
                        children: e.jsx(u, {
                            className: "h-7 w-7 text-primary-foreground"
                        })
                    }), e.jsx("span", {
                        className: "text-2xl font-bold text-foreground",
                        children: "iBlockchain"
                    })]
                }), e.jsx(v, {
                    className: "text-2xl text-foreground",
                    children: n(C ? "auth.login" : "auth.signup")
                }), e.jsx(g, {
                    className: "text-muted-foreground",
                    children: n(C ? "auth.loginDesc" : "auth.signupDesc")
                })]
            }), e.jsxs(_, {
                children: [e.jsxs("form", {
                    onSubmit: C ? async e => {
                        e.preventDefault(), U({});
                        try {
                            q.parse({
                                email: I,
                                password: P
                            })
                        } catch (s) {
                            if (s instanceof S) {
                                const e = {};
                                return s.errors.forEach(t => {
                                    t.path[0] && (e[t.path[0]] = t.message)
                                }), void U(e)
                            }
                        }
                        A(!0);
                        const {
                            error: t
                        } = await o.auth.signInWithPassword({
                            email: I,
                            password: P
                        });
                        B(t ? {
                            title: n("auth.loginError"),
                            description: "Invalid login credentials" === t.message ? n("auth.invalidCredentials") : t.message,
                            variant: "destructive"
                        } : {
                            title: n("auth.welcomeBack"),
                            description: n("auth.loginSuccess")
                        }), A(!1)
                    } : async e => {
                        e.preventDefault(), U({});
                        try {
                            W.parse({
                                email: I,
                                password: P,
                                confirmPassword: R,
                                fullName: L,
                                phone: z
                            })
                        } catch (t) {
                            if (t instanceof S) {
                                const e = {};
                                return t.errors.forEach(t => {
                                    t.path[0] && (e[t.path[0]] = t.message)
                                }), void U(e)
                            }
                        }
                        A(!0);
                        try {
                            const e = Math.floor(1e5 + 9e5 * Math.random()).toString(),
                                {
                                    error: t
                                } = await o.functions.invoke("send-verification-code", {
                                    body: {
                                        email: I,
                                        code: e,
                                        password: P,
                                        fullName: L,
                                        phone: z,
                                        language: j
                                    }
                                });
                            if (t) throw t;
                            sessionStorage.setItem("pendingVerificationEmail", I), B({
                                title: n("verify.codeSentAgain"),
                                description: n("verify.checkEmail")
                            }), K(`/verify-email?email=${encodeURIComponent(I)}`)
                        } catch (t) {
                            B({
                                title: n("verify.sendError"),
                                description: t.message || "Failed to send verification code",
                                variant: "destructive"
                            })
                        } finally {
                            A(!1)
                        }
                    },
                    className: "space-y-4",
                    children: [!C && e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(y, {
                            htmlFor: "fullName",
                            children: n("auth.fullName")
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(x, {
                                className: `absolute ${H} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(c, {
                                id: "fullName",
                                placeholder: n("auth.fullNamePlaceholder"),
                                value: L,
                                onChange: e => M(e.target.value),
                                className: Y,
                                required: !0
                            })]
                        }), V.fullName && e.jsx("p", {
                            className: "text-sm text-destructive",
                            children: V.fullName
                        })]
                    }), !C && e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(y, {
                            htmlFor: "phone",
                            children: "ar" === j ? "رقم الهاتف" : "Phone Number"
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(w, {
                                className: `absolute ${H} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(c, {
                                id: "phone",
                                type: "tel",
                                placeholder: "+1234567890",
                                value: z,
                                onChange: e => D(e.target.value),
                                className: Y,
                                dir: "ltr",
                                required: !0
                            })]
                        }), V.phone && e.jsx("p", {
                            className: "text-sm text-destructive",
                            children: V.phone
                        })]
                    }), e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(y, {
                            htmlFor: "email",
                            children: n("auth.email")
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(k, {
                                className: `absolute ${H} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(c, {
                                id: "email",
                                type: "email",
                                placeholder: "example@email.com",
                                value: I,
                                onChange: e => E(e.target.value),
                                className: Y,
                                required: !0
                            })]
                        }), V.email && e.jsx("p", {
                            className: "text-sm text-destructive",
                            children: V.email
                        })]
                    }), e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(y, {
                            htmlFor: "password",
                            children: n("auth.password")
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(l, {
                                className: `absolute ${H} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(c, {
                                id: "password",
                                type: "password",
                                placeholder: "••••••••",
                                value: P,
                                onChange: e => $(e.target.value),
                                className: Y,
                                required: !0
                            })]
                        }), V.password && e.jsx("p", {
                            className: "text-sm text-destructive",
                            children: V.password
                        })]
                    }), !C && e.jsxs("div", {
                        className: "space-y-2",
                        children: [e.jsx(y, {
                            htmlFor: "confirmPassword",
                            children: n("auth.confirmPassword")
                        }), e.jsxs("div", {
                            className: "relative",
                            children: [e.jsx(l, {
                                className: `absolute ${H} top-3 h-4 w-4 text-muted-foreground`
                            }), e.jsx(c, {
                                id: "confirmPassword",
                                type: "password",
                                placeholder: "••••••••",
                                value: R,
                                onChange: e => F(e.target.value),
                                className: Y,
                                required: !0
                            })]
                        }), V.confirmPassword && e.jsx("p", {
                            className: "text-sm text-destructive",
                            children: V.confirmPassword
                        })]
                    }), e.jsx(h, {
                        type: "submit",
                        className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary",
                        disabled: O,
                        children: n(O ? "auth.loading" : C ? "auth.login" : "auth.signup")
                    })]
                }), C && e.jsx("div", {
                    className: "mt-3 text-center",
                    children: e.jsx(r, {
                        to: "/forgot-password",
                        className: "text-primary hover:underline text-sm",
                        children: n("auth.forgotPassword")
                    })
                }), e.jsx("div", {
                    className: "mt-4 text-center",
                    children: e.jsx("button", {
                        type: "button",
                        onClick: () => {
                            T(!C), U({})
                        },
                        className: "text-primary hover:underline text-sm",
                        children: n(C ? "auth.noAccount" : "auth.hasAccount")
                    })
                })]
            })]
        })]
    })
};
export {
    rt as
    default
};