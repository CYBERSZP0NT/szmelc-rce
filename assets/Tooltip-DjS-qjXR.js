import {
    i as e,
    n as t,
    t as n
} from "./rolldown-runtime-Bpd4S2KM.js";
import {
    i as r
} from "./i18n-D7U8fJ2I.js";
import {
    l as o,
    u as s
} from "./constants-AGV8EUcv.js";
import {
    $n as i,
    $r as a,
    Ci as c,
    Di as l,
    Ei as u,
    Gn as d,
    Gr as f,
    Hr as p,
    Ir as g,
    Jn as h,
    Jr as m,
    Kn as v,
    Kr as b,
    Oi as y,
    Qn as x,
    Qr as E,
    Rr as w,
    Sa as S,
    Ti as C,
    Ur as T,
    Wn as R,
    Wr as k,
    Xn as O,
    Yn as P,
    Yr as M,
    Zn as I,
    Zr as A,
    _a as j,
    _i as D,
    ai as N,
    ar as F,
    bi as W,
    ca as B,
    ci as V,
    di as H,
    dr as z,
    ea as L,
    ei as $,
    er as Q,
    fa as U,
    fi as Y,
    fr as q,
    ga as X,
    gi as _,
    ha as K,
    hi as G,
    ii as J,
    ir as Z,
    ji as ee,
    ki as te,
    li as ne,
    ma as re,
    mi as oe,
    na as se,
    nr as ie,
    oi as ae,
    pi as ce,
    qn as le,
    qr as ue,
    rr as de,
    sa as fe,
    ta as pe,
    ti as ge,
    tr as he,
    ui as me,
    va as ve,
    vi as be,
    wa as ye,
    wi as xe,
    xa as Ee,
    ya as we,
    zr as Se
} from "./SchedulingFields-DyUNJelg.js";
var Ce = e(r(), 1),
    Te = e(s());

function Re(e) {
    const t = (0, Te.useRef)(e);
    (0, Te.useInsertionEffect)(() => {
        t.current = e
    }, [e]);
    const [n] = (0, Te.useState)(() => {
        return e = t, (...t) => e.current?.(...t);
        var e
    });
    return void 0 === e ? void 0 : n
}

function ke(e) {
    const t = (0, Te.useRef)(e);
    (0, Te.useInsertionEffect)(() => {
        t.current = e
    }, [e]);
    const [n] = (0, Te.useState)(() => {
        return e = t, (...t) => e.current(...t);
        var e
    });
    return n
}
var Oe = o(),
    Pe = Te.createContext(void 0);
var Me = "undefined" != typeof window ? Te.useLayoutEffect : Te.useEffect;

function Ie(e) {
    return e?.ownerDocument || document
}
var Ae = [],
    je = void 0;

function De(e) {
    const t = (t, n) => {
        const r = Ee(Fe).current;
        let o;
        try {
            je = r;
            for (const e of Ae) e.before(r);
            o = e(t, n);
            for (const e of Ae) e.after(r);
            r.didInitialize = !0
        } finally {
            je = void 0
        }
        return o
    };
    return t.displayName = e.displayName || e.name, t
}

function Ne(e) {
    return Te.forwardRef(De(e))
}

function Fe() {
    return {
        didInitialize: !1
    }
}
var We = Te.createContext(void 0);

function Be(e) {
    const t = Te.useContext(We);
    if (void 0 === t && !e) throw new Error(S(72));
    return t
}
var Ve = class e {
    static create() {
        return new e
    }
    currentId = 0;
    start(e, t) {
        this.clear(), this.currentId = setTimeout(() => {
            this.currentId = 0, t()
        }, e)
    }
    isStarted() {
        return 0 !== this.currentId
    }
    clear = () => {
        0 !== this.currentId && (clearTimeout(this.currentId), this.currentId = 0)
    };
    disposeEffect = () => this.clear
};

function He() {
    const e = Ee(Ve.create).current;
    return J(e.disposeEffect), e
}
var {
    userAgent: ze,
    platform: Le,
    maxTouchPoints: $e
} = "undefined" == typeof navigator ? {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
} : {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0
}, Qe = ze.toLowerCase(), Ue = Le.toLowerCase(), Ye = /^i(os$|p)/.test(Ue) || "macintel" === Ue && $e > 1, qe = "android", Xe = Ue === qe || Qe.includes(qe), _e = !Ye && Ue.startsWith("mac"), Ke = (Ue.startsWith("win"), !Xe && /^(linux|chrome os)/.test(Ue), _e || Ye), Ge = "undefined" != typeof CSS && !!CSS.supports?.("-webkit-backdrop-filter:none"), Je = (!Ge && Qe.includes("firefox"), !Ge && Qe.includes("chrom"), Ke), Ze = /jsdom|happydom/.test(Qe);

function et(e) {
    e.preventDefault(), e.stopPropagation()
}

function tt(e) {
    return !("" !== e.pointerType || !e.isTrusted) || (Xe && e.pointerType ? "click" === e.type && 1 === e.buttons : 0 === e.detail && !e.pointerType)
}

function nt(e) {
    return !Ze && (!Xe && 0 === e.width && 0 === e.height || Xe && 1 === e.width && 1 === e.height && 0 === e.pressure && 0 === e.detail && "mouse" === e.pointerType || e.width < 1 && e.height < 1 && 0 === e.pressure && 0 === e.detail && "touch" === e.pointerType)
}

function rt(e, t) {
    const n = ["mouse", "pen"];
    return t || n.push("", void 0), n.includes(e)
}

function ot(e) {
    let t = e.activeElement;
    for (; null != t?.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
    return t
}

function st(e, t) {
    if (!e || !t) return !1;
    const n = t.getRootNode?.();
    if (e.contains(t)) return !0;
    if (n && A(n)) {
        let n = t;
        for (; n;) {
            if (e === n) return !0;
            n = n.parentNode || n.host
        }
    }
    return !1
}

function it(e) {
    return "composedPath" in e ? e.composedPath()[0] ?? e.target : e.target
}
var at = "data-base-ui-focusable",
    ct = "data-open",
    lt = "data-closed",
    ut = $,
    dt = a,
    ft = "data-anchor-hidden",
    pt = "data-popup-open",
    gt = {
        [pt]: ""
    },
    ht = {
        [ct]: ""
    },
    mt = {
        [lt]: ""
    },
    vt = {
        [ft]: ""
    },
    bt = {
        open: e => e ? gt : null
    },
    yt = {
        open: e => e ? ht : mt,
        anchorHidden: e => e ? vt : null
    },
    xt = {
        ...yt,
        ...E
    },
    Et = "data-trigger-disabled";

function wt(e, t) {
    if (!b(e)) return !1;
    const n = e;
    if (t.hasElement(n)) return !n.hasAttribute(Et);
    for (const [, r] of t.entries())
        if (st(r, n)) return !r.hasAttribute(Et);
    return !1
}

function St(e, t) {
    if (null == t) return !1;
    if ("composedPath" in e) return e.composedPath().includes(t);
    const n = e;
    return null != n.target && t.contains(n.target)
}

function Ct(e) {
    return ue(e) && e.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])")
}

function Tt(e) {
    return !!e && ("combobox" === e.getAttribute("role") && Ct(e))
}

function Rt(e) {
    return e ? e.hasAttribute("data-base-ui-focusable") ? e : e.querySelector("[data-base-ui-focusable]") || e : null
}

function kt(e, t, n) {
    const r = function(e, t) {
        return null == t || rt(t) ? "function" == typeof e ? e() : e : 0
    }(e, n);
    return "number" == typeof r ? r : r?.[t]
}

function Ot(e) {
    return "function" == typeof e ? e() : e
}

function Pt(e, t) {
    return t || "click" === e || "mousedown" === e
}
var Mt = Te.createContext({
    hasProvider: !1,
    timeoutMs: 0,
    delayRef: {
        current: 0
    },
    initialDelayRef: {
        current: 0
    },
    timeout: new Ve,
    currentIdRef: {
        current: null
    },
    currentContextRef: {
        current: null
    }
});

function It(e) {
    const {
        children: t,
        delay: n,
        timeoutMs: r = 0
    } = e, o = Te.useRef(n), s = Te.useRef(n), i = Te.useRef(null), a = Te.useRef(null), c = He();
    return N(() => {
        s.current = n, i.current ? o.current = {
            open: kt(o.current, "open"),
            close: kt(n, "close")
        } : o.current = n
    }, [n, i, o, s]), (0, Oe.jsx)(Mt.Provider, {
        value: Te.useMemo(() => ({
            hasProvider: !0,
            delayRef: o,
            initialDelayRef: s,
            currentIdRef: i,
            timeoutMs: r,
            currentContextRef: a,
            timeout: c
        }), [r, c]),
        children: t
    })
}

function At(...e) {
    return () => {
        for (let t = 0; t < e.length; t += 1) {
            const n = e[t];
            n && n()
        }
    }
}
var jt = {
        clipPath: "inset(50%)",
        overflow: "hidden",
        whiteSpace: "nowrap",
        border: 0,
        padding: 0,
        width: 1,
        height: 1,
        margin: -1
    },
    Dt = {
        ...jt,
        position: "fixed",
        top: 0,
        left: 0
    },
    Nt = {
        ...jt,
        position: "absolute"
    },
    Ft = Te.forwardRef(function(e, t) {
        const [n, r] = Te.useState();
        N(() => {
            Je && Ge && r("button")
        }, []);
        const o = {
            tabIndex: 0,
            role: n
        };
        return (0, Oe.jsx)("span", {
            ...e,
            ref: t,
            style: Dt,
            "aria-hidden": !n || void 0,
            ...o,
            "data-base-ui-focus-guard": ""
        })
    });

function Wt(e, t = (e ? p(e) : null)) {
    return !(!(e && e.isConnected && t) || function(e) {
        return "hidden" === e.visibility || "collapse" === e.visibility
    }(t)) && ("function" == typeof e.checkVisibility ? e.checkVisibility() : "none" !== t.display && "contents" !== t.display)
}

function Bt(e) {
    const t = e.assignedSlot;
    if (t) return t;
    if (e.parentElement) return e.parentElement;
    const n = e.getRootNode();
    return A(n) ? n.host : null
}

function Vt(e) {
    for (const t of Array.from(e.children))
        if ("summary" === T(t)) return t;
    return null
}

function Ht(e, t) {
    const n = Vt(t);
    return !!n && (e === n || st(n, e))
}

function zt(e) {
    const t = e ? T(e) : "";
    return null != e && e.matches('a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]') && ("summary" !== t || null != e.parentElement && "details" === T(e.parentElement) && Vt(e.parentElement) === e) && ("details" !== t || null == Vt(e)) && ("input" !== t || "hidden" !== e.type)
}

function Lt(e) {
    if (!zt(e) || !e.isConnected || e.matches(":disabled")) return !1;
    for (let t = e; t; t = Bt(t)) {
        const n = t !== e,
            r = "slot" === T(t);
        if (t.hasAttribute("inert")) return !1;
        if (n && "details" === T(t) && !t.open && !Ht(e, t) || t.hasAttribute("hidden") || !r && !$t(t, n)) return !1
    }
    return !0
}

function $t(e, t) {
    const n = p(e);
    return t ? "none" !== n.display : Wt(e, n)
}

function Qt(e) {
    const t = e.tabIndex;
    if (t < 0) {
        const t = T(e);
        if ("details" === t || "audio" === t || "video" === t || ue(e) && e.isContentEditable) return 0
    }
    return t
}

function Ut(e) {
    if ("input" !== T(e)) return null;
    const t = e;
    return "radio" === t.type && "" !== t.name ? t : null
}

function Yt(e) {
    if (ue(e) && "slot" === T(e)) {
        const t = e.assignedElements({
            flatten: !0
        });
        if (t.length > 0) return t
    }
    return ue(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children)
}

function qt(e, t) {
    Yt(e).forEach(e => {
        zt(e) && t.push(e), qt(e, t)
    })
}

function Xt(e, t, n) {
    Yt(e).forEach(e => {
        ue(e) && e.matches(t) && n.push(e), Xt(e, t, n)
    })
}

function _t(e) {
    return Lt(e) && Qt(e) >= 0
}

function Kt(e) {
    const t = [];
    return qt(e, t), t.filter(Lt)
}

function Gt(e) {
    const t = Kt(e);
    return t.filter(e => Qt(e) >= 0 && function(e, t) {
        const n = Ut(e);
        if (!n) return !0;
        const r = t.find(e => {
            const t = Ut(e);
            return t?.name === n.name && t.form === n.form && t.checked
        });
        return r ? r === n : t.find(e => {
            const t = Ut(e);
            return t?.name === n.name && t.form === n.form
        }) === n
    }(e, t))
}

function Jt(e, t) {
    const n = Gt(e),
        r = n.length;
    if (0 === r) return;
    const o = ot(Ie(e)),
        s = n.indexOf(o);
    return n[-1 === s ? 1 === t ? 0 : r - 1 : s + t]
}

function Zt(e) {
    return Jt(Ie(e).body, 1) || e
}

function en(e) {
    return Jt(Ie(e).body, -1) || e
}

function tn(e, t) {
    const n = t || e.currentTarget,
        r = e.relatedTarget;
    return !r || !st(n, r)
}

function nn(e) {
    const t = [];
    Xt(e, "[data-tabindex]", t), t.forEach(e => {
        const t = e.dataset.tabindex;
        delete e.dataset.tabindex, t ? e.setAttribute("tabindex", t) : e.removeAttribute("tabindex")
    })
}

function rn(e, t, n = !0) {
    return e.filter(e => e.parentId === t).flatMap(t => [...!n || t.context?.open ? [t] : [], ...rn(e, t.id, n)])
}

function on(e, t) {
    let n = [],
        r = e.find(e => e.id === t)?.parentId;
    for (; r;) {
        const t = e.find(e => e.id === r);
        r = t?.parentId, t && (n = n.concat(t))
    }
    return n
}

function sn(e) {
    return `data-base-ui-${e}`
}
var an = {
        style: {
            transition: "none"
        }
    },
    cn = "data-base-ui-click-trigger",
    ln = {
        fallbackAxisSide: "end"
    },
    un = {
        clipPath: "inset(50%)",
        position: "fixed",
        top: 0,
        left: 0
    },
    dn = Te.createContext(null),
    fn = () => Te.useContext(dn),
    pn = sn("portal");

function gn(e = {}) {
    const {
        ref: t,
        container: n,
        componentProps: r = j,
        elementProps: o
    } = e, s = be(), i = fn()?.portalNode, [a, c] = Te.useState(null), [l, u] = Te.useState(null), d = W(e => {
        null !== e && u(e)
    }), f = Te.useRef(null);
    N(() => {
        if (null === n) return void(f.current && (f.current = null, u(null), c(null)));
        const e = (n && (M(n) ? n : n.current)) ?? i ?? document.body;
        null != e ? f.current !== e && (f.current = e, u(null), c(e)) : f.current && (f.current = null, u(null), c(null))
    }, [n, i]);
    const p = K("div", r, {
            ref: [t, d],
            props: [{
                id: s,
                [pn]: ""
            }, o]
        }),
        g = a && p ? Ce.createPortal(p, a) : null;
    return {
        node: l,
        nodeId: Te.isValidElement(p) ? p.props.id : void 0,
        subtree: g
    }
}
var hn = Te.forwardRef(function(e, t) {
    const {
        render: n,
        className: r,
        style: o,
        children: s,
        container: i,
        portalOwnerRole: a,
        ...c
    } = e, {
        node: l,
        nodeId: u,
        subtree: d
    } = gn({
        container: i,
        ref: t,
        componentProps: e,
        elementProps: c
    }), f = Te.useRef(null), p = Te.useRef(null), g = Te.useRef(null), h = Te.useRef(null), [m, v] = Te.useState(null), b = Te.useRef(!1), y = m?.modal, x = m?.open, E = !!m && !m.modal && m.open && !!l;
    Te.useEffect(() => {
        if (l && !y) return At(Se(l, "focusin", e, !0), Se(l, "focusout", e, !0));

        function e(e) {
            l && e.relatedTarget && tn(e) && ("focusin" === e.type ? b.current && (nn(l), b.current = !1) : (! function(e) {
                Gt(e).forEach(e => {
                    e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1")
                })
            }(l), b.current = !0))
        }
    }, [l, y]), N(() => {
        l && !0 === x && b.current && (nn(l), b.current = !1)
    }, [x, l]);
    const w = Te.useMemo(() => ({
        beforeOutsideRef: f,
        afterOutsideRef: p,
        beforeInsideRef: g,
        afterInsideRef: h,
        portalNode: l,
        setFocusManagerState: v
    }), [l]);
    return (0, Oe.jsxs)(Te.Fragment, {
        children: [d, (0, Oe.jsxs)(dn.Provider, {
            value: w,
            children: [E && l && (0, Oe.jsx)(Ft, {
                "data-type": "outside",
                ref: f,
                onFocus: e => {
                    if (tn(e, l)) g.current?.focus();
                    else {
                        const e = m ? m.domReference : null;
                        en(e)?.focus()
                    }
                }
            }), E && l && (0, Oe.jsx)("span", {
                role: a,
                "aria-owns": u,
                style: un
            }), l && Ce.createPortal(s, l), E && l && (0, Oe.jsx)(Ft, {
                "data-type": "outside",
                ref: p,
                onFocus: e => {
                    if (tn(e, l)) h.current?.focus();
                    else {
                        const t = m ? m.domReference : null;
                        Zt(t)?.focus(), m?.closeOnFocusOut && m?.onOpenChange(!1, ae("focus-out", e.nativeEvent))
                    }
                }
            })]
        })]
    })
});

function mn() {
    const e = new Map;
    return {
        emit(t, n) {
            e.get(t)?.forEach(e => e(n))
        },
        on(t, n) {
            e.has(t) || e.set(t, new Set), e.get(t).add(n)
        },
        off(t, n) {
            e.get(t)?.delete(n)
        }
    }
}
var vn = class {
        nodesRef = {
            current: []
        };
        events = mn();
        addNode(e) {
            this.nodesRef.current.push(e)
        }
        removeNode(e) {
            const t = this.nodesRef.current.findIndex(t => t === e); - 1 !== t && this.nodesRef.current.splice(t, 1)
        }
    },
    bn = Te.createContext(null),
    yn = Te.createContext(null),
    xn = () => Te.useContext(bn)?.id || null,
    En = e => {
        const t = Te.useContext(yn);
        return e ?? t
    };

