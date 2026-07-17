function e(e) {
    const t = Object.prototype.toString.call(e);
    return e instanceof Date || "object" == typeof e && "[object Date]" === t ? new e.constructor(+e) : "number" == typeof e || "[object Number]" === t || "string" == typeof e || "[object String]" === t ? new Date(e) : new Date(NaN)
}

function t(e, t) {
    return e instanceof Date ? new e.constructor(t) : new Date(t)
}
const n = 6048e5,
    a = 864e5,
    o = 43200,
    i = 1440;
let r = {};

function d() {
    return r
}

function u(t) {
    const n = e(t),
        a = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds()));
    return a.setUTCFullYear(n.getFullYear()), +t - +a
}
const s = {
    lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
    },
    xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
    },
    xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
    },
    aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
    },
    xHours: {
        one: "1 hour",
        other: "{{count}} hours"
    },
    xDays: {
        one: "1 day",
        other: "{{count}} days"
    },
    aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks"
    },
    xWeeks: {
        one: "1 week",
        other: "{{count}} weeks"
    },
    aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
    },
    xMonths: {
        one: "1 month",
        other: "{{count}} months"
    },
    aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
    },
    xYears: {
        one: "1 year",
        other: "{{count}} years"
    },
    overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
    },
    almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
    }
};

function h(e) {
    return (t = {}) => {
        const n = t.width ? String(t.width) : e.defaultWidth;
        return e.formats[n] || e.formats[e.defaultWidth]
    }
}
const m = {
        date: h({
            formats: {
                full: "EEEE, MMMM do, y",
                long: "MMMM do, y",
                medium: "MMM d, y",
                short: "MM/dd/yyyy"
            },
            defaultWidth: "full"
        }),
        time: h({
            formats: {
                full: "h:mm:ss a zzzz",
                long: "h:mm:ss a z",
                medium: "h:mm:ss a",
                short: "h:mm a"
            },
            defaultWidth: "full"
        }),
        dateTime: h({
            formats: {
                full: "{{date}} 'at' {{time}}",
                long: "{{date}} 'at' {{time}}",
                medium: "{{date}}, {{time}}",
                short: "{{date}}, {{time}}"
            },
            defaultWidth: "full"
        })
    },
    l = {
        lastWeek: "'last' eeee 'at' p",
        yesterday: "'yesterday at' p",
        today: "'today at' p",
        tomorrow: "'tomorrow at' p",
        nextWeek: "eeee 'at' p",
        other: "P"
    };

function c(e) {
    return (t, n) => {
        let a;
        if ("formatting" === ((null == n ? void 0 : n.context) ? String(n.context) : "standalone") && e.formattingValues) {
            const t = e.defaultFormattingWidth || e.defaultWidth,
                o = (null == n ? void 0 : n.width) ? String(n.width) : t;
            a = e.formattingValues[o] || e.formattingValues[t]
        } else {
            const t = e.defaultWidth,
                o = (null == n ? void 0 : n.width) ? String(n.width) : e.defaultWidth;
            a = e.values[o] || e.values[t]
        }
        return a[e.argumentCallback ? e.argumentCallback(t) : t]
    }
}

