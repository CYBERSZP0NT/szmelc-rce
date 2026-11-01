(function() {
    ! function() {
        let e = null,
            n = null,
            t = null,
            o = null,
            r = null,
            i = null,
            a = null,
            s = null,
            l = null,
            c = !0,
            d = !1,
            u = !1,
            p = null,
            y = null,
            m = null,
            L = null,
            f = null,
            x = null,
            g = null,
            h = !1,
            b = !1,
            v = !1,
            w = !1,
            C = !1,
            T = null;
        let A = null,
            E = null,
            S = null,
            k = !1;
        const H = "http://www.w3.org/2000/svg",
            F = "198, 97, 63";

        function I(e, n) {
            const t = null !== i && e === f && n === x;
            if (m = e, L = n, !h) return Promise.resolve();
            if (!i) {
                if (document.hidden) return Promise.resolve();
                const {
                    container: t,
                    styled: o,
                    plain: r
                } = function(e, n) {
                    const t = document.createElement("div");
                    t.id = "agent-phantom-cursor", t.setAttribute("aria-hidden", "true"), t.style.cssText = `\n      position: fixed;\n      top: 0;\n      left: 0;\n      pointer-events: none;\n      z-index: 2147483646;\n      transform: translate3d(${e}px, ${n}px, 0);\n      transition: transform 180ms cubic-bezier(0.2, 0, 0, 1);\n      will-change: transform;\n    `;
                    const o = e => {
                            const n = document.createElementNS(H, "path");
                            n.setAttribute("d", "M0 0 L0 18 L4.5 14 L7.5 21.5 L11 20 L8 13 L14 13 Z");
                            for (const [t, o] of Object.entries(e)) n.setAttribute(t, o);
                            return n
                        },
                        r = (e, n, t, r) => {
                            const i = document.createElementNS(H, "svg");
                            return i.id = e, i.setAttribute("width", "20"), i.setAttribute("height", "26"), i.setAttribute("viewBox", "0 0 20 26"), i.style.cssText = `position:absolute; top:0; left:0; overflow:visible; ${r}`, i.appendChild(o({
                                stroke: n,
                                "stroke-width": "3",
                                "stroke-linejoin": "round",
                                fill: n
                            })), i.appendChild(o({
                                fill: t
                            })), i
                        },
                        i = r("agent-phantom-cursor-plain", "white", "#111", ""),
                        a = r("agent-phantom-cursor-styled", "#D97757", "#FAF9F5", "filter: drop-shadow(0 0 4px rgba(217,119,87,0.9)) drop-shadow(0 0 10px rgba(217,119,87,0.45));");
                    return t.appendChild(i), t.appendChild(a), {
                        container: t,
                        styled: a,
                        plain: i
                    }
                }(e, n);
                return i = t, a = o, s = r, q(i), f = e, x = n, Promise.resolve()
            }
            return W(), i.style.transform = `translate3d(${e}px, ${n}px, 0)`, f = e, x = n, t || document.hidden ? Promise.resolve() : new Promise(e => {
                let n = !1;
                const t = () => {
                    n || (n = !0, i?.removeEventListener("transitionend", t), e())
                };
                i.addEventListener("transitionend", t, {
                    once: !0
                }), setTimeout(t, 220)
            })
        }

        function _() {
            i?.remove(), i = null, a = null, s = null, M()
        }

        function M() {
            y?.layer.remove(), y = null
        }
        const O = (e, n, t) => Math.max(n, Math.min(t, e));

        function D() {
            const {
                cursor: e,
                label: n
            } = y, t = window.innerWidth, o = window.innerHeight, r = m >= 0 && L >= 0 && m <= t && L <= o, i = r ? m : O(m, 4, t - 24), a = r ? L : O(L, 4, o - 24);
            if (e.dataset.shape = c ? "circle" : "arrow", function(e) {
                    const n = y,
                        t = n.at;
                    if (t?.x === e.x && t.y === e.y) return;
                    n.ringDue && $(), t && P(), n.at = e, n.travelling = Boolean(t), n.landing = void 0;
                    const o = () => {
                        n.travelling = !1, n === y && (P(), n.ringDue && $())
                    };
                    try {
                        const {
                            lean: r,
                            moveCursor: i,
                            placeCursor: a
                        } = AgentCursorMotion;
                        t ? n.landing = i(n.cursor, e, o, [r(n.arrow)]) : a(n.cursor, e)
                    } catch (r) {
                        n.travelling = !1, n.cursor.style.transform = `translate(${e.x}px, ${e.y}px)`
                    }
                }(c ? {
                    x: 19,
                    y: o - 23
                } : {
                    x: i,
                    y: a
                }), n.dataset.words !== l && (n.dataset.words = l, y.labelWidth = n.offsetWidth), n.toggleAttribute("data-spent", u && !c), c) return n.style.transform = "translate(13px, -11px)", void(n.style.borderRadius = "11px");
            const s = y.labelWidth,
                d = a + 38 > o - 8,
                p = i + (d ? 24 : 13) + s > t - 8,
                f = d ? p ? -6 - s : 24 : p ? 8 - s : 13,
                x = d ? Math.min(2, o - 30 - a) : p ? 18 : 16;
            n.style.transform = `translate(${O(f,8-i,t-8-s-i)}px, ${x}px)`, n.style.borderRadius = p ? "10px 3px 10px 10px" : "3px 10px 10px 10px"
        }

        function N() {
            if (null === l || !h || document.hidden) return;
            if (y) return D(), void(y.layer.dataset.on = "");
            if (!K()) return;
            const e = function() {
                const e = (e, n) => {
                        const t = document.createElement("div");
                        return t.id = e, n?.appendChild(t), t
                    },
                    n = e("agent-cursor-layer");
                n.setAttribute("aria-hidden", "true");
                const t = e("agent-cursor-ring", n),
                    o = e("agent-cursor", n),
                    r = document.createElementNS(H, "svg");
                r.setAttribute("width", "22"), r.setAttribute("height", "22"), r.setAttribute("viewBox", "0 0 18 18");
                const i = document.createElementNS(H, "path");
                return i.setAttribute("d", "M2.2 1.6 L15.4 7.9 L9.5 9.8 L7.2 15.8 Z"), i.setAttribute("fill", `rgb(${F})`), i.setAttribute("stroke", "#fff"), i.setAttribute("stroke-width", "1.5"), i.setAttribute("stroke-linejoin", "round"), r.appendChild(i), e("agent-cursor-arrow", o).appendChild(r), e("agent-cursor-disc", o), {
                    layer: n,
                    ring: t,
                    cursor: o,
                    arrow: r,
                    label: e("agent-cursor-label", o),
                    labelWidth: 0,
                    at: null,
                    travelling: !1,
                    landing: void 0,
                    ringDue: !1
                }
            }();
            y = e, P(), q(e.layer), D(), requestAnimationFrame(() => {
                e === y && h && (e.layer.dataset.on = "")
            })
        }

        function R(e) {
            u = e, y?.label.toggleAttribute("data-spent", e && !c)
        }

        function P() {
            clearTimeout(p), R(!1), p = setTimeout(R, 1e3, !0)
        }

        function $() {
            if (y.ringDue = !1, !h || document.hidden) return;
            const e = document.createElement("div");
            y.ring.style.transform = y.cursor.style.transform, y.ring.replaceChildren(e), setTimeout(() => e.remove(), 650)
        }

        function U(e, n) {
            l = "string" == typeof e?.label ? e.label : null, n || (d = !0, P()), !0 === e?.rest ? c = !0 : e?.at && null === m && (m = e.at.x, L = e.at.y, c = !1), d || !0 === e?.rest || null === l || (l = ""), null === l && M()
        }

        function z() {
            const e = null === l ? "" : "none";
            a && (a.style.display = e), s && (s.style.display = e), y && (y.layer.style.visibility = ""), N()
        }

        function B() {
            const e = document.createElement("div");
            e.id = "agent-agent-stop-container", e.style.cssText = "\n      position: fixed;\n      bottom: 16px;\n      left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      pointer-events: none;\n      z-index: 2147483647;\n    ";
            const n = document.createElement("button");
            return n.id = "agent-agent-stop-button", n.innerHTML = '\n      <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style="margin-right: 12px; vertical-align: middle;">\n        <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm40-112v56a12,12,0,0,1-12,12H100a12,12,0,0,1-12-12V100a12,12,0,0,1,12-12h56A12,12,0,0,1,168,100Z"></path>\n      </svg>\n      <span style="vertical-align: middle;">Stop Agent</span>\n    ', n.style.cssText = '\n      position: relative;\n      transform: translateY(100px);\n      padding: 12px 16px;\n      background: #FAF9F5;\n      color: #141413;\n      border: 0.5px solid rgba(31, 30, 29, 0.4);\n      border-radius: 12px;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      box-shadow: \n        0 40px 80px rgba(217, 119, 87, 0.24),\n        0 4px 14px rgba(217, 119, 87, 0.24);\n      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n      opacity: 0;\n      user-select: none;\n      pointer-events: auto;\n      white-space: nowrap;\n      margin: 0 auto;\n    ', n.addEventListener("mouseenter", () => {
                h && (n.style.background = "#F5F4F0", n.style.boxShadow = "0 40px 80px rgba(217, 119, 87, 0.24), 0 4px 14px rgba(217, 119, 87, 0.24)")
            }), n.addEventListener("mouseleave", () => {
                h && (n.style.background = "#FAF9F5", n.style.boxShadow = "0 40px 80px rgba(217, 119, 87, 0.24), 0 4px 14px rgba(217, 119, 87, 0.24)")
            }), n.addEventListener("click", async e => {
                e.isTrusted && (await chrome.runtime.sendMessage({
                    type: "STOP_AGENT",
                    targetTabId: E
                }), S && clearTimeout(S), S = setTimeout(() => {
                    if (S = null, h) {
                        try {
                            chrome.runtime.sendMessage({
                                type: "STOP_AGENT_DROPPED",
                                targetTabId: E
                            })
                        } catch (e) {}! function() {
                            try {
                                const e = document.createElement("div");
                                e.style.cssText = "position:fixed;bottom:88px;left:50%;transform:translateX(-50%);z-index:2147483646;pointer-events:none;";
                                const n = e.attachShadow({
                                        mode: "closed"
                                    }),
                                    t = document.createElement("div");
                                t.textContent = "Stop didn’t reach Agent — close the side panel to stop.", t.style.cssText = "font:500 13px/1.3 system-ui,-apple-system,sans-serif;color:#141413;background:#FAF9F5;padding:8px 14px;border-radius:18px;box-shadow:0 4px 14px rgba(217,119,87,0.24);opacity:0;transition:opacity .15s ease-out;", n.appendChild(t), q(e), requestAnimationFrame(() => t.style.opacity = "1"), setTimeout(() => {
                                    t.style.opacity = "0", setTimeout(() => e.remove(), 200)
                                }, 3e3)
                            } catch (e) {}
                        }()
                    }
                }, 1500))
            }), e.appendChild(n), e
        }

        function W() {
            if (!n) {
                const t = document.createElement("div"),
                    o = t.attachShadow({
                        mode: "closed"
                    });
                o.appendChild(function() {
                    const e = document.createElement("style");
                    return e.textContent = `\n      :host {\n        all: initial !important;\n        display: contents !important;\n      }\n      @keyframes agent-pulse {\n        0%, 100% { opacity: 0.6; }\n        50% { opacity: 1; }\n      }\n      #agent-agent-glow-border-inner {\n        animation: agent-pulse 2s ease-in-out infinite;\n      }\n      #agent-cursor-layer {\n        position: fixed;\n        top: 0;\n        left: 0;\n        direction: ltr;\n        user-select: none;\n        pointer-events: none;\n        z-index: 2147483646;\n        opacity: 0;\n        transition: opacity 200ms ease-out;\n      }\n      #agent-cursor-layer[data-on] {\n        opacity: 1;\n        transition-duration: 120ms;\n      }\n      #agent-cursor-layer div {\n        position: absolute;\n        top: 0;\n        left: 0;\n        box-sizing: border-box;\n      }\n      #agent-cursor {\n        will-change: transform;\n      }\n      #agent-cursor-arrow,\n      #agent-cursor-disc {\n        opacity: 0;\n        transform: scale(0.4);\n        transition: opacity 120ms linear, transform 200ms ease-out;\n      }\n      #agent-cursor-layer #agent-cursor-arrow {\n        top: -2px;\n        left: -3px;\n        transform-origin: 3px 2px;\n        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.28));\n      }\n      #agent-cursor-arrow svg {\n        display: block;\n        transform-origin: 3px 2px;\n      }\n      #agent-cursor-layer #agent-cursor-disc {\n        top: -7px;\n        left: -7px;\n        width: 14px;\n        height: 14px;\n        border-radius: 50%;\n        background: rgb(${F});\n        box-shadow: 0 0 0 1.5px #fff, 0 1px 3px 1px rgba(0, 0, 0, 0.24);\n      }\n      [data-shape="arrow"] > #agent-cursor-arrow,\n      [data-shape="circle"] > #agent-cursor-disc {\n        opacity: 1;\n        transform: scale(1);\n      }\n      #agent-cursor-label {\n        height: 22px;\n        max-width: 240px;\n        padding: 3px 8px;\n        overflow: hidden;\n        color: #fff;\n        background: rgb(${F});\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);\n        /* Generic names only: a page's @font-face can stand in for a named font and watch which letters load. */\n        font: 500 12px/16px system-ui, sans-serif;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        transition: opacity 200ms linear;\n      }\n      #agent-cursor-label[data-spent] {\n        opacity: 0;\n      }\n      /* The words are CSS generated content, not a text node: the page's window.find matches text nodes even in this closed root. */\n      #agent-cursor-label::before {\n        content: attr(data-words);\n      }\n      #agent-cursor-label:not([data-words]),\n      #agent-cursor-label[data-words=""] {\n        display: none;\n      }\n      @keyframes agent-cursor-ring {\n        from { opacity: 0.95; transform: scale(0.22); }\n        to { opacity: 0; transform: scale(1); }\n      }\n      @keyframes agent-cursor-ring-fade {\n        from { opacity: 0.95; }\n        to { opacity: 0; }\n      }\n      #agent-cursor-layer #agent-cursor-ring > div {\n        top: -17px;\n        left: -17px;\n        width: 34px;\n        height: 34px;\n        border: 3px solid rgb(${F});\n        border-radius: 50%;\n        background: rgba(${F}, 0.3);\n        animation: agent-cursor-ring 650ms ease-out forwards;\n      }\n      @media (prefers-reduced-motion: reduce) {\n        #agent-agent-glow-border-inner {\n          animation: none;\n        }\n        #agent-cursor-arrow,\n        #agent-cursor-disc,\n        #agent-cursor-label {\n          transition: none;\n        }\n        #agent-cursor-layer #agent-cursor-ring > div {\n          animation-name: agent-cursor-ring-fade;\n        }\n      }\n    `, e
                }()), e = t, n = o
            }
            for (const n of e.getAttributeNames()) e.removeAttribute(n);
            const t = document.body || document.documentElement;
            return e.parentNode !== t && t.appendChild(e), n
        }

        function q(n) {
            W().appendChild(n), e.nextElementSibling && e.parentNode.appendChild(e)
        }

        function V() {
            W(), t ? t.style.display = "" : (t = function() {
                const e = document.createElement("div");
                e.id = "agent-agent-glow-border", e.style.cssText = "\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      pointer-events: none;\n      z-index: 2147483646;\n      opacity: 0;\n      transition: opacity 0.3s ease-in-out;\n    ";
                const n = document.createElement("div");
                return n.id = "agent-agent-glow-border-inner", n.style.cssText = "\n      position: absolute;\n      inset: 0;\n      will-change: opacity;\n      box-shadow:\n        inset 0 0 15px rgba(217, 119, 87, 0.7),\n        inset 0 0 25px rgba(217, 119, 87, 0.5),\n        inset 0 0 35px rgba(217, 119, 87, 0.2);\n    ", e.appendChild(n), e
            }(), q(t)), requestAnimationFrame(() => {
                t && (t.style.opacity = "1")
            })
        }

        function Z() {
            h || b || (t && (t.style.opacity = "0"), setTimeout(() => {
                h || b || t && (t.remove(), t = null)
            }, 300))
        }

        function j() {
            h = !0, v = !1, w = !1,
                function() {
                    try {
                        if (!g) {
                            g = new AudioContext;
                            const e = g.createGain();
                            e.gain.value = 0, e.connect(g.destination);
                            const n = g.createConstantSource();
                            n.connect(e), n.start(), g.addEventListener("statechange", () => {}), document.addEventListener("pointerdown", () => {
                                h && g?.resume().catch(() => {})
                            }, {
                                capture: !0
                            })
                        }
                        g.resume().catch(() => {})
                    } catch (e) {}
                }(), document.hidden || C || G()
        }

        function G() {
            V(), null != E ? o ? o.style.display = "" : (o = B(), q(o)) : o && (o.style.display = "none");
            try {
                i || I(m ?? Math.round(window.innerWidth / 2), L ?? Math.round(window.innerHeight / 2)), z()
            } catch (e) {}
            requestAnimationFrame(() => {
                if (o) {
                    const e = o.querySelector("#agent-agent-stop-button");
                    e && (e.style.transform = "translateY(0)", e.style.opacity = "1")
                }
            })
        }

        function X() {
            if (S && (clearTimeout(S), S = null), c = !0, d = !1, h) {
                if (h = !1, Z(), g?.suspend().catch(() => {}), delete y?.layer.dataset.on, b) return o && (o.remove(), o = null), void _();
                if (o) {
                    const e = o.querySelector("#agent-agent-stop-button");
                    e && (e.style.transform = "translateY(100px)", e.style.opacity = "0")
                }
                setTimeout(() => {
                    h || (o && (o.remove(), o = null), _())
                }, 300)
            }
        }

        function Y() {
            C = !1, T && (clearTimeout(T), T = null)
        }

        function J(e) {
            C = !0, T && clearTimeout(T), T = setTimeout(() => {
                T = null, C = !1, Q()
            }, 5e3), v = h, w = b, o && (o.style.display = "none"), e || (t && (t.style.display = "none"), a && (a.style.display = "none"), s && (s.style.display = ""), y && (y.layer.style.visibility = "hidden")), r && b && (r.style.display = "none")
        }

        function K() {
            return !(document.hidden || C || v || w)
        }

        function Q() {
            K() && (h && G(), b && oe())
        }
        document.addEventListener("visibilitychange", Q), document.addEventListener("visibilitychange", () => {
            document.hidden && y && (y.ringDue = !1)
        });
        const ee = () => `${window.innerWidth}x${window.innerHeight}`;
        let ne = ee();

        function te(e) {
            b = !0, k = e, v = !1, w = !1, A && (clearInterval(A), A = null), A = setInterval(async () => {
                try {
                    (await chrome.runtime.sendMessage({
                        type: "STATIC_INDICATOR_HEARTBEAT"
                    }))?.success || ie()
                } catch (e) {
                    ie()
                }
            }, 5e3), document.hidden || C ? e && re() : oe()
        }

        function oe() {
            V(), k ? re() : r ? r.style.display = "" : (r = function() {
                const e = document.createElement("div");
                e.id = "agent-static-indicator-container", e.innerHTML = '\n      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; flex-shrink: 0; margin-right: 8px;">\n        <path d="M3.13946 10.6399L6.28757 8.87462L6.37405 8.73821L6.28757 8.6339H6.13189L5.60432 8.6018L3.80541 8.55366L2.24865 8.48947L0.735135 8.40923H0.492973L0.354595 8.32899L0.181622 8.1685L0.0345946 8.01605L0 7.85557L0.0345946 7.62287L0.138378 7.44634L0.224865 7.40622H0.354595L0.812973 7.44634L1.82486 7.51856L3.34703 7.62287L4.44541 7.68706L6.08 7.85557H6.33946L6.37405 7.75125L6.28757 7.68706L6.21838 7.62287L4.64432 6.55567L2.94054 5.4323L2.04973 4.78235L1.57405 4.45336L1.33189 4.14845L1.22811 3.92377L1.17622 3.69107L1.22811 3.47442L1.33189 3.28185L1.46162 3.13741L1.66054 2.99298H1.87676L2.24865 3.0331L2.39568 3.07322L2.99243 3.53059L4.26378 4.51755L5.92432 5.73721L6.16649 5.93781H6.27892V5.82548L6.16649 5.64092L5.26703 4.01204L4.30703 2.35105L3.87459 1.66098L3.76216 1.25176C3.7391 1.16082 3.69297 0.977332 3.69297 0.970913V0.762287L3.77946 0.505517L3.93513 0.240722L4.18595 0.0882648L4.4627 0H4.67892L4.83459 0.0240722L5.12865 0.0882648L5.4054 0.328987L5.82054 1.27583L6.48649 2.76028L7.52432 4.78235L7.82703 5.38415L7.99135 5.93781L8.05189 6.10632H8.15567V6.01003L8.24216 4.87061L8.39784 3.47442L8.55351 1.67703L8.6054 1.17151L8.85622 0.561685L8.9773 0.417252L9.21946 0.232698H9.35784L9.74703 0.417252L9.97189 0.665998L10.067 0.874624L10.0238 1.17151L9.83351 2.40722L9.46162 4.34102L9.21946 5.64092H9.35784L9.52216 5.47242L10.1795 4.60582L11.2778 3.22568L11.7622 2.68004L12.333 2.07823L12.6962 1.78937L13.0162 1.67703L13.3881 1.78937L13.7168 2.06219L13.8897 2.54363V2.76028L13.6649 3.32197L12.9557 4.22066L12.3676 4.98295L12.0043 5.56871L11.0011 7.02106V7.08526H11.1741L13.0768 6.67603L14.1059 6.49147L15.3341 6.28285L15.5762 6.34704L15.8876 6.53962L15.9481 6.80441L15.8876 7.12538L15.7319 7.34203L14.4173 7.66299L12.8778 7.97593L10.5854 8.51559C10.5705 8.51909 10.56 8.53236 10.56 8.54764C10.56 8.56468 10.573 8.57891 10.59 8.58044L11.6238 8.67402L12.0649 8.69809H13.1459L15.1611 8.85055L15.6886 9.19559L15.9481 9.39619L16 9.62086L15.9481 9.94985L15.8443 10.1023L15.4119 10.3029L15.1351 10.3591L14.0454 10.1023L11.4941 9.49248L10.6205 9.27583H10.4995V9.34804L11.2259 10.0622L12.5665 11.2658L14.2357 12.8225L14.3222 13.0953V13.2076L14.1059 13.5125L13.9243 13.5206L13.8811 13.4804L12.4108 12.3731L12.2984 12.325L11.84 11.8756L10.56 10.7924H10.4735V10.9047L10.7676 11.338L12.333 13.6891L12.4108 14.4112L12.2984 14.6439L11.8919 14.7884L11.667 14.7563L11.4508 14.7081L11.2605 14.5396L10.5254 13.4162L9.5827 11.9719L8.82162 10.672H8.79342C8.76039 10.672 8.73278 10.6972 8.7297 10.73L8.27676 15.5667L8.06919 15.8154L7.6454 16H7.58486L7.17838 15.6951L6.96216 15.1976L7.17838 14.2106L7.43784 12.9268L7.6454 11.9077L7.83567 10.6399L7.95187 10.2164C7.9548 10.2057 7.95069 10.1944 7.94161 10.1881C7.91157 10.1672 7.87034 10.1741 7.84878 10.2037L6.89297 11.5145L5.44 13.4804L4.28973 14.7081L4.01297 14.8205H3.80541L3.5373 14.5717V14.4514L3.58054 14.1304L3.84865 13.7372L5.44 11.7151L6.4 10.4554L7.01872 9.73222C7.04511 9.70139 7.04245 9.65523 7.0127 9.62763C7.00333 9.61894 6.98925 9.61773 6.97854 9.62471L2.75027 12.3811L1.99784 12.4774L1.66919 12.1725L1.71243 11.675L1.86811 11.5145L3.13946 10.6399Z" fill="#D97757"/>\n      </svg>\n      <span style="vertical-align: middle; color: #141413; font-size: 14px; display: inline-block;">Agent is active in this tab group</span>\n      <div style="display: inline-block; width: 0.5px; height: 32px; background: rgba(31, 30, 29, 0.15); margin: 0 8px; vertical-align: middle;"></div>\n      <button id="agent-static-chat-button" style="position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 6px; background: transparent; border: none; cursor: pointer; pointer-events: auto; vertical-align: middle; width: 32px; height: 32px; border-radius: 8px; transition: background 0.2s;">\n        <svg width="20" height="20" viewBox="0 0 20 20" fill="#141413" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; display: block;">\n          <path d="M10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5H3C2.79779 17.5 2.61549 17.3782 2.53809 17.1914C2.4607 17.0046 2.50349 16.7895 2.64648 16.6465L4.35547 14.9365C3.20124 13.6175 2.5 11.8906 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5ZM10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 11.7952 4.22659 13.4199 5.40332 14.5967L5.46582 14.6729C5.52017 14.7544 5.5498 14.8508 5.5498 14.9502C5.5498 15.0828 5.49709 15.2099 5.40332 15.3037L4.20703 16.5H10C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5ZM13.29 9.30371C13.3986 9.05001 13.6925 8.93174 13.9463 9.04004C14.2 9.14863 14.3183 9.44253 14.21 9.69629C13.8506 10.536 13.1645 11.25 12.25 11.25C11.6372 11.25 11.128 10.9289 10.75 10.4648C10.372 10.9289 9.86276 11.25 9.25 11.25C8.63724 11.25 8.12801 10.9289 7.75 10.4648C7.37198 10.9289 6.86276 11.25 6.25 11.25C5.97386 11.25 5.75 11.0261 5.75 10.75C5.75 10.4739 5.97386 10.25 6.25 10.25C6.58764 10.25 7.00448 9.97056 7.29004 9.30371L7.32422 9.2373C7.41431 9.09121 7.5749 9 7.75 9C7.9501 9 8.13123 9.11975 8.20996 9.30371L8.32227 9.53516C8.59804 10.0359 8.95442 10.25 9.25 10.25C9.58764 10.25 10.0045 9.97056 10.29 9.30371L10.3242 9.2373C10.4143 9.09121 10.5749 9 10.75 9C10.9501 9 11.1312 9.11975 11.21 9.30371L11.3223 9.53516C11.598 10.0359 11.9544 10.25 12.25 10.25C12.5876 10.25 13.0045 9.97056 13.29 9.30371Z" />\n        </svg>\n        <span id="agent-static-chat-tooltip" style="position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%); padding: 6px 12px; background: #30302E; color: #FAF9F5; border-radius: 6px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif;">Open chat</span>\n      </button>\n      <button id="agent-static-close-button" style="position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 6px; background: transparent; border: none; cursor: pointer; pointer-events: auto; vertical-align: middle; width: 32px; height: 32px; margin-left: 4px; border-radius: 8px; transition: background 0.2s;">\n        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px; display: block;">\n          <path d="M15.1464 4.14642C15.3417 3.95121 15.6582 3.95118 15.8534 4.14642C16.0486 4.34168 16.0486 4.65822 15.8534 4.85346L10.7069 9.99997L15.8534 15.1465C16.0486 15.3417 16.0486 15.6583 15.8534 15.8535C15.6826 16.0244 15.4186 16.0461 15.2245 15.918L15.1464 15.8535L9.99989 10.707L4.85338 15.8535C4.65813 16.0486 4.34155 16.0486 4.14634 15.8535C3.95115 15.6583 3.95129 15.3418 4.14634 15.1465L9.29286 9.99997L4.14634 4.85346C3.95129 4.65818 3.95115 4.34162 4.14634 4.14642C4.34154 3.95128 4.65812 3.95138 4.85338 4.14642L9.99989 9.29294L15.1464 4.14642Z" fill="#141413"/>\n        </svg>\n        <span id="agent-static-close-tooltip" style="position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%); padding: 6px 12px; background: #30302E; color: #FAF9F5; border-radius: 6px; font-size: 12px; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity 0.2s; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif;">Dismiss</span>\n      </button>\n    ', e.style.cssText = '\n      position: fixed;\n      bottom: 16px;\n      left: 50%;\n      transform: translateX(-50%);\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 6px 6px 6px 16px;\n      background: #FAF9F5;\n      border: 0.5px solid rgba(31, 30, 29, 0.30);\n      border-radius: 14px;\n      box-shadow: 0 40px 80px 0 rgba(0, 0, 0, 0.15);\n      z-index: 2147483647;\n      pointer-events: none;\n      white-space: nowrap;\n      user-select: none;\n      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\n    ';
                const n = e.querySelector("#agent-static-chat-button"),
                    t = e.querySelector("#agent-static-chat-tooltip");
                n && (n.addEventListener("mouseenter", () => {
                    n.style.background = "#F0EEE6", t && (t.style.opacity = "1")
                }), n.addEventListener("mouseleave", () => {
                    n.style.background = "transparent", t && (t.style.opacity = "0")
                }), n.addEventListener("click", async e => {
                    if (e.isTrusted) try {
                        await chrome.runtime.sendMessage({
                            type: "SWITCH_TO_MAIN_TAB"
                        })
                    } catch (n) {}
                }));
                const o = e.querySelector("#agent-static-close-button"),
                    r = e.querySelector("#agent-static-close-tooltip");
                return o && (o.addEventListener("mouseenter", () => {
                    o.style.background = "#F0EEE6", r && (r.style.opacity = "1")
                }), o.addEventListener("mouseleave", () => {
                    o.style.background = "transparent", r && (r.style.opacity = "0")
                }), o.addEventListener("click", async e => {
                    if (e.isTrusted) try {
                        await chrome.runtime.sendMessage({
                            type: "DISMISS_STATIC_INDICATOR_FOR_GROUP"
                        })
                    } catch (n) {}
                })), e
            }(), q(r))
        }

        function re() {
            k = !0, r && (r.remove(), r = null)
        }

        function ie() {
            b && (b = !1, A && (clearInterval(A), A = null), re(), Z())
        }
        window.addEventListener("resize", () => {
            ne !== ee() && (ne = ee(), y && !document.hidden && (y.at = null, D()))
        }), chrome.runtime.onMessage.addListener((e, n, i) => {
            if ("SHOW_AGENT_INDICATORS" === e.type) "ownerTabId" in e && (E = e.ownerTabId), U(e.cursorStep, !0), e.afterToolUse && Y(), j(), e.afterToolUse && Q(), i({
                success: !0
            });
            else if ("HIDE_AGENT_INDICATORS" === e.type) X(), i({
                success: !0
            });
            else {
                if ("UPDATE_PHANTOM_CURSOR" === e.type) {
                    c = !1, d = !0;
                    const n = I(e.x, e.y);
                    let t = !1;
                    try {
                        N(), e.pressed && (t = !(!y || document.hidden || (P(), y.travelling ? y.ringDue = !0 : $(), 0)))
                    } catch (a) {}
                    return Promise.resolve(y ? y.landing : n).then(() => i({
                        success: !0,
                        rang: t
                    })), !0
                }
                "UPDATE_PHANTOM_CURSOR_STEP" === e.type ? (U(e.cursorStep), Q(), i({
                    success: !0
                })) : "HIDE_FOR_TOOL_USE" === e.type ? (J(!0 === e.pillsOnly), i({
                    success: !0
                })) : "SHOW_AFTER_TOOL_USE" === e.type ? (Y(), (v || w) && t && (t.style.display = ""), v && o && (o.style.display = ""), z(), w && r && (r.style.display = ""), v = !1, w = !1, Q(), i({
                    success: !0
                })) : "SHOW_STATIC_INDICATOR" === e.type ? (e.afterToolUse && Y(), te(!0 === e.dismissed), e.afterToolUse && Q(), i({
                    success: !0
                })) : "HIDE_STATIC_INDICATOR" === e.type ? (ie(), i({
                    success: !0
                })) : "HIDE_STATIC_PILL" === e.type && (re(), i({
                    success: !0
                }))
            }
        }), window.addEventListener("beforeunload", e => {
            e.isTrusted && (X(), ie(), _(), g?.close().catch(() => {}), g = null)
        })
    }();
})()