function wn(e) {
    const t = be(),
        n = En(e),
        r = xn();
    return N(() => {
        if (!t) return;
        const e = {
            id: t,
            parentId: r
        };
        return n?.addNode(e), () => {
            n?.removeNode(e)
        }
    }, [n, t, r]), t
}

function Sn(e) {
    const {
        children: t,
        id: n
    } = e, r = xn();
    return (0, Oe.jsx)(bn.Provider, {
        value: Te.useMemo(() => ({
            id: n,
            parentId: r
        }), [n, r]),
        children: t
    })
}

function Cn(e) {
    const {
        children: t,
        externalTree: n
    } = e, r = Ee(() => n ?? new vn).current;
    return (0, Oe.jsx)(yn.Provider, {
        value: r,
        children: t
    })
}

function Tn(e) {
    return null != e && null != e.clientX
}

function Rn() {
    return !1
}

function kn(e, t = {}) {
    const {
        enabled: n = !0,
        escapeKey: r = !0,
        outsidePress: o = !0,
        outsidePressEvent: s = "sloppy",
        referencePress: i = Rn,
        bubbles: a,
        externalTree: c
    } = t, l = "rootStore" in e ? e.rootStore : e, u = l.useState("open"), d = l.useState("floatingElement"), {
        dataRef: f,
        events: g
    } = l.context, h = En(c), v = W("function" == typeof o ? o : () => !1), y = "function" == typeof o ? v : o, x = !1 !== y, E = W(() => s), {
        escapeKey: w,
        outsidePress: S
    } = {
        escapeKey: "boolean" == typeof(C = a) ? C : C?.escapeKey ?? !1,
        outsidePress: "boolean" == typeof C ? C : C?.outsidePress ?? !0
    };
    var C;
    const T = Te.useRef(!1),
        R = Te.useRef(!1),
        O = Te.useRef(!1),
        P = Te.useRef(!1),
        M = Te.useRef(!1),
        I = Te.useRef(""),
        j = Te.useRef(null),
        D = He(),
        N = He(),
        F = W(() => {
            N.clear(), f.current.insideReactTree = !1
        }),
        B = W(e => {
            const t = f.current.floatingContext?.nodeId;
            return (h ? rn(h.nodesRef.current, t) : []).some(t => t.context?.open && !t.context.dataRef.current[e])
        }),
        V = W(e => St(e, l.select("floatingElement")) || St(e, l.select("domReferenceElement"))),
        H = W(e => {
            i() && l.setOpen(!1, ae(_, e.nativeEvent))
        }),
        z = W(e => {
            if (!u || !n || !r || "Escape" !== e.key) return;
            if (M.current) return;
            if (!w && B("__escapeKeyBubbles")) return;
            const t = function(e) {
                    return "nativeEvent" in e
                }(e) ? e.nativeEvent : e,
                o = ae(ne, t);
            l.setOpen(!1, o), o.isCanceled || e.preventDefault(), w || o.isPropagationAllowed || e.stopPropagation()
        }),
        L = W(() => {
            f.current.insideReactTree = !0, N.start(0, F)
        }),
        $ = W(e => {
            if (!u || !n || 0 !== e.button) return;
            const t = it(e.nativeEvent);
            st(l.select("floatingElement"), t) && (T.current || (T.current = !0, R.current = !1))
        }),
        Q = W(e => {
            u && n && (e.defaultPrevented || e.nativeEvent.defaultPrevented) && T.current && (R.current = !0)
        });
    Te.useEffect(() => {
        function e(e) {
            e.open || (P.current = !1)
        }
        return g.on("openchange", e), () => {
            g.off("openchange", e)
        }
    }, [g]), Te.useEffect(() => {
        if (!u || !n) return u || (P.current = !1), F;
        f.current.__escapeKeyBubbles = w, f.current.__outsidePressBubbles = S;
        const e = new Ve,
            t = new Ve,
            o = Ie(d);

        function s() {
            O.current = !0, t.start(0, () => {
                O.current = !1
            })
        }

        function i() {
            T.current = !1, R.current = !1
        }

        function a() {
            const e = I.current,
                t = "pen" !== e && e ? e : "mouse",
                n = E(),
                r = "function" == typeof n ? n() : n;
            return "string" == typeof r ? r : r[t]
        }

        function c(e) {
            const t = f.current.floatingContext?.nodeId,
                n = h && rn(h.nodesRef.current, t).some(t => St(e, t.context?.elements.floating));
            return V(e) || n
        }

        function g(e) {
            if (function(e) {
                    const t = a();
                    return "intentional" === t && "click" !== e.type || "sloppy" === t && "click" === e.type
                }(e)) return "click" === e.type || V(e) || (t.clear(), O.current = !1), void F();
            if (f.current.insideReactTree) return void F();
            const n = it(e),
                r = `[${sn("inert")}]`,
                o = b(n) ? n.getRootNode() : null,
                s = Array.from((A(o) ? o : Ie(l.select("floatingElement"))).querySelectorAll(r)),
                i = l.context.triggerElements;
            if (n && (i.hasElement(n) || i.hasMatchingElement(e => st(e, n)))) return;
            let u = b(n) ? n : null;
            for (; u && !m(u);) {
                const e = k(u);
                if (m(e) || !b(e)) break;
                u = e
            }
            if (!s.length || !b(n) || n.matches("html,body") || st(n, l.select("floatingElement")) || !s.every(e => !st(u, e))) {
                if (ue(n) && !("touches" in e)) {
                    const t = m(n),
                        r = p(n),
                        o = /auto|scroll/,
                        s = t || o.test(r.overflowX),
                        i = t || o.test(r.overflowY),
                        a = s && n.clientWidth > 0 && n.scrollWidth > n.clientWidth,
                        c = i && n.clientHeight > 0 && n.scrollHeight > n.clientHeight,
                        l = "rtl" === r.direction,
                        u = c && (l ? e.offsetX <= n.offsetWidth - n.clientWidth : e.offsetX > n.clientWidth),
                        d = a && e.offsetY > n.clientHeight;
                    if (u || d) return
                }
                if (!c(e)) {
                    if ("intentional" === a()) {
                        if (0 !== e.detail && !tt(e) && !P.current) return;
                        if (O.current) return t.clear(), void(O.current = !1)
                    }("function" != typeof y || y(e)) && (B("__outsidePressBubbles") || (l.setOpen(!1, ae(ce, e)), F()))
                }
            }
        }

        function v(e) {
            if ("sloppy" !== a() || !l.select("open") || !n || V(e)) return;
            const t = e.touches[0];
            t && (j.current = {
                startTime: Date.now(),
                startX: t.clientX,
                startY: t.clientY,
                dismissOnTouchEnd: !1,
                dismissOnMouseDown: !0
            }, D.start(1e3, () => {
                j.current && (j.current.dismissOnTouchEnd = !1, j.current.dismissOnMouseDown = !1)
            }))
        }

        function C(e, t) {
            const n = it(e);
            if (!n) return;
            const r = Se(n, e.type, () => {
                t(e), r()
            })
        }

        function N(e) {
            D.clear(), "pointerdown" === e.type && (0 === e.button && (P.current = !0), I.current = e.pointerType), "mousedown" === e.type && j.current && !j.current.dismissOnMouseDown || C(e, e => {
                "pointerdown" === e.type ? function(e) {
                    "sloppy" === a() && "touch" !== e.pointerType && l.select("open") && n && !V(e) && g(e)
                }(e) : g(e)
            })
        }

        function W(e) {
            if ("pointercancel" === e.type && (P.current = !1), !T.current) return;
            const n = R.current;
            i(), "intentional" === a() && ("pointercancel" !== e.type ? c(e) || (n ? s() : ("function" != typeof y || y(e)) && (t.clear(), O.current = !0, F())) : n && s())
        }

        function H(e) {
            if ("sloppy" !== a() || !j.current || V(e)) return;
            const t = e.touches[0];
            if (!t) return;
            const n = Math.abs(t.clientX - j.current.startX),
                r = Math.abs(t.clientY - j.current.startY),
                o = Math.sqrt(n * n + r * r);
            o > 5 && (j.current.dismissOnTouchEnd = !0), o > 10 && (g(e), D.clear(), j.current = null)
        }

        function L(e) {
            "sloppy" === a() && j.current && !V(e) && (j.current.dismissOnTouchEnd && g(e), D.clear(), j.current = null)
        }
        const $ = At(r && At(Se(o, "keydown", z), Se(o, "compositionstart", function() {
            e.clear(), M.current = !0
        }), Se(o, "compositionend", function() {
            e.start(Ge ? 5 : 0, () => {
                M.current = !1
            })
        })), x && At(Se(o, "click", N, !0), Se(o, "pointerdown", N, !0), Se(o, "pointerup", W, !0), Se(o, "pointercancel", W, !0), Se(o, "mousedown", N, !0), Se(o, "mouseup", W, !0), Se(o, "touchstart", function(e) {
            I.current = "touch", C(e, v)
        }, {
            capture: !0,
            passive: !0
        }), Se(o, "touchmove", function(e) {
            C(e, H)
        }, {
            capture: !0,
            passive: !0
        }), Se(o, "touchend", function(e) {
            C(e, L)
        }, {
            capture: !0,
            passive: !0
        })));
        return () => {
            $(), e.clear(), t.clear(), i(), O.current = !1, F()
        }
    }, [f, d, r, x, y, u, n, w, S, z, F, E, B, V, h, l, D]);
    const U = Te.useMemo(() => ({
            onKeyDown: z,
            onPointerDown: H,
            onClick: H
        }), [z, H]),
        Y = Te.useMemo(() => ({
            onKeyDown: z,
            onPointerDown: Q,
            onMouseDown: Q,
            onClickCapture: L,
            onMouseDownCapture(e) {
                L(), $(e)
            },
            onPointerDownCapture(e) {
                L(), $(e)
            },
            onMouseUpCapture: L,
            onTouchEndCapture: L,
            onTouchMoveCapture: L
        }), [z, L, $, Q]);
    return Te.useMemo(() => n ? {
        reference: U,
        floating: Y,
        trigger: U
    } : {}, [n, U, Y])
}
var On, Pn = class {
        attachedStores = [];
        attachedStoreValue = null;
        storeListeners = new Set;
        constructor(e, t, n = !0) {
            this.fallbackStore = e, this.componentName = t, this.throwOnMissingTrigger = n
        }
        get attachedStore() {
            return this.attachedStoreValue
        }
        get store() {
            return this.attachedStoreValue ?? this.fallbackStore
        }
        get serverStore() {
            return this.fallbackStore
        }
        subscribeStore(e) {
            return this.storeListeners.add(e), () => {
                this.storeListeners.delete(e)
            }
        }
        attachStore(e) {
            return this.attachedStores.push(e), this.setActiveStore(e), () => {
                const t = this.attachedStores.lastIndexOf(e); - 1 !== t && this.attachedStores.splice(t, 1), this.setActiveStore(this.attachedStores[this.attachedStores.length - 1] ?? null)
            }
        }
        setActiveStore(e) {
            this.attachedStoreValue !== e && (this.attachedStoreValue = e, this.storeListeners.forEach(e => {
                e()
            }))
        }
        openByTrigger(e) {
            const t = this.attachedStore;
            if (null === t) return;
            let n;
            if (e) {
                for (let t = this.attachedStores.length - 1; t >= 0 && !n; t -= 1) n = this.attachedStores[t].context.triggerElements.getById(e);
                n ??= this.fallbackStore.context.triggerElements.getById(e)
            }
            if (e && !n && this.throwOnMissingTrigger) throw new Error(S(99, this.componentName, e, this.componentName));
            t.setOpen(!0, ae(H, void 0, n))
        }
        closePopup() {
            const e = this.attachedStore;
            null !== e && e.setOpen(!1, ae(H))
        }
    },
    Mn = n(e => {
        var t = s();
        var n = "function" == typeof Object.is ? Object.is : function(e, t) {
                return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
            },
            r = t.useState,
            o = t.useEffect,
            i = t.useLayoutEffect,
            a = t.useDebugValue;

        function c(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
                var r = t();
                return !n(e, r)
            } catch (o) {
                return !0
            }
        }
        var l = "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement ? function(e, t) {
            return t()
        } : function(e, t) {
            var n = t(),
                s = r({
                    inst: {
                        value: n,
                        getSnapshot: t
                    }
                }),
                l = s[0].inst,
                u = s[1];
            return i(function() {
                l.value = n, l.getSnapshot = t, c(l) && u({
                    inst: l
                })
            }, [e, n, t]), o(function() {
                return c(l) && u({
                    inst: l
                }), e(function() {
                    c(l) && u({
                        inst: l
                    })
                })
            }, [e]), a(n), n
        };
        e.useSyncExternalStore = void 0 !== t.useSyncExternalStore ? t.useSyncExternalStore : l
    }),
    In = n((e, t) => {
        t.exports = Mn()
    }),
    An = n(e => {
        var t = s(),
            n = In();
        var r = "function" == typeof Object.is ? Object.is : function(e, t) {
                return e === t && (0 !== e || 1 / e == 1 / t) || e != e && t != t
            },
            o = n.useSyncExternalStore,
            i = t.useRef,
            a = t.useEffect,
            c = t.useMemo,
            l = t.useDebugValue;
        e.useSyncExternalStoreWithSelector = function(e, t, n, s, u) {
            var d = i(null);
            if (null === d.current) {
                var f = {
                    hasValue: !1,
                    value: null
                };
                d.current = f
            } else f = d.current;
            d = c(function() {
                function e(e) {
                    if (!a) {
                        if (a = !0, o = e, e = s(e), void 0 !== u && f.hasValue) {
                            var t = f.value;
                            if (u(t, e)) return i = t
                        }
                        return i = e
                    }
                    if (t = i, r(o, e)) return t;
                    var n = s(e);
                    return void 0 !== u && u(t, n) ? (o = e, t) : (o = e, i = n)
                }
                var o, i, a = !1,
                    c = void 0 === n ? null : n;
                return [function() {
                    return e(t())
                }, null === c ? void 0 : function() {
                    return e(c())
                }]
            }, [t, n, s, u]);
            var p = o(e, d[0], d[1]);
            return a(function() {
                f.hasValue = !0, f.value = p
            }, [p]), l(p), p
        }
    }),
    jn = n((e, t) => {
        t.exports = An()
    }),
    Dn = In(),
    Nn = e(jn(), 1),
    Fn = we(19) ? function(e, t, n, r, o) {
        const s = je;
        if (!s) return function(e, t, n, r, o) {
            const s = Te.useCallback(() => t(e.getSnapshot(), n, r, o), [e, t, n, r, o]);
            return (0, Dn.useSyncExternalStore)(e.subscribe, s, s)
        }(e, t, n, r, o);
        const i = s.syncIndex;
        let a;
        s.syncIndex += 1, s.didInitialize ? (a = s.syncHooks[i], a.store === e && a.selector === t && Object.is(a.a1, n) && Object.is(a.a2, r) && Object.is(a.a3, o) || (a.store !== e && (s.didChangeStore = !0), a.store = e, a.selector = t, a.a1 = n, a.a2 = r, a.a3 = o, a.value = t(e.getSnapshot(), n, r, o))) : (a = {
            store: e,
            selector: t,
            a1: n,
            a2: r,
            a3: o,
            value: t(e.getSnapshot(), n, r, o)
        }, s.syncHooks.push(a));
        return a.value
    } : function(e, t, n, r, o) {
        return (0, Nn.useSyncExternalStoreWithSelector)(e.subscribe, e.getSnapshot, e.getSnapshot, e => t(e, n, r, o))
    };

function Wn(e, t, n, r, o) {
    return Fn(e, t, n, r, o)
}
On = {
    before(e) {
        e.syncIndex = 0, e.didInitialize || (e.syncTick = 1, e.syncHooks = [], e.didChangeStore = !0, e.getSnapshot = () => {
            let t = !1;
            for (let n = 0; n < e.syncHooks.length; n += 1) {
                const r = e.syncHooks[n],
                    o = r.selector(r.store.state, r.a1, r.a2, r.a3);
                Object.is(r.value, o) || (t = !0, r.value = o)
            }
            return t && (e.syncTick += 1), e.syncTick
        })
    },
    after(e) {
        e.syncHooks.length > 0 && (e.didChangeStore && (e.didChangeStore = !1, e.subscribe = t => {
            const n = new Set;
            for (const o of e.syncHooks) n.add(o.store);
            const r = [];
            for (const e of n) r.push(e.subscribe(t));
            return () => {
                for (const e of r) e()
            }
        }), (0, Dn.useSyncExternalStore)(e.subscribe, e.getSnapshot, e.getSnapshot))
    }
}, Ae.push(On);
var Bn = class {
        static create(e) {
            return new this(e)
        }
        constructor(e) {
            this.state = e, this.listeners = new Set, this.updateTick = 0
        }
        subscribe = e => (this.listeners.add(e), () => {
            this.listeners.delete(e)
        });
        getSnapshot = () => this.state;
        setState(e) {
            if (this.state === e) return;
            this.state = e, this.updateTick += 1;
            const t = this.updateTick;
            for (const n of this.listeners) {
                if (t !== this.updateTick) return;
                n(e)
            }
        }
        update(e) {
            for (const t in e)
                if (!Object.is(this.state[t], e[t])) return void this.setState({
                    ...this.state,
                    ...e
                })
        }
        set(e, t) {
            Object.is(this.state[e], t) || this.setState({
                ...this.state,
                [e]: t
            })
        }
        notifyAll() {
            const e = {
                ...this.state
            };
            this.setState(e)
        }
        use(e, t, n, r) {
            return Wn(this, e, t, n, r)
        }
    },
    Vn = class extends Bn {
        constructor(e, t = {}, n) {
            super(e), this.context = t, this.selectors = n
        }
        useSyncedValue(e, t) {
            Te.useDebugValue(e);
            const n = this;
            N(() => {
                n.state[e] !== t && n.set(e, t)
            }, [n, e, t])
        }
        useSyncedValueWithCleanup(e, t) {
            const n = this;
            N(() => (n.state[e] !== t && n.set(e, t), () => {
                n.set(e, void 0)
            }), [n, e, t])
        }
        useSyncedValues(e) {
            const t = this,
                n = Object.values(e);
            N(() => {
                t.update(e)
            }, [t, ...n])
        }
        useControlledProp(e, t) {
            Te.useDebugValue(e);
            const n = this,
                r = void 0 !== t;
            N(() => {
                r && !Object.is(n.state[e], t) && n.setState({
                    ...n.state,
                    [e]: t
                })
            }, [n, e, t, r])
        }
        select(e, t, n, r) {
            return (0, this.selectors[e])(this.state, t, n, r)
        }
        useState(e, t, n, r) {
            return Te.useDebugValue(e), Wn(this, this.selectors[e], t, n, r)
        }
        useContextCallback(e, t) {
            Te.useDebugValue(e);
            const n = W(t ?? ve);
            this.context[e] = n
        }
        useStateSetter(e) {
            const t = Te.useRef(void 0);
            return void 0 === t.current && (t.current = t => {
                this.set(e, t)
            }), t.current
        }
        observe(e, t) {
            let n;
            n = "function" == typeof e ? e : this.selectors[e];
            let r = n(this.state);
            return t(r, r, this), this.subscribe(e => {
                const o = n(e);
                if (!Object.is(r, o)) {
                    const e = r;
                    r = o, t(o, e, this)
                }
            })
        }
    },
    Hn = {
        open: e => e.open,
        transitionStatus: e => e.transitionStatus,
        domReferenceElement: e => e.domReferenceElement,
        referenceElement: e => e.positionReference ?? e.referenceElement,
        floatingElement: e => e.floatingElement,
        floatingId: e => e.floatingId
    },
    zn = class extends Vn {
        constructor(e) {
            const {
                syncOnly: t,
                nested: n,
                onOpenChange: r,
                triggerElements: o,
                ...s
            } = e;
            super({
                ...s,
                positionReference: s.referenceElement,
                domReferenceElement: s.referenceElement
            }, {
                onOpenChange: r,
                dataRef: {
                    current: {}
                },
                events: mn(),
                nested: n,
                triggerElements: o
            }, Hn), this.syncOnly = t
        }
        syncOpenEvent = (e, t) => {
            (!e || !this.state.open || null != t && function(e) {
                const t = e.type;
                return "click" === t || "mousedown" === t || "keydown" === t || "keyup" === t
            }(t)) && (this.context.dataRef.current.openEvent = e ? t : void 0)
        };
        dispatchOpenChange = (e, t) => {
            this.syncOpenEvent(e, t.event);
            const n = {
                open: e,
                reason: t.reason,
                nativeEvent: t.event,
                nested: this.context.nested,
                triggerElement: t.trigger
            };
            this.context.events.emit("openchange", n)
        };
        setOpen = (e, t) => {
            this.syncOnly || this.dispatchOpenChange(e, t), this.context.onOpenChange?.(e, t)
        }
    };
