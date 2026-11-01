import {
    n,
    t
} from "./path-CAufXw5D.js";
import {
    t as u
} from "./array-B0vPCVKH.js";
import {
    rt as r
} from "./chunk-75Z2AOVW-Qlb350Io.js";

function o(n) {
    return n[0]
}

function e(n) {
    return n[1]
}

function f(f, i) {
    var l = n(!0),
        c = null,
        p = r,
        a = null,
        h = t(s);

    function s(n) {
        var t, r, o, e = (n = u(n)).length,
            s = !1;
        for (null == c && (a = p(o = h())), t = 0; t <= e; ++t) !(t < e && l(r = n[t], t, n)) === s && ((s = !s) ? a.lineStart() : a.lineEnd()), s && a.point(+f(r, t, n), +i(r, t, n));
        if (o) return a = null, o + "" || null
    }
    return f = "function" == typeof f ? f : void 0 === f ? o : n(f), i = "function" == typeof i ? i : void 0 === i ? e : n(i), s.x = function(t) {
        return arguments.length ? (f = "function" == typeof t ? t : n(+t), s) : f
    }, s.y = function(t) {
        return arguments.length ? (i = "function" == typeof t ? t : n(+t), s) : i
    }, s.defined = function(t) {
        return arguments.length ? (l = "function" == typeof t ? t : n(!!t), s) : l
    }, s.curve = function(n) {
        return arguments.length ? (p = n, null != c && (a = p(c)), s) : p
    }, s.context = function(n) {
        return arguments.length ? (null == n ? c = a = null : a = p(c = n), s) : c
    }, s
}
export {
    f as t
};