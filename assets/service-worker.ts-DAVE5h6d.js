import {
    i as e,
    r as t,
    t as n
} from "./constants-AGV8EUcv.js";
import {
    $ as r,
    $t as i,
    An as a,
    B as o,
    Cn as s,
    Ct as c,
    Dn as d,
    En as u,
    Fn as l,
    G as p,
    Gt as h,
    Hn as f,
    J as m,
    Jn as w,
    Jt as g,
    K as y,
    Ln as _,
    Mn as b,
    Nn as v,
    O as I,
    On as k,
    Pn as T,
    Q as S,
    Qt as A,
    Sn as N,
    Tn as O,
    U as E,
    W as C,
    Wn as D,
    Wt as P,
    X as x,
    Xt as U,
    Y as R,
    Yn as L,
    Yt as M,
    Z as $,
    Zt as B,
    _n as j,
    a as G,
    c as H,
    d as F,
    dn as W,
    et as q,
    gn as K,
    gt as J,
    h as z,
    hn as V,
    ht as Y,
    i as Q,
    jn as X,
    k as Z,
    kn as ee,
    l as te,
    ln as ne,
    m as re,
    mn as ie,
    n as ae,
    nt as oe,
    o as se,
    p as ce,
    pn as de,
    qt as ue,
    r as le,
    rt as pe,
    t as he,
    tt as fe,
    u as me,
    un as we,
    vn as ge,
    xn as ye,
    yn as _e
} from "./SavedPromptsService-CxvgAL-B.js";
import {
    $t as be,
    At as ve,
    B as Ie,
    Ft as ke,
    Gt as Te,
    It as Se,
    Jt as Ae,
    Kt as Ne,
    Lt as Oe,
    Nt as Ee,
    Ot as Ce,
    Pt as De,
    Qt as Pe,
    Rt as xe,
    Ut as Ue,
    Vn as Re,
    Wn as Le,
    Wt as Me,
    Yt as $e,
    a as Be,
    an as je,
    at as Ge,
    c as He,
    cn as Fe,
    d as We,
    dn as qe,
    en as Ke,
    f as Je,
    fn as ze,
    i as Ve,
    in as Ye,
    it as Qe,
    jt as Xe,
    l as Ze,
    ln as et,
    mn as tt,
    n as nt,
    nn as rt,
    nt as it,
    o as at,
    on as ot,
    p as st,
    pt as ct,
    qt as dt,
    r as ut,
    rn as lt,
    rt as pt,
    s as ht,
    sn as ft,
    t as mt
} from "./mcpPermissions-DIAg91MW.js";
import {
    n as wt,
    t as gt
} from "./skillText-Huh3v7kv.js";
import {
    t as yt
} from "./onboarding-prompts-CJtFEMjA.js";
var _t = 0,
    bt = 16777216;
async function vt(e, t) {
    if (_t >= 8) return {
        ok: !1,
        error: "send_failed"
    };
    _t++;
    try {
        const n = await N();
        if (!n || !O(n)) return t() ? {
            ok: !1,
            error: "no_target"
        } : void 0;
        const r = await je(),
            i = new Set(r?.extensionIds ?? []),
            a = Array.isArray(e.extensionIds) ? e.extensionIds.filter(e => "string" == typeof e) : [],
            o = a.filter(e => i.has(e));
        if (a.length > 0 && 0 === o.length) return t() ? {
            ok: !1,
            error: "no_target",
            detail: "not_allowlisted"
        } : void 0;
        const s = "number" == typeof e.timeoutMs ? e.timeoutMs : void 0,
            c = await ft(o, e.payload, s);
        if (!t()) return;
        return c.ok && function(e, t) {
            try {
                const n = JSON.stringify(e) ?? "";
                return n.length > t ? 1 / 0 : 3 * n.length <= t ? n.length : (new TextEncoder).encode(n).length
            } catch {
                return 1 / 0
            }
        }(c.response, bt) > bt ? {
            ok: !1,
            error: "send_failed"
        } : c
    } catch {
        return t() ? {
            ok: !1,
            error: "send_failed"
        } : void 0
    } finally {
        _t--
    }
}
var It = {
    bridge: !1,
    native: !1
};

function kt(e, t) {
    It[e] = t;
    const n = It.bridge || It.native;
    return T(ee.MCP_CONNECTED, n), n
}
var Tt, St, At, Nt = null,
    Ot = !1,
    Et = null,
    Ct = null,
    Dt = 0,
    Pt = null,
    xt = null,
    Ut = 0,
    Rt = null,
    Lt = Date.now(),
    Mt = 0,
    $t = !1,
    Bt = 0,
    jt = 0,
    Gt = 0;
async function Ht() {
    const {
        bridgeDisplayName: e,
        bridgeDefaultDisplayName: t
    } = await chrome.storage.local.get(["bridgeDisplayName", "bridgeDefaultDisplayName"]);
    return {
        userSet: "string" == typeof e && e ? e : void 0,
        default: "string" == typeof t && t ? t : void 0
    }
}
async function Ft() {
    const e = await Ht();
    return e.userSet ?? e.default
}
async function Wt(e) {
    if ("string" != typeof e) return;
    const t = e.replace(I, " ").replace(Z, " ").replace(/\s+/g, " ").trim(),
        n = Array.from(t).slice(0, 64).join("").trim();
    n && (await Ht()).default !== n && (await chrome.storage.local.set({
        bridgeDefaultDisplayName: n
    }), await async function() {
        const e = Nt;
        if (!e || !Kt(e)) return;
        const t = await Ht();
        if (t.userSet || t.default === At) return;
        if (Nt !== e || !Kt(e)) return;
        if (Qt.size > 0 || qt > 0) return;
        e.close(4004, "display-name-changed")
    }())
}
var qt = 0;

function Kt(e) {
    return e.readyState === WebSocket.CONNECTING || e.readyState === WebSocket.OPEN
}
var Jt, zt = new Set(["external_message", "external_message_result", "external_config"]),
    Vt = "bridge-keepalive",
    Yt = 3e5,
    Qt = new Map;

function Xt() {
    try {
        return navigator.userAgentData?.platform ?? navigator.platform ?? "Unknown"
    } catch {
        return navigator.platform ?? "Unknown"
    }
}
async function Zt() {
    return en()
}
async function en() {
    if (xt) return xt;
    const e = await chrome.storage.local.get("bridgeDeviceId");
    return e.bridgeDeviceId ? xt = e.bridgeDeviceId : (xt = crypto.randomUUID(), await chrome.storage.local.set({
        bridgeDeviceId: xt
    }), xt)
}

function tn() {
    nn(), Pt = setInterval(() => {
        Nt?.readyState === WebSocket.OPEN && Nt.send(JSON.stringify({
            type: "ping"
        }))
    }, 2e4)
}

function nn() {
    Pt && (clearInterval(Pt), Pt = null)
}
async function rn() {
    if (Nt?.readyState === WebSocket.OPEN || Ot) return !1;
    const e = K();
    // Szmelc-RCE: anonymous bridge mode — a signed-out device may still connect
    // to any self-hosted bridge (config bridgeAnonymous, default on). Managed
    // org posture and already-signed-in-but-blocked states never fall back.
    const canAnon = (globalThis.__SZMELC_CFG || {}).bridgeAnonymous !== !1 && !(e && e.managed) && !(e && e.identity);
    if (Ot = !0, Et && (clearTimeout(Et), Et = null), Ct = null, (!e || !an(e)) && !canAnon) return Ot = !1, !1;
    const t = function() {
            const e = L();
            // Szmelc-RCE: bridge endpoint from central config (options.html).
            const z = globalThis.__SZMELC_CFG || {};
            return e.localBridge ? e.bridgeLocalUrl || "ws://localhost:8765" : z.bridgeUrl || e.bridgeUrl || "wss://szmelc.com"
        }(),
        n = !!(globalThis.__SZMELC_CFG || {}).localBridge || L().localBridge;
    let r, o;
    if (n) r = "dev_user_local";
    else {
        // Szmelc-RCE: fast-path — with no tokens stored at all the device is
        // definitely signed out, so connect anonymously right away instead of
        // waiting on token validation (which may stall on an unreachable
        // default API endpoint).
        let fastAnon = !1;
        try {
            const toks = await chrome.storage.local.get(["accessToken", "refreshToken"]);
            fastAnon = canAnon && !toks.accessToken && !toks.refreshToken;
        } catch (_) {}
        if (fastAnon) {
            r = await en(), o = r
        } else {
            try {
                o = await y()
            } catch (_) {
                o = null
            }
            if (!o) {
                // Szmelc-RCE: no OAuth token — connect anonymously if allowed
                // (device UUID serves as both userId and opaque token).
                if (!canAnon) return Ot = !1, _n(), !1;
                r = await en(), o = r
            } else {
                const e = $t;
                if ($t = !1, r = await m(o, {
                        forceRefresh: e
                    }), !r && e && ($t = !0, r = await a(ee.ACCOUNT_UUID).catch(() => {})), !r) {
                    if (!canAnon) return Ot = !1, _n(), !1;
                    r = await en(), o = r
                }
            }
        }
    }
    if (on(e, n ? void 0 : r)) return Ot = !1, sn(), !1;
    try {
        const s = await en();
        Rt = s;
        const c = await Ft();
        At = c;
        const d = `${t}/chrome/${r}`;
        Nt && (Nt.onclose = null, Nt.close());
        const u = new WebSocket(d);
        return Nt = u, ln = void 0, Ye(), rt.forgetAttachOrigins(), Tt = n ? void 0 : r, jt = 0, Gt = Date.now(), u.onopen = () => {
            if (Nt !== u) return;
            if (on(e, Tt)) return dn(), void sn();
            Gt = 0, jt = Date.now();
            const t = {
                type: "connect",
                client_type: "chrome-extension",
                device_id: s,
                os_platform: Xt(),
                extension_version: chrome.runtime.getManifest().version,
                ...c && {
                    display_name: c
                },
                scoped_peer_disconnect: !0
            };
            n ? t.dev_user_id = r : t.oauth_token = o, u.send(JSON.stringify(t))
        }, u.onmessage = async e => {
            if (Nt === u) try {
                await async function(e) {
                    if (j()) return void dn();
                    zt.has(e.type);
                    switch (e.type) {
                        case "paired":
                            ln ??= !0 === e.scoped_peer_disconnect, oe("szmelc_rce.bridge.connected", {
                                status: "paired",
                                sw_uptime_ms: Date.now() - Lt,
                                previous_close_code: St ?? null,
                                reconnect_attempt: Dt
                            }), tn(), Ot = !1, Dt = 0, Mt = 0, Bt = 0, jt = Date.now(), Tn(), Cn();
                            break;
                        case "waiting":
                            void 0 === ln && !0 === e.scoped_peer_disconnect && (kt("bridge", !1) || Ke.stopTabGroupChangeListener(), yn(), lt("bridge")), ln ??= !0 === e.scoped_peer_disconnect, oe("szmelc_rce.bridge.connected", {
                                status: "waiting",
                                sw_uptime_ms: Date.now() - Lt,
                                previous_close_code: St ?? null,
                                reconnect_attempt: Dt
                            }), tn(), Ot = !1, Dt = 0, Mt = 0, Bt = 0, jt = Date.now();
                            break;
                        case "ping":
                            bn({
                                type: "pong"
                            });
                            break;
                        case "pong":
                            jt = Date.now();
                            break;
                        case "peer_connected":
                            oe("szmelc_rce.bridge.peer_connected"), Tn(), Cn(), kt("bridge", !0), await Ke.initialize(), Ke.startTabGroupChangeListener();
                            break;
                        case "peer_disconnected": {
                            const t = fn(e),
                                n = e.mcp_peer_count,
                                r = void 0 !== t && Number.isInteger(n) && Number(n) > 0 ? Number(n) : 0;
                            if (oe("szmelc_rce.bridge.peer_disconnected", {
                                    named: void 0 !== t,
                                    mcp_peer_count: void 0 !== t && Number.isInteger(n) ? n : null
                                }), void 0 !== t && (function(e) {
                                    for (const t of mn.get(e) ?? []) t.dead = !0;
                                    mn.delete(e)
                                }(t), function(e) {
                                    for (const [t, n] of Qt) n.origin === e && (Qt.delete(t), n.resolve(!1))
                                }(t)), 0 !== r || kt("bridge", !1) || Ke.stopTabGroupChangeListener(), void 0 === t || 0 === r || On.length > 0 || kn.length > 0) {
                                ! function() {
                                    pn++, kn.length = 0, On.length = 0, !0 === ln && yn();
                                    lt("bridge"), rt.detachAll("bridge")
                                }();
                                break
                            }
                            const i = ot();
                            void 0 === i || i === t ? (lt("bridge"), rt.detachAll("bridge")) : rt.detachAll("bridge", t);
                            break
                        }
                        case "tool_call":
                        case "tool_request": {
                            // Szmelc-RCE: also accept the generic execute_tool
                            // envelope over the bridge socket, so any
                            // self-hosted bridge speaking the documented
                            // {"type":"tool_request","method":"execute_tool",
                            //  "params":{...}} shape works alongside the hosted
                            // {"type":"tool_call", ...} frames.
                            if ("tool_request" === e.type) {
                                const p = e.params || {};
                                e = {
                                    ...e,
                                    tool_use_id: e.tool_use_id ?? p.tool_use_id,
                                    tool: p.tool,
                                    args: p.args ?? {},
                                    client_type: e.client_type || p.client_type || "bridge",
                                    permission_mode: p.permission_mode,
                                    allowed_domains: p.allowed_domains,
                                    handle_permission_prompts: p.handle_permission_prompts,
                                    session_scope: p.session_scope,
                                    supports_tool_result_notices: p.supports_tool_result_notices,
                                    supports_tool_result_error_code: p.supports_tool_result_error_code,
                                };
                            }
                            qt++;
                            const t = wn(e);
                            try {
                                await async function(e, t) {
                                    const n = e.target_device_id;
                                    if (n && n !== Rt) return;
                                    const r = e.tool_use_id,
                                        i = e.tool,
                                        o = e.client_type || "desktop",
                                        s = e.args ?? {},
                                        c = e.permission_mode,
                                        d = e.allowed_domains,
                                        u = !0 === e.handle_permission_prompts,
                                        l = e.session_scope,
                                        p = !0 === e.supports_tool_result_notices,
                                        h = !0 === e.supports_tool_result_error_code,
                                        f = e => h && e ? {
                                            error_code: Un.get(e) ?? e
                                        } : {};
                                    if (!r || !i) return;
                                    const m = ht.has(i);
                                    m || oe("szmelc_rce.bridge.tool_received", {
                                        tool_name: i,
                                        client_type: o,
                                        tool_use_id: r
                                    });
                                    const w = {
                                            tool_name: i,
                                            client_type: o,
                                            tool_use_id: r
                                        },
                                        g = () => !t.stillWanted() && (m || oe("szmelc_rce.bridge.tool_result_dropped", {
                                            ...w,
                                            reason: t.dropReason()
                                        }), !0);
                                    if ("session_expired" === await a(ee.LAST_AUTH_FAILURE_REASON)) {
                                        if (g()) return;
                                        return m || oe("szmelc_rce.bridge.tool_call", {
                                            ...w,
                                            success: !1,
                                            error: "session_expired"
                                        }), void En({
                                            type: "tool_result",
                                            tool_use_id: r,
                                            error: {
                                                content: [{
                                                    type: "text",
                                                    text: "Authentication failed. The extension may need to be re-authenticated. Open the Szmelc-RCE side panel and sign in again."
                                                }]
                                            },
                                            ...f("session_expired")
                                        })
                                    }
                                    const y = "browser_batch" === i && Array.isArray(s.actions) ? s.actions.find(e => "number" == typeof e?.input?.tabId && !("string" == typeof e?.name && it.has(e.name)))?.input?.tabId : void 0,
                                        _ = it.has(i) ? void 0 : "number" == typeof s.tabId ? s.tabId : "number" == typeof y ? y : void 0;
                                    if (void 0 !== _) try {
                                        await chrome.tabs.get(_)
                                    } catch {
                                        if (n) {
                                            if (g()) return;
                                            m || oe("szmelc_rce.bridge.tool_call", {
                                                ...w,
                                                success: !1,
                                                error: "tab_not_found"
                                            }), En({
                                                type: "tool_result",
                                                tool_use_id: r,
                                                error: {
                                                    content: [{
                                                        type: "text",
                                                        text: be(_)
                                                    }]
                                                },
                                                ...f("tab_not_found")
                                            })
                                        }
                                        return
                                    }
                                    let b;
                                    Nt?.readyState === WebSocket.OPEN && Nt.send(JSON.stringify({
                                        type: "ping"
                                    }));
                                    try {
                                        const e = await Ze({
                                            toolName: i,
                                            args: s,
                                            tabId: _,
                                            tabGroupId: l?.tabGroupId ?? s.tabGroupId,
                                            clientId: o,
                                            source: "bridge",
                                            permissionMode: c,
                                            allowedDomains: d,
                                            toolUseId: r,
                                            handlePermissionPrompts: u,
                                            requestPermissionFromHost: (e, n) => t.senderLeft() || t.accountChanged() || t.namedBridge && !t.stillWanted() ? Promise.resolve(!1) : function(e, t, n, r) {
                                                const i = crypto.randomUUID();
                                                return new Promise(a => {
                                                    Qt.set(i, {
                                                        resolve: a,
                                                        origin: r
                                                    }), bn({
                                                        type: "permission_request",
                                                        tool_use_id: e,
                                                        request_id: i,
                                                        tool_type: t.tool,
                                                        url: t.url,
                                                        action_data: t.actionData,
                                                        ...n && {
                                                            category: n
                                                        }
                                                    })
                                                })
                                            }(r, e, n, t.origin),
                                            reportPopupToHost: void 0,
                                            sessionScope: l,
                                            supportsToolResultNotices: p,
                                            bridgeConnectionId: t.origin,
                                            onErrorCode: e => {
                                                b = e
                                            }
                                        });
                                        if (g()) return;
                                        m || oe("szmelc_rce.bridge.tool_call", {
                                            ...w,
                                            success: !0
                                        }), En({
                                            ...e,
                                            ...f(b),
                                            type: "tool_result",
                                            tool_use_id: r
                                        })
                                    } catch (v) {
                                        if (g()) return;
                                        m || oe("szmelc_rce.bridge.tool_call", {
                                            ...w,
                                            success: !1,
                                            error: v instanceof Error ? v.message : String(v)
                                        }), En({
                                            type: "tool_result",
                                            tool_use_id: r,
                                            error: {
                                                content: [{
                                                    type: "text",
                                                    text: v instanceof Error ? v.message : String(v)
                                                }]
                                            },
                                            ...f(b ?? "execution_error")
                                        })
                                    }
                                }(e, t)
                            } finally {
                                t.end(), qt--, void 0 !== t.origin && t.senderLeft() ? rt.detachAll("bridge", t.origin) : void 0 !== t.origin && t.socket !== Nt && rt.forgetAttachOrigins(t.origin)
                            }
                            break
                        }
                        case "external_message":
                        case "external_config": {
                            const t = wn(e);
                            try {
                                await async function(e, t) {
                                    if ("session_expired" === await a(ee.LAST_AUTH_FAILURE_REASON)) return;
                                    if ("external_message" === e.type) return void(await async function(e, t) {
                                        const n = e.target_device_id;
                                        if (n && n !== Rt) return;
                                        const r = e.requestId;
                                        if (!r) return;
                                        if (Pn.has(r)) return;
                                        if (Pn.add(r), Pn.size > xn) {
                                            const e = Pn.values().next().value;
                                            void 0 !== e && Pn.delete(e)
                                        }
                                        const i = await vt({
                                            extensionIds: e.extensionIds,
                                            payload: e.payload,
                                            timeoutMs: e.timeoutMs
                                        }, t.stillWanted);
                                        if (!i) return void oe("szmelc_rce.bridge.external_result_dropped", {
                                            reason: t.dropReason()
                                        });
                                        ! function(e) {
                                            const t = bn(e);
                                            oe("szmelc_rce.bridge.external_result_sent", {
                                                socket_state: Nt?.readyState ?? -1,
                                                ok: !0 === e.ok,
                                                delivered: t
                                            }), t || (kn.push({
                                                message: e,
                                                expiresAt: Date.now() + In
                                            }), kn.length > vn && kn.shift())
                                        }({
                                            type: "external_message_result",
                                            requestId: r,
                                            ...i
                                        })
                                    }(e, t));
                                    if (e.target_device_id && e.target_device_id !== Rt) return;
                                    if (t.senderLeft() || t.accountChanged() || t.socket !== Nt) return;
                                    const n = ot();
                                    await Fe({
                                        extensionIds: e.extensionIds,
                                        hooks: e.hooks
                                    }, "bridge", t.origin) && void 0 !== n && n !== t.origin && !t.senderLeft() && t.socket === Nt && ot() === t.origin && rt.detachAll("bridge")
                                }(e, t)
                            } finally {
                                t.end()
                            }
                            break
                        }
                        case "pairing_request":
                            await async function(e) {
                                const t = e.request_id;
                                if (!t) return;
                                if (t === Sn) return;
                                Sn = t;
                                const n = e.client_type || "desktop",
                                    r = await Ft();
                                try {
                                    if ((await chrome.runtime.sendMessage({
                                            type: "show_pairing_prompt",
                                            request_id: t,
                                            client_type: n,
                                            current_name: r
                                        }))?.handled) return
                                } catch {}
                                const i = chrome.runtime.getURL(`pairing.html?request_id=${encodeURIComponent(t)}&client_type=${encodeURIComponent(n)}&current_name=${encodeURIComponent(r||"")}`);
                                chrome.tabs.create({
                                    url: i
                                })
                            }(e);
                            break;
                        case "permission_response":
                            ! function(e) {
                                const t = e.request_id;
                                if (!t) return;
                                const n = Qt.get(t);
                                if (!n) return;
                                const r = fn(e);
                                if (void 0 !== n.origin && void 0 !== r && r !== n.origin) return;
                                Qt.delete(t), n.resolve(!0 === e.allowed)
                            }(e);
                            break;
                        case "error":
                            Ot = !1
                    }
                }(JSON.parse(e.data))
            } catch (t) {}
        }, u.onclose = e => {
            if (St = e.code, oe("szmelc_rce.bridge.disconnected", {
                    code: e.code,
                    reason: e.reason,
                    reconnect_attempt: Dt,
                    sw_uptime_ms: Date.now() - Lt
                }), Nt === u) {
                if (nn(), Ot = !1, Gt = 0, Nt = null, yn(), 1008 === e.code) {
                    if (++Mt >= 2) {
                        let e;
                        $t ? (e = ++Bt >= 2, e && (Bt = 0)) : (e = !0, Bt = 0), oe("szmelc_rce.bridge.access_token_cleared", {
                            reason: "consecutive_1008",
                            reconnect_attempt: Dt,
                            cleared: e
                        }), e && i(ee.ACCESS_TOKEN).catch(() => {}), $t = !0, Mt = 0
                    }
                } else Mt = 0, Bt = 0;
                _n()
            }
        }, u.onerror = e => {
            oe("szmelc_rce.bridge.error", {
                error: String(e)
            }), Nt === u && (Ot = !1, Gt = 0)
        }, !0
    } catch (s) {
        return Ot = !1, Gt = 0, _n(), !1
    }
}

