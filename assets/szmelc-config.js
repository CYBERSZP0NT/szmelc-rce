/**
 * Szmelc-RCE — central configuration module.
 *
 * Every server address / endpoint the extension talks to is read from here.
 * Values can be changed at runtime from options.html ("Szmelc-RCE
 * Configuration" section). They are persisted in chrome.storage.local and
 * mirrored into chrome.storage.session so all contexts (service worker,
 * side panel, options page) can read them synchronously via
 * globalThis.__SZMELC_CFG.
 *
 * Add new fields by extending SZMELC_DEFAULTS and referencing them via
 * globalThis.__SZMELC_CFG in the (formerly hardwired) call sites.
 */

const SZMELC_DEFAULTS = {
    /** Web origin: bootstrap API, OAuth pages, embedded web app (clau[de] → szmelc) */
    webUrl: "https://szmelc.com",
    /** REST API base (was szmelc.com). MCP client SDK baseURL + event logging. */
    apiBaseUrl: "https://szmelc.com",
    /** WebSocket API base (was wss://szmelc.com) */
    wsApiBaseUrl: "wss://szmelc.com",
    /**
     * Remote-control bridge. The extension connects to
     * <bridgeUrl>/chrome/<userId> and receives execute_tool messages.
     * Swap this for any self-hosted bridge that implements the same
     * JSON protocol ({type:"connect"}, "paired"/"waiting", "execute_tool").
     */
    bridgeUrl: "wss://szmelc.com",
    /** When true, prefer the local bridge (e.g. a Desktop app on this machine). */
    localBridge: false,
    /** Local bridge endpoint (Desktop / Agent-Code-style native host). */
    localBridgeUrl: "ws://localhost:8765",
    /** OAuth endpoints (leave as "" to use platform defaults derived from webUrl). */
    authorizeUrl: "",
    tokenUrl: "",
    revokeUrl: "",
    /** OAuth client id (leave as "" to use the built-in one). */
    oauthClientId: "",
    /** Native messaging host names (install matching host scripts, see native-host/). */
    nativeHosts: ["com.szmelc.rce_browser", "com.szmelc.rce_code"],
};

/** Storage key under chrome.storage.local / .session */
const SZMELC_STORAGE_KEY = "szmelcRceConfig";

// Synchronous read-model. Defaults until storage is loaded (see below).
globalThis.__SZMELC_CFG = { ...SZMELC_DEFAULTS };
/** Defaults + manager object, exposed for pages (options panel UI). */
globalThis.__SZMELC_DEFAULTS = SZMELC_DEFAULTS;

const SZMELC = {
    STORAGE_KEY: SZMELC_STORAGE_KEY,
    DEFAULTS: SZMELC_DEFAULTS,

    /** Synchronous access (defaults + whatever the options page/SW applied). */
    get() {
        return globalThis.__SZMELC_CFG;
    },

    _merge(patch) {
        const { nativeHosts, ...rest } = { ...SZMELC_DEFAULTS, ...(patch || {}) };
        return { ...rest, nativeHosts: Array.isArray(nativeHosts) && nativeHosts.length ? nativeHosts : SZMELC_DEFAULTS.nativeHosts };
    },

    /**
     * Called once per context at startup: copy persisted config from
     * chrome.storage.local into the synchronous global.
     */
    init() {
        try {
            // storage.local has no sync API; storage.session does. Use the
            // session mirror first, then an async local read as fallback.
            if (chrome?.storage?.session?.getSync) {
                const s = chrome.storage.session.getSync(SZMELC_STORAGE_KEY);
                if (s && s[SZMELC_STORAGE_KEY]) this.applySync(s[SZMELC_STORAGE_KEY]);
            }
            if (chrome?.storage?.local?.get) {
                chrome.storage.local.get([SZMELC_STORAGE_KEY]).then((s) => {
                    const v = s && s[SZMELC_STORAGE_KEY];
                    if (v) this.applySync(v);
                }).catch(() => {});
            }
        } catch (_) { /* no chrome.* in test envs */ }
    },

    /** Replace the in-memory config + mirror to session storage (best effort). */
    applySync(patch) {
        globalThis.__SZMELC_CFG = this._merge(patch);
        try {
            chrome?.storage?.session?.set({ [SZMELC_STORAGE_KEY]: globalThis.__SZMELC_CFG });
        } catch (_) {}
        return globalThis.__SZMELC_CFG;
    },

    /** Persist (local + session) and ask the service worker to apply/reload. */
    async save(patch) {
        const cfg = this.applySync(patch);
        try {
            await chrome.storage.local.set({ [SZMELC_STORAGE_KEY]: cfg });
        } catch (_) {}
        try {
            await chrome.runtime.sendMessage({ type: "SZMELC_CONFIG_APPLIED" });
        } catch (_) {}
        return cfg;
    },

    async reset() {
        try { await chrome.storage.local.remove(SZMELC_STORAGE_KEY); } catch (_) {}
        globalThis.__SZMELC_CFG = { ...SZMELC_DEFAULTS };
        return globalThis.__SZMELC_CFG;
    },
};

// Load persisted values as early as possible.
SZMELC.init();
/** Exposed for pages (options panel UI). */
globalThis.SZMELC = SZMELC;