var Ln = {
    tabIndex: -1,
    [at]: ""
};

function $n(e) {
    return t => "touch" !== t || e.current
}

function Qn(e, t = !1) {
    const n = be(),
        r = null != xn(),
        o = Ee(() => e(n, r)).current;
    return function(e) {
        const {
            popupStore: t,
            treatPopupAsFloatingElement: n = !1,
            floatingRootContext: r,
            floatingId: o,
            nested: s,
            onOpenChange: i
        } = e, a = t.useState("open"), c = t.useState("activeTriggerElement"), l = t.useState(n ? "popupElement" : "positionerElement"), u = t.context.triggerElements, d = i, f = Te.useRef(null);
        void 0 === r && null === f.current && (f.current = new zn({
            open: a,
            transitionStatus: void 0,
            referenceElement: c,
            floatingElement: l,
            triggerElements: u,
            onOpenChange: d,
            floatingId: o,
            syncOnly: !0,
            nested: s
        }));
        const p = r ?? f.current;
        t.useSyncedValue("floatingId", o), N(() => {
            const e = {
                open: a,
                floatingId: o,
                referenceElement: c,
                floatingElement: l
            };
            b(c) && (e.domReferenceElement = c), p.state.positionReference === p.state.referenceElement && (e.positionReference = c), p.update(e)
        }, [a, o, c, l, p]), p.context.onOpenChange = d, p.context.nested = s
    }({
        popupStore: o,
        treatPopupAsFloatingElement: t,
        floatingRootContext: o.state.floatingRootContext,
        floatingId: n,
        nested: r,
        onOpenChange: o.setOpen
    }), o
}

function Un({
    handle: e,
    store: t
}) {
    return N(() => e.attachStore(t), [e, t]), null
}

function Yn(e) {
    const t = e.context.triggerElements.size;
    e.select("open") && e.state.triggerCount !== t && e.set("triggerCount", t)
}

function qn(e, t, n, r = !1) {
    let o = e.preventUnmountingOnClose;
    t ? o = !1 : r && (o = !0);
    const s = n?.id ?? null;
    let i = e.activeTriggerId,
        a = e.activeTriggerElement;
    return (s || t) && (i = s, a = n ?? null), {
        open: t,
        preventUnmountingOnClose: o,
        activeTriggerId: i,
        activeTriggerElement: a
    }
}

function Xn(e, t, n, r = {}) {
    const o = n.reason,
        s = o === G,
        i = t && "trigger-focus" === o,
        a = !t && ("trigger-press" === o || "escape-key" === o),
        c = function(e) {
            let t = !1;
            return e.preventUnmountOnClose = () => {
                t = !0
            }, () => t
        }(n);
    if (e.context.onOpenChange?.(t, n), n.isCanceled) return;
    r.onBeforeDispatch?.(), e.state.floatingRootContext.dispatchOpenChange(t, n);
    const l = () => {
        const o = qn(e.state, t, n.trigger, c()),
            l = {
                ...r.extraState,
                ...o
            };
        i ? l.instantType = "focus" : a ? l.instantType = "dismiss" : s && (l.instantType = void 0), e.update(l)
    };
    s ? Ce.flushSync(l) : l()
}

function _n(e, t, n, r) {
    const o = n.useState("isMountedByTrigger", e),
        s = function(e, t) {
            const n = Te.useRef(null);
            return W(r => {
                const o = n.current;
                if (null !== o) {
                    if (o.element === r && o.store === t && o.id === e) return;
                    n.current = null;
                    const s = o.store;
                    s.context.triggerElements.getById(o.id) === o.element && (s.context.triggerElements.delete(o.id), Yn(s))
                }
                null !== r && void 0 !== e && (n.current = {
                    store: t,
                    id: e,
                    element: r
                }, t.context.triggerElements.add(e, r), Yn(t))
            })
        }(e, n),
        i = W(t => {
            const o = n.select("open"),
                s = n.select("activeTriggerId");
            if (s === e) {
                const e = {
                    activeTriggerElement: t,
                    ...o ? r : null
                };
                return void n.update(e)
            }
            if (null == s && o) {
                const o = {
                    activeTriggerId: e ?? null,
                    activeTriggerElement: t,
                    ...r
                };
                n.update(o)
            }
        }),
        a = W(e => {
            s(e), e && i(e)
        });
    return N(() => (a(t.current), () => a(null)), [a, t, n, e]), N(() => {
        if (o) {
            const e = {
                activeTriggerElement: t.current,
                ...r
            };
            n.update(e)
        }
    }, [o, n, t, ...Object.values(r)]), {
        registerTrigger: a,
        isMountedByThisTrigger: o
    }
}

function Kn(e, t = {}) {
    const {
        closeOnActiveTriggerUnmount: n = !1
    } = t, r = Te.useRef(null), o = e.useState("open"), s = e.useState("triggerCount"), i = e.useState("activeTriggerId"), a = e.useState("activeTriggerElement");
    N(() => {
        if (!o) return r.current = null, void(0 !== e.state.triggerCount && e.set("triggerCount", 0));
        const t = e.context.triggerElements.size,
            s = {};
        e.state.triggerCount !== t && (s.triggerCount = t);
        const i = e.select("activeTriggerId");
        let a = null;
        if (i) {
            const t = e.context.triggerElements.getById(i);
            if (t) r.current = i, t !== e.state.activeTriggerElement && (s.activeTriggerElement = t);
            else {
                for (const [t, n] of e.context.triggerElements.entries())
                    if (n === e.state.activeTriggerElement) {
                        s.activeTriggerId = t, s.activeTriggerElement = n, r.current = t;
                        break
                    } void 0 === s.activeTriggerId && (r.current === i ? a = i : r.current = null)
            }
        } else r.current = null;
        if (!a && !i && 1 === t) {
            const t = e.context.triggerElements.entries().next();
            if (!t.done) {
                const [e, n] = t.value;
                s.activeTriggerId = e, s.activeTriggerElement = n, r.current = e
            }
        }
        void 0 === s.triggerCount && void 0 === s.activeTriggerId && void 0 === s.activeTriggerElement || e.update(s), a && n && queueMicrotask(() => {
            if (e.select("open") && e.select("activeTriggerId") === a && !e.context.triggerElements.getById(a)) {
                const t = ae(Y);
                e.setOpen(!1, t), t.isCanceled || e.update({
                    activeTriggerId: null,
                    activeTriggerElement: null
                })
            }
        })
    }, [o, e, s, i, a, n])
}

function Gn(e, t, n, r) {
    const {
        mounted: o,
        setMounted: s,
        transitionStatus: i
    } = ge(e, !1, !1, r), a = t.useState("preventUnmountingOnClose"), c = !e && a;
    t.useSyncedValues({
        mounted: o,
        transitionStatus: i,
        preventUnmountingOnClose: c
    });
    const l = W(() => {
            s(!1), t.update({
                activeTriggerId: null,
                activeTriggerElement: null,
                mounted: !1,
                preventUnmountingOnClose: !1
            }), n?.(), t.context.onOpenChangeComplete?.(!1)
        }),
        u = t.select("open");
    return g({
        enabled: o && !e && !c,
        open: e,
        ref: t.context.popupRef,
        onComplete() {
            e || l()
        },
        onMissingElement(e) {
            queueMicrotask(() => {
                e.aborted || t.select("open") && !u || l()
            })
        }
    }), {
        forceUnmount: l,
        transitionStatus: i
    }
}

function Jn(e, t) {
    e.useSyncedValues(t), N(() => () => {
        e.update({
            activeTriggerProps: j,
            inactiveTriggerProps: j,
            popupProps: j
        })
    }, [e])
}

function Zn(e, t) {
    N(() => {
        t || null === e.state.openMethod || e.set("openMethod", null)
    }, [t, e]), N(() => () => {
        null !== e.state.openMethod && e.set("openMethod", null)
    }, [e])
}
var er = class {
    constructor() {
        this.idMap = new Map
    }
    add(e, t) {
        this.idMap.set(e, t)
    }
    delete(e) {
        this.idMap.delete(e)
    }
    hasElement(e) {
        for (const t of this.idMap.values())
            if (t === e) return !0;
        return !1
    }
    hasMatchingElement(e) {
        for (const t of this.idMap.values())
            if (e(t)) return !0;
        return !1
    }
    getById(e) {
        return this.idMap.get(e)
    }
    entries() {
        return this.idMap.entries()
    }
    elements() {
        return this.idMap.values()
    }
    get size() {
        return this.idMap.size
    }
};

function tr(e, t, n = !1) {
    return {
        open: !1,
        openProp: void 0,
        mounted: !1,
        transitionStatus: void 0,
        floatingRootContext: new zn({
            open: !1,
            transitionStatus: void 0,
            floatingElement: null,
            referenceElement: null,
            triggerElements: e,
            floatingId: t,
            syncOnly: !0,
            nested: n,
            onOpenChange: void 0
        }),
        floatingId: t,
        triggerCount: 0,
        preventUnmountingOnClose: !1,
        payload: void 0,
        activeTriggerId: null,
        activeTriggerElement: null,
        triggerIdProp: void 0,
        popupElement: null,
        positionerElement: null,
        activeTriggerProps: j,
        inactiveTriggerProps: j,
        popupProps: j
    }
}
var nr = e => e.triggerIdProp ?? e.activeTriggerId,
    rr = e => e.openProp ?? e.open,
    or = e => (e.popupElement?.id ?? e.floatingId) || void 0;

function sr(e, t) {
    return void 0 !== t && rr(e) && nr(e) === t
}
var ir = {
    open: rr,
    mounted: e => e.mounted,
    transitionStatus: e => e.transitionStatus,
    floatingRootContext: e => e.floatingRootContext,
    triggerCount: e => e.triggerCount,
    preventUnmountingOnClose: e => e.preventUnmountingOnClose,
    payload: e => e.payload,
    activeTriggerId: nr,
    activeTriggerElement: e => e.mounted ? e.activeTriggerElement : null,
    popupId: or,
    isTriggerActive: (e, t) => void 0 !== t && nr(e) === t,
    isOpenedByTrigger: (e, t) => sr(e, t),
    isMountedByTrigger: (e, t) => void 0 !== t && nr(e) === t && e.mounted,
    triggerProps: (e, t) => t ? e.activeTriggerProps : e.inactiveTriggerProps,
    triggerPopupId: (e, t) => function(e, t) {
        return !!sr(e, t) || void 0 !== t && rr(e) && null == nr(e) && 1 === e.triggerCount
    }(e, t) ? or(e) : void 0,
    popupProps: e => e.popupProps,
    popupElement: e => e.popupElement,
    positionerElement: e => e.positionerElement
};

function ar(e) {
    const t = Te.useCallback(t => void 0 === e ? ve : e.subscribeStore(t), [e]),
        n = Te.useCallback(() => void 0 === e ? void 0 : e.store, [e]);
    return (0, Dn.useSyncExternalStore)(t, n, () => e?.serverStore)
}

function cr(e) {
    return function(e, t) {
        const {
            nodeId: n,
            externalTree: r
        } = e, o = t.useState("referenceElement"), s = t.useState("floatingElement"), i = t.useState("domReferenceElement"), a = t.useState("open"), c = t.useState("floatingId"), [l, u] = Te.useState(null), [d, f] = Te.useState(void 0), [p, g] = Te.useState(void 0), h = Te.useRef(null), m = En(r), v = Te.useMemo(() => ({
            reference: o,
            floating: s,
            domReference: i
        }), [o, s, i]), y = P({
            ...e,
            elements: {
                ...v,
                ...l && {
                    reference: l
                }
            }
        }), x = b(d) ? d : null, E = void 0 === p ? t.state.floatingElement : p;
        t.useSyncedValue("referenceElement", d ?? null), t.useSyncedValue("domReferenceElement", void 0 === d ? i : x), t.useSyncedValue("floatingElement", E);
        const w = Te.useCallback(e => {
                const t = b(e) ? {
                    getBoundingClientRect: () => e.getBoundingClientRect(),
                    getClientRects: () => e.getClientRects(),
                    contextElement: e
                } : e;
                u(t), y.refs.setReference(t)
            }, [y.refs]),
            S = Te.useCallback(e => {
                (b(e) || null === e) && (h.current = e, f(e)), (b(y.refs.reference.current) || null === y.refs.reference.current || null !== e && !b(e)) && y.refs.setReference(e)
            }, [y.refs, f]),
            C = Te.useCallback(e => {
                g(e), y.refs.setFloating(e)
            }, [y.refs]),
            T = Te.useMemo(() => ({
                ...y.refs,
                setReference: S,
                setFloating: C,
                setPositionReference: w,
                domReference: h
            }), [y.refs, S, C, w]),
            R = Te.useMemo(() => ({
                ...y.elements,
                domReference: i
            }), [y.elements, i]),
            k = Te.useMemo(() => ({
                ...y,
                dataRef: t.context.dataRef,
                open: a,
                onOpenChange: t.setOpen,
                events: t.context.events,
                floatingId: c,
                refs: T,
                elements: R,
                nodeId: n,
                rootStore: t
            }), [y, T, R, n, t, a, c]);
        N(() => {
            i && (h.current = i)
        }, [i]);
        const O = Te.useRef(null);
        return N(() => {
            t.context.dataRef.current.floatingContext = k;
            const e = m?.nodesRef.current.find(e => e.id === n);
            e && (e.context = k), O.current = {
                dataRef: t.context.dataRef,
                node: e,
                context: k
            }
        }), Te.useEffect(() => () => {
            const e = O.current;
            e && (e.dataRef.current.floatingContext === e.context && (e.dataRef.current.floatingContext = void 0), e.node && e.node.context === e.context && (e.node.context = void 0))
        }, []), Te.useMemo(() => ({
            ...y,
            context: k,
            refs: T,
            elements: R,
            rootStore: t
        }), [y, T, R, k, t])
    }(e, e.rootContext)
}
var lr = _e && Ge;

function ur(e, t = {}) {
    const {
        enabled: n = !0,
        delay: r
    } = t, o = "rootStore" in e ? e.rootStore : e, {
        events: s,
        dataRef: i
    } = o.context, a = Te.useRef(!1), c = Te.useRef(null), l = Te.useRef(!0), u = He();
    Te.useEffect(() => {
        const e = o.select("domReferenceElement");
        if (!n) return;
        const t = f(e);
        return At(Se(t, "blur", function() {
            const e = o.select("domReferenceElement");
            !o.select("open") && ue(e) && e === ot(Ie(e)) && (a.current = !0, c.current = e)
        }), lr && Se(t, "keydown", function() {
            l.current = !0
        }, !0), lr && Se(t, "pointerdown", function() {
            l.current = !1
        }, !0))
    }, [o, n]), Te.useEffect(() => {
        if (n) return s.on("openchange", e), () => {
            s.off("openchange", e)
        };

        function e(e) {
            if ("trigger-press" === e.reason || "escape-key" === e.reason) {
                const e = o.select("domReferenceElement");
                b(e) && (c.current = e, a.current = !0)
            }
        }
    }, [s, n, o]);
    const d = Te.useMemo(() => {
        function e() {
            a.current = !1, c.current = null
        }
        return {
            onMouseLeave() {
                e()
            },
            onFocus(t) {
                const n = t.currentTarget;
                if (a.current) {
                    if (c.current === n) return;
                    e()
                }
                const s = it(t.nativeEvent);
                if (b(s))
                    if (lr && !t.relatedTarget) {
                        if (!l.current && !Ct(s)) return
                    } else if (! function(e) {
                        if (!e || Ze) return !0;
                        try {
                            return e.matches(":focus-visible")
                        } catch (t) {
                            return !0
                        }
                    }(s)) return;
                const i = wt(t.relatedTarget, o.context.triggerElements),
                    {
                        nativeEvent: d,
                        currentTarget: f
                    } = t,
                    p = "function" == typeof r ? r() : r;
                o.select("open") && i || 0 === p || void 0 === p ? o.setOpen(!0, ae(oe, d, f)) : u.start(p, () => {
                    a.current || o.setOpen(!0, ae(oe, d, f))
                })
            },
            onBlur(t) {
                e();
                const n = t.relatedTarget,
                    r = t.nativeEvent,
                    s = b(n) && n.hasAttribute(sn("focus-guard")) && "outside" === n.getAttribute("data-type");
                u.start(0, () => {
                    const e = o.select("domReferenceElement"),
                        t = ot(Ie(e));
                    (n || t !== e) && (st(i.current.floatingContext?.refs.floating.current, t) || st(e, t) || s || wt(n ?? t, o.context.triggerElements) || o.setOpen(!1, ae(oe, r)))
                })
            }
        }
    }, [i, r, o, u]);
    return Te.useMemo(() => n ? {
        reference: d,
        trigger: d
    } : {}, [n, d])
}
var dr = class e {
        constructor() {
            this.pointerType = void 0, this.interactedInside = !1, this.handler = void 0, this.blockMouseMove = !0, this.performedPointerEventsMutation = !1, this.pointerEventsScopeElement = null, this.pointerEventsReferenceElement = null, this.pointerEventsFloatingElement = null, this.restTimeoutPending = !1, this.openChangeTimeout = new Ve, this.restTimeout = new Ve, this.handleCloseOptions = void 0
        }
        static create() {
            return new e
        }
        dispose = () => {
            this.openChangeTimeout.clear(), this.restTimeout.clear()
        };
        disposeEffect = () => this.dispose
    },
    fr = new WeakMap;