function an(e) {
    // Szmelc-RCE: anonymous bridge mode (config bridgeAnonymous, default on)
    // lets a signed-out device connect to any self-hosted bridge. Org policy
    // (managed posture) always wins over the anonymous fallback.
    if ((globalThis.__SZMELC_CFG || {}).bridgeAnonymous !== !1 && !(e && e.managed)) return !0;
    return !!e && !e.managed && O(e) && !e.identity?.hybrid && (!!e.identity || !!L().localBridge || !!(globalThis.__SZMELC_CFG || {}).localBridge)
}

function on(e, t) {
    const n = K(),
        r = n?.identity?.accountUuid;
    if (!n || !an(n)) {
        // Szmelc-RCE: a signed-out state may keep an anonymous bridge socket.
        // Drop it only when anonymous mode is off, org policy is managed, or a
        // signed-in account no longer matches the peer we connected as.
        return (globalThis.__SZMELC_CFG || {}).bridgeAnonymous === !1 || !!(n && n.managed) || !!(t && r && r !== t)
    }
    return ge(e?.identity, n.identity) || !!t && !!r && r !== t
}

function sn() {
    const e = K();
    e && an(e) && Jt !== e.gen && (Jt = e.gen, rn())
}

function cn(e, t) {
    const n = t.identity?.accountUuid;
    (e && ge(e.identity, t.identity) || n && Tt && n !== Tt) && (un(), dn()), an(t) ? rn() : dn()
}

function dn() {
    Et && (clearTimeout(Et), Et = null), Ct = null, nn(), Dt = 0, Mt = 0, Bt = 0, Ot = !1, yn(), Nt && (Nt.onclose = null, Nt.close(), Nt = null), Tt = void 0
}

function un() {
    pn++, hn++, lt(), rt.detachAll(), kn.length = 0, On.length = 0
}
var ln, pn = 0,
    hn = 0;

function fn(e) {
    const t = e.connection_id;
    return !0 === ln && "string" == typeof t && t.length > 0 ? t : void 0
}
var mn = new Map;

function wn(e) {
    const t = fn(e),
        n = pn,
        r = hn,
        i = {
            dead: !1
        };
    let a = () => {};
    if (void 0 !== t) {
        const e = mn.get(t) ?? new Set;
        e.add(i), mn.set(t, e), a = () => {
            const e = mn.get(t);
            e?.delete(i) && 0 === e.size && mn.delete(t)
        }
    }
    const o = () => r !== hn;
    return {
        origin: t,
        namedBridge: !0 === ln,
        socket: Nt,
        stillWanted: () => !i.dead && n === pn,
        senderLeft: () => i.dead,
        accountChanged: o,
        dropReason: () => o() ? "account" : i.dead ? "peer_left" : "all_results_dropped",
        end: a
    }
}

function gn() {
    return Nt?.readyState === WebSocket.OPEN
}

function yn() {
    for (const [, e] of Qt) e.resolve(!1);
    Qt.clear()
}

function _n() {
    if (Et) return;
    const e = void 0 !== St && 1006 !== St && St < 4e3,
        t = 4003 === St;
    let n;
    if (!navigator.onLine && !L().localBridge && !(globalThis.__SZMELC_CFG || {}).localBridge && !e || t) n = 5e3;
    else {
        Dt++;
        const e = Math.min(2e3 * Math.pow(1.5, Dt - 1), Yt);
        n = Math.min(Math.round(e * (.8 + .4 * Math.random())), Yt)
    }
    Ct = Date.now() + n, Et = setTimeout(() => {
        Et = null, Ct = null, rn()
    }, n)
}

function bn(e) {
    let t = !1;
    return Nt?.readyState === WebSocket.OPEN && (zt.has(e.type), Nt.send(JSON.stringify(e)), t = !0), "tool_result" === e.type && e.tool_use_id && oe("szmelc_rce.bridge.result_sent", {
        tool_use_id: e.tool_use_id,
        socket_state: Nt?.readyState ?? -1,
        buffered_amount: Nt?.bufferedAmount ?? -1,
        is_error: Boolean(e.error)
    }), t
}
var vn = 8,
    In = 3e5,
    kn = [];

function Tn() {
    if (0 === kn.length) return;
    const e = Date.now(),
        t = kn.filter(t => t.expiresAt > e);
    kn = [];
    for (const n of t) bn(n.message)
}
var Sn, An = 8,
    Nn = 12e4,
    On = [];

function En(e) {
    const t = bn(e),
        n = null != e.error || !0 === e.is_error;
    if (!t && !n) {
        const t = String(e.tool_use_id);
        (On = On.filter(e => e.toolUseId !== t)).push({
            toolUseId: t,
            message: e,
            expiresAt: Date.now() + Nn
        }), On.length > An && On.shift()
    }
}

function Cn() {
    if (0 === On.length) return;
    const e = Date.now(),
        t = On.filter(t => t.expiresAt > e);
    On = [];
    for (const n of t) En(n.message)
}
var Dn = !1;
var Pn = new Set,
    xn = 256;
var Un = new Map([
    ["tab_outside_group", "tab_not_found"]
]);
var Rn = "szmelc-local-pairing/v1",
    Ln = new TextEncoder,
    Mn = new TextDecoder("utf-8", {
        fatal: !0
    });

function $n(e) {
    return Ln.encode(e)
}

function Bn(e) {
    return Mn.decode(e)
}

function jn(...e) {
    return Gn(e)
}

function Gn(e) {
    let t = 0;
    for (const i of e) t += i.length;
    const n = new Uint8Array(t);
    let r = 0;
    for (const i of e) n.set(i, r), r += i.length;
    return n
}

function Hn(e) {
    const t = "string" == typeof e ? $n(e) : e,
        n = new Uint8Array(4 + t.length);
    return new DataView(n.buffer).setUint32(0, t.length, !1), n.set(t, 4), n
}

function Fn(e) {
    return "number" == typeof e && Number.isSafeInteger(e) && e >= 0
}

function Wn(e) {
    if (!Fn(e)) throw new RangeError("u64be: not a non-negative safe integer");
    const t = new Uint8Array(8);
    return new DataView(t.buffer).setBigUint64(0, BigInt(e), !1), t
}
var qn = /^[A-Za-z0-9_-]*$/;

function Kn(e) {
    const t = e.length % 4;
    if (!qn.test(e) || 1 === t) throw new SyntaxError("not unpadded base64url");
    if (0 !== t && "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".indexOf(e.charAt(e.length - 1)) & (2 === t ? 15 : 3)) throw new SyntaxError("non-canonical base64url");
    const n = e.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((e.length + 3) % 4),
        r = atob(n),
        i = new Uint8Array(r.length);
    for (let a = 0; a < r.length; a++) i[a] = r.charCodeAt(a);
    return i
}

function Jn(e) {
    let t = "";
    for (let n = 0; n < e.length; n += 32768) t += String.fromCharCode.apply(null, e.subarray(n, n + 32768));
    return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function zn(e) {
    const t = new Uint8Array(e);
    return globalThis.crypto.getRandomValues(t), t
}

function Vn(e) {
    return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
}
async function Yn(e) {
    return new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", Vn(e)))
}
var Qn = class {
        wall;
        mono;
        constructor(e = {}) {
            this.wall = e.now ?? (() => Date.now() / 1e3), this.mono = e.monotonicNow ?? (() => globalThis.performance.now() / 1e3)
        }
        stamp() {
            return {
                wall: this.wall(),
                mono: this.mono()
            }
        }
        since(e) {
            return Math.max(0, this.wall() - e.wall, this.mono() - e.mono)
        }
    },
    Xn = class extends Error {
        code;
        httpStatus;
        peerOrg;
        constructor(e, t, n = {}) {
            super(t ? `${e}: ${t}` : e, {
                cause: n.cause
            }), this.name = "PairingError", this.code = e, this.httpStatus = n.httpStatus, this.peerOrg = n.peerOrg
        }
        wireCode() {
            return "attest_failed" === this.code && void 0 !== this.httpStatus ? `attest_failed:${this.httpStatus}` : this.code
        }
    };

function Zn(e) {
    return new Xn("malformed", e)
}
var er = new Set(["localhost", "127.0.0.1", "[::1]"]);

function tr(e, t = !1) {
    let n;
    try {
        n = new URL(e)
    } catch {
        throw new TypeError(`pairing apiOrigin is not a URL: ${e}`)
    }
    if (!("https:" === n.protocol || t && "http:" === n.protocol && er.has(n.hostname)) || n.username || n.password || "/" !== n.pathname && "" !== n.pathname || n.search || n.hash) throw new TypeError(`pairing apiOrigin must be a bare https origin: ${e}`);
    const r = `${n.origin}/api/oauth/local_pairing`;
    return {
        issuer: r,
        attest: `${r}/attest`,
        jwks: `${r}/jwks.json`
    }
}
async function nr(e) {
    return Jn(await Yn($n(function(e) {
        return `{"crv":"P-256","kty":"EC","x":"${Jn(e.subarray(1,33))}","y":"${Jn(e.subarray(33,65))}"}`
    }(e))))
}
async function rr(e, t) {
    return globalThis.crypto.subtle.importKey("jwk", {
        kty: "EC",
        crv: "P-256",
        x: e,
        y: t,
        ext: !0
    }, {
        name: "ECDSA",
        namedCurve: "P-256"
    }, !1, ["verify"])
}

function ir(e, t, n) {
    let r;
    const i = new Promise((e, i) => {
        r = setTimeout(() => i(n()), 1e3 * t), r.unref?.()
    });
    return Promise.race([e, i]).finally(() => clearTimeout(r))
}

function ar(e, t, n) {
    const r = new RegExp(`(?:^|,)\\s*${t}=(\\d+)`).exec(e ?? "");
    return r ? Number(r[1]) : n
}

function or(e, t) {
    return new Xn("jwks_unavailable", e, {
        cause: t
    })
}
var sr = class {
    opts;
    keys = new Map;
    fetchedAt;
    maxAge = 300;
    staleIfError = 3600;
    flooredAt;
    inflight;
    clock;
    floor;
    timeoutSec;
    url;
    constructor(e) {
        this.opts = e, this.clock = new Qn(e), this.floor = 60, this.timeoutSec = e.timeoutSec ?? 10, this.url = tr(e.apiOrigin, e.allowLoopbackHttp).jwks
    }
    async getKey(e) {
        let t = this.lookup(e);
        if ((!t || this.age() > this.maxAge) && (this.inflight || this.floored() || (t || (this.flooredAt = this.clock.stamp()), this.inflight = this.fetch().finally(() => {
                this.inflight = void 0
            })), await this.inflight, t = this.lookup(e)), t) return t;
        if (0 === this.keys.size) throw or("no verification keys");
        throw new Xn("unknown_kid", e.slice(0, 32))
    }
    lookup(e) {
        return this.servable().get(e)
    }
    servable() {
        return this.age() > this.maxAge + this.staleIfError && (this.keys = new Map), this.keys
    }
    age() {
        return this.fetchedAt ? this.clock.since(this.fetchedAt) : 1 / 0
    }
    floored() {
        return void 0 !== this.flooredAt && this.clock.since(this.flooredAt) < this.floor
    }
    async fetch() {
        try {
            await this.load()
        } catch (e) {
            if (this.flooredAt = this.clock.stamp(), this.servable().size > 0) return;
            throw e instanceof Xn ? e : or("fetch failed", e)
        }
    }
    async load() {
        const e = await ir(this.get(), this.timeoutSec, () => or("timed out"));
        if (200 !== e.status) throw or(`HTTP ${e.status}`);
        let t;
        try {
            t = JSON.parse(e.text)
        } catch {
            throw or("not JSON")
        }
        const n = t?.keys;
        if (!Array.isArray(n)) throw or("no keys array");
        const r = new Map;
        for (const i of n)
            if (!("EC" !== i?.kty || "P-256" !== i.crv || "string" != typeof i.kid || "string" != typeof i.x || "string" != typeof i.y || void 0 !== i.alg && "ES256" !== i.alg || void 0 !== i.use && "sig" !== i.use)) try {
                r.set(i.kid, await rr(i.x, i.y))
            } catch {}
        if (0 === r.size) throw or("no usable EC P-256 keys");
        this.maxAge = Math.max(ar(e.cacheControl, "max-age", 300), this.floor), this.staleIfError = ar(e.cacheControl, "stale-if-error", 3600), this.keys = r, this.fetchedAt = this.clock.stamp()
    }
    async get() {
        const e = await this.opts.fetchImpl(this.url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    "cache-control": "no-cache"
                }
            }),
            t = e.status;
        return {
            status: t,
            cacheControl: e.headers.get("cache-control"),
            text: 200 === t ? await e.text() : ""
        }
    }
};

