(function() {
    window.__agentElementMap || (window.__agentElementMap = {}), window.__agentElementReverseMap || (window.__agentElementReverseMap = new WeakMap), window.__agentRefCounter || (window.__agentRefCounter = 0), window.__generateAccessibilityTree = function(e, t, r, i, a) {
        try {
            var n = [],
                l = a && a.findData ? [] : null,
                o = Date.now() + 1500,
                u = 0,
                d = !1,
                c = null != t ? t : 15;

            function E(e) {
                var t = e.getAttribute("role");
                if (t) return t;
                var r = e.tagName.toLowerCase(),
                    i = e.getAttribute("type");
                return {
                    a: "link",
                    button: "button",
                    input: "submit" === i || "button" === i ? "button" : "checkbox" === i ? "checkbox" : "radio" === i ? "radio" : "file" === i ? "button" : "textbox",
                    select: "combobox",
                    textarea: "textbox",
                    h1: "heading",
                    h2: "heading",
                    h3: "heading",
                    h4: "heading",
                    h5: "heading",
                    h6: "heading",
                    img: "image",
                    nav: "navigation",
                    main: "main",
                    header: "banner",
                    footer: "contentinfo",
                    section: "region",
                    article: "article",
                    aside: "complementary",
                    form: "form",
                    table: "table",
                    ul: "list",
                    ol: "list",
                    li: "listitem",
                    label: "label"
                } [r] || "generic"
            }

            function M(e) {
                var t = (e.getAttribute("type") || "").toLowerCase();
                if ("password" === t || "hidden" === t) return !0;
                for (var r = (e.getAttribute("autocomplete") || "").toLowerCase(), i = ["current-password", "new-password", "one-time-code", "cc-number", "cc-csc", "cc-exp", "cc-exp-month", "cc-exp-year"], a = 0; a < i.length; a++)
                    if (-1 !== r.indexOf(i[a])) return !0;
                return !1
            }

            function T(e) {
                for (var t = "", r = 0; r < e.childNodes.length; r++) e.childNodes[r].nodeType === Node.TEXT_NODE && (t += e.childNodes[r].textContent);
                return t.trim()
            }

            function L(e) {
                try {
                    return document.querySelector('label[for="' + e.replace(/["\\]/g, "\\$&") + '"]')
                } catch (t) {
                    return null
                }
            }

            function k(e) {
                var t = e.tagName.toLowerCase();
                if ("select" === t) {
                    if (M(e)) {
                        var r = e.getAttribute("aria-label");
                        if (r && r.trim()) return r.trim();
                        var i = e.getAttribute("title");
                        if (i && i.trim()) return i.trim();
                        if (e.id) {
                            var a = L(e.id);
                            if (a) {
                                var n = T(a);
                                if (n) return n
                            }
                        }
                        return "[value redacted]"
                    }
                    var l = e,
                        o = l.querySelector("option[selected]") || l.options[l.selectedIndex];
                    if (o && o.textContent) return o.textContent.trim()
                }
                var u = e.getAttribute("aria-label");
                if (u && u.trim()) return u.trim();
                var d = e.getAttribute("placeholder");
                if (d && d.trim()) return d.trim();
                var c = e.getAttribute("title");
                if (c && c.trim()) return c.trim();
                var s = e.getAttribute("alt");
                if (s && s.trim()) return s.trim();
                if (e.id) {
                    var g = L(e.id);
                    if (g) {
                        var f = T(g);
                        if (f) return f
                    }
                }
                if ("input" === t) {
                    var h = e,
                        m = e.getAttribute("type") || "",
                        p = e.getAttribute("value");
                    if ("submit" === m && p && p.trim()) return p.trim();
                    if (M(e)) return h.value ? "[value redacted]" : "";
                    if (h.value && h.value.length < 50 && h.value.trim()) return h.value.trim()
                }
                if ("textarea" === t && M(e)) return e.value ? "[value redacted]" : "";
                if (["button", "a", "summary"].includes(t)) {
                    for (var v = "", b = 0; b < e.childNodes.length; b++) {
                        var w = e.childNodes[b];
                        w.nodeType === Node.TEXT_NODE && (v += w.textContent)
                    }
                    if (v.trim()) return v.trim()
                }
                if (t.match(/^h[1-6]$/)) {
                    var y = e.textContent;
                    if (y && y.trim()) return y.trim().substring(0, 100)
                }
                if ("img" === t) return "";
                for (var _ = "", N = 0; N < e.childNodes.length; N++) {
                    var A = e.childNodes[N];
                    A.nodeType === Node.TEXT_NODE && (_ += A.textContent)
                }
                if (_ && _.trim() && _.trim().length >= 3) {
                    var x = _.trim();
                    return x.length > 100 ? x.substring(0, 100) + "..." : x
                }
                return ""
            }

            function O(e) {
                var t = window.getComputedStyle(e);
                return "none" !== t.display && "hidden" !== t.visibility && "0" !== t.opacity && e.offsetWidth > 0 && e.offsetHeight > 0
            }

            function R(e) {
                var t = e.tagName.toLowerCase();
                return ["a", "button", "input", "select", "textarea", "details", "summary"].includes(t) || null !== e.getAttribute("onclick") || null !== e.getAttribute("tabindex") || "button" === e.getAttribute("role") || "link" === e.getAttribute("role") || "true" === e.getAttribute("contenteditable")
            }

            function D(e) {
                var t = e.tagName.toLowerCase();
                return ["h1", "h2", "h3", "h4", "h5", "h6", "nav", "main", "header", "footer", "section", "article", "aside"].includes(t) || null !== e.getAttribute("role")
            }

            function I(e, t) {
                var r = e.tagName.toLowerCase();
                if (["script", "style", "meta", "link", "title", "noscript"].includes(r)) return !1;
                if ("all" !== t.filter && "true" === e.getAttribute("aria-hidden")) return !1;
                if ("all" !== t.filter && !O(e)) return !1;
                if ("all" !== t.filter && !t.refId) {
                    var i = e.getBoundingClientRect();
                    if (!(i.top < window.innerHeight && i.bottom > 0 && i.left < window.innerWidth && i.right > 0)) return !1
                }
                if ("interactive" === t.filter) return R(e);
                if (R(e)) return !0;
                if (D(e)) return !0;
                if (k(e).length > 0) return !0;
                var a = E(e);
                return null !== a && "generic" !== a && "image" !== a
            }
            var s = {
                script: 1,
                style: 1,
                template: 1,
                noscript: 1,
                textarea: 1,
                select: 1,
                option: 1,
                input: 1
            };

            function S(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }

            function W(e, t) {
                return null == e ? "" : ((e = String(e)).length > 4 * t && (e = e.substring(0, 4 * t)), (e = e.replace(/\s+/g, " ").trim()).length > t ? e.substring(0, t) : e)
            }

            function H(e, t, r) {
                if (S(s, e.tagName.toLowerCase())) return "";
                for (var i = "", a = [e], n = 0; a.length && i.length < t && n < 300;) {
                    var l = a.pop();
                    if (n++, l.nodeType !== Node.TEXT_NODE) {
                        if (l.nodeType === Node.ELEMENT_NODE) {
                            if (l !== e) {
                                var o = l.tagName.toLowerCase();
                                if (S(s, o)) continue;
                                if (r && R(l)) continue;
                                var u = l.getAttribute("aria-label");
                                if (u) {
                                    i += " " + u.substring(0, t);
                                    continue
                                }
                                if ("img" === o) {
                                    i += " " + (l.getAttribute("alt") || "").substring(0, t);
                                    continue
                                }
                            }
                            for (var d = l.childNodes, c = Math.min(d.length, 50) - 1; c >= 0; c--) a.push(d[c])
                        }
                    } else {
                        var g = W(l.nodeValue, t);
                        g && (i += " " + g)
                    }
                }
                return W(i, t)
            }

            function j(e, t) {
                for (var r = String(e).split(/\s+/).slice(0, 3), i = [], a = 0; a < r.length; a++) {
                    var n = r[a] ? Document.prototype.getElementById.call(document, r[a]) : null;
                    n && i.push(H(n, t))
                }
                return W(i.join(" "), t)
            }
            var g = {
                    tr: 1,
                    li: 1,
                    article: 1,
                    dialog: 1,
                    fieldset: 1,
                    form: 1,
                    aside: 1,
                    section: 1
                },
                f = {
                    row: 1,
                    listitem: 1,
                    article: 1,
                    dialog: 1,
                    alertdialog: 1
                };

            function P(e) {
                var t = e.parentElement;
                if (!t || !e.className || "string" != typeof e.className) return !1;
                for (var r = t.children, i = 0; i < r.length && i < 30; i++)
                    if (r[i] !== e && r[i].tagName === e.tagName && r[i].className === e.className) return !0;
                return !1
            }

            function V(e) {
                for (var t = e.tagName, r = e, i = null, a = !1, n = 0; n < 6; n++) {
                    var l = r.parentElement;
                    if (!l || l === document.body) break;
                    if (S(g, l.tagName.toLowerCase()) || S(f, l.getAttribute("role")) || P(l) && H(l, 40, !0).replace(/[\s\d!-\/:-@[-`{-~]/g, "").length >= 3) {
                        i = l;
                        break
                    }(a = a || l.getElementsByTagName(t).length > 3) || (i = l), r = l
                }
                return i ? H(i, 200) : ""
            }

            function B(e, t) {
                var r = e.tagName.toLowerCase(),
                    i = e.getBoundingClientRect(),
                    a = "function" == typeof e.checkVisibility ? e.checkVisibility({
                        checkOpacity: !0,
                        checkVisibilityCSS: !0,
                        opacityProperty: !0,
                        visibilityProperty: !0
                    }) : O(e),
                    n = {},
                    l = e.getAttribute("aria-label");
                l && (n.aria = W(l, 120));
                var o = e.getAttribute("aria-labelledby"),
                    u = [];
                if (o && u.push(j(o, 120)), e.labels && e.labels.length)
                    for (var d = 0; d < e.labels.length && d < 3; d++) u.push(H(e.labels[d], 120));
                u.length && (n.label = W(u.join(" "), 160));
                var c = e.getAttribute("placeholder");
                c && (n.placeholder = W(c, 120));
                var s = e.getAttribute("title");
                s && (n.title = W(s, 120));
                var g = e.getAttribute("alt");
                g && (n.alt = W(g, 120));
                var f = (e.getAttribute("type") || "").toLowerCase();
                if ("input" === r && ("submit" === f || "button" === f || "reset" === f) && !M(e)) {
                    var h = e.getAttribute("value");
                    h && (n.value = W(h, 120))
                }
                if (R(e) && "input" !== r && "select" !== r && "textarea" !== r) {
                    var m = H(e, 150);
                    m && (n.text = m)
                }
                if (R(e) || "image" === t) {
                    var p = V(e);
                    p && (n.container = p)
                }
                for (var v = [], b = ["id", "name", "data-testid", "data-test-id", "data-test", "data-qa", "data-cy"], w = 0; w < b.length; w++) {
                    var y = e.getAttribute(b[w]);
                    y && v.push(W(y, 60))
                }
                v.length && (n.ids = W(v.join(" "), 160));
                var _ = e.getAttribute("aria-describedby");
                return _ && (n.describedby = j(_, 120)), {
                    visible: a && i.width > 0 && i.height > 0,
                    inViewport: i.top < window.innerHeight && i.bottom > 0 && i.left < window.innerWidth && i.right > 0,
                    disabled: !0 === e.disabled || "true" === e.getAttribute("aria-disabled"),
                    texts: n
                }
            }

            function X(e, t, r, i, a) {
                var n = {
                        ref: a,
                        depth: t,
                        role: W(r, 40),
                        name: i
                    },
                    c = e.getAttribute("href");
                c && (n.href = W(c, 200));
                var s = e.getAttribute("placeholder");
                if (s && (n.placeholder = W(s, 120)), !d && "select" === e.tagName.toLowerCase() && !M(e)) {
                    for (var g = [], f = 0; f < e.options.length && f < 300; f++) {
                        var h = W(e.options[f].textContent, 100);
                        h && g.push(h), u += h.length
                    }
                    n.options = g
                }
                d || (Date.now() > o || u > 15e5 ? d = !0 : (n.meta = B(e, r), u += JSON.stringify(n.meta.texts).length)), l.push(n)
            }
            var h = 1e4,
                m = 0;

            function q(e, t, r) {
                if (!(m >= h) && !(t > c) && e && e.tagName) {
                    var i = I(e, r) || null !== r.refId && 0 === t;
                    if (i) {
                        var a = E(e),
                            o = k(e),
                            u = window.__agentElementReverseMap.get(e) || null;
                        if (u) {
                            var d = window.__agentElementMap[u];
                            d && d.deref() === e || (u = null)
                        }
                        u || (u = "ref_" + ++window.__agentRefCounter, window.__agentElementMap[u] = new WeakRef(e), window.__agentElementReverseMap.set(e, u)), m++;
                        var s = " ".repeat(t) + a;
                        if (o && (s += ' "' + (o = o.replace(/\s+/g, " ").substring(0, 100)).replace(/"/g, '\\"') + '"'), s += " [" + u + "]", e.getAttribute("href") && (s += ' href="' + e.getAttribute("href") + '"'), e.getAttribute("type") && (s += ' type="' + e.getAttribute("type") + '"'), e.getAttribute("placeholder") && (s += ' placeholder="' + e.getAttribute("placeholder") + '"'), n.push(s), l && X(e, t, a, o, u), "select" === e.tagName.toLowerCase() && !M(e))
                            for (var g = e.options, f = 0; f < g.length; f++) {
                                var p = g[f],
                                    v = " ".repeat(t + 1) + "option",
                                    b = p.textContent ? p.textContent.trim() : "";
                                b && (v += ' "' + (b = b.replace(/\s+/g, " ").substring(0, 100)).replace(/"/g, '\\"') + '"'), p.selected && (v += " (selected)"), p.value && p.value !== b && (v += ' value="' + p.value.replace(/"/g, '\\"') + '"'), n.push(v)
                            }
                    }
                    if (("select" !== e.tagName.toLowerCase() || !M(e)) && e.children && t < c)
                        for (var w = 0; w < e.children.length; w++) q(e.children[w], i ? t + 1 : t, r)
                }
            }
            var p = {
                filter: e || "all",
                refId: i
            };
            if (i) {
                var v = window.__agentElementMap[i];
                if (!v) return {
                    error: "Element with ref_id '" + i + "' not found. It may have been removed from the page. Use read_page without ref_id to get the current page state.",
                    pageContent: "",
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                };
                var b = v.deref();
                if (!b) return {
                    error: "Element with ref_id '" + i + "' no longer exists. It may have been removed from the page. Use read_page without ref_id to get the current page state.",
                    pageContent: "",
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                };
                q(b, 0, p)
            } else document.body && q(document.body, 0, p);
            for (var w in window.__agentElementMap) window.__agentElementMap[w].deref() || delete window.__agentElementMap[w];
            var y = n.join("\n");
            if (m >= h && (y += "\n[truncated at 10000 elements — page is very large; " + (i ? "use a smaller depth or focus on a more specific child element" : "use a refId or smaller depth to focus") + "]"), null != r && y.length > r) {
                var _ = y.length,
                    N = y.lastIndexOf("\n", r);
                N <= 0 && (N = Math.max(0, r));
                var A = i ? "use a smaller depth or focus on a more specific child element" : "use ref_id or a smaller depth to focus";
                y = y.slice(0, N) + "\n[output truncated at " + r + " of " + _ + " characters. Pass a larger max_chars (default 50000) to see more, or " + A + ".]"
            }
            var x = {
                pageContent: y,
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
            return l && (x.findNodes = l, x.findTruncated = m >= h, x.findMetaPartial = d), x
        } catch (C) {
            throw new Error("Error generating accessibility tree: " + (C.message || "Unknown error"))
        }
    };
})()