function pr(e) {
    if (!e.performedPointerEventsMutation) return;
    const t = e.pointerEventsScopeElement;
    t && fr.get(t) === e && (e.pointerEventsScopeElement?.style.removeProperty("pointer-events"), e.pointerEventsReferenceElement?.style.removeProperty("pointer-events"), e.pointerEventsFloatingElement?.style.removeProperty("pointer-events"), fr.delete(t)), e.performedPointerEventsMutation = !1, e.pointerEventsScopeElement = null, e.pointerEventsReferenceElement = null, e.pointerEventsFloatingElement = null
}

function gr(e, t) {
    const {
        scopeElement: n,
        referenceElement: r,
        floatingElement: o
    } = t, s = fr.get(n);
    s && s !== e && pr(s), pr(e), e.performedPointerEventsMutation = !0, e.pointerEventsScopeElement = n, e.pointerEventsReferenceElement = r, e.pointerEventsFloatingElement = o, fr.set(n, e), n.style.pointerEvents = "none", r.style.pointerEvents = "auto", o.style.pointerEvents = "auto"
}

function hr(e) {
    const t = e.context.dataRef.current,
        n = Ee(() => t.hoverInteractionState ?? dr.create()).current;
    return t.hoverInteractionState || (t.hoverInteractionState = n), J(t.hoverInteractionState.disposeEffect), t.hoverInteractionState
}

function mr(e, t = {}) {
    const {
        enabled: n = !0,
        closeDelay: r = 0,
        nodeId: o
    } = t, s = "rootStore" in e ? e.rootStore : e, i = s.useState("open"), a = s.useState("floatingElement"), c = s.useState("domReferenceElement"), {
        dataRef: l
    } = s.context, u = En(), d = xn(), f = hr(s), p = He(), g = W(() => Pt(l.current.openEvent?.type, f.interactedInside)), h = W(() => {
        return e = l.current.openEvent?.type, e?.includes("mouse") && "mousedown" !== e;
        var e
    }), m = W(() => {
        pr(f)
    });
    N(() => {
        i || (f.pointerType = void 0, f.restTimeoutPending = !1, f.interactedInside = !1, m())
    }, [i, f, m]), Te.useEffect(() => m, [m]), N(() => {
        if (n && i && f.handleCloseOptions?.blockPointerEvents && h() && b(c) && a) {
            const e = c,
                t = a,
                n = Ie(a),
                r = u?.nodesRef.current.find(e => e.id === d)?.context?.elements.floating;
            r && (r.style.pointerEvents = "");
            const o = f.pointerEventsScopeElement !== t ? f.pointerEventsScopeElement : null,
                s = r !== t ? r : null,
                i = f.handleCloseOptions?.getScope?.() ?? o ?? s ?? e.closest("[data-rootownerid]") ?? n.body;
            return gr(f, {
                scopeElement: i,
                referenceElement: e,
                floatingElement: t
            }), () => {
                m()
            }
        }
    }, [n, i, c, a, f, h, u, d, m]), Te.useEffect(() => {
        if (!n) return;

        function e() {
            return !!(u && d && rn(u.nodesRef.current, d).length > 0)
        }

        function t(n) {
            u && d && !e() && p.start(0, () => {
                u.events.off("floating.closed", t), s.setOpen(!1, ae(G, n)), u.events.emit("floating.closed", n)
            })
        }
        const i = a;
        return At(i && Se(i, "mouseenter", function() {
            f.openChangeTimeout.clear(), p.clear(), u?.events.off("floating.closed", t), m()
        }), i && Se(i, "mouseleave", function(n) {
            if (e() && u) return void u.events.on("floating.closed", t);
            if (wt(n.relatedTarget, s.context.triggerElements)) return;
            const i = l.current.floatingContext?.nodeId ?? o,
                a = n.relatedTarget;
            u && i && b(a) && rn(u.nodesRef.current, i, !1).some(e => st(e.context?.elements.floating, a)) || (f.handler ? f.handler(n) : (m(), h() && !g() && function(e) {
                const t = kt(r, "close", f.pointerType),
                    n = () => {
                        s.setOpen(!1, ae(G, e)), u?.events.emit("floating.closed", e)
                    };
                t ? f.openChangeTimeout.start(t, n) : (f.openChangeTimeout.clear(), n())
            }(n)))
        }), i && Se(i, "pointerdown", function(e) {
            const t = it(e);
            var n;
            n = t, null != n?.closest("button,a[href],[role=\"button\"],select,[tabindex]:not([tabindex=\"-1\"]),input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])") ? f.interactedInside = null != t?.closest("[aria-haspopup]") : f.interactedInside = !1
        }, !0), () => {
            u?.events.off("floating.closed", t)
        })
    }, [n, a, s, l, r, o, h, g, m, f, u, d, p])
}
var vr = {
    current: null
};

function br(e, t = {}) {
    const {
        enabled: n = !0,
        delay: r = 0,
        handleClose: o = null,
        mouseOnly: s = !1,
        restMs: i = 0,
        move: a = !0,
        triggerElementRef: c = vr,
        externalTree: l,
        isActiveTrigger: u = !0,
        getHandleCloseContext: d,
        isClosing: f,
        shouldOpen: p,
        guardStaleOpen: g = !1
    } = t, h = "rootStore" in e ? e.rootStore : e, {
        dataRef: m,
        events: v
    } = h.context, y = En(l), x = hr(h), E = Te.useRef(!1), S = w(o), C = w(r), T = w(i), R = w(n), k = w(p), O = w(f), P = W(() => Pt(m.current.openEvent?.type, x.interactedInside)), M = W(() => !1 !== k.current?.()), I = W((e, t, n) => {
        const r = h.context.triggerElements;
        if (r.hasElement(t)) return !e || !st(e, t);
        if (!b(n)) return !1;
        const o = n;
        return r.hasMatchingElement(e => st(e, o)) && (!e || !st(e, o))
    }), A = W(() => {
        x.handler && (Ie(h.select("domReferenceElement")).removeEventListener("mousemove", x.handler), x.handler = void 0)
    }), j = W(() => {
        pr(x)
    });
    return u && (x.handleCloseOptions = o?.__options), Te.useEffect(() => A, [A]), Te.useEffect(() => {
        if (n) return v.on("openchange", e), () => {
            v.off("openchange", e)
        };

        function e(e) {
            e.open ? E.current = !1 : (E.current = e.reason === G, A(), x.openChangeTimeout.clear(), x.restTimeout.clear(), x.blockMouseMove = !0, x.restTimeoutPending = !1)
        }
    }, [n, v, x, A]), Te.useEffect(() => {
        if (!n) return;

        function e(e, t = !0) {
            const n = kt(C.current, "close", x.pointerType);
            n ? x.openChangeTimeout.start(n, () => {
                h.setOpen(!1, ae(G, e)), y?.events.emit("floating.closed", e)
            }) : t && (x.openChangeTimeout.clear(), h.setOpen(!1, ae(G, e)), y?.events.emit("floating.closed", e))
        }
        const t = c.current ?? (u ? h.select("domReferenceElement") : null);
        if (!b(t)) return;

        function r(e) {
            if (x.openChangeTimeout.clear(), x.blockMouseMove = !1, s && !rt(x.pointerType)) return;
            const t = Ot(T.current),
                n = kt(C.current, "open", x.pointerType),
                r = it(e),
                o = e.currentTarget ?? null,
                i = h.select("domReferenceElement");
            let a = o;
            if (b(r) && !h.context.triggerElements.hasElement(r))
                for (const s of h.context.triggerElements.elements())
                    if (st(s, r)) {
                        a = s;
                        break
                    } b(o) && b(i) && !h.context.triggerElements.hasElement(o) && st(o, i) && (a = i);
            const c = null != a && I(i, a, r),
                l = h.select("open"),
                u = O.current?.() ?? "ending" === h.select("transitionStatus"),
                d = !l && u && E.current,
                f = !c && b(a) && b(i) && st(i, a) && d,
                p = t > 0 && !n,
                g = !l || c;
            c && (l || d) || f ? M() && h.setOpen(!0, ae(G, e, a)) : p || (n ? x.openChangeTimeout.start(n, () => {
                g && M() && h.setOpen(!0, ae(G, e, a))
            }) : g && M() && h.setOpen(!0, ae(G, e, a)))
        }

        function o(t) {
            if (P()) return void j();
            A();
            const n = Ie(h.select("domReferenceElement"));
            x.restTimeout.clear(), x.restTimeoutPending = !1, x.restTrigger = void 0;
            const r = m.current.floatingContext ?? d?.();
            if (!wt(t.relatedTarget, h.context.triggerElements)) {
                if (S.current && r) {
                    h.select("open") || x.openChangeTimeout.clear();
                    const o = c.current;
                    return x.handler = S.current({
                        ...r,
                        tree: y,
                        x: t.clientX,
                        y: t.clientY,
                        onClose() {
                            j(), A(), R.current && !P() && o === h.select("domReferenceElement") && e(t, !0)
                        }
                    }), n.addEventListener("mousemove", x.handler), void x.handler(t)
                }
                "touch" === x.pointerType && st(h.select("floatingElement"), t.relatedTarget) || e(t)
            }
        }
        const i = g ? Se(t, "mouseout", function(e) {
                st(t, e.relatedTarget) || (x.openChangeTimeout.clear(), x.restTimeout.clear(), x.restTimeoutPending = !1)
            }) : void 0,
            l = () => {
                x.restTrigger === t && (x.restTrigger = void 0)
            };
        return a ? At(Se(t, "mousemove", r, {
            once: !0
        }), Se(t, "mouseenter", r), Se(t, "mouseleave", o), i, l) : At(Se(t, "mouseenter", r), Se(t, "mouseleave", o), i, l)
    }, [A, j, m, C, h, n, S, x, u, I, P, s, a, T, c, y, R, d, O, M, g]), Te.useMemo(() => {
        if (n) return {
            onPointerDown: e,
            onPointerEnter: e,
            onMouseMove(e) {
                const {
                    nativeEvent: t
                } = e, n = e.currentTarget, r = h.select("domReferenceElement"), o = h.select("open"), i = I(r, n, e.target);
                if (s && !rt(x.pointerType)) return;
                if (o && i && x.handleCloseOptions?.blockPointerEvents) {
                    const e = h.select("floatingElement");
                    if (e) {
                        const t = x.handleCloseOptions?.getScope?.() ?? n.ownerDocument.body;
                        gr(x, {
                            scopeElement: t,
                            referenceElement: n,
                            floatingElement: e
                        })
                    }
                }
                const a = Ot(T.current);

                function c() {
                    if (x.restTimeoutPending = !1, x.restTrigger = void 0, P()) return;
                    const e = h.select("open");
                    x.blockMouseMove || e && !i || !M() || h.setOpen(!0, ae(G, t, n))
                }
                o && !i || 0 === a || (!i || !o && x.restTrigger === n) && x.restTimeoutPending && x.restTimeout.isStarted() && e.movementX ** 2 + e.movementY ** 2 < 2 || (x.restTimeout.clear(), "touch" === x.pointerType ? Ce.flushSync(() => {
                    c()
                }) : i && o ? c() : (x.restTimeoutPending = !0, x.restTrigger = n, x.restTimeout.start(a, c)))
            }
        };

        function e(e) {
            x.pointerType = e.pointerType
        }
    }, [n, x, P, I, s, h, T, M])
}
var yr = .1 * .1,
    xr = .5;

function Er(e, t, n, r, o, s) {
    return r >= t != s >= t && e <= (o - n) * (t - r) / (s - r) + n
}

function wr(e, t, n, r, o, s, i, a, c, l) {
    let u = !1;
    return Er(e, t, n, r, o, s) && (u = !u), Er(e, t, o, s, i, a) && (u = !u), Er(e, t, i, a, c, l) && (u = !u), Er(e, t, c, l, n, r) && (u = !u), u
}

function Sr(e, t, n, r, o, s) {
    return e >= Math.min(n, o) && e <= Math.max(n, o) && t >= Math.min(r, s) && t <= Math.max(r, s)
}

function Cr(e = {}) {
    const {
        blockPointerEvents: t = !1
    } = e, n = new Ve, r = ({
        x: e,
        y: t,
        placement: r,
        elements: o,
        onClose: s,
        nodeId: i,
        tree: a
    }) => {
        const c = r?.split("-")[0];
        let l = !1,
            u = null,
            d = null,
            f = "undefined" != typeof performance ? performance.now() : 0;
        return function(r) {
            n.clear();
            const p = o.domReference,
                g = o.floating;
            if (!p || !g || null == c || null == e || null == t) return;
            const {
                clientX: h,
                clientY: m
            } = r, v = it(r), y = "mouseleave" === r.type, x = st(g, v), E = st(p, v);
            if (x && (l = !0, !y)) return;
            if (E && (l = !1, !y)) return void(l = !0);
            if (y && b(r.relatedTarget) && st(g, r.relatedTarget)) return;

            function w() {
                return Boolean(a && rn(a.nodesRef.current, i).length > 0)
            }

            function S() {
                w() || (n.clear(), s())
            }
            if (w()) return;
            const C = p.getBoundingClientRect(),
                T = g.getBoundingClientRect(),
                R = e > T.right - T.width / 2,
                k = t > T.bottom - T.height / 2,
                O = T.width > C.width,
                P = T.height > C.height,
                M = (O ? C : T).left,
                I = (O ? C : T).right,
                A = (P ? C : T).top,
                j = (P ? C : T).bottom;
            if ("top" === c && t >= C.bottom - 1 || "bottom" === c && t <= C.top + 1 || "left" === c && e >= C.right - 1 || "right" === c && e <= C.left + 1) return void S();
            let D = !1;
            switch (c) {
                case "top":
                    D = Sr(h, m, M, C.top + 1, I, T.bottom - 1);
                    break;
                case "bottom":
                    D = Sr(h, m, M, T.top + 1, I, C.bottom - 1);
                    break;
                case "left":
                    D = Sr(h, m, T.right - 1, j, C.left + 1, A);
                    break;
                case "right":
                    D = Sr(h, m, C.right - 1, j, T.left + 1, A)
            }
            if (D) return;
            if (l && ! function(e, t, n) {
                    return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height
                }(h, m, C)) return void S();
            if (!y && function(e, t) {
                    const n = performance.now(),
                        r = n - f;
                    if (null === u || null === d || 0 === r) return u = e, d = t, f = n, !1;
                    const o = e - u,
                        s = t - d;
                    return u = e, d = t, f = n, o * o + s * s < r * r * yr
                }(h, m)) return void S();
            let N = !1;
            switch (c) {
                case "top": {
                    const n = O ? .25 : 2,
                        r = O || R ? e + n : e - n,
                        o = O ? e - n : R ? e + n : e - n,
                        s = t + xr + 1,
                        i = R || O ? T.bottom - xr : T.top,
                        a = R ? O ? T.bottom - xr : T.top : T.bottom - xr;
                    N = wr(h, m, r, s, o, s, T.left, i, T.right, a);
                    break
                }
                case "bottom": {
                    const n = O ? .25 : 2,
                        r = O || R ? e + n : e - n,
                        o = O ? e - n : R ? e + n : e - n,
                        s = t - xr,
                        i = R || O ? T.top + xr : T.bottom,
                        a = R ? O ? T.top + xr : T.bottom : T.top + xr;
                    N = wr(h, m, r, s, o, s, T.left, i, T.right, a);
                    break
                }
                case "left": {
                    const n = P ? .25 : 2,
                        r = P || k ? t + n : t - n,
                        o = P ? t - n : k ? t + n : t - n,
                        s = e + xr + 1,
                        i = k || P ? T.right - xr : T.left,
                        a = k ? P ? T.right - xr : T.left : T.right - xr;
                    N = wr(h, m, i, T.top, a, T.bottom, s, r, s, o);
                    break
                }
                case "right": {
                    const n = P ? .25 : 2,
                        r = P || k ? t + n : t - n,
                        o = P ? t - n : k ? t + n : t - n,
                        s = e - xr,
                        i = k || P ? T.left + xr : T.right,
                        a = k ? P ? T.left + xr : T.right : T.left + xr;
                    N = wr(h, m, s, r, s, o, i, T.top, a, T.bottom);
                    break
                }
            }
            N ? l || n.start(40, S) : S()
        }
    };
    return r.__options = {
        ...e,
        blockPointerEvents: t
    }, r
}
var Tr = class extends Vn {
        setState(e) {}
        update(e) {}
        set(e, t) {}
        notifyAll() {}
    },
    Rr = {
        ...ir,
        disabled: e => e.disabled,
        instantType: e => e.instantType,
        isInstantPhase: e => e.isInstantPhase,
        trackCursorAxis: e => e.trackCursorAxis,
        disableHoverablePopup: e => e.disableHoverablePopup,
        lastOpenChangeReason: e => e.openChangeReason,
        closeOnClick: e => e.closeOnClick,
        closeDelay: e => e.closeDelay,
        adaptiveOrigin: e => e.adaptiveOrigin
    },
    kr = class extends Vn {
        constructor(e, t, n) {
            const r = new er;
            super(Or(e, r, t, n), Pr(r), Rr)
        }
        setOpen = (e, t) => {
            Xn(this, e, t, {
                extraState: {
                    openChangeReason: t.reason
                }
            })
        };
        cancelPendingOpen(e) {
            this.state.floatingRootContext.dispatchOpenChange(!1, ae(_, e))
        }
    };