function cr(e) {
    if (null === e || "boolean" == typeof e || "string" == typeof e) return JSON.stringify(e);
    if ("number" == typeof e) {
        if (!Number.isFinite(e)) throw new TypeError("canonicalJson: non-finite number");
        return JSON.stringify(e)
    }
    if (Array.isArray(e)) return "[" + e.map(e => cr(e)).join(",") + "]";
    if ("object" == typeof e) {
        const t = e;
        return "{" + Object.keys(t).filter(e => void 0 !== t[e]).sort().map(e => JSON.stringify(e) + ":" + cr(t[e])).join(",") + "}"
    }
    throw new TypeError("canonicalJson: unsupported " + typeof e)
}

function dr(e) {
    let t = 0;
    const n = e => {
            throw new SyntaxError(`strict JSON: ${e} at ${t}`)
        },
        r = () => {
            for (; t < e.length && " \t\n\r".includes(e.charAt(t));) t++
        },
        i = () => {
            const r = t;
            for ('"' !== e[t] && n("expected string"), t++; t < e.length && '"' !== e[t];) "\\" === e[t] && t++, t++;
            return t >= e.length && n("unterminated string"), t++, JSON.parse(e.slice(r, t))
        },
        a = () => {
            r();
            const o = e[t];
            if ("{" === o) {
                t++;
                const o = {},
                    s = new Set;
                if (r(), "}" === e[t]) return t++, o;
                for (;;) {
                    r();
                    const c = i();
                    if (s.has(c) && n(`duplicate key ${JSON.stringify(c)}`), s.add(c), r(), ":" !== e[t] && n("expected ':'"), t++, Object.defineProperty(o, c, {
                            value: a(),
                            enumerable: !0,
                            writable: !0,
                            configurable: !0
                        }), r(), "," !== e[t]) {
                        if ("}" === e[t]) return t++, o;
                        n("expected ',' or '}'")
                    } else t++
                }
            }
            if ("[" === o) {
                t++;
                const i = [];
                if (r(), "]" === e[t]) return t++, i;
                for (;;)
                    if (i.push(a()), r(), "," !== e[t]) {
                        if ("]" === e[t]) return t++, i;
                        n("expected ',' or ']'")
                    } else t++
            }
            if ('"' === o) return i();
            const s = /^(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?|true|false|null)/.exec(e.slice(t));
            return s || n("unexpected token"), t += s[0].length, JSON.parse(s[0])
        },
        o = a();
    return r(), t !== e.length && n("trailing data"), o
}

function ur(e) {
    if ("string" != typeof e || 0 === e.length || e.length > 4096) throw Zn("assertion missing or too long");
    const t = e.split("."),
        [n, r, i] = t;
    if (3 !== t.length || void 0 === n || void 0 === r || void 0 === i) throw Zn("assertion is not a compact JWS");
    let a, o, s;
    try {
        a = dr(Bn(Kn(n))), o = dr(Bn(Kn(r))), s = Kn(i)
    } catch (d) {
        throw Zn(`assertion does not decode: ${String(d)}`)
    }
    if (null === a || "object" != typeof a || Array.isArray(a) || null === o || "object" != typeof o || Array.isArray(o)) throw Zn("assertion header/payload are not objects");
    const c = a;
    if ("ES256" !== c.alg) throw new Xn("bad_signature", `alg ${JSON.stringify(c.alg)} is not ES256`);
    if ("crit" in c) throw Zn("crit header is not accepted");
    if ("local-pairing+jwt" !== c.typ) throw new Xn("wrong_issuer_or_audience", `typ ${JSON.stringify(c.typ)}`);
    if ("string" != typeof c.kid || 0 === c.kid.length || c.kid.length > 256) throw Zn("kid missing or too long");
    if (64 !== s.length) throw new Xn("bad_signature", "ES256 signature must be exactly 64 bytes");
    return {
        header: {
            kid: c.kid
        },
        payload: o,
        signingInput: $n(`${n}.${r}`),
        signature: s
    }
}
var lr = ["desktop", "chrome_extension"];

function pr(e, t) {
    const n = e[t];
    if ("string" != typeof n || 0 === n.length) throw Zn(`claim ${t} missing`);
    return n
}

function hr(e, t) {
    const n = e[t];
    if ("number" != typeof n || !Number.isFinite(n)) throw Zn(`claim ${t} missing`);
    return n
}

