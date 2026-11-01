import {
    n as t
} from "./mermaid-parser.core-By7wKIZn.js";
import {
    n as e
} from "./chunk-Y2CYZVJY-DyW28Zxd.js";
import {
    m as a
} from "./src-D95BiM3s.js";
import {
    H as n,
    K as r,
    U as i,
    a as l,
    c as o,
    f as s,
    v as c,
    w as p,
    x as u,
    y as d
} from "./chunk-DU6HZSFF-CGGKTCIC.js";
import {
    t as h
} from "./ordinal-B5THEjPq.js";
import {
    n as f
} from "./path-CAufXw5D.js";
import {
    m as g
} from "./dist-D7Q_c3Mn.js";
import {
    t as m
} from "./arc-Bkv6yQQr.js";
import {
    t as y
} from "./array-B0vPCVKH.js";
import {
    i as x,
    p as w
} from "./chunk-75Z2AOVW-Qlb350Io.js";
import {
    t as v
} from "./chunk-JWPE2WC7-Dj6C9sv3.js";
import {
    f as S
} from "./mermaid.core-avtXBued.js";

function $(t, e) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN
}

function b(t) {
    return t
}
var k = s.pie,
    C = {
        sections: new Map,
        showData: !1,
        config: k
    },
    A = C.sections,
    D = C.showData,
    T = structuredClone(k),
    j = {
        getConfig: e(() => structuredClone(T), "getConfig"),
        clear: e(() => {
            A = new Map, D = C.showData, l()
        }, "clear"),
        setDiagramTitle: r,
        getDiagramTitle: p,
        setAccTitle: i,
        getAccTitle: d,
        setAccDescription: n,
        getAccDescription: c,
        addSection: e(({
            label: t,
            value: e
        }) => {
            if (e < 0) throw new Error(`"${t}" has invalid value: ${e}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);
            A.has(t) || (A.set(t, e), a.debug(`added new section: ${t}, with value: ${e}`))
        }, "addSection"),
        getSections: e(() => A, "getSections"),
        setShowData: e(t => {
            D = t
        }, "setShowData"),
        getShowData: e(() => D, "getShowData")
    },
    M = e((t, e) => {
        v(t, e), e.setShowData(t.showData), t.sections.map(e.addSection)
    }, "populateDb"),
    O = {
        parse: e(async e => {
            const n = await t("pie", e);
            a.debug(n), M(n, j)
        }, "parse")
    },
    F = e(t => `\n  .pieCircle{\n    stroke: ${t.pieStrokeColor};\n    stroke-width : ${t.pieStrokeWidth};\n    opacity : ${t.pieOpacity};\n  }\n  .pieCircle.highlighted{\n    scale: 1.05;\n    opacity: 1;\n  }\n  .pieCircle.highlightedOnHover:hover{\n    transition-duration: 250ms;\n    scale: 1.05;\n    opacity: 1;\n  }\n  .pieOuterCircle{\n    stroke: ${t.pieOuterStrokeColor};\n    stroke-width: ${t.pieOuterStrokeWidth};\n    fill: none;\n  }\n  .pieTitleText {\n    text-anchor: middle;\n    font-size: ${t.pieTitleTextSize};\n    fill: ${t.pieTitleTextColor};\n    font-family: ${t.fontFamily};\n  }\n  .slice {\n    font-family: ${t.fontFamily};\n    fill: ${t.pieSectionTextColor};\n    font-size:${t.pieSectionTextSize};\n    // fill: white;\n  }\n  .legend text {\n    fill: ${t.pieLegendTextColor};\n    font-family: ${t.fontFamily};\n    font-size: ${t.pieLegendTextSize};\n  }\n`, "getStyles"),
    H = e(t => {
        const e = [...t.values()].reduce((t, e) => t + e, 0),
            a = [...t.entries()].map(([t, e]) => ({
                label: t,
                value: e
            })).filter(t => t.value / e * 100 >= 1);
        return function() {
            var t = b,
                e = $,
                a = null,
                n = f(0),
                r = f(g),
                i = f(0);

            function l(l) {
                var o, s, c, p, u, d = (l = y(l)).length,
                    h = 0,
                    f = new Array(d),
                    m = new Array(d),
                    x = +n.apply(this, arguments),
                    w = Math.min(g, Math.max(-g, r.apply(this, arguments) - x)),
                    v = Math.min(Math.abs(w) / d, i.apply(this, arguments)),
                    S = v * (w < 0 ? -1 : 1);
                for (o = 0; o < d; ++o)(u = m[f[o] = o] = +t(l[o], o, l)) > 0 && (h += u);
                for (null != e ? f.sort(function(t, a) {
                        return e(m[t], m[a])
                    }) : null != a && f.sort(function(t, e) {
                        return a(l[t], l[e])
                    }), o = 0, c = h ? (w - d * S) / h : 0; o < d; ++o, x = p) s = f[o], p = x + ((u = m[s]) > 0 ? u * c : 0) + S, m[s] = {
                    data: l[s],
                    index: o,
                    value: u,
                    startAngle: x,
                    endAngle: p,
                    padAngle: v
                };
                return m
            }
            return l.value = function(e) {
                return arguments.length ? (t = "function" == typeof e ? e : f(+e), l) : t
            }, l.sortValues = function(t) {
                return arguments.length ? (e = t, a = null, l) : e
            }, l.sort = function(t) {
                return arguments.length ? (a = t, e = null, l) : a
            }, l.startAngle = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : f(+t), l) : n
            }, l.endAngle = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : f(+t), l) : r
            }, l.padAngle = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : f(+t), l) : i
            }, l
        }().value(t => t.value).sort(null)(a)
    }, "createPieArcs"),
    W = {
        parser: O,
        db: j,
        renderer: {
            draw: e((t, e, n, r) => {
                a.debug("rendering pie chart\n" + t);
                const i = r.db,
                    l = u(),
                    s = x(i.getConfig(), l.pie),
                    c = S(e),
                    p = c.append("g");
                p.attr("transform", "translate(225,225)");
                const {
                    themeVariables: d
                } = l;
                let [f] = w(d.pieOuterStrokeWidth);
                f ??= 2;
                const g = s.legendPosition,
                    y = s.textPosition,
                    v = s.donutHole > 0 && s.donutHole <= .9 ? s.donutHole : 0,
                    $ = Math.min(450, 450) / 2 - 40,
                    b = m().innerRadius(v * $).outerRadius($),
                    k = m().innerRadius($ * y).outerRadius($ * y),
                    C = p.append("g");
                C.append("circle").attr("cx", 0).attr("cy", 0).attr("r", $ + f / 2).attr("class", "pieOuterCircle");
                const A = i.getSections(),
                    D = H(A),
                    T = [d.pie1, d.pie2, d.pie3, d.pie4, d.pie5, d.pie6, d.pie7, d.pie8, d.pie9, d.pie10, d.pie11, d.pie12];
                let j = 0;
                A.forEach(t => {
                    j += t
                });
                const M = D.filter(t => "0" !== (t.data.value / j * 100).toFixed(0)),
                    O = h(T).domain([...A.keys()]);
                C.selectAll("mySlices").data(M).enter().append("path").attr("d", b).attr("fill", t => O(t.data.label)).attr("class", t => {
                    let e = "pieCircle";
                    return "hover" === s.highlightSlice ? e += " highlightedOnHover" : s.highlightSlice === t.data.label && (e += " highlighted"), e
                }), C.selectAll("mySlices").data(M).enter().append("text").text(t => (t.data.value / j * 100).toFixed(0) + "%").attr("transform", t => "translate(" + k.centroid(t) + ")").style("text-anchor", "middle").attr("class", "slice");
                const F = p.append("text").text(i.getDiagramTitle()).attr("x", 0).attr("y", -200).attr("class", "pieTitleText"),
                    W = [...A.entries()].map(([t, e]) => ({
                        label: t,
                        value: e
                    })),
                    z = p.selectAll(".legend").data(W).enter().append("g").attr("class", "legend");
                z.append("rect").attr("width", 18).attr("height", 18).style("fill", t => O(t.label)).style("stroke", t => O(t.label)), z.append("text").attr("x", 22).attr("y", 14).text(t => i.getShowData() ? `${t.label} [${t.value}]` : t.label);
                const R = Math.max(...z.selectAll("text").nodes().map(t => t?.getBoundingClientRect().width ?? 0));
                let P = 450,
                    V = 490;
                const B = 22,
                    E = W.length * B;
                switch (g) {
                    case "center":
                        z.attr("transform", (t, e) => {
                            const a = B * W.length / 2;
                            return "translate(" + (-R / 2 - 22) + "," + (e * B - a) + ")"
                        });
                        break;
                    case "top":
                        P += E, z.attr("transform", (t, e) => `translate(${-R/2-22}, ${e*B-$})`), C.attr("transform", () => `translate(0, ${E+B})`);
                        break;
                    case "bottom":
                        P += E, z.attr("transform", (t, e) => "translate(" + (-R / 2 - 22) + "," + (e * B - -207) + ")");
                        break;
                    case "left":
                        V += 22 + R, z.attr("transform", (t, e) => {
                            const a = B * W.length / 2;
                            return "translate(-207," + (e * B - a) + ")"
                        }), C.attr("transform", () => `translate(${R+18+4}, 0)`);
                        break;
                    default:
                        V += 22 + R, z.attr("transform", (t, e) => {
                            const a = B * W.length / 2;
                            return "translate(216," + (e * B - a) + ")"
                        })
                }
                const N = F.node()?.getBoundingClientRect().width ?? 0,
                    Y = 225 - N / 2,
                    Z = 225 + N / 2,
                    J = Math.min(0, Y),
                    L = Math.max(V, Z) - J;
                c.attr("viewBox", `${J} 0 ${L} ${P}`), o(c, P, L, s.useMaxWidth)
            }, "draw")
        },
        styles: F
    };
export {
    W as diagram
};