function Or(e, t, n, r = !1) {
    return {
        ...tr(t, n, r),
        disabled: !1,
        instantType: void 0,
        isInstantPhase: !1,
        trackCursorAxis: "none",
        disableHoverablePopup: !1,
        openChangeReason: null,
        closeOnClick: !0,
        closeDelay: 0,
        adaptiveOrigin: void 0,
        ...e
    }
}

function Pr(e) {
    return {
        popupRef: Te.createRef(),
        onOpenChange: void 0,
        onOpenChangeComplete: void 0,
        triggerElements: e
    }
}
var Mr = De(function(e) {
    const {
        disabled: t = !1,
        defaultOpen: n = !1,
        open: r,
        disableHoverablePopup: o = !1,
        trackCursorAxis: s = "none",
        actionsRef: i,
        onOpenChange: a,
        onOpenChangeComplete: c,
        handle: l,
        triggerId: u,
        defaultTriggerId: d = null,
        children: f
    } = e, p = Qn((e, i) => new kr({
        open: n,
        openProp: r,
        activeTriggerId: d,
        triggerIdProp: u,
        disabled: t,
        disableHoverablePopup: o,
        trackCursorAxis: s
    }, e, i));
    p.useControlledProp("openProp", r), p.useControlledProp("triggerIdProp", u), p.useContextCallback("onOpenChange", a), p.useContextCallback("onOpenChangeComplete", c);
    const g = p.useState("open"),
        h = !t && g,
        m = p.useState("activeTriggerId"),
        v = p.useState("mounted"),
        b = p.useState("payload");
    p.useSyncedValues({
        trackCursorAxis: s,
        disableHoverablePopup: o,
        disabled: t
    }), Kn(p, {
        closeOnActiveTriggerUnmount: !0
    });
    const {
        forceUnmount: y,
        transitionStatus: x
    } = Gn(h, p), E = p.useState("isInstantPhase"), w = p.useState("instantType"), S = p.useState("lastOpenChangeReason"), C = Te.useRef(null);
    N(() => {
        g && t && p.setOpen(!1, ae(V))
    }, [g, t, p]), N(() => {
        "ending" === x && "none" === S || "ending" !== x && E ? ("delay" !== w && (C.current = w), p.set("instantType", "delay")) : null !== C.current && (p.set("instantType", C.current), C.current = null)
    }, [x, E, S, w, p]), N(() => {
        h && null == m && p.set("payload", void 0)
    }, [p, m, h]), Te.useImperativeHandle(i, () => ({
        unmount: y,
        close: () => p.setOpen(!1, ae(H))
    }), [y, p]);
    const T = h || v || !t && "none" !== s;
    return (0, Oe.jsxs)(We.Provider, {
        value: p,
        children: [l && (0, Oe.jsx)(Un, {
            handle: l,
            store: p
        }), T && (0, Oe.jsx)(Ir, {
            store: p,
            disabled: t,
            trackCursorAxis: s
        }), "function" == typeof f ? f({
            payload: b
        }) : f]
    })
});

function Ir({
    store: e,
    disabled: t,
    trackCursorAxis: n
}) {
    const r = e.useState("floatingRootContext"),
        o = kn(r, {
            enabled: !t,
            referencePress: () => e.select("closeOnClick")
        }),
        s = function(e, t = {}) {
            const {
                enabled: n = !0,
                axis: r = "both"
            } = t, o = "rootStore" in e ? e.rootStore : e, s = o.useState("open"), i = o.useState("floatingElement"), a = o.useState("domReferenceElement"), c = o.context.dataRef, l = Te.useRef(!1), u = Te.useRef(null), [d, p] = Te.useState(), [g, h] = Te.useState([]), m = W(e => {
                o.set("positionReference", e)
            }), v = W((e, t, n) => {
                l.current || c.current.openEvent && !Tn(c.current.openEvent) || o.set("positionReference", function(e, t) {
                    let n = null,
                        r = null,
                        o = !1;
                    return {
                        contextElement: e || void 0,
                        getBoundingClientRect() {
                            const s = e?.getBoundingClientRect() || {
                                    width: 0,
                                    height: 0,
                                    x: 0,
                                    y: 0
                                },
                                i = "x" === t.axis || "both" === t.axis,
                                a = "y" === t.axis || "both" === t.axis,
                                c = ["mouseenter", "mousemove"].includes(t.dataRef.current.openEvent?.type || "") && "touch" !== t.pointerType;
                            let l = s.width,
                                u = s.height,
                                d = s.x,
                                f = s.y;
                            return null == n && t.x && i && (n = s.x - t.x), null == r && t.y && a && (r = s.y - t.y), d -= n || 0, f -= r || 0, l = 0, u = 0, !o || c ? (l = "y" === t.axis ? s.width : 0, u = "x" === t.axis ? s.height : 0, d = i && null != t.x ? t.x : d, f = a && null != t.y ? t.y : f) : o && !c && (u = "x" === t.axis ? s.height : u, l = "y" === t.axis ? s.width : l), o = !0, {
                                width: l,
                                height: u,
                                x: d,
                                y: f,
                                top: f,
                                right: d + l,
                                bottom: f + u,
                                left: d
                            }
                        }
                    }
                }(n ?? a, {
                    x: e,
                    y: t,
                    axis: r,
                    dataRef: c,
                    pointerType: d
                }))
            }), b = W(e => {
                s ? u.current || (v(e.clientX, e.clientY, e.currentTarget), h([])) : v(e.clientX, e.clientY, e.currentTarget)
            }), y = rt(d) ? i : s;
            Te.useEffect(() => {
                if (!n) return void m(a);
                if (!y) return;

                function e() {
                    u.current?.(), u.current = null
                }
                const t = f(i);
                return !c.current.openEvent || Tn(c.current.openEvent) ? u.current = Se(t, "mousemove", function(t) {
                    const n = it(t);
                    st(i, n) ? e() : v(t.clientX, t.clientY)
                }) : m(a), e
            }, [y, n, i, c, a, o, v, m, g]), Te.useEffect(() => () => {
                o.set("positionReference", null)
            }, [o]), Te.useEffect(() => {
                n && !i && (l.current = !1)
            }, [n, i]), Te.useEffect(() => {
                !n && s && (l.current = !0)
            }, [n, s]);
            const x = Te.useMemo(() => {
                function e(e) {
                    p(e.pointerType)
                }
                return {
                    onPointerDown: e,
                    onPointerEnter: e,
                    onMouseMove: b,
                    onMouseEnter: b
                }
            }, [b]);
            return Te.useMemo(() => n ? {
                reference: x,
                trigger: x
            } : {}, [n, x])
        }(r, {
            enabled: !t && "none" !== n,
            axis: "none" === n ? void 0 : n
        }),
        i = Te.useMemo(() => X(s.reference, o.reference), [s.reference, o.reference]);
    return Jn(e, {
        activeTriggerProps: i,
        inactiveTriggerProps: i,
        popupProps: o.floating ?? j
    }), null
}
var Ar = Te.createContext(void 0);
var jr = "data-base-ui-tooltip-trigger";

function Dr(e) {
    if ("composedPath" in e) {
        const t = e.composedPath();
        for (let e = 0; e < t.length; e += 1) {
            const n = t[e];
            if (b(n)) return n
        }
    }
    const t = e.target;
    return b(t) ? t : null
}
var Nr = Ne(function(e, t) {
        const {
            render: n,
            className: r,
            style: o,
            handle: s,
            payload: i,
            disabled: a,
            delay: c,
            closeOnClick: l = !0,
            closeDelay: u,
            id: d,
            ...f
        } = e, p = Be(!0), g = ar(s) ?? p;
        if (!g) throw new Error(S(82));
        const h = D(d),
            m = g.useState("isTriggerActive", h),
            v = g.useState("isOpenedByTrigger", h),
            y = g.useState("floatingRootContext"),
            x = Te.useRef(null),
            E = u ?? 0,
            {
                registerTrigger: C,
                isMountedByThisTrigger: T
            } = _n(h, x, g, {
                payload: i,
                closeOnClick: l,
                closeDelay: E
            }),
            R = Te.useContext(Ar),
            {
                activeIdRef: k,
                delayRef: O,
                isInstantPhase: P,
                hasProvider: M
            } = function(e, t = {
                open: !1
            }) {
                const {
                    open: n
                } = t, r = "rootStore" in e ? e.rootStore : e, o = r.useState("floatingId"), {
                    currentIdRef: s,
                    delayRef: i,
                    timeoutMs: a,
                    initialDelayRef: c,
                    currentContextRef: l,
                    hasProvider: u,
                    timeout: d
                } = Te.useContext(Mt), [f, p] = Te.useState(!1), g = Te.useRef(n);
                return N(() => {
                    g.current = n
                }, [n]), N(() => {
                    function e() {
                        l.current?.setIsInstantPhase(!1), s.current = null, l.current = null, i.current = c.current, d.clear()
                    }
                    if (s.current && !n && s.current === o) {
                        if (p(!1), a) {
                            const t = o;
                            return d.start(a, () => {
                                r.select("open") || s.current && s.current !== t || e()
                            }), () => {
                                (g.current || s.current !== t) && d.clear()
                            }
                        }
                        e()
                    }
                }, [n, o, s, i, a, c, l, d, r]), N(() => {
                    if (!n) return;
                    const e = l.current,
                        t = s.current;
                    d.clear(), l.current = {
                        onOpenChange: r.setOpen,
                        setIsInstantPhase: p
                    }, s.current = o, i.current = {
                        open: 0,
                        close: kt(c.current, "close")
                    }, null !== t && t !== o ? (p(!0), e?.setIsInstantPhase(!0), e?.onOpenChange(!1, ae(Y))) : (p(!1), e?.setIsInstantPhase(!1))
                }, [n, o, r, s, i, c, l, d]), N(() => () => {
                    if (s.current === o) {
                        if (l.current = null, !g.current) return;
                        s.current = null,
                            function(e, t) {
                                e.current = t.current
                            }(i, c), d.clear()
                    }
                }, [l, s, i, o, c, d]), Te.useMemo(() => ({
                    activeIdRef: s,
                    hasProvider: u,
                    delayRef: i,
                    isInstantPhase: f
                }), [s, u, i, f])
            }(y, {
                open: v
            }),
            I = hr(y);
        g.useSyncedValue("isInstantPhase", P);
        const A = g.useState("disabled"),
            j = a ?? A,
            F = w(j),
            W = g.useState("trackCursorAxis"),
            B = g.useState("disableHoverablePopup"),
            V = Te.useRef(!1),
            H = He(),
            z = Te.useRef(void 0);

        function L() {
            return M && null != k.current ? 0 : c ?? R ?? 600
        }

        function $(e) {
            const t = x.current;
            if (!t || !e) return !1;
            const n = function(e) {
                let t = e;
                for (; t;) {
                    const e = t.closest(`[${jr}]`);
                    if (e) return e;
                    const n = t.getRootNode();
                    t = "host" in n && b(n.host) ? n.host : null
                }
                return null
            }(e);
            return null !== n && n !== t && st(t, n)
        }
        const Q = br(y, {
                enabled: !j,
                mouseOnly: !0,
                move: !1,
                handleClose: B || "both" === W ? null : Cr(),
                restMs: L,
                delay: () => null == u && M ? {
                    close: kt(O.current, "close")
                } : {
                    close: E
                },
                triggerElementRef: x,
                isActiveTrigger: m,
                isClosing: () => "ending" === g.select("transitionStatus"),
                shouldOpen: () => !V.current
            }),
            U = ur(y, {
                enabled: !j
            }).reference,
            q = e => {
                const t = V.current,
                    n = Dr(e),
                    r = function(e) {
                        const t = $(e);
                        return V.current = t, t && (I.openChangeTimeout.clear(), I.restTimeout.clear(), I.restTimeoutPending = !1, H.clear()), t
                    }(n),
                    o = x.current,
                    s = o && n && st(o, n);
                if (r && g.select("open") && "trigger-hover" === g.select("lastOpenChangeReason")) g.setOpen(!1, ae(G, e));
                else if (t && !r && s && !F.current && !g.select("open") && o && rt(z.current)) {
                    const t = () => {
                            V.current || F.current || g.select("open") || g.setOpen(!0, ae(G, e, o))
                        },
                        n = L();
                    0 === n ? (H.clear(), t()) : H.start(n, t)
                }
            },
            X = g.useState("triggerProps", T);
        return K("button", e, {
            state: {
                open: v
            },
            ref: [t, C, x],
            props: [Q, U, T || "none" !== W ? X : void 0, {
                onMouseOver(e) {
                    q(e.nativeEvent)
                },
                onFocus(e) {
                    $(Dr(e.nativeEvent)) && e.preventBaseUIHandler()
                },
                onMouseLeave() {
                    V.current = !1, H.clear(), z.current = void 0
                },
                onPointerEnter(e) {
                    z.current = e.pointerType
                },
                onPointerDown(e) {
                    z.current = e.pointerType, g.set("closeOnClick", l), l && !g.select("open") && g.cancelPendingOpen(e.nativeEvent)
                },
                onClick(e) {
                    l && !g.select("open") && g.cancelPendingOpen(e.nativeEvent)
                },
                id: h,
                [Et]: j ? "" : void 0,
                [jr]: j ? void 0 : ""
            }, f],
            stateAttributesMapping: bt
        })
    }),
    Fr = Te.createContext(void 0);
var Wr = Te.forwardRef(function(e, t) {
        const {
            children: n,
            container: r,
            className: o,
            render: s,
            style: i,
            ...a
        } = e, {
            node: c,
            subtree: l
        } = gn({
            container: r,
            ref: t,
            componentProps: e,
            elementProps: a
        });
        return l || c ? (0, Oe.jsxs)(Te.Fragment, {
            children: [l, c && Ce.createPortal(n, c)]
        }) : null
    }),
    Br = Te.forwardRef(function(e, t) {
        const {
            keepMounted: n = !1,
            ...r
        } = e;
        return Be().useState("mounted") || n ? (0, Oe.jsx)(Fr.Provider, {
            value: n,
            children: (0, Oe.jsx)(Wr, {
                ref: t,
                ...r
            })
        }) : null
    }),
    Vr = Te.createContext(void 0);
var Hr = (e, t) => {
        const {
            name: n,
            fn: r
        } = (e => ({
            name: "arrow",
            options: e,
            async fn(t) {
                const {
                    x: n,
                    y: r,
                    placement: o,
                    rects: s,
                    platform: a,
                    elements: c,
                    middlewareData: l
                } = t, {
                    element: u,
                    padding: d = 0,
                    offsetParent: f = "real"
                } = x(e, t) || {};
                if (null == u) return {};
                const p = ie(d),
                    g = {
                        x: n,
                        y: r
                    },
                    h = Q(o),
                    m = he(h),
                    v = await a.getDimensions(u),
                    b = "y" === h,
                    y = b ? "top" : "left",
                    E = b ? "bottom" : "right",
                    w = b ? "clientHeight" : "clientWidth",
                    S = s.reference[m] + s.reference[h] - g[h] - s.floating[m],
                    C = g[h] - s.reference[h],
                    T = "real" === f ? await (a.getOffsetParent?.(u)) : c.floating;
                let R = c.floating[w] || s.floating[m];
                R && await (a.isElement?.(T)) || (R = c.floating[w] || s.floating[m]);
                const k = S / 2 - C / 2,
                    O = R / 2 - v[m] / 2 - 1,
                    P = Math.min(p[y], O),
                    M = Math.min(p[E], O),
                    A = P,
                    j = R - v[m] - M,
                    D = R / 2 - v[m] / 2 + k,
                    N = I(A, D, j),
                    F = !l.arrow && null != i(o) && D !== N && s.reference[m] / 2 - (D < A ? P : M) - v[m] / 2 < 0,
                    W = F ? D < A ? D - A : D - j : 0;
                return {
                    [h]: g[h] + W,
                    data: {
                        [h]: N,
                        centerOffset: D - N - W,
                        ...F && {
                            alignmentOffset: W
                        }
                    },
                    reset: F
                }
            }
        }))(e);
        return {
            name: n,
            fn: r,
            options: [e, t]
        }
    },
    zr = {
        name: "hide",
        async fn(e) {
            const {
                width: t,
                height: n,
                x: r,
                y: o
            } = e.rects.reference, s = 0 === t && 0 === n && 0 === r && 0 === o, i = await e.platform.detectOverflow(e, {
                elementContext: "reference"
            });
            return {
                data: {
                    referenceHidden: i.top - n >= 0 || i.right - t >= 0 || i.bottom - n >= 0 || i.left - t >= 0 || s
                }
            }
        }
    },
    Lr = {
        sideX: "left",
        sideY: "top"
    },
    $r = "--anchor-width",
    Qr = "--anchor-height",
    Ur = "--transform-origin",
    Yr = "--available-width",
    qr = "--available-height";

function Xr(e, t, n) {
    const r = "inline-start" === e || "inline-end" === e;
    return {
        top: "top",
        right: r ? n ? "inline-start" : "inline-end" : "right",
        bottom: "bottom",
        left: r ? n ? "inline-end" : "inline-start" : "left"
    } [t]
}

function _r(e, t, n) {
    const {
        rects: r,
        placement: o
    } = e;
    return {
        side: Xr(t, de(o), n),
        align: i(o) || "center",
        anchor: {
            width: r.reference.width,
            height: r.reference.height
        },
        positioner: {
            width: r.floating.width,
            height: r.floating.height
        }
    }
}