function fr(e) {
    const t = pr(e, "client_kind");
    if (n = t, !lr.includes(n)) throw new Xn("wrong_peer_kind", t);
    var n;
    const r = e.cnf;
    if (!r || "object" != typeof r || Array.isArray(r) || "string" != typeof r.jkt) throw Zn("cnf.jkt missing");
    return {
        iss: pr(e, "iss"),
        sub: pr(e, "sub"),
        org: pr(e, "org"),
        azp: "string" == typeof e.azp ? e.azp : void 0,
        client_kind: t,
        hybrid: !0 === e.hybrid,
        cnf: {
            jkt: r.jkt
        },
        iat: hr(e, "iat"),
        exp: hr(e, "exp"),
        jti: "string" == typeof e.jti ? e.jti : void 0
    }
}
async function mr(e, t, n) {
    const r = ur(e),
        i = function(e) {
            if ("string" != typeof e || 87 !== e.length) throw Zn("public_key must be 87 base64url chars");
            let t;
            try {
                t = Kn(e)
            } catch {
                throw Zn("public_key is not base64url")
            }
            if (65 !== t.length || 4 !== t[0]) throw Zn("public_key must be an uncompressed P-256 point");
            return t
        }(t),
        a = await n.jwks.getKey(r.header.kid);
    await async function(e, t) {
        if (!(await globalThis.crypto.subtle.verify({
                name: "ECDSA",
                hash: "SHA-256"
            }, t, Vn(e.signature), Vn(e.signingInput)))) throw new Xn("bad_signature")
    }(r, a);
    const o = fr(r.payload),
        s = r.payload.aud,
        c = "szmelc-local-pairing/v1" === s || Array.isArray(s) && s.includes("szmelc-local-pairing/v1");
    if (o.iss !== n.expectedIssuer || !c) throw new Xn("wrong_issuer_or_audience");
    if (o.exp - o.iat > 301) throw new Xn("expired", "assertion lifetime exceeds 301 s");
    if (o.client_kind !== n.expectedKind) throw new Xn("wrong_peer_kind", o.client_kind);
    if (await nr(i) !== o.cnf.jkt) throw new Xn("key_binding_mismatch");
    return {
        claims: o,
        peerRaw: i
    }
}
var wr = class {
    opts;
    current;
    minting;
    lastFailure;
    epoch = 0;
    clock;
    timeoutSec;
    urls;
    constructor(e) {
        this.opts = e, this.clock = new Qn(e), this.timeoutSec = e.timeoutSec ?? 10, this.urls = tr(e.apiOrigin, e.allowLoopbackHttp)
    }
    get issuer() {
        return this.urls.issuer
    }
    serverNow(e) {
        return e.claims.iat + this.clock.since(e.minted)
    }
    async get() {
        const e = this.current;
        if (e && e.claims.exp - 30 > this.serverNow(e)) return e;
        const t = this.lastFailure;
        if (t && this.clock.since(t.at) < t.floor) throw t.error;
        const n = this.minting ??= this.mint().finally(() => {
            this.minting === n && (this.minting = void 0)
        });
        return n
    }
    isCurrent(e) {
        return e.epoch === this.epoch
    }
    clear() {
        this.epoch += 1, this.current = void 0, this.minting = void 0, this.lastFailure = void 0
    }
    async mint() {
        const e = this.epoch;
        try {
            const t = await ir(this.attest(e), this.timeoutSec, () => new Xn("attest_failed", "timed out", {
                httpStatus: 0
            }));
            if (e !== this.epoch) throw new Xn("not_signed_in", "identity changed during attest");
            return this.current = t, this.lastFailure = void 0, t
        } catch (t) {
            const n = t instanceof Xn ? t : new Xn("attest_failed", "unexpected", {
                cause: t
            });
            if (e === this.epoch && "not_signed_in" !== n.code) {
                const e = "rate_limited" === n.code || "pairing_disabled" === n.code;
                this.lastFailure = {
                    error: n,
                    at: this.clock.stamp(),
                    floor: e ? 60 : 5
                }
            }
            throw n
        }
    }
    async attest(e) {
        let t;
        try {
            t = await this.opts.getBearer()
        } catch (c) {
            throw new Xn("not_signed_in", "bearer unavailable", {
                cause: c
            })
        }
        if (!t) throw new Xn("not_signed_in");
        const n = await async function() {
            const e = await globalThis.crypto.subtle.generateKey({
                    name: "ECDH",
                    namedCurve: "P-256"
                }, !1, ["deriveBits"]),
                t = new Uint8Array(await globalThis.crypto.subtle.exportKey("raw", e.publicKey));
            return {
                keyPair: e,
                publicKey: Jn(t),
                jkt: await nr(t)
            }
        }(), r = this.clock.stamp();
        let i, a;
        try {
            i = await this.opts.fetchImpl(this.urls.attest, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${t}`,
                    "content-type": "application/json",
                    accept: "application/json"
                },
                body: JSON.stringify({
                    public_key: n.publicKey
                })
            })
        } catch (c) {
            throw new Xn("attest_failed", "fetch failed", {
                httpStatus: 0,
                cause: c
            })
        }
        if (404 === i.status) throw new Xn("pairing_disabled", "attest is not enabled", {
            httpStatus: 404
        });
        if (429 === i.status) throw new Xn("rate_limited", void 0, {
            httpStatus: 429
        });
        if (200 !== i.status) throw new Xn("attest_failed", `HTTP ${i.status}`, {
            httpStatus: i.status
        });
        try {
            a = JSON.parse(await i.text())
        } catch {
            throw new Xn("attest_failed", "response is not JSON", {
                httpStatus: 200
            })
        }
        const o = a?.assertion;
        if ("string" != typeof o) throw new Xn("attest_failed", "response lacks assertion", {
            httpStatus: 200
        });
        const s = fr(ur(o).payload);
        if (s.cnf.jkt !== n.jkt) throw new Xn("key_binding_mismatch", "server bound a different key");
        return {
            assertion: o,
            claims: s,
            eph: n,
            minted: r,
            epoch: e
        }
    }
};
async function gr(e, t, n, r) {
    return new Uint8Array(await globalThis.crypto.subtle.deriveBits({
        name: "HKDF",
        hash: "SHA-256",
        salt: Vn(t),
        info: Vn($n(`${Rn} ${n}`))
    }, e, 8 * r))
}
async function yr(e, t) {
    const n = await globalThis.crypto.subtle.importKey("raw", Vn(e), {
        name: "HMAC",
        hash: "SHA-256"
    }, !1, ["sign"]);
    return new Uint8Array(await globalThis.crypto.subtle.sign("HMAC", n, Vn(t)))
}
var _r = 33554432,
    br = /\p{Surrogate}/u,
    vr = new Set(["execute_tool", "tool_response", "notification:permission_request", "notification:sealed_broadcast", "notification:inference_request", "notification:inference_response"]);

function Ir(e) {
    return "string" == typeof e && vr.has(e)
}

function kr(e) {
    return void 0 === e || "string" == typeof e && "" !== e && !br.test(e)
}

function Tr(e, t, n, r, i, a, o) {
    const s = Wn(n);
    return {
        name: "AES-GCM",
        iv: Vn(jn(new Uint8Array(4), s)),
        additionalData: Vn(jn(Hn(Rn), Hn(e), Hn(t), s, Hn(r), Hn(i ?? ""), Wn(a), ...o ? [Hn("chunk"), Wn(o.i), Wn(o.n)] : [])),
        tagLength: 128
    }
}

function Sr(e) {
    try {
        const t = Math.floor(e());
        return Fn(t) ? t : NaN
    } catch {
        return NaN
    }
}
async function Ar(e, t) {
    return globalThis.crypto.subtle.importKey("raw", Vn(e), {
        name: "AES-GCM"
    }, !1, [t])
}
var Nr = () => {};

function Or(e) {
    try {
        return {
            ok: !0,
            inner: JSON.parse(Bn(e))
        }
    } catch {
        return {
            ok: !1,
            reason: "malformed"
        }
    }
}
var Er = class e {
        sid;
        dirOut;
        kOut;
        kIn;
        clock;
        sidB64;
        ctrOut = 0;
        ctrIn = -1;
        tagFailures = 0;
        tornDown = !1;
        q = {
            send: Promise.resolve(),
            recv: Promise.resolve()
        };
        partial;
        stats = {
            gaps: 0,
            replays: 0,
            stale: 0,
            badTags: 0
        };
        born;
        constructor(e, t, n, r, i) {
            this.sid = e, this.dirOut = t, this.kOut = n, this.kIn = r, this.clock = i, this.sidB64 = Jn(e), this.born = i.stamp()
        }
        static async create(t, n, r = {}) {
            const [i, a, o] = "desktop" === t ? [n.kD2e, n.kE2d, "d2e"] : [n.kE2d, n.kD2e, "e2d"];
            return new e(n.sid, o, await Ar(i, "encrypt"), await Ar(a, "decrypt"), r.clock ?? new Qn)
        }
        ownSeconds() {
            return Sr(() => this.born.wall + this.clock.since(this.born))
        }
        get dirIn() {
            return "d2e" === this.dirOut ? "e2d" : "d2e"
        }
        get isTornDown() {
            return this.tornDown
        }
        enqueue(e, t) {
            const n = this.q[e].then(t, t);
            return this.q[e] = n.then(Nr, Nr), n
        }
        seal(e, t, n) {
            return this.sealFrames(e, t, n, void 0).then(([e]) => {
                if (void 0 === e) throw new Error("seal: no envelope produced");
                return e
            })
        }
        sealChunked(e, t, n, r) {
            return !Number.isSafeInteger(r) || r < 1 ? Promise.reject(new RangeError("sealChunked: maxChunkBytes must be a positive integer")) : this.sealFrames(e, t, n, r)
        }
        sealFrames(e, t, n, r) {
            if (this.tornDown) return Promise.reject(new Error("sealed channel torn down"));
            if (!Ir(e)) return Promise.reject(new TypeError("seal: unknown frame kind"));
            if (!kr(t)) return Promise.reject(new TypeError("seal: toolUseId must be a non-empty well-formed string"));
            let i;
            try {
                const e = JSON.stringify(n);
                if ("string" != typeof e) throw new TypeError("not JSON-serialisable");
                i = $n(e)
            } catch (u) {
                return Promise.reject(new TypeError("seal: inner is not JSON-serialisable", {
                    cause: u
                }))
            }
            const a = void 0 !== r,
                o = r ?? i.length,
                s = Math.ceil(i.length / o),
                c = Sr(this.clock.wall);
            if (!Fn(c)) return Promise.reject(new Error("seal: clock is not a usable time"));
            const d = this.ctrOut;
            return this.ctrOut = d + s, Number.isSafeInteger(this.ctrOut) ? this.enqueue("send", async () => {
                const n = [];
                for (let r = 0; r < s; r++) {
                    const u = a ? {
                            i: r,
                            n: s
                        } : void 0,
                        l = new Uint8Array(await globalThis.crypto.subtle.encrypt(Tr(this.dirOut, this.sid, d + r, e, t, c, u), this.kOut, Vn(i.subarray(r * o, (r + 1) * o))));
                    if (this.tornDown) throw new Error("sealed channel torn down");
                    n.push({
                        sid: this.sidB64,
                        ctr: d + r,
                        t: c,
                        ct: Jn(l),
                        ...u && {
                            chunk: u
                        }
                    })
                }
                return n
            }) : (this.tornDown = !0, Promise.reject(new Error("sealed channel counter exhausted")))
        }
        open(e, t, n) {
            return this.enqueue("recv", () => this.openNow(e, t, n))
        }
        async openNow(e, t, n) {
            if (this.tornDown) return {
                ok: !1,
                reason: "torn_down"
            };
            const r = n;
            if (!(r && "object" == typeof r && "string" == typeof r.sid && "string" == typeof r.ct && Fn(r.t) && Ir(e) && kr(t) && function(e) {
                    if (void 0 === e) return !0;
                    const t = e;
                    return !!t && "object" == typeof t && Fn(t.n) && t.n >= 1 && Fn(t.i) && t.i < t.n
                }(r.chunk))) return {
                ok: !1,
                reason: "malformed"
            };
            const i = r.t,
                a = r.chunk;
            if (r.sid !== this.sidB64) return {
                ok: !1,
                reason: "foreign_sid"
            };
            const o = r.ctr;
            if (!Fn(o)) return {
                ok: !1,
                reason: "malformed"
            };
            if (o <= this.ctrIn) return this.stats.replays += 1, {
                ok: !1,
                reason: "replay"
            };
            if (!(Math.abs(this.ownSeconds() - i) <= 60)) return this.stats.stale += 1, {
                ok: !1,
                reason: "stale"
            };
            let s, c;
            try {
                s = Kn(r.ct)
            } catch {
                return {
                    ok: !1,
                    reason: "malformed"
                }
            }
            if (s.length < 16) return {
                ok: !1,
                reason: "malformed"
            };
            try {
                c = await globalThis.crypto.subtle.decrypt(Tr(this.dirIn, this.sid, o, e, t, i, a), this.kIn, Vn(s))
            } catch {
                return this.stats.badTags += 1, ++this.tagFailures >= 3 && this.tearDown(), {
                    ok: !1,
                    reason: "bad_tag"
                }
            }
            if (this.tornDown) return {
                ok: !1,
                reason: "torn_down"
            };
            o > this.ctrIn + 1 && (this.stats.gaps += o - this.ctrIn - 1), this.ctrIn = o;
            const d = new Uint8Array(c);
            return a ? this.reassemble(o, a, d) : (this.partial = void 0, Or(d))
        }
        reassemble(e, t, n) {
            let r = this.partial;
            if (this.partial = void 0, 0 === t.i) r = {
                firstCtr: e,
                n: t.n,
                parts: [],
                bytes: 0
            };
            else if (!r || e !== r.firstCtr + r.parts.length) return {
                ok: !1,
                reason: "bad_chunk"
            };
            return r.bytes + n.length > 33554432 ? {
                ok: !1,
                reason: "bad_chunk"
            } : (r.parts.push(n), r.bytes += n.length, r.parts.length < r.n ? (this.partial = r, {
                ok: !1,
                reason: "partial"
            }) : Or(Gn(r.parts)))
        }
        tearDown() {
            this.tornDown = !0, this.partial = void 0
        }
    },
    Cr = {
        offer: "instance_hint",
        accept: "instance"
    };

function Dr(e, t) {
    return e.toLowerCase() === t.toLowerCase()
}

function Pr(e, t, n) {
    if (t.sub !== e.sub) throw new Xn("account_mismatch");
    if (void 0 !== n.requiredOrg && !Dr(e.org, n.requiredOrg)) throw new Xn("org_not_permitted", "own sign-in is not in the configured org");
    const r = t.hybrid && "desktop" === t.client_kind,
        i = !n.allowedOrgs || n.allowedOrgs.some(e => Dr(e, t.org));
    if (r && !i) throw new Xn("org_not_permitted", "the managing Desktop's org is outside the configured list");
    if ((void 0 !== n.requiredOrg || r || n.hybridSignIn) && !Dr(t.org, e.org)) throw new Xn("org_mismatch", void 0, i ? {
        peerOrg: t.org
    } : {})
}

function xr(e, t, n) {
    if ("string" != typeof e) throw Zn(`${t} missing`);
    let r;
    try {
        r = Kn(e)
    } catch {
        throw Zn(`${t} not base64url`)
    }
    if (void 0 !== n && r.length !== n) throw Zn(`${t} must be ${n} bytes`);
    return r
}

function Ur(e, t) {
    const n = e;
    if (!n || "object" != typeof n || n.msg !== t) throw Zn(`pair_${t} malformed`);
    if (1 !== n.v) {
        throw Zn(`unsupported v ${"number"==typeof n.v?String(n.v):typeof n.v}`)
    }
    return n
}

function Rr(e, t) {
    if (void 0 !== e) {
        if (!e || "object" != typeof e || Array.isArray(e) || cr(e).length > 1024) throw Zn(`${t} must be a small object`);
        return e
    }
}
async function Lr(e, t, n, r) {
    const i = await Er.create(e, r.secrets, {
        clock: n
    });
    return function(e, t) {
        if (!e.isCurrent(t)) throw new Xn("not_signed_in", "identity changed during the handshake")
    }(t, r.own), {
        sidB64: i.sidB64,
        channel: i,
        own: r.own.claims,
        peer: r.peer,
        peerInstance: r.peerInstance,
        establishedAt: n.wall()
    }
}
var Mr = class {
    opts;
    pending = new Map;
    clock;
    maxPending;
    instance;
    constructor(e) {
        this.opts = e, this.clock = new Qn(e), this.maxPending = e.maxPending ?? 4, this.instance = function(e, t) {
            if (void 0 !== e) try {
                return Rr(JSON.parse(JSON.stringify(e)), t)
            } catch (n) {
                throw new TypeError(`${t} must be a small JSON object`, {
                    cause: n
                })
            }
        }(e.instance, "instance")
    }
    get pendingCount() {
        return this.expire(), this.pending.size
    }
    async onOffer(e) {
        const {
            hello: t,
            instance: n
        } = function(e, t) {
            const n = Cr[t],
                r = Ur(e, t);
            try {
                cr(r)
            } catch {
                throw Zn(`pair_${t} is not canonical JSON`)
            }
            return xr(r.nonce, "nonce", 32), {
                hello: r,
                instance: Rr(r[n], n)
            }
        }(e, "offer"), {
            source: r,
            jwks: i,
            policy: a
        } = this.opts, {
            claims: o,
            peerRaw: s
        } = await mr(t.assertion, t.public_key, {
            jwks: i,
            expectedIssuer: r.issuer,
            expectedKind: "desktop"
        }), c = await r.get();
        ! function(e, t) {
            if (e.iat > t + 60) throw new Xn("not_yet_valid");
            if (e.exp + 60 <= t) throw new Xn("expired")
        }(o, r.serverNow(c)), Pr(c.claims, o, a);
        const d = await async function(e) {
            try {
                return await globalThis.crypto.subtle.importKey("raw", Vn(e), {
                    name: "ECDH",
                    namedCurve: "P-256"
                }, !1, [])
            } catch {
                throw Zn("public_key is not a point on P-256")
            }
        }(s), u = await async function(e, t) {
            return new Uint8Array(await globalThis.crypto.subtle.deriveBits({
                name: "ECDH",
                public: t
            }, e, 256))
        }(c.eph.keyPair.privateKey, d), l = function(e, t, n) {
            const r = {
                msg: e,
                v: 1,
                assertion: t.assertion,
                public_key: t.eph.publicKey,
                nonce: Jn(zn(32))
            };
            return n && (r[Cr[e]] = n), r
        }("accept", c, this.instance), p = await async function(e, t) {
            const {
                mac: n,
                ...r
            } = t;
            return Yn(jn(Hn(Rn), Hn($n(cr(e))), Hn($n(cr(r)))))
        }(t, l), h = await async function(e, t) {
            const n = await globalThis.crypto.subtle.importKey("raw", Vn(e), "HKDF", !1, ["deriveBits"]),
                [r, i, a, o, s] = await Promise.all([gr(n, t, "confirm d", 32), gr(n, t, "confirm e", 32), gr(n, t, "aead d2e", 32), gr(n, t, "aead e2d", 32), gr(n, t, "sid", 16)]);
            return {
                th: t,
                kcD: r,
                kcE: i,
                kD2e: a,
                kE2d: o,
                sid: s
            }
        }(u, p), f = await (m = h, yr(m.kcE, m.th));
        var m;
        this.expire();
        for (const w of this.pending.keys()) {
            if (this.pending.size < this.maxPending) break;
            this.pending.delete(w)
        }
        return this.pending.set(Jn(h.sid), {
            secrets: h,
            own: c,
            peer: o,
            peerInstance: n,
            createdAt: this.clock.stamp()
        }), {
            ...l,
            mac: Jn(f)
        }
    }
    async onFinish(e) {
        const t = function(e, t) {
            const n = Ur(e, t);
            if ("string" != typeof n.sid) throw Zn(`pair_${t} sid missing`);
            return {
                sid: n.sid,
                mac: xr(n.mac, `pair_${t} mac`)
            }
        }(e, "finish");
        this.expire();
        const n = this.pending.get(t.sid);
        if (!n) throw new Xn("bad_key_confirmation", "no pending pairing for sid on this port");
        var r;
        this.pending.delete(t.sid),
            function(e, t, n) {
                if (! function(e, t) {
                        if (e.length !== t.length) return !1;
                        let n = 0;
                        for (let r = 0; r < e.length; r++) n |= (e[r] ?? 0) ^ (t[r] ?? 0);
                        return 0 === n
                    }(e, t)) throw new Xn("bad_key_confirmation", n)
            }(t.mac, await (r = n.secrets, yr(r.kcD, r.th)));
        const i = await

        function(e) {
            return yr(e.kcE, jn(e.th, $n("done")))
        }(n.secrets), a = await Lr("chrome_extension", this.opts.source, this.clock, n);
        return {
            done: {
                msg: "done",
                v: 1,
                sid: t.sid,
                mac: Jn(i)
            },
            pairing: a
        }
    }
    expire() {
        for (const [e, t] of this.pending) this.clock.since(t.createdAt) > 30 && this.pending.delete(e)
    }
};
var $r = new WeakMap;
var Br, jr = async (e, t) => {
    const n = await fetch(e, {
        method: t?.method ?? "GET",
        headers: t?.headers,
        body: t?.body,
        credentials: "omit",
        redirect: "error",
        referrerPolicy: "no-referrer",
        cache: "no-store"
    });
    return {
        status: n.status,
        headers: n.headers,
        text: () => n.text()
    }
};

function Gr(e) {
    return {
        ...e.allowedOrgs && {
            allowedOrgs: e.allowedOrgs
        },
        ...e.identity?.hybrid && {
            hybridSignIn: !0
        }
    }
}
async function Hr() {
    let e = K() ?? await ye();
    if (!e.identity) {
        let t;
        if (await Promise.race([E().catch(() => {}), new Promise(e => {
                t = setTimeout(e, 1e4)
            })]).finally(() => clearTimeout(t)), await W.reloadIdentity().catch(() => {}), e = K() ?? e, !e.identity) throw new Xn("not_signed_in")
    }
    const t = Gr(e);
    return Br ??= function(e) {
        let t = $r.get(e);
        return t || (t = {
            source: new wr(e),
            jwks: new sr(e)
        }, $r.set(e, t)), t
    }({
        apiOrigin: L().apiBaseUrl,
        fetchImpl: jr,
        getBearer: y
    }), {
        runtime: Br,
        policy: t
    }
}

function Fr() {
    Br?.source.clear()
}

function Wr(e, t) {
    return {
        type: "tool_response",
        ...e && {
            tool_use_id: e
        },
        ...t
    }
}

function qr(e, t) {
    return {
        type: "notification",
        jsonrpc: "2.0",
        method: e,
        params: t ?? {}
    }
}

function Kr(e, t) {
    const n = function(e) {
        return {
            msg: "refuse",
            v: 1,
            code: e instanceof Xn ? e.wireCode() : "malformed"
        }
    }(t);
    return Wr(e, {
        error: {
            local_pairing: n
        }
    })
}

function Jr() {
    b(ee.PAIRING_ORG_MISMATCH).catch(() => {})
}
var zr, Vr = new Qn,
    Yr = Zr(),
    Qr = new Map;

function Xr(e, t) {
    const n = Qr.get(e);
    n && (Qr.delete(e), clearTimeout(n.timer), n.resolve(t))
}

function Zr() {
    return {
        responder: void 0,
        policy: void 0,
        install: void 0,
        closedClients: new Set,
        pairings: new Map,
        offerTimes: [],
        instanceId: Jn(zn(8))
    }
}

function ei() {
    for (const e of [...Yr.pairings.keys()]) di(e);
    Yr = Zr()
}

function ti(e) {
    return e.peer.hybrid
}

function ni(e, t) {
    return e.peer.org.toLowerCase() === t.peer.org.toLowerCase()
}

function ri() {
    for (const {
            pairing: e
        }
        of Yr.pairings.values())
        if (ti(e)) return e
}

function ii() {
    const e = [...Yr.pairings.values()].map(({
            pairing: e
        }) => e),
        t = ri() ?? e.find(e => e.peer.org.toLowerCase() !== e.own.org.toLowerCase()) ?? e.at(-1);
    return t ? function(e) {
        const {
            sub: t,
            org: n,
            hybrid: r
        } = e.peer;
        return {
            sub: t,
            org: n,
            hybrid: r
        }
    }(t) : null
}
var ai = !1;

function oi() {
    return ai ? Promise.resolve(K()) : ie(() => ({
        pairedPeer: ii()
    }))
}

function si(e, t) {
    ai = !0;
    try {
        if (e && ge(e.identity, t.identity)) return Fr(), Jr(), e.identity ? (ei(), {
            pairedPeer: null,
            awaiting: null
        }) : ci(t, {
            pairedPeer: null
        });
        const r = t.identity?.accountUuid;
        if (r && e?.identity?.accountUuid !== r && [...Yr.pairings.values()].some(({
                pairing: e
            }) => e.own.sub !== r)) return Fr(), ei(), Jr(), {
            pairedPeer: null,
            awaiting: null
        };
        if (!e || ! function(e, t) {
                if (!e) return !0;
                const [n, r] = [Gr(e), Gr(t)];
                return n.hybridSignIn !== r.hybridSignIn || !s(n.allowedOrgs, r.allowedOrgs)
            }(e, t)) return ci(t, r && e?.identity?.accountUuid !== r ? {
            pairedPeer: ii()
        } : {});
        Jr();
        const i = Gr(t),
            a = void 0 !== ri();
        for (const [e, {
                pairing: t
            }] of [...Yr.pairings]) try {
            Pr(t.own, t.peer, i)
        } catch (n) {
            di(e)
        }
        return a && !ri() ? {
            pairedPeer: ii(),
            awaiting: null
        } : ci(t, {
            pairedPeer: ii()
        })
    } finally {
        ai = !1
    }
}

function ci(e, t) {
    if (("pairedPeer" in t ? t.pairedPeer : e.pairedPeer)?.hybrid && e.identity) {
        const {
            accountUuid: n,
            orgUuid: r
        } = e.identity;
        return {
            ...t,
            awaiting: {
                accountUuid: n,
                orgUuid: r
            }
        }
    }
    return e.awaiting && null === e.source ? {
        ...t,
        awaiting: null
    } : "pairedPeer" in t ? t : void 0
}

function di(e) {
    const t = Yr.pairings.get(e);
    if (t) {
        t.pairing.channel.tearDown(), Yr.pairings.delete(e);
        for (const [t, n] of Qr) n.sid === e && Xr(t, {
            ok: !1,
            error: "unknown_pairing"
        });
        zr?.(e), oi().catch(() => {})
    }
}

function ui() {
    for (const [e, {
            admittedAt: t
        }] of Yr.pairings) Vr.since(t) > 29100 && di(e)
}

function li(e) {
    const t = e.peerInstance?.pid;
    return "number" == typeof t ? t : void 0
}

function pi(e) {
    if (Yr !== e) throw new Xn("pairing_disabled", "identity or port changed during the handshake")
}
async function hi(e, t, n, r) {
    const i = e?.msg,
        a = Yr;
    try {
        if ("offer" === i) {
            if (Yr.offerTimes = Yr.offerTimes.filter(e => Vr.since(e) < 1), Yr.offerTimes.length >= 2) throw new Xn("rate_limited", "too many pair offers");
            Yr.offerTimes.push(Vr.stamp());
            const r = await async function(e) {
                const t = await Hr(),
                    n = Yr.install ?? await async function() {
                        try {
                            const e = await (chrome.management?.getSelf());
                            return {
                                install_type: e?.installType,
                                may_disable: e?.mayDisable
                            }
                        } catch {
                            return {}
                        }
                    }();
                pi(e), Yr.install = n, Yr.responder && JSON.stringify(Yr.policy) === JSON.stringify(t.policy) || (Yr.policy = t.policy, Yr.responder = new Mr({
                    source: t.runtime.source,
                    jwks: t.runtime.jwks,
                    policy: t.policy,
                    instance: {
                        browser: fi(),
                        extension_version: chrome.runtime.getManifest().version,
                        instance_id: Yr.instanceId,
                        ...n,
                        max_reassembly_bytes: _r,
                        can_relay_external: !0
                    }
                }));
                return Yr.responder
            }(a);
            let i;
            try {
                i = await r.onOffer(e)
            } catch (o) {
                throw function(e) {
                    e instanceof Xn && "org_mismatch" === e.code && e.peerOrg && T(ee.PAIRING_ORG_MISMATCH, {
                        org: e.peerOrg.toLowerCase()
                    }).catch(e => {})
                }(o), o
            }
            return pi(a), void n(Wr(t, {
                result: {
                    local_pairing: i
                }
            }))
        }
        if ("finish" === i) {
            const i = Yr.responder;
            if (!i) throw new Xn("bad_key_confirmation", "no offer on this port");
            const {
                done: s,
                pairing: c
            } = await i.onFinish(e);
            try {
                if (pi(a), void 0 !== r && a.closedClients.has(r)) throw new Xn("pairing_disabled", "the Desktop's socket closed during the handshake");
                const e = K();
                if (!e) throw new Xn("pairing_disabled", "no posture yet");
                Pr(c.own, c.peer, Gr(e));
                const t = e?.identity?.accountUuid;
                if (t && c.own.sub !== t) throw Fr(), new Xn("not_signed_in", "assertion names another account");
                const n = ri();
                if (n && !ni(n, c)) throw new Xn("org_mismatch", "another org while a hybrid Desktop manages the extension")
            } catch (o) {
                throw c.channel.tearDown(), o
            }
            if (function(e, t) {
                    const n = li(e);
                    if (void 0 !== n)
                        for (const [r, i] of Yr.pairings) li(i.pairing) === n && di(r);
                    for (; Yr.pairings.size >= 8;) di(Yr.pairings.keys().next().value);
                    Yr.pairings.set(e.sidB64, {
                        pairing: e,
                        admittedAt: Vr.stamp(),
                        clientId: t
                    })
                }(c, r), ti(c))
                for (const [e, t] of [...Yr.pairings]) ni(c, t.pairing) || di(e);
            try {
                await oi()
            } catch (o) {
                throw di(c.sidB64), new Xn("pairing_disabled", "posture mirror write failed", {
                    cause: o
                })
            }
            return n(Wr(t, {
                result: {
                    local_pairing: s
                }
            })), void Jr()
        }
        throw new Xn("malformed", "unknown pairing message")
    } catch (o) {
        n(Kr(t, o))
    }
}

function fi() {
    return ((navigator.userAgentData?.brands)?.find(e => /Edge|Chrome|Chromium/i.test(e.brand)))?.brand ?? "unknown"
}

function mi(e) {
    return Yr.pairings.get(e.sidB64)?.pairing === e
}
async function wi(e, t, n, r) {
    if (ui(), mi(e)) try {
        const i = await e.channel.seal(t, n, r);
        return mi(e) ? i : void 0
    } catch (i) {
        if (!mi(e)) return;
        return void di(e.sidB64)
    }
}
async function gi(e, t, n, r) {
    const i = await wi(e, "tool_response", t, n);
    i && r(Wr(t, {
        sealed: i
    }))
}
async function yi(e, t) {
    if ("string" != typeof e) return;
    const n = Qr.get(e),
        r = n && Yr.pairings.get(n.sid)?.pairing;
    if (!n || !r) return;
    const i = await r.channel.open("notification:inference_response", e, t);
    if (r.channel.isTornDown && di(r.sidB64), !i.ok) return;
    const a = i.inner;
    a && "inference_response" === a.method && a.params?.request_id === e && Xr(e, function(e) {
        const t = e;
        return t && !0 === t.ok && Array.isArray(t.content) ? {
            ok: !0,
            content: t.content,
            stop_reason: t.stop_reason ?? null
        } : {
            ok: !1,
            error: "string" == typeof t?.error ? t.error : "malformed"
        }
    }(a.params?.result))
}
var _i = null,
    bi = !1,
    vi = !1,
    Ii = !1,
    ki = new Set,
    Ti = null,
    Si = null,
    Ai = new Map,
    Ni = !1;

function Oi() {
    Ni || (Ni = !0, zr = e => {
        for (const [t, n] of Ai) n.sid === e && (Ai.delete(t), n.resolve(!1));
        lt(Ei(e))
    })
}

function Ei(e) {
    return `pairing:${e}`
}

function Ci(e, t) {
    if (!e) return !1;
    try {
        return e.postMessage(t), !0
    } catch (n) {
        return !1
    }
}

function Di(e) {
    Ci(_i, e)
}
async function Pi(e) {
    const t = _i;
    return !(await W.refusesClearText()) && Ci(t, e)
}

function xi(e) {
    return !!e && /native messaging host not found|native messaging host is forbidden/i.test(e)
}

function Ui(e) {
    xi(e) && (vi = !1)
}

function Ri(e) {
    _i === e && (_i = null, Ii = !1, ki.clear(), ei(), kt("native", !1) || mt())
}
var Li = w({
    first: 1e3,
    max: 3e4
}, () => {
    K()?.managed && $i()
});

function Mi() {
    K()?.managed ? _i || bi || Li.arm() : Li.disarm()
}
async function $i() {
    let e = !1;
    try {
        e = await async function() {
            if (_i) return !0;
            if (bi) return !1;
            bi = !0;
            try {
                if (!(await chrome.permissions.contains({
                        permissions: ["nativeMessaging"]
                    }))) return "absent";
                if ("function" != typeof chrome.runtime.connectNative) return "absent";
                Oi();
                // Szmelc-RCE: native messaging host names come from central config
                // (assets/szmelc-config.js, editable in options.html).
                const z = globalThis.__SZMELC_CFG || {};
                const t = [{
                    name: (z.nativeHosts && z.nativeHosts[0]) || "com.szmelc.rce_browser",
                    label: "Desktop"
                }, {
                    name: (z.nativeHosts && z.nativeHosts[1]) || "com.szmelc.rce_code",
                    label: "Agent CLI"
                }];
                let n = !0;
                for (const r of t) try {
                    const e = chrome.runtime.connectNative(r.name),
                        t = await new Promise(t => {
                            let n = !1;
                            const r = () => {
                                    if (n) return;
                                    n = !0;
                                    const e = chrome.runtime.lastError?.message;
                                    t(!!xi(e) && "absent")
                                },
                                i = a => {
                                    n || "pong" === a.type && (n = !0, e.onDisconnect.removeListener(r), e.onMessage.removeListener(i), t(!0))
                                };
                            e.onDisconnect.addListener(r), e.onMessage.addListener(i);
                            try {
                                e.postMessage({
                                    type: "ping"
                                })
                            } catch (a) {
                                return void(n || (n = !0, t(!1)))
                            }
                            setTimeout(() => {
                                n || (n = !0, e.onDisconnect.removeListener(r), e.onMessage.removeListener(i), t(!1))
                            }, 1e4)
                        });
                    if (!0 === t) return _i = e, r.name, vi = !0, ei(), e.onMessage.addListener(e => {
                        ji(e)
                    }), e.onDisconnect.addListener(() => {
                        const t = chrome.runtime.lastError?.message;
                        Ri(e), Ui(t), Mi()
                    }), e.postMessage({
                        type: "get_status"
                    }), !0;
                    n &&= "absent" === t, e.disconnect()
                } catch (e) {
                    n = !1
                }
                return !!n && "absent"
            } catch (e) {
                return e instanceof Error && Ui(e.message), !1
            } finally {
                bi = !1
            }
        }()
    } catch (t) {}
    return "absent" === e && W.forgetHybridPairing(), !0 === e && Li.disarm(), Mi(), !0 === e
}
async function Bi() {
    try {
        await chrome.permissions.remove({
            permissions: ["nativeMessaging"]
        });
        const e = _i;
        return e?.disconnect(), e ? Ri(e) : ei(), Li.disarm(), bi = !1, vi = !1, !0
    } catch (e) {
        return !1
    }
}
async function ji(e) {
    switch (e.type) {
        case "tool_request":
            await async function(e) {
                const t = "string" == typeof e.params?.tool_use_id ? e.params.tool_use_id : void 0,
                    {
                        method: n,
                        params: r
                    } = e;
                if ("execute_tool" === n && void 0 !== r?.local_pairing) return void(await hi(r.local_pairing, t, Di, "number" == typeof e.client_id ? e.client_id : void 0));
                if ("execute_tool" === n && void 0 !== r?.sealed) return void(await async function(e, t) {
                    const n = await async function(e, t, n) {
                        const r = () => {
                            n(Kr(e, new Xn("unknown_pairing")))
                        };
                        ui();
                        const i = t?.sid,
                            a = "string" == typeof i ? Yr.pairings.get(i)?.pairing : void 0;
                        if (!a) return r();
                        const o = await a.channel.open("execute_tool", e, t);
                        if (a.channel.isTornDown && di(a.sidB64), !mi(a)) return r();
                        if (!o.ok) return void o.reason;
                        const s = o.inner;
                        if (!s || "object" != typeof s || Array.isArray(s)) return;
                        const c = s.params;
                        return void 0 === c?.tool_use_id || c.tool_use_id === e ? {
                            pairing: a,
                            inner: s
                        } : void 0
                    }(e, t, Di);
                    if (!n) return;
                    const {
                        pairing: r,
                        inner: i
                    } = n, a = i.params ?? {};
                    if ("permission_response" === i.method) return void

                    function(e, t, n) {
                        if (!e) return;
                        const r = Ai.get(e);
                        if (!r || r.sid !== n) return;
                        Ai.delete(e), r.resolve(!0 === t)
                    }(a?.request_id, a?.allowed, r.sidB64);
                    if ("external_config" === i.method || "external_message" === i.method) return void(await async function(e, t, n, r) {
                        let i;
                        if ("external_config" === n) i = {
                            ok: await Fe({
                                extensionIds: r?.extension_ids,
                                hooks: r?.hooks
                            }, Ei(e.sidB64))
                        };
                        else {
                            const t = await vt({
                                extensionIds: r?.extension_ids,
                                payload: r?.payload,
                                timeoutMs: r?.timeout_ms
                            }, () => mi(e));
                            if (!t) return;
                            i = t
                        }
                        await gi(e, t, {
                            result: i
                        }, Di)
                    }(r, e, i.method, i.params));
                    const o = ti(r) ? e => async function(e, t, n) {
                        if (!0 !== e.peerInstance?.can_relay_inference) return {
                            ok: !1,
                            error: "peer_not_capable"
                        };
                        const r = crypto.randomUUID(),
                            i = await wi(e, "notification:inference_request", r, {
                                method: "inference_request",
                                params: {
                                    request_id: r,
                                    body: t
                                }
                            });
                        return i ? new Promise(t => {
                            const a = setTimeout(() => Xr(r, {
                                ok: !1,
                                error: "timeout"
                            }), 6e4);
                            Qr.set(r, {
                                sid: e.sidB64,
                                resolve: t,
                                timer: a
                            }), n(qr("inference_request", {
                                request_id: r,
                                sealed: i
                            }))
                        }) : {
                            ok: !1,
                            error: "unknown_pairing"
                        }
                    }(r, e, Di): void 0, s = "execute_tool" === i.method ? await Gi(a, e, (t, n) => function(e, t, n, r) {
                        const i = crypto.randomUUID();
                        return new Promise(a => {
                            const o = setTimeout(() => {
                                    Ai.delete(i) && a(!1)
                                }, Hi),
                                s = e => {
                                    clearTimeout(o), a(e)
                                };
                            Ai.set(i, {
                                resolve: s,
                                sid: e.sidB64
                            }), async function(e, t, n, r) {
                                const i = await wi(e, "notification:permission_request", t, {
                                    method: "permission_request",
                                    params: {
                                        ...n,
                                        tool_use_id: t
                                    }
                                });
                                return !!i && (r(qr("permission_request", {
                                    tool_use_id: t,
                                    sealed: i
                                })), !0)
                            }(e, t, {
                                request_id: i,
                                tool_type: n.tool,
                                url: n.url,
                                action_data: n.actionData,
                                ...r && {
                                    category: r
                                }
                            }, Di).then(e => {
                                e || (Ai.delete(i), s(!1))
                            })
                        })
                    }(r, e, t, n), o) : He(`Unknown method: ${String(i.method)}`), c = Fi(s) ?? (s.is_error ? {
                        error: {
                            content: "Tool returned no content"
                        }
                    } : {
                        result: {
                            content: ""
                        }
                    });
                    await gi(r, e, c, Di)
                }(t, r.sealed));
                if ("inference_response" === n && void 0 !== r?.sealed) return void(await yi(r.request_id, r.sealed));
                if (await W.refusesClearText()) return void("execute_tool" === n && Di(Wr(t, Ki([{
                    type: "text",
                    text: "Rejected: pairing with Agent Desktop is required"
                }]))));
                try {
                    if ("get_bridge_identity" === n) return void(await Pi(Wr(t, {
                        result: {
                            bridge_device_id: await Zt(),
                            echo: r?.echo
                        }
                    })));
                    if ("execute_tool" === n) return await W.noteUnprovenCaller(), void(await Wi(await Gi(r, t), t));
                    "permission_response" !== n && await Wi({
                        content: `Unknown method: ${n}`
                    }, t)
                } catch (i) {
                    await Wi(He(`Tool execution failed: ${i instanceof Error?i.message:"Unknown error"}`), t)
                }
            }(e);
            break;
        case "status_response":
            ! function(e) {
                Wt(e.computer_name), Ti && (clearTimeout(Si), Si = null, Ti({
                    nativeHostInstalled: vi,
                    mcpConnected: Ii
                }), Ti = null)
            }(e);
            break;
        case "mcp_connected":
            !async function(e) {
                "number" == typeof e.client_id && ki.add(e.client_id);
                Ii = !0, kt("native", !0), await Ke.initialize(), Ke.startTabGroupChangeListener()
            }(e);
            break;
        case "mcp_disconnected":
            ! function(e) {
                const t = "number" == typeof e.client_id ? e.client_id : void 0;
                if (function(e) {
                        const t = void 0 !== e && [...Yr.pairings.values()].some(({
                            pairing: t,
                            clientId: n
                        }) => n === e && ti(t));
                        ai = !0;
                        try {
                            if (void 0 === e) ei();
                            else {
                                Yr.closedClients.add(e);
                                for (const [t, n] of [...Yr.pairings]) n.clientId === e && di(t)
                            }
                        } finally {
                            ai = !1
                        }
                        ie(() => ({
                            pairedPeer: ii(),
                            ...t && {
                                awaiting: null
                            }
                        })).catch(() => {})
                    }(t), void 0 !== t && (ki.delete(t), ki.size > 0)) return;
                Ii = !1, kt("native", !1) || Ke.stopTabGroupChangeListener();
                rt.detachAll("native-messaging")
            }(e)
    }
}
async function Gi(e, t, n, r) {
    if (!e?.tool) return He("No tool specified");
    const i = e => "number" == typeof e ? e : "string" == typeof e && parseInt(e, 10) || void 0,
        a = i(it.has(e.tool) ? void 0 : e.args?.tabId ?? ("browser_batch" === e.tool && Array.isArray(e.args?.actions) ? e.args.actions.find(e => "number" == typeof e?.input?.tabId && !("string" == typeof e?.name && it.has(e.name)))?.input?.tabId : void 0)),
        o = i(e.args?.tabGroupId),
        s = e.session_scope;
    try {
        return await Ze({
            toolName: e.tool,
            args: e.args || {},
            tabId: a,
            tabGroupId: o,
            clientId: e.client_id,
            source: "native-messaging",
            sessionScope: s,
            relayInference: r,
            ...n && {
                hostDirected: !0,
                toolUseId: t,
                permissionMode: e.permission_mode,
                allowedDomains: Array.isArray(e.allowed_domains) ? e.allowed_domains.filter(e => "string" == typeof e) : void 0,
                handlePermissionPrompts: !0 === e.handle_permission_prompts,
                requestPermissionFromHost: n
            }
        })
    } catch (c) {
        return He(`Tool execution failed: ${c instanceof Error?c.message:"Unknown error"}`)
    }
}
var Hi = 12e4;

function Fi({
    content: e,
    is_error: t
}) {
    if (e && ("string" == typeof e || Array.isArray(e))) return t ? Ki(e) : {
        result: {
            content: e
        }
    }
}
async function Wi(e, t) {
    const n = Fi(e);
    n && await Pi(Wr(t, n))
}
async function qi(e, t) {
    return !!_i && (ui(), Yr.pairings.size > 0 ? (async function(e, t, n) {
        const r = {
            method: e,
            params: t ?? {}
        };
        for (const {
                pairing: i
            }
            of [...Yr.pairings.values()]) {
            const e = await wi(i, "notification:sealed_broadcast", void 0, r);
            e && n(qr("sealed_broadcast", {
                sealed: e
            }))
        }
    }(e, t, Di), !0) : Pi(qr(e, t)))
}

function Ki(e) {
    let t;
    const n = pt;
    return t = "string" == typeof e ? e.includes("Permission denied by user") ? `${e} - ${n}` : e : e.map(e => "object" == typeof e && null !== e && "text" in e && "string" == typeof e.text && e.text.includes("Permission denied by user") ? {
        ...e,
        text: `${e.text} - ${n}`
    } : e), {
        error: {
            content: t
        }
    }
}

function Ji(e) {
    return zi(e) && "logged_out" === e.stop
}

function zi(e) {
    return "object" == typeof e && null !== e && !0 === e.terminal
}
var Vi;
async function Yi() {
    const [e, t, n, r] = await Promise.all([W.readPolicyOrRetry(), W.readIdentityOrRetry(), W.readAwaitingOrRetry(), W.readTelemetryOrRetry()]);
    return {
        policy: e,
        pairedPeer: null,
        identity: t ?? null,
        awaiting: n ?? null,
        ...r
    }
}

function Qi(e, t) {
    if ("resuming" === t.source) return "resuming" !== e?.source && E().then(async ({
        isValid: e
    }) => {
        !e && await async function() {
            return zi(await a(ee.STARTUP_REAUTH_STATE).catch(() => {}))
        }() && W.forgetHybridPairing()
    }), void(Vi ??= setTimeout(() => {
        Vi = void 0, W.forgetHybridPairing()
    }, 15e3));
    clearTimeout(Vi), Vi = void 0
}
async function Xi() {
    try {
        if (await a(ee.SCHEDULES_MOVED_NOTICE_SHOWN)) return;
        await chrome.notifications.create("schedules_moved_to_desktop", {
            type: "basic",
            iconUrl: "/icon-128.png",
            title: "Szmelc-RCE scheduled tasks stopped",
            message: "Your account can't run scheduled tasks in Szmelc-RCE. Click to see them and set them up in Agent Desktop.",
            priority: 2
        }), await T(ee.SCHEDULES_MOVED_NOTICE_SHOWN, !0)
    } catch (e) {}
}

function Zi(e) {
    const t = "string" == typeof e.command ? e.command : void 0,
        n = wt(t || gt(e.prompt) || "shortcut");
    return {
        name: n,
        description: gt(e.prompt, 160) || n,
        instructions: "string" == typeof e.prompt ? e.prompt : "",
        isScheduled: se(e)
    }
}
var ea = !1,
    ta = 0;

function na() {
    ta += 1
}

function ra() {
    return ta
}
async function ia() {
    const [e, t, n] = await Promise.all([h(le), a(ee.DEV_SKILL_MIGRATION_MODE), P()]);
    return n || null !== G(t) ? Q(e, t) : null
}
async function aa() {
    if (!(await a(ee.SKILL_MIGRATION_DONE))) return "inactive";
    const e = await ia();
    return null === e ? "unknown" : "live" === e ? "active" : "inactive"
}
async function oa() {
    try {
        const e = await we.fetch(ne),
            t = e?.organization?.uuid;
        return t ? {
            organizationUuid: t,
            accountUuid: e?.account?.uuid
        } : null
    } catch {
        return null
    }
}

function sa(e, t, n, r) {
    return {
        skillName: t.name,
        skillId: t.id,
        displayName: t.name,
        repeatType: e.repeatType ?? "none",
        specificTime: e.specificTime,
        specificDate: e.specificDate,
        dayOfWeek: e.dayOfWeek,
        dayOfMonth: e.dayOfMonth,
        monthAndDay: e.monthAndDay,
        url: e.url,
        model: e.model,
        skipPermissions: e.skipPermissions,
        cachedInstructions: n,
        approvedInstructions: n.trim(),
        cachedAt: Date.now(),
        sourceSavedPromptId: r
    }
}
async function ca(e, t, n, r, i, a) {
    try {
        const o = "string" == typeof t.prompt ? t.prompt : "",
            s = await re(e, n);
        if (!s || !1 === s.enabled) return !1;
        const c = ae.bodyOf(await z(e, s.id));
        return !(!c || c !== o.trim() || i()) && ((await ae.getAll()).some(e => e.sourceSavedPromptId === r) || a || await ae.create(sa(t, s, o, r)), !0)
    } catch (o) {
        return !1
    }
}
var da = {
    signIn: "Agent: sign in needed",
    switchOrg: "Agent: sign in to an approved organization"
};
var ua = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
var la = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function pa(e) {
    return "string" == typeof e && la.test(e)
}
async function ha(e, t) {
    if (! function(e) {
            return "string" == typeof e && ua.test(e)
        }(e)) return;
    if (await g(), !0 !== ue("cic_chat_tab_link", !1)) return;
    const n = pa(t) && void 0 !== await f(t),
        r = n ? t : `chat:${e}`;
    return {
        byKey: n,
        readTabs: async () => {
            const e = await f(r);
            if (void 0 === e) return;
            const t = await chrome.tabs.query({
                groupId: e.tabGroupId
            });
            return {
                tabs: t,
                agentTabId: (t.find(t => t.id === e.lastTabId) ?? t[0])?.id
            }
        },
        mayActOn: async e => !0 === await ((await f(r))?.mayActOn?.(e))
    }
}
var fa;
async function ma(e, t = "") {
    const n = `${e} ${t}`;
    (fa?.asker !== n || Date.now() - fa.at > 6e4) && (fa = {
        asker: n,
        uuid: c(e).catch(() => {}),
        at: Date.now()
    });
    const r = await fa.uuid;
    return void 0 !== r && r === await a(ee.ACCOUNT_UUID)
}
async function wa(e, t, n) {
    const r = await ha(t, await async function(e, t) {
            return pa(t) && void 0 !== e.origin && 0 === e.frameId && !1 === e.tab?.incognito && await ma(e.origin, e.documentId)
        }(e, n) ? n : void 0),
        i = (await (r?.readTabs()))?.agentTabId;
    return {
        tabId: i,
        byKey: void 0 !== i && !0 === r?.byKey
    }
}
var ga = 0;

function ya(e) {
    try {
        return new URL(e ?? "").host || void 0
    } catch {
        return
    }
}
async function _a(e, t) {
    const n = await chrome.tabs.get(t),
        r = n.url;
    if (void 0 === r || !Ge(n) || Date.now() < ga) return;
    const i = ya(r);
    if (void 0 !== i) {
        for (const t of new Set([r, n.pendingUrl ?? r])) {
            if (!(await e.mayActOn(t))) return;
            const n = await et.getCategory(t);
            if ("category_unknown_error" === n && (ga = Date.now() + 1e4), qe(n)) return
        }
        return {
            windowId: n.windowId,
            host: i,
            url: r.split("#", 1)[0],
            title: void 0 !== n.title && null === Le(n.title, r) ? n.title : void 0
        }
    }
}
var ba = new Map;

function va(e) {
    return e.flatMap(({
        id: e,
        groupId: t,
        url: n,
        pendingUrl: r
    }) => {
        const i = void 0 === e ? void 0 : ba.get(e);
        return void 0 !== e && void 0 !== i && i.groupId === t && ya(n) === i.host && ya(r ?? n) === i.host ? [{
            tab_id: e,
            host: i.host
        }] : []
    })
}
var Ia = !1,
    ka = 0,
    Ta = 0;
async function Sa(e, t, n, r) {
    if (await g(), !0 !== ue("cic_page_watch", !1)) return {
        status: {
            reason: "REASON_FEATURE_DISABLED"
        }
    };
    if (!0 !== e.tab?.active || 0 !== e.frameId || !(await chrome.windows.get(e.tab.windowId)).focused) return {
        status: {
            reason: "REASON_VIEWER_NOT_IN_FRONT"
        }
    };
    if (void 0 === e.origin || e.tab.incognito || !(await ma(e.origin, e.documentId))) return {
        status: {
            reason: "REASON_ACCOUNT"
        }
    };
    const i = await ha(t, n),
        a = await (i?.readTabs());
    if (void 0 === i || void 0 === a?.agentTabId) return {
        status: {
            reason: "REASON_NO_TAB"
        },
        open_tabs: a && []
    };
    if (Ia || Date.now() - ka < 250) return {
        status: {
            reason: "REASON_BUSY"
        }
    };
    Ia = !0;
    try {
        const e = await async function(e, t, n) {
            const r = await _a(e, t);
            if (void 0 === r) return {
                status: {
                    reason: "REASON_SITE"
                }
            };
            if ("minimized" === (await chrome.windows.get(r.windowId)).state && Date.now() < Ta || Pe.isJsDialogOpen(t)) return {
                status: {
                    reason: "REASON_CANNOT_DRAW"
                }
            };
            if ("hidden_for_screenshot" === Ke.getTabIndicatorState(t)) return {
                status: {
                    reason: "REASON_BUSY"
                }
            };
            const i = await Pe.captureForViewer(t).catch(e => {
                throw "cdp_timeout" === tt(e) && (Ta = Date.now() + 1e4), e
            });
            if (i?.url !== r.url || (await _a(e, t))?.host !== r.host) return {
                status: {
                    reason: "REASON_SITE"
                }
            };
            const a = "number" == typeof n && n >= 1 && n < 1280 ? Math.round(n) : 1280,
                o = await ct(i.jpeg, a),
                s = ze.getContext(t);
            return {
                frame: {
                    jpeg: o,
                    host: r.host,
                    tab_id: t,
                    title: r.title,
                    coordinate_frame: s && {
                        width: s.screenshotWidth,
                        height: s.screenshotHeight
                    }
                }
            }
        }(i, a.agentTabId, r).catch(() => ({
            status: {
                reason: "REASON_IDLE"
            }
        }));
        if ("frame" in e) {
            const {
                tab_id: t,
                host: n
            } = e.frame, r = a.tabs.find(e => e.id === t)?.groupId;
            ba.set(t, {
                host: n,
                groupId: r
            })
        }
        return {
            ...e,
            open_tabs: va(a.tabs)
        }
    } finally {
        Ia = !1, ka = Date.now()
    }
}

function Aa(e) {
    return void 0 === e.tab && e.id === chrome.runtime.id
}
var Na, Oa = 0;
async function Ea({
    waitForRefresh: e = !0
} = {}) {
    if (await M("chrome_ext_cowork_iframe")) return !0;
    if (await P()) return !1;
    const t = Date.now() - (Na?.startedAt ?? 0),
        n = Na?.fetching ? Math.max(3e4, Ca()) : Ca();
    return (!Na || t < 0 || t >= n) && (Na?.fetching && (Oa += 1), Na = function() {
        const e = A();
        let t;
        const n = {
            startedAt: Date.now(),
            fetching: !0,
            loaded: Promise.race([e.then(() => !0), new Promise(e => {
                t = setTimeout(() => e(!1), 5e3)
            })]).catch(() => !1)
        };
        return e.then(() => {
            Na === n && (Oa = 0)
        }, () => {
            Na === n && (Oa += 1)
        }).finally(() => {
            n.fetching = !1, clearTimeout(t)
        }), n
    }()), !(!e || !(await Na.loaded)) && M($e)
}

function Ca() {
    return Math.min(1500 * 2 ** Math.max(Oa - 1, 0), 3e5)
}
async function Da(e, t) {
    if (!Aa(t)) return {
        ok: !1,
        error: "sender is not an extension page"
    };
    if (!(await Ea())) return {
        ok: !1,
        error: "cowork iframe transport is disabled (chrome_ext_cowork_iframe)"
    };
    if (!0 !== await a(ee.BROWSER_CONTROL_PERMISSION_ACCEPTED)) return {
        ok: !1,
        error: "browser-control consent has not been accepted"
    };
    if ("CIC_IFRAME_BRIDGE_INIT" === e.type || "CIC_IFRAME_TOOL_CALL" === e.type) {
        const t = e.iframeAccountUuid;
        if ("string" == typeof t) {
            const e = await m();
            if ("string" == typeof e && e !== t) return {
                ok: !1,
                error: "tool relay refused"
            }
        }
    }
    return "CIC_IFRAME_BRIDGE_INIT" === e.type ? async function(e) {
        if (!Number.isInteger(e.panelTabId) || "string" != typeof e.sessionId) return {
            ok: !1,
            error: "malformed CIC_IFRAME_BRIDGE_INIT"
        };
        try {
            const {
                chromeGroupId: t
            } = await Ke.createIsolatedGroup(e.panelTabId);
            return D({
                sessionId: e.sessionId
            }, t), {
                ok: !0,
                tabGroupId: t
            }
        } catch (t) {
            return {
                ok: !1,
                error: "anchor tab-group initialization failed"
            }
        }
    }(e): "CIC_IFRAME_TOOL_CALL" === e.type ? async function(e) {
        if ("string" != typeof e.toolName || "string" != typeof e.sessionId || "string" != typeof e.toolUseId || void 0 !== e.panelTabId && !Number.isInteger(e.panelTabId) || void 0 !== e.tabGroupId && !Number.isInteger(e.tabGroupId) || void 0 !== e.displayName && "string" != typeof e.displayName || "object" != typeof e.args || null === e.args || Array.isArray(e.args) || ! function(e) {
                if (void 0 === e) return !0;
                if ("object" != typeof e || null === e || Array.isArray(e)) return !1;
                const t = e;
                return xa(t.allowedDomains) && xa(t.onceApprovedHosts) && xa(t.deniedDomains) && (void 0 === t.permissionMode || "skip_all_permission_checks" === t.permissionMode)
            }(e.permissionOverrides) || void 0 !== e.supportsToolResultNotices && "boolean" != typeof e.supportsToolResultNotices) return {
            ok: !1,
            error: "malformed CIC_IFRAME_TOOL_CALL"
        };
        if (!Ae.has(e.toolName)) return {
            ok: !0,
            result: He(`Tool "${e.toolName}" is not available on the sidepanel iframe transport.`)
        };
        const t = function(e, t) {
            const n = {};
            for (const [r, i] of Object.entries(t)) Pa.has(r) || (n[r] = i);
            if ("browser_batch" === e && Array.isArray(n.actions)) {
                const e = [];
                for (const t of n.actions) {
                    if ("object" != typeof t || null === t) {
                        e.push(t);
                        continue
                    }
                    const {
                        name: n,
                        input: r
                    } = t;
                    if ("string" != typeof n || "browser_batch" === n || !Ae.has(n)) return null;
                    const i = {};
                    if ("object" == typeof r && null !== r)
                        for (const [e, t] of Object.entries(r)) Pa.has(e) || (i[e] = t);
                    e.push({
                        ...t,
                        name: n,
                        input: i
                    })
                }
                n.actions = e
            }
            return n
        }(e.toolName, e.args);
        if (null === t) return {
            ok: !0,
            result: He("A browser_batch sub-action names a tool not available on the sidepanel iframe transport.")
        };
        if (void 0 === e.panelTabId) return {
            ok: !0,
            result: He("No tab available. Please open a new tab or window in Chrome.")
        };
        if (void 0 === e.tabGroupId) return {
            ok: !1,
            error: "anchor tab group not established (tabGroupId missing)"
        };
        try {
            const n = await Ze({
                toolName: e.toolName,
                args: t,
                tabId: e.panelTabId,
                tabGroupId: e.tabGroupId,
                sessionScope: {
                    sessionId: e.sessionId,
                    tabGroupId: e.tabGroupId,
                    displayName: e.displayName
                },
                clientId: "agent-code",
                source: "sidepanel-iframe",
                toolUseId: e.toolUseId,
                permissionMode: e.permissionOverrides?.permissionMode,
                allowedDomains: e.permissionOverrides?.allowedDomains ? [...e.permissionOverrides.allowedDomains] : void 0,
                onceApprovedHosts: e.permissionOverrides?.onceApprovedHosts ? [...e.permissionOverrides.onceApprovedHosts] : void 0,
                deniedDomains: e.permissionOverrides?.deniedDomains ? [...e.permissionOverrides.deniedDomains] : void 0,
                supportsToolResultNotices: !0 === e.supportsToolResultNotices
            });
            return n?.is_error ? {
                ok: !0,
                result: He(Qe(e.toolName))
            } : {
                ok: !0,
                result: n ?? He("no result")
            }
        } catch (n) {
            return {
                ok: !0,
                result: He(Qe(e.toolName))
            }
        }
    }(e): "CIC_IFRAME_AGENT_STATE" === e.type ? (!1 === e.running && Number.isInteger(e.panelTabId) && ut(e.panelTabId), {
        ok: !0
    }) : {
        ok: !1,
        error: "unknown type"
    }
}
var Pa = new Set(["checkUrls", "includePermissionState"]);

function xa(e) {
    return void 0 === e || Array.isArray(e) && e.every(e => "string" == typeof e)
}
async function Ua(e, t) {
    try {
        const n = new URL(e);
        if ("szmelc.com" !== n.host) return !1;
        if ("/chrome/permissions" === n.pathname.toLowerCase()) return await async function(e) {
            try {
                const e = chrome.runtime.getURL("options.html#permissions");
                await chrome.tabs.create({
                    url: e
                })
            } catch (t) {} finally {
                await Ma(e)
            }
        }(t), !0;
        if (!n.pathname.startsWith("/chrome/")) return !1;
        const r = n.pathname.substring(8).toLowerCase();
        if ("reconnect" === r) return await async function(e) {
            try {
                await Bi(), dn(), await Re(500);
                const [e, t] = await Promise.all([$i(), rn()]);
                oe("szmelc_rce.extension_url.reconnect", {
                    native_host_success: e,
                    bridge_initiated: t
                })
            } catch (t) {
                oe("szmelc_rce.extension_url.reconnect", {
                    success: !1
                })
            } finally {
                await Ma(e)
            }
        }(t), !0;
        if (r.startsWith("tab/")) return await La(parseInt(r.substring(4), 10), t), !0;
        if (r.startsWith("chat/")) {
            const e = await async function(e, t) {
                return (await ((await ha(e, t))?.readTabs()))?.agentTabId
            }(r.substring(5), void 0);
            return oe("szmelc_rce.extension_url.chat_tab", {
                found: void 0 !== e
            }), void 0 === e ? await Ma(t) : await La(e, t), !0
        }
        return !1
    } catch {
        return oe("szmelc_rce.extension_url.unknown_exception", {}), !1
    }
}
async function Ra(e, t) {
    if (void 0 === e) return oe("szmelc_rce.extension_url.tab_switch", {
        success: !1,
        error: "nothing_to_show",
        via: t
    }), !1;
    await Ke.initialize();
    const n = await Ke.findGroupByTab(e);
    if (!n || n.isUnmanaged) return oe("szmelc_rce.extension_url.tab_switch", {
        success: !1,
        error: "tab_not_managed",
        via: t
    }), !1;
    const r = await chrome.tabs.get(e);
    return void 0 !== r.windowId && await chrome.windows.update(r.windowId, {
        focused: !0
    }), await chrome.tabs.update(e, {
        active: !0
    }), oe("szmelc_rce.extension_url.tab_switch", {
        success: !0,
        via: t
    }), !0
}
async function La(e, t) {
    if (isNaN(e)) return oe("szmelc_rce.extension_url.tab_switch", {
        success: !1,
        error: "invalid_tab_id",
        via: "link"
    }), await Ma(t), !0;
    try {
        return await Ra(e, "link"), await Ma(t), !0
    } catch (n) {
        return oe("szmelc_rce.extension_url.tab_switch", {
            success: !1,
            via: "link"
        }), await Ma(t), !0
    }
}
async function Ma(e) {
    try {
        await chrome.tabs.remove(e)
    } catch (t) {}
}
async function $a() {
    return await a(ee.PERMISSION_CONSENT_BY_ACCOUNT) ?? {}
}

function Ba(e = {}) {
    return Object.fromEntries(k.filter(t => t in e).map(t => [t, e[t]]))
}
async function ja(e) {
    const [t, n] = await Promise.all([$a(), X(k)]);
    return t[e] = n, await T(ee.PERMISSION_CONSENT_BY_ACCOUNT, t), t
}
var Ga = Promise.resolve();

function Ha(e) {
    return Ga = Ga.then(e).catch(e => {})
}

function Fa(e) {
    return Ha(() => async function(e) {
        const t = await a(ee.PERMISSION_CONSENT_OWNER);
        if (void 0 !== e && t === e) return;
        let n = {};
        try {
            n = t ? await ja(t) : await $a()
        } catch (i) {}(t || void 0 === e) && await b([...k, ee.PERMISSION_CONSENT_OWNER]);
        if (void 0 === e) return;
        const r = n[e];
        if (r && !(await a(ee.ACCESS_TOKEN))) return;
        await l({
            ...Ba(r),
            [ee.PERMISSION_CONSENT_OWNER]: e
        })
    }(e))
}
async function Wa() {
    const e = L(),
        t = `szmelc-rce/${chrome.runtime.getManifest().version} (external)`,
        n = chrome.runtime.getManifest().version,
        r = `${t} ${navigator.userAgent} `,
        i = [{
            id: 1,
            priority: 1,
            action: {
                type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
                requestHeaders: [{
                    header: "User-Agent",
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    value: r
                }, {
                    header: "szmelc-inc-client-platform",
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    value: "agent_browser_extension"
                }, {
                    header: "szmelc-inc-client-version",
                    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                    value: n
                }]
            },
            condition: {
                urlFilter: `${e.apiBaseUrl}/*`,
                resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST, chrome.declarativeNetRequest.ResourceType.OTHER]
            }
        }];
    await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: [1],
        addRules: i
    })
}
async function qa() {
    try {
        const [e, t] = await Promise.all([aa(), he.getAllPrompts()]);
        return await ae.reconcileAlarms(e, t, Ja)
    } catch (e) {
        return ae.isCutoverApplied().catch(() => !1)
    }
}
async function Ka() {
    await Ja(), await qa()
}
async function Ja() {
    try {
        const t = await Se();
        await Oe(t).catch(() => {});
        const n = await he.getAllPrompts(),
            r = new Set(await ae.getRetiredSources()),
            i = n.filter(e => e.repeatType && "none" !== e.repeatType && !r.has(e.id));
        if (0 === i.length) return;
        if (!t) return void(await Xi());
        let a = 0,
            o = 0;
        for (const s of i) try {
            await he.updateAlarmForPrompt(s), a++
        } catch (e) {
            o++
        }
        try {
            await he.updateNextRunTimes()
        } catch (e) {}
    } catch (e) {}
}
v(), o(), "ServiceWorkerGlobalScope" in globalThis && (Dn || (Dn = !0, chrome.alarms.create(Vt, {
        periodInMinutes: .5
    }), chrome.alarms.onAlarm.addListener(e => {
        e.name === Vt && function() {
            if (Nt?.readyState === WebSocket.CONNECTING && Gt > 0 && Date.now() - Gt > 3e4) {
                const e = Date.now() - Gt;
                return oe("szmelc_rce.bridge.connect_timeout", {
                    stuck_ms: e,
                    sw_uptime_ms: Date.now() - Lt,
                    online: navigator.onLine
                }), Ot = !1, Gt = 0, St = 4003, Nt.onclose = null, Nt.close(4003, "connect-timeout"), Nt = null, yn(), void _n()
            }
            if ((null === Ct || Date.now() >= Ct) && rn(), Nt?.readyState === WebSocket.OPEN) {
                if (jt > 0 && Date.now() - jt > 9e4) return oe("szmelc_rce.bridge.stale_socket_reconnect", {
                    ms_since_pong: Date.now() - jt,
                    sw_uptime_ms: Date.now() - Lt
                }), void Nt.close(4001, "pong-timeout");
                Nt.send(JSON.stringify({
                    type: "ping"
                }))
            }
            Date.now() - Ut >= 18e5 && (Ut = Date.now(), E().then(({
                isRefreshed: e
            }) => {}))
        }()
    }), globalThis.addEventListener("online", () => {
        const e = Nt?.readyState === WebSocket.OPEN && jt > 0 && Date.now() - jt <= 9e4,
            t = Nt?.readyState === WebSocket.CONNECTING && Gt > 0 && Date.now() - Gt <= 3e4;
        oe("szmelc_rce.bridge.network_online", {
            had_socket: null !== Nt,
            socket_state: Nt?.readyState ?? -1,
            socket_healthy: e || t,
            reconnect_attempts: Dt,
            reconnect_at_ms_from_now: null !== Ct ? Ct - Date.now() : null,
            sw_uptime_ms: Date.now() - Lt
        }), e || t || (Et && (clearTimeout(Et), Et = null), Ct = null, Nt && Nt.readyState !== WebSocket.CLOSED ? Nt.close(4002, "network-online") : rn())
    }), globalThis.addEventListener("offline", () => {
        oe("szmelc_rce.bridge.network_offline", {
            socket_state: Nt?.readyState ?? -1,
            sw_uptime_ms: Date.now() - Lt
        })
    }), chrome.runtime.onMessage.addListener((e, t, n) => {
        if ("pairing_confirmed" === e.type) {
            const {
                request_id: t,
                name: r
            } = e;
            !async function(e) {
                e === (await Ht()).default ? await chrome.storage.local.remove("bridgeDisplayName") : await chrome.storage.local.set({
                    bridgeDisplayName: e
                })
            }(r), en().then(e => {
                bn({
                    type: "pairing_response",
                    request_id: t,
                    device_id: e,
                    name: r
                })
            }), n({
                ok: !0
            })
        }
        return "pairing_dismissed" === e.type && (bn({
            type: "pairing_response",
            request_id: e.request_id,
            dismissed: !0
        }), n({
            ok: !0
        })), !1
    }))),
    function() {
        _e(si), d(Qi), d(cn), d(B), d(Mi);
        const e = V(Yi);
        return W.registerChangeListener(), e
    }().catch(e => {}),
    function() {
        if (!("ServiceWorkerGlobalScope" in globalThis)) return;
        let e, t;
        const n = () => {
            void 0 !== e && void 0 !== t && async function(e) {
                try {
                    e ? await Promise.all([chrome.action.setBadgeBackgroundColor({
                        color: "#F59E0B"
                    }), chrome.action.setBadgeTextColor({
                        color: "#000000"
                    }), chrome.action.setBadgeText({
                        text: "!"
                    }), chrome.action.setTitle({
                        title: da[e]
                    })]) : await Promise.all([chrome.action.setBadgeText({
                        text: ""
                    }), chrome.action.setTitle({
                        title: chrome.runtime.getManifest().action?.default_title ?? ""
                    })])
                } catch (t) {}
            }(e ? "signIn" : t ? "switchOrg" : null)
        };
        chrome.storage.onChanged.addListener((t, r) => {
            "session" === r && ee.STARTUP_REAUTH_STATE in t && (e = Ji(t[ee.STARTUP_REAUTH_STATE].newValue), n())
        }), d((e, r) => {
            t = u(r), n()
        }), a(ee.STARTUP_REAUTH_STATE).then(t => {
            e ??= Ji(t), n()
        }).catch(t => {
            e ??= !1, n()
        })
    }(), Be(), Ve(), chrome.runtime.onConnect.addListener(function(e) {
        if ("cic-panel" !== e.name) return;
        const t = e.sender;
        if (!t || !Aa(t)) {
            try {
                e.disconnect()
            } catch {}
            return
        }
        const n = at(e);
        Ea({
            waitForRefresh: !1
        }).catch(() => !1).then(e => {
            e || n()
        })
    }), chrome.runtime.onConnect.addListener(ve), Ie().catch(e => {}), Jr(), ye().then(e => {
        e.managed && !Ii && T(ee.MCP_CONNECTED, !1)
    }), $i(), async function() {
        if (ea) return;
        ea = !0;
        const e = await ia();
        if (null === e || "off" === e) return;
        if (await a(ee.SKILL_MIGRATION_DONE)) return;
        const t = await he.getAllPrompts();
        "dry_run" !== e ? await async function(e) {
            const t = ta,
                n = () => ta !== t;
            if (e.length > 50) return void oe("szmelc_rce.skill_migration.skipped_too_many", {
                total: e.length,
                cap: 50
            });
            const r = await oa();
            if (!r || n()) return void oe("szmelc_rce.skill_migration.deferred_no_org", {
                total: e.length
            });
            const i = new Set(await ae.getRetiredSources());
            let a = 0,
                o = 0;
            const s = [],
                c = [],
                d = [],
                u = [],
                l = (e, t) => {
                    s.push(e), se(t) && u.push(e)
                },
                p = new Set,
                h = e => {
                    let t = e;
                    for (let n = 2; p.has(t); n++) t = `${e}-${n}`;
                    return p.add(t), t
                };
            for (let g = 0; g < e.length && !n(); g++) {
                const t = e[g],
                    s = t && "object" == typeof t && "string" == typeof t.id ? t.id : `index_${g}`;
                let u, p, f = !1;
                try {
                    const e = Zi(t);
                    p = h(e.name), f = !0;
                    const o = await ce({
                        organizationUuid: r.organizationUuid,
                        name: p,
                        description: e.description,
                        instructions: e.instructions
                    });
                    if (u = o.skillId, n()) break;
                    e.isScheduled && !i.has(s) && await ae.create(sa(t, {
                        name: o.name || p,
                        id: o.skillId
                    }, e.instructions, s)), a++
                } catch (w) {
                    if (w instanceof H) {
                        if (p && se(t) && await ca(r.organizationUuid, t, w.skillName ?? p, s, n, i.has(s))) {
                            a++;
                            continue
                        }
                        o++, se(t) && d.push(s);
                        continue
                    }
                    if (w instanceof me) {
                        l(s, t);
                        for (let t = g + 1; t < e.length; t++) {
                            const n = e[t];
                            l(n && "object" == typeof n && "string" == typeof n.id ? n.id : `index_${t}`, n)
                        }
                        break
                    }
                    if (w instanceof F) {
                        l(s, t);
                        continue
                    }
                    if (w instanceof te) {
                        [429, 408, 401, 403].includes(w.status) || w.status >= 500 ? c.push(s) : l(s, t);
                        continue
                    }
                    u ? l(s, t) : f ? c.push(s) : l(s, t)
                }
            }
            const f = {
                total: e.length,
                created: a,
                skipped: o,
                failed: s.length
            };
            if (n()) return void oe("szmelc_rce.skill_migration.aborted_auth_change", f);
            const m = 0 === c.length;
            m && await T(ee.SKILL_MIGRATION_DONE, {
                at: Date.now(),
                accountUuid: r.accountUuid,
                counts: f,
                scheduledSkipped: d,
                scheduledFailed: u
            });
            oe("szmelc_rce.skill_migration.completed", {
                ...f,
                deferred: c.length,
                stamped: m
            })
        }(t): function(e) {
            const t = e.filter(e => !!e && "object" == typeof e),
                n = t.map(Zi),
                r = n.map(e => e.name),
                i = t.reduce((e, t) => e + ("string" == typeof t.prompt ? t.prompt.length : 0), 0);
            oe("szmelc_rce.skill_migration.dry_run", {
                total: e.length,
                malformed: e.length - t.length,
                scheduled: n.filter(e => e.isScheduled).length,
                name_collisions: r.length - new Set(r).size,
                avg_prompt_len: t.length ? Math.round(i / t.length) : 0,
                has_url: t.filter(e => !!e.url).length,
                has_command: t.filter(e => !!e.command).length
            })
        }(t)
    }().catch(e => {}).then(() => qa()), U(() => {
        qa()
    }), chrome.storage.onChanged.addListener((e, t) => {
        "local" === t && ee.TOKEN_SCOPE in e && xe(Ka)
    }), U(() => {
        xe(Ka)
    }), U(() => {
        p()
    });
var za = new Map;
S(), chrome.storage.onChanged.addListener((e, t) => {
    const n = e[ee.ACCOUNT_UUID]?.newValue;
    "local" === t && "string" == typeof n && a(ee.ACCESS_TOKEN).then(e => {
        e && Fa(n)
    })
}), a(ee.ACCOUNT_UUID).then(e => {
    e && Fa(e)
}), chrome.runtime.onInstalled.addListener(async e => {
    chrome.storage.local.remove(["updateAvailable"]), chrome.alarms.clear("conway-keepalive"), chrome.storage.local.remove(["conwayHostUrl", "conwayMode", "conwayLastConnection", "conwayOrgUuid", "conwayHostId", "conwayHostIdEviction"]), chrome.storage.local.remove(["preferCoworkExperience"]), q(), await Ke.initialize(), await Wa(), e.reason === chrome.runtime.OnInstalledReason.INSTALL && x(), $i(), await Ka()
}), De(), ke(), chrome.runtime.onStartup.addListener(async () => {
    q(), await Wa(), await Ke.initialize(), await (globalThis.SZMELC?.ready || Promise.resolve()), rn(), $i(), await Ka()
}), chrome.permissions.onAdded.addListener(e => {
    e.permissions?.includes("nativeMessaging") && $i()
}), chrome.permissions.onRemoved.addListener(e => {
    e.permissions?.includes("nativeMessaging") && Bi()
}), chrome.action.onClicked.addListener(async function(e) {
    const t = e.id;
    if (!t) return;
    await Ya(t)
}), chrome.notifications.onClicked.addListener(async e => {
    if (chrome.notifications.clear(e), "schedules_moved_to_desktop" === e) return void(await chrome.tabs.create({
        url: chrome.runtime.getURL("options.html#prompts")
    }));
    const t = e.split("_");
    let n = null;
    if (t.length >= 2 && "unknown" !== t[1] && (n = parseInt(t[1], 10)), n && !isNaN(n)) try {
        const e = await chrome.tabs.get(n);
        if (e && e.windowId) return await chrome.windows.update(e.windowId, {
            focused: !0
        }), void(await chrome.tabs.update(n, {
            active: !0
        }))
    } catch {}
    const [r] = await chrome.tabs.query({
        active: !0,
        currentWindow: !0
    });
    r?.id && r.windowId && await chrome.windows.update(r.windowId, {
        focused: !0
    })
}), chrome.commands.onCommand.addListener(e => {
    "toggle-side-panel" === e && chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, e => {
        const t = e[0];
        t && async function(e) {
            const t = e.id;
            if (!t) return;
            if (!chrome.sidePanel) return Ya(t);
            const n = chrome.runtime.getContexts({
                contextTypes: [chrome.runtime.ContextType.SIDE_PANEL]
            });
            chrome.sidePanel.setOptions({
                tabId: t,
                path: `sidepanel.html?tabId=${encodeURIComponent(t)}`,
                enabled: !0
            });
            const r = chrome.sidePanel.open({
                tabId: t
            }).catch(e => {});
            if ((await n).some(e => !!e.documentUrl && new URL(e.documentUrl).searchParams.get("tabId") === String(t))) return void chrome.runtime.sendMessage({
                type: "close_side_panel",
                tabId: t
            }).catch(console.error);
            await r, await Qa(t)
        }(t)
    })
});
var Va = !1;
async function Ya(e) {
    if (!chrome.sidePanel) return oe("szmelc_rce.sidepanel.unsupported_browser", {
        user_agent: navigator.userAgent
    }), void(Va || (Va = !0, chrome.notifications.create({
        type: "basic",
        iconUrl: "/icon-128.png",
        title: "Browser not supported",
        message: "Agent requires the Chrome Side Panel API, which isn't available in this browser. Use Google Chrome, Microsoft Edge, or Brave."
    })));
    chrome.sidePanel.setOptions({
        tabId: e,
        path: `sidepanel.html?tabId=${encodeURIComponent(e)}`,
        enabled: !0
    }), chrome.sidePanel.open({
        tabId: e
    }), await Qa(e)
}

function Qa(e) {
    return Ke.runExclusive(() => async function(e) {
        await Ke.initialize(!0);
        const t = await Ke.findGroupByTab(e);
        if (t) {
            if (t.isUnmanaged) {
                try {
                    await Ke.adoptOrphanedGroup(e, t.chromeGroupId)
                } catch (n) {}
                return
            }
            return
        }
        try {
            await Ke.createGroup(e)
        } catch (n) {}
        $i()
    }(e))
}
chrome.runtime.onUpdateAvailable.addListener(e => {
    T(ee.UPDATE_AVAILABLE, !0), oe("szmelc_rce.extension.update_available", {
        current_version: chrome.runtime.getManifest().version,
        new_version: e.version
    })
});
var Xa = new Set(["SW_KEEPALIVE", "check_and_refresh_oauth", "PLAY_NOTIFICATION_SOUND", "open_side_panel", "relay_last_active_org", "logout", de, "check_native_host_status", "SEND_MCP_NOTIFICATION", "OPEN_OPTIONS_WITH_TASK", "EXECUTE_SCHEDULED_TASK", "RUN_SKILL_SCHEDULE_NOW", "STOP_AGENT", "STOP_AGENT_DROPPED", "SWITCH_TO_MAIN_TAB", "SECONDARY_TAB_CHECK_MAIN", "MAIN_TAB_ACK_RESPONSE", "STATIC_INDICATOR_HEARTBEAT", "DISMISS_STATIC_INDICATOR_FOR_GROUP", ...Ue]);
async function Za(e, t) {
    try {
        await chrome.notifications.create({
            type: "basic",
            iconUrl: "/icon-128.png",
            title: e,
            message: t,
            priority: 2
        })
    } catch (n) {}
}
// Szmelc-RCE: options page saved a new config — reload the extension worker
// so every module re-reads globalThis.__SZMELC_CFG from storage.
chrome.runtime.onMessage.addListener((e, t, n) => {
    if (e && e.type === "SZMELC_CONFIG_APPLIED") {
        try {
            n({ success: true })
        } catch (_) {}
        setTimeout(() => chrome.runtime.reload(), 150)
        return false
    }
    return false
})
chrome.runtime.onMessage.addListener((e, t, n) => !!Xa.has(e.type) && ((async () => {
    if ("SW_KEEPALIVE" !== e.type)
        if ("check_and_refresh_oauth" !== e.type)
            if ("PLAY_NOTIFICATION_SOUND" !== e.type) {
                if ("open_side_panel" === e.type) {
                    const r = e.tabId || t.tab?.id;
                    if (!r) return void n({
                        success: !1
                    });
                    await Ya(r);
                    const i = yt(e.onboardingTaskId);
                    if (i) {
                        const e = async (t = 0) => {
                            try {
                                await Re(0 === t ? 800 : 500), await new Promise((e, t) => {
                                    chrome.runtime.sendMessage({
                                        type: "POPULATE_INPUT_TEXT",
                                        prompt: i
                                    }, n => {
                                        const r = chrome.runtime.lastError?.message;
                                        r || !n?.success ? t(new Error(r ?? "side panel not ready")) : e()
                                    })
                                })
                            } catch (n) {
                                t < 5 && await e(t + 1)
                            }
                        };
                        await e()
                    }
                    return void n({
                        success: !0
                    })
                }
                if ("relay_last_active_org" === e.type) return "string" == typeof e.value && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e.value) && await T(ee.LAST_ACTIVE_ORG_HINT, e.value), void n({
                    success: !0
                });
                if ("logout" === e.type) try {
                    fe(), na(), await ie({
                        identity: null
                    }).catch(() => {});
                    try {
                        await Ha(async () => {
                            const e = await a(ee.PERMISSION_CONSENT_OWNER);
                            e && await ja(e)
                        })
                    } catch (o) {}
                    await C(), await Ke.clearAllGroups(), un(), n({
                        success: !0
                    })
                } catch (o) {
                    n({
                        success: !1,
                        error: String(o)
                    }), W.reloadIdentity().catch(() => {})
                } else if ("get_posture" === e.type) {
                    if (t.id !== chrome.runtime.id || !t.url?.startsWith(chrome.runtime.getURL(""))) return void n(void 0);
                    n(await N())
                } else if ("check_native_host_status" === e.type) {
                    const e = await async function() {
                        return _i && vi ? (Si && clearTimeout(Si), new Promise(e => {
                            Ti = e, _i.postMessage({
                                type: "get_status"
                            }), Si = setTimeout(() => {
                                Ti = null, e({
                                    nativeHostInstalled: vi,
                                    mcpConnected: Ii
                                })
                            }, 1e4)
                        })) : {
                            nativeHostInstalled: vi,
                            mcpConnected: Ii
                        }
                    }();
                    n({
                        status: {
                            nativeHostInstalled: e.nativeHostInstalled,
                            mcpConnected: e.mcpConnected || gn()
                        }
                    })
                } else if ("SEND_MCP_NOTIFICATION" === e.type) {
                    const t = await qi(e.method, e.params),
                        a = (r = e.method, i = e.params, !!gn() && (bn({
                            type: "notification",
                            method: r,
                            params: i || {}
                        }), !0));
                    n({
                        success: t || a
                    })
                } else if (Ue.includes(e.type)) n(await Da(e, t));
                else if ("OPEN_OPTIONS_WITH_TASK" === e.type) {
                    if (t.id !== chrome.runtime.id || !t.url?.startsWith(chrome.runtime.getURL(""))) return void n({
                        success: !1,
                        error: "Forbidden sender"
                    });
                    try {
                        await T(ee.PENDING_SCHEDULED_TASK, e.task);
                        const t = await ae.isCutoverApplied() ? "scheduled" : "prompts",
                            r = chrome.runtime.getURL("options.html"),
                            i = (await chrome.tabs.query({})).find(e => e.url?.startsWith(r));
                        i && i.id ? (await chrome.tabs.update(i.id, {
                            url: chrome.runtime.getURL(`options.html#${t}`),
                            active: !0
                        }), i.windowId && await chrome.windows.update(i.windowId, {
                            focused: !0
                        })) : await chrome.tabs.create({
                            url: chrome.runtime.getURL(`options.html#${t}`)
                        }), n({
                            success: !0
                        })
                    } catch (o) {
                        n({
                            success: !1,
                            error: o.message
                        })
                    }
                } else if ("EXECUTE_SCHEDULED_TASK" === e.type) {
                    if (t.tab) return void n({
                        success: !1,
                        error: "Forbidden sender"
                    });
                    try {
                        const {
                            task: t,
                            runLogId: r
                        } = e;
                        await no(t, r), oe("szmelc_rce.scheduled_task.executed", J(t.id, e.isManual ? "manual" : "automatic")), n({
                            success: !0
                        })
                    } catch (o) {
                        oe("szmelc_rce.scheduled_task.executed", Y(e.task.id, e.isManual ? "manual" : "automatic", o)), n({
                            success: !1,
                            error: o.message
                        })
                    }
                } else if ("RUN_SKILL_SCHEDULE_NOW" === e.type) {
                    const r = chrome.runtime.getURL("");
                    if (t.id !== chrome.runtime.id || !t.url?.startsWith(r)) return void n({
                        success: !1,
                        error: "Forbidden sender"
                    });
                    const i = "string" == typeof e.scheduleId ? e.scheduleId : "";
                    if (!ae.isScheduleAlarm(i)) return void n({
                        success: !1,
                        error: "Invalid schedule id"
                    });
                    const a = await to(i, {
                        manual: !0
                    });
                    n(a ? {
                        success: !1,
                        error: a
                    } : {
                        success: !0
                    })
                } else if ("STOP_AGENT" === e.type) {
                    if ("number" == typeof e.targetTabId) {
                        const n = t.tab?.id;
                        let r = void 0 === n;
                        r || void 0 === n || (r = n === e.targetTabId || await Ke.getMainTabId(n) === e.targetTabId), r && nt(e.targetTabId)
                    }
                    n({
                        success: !0
                    })
                } else if ("STOP_AGENT_DROPPED" === e.type) oe("szmelc_rce.stop_pill.dropped", {
                    target_tab_id: e.targetTabId
                }), n({
                    success: !0
                });
                else if ("SWITCH_TO_MAIN_TAB" === e.type)
                    if (t.tab?.id) try {
                        await Ke.initialize(!0);
                        const e = await Ke.getMainTabId(t.tab.id);
                        if (e) {
                            await chrome.tabs.update(e, {
                                active: !0
                            });
                            const t = await chrome.tabs.get(e);
                            t.windowId && await chrome.windows.update(t.windowId, {
                                focused: !0
                            }), n({
                                success: !0
                            })
                        } else n({
                            success: !1,
                            error: "No main tab found"
                        })
                    } catch (o) {
                        n({
                            success: !1,
                            error: o.message
                        })
                    } else n({
                        success: !1,
                        error: "No sender tab"
                    });
                    else "SECONDARY_TAB_CHECK_MAIN" === e.type ? chrome.runtime.sendMessage({
                        type: "MAIN_TAB_ACK_REQUEST",
                        secondaryTabId: e.secondaryTabId,
                        mainTabId: e.mainTabId,
                        timestamp: e.timestamp
                    }, e => {
                        n(e?.success ? {
                            success: !0
                        } : {
                            success: !1
                        })
                    }) : "MAIN_TAB_ACK_RESPONSE" === e.type ? n({
                        success: e.success
                    }) : "STATIC_INDICATOR_HEARTBEAT" === e.type ? (async () => {
                        const e = t.tab?.id;
                        if (e) try {
                            const t = (await chrome.tabs.get(e)).groupId;
                            if (void 0 === t || t === chrome.tabGroups.TAB_GROUP_ID_NONE) return void n({
                                success: !1
                            });
                            if (await Ke.findGroupByTab(e)) return void n({
                                success: !0
                            });
                            const r = await chrome.tabs.query({
                                    groupId: t
                                }),
                                i = async t => {
                                    if (t >= r.length) return void n({
                                        success: !1
                                    });
                                    const a = r[t];
                                    if (a.id === e || !a.id) return void(await i(t + 1));
                                    const o = a.id,
                                        s = Date.now(),
                                        c = za.get(o);
                                    if (c && s - c.timestamp < 3e3) return c.isAlive ? void n({
                                        success: !0
                                    }) : void(await i(t + 1));
                                    chrome.runtime.sendMessage({
                                        type: "MAIN_TAB_ACK_REQUEST",
                                        secondaryTabId: e,
                                        mainTabId: o,
                                        timestamp: s
                                    }, async e => {
                                        const r = e?.success ?? !1;
                                        za.set(o, {
                                            timestamp: s,
                                            isAlive: r
                                        }), r ? n({
                                            success: !0
                                        }) : await i(t + 1)
                                    })
                                };
                            await i(0)
                        } catch (o) {
                            n({
                                success: !1
                            })
                        } else n({
                            success: !1
                        })
                    })() : "DISMISS_STATIC_INDICATOR_FOR_GROUP" === e.type && (async () => {
                        const e = t.tab?.id;
                        if (e) try {
                            const t = (await chrome.tabs.get(e)).groupId;
                            if (void 0 === t || t === chrome.tabGroups.TAB_GROUP_ID_NONE) return void n({
                                success: !1
                            });
                            await Ke.initialize(), await Ke.dismissStaticIndicatorsForGroup(t), n({
                                success: !0
                            })
                        } catch (o) {
                            n({
                                success: !1
                            })
                        } else n({
                            success: !1
                        })
                    })();
                var r, i
            } else try {
                await Ie(), await chrome.runtime.sendMessage({
                    type: "OFFSCREEN_PLAY_SOUND",
                    audioUrl: e.audioUrl,
                    volume: e.volume || .5
                }), n({
                    success: !0
                })
            } catch (o) {
                n({
                    success: !1,
                    error: o.message
                })
            } else n(await E());
    else n()
})().catch(e => {
    n({
        success: !1,
        error: String(e)
    })
}), !0)), chrome.tabs.onRemoved.addListener(async e => {
    st(e).catch(console.error), rt.notifyTabDetach(e), await Ke.handleTabClosed(e)
}), chrome.webNavigation.onBeforeNavigate.addListener(async e => {
    0 === e.frameId && await Ua(e.url, e.tabId)
});
var eo = 5;
async function to(e, {
    manual: t
}) {
    const n = ra(),
        r = () => ra() !== n;
    try {
        if (!(await qa())) return "cutover_inactive";
        let n = await ae.getById(e);
        if (!n) return t || await chrome.alarms.clear(e), "not_found";
        if (!t && !ae.isArmable(n)) return await chrome.alarms.clear(e), "not_armable";
        const [o, s] = await Promise.all([a(ee.SKILL_MIGRATION_DONE), m()]);
        if (o?.accountUuid && o.accountUuid !== s) {
            if (!s) {
                const r = n.ownerRetries ?? 0;
                return !t && "daily" !== n.repeatType && "weekly" !== n.repeatType && r < eo && !!(await y()) && (await ae.update(e, {
                    ownerRetries: r + 1
                }), await chrome.alarms.create(e, {
                    delayInMinutes: 1
                })), "unknown_account"
            }
            return await ae.update(e, {
                paused: !0
            }), await chrome.alarms.clear(e), "other_account"
        }
        n.ownerRetries && await ae.update(e, {
            ownerRetries: void 0
        });
        const c = await oa();
        if (r()) return "unknown_account";
        if (c) {
            const t = await ae.refreshInstructionsCache(c.organizationUuid, e);
            if (!t) return "not_found";
            n = t
        }
        if (n.disabledReason) return t || await Za("Scheduled task skipped", `"${n.displayName}" didn't run because its skill was deleted or turned off on szmelc.com. Turn it back on there, then use Run now in Szmelc-RCE settings → Scheduled (or remove it).`), "skill_unavailable";
        const d = (n.cachedInstructions ?? "").trim();
        if (!d) return "no_instructions";
        if (r()) return "unknown_account";
        const u = ae.needsReview(n);
        u && !t && await Za("Scheduled task needs review", `"${n.displayName}" changed on szmelc.com since you approved it, so it's running with permission prompts. Open Szmelc-RCE settings → Scheduled to review it.`);
        const l = `${Date.now()}_${Math.random().toString(36).substring(2,11)}`;
        let p = null;
        try {
            await no({
                id: n.id,
                name: n.displayName,
                prompt: d,
                url: n.url,
                skipPermissions: !u && !1 !== n.skipPermissions,
                model: n.model
            }, l), await ae.update(e, {
                lastRun: Date.now()
            }), oe("szmelc_rce.scheduled_task.executed", J(n.id, t ? "manual" : "automatic"))
        } catch (i) {
            p = "run_failed", oe("szmelc_rce.scheduled_task.executed", Y(n.id, t ? "manual" : "automatic", i)), t || await Za("Scheduled task failed", `Task "${n.displayName}" failed to execute. ${i instanceof Error?i.message:String(i)}`)
        }
        if (!t && ("monthly" === n.repeatType || "annually" === n.repeatType)) {
            const t = await ae.getById(e);
            t && await ae.updateAlarmForSchedule(t)
        }
        return p
    } catch (o) {
        return "run_failed"
    }
}
async function no(e, t) {
    await We();
    const n = await chrome.windows.create({
        url: e.url || "about:blank",
        type: "normal",
        focused: !0
    });
    if (!n || !n.id || !n.tabs || 0 === n.tabs.length) throw new Error("Failed to create window for scheduled task");
    const r = n.tabs[0];
    if (!r.id) throw new Error("Failed to get tab in new window for scheduled task");
    await Ke.initialize(!0);
    await Ke.createGroup(r.id);
    await Je({
        tabId: r.id,
        prompt: e.prompt,
        taskName: e.name,
        skipPermissions: e.skipPermissions,
        model: e.model,
        runLogId: t,
        isScheduledTask: !0
    })
}
chrome.alarms.onAlarm.addListener(async e => {
    if (!ae.isScheduleAlarm(e.name) && !e.name.startsWith("prompt_") || await Se()) {
        if (ae.isScheduleAlarm(e.name)) await to(e.name, {
            manual: !1
        });
        else if (e.name.startsWith("prompt_")) try {
            const r = e.name,
                i = ((await chrome.storage.local.get(["savedPrompts"])).savedPrompts || []).find(e => e.id === r);
            if (i && i.repeatType && "none" !== i.repeatType && await qa() && await ae.isSourcePromptCovered(r)) return;
            if (i) {
                const e = `${Date.now()}_${Math.random().toString(36).substring(2,11)}`;
                let a = null;
                try {
                    await no({
                        id: i.id,
                        name: i.command || "Scheduled Task",
                        prompt: i.prompt,
                        url: i.url,
                        enabled: !0,
                        skipPermissions: !1 !== i.skipPermissions,
                        model: i.model
                    }, e)
                } catch (t) {
                    a = t instanceof Error ? t : new Error(String(t)), await Za("Scheduled task failed", `Task "${i.command||"Scheduled Task"}" failed to execute. ${a.message}`)
                }
                if ("monthly" === i.repeatType || "annually" === i.repeatType) try {
                    await he.updateAlarmForPrompt(i)
                } catch (t) {
                    const e = `retry_${r}`;
                    try {
                        await chrome.alarms.create(e, {
                            delayInMinutes: 1
                        })
                    } catch (n) {}
                    await Za("Scheduled task setup failed", `Failed to schedule next occurrence of "${i.command||"Scheduled Task"}". Please check the task settings.`)
                }
            }
        } catch (t) {} else if (e.name.startsWith("retry_")) try {
            const n = e.name.replace("retry_", ""),
                r = ((await chrome.storage.local.get(["savedPrompts"])).savedPrompts || []).find(e => e.id === n);
            if (r && ("monthly" === r.repeatType || "annually" === r.repeatType)) try {
                await he.updateAlarmForPrompt(r)
            } catch (t) {
                await Za("Scheduled task needs attention", `Could not automatically reschedule "${r.command||"Scheduled Task"}". Please edit the task to reschedule it.`)
            }
        } catch (t) {}
    } else await Xi()
});
var ro = ["open_options", "set_locale"];

function io(e) {
    return "https://szmelc.com" === e
}
chrome.runtime.onMessageExternal.addListener((i, o, s) => ((async () => {
    const c = !!(d = o.origin) && ["https://szmelc.com"].includes(d);
    var d;
    const u = !c && !1;
    if (c || u)
        if ("chat_tab_frame" !== i.type && "has_chat_tab" !== i.type && i.type, "oauth_redirect" === i.type) {
            if (!(await $(i.redirect_uri))) return void s({
                success: !1,
                error: "No sign-in in progress",
                notStartedHere: !0
            });
            r();
            const e = await a(ee.ACCOUNT_UUID);
            na(), await Ha(async () => {
                await a(ee.PERMISSION_CONSENT_OWNER) || await b(k)
            });
            const {
                keepDiskCopy: t,
                ...n
            } = await R(i.redirect_uri, o?.tab?.id);
            if (s(n), n.success) {
                const n = await m();
                if (await Fa(n), e !== n) {
                    un();
                    try {
                        await _(), await _()
                    } catch {}
                    void 0 !== e && b(ee.LAST_ACTIVE_ORG_HINT), void 0 !== e && void 0 !== n && await ae.clearForAccountSwitch(Ja)
                }
                const r = A();
                r.then(t).catch(() => {}), r.catch(e => {}).then(() => rn()), $i(), fe(), pe()
            }
        } else if ("ping" === i.type) s({
        success: !0,
        exists: !0
    });
    else if ("has_chat_tab" === i.type) {
        const {
            tabId: e,
            byKey: t
        } = await wa(o, i.chat, i.session_key);
        s({
            hasTab: void 0 !== e,
            byKey: t
        })
    } else if ("show_chat_tab" === i.type) {
        const e = await async function(e, t, n) {
            if (!0 !== e.tab?.active || !(await chrome.windows.get(e.tab.windowId)).focused) return;
            const {
                tabId: r,
                byKey: i
            } = await wa(e, t, n);
            return i ? r : void 0
        }(o, i.chat, i.session_key);
        s({
            shown: await Ra(e, "message")
        })
    } else if ("chat_tab_frame" === i.type) s(await async function(...e) {
        return Sa(...e).catch(() => ({
            status: {
                reason: "REASON_IDLE"
            }
        }))
    }(o, i.chat, i.session_key, i.frame_request?.width));
    else if ("get_sidepanel_host_info" === i.type) try {
            const r = void 0 === o.tab,
                i = io(o.origin),
                [c, d, l, p] = await Promise.all([r && !u ? m() : Promise.resolve(void 0), r && !u ? a(ee.LAST_ACTIVE_ORG_HINT) : Promise.resolve(void 0), a(ee.NOTIFICATIONS_ENABLED).then(e => "enabled" === e), chrome.storage.local.get("preferred_locale").then(t => {
                    const r = t.preferred_locale;
                    return void 0 !== r && n.includes(r) ? r : e()
                })]),
                h = r && !u && o.origin === Ee()?.origin && await Xe();
            s({
                ok: !0,
                accountUuid: u ? void 0 : c,
                lastActiveOrgUuid: d,
                viaDevCarveOut: u,
                extensionVersion: chrome.runtime.getManifest().version,
                build: {
                    environment: "production",
                    antOnlyBuild: !1
                },
                notificationsEnabled: l,
                locale: p,
                availableLocales: n.map(e => ({
                    code: e,
                    displayName: t[e]
                })),
                capabilities: [...r && i ? ro : [], ...h ? [Ce] : []]
            })
        } catch (l) {
            s({
                ok: !1,
                error: String(l)
            })
        } else if (ro.includes(i.type)) {
            if (void 0 !== o.tab || !io(o.origin)) return void s({
                ok: !1,
                error: "Action not allowed from this origin/context"
            });
            try {
                if ("open_options" === i.type) await chrome.runtime.openOptionsPage(), s({
                    ok: !0
                });
                else if ("set_locale" === i.type) {
                    const e = i.locale;
                    if ("string" != typeof e || !n.includes(e)) return void s({
                        ok: !1,
                        error: "Unknown locale"
                    });
                    await chrome.storage.local.set({
                        preferred_locale: e
                    }), s({
                        ok: !0
                    })
                } else s({
                    ok: !1,
                    error: `Unhandled sidepanel action: ${i.type}`
                })
            } catch (l) {
                s({
                    ok: !1,
                    error: String(l)
                })
            }
        } else s();
    else s({
        success: !1,
        error: "Untrusted origin"
    })
})().catch(e => {
    s({
        success: !1,
        error: String(e)
    })
}), !0));