function f(e) {
    return (t, n = {}) => {
        const a = n.width,
            o = a && e.matchPatterns[a] || e.matchPatterns[e.defaultMatchWidth],
            i = t.match(o);
        if (!i) return null;
        const r = i[0],
            d = a && e.parsePatterns[a] || e.parsePatterns[e.defaultParseWidth],
            u = Array.isArray(d) ? function(e, t) {
                for (let n = 0; n < e.length; n++)
                    if (t(e[n])) return n;
                return
            }(d, e => e.test(r)) : function(e, t) {
                for (const n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
                return
            }(d, e => e.test(r));
        let s;
        s = e.valueCallback ? e.valueCallback(u) : u, s = n.valueCallback ? n.valueCallback(s) : s;
        return {
            value: s,
            rest: t.slice(r.length)
        }
    }
}

function g(e) {
    return (t, n = {}) => {
        const a = t.match(e.matchPattern);
        if (!a) return null;
        const o = a[0],
            i = t.match(e.parsePattern);
        if (!i) return null;
        let r = e.valueCallback ? e.valueCallback(i[0]) : i[0];
        r = n.valueCallback ? n.valueCallback(r) : r;
        return {
            value: r,
            rest: t.slice(o.length)
        }
    }
}
const w = {
        code: "en-US",
        formatDistance: (e, t, n) => {
            let a;
            const o = s[e];
            return a = "string" == typeof o ? o : 1 === t ? o.one : o.other.replace("{{count}}", t.toString()), (null == n ? void 0 : n.addSuffix) ? n.comparison && n.comparison > 0 ? "in " + a : a + " ago" : a
        },
        formatLong: m,
        formatRelative: (e, t, n, a) => l[e],
        localize: {
            ordinalNumber: (e, t) => {
                const n = Number(e),
                    a = n % 100;
                if (a > 20 || a < 10) switch (a % 10) {
                    case 1:
                        return n + "st";
                    case 2:
                        return n + "nd";
                    case 3:
                        return n + "rd"
                }
                return n + "th"
            },
            era: c({
                values: {
                    narrow: ["B", "A"],
                    abbreviated: ["BC", "AD"],
                    wide: ["Before Christ", "Anno Domini"]
                },
                defaultWidth: "wide"
            }),
            quarter: c({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
                    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
                },
                defaultWidth: "wide",
                argumentCallback: e => e - 1
            }),
            month: c({
                values: {
                    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
                    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                },
                defaultWidth: "wide"
            }),
            day: c({
                values: {
                    narrow: ["S", "M", "T", "W", "T", "F", "S"],
                    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                defaultWidth: "wide"
            }),
            dayPeriod: c({
                values: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "morning",
                        afternoon: "afternoon",
                        evening: "evening",
                        night: "night"
                    }
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "a",
                        pm: "p",
                        midnight: "mi",
                        noon: "n",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    abbreviated: {
                        am: "AM",
                        pm: "PM",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    },
                    wide: {
                        am: "a.m.",
                        pm: "p.m.",
                        midnight: "midnight",
                        noon: "noon",
                        morning: "in the morning",
                        afternoon: "in the afternoon",
                        evening: "in the evening",
                        night: "at night"
                    }
                },
                defaultFormattingWidth: "wide"
            })
        },
        match: {
            ordinalNumber: g({
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: e => parseInt(e, 10)
            }),
            era: f({
                matchPatterns: {
                    narrow: /^(b|a)/i,
                    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
                    wide: /^(before christ|before common era|anno domini|common era)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/^b/i, /^(a|c)/i]
                },
                defaultParseWidth: "any"
            }),
            quarter: f({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /^q[1234]/i,
                    wide: /^[1234](th|st|nd|rd)? quarter/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/1/i, /2/i, /3/i, /4/i]
                },
                defaultParseWidth: "any",
                valueCallback: e => e + 1
            }),
            month: f({
                matchPatterns: {
                    narrow: /^[jfmasond]/i,
                    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
                    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
                    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
                },
                defaultParseWidth: "any"
            }),
            day: f({
                matchPatterns: {
                    narrow: /^[smtwf]/i,
                    short: /^(su|mo|tu|we|th|fr|sa)/i,
                    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
                    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
                    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
                },
                defaultParseWidth: "any"
            }),
            dayPeriod: f({
                matchPatterns: {
                    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
                    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
                },
                defaultMatchWidth: "any",
                parsePatterns: {
                    any: {
                        am: /^a/i,
                        pm: /^p/i,
                        midnight: /^mi/i,
                        noon: /^no/i,
                        morning: /morning/i,
                        afternoon: /afternoon/i,
                        evening: /evening/i,
                        night: /night/i
                    }
                },
                defaultParseWidth: "any"
            })
        },
        options: {
            weekStartsOn: 0,
            firstWeekContainsDate: 1
        }
    },
    b = {
        lessThanXSeconds: {
            one: "أقل من ثانية",
            two: "أقل من ثانيتين",
            threeToTen: "أقل من {{count}} ثواني",
            other: "أقل من {{count}} ثانية"
        },
        xSeconds: {
            one: "ثانية واحدة",
            two: "ثانيتان",
            threeToTen: "{{count}} ثواني",
            other: "{{count}} ثانية"
        },
        halfAMinute: "نصف دقيقة",
        lessThanXMinutes: {
            one: "أقل من دقيقة",
            two: "أقل من دقيقتين",
            threeToTen: "أقل من {{count}} دقائق",
            other: "أقل من {{count}} دقيقة"
        },
        xMinutes: {
            one: "دقيقة واحدة",
            two: "دقيقتان",
            threeToTen: "{{count}} دقائق",
            other: "{{count}} دقيقة"
        },
        aboutXHours: {
            one: "ساعة واحدة تقريباً",
            two: "ساعتين تقريبا",
            threeToTen: "{{count}} ساعات تقريباً",
            other: "{{count}} ساعة تقريباً"
        },
        xHours: {
            one: "ساعة واحدة",
            two: "ساعتان",
            threeToTen: "{{count}} ساعات",
            other: "{{count}} ساعة"
        },
        xDays: {
            one: "يوم واحد",
            two: "يومان",
            threeToTen: "{{count}} أيام",
            other: "{{count}} يوم"
        },
        aboutXWeeks: {
            one: "أسبوع واحد تقريبا",
            two: "أسبوعين تقريبا",
            threeToTen: "{{count}} أسابيع تقريبا",
            other: "{{count}} أسبوعا تقريبا"
        },
        xWeeks: {
            one: "أسبوع واحد",
            two: "أسبوعان",
            threeToTen: "{{count}} أسابيع",
            other: "{{count}} أسبوعا"
        },
        aboutXMonths: {
            one: "شهر واحد تقريباً",
            two: "شهرين تقريبا",
            threeToTen: "{{count}} أشهر تقريبا",
            other: "{{count}} شهرا تقريباً"
        },
        xMonths: {
            one: "شهر واحد",
            two: "شهران",
            threeToTen: "{{count}} أشهر",
            other: "{{count}} شهرا"
        },
        aboutXYears: {
            one: "سنة واحدة تقريباً",
            two: "سنتين تقريبا",
            threeToTen: "{{count}} سنوات تقريباً",
            other: "{{count}} سنة تقريباً"
        },
        xYears: {
            one: "سنة واحد",
            two: "سنتان",
            threeToTen: "{{count}} سنوات",
            other: "{{count}} سنة"
        },
        overXYears: {
            one: "أكثر من سنة",
            two: "أكثر من سنتين",
            threeToTen: "أكثر من {{count}} سنوات",
            other: "أكثر من {{count}} سنة"
        },
        almostXYears: {
            one: "ما يقارب سنة واحدة",
            two: "ما يقارب سنتين",
            threeToTen: "ما يقارب {{count}} سنوات",
            other: "ما يقارب {{count}} سنة"
        }
    },
    y = {
        date: h({
            formats: {
                full: "EEEE، do MMMM y",
                long: "do MMMM y",
                medium: "d MMM y",
                short: "dd/MM/yyyy"
            },
            defaultWidth: "full"
        }),
        time: h({
            formats: {
                full: "HH:mm:ss",
                long: "HH:mm:ss",
                medium: "HH:mm:ss",
                short: "HH:mm"
            },
            defaultWidth: "full"
        }),
        dateTime: h({
            formats: {
                full: "{{date}} 'عند الساعة' {{time}}",
                long: "{{date}} 'عند الساعة' {{time}}",
                medium: "{{date}}, {{time}}",
                short: "{{date}}, {{time}}"
            },
            defaultWidth: "full"
        })
    },
    v = {
        lastWeek: "eeee 'الماضي عند الساعة' p",
        yesterday: "'الأمس عند الساعة' p",
        today: "'اليوم عند الساعة' p",
        tomorrow: "'غدا عند الساعة' p",
        nextWeek: "eeee 'القادم عند الساعة' p",
        other: "P"
    },
    p = {
        code: "ar",
        formatDistance: (e, t, n) => {
            const a = b[e];
            let o;
            return o = "string" == typeof a ? a : 1 === t ? a.one : 2 === t ? a.two : t <= 10 ? a.threeToTen.replace("{{count}}", String(t)) : a.other.replace("{{count}}", String(t)), (null == n ? void 0 : n.addSuffix) ? n.comparison && n.comparison > 0 ? "خلال " + o : "منذ " + o : o
        },
        formatLong: y,
        formatRelative: e => v[e],
        localize: {
            ordinalNumber: e => String(e),
            era: c({
                values: {
                    narrow: ["ق", "ب"],
                    abbreviated: ["ق.م.", "ب.م."],
                    wide: ["قبل الميلاد", "بعد الميلاد"]
                },
                defaultWidth: "wide"
            }),
            quarter: c({
                values: {
                    narrow: ["1", "2", "3", "4"],
                    abbreviated: ["ر1", "ر2", "ر3", "ر4"],
                    wide: ["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع"]
                },
                defaultWidth: "wide",
                argumentCallback: e => e - 1
            }),
            month: c({
                values: {
                    narrow: ["ي", "ف", "م", "أ", "م", "ي", "ي", "أ", "س", "أ", "ن", "د"],
                    abbreviated: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
                    wide: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
                },
                defaultWidth: "wide"
            }),
            day: c({
                values: {
                    narrow: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
                    short: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
                    abbreviated: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
                    wide: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
                },
                defaultWidth: "wide"
            }),
            dayPeriod: c({
                values: {
                    narrow: {
                        am: "ص",
                        pm: "م",
                        morning: "الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "المساء",
                        night: "الليل",
                        midnight: "منتصف الليل"
                    },
                    abbreviated: {
                        am: "ص",
                        pm: "م",
                        morning: "الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "المساء",
                        night: "الليل",
                        midnight: "منتصف الليل"
                    },
                    wide: {
                        am: "ص",
                        pm: "م",
                        morning: "الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "المساء",
                        night: "الليل",
                        midnight: "منتصف الليل"
                    }
                },
                defaultWidth: "wide",
                formattingValues: {
                    narrow: {
                        am: "ص",
                        pm: "م",
                        morning: "في الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "في المساء",
                        night: "في الليل",
                        midnight: "منتصف الليل"
                    },
                    abbreviated: {
                        am: "ص",
                        pm: "م",
                        morning: "في الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "في المساء",
                        night: "في الليل",
                        midnight: "منتصف الليل"
                    },
                    wide: {
                        am: "ص",
                        pm: "م",
                        morning: "في الصباح",
                        noon: "الظهر",
                        afternoon: "بعد الظهر",
                        evening: "في المساء",
                        night: "في الليل",
                        midnight: "منتصف الليل"
                    }
                },
                defaultFormattingWidth: "wide"
            })
        },
        match: {
            ordinalNumber: g({
                matchPattern: /^(\d+)(th|st|nd|rd)?/i,
                parsePattern: /\d+/i,
                valueCallback: e => parseInt(e, 10)
            }),
            era: f({
                matchPatterns: {
                    narrow: /[قب]/,
                    abbreviated: /[قب]\.م\./,
                    wide: /(قبل|بعد) الميلاد/
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/قبل/, /بعد/]
                },
                defaultParseWidth: "any"
            }),
            quarter: f({
                matchPatterns: {
                    narrow: /^[1234]/i,
                    abbreviated: /ر[1234]/,
                    wide: /الربع (الأول|الثاني|الثالث|الرابع)/
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    any: [/1/i, /2/i, /3/i, /4/i]
                },
                defaultParseWidth: "any",
                valueCallback: e => e + 1
            }),
            month: f({
                matchPatterns: {
                    narrow: /^[أيفمسند]/,
                    abbreviated: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
                    wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
                    any: [/^يناير/i, /^فبراير/i, /^مارس/i, /^أبريل/i, /^مايو/i, /^يونيو/i, /^يوليو/i, /^أغسطس/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
                },
                defaultParseWidth: "any"
            }),
            day: f({
                matchPatterns: {
                    narrow: /^[حنثرخجس]/i,
                    short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
                    abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
                    wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
                },
                defaultMatchWidth: "wide",
                parsePatterns: {
                    narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
                    wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
                    any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
                },
                defaultParseWidth: "any"
            }),
            dayPeriod: f({
                matchPatterns: {
                    narrow: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/,
                    any: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/
                },
                defaultMatchWidth: "any",
                parsePatterns: {
                    any: {
                        am: /^ص/,
                        pm: /^م/,
                        midnight: /منتصف الليل/,
                        noon: /الظهر/,
                        afternoon: /بعد الظهر/,
                        morning: /في الصباح/,
                        evening: /في المساء/,
                        night: /في الليل/
                    }
                },
                defaultParseWidth: "any"
            })
        },
        options: {
            weekStartsOn: 6,
            firstWeekContainsDate: 1
        }
    };
export {
    p as a, o as b, t as c, d, w as e, a as f, u as g, n as h, i as m, e as t
};