function Kr(e) {
    return function(e, t) {
        const {
            anchor: n,
            positionMethod: r = "absolute",
            side: o = "bottom",
            sideOffset: s = 0,
            align: a = "center",
            alignOffset: c = 0,
            collisionBoundary: l,
            collisionPadding: u = 5,
            sticky: p = !1,
            arrowPadding: g = 5,
            disableAnchorTracking: m = !1,
            inline: b,
            keepMounted: y = !1,
            floatingRootContext: x,
            mounted: E,
            collisionAvoidance: S,
            shift: C,
            nodeId: T,
            adaptiveOrigin: k,
            lazyFlip: P = !1,
            externalTree: M
        } = e, [I, A] = Te.useState(null);
        E || null === I || A(null);
        const j = S.side || "flip",
            D = S.align || "flip",
            F = S.fallbackAxisSide || "end",
            B = C?.crossAxis ?? !1,
            V = C?.rootBoundary,
            H = "function" == typeof n ? n : void 0,
            z = W(H),
            L = H ? z : n,
            $ = w(n),
            Q = w(E),
            U = "rtl" === (Te.useContext(Pe)?.direction ?? "ltr"),
            Y = I || {
                top: "top",
                right: "right",
                bottom: "bottom",
                left: "left",
                "inline-end": U ? "left" : "right",
                "inline-start": U ? "right" : "left"
            } [o],
            q = "center" === a ? Y : `${Y}-${a}`;
        let X = u;
        "number" == typeof X ? X = {
            top: X,
            right: X,
            bottom: X,
            left: X
        } : X && (X = {
            top: X.top || 0,
            right: X.right || 0,
            bottom: X.bottom || 0,
            left: X.left || 0
        });
        const _ = 1,
            K = "bottom" === o ? _ : 0,
            G = "top" === o ? _ : 0,
            J = "right" === o ? _ : 0,
            ee = "left" === o ? _ : 0,
            te = {
                boundary: "clipping-ancestors" === l ? "clippingAncestors" : l,
                padding: X
            },
            ne = Te.useRef(null),
            re = w(s),
            oe = w(c),
            se = "function" != typeof s ? s : 0,
            ie = "function" != typeof c ? c : 0,
            ae = [];
        b && ae.push(b);
        ae.push(v(e => {
            const t = _r(e, o, U),
                n = "function" == typeof re.current ? re.current(t) : re.current,
                r = "function" == typeof oe.current ? oe.current(t) : oe.current;
            return {
                mainAxis: n,
                crossAxis: r,
                alignmentAxis: r
            }
        }, [se, ie, U, o]));
        const ce = "none" === D && "shift" !== j,
            ue = !ce && (p || B || "shift" === j),
            fe = "none" === j ? null : R({
                ...te,
                padding: {
                    top: X.top + _ + K,
                    right: X.right + _ + ee,
                    bottom: X.bottom + _ + G,
                    left: X.left + _ + J
                },
                mainAxis: !B && "flip" === j,
                crossAxis: "flip" === D && "alignment",
                fallbackAxisSideDirection: F
            }),
            pe = ce ? null : le({
                ...te,
                rootBoundary: V,
                mainAxis: "none" !== D,
                crossAxis: ue,
                limiter: p || B ? void 0 : d(e => {
                    if (!ne.current) return {};
                    const {
                        width: t,
                        height: n
                    } = ne.current.getBoundingClientRect(), r = Z(de(e.placement));
                    return {
                        offset: ("y" === r ? t : n) / 2 + ("y" === r ? X.left + X.right : X.top + X.bottom) / 2
                    }
                })
            }, [te, p, B, V, X, D]);
        "shift" === j || "shift" === D || "center" === a ? ae.push(pe, fe) : ae.push(fe, pe);
        ae.push(h({
            ...te,
            apply({
                elements: {
                    floating: e
                },
                availableWidth: t,
                availableHeight: n,
                rects: r
            }) {
                if (!Q.current) return;
                const o = e.style;
                o.setProperty(Yr, `${t}px`), o.setProperty(qr, `${n}px`);
                const s = f(e).devicePixelRatio || 1,
                    {
                        x: i,
                        y: a,
                        width: c,
                        height: l
                    } = r.reference,
                    u = (Math.round((i + c) * s) - Math.round(i * s)) / s,
                    d = (Math.round((a + l) * s) - Math.round(a * s)) / s;
                o.setProperty($r, `${u}px`), o.setProperty(Qr, `${d}px`)
            }
        }), Hr(e => ({
            element: ne.current || Ie(e.elements.floating).createElement("div"),
            padding: ne.current ? g : 0,
            offsetParent: "floating"
        }), [g]), {
            name: "transformOrigin",
            fn(e) {
                const {
                    elements: {
                        floating: t
                    },
                    middlewareData: n,
                    placement: r,
                    platform: a,
                    rects: c,
                    y: l
                } = e, u = de(r), d = i(r), f = "y" === Z(u), p = ne.current, g = "function" == typeof s ? s(_r(e, o, U)) : s;
                let h;
                h = !p && d && Math.abs(f ? n.shift?.x || 0 : n.shift?.y || 0) <= 1 ? "start" === d === (f && !0 === a.isRTL?.(t)) ? "100%" : "0%" : `${(f?n.arrow?.x||0:n.arrow?.y||0)+(f?p?.clientWidth||0:p?.clientHeight||0)/2}px`;
                let m = "top" === u || "left" === u ? `calc(100% + ${g}px)` : -g + "px";
                return ue && f && Math.abs(n.shift?.y || 0) > g && (m = c.reference.y + c.reference.height / 2 - l + "px"), t.style.setProperty(Ur, f ? `${h} ${m}` : `${m} ${h}`), {}
            }
        }, zr, k), N(() => {
            !E && x && x.update({
                referenceElement: null,
                floatingElement: null,
                domReferenceElement: null,
                positionReference: null
            })
        }, [E, x]);
        const ge = Te.useMemo(() => ({
                ancestorScroll: !m,
                elementResize: !m && "undefined" != typeof ResizeObserver,
                layoutShift: !m && "undefined" != typeof IntersectionObserver
            }), [m]),
            {
                refs: he,
                elements: me,
                x: ve,
                y: be,
                middlewareData: ye,
                update: xe,
                placement: Ee,
                context: we,
                isPositioned: Se,
                floatingStyles: Ce
            } = t({
                rootContext: x,
                open: y ? E : void 0,
                placement: q,
                middleware: ae,
                strategy: r,
                whileElementsMounted: y ? void 0 : (...e) => O(...e, ge),
                nodeId: T,
                externalTree: M
            }),
            {
                sideX: Re,
                sideY: ke
            } = ye.adaptiveOrigin || Lr,
            Oe = Se ? r : "fixed",
            Me = Te.useMemo(() => {
                let e;
                return e = Se ? k ? {
                    position: Oe,
                    [Re]: ve,
                    [ke]: be
                } : {
                    ...Ce,
                    position: Oe
                } : {
                    position: Oe,
                    top: 0,
                    left: 0
                }, e[Yr] = "100vw", e[qr] = "100vh", Se || (e.opacity = 0), e
            }, [k, Oe, Re, ve, ke, be, Ce, Se]),
            Ae = Te.useRef(null);
        N(() => {
            if (!E) return;
            const e = $.current,
                t = "function" == typeof e ? e() : e,
                n = (Gr(t) ? t.current : t) || null;
            n !== Ae.current && (he.setPositionReference(n), Ae.current = n)
        }, [E, he, L, $]), Te.useEffect(() => {
            if (!E) return;
            const e = $.current;
            "function" != typeof e && Gr(e) && e.current !== Ae.current && (he.setPositionReference(e.current), Ae.current = e.current)
        }, [E, he, L, $]), Te.useEffect(() => {
            if (y && E && me.reference && me.floating) return O(me.reference, me.floating, xe, ge)
        }, [y, E, me, xe, ge]);
        const je = de(Ee),
            De = Xr(o, je, U),
            Ne = i(Ee) || "center",
            Fe = Boolean(ye.hide?.referenceHidden);
        N(() => {
            P && E && Se && je !== Y && A(je)
        }, [P, E, Se, je, Y]);
        const We = Te.useMemo(() => ({
                position: "absolute",
                top: ye.arrow?.y,
                left: ye.arrow?.x
            }), [ye.arrow]),
            Be = 0 !== ye.arrow?.centerOffset;
        return Te.useMemo(() => ({
            positionerStyles: Me,
            arrowStyles: We,
            arrowRef: ne,
            arrowUncentered: Be,
            side: De,
            align: Ne,
            physicalSide: je,
            anchorHidden: Fe,
            refs: he,
            context: we,
            isPositioned: Se,
            update: xe
        }), [Me, We, ne, Be, De, Ne, je, Fe, he, we, Se, xe])
    }(e, cr)
}

function Gr(e) {
    return null != e && "current" in e
}

function Jr(e) {
    return "starting" === e ? an : j
}

function Zr(e, t, {
    styles: n,
    transitionStatus: r,
    props: o,
    refs: s,
    hidden: i,
    inert: a = !1
}) {
    const c = {
        ...n
    };
    return a && (c.pointerEvents = "none"), K("div", e, {
        state: t,
        ref: s,
        props: [{
            role: "presentation",
            hidden: i,
            style: c
        }, Jr(r), o],
        stateAttributesMapping: yt
    })
}
var eo = Te.forwardRef(function(e, t) {
        const {
            render: n,
            className: r,
            anchor: o,
            positionMethod: s = "absolute",
            side: i = "top",
            align: a = "center",
            sideOffset: c = 0,
            alignOffset: l = 0,
            collisionBoundary: u = "clipping-ancestors",
            collisionPadding: d = 5,
            arrowPadding: f = 5,
            sticky: p = !1,
            disableAnchorTracking: g = !1,
            collisionAvoidance: h = ln,
            style: m,
            ...v
        } = e, b = Be(), y = function() {
            const e = Te.useContext(Fr);
            if (void 0 === e) throw new Error(S(70));
            return e
        }(), x = b.useState("open"), E = b.useState("mounted"), w = b.useState("trackCursorAxis"), C = b.useState("disableHoverablePopup"), T = b.useState("floatingRootContext"), R = b.useState("instantType"), k = b.useState("transitionStatus"), O = Kr({
            anchor: o,
            positionMethod: s,
            floatingRootContext: T,
            mounted: E,
            side: i,
            sideOffset: c,
            align: a,
            alignOffset: l,
            collisionBoundary: u,
            collisionPadding: d,
            sticky: p,
            arrowPadding: f,
            disableAnchorTracking: g,
            keepMounted: y,
            collisionAvoidance: h,
            adaptiveOrigin: b.useState("adaptiveOrigin")
        }), P = Zr(e, Te.useMemo(() => ({
            open: x,
            side: O.side,
            align: O.align,
            anchorHidden: O.anchorHidden,
            instant: "none" !== w ? "tracking-cursor" : R
        }), [x, O.side, O.align, O.anchorHidden, w, R]), {
            styles: O.positionerStyles,
            transitionStatus: k,
            props: v,
            refs: [t, b.useStateSetter("positionerElement")],
            hidden: !E,
            inert: !x || "both" === w || C
        });
        return (0, Oe.jsx)(Vr.Provider, {
            value: O,
            children: P
        })
    }),
    to = Te.forwardRef(function(e, t) {
        const {
            render: n,
            className: r,
            style: o,
            ...s
        } = e, i = Be(), {
            side: a,
            align: c
        } = function() {
            const e = Te.useContext(Vr);
            if (void 0 === e) throw new Error(S(71));
            return e
        }(), l = i.useState("open"), u = i.useState("instantType"), d = i.useState("transitionStatus"), f = i.useState("popupProps"), p = i.useState("floatingRootContext"), h = i.useState("disabled"), m = i.useState("closeDelay");
        g({
            open: l,
            ref: i.context.popupRef,
            onComplete() {
                l && i.context.onOpenChangeComplete?.(!0)
            }
        }), mr(p, {
            enabled: !h,
            closeDelay: m
        });
        const v = i.useStateSetter("popupElement");
        return K("div", e, {
            state: {
                open: l,
                side: a,
                align: c,
                instant: u,
                transitionStatus: d
            },
            ref: [t, i.context.popupRef, v],
            props: [Ln, f, Jr(d), s],
            stateAttributesMapping: xt
        })
    }),
    no = function(e) {
        const {
            delay: t,
            closeDelay: n,
            timeout: r = 400
        } = e, o = Te.useMemo(() => ({
            open: t,
            close: n
        }), [t, n]);
        return (0, Oe.jsx)(Ar.Provider, {
            value: t,
            children: (0, Oe.jsx)(It, {
                delay: o,
                timeoutMs: r,
                children: e.children
            })
        })
    },
    ro = class extends Pn {
        constructor() {
            super(function() {
                const e = new er,
                    t = new Tr(Object.freeze(Or(void 0, e)), Object.freeze(Pr(e)), Rr);
                return Object.assign(t, {
                    setOpen: ve,
                    cancelPendingOpen: ve
                })
            }(), "Tooltip")
        }
        open(e) {
            this.openByTrigger(e)
        }
        close() {
            this.closePopup()
        }
        get isOpen() {
            return this.attachedStore?.select("open") ?? !1
        }
    };

function oo(e) {
    const t = e.documentElement,
        n = e.defaultView?.getComputedStyle(t).getPropertyValue("--desktop-titlebar-inset") || t.style.getPropertyValue("--desktop-titlebar-inset"),
        r = Number.parseFloat(n);
    return Number.isFinite(r) && r > 0 ? r : 0
}
var so = new WeakMap;
var io = () => 0,
    ao = () => () => {};

function co(e) {
    const t = pe(),
        n = (0, Te.useCallback)(() => (function(e) {
            const t = e => "object" == typeof e && null !== e && (1 === e.nodeType || 11 === e.nodeType) && "ownerDocument" in e;
            if (t(e)) return e;
            if ("object" == typeof e && null !== e && "current" in e) {
                const n = e.current;
                return t(n) ? n : null
            }
            return null
        }(e) ?? t)?.ownerDocument ?? ("undefined" == typeof document ? null : document), [e, t]),
        [r, o] = (0, Te.useState)(n);
    Me(() => {
        o(n())
    });
    const s = (0, Te.useMemo)(() => null === r ? null : function(e) {
        let t = so.get(e);
        if (void 0 === t) {
            const n = new Set;
            let r, o = null,
                s = !1,
                i = !1;
            const a = () => (i = !1, r = oo(e), r);
            t = {
                subscribe(t) {
                    if (n.add(t), null === o && !s) {
                        const t = U(MutationObserver, () => {
                            if (0 === n.size) return void(i = !0);
                            const e = r;
                            if (a() !== e)
                                for (const t of n) t()
                        });
                        t.observe(e.documentElement, {
                            attributes: !0,
                            attributeFilter: ["style"]
                        }) ? (a(), o = t) : s = !0
                    }
                    return () => {
                        n.delete(t)
                    }
                },
                getSnapshot: () => {
                    if (null === o) return oo(e);
                    const t = 0 === n.size && o.takeRecords().length > 0;
                    return (i || t) && a(), r
                }
            }, so.set(e, t)
        }
        return t
    }(r), [r]);
    return (0, Te.useSyncExternalStore)(null === s ? ao : s.subscribe, null === s ? io : s.getSnapshot, io)
}
var lo = (0, Te.createContext)(null);

function uo({
    override: e,
    container: t,
    provideInherit: n = !1,
    children: r
}) {
    const o = function(e, t) {
            const n = co(t);
            return (0, Te.useMemo)(() => void 0 !== e ? e : n <= 0 ? void 0 : {
                top: 5 + n,
                right: 5,
                bottom: 5,
                left: 5
            }, [e, n])
        }(e, t),
        s = (0, Te.useMemo)(() => ({
            collisionPadding: o
        }), [o]),
        i = r(o);
    return n ? (0, Oe.jsx)(lo.Provider, {
        value: s,
        children: i
    }) : i
}
var fo = new WeakMap;

function po() {
    const e = (0, Te.useRef)(void 0),
        t = (0, Te.useCallback)(() => {
            window.clearTimeout(e.current), e.current = void 0
        }, []),
        n = (0, Te.useCallback)((n, r) => {
            t(), e.current = window.setTimeout(r, n)
        }, [t]);
    return (0, Te.useEffect)(() => t, [t]), (0, Te.useMemo)(() => ({
        start: n,
        cancel: t
    }), [n, t])
}
var go = "maxWidth",
    ho = new WeakMap,
    mo = new WeakMap;

function vo(e, t) {
    e.style[go] = t, mo.set(e, t)
}

function bo(e) {
    const t = e.style[go];
    return ho.has(e) && t === mo.get(e) ? ho.get(e) ?? "" : t
}

function yo(e) {
    ho.set(e, bo(e))
}

function xo(e) {
    return [e.whiteSpace, e.wordBreak, e.overflowWrap, e.hyphens, e.lineBreak, e.textWrap, e.textAlign].join("|")
}
var Eo = new WeakMap;

function wo(e, t, n) {
    let r = Eo.get(e);
    if (r || (r = new Map, Eo.set(e, r)), r.delete(t), r.set(t, n), r.size > 512) {
        const e = r.keys().next().value;
        void 0 !== e && r.delete(e)
    }
}

function So(e, t) {
    let n = e;
    for (let r = 0; r < t.length; r++) n ^= t.charCodeAt(r), n = Math.imul(n, 16777619);
    return n >>> 0
}
var Co = 2166136261;

function To(e) {
    const t = e.textContent ?? "";
    if (0 === t.length || t.length > 2e4) return null;
    const n = e.closest("[data-density]")?.getAttribute("data-density") ?? "",
        r = e.closest("[data-text-size]")?.getAttribute("data-text-size") ?? "",
        o = e.closest("[lang]")?.getAttribute("lang") ?? "",
        s = e.getElementsByTagName("*");
    let i = Co;
    for (const a of s) i = So(i, a.tagName), i = So(i, a.getAttribute("class") ?? ""), i = So(i, Ro(a)), i = So(i, a.getAttribute("data-shrinkwrap") ?? ""), i = So(i, "|");
    return [e.className, n, r, o, s.length, i, t.length, So(Co, t)].join("|")
}

function Ro(e) {
    const t = (e.getAttribute("style") ?? "").replace(/(^|;)\s*max-width:[^;]*;?/g, "$1");
    return e instanceof HTMLElement ? `${t}|${bo(e)}` : t
}

function ko(e) {
    const t = [];
    for (let n = e.parentElement, r = 0; n && r < 16; n = n.parentElement, r++) t.push(n.offsetWidth);
    return t
}

function Oo(e, t) {
    const n = ko(e);
    return n.length === t.length && n.every((e, n) => Math.abs(e - (t[n] ?? 0)) <= 1)
}

