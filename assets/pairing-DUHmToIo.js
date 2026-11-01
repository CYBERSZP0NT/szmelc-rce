import {
    i as e
} from "./rolldown-runtime-Bpd4S2KM.js";
import {
    r,
    t
} from "./i18n-D7U8fJ2I.js";
import {
    l as s,
    u as i
} from "./constants-AGV8EUcv.js";
import {
    t as n
} from "./PairingPrompt-BNFFPCiR.js";
var o = e(i(), 1),
    m = e(r(), 1),
    a = s();

function c() {
    chrome.tabs.getCurrent(e => {
        e?.id && chrome.tabs.remove(e.id)
    })
}

function d() {
    const e = new URLSearchParams(window.location.search),
        r = e.get("request_id") || "",
        t = e.get("client_type") || "desktop",
        s = e.get("current_name") || void 0;
    return (0, a.jsx)("div", {
        className: "flex items-center justify-center min-h-screen bg-bg-100 p-4",
        children: (0, a.jsx)("div", {
            className: "w-full max-w-md",
            children: (0, a.jsx)(n, {
                requestId: r,
                clientType: t,
                currentName: s,
                onConfirm: (e, r) => {
                    chrome.runtime.sendMessage({
                        type: "pairing_confirmed",
                        request_id: e,
                        name: r
                    }), setTimeout(c, 100)
                },
                onDismiss: e => {
                    chrome.runtime.sendMessage({
                        type: "pairing_dismissed",
                        request_id: e
                    }), setTimeout(c, 100)
                }
            })
        })
    })
}
m.createRoot(document.getElementById("root")).render((0, a.jsx)(o.StrictMode, {
    children: (0, a.jsx)(t, {
        children: (0, a.jsx)(d, {})
    })
}));