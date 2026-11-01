import {
    i as r
} from "./rolldown-runtime-Bpd4S2KM.js";
import {
    l as e,
    u as t
} from "./constants-AGV8EUcv.js";
import {
    $t as n,
    Bn as s,
    Gt as a,
    Jt as o,
    Kt as i,
    Qt as u,
    Wt as c,
    Xt as f,
    Yt as d,
    Zt as l,
    qt as m
} from "./SchedulingFields-DyUNJelg.js";
var p = e(),
    h = r(t(), 1);

function j({
    children: r,
    features: e,
    strict: t = !1
}) {
    const [, n] = (0, h.useState)(!v(e)), s = (0, h.useRef)(void 0);
    if (!v(e)) {
        const {
            renderer: r,
            ...t
        } = e;
        s.current = r, f(t)
    }
    return (0, h.useEffect)(() => {
        v(e) && e().then(({
            renderer: r,
            ...e
        }) => {
            f(e), s.current = r, n(!0)
        })
    }, []), (0, p.jsx)(l.Provider, {
        value: {
            renderer: s.current,
            strict: t
        },
        children: r
    })
}

function v(r) {
    return "function" == typeof r
}
var x = d(),
    g = {
        ...{
            renderer: o,
            ...m,
            ...a
        },
        ...i,
        ...c
    };

function R({
    tag: r,
    props: e,
    elementRef: t
}) {
    const n = x[r];
    return (0, p.jsx)(n, {
        ...e,
        ref: t
    })
}

function S({
    tag: r,
    props: e,
    elementRef: t
}) {
    const s = n(),
        a = x[r];
    return (0, p.jsx)(a, {
        ...e,
        "aria-hidden": !s || e["aria-hidden"],
        ref: t
    })
}
export {
    u as AnimatePresence, S as HidingPresenceElement, j as LazyMotion, s as PresenceContext, R as PresenceElement, g as domMax, x as m
};