function Po(e) {
    const t = e.parentElement,
        n = t?.ownerDocument.defaultView?.getComputedStyle(t);
    return t && n ? t.clientWidth - (parseFloat(n.paddingLeft) || 0) - (parseFloat(n.paddingRight) || 0) : 0
}

function Mo(e, t) {
    const n = e.ownerDocument,
        r = n.defaultView,
        o = [];
    let s = Number.POSITIVE_INFINITY,
        i = Number.NEGATIVE_INFINITY;
    const a = e => {
        o.push(e), e.left < s && (s = e.left), e.right > i && (i = e.right)
    };
    let c = 0,
        l = Number.POSITIVE_INFINITY,
        u = Number.NEGATIVE_INFINITY;
    const d = e => {
            e.left < l && (l = e.left), e.right > u && (u = e.right)
        },
        f = t => {
            for (let n = 1 === t.nodeType ? t : t.parentElement; n && n !== e; n = n.parentElement)
                if ("fill" === n.getAttribute("data-shrinkwrap")) return !0;
            return !1
        },
        p = n.createRange(),
        g = n.createTreeWalker(e, 5, {
            acceptNode: e => {
                if (1 === e.nodeType) {
                    const t = r?.getComputedStyle(e);
                    return !t || "none" !== t.display && "absolute" !== t.position && "fixed" !== t.position ? 1 : 2
                }
                return f(e) ? 2 : 1
            }
        });
    let h = g.nextNode();
    for (; h;) {
        if (3 === h.nodeType) {
            p.selectNodeContents(h);
            for (const e of p.getClientRects?.() ?? []) e.width > 0 && (a(e), d(e))
        } else {
            const e = h,
                t = r?.getComputedStyle(e),
                n = e.getBoundingClientRect();
            if (n.width > 0 && d(n), t && !f(e) && Ao(e, t))
                for (const r of e.getClientRects()) r.width > 0 && a(r);
            !t || "visible" === t.overflowX && "visible" === t.overflowY || (c += Math.max(0, e.scrollWidth - e.clientWidth) + Math.max(0, e.scrollHeight - e.clientHeight))
        }
        if (t && i > s && t(i - s)) break;
        h = g.nextNode()
    }
    return {
        rects: o,
        left: s,
        right: i,
        clipped: c,
        boundLeft: l,
        boundRight: u
    }
}
var Io = new Set(["IMG", "SVG", "VIDEO", "AUDIO", "CANVAS", "IFRAME", "EMBED", "OBJECT", "PICTURE", "INPUT", "TEXTAREA", "SELECT", "PROGRESS", "METER"]);

function Ao(e, t) {
    return !!Io.has(e.tagName.toUpperCase()) || t.display.startsWith("inline")
}

function jo(e, {
    rects: t,
    clipped: n,
    boundLeft: r,
    boundRight: o
}) {
    const s = e.ownerDocument.defaultView?.getComputedStyle(e),
        i = e.getBoundingClientRect();
    let a = 0;
    if (s && Number.isFinite(r)) {
        const e = parseFloat(s.width),
            t = "border-box" === s.boxSizing ? e : e + parseFloat(s.paddingLeft) + parseFloat(s.paddingRight) + parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth),
            n = t > 0 && i.width / t || 1,
            c = i.left + (parseFloat(s.borderLeftWidth) + parseFloat(s.paddingLeft)) * n,
            l = i.right - (parseFloat(s.borderRightWidth) + parseFloat(s.paddingRight)) * n;
        a = Math.max(0, o - l) + Math.max(0, c - r)
    }
    return {
        height: e.scrollHeight,
        overflow: e.scrollWidth,
        client: e.clientWidth,
        spill: a,
        clipped: n,
        widths: t.map(e => e.width)
    }
}

function Do(e) {
    ho.has(e) && (yo(e), vo(e, ho.get(e) ?? ""))
}

function No(e, t, n = {}) {
    return {
        el: e,
        done: t,
        lookup: n.lookup ?? !1,
        remember: n.remember ?? !1,
        key: void 0,
        rules: "",
        width: null,
        boxWidth: 0,
        borderBoxSizing: !0,
        natural: null,
        candidate: 0,
        stage: "read",
        lo: 0,
        hi: 0,
        probes: 0,
        resizeDue: !1
    }
}

function Fo(e, t) {
    null === t ? Do(e.el) : vo(e.el, `${t}px`), e.stage = "settled", e.width = t, e.done(t)
}

function Wo(e, t) {
    const {
        el: n
    } = e;
    if (!e.remember || null === e.natural || "" !== bo(n) || "loading" === n.ownerDocument.fonts?.status) return;
    const r = void 0 === e.key ? To(n) : e.key,
        o = ko(n);
    null === r || o.every(e => e <= 0) || wo(n.ownerDocument, r, {
        width: t,
        natural: e.natural,
        rooms: o,
        content: Po(n),
        rules: e.rules
    })
}

function Bo(e) {
    const {
        el: t
    } = e, n = t.ownerDocument.defaultView;
    if (!n || "function" != typeof t.getBoundingClientRect) return void Fo(e, null);
    const r = n.getComputedStyle(t),
        o = parseFloat(r.width);
    if (!Number.isFinite(o) || o <= 0) return void Fo(e, null);
    const s = "border-box" === r.boxSizing,
        i = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight) + parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth),
        a = s ? o : o + i,
        c = t.getBoundingClientRect().width / a || 1,
        l = e => {
            const t = e / c;
            return Math.ceil((s ? t + i : t) - .001)
        },
        u = e => l(e) >= o - .5,
        d = Mo(t, u);
    if (0 === d.rects.length) return void Fo(e, null);
    const f = d.right - d.left;
    u(f) ? Fo(e, null) : (e.natural = jo(t, d), e.rules = e.remember ? xo(r) : "", e.boxWidth = o, e.borderBoxSizing = s, e.candidate = l(f), e.stage = "verify")
}

function Vo(e, t) {
    if (null === t) return !1;
    const n = jo(e, Mo(e));
    return r = t, ((o = n).height < r.height || o.clipped < r.clipped - .5) && r.widths.length === o.widths.length && r.widths.every((e, t) => Math.abs(e - (o.widths[t] ?? NaN)) <= .5) ? "shrank" : function(e, t) {
        return !(t.height > e.height || t.overflow > t.client + .5 || t.spill > e.spill + .5 || t.clipped > e.clipped + .5) && e.widths.length === t.widths.length && e.widths.every((e, n) => Math.abs(e - (t.widths[n] ?? NaN)) <= .5)
    }(t, n);
    var r, o
}

function Ho(e, t) {
    const {
        boxWidth: n
    } = e;
    if ("verify" === e.stage) {
        if (t) return Fo(e, e.candidate), null;
        if (e.stage = "nudge1", e.candidate + 1 < n) return e.candidate + 1;
        e.stage = "bisect"
    } else if ("nudge1" === e.stage) {
        if (t) return Fo(e, e.candidate + 1), null;
        if (e.stage = "nudge2", e.candidate + 2 < n) return e.candidate + 2;
        e.stage = "bisect"
    } else if ("nudge2" === e.stage) {
        if (t) return Fo(e, e.candidate + 2), null;
        e.stage = "bisect"
    } else if ("bisect" === e.stage) {
        e.probes += 1;
        const n = e.lo > 0 ? Math.floor((e.lo + e.hi) / 2) : NaN;
        t ? e.hi = n : e.lo = n
    }
    return "bisect" === e.stage ? (0 === e.lo && (e.lo = e.candidate + 2, e.hi = Math.ceil(n)), e.probes >= 12 || e.hi - e.lo <= 1 ? (e.hi < n - .5 ? Fo(e, e.hi) : Fo(e, null), null) : Math.floor((e.lo + e.hi) / 2)) : null
}

function zo(e, t) {
    const n = e.ownerDocument.defaultView?.getComputedStyle(e);
    return void 0 !== n && xo(n) === t
}

function Lo(e) {
    if (!e.lookup) return;
    if (e.lookup = !1, yo(e.el), "" !== bo(e.el)) return void(e.remember = !1);
    e.key = To(e.el);
    const t = null === e.key ? void 0 : (n = e.el, r = e.key, Eo.get(n.ownerDocument)?.get(r));
    var n, r;
    return t && null !== e.key ? {
        job: e,
        key: e.key,
        known: t
    } : void 0
}

function $o(e) {
    for (const n of e) yo(n.el), Do(n.el);
    for (const n of e) Bo(n);
    let t = e.filter(e => "verify" === e.stage);
    for (const n of t) vo(n.el, `${n.candidate}px`);
    for (let n = 0; t.length > 0 && n < 16; n++) {
        const e = t.map(e => [e, Vo(e.el, e.natural)]),
            n = [];
        for (const [t, r] of e) {
            if ("shrank" === r) {
                Fo(t, null);
                continue
            }
            const e = Ho(t, r);
            null !== e && n.push([t, e])
        }
        for (const [t, r] of n) vo(t.el, `${r}px`);
        t = n.map(([e]) => e)
    }
    for (const n of t) "settled" !== n.stage && Fo(n, null)
}

function Qo(e) {
    let t = null;
    return $o([No(e, e => {
        t = e
    })]), t
}
var Uo = new WeakMap;

function Yo(e, t, n) {
    const r = function(e) {
        const t = [],
            n = [];
        for (const r of e) {
            const e = Lo(r);
            e ? t.push(e) : n.push(r)
        }
        for (const {
                job: r,
                known: o
            }
            of t) null === o.width ? Do(r.el) : vo(r.el, `${o.width}px`);
        for (const {
                job: r,
                key: o,
                known: s
            }
            of t) {
            const {
                el: e
            } = r;
            Oo(e, s.rooms) && Math.abs(Po(e) - s.content) <= 1 && zo(e, s.rules) && !0 === Vo(e, s.natural) ? (r.stage = "settled", r.width = s.width, r.done(s.width), wo(e.ownerDocument, o, s)) : n.push(r)
        }
        return n
    }(n);
    if (r.length > 0) {
        $o(r);
        for (const e of r) "settled" === e.stage && Wo(e, e.width)
    }
    t.queue.size > 0 || (t.frameQueued && (e.cancelAnimationFrame(t.frameQueued), t.frameQueued = 0), t.microtaskQueued || Uo.delete(e))
}

function qo(e) {
    const t = Uo.get(e);
    if (!t) return;
    t.microtaskQueued = !1, t.frameQueued && (e.cancelAnimationFrame(t.frameQueued), t.frameQueued = 0);
    const n = [...t.queue.values()];
    t.queue.clear(), Yo(e, t, n)
}

function Xo(e, t, n, r = {}) {
    const o = e.ownerDocument.defaultView;
    if (!o) return void t(Qo(e));
    const s = function(e) {
        let t = Uo.get(e);
        return t || (t = {
            queue: new Map,
            microtaskQueued: !1,
            frameQueued: 0
        }, Uo.set(e, t)), t
    }(o);
    let i = s.queue.get(e);
    i ? (i.done = t, i.lookup ||= r.lookup ?? !1, i.remember &&= r.remember ?? !1) : (i = No(e, t, r), s.queue.set(e, i)), "microtask" === n ? s.microtaskQueued || (s.microtaskQueued = !0, queueMicrotask(() => {
        qo(o)
    })) : "resize" === n ? i.resizeDue = !0 : s.frameQueued || s.microtaskQueued || (s.frameQueued = o.requestAnimationFrame(() => {
        qo(o)
    }))
}
var _o = new WeakMap;

function Ko(e, t, n) {
    let r = _o.get(e);
    if (!r) {
        const t = new Map;
        r = {
            observer: new e.ResizeObserver(n => {
                for (const e of n)
                    for (const n of t.get(e.target) ?? []) n(e);
                ! function(e) {
                    const t = Uo.get(e);
                    if (!t) return;
                    const n = [];
                    for (const [r, o] of t.queue) o.resizeDue && (t.queue.delete(r), n.push(o));
                    Yo(e, t, n)
                }(e)
            }),
            handlers: t,
            paused: new Set,
            resumeQueued: 0
        }, _o.set(e, r)
    }
    let o = r.handlers.get(t);
    if (!o) {
        try {
            r.observer.observe(t)
        } catch (s) {
            throw 0 === r.handlers.size && _o.delete(e), s
        }
        o = new Set, r.handlers.set(t, o)
    }
    o.add(n)
}

function Go(e, t, n) {
    const r = _o.get(e),
        o = r?.handlers.get(t);
    r && o && (o.delete(n), 0 === o.size && (r.handlers.delete(t), r.paused.delete(t), r.observer.unobserve(t)), 0 === r.handlers.size && (r.observer.disconnect(), r.resumeQueued && e.cancelAnimationFrame(r.resumeQueued), _o.delete(e)))
}

function Jo(e, t) {
    const n = _o.get(e);
    n && n.handlers.has(t) && !n.paused.has(t) && (n.observer.unobserve(t), n.paused.add(t), n.resumeQueued || (n.resumeQueued = e.requestAnimationFrame(() => {
        n.resumeQueued = 0;
        for (const e of n.paused) n.handlers.has(e) && n.observer.observe(e);
        n.paused.clear()
    })))
}
var Zo = new WeakMap;

function es(e, {
    immediate: t = !1,
    remember: n = !1
} = {}) {
    const r = n && !t;
    let o = !1,
        s = null;
    const i = e.ownerDocument.defaultView,
        a = new Map,
        c = [],
        l = e => {
            const t = e;
            a.set(e, {
                inline: t.offsetWidth ?? 0,
                block: t.offsetHeight ?? 0
            })
        },
        u = i?.ResizeObserver ? i : null;
    let d = 0;
    const f = e => {
            if (!o) {
                s = e;
                for (const e of c) l(e);
                if (u && d > 0)
                    for (const e of c.slice(d)) Jo(u, e);
                d = 0
            }
        },
        p = t => {
            o || Xo(e, f, t, {
                remember: r && "resize" !== t
            })
        },
        g = t => {
            const n = t.borderBoxSize?.[0],
                r = n ? n.inlineSize : t.contentRect.width,
                o = n ? n.blockSize : t.contentRect.height,
                i = a.get(t.target) ?? {
                    inline: r,
                    block: o
                };
            a.set(t.target, {
                inline: r,
                block: o
            });
            const l = t.target === e;
            (function(e) {
                if (e.self) {
                    const t = null !== e.applied && Math.abs(e.inline - e.applied) <= 1;
                    return Math.abs(e.block - e.prevBlock) > 1 || !t && Math.abs(e.inline - e.prevInline) > 1
                }
                return Math.abs(e.inline - e.prevInline) > 1
            })({
                self: l,
                inline: r,
                block: o,
                prevInline: i.inline,
                prevBlock: i.block,
                applied: s
            }) && (l || (d = Math.max(d, c.indexOf(t.target))), p(l ? "frame" : "resize"))
        },
        h = e => {
            u && Ko(u, e, g), c.push(e), t && l(e)
        };
    let m = null,
        v = () => {};
    const b = () => {
        if (o = !0, function(e) {
                const t = e.ownerDocument.defaultView;
                if (!t) return;
                const n = Uo.get(t);
                n && (n.queue.delete(e), Yo(t, n, []))
            }(e), u)
            for (const e of c) Go(u, e, g);
        m?.disconnect(), v(), Do(e)
    };
    try {
        t ? s = Qo(e) : Xo(e, f, "microtask", {
            lookup: r,
            remember: r
        }), h(e);
        for (let t = e.parentElement, r = 0; t && r < 16; t = t.parentElement, r++) h(t);
        if (i?.MutationObserver) {
            const t = new i.MutationObserver(() => {
                p("microtask")
            });
            t.observe(e, {
                subtree: !0,
                childList: !0,
                characterData: !0,
                attributes: !0,
                attributeFilter: ["data-shrinkwrap"]
            }), m = t
        }
        const n = e.ownerDocument.fonts,
            o = () => p("microtask");
        if (v = function(e, t) {
                if ("function" != typeof e?.addEventListener) return () => {};
                let n = Zo.get(e);
                if (!n) {
                    const t = new Set,
                        r = () => {
                            for (const e of t) e()
                        };
                    e.addEventListener("loadingdone", r), n = {
                        refits: t,
                        listener: r
                    }, Zo.set(e, n)
                }
                const r = n;
                return r.refits.add(t), () => {
                    r.refits.delete(t), 0 === r.refits.size && Zo.get(e) === r && (Zo.delete(e), e.removeEventListener?.("loadingdone", r.listener))
                }
            }(n, o), n && "loaded" !== n.status) try {
            const e = n.ready;
            "function" == typeof e?.then && e.then(o, o)
        } catch {}
    } catch (y) {
        try {
            b()
        } catch {}
        throw y
    }
    return b
}

function ts({
    enabled: e = !0,
    immediate: t = !1
} = {}) {
    const n = se(),
        r = (0, Te.useRef)(null);
    return (0, Te.useCallback)(o => {
        const s = r.current;
        r.current = null, s && re(s), o && (e ? re(() => {
            r.current = es(o, {
                immediate: t,
                remember: n
            })
        }) : Do(o))
    }, [e, t, n])
}(0, Te.forwardRef)(({
    enabled: e = !0,
    immediate: t = !1,
    children: n,
    ...r
}, o) => {
    const s = ts({
            enabled: e,
            immediate: t
        }),
        i = ye(o, s);
    return (0, Oe.jsx)("div", {
        ref: i,
        "data-cds": "ShrinkWrap",
        ...r,
        children: n
    })
}).displayName = "ShrinkWrap";
var ns = null;

function rs(e) {
    null !== ns && ns !== e && ns.current?.closeInstant(), ns = e
}

function os(e) {
    ns === e && (ns = null)
}
var ss = "min-w-0 break-words";

function is({
    children: e
}) {
    return (0, Oe.jsx)("div", {
        className: "cds-dark-scope contents",
        "data-mode": "dark",
        children: e
    })
}
var as = t({
    DisabledReasonTooltip: () => Os,
    OverflowTooltip: () => Ls,
    Tooltip: () => ks,
    TooltipGroup: () => Xs,
    TooltipImplProvider: () => Qs,
    useTooltipGroup: () => qs,
    useTooltipTrigger: () => C
});

function cs(e, t) {
    return !(!e || "trigger-focus" !== t.reason || !B(t.event)) && (t.cancel(), !0)
}

function ls(e) {
    const t = e;
    if (1 !== t?.nodeType) return !1;
    const n = t,
        r = n.getAttribute("aria-haspopup");
    return null !== r && "false" !== r && "true" === n.getAttribute("aria-expanded")
}

function us(e) {
    return null == e || "" === e || "boolean" == typeof e || Array.isArray(e) && e.every(us)
}
var ds = Symbol("cds.Tooltip.noShow");

function fs(e) {
    const t = e();
    return us(t) ? ds : t
}
var ps = {
        open: !1,
        body: void 0
    },
    gs = e => e.open ? e : {
        ...e,
        open: !0
    },
    hs = e => e.open ? {
        ...e,
        open: !1
    } : e,
    ms = e => void 0 === e.body ? e : {
        ...e,
        body: void 0
    },
    vs = e => t => t.open && Object.is(t.body, e) ? t : {
        open: !0,
        body: e
    },
    bs = e => t => Object.is(t.body, e) ? t : {
        ...t,
        body: e
    },
    ys = e => e.open || void 0 !== e.body ? ps : e,
    xs = "px-2 rounded-[calc(0.375rem*var(--cds-rem-scale,1))] bg-[var(--cds-tooltip-bg)] text-[var(--cds-tooltip-fg)] shadow-sm dark:shadow-panel-sm print:hidden text-[calc(0.8125rem*var(--cds-rem-scale,1))]/[calc(1.125rem*var(--cds-rem-scale,1))] font-normal",
    Es = "text-balance",
    ws = "origin-[var(--transform-origin)] transition-[opacity,scale] duration-snap ease-snap motion-reduce:transition-none data-[starting-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[ending-style]:scale-[0.98] data-[instant]:duration-0",
    Ss = "inline-flex items-center gap-2 min-h-[calc(1.5rem*var(--cds-rem-scale,1))] max-w-[240px] py-[calc(0.1875rem*var(--cds-rem-scale,1))]",
    Cs = "self-start",
    Ts = "flex flex-col gap-0.5 max-w-[240px] whitespace-normal py-1.5";

function Rs({
    keys: e,
    className: t
}) {
    return (0, Oe.jsx)(ee, {
        keys: e,
        variant: "text",
        className: fe("text-[calc(0.75rem*var(--cds-rem-scale,1))] [--cds-shortcut-cap-ink:var(--cds-text-muted)]", t)
    })
}

function ks({
    content: e,
    detail: t,
    secondaryHint: n,
    multiline: r,
    shortcut: o,
    side: s = "top",
    align: i,
    anchor: a,
    sideOffset: u = 4,
    collisionPadding: d,
    collisionAvoidance: f,
    trackCursorAxis: p,
    delay: g,
    open: h,
    onOpenChange: m,
    closeDelay: v,
    hoverable: b = !1,
    closeOnClick: y,
    lazy: x = !1,
    openOnHandedBackFocus: E = !1,
    triggerRef: w,
    container: S,
    className: C,
    children: T
}) {
    const R = (0, Te.useContext)(Ys),
        k = g ?? R ?? Us,
        O = L(),
        P = ts({
            immediate: !0
        }),
        M = (0, Te.useId)(),
        I = (0, Te.useRef)(null),
        [A, j] = (0, Te.useState)(!1),
        D = (0, Te.useRef)({
            closeInstant: () => {
                j(!0), I.current?.close()
            }
        }),
        [N, W] = (0, Te.useState)(null),
        [V, H] = (0, Te.useState)(ps);
    !1 === h && V.open && H(hs);
    const $ = "function" == typeof e,
        Q = $ || !us(e),
        Y = !$ && Q ? e : V.body,
        X = !us(Y),
        _ = (h ?? V.open) && (!$ || X);
    !$ && Q && _ && !Object.is(V.body, e) && H(bs(e));
    const K = (0, Te.useCallback)((t, n) => {
            if (!E && cs(t, n) || function(e, t) {
                    return !(!e || "trigger-hover" !== t.reason || !ls(t.trigger ?? t.event?.target) || (t.cancel(), 0))
                }(t, n)) return !1;
            if (t) {
                if ("function" != typeof e) H(vs(e));
                else if (_) H(gs);
                else {
                    const t = fs(e);
                    if (t === ds) return n.cancel(), !1;
                    H(vs(t))
                }
                j(!1), rs(D)
            } else H(_ ? hs : ys), os(D);
            return W(t && "trigger-hover" === n.reason ? n.trigger ?? null : null), m?.(t), !0
        }, [m, E, e, _]),
        G = void 0 !== h,
        J = V.open,
        Z = void 0 !== T || void 0 === a;
    (0, Te.useEffect)(() => {
        if (G && Z && Q && X) return h ? rs(D) : os(D), () => {
            J || os(D)
        }
    }, [G, Z, h, Q, X, J, $]);
    const ee = (0, Te.useCallback)(e => {
        e || (j(!1), W(null), H(ms))
    }, []);
    (0, Te.useEffect)(() => {
        if (!N) return;
        const e = N.ownerDocument,
            t = e => {
                const t = e.target;
                t && t !== N && t.contains(N) && D.current.closeInstant()
            };
        e.addEventListener("scroll", t, {
            capture: !0,
            passive: !0
        });
        const n = e.defaultView,
            r = null === n ? null : U(n.MutationObserver, () => {
                ls(N) && D.current.closeInstant()
            });
        return r?.observe(N, {
            attributes: !0,
            attributeFilter: ["aria-expanded"]
        }), () => {
            e.removeEventListener("scroll", t, {
                capture: !0
            }), r?.disconnect()
        }
    }, [N]), (0, Te.useEffect)(() => () => os(D), []);
    const te = q("tooltip"),
        [ne] = (0, Te.useState)(() => x && void 0 === h ? new ro : null),
        [re, oe] = (0, Te.useState)(!1),
        se = re || null === ne,
        ie = (0, Te.useRef)(!1),
        ae = (0, Te.useCallback)(() => {
            ie.current = !0, oe(!0)
        }, []),
        ce = po(),
        le = (0, Te.useRef)(null),
        ue = (0, Te.useRef)(!1);
    (0, Te.useEffect)(() => {
        !1 === h && (ue.current = !1)
    }, [h]);
    const de = Re(() => {
            if (ie.current || se || !Q || void 0 !== h || ls(le.current)) return;
            let t;
            if ("function" == typeof e) {
                const n = fs(e);
                if (n === ds) return;
                t = n
            } else t = e;
            ae(), j(!1), rs(D), W(le.current), H(vs(t)), ue.current = !0, m?.(!0)
        }),
        pe = (0, Te.useRef)(!1),
        ge = Re(e => {
            switch (e.type) {
                case "pointerdown":
                    return void(!1 !== y && (pe.current = !0, ce.cancel()));
                case "pointerleave":
                    return pe.current = !1, void ce.cancel();
                case "pointermove":
                    if (pe.current || !e.currentTarget.contains(e.target)) return
            }
            pe.current = !0, se || "touch" === e.pointerType || Q && (le.current = e.currentTarget, ce.start(k, de))
        }),
        he = Re(e => {
            se || Ms(e.target) && (!E && B(e.nativeEvent) || (le.current = null, ce.cancel(), de()))
        });
    null === ne || !0 !== h || re || oe(!0);
    const me = (0, Te.useCallback)((e, t) => {
            !E && cs(e, t) || (e && ue.current && _ ? H(gs) : K(e, t) && (ue.current = e))
        }, [K, E, _]),
        ve = (0, Te.isValidElement)(T) && T.type !== Te.Fragment ? T : e => (0, Oe.jsx)("span", {
            ...e,
            className: "inline-flex",
            children: T
        }),
        be = Z && (0, Oe.jsx)(Nr, {
            ref: w,
            id: M,
            delay: k,
            closeDelay: v,
            closeOnClick: y,
            handle: ne ?? void 0,
            disabled: null === ne || se ? void 0 : !Q,
            onPointerEnter: ne ? ge : void 0,
            onPointerMove: ne ? ge : void 0,
            onPointerLeave: ne ? ge : void 0,
            onPointerDown: ne ? ge : void 0,
            onFocus: ne ? he : void 0,
            render: ve
        }),
        ye = se && X ? (0, Oe.jsx)(Br, {
            container: S ?? O,
            children: (0, Oe.jsx)(F, {
                popup: !0,
                children: (0, Oe.jsx)(uo, {
                    override: d,
                    container: S ?? O,
                    children: e => (0, Oe.jsx)(z.Provider, {
                        value: te.base,
                        children: (0, Oe.jsx)(eo, {
                            "data-cds": "Tooltip",
                            className: "data-[anchor-hidden]:invisible",
                            style: te.style,
                            side: s,
                            align: i,
                            anchor: a,
                            sideOffset: u,
                            collisionPadding: e,
                            collisionAvoidance: f,
                            positionMethod: "fixed",
                            children: (0, Oe.jsx)(to, {
                                ref: P,
                                role: "tooltip",
                                style: A ? {
                                    transition: "none"
                                } : void 0,
                                className: fe(xs, ws, r || t || n ? Ts : Ss, !o && Es, C),
                                children: (0, Oe.jsx)(is, {
                                    children: r || t || n ? (0, Oe.jsxs)(Oe.Fragment, {
                                        children: [(0, Oe.jsxs)("span", {
                                            className: "inline-flex min-w-0 items-center gap-2",
                                            children: [(0, Oe.jsx)("span", {
                                                className: ss,
                                                children: Y
                                            }, l(Y)), o && (0, Oe.jsx)(Rs, {
                                                keys: o
                                            })]
                                        }), n && (0, Oe.jsxs)("span", {
                                            className: "inline-flex min-w-0 items-center gap-2",
                                            children: [(0, Oe.jsx)("span", {
                                                className: "min-w-0 break-words",
                                                children: n.label
                                            }, l(n.label)), (0, Oe.jsx)(Rs, {
                                                keys: n.shortcut
                                            })]
                                        }), t && (0, Oe.jsx)("span", {
                                            className: "break-words text-[calc(0.6875rem*var(--cds-rem-scale,1))]/[calc(0.875rem*var(--cds-rem-scale,1))] text-secondary",
                                            children: t
                                        }, l(t))]
                                    }) : (0, Oe.jsxs)(Oe.Fragment, {
                                        children: [(0, Oe.jsx)("span", {
                                            className: ss,
                                            children: Y
                                        }, l(Y)), o && (0, Oe.jsx)(Rs, {
                                            keys: o,
                                            className: Cs
                                        })]
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }) : null;
    return ne ? (0, Oe.jsxs)(Oe.Fragment, {
        children: [(0, Oe.jsx)(c.Provider, {
            value: $s,
            children: (0, Oe.jsx)(xe.Provider, {
                value: Q,
                children: be
            })
        }), se && (0, Oe.jsx)(Mr, {
            handle: ne,
            open: _,
            disableHoverablePopup: !b,
            trackCursorAxis: p,
            disabled: !Q,
            actionsRef: I,
            onOpenChange: me,
            onOpenChangeComplete: ee,
            triggerId: M,
            children: ye
        })]
    }) : (0, Oe.jsxs)(Mr, {
        open: _,
        disableHoverablePopup: !b,
        trackCursorAxis: p,
        disabled: !Q,
        actionsRef: I,
        onOpenChange: K,
        onOpenChangeComplete: ee,
        triggerId: M,
        children: [(0, Oe.jsx)(c.Provider, {
            value: $s,
            children: (0, Oe.jsx)(xe.Provider, {
                value: Q,
                children: be
            })
        }), ye]
    })
}

function Os({
    reason: e,
    side: t,
    align: n,
    sideOffset: r,
    multiline: o = !0,
    delay: s,
    collisionPadding: i,
    hoverable: a,
    className: c,
    wrapperClassName: l,
    children: d
}) {
    const f = (0, Te.useId)();
    return (0, Oe.jsx)(ks, {
        content: te(e) ? e : void 0,
        side: t,
        align: n,
        sideOffset: r,
        multiline: o,
        delay: s,
        collisionPadding: i,
        hoverable: a,
        className: c,
        closeOnClick: !1,
        openOnHandedBackFocus: !0,
        children: (0, Oe.jsxs)("span", {
            ...y(e, f, l),
            children: [d, (0, Oe.jsx)(u, {
                id: f,
                reason: e
            })]
        })
    })
}
var Ps = new WeakMap;

function Ms(e) {
    try {
        return e.matches(":focus-visible")
    } catch {
        return !1
    }
}
var Is = new WeakMap,
    As = new WeakMap,
    js = new WeakSet;

function Ds(e) {
    const t = Is.get(e);
    Is.delete(e), void 0 !== t && Ps.get(t.label)?.(!1)
}

function Ns(e) {
    const t = e.currentTarget;
    Ds(t);
    const n = As.get(t) === e.target;
    As.delete(t);
    const r = n ? void 0 : function(e) {
        const t = e.target,
            n = 1 === t?.nodeType ? t : null;
        if (null === n || !n.matches('a[href], button, summary, [role="button"], [role="link"], [role="tab"], [role^="menuitem"], [role="treeitem"], [role="option"], [role="radio"], [role="checkbox"], [role="switch"], [role="row"], [role="gridcell"]') || !Ms(n) || B(e)) return;
        const r = [...n.querySelectorAll('[data-cds="OverflowTooltip"]')].find(e => Ps.has(e) && e.closest("a[href], button, input, select, textarea, summary, [tabindex], [contenteditable]") === n && Vs(e));
        return void 0 === r ? void 0 : {
            label: r,
            owner: n
        }
    }(e);
    void 0 !== r && (Is.set(t, r), Ps.get(r.label)?.(!0))
}

function Fs(e) {
    const t = e.currentTarget.document;
    null !== t.activeElement && As.set(t, t.activeElement)
}

function Ws(e) {
    Ds(e.currentTarget)
}

function Bs(e) {
    const t = e.currentTarget,
        n = Is.get(t)?.label;
    if (void 0 !== n && Ps.has(n) && n.hasAttribute("data-popup-open"))
        if ("Escape" === e.key) {
            if ((0, Ce.flushSync)(() => Ds(t)), n.hasAttribute("data-popup-open")) return;
            e.preventDefault(), e.stopPropagation()
        } else "Enter" !== e.key && " " !== e.key || Ds(t)
}

function Vs(e) {
    return e.scrollWidth > e.clientWidth || function(e) {
        const t = e.ownerDocument;
        let n = fo.get(t);
        void 0 === n && (n = t.createRange(), fo.set(t, n)), n.selectNodeContents(e);
        const r = n.getBoundingClientRect?.();
        if (n.setStart(t, 0), n.collapse(!0), void 0 === r || 0 === r.width) return !1;
        const o = e.getBoundingClientRect();
        return r.right - o.right > .1 || o.left - r.left > .1
    }(e)
}
var Hs = e => "shown" === e ? "shut" : e;

function zs(e, t) {
    const [n, r] = (0, Te.useState)("no");
    return Me(() => {
        const n = e.current;
        if (null === n || t) return;
        var o;
        o = n.ownerDocument, js.has(o) || (js.add(o), o.addEventListener("focusin", Ns, !0), o.addEventListener("focusout", Ws, !0), o.addEventListener("click", Ws, !0), o.addEventListener("keydown", Bs, !0), o.defaultView?.addEventListener("blur", Fs)), Ps.set(n, e => r(e ? "shown" : Hs));
        const s = Is.get(n.ownerDocument);
        return s?.label === n && Ms(s.owner) || r(Hs), () => {
            Ps.delete(n)
        }
    }, [t, e]), [n, e => r(t => e ? "no" : Hs(t))]
}
var Ls = (0, Te.forwardRef)(function({
    className: e,
    side: t,
    align: n,
    sideOffset: r,
    delay: o,
    collisionPadding: s,
    hoverable: i,
    lazy: a,
    children: c,
    ...l
}, u) {
    const d = (0, Te.useRef)(null),
        f = ye(d, u),
        p = C(),
        [g, h] = zs(d, p),
        m = void 0 === l.dir ? c : (0, Oe.jsx)("span", {
            dir: l.dir,
            children: c
        });
    return (0, Oe.jsx)(ks, {
        content: p ? void 0 : "shown" === g ? m : () => {
            const e = d.current;
            if (null !== e) return Vs(e) ? m : void 0
        },
        open: "shown" === g || void 0,
        onOpenChange: h,
        className: "no" === g ? void 0 : "transition-none",
        side: t,
        align: n,
        sideOffset: r,
        delay: o,
        collisionPadding: s,
        hoverable: i,
        lazy: a,
        children: (0, Oe.jsx)("span", {
            ...l,
            ref: f,
            "data-cds": "OverflowTooltip",
            className: fe("block min-w-0 overflow-x-clip text-ellipsis whitespace-nowrap", e),
            children: c
        })
    })
});
Ls.displayName = "OverflowTooltip";
var $s = {
    Tooltip: ks,
    DisabledReasonTooltip: Os
};

function Qs({
    children: e
}) {
    return (0, Oe.jsx)(c.Provider, {
        value: $s,
        children: e
    })
}
var Us = 300,
    Ys = (0, Te.createContext)(null);

function qs() {
    return null !== (0, Te.useContext)(Ys)
}

function Xs({
    delay: e,
    closeDelay: t = 200,
    children: n
}) {
    const r = (0, Te.useContext)(Ys),
        o = e ?? r ?? Us;
    return (0, Oe.jsx)(Ys.Provider, {
        value: o,
        children: (0, Oe.jsx)(no, {
            delay: o,
            closeDelay: t,
            children: n
        })
    })
}
export {
    Dt as $, jn as A, cn as B, Kn as C, De as Ct, Zn as D, ke as Dt, Qn as E, Me as Et, Cn as F, Kt as G, sn as H, wn as I, tn as J, Zt as K, En as L, Pn as M, kn as N, _n as O, Re as Ot, Sn as P, Ft as Q, hn as R, qn as S, He as St, Jn as T, Ie as Tt, on as U, ln as V, rn as W, Gt as X, _t as Y, Wt as Z, er as _, nt as _t, Zr as a, yt as at, Xn as b, Ye as bt, Wr as c, lt as ct, br as d, ut as dt, Nt as et, mr as f, ot as ft, ir as g, tt as gt, tr as h, rt as ht, uo as i, Ct as it, In as j, Vn as k, Tr as l, dt as lt, ar as m, it as mt, as as n, Rt as nt, Jr as o, xt as ot, ur as p, st as pt, en as q, po as r, Tt as rt, Kr as s, bt as st, ks as t, At as tt, Cr as u, ct as ut, Ln as v, et as vt, Gn as w, Ne as wt, $n as x, Ve as xt, Un as y, Ge as yt, fn as z
};