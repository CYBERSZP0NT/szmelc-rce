import { i as e } from "./rolldown-runtime-Bpd4S2KM.js";
import { l as t, u as n } from "./constants-AGV8EUcv.js";
var r = {},
  s = function (e, t, n) {
    let s = Promise.resolve();
    if (t && t.length > 0) {
      const e = document.getElementsByTagName("link"),
        n = document.querySelector("meta[property=csp-nonce]"),
        o = n?.nonce || n?.getAttribute("nonce");
      ((i = t.map((t) => {
        var n;
        if (
          ((t = (function (e) {
            return "/" + e;
          })(t)),
          (n = t),
          (t = import.meta.resolve
            ? import.meta.resolve(n)
            : new URL(n, import.meta.url).href) in r)
        )
          return;
        r[t] = !0;
        const s = t.endsWith(".css");
        for (let r = e.length - 1; r >= 0; r--) {
          const n = e[r];
          if (n.href === t && (!s || "stylesheet" === n.rel)) return;
        }
        const i = document.createElement("link");
        return (
          (i.rel = s ? "stylesheet" : "modulepreload"),
          s || (i.as = "script"),
          (i.crossOrigin = ""),
          (i.href = t),
          o && i.setAttribute("nonce", o),
          document.head.appendChild(i),
          s
            ? new Promise((e, n) => {
                (i.addEventListener("load", e),
                  i.addEventListener("error", () =>
                    n(new Error(`Unable to preload CSS for ${t}`)),
                  ));
              })
            : void 0
        );
      })),
        (s = Promise.all(
          i.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: "fulfilled", value: e }),
              (e) => ({ status: "rejected", reason: e }),
            ),
          ),
        )));
    }
    var i;
    function o(e) {
      const t = new Event("vite:preloadError", { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return s.then((t) => {
      for (const e of t || []) "rejected" === e.status && o(e.reason);
      return e().catch(o);
    });
  },
  i = t();
function o(e) {
  var t,
    n,
    r = "";
  if ("string" == typeof e || "number" == typeof e) r += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++)
        e[t] && (n = o(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function a() {
  for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++)
    (e = arguments[n]) && (t = o(e)) && (r && (r += " "), (r += t));
  return r;
}
var c = "fcoeoabgfenejglbffodgkkbkcdhcgfn",
  u = {
    AUTHORIZE_URL: "https://szmelc.com/oauth/authorize",
    TOKEN_URL: "https://szmelc.com/v1/oauth/token",
    REVOKE_URL: "https://szmelc.com/v1/oauth/token/revoke",
    SCOPES_STR: "user:profile user:inference user:chat",
    CLIENT_ID: "54511e87-7abf-4923-9d84-d6f24532e871",
    REDIRECT_URI: `chrome-extension://${"dihbgbndebgnbjfmelmegjepbnkhlgni"}/oauth_callback.html`,
  },
  l = {
    development: u,
    production: {
      ...u,
      CLIENT_ID: "dae2cad8-15c5-43d2-9046-fcaecc135fa4",
      REDIRECT_URI: `chrome-extension://${c}/oauth_callback.html`,
    },
  },
  d = () => {
    const e = "production";
    // Szmelc-RCE: all endpoints come from the central config module
    // (assets/szmelc-config.js, editable in options.html).
    const z = globalThis.__SZMELC_CFG || {};
    return {
      environment: e,
      apiBaseUrl: z.apiBaseUrl || "https://szmelc.com",
      wsApiBaseUrl: z.wsApiBaseUrl || "wss://szmelc.com",
      webUrl: z.webUrl || "https://szmelc.com",
      bridgeUrl: z.bridgeUrl || "wss://szmelc.com",
      bridgeLocalUrl: z.localBridgeUrl || "ws://localhost:8765",
      oauth: {
        ...l[e],
        AUTHORIZE_URL: z.authorizeUrl || l[e].AUTHORIZE_URL,
        TOKEN_URL: z.tokenUrl || l[e].TOKEN_URL,
        REVOKE_URL: z.revokeUrl || l[e].REVOKE_URL,
        CLIENT_ID: z.oauthClientId || l[e].CLIENT_ID,
      },
      localBridge: z.localBridge ?? !1,
    };
  };
function h(e) {
  let t,
    n,
    r,
    s = !1;
  return function (i) {
    void 0 === t
      ? ((t = i), (n = 0), (r = -1))
      : (t = (function (e, t) {
          const n = new Uint8Array(e.length + t.length);
          return (n.set(e), n.set(t, e.length), n);
        })(t, i));
    const o = t.length;
    let a = 0;
    for (; n < o;) {
      s && (10 === t[n] && (a = ++n), (s = !1));
      let i = -1;
      for (; n < o && -1 === i; ++n)
        switch (t[n]) {
          case 58:
            -1 === r && (r = n - a);
            break;
          case 13:
            s = !0;
          case 10:
            i = n;
        }
      if (-1 === i) break;
      (e(t.subarray(a, i), r), (a = n), (r = -1));
    }
    a === o ? (t = void 0) : 0 !== a && ((t = t.subarray(a)), (n -= a));
  };
}
var p = function (e, t) {
    var n = {};
    for (var r in e)
      Object.prototype.hasOwnProperty.call(e, r) &&
        t.indexOf(r) < 0 &&
        (n[r] = e[r]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var s = 0;
      for (r = Object.getOwnPropertySymbols(e); s < r.length; s++)
        t.indexOf(r[s]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, r[s]) &&
          (n[r[s]] = e[r[s]]);
    }
    return n;
  },
  f = "text/event-stream",
  m = "last-event-id";
function g(e, t) {
  var {
      signal: n,
      headers: r,
      onopen: s,
      onmessage: i,
      onchunk: o,
      onclose: a,
      onerror: c,
      openWhenHidden: u,
      fetch: l,
    } = t,
    d = p(t, [
      "signal",
      "headers",
      "onopen",
      "onmessage",
      "onchunk",
      "onclose",
      "onerror",
      "openWhenHidden",
      "fetch",
    ]);
  return new Promise((t, p) => {
    const g = Object.assign({}, r);
    let y;
    function v() {
      (y.abort(), document.hidden || A());
    }
    (g.accept || (g.accept = f),
      "undefined" == typeof document ||
        u ||
        document.addEventListener("visibilitychange", v));
    let w = 1e3,
      E = 0;
    function S() {
      ("undefined" == typeof document ||
        u ||
        document.removeEventListener("visibilitychange", v),
        clearTimeout(E),
        y.abort());
    }
    null == n ||
      n.addEventListener("abort", () => {
        (S(), t());
      });
    const b = null != l ? l : fetch,
      T = null != s ? s : _;
    async function A() {
      var n;
      y = new AbortController();
      try {
        const n = await b(
          e,
          Object.assign(Object.assign({}, d), { headers: g, signal: y.signal }),
        );
        await T(n);
        const r = h(
          (function (e, t, n) {
            let r = { data: "", event: "", id: "", retry: void 0 };
            const s = new TextDecoder();
            return function (i, o) {
              if (0 === i.length)
                (null == e || e(r),
                  (r = { data: "", event: "", id: "", retry: void 0 }));
              else if (o > 0) {
                const e = s.decode(i.subarray(0, o)),
                  a = o + (32 === i[o + 1] ? 2 : 1),
                  c = s.decode(i.subarray(a));
                switch (e) {
                  case "data":
                    r.data = r.data ? r.data + "\n" + c : c;
                    break;
                  case "event":
                    r.event = c;
                    break;
                  case "id":
                    null == t || t((r.id = c));
                    break;
                  case "retry":
                    const e = parseInt(c, 10);
                    isNaN(e) || null == n || n((r.retry = e));
                }
              }
            };
          })(
            i,
            (e) => {
              e ? (g[m] = e) : delete g[m];
            },
            (e) => {
              w = e;
            },
          ),
        );
        (await (async function (e, t) {
          const n = e.getReader();
          let r;
          for (; !(r = await n.read()).done;) {
            const e = t(r.value);
            null != e && "function" == typeof e.then && (await e);
          }
        })(n.body, o ? (e) => (r(e), o()) : r),
          null == a || a(),
          S(),
          t());
      } catch (r) {
        if (!y.signal.aborted)
          try {
            const e =
              null !== (n = null == c ? void 0 : c(r)) && void 0 !== n ? n : w;
            (clearTimeout(E), (E = setTimeout(A, e)));
          } catch (s) {
            (S(), p(s));
          }
      }
    }
    A();
  });
}
function _(e) {
  const t = e.headers.get("content-type");
  if (!(null == t ? void 0 : t.startsWith("text/event-stream")))
    throw new Error(`Expected content-type to be ${f}, Actual: ${t}`);
}
var y = "features";
function v(e, t) {
  let n,
    r = 0;
  return {
    arm() {
      n ||
        ((r = Math.min(r ? 2 * r : e.first, e.max)),
        (n = setTimeout(() => {
          ((n = void 0), t());
        }, r)));
    },
    disarm() {
      (clearTimeout(n), (n = void 0), (r = 0));
    },
  };
}
function w(e) {
  return "number" == typeof e && Number.isInteger(e) && e >= 0;
}
var E = new Map(),
  S = "mcpSessionTabGroups",
  b = Promise.resolve(),
  T = [];
async function A(e) {
  await b;
  try {
    const t = (await chrome.storage.session.get(S))[S]?.[e];
    return w(t) ? t : void 0;
  } catch {
    return;
  }
}
function k(e) {
  return (b = b.then(async () => {
    try {
      const t = (await chrome.storage.session.get(S))[S] ?? {};
      (e(t), await chrome.storage.session.set({ [S]: t }));
    } catch (t) {}
  }));
}
function O(e) {
  return e?.sessionId ?? "__legacy_shared__";
}
async function R(e) {
  const t = O(e),
    n = E.get(t);
  if (void 0 !== n?.tabGroupId)
    return ((n.lastActiveAt = Date.now()), n.tabGroupId);
  const r = T.length;
  let s = await A(t);
  const i = E.get(t);
  if (void 0 !== i?.tabGroupId) return i.tabGroupId;
  for (const { from: o, to: a } of T.slice(r)) s === o && (s = a);
  return (E.set(t, { tabGroupId: s, lastActiveAt: Date.now() }), s);
}
async function I(e) {
  const t = E.get(e),
    n = t?.tabGroupId ?? (await A(e));
  return void 0 === n
    ? void 0
    : { tabGroupId: n, lastTabId: t?.lastTabId, mayActOn: t?.mayActOn };
}
function C(e, t, n) {
  const r = E.get(O(e));
  r && ((r.lastTabId = t), (r.mayActOn = n));
}
function D(e, t) {
  const n = O(e);
  (E.set(n, { ...E.get(n), tabGroupId: t, lastActiveAt: Date.now() }),
    k((e) => {
      e[n] = t;
    }));
}
function x(e, t) {
  if (e !== t) {
    T.push({ from: e, to: t });
    for (const n of E.values()) n.tabGroupId === e && (n.tabGroupId = t);
    k((n) => {
      for (const [r, s] of Object.entries(n)) s === e && (n[r] = t);
    });
  }
}
function U() {
  let e = 0;
  for (const t of E.values()) void 0 !== t.tabGroupId && e++;
  return e;
}
var P = 3e5,
  N = 8388608,
  L = "screenshotBytes:";
function F(e) {
  return O(e);
}
function $(e, t) {
  return `${L}${encodeURIComponent(e)}:${t}`;
}
function M() {
  return (
    "undefined" != typeof chrome &&
    !!chrome.storage?.session &&
    "function" == typeof chrome.storage.session.get
  );
}
var j = new (class {
  entries = new Map();
  totalEncodedBytes = 0;
  set(e, t, n, r) {
    if (!t || !n) return;
    if (n.length > N) return;
    this.sweepOrphansOnce();
    const s = $(F(e), t);
    this.remove(s);
    const i = { data: n, mimeType: r, storedAt: Date.now() };
    (this.entries.set(s, i),
      (this.totalEncodedBytes += n.length),
      this.evictToBudget(),
      M() && chrome.storage.session.set({ [s]: i }).catch((e) => {}));
  }
  async get(e, t) {
    this.sweepOrphansOnce();
    const n = $(F(e), t);
    let r = this.entries.get(n);
    if (!r && M())
      try {
        const e = (await chrome.storage.session.get(n))?.[n],
          t =
            e &&
            "string" == typeof e.data &&
            "string" == typeof e.mimeType &&
            "number" == typeof e.storedAt &&
            Date.now() - e.storedAt <= P;
        t && !this.entries.has(n)
          ? ((r = e),
            this.entries.set(n, r),
            (this.totalEncodedBytes += r.data.length),
            this.evictToBudget())
          : this.entries.has(n)
            ? (r = this.entries.get(n))
            : e && !t && chrome.storage.session.remove(n).catch(() => {});
      } catch (s) {}
    if (r) {
      if (!(Date.now() - r.storedAt > P))
        return (
          this.entries.delete(n),
          this.entries.set(n, r),
          { data: r.data, mimeType: r.mimeType }
        );
      this.remove(n);
    }
  }
  deleteByImageId(e) {
    if (!e) return;
    const t = `:${e}`;
    for (const n of [...this.entries.keys()]) n.endsWith(t) && this.remove(n);
  }
  remove(e) {
    const t = this.entries.get(e);
    (t && ((this.totalEncodedBytes -= t.data.length), this.entries.delete(e)),
      M() && chrome.storage.session.remove(e).catch(() => {}));
  }
  evictToBudget() {
    for (const [e] of this.entries) {
      if (this.totalEncodedBytes <= N) break;
      this.remove(e);
    }
  }
  sweepStarted = !1;
  sweepOrphansOnce() {
    !this.sweepStarted &&
      M() &&
      ((this.sweepStarted = !0),
      (async () => {
        try {
          const e = await chrome.storage.session.get(null),
            t = Date.now(),
            n = [],
            r = [];
          for (const i of Object.keys(e)) {
            if (!i.startsWith(L)) continue;
            const s = e[i];
            "string" != typeof s?.data ||
            "string" != typeof s?.mimeType ||
            "number" != typeof s?.storedAt ||
            t - s.storedAt > P
              ? n.push(i)
              : this.entries.has(i) || r.push([i, s]);
          }
          (n.length > 0 && (await chrome.storage.session.remove(n)),
            r.sort((e, t) => e[1].storedAt - t[1].storedAt));
          const s = [];
          for (const [i, o] of r)
            this.entries.has(i) ||
              (s.push([i, o]), (this.totalEncodedBytes += o.data.length));
          (s.length > 0 && (this.entries = new Map([...s, ...this.entries])),
            this.evictToBudget());
        } catch (e) {}
      })());
  }
  _clearForTesting() {
    (this.entries.clear(),
      (this.totalEncodedBytes = 0),
      (this.sweepStarted = !1));
  }
})();
function H(e) {
  return "bridge" === e || "native-messaging" === e || "sidepanel-iframe" === e;
}
async function K() {
  if ((j._clearForTesting(), M())) {
    const e = await chrome.storage.session.get(null),
      t = Object.keys(e).filter((e) => e.startsWith(L));
    t.length > 0 && (await chrome.storage.session.remove(t));
  }
}
var B = (function (e) {
    return (
      (e.ACCESS_TOKEN = "accessToken"),
      (e.REFRESH_TOKEN = "refreshToken"),
      (e.TOKEN_EXPIRY = "tokenExpiry"),
      (e.OAUTH_STATE = "oauthState"),
      (e.CODE_VERIFIER = "codeVerifier"),
      (e.SIGN_IN_STATE = "signInState"),
      (e.OAUTH_ORG_SWITCH = "oauthOrgSwitch"),
      (e.LAST_AUTH_FAILURE_REASON = "lastAuthFailureReason"),
      (e.ACCOUNT_UUID = "accountUuid"),
      (e.TOKEN_ORG = "tokenOrg"),
      (e.TOKEN_SCOPE = "tokenScope"),
      (e.DISK_REFRESH_TOKEN = "diskRefreshToken"),
      (e.TOKEN_ORG_UUID = "tokenOrgUuid"),
      (e.ORG_TELEMETRY = "orgTelemetry"),
      (e.ORG_GATE_OFF = "orgGateOff"),
      (e.UNPROVEN_CALLER = "unprovenCaller"),
      (e.POSTURE = "posture"),
      (e.LAST_HYBRID_PAIRING = "lastHybridPairing"),
      (e.PAIRING_ORG_MISMATCH = "pairingOrgMismatch"),
      (e.LAST_ACTIVE_ORG_HINT = "lastActiveOrgHint"),
      (e.STARTUP_REAUTH_STATE = "startupReauthState"),
      (e.SZMELC_API_KEY = "szmelc_incApiKey"),
      (e.SELECTED_MODEL = "selectedModel"),
      (e.SYSTEM_PROMPT = "systemPrompt"),
      (e.DEBUG_MODE = "debugMode"),
      (e.MODEL_SELECTOR_DEBUG = "modelSelectorDebug"),
      (e.SHOW_TRACE_IDS = "showTraceIds"),
      (e.SHOW_SYSTEM_REMINDERS = "showSystemReminders"),
      (e.PERF_TRACE_PILL = "perfTracePill"),
      (e.SAVE_TIMESTAMPED_SCREENSHOTS = "saveTimestampedScreenshots"),
      (e.USE_SESSIONS_API = "useSessionsAPI"),
      (e.SESSIONS_API_HOSTNAME = "sessionsApiHostname"),
      (e.BROWSER_CONTROL_PERMISSION_ACCEPTED =
        "browserControlPermissionAccepted"),
      (e.PERMISSION_STORAGE = "permissionStorage"),
      (e.LAST_PERMISSION_MODE_PREFERENCE = "lastPermissionModePreference"),
      (e.PERMISSION_CONSENT_OWNER = "permissionConsentOwner"),
      (e.PERMISSION_CONSENT_BY_ACCOUNT = "permissionConsentByAccount"),
      (e.ANONYMOUS_ID = "anonymousId"),
      (e.TEST_DATA_MESSAGES = "test_data_messages"),
      (e.SCHEDULED_TASK_LOGS = "scheduledTaskLogs"),
      (e.SCHEDULED_TASK_STATS = "scheduledTaskStats"),
      (e.PENDING_SCHEDULED_TASK = "pendingScheduledTask"),
      (e.UPDATE_AVAILABLE = "updateAvailable"),
      (e.TIP_DISPLAY_COUNTS = "tipDisplayCounts"),
      (e.NOTIFICATIONS_ENABLED = "notificationsEnabled"),
      (e.SCHEDULES_MOVED_NOTICE_SHOWN = "schedulesMovedNoticeShown"),
      (e.ANNOUNCEMENT_DISMISSED = "announcementDismissed"),
      (e.MODEL_OVERRIDE_SEEN = "modelOverrideSeen"),
      (e.SAVED_PROMPTS = "savedPrompts"),
      (e.SAVED_PROMPT_CATEGORIES = "savedPromptCategories"),
      (e.SKILL_SCHEDULES = "skillSchedules"),
      (e.SKILL_MIGRATION_DONE = "skillMigrationDone"),
      (e.SKILL_CUTOVER_APPLIED = "skillCutoverApplied"),
      (e.SKILL_SCHEDULE_UNLINKED_DISMISSED = "skillScheduleUnlinkedDismissed"),
      (e.SKILL_SCHEDULE_RETIRED_SOURCES = "skillScheduleRetiredSources"),
      (e.DEV_SKILL_MIGRATION_MODE = "devSkillMigrationMode"),
      (e.TAB_GROUPS = "tabGroups"),
      (e.DISMISSED_TAB_GROUPS = "dismissedTabGroups"),
      (e.MCP_TAB_GROUP_ID = "mcpTabGroupId"),
      (e.MCP_CONNECTED = "mcpConnected"),
      e
    );
  })({}),
  G = new Set([
    "accessToken",
    "refreshToken",
    "tokenExpiry",
    "startupReauthState",
    "tokenOrgUuid",
    "orgTelemetry",
    "orgGateOff",
    "posture",
    "unprovenCaller",
    "pairingOrgMismatch",
  ]);
function q(e) {
  return G.has(e) ? "session" : "local";
}
var z = Promise.resolve(!1);
function W() {
  z =
    chrome.storage.local
      .setAccessLevel?.({ accessLevel: "TRUSTED_CONTEXTS" })
      .then(
        () => !0,
        () => !1,
      ) ?? Promise.resolve(!1);
}
function V() {
  return z;
}
function Y(e) {
  return chrome.storage[q(e)];
}
function J(e) {
  const t = [],
    n = [];
  for (const r of e) (G.has(r) ? t : n).push(r);
  return { session: t, local: n };
}
async function Q(e, t) {
  const n = await Y(e).get(e);
  return void 0 !== n[e] ? n[e] : t;
}
async function X(e, t) {
  await Y(e).set({ [e]: t });
}
async function Z(e) {
  const { session: t, local: n } = J(Array.isArray(e) ? e : [e]);
  await Promise.all([
    t.length ? chrome.storage.session.remove(t) : void 0,
    t.length + n.length ? chrome.storage.local.remove([...n, ...t]) : void 0,
  ]);
}
async function ee(e) {
  const { session: t, local: n } = J(e),
    [r, s] = await Promise.all([
      t.length ? chrome.storage.session.get(t) : {},
      n.length ? chrome.storage.local.get(n) : {},
    ]);
  return { ...s, ...r };
}
async function te(e) {
  const { session: t, local: n } = J(Object.keys(e)),
    r = (t) => Object.fromEntries(t.map((t) => [t, e[t]]));
  await Promise.all([
    t.length ? chrome.storage.session.set(r(t)) : void 0,
    n.length ? chrome.storage.local.set(r(n)) : void 0,
  ]);
}
var ne = new Set([
  "anonymousId",
  "updateAvailable",
  "permissionConsentByAccount",
  "posture",
  "schedulesMovedNoticeShown",
  "unprovenCaller",
]);
var re = [
    "browserControlPermissionAccepted",
    "permissionStorage",
    "lastPermissionModePreference",
  ],
  se = "swAnalyticsProfileCache";
async function ie(e = {}) {
  await Z(
    Object.values(B)
      .filter((e) => !ne.has(e))
      .filter((t) => !e.keep?.includes(t)),
  );
  try {
    await chrome.storage.session.remove(se);
  } catch {}
  try {
    await K();
  } catch {}
  try {
    (await Z([
      "accountUuid",
      "orgTelemetry",
      "orgGateOff",
      "permissionStorage",
      "skillSchedules",
      "skillMigrationDone",
      "skillCutoverApplied",
      "skillScheduleRetiredSources",
      "skillScheduleUnlinkedDismissed",
      "pendingScheduledTask",
    ]),
      await chrome.storage.session.remove(se),
      await K());
  } catch {}
}
function oe(e, t) {
  const { identity: n, awaiting: r } = e,
    { orgs: s } = e.policy,
    i = n ? e.pairedPeer : null,
    o = !!r && (!n || de(n, r)) && (!s || !r.orgUuid || s.includes(r.orgUuid)),
    a = i?.hybrid ? "pairing" : o ? "resuming" : null,
    { orgTelemetry: c } = e,
    u = !!i && i.org?.toLowerCase() !== n?.orgUuid,
    l =
      n?.orgUuid &&
      !u &&
      !e.unprovenCaller &&
      c?.orgUuid === n.orgUuid &&
      (function (e) {
        const t = Date.now() - e;
        return t >= 0 && t < 36e5;
      })(c.at)
        ? c
        : null;
  return Object.freeze({
    managed: null !== a,
    source: a,
    allowedOrgs: s,
    pairedPeer: i,
    identity: n,
    awaiting: r,
    content: l?.content ?? "unknown",
    vendors:
      null !== a || e.vendorsOff ? "restricted" : (l?.vendors ?? "unknown"),
    orgGateOff:
      !!n?.orgProven && !!e.orgGateOffFor && e.orgGateOffFor === n.orgUuid,
    gen: t,
  });
}
function ae(e) {
  return e.orgGateOff ? null : e.allowedOrgs;
}
function ce(e) {
  const t = ae(e),
    { orgUuid: n, orgProven: r } = e.identity ?? {};
  return !t || (!!n && !!r && t.includes(n.toLowerCase()));
}
function ue(e) {
  return !!e?.identity && !ce(e);
}
function le(e, t) {
  return (
    e === t ||
    (!!e && !!t && e.accountUuid === t.accountUuid && e.orgUuid === t.orgUuid)
  );
}
function de(e, t) {
  return (
    e.orgUuid === t.orgUuid &&
    (e.accountUuid === t.accountUuid ||
      null === e.accountUuid ||
      null === t.accountUuid)
  );
}
function he(e, t) {
  return (
    !le(e, t) &&
    !(
      e &&
      t &&
      null === e.accountUuid &&
      null !== t.accountUuid &&
      e.orgUuid === t.orgUuid
    )
  );
}
function pe(e, t) {
  return (
    e === t ||
    (!!e && !!t && e.length === t.length && e.every((e, n) => e === t[n]))
  );
}
var fe,
  me,
  ge,
  _e = () => "ServiceWorkerGlobalScope" in globalThis,
  ye = Promise.resolve(),
  ve = 0,
  we = !1,
  Ee = v({ first: 1e3, max: 3e4 }, () => {
    Ue({}).catch(() => {});
  }),
  Se = class extends Error {
    posture;
    constructor(e, t) {
      (super("posture mirror write failed", { cause: t }), (this.posture = e));
    }
  },
  be = [],
  Te = [],
  Ae = new Promise((e) => {
    ge = e;
  });
function ke(e) {
  return (
    Te.push(e),
    () => {
      const t = Te.indexOf(e);
      t >= 0 && Te.splice(t, 1);
    }
  );
}
function Oe(e) {
  return (
    be.push(e),
    () => {
      const t = be.indexOf(e);
      t >= 0 && be.splice(t, 1);
    }
  );
}
function Re() {
  return me;
}
function Ie() {
  return me?.managed ?? !0;
}
function Ce() {
  return Ae;
}
async function De(e) {
  if (!fe) throw new Error("posture: an input applied before the boot derive");
  const t = fe.awaiting,
    n = "function" == typeof e ? await e() : e;
  fe = { ...fe, ...n };
  const r = me ? me.gen + 1 : 1;
  let s = oe(fe, r);
  for (const u of Te)
    try {
      const e = u(me, s);
      e && (s = oe((fe = { ...fe, ...e }), r));
    } catch (c) {}
  if (
    ((function (e, t, n) {
      const r = "awaiting" in t && !le(n, t.awaiting ?? null);
      if (!we && le(n, e) && !r) return;
      ((we = !1),
        (n ? X(B.LAST_HYBRID_PAIRING, n) : Z(B.LAST_HYBRID_PAIRING)).then(
          () => {
            ve === me?.gen && Ee.disarm();
          },
          (e) => {
            ((we = !0), Ee.arm());
          },
        ));
    })(t, n, fe.awaiting),
    me &&
      ((o = s),
      (i = me).source === o.source &&
        pe(i.allowedOrgs, o.allowedOrgs) &&
        (function (e, t) {
          return (
            e === t ||
            (!!e &&
              !!t &&
              e.sub === t.sub &&
              e.org === t.org &&
              e.hybrid === t.hybrid)
          );
        })(i.pairedPeer, o.pairedPeer) &&
        le(i.identity, o.identity) &&
        !!i.identity?.hybrid == !!o.identity?.hybrid &&
        !!i.identity?.orgProven == !!o.identity?.orgProven &&
        le(i.awaiting, o.awaiting) &&
        i.content === o.content &&
        i.vendors === o.vendors &&
        i.orgGateOff === o.orgGateOff))
  )
    return ve === me.gen ? me : xe(me);
  var i, o;
  const a = me;
  me = s;
  for (const u of be)
    try {
      u(a, s);
    } catch (c) {}
  return (ge?.(s), (ge = void 0), xe(s));
}
async function xe(e) {
  try {
    await chrome.storage.session.set({ [B.POSTURE]: e });
  } catch (t) {
    throw (Ee.arm(), new Se(e, t));
  }
  return ((ve = e.gen), we || Ee.disarm(), e);
}
function Ue(e) {
  const t = ye.then(() => De(e));
  return ((ye = t.catch(() => {})), t);
}
function Pe(e) {
  const t = ye.then(
    async () => (
      (fe = await e().catch((e) => ({
        policy: { orgs: null },
        pairedPeer: null,
        identity: null,
        awaiting: null,
      }))),
      De({})
    ),
  );
  return ((ye = t.catch(() => {})), t);
}
function Ne(e) {
  const t = e;
  return t && "object" == typeof t && "number" == typeof t.gen ? t : void 0;
}
async function Le() {
  try {
    return (
      Ne((await chrome.storage.session.get(B.POSTURE))[B.POSTURE])
        ?.allowedOrgs ?? null
    );
  } catch {
    return null;
  }
}
var Fe,
  $e = "get_posture";
var Me = !1,
  je = !1;
async function He() {
  try {
    const e = Ne((await chrome.storage.session.get(B.POSTURE))[B.POSTURE]);
    if (e) return e;
  } catch (e) {}
  return (async function () {
    try {
      return Ne(await chrome.runtime.sendMessage({ type: $e }));
    } catch (e) {
      return;
    }
  })();
}
async function Ke() {
  if (_e()) return (await Ae, me);
  Me ||
    ((Me = !0),
    Ge((e, t) => {
      ((je = !0), (Fe = t));
    }));
  const e = await He();
  return (je || (Fe = e), e);
}
function Be() {
  return _e() ? me : Fe;
}
function Ge(e) {
  const t = (t, n) => {
    const r = "session" === n && t[B.POSTURE];
    r && e(Ne(r.oldValue), Ne(r.newValue));
  };
  return (
    chrome.storage.onChanged.addListener(t),
    () => chrome.storage.onChanged.removeListener(t)
  );
}
var qe = "blockedUrlPatterns",
  ze = "forceLoginOrgUUID";
function We(e) {
  const t = e;
  return t && "object" == typeof t && "string" == typeof t.uuid
    ? { uuid: t.uuid.toLowerCase(), hybrid: !0 === t.hybrid }
    : null;
}
function Ve(e) {
  const t = e;
  if (
    !t ||
    "object" != typeof t ||
    "string" != typeof t.orgUuid ||
    "number" != typeof t.at
  )
    return null;
  const n = (e) => ("unrestricted" === e || "restricted" === e ? e : "unknown");
  return {
    orgUuid: t.orgUuid,
    content: n(t.content),
    vendors: n(t.vendors),
    at: t.at,
  };
}
var Ye = (e) =>
    !0 === e ? "unrestricted" : !1 === e ? "restricted" : "unknown",
  Je = (e) => [e.content, e.vendors].filter((e) => "unrestricted" === e).length;
function Qe(e) {
  if ("string" != typeof e) return null;
  const t = e.trim();
  if (!t) return null;
  if (t.startsWith("[")) {
    try {
      const e = JSON.parse(t);
      if (
        Array.isArray(e) &&
        e.length > 0 &&
        e.every((e) => "string" == typeof e)
      )
        return e.map((e) => e.trim().toLowerCase());
      if (Array.isArray(e) && 0 === e.length) return null;
    } catch {
      return null;
    }
    return null;
  }
  return [t.toLowerCase()];
}
function Xe(e, t) {
  let n;
  try {
    n = new URL(/^https?:\/\//.test(e) ? e : `https://${e}`);
  } catch {
    return !1;
  }
  const r =
    n.hostname
      .toLowerCase()
      .replace(/\.$/, "")
      .replace(/^www\./, "") + n.pathname.toLowerCase();
  let s = t
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/^([^/]*)\.(?=\/|$)/, "$1")
    .replace(/\/$/, "/*");
  s.includes("/") || (s += "/*");
  const i = s
    .split("*")
    .map((e) => e.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${i}$`).test(r);
}
var Ze = {
    local: [B.ACCOUNT_UUID, B.TOKEN_ORG],
    session: [B.ACCESS_TOKEN, B.REFRESH_TOKEN],
  },
  et = {
    local: [y],
    session: [
      B.ORG_TELEMETRY,
      B.ORG_GATE_OFF,
      B.TOKEN_ORG_UUID,
      B.UNPROVEN_CALLER,
    ],
  },
  tt = "orgTelemetryExpiry",
  nt = "orgGateOffExpiry",
  rt = () => "ServiceWorkerGlobalScope" in globalThis,
  st = class {
    static blockedUrlPatterns = null;
    static listenerRegistered = !1;
    static async isUrlBlockedByManagedPolicy(e) {
      null === this.blockedUrlPatterns &&
        ((this.blockedUrlPatterns = await this.loadBlockedUrlPatterns()),
        this.registerChangeListener());
      for (const t of this.blockedUrlPatterns) if (Xe(e, t)) return !0;
      return !1;
    }
    static async isDesktopManaged() {
      return (await Ke())?.managed ?? !0;
    }
    static async vendorTelemetryAllowed() {
      return "unrestricted" === (await Ke())?.vendors;
    }
    static async refusesClearText() {
      if (await this.isDesktopManaged()) return !0;
      try {
        const e = await Q(B.TOKEN_ORG);
        return We(e)?.hybrid ?? null != e;
      } catch {
        return !0;
      }
    }
    static async desktopManagedBy() {
      return (await Ke())?.source;
    }
    static async getForcedLoginOrgUUIDs() {
      return (await Ke())?.allowedOrgs;
    }
    static async readPolicy() {
      try {
        return { orgs: Qe((await chrome.storage.managed.get(ze))[ze]) };
      } catch (e) {
        return;
      }
    }
    static async readPolicyOrRetry() {
      const e = await this.readPolicy();
      return (this.retry("policy", void 0 === e), e ?? { orgs: await Le() });
    }
    static async reloadPolicy() {
      await Ue(async () => {
        const e = await this.readPolicy();
        return (this.retry("policy", void 0 === e), e ? { policy: e } : {});
      });
    }
    static async readIdentity() {
      const [e, t] = await Promise.all([
        chrome.storage.local.get(Ze.local),
        chrome.storage.session.get([...Ze.session, B.TOKEN_ORG_UUID]),
      ]);
      if (Ze.session.every((e) => !t[e])) return null;
      const n = e[B.ACCOUNT_UUID],
        r = We(e[B.TOKEN_ORG]);
      return {
        accountUuid: "string" == typeof n ? n : null,
        orgUuid: r?.uuid ?? null,
        hybrid: !0 === r?.hybrid,
        ...(!!r && r.uuid === t[B.TOKEN_ORG_UUID] && { orgProven: !0 }),
      };
    }
    static readIdentityOrRetry() {
      return this.readOrRetry("identity", () => this.readIdentity());
    }
    static reloadIdentity() {
      return this.reload("identity");
    }
    static async readAwaiting() {
      const e = await Q(B.LAST_HYBRID_PAIRING),
        t = e?.accountUuid,
        n = e?.orgUuid;
      return !e ||
        (null !== t && "string" != typeof t) ||
        (null !== n && "string" != typeof n)
        ? null
        : { accountUuid: t, orgUuid: n };
    }
    static readAwaitingOrRetry() {
      return this.readOrRetry("awaiting", () => this.readAwaiting());
    }
    static reloadAwaiting() {
      return this.reload("awaiting");
    }
    static pageFilings = Promise.resolve();
    static filingFailedAt = 0;
    static async noteProfile(e, t) {
      const n = e?.organization;
      if ("string" != typeof n?.uuid) return;
      const r = Ye(n.user_derived_analytics_allowed),
        s = {
          orgUuid: n.uuid.toLowerCase(),
          content: r,
          vendors:
            "unrestricted" === r ? Ye(n.third_party_analytics_allowed) : r,
          at: Date.now(),
        },
        i = async () => {
          try {
            const e = Ve(await Q(B.ORG_TELEMETRY));
            return (
              (e?.orgUuid === s.orgUuid &&
                e.at >= t &&
                e.at <= Date.now() &&
                Je(e) < Je(s)) ||
                (await X(B.ORG_TELEMETRY, s),
                (this.filingFailedAt = 0),
                this.retry("staleAnswer", !1)),
              !0
            );
          } catch {
            return (
              await Z(B.ORG_TELEMETRY).catch(() => {
                ((this.filingFailedAt = Date.now()),
                  this.retry("staleAnswer", !0));
              }),
              !1
            );
          }
        };
      if (!rt())
        return (
          (this.pageFilings = this.pageFilings.then(i, i)),
          void (await this.pageFilings)
        );
      await Ue(async () =>
        (await i()) ? this.readTelemetryOrRetry() : { orgTelemetry: null },
      ).catch(() => {});
    }
    static async removeStaleAnswer() {
      const e = this.filingFailedAt;
      try {
        const t = Ve(await Q(B.ORG_TELEMETRY));
        (t && t.at <= e && (await Z(B.ORG_TELEMETRY)),
          e === this.filingFailedAt && this.retry("staleAnswer", !1));
      } catch {
        this.retry("staleAnswer", !0);
      }
    }
    static async noteUnprovenCaller() {
      const [, e] = await Promise.allSettled([
        Ue({ unprovenCaller: !0 }),
        X(B.UNPROVEN_CALLER, !0),
      ]);
      this.retry("unprovenCaller", "rejected" === e.status);
    }
    static async tokenOrgUuidFor(e) {
      const t = await chrome.storage.session
        .get([B.ACCESS_TOKEN, B.TOKEN_ORG_UUID])
        .catch(() => ({}));
      return t[B.ACCESS_TOKEN] === e ? t[B.TOKEN_ORG_UUID] : void 0;
    }
    static async noteFetchedFlags(e, t) {
      await (
        !1 === e.features?.chrome_ext_force_login_org_enforced?.value &&
        "string" == typeof t
          ? X(B.ORG_GATE_OFF, { at: Date.now(), orgUuid: t })
          : Z(B.ORG_GATE_OFF)
      ).catch(() => {});
    }
    static async readTelemetryOrRetry() {
      try {
        const [e, t] = await Promise.all([
          chrome.storage.local.get(et.local),
          chrome.storage.session.get(et.session),
        ]);
        this.retry("telemetry", !1);
        const n = e[y],
          r = t[B.ORG_GATE_OFF],
          s = "number" == typeof r?.at && r.at <= Date.now() ? r.at + 864e5 : 0;
        (rt() && r && !s && Z(B.ORG_GATE_OFF).catch(() => {}),
          rt() && s > Date.now() && chrome.alarms?.create(nt, { when: s }));
        const i = Ve(t[B.ORG_TELEMETRY]),
          o =
            i && i.orgUuid === t[B.TOKEN_ORG_UUID] && i.at > this.filingFailedAt
              ? i
              : null,
          a = (o?.at ?? 0) + 36e5;
        return (
          rt() && a > Date.now() && chrome.alarms?.create(tt, { when: a }),
          {
            orgTelemetry: o,
            vendorsOff:
              !0 === n?.payload?.features?.chrome_ext_vendor_telemetry_off?.on,
            orgGateOffFor:
              s > Date.now() && "string" == typeof r?.orgUuid
                ? r.orgUuid
                : null,
            ...(B.UNPROVEN_CALLER in t && { unprovenCaller: !0 }),
          }
        );
      } catch (e) {
        return (
          this.retry("telemetry", !0),
          { orgTelemetry: null, orgGateOffFor: null }
        );
      }
    }
    static async reloadTelemetry() {
      await Ue(() => this.readTelemetryOrRetry());
    }
    static async readOrRetry(e, t) {
      try {
        const n = await t();
        return (this.retry(e, !1), n);
      } catch (n) {
        return void this.retry(e, !0);
      }
    }
    static async reload(e) {
      await Ue(async () => {
        const t = await ("identity" === e
            ? this.readIdentityOrRetry()
            : this.readAwaitingOrRetry()),
          n = {};
        return (void 0 !== t && (n[e] = t), n);
      });
    }
    static forgetHybridPairing() {
      return Ue({ awaiting: null }).then(
        () => {},
        () => {},
      );
    }
    static RETRY_MS = { first: 5e3, max: 3e4 };
    static retries = {
      policy: v(this.RETRY_MS, () => {
        this.reloadPolicy().catch(() => {});
      }),
      identity: v(this.RETRY_MS, () => {
        this.reloadIdentity().catch(() => {});
      }),
      awaiting: v(this.RETRY_MS, () => {
        this.reloadAwaiting().catch(() => {});
      }),
      telemetry: v(this.RETRY_MS, () => {
        this.reloadTelemetry().catch(() => {});
      }),
      unprovenCaller: v(this.RETRY_MS, () => {
        this.noteUnprovenCaller();
      }),
      staleAnswer: v(this.RETRY_MS, () => {
        this.removeStaleAnswer();
      }),
    };
    static retry(e, t) {
      t ? this.retries[e].arm() : this.retries[e].disarm();
    }
    static registerChangeListener() {
      if (this.listenerRegistered) return;
      this.listenerRegistered = !0;
      const e = rt();
      (e &&
        chrome.alarms?.onAlarm.addListener((e) => {
          (e.name !== tt && e.name !== nt) ||
            this.reloadTelemetry().catch(() => {});
        }),
        chrome.storage.onChanged.addListener((t, n) => {
          if ("managed" === n)
            return (
              t[qe] &&
                this.loadBlockedUrlPatterns().then((e) => {
                  this.blockedUrlPatterns = e;
                }),
              void (e && t[ze] && this.reloadPolicy().catch((e) => {}))
            );
          (e &&
            ("local" === n || "session" === n) &&
            et[n].some((e) => e in t) &&
            this.reloadTelemetry().catch((e) => {}),
            !e ||
              ("local" !== n && "session" !== n) ||
              (!Ze[n].some((e) => e in t) && !(B.TOKEN_ORG_UUID in t)) ||
              this.reloadIdentity().catch((e) => {}));
        }));
    }
    static async loadBlockedUrlPatterns() {
      try {
        const e = (await chrome.storage.managed.get(qe))[qe];
        return Array.isArray(e)
          ? e.filter((e) => "string" == typeof e && e.length > 0)
          : [];
      } catch (e) {
        return [];
      }
    }
    static _resetForTests() {
      ((this.blockedUrlPatterns = null),
        (this.listenerRegistered = !1),
        (this.pageFilings = Promise.resolve()),
        (this.filingFailedAt = 0));
      for (const e of Object.values(this.retries)) e.disarm();
    }
  },
  it = e(n(), 1),
  ot = "/api/oauth/profile";
async function at(e) {
  if ("/api/oauth/profile" !== e && (await st.isDesktopManaged()))
    throw new Error(
      `API request withheld while managed by Agent Desktop: ${e.split("?")[0]}`,
    );
}
var ct = new (class {
    baseURL;
    constructor() {
      const e = d();
      this.baseURL = e.apiBaseUrl;
    }
    async fetch(e, t = {}) {
      await at(e);
      const n = await hi();
      if (!n) throw new Error("No valid OAuth token available");
      await at(e);
      const r = `${this.baseURL}${e}`,
        s = {
          Authorization: `Bearer ${n}`,
          "Content-Type": "application/json",
          "szmelc-inc-client-platform": "agent_browser_extension",
          "szmelc-inc-client-version": chrome.runtime.getManifest().version,
          ...t.headers,
        },
        i = e === ot,
        o = Date.now(),
        a = await fetch(r, {
          ...t,
          headers: s,
          ...(i && {
            signal: AbortSignal.any([
              AbortSignal.timeout(1e4),
              ...(t.signal ? [t.signal] : []),
            ]),
          }),
        });
      if (!a.ok)
        throw new Error(`API request failed: ${a.status} ${a.statusText}`);
      const c = a.headers.get("content-type");
      if (204 === a.status) return null;
      if (c?.includes("application/json")) {
        const e = await a.json();
        return (i && (await st.noteProfile(e, o).catch(() => {})), e);
      }
      return c ? a.blob() : null;
    }
    async fetchEventSource(e, t) {
      await at(e);
      const n = await hi();
      if (!n) throw new Error("No valid OAuth token available for SSE stream");
      await at(e);
      const r = `${this.baseURL}${e}`,
        s = new AbortController();
      return (
        await g(r, {
          ...t,
          headers: {
            Authorization: `Bearer ${n}`,
            "szmelc-inc-client-platform": "agent_browser_extension",
            "szmelc-inc-client-version": chrome.runtime.getManifest().version,
            ...t.headers,
          },
          signal: t.signal || s.signal,
        }),
        () => {
          s.abort();
        }
      );
    }
  })(),
  ut = class {
    config;
    features = null;
    cacheTimestamp = null;
    initPromise = null;
    isRefreshing = !1;
    refreshFailures = 0;
    retryNotBefore = 0;
    constructor(e) {
      this.config = {
        ...e,
        cacheTTL: e.cacheTTL ?? 3e5,
        storageKey: e.storageKey ?? "features",
      };
    }
    setOnFeaturesUpdated(e) {
      this.config.onFeaturesUpdated = e;
    }
    async hydrateFromStorage() {
      if (this.features) return;
      const e = await this.readStoredCache();
      e?.payload?.features &&
        ((this.features = e.payload.features),
        (this.cacheTimestamp = e.timestamp));
    }
    async loadFromCache() {
      const e = await this.readStoredCache();
      return e &&
        e.payload &&
        e.timestamp &&
        Date.now() - e.timestamp < this.config.cacheTTL
        ? e
        : null;
    }
    async storedCacheApplies() {
      return !(await st.isDesktopManaged());
    }
    async readStoredCache() {
      try {
        if (!(await this.storedCacheApplies())) return;
        return (await chrome.storage.local.get(this.config.storageKey))[
          this.config.storageKey
        ];
      } catch (e) {
        return;
      }
    }
    async saveToCache(e) {
      try {
        if (!(await this.storedCacheApplies())) return;
        const t = { payload: e, timestamp: Date.now() };
        await chrome.storage.local.set({ [this.config.storageKey]: t });
      } catch (t) {}
    }
    async fetchAndUpdate() {
      try {
        const e = !1 !== (await Ke())?.managed,
          t = e ? { features: {} } : await this.config.fetchFeatures();
        if ((!1 !== (await Ke())?.managed) !== e) return;
        return (
          (this.features = t.features),
          (this.cacheTimestamp = Date.now()),
          (this.refreshFailures = 0),
          (this.retryNotBefore = 0),
          await this.saveToCache(t),
          this.config.onFeaturesUpdated?.(t.features),
          t.features
        );
      } catch (e) {
        throw (
          (this.refreshFailures += 1),
          (this.retryNotBefore =
            Date.now() +
            Math.min(
              3e4 * 2 ** (this.refreshFailures - 1),
              this.config.cacheTTL,
            )),
          e
        );
      }
    }
    checkAndRefreshIfStale() {
      if (!(
        !this.cacheTimestamp ||
        this.isRefreshing ||
        Date.now() < this.retryNotBefore
      ))
        return Date.now() - this.cacheTimestamp > this.config.cacheTTL
          ? ((this.isRefreshing = !0),
            this.fetchAndUpdate()
              .then(() => {})
              .catch((e) => {})
              .finally(() => {
                this.isRefreshing = !1;
              }))
          : void 0;
    }
    async initialize() {
      if (!this.features)
        return (
          this.initPromise ||
            (this.initPromise = (async () => {
              const e = await this.loadFromCache();
              if (e) {
                if (
                  ((this.features = e.payload.features),
                  (this.cacheTimestamp = e.timestamp),
                  this.config.onFeaturesUpdated?.(e.payload.features),
                  Date.now() - e.timestamp > this.config.cacheTTL / 2)
                ) {
                  this.isRefreshing = !0;
                  try {
                    await this.fetchAndUpdate();
                  } catch (t) {
                  } finally {
                    this.isRefreshing = !1;
                  }
                }
              } else
                try {
                  await this.fetchAndUpdate();
                } catch {}
            })()),
          this.initPromise
        );
    }
    getFeatureValue(e, t) {
      this.checkAndRefreshIfStale();
      const n = this.features?.[e];
      return n && void 0 !== n.value && null !== n.value ? n.value : t;
    }
    async getFeatureValueAsync(e, t) {
      await this.checkAndRefreshIfStale();
      const n = this.features?.[e];
      return n && void 0 !== n.value && null !== n.value ? n.value : t;
    }
    isFeatureEnabled(e) {
      return (this.checkAndRefreshIfStale(), this.features?.[e]?.on ?? !1);
    }
    async isFeatureEnabledAsync(e) {
      return (
        await this.checkAndRefreshIfStale(),
        this.features?.[e]?.on ?? !1
      );
    }
    getFeature(e) {
      return (this.checkAndRefreshIfStale(), this.features?.[e]);
    }
    async getFeatureAsync(e) {
      return (await this.checkAndRefreshIfStale(), this.features?.[e]);
    }
    async refresh() {
      return this.fetchAndUpdate();
    }
    isReady() {
      return null !== this.features;
    }
  },
  lt = "agent_in_chrome";
function dt(e) {
  return async () => e();
}
var ht = dt(() => ct.fetch(`/api/bootstrap/features/${lt}`)),
  pt = null;
var ft = (0, it.createContext)(null);
function mt({ children: e }) {
  const [t, n] = (0, it.useState)(null),
    [r, s] = (0, it.useState)(!1),
    [o, a] = (0, it.useState)(null),
    c = (0, it.useRef)(null);
  (0, it.useEffect)(() => {
    const e = (e) => {
        (n(e), a(null));
      },
      t = (function (e) {
        return (
          pt || (pt = new ut({ fetchFeatures: ht, onFeaturesUpdated: e })),
          pt
        );
      })(e);
    ((c.current = t),
      t.setOnFeaturesUpdated(e),
      t
        .initialize()
        .then(() => {
          s(!0);
        })
        .catch((e) => {
          (a(e instanceof Error ? e : new Error(String(e))), s(!0));
        }));
  }, []);
  const u = (0, it.useCallback)(
      (e, t) => (c.current ? c.current.getFeatureValue(e, t) : t),
      [t],
    ),
    l = (0, it.useCallback)(
      (e) => !!c.current && c.current.isFeatureEnabled(e),
      [t],
    ),
    d = (0, it.useCallback)(
      (e) => {
        if (c.current) return c.current.getFeature(e);
      },
      [t],
    ),
    h = (0, it.useCallback)((e) => void 0 !== t?.[e], [t]),
    p = (0, it.useCallback)(async () => {
      c.current && (await c.current.refresh());
    }, []);
  (0, it.useEffect)(() => {}, [t]);
  const f = null !== t,
    m = (0, it.useMemo)(
      () => ({
        isReady: r,
        hasPayload: f,
        error: o,
        getFeatureValue: u,
        isFeatureEnabled: l,
        getFeature: d,
        hasFeature: h,
        refresh: p,
      }),
      [r, f, o, u, l, d, h, p],
    );
  return (0, i.jsx)(ft.Provider, { value: m, children: e });
}
function gt(e) {
  if (pt && pt.isReady()) return pt.getFeature(e)?.value;
}
function _t() {
  const e = (0, it.useContext)(ft);
  if (!e) throw new Error("useFeatures must be used within a FeatureProvider");
  return e;
}
function yt(e, t) {
  const { getFeatureValue: n } = _t();
  return n(e, t);
}
function vt(e) {
  const { isFeatureEnabled: t } = _t();
  return t(e);
}
function wt() {
  const { isReady: e } = _t();
  return e;
}
function Et() {
  const { hasPayload: e } = _t();
  return e;
}
var St = new Set(["user:profile", "user:browser_extension_voice"]);
function bt(e) {
  const t = e?.split(/\s+/).filter(Boolean) ?? [];
  return t.length > 0 && t.every((e) => St.has(e));
}
var Tt = (e) => ("string" == typeof e ? e.split(/\s+/).filter(Boolean) : []);
function At(e) {
  const t = Tt(e);
  return 0 === t.length || t.includes("user:inference");
}
var kt = new Set([
  "user:inference",
  "user:voice",
  "user:browser_extension_voice",
]);
function Ot(e) {
  const t = Tt(e);
  return 0 === t.length || t.some((e) => kt.has(e));
}
var Rt,
  It = "cic_ext_narrow_token_ux",
  Ct = [B.ACCESS_TOKEN, B.REFRESH_TOKEN, B.TOKEN_EXPIRY],
  Dt = [...Ct, "tokenHandOffAt"],
  xt = [...Dt, B.DISK_REFRESH_TOKEN],
  Ut = () => "ServiceWorkerGlobalScope" in globalThis,
  Pt = 0,
  Nt = () => Pt;
async function Lt(
  e,
  t,
  n,
  { diskCopy: r, revokeDisplaced: s, rotatedFrom: i },
  o,
) {
  let a,
    c = !1;
  const u = async () => {
    a && a !== e.refreshToken && a !== i && (await Ft(a, s));
  };
  try {
    const s = !!r && Ut() && !!e.refreshToken && bt(e.scope),
      [i, l, d] = await Promise.all([
        s && r(),
        chrome.storage.local.get([B.DISK_REFRESH_TOKEN]),
        s && V(),
      ]);
    if (
      ((c = !0),
      (a = l[B.DISK_REFRESH_TOKEN]?.refreshToken),
      !(
        i &&
        d &&
        "string" == typeof t &&
        t &&
        "string" == typeof n?.uuid &&
        !1 === n.hybrid
      ))
    )
      return (await Z(B.DISK_REFRESH_TOKEN), void (await u()));
    if (!o()) return;
    const h = { refreshToken: e.refreshToken, accountUuid: t };
    (await chrome.storage.local.set({ [B.DISK_REFRESH_TOKEN]: h }), await u());
  } catch (l) {
    if (!c) return;
    (await Z(B.DISK_REFRESH_TOKEN).catch(() => {}), await u().catch(() => {}));
  }
}
async function Ft(e, t) {
  (await chrome.storage.session.get(B.REFRESH_TOKEN).catch(() => ({})))[
    B.REFRESH_TOKEN
  ] !== e && t?.(e);
}
async function $t() {
  const e = await chrome.storage.local
    .get(B.DISK_REFRESH_TOKEN)
    .catch(() => null);
  if (null === e) return null;
  const t = e[B.DISK_REFRESH_TOKEN]?.refreshToken;
  return "string" == typeof t && t ? t : void 0;
}
async function Mt(e) {
  Rt?.refreshToken === e && (Rt = void 0);
  const [t, n] = await Promise.all([
      chrome.storage.session.get(B.REFRESH_TOKEN),
      chrome.storage.local.get(B.DISK_REFRESH_TOKEN),
    ]),
    r = n[B.DISK_REFRESH_TOKEN];
  await Promise.all([
    t[B.REFRESH_TOKEN] === e && Z(B.REFRESH_TOKEN),
    r?.refreshToken === e && Z(B.DISK_REFRESH_TOKEN),
  ]);
}
async function jt(e) {
  ((Pt += 1), (Rt = void 0));
  const { tokens: t, diskRead: n } = await (async function () {
    const [e, t] = await Promise.all([
        chrome.storage.session.get(B.REFRESH_TOKEN).catch(() => ({})),
        chrome.storage.local.get(B.DISK_REFRESH_TOKEN).catch(() => {}),
      ]),
      n = [e[B.REFRESH_TOKEN], t?.[B.DISK_REFRESH_TOKEN]?.refreshToken].filter(
        (e) => "string" == typeof e && e.length > 0,
      );
    return { tokens: [...new Set(n)], diskRead: void 0 !== t };
  })();
  Pt += 1;
  const r = n ? [] : [B.DISK_REFRESH_TOKEN];
  try {
    await ie({ keep: r });
  } finally {
    try {
      await chrome.storage.local.remove(xt.filter((e) => !r.includes(e)));
    } finally {
      t.forEach((t) => e?.(t));
    }
  }
}
function Ht(...e) {
  return Z(e);
}
var Kt = null;
var Bt = null,
  Gt = new Set();
function qt(e) {
  return (Gt.add(e), () => Gt.delete(e));
}
var zt = dt(async function () {
  const e = d(),
    t = await di();
  if (!t) throw new Error("No valid OAuth token available for feature fetch");
  if (await st.isDesktopManaged())
    throw new Error("Feature fetch withheld: Desktop-managed");
  const n = await fetch(`${e.apiBaseUrl}/api/bootstrap/features/${lt}`, {
    headers: {
      Authorization: `Bearer ${t}`,
      "Content-Type": "application/json",
    },
  });
  if (401 === n.status)
    throw (
      await Ht(B.ACCESS_TOKEN, B.TOKEN_EXPIRY),
      new Error("OAuth token rejected by server (401)")
    );
  if (!n.ok) throw new Error(`Failed to fetch features: ${n.status}`);
  const r = await n.json(),
    s = await st.tokenOrgUuidFor(t);
  return (await st.noteFetchedFlags(r, s), r);
});
function Wt() {
  return (
    Bt ||
      (Bt = new ut({
        fetchFeatures: zt,
        onFeaturesUpdated: () => {
          for (const t of Gt)
            try {
              t();
            } catch (e) {}
        },
      })),
    Bt
  );
}
async function Vt(e) {
  const t = Wt();
  await t.initialize();
  const n = await t.getFeatureValueAsync(e, {});
  return (r = n) &&
    "object" == typeof r &&
    Object.keys(r).some((e) => void 0 !== r[e] && null !== r[e])
    ? n
    : {};
  var r;
}
async function Yt() {
  const e = Wt();
  return (await e.initialize(), e.isReady());
}
async function Jt(e) {
  const t = Wt();
  return (await t.initialize(), t.isFeatureEnabledAsync(e));
}
function Qt(e, t) {
  return Wt().getFeatureValue(e, t);
}
function Xt(e) {
  const t = Wt();
  if (t.isReady()) return t.getFeature(e)?.value;
}
async function Zt() {
  return Wt().refresh();
}
var en;
function tn(e, t) {
  if (
    (e && e.managed !== t.managed && Zt().catch((e) => {}),
    t.identity && !ce({ ...t, orgGateOff: !1 }))
  ) {
    if (!en) {
      const e = () => {
        Zt().catch(() => {});
      };
      (e(), (en = setInterval(e, 3e5)));
    }
  } else (clearInterval(en), (en = void 0));
}
async function nn() {
  await Wt().hydrateFromStorage();
}
var rn = 1e4,
  sn = 8e3,
  on = 3e4;
function an() {
  return Qt("cic_ext_timeouts", {});
}
var cn = 45e3,
  un = 5e3,
  ln = 3e4,
  dn = 1500;
function hn() {
  return vn.hiddenTabDrawMs ?? an().hiddenTabDrawMs ?? 2e3;
}
function pn() {
  return Qt("cic_hidden_tab_draw", !0);
}
function fn() {
  return !0 === Qt("cic_page_text_body_fallback", !1);
}
var mn = 1e4;
function gn() {
  return !0 === Qt("cic_tab_close_wait_limit", !1);
}
function _n() {
  return !1 !== Qt("cic_idle_detach_second_look", !0);
}
var yn,
  vn = {};
function wn(e) {
  const { cicHiddenTabDrawMs: t } = e;
  return { hiddenTabDrawMs: "number" == typeof t && t > 0 ? t : void 0 };
}
function En() {
  return (
    (yn ??= (async () => {
      try {
        (chrome.storage.onChanged.addListener((e, t) => {
          "local" === t &&
            "cicHiddenTabDrawMs" in e &&
            (vn = wn({ cicHiddenTabDrawMs: e.cicHiddenTabDrawMs.newValue }));
        }),
          (vn = wn(await chrome.storage.local.get(["cicHiddenTabDrawMs"]))));
      } catch (e) {}
    })()),
    yn
  );
}
var Sn = 4e4,
  bn = 1e3,
  Tn = 8e3;
function An() {
  return an().oauthRefreshMs ?? rn;
}
function kn() {
  return an().debuggerAttachMs ?? sn;
}
function On() {
  return an().cdpSendCommandMs ?? on;
}
var Rn = 2e3;
function In() {
  return !0 === Qt("cic_navigate_short_wait", !1);
}
var Cn = 5e3;
function Dn(e) {
  return null !== e && "object" == typeof e && !Array.isArray(e);
}
var xn = new URL("https://szmelc.com").origin,
  Un = `${xn}/api/bootstrap`;
async function Pn(e) {
  const t = await fetch(`${e}/api/bootstrap`, {
      credentials: "include",
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(1e4),
    }),
    n = t.ok ? await t.json() : void 0,
    r = Dn(n) ? n.account : void 0,
    s = Dn(r) ? r.uuid : void 0;
  return "string" == typeof s ? s : void 0;
}
async function Nn(e) {
  return (await Ln(e)).signedIn;
}
async function Ln(e) {
  const t = { signedIn: void 0 };
  try {
    const n = await fetch(Un, {
      credentials: "include",
      cache: "no-store",
      redirect: "manual",
      signal: e,
    });
    if (401 === n.status || 403 === n.status) {
      if ("challenge" === n.headers.get("cf-mitigated")) return t;
      if (403 === n.status) {
        const e = await n
          .json()
          .then((e) => ("object" == typeof e && null !== e ? e : null))
          .catch(() => null);
        if ("error" !== e?.type || void 0 !== e.error?.details?.error_code)
          return t;
      }
      return { signedIn: !1 };
    }
    if (!n.ok) return t;
    const r = await n.json();
    if ("object" != typeof r || null === r) return t;
    const s = r.account;
    return null == s
      ? { signedIn: !1 }
      : {
          signedIn: !0,
          ...("string" == typeof s.uuid && { accountUuid: s.uuid }),
        };
  } catch {
    return t;
  }
}
async function Fn() {
  let e = await Q(B.ANONYMOUS_ID);
  return (e || ((e = crypto.randomUUID()), await X(B.ANONYMOUS_ID, e)), e);
}
function $n(e) {
  return e?.trim().length ?? 0;
}
function Mn(e, t) {
  return { sessionId: e, shortcut_id: t, commandType: "shortcut" };
}
function jn(e, t) {
  return {
    sessionId: e,
    shortcut_id: t.id,
    command_name_length: $n(t.command),
  };
}
function Hn(e, t, n) {
  return {
    sessionId: e,
    shortcut_id: n.id,
    renamed: t.trim() !== (n.command ?? ""),
    command_name_length: $n(t),
  };
}
function Kn(e, t) {
  return { sessionId: e, shortcut_id: t };
}
function Bn(e, t) {
  return { task_id: e, success: !0, execution_type: t };
}
function Gn(e, t, n) {
  return {
    task_id: e,
    success: !1,
    execution_type: t,
    error_name: n instanceof Error ? n.name : typeof n,
  };
}
function qn(e) {
  try {
    return "undefined" == typeof localStorage ? null : localStorage.getItem(e);
  } catch {
    return null;
  }
}
function zn(e, t) {
  try {
    if ("undefined" == typeof localStorage) return;
    localStorage.setItem(e, t);
  } catch {}
}
function Wn(e) {
  try {
    if ("undefined" == typeof localStorage) return;
    localStorage.removeItem(e);
  } catch {}
}
function Vn() {
  return "undefined" != typeof crypto && "function" == typeof crypto.randomUUID
    ? crypto.randomUUID()
    : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
        const t = (16 * Math.random()) | 0;
        return ("x" === e ? t : (3 & t) | 8).toString(16);
      });
}
var Yn = "antalytics",
  Jn = "antalytics_anonymous_id",
  Qn = /^[a-zA-Z0-9_.-]{1,128}$/;
function Xn(e, t, n) {
  try {
    if ("undefined" == typeof document) return;
    document.cookie = `${encodeURIComponent(e)}=; Path=/; Max-Age=0`;
    const r = 31536e3,
      s =
        "undefined" != typeof location && "https:" === location.protocol
          ? "; Secure"
          : "";
    document.cookie = `${encodeURIComponent(e)}=${encodeURIComponent(t)}; Domain=${n}; Path=/; Max-Age=${r}; SameSite=Lax${s}`;
  } catch {}
}
function Zn(e) {
  return `${e}.v1.${Vn()}`;
}
function er(e = {}) {
  const t = e.prefix ?? Yn;
  if (e.cookieName) {
    const t = (function (e) {
      try {
        if ("undefined" == typeof document) return null;
        const t = `${encodeURIComponent(e)}=`;
        for (const e of document.cookie.split("; "))
          if (e.startsWith(t)) {
            const n = decodeURIComponent(e.slice(t.length));
            return n.length >= 2 && n.startsWith('"') && n.endsWith('"')
              ? n.slice(1, -1)
              : n;
          }
        return null;
      } catch {
        return null;
      }
    })(e.cookieName);
    if (t && Qn.test(t))
      return (
        zn(Jn, t),
        e.cookieDomain && Xn(e.cookieName, t, e.cookieDomain),
        t
      );
  }
  const n = qn(Jn);
  if (n)
    return (
      e.cookieName && e.cookieDomain && Xn(e.cookieName, n, e.cookieDomain),
      n
    );
  const r = Zn(t);
  return (
    zn(Jn, r),
    e.cookieName && e.cookieDomain && Xn(e.cookieName, r, e.cookieDomain),
    r
  );
}
var tr = "hipaa_redacted",
  nr = "_compliance_scrub_error",
  rr = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  sr = /^[a-z0-9_]{1,48}$/i;
function ir(e) {
  return (
    null == e ||
    "number" == typeof e ||
    "boolean" == typeof e ||
    ("string" == typeof e && ("" === e || rr.test(e)))
  );
}
function or(e, t) {
  if (!t.hipaa) return e;
  const n = (e, t) => {
    if (ir(e)) return e;
    if ("string" == typeof e) return tr;
    if (t >= 4) return tr;
    if (Array.isArray(e)) {
      const r = [];
      for (const s of e) r.push(n(s, t + 1));
      return r;
    }
    if (
      (function (e) {
        if (null === e || "object" != typeof e || Array.isArray(e)) return !1;
        const t = Object.getPrototypeOf(e);
        return t === Object.prototype || null === t;
      })(e)
    ) {
      const r = Object.entries(e);
      if (r.some(([e]) => "__proto__" !== e && !ir(e))) return tr;
      const s = {};
      for (const [e, i] of r) "__proto__" !== e && (s[e] = n(i, t + 1));
      return s;
    }
    return tr;
  };
  try {
    const t = {};
    for (const [r, s] of Object.entries(e))
      "__proto__" !== r && sr.test(r) && (t[r] = n(s, 0));
    return t;
  } catch {
    return {
      [nr]: !0,
      url: tr,
      path: tr,
      referrer: tr,
      _dual_fire: "boolean" == typeof e._dual_fire ? e._dual_fire : void 0,
    };
  }
}
var ar = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
];
function cr(e, t, n) {
  if (0 === t.length) return e;
  let r = e;
  for (const i of t) {
    if (null == r) break;
    try {
      r = i.fn(r);
    } catch (s) {
      if (i.privacy) {
        try {
          n?.(s, i.name);
        } catch {}
        return null;
      }
    }
  }
  return r ?? null;
}
var ur = new Set([
    "email",
    "ip",
    "ipAddress",
    "ip_address",
    "userAgent",
    "user_agent",
    "title",
  ]),
  lr = {
    name: "piiScrub",
    type: "before",
    privacy: !0,
    fn: (e) => {
      const t = Object.create(null);
      for (const [n, r] of Object.entries(e.properties))
        ur.has(n) || (t[n] = r);
      return { ...e, properties: t };
    },
  },
  dr = "antalytics_queue_v1";
function hr(e) {
  const t = e.length > 100 ? e.slice(e.length - 100) : e;
  try {
    zn(dr, JSON.stringify(t));
  } catch {}
}
function pr() {
  const e = qn(dr);
  if (!e) return [];
  try {
    const t = JSON.parse(e);
    if (!Array.isArray(t)) return [];
    const n = t.filter(
        (e) =>
          "object" == typeof e &&
          null !== e &&
          "string" == typeof e.eventName &&
          "string" == typeof e.eventId &&
          "string" == typeof e.eventTimestamp &&
          "object" == typeof e.properties &&
          null !== e.properties &&
          !Array.isArray(e.properties),
      ),
      r = Date.now(),
      s = n.filter(
        (e) =>
          !(function (e, t) {
            return t - Date.parse(e.eventTimestamp) > 6048e5;
          })(e, r),
      );
    return (
      0 === s.length && n.length > 0 ? fr() : s.length < n.length && hr(s),
      s
    );
  } catch {
    return [];
  }
}
function fr() {
  Wn(dr);
}
function mr(e) {
  const t = {
    event_name: e.eventName,
    event_id: e.eventId,
    event_timestamp: e.eventTimestamp,
  };
  return (
    void 0 !== e.accountUuid && (t.account_uuid = e.accountUuid),
    void 0 !== e.organizationUuid && (t.organization_uuid = e.organizationUuid),
    Object.keys(e.properties).length > 0 &&
      (t.properties = JSON.stringify(e.properties)),
    { event_type: "ProductAnalyticsEvent", event_data: t }
  );
}
function gr(e) {
  if (!e.testMode) return e.endpoint;
  const t = e.endpoint.includes("?") ? "&" : "?";
  return `${e.endpoint}${t}test_mode=true`;
}
function _r(e) {
  const t = { events: e.map(mr) };
  return JSON.stringify(t);
}
function yr(e) {
  return e >= 200 && e < 300
    ? "ok"
    : 429 === e
      ? "rate_limited"
      : e >= 500
        ? "retryable"
        : "drop";
}
function vr(e) {
  return new Promise((t) => setTimeout(t, e));
}
function wr(e) {
  return 1e3 * Math.pow(2, e) + 250 * Math.random();
}
function Er(e) {
  return "function" == typeof TextEncoder
    ? new TextEncoder().encode(e).byteLength
    : "function" == typeof Blob
      ? new Blob([e]).size
      : e.length;
}
async function Sr(e, t, n) {
  const r = (r) =>
      fetch(e, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-service-name": n },
        keepalive: r,
        body: t,
      }),
    s = Er(t) < 6e4;
  try {
    return yr((await r(s)).status);
  } catch {
    if (s)
      try {
        return yr((await r(!1)).status);
      } catch {}
    return "retryable";
  }
}
function br(e, t) {
  if (
    "undefined" == typeof navigator ||
    "function" != typeof navigator.sendBeacon
  )
    return !1;
  try {
    return navigator.sendBeacon(e, new Blob([t]));
  } catch {
    return !1;
  }
}
function Tr(e, t) {
  if (0 === e.length) return !0;
  const n = _r(e),
    r = gr(t),
    s = `${r}${r.includes("?") ? "&" : "?"}service_name=${encodeURIComponent(t.serviceName)}`;
  if (
    (function () {
      try {
        return "function" == typeof Request && "keepalive" in Request.prototype;
      } catch {
        return !1;
      }
    })() &&
    "function" == typeof fetch &&
    Er(n) < 6e4
  )
    try {
      return (
        fetch(s, { method: "POST", keepalive: !0, body: new Blob([n]) }).catch(
          () => {
            br(s, n);
          },
        ),
        !0
      );
    } catch {}
  return br(s, n);
}
var Ar = "https://szmelc.com/api/event_logging/v2/batch",
  kr = "$identify",
  Or = 500;
function Rr(e) {
  const t = e instanceof Error ? e.name : typeof e,
    n = new Error(t);
  return ((n.name = t), n);
}
var Ir = 2147483647,
  Cr = /^([a-z][a-z0-9_]*\.)+[a-z][a-z0-9_]*$|^\$[a-z_]+$|^page_viewed$/;
function Dr() {
  return "undefined" != typeof window && "undefined" != typeof document;
}
function xr(e, t) {
  return void 0 !== e.accountUuid && e.accountUuid !== t;
}
function Ur(e) {
  return "object" == typeof e && null !== e && !Array.isArray(e);
}
function Pr(e) {
  return e && "string" == typeof e ? Nr(e) : e;
}
function Nr(e) {
  let t = e;
  return (
    (t = t.replace(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi,
      "*",
    )),
    (t = t.replace(/\b[0-9a-f]{32}\b/gi, "*")),
    (t = t.replace(/\b[0-9a-f]{24}\b/gi, "*")),
    (t = t.replace(/\/(\d{4,})(?=\/|$|\?|#)/g, "/*")),
    t
  );
}
function Lr(e) {
  if (!(e.path || e.url || e.referrer || e.search)) return;
  const t = { ...e };
  return (
    t.path && (t.canonical_path = Pr(t.path)),
    t.url && (t.canonical_url = Pr(t.url)),
    t.referrer && (t.canonical_referrer = Pr(t.referrer)),
    t.search &&
      (t.canonical_search = (function (e) {
        if (!e || "string" != typeof e) return e;
        const t = new URLSearchParams(e.replace(/^\?/, "")),
          n = new URLSearchParams();
        for (const [s, i] of t) n.set(s, Nr(i));
        const r = n.toString();
        return r ? `?${r}` : "";
      })(t.search)),
    t
  );
}
var Fr = /\/\$[^/?#]*(?=\/|$|\?|#)/g;
function $r(e) {
  if ("string" != typeof e) return e;
  const t = e.search(/[?#]/);
  return -1 === t
    ? e.replace(Fr, "/*")
    : e.slice(0, t).replace(Fr, "/*") + e.slice(t);
}
function Mr(e) {
  try {
    const { protocol: t, host: n } = new URL(String(e));
    return "" === n ? null : t + "//" + n;
  } catch {
    return null;
  }
}
var jr = [
    "canonical_path",
    "canonical_url",
    "canonical_referrer",
    "canonical_search",
  ],
  Hr = {
    name: "canonicalUriProperties",
    type: "before",
    fn: (e) => {
      if ("page_viewed" !== e.eventName) return e;
      const t = e.properties;
      if (!t || "object" != typeof t) return e;
      const n = Mr(t.referrer),
        r = Lr({
          ...t,
          path: $r(t.path),
          url: $r(t.url),
          ...(null !== n && n === Mr(t.url) && { referrer: $r(t.referrer) }),
        });
      if (!r) return e;
      const s = { ...t };
      for (const i of jr) i in r && (s[i] = r[i]);
      return { ...e, properties: s };
    },
  },
  Kr = new (class {
    constructor() {
      ((this.config = null),
        (this.queue = []),
        (this.inFlight = []),
        (this.flushTimer = null),
        (this.firstFlushTimer = null),
        (this.firstFlushPendingDelayMs = null),
        (this.firstFlushRequested = !1),
        (this.persistTimer = null),
        (this.flushPromise = null),
        (this.lastRetryExhaustedAt = 0),
        (this.consecutiveRetryableFailures = 0),
        (this.lastRateLimitedAt = 0),
        (this.anonymousId = ""),
        (this.accountUuid = void 0),
        (this.organizationUuid = void 0),
        (this.traits = {}),
        (this.unloadListenersRegistered = !1),
        (this.readBackFromStorage = new WeakSet()),
        (this.heldFromStorage = []),
        (this.forgetGen = 0),
        (this.preInitBuffer = []),
        (this.preInitDroppedCount = 0),
        (this.preInitWarned = !1),
        (this.preInitConsentGetter = null));
    }
    init(e) {
      try {
        if (this.config) return;
        ((this.config = (function (e) {
          const t = e.plugins ?? [];
          return {
            endpoint: e.endpoint ?? Ar,
            serviceName: e.serviceName,
            flushInterval: e.flushInterval ?? 5e3,
            getFlushInterval: e.getFlushInterval,
            flushAt: e.flushAt ?? 50,
            maxRetries: e.maxRetries ?? 3,
            testMode: e.testMode ?? !1,
            debug: e.debug ?? !1,
            pluginsBefore: t.filter((e) => "before" === e.type),
            pluginsAfter: t.filter((e) => "after" === e.type),
            anonymousIdCookie: e.anonymousIdCookie,
            anonymousIdCookieDomain: e.anonymousIdCookieDomain,
            holdStampedStoredEvents: e.holdStampedStoredEvents ?? !1,
            onError: e.onError,
          };
        })(e)),
          Dr() &&
            e.allowedOrigins &&
            e.allowedOrigins.includes(window.location.origin),
          this.config.debug && this.config.endpoint,
          (this.anonymousId = er({
            prefix: this.config.serviceName,
            cookieName: this.config.anonymousIdCookie,
            cookieDomain: this.config.anonymousIdCookieDomain,
          })));
        const t = pr();
        if (t.length > 0) {
          for (const e of t) this.readBackFromStorage.add(e);
          (this.config.holdStampedStoredEvents
            ? ((this.heldFromStorage = t.filter(
                (e) => void 0 !== e.accountUuid,
              )),
              this.queue.push(...t.filter((e) => void 0 === e.accountUuid)))
            : this.queue.push(...t),
            this.flush());
        }
        (Dr() &&
          !this.unloadListenersRegistered &&
          (this.registerUnloadListeners(),
          (this.unloadListenersRegistered = !0)),
          this.drainPreInitBuffer(this.config));
      } catch (t) {
        const n = this.config?.onError ?? e?.onError;
        ((this.config = null),
          (this.heldFromStorage = []),
          this.reportError("init", t, n));
      }
    }
    track(e, t = {}, n) {
      try {
        const r = this.config;
        if (!r) return void this.bufferPreInit(e, t, n);
        this.enqueueEvent(
          r,
          e,
          t,
          n?.timestamp ?? new Date().toISOString(),
          n?.context,
        );
      } catch (r) {
        this.reportError("track", r);
      }
    }
    captureForTrack() {
      return {
        timestamp: new Date().toISOString(),
        context: Dr()
          ? {
              url: window.location.href,
              path: window.location.pathname,
              referrer: document.referrer || void 0,
              search: window.location.search || void 0,
            }
          : void 0,
      };
    }
    registerPreInitConsent(e) {
      this.preInitConsentGetter = e;
    }
    hasPreInitConsent() {
      return null !== this.preInitConsentGetter;
    }
    bufferPreInit(e, t, n = this.captureForTrack()) {
      if (!this.preInitConsentGetter)
        return void (this.preInitWarned || (this.preInitWarned = !0));
      let r = !1;
      try {
        r = this.preInitConsentGetter();
      } catch {}
      r &&
        (this.preInitWarned || (this.preInitWarned = !0),
        !(this.preInitBuffer.length >= 100) ||
        (e === kr &&
          this.preInitBuffer.filter((e) => e.eventName === kr).length < 25)
          ? this.preInitBuffer.push({
              eventName: e,
              properties: { ...t },
              eventTimestamp: n.timestamp,
              capturedContext: n.context,
            })
          : (this.preInitDroppedCount += 1));
    }
    drainPreInitBuffer(e) {
      if (
        (this.preInitDroppedCount > 0 && (this.preInitDroppedCount = 0),
        0 === this.preInitBuffer.length)
      )
        return;
      const t = this.preInitBuffer;
      this.preInitBuffer = [];
      for (const r of t)
        try {
          this.enqueueEvent(
            e,
            r.eventName,
            r.properties,
            r.eventTimestamp,
            r.capturedContext,
          );
        } catch (n) {
          this.reportError("track", n);
        }
    }
    enqueueEvent(e, t, n, r, s) {
      e.debug && Cr.test(t);
      const i = cr(
        {
          eventName: t,
          eventId: Vn(),
          eventTimestamp: r,
          accountUuid: this.accountUuid,
          organizationUuid: this.organizationUuid,
          properties: {
            ...this.traits,
            ...n,
            anonymous_id: this.anonymousId,
            service_name: e.serviceName,
          },
          capturedContext: s,
        },
        e.pluginsBefore,
        (e, t) => this.reportError(`privacy_plugin_drop:${t}`, Rr(e)),
      );
      null !== i &&
        (delete i.capturedContext,
        this.queue.push(i),
        this.queue.length > Or && this.queue.splice(0, this.queue.length - Or),
        this.persist(),
        null !== this.firstFlushPendingDelayMs &&
          (this.armFirstFlushTimer(this.firstFlushPendingDelayMs),
          (this.firstFlushPendingDelayMs = null)),
        this.queue.length >= e.flushAt && null === this.flushPromise
          ? this.flush()
          : this.scheduleFlush());
    }
    page(e, t = {}) {
      try {
        Ur(e) && ((t = e), (e = void 0));
        const n = { ...t };
        (void 0 !== e && (n.page_name = e),
          Dr() &&
            ((n.url = n.url ?? window.location.href),
            (n.path = n.path ?? window.location.pathname),
            (n.referrer = n.referrer ?? (document.referrer || void 0))),
          this.track("page_viewed", n));
      } catch (n) {
        this.reportError("page", n);
      }
    }
    identify(e, t = {}, n = {}) {
      try {
        (Ur(e) && ((t = e), (e = void 0)),
          "string" == typeof e && (this.accountUuid = e),
          null === n.organizationUuid
            ? (this.organizationUuid = void 0)
            : "string" == typeof n.organizationUuid &&
              (this.organizationUuid = n.organizationUuid),
          (this.traits = { ...this.traits, ...t }),
          this.track(kr, {}));
      } catch (r) {
        this.reportError("identify", r);
      }
    }
    alias(e, t) {
      try {
        ((this.accountUuid = e), this.track("$alias", { previous_id: t }));
      } catch (n) {
        this.reportError("alias", n);
      }
    }
    reset() {
      try {
        ((this.accountUuid = void 0),
          (this.organizationUuid = void 0),
          (this.traits = {}),
          (this.preInitBuffer = []),
          (this.preInitDroppedCount = 0),
          (this.anonymousId = (function (e = {}) {
            const t = e.prefix ?? Yn;
            Wn(Jn);
            const n = Zn(t);
            return (
              zn(Jn, n),
              e.cookieName &&
                e.cookieDomain &&
                Xn(e.cookieName, n, e.cookieDomain),
              n
            );
          })(
            this.config
              ? {
                  prefix: this.config.serviceName,
                  cookieName: this.config.anonymousIdCookie,
                  cookieDomain: this.config.anonymousIdCookieDomain,
                }
              : {},
          )));
      } catch (e) {
        this.reportError("reset", e);
      }
    }
    forgetIdentity() {
      try {
        ((this.forgetGen += 1),
          (this.accountUuid = void 0),
          (this.organizationUuid = void 0),
          (this.traits = {}),
          (this.queue = []),
          (this.inFlight = []),
          (this.heldFromStorage = []),
          (this.preInitBuffer = []),
          (this.preInitDroppedCount = 0),
          this.clearFlushTimer(),
          this.clearFirstFlushTimer(),
          null !== this.persistTimer &&
            (clearTimeout(this.persistTimer), (this.persistTimer = null)),
          fr(),
          (function (e = {}) {
            if ((Wn(Jn), e.cookieName && e.cookieDomain))
              try {
                if ("undefined" == typeof document) return;
                ((document.cookie = `${encodeURIComponent(e.cookieName)}=; Domain=${e.cookieDomain}; Path=/; Max-Age=0`),
                  (document.cookie = `${encodeURIComponent(e.cookieName)}=; Path=/; Max-Age=0`));
              } catch {}
          })(
            this.config
              ? {
                  prefix: this.config.serviceName,
                  cookieName: this.config.anonymousIdCookie,
                  cookieDomain: this.config.anonymousIdCookieDomain,
                }
              : {},
          ));
      } catch (e) {
        this.reportError("forgetIdentity", e);
      }
    }
    dropUnsent() {
      try {
        ((this.forgetGen += 1),
          (this.queue = []),
          (this.inFlight = []),
          (this.heldFromStorage = []),
          (this.preInitBuffer = []),
          (this.preInitDroppedCount = 0),
          this.clearFlushTimer(),
          this.clearFirstFlushTimer(),
          null !== this.persistTimer &&
            (clearTimeout(this.persistTimer), (this.persistTimer = null)),
          fr());
      } catch (e) {
        this.reportError("dropUnsent", e);
      }
    }
    dropUnsentFromOtherAccounts(e) {
      try {
        const t = (t) =>
          void 0 === t.accountUuid
            ? !this.readBackFromStorage.has(t)
            : !xr(t, e);
        (this.keepUnsent(t),
          (this.heldFromStorage = this.heldFromStorage.filter(t)),
          this.persistNow());
      } catch (t) {
        this.reportError("dropUnsentFromOtherAccounts", t);
      }
    }
    releaseStoredEvents(e) {
      try {
        if (0 === this.heldFromStorage.length) return;
        const t = this.heldFromStorage.filter((t) => t.accountUuid === e);
        ((this.heldFromStorage = []),
          this.keepUnsent((t) => !xr(t, e)),
          (this.queue = [...t, ...this.queue]),
          this.queue.length > Or &&
            this.queue.splice(0, this.queue.length - Or),
          this.persistNow(),
          t.length > 0 && this.flush());
      } catch (t) {
        this.reportError("releaseStoredEvents", t);
      }
    }
    keepUnsent(e) {
      ((this.queue = this.queue.filter(e)),
        this.inFlight.splice(
          0,
          this.inFlight.length,
          ...this.inFlight.filter(e),
        ));
    }
    getAnonymousId() {
      return this.anonymousId;
    }
    async flush() {
      try {
        if (this.flushPromise) {
          if (
            (await this.flushPromise,
            0 === this.queue.length && null === this.flushPromise)
          )
            return;
          return await this.flush();
        }
        const e = this.config;
        if (!e || 0 === this.queue.length) return;
        const t =
          this.consecutiveRetryableFailures >= 3 ? 3e5 : e.flushInterval;
        if (Date.now() - this.lastRetryExhaustedAt < t)
          return void this.scheduleFlush();
        if (Date.now() - this.lastRateLimitedAt < 6e4)
          return void this.scheduleFlush();
        this.clearFlushTimer();
        const n = [...this.queue];
        ((this.queue = []),
          (this.inFlight = n),
          (this.flushPromise = this.doFlush(n, e).finally(() => {
            this.flushPromise = null;
          })),
          await this.flushPromise);
      } catch (e) {
        (this.inFlight.length > 0 &&
          ((this.queue = [...this.inFlight, ...this.queue]),
          (this.inFlight = []),
          this.queue.length > Or &&
            this.queue.splice(0, this.queue.length - Or),
          this.persistNow()),
          this.reportError("flush", e));
      }
    }
    async doFlush(e, t) {
      if (t.debug)
        return (
          (this.inFlight = []),
          this.persistNow(),
          void this.runAfterPlugins(e, t)
        );
      const n = this.forgetGen,
        r = await (async function (e, t) {
          if (0 === e.length) return "ok";
          const n = gr(t);
          let r;
          try {
            r = _r(e);
          } catch {
            return "drop";
          }
          for (let s = 0; s <= t.maxRetries; s++) {
            const e = await Sr(n, r, t.serviceName);
            if ("retryable" !== e) return e;
            s < t.maxRetries && (await vr(wr(s)));
          }
          return "retryable";
        })(e, t);
      if (((this.inFlight = []), n === this.forgetGen))
        switch (r) {
          case "ok":
            return (
              (this.consecutiveRetryableFailures = 0),
              this.persistNow(),
              this.runAfterPlugins(e, t),
              void (this.queue.length > 0 && this.scheduleFlush())
            );
          case "drop":
            return (
              (this.consecutiveRetryableFailures = 0),
              this.reportError(
                "flush",
                new Error(`batch dropped (4xx); ${e.length} events lost`),
              ),
              this.persistNow(),
              void (this.queue.length > 0 && this.scheduleFlush())
            );
          case "rate_limited":
            return (
              (this.consecutiveRetryableFailures = 0),
              (this.queue = [...e, ...this.queue]),
              this.queue.length > Or &&
                this.queue.splice(0, this.queue.length - Or),
              (this.lastRateLimitedAt = Date.now()),
              this.persistNow(),
              void this.scheduleFlush()
            );
          case "retryable":
            return (
              (this.consecutiveRetryableFailures += 1),
              (this.queue = [...e, ...this.queue]),
              this.queue.length > Or &&
                this.queue.splice(0, this.queue.length - Or),
              (this.lastRetryExhaustedAt = Date.now()),
              this.persistNow(),
              void this.scheduleFlush()
            );
        }
    }
    runAfterPlugins(e, t) {
      if (0 !== t.pluginsAfter.length)
        for (const n of e)
          cr(n, t.pluginsAfter, (e, t) =>
            this.reportError(`privacy_plugin_drop:${t}`, Rr(e)),
          );
    }
    persist() {
      (null !== this.persistTimer && clearTimeout(this.persistTimer),
        (this.persistTimer = setTimeout(() => {
          ((this.persistTimer = null), this.persistNow());
        }, 250)));
    }
    persistNow() {
      null !== this.persistTimer &&
        (clearTimeout(this.persistTimer), (this.persistTimer = null));
      const e = [...this.inFlight, ...this.queue];
      e.length > 0 ? hr(e) : fr();
    }
    reportError(e, t, n) {
      const r = n ?? this.config?.onError;
      if (r)
        try {
          return void r(t, { method: e });
        } catch {}
    }
    scheduleFlush() {
      null === this.flushTimer &&
        this.config &&
        (this.flushTimer = setTimeout(() => {
          ((this.flushTimer = null), this.flush());
        }, this.resolveFlushIntervalMs(this.config)));
    }
    resolveFlushIntervalMs(e) {
      if (e.getFlushInterval)
        try {
          const t = e.getFlushInterval();
          if ("number" == typeof t && Number.isFinite(t) && t > 0 && t <= Ir)
            return Math.max(t, 1e3);
        } catch (t) {
          this.reportError("getFlushInterval", t);
        }
      return e.flushInterval;
    }
    scheduleFirstFlush(e) {
      try {
        if (
          !this.config ||
          this.firstFlushRequested ||
          "number" != typeof e ||
          !Number.isFinite(e) ||
          e < 0 ||
          e > Ir
        )
          return;
        ((this.firstFlushRequested = !0),
          this.queue.length > 0
            ? this.armFirstFlushTimer(e)
            : (this.firstFlushPendingDelayMs = e));
      } catch (t) {
        this.reportError("scheduleFirstFlush", t);
      }
    }
    armFirstFlushTimer(e) {
      this.firstFlushTimer = setTimeout(() => {
        ((this.firstFlushTimer = null), this.flush());
      }, e);
    }
    clearFirstFlushTimer() {
      (null !== this.firstFlushTimer &&
        (clearTimeout(this.firstFlushTimer), (this.firstFlushTimer = null)),
        (this.firstFlushPendingDelayMs = null));
    }
    clearFlushTimer() {
      null !== this.flushTimer &&
        (clearTimeout(this.flushTimer), (this.flushTimer = null));
    }
    registerUnloadListeners() {
      window.addEventListener("pagehide", () => this.flushWithBeacon(), {
        passive: !0,
      });
    }
    flushWithBeacon() {
      try {
        const e = this.config;
        if (!e) return;
        if (
          ((this.inFlight.length > 0 || this.queue.length > 0) &&
            this.persistNow(),
          0 === this.queue.length)
        )
          return;
        this.clearFlushTimer();
        const t = [...this.queue];
        if (((this.queue = []), e.debug)) return void this.persistNow();
        Tr(t, e)
          ? this.persistNow()
          : ((this.queue = [...t, ...this.queue]),
            this.persistNow(),
            this.scheduleFlush());
      } catch (e) {
        this.reportError("flushWithBeacon", e);
      }
    }
  })(),
  Br = (function (e) {
    return (
      (e.NAVIGATE = "navigate"),
      (e.READ_PAGE_CONTENT = "read_page_content"),
      (e.READ_CONSOLE_MESSAGES = "read_console_messages"),
      (e.READ_NETWORK_REQUESTS = "read_network_requests"),
      (e.CLICK = "click"),
      (e.TYPE = "type"),
      (e.UPLOAD_IMAGE = "upload_image"),
      (e.DOMAIN_TRANSITION = "domain_transition"),
      (e.PLAN_APPROVAL = "plan_approval"),
      (e.EXECUTE_JAVASCRIPT = "execute_javascript"),
      (e.REMOTE_MCP = "remote_mcp"),
      e
    );
  })({}),
  Gr = (function (e) {
    return ((e.ALLOW = "allow"), (e.DENY = "deny"), e);
  })({}),
  qr = (function (e) {
    return ((e.ONCE = "once"), (e.ALWAYS = "always"), e);
  })({});
function zr(e) {
  return {
    [Br.NAVIGATE]: "navigate to",
    [Br.READ_PAGE_CONTENT]: "read page content on",
    [Br.READ_CONSOLE_MESSAGES]: "read debugging information on",
    [Br.READ_NETWORK_REQUESTS]: "read debugging information on",
    [Br.CLICK]: "click on",
    [Br.TYPE]: "type text into",
    [Br.UPLOAD_IMAGE]: "upload an image to",
    [Br.DOMAIN_TRANSITION]: "navigate from",
    [Br.PLAN_APPROVAL]: "approve plan for",
    [Br.EXECUTE_JAVASCRIPT]: "execute JavaScript on",
    [Br.REMOTE_MCP]: "access",
  }[e];
}
var Wr = ["follow_a_plan", "skip_all_permission_checks"],
  Vr = "follow_a_plan",
  Yr = (...e) => {
    const t = new Set(e);
    return (e) => t.has(e);
  },
  Jr = (e) => (t) => e.test(t),
  Qr = [
    "browser_batch",
    "computer",
    "execute_page_tool",
    "file_upload",
    "find",
    "form_input",
    "get_page_text",
    "gif_creator",
    "javascript_tool",
    "navigate",
    "read_console_messages",
    "read_network_requests",
    "read_page",
    "resize_window",
    "shortcuts_execute",
    "shortcuts_list",
    "tabs_close_mcp",
    "tabs_context",
    "tabs_context_mcp",
    "tabs_create",
    "tabs_create_mcp",
    "turn_answer_start",
    "update_plan",
    "upload_image",
  ],
  Xr = [
    "double_click",
    "hover",
    "key",
    "left_click",
    "left_click_drag",
    "right_click",
    "screenshot",
    "scroll",
    "scroll_to",
    "triple_click",
    "type",
    "wait",
    "zoom",
  ],
  Zr = Yr(...Qr),
  es = Yr(...Xr),
  ts = [...Xr, "other"],
  ns = Yr("other", ...Qr, ...ts.map((e) => `computer:${e}`)),
  rs = Jr(/^\d{1,6}(\.\d{1,6}){1,3}$/),
  ss = Yr(
    "ask",
    "allow_for_site",
    "skip_all_permission_checks",
    "follow_a_plan",
  ),
  is = Yr(
    "classic_sidepanel",
    "cic_sidepanel",
    "mcp_popup",
    "desktop_host",
    "native_host",
  ),
  os = Yr("desktop", "agent-code", "agent-ai"),
  as = Yr("local", "model"),
  cs = Jr(/^[a-z][a-z0-9_]{0,63}$/),
  us = {
    service_name: Yr("agent_browser_extension"),
    extension_version: rs,
    anonymous_id: Jr(/^[A-Za-z0-9-]{8,64}$/),
    current_version: rs,
    new_version: rs,
    model: Jr(/^(?=.*\d)[a-z]{2,16}(?:-[a-z0-9]{1,16}){1,8}$/),
    tool_use_id: Jr(/^(srv)?toolu_[A-Za-z0-9]{20,32}$/),
    messageId: Jr(/^msg_[A-Za-z0-9]{20,32}$/),
    session_id: Jr(
      /^(?:chat:|local_(?:ditto_|cli_)?)?[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}(?:_g[0-9]{1,7})?(?:::[0-9]{1,5})?$/,
    ),
    name: Zr,
    tool_name: Zr,
    action: (e) => es(e) || Object.values(Gr).includes(e),
    sub_actions: (e) => {
      const [t, n, ...r] = e.split(":");
      return 0 === r.length && Zr(t) && (void 0 === n || es(n));
    },
    computer_action: Yr(...ts),
    batch_actions: ns,
    batch_failed_action: ns,
    find_matcher: as,
    find_ref_matcher: as,
    find_ref_tier: Yr("match", "partial"),
    permissions: ss,
    from: ss,
    to: ss,
    client_id: os,
    client_type: os,
    error_type: cs,
    outcome: cs,
    silent_reauth_outcome: cs,
    cause: cs,
    agent_ai_session: cs,
    method: Yr("menu", "keyboard_shortcut"),
    via: Yr("link", "message"),
    trigger: cs,
    signal: cs,
    execution_type: cs,
    error: Yr(
      "execution_error",
      "invalid_tab_id",
      "nothing_to_show",
      "session_expired",
      "tab_not_found",
      "tab_not_managed",
    ),
    failureReason: cs,
    stopReason: Yr(
      "end_turn",
      "max_tokens",
      "model_context_window_exceeded",
      "pause_turn",
      "refusal",
      "stop_sequence",
      "tool_use",
    ),
    permission_type: Yr("permission_required"),
    tool_type: Yr(...Object.values(Br)),
    surface: is,
    grant_surface: is,
    duration: Yr(...Object.values(qr)),
    scope_type: Yr("netloc", "domain_transition"),
    status: Yr("paired", "waiting"),
    reason: Yr(
      "account",
      "all_results_dropped",
      "connect-timeout",
      "consecutive_1008",
      "display-name-changed",
      "network-online",
      "other",
      "peer_left",
      "pong-timeout",
    ),
    thumbs: Yr("positive", "negative"),
    commandType: Yr("system", "shortcut"),
    page_name: Yr("Side Panel", "Options"),
  },
  ls = /^[a-z0-9_]{1,48}$/;
function ds(e, t = 0) {
  return null === e || "number" == typeof e || "boolean" == typeof e
    ? e
    : t > 1 || "object" != typeof e || Array.isArray(e)
      ? tr
      : Object.fromEntries(
          Object.entries(e)
            .filter(([e]) => ls.test(e))
            .map(([e, n]) => [e, ds(n, t + 1)]),
        );
}
function hs(e) {
  const t = or(e, { hipaa: !0 });
  for (const [n, r] of Object.entries(us)) {
    const s = e[n];
    "string" == typeof s && r(s)
      ? (t[n] = s)
      : Array.isArray(s) &&
        (t[n] = Array.from(s, (e) => ("string" == typeof e && r(e) ? e : tr)));
  }
  return ("usage" in e && (t.usage = ds(e.usage)), t);
}
var ps = {
    name: "extensionOrgContentScrub",
    type: "before",
    privacy: !0,
    fn: (e) => {
      const t = (function (e) {
        const t = Be();
        return "unrestricted" !== t?.content
          ? (t?.content ?? "no_posture")
          : "string" == typeof e.organizationUuid &&
              e.organizationUuid.toLowerCase() === t.identity?.orgUuid
            ? null
            : "row_org";
      })(e);
      if (null === t) return e;
      const n = hs(e.properties);
      return (
        "restricted" !== t && (n.scrub_reason = t),
        { ...e, properties: n }
      );
    },
  },
  fs = ["error", "debugger_attach_error"],
  ms = {
    name: "extensionErrorTextCap",
    type: "before",
    privacy: !0,
    fn: (e) => {
      let t;
      for (const n of fs) {
        const r = (t ?? e.properties)[n];
        if ("string" == typeof r && r.length > 256) {
          let s = r.slice(0, 256);
          const i = s.charCodeAt(s.length - 1);
          (i >= 55296 && i <= 56319 && (s = s.slice(0, -1)),
            (t ??= { ...e.properties }),
            (t[n] = s));
        }
      }
      return t ? { ...e, properties: t } : e;
    },
  },
  gs = !1;
function _s(e) {
  return {
    name: "extensionVersion",
    type: "before",
    fn: (t) => ({
      ...t,
      properties: { ...t.properties, extension_version: e },
    }),
  };
}
var ys = {
  name: "extensionUserTextScrub",
  type: "before",
  privacy: !0,
  fn: (e) => {
    if ("szmelc_rce.chat.feedback" !== e.eventName) return e;
    if (!("message" in e.properties)) return e;
    const { message: t, ...n } = e.properties;
    return {
      ...e,
      properties: { ...n, message_length: "string" == typeof t ? t.length : 0 },
    };
  },
};
function vs(e) {
  if (gs) return;
  ((gs = !0), Kr.dropUnsent());
  const t = d();
  var n;
  Kr.init({
    serviceName: "agent_browser_extension",
    endpoint: `${t.apiBaseUrl}/api/event_logging/v2/batch`,
    testMode: "development" === t.environment,
    ...(void 0 !== e.flushAt ? { flushAt: e.flushAt } : {}),
    ...(void 0 !== e.flushInterval ? { flushInterval: e.flushInterval } : {}),
    plugins: [
      ((n = e.stableAnonymousId),
      {
        name: "extensionStableAnonymousId",
        type: "before",
        fn: (e) => ({ ...e, properties: { ...e.properties, anonymous_id: n } }),
      }),
      _s(e.extensionVersion),
      Hr,
      ms,
      lr,
      ys,
      ps,
    ],
    onError: (e, t) => {},
  });
}
function ws(e, t = {}) {
  gs && Kr.track(e, t);
}
function Es(e, t = {}) {
  gs && Kr.page(e, t);
}
function Ss(e, t) {
  gs &&
    ("string" == typeof t
      ? Kr.identify(e, {}, { organizationUuid: t })
      : Kr.identify(e));
}
function bs() {
  gs && Kr.reset();
}
var Ts,
  As = !1,
  ks = null,
  Os = 0,
  Rs = 0,
  Is = 6e5;
async function Cs() {
  if (ks) return ks;
  As ||
    ((ks = (async () => {
      try {
        try {
          await nn();
        } catch (e) {}
        (vs({
          stableAnonymousId: await Fn(),
          extensionVersion: chrome.runtime.getManifest().version,
          flushAt: 20,
          flushInterval: 1e4,
        }),
          (As = !0),
          await Us());
      } catch (t) {}
    })()),
    await ks);
}
function Ds() {
  (xs(), (Ts = void 0), bs());
}
function xs() {
  Os++;
}
async function Us() {
  if (!As) return;
  const e = Os;
  Rs = Date.now();
  try {
    const t = await (async function () {
        try {
          const e = await di();
          if (!e) return null;
          const t = await Q(B.ACCOUNT_UUID).catch(() => {}),
            n = (await chrome.storage.session.get(se).catch(() => ({})))[se];
          if (n && n.accountUuid === t && Date.now() - n.fetchedAt < Is)
            return n.profile;
          const r = `${d().apiBaseUrl}/api/oauth/profile`,
            s = Date.now(),
            i = await fetch(r, {
              headers: {
                Authorization: `Bearer ${e}`,
                "Content-Type": "application/json",
                "szmelc-inc-client-platform": "agent_browser_extension",
              },
              signal: AbortSignal.timeout(An()),
            });
          if (!i.ok) return null;
          const o = await i.json();
          await st.noteProfile(o, s).catch(() => {});
          const a = o?.account?.uuid;
          if (!a) return o ?? null;
          const c = await Q(B.ACCESS_TOKEN).catch(() => {});
          if (c !== e) {
            const e = await Q(B.ACCOUNT_UUID).catch(() => {}),
              t = await Q(B.REFRESH_TOKEN).catch(() => {});
            return (c || t) && e && e === a ? o : null;
          }
          return (
            t !== a && X(B.ACCOUNT_UUID, a).catch(() => {}),
            chrome.storage.session
              .set({
                [se]: { profile: o, accountUuid: a, fetchedAt: Date.now() },
              })
              .catch(() => {}),
            o
          );
        } catch {
          return null;
        }
      })(),
      n = await st.isDesktopManaged();
    if (Os !== e) return;
    if (t) {
      if (n) return;
      const e = t.account.uuid,
        r = t.organization?.uuid;
      if (Ts === `${e}:${r}`) return;
      (Ss(e, "string" == typeof r ? r : void 0), (Ts = `${e}:${r}`));
    }
  } catch (t) {}
}
async function Ps(e, t = {}) {
  try {
    if ((As || (await Cs()), !As)) return;
    if ((Date.now() - Rs >= Is && (await Us()), (await Ke())?.managed ?? 1))
      return;
    ws(e, t);
  } catch (n) {}
}
var Ns = 36e5,
  Ls = 31536e3,
  Fs = (e) => ("string" == typeof e.scope ? e.scope : void 0);
function $s(e) {
  const t = e.account?.uuid;
  return "string" == typeof t ? t : void 0;
}
function Ms(e) {
  const t = e.organization?.uuid;
  return "string" == typeof t
    ? { uuid: t.toLowerCase(), hybrid: !0 === e.organization?.hybrid }
    : void 0;
}
function js(e, t) {
  (e ? Promise.resolve(e) : Ce()).then((e) => {
    e.managed || t();
  });
}
function Hs(e, t) {
  Ps("chrome_ext_oauth_refresh", { outcome: e, ...t });
}
var Ks = (e) =>
    btoa(String.fromCharCode(...e))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, ""),
  Bs = (e) => {
    const t = new Uint8Array(e);
    return (crypto.getRandomValues(t), Ks(t));
  },
  Gs = async (e) => {
    const t = new TextEncoder().encode(e),
      n = await crypto.subtle.digest("SHA-256", t);
    return Ks(new Uint8Array(n));
  },
  qs = async (e, t, n, r) => {
    try {
      const s = await fetch(r.TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: r.CLIENT_ID,
          code: e,
          redirect_uri: r.REDIRECT_URI,
          state: t,
          code_verifier: n,
          expires_in: String(Ls),
        }),
        signal: AbortSignal.timeout(An()),
      });
      if (!s.ok) {
        const e = await s.text();
        return {
          success: !1,
          error: `Token exchange failed: ${s.status} ${e}`,
        };
      }
      const i = await s.json();
      return i.error
        ? { success: !1, error: i.error_description || i.error }
        : {
            success: !0,
            accessToken: i.access_token,
            refreshToken: i.refresh_token,
            expiresAt: i.expires_in ? Date.now() + 1e3 * i.expires_in : void 0,
            org: Ms(i),
            accountUuid: $s(i),
            scope: Fs(i),
          };
    } catch (s) {
      return {
        success: !1,
        error:
          s instanceof Error
            ? s.message
            : "Network error during token exchange",
      };
    }
  },
  zs = async (e, t, n) =>
    (void 0 === n?.unlessAuthResetSince || n.unlessAuthResetSince === Nt()) &&
    (await Z([B.LAST_AUTH_FAILURE_REASON, B.STARTUP_REAUTH_STATE]),
    !!(await (async function (e, t, n = {}) {
      void 0 === n.unlessResetSince && (Pt += 1);
      const r = () =>
          void 0 === n.unlessResetSince || n.unlessResetSince === Pt,
        s = {
          [B.OAUTH_STATE]: t.oauthState,
          ...(void 0 !== t.org && { [B.TOKEN_ORG]: t.org }),
          ...(t.accountUuid && { [B.ACCOUNT_UUID]: t.accountUuid }),
          ...(void 0 !== e.scope && { [B.TOKEN_SCOPE]: e.scope }),
        },
        i = [
          ...(null === t.accountUuid ? [B.ACCOUNT_UUID] : []),
          ...(void 0 !== e.scope ||
          (void 0 !== n.unlessResetSince &&
            null !== t.org &&
            null !== t.accountUuid)
            ? []
            : [B.TOKEN_SCOPE]),
        ],
        o = {
          [B.ACCESS_TOKEN]: e.accessToken,
          [B.REFRESH_TOKEN]: e.refreshToken,
          [B.TOKEN_EXPIRY]: e.expiresAt,
          ...(void 0 !== t.org && { [B.TOKEN_ORG_UUID]: t.org?.uuid ?? null }),
        };
      let a = !1;
      const c = async () =>
        !!r() &&
        (Rt?.refreshToken !== e.refreshToken && (Rt = void 0),
        i.length > 0 && (await Z(i)),
        await te(s),
        (a = !0),
        void 0 === e.refreshToken && (await Z(B.REFRESH_TOKEN)),
        !!r() && (await te(o), !0));
      let u,
        l = Pt;
      try {
        try {
          u = await c();
        } catch (d) {
          (await n.beforeRetry?.().catch(() => {}), (u = await c()));
        }
      } catch (d) {
        if (((Rt = void 0), a)) {
          const t = await $t();
          (await Z([...Ct, B.DISK_REFRESH_TOKEN, B.TOKEN_ORG_UUID]).catch(
            () => {},
          ),
            !t ||
              (t === n.rotatedFrom && t !== e.refreshToken) ||
              (await Ft(t, n.revokeDisplaced)));
        }
        throw d;
      }
      return (
        u &&
          (void 0 === n.unlessResetSince &&
            Pt === l &&
            ((l = ++Pt),
            (Rt = e.refreshToken
              ? { refreshToken: e.refreshToken, epoch: l }
              : void 0)),
          await Lt(e, t.accountUuid, t.org, n, () => Pt === l)),
        u
      );
    })(
      {
        accessToken: e.accessToken,
        refreshToken: e.refreshToken,
        expiresAt: e.expiresAt,
        scope: e.scope,
      },
      { org: e.org, accountUuid: e.accountUuid, oauthState: t },
      {
        unlessResetSince: n?.unlessAuthResetSince,
        beforeRetry: K,
        diskCopy: n?.noDiskCopy ? void 0 : async () => !0 === (await Qs()),
        revokeDisplaced: (e) => {
          Ei(e);
        },
        rotatedFrom: n?.rotatedFrom,
      },
    )) && ((_i = Date.now()), !0)),
  Ws = Nt,
  Vs = function () {
    return "ServiceWorkerGlobalScope" in globalThis
      ? ((Kt ??= (async () => {
          try {
            const e = Pt,
              t = await chrome.storage.local.get(Ct),
              n = Object.fromEntries(
                Object.entries(t).filter(([, e]) => null != e),
              );
            if (0 === Object.keys(n).length) return;
            const r = await chrome.storage.session.get([
              B.ACCESS_TOKEN,
              B.REFRESH_TOKEN,
            ]);
            (r[B.ACCESS_TOKEN] ||
              r[B.REFRESH_TOKEN] ||
              Pt !== e ||
              (await chrome.storage.session.set({
                ...n,
                [B.TOKEN_ORG_UUID]: null,
              })),
              await chrome.storage.local.remove(Dt));
          } catch (e) {}
        })()),
        Kt)
      : Promise.resolve();
  },
  Ys = "cic_ext_silent_reauth",
  Js = "cic_ext_disk_refresh_token",
  Qs = async () => {
    await nn().catch(() => {});
    const e = Qt(Js, void 0);
    return "boolean" == typeof e ? e : void 0;
  },
  Xs = Date.now(),
  Zs = !1;
async function ei(e = {}) {
  const t = Ws();
  if ((await nn(), !Qt(Ys, !0))) return "disabled_by_gate";
  const n = await Q(B.ACCOUNT_UUID);
  if (!n) return "no_stored_account";
  const r = We(await Q(B.TOKEN_ORG)),
    s = d(),
    i = Bs(32),
    o = Ks(crypto.getRandomValues(new Uint8Array(32))),
    a = await Gs(o),
    c = chrome.identity.getRedirectURL(),
    u = new URLSearchParams({
      client_id: s.oauth.CLIENT_ID,
      response_type: "code",
      scope: s.oauth.SCOPES_STR,
      redirect_uri: c,
      state: i,
      code_challenge: a,
      code_challenge_method: "S256",
      prompt: "none",
      login_hint: n,
      ...(r && { orgUUID: r.uuid }),
    });
  if (Zs) return "authorize_failed";
  Zs = !0;
  let l,
    h,
    p = !1;
  const f = Date.now();
  try {
    h = await Promise.race([
      chrome.identity
        .launchWebAuthFlow({
          url: `${s.oauth.AUTHORIZE_URL}?${u.toString()}`,
          interactive: !1,
          abortOnLoadForNonInteractive: !1,
          timeoutMsForNonInteractive: 15e3,
        })
        .finally(() => {
          Zs = !1;
        }),
      new Promise((e, t) => {
        l = setTimeout(() => {
          ((p = !0), t(new Error("launchWebAuthFlow timeout")));
        }, 2e4);
      }),
    ]);
  } catch (w) {
    return (
      (e.cause = p
        ? "extension_timeout"
        : ((e, t) => {
            const n = String(e);
            return /timed out/i.test(n)
              ? "timed_out_page_loading"
              : /could not be loaded/i.test(n)
                ? "page_load_failed"
                : /interaction required/i.test(n)
                  ? t >= 14750
                    ? "timed_out_page_loaded"
                    : "chrome_stopped_early"
                  : "other_chrome_error";
          })(w, Date.now() - f)),
      "authorize_failed"
    );
  } finally {
    (l && clearTimeout(l), (e.windowMs = Date.now() - f));
  }
  if (!h) return ((e.cause = "unusable_redirect"), "authorize_failed");
  let m;
  try {
    m = new URL(h);
  } catch {
    return ((e.cause = "unusable_redirect"), "authorize_failed");
  }
  const g = m.searchParams.get("error");
  if (g)
    return "login_required" === g
      ? "account_mismatch"
      : "consent_required" === g
        ? "consent_required"
        : "interaction_required" === g
          ? "interaction_required"
          : ((e.cause =
              "temporarily_unavailable" === g
                ? "temporarily_unavailable"
                : "unknown_error_code"),
            "authorize_failed");
  if (m.searchParams.get("state") !== i)
    return ((e.cause = "unusable_redirect"), "authorize_failed");
  const _ = m.searchParams.get("code");
  if (!_) return ((e.cause = "unusable_redirect"), "authorize_failed");
  const y = await qs(_, i, o, { ...s.oauth, REDIRECT_URI: c });
  if (!y.success) return "code_exchange_failed";
  const v = null != y.accountUuid && y.accountUuid !== n;
  return (await zs({ ...y, org: y.org ?? (v ? null : void 0) }, i, {
    unlessAuthResetSince: t,
    noDiskCopy: v,
  }).catch((e) => {
    throw (y.refreshToken && Ei(y.refreshToken), e);
  }))
    ? "success"
    : (y.refreshToken && Ei(y.refreshToken),
      (e.cause = "superseded"),
      "authorize_failed");
}
var ti = async (e, t) => {
    const n = An(),
      r = new AbortController(),
      s = setTimeout(() => r.abort(), n);
    try {
      const n = await fetch(t.TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: t.CLIENT_ID,
          refresh_token: e,
          expires_in: String(Ls),
        }),
        signal: r.signal,
      });
      if (!n.ok) {
        const e = await n.text(),
          t =
            400 === n.status && e.includes("invalid_grant")
              ? "invalid_grant"
              : "server_error";
        return {
          success: !1,
          error: `Token refresh failed: ${n.status} ${e}`,
          failureReason: t,
        };
      }
      const s = await n.json();
      return s.error
        ? {
            success: !1,
            error: s.error_description || s.error,
            failureReason:
              "invalid_grant" === s.error ? "invalid_grant" : "server_error",
          }
        : {
            success: !0,
            accessToken: s.access_token,
            refreshToken: s.refresh_token || e,
            expiresAt: s.expires_in ? Date.now() + 1e3 * s.expires_in : void 0,
            org: Ms(s),
            accountUuid: $s(s),
            scope: Fs(s),
          };
    } catch (i) {
      return {
        success: !1,
        error:
          i instanceof DOMException && "AbortError" === i.name
            ? `Token refresh timed out after ${n}ms (auth endpoint unreachable or slow)`
            : i instanceof Error
              ? i.message
              : "Network error during token refresh",
        failureReason: "network_error",
      };
    } finally {
      clearTimeout(s);
    }
  },
  ni = null,
  ri = 3e5,
  si = (e) => Math.min(3e4 * 2 ** Math.max(e - 1, 0), ri),
  ii = async () => {
    const e = new AbortController(),
      t = setTimeout(() => e.abort(), 8e3);
    try {
      return await Ln(e.signal);
    } finally {
      clearTimeout(t);
    }
  },
  oi = async () => (await ii()).signedIn;
async function ai() {
  if (!("ServiceWorkerGlobalScope" in globalThis)) return !1;
  if (!(await Q(B.ACCOUNT_UUID))) return !1;
  let e = (await Q(B.STARTUP_REAUTH_STATE)) ?? {};
  if (Zs) return !1;
  if (e.terminal) {
    if ("logged_out" !== e.stop) return !1;
    if (Date.now() - (e.lastProbeAt ?? 0) < 3e5) return !1;
    const t = _i,
      n = Nt(),
      r = async () => {
        if (_i !== t || Nt() !== n || (await Q(B.ACCESS_TOKEN))) return !0;
        const e = await Q(B.STARTUP_REAUTH_STATE);
        return !0 !== e?.terminal || "logged_out" !== e.stop;
      };
    if ((await nn(), !Qt(Ys, !0))) return !1;
    if (await r()) return !1;
    if (
      (await X(B.STARTUP_REAUTH_STATE, { ...e, lastProbeAt: Date.now() }),
      !0 !== (await oi()))
    )
      return !1;
    if (await r()) return !1;
    e = {};
  }
  if (e.refusedUntil && Date.now() < e.refusedUntil) return !1;
  if (e.until && Date.now() < e.until) return !1;
  const t = Date.now(),
    n = Re();
  await X(B.STARTUP_REAUTH_STATE, { ...e, until: t + ri });
  const r = _i,
    s = Nt(),
    i = {},
    o = await ei(i);
  if ("disabled_by_gate" === o) return !1;
  const a = "superseded" === i.cause,
    c =
      a || ("authorize_failed" !== o && "interaction_required" !== o)
        ? void 0
        : await oi();
  if (
    (js(n, () =>
      Ps("chrome_ext_oauth_startup_reauth", {
        outcome: o,
        agent_ai_session: void 0 === c ? "unknown" : c ? "present" : "absent",
        ...(i.cause && { cause: i.cause }),
        ...(void 0 !== i.windowMs && { window_ms: i.windowMs }),
        sw_uptime_ms: t - Xs,
      }),
    ),
    "success" === o)
  )
    return !0;
  if (a) return !!(await Q(B.ACCESS_TOKEN));
  const u = async () =>
      !(_i === r && Nt() === s && !(await Q(B.ACCESS_TOKEN))) ||
      void 0 === (await Q(B.STARTUP_REAUTH_STATE)),
    l = async (e) => {
      (await u()) ||
        (await te({
          [B.STARTUP_REAUTH_STATE]: { terminal: !0, stop: e, lastProbeAt: t },
          [B.LAST_AUTH_FAILURE_REASON]: "session_expired",
        }));
    };
  if ("account_mismatch" === o || "consent_required" === o)
    return (await l("definitive"), !1);
  if (!1 === c) return (await l("logged_out"), !1);
  const d = (e.strikes ?? 0) + 1;
  if ("interaction_required" === o && void 0 === c) {
    const t = (e.irStrikes ?? 0) + 1;
    return t >= 3
      ? (await l("logged_out"), !1)
      : ((await u()) ||
          (await X(B.STARTUP_REAUTH_STATE, {
            strikes: d,
            irStrikes: t,
            until: Date.now() + si(d),
          })),
        !1);
  }
  if (await u()) return !1;
  const h = { strikes: d, until: Date.now() + si(d) },
    p =
      "interaction_required" === o &&
      !0 === c &&
      Date.now() - (e.lastRefusalAt ?? 0) >= ri,
    f = (e.refusals ?? 0) + (p ? 1 : 0),
    m = p ? Date.now() : e.lastRefusalAt;
  return (
    f > 0 && (h.refusals = f),
    m && (h.lastRefusalAt = m),
    p &&
      f >= 3 &&
      (h.refusedUntil =
        Date.now() +
        ((e) => Math.min(18e5 * 2 ** Math.max(e - 3, 0), 144e5))(f)),
    await X(B.STARTUP_REAUTH_STATE, h),
    !1
  );
}
async function ci(e) {
  const t = await (async function (e) {
      if (Ut()) {
        try {
          const t = await chrome.storage.local.get([
              B.DISK_REFRESH_TOKEN,
              B.ACCOUNT_UUID,
            ]),
            n = t[B.DISK_REFRESH_TOKEN];
          if (void 0 === n) return;
          if (
            "string" == typeof n?.refreshToken &&
            n.refreshToken &&
            "string" == typeof n.accountUuid &&
            n.accountUuid === t[B.ACCOUNT_UUID]
          )
            return { refreshToken: n.refreshToken, accountUuid: n.accountUuid };
          "string" == typeof n?.refreshToken &&
            n.refreshToken &&
            e?.(n.refreshToken);
        } catch (t) {
          return;
        }
        await Z(B.DISK_REFRESH_TOKEN).catch(() => {});
      }
    })((e) => {
      Ei(e);
    }),
    n = t && (await Qs());
  if (t && void 0 !== n) {
    if (n && (await V())) {
      const n = await Q(B.STARTUP_REAUTH_STATE).catch(() => {});
      if (
        n?.terminal ||
        (n?.until ?? 0) > Date.now() ||
        (n?.refusedUntil ?? 0) > Date.now()
      )
        return;
      const r = await ii();
      if (Nt() !== e) return;
      if (
        !0 === r.signedIn &&
        r.accountUuid?.toLowerCase() === t.accountUuid.toLowerCase()
      )
        return t;
      if (!1 !== r.signedIn && !r.accountUuid) return;
    }
    (await Mt(t.refreshToken).catch(() => {}), Ei(t.refreshToken));
  }
}
async function ui() {
  !1 === (await Qs()) &&
    (await (async function (e) {
      if (!Ut()) return;
      const t = await $t();
      null !== t && (await Z(B.DISK_REFRESH_TOKEN), t && (await Ft(t, e)));
    })((e) => {
      Ei(e);
    }).catch(() => {}));
}
var li = () =>
  ni ||
  (ni = (async function () {
    const e = Re();
    try {
      const t = Ws();
      await Vs();
      const n = await ee([B.ACCESS_TOKEN, B.REFRESH_TOKEN, B.TOKEN_EXPIRY]),
        r = !!n[B.ACCESS_TOKEN],
        s = !!n[B.REFRESH_TOKEN];
      if (!r && !s) {
        const n = await ci(t),
          r =
            n &&
            (await (async function ({ refreshToken: e, accountUuid: t }, n, r) {
              const s = {
                was_access_token_expired: !0,
                was_access_token_missing: !0,
                from_disk: !0,
              };
              for (let i = 0; i < 3; i++) {
                const o = await ti(e, d().oauth);
                if (
                  o.success &&
                  (o.accountUuid?.toLowerCase() !== t.toLowerCase() ||
                    !bt(o.scope) ||
                    !1 !== o.org?.hybrid)
                )
                  return (
                    Ei(o.refreshToken ?? e),
                    void (await Mt(e).catch(() => {}))
                  );
                if (o.success)
                  return (await zs(o, void 0, {
                    unlessAuthResetSince: n,
                    rotatedFrom: e,
                  }).catch(() => !1))
                    ? (Hs("success", { ...s, attempt: i, tokens_deleted: !1 }),
                      { isValid: !0, isRefreshed: !0 })
                    : (Ei(o.refreshToken ?? e),
                      void (await Mt(e).catch(() => {})));
                if (!("invalid_grant" !== o.failureReason && i < 2))
                  return (
                    "invalid_grant" === o.failureReason &&
                      (await Mt(e).catch(() => {})),
                    void js(r, () =>
                      Hs(o.failureReason ?? "network_error", {
                        ...s,
                        attempt: i,
                        tokens_deleted: "invalid_grant" === o.failureReason,
                      }),
                    )
                  );
              }
            })(n, t, e));
        return (
          r ||
          (Nt() !== t
            ? { isValid: !!(await Q(B.ACCESS_TOKEN)), isRefreshed: !1 }
            : (await ai())
              ? { isValid: !0, isRefreshed: !0 }
              : { isValid: !1, isRefreshed: !1 })
        );
      }
      const i = Date.now(),
        o = n[B.TOKEN_EXPIRY],
        a = r && !!o && i < o;
      if (r && !(o && i >= o - Ns)) return { isValid: a, isRefreshed: !1 };
      if (!s)
        return (
          a || (await X(B.LAST_AUTH_FAILURE_REASON, "session_expired")),
          { isValid: a, isRefreshed: !1 }
        );
      const c = d(),
        u = {
          was_access_token_expired: !a,
          was_access_token_missing: !r,
          from_disk: !1,
        };
      for (let l = 0; l < 3; l++) {
        const r = await ti(n[B.REFRESH_TOKEN], c.oauth);
        if (r.success)
          return (await zs(r, void 0, {
            unlessAuthResetSince: t,
            rotatedFrom: n[B.REFRESH_TOKEN],
          }).catch((e) => {
            throw (
              r.refreshToken !== n[B.REFRESH_TOKEN] && Ei(r.refreshToken),
              e
            );
          }))
            ? (Hs("success", { ...u, attempt: l, tokens_deleted: !1 }),
              { isValid: !0, isRefreshed: !0 })
            : (Ei(r.refreshToken), { isValid: !1, isRefreshed: !1 });
        if ("invalid_grant" === r.failureReason) {
          await Mt(n[B.REFRESH_TOKEN]);
          const t = await ei();
          return "success" === t
            ? (js(e, () =>
                Hs("invalid_grant", {
                  ...u,
                  attempt: l,
                  tokens_deleted: !1,
                  silent_reauth_outcome: t,
                }),
              ),
              { isValid: !0, isRefreshed: !0 })
            : (a || (await X(B.LAST_AUTH_FAILURE_REASON, "session_expired")),
              js(e, () =>
                Hs("invalid_grant", {
                  ...u,
                  attempt: l,
                  tokens_deleted: !1,
                  silent_reauth_outcome: t,
                }),
              ),
              { isValid: a, isRefreshed: !1 });
        }
        if (2 === l)
          return (
            Hs(r.failureReason ?? "network_error", {
              ...u,
              attempt: l,
              tokens_deleted: !1,
            }),
            { isValid: a, isRefreshed: !1 }
          );
      }
      return { isValid: a, isRefreshed: !1 };
    } catch {
      return { isValid: !1, isRefreshed: !1 };
    }
  })().finally(() => {
    ni = null;
  }));
var di = async () => {
    if ((await li()).isValid) return (await Q(B.ACCESS_TOKEN)) || void 0;
  },
  hi = async () => {
    if ("ServiceWorkerGlobalScope" in globalThis) return di();
    try {
      const e = await chrome.runtime.sendMessage({
        type: "check_and_refresh_oauth",
      });
      if (e?.isValid) return Q(B.ACCESS_TOKEN);
      if (e) return;
    } catch {}
    return di();
  },
  pi = null,
  fi = 0,
  mi = null,
  gi = 0,
  _i = 0,
  yi = async (e, t) => {
    const n = e ?? (await di());
    if (!n) return;
    if (!t?.forceRefresh)
      try {
        const e = await Q(B.ACCOUNT_UUID);
        if (e) return e;
      } catch {}
    if (pi?.token === n) return pi.promise;
    const r = (async (e) => {
      try {
        const t = d(),
          n = Date.now(),
          r = await fetch(`${t.apiBaseUrl}/api/oauth/profile`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${e}`,
              "Content-Type": "application/json",
              "szmelc-inc-client-platform": "agent_browser_extension",
            },
            signal: AbortSignal.timeout(An()),
          });
        if (!r.ok) {
          if (401 === r.status && Date.now() - _i >= 5e3) {
            if ((mi === e ? fi++ : ((mi = e), (fi = 1)), fi >= 2)) {
              if (Date.now() - gi >= 9e5)
                try {
                  (await Q(B.ACCESS_TOKEN)) === e &&
                    (Ht(B.ACCESS_TOKEN).catch(() => {}), (gi = Date.now()));
                } catch {}
              ((fi = 0), (mi = null));
            }
          } else 403 === r.status && ((fi = 0), (mi = null));
          return;
        }
        ((fi = 0), (mi = null));
        const s = await r.json(),
          i = s?.account?.uuid;
        if (i)
          try {
            (await Q(B.ACCESS_TOKEN)) === e &&
              (await st.noteProfile(s, n).catch(() => {}),
              await X(B.ACCOUNT_UUID, i));
          } catch {}
        return i;
      } catch (t) {
        return;
      }
    })(n);
    pi = { token: n, promise: r };
    try {
      return await r;
    } finally {
      pi?.promise === r && (pi = null);
    }
  },
  vi = async (e) => {
    let t;
    try {
      t = new URL(e).searchParams.get("state");
    } catch {
      return !1;
    }
    return !!t && t === (await Q(B.SIGN_IN_STATE));
  },
  wi = async (e, t) => {
    try {
      const n = new URLSearchParams(new URL(e).search),
        r = n.get("code"),
        s = n.get("error"),
        i = n.get("error_description"),
        o = n.get("state");
      if (s) {
        return {
          success: !1,
          error: `Authentication failed: ${s}${i ? " - " + i : ""}`,
        };
      }
      if (!r) return { success: !1, error: "No authorization code received" };
      const a = (await Q(B.CODE_VERIFIER)) || "",
        c = d(),
        u = await qs(r, o || "", a, c.oauth);
      if (u.success) {
        const e = await Q(B.OAUTH_ORG_SWITCH).catch(() => !1);
        if (e && (await Ke())?.allowedOrgs) {
          const e = await Q(B.ACCOUNT_UUID).catch(() => {});
          if (!e || e.toLowerCase() !== u.accountUuid?.toLowerCase())
            return (
              t && (await chrome.tabs.remove(t).catch(() => {})),
              {
                success: !1,
                error: "An organization switch cannot change the account",
              }
            );
        }
        try {
          await chrome.storage.session.remove(se);
        } catch {}
        const n = u.accountUuid ?? null,
          r = u.org ?? null;
        await zs({ ...u, org: r, accountUuid: n }, o || void 0, {
          noDiskCopy: !0,
        }).catch((e) => {
          throw (u.refreshToken && Ei(u.refreshToken), e);
        });
        try {
          await chrome.storage.session.remove(se);
        } catch {}
        try {
          n ? await X(B.ACCOUNT_UUID, n) : await Z(B.ACCOUNT_UUID);
        } catch {}
        const s = "https://szmelc.com/chrome/installed";
        if (t) {
          const n = Re()?.managed || e;
          try {
            await (n
              ? chrome.tabs.remove(t)
              : chrome.tabs.update(t, { url: s }));
          } catch {}
        }
        yi(u.accessToken);
        const i = { refreshToken: u.refreshToken, scope: u.scope };
        return {
          success: !0,
          message: "Authentication successful!",
          keepDiskCopy: (e) => {
            const t = !0 === e?.[Js]?.value;
            return (async function (e, t, n) {
              const r = () =>
                n.enabled() &&
                !!e.refreshToken &&
                Rt?.refreshToken === e.refreshToken &&
                Rt.epoch === Pt;
              Ut() &&
                bt(e.scope) &&
                r() &&
                (
                  await chrome.storage.session
                    .get(B.REFRESH_TOKEN)
                    .catch(() => {})
                )?.[B.REFRESH_TOKEN] === e.refreshToken &&
                (await Lt(
                  e,
                  t.accountUuid,
                  t.org,
                  {
                    diskCopy: async () => !0,
                    revokeDisplaced: n.revokeDisplaced,
                  },
                  r,
                ));
            })(
              i,
              { accountUuid: n, org: r },
              {
                enabled: () => t && !0 === Qt(Js, void 0),
                revokeDisplaced: (e) => {
                  Ei(e);
                },
              },
            );
          },
        };
      }
      return {
        success: !1,
        error: u.error || "Failed to exchange authorization code for token",
      };
    } catch (n) {
      return {
        success: !1,
        error:
          n instanceof Error
            ? n.message
            : "An unexpected error occurred during authentication",
      };
    }
  };
async function Ei(e) {
  const t = d();
  try {
    await fetch(t.oauth.REVOKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token: e,
        token_type_hint: "refresh_token",
        client_id: t.oauth.CLIENT_ID,
      }),
      signal: AbortSignal.timeout(An()),
    });
  } catch (n) {}
}
var Si = () =>
    jt((e) => {
      Ei(e);
    }),
  bi = async (e = {}) => {
    const t = d(),
      n = await Ke(),
      r = n && ae(n),
      s = e.orgUUID ?? (1 === r?.length ? r[0] : void 0),
      i = Bs(32),
      o = Ks(crypto.getRandomValues(new Uint8Array(32))),
      a = await Gs(o);
    await te({
      [B.SIGN_IN_STATE]: i,
      [B.CODE_VERIFIER]: o,
      [B.OAUTH_ORG_SWITCH]: !!e.orgUUID || !!e.orgSwitch,
    });
    const c = new URLSearchParams({
        client_id: t.oauth.CLIENT_ID,
        response_type: "code",
        scope: t.oauth.SCOPES_STR,
        redirect_uri: t.oauth.REDIRECT_URI,
        state: i,
        code_challenge: a,
        code_challenge_method: "S256",
        ...(s && { orgUUID: s }),
      }),
      u = `${t.oauth.AUTHORIZE_URL}?${c.toString()}`;
    chrome.tabs.create({ url: u });
  },
  Ti = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
  Ai = globalThis,
  ki = "10.74.0";
function Oi() {
  return (Ri(Ai), Ai);
}
function Ri(e) {
  const t = (e.__SENTRY__ = e.__SENTRY__ || {});
  return ((t.version = t.version || "10.74.0"), (t[ki] = t["10.74.0"] || {}));
}
function Ii(e, t, n = Ai) {
  const r = (n.__SENTRY__ = n.__SENTRY__ || {}),
    s = (r[ki] = r["10.74.0"] || {});
  return s[e] || (s[e] = t());
}
var Ci = ["debug", "info", "warn", "error", "log", "assert", "trace"],
  Di = {};
function xi(e) {
  if (!("console" in Ai)) return e();
  const t = Ai.console,
    n = {},
    r = Object.keys(Di);
  r.forEach((e) => {
    const r = Di[e];
    ((n[e] = t[e]), (t[e] = r));
  });
  try {
    return e();
  } finally {
    r.forEach((e) => {
      t[e] = n[e];
    });
  }
}
function Ui() {
  return Ni().enabled;
}
function Pi(e, ...t) {
  Ti &&
    Ui() &&
    xi(() => {
      Ai.console[e](`Sentry Logger [${e}]:`, ...t);
    });
}
function Ni() {
  return Ti ? Ii("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
var Li = {
    enable: function () {
      Ni().enabled = !0;
    },
    disable: function () {
      Ni().enabled = !1;
    },
    isEnabled: Ui,
    log: function (...e) {
      Pi("log", ...e);
    },
    warn: function (...e) {
      Pi("warn", ...e);
    },
    error: function (...e) {
      Pi("error", ...e);
    },
  },
  Fi = /\(error: (.*)\)/,
  $i = /captureMessage|captureException/;
function Mi(...e) {
  const t = e.sort((e, t) => e[0] - t[0]).map((e) => e[1]);
  return (e, n = 0, r = 0) => {
    const s = [],
      i = e.split("\n");
    for (let o = n; o < i.length; o++) {
      let e = i[o];
      e.length > 1024 && (e = e.slice(0, 1024));
      const n = Fi.test(e) ? e.replace(Fi, "$1") : e;
      if (!n.includes("Error: ")) {
        for (const e of t) {
          const t = e(n);
          if (t) {
            s.push(t);
            break;
          }
        }
        if (s.length >= 50 + r) break;
      }
    }
    return (function (e) {
      if (!e.length) return [];
      const t = Array.from(e);
      /sentryWrapped/.test(ji(t).function || "") && t.pop();
      (t.reverse(),
        $i.test(ji(t).function || "") &&
          (t.pop(), $i.test(ji(t).function || "") && t.pop()));
      return t
        .slice(0, 50)
        .map((e) => ({
          ...e,
          filename: e.filename || ji(t).filename,
          function: e.function || "?",
        }));
    })(s.slice(r));
  };
}
function ji(e) {
  return e[e.length - 1] || {};
}
var Hi = "<anonymous>";
function Ki(e) {
  try {
    return (e && "function" == typeof e && e.name) || Hi;
  } catch {
    return Hi;
  }
}
function Bi(e) {
  const t = e.exception;
  if (t) {
    const e = [];
    try {
      return (
        t.values.forEach((t) => {
          t.stacktrace.frames && e.push(...t.stacktrace.frames);
        }),
        e
      );
    } catch {
      return;
    }
  }
}
var Gi = {},
  qi = {};
function zi(e, t) {
  return (
    (Gi[e] = Gi[e] || []),
    Gi[e].push(t),
    () => {
      const n = Gi[e];
      if (n) {
        const e = n.indexOf(t);
        -1 !== e && n.splice(e, 1);
      }
    }
  );
}
function Wi(e, t) {
  if (!qi[e]) {
    qi[e] = !0;
    try {
      t();
    } catch (n) {
      Ti && Li.error(`Error while instrumenting ${e}`, n);
    }
  }
}
function Vi(e, t) {
  const n = e && Gi[e];
  if (n)
    for (const s of n)
      try {
        s(t);
      } catch (r) {
        Ti &&
          Li.error(
            `Error while triggering instrumentation handler.\nType: ${e}\nName: ${Ki(s)}\nError:`,
            r,
          );
      }
}
var Yi = null;
function Ji() {
  ((Yi = Ai.onerror),
    (Ai.onerror = function (e, t, n, r, s) {
      return (
        Vi("error", { column: r, error: s, line: n, msg: e, url: t }),
        !!Yi && Yi.apply(this, arguments)
      );
    }),
    (Ai.onerror.__SENTRY_INSTRUMENTED__ = !0));
}
var Qi = null;
function Xi() {
  ((Qi = Ai.onunhandledrejection),
    (Ai.onunhandledrejection = function (e) {
      return (Vi("unhandledrejection", e), !Qi || Qi.apply(this, arguments));
    }),
    (Ai.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0));
}
var Zi,
  eo = Object.prototype.toString;
function to(e) {
  switch (eo.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return po(e, Error);
  }
}
function no(e, t) {
  return eo.call(e) === `[object ${t}]`;
}
function ro(e) {
  return no(e, "ErrorEvent");
}
function so(e) {
  return no(e, "DOMError");
}
function io(e) {
  return no(e, "String");
}
function oo(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    "__sentry_template_string__" in e &&
    "__sentry_template_values__" in e
  );
}
function ao(e) {
  return (
    null === e || oo(e) || ("object" != typeof e && "function" != typeof e)
  );
}
function co(e) {
  return no(e, "Object");
}
function uo(e) {
  return "object" == typeof e && null !== e;
}
function lo(e) {
  return "undefined" != typeof Event && po(e, Event);
}
function ho(e) {
  return Boolean(e?.then && "function" == typeof e.then);
}
function po(e, t) {
  try {
    return e instanceof t;
  } catch {
    return !1;
  }
}
function fo(e) {
  return "undefined" != typeof Request && po(e, Request);
}
function mo(e, t, n) {
  if (!(t in e)) return;
  const r = e[t];
  if ("function" != typeof r) return;
  const s = n(r);
  "function" == typeof s && _o(s, r);
  try {
    e[t] = s;
  } catch {
    Ti && Li.log(`Failed to replace method "${t}" in object`, e);
  }
}
function go(e, t, n) {
  try {
    Object.defineProperty(e, t, { value: n, writable: !0, configurable: !0 });
  } catch {
    Ti &&
      Li.log(
        `Failed to add non-enumerable property "${String(t)}" to object`,
        e,
      );
  }
}
function _o(e, t) {
  try {
    ((e.prototype = t.prototype = t.prototype || {}),
      go(e, "__sentry_original__", t));
  } catch {}
}
function yo(e) {
  return e.__sentry_original__;
}
function vo(e) {
  if (to(e))
    return { message: e.message, name: e.name, stack: e.stack, ...wo(e) };
  if (lo(e)) {
    const { type: t, target: n, currentTarget: r, detail: s } = e;
    return {
      type: t,
      target: n,
      currentTarget: r,
      ...(s ? { detail: s } : {}),
      ...wo(e),
    };
  }
  return e;
}
function wo(e) {
  return uo(e) ? Object.fromEntries(Object.entries(e)) : {};
}
function Eo(e) {
  if (void 0 !== Zi) return Zi ? Zi(e) : e();
  const t = Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),
    n = Ai;
  return t in n && "function" == typeof n[t]
    ? (Zi = n[t])(e)
    : ((Zi = null), e());
}
function So() {
  return Eo(() => Math.random());
}
function bo() {
  return Eo(() => Date.now());
}
var To,
  Ao,
  ko = Symbol.for("sentry.skipNormalization"),
  Oo = Symbol.for("sentry.overrideNormalizationDepth");
function Ro(e, t = 100, n = 1 / 0) {
  try {
    return Co("", e, t, n);
  } catch (r) {
    return { ERROR: `**non-serializable** (${r})` };
  }
}
function Io(e, t = 3, n = 102400) {
  const r = Ro(e, t);
  return (
    (s = r),
    (function (e) {
      return ~-encodeURI(e).split(/%..|./).length;
    })(JSON.stringify(s)) > n
      ? Io(e, t - 1, n)
      : r
  );
  var s;
}
function Co(
  e,
  t,
  n = 1 / 0,
  r = 1 / 0,
  s = (function () {
    const e = new WeakSet();
    function t(t) {
      return !!e.has(t) || (e.add(t), !1);
    }
    function n(t) {
      e.delete(t);
    }
    return [t, n];
  })(),
) {
  const [i, o] = s;
  if (
    null == t ||
    ["boolean", "string"].includes(typeof t) ||
    ("number" == typeof t && Number.isFinite(t))
  )
    return t;
  const a = Do(e, t);
  if (!a.startsWith("[object ")) return a;
  if (
    (function (e) {
      return Boolean(e[ko]);
    })(t)
  )
    return t;
  const c = (function (e) {
      const t = e[Oo];
      return "number" == typeof t ? t : void 0;
    })(t),
    u = void 0 !== c ? c : n;
  if (0 === u) return a.replace("object ", "");
  if (i(t)) return "[Circular ~]";
  const l = t;
  if (l && "function" == typeof l.toJSON)
    try {
      return Co("", l.toJSON(), u - 1, r, s);
    } catch {}
  const d = Array.isArray(t) ? [] : {};
  let h = 0;
  const p = vo(t);
  for (const f in p) {
    if (!Object.prototype.hasOwnProperty.call(p, f)) continue;
    if (h >= r) {
      d[f] = "[MaxProperties ~]";
      break;
    }
    const e = p[f];
    ((d[f] = Co(f, e, u - 1, r, s)), h++);
  }
  return (o(t), d);
}
function Do(e, t) {
  try {
    if (To) {
      const e = To(t);
      if (e) return e;
    }
    return "undefined" != typeof global && t === global
      ? "[Global]"
      : "number" != typeof t || Number.isFinite(t)
        ? "function" == typeof t
          ? `[Function: ${Ki(t)}]`
          : "symbol" == typeof t
            ? `[${String(t)}]`
            : "bigint" == typeof t
              ? `[BigInt: ${String(t)}]`
              : `[object ${(function (e) {
                  const t = Object.getPrototypeOf(e);
                  return t?.constructor ? t.constructor.name : "null prototype";
                })(t)}]`
        : `[${t}]`;
  } catch (n) {
    return `**non-serializable** (${n})`;
  }
}
function xo(e, t = 0) {
  return "string" != typeof e || 0 === t || e.length <= t
    ? e
    : `${e.slice(0, t)}...`;
}
function Uo(e, t) {
  if (!Array.isArray(e)) return "";
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const t = e[r];
    ao(t)
      ? n.push(String(t))
      : t instanceof Error
        ? n.push(t.message ? `${t.name}: ${t.message}` : t.name)
        : n.push(Do(0, t));
  }
  return n.join(t);
}
function Po(e, t, n = !1) {
  return (
    !!io(e) &&
    (no(t, "RegExp")
      ? t.test(e)
      : io(t)
        ? n
          ? e === t
          : e.includes(t)
        : "function" == typeof t && t(e))
  );
}
function No(e, t = [], n = !1) {
  for (const r of t) if (Po(e, r, n)) return !0;
  return !1;
}
function Lo(
  e = (function () {
    const e = Ai;
    return e.crypto || e.msCrypto;
  })(),
) {
  try {
    if (e?.randomUUID) return Eo(() => e.randomUUID()).replace(/-/g, "");
  } catch {}
  return (
    Ao || (Ao = "10000000100040008000100000000000"),
    Ao.replace(/[018]/g, (e) =>
      (e ^ (((16 * So()) & 15) >> (e / 4))).toString(16),
    )
  );
}
function Fo(e) {
  return e.exception?.values?.[0];
}
function $o(e) {
  const { message: t, event_id: n } = e;
  if (t) return t;
  const r = Fo(e);
  return r
    ? r.type && r.value
      ? `${r.type}: ${r.value}`
      : r.type || r.value || n || "<unknown>"
    : n || "<unknown>";
}
function Mo(e, t, n) {
  const r = (e.exception = e.exception || {}),
    s = (r.values = r.values || []),
    i = (s[0] = s[0] || {});
  (i.value || (i.value = t || ""), i.type || (i.type = n || "Error"));
}
function jo(e, t) {
  const n = Fo(e);
  if (!n) return;
  const r = n.mechanism;
  if (
    ((n.mechanism = { type: "generic", handled: !0, ...r, ...t }),
    t && "data" in t)
  ) {
    const e = { ...r?.data, ...t.data };
    n.mechanism.data = e;
  }
}
function Ho(e) {
  if (
    (function (e) {
      try {
        return e.__sentry_captured__;
      } catch {}
    })(e)
  )
    return !0;
  try {
    go(e, "__sentry_captured__", !0);
  } catch {}
  return !1;
}
var Ko;
function Bo() {
  return bo() / 1e3;
}
function Go() {
  return (
    Ko ??
    (Ko = (function () {
      const { performance: e } = Ai;
      if (!e?.now || !e.timeOrigin) return Bo;
      const t = e.timeOrigin;
      return () => (t + Eo(() => e.now())) / 1e3;
    })())
  )();
}
function qo(e) {
  const t = Go(),
    n = {
      sid: Lo(),
      init: !0,
      timestamp: t,
      started: t,
      duration: 0,
      status: "ok",
      errors: 0,
      ignoreDuration: !1,
      toJSON: () =>
        (function (e) {
          return {
            sid: `${e.sid}`,
            init: e.init,
            started: new Date(1e3 * e.started).toISOString(),
            timestamp: new Date(1e3 * e.timestamp).toISOString(),
            status: e.status,
            errors: e.errors,
            did:
              "number" == typeof e.did || "string" == typeof e.did
                ? `${e.did}`
                : void 0,
            duration: e.duration,
            abnormal_mechanism: e.abnormal_mechanism,
            attrs: {
              release: e.release,
              environment: e.environment,
              ip_address: e.ipAddress,
              user_agent: e.userAgent,
            },
          };
        })(n),
    };
  return (e && zo(n, e), n);
}
function zo(e, t = {}) {
  if (
    (t.user &&
      (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address),
      e.did || t.did || (e.did = t.user.id || t.user.email || t.user.username)),
    (e.timestamp = t.timestamp || Go()),
    t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism),
    t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration),
    t.sid && (e.sid = 32 === t.sid.length ? t.sid : Lo()),
    void 0 !== t.init && (e.init = t.init),
    !e.did && t.did && (e.did = `${t.did}`),
    "number" == typeof t.started && (e.started = t.started),
    e.ignoreDuration)
  )
    e.duration = void 0;
  else if ("number" == typeof t.duration) e.duration = t.duration;
  else {
    const t = e.timestamp - e.started;
    e.duration = t >= 0 ? t : 0;
  }
  (t.release && (e.release = t.release),
    t.environment && (e.environment = t.environment),
    !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress),
    !e.userAgent && t.userAgent && (e.userAgent = t.userAgent),
    "number" == typeof t.errors && (e.errors = t.errors),
    t.status && (e.status = t.status));
}
function Wo(e, t, n = 2) {
  if (!t || "object" != typeof t || n <= 0) return t;
  if (e && 0 === Object.keys(t).length) return e;
  const r = { ...e };
  for (const s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      (r[s] = Wo(r[s], t[s], n - 1));
  return r;
}
function Vo() {
  return Lo();
}
function Yo() {
  return Lo().substring(16);
}
function Jo(e) {
  if (e) {
    if ("object" == typeof e && "deref" in e && "function" == typeof e.deref)
      try {
        return e.deref();
      } catch {
        return;
      }
    return e;
  }
}
var Qo = "_sentrySpan";
function Xo(e, t) {
  t
    ? go(
        e,
        Qo,
        (function (e) {
          try {
            const t = Ai.WeakRef;
            if ("function" == typeof t) return new t(e);
          } catch {}
          return e;
        })(t),
      )
    : delete e[Qo];
}
function Zo(e) {
  return Jo(e[Qo]);
}
var ea = class e {
  constructor() {
    ((this._notifyingListeners = !1),
      (this._scopeListeners = []),
      (this._eventProcessors = []),
      (this._breadcrumbs = []),
      (this._attachments = []),
      (this._user = {}),
      (this._tags = {}),
      (this._attributes = {}),
      (this._extra = {}),
      (this._contexts = {}),
      (this._sdkProcessingMetadata = {}),
      (this._propagationContext = { traceId: Vo(), sampleRand: So() }));
  }
  clone() {
    const t = new e();
    return (
      (t._breadcrumbs = [...this._breadcrumbs]),
      (t._tags = { ...this._tags }),
      (t._attributes = { ...this._attributes }),
      (t._extra = { ...this._extra }),
      (t._contexts = { ...this._contexts }),
      this._contexts.flags &&
        (t._contexts.flags = { values: [...this._contexts.flags.values] }),
      (t._user = this._user),
      (t._level = this._level),
      (t._session = this._session),
      (t._transactionName = this._transactionName),
      (t._fingerprint = this._fingerprint),
      (t._eventProcessors = [...this._eventProcessors]),
      (t._attachments = [...this._attachments]),
      (t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }),
      (t._propagationContext = { ...this._propagationContext }),
      (t._client = this._client),
      (t._lastEventId = this._lastEventId),
      (t._conversationId = this._conversationId),
      Xo(t, Zo(this)),
      t
    );
  }
  setClient(e) {
    this._client = e;
  }
  setLastEventId(e) {
    this._lastEventId = e;
  }
  getClient() {
    return this._client;
  }
  lastEventId() {
    return this._lastEventId;
  }
  addScopeListener(e) {
    this._scopeListeners.push(e);
  }
  addEventProcessor(e) {
    return (this._eventProcessors.push(e), this);
  }
  setUser(e) {
    return (
      (this._user = e || {
        email: void 0,
        id: void 0,
        ip_address: void 0,
        username: void 0,
      }),
      this._session && zo(this._session, { user: e }),
      this._notifyScopeListeners(),
      this
    );
  }
  getUser() {
    return this._user;
  }
  setConversationId(e) {
    return (
      (this._conversationId = e || void 0),
      this._notifyScopeListeners(),
      this
    );
  }
  setTags(e) {
    return (
      (this._tags = { ...this._tags, ...e }),
      this._notifyScopeListeners(),
      this
    );
  }
  setTag(e, t) {
    return this.setTags({ [e]: t });
  }
  setAttributes(e) {
    return (
      (this._attributes = { ...this._attributes, ...e }),
      this._notifyScopeListeners(),
      this
    );
  }
  setAttribute(e, t) {
    return this.setAttributes({ [e]: t });
  }
  removeAttribute(e) {
    return (
      e in this._attributes &&
        (delete this._attributes[e], this._notifyScopeListeners()),
      this
    );
  }
  setExtras(e) {
    return (
      (this._extra = { ...this._extra, ...e }),
      this._notifyScopeListeners(),
      this
    );
  }
  setExtra(e, t) {
    return (
      (this._extra = { ...this._extra, [e]: t }),
      this._notifyScopeListeners(),
      this
    );
  }
  setFingerprint(e) {
    return ((this._fingerprint = e), this._notifyScopeListeners(), this);
  }
  setLevel(e) {
    return ((this._level = e), this._notifyScopeListeners(), this);
  }
  setTransactionName(e) {
    return ((this._transactionName = e), this._notifyScopeListeners(), this);
  }
  setContext(e, t) {
    return (
      null === t ? delete this._contexts[e] : (this._contexts[e] = t),
      this._notifyScopeListeners(),
      this
    );
  }
  setSession(e) {
    return (
      e ? (this._session = e) : delete this._session,
      this._notifyScopeListeners(),
      this
    );
  }
  getSession() {
    return this._session;
  }
  update(t) {
    if (!t) return this;
    const n = "function" == typeof t ? t(this) : t,
      {
        tags: r,
        attributes: s,
        extra: i,
        user: o,
        contexts: a,
        level: c,
        fingerprint: u = [],
        propagationContext: l,
        conversationId: d,
      } = (n instanceof e ? n.getScopeData() : co(n) ? t : void 0) || {};
    return (
      (this._tags = { ...this._tags, ...r }),
      (this._attributes = { ...this._attributes, ...s }),
      (this._extra = { ...this._extra, ...i }),
      (this._contexts = { ...this._contexts, ...a }),
      o && Object.keys(o).length && (this._user = o),
      c && (this._level = c),
      u.length && (this._fingerprint = u),
      l && (this._propagationContext = l),
      d && (this._conversationId = d),
      this
    );
  }
  clear() {
    return (
      (this._breadcrumbs = []),
      (this._tags = {}),
      (this._attributes = {}),
      (this._extra = {}),
      (this._user = {}),
      (this._contexts = {}),
      (this._level = void 0),
      (this._transactionName = void 0),
      (this._fingerprint = void 0),
      (this._session = void 0),
      (this._conversationId = void 0),
      Xo(this, void 0),
      (this._attachments = []),
      this.setPropagationContext({ traceId: Vo(), sampleRand: So() }),
      this._notifyScopeListeners(),
      this
    );
  }
  addBreadcrumb(e, t) {
    const n = "number" == typeof t ? t : 100;
    if (n <= 0) return this;
    const r = {
      timestamp: Bo(),
      ...e,
      message: e.message ? xo(e.message, 2048) : e.message,
    };
    return (
      this._breadcrumbs.push(r),
      this._breadcrumbs.length > n &&
        ((this._breadcrumbs = this._breadcrumbs.slice(-n)),
        this._client?.recordDroppedEvent("buffer_overflow", "log_item")),
      this._notifyScopeListeners(),
      this
    );
  }
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  clearBreadcrumbs() {
    return ((this._breadcrumbs = []), this._notifyScopeListeners(), this);
  }
  addAttachment(e) {
    return (this._attachments.push(e), this);
  }
  clearAttachments() {
    return ((this._attachments = []), this);
  }
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: Zo(this),
      conversationId: this._conversationId,
    };
  }
  setSDKProcessingMetadata(e) {
    return (
      (this._sdkProcessingMetadata = Wo(this._sdkProcessingMetadata, e, 2)),
      this
    );
  }
  setPropagationContext(e) {
    return ((this._propagationContext = e), this);
  }
  getPropagationContext() {
    return this._propagationContext;
  }
  captureException(e, t) {
    const n = t?.event_id || Lo();
    if (!this._client)
      return (
        Ti &&
          Li.warn(
            "No client configured on scope - will not capture exception!",
          ),
        n
      );
    const r = new Error("Sentry syntheticException");
    return (
      this._client.captureException(
        e,
        { originalException: e, syntheticException: r, ...t, event_id: n },
        this,
      ),
      n
    );
  }
  captureMessage(e, t, n) {
    const r = n?.event_id || Lo();
    if (!this._client)
      return (
        Ti &&
          Li.warn("No client configured on scope - will not capture message!"),
        r
      );
    const s = n?.syntheticException ?? new Error(e);
    return (
      this._client.captureMessage(
        e,
        t,
        { originalException: e, syntheticException: s, ...n, event_id: r },
        this,
      ),
      r
    );
  }
  captureEvent(e, t) {
    const n = e.event_id || t?.event_id || Lo();
    return this._client
      ? (this._client.captureEvent(e, { ...t, event_id: n }, this), n)
      : (Ti &&
          Li.warn("No client configured on scope - will not capture event!"),
        n);
  }
  _notifyScopeListeners() {
    this._notifyingListeners ||
      ((this._notifyingListeners = !0),
      this._scopeListeners.forEach((e) => {
        e(this);
      }),
      (this._notifyingListeners = !1));
  }
};
var ta = (e) => e instanceof Promise && !e[na],
  na = Symbol("chained PromiseLike"),
  ra = (e, t) => {
    if (!t) return e;
    let n = !1;
    for (const r in e) {
      if (r in t) continue;
      n = !0;
      const s = e[r];
      "function" == typeof s
        ? Object.defineProperty(t, r, {
            value: (...t) => s.apply(e, t),
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[r] = s);
    }
    return (n && Object.assign(t, { [na]: !0 }), t);
  },
  sa = class {
    constructor(e, t) {
      let n, r;
      ((n = e || new ea()),
        (r = t || new ea()),
        (this._stack = [{ scope: n }]),
        (this._isolationScope = r));
    }
    withScope(e) {
      const t = this._pushScope();
      let n;
      try {
        n = e(t);
      } catch (r) {
        throw (this._popScope(), r);
      }
      return ho(n)
        ? ((e, t, n) => {
            const r = e.then(
              (e) => (t(e), e),
              (e) => {
                throw (n(e), e);
              },
            );
            return ta(r) && ta(e) ? r : ra(e, r);
          })(
            n,
            () => this._popScope(),
            () => this._popScope(),
          )
        : (this._popScope(), n);
    }
    getClient() {
      return this.getStackTop().client;
    }
    getScope() {
      return this.getStackTop().scope;
    }
    getIsolationScope() {
      return this._isolationScope;
    }
    getStackTop() {
      return this._stack[this._stack.length - 1];
    }
    _pushScope() {
      const e = this.getScope().clone();
      return (this._stack.push({ client: this.getClient(), scope: e }), e);
    }
    _popScope() {
      return !(this._stack.length <= 1) && !!this._stack.pop();
    }
  };
function ia() {
  const e = Ri(Oi());
  return (e.stack =
    e.stack ||
    new sa(
      Ii("defaultCurrentScope", () => new ea()),
      Ii("defaultIsolationScope", () => new ea()),
    ));
}
function oa(e) {
  return ia().withScope(e);
}
function aa(e, t) {
  const n = ia();
  return n.withScope(() => ((n.getStackTop().scope = e), t(e)));
}
function ca(e) {
  return ia().withScope(() => e(ia().getIsolationScope()));
}
function ua(e) {
  const t = Ri(e);
  return t.acs
    ? t.acs
    : {
        withIsolationScope: ca,
        withScope: oa,
        withSetScope: aa,
        withSetIsolationScope: (e, t) => ca(t),
        getCurrentScope: () => ia().getScope(),
        getIsolationScope: () => ia().getIsolationScope(),
      };
}
function la(e, t) {
  const { value: n, unit: r } =
    "object" == typeof (s = e) &&
    null != s &&
    !Array.isArray(s) &&
    Object.keys(s).includes("value")
      ? e
      : { value: e, unit: void 0 };
  var s;
  const i = (function (e) {
      if (Array.isArray(e)) return { value: e, type: "array" };
      const t =
        "string" == typeof e
          ? "string"
          : "boolean" == typeof e
            ? "boolean"
            : "number" != typeof e || Number.isNaN(e)
              ? null
              : Number.isInteger(e)
                ? "integer"
                : "double";
      if (t) return { value: e, type: t };
    })(n),
    o = r && "string" == typeof r ? { unit: r } : {};
  if (i) return { ...i, ...o };
  if (!t || ("skip-undefined" === t && void 0 === n)) return;
  let a = "";
  try {
    a = JSON.stringify(n) ?? "";
  } catch {}
  return { value: a, type: "string", ...o };
}
function da(e, t = !1) {
  const n = {};
  for (const [r, s] of Object.entries(e ?? {})) {
    const e = la(s, t);
    e && (n[r] = e);
  }
  return n;
}
function ha() {
  return ua(Oi()).getCurrentScope();
}
function pa() {
  return ua(Oi()).getIsolationScope();
}
function fa() {
  return ha().getClient();
}
function ma(e) {
  const t = void 0;
  const {
      traceId: n,
      parentSpanId: r,
      propagationSpanId: s,
    } = e.getPropagationContext(),
    i = { trace_id: n, span_id: s || Yo() };
  return (r && (i.parent_span_id = r), i);
}
function ga(e) {
  const t = e;
  return { scope: t._sentryScope, isolationScope: Jo(t._sentryIsolationScope) };
}
function _a(e) {
  const t = (function (e) {
    if (!e || (!io(e) && !Array.isArray(e))) return;
    return Array.isArray(e)
      ? e.reduce((e, t) => {
          const n = ya(t);
          return (
            Object.entries(n).forEach(([t, n]) => {
              e[t] = n;
            }),
            e
          );
        }, {})
      : ya(e);
  })(e);
  if (!t) return;
  const n = Object.entries(t).reduce((e, [t, n]) => {
    if (t.startsWith("sentry-")) {
      e[t.slice(7)] = n;
    }
    return e;
  }, {});
  return Object.keys(n).length > 0 ? n : void 0;
}
function ya(e) {
  return e
    .split(",")
    .map((e) => {
      const t = e.indexOf("=");
      return -1 === t
        ? []
        : [e.slice(0, t), e.slice(t + 1)].map((e) => {
            try {
              return decodeURIComponent(e.trim());
            } catch {
              return;
            }
          });
    })
    .reduce((e, [t, n]) => (t && n && (e[t] = n), e), {});
}
var va = /^o(\d+)\./,
  wa =
    /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function Ea(e, t = !1) {
  const {
    host: n,
    path: r,
    pass: s,
    port: i,
    projectId: o,
    protocol: a,
    publicKey: c,
  } = e;
  return `${a}://${c}${t && s ? `:${s}` : ""}@${n}${i ? `:${i}` : ""}/${r ? `${r}/` : r}${o}`;
}
function Sa(e) {
  return {
    protocol: e.protocol,
    publicKey: e.publicKey || "",
    pass: e.pass || "",
    host: e.host,
    port: e.port || "",
    path: e.path || "",
    projectId: e.projectId,
  };
}
function ba(e) {
  const t = e.getOptions(),
    { host: n } = e.getDsn() || {};
  let r;
  return (
    t.orgId
      ? (r = String(t.orgId))
      : n &&
        (r = (function (e) {
          return e.match(va)?.[1];
        })(n)),
    r
  );
}
function Ta(e) {
  const t =
    "string" == typeof e
      ? (function (e) {
          const t = wa.exec(e);
          if (!t) return void xi(() => {});
          const [n, r, s = "", i = "", o = "", a = ""] = t.slice(1);
          let c = "",
            u = a;
          const l = u.split("/");
          if (
            (l.length > 1 && ((c = l.slice(0, -1).join("/")), (u = l.pop())), u)
          ) {
            const e = u.match(/^\d+/);
            e && (u = e[0]);
          }
          return Sa({
            host: i,
            pass: s,
            path: c,
            projectId: u,
            port: o,
            protocol: n,
            publicKey: r,
          });
        })(e)
      : Sa(e);
  if (
    t &&
    (function (e) {
      if (!Ti) return !0;
      const { port: t, projectId: n, protocol: r } = e;
      return !(
        ["protocol", "publicKey", "host", "projectId"].find(
          (t) => !e[t] && (Li.error(`Invalid Sentry Dsn: ${t} missing`), !0),
        ) ||
        (n.match(/^\d+$/)
          ? (function (e) {
              return "http" === e || "https" === e;
            })(r)
            ? t &&
              isNaN(parseInt(t, 10)) &&
              (Li.error(`Invalid Sentry Dsn: Invalid port ${t}`), 1)
            : (Li.error(`Invalid Sentry Dsn: Invalid protocol ${r}`), 1)
          : (Li.error(`Invalid Sentry Dsn: Invalid projectId ${n}`), 1))
      );
    })(t)
  )
    return t;
}
var Aa = !1;
function ka(e) {
  const { spanId: t, traceId: n, isRemote: r } = e.spanContext(),
    s = r ? t : Ca(e).parent_span_id,
    i = ga(e).scope;
  return {
    parent_span_id: s,
    span_id: r ? i?.getPropagationContext().propagationSpanId || Yo() : t,
    trace_id: n,
  };
}
function Oa(e) {
  return e && e.length > 0
    ? e.map(
        ({
          context: { spanId: e, traceId: t, traceFlags: n, ...r },
          attributes: s,
        }) => ({
          span_id: e,
          trace_id: t,
          sampled: 1 === n,
          attributes: s,
          ...r,
        }),
      )
    : void 0;
}
function Ra(e) {
  return "number" == typeof e
    ? Ia(e)
    : Array.isArray(e)
      ? e[0] + e[1] / 1e9
      : e instanceof Date
        ? Ia(e.getTime())
        : Go();
}
function Ia(e) {
  return e > 9999999999 ? e / 1e3 : e;
}
function Ca(e) {
  if (
    (function (e) {
      return "function" == typeof e.getSpanJSON;
    })(e)
  )
    return e.getSpanJSON();
  const { spanId: t, traceId: n } = e.spanContext();
  if (
    (function (e) {
      const t = e;
      return !!(t.attributes && t.startTime && t.name && t.endTime && t.status);
    })(e)
  ) {
    const {
      attributes: r,
      startTime: s,
      name: i,
      endTime: o,
      status: a,
      links: c,
    } = e;
    return {
      span_id: t,
      trace_id: n,
      data: r,
      description: i,
      parent_span_id: Da(e),
      start_timestamp: Ra(s),
      timestamp: Ra(o) || void 0,
      status: xa(a),
      op: r["sentry.op"],
      origin: r["sentry.origin"],
      links: Oa(c),
    };
  }
  return { span_id: t, trace_id: n, start_timestamp: 0, data: {} };
}
function Da(e) {
  return "parentSpanId" in e
    ? e.parentSpanId
    : "parentSpanContext" in e
      ? e.parentSpanContext?.spanId
      : void 0;
}
function xa(e) {
  if (e && 0 !== e.code)
    return 1 === e.code ? "ok" : e.message || "internal_error";
}
var Ua = function (e) {
  return e._sentryRootSpan || e;
};
function Pa() {
  Aa || (xi(() => {}), (Aa = !0));
}
function Na(e) {
  if ("boolean" == typeof __SENTRY_TRACING__ && !__SENTRY_TRACING__) return !1;
  const t = e || fa()?.getOptions();
  return !(!t || (null == t.tracesSampleRate && !t.tracesSampler));
}
function La(e) {
  Li.log(
    `Ignoring span ${e.op} - ${e.description} because it matches \`ignoreSpans\`.`,
  );
}
function Fa(e, t) {
  if (!t?.length) return !1;
  for (const n of t) {
    if (ja(n)) {
      if (e.description && Po(e.description, n)) return (Ti && La(e), !0);
      continue;
    }
    const t = !!n.attributes && Object.keys(n.attributes).length > 0;
    if (!n.name && !n.op && !t) continue;
    const r = !n.name || (e.description && Po(e.description, n.name)),
      s = !n.op || (e.op && Po(e.op, n.op)),
      i =
        !n.attributes ||
        Object.entries(n.attributes).every(([t, n]) =>
          $a(e.attributes?.[t], n),
        );
    if (r && s && i) return (Ti && La(e), !0);
  }
  return !1;
}
function $a(e, t) {
  return "string" == typeof e && ("string" == typeof t || t instanceof RegExp)
    ? Po(e, t)
    : Array.isArray(e) && Array.isArray(t)
      ? e.length === t.length && e.every((e, n) => e === t[n])
      : e === t;
}
function Ma(e, t) {
  const n = t.parent_span_id,
    r = t.span_id;
  if (n) for (const s of e) s.parent_span_id === r && (s.parent_span_id = n);
}
function ja(e) {
  return "string" == typeof e || e instanceof RegExp;
}
var Ha = Symbol.for("sentry.nonRecordingSpan");
var Ka = "production";
function Ba(e, t) {
  const n = t.getOptions(),
    { publicKey: r } = t.getDsn() || {},
    s = {
      environment: n.environment || "production",
      release: n.release,
      public_key: r,
      trace_id: e,
      org_id: ba(t),
    };
  return (t.emit("createDsc", s), s);
}
function Ga(e, t) {
  const n = t.getPropagationContext();
  return n.dsc || Ba(n.traceId, e);
}
function qa(e) {
  const t = fa();
  if (!t) return {};
  const n = Ua(e),
    r = Ca(n),
    s = r.data,
    i = n.spanContext().traceState,
    o =
      i?.get("sentry.sample_rate") ??
      s["sentry.sample_rate"] ??
      s["sentry.previous_trace_sample_rate"];
  function a(e) {
    return (
      ("number" != typeof o && "string" != typeof o) ||
        (e.sample_rate = `${o}`),
      e
    );
  }
  const c = n._frozenDsc;
  if (c) return a(c);
  const u = (function (e) {
      return !!e && !0 === e[Ha];
    })(n),
    l = u && "ignored" === n.dropReason;
  if (u && (!Na(t.getOptions()) || l)) {
    const e = ga(n).scope;
    if (e) {
      const n = { ...Ga(t, e) };
      return (l && (n.sampled = "false"), a(n));
    }
  }
  const d = i?.get("sentry.dsc"),
    h = d && _a(d);
  if (h) return a(h);
  const p = Ba(e.spanContext().traceId, t),
    f = s["sentry.source"] ?? s["sentry.segment.name.source"],
    m = r.description;
  return (
    "url" !== f && m && (p.transaction = m),
    Na() &&
      ((p.sampled = String(
        (function (e) {
          const { traceFlags: t } = e.spanContext();
          return 1 === t;
        })(n),
      )),
      (p.sample_rand =
        i?.get("sentry.sample_rand") ??
        ga(n).scope?.getPropagationContext().sampleRand.toString())),
    a(p),
    t.emit("createDsc", p, n),
    p
  );
}
function za(e, t = []) {
  return [e, t];
}
function Wa(e, t) {
  const [n, r] = e;
  return [n, [...r, t]];
}
function Va(e, t) {
  const n = e[1];
  for (const r of n) {
    if (t(r, r[0].type)) return !0;
  }
  return !1;
}
function Ya(e) {
  const t = Ri(Ai);
  return t.encodePolyfill ? t.encodePolyfill(e) : new TextEncoder().encode(e);
}
function Ja(e) {
  const [t, n] = e;
  let r = JSON.stringify(t);
  function s(e) {
    "string" == typeof r
      ? (r = "string" == typeof e ? r + e : [Ya(r), e])
      : r.push("string" == typeof e ? Ya(e) : e);
  }
  for (const i of n) {
    const [e, t] = i;
    if (
      (s(`\n${JSON.stringify(e)}\n`),
      "string" == typeof t || t instanceof Uint8Array)
    )
      s(t);
    else {
      let e;
      try {
        e = JSON.stringify(t);
      } catch {
        e = JSON.stringify(Ro(t));
      }
      s(e);
    }
  }
  return "string" == typeof r
    ? r
    : (function (e) {
        const t = e.reduce((e, t) => e + t.length, 0),
          n = new Uint8Array(t);
        let r = 0;
        for (const s of e) (n.set(s, r), (r += s.length));
        return n;
      })(r);
}
function Qa(e) {
  const t = "string" == typeof e.data ? Ya(e.data) : e.data;
  return [
    {
      type: "attachment",
      length: t.length,
      filename: e.filename,
      content_type: e.contentType,
      attachment_type: e.attachmentType,
    },
    t,
  ];
}
var Xa = {
  sessions: "session",
  event: "error",
  client_report: "internal",
  user_report: "default",
  profile_chunk: "profile",
  replay_event: "replay",
  replay_recording: "replay",
  check_in: "monitor",
  raw_security: "security",
  log: "log_item",
  trace_metric: "metric",
};
function Za(e) {
  return (function (e) {
    return e in Xa;
  })(e)
    ? Xa[e]
    : e;
}
function ec(e) {
  if (!e?.sdk) return;
  const { name: t, version: n } = e.sdk;
  return { name: t, version: n };
}
function tc(e, t, n, r) {
  const s = ec(n),
    i = e.type && "replay_event" !== e.type ? e.type : "event";
  !(function (e, t) {
    if (!t) return e;
    const n = e.sdk || {};
    e.sdk = {
      ...n,
      name: n.name || t.name,
      version: n.version || t.version,
      integrations: [...(e.sdk?.integrations || []), ...(t.integrations || [])],
      packages: [...(e.sdk?.packages || []), ...(t.packages || [])],
      settings:
        e.sdk?.settings || t.settings
          ? { ...e.sdk?.settings, ...t.settings }
          : void 0,
    };
  })(e, n?.sdk);
  const o = (function (e, t, n, r) {
    const s = e.sdkProcessingMetadata?.dynamicSamplingContext;
    return {
      event_id: e.event_id,
      sent_at: new Date(bo()).toISOString(),
      ...(t && { sdk: t }),
      ...(!!n && r && { dsn: Ea(r) }),
      ...(s && { trace: s }),
    };
  })(e, s, r, t);
  return (delete e.sdkProcessingMetadata, za(o, [[{ type: i }, e]]));
}
function nc(e, t) {
  const {
    fingerprint: n,
    span: r,
    breadcrumbs: s,
    sdkProcessingMetadata: i,
  } = t;
  (!(function (e, t) {
    const {
      extra: n,
      tags: r,
      user: s,
      contexts: i,
      level: o,
      transactionName: a,
    } = t;
    Object.keys(n).length && (e.extra = { ...n, ...e.extra });
    Object.keys(r).length && (e.tags = { ...r, ...e.tags });
    Object.keys(s).length && (e.user = { ...s, ...e.user });
    Object.keys(i).length && (e.contexts = { ...i, ...e.contexts });
    o && (e.level = o);
    a && "transaction" !== e.type && (e.transaction = a);
  })(e, t),
    r &&
      (function (e, t) {
        ((e.contexts = { trace: ka(t), ...e.contexts }),
          (e.sdkProcessingMetadata = {
            dynamicSamplingContext: qa(t),
            ...e.sdkProcessingMetadata,
          }));
        const n = Ua(t),
          r = Ca(n).description;
        r && !e.transaction && "transaction" === e.type && (e.transaction = r);
      })(e, r),
    (function (e, t) {
      ((e.fingerprint = e.fingerprint
        ? Array.isArray(e.fingerprint)
          ? e.fingerprint
          : [e.fingerprint]
        : []),
        t && (e.fingerprint = e.fingerprint.concat(t)));
      e.fingerprint.length || delete e.fingerprint;
    })(e, n),
    (function (e, t) {
      const n = [...(e.breadcrumbs || []), ...t];
      e.breadcrumbs = n.length ? n : void 0;
    })(e, s),
    (function (e, t) {
      e.sdkProcessingMetadata = { ...e.sdkProcessingMetadata, ...t };
    })(e, i));
}
function rc(e, t) {
  const {
    extra: n,
    tags: r,
    attributes: s,
    user: i,
    contexts: o,
    level: a,
    sdkProcessingMetadata: c,
    breadcrumbs: u,
    fingerprint: l,
    eventProcessors: d,
    attachments: h,
    propagationContext: p,
    transactionName: f,
    span: m,
  } = t;
  (sc(e, "extra", n),
    sc(e, "tags", r),
    sc(e, "attributes", s),
    sc(e, "user", i),
    sc(e, "contexts", o),
    (e.sdkProcessingMetadata = Wo(e.sdkProcessingMetadata, c, 2)),
    a && (e.level = a),
    f && (e.transactionName = f),
    m && (e.span = m),
    u.length && (e.breadcrumbs = [...e.breadcrumbs, ...u]),
    l.length && (e.fingerprint = [...e.fingerprint, ...l]),
    d.length && (e.eventProcessors = [...e.eventProcessors, ...d]),
    h.length && (e.attachments = [...e.attachments, ...h]),
    (e.propagationContext = { ...e.propagationContext, ...p }));
}
function sc(e, t, n) {
  e[t] = Wo(e[t], n, 1);
}
function ic(e, t) {
  const n = Ii("globalScope", () => new ea()).getScopeData();
  return (e && rc(n, e.getScopeData()), t && rc(n, t.getScopeData()), n);
}
var oc = "user_agent.original";
function ac(e, t) {
  const n = e.attributes ?? (e.attributes = {});
  Object.entries(t).forEach(([e, t]) => {
    null == t || e in n || (n[e] = t);
  });
}
function cc(e) {
  return new fc((t) => {
    t(e);
  });
}
function uc(e) {
  return new fc((t, n) => {
    n(e);
  });
}
var lc,
  dc,
  hc,
  pc,
  fc = class e {
    constructor(e) {
      ((this._state = 0), (this._handlers = []), this._runExecutor(e));
    }
    then(t, n) {
      return new e((e, r) => {
        (this._handlers.push([
          !1,
          (n) => {
            if (t)
              try {
                e(t(n));
              } catch (s) {
                r(s);
              }
            else e(n);
          },
          (t) => {
            if (n)
              try {
                e(n(t));
              } catch (s) {
                r(s);
              }
            else r(t);
          },
        ]),
          this._executeHandlers());
      });
    }
    catch(e) {
      return this.then((e) => e, e);
    }
    finally(t) {
      return new e((e, n) => {
        let r, s;
        return this.then(
          (e) => {
            ((s = !1), (r = e), t && t());
          },
          (e) => {
            ((s = !0), (r = e), t && t());
          },
        ).then(() => {
          s ? n(r) : e(r);
        });
      });
    }
    _executeHandlers() {
      if (0 === this._state) return;
      const e = this._handlers.slice();
      ((this._handlers = []),
        e.forEach((e) => {
          e[0] ||
            (1 === this._state && e[1](this._value),
            2 === this._state && e[2](this._value),
            (e[0] = !0));
        }));
    }
    _runExecutor(e) {
      const t = (e, t) => {
          0 === this._state &&
            (ho(t)
              ? t.then(n, r)
              : ((this._state = e),
                (this._value = t),
                this._executeHandlers()));
        },
        n = (e) => {
          t(1, e);
        },
        r = (e) => {
          t(2, e);
        };
      try {
        e(n, r);
      } catch (s) {
        r(s);
      }
    }
  };
function mc(e, t, n, r = 0) {
  try {
    const s = gc(t, n, e, r);
    return ho(s) ? s : cc(s);
  } catch (s) {
    return uc(s);
  }
}
function gc(e, t, n, r) {
  const s = n[r];
  if (!e || !s) return e;
  const i = s({ ...e }, t);
  return (
    Ti &&
      null === i &&
      Li.log(`Event processor "${s.id || "?"}" dropped event`),
    ho(i) ? i.then((e) => gc(e, t, n, r + 1)) : gc(i, t, n, r + 1)
  );
}
function _c(e, t, n, r, s, i) {
  const { normalizeDepth: o = 3, normalizeMaxBreadth: a = 1e3 } = e,
    c = {
      ...t,
      event_id: t.event_id || n.event_id || Lo(),
      timestamp: t.timestamp || Bo(),
    },
    u = n.integrations || e.integrations.map((e) => e.name);
  (!(function (e, t) {
    const { environment: n, release: r, dist: s, maxValueLength: i } = t;
    ((e.environment = e.environment || n || "production"),
      !e.release && r && (e.release = r));
    !e.dist && s && (e.dist = s);
    const o = e.request;
    o?.url && i && (o.url = xo(o.url, i));
    i &&
      e.exception?.values?.forEach((e) => {
        e.value && (e.value = xo(e.value, i));
      });
  })(c, e),
    (function (e, t) {
      t.length > 0 &&
        ((e.sdk = e.sdk || {}),
        (e.sdk.integrations = [...(e.sdk.integrations || []), ...t]));
    })(c, u),
    s && s.emit("applyFrameMetadata", t),
    void 0 === t.type &&
      (function (e, t) {
        const n = (function (e) {
          const t = Ai._sentryDebugIds,
            n = Ai._debugIds;
          if (!t && !n) return {};
          const r = t ? Object.keys(t) : [],
            s = n ? Object.keys(n) : [];
          if (pc && r.length === dc && s.length === hc) return pc;
          ((dc = r.length), (hc = s.length), (pc = {}), lc || (lc = {}));
          const i = (t, n) => {
            for (const r of t) {
              const t = n[r],
                s = lc?.[r];
              if (s && pc && t) ((pc[s[0]] = t), lc && (lc[r] = [s[0], t]));
              else if (t) {
                const n = e(r);
                for (let e = n.length - 1; e >= 0; e--) {
                  const s = n[e]?.filename;
                  if (s && pc && lc) {
                    ((pc[s] = t), (lc[r] = [s, t]));
                    break;
                  }
                }
              }
            }
          };
          return (t && i(r, t), n && i(s, n), pc);
        })(t);
        e.exception?.values?.forEach((e) => {
          e.stacktrace?.frames?.forEach((e) => {
            e.filename && (e.debug_id = n[e.filename]);
          });
        });
      })(c, e.stackParser));
  const l = (function (e, t) {
    if (!t) return e;
    const n = e ? e.clone() : new ea();
    return (n.update(t), n);
  })(r, n.captureContext);
  n.mechanism && jo(c, n.mechanism);
  const d = s ? s.getEventProcessors() : [],
    h = ic(i, l),
    p = [...(n.attachments || []), ...h.attachments];
  (p.length && (n.attachments = p), nc(c, h));
  const f = [...d, ...h.eventProcessors];
  return (n.data && !0 === n.data.__sentry__ ? cc(c) : mc(f, c, n)).then(
    (e) => (
      e &&
        (function (e) {
          const t = {};
          if (
            (e.exception?.values?.forEach((e) => {
              e.stacktrace?.frames?.forEach((e) => {
                e.debug_id &&
                  (e.abs_path
                    ? (t[e.abs_path] = e.debug_id)
                    : e.filename && (t[e.filename] = e.debug_id),
                  delete e.debug_id);
              });
            }),
            0 === Object.keys(t).length)
          )
            return;
          ((e.debug_meta = e.debug_meta || {}),
            (e.debug_meta.images = e.debug_meta.images || []));
          const n = e.debug_meta.images;
          Object.entries(t).forEach(([e, t]) => {
            n.push({ type: "sourcemap", code_file: e, debug_id: t });
          });
        })(e),
      "number" == typeof o && o > 0
        ? (function (e, t, n) {
            if (!e) return null;
            const r = {
              ...e,
              ...(e.breadcrumbs && {
                breadcrumbs: e.breadcrumbs.map((e) => ({
                  ...e,
                  ...(e.data && { data: Ro(e.data, t, n) }),
                })),
              }),
              ...(e.user && { user: Ro(e.user, t, n) }),
              ...(e.contexts && { contexts: Ro(e.contexts, t, n) }),
              ...(e.extra && { extra: Ro(e.extra, t, n) }),
            };
            e.contexts?.trace &&
              r.contexts &&
              ((r.contexts.trace = e.contexts.trace),
              e.contexts.trace.data &&
                (r.contexts.trace.data = Ro(e.contexts.trace.data, t, n)));
            e.spans &&
              (r.spans = e.spans.map((e) => ({
                ...e,
                ...(e.data && { data: Ro(e.data, t, n) }),
              })));
            e.contexts?.flags &&
              r.contexts &&
              (r.contexts.flags = Ro(e.contexts.flags, 3, n));
            return r;
          })(e, o, a)
        : e
    ),
  );
}
function yc(e) {
  if (e)
    return (function (e) {
      return e instanceof ea || "function" == typeof e;
    })(e) ||
      (function (e) {
        return Object.keys(e).some((e) => vc.includes(e));
      })(e)
      ? { captureContext: e }
      : e;
}
var vc = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext",
];
function wc(e, t) {
  return ha().captureException(e, yc(t));
}
function Ec(e, t) {
  const n = "string" == typeof t ? t : void 0,
    r = "string" != typeof t ? { captureContext: t } : void 0;
  return ha().captureMessage(e, n, r);
}
function Sc(e, t) {
  return ha().captureEvent(e, t);
}
function bc(e) {
  const t = pa(),
    { user: n } = ic(t, ha()),
    { userAgent: r } = Ai.navigator || {},
    s = qo({ user: n, ...(r && { userAgent: r }), ...e }),
    i = t.getSession();
  return (
    "ok" === i?.status && zo(i, { status: "exited" }),
    Tc(),
    t.setSession(s),
    s
  );
}
function Tc() {
  const e = pa(),
    t = ha().getSession() || e.getSession();
  (t &&
    (function (e, t) {
      let n = {};
      (t
        ? (n = { status: t })
        : "ok" === e.status && (n = { status: "exited" }),
        zo(e, n));
    })(t),
    Ac(),
    e.setSession());
}
function Ac() {
  const e = pa(),
    t = fa(),
    n = e.getSession();
  n && t && t.captureSession(n);
}
function kc(e = !1) {
  e ? Tc() : Ac();
}
function Oc(e) {
  return ("object" == typeof e && "function" == typeof e.unref && e.unref(), e);
}
function Rc(e, t, n) {
  return (
    t ||
    `${(function (e) {
      return `${(function (e) {
        const t = e.protocol ? `${e.protocol}:` : "",
          n = e.port ? `:${e.port}` : "";
        return `${t}//${e.host}${n}${e.path ? `/${e.path}` : ""}/api/`;
      })(e)}${e.projectId}/envelope/`;
    })(e)}?${(function (e, t) {
      const n = { sentry_version: "7" };
      return (
        e.publicKey && (n.sentry_key = e.publicKey),
        t && (n.sentry_client = `${t.name}/${t.version}`),
        new URLSearchParams(n).toString()
      );
    })(e, n)}`
  );
}
var Ic = [];
function Cc(e) {
  const t = e.defaultIntegrations || [],
    n = e.integrations;
  let r;
  if (
    (t.forEach((e) => {
      e.isDefaultInstance = !0;
    }),
    Array.isArray(n))
  )
    r = [...t, ...n];
  else if ("function" == typeof n) {
    const e = n(t);
    r = Array.isArray(e) ? e : [e];
  } else r = t;
  return (function (e) {
    const t = {};
    return (
      e.forEach((e) => {
        const { name: n } = e,
          r = t[n];
        (r && !r.isDefaultInstance && e.isDefaultInstance) || (t[n] = e);
      }),
      Object.values(t)
    );
  })(r);
}
function Dc(e, t) {
  for (const n of t) n?.afterAllSetup && n.afterAllSetup(e);
}
function xc(e, t, n) {
  if (n[t.name])
    Ti &&
      Li.log(`Integration skipped because it was already installed: ${t.name}`);
  else {
    if (
      ((n[t.name] = t),
      Ic.includes(t.name) ||
        "function" != typeof t.setupOnce ||
        (t.setupOnce(), Ic.push(t.name)),
      t.setup && "function" == typeof t.setup && t.setup(e),
      "function" == typeof t.preprocessEvent)
    ) {
      const n = t.preprocessEvent.bind(t);
      e.on("preprocessEvent", (t, r) => n(t, r, e));
    }
    if ("function" == typeof t.processEvent) {
      const n = t.processEvent.bind(t),
        r = Object.assign((t, r) => n(t, r, e), { id: t.name });
      e.addEventProcessor(r);
    }
    (["processSpan", "processSegmentSpan"].forEach((n) => {
      const r = t[n];
      "function" == typeof r && e.on(n, (n) => r.call(t, n, e));
    }),
      Ti && Li.log(`Integration installed: ${t.name}`));
  }
}
function Uc() {
  return (
    !(
      "undefined" != typeof __SENTRY_BROWSER_BUNDLE__ &&
      __SENTRY_BROWSER_BUNDLE__
    ) &&
    "[object process]" ===
      Object.prototype.toString.call(
        "undefined" != typeof process ? process : 0,
      )
  );
}
function Pc() {
  return (
    "undefined" != typeof window && (!Uc() || "renderer" === Ai.process?.type)
  );
}
function Nc(e, t) {
  const n = t ? "auto" : "never";
  return [
    {
      type: "log",
      item_count: e.length,
      content_type: "application/vnd.sentry.items.log+json",
    },
    {
      version: 2,
      ...(Pc() && { ingest_settings: { infer_ip: n, infer_user_agent: n } }),
      items: e,
    },
  ];
}
function Lc(e, t) {
  const n =
    t ??
    (function (e) {
      return Fc().get(e);
    })(e) ??
    [];
  if (0 === n.length) return;
  const r = e.getOptions(),
    s = (function (e, t, n, r, s) {
      const i = {};
      return (
        t?.sdk && (i.sdk = { name: t.sdk.name, version: t.sdk.version }),
        n && r && (i.dsn = Ea(r)),
        za(i, [Nc(e, s)])
      );
    })(
      n,
      r._metadata,
      r.tunnel,
      e.getDsn(),
      e.getDataCollectionOptions().userInfo,
    );
  (Fc().set(e, []), e.emit("flushLogs"), e.sendEnvelope(s));
}
function Fc() {
  return Ii("clientToLogBufferMap", () => new WeakMap());
}
function $c(e, t) {
  const n = t ? "auto" : "never";
  return [
    {
      type: "trace_metric",
      item_count: e.length,
      content_type: "application/vnd.sentry.items.trace-metric+json",
    },
    {
      version: 2,
      ...(Pc() && { ingest_settings: { infer_ip: n, infer_user_agent: n } }),
      items: e,
    },
  ];
}
function Mc(e, t) {
  const n =
    t ??
    (function (e) {
      return jc().get(e);
    })(e) ??
    [];
  if (0 === n.length) return;
  const r = e.getOptions(),
    s = (function (e, t, n, r, s) {
      const i = {};
      return (
        t?.sdk && (i.sdk = { name: t.sdk.name, version: t.sdk.version }),
        n && r && (i.dsn = Ea(r)),
        za(i, [$c(e, s)])
      );
    })(
      n,
      r._metadata,
      r.tunnel,
      e.getDsn(),
      e.getDataCollectionOptions().userInfo,
    );
  (jc().set(e, []), e.emit("flushMetrics"), e.sendEnvelope(s));
}
function jc() {
  return Ii("clientToMetricBufferMap", () => new WeakMap());
}
function Hc(e) {
  const t = {
    trace_id: e.trace_id,
    span_id: e.span_id,
    parent_span_id: e.parent_span_id,
    name: e.description || "",
    start_timestamp: e.start_timestamp,
    end_timestamp: e.timestamp || e.start_timestamp,
    status:
      e.status && "ok" !== e.status && "cancelled" !== e.status
        ? "error"
        : "ok",
    is_segment: !1,
    attributes: { ...e.data },
    links: e.links,
  };
  return (
    (n = t),
    {
      ...n,
      attributes: da(n.attributes),
      links: n.links?.map((e) => ({ ...e, attributes: da(e.attributes) })),
    }
  );
  var n;
}
var Kc = Symbol.for("SentryBufferFullError");
function Bc(e = 100) {
  const t = new Set();
  function n(e) {
    t.delete(e);
  }
  return {
    get $() {
      return Array.from(t);
    },
    add: function (r) {
      if (!(t.size < e)) return uc(Kc);
      const s = r();
      return (
        t.add(s),
        s.then(
          () => n(s),
          () => n(s),
        ),
        s
      );
    },
    drain: function (e) {
      if (!t.size) return cc(!0);
      const n = Promise.allSettled(Array.from(t)).then(() => !0);
      if (!e) return n;
      const r = [n, new Promise((t) => Oc(setTimeout(() => t(!1), e)))];
      return Promise.race(r);
    },
  };
}
function Gc(e, { statusCode: t, headers: n }, r = bo()) {
  const s = { ...e },
    i = n?.["x-sentry-rate-limits"],
    o = n?.["retry-after"];
  if (i)
    for (const a of i.trim().split(",")) {
      const [e, t, , , n] = a.split(":", 5),
        i = parseInt(e, 10),
        o = 1e3 * (isNaN(i) ? 60 : i);
      if (t)
        for (const a of t.split(";"))
          ("metric_bucket" === a && n && !n.split(";").includes("custom")) ||
            (s[a] = r + o);
      else s.all = r + o;
    }
  else
    o
      ? (s.all =
          r +
          (function (e, t = bo()) {
            const n = parseInt(`${e}`, 10);
            if (!isNaN(n)) return 1e3 * n;
            const r = Date.parse(`${e}`);
            return isNaN(r) ? 6e4 : r - t;
          })(o, r))
      : 429 === t && (s.all = r + 6e4);
  return s;
}
function qc(e, t, n = Bc(e.bufferSize || 64)) {
  let r = {};
  return {
    send: function (s) {
      const i = [];
      if (
        (Va(s, (t, n) => {
          const s = Za(n);
          !(function (e, t, n = bo()) {
            return (
              (function (e, t) {
                return e[t] || e.all || 0;
              })(e, t) > n
            );
          })(r, s)
            ? i.push(t)
            : e.recordDroppedEvent("ratelimit_backoff", s);
        }),
        0 === i.length)
      )
        return Promise.resolve({});
      const o = za(s[0], i),
        a = (t) => {
          !(function (e, t) {
            return Va(e, (e, n) => t.includes(n));
          })(o, ["client_report"])
            ? Va(o, (n, r) => {
                e.recordDroppedEvent(t, Za(r));
              })
            : Ti &&
              Li.warn(
                `Dropping client report. Will not send outcomes (reason: ${t}).`,
              );
        };
      return n
        .add(() =>
          t({ body: Ja(o) }).then(
            (e) =>
              413 === e.statusCode
                ? (Ti &&
                    Li.error(
                      "Sentry responded with status code 413. Envelope was discarded due to exceeding size limits.",
                    ),
                  a("send_error"),
                  e)
                : (Ti &&
                    void 0 !== e.statusCode &&
                    (e.statusCode < 200 || e.statusCode >= 300) &&
                    Li.warn(
                      `Sentry responded with status code ${e.statusCode} to sent event.`,
                    ),
                  (r = Gc(r, e)),
                  e),
            (e) => {
              throw (
                a("network_error"),
                Ti &&
                  Li.error("Encountered error running transport request:", e),
                e
              );
            },
          ),
        )
        .then(
          (e) => e,
          (e) => {
            if (e === Kc)
              return (
                Ti && Li.error("Skipped sending event because buffer is full."),
                a("queue_overflow"),
                Promise.resolve({})
              );
            throw e;
          },
        );
    },
    flush: (e) => n.drain(e),
  };
}
function zc(e) {
  const t = [];
  e.message && t.push(e.message);
  try {
    const n = e.exception.values[e.exception.values.length - 1];
    n?.value && (t.push(n.value), n.type && t.push(`${n.type}: ${n.value}`));
  } catch {}
  return t;
}
var Wc = ["forwarded", "-ip", "remote-", "via", "-user"];
var Vc = {
  userInfo: !0,
  cookies: !0,
  httpHeaders: { request: !0, response: !0 },
  httpBodies: [
    "incomingRequest",
    "outgoingRequest",
    "incomingResponse",
    "outgoingResponse",
  ],
  urlQueryParams: !0,
  graphQL: { document: !0, variables: !0 },
  genAI: { inputs: !0, outputs: !0 },
  databaseQueryData: !0,
  stackFrameVariables: !0,
  frameContextLines: 5,
};
function Yc(e) {
  const t =
    null != e.dataCollection
      ? Vc
      : !0 === e.sendDefaultPii
        ? {
            userInfo: !0,
            cookies: !0,
            httpHeaders: { request: !0, response: !0 },
            httpBodies: [
              "incomingRequest",
              "outgoingRequest",
              "incomingResponse",
              "outgoingResponse",
            ],
            urlQueryParams: !0,
            graphQL: { document: !0, variables: !0 },
            genAI: { inputs: !0, outputs: !0 },
            databaseQueryData: !0,
            stackFrameVariables: !0,
            frameContextLines: 7,
          }
        : {
            userInfo: !1,
            cookies: { deny: Wc },
            httpHeaders: { request: { deny: Wc }, response: { deny: Wc } },
            httpBodies: [],
            urlQueryParams: { deny: Wc },
            graphQL: { document: !0, variables: !0 },
            genAI: { inputs: !1, outputs: !1 },
            databaseQueryData: !1,
            stackFrameVariables: !0,
            frameContextLines: 7,
          };
  const n = e.dataCollection ?? {};
  return {
    userInfo: n.userInfo ?? t.userInfo,
    cookies: n.cookies ?? t.cookies,
    httpHeaders: {
      request: n.httpHeaders?.request ?? t.httpHeaders.request,
      response: n.httpHeaders?.response ?? t.httpHeaders.response,
    },
    httpBodies: n.httpBodies ?? t.httpBodies,
    urlQueryParams: n.urlQueryParams ?? n.queryParams ?? t.urlQueryParams,
    graphQL: {
      document: n.graphQL?.document ?? t.graphQL.document,
      variables: n.graphQL?.variables ?? t.graphQL.variables,
    },
    genAI: {
      inputs: n.genAI?.inputs ?? t.genAI.inputs,
      outputs: n.genAI?.outputs ?? t.genAI.outputs,
    },
    databaseQueryData: n.databaseQueryData ?? t.databaseQueryData,
    stackFrameVariables: n.stackFrameVariables ?? t.stackFrameVariables,
    frameContextLines: n.frameContextLines ?? t.frameContextLines,
  };
}
var Jc = "Not capturing exception because it's already been captured.",
  Qc = "Discarded session because of missing or non-string release",
  Xc = Symbol.for("SentryInternalError"),
  Zc = Symbol.for("SentryDoNotSendEventError");
function eu(e) {
  return { message: e, [Xc]: !0 };
}
function tu(e) {
  return { message: e, [Zc]: !0 };
}
function nu(e) {
  return uo(e) && Xc in e;
}
function ru(e) {
  return uo(e) && Zc in e;
}
function su(e, t, n, r, s) {
  let i,
    o = 0,
    a = !1;
  (e.on(n, () => {
    ((o = 0), clearTimeout(i), (a = !1));
  }),
    e.on(t, (t) => {
      if (((o += r(t)), o >= 8e5)) s(e);
      else if (!a) {
        const t = e.getOptions()._flushInterval ?? 5e3;
        t > 0 &&
          ((a = !0),
          (i = Oc(
            setTimeout(() => {
              s(e);
            }, t),
          )));
      }
    }),
    e.on("flush", () => {
      s(e);
    }));
}
var iu = class {
  constructor(e) {
    if (
      ((this._options = e),
      (this._integrations = {}),
      (this._numProcessing = 0),
      (this._outcomes = {}),
      (this._hooks = {}),
      (this._eventProcessors = []),
      (this._promiseBuffer = Bc(e.transportOptions?.bufferSize ?? 64)),
      (this._dataCollection = Yc(e)),
      e.dsn
        ? (this._dsn = Ta(e.dsn))
        : Ti && Li.warn("No DSN provided, client will not send events."),
      this._dsn)
    ) {
      const t = Rc(this._dsn, e.tunnel, e._metadata ? e._metadata.sdk : void 0);
      this._transport = e.transport({
        tunnel: this._options.tunnel,
        recordDroppedEvent: this.recordDroppedEvent.bind(this),
        ...e.transportOptions,
        url: t,
      });
    }
    ((this._options.enableLogs =
      this._options.enableLogs ?? this._options._experiments?.enableLogs ?? !0),
      this._options.enableLogs &&
        su(this, "afterCaptureLog", "flushLogs", lu, Lc),
      (this._options.enableMetrics ??
        this._options._experiments?.enableMetrics ??
        1) &&
        su(this, "afterCaptureMetric", "flushMetrics", uu, Mc));
  }
  captureException(e, t, n) {
    const r = Lo();
    if (Ho(e)) return (Ti && Li.log(Jc), r);
    const s = { event_id: r, ...t };
    return (
      this._process(
        () =>
          this.eventFromException(e, s)
            .then((e) => this._captureEvent(e, s, n))
            .then((e) => e),
        "error",
      ),
      s.event_id
    );
  }
  captureMessage(e, t, n, r) {
    const s = { event_id: Lo(), ...n },
      i = oo(e) ? e : String(e),
      o = ao(e),
      a = o ? this.eventFromMessage(i, t, s) : this.eventFromException(e, s);
    return (
      this._process(
        () => a.then((e) => this._captureEvent(e, s, r)),
        o ? "unknown" : "error",
      ),
      s.event_id
    );
  }
  captureEvent(e, t, n) {
    const r = Lo();
    if (t?.originalException && Ho(t.originalException))
      return (Ti && Li.log(Jc), r);
    const s = { event_id: r, ...t },
      i = e.sdkProcessingMetadata || {},
      o = i.capturedSpanScope,
      a = i.capturedSpanIsolationScope,
      c = ou(e.type);
    return (
      this._process(() => this._captureEvent(e, s, o || n, a), c),
      s.event_id
    );
  }
  captureSession(e) {
    (this.sendSession(e), zo(e, { init: !1 }));
  }
  getDsn() {
    return this._dsn;
  }
  getOptions() {
    return this._options;
  }
  getDataCollectionOptions() {
    return this._dataCollection;
  }
  getSdkMetadata() {
    return this._options._metadata;
  }
  getTransport() {
    return this._transport;
  }
  async flush(e) {
    const t = this._transport;
    if ((this.emit("flush"), !t)) return !0;
    const n = await this._isClientDoneProcessing(e),
      r = await t.flush(e);
    return n && r;
  }
  async close(e) {
    const t = await this.flush(e);
    return ((this.getOptions().enabled = !1), this.emit("close"), t);
  }
  getEventProcessors() {
    return this._eventProcessors;
  }
  addEventProcessor(e) {
    this._eventProcessors.push(e);
  }
  init() {
    (this._isEnabled() ||
      this._options.integrations.some(({ name: e }) =>
        e.startsWith("Spotlight"),
      )) &&
      this._setupIntegrations();
  }
  getIntegrationByName(e) {
    return this._integrations[e];
  }
  getIntegrationNames() {
    return Object.keys(this._integrations);
  }
  addIntegration(e) {
    const t = this._integrations[e.name];
    (!t && e.beforeSetup && e.beforeSetup(this),
      xc(this, e, this._integrations),
      t || Dc(this, [e]));
  }
  sendEvent(e, t = {}) {
    this.emit("beforeSendEvent", e, t);
    const n = (function (e, t) {
      if (
        "transaction" !== e.type ||
        !e.spans?.length ||
        !e.sdkProcessingMetadata?.hasGenAiSpans ||
        !1 === t.getOptions().streamGenAiSpans ||
        (function (e) {
          return "stream" === e.getOptions().traceLifecycle;
        })(t)
      )
        return;
      const n = [],
        r = [];
      for (const i of e.spans)
        i.op?.startsWith("gen_ai.") ? n.push(Hc(i)) : r.push(i);
      if (0 === n.length) return;
      e.spans = r;
      const s = t.getDataCollectionOptions().userInfo ? "auto" : "never";
      return [
        {
          type: "span",
          item_count: n.length,
          content_type: "application/vnd.sentry.items.span.v2+json",
        },
        {
          version: 2,
          ...(Pc() && {
            ingest_settings: { infer_ip: s, infer_user_agent: s },
          }),
          items: n,
        },
      ];
    })(e, this);
    let r = tc(e, this._dsn, this._options._metadata, this._options.tunnel);
    for (const s of t.attachments || []) r = Wa(r, Qa(s));
    (n && (r = Wa(r, n)),
      this.sendEnvelope(r).then((t) => this.emit("afterSendEvent", e, t)));
  }
  sendSession(e) {
    const { release: t, environment: n = Ka } = this._options;
    if ("aggregates" in e) {
      const r = e.attrs || {};
      if (!r.release && !t) return void (Ti && Li.warn(Qc));
      ((r.release = r.release || t),
        (r.environment = r.environment || n),
        (e.attrs = r));
    } else {
      if (!e.release && !t) return void (Ti && Li.warn(Qc));
      ((e.release = e.release || t), (e.environment = e.environment || n));
    }
    this.emit("beforeSendSession", e);
    const r = (function (e, t, n, r) {
      const s = ec(n);
      return za(
        {
          sent_at: new Date(bo()).toISOString(),
          ...(s && { sdk: s }),
          ...(!!r && t && { dsn: Ea(t) }),
        },
        [
          "aggregates" in e
            ? [{ type: "sessions" }, e]
            : [{ type: "session" }, e.toJSON()],
        ],
      );
    })(e, this._dsn, this._options._metadata, this._options.tunnel);
    this.sendEnvelope(r);
  }
  recordDroppedEvent(e, t, n = 1) {
    if (this._options.sendClientReports) {
      const r = `${e}:${t}`;
      (Ti && Li.log(`Recording outcome: "${r}"${n > 1 ? ` (${n} times)` : ""}`),
        (this._outcomes[r] = (this._outcomes[r] || 0) + n));
    }
  }
  on(e, t) {
    const n = (this._hooks[e] = this._hooks[e] || new Set()),
      r = (...e) => t(...e);
    return (
      n.add(r),
      () => {
        n.delete(r);
      }
    );
  }
  emit(e, ...t) {
    const n = this._hooks[e];
    n && n.forEach((e) => e(...t));
  }
  async sendEnvelope(e) {
    if ((this.emit("beforeEnvelope", e), this._isEnabled() && this._transport))
      try {
        return await this._transport.send(e);
      } catch (t) {
        return (Ti && Li.error("Error while sending envelope:", t), {});
      }
    return (Ti && Li.error("Transport disabled"), {});
  }
  registerCleanup(e) {}
  dispose() {}
  _setupIntegrations() {
    const { integrations: e } = this._options;
    ((this._integrations = (function (e, t) {
      const n = {};
      return (
        t.forEach((t) => {
          t?.beforeSetup && t.beforeSetup(e);
        }),
        t.forEach((t) => {
          t && xc(e, t, n);
        }),
        n
      );
    })(this, e)),
      Dc(this, e));
  }
  _updateSessionFromEvent(e, t) {
    let n = "fatal" === t.level,
      r = !1;
    const s = t.exception?.values;
    if (s) {
      ((r = !0), (n = !1));
      for (const e of s)
        if (!1 === e.mechanism?.handled) {
          n = !0;
          break;
        }
    }
    const i = "ok" === e.status;
    ((i && 0 === e.errors) || (i && n)) &&
      (zo(e, {
        ...(n && { status: "crashed" }),
        errors: e.errors || Number(r || n),
      }),
      this.captureSession(e));
  }
  async _isClientDoneProcessing(e) {
    let t = 0;
    for (; !e || t < e;) {
      if ((await new Promise((e) => setTimeout(e, 1)), !this._numProcessing))
        return !0;
      t++;
    }
    return !1;
  }
  _isEnabled() {
    return !1 !== this.getOptions().enabled && void 0 !== this._transport;
  }
  _prepareEvent(e, t, n, r) {
    const s = this.getOptions(),
      i = this.getIntegrationNames();
    return (
      !t.integrations && i.length && (t.integrations = i),
      this.emit("preprocessEvent", e, t),
      e.type || r.setLastEventId(e.event_id || t.event_id),
      _c(s, e, t, n, this, r).then(
        (e) => (
          null === e ||
            (this.emit("postprocessEvent", e, t),
            (e.contexts = {
              trace: { ...e.contexts?.trace, ...ma(n) },
              ...e.contexts,
            }),
            (e.sdkProcessingMetadata = {
              dynamicSamplingContext: Ga(this, n),
              ...e.sdkProcessingMetadata,
            })),
          e
        ),
      )
    );
  }
  _captureEvent(e, t = {}, n = ha(), r = pa()) {
    return (
      Ti &&
        au(e) &&
        Li.log(`Captured error event \`${zc(e)[0] || "<unknown>"}\``),
      this._processEvent(e, t, n, r).then(
        (e) => e.event_id,
        (e) => {
          Ti &&
            (ru(e)
              ? Li.log(e.message)
              : nu(e)
                ? Li.warn(e.message)
                : Li.warn(e));
        },
      )
    );
  }
  _processEvent(e, t, n, r) {
    const s = this.getOptions(),
      { sampleRate: i } = s,
      o = cu(e),
      a = au(e),
      c = `before send for type \`${e.type || "error"}\``,
      u =
        void 0 === i
          ? void 0
          : (function (e) {
              if ("boolean" == typeof e) return Number(e);
              const t = "string" == typeof e ? parseFloat(e) : e;
              return "number" != typeof t || isNaN(t) || t < 0 || t > 1
                ? void 0
                : t;
            })(i),
      l = ou(e.type);
    return this._prepareEvent(e, t, n, r)
      .then((e) => {
        if (null === e)
          throw (
            this.recordDroppedEvent("event_processor", l),
            tu("An event processor returned `null`, will not send event.")
          );
        return !0 === t.data?.__sentry__
          ? e
          : (function (e, t) {
              const n = `${t} must return \`null\` or a valid event.`;
              if (ho(e))
                return e.then(
                  (e) => {
                    if (!co(e) && null !== e) throw eu(n);
                    return e;
                  },
                  (e) => {
                    throw eu(`${t} rejected with ${e}`);
                  },
                );
              if (!co(e) && null !== e) throw eu(n);
              return e;
            })(
              (function (e, t, n, r) {
                const {
                    beforeSend: s,
                    beforeSendTransaction: i,
                    ignoreSpans: o,
                  } = t,
                  a =
                    ((c = t.beforeSendSpan),
                    !(
                      c &&
                      "function" == typeof c &&
                      "_streamed" in c &&
                      c._streamed
                    ) && t.beforeSendSpan);
                var c;
                let u = n;
                if (au(u) && s) return s(u, r);
                if (cu(u)) {
                  if (a || o) {
                    const t = (function (e) {
                      const {
                        trace_id: t,
                        parent_span_id: n,
                        span_id: r,
                        status: s,
                        origin: i,
                        data: o,
                        op: a,
                      } = e.contexts?.trace ?? {};
                      return {
                        data: o ?? {},
                        description: e.transaction,
                        op: a,
                        parent_span_id: n,
                        span_id: r ?? "",
                        start_timestamp: e.start_timestamp ?? 0,
                        status: s,
                        timestamp: e.timestamp,
                        trace_id: t ?? "",
                        origin: i,
                        profile_id: o?.["sentry.profile_id"],
                        exclusive_time: o?.["sentry.exclusive_time"],
                        measurements: e.measurements,
                        is_segment: !0,
                      };
                    })(u);
                    if (
                      o?.length &&
                      Fa(
                        {
                          description: t.description,
                          op: t.op,
                          attributes: t.data,
                        },
                        o,
                      )
                    )
                      return null;
                    if (a) {
                      const e = a(t);
                      e
                        ? (u = Wo(n, {
                            type: "transaction",
                            timestamp: (l = e).timestamp,
                            start_timestamp: l.start_timestamp,
                            transaction: l.description,
                            contexts: {
                              trace: {
                                trace_id: l.trace_id,
                                span_id: l.span_id,
                                parent_span_id: l.parent_span_id,
                                op: l.op,
                                status: l.status,
                                origin: l.origin,
                                data: {
                                  ...l.data,
                                  ...(l.profile_id && {
                                    "sentry.profile_id": l.profile_id,
                                  }),
                                  ...(l.exclusive_time && {
                                    "sentry.exclusive_time": l.exclusive_time,
                                  }),
                                },
                              },
                            },
                            measurements: l.measurements,
                          }))
                        : Pa();
                    }
                    if (u.spans) {
                      const t = [],
                        n = u.spans;
                      for (const e of n)
                        if (
                          o?.length &&
                          Fa(
                            {
                              description: e.description,
                              op: e.op,
                              attributes: e.data,
                            },
                            o,
                          )
                        )
                          Ma(n, e);
                        else if (a) {
                          const n = a(e);
                          n ? t.push(n) : (Pa(), t.push(e));
                        } else t.push(e);
                      const r = u.spans.length - t.length;
                      (r && e.recordDroppedEvent("before_send", "span", r),
                        (u.spans = t));
                    }
                  }
                  if (i) {
                    if (u.spans) {
                      const e = u.spans.length;
                      u.sdkProcessingMetadata = {
                        ...n.sdkProcessingMetadata,
                        spanCountBeforeProcessing: e,
                      };
                    }
                    return i(u, r);
                  }
                }
                var l;
                return u;
              })(this, s, e, t),
              c,
            );
      })
      .then((s) => {
        if (null === s) {
          if ((this.recordDroppedEvent("before_send", l), o)) {
            const t = 1 + (e.spans || []).length;
            this.recordDroppedEvent("before_send", "span", t);
          }
          throw tu(`${c} returned \`null\`, will not send event.`);
        }
        const d = n.getSession() || r.getSession();
        if (
          (a && d && this._updateSessionFromEvent(d, s),
          a && "number" == typeof u && So() > u)
        )
          throw (
            this.recordDroppedEvent("sample_rate", "error"),
            tu(
              `Discarding event because it's not included in the random sample (sampling rate = ${i})`,
            )
          );
        if (o) {
          const e =
            (s.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) -
            (s.spans ? s.spans.length : 0);
          e > 0 && this.recordDroppedEvent("before_send", "span", e);
        }
        const h = s.transaction_info;
        if (o && h && s.transaction !== e.transaction) {
          const e = "custom";
          s.transaction_info = { ...h, source: e };
        }
        return (this.sendEvent(s, t), s);
      })
      .then(null, (e) => {
        if (ru(e) || nu(e)) throw e;
        throw (
          this.captureException(e, {
            mechanism: { handled: !1, type: "internal" },
            data: { __sentry__: !0 },
            originalException: e,
          }),
          eu(
            `Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${e}`,
          )
        );
      });
  }
  _process(e, t) {
    (this._numProcessing++,
      this._promiseBuffer.add(e).then(
        (e) => (this._numProcessing--, e),
        (e) => (
          this._numProcessing--,
          e === Kc && this.recordDroppedEvent("queue_overflow", t),
          e
        ),
      ));
  }
  _clearOutcomes() {
    const e = this._outcomes;
    return (
      (this._outcomes = {}),
      Object.entries(e).map(([e, t]) => {
        const [n, r] = e.split(":");
        return { reason: n, category: r, quantity: t };
      })
    );
  }
  _flushOutcomes() {
    Ti && Li.log("Flushing outcomes...");
    const e = this._clearOutcomes();
    if (0 === e.length) return void (Ti && Li.log("No outcomes to send"));
    if (!this._dsn)
      return void (Ti && Li.log("No dsn provided, will not send outcomes"));
    Ti && Li.log("Sending outcomes:", e);
    const t =
      ((n = e),
      za((r = this._options.tunnel && Ea(this._dsn)) ? { dsn: r } : {}, [
        [
          { type: "client_report" },
          { timestamp: s || Bo(), discarded_events: n },
        ],
      ]));
    var n, r, s;
    this.sendEnvelope(t);
  }
};
function ou(e) {
  return "replay_event" === e ? "replay" : e || "error";
}
function au(e) {
  return void 0 === e.type;
}
function cu(e) {
  return "transaction" === e.type;
}
function uu(e) {
  let t = 0;
  return (e.name && (t += 2 * e.name.length), (t += 8), t + du(e.attributes));
}
function lu(e) {
  let t = 0;
  return (e.message && (t += 2 * e.message.length), t + du(e.attributes));
}
function du(e) {
  if (!e) return 0;
  let t = 0;
  return (
    Object.values(e).forEach((e) => {
      Array.isArray(e)
        ? (t += e.length * hu(e[0]))
        : ao(e)
          ? (t += hu(e))
          : (t += 100);
    }),
    t
  );
}
function hu(e) {
  return "string" == typeof e
    ? 2 * e.length
    : "number" == typeof e
      ? 8
      : "boolean" == typeof e
        ? 4
        : 0;
}
function pu(e, t) {
  (!0 === t.debug && (Ti ? Li.enable() : xi(() => {})),
    ha().update(t.initialScope));
  const n = new e(t);
  return (
    (function (e) {
      ha().setClient(e);
    })(n),
    n.init(),
    n
  );
}
function fu(e) {
  if (!e) return {};
  const t = e.match(
    /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
  );
  if (!t) return {};
  const n = t[6] || "",
    r = t[8] || "";
  return {
    host: t[4],
    path: t[5],
    protocol: t[2],
    search: n,
    hash: r,
    relative: t[5] + n + r,
  };
}
function mu(e) {
  "aggregates" in e
    ? void 0 === e.attrs?.ip_address &&
      (e.attrs = { ...e.attrs, ip_address: "{{auto}}" })
    : void 0 === e.ipAddress && (e.ipAddress = "{{auto}}");
}
var gu = 100;
function _u(e, t) {
  const n = fa(),
    r = pa();
  if (!n) return;
  const { beforeBreadcrumb: s = null, maxBreadcrumbs: i = gu } = n.getOptions();
  if (i <= 0) return;
  const o = { timestamp: Bo(), ...e },
    a = s ? xi(() => s(o, t)) : o;
  null !== a &&
    (n.emit && n.emit("beforeAddBreadcrumb", a, t), r.addBreadcrumb(a, i));
}
var yu = new WeakMap(),
  vu = () => ({
    name: "FunctionToString",
    setupOnce() {
      const e = Function.prototype.toString;
      try {
        Function.prototype.toString = function (...t) {
          const n = yo(this);
          let r;
          try {
            yu.has(fa()) && void 0 !== n && (r = n);
          } catch {}
          return e.apply(r ?? this, t);
        };
      } catch {}
    },
    setup(e) {
      yu.set(e, !0);
    },
  }),
  wu = [
    /^Script error\.?$/,
    /^Javascript error: Script error\.? on line 0$/,
    /^ResizeObserver loop completed with undelivered notifications.$/,
    /^Cannot redefine property: googletag$/,
    /^Can't find variable: gmo$/,
    /^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
    /can't redefine non-configurable property "solana"/,
    /vv\(\)\.getRestrictions is not a function/,
    /Can't find variable: _AutofillCallbackHandler/,
    /Object Not Found Matching Id:\d+, MethodName:simulateEvent/,
    /Java exception was raised during method invocation$/,
    /Java object is gone$/,
  ],
  Eu = (e = {}) => {
    let t;
    return {
      name: "EventFilters",
      setup(n) {
        t = bu(e, n.getOptions());
      },
      processEvent: (n, r, s) => (
        t || (t = bu(e, s.getOptions())),
        (function (e, t) {
          if (e.type) {
            if (
              "transaction" === e.type &&
              (function (e, t) {
                if (!t?.length) return !1;
                const n = e.transaction;
                return !!n && No(n, t);
              })(e, t.ignoreTransactions)
            )
              return (
                Ti &&
                  Li.warn(
                    `Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${$o(e)}`,
                  ),
                !0
              );
          } else {
            if (
              (function (e, t) {
                return !!t?.length && zc(e).some((e) => No(e, t));
              })(e, t.ignoreErrors)
            )
              return (
                Ti &&
                  Li.warn(
                    `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${$o(e)}`,
                  ),
                !0
              );
            if (
              (function (e) {
                return (
                  !!e.exception?.values?.length &&
                  !e.message &&
                  !e.exception.values.some(
                    (e) =>
                      e.stacktrace || (e.type && "Error" !== e.type) || e.value,
                  )
                );
              })(e)
            )
              return (
                Ti &&
                  Li.warn(
                    `Event dropped due to not having an error message, error type or stacktrace.\nEvent: ${$o(e)}`,
                  ),
                !0
              );
            if (
              (function (e, t) {
                if (!t?.length) return !1;
                const n = Tu(e);
                return !!n && No(n, t);
              })(e, t.denyUrls)
            )
              return (
                Ti &&
                  Li.warn(
                    `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${$o(e)}.\nUrl: ${Tu(e)}`,
                  ),
                !0
              );
            if (
              !(function (e, t) {
                if (!t?.length) return !0;
                const n = Tu(e);
                return !n || No(n, t);
              })(e, t.allowUrls)
            )
              return (
                Ti &&
                  Li.warn(
                    `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${$o(e)}.\nUrl: ${Tu(e)}`,
                  ),
                !0
              );
          }
          return !1;
        })(n, t)
          ? null
          : n
      ),
    };
  },
  Su = (e = {}) => ({ ...Eu(e), name: "InboundFilters" });
function bu(e = {}, t = {}) {
  return {
    allowUrls: [...(e.allowUrls || []), ...(t.allowUrls || [])],
    denyUrls: [...(e.denyUrls || []), ...(t.denyUrls || [])],
    ignoreErrors: [
      ...(e.ignoreErrors || []),
      ...(t.ignoreErrors || []),
      ...(e.disableErrorDefaults ? [] : wu),
    ],
    ignoreTransactions: [
      ...(e.ignoreTransactions || []),
      ...(t.ignoreTransactions || []),
    ],
  };
}
function Tu(e) {
  try {
    const t = [...(e.exception?.values ?? [])]
      .reverse()
      .find(
        (e) =>
          void 0 === e.mechanism?.parent_id && e.stacktrace?.frames?.length,
      )?.stacktrace?.frames;
    return t
      ? (function (e = []) {
          for (let t = e.length - 1; t >= 0; t--) {
            const n = e[t];
            if (
              n &&
              "<anonymous>" !== n.filename &&
              "[native code]" !== n.filename
            )
              return n.filename || null;
          }
          return null;
        })(t)
      : null;
  } catch {
    return (Ti && Li.error(`Cannot extract url for event ${$o(e)}`), null);
  }
}
function Au(e, t, n, r, s, i) {
  if (!s.exception?.values || !i || !to(i.originalException)) return;
  const o =
    s.exception.values.length > 0
      ? s.exception.values[s.exception.values.length - 1]
      : void 0;
  o &&
    (s.exception.values = ku(
      e,
      t,
      r,
      i.originalException,
      n,
      s.exception.values,
      o,
      0,
    ));
}
function ku(e, t, n, r, s, i, o, a) {
  if (i.length >= n + 1) return i;
  let c = [...i];
  if (to(r[s])) {
    Ru(o, a, r);
    const i = e(t, r[s]),
      u = c.length;
    (Iu(i, s, u, a), (c = ku(e, t, n, r[s], s, [i, ...c], i, u)));
  }
  return (
    Ou(r) &&
      r.errors.forEach((i, u) => {
        if (to(i)) {
          Ru(o, a, r);
          const l = e(t, i),
            d = c.length;
          (Iu(l, `errors[${u}]`, d, a),
            (c = ku(e, t, n, i, s, [l, ...c], l, d)));
        }
      }),
    c
  );
}
function Ou(e) {
  return Array.isArray(e.errors);
}
function Ru(e, t, n) {
  e.mechanism = {
    handled: !0,
    type: "auto.core.linked_errors",
    ...(Ou(n) && { is_exception_group: !0 }),
    ...e.mechanism,
    exception_id: t,
  };
}
function Iu(e, t, n, r) {
  e.mechanism = {
    handled: !0,
    ...e.mechanism,
    type: "chained",
    source: t,
    exception_id: n,
    parent_id: r,
  };
}
function Cu(e) {
  return (function (e) {
    return (
      to(e) &&
      "__sentry_fetch_url_host__" in e &&
      "string" == typeof e.__sentry_fetch_url_host__
    );
  })(e)
    ? `${e.message} (${e.__sentry_fetch_url_host__})`
    : e.message;
}
var Du = new Set([]);
var xu = new Set();
function Uu() {
  "console" in Ai &&
    Ci.forEach(function (e) {
      !xu.has(e) &&
        e in Ai.console &&
        (xu.add(e),
        mo(Ai.console, e, function (t) {
          return (
            (Di[e] = t),
            function (...t) {
              const n = t[0],
                r = Di[e],
                s = Du.size && "string" == typeof n && No(n, Du);
              (s || Vi("console", { args: t, level: e }),
                (!s || (Ti && Li.isEnabled())) && r?.apply(Ai.console, t));
            }
          );
        }));
    });
}
function Pu(e) {
  return "warn" === e
    ? "warning"
    : ["fatal", "error", "warning", "log", "info", "debug"].includes(e)
      ? e
      : "log";
}
var Nu = () => {
  let e;
  return {
    name: "Dedupe",
    processEvent(t) {
      if (t.type) return t;
      try {
        if (
          (function (e, t) {
            return (
              !!t &&
              (!!(function (e, t) {
                const n = e.message,
                  r = t.message;
                return (
                  !(!n && !r) &&
                  !((n && !r) || (!n && r)) &&
                  n === r &&
                  !!Fu(e, t) &&
                  !!Lu(e, t)
                );
              })(e, t) ||
                !!(function (e, t) {
                  const n = $u(t),
                    r = $u(e);
                  return (
                    !(!n || !r) &&
                    n.type === r.type &&
                    n.value === r.value &&
                    !!Fu(e, t) &&
                    !!Lu(e, t)
                  );
                })(e, t))
            );
          })(t, e)
        )
          return (
            Ti &&
              Li.warn(
                "Event dropped due to being a duplicate of previously captured event.",
              ),
            null
          );
      } catch {}
      return (e = t);
    },
  };
};
function Lu(e, t) {
  let n = Bi(e),
    r = Bi(t);
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r)) return !1;
  if (r.length !== n.length) return !1;
  for (let s = 0; s < r.length; s++) {
    const e = r[s],
      t = n[s];
    if (
      e.filename !== t.filename ||
      e.lineno !== t.lineno ||
      e.colno !== t.colno ||
      e.function !== t.function
    )
      return !1;
  }
  return !0;
}
function Fu(e, t) {
  let n = e.fingerprint,
    r = t.fingerprint;
  if (!n && !r) return !0;
  if ((n && !r) || (!n && r)) return !1;
  try {
    return !(n.join("") !== r.join(""));
  } catch {
    return !1;
  }
}
function $u(e) {
  return e.exception?.values?.[0];
}
var Mu = () => ({
  name: "ConversationId",
  setup(e) {
    e.on("spanStart", (e) => {
      const t = ha().getScopeData(),
        n = pa().getScopeData(),
        r = t.conversationId || n.conversationId;
      if (r) {
        const { op: t, data: n, description: s } = Ca(e);
        if (
          !t?.startsWith("gen_ai.") &&
          !n["ai.operationId"] &&
          !s?.startsWith("ai.")
        )
          return;
        e.setAttribute("gen_ai.conversation.id", r);
      }
    });
  },
});
function ju(e) {
  return void 0 === e
    ? void 0
    : e >= 400 && e < 500
      ? "warning"
      : e >= 500
        ? "error"
        : void 0;
}
var Hu = Ai;
function Ku(e) {
  return (
    e && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
  );
}
function Bu() {
  if ("string" == typeof EdgeRuntime) return !0;
  if (
    !(function () {
      if (!("fetch" in Hu)) return !1;
      try {
        return (new Headers(), new Request("data:,"), new Response(), !0);
      } catch {
        return !1;
      }
    })()
  )
    return !1;
  if (Ku(Hu.fetch)) return !0;
  let e = !1;
  const t = Hu.document;
  if (t && "function" == typeof t.createElement)
    try {
      const n = t.createElement("iframe");
      ((n.hidden = !0),
        t.head.appendChild(n),
        n.contentWindow?.fetch && (e = Ku(n.contentWindow.fetch)),
        t.head.removeChild(n));
    } catch (n) {
      Ti &&
        Li.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          n,
        );
    }
  return e;
}
function Gu(e, t) {
  const n = "fetch",
    r = zi(n, e);
  return (
    Wi(n, () =>
      (function (e, t = !1) {
        if (t && !Bu()) return;
        mo(Ai, "fetch", function (t) {
          return function (...n) {
            const r = new Error(),
              { method: s, url: i } = (function (e) {
                if (0 === e.length) return { method: "GET", url: "" };
                if (2 === e.length) {
                  const [t, n] = e;
                  return {
                    url: zu(t),
                    method: qu(n, "method")
                      ? String(n.method).toUpperCase()
                      : fo(t) && qu(t, "method")
                        ? String(t.method).toUpperCase()
                        : "GET",
                  };
                }
                const t = e[0];
                return {
                  url: zu(t),
                  method: qu(t, "method")
                    ? String(t.method).toUpperCase()
                    : "GET",
                };
              })(n),
              o = {
                args: n,
                fetchData: { method: s, url: i },
                startTimestamp: 1e3 * Go(),
                virtualError: r,
                headers: Wu(n),
              };
            return (
              e || Vi("fetch", { ...o }),
              t.apply(Ai, n).then(
                async (t) => (
                  e
                    ? e(t)
                    : Vi("fetch", {
                        ...o,
                        endTimestamp: 1e3 * Go(),
                        response: t,
                      }),
                  t
                ),
                (e) => {
                  (Vi("fetch", { ...o, endTimestamp: 1e3 * Go(), error: e }),
                    to(e) &&
                      void 0 === e.stack &&
                      ((e.stack = r.stack), go(e, "framesToPop", 1)));
                  const t =
                    fa()?.getOptions().enhanceFetchErrorMessages ?? "always";
                  if (
                    !1 !== t &&
                    to(e) &&
                    "TypeError" === e.name &&
                    ("Failed to fetch" === e.message ||
                      "Load failed" === e.message ||
                      "NetworkError when attempting to fetch resource." ===
                        e.message)
                  )
                    try {
                      const n = new URL(o.fetchData.url).host;
                      "always" === t
                        ? (e.message = `${e.message} (${n})`)
                        : go(e, "__sentry_fetch_url_host__", n);
                    } catch {}
                  throw e;
                },
              )
            );
          };
        });
      })(void 0, t),
    ),
    r
  );
}
function qu(e, t) {
  return uo(e) && !!e[t];
}
function zu(e) {
  return "string" == typeof e
    ? e
    : e
      ? qu(e, "url")
        ? e.url
        : e.toString
          ? e.toString()
          : ""
      : "";
}
function Wu(e) {
  const [t, n] = e;
  try {
    if ("object" == typeof n && null !== n && "headers" in n && n.headers)
      return new Headers(n.headers);
    if (fo(t)) return new Headers(t.headers);
  } catch {}
}
var Vu = Ai;
function Yu() {
  try {
    return Vu.document.location.href;
  } catch {
    return "";
  }
}
var Ju = Ai,
  Qu = 0;
function Xu() {
  return Qu > 0;
}
function Zu(e, t = {}) {
  if ("function" != typeof e) return e;
  try {
    if (Object.prototype.hasOwnProperty.call(e, "__sentry_wrapped__")) {
      const t = e.__sentry_wrapped__;
      return "function" == typeof t ? t : e;
    }
    if (yo(e)) return e;
  } catch {
    return e;
  }
  const n = function (...n) {
    Ai._sentryWrappedDepth = (Ai._sentryWrappedDepth || 0) + 1;
    try {
      const r = n.map((e) => Zu(e, t));
      return e.apply(this, r);
    } catch (r) {
      throw (
        Qu++,
        setTimeout(() => {
          Qu--;
        }),
        (function (...e) {
          const t = ua(Oi());
          if (2 === e.length) {
            const [n, r] = e;
            return n ? t.withSetScope(n, r) : t.withScope(r);
          }
          t.withScope(e[0]);
        })((e) => {
          (e.addEventProcessor(
            (e) => (
              t.mechanism && (Mo(e, void 0, void 0), jo(e, t.mechanism)),
              (e.extra = { ...e.extra, arguments: n }),
              e
            ),
          ),
            wc(r));
        }),
        r
      );
    } finally {
      Ai._sentryWrappedDepth = (Ai._sentryWrappedDepth || 0) - 1;
    }
  };
  try {
    for (const t in e)
      Object.prototype.hasOwnProperty.call(e, t) && (n[t] = e[t]);
  } catch {}
  (_o(n, e), go(e, "__sentry_wrapped__", n));
  try {
    Object.getOwnPropertyDescriptor(n, "name").configurable &&
      Object.defineProperty(n, "name", { get: () => e.name });
  } catch {}
  return n;
}
function el() {
  const e = Yu(),
    { referrer: t } = Ju.document || {},
    { userAgent: n } = Ju.navigator || {};
  return {
    url: e,
    headers: { ...(t && { Referer: t }), ...(n && { "User-Agent": n }) },
  };
}
function tl(e, t) {
  const n = sl(e, t),
    r = { type: al(t), value: cl(t) };
  return (
    n.length && (r.stacktrace = { frames: n }),
    void 0 === r.type &&
      "" === r.value &&
      (r.value = "Unrecoverable error caught"),
    r
  );
}
function nl(e, t, n, r) {
  const s = fa()?.getOptions().normalizeDepth,
    i = ((o = t), Object.values(o).find(to));
  var o;
  const a = { __serialized__: Io(t, s) };
  if (i) return { exception: { values: [tl(e, i)] }, extra: a };
  const c = {
    exception: {
      values: [
        {
          type: lo(t) ? t.constructor.name : r ? "UnhandledRejection" : "Error",
          value: dl(t, { isUnhandledRejection: r }),
        },
      ],
    },
    extra: a,
  };
  if (n) {
    const t = sl(e, n);
    t.length && (c.exception.values[0].stacktrace = { frames: t });
  }
  return c;
}
function rl(e, t) {
  return { exception: { values: [tl(e, t)] } };
}
function sl(e, t) {
  const n = t.stacktrace || t.stack || "",
    r = (function (e) {
      return e && il.test(e.message) ? 1 : 0;
    })(t),
    s = (function (e) {
      return "number" == typeof e.framesToPop ? e.framesToPop : 0;
    })(t);
  try {
    return e(n, r, s);
  } catch {}
  return [];
}
var il = /Minified React error #\d+;/i;
function ol(e) {
  return (
    "undefined" != typeof WebAssembly &&
    void 0 !== WebAssembly.Exception &&
    e instanceof WebAssembly.Exception
  );
}
function al(e) {
  const t = e?.name;
  return !t && ol(e)
    ? e.message && Array.isArray(e.message) && 2 == e.message.length
      ? e.message[0]
      : "WebAssembly.Exception"
    : t;
}
function cl(e) {
  const t = e?.message;
  return ol(e)
    ? Array.isArray(e.message) && 2 == e.message.length
      ? e.message[1]
      : "wasm exception"
    : t
      ? t.error && "string" == typeof t.error.message
        ? Cu(t.error)
        : Cu(e)
      : "No error message";
}
function ul(e, t, n, r, s) {
  let i;
  if (ro(t) && t.error) return rl(e, t.error);
  if (so(t) || no(t, "DOMException")) {
    const s = t;
    if ("stack" in t) {
      i = rl(e, t);
      const s = i.exception?.values?.[0];
      if (r && n && s && !s.stacktrace) {
        const t = sl(e, n);
        t.length && ((s.stacktrace = { frames: t }), jo(i, { synthetic: !0 }));
      }
    } else {
      const t = s.name || (so(s) ? "DOMError" : "DOMException"),
        o = s.message ? `${t}: ${s.message}` : t;
      ((i = ll(e, o, n, r)), Mo(i, o));
    }
    return (
      "code" in s && (i.tags = { ...i.tags, "DOMException.code": `${s.code}` }),
      i
    );
  }
  return to(t)
    ? rl(e, t)
    : co(t) || lo(t)
      ? ((i = nl(e, t, n, s)), jo(i, { synthetic: !0 }), i)
      : ((i = ll(e, t, n, r)),
        Mo(i, `${t}`, void 0),
        jo(i, { synthetic: !0 }),
        i);
}
function ll(e, t, n, r) {
  const s = {};
  if (r && n) {
    const r = sl(e, n);
    (r.length &&
      (s.exception = { values: [{ value: t, stacktrace: { frames: r } }] }),
      jo(s, { synthetic: !0 }));
  }
  if (oo(t)) {
    const { __sentry_template_string__: e, __sentry_template_values__: n } = t;
    return ((s.logentry = { message: e, params: n }), s);
  }
  return ((s.message = t), s);
}
function dl(e, { isUnhandledRejection: t }) {
  const n = (function (e) {
      const t = Object.keys(vo(e));
      return (t.sort(), t[0] ? t.join(", ") : "[object has no keys]");
    })(e),
    r = t ? "promise rejection" : "exception";
  return ro(e)
    ? `Event \`ErrorEvent\` captured as ${r} with message \`${e.message}\``
    : lo(e)
      ? `Event \`${(function (e) {
          try {
            const t = Object.getPrototypeOf(e);
            return t ? t.constructor.name : void 0;
          } catch {}
        })(e)}\` (type=${e.type}) captured as ${r}`
      : `Object captured as ${r} with keys: ${n}`;
}
var hl = class extends iu {
  constructor(e) {
    const t =
      ((n = e),
      {
        release:
          "string" == typeof __SENTRY_RELEASE__
            ? __SENTRY_RELEASE__
            : Ju.SENTRY_RELEASE?.id,
        sendClientReports: !0,
        parentSpanIsAlwaysRootSpan: !0,
        ...n,
      });
    var n;
    (!(function (e, t, n = [t], r = "npm") {
      const s = ((e._metadata = e._metadata || {}).sdk = e._metadata.sdk || {});
      s.name ||
        ((s.name = `sentry.javascript.${t}`),
        (s.packages = n.map((e) => ({
          name: `${r}:@sentry/${e}`,
          version: ki,
        }))),
        (s.version = ki));
    })(t, "browser", ["browser"], Ju.SENTRY_SDK_SOURCE || "npm"),
      super(t));
    const { userInfo: r } = this.getDataCollectionOptions();
    t._metadata?.sdk &&
      (t._metadata.sdk.settings = {
        infer_ip: r ? "auto" : "never",
        ...t._metadata.sdk.settings,
      });
    const { sendClientReports: s } = this._options;
    (Ju.document &&
      Ju.document.addEventListener("visibilitychange", () => {
        "hidden" === Ju.document.visibilityState &&
          (s && this._flushOutcomes(),
          queueMicrotask(() => {
            this.flush();
          }));
      }),
      r && this.on("beforeSendSession", mu));
  }
  eventFromException(e, t) {
    return (function (e, t, n, r) {
      const s = ul(e, t, n?.syntheticException || void 0, r);
      return (
        jo(s),
        (s.level = "error"),
        n?.event_id && (s.event_id = n.event_id),
        cc(s)
      );
    })(this._options.stackParser, e, t, this._options.attachStacktrace);
  }
  eventFromMessage(e, t = "info", n) {
    return (function (e, t, n = "info", r, s) {
      const i = ll(e, t, r?.syntheticException || void 0, s);
      return ((i.level = n), r?.event_id && (i.event_id = r.event_id), cc(i));
    })(this._options.stackParser, e, t, n, this._options.attachStacktrace);
  }
  _prepareEvent(e, t, n, r) {
    return (
      (e.platform = e.platform || "javascript"),
      super._prepareEvent(e, t, n, r)
    );
  }
};
var pl = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__,
  fl = Ai;
function ml(e, t, n) {
  fl.document && fl.addEventListener(e, t, n);
}
function gl(e, t, n) {
  fl.document && fl.removeEventListener(e, t, n);
}
var _l = {};
try {
  ("undefined" != typeof Node &&
    (_l.parentNode = Object.getOwnPropertyDescriptor(
      Node.prototype,
      "parentNode",
    ).get),
    "undefined" != typeof Element &&
      ((_l.tagName = Object.getOwnPropertyDescriptor(
        Element.prototype,
        "tagName",
      ).get),
      (_l.id = Object.getOwnPropertyDescriptor(Element.prototype, "id").get),
      (_l.className = Object.getOwnPropertyDescriptor(
        Element.prototype,
        "className",
      ).get),
      (_l.getAttribute = Element.prototype.getAttribute)),
    "undefined" != typeof HTMLElement &&
      (_l.dataset = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        "dataset",
      ).get));
} catch {}
function yl(e, t, n) {
  const r = _l[t];
  if (r)
    try {
      return r.call(e, n);
    } catch {}
  const s = e[t];
  return "function" == typeof s ? s.call(e, n) : s;
}
function vl(e, t = {}) {
  if (!e) return "<unknown>";
  try {
    let n = e;
    const r = 5,
      s = [];
    let i = 0,
      o = 0;
    const a = " > ",
      c = 3;
    let u;
    const l = Array.isArray(t) ? t : t.keyAttrs,
      d = (!Array.isArray(t) && t.maxStringLength) || 80;
    for (
      ;
      n &&
      i++ < r &&
      ((u = wl(n, l)),
      !("html" === u || (i > 1 && o + s.length * c + u.length >= d)));
    )
      (s.push(u), (o += u.length), (n = yl(n, "parentNode")));
    return s.reverse().join(a);
  } catch {
    return "<unknown>";
  }
}
function wl(e, t) {
  const n = [],
    r = yl(e, "tagName");
  if (!r) return "";
  if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) {
    const t = yl(e, "dataset");
    if (t) {
      if (t.sentryComponent) return t.sentryComponent;
      if (t.sentryElement) return t.sentryElement;
    }
  }
  n.push(r.toLowerCase());
  const s = t?.length
    ? t
        .filter((t) => yl(e, "getAttribute", t))
        .map((t) => [t, yl(e, "getAttribute", t)])
    : null;
  if (s?.length)
    s.forEach((e) => {
      n.push(`[${e[0]}="${e[1]}"]`);
    });
  else {
    const t = yl(e, "id");
    t && n.push(`#${t}`);
    const r = yl(e, "className");
    if (r && io(r)) {
      const e = r.split(/\s+/);
      for (const t of e) n.push(`.${t}`);
    }
  }
  for (const i of ["aria-label", "type", "name", "title", "alt"]) {
    const t = yl(e, "getAttribute", i);
    t && n.push(`[${i}="${t}"]`);
  }
  return n.join("");
}
var El, Sl, bl, Tl;
function Al() {
  if (!fl.document) return;
  const e = Vi.bind(null, "dom"),
    t = kl(e, !0);
  (fl.document.addEventListener("click", t, !1),
    fl.document.addEventListener("keypress", t, !1),
    ["EventTarget", "Node"].forEach((t) => {
      const n = fl[t]?.prototype;
      n?.hasOwnProperty?.("addEventListener") &&
        (mo(n, "addEventListener", function (t) {
          return function (n, r, s) {
            if ("click" === n || "keypress" == n)
              try {
                const r = (this.__sentry_instrumentation_handlers__ =
                    this.__sentry_instrumentation_handlers__ || {}),
                  i = (r[n] = r[n] || { refCount: 0 });
                if (!i.handler) {
                  const r = kl(e);
                  ((i.handler = r), t.call(this, n, r, s));
                }
                i.refCount++;
              } catch {}
            return t.call(this, n, r, s);
          };
        }),
        mo(n, "removeEventListener", function (e) {
          return function (t, n, r) {
            if ("click" === t || "keypress" == t)
              try {
                const n = this.__sentry_instrumentation_handlers__ || {},
                  s = n[t];
                s &&
                  (s.refCount--,
                  s.refCount <= 0 &&
                    (e.call(this, t, s.handler, r),
                    (s.handler = void 0),
                    delete n[t]),
                  0 === Object.keys(n).length &&
                    delete this.__sentry_instrumentation_handlers__);
              } catch {}
            return e.call(this, t, n, r);
          };
        }));
    }));
}
function kl(e, t = !1) {
  return (n) => {
    if (!n || n._sentryCaptured) return;
    const r = (function (e) {
      try {
        return e.target;
      } catch {
        return null;
      }
    })(n);
    if (
      (function (e, t) {
        return (
          "keypress" === e &&
          (!t?.tagName ||
            ("INPUT" !== t.tagName &&
              "TEXTAREA" !== t.tagName &&
              !t.isContentEditable))
        );
      })(n.type, r)
    )
      return;
    (go(n, "_sentryCaptured", !0),
      r && !r._sentryId && go(r, "_sentryId", Lo()));
    const s = "keypress" === n.type ? "input" : n.type;
    ((function (e) {
      if (e.type !== Sl) return !1;
      try {
        if (!e.target || e.target._sentryId !== bl) return !1;
      } catch {}
      return !0;
    })(n) ||
      (e({ event: n, name: s, global: t }),
      (Sl = n.type),
      (bl = r ? r._sentryId : void 0)),
      clearTimeout(El),
      (El = fl.setTimeout(() => {
        ((bl = void 0), (Sl = void 0));
      }, 1e3)));
  };
}
function Ol(e) {
  const t = "history";
  (zi(t, e), Wi(t, Rl));
}
function Rl() {
  function e(e) {
    return function (...t) {
      const n = t.length > 2 ? t[2] : void 0;
      if (n) {
        const r = Tl,
          s = (function (e) {
            try {
              return new URL(e, fl.location.origin).toString();
            } catch {
              return e;
            }
          })(String(n));
        if (((Tl = s), r === s)) return e.apply(this, t);
        Vi("history", { from: r, to: s });
      }
      return e.apply(this, t);
    };
  }
  (fl.addEventListener("popstate", () => {
    const e = fl.location.href,
      t = Tl;
    ((Tl = e), t !== e && Vi("history", { from: t, to: e }));
  }),
    "history" in Hu &&
      Hu.history &&
      (mo(fl.history, "pushState", e), mo(fl.history, "replaceState", e)));
}
var Il = {};
var Cl = "__sentry_xhr_v3__";
function Dl() {
  if (!fl.XMLHttpRequest) return;
  const e = XMLHttpRequest.prototype;
  ((e.open = new Proxy(e.open, {
    apply(e, t, n) {
      const r = new Error(),
        s = 1e3 * Go(),
        i = io(n[0]) ? n[0].toUpperCase() : void 0,
        o = (function (e) {
          if (io(e)) return e;
          try {
            return e.toString();
          } catch {}
        })(n[1]);
      if (!i || !o) return e.apply(t, n);
      ((t[Cl] = { method: i, url: o, request_headers: {} }),
        "POST" === i &&
          o.match(/sentry_key/) &&
          (t.__sentry_own_request__ = !0));
      const a = () => {
        const e = t[Cl];
        if (e && 4 === t.readyState) {
          try {
            e.status_code = t.status;
          } catch {}
          (Vi("xhr", {
            endTimestamp: 1e3 * Go(),
            startTimestamp: s,
            xhr: t,
            virtualError: r,
          }),
            t.removeEventListener("readystatechange", a));
        }
      };
      return (
        "onreadystatechange" in t && "function" == typeof t.onreadystatechange
          ? (t.onreadystatechange = new Proxy(t.onreadystatechange, {
              apply: (e, t, n) => (a(), e.apply(t, n)),
            }))
          : t.addEventListener("readystatechange", a),
        (t.setRequestHeader = new Proxy(t.setRequestHeader, {
          apply(e, t, n) {
            const [r, s] = n,
              i = t[Cl];
            return (
              i && io(r) && io(s) && (i.request_headers[r.toLowerCase()] = s),
              e.apply(t, n)
            );
          },
        })),
        e.apply(t, n)
      );
    },
  })),
    (e.send = new Proxy(e.send, {
      apply(e, t, n) {
        const r = t[Cl];
        if (!r) return e.apply(t, n);
        void 0 !== n[0] && (r.body = n[0]);
        return (
          Vi("xhr", { startTimestamp: 1e3 * Go(), xhr: t }),
          e.apply(t, n)
        );
      },
    })));
}
function xl(
  e,
  t = (function (e) {
    const t = Il[e];
    if (t) return t;
    let n = fl[e];
    if (Ku(n)) return (Il[e] = n.bind(fl));
    const r = fl.document;
    if (r && "function" == typeof r.createElement)
      try {
        const t = r.createElement("iframe");
        ((t.hidden = !0), r.head.appendChild(t));
        const s = t.contentWindow;
        (s?.[e] && (n = s[e]), r.head.removeChild(t));
      } catch (s) {
        pl &&
          Li.warn(
            `Could not create sandbox iframe for ${e} check, bailing to window.${e}: `,
            s,
          );
      }
    return n ? (Il[e] = n.bind(fl)) : n;
  })("fetch"),
) {
  let n = 0,
    r = 0;
  return qc(
    e,
    async function (s) {
      const i = s.body.length;
      ((n += i), r++);
      const o = {
        body: s.body,
        method: "POST",
        referrerPolicy: "strict-origin",
        headers: e.headers,
        keepalive: n <= 6e4 && r < 15,
        ...e.fetchOptions,
      };
      try {
        const n = await t(e.url, o);
        return {
          statusCode: n.status,
          headers: {
            "x-sentry-rate-limits": n.headers.get("X-Sentry-Rate-Limits"),
            "retry-after": n.headers.get("Retry-After"),
          },
        };
      } catch (a) {
        throw ((Il["fetch"] = void 0), a);
      } finally {
        ((n -= i), r--);
      }
    },
    Bc(e.bufferSize || 40),
  );
}
var Ul = "undefined" == typeof __SENTRY_DEBUG__ || __SENTRY_DEBUG__;
function Pl(e, t, n, r) {
  const s = {
    filename: e,
    function: "<anonymous>" === t ? "?" : t,
    in_app: !0,
  };
  return (void 0 !== n && (s.lineno = n), void 0 !== r && (s.colno = r), s);
}
var Nl = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
  Ll =
    /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
  Fl = /\((\S*)(?::(\d+))(?::(\d+))\)/,
  $l = /at (.+?) ?\(data:(.+?),/,
  Ml =
    /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
  jl = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
  Hl = Mi(
    ...[
      [
        30,
        (e) => {
          const t = e.match($l);
          if (t) return { filename: `<data:${t[2]}>`, function: t[1] };
          const n = Nl.exec(e);
          if (n) {
            const [, e, t, r] = n;
            return Pl(e, "?", +t, +r);
          }
          const r = Ll.exec(e);
          if (r) {
            if (0 === r[2]?.indexOf("eval")) {
              const e = Fl.exec(r[2]);
              e && ((r[2] = e[1]), (r[3] = e[2]), (r[4] = e[3]));
            }
            const [e, t] = Kl(r[1] || "?", r[2]);
            return Pl(t, e, r[3] ? +r[3] : void 0, r[4] ? +r[4] : void 0);
          }
        },
      ],
      [
        50,
        (e) => {
          const t = Ml.exec(e);
          if (t) {
            if (t[3] && t[3].indexOf(" > eval") > -1) {
              const e = jl.exec(t[3]);
              e &&
                ((t[1] = t[1] || "eval"),
                (t[3] = e[1]),
                (t[4] = e[2]),
                (t[5] = ""));
            }
            let e = t[3],
              n = t[1] || "?";
            return (
              ([n, e] = Kl(n, e)),
              Pl(e, n, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
            );
          }
        },
      ],
    ],
  ),
  Kl = (e, t) => {
    const n = -1 !== e.indexOf("safari-extension"),
      r = -1 !== e.indexOf("safari-web-extension");
    return n || r
      ? [
          -1 !== e.indexOf("@") ? e.split("@")[0] : "?",
          n ? `safari-extension:${t}` : `safari-web-extension:${t}`,
        ]
      : [e, t];
  },
  Bl = 1024,
  Gl = (e = {}) => {
    const t = {
      console: !0,
      dom: !0,
      fetch: !0,
      history: !0,
      sentry: !0,
      xhr: !0,
      ...e,
    };
    return {
      name: "Breadcrumbs",
      setup(e) {
        var n;
        (t.console &&
          (function (e) {
            const t = "console",
              n = zi(t, e);
            Wi(t, Uu);
          })(
            (function (e) {
              return function (t) {
                if (fa() !== e) return;
                const n = {
                  category: "console",
                  data: { arguments: t.args, logger: "console" },
                  level: Pu(t.level),
                  message: Uo(t.args, " "),
                };
                if ("assert" === t.level) {
                  if (!1 !== t.args[0]) return;
                  ((n.message = `Assertion failed: ${Uo(t.args.slice(1), " ") || "console.assert"}`),
                    (n.data.arguments = t.args.slice(1)));
                }
                _u(n, { input: t.args, level: t.level });
              };
            })(e),
          ),
          t.dom &&
            ((n = (function (e, t) {
              return function (n) {
                if (fa() !== e) return;
                let r,
                  s,
                  i = "object" == typeof t ? t.serializeAttribute : void 0,
                  o =
                    "object" == typeof t && "number" == typeof t.maxStringLength
                      ? t.maxStringLength
                      : void 0;
                (o &&
                  o > Bl &&
                  (Ul &&
                    Li.warn(
                      `\`dom.maxStringLength\` cannot exceed 1024, but a value of ${o} was configured. Sentry will use 1024 instead.`,
                    ),
                  (o = Bl)),
                  "string" == typeof i && (i = [i]));
                try {
                  const e = n.event,
                    t = (function (e) {
                      return !!e && !!e.target;
                    })(e)
                      ? e.target
                      : e;
                  ((r = vl(t, { keyAttrs: i, maxStringLength: o })),
                    (s = (function (e, t = 5) {
                      if (!Vu.HTMLElement) return null;
                      let n = e;
                      for (let r = 0; r < t; r++) {
                        if (!n) return null;
                        if (n instanceof HTMLElement) {
                          if (n.dataset.sentryComponent)
                            return n.dataset.sentryComponent;
                          if (n.dataset.sentryElement)
                            return n.dataset.sentryElement;
                        }
                        n = n.parentNode;
                      }
                      return null;
                    })(t)));
                } catch {
                  r = "<unknown>";
                }
                if (0 === r.length) return;
                const a = { category: `ui.${n.name}`, message: r };
                (s && (a.data = { "ui.component_name": s }),
                  _u(a, { event: n.event, name: n.name, global: n.global }));
              };
            })(e, t.dom)),
            zi("dom", n),
            Wi("dom", Al)),
          t.xhr &&
            (function (e) {
              (zi("xhr", e), Wi("xhr", Dl));
            })(
              (function (e) {
                return function (t) {
                  if (fa() !== e) return;
                  const { startTimestamp: n, endTimestamp: r } = t,
                    s = t.xhr[Cl];
                  if (!n || !r || !s) return;
                  const { method: i, url: o, status_code: a, body: c } = s,
                    u = { method: i, url: o, status_code: a },
                    l = {
                      xhr: t.xhr,
                      input: c,
                      startTimestamp: n,
                      endTimestamp: r,
                    },
                    d = {
                      category: "xhr",
                      data: u,
                      type: "http",
                      level: ju(a),
                    };
                  (e.emit("beforeOutgoingRequestBreadcrumb", d, l), _u(d, l));
                };
              })(e),
            ),
          t.fetch &&
            Gu(
              (function (e) {
                return function (t) {
                  if (fa() !== e) return;
                  const { startTimestamp: n, endTimestamp: r } = t;
                  if (
                    r &&
                    (!t.fetchData.url.match(/sentry_key/) ||
                      "POST" !== t.fetchData.method)
                  )
                    if (t.error) {
                      const s = {
                          data: t.error,
                          input: t.args,
                          startTimestamp: n,
                          endTimestamp: r,
                        },
                        i = {
                          category: "fetch",
                          data: t.fetchData,
                          level: "error",
                          type: "http",
                        };
                      (e.emit("beforeOutgoingRequestBreadcrumb", i, s),
                        _u(i, s));
                    } else {
                      const s = t.response,
                        i = { ...t.fetchData, status_code: s?.status },
                        o = {
                          input: t.args,
                          response: s,
                          startTimestamp: n,
                          endTimestamp: r,
                        },
                        a = {
                          category: "fetch",
                          data: i,
                          type: "http",
                          level: ju(i.status_code),
                        };
                      (e.emit("beforeOutgoingRequestBreadcrumb", a, o),
                        _u(a, o));
                    }
                };
              })(e),
            ),
          t.history &&
            Ol(
              (function (e) {
                return function (t) {
                  if (fa() !== e) return;
                  let n = t.from,
                    r = t.to;
                  const s = fu(Ju.location.href);
                  let i = n ? fu(n) : void 0;
                  const o = fu(r);
                  (i?.path || (i = s),
                    s.protocol === o.protocol &&
                      s.host === o.host &&
                      (r = o.relative),
                    s.protocol === i.protocol &&
                      s.host === i.host &&
                      (n = i.relative),
                    _u({ category: "navigation", data: { from: n, to: r } }));
                };
              })(e),
            ),
          t.sentry &&
            e.on(
              "beforeSendEvent",
              (function (e) {
                return function (t) {
                  fa() === e &&
                    _u(
                      {
                        category:
                          "sentry." +
                          ("transaction" === t.type ? "transaction" : "event"),
                        event_id: t.event_id,
                        level: t.level,
                        message: $o(t),
                      },
                      { event: t },
                    );
                };
              })(e),
            ));
      },
    };
  };
var ql =
    "EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(
      ",",
    ),
  zl = (e = {}) => {
    const t = {
      XMLHttpRequest: !0,
      eventTarget: !0,
      requestAnimationFrame: !0,
      setInterval: !0,
      setTimeout: !0,
      unregisterOriginalCallbacks: !1,
      ...e,
    };
    return {
      name: "BrowserApiErrors",
      setupOnce() {
        (t.setTimeout && mo(Ju, "setTimeout", Wl),
          t.setInterval && mo(Ju, "setInterval", Wl),
          t.requestAnimationFrame && mo(Ju, "requestAnimationFrame", Vl),
          t.XMLHttpRequest &&
            "XMLHttpRequest" in Ju &&
            mo(XMLHttpRequest.prototype, "send", Yl));
        const e = t.eventTarget;
        e &&
          (Array.isArray(e) ? e : ql).forEach((e) =>
            (function (e, t) {
              const n = Ju[e]?.prototype;
              if (!n?.hasOwnProperty?.("addEventListener")) return;
              (mo(n, "addEventListener", function (n) {
                return function (r, s, i) {
                  try {
                    "function" == typeof s.handleEvent &&
                      (s.handleEvent = Zu(s.handleEvent, {
                        mechanism: {
                          data: { handler: Ki(s), target: e },
                          handled: !1,
                          type: "auto.browser.browserapierrors.handleEvent",
                        },
                      }));
                  } catch {}
                  return (
                    t.unregisterOriginalCallbacks &&
                      (function (e, t, n) {
                        e &&
                          "object" == typeof e &&
                          "removeEventListener" in e &&
                          "function" == typeof e.removeEventListener &&
                          e.removeEventListener(t, n);
                      })(this, r, s),
                    n.apply(this, [
                      r,
                      Zu(s, {
                        mechanism: {
                          data: { handler: Ki(s), target: e },
                          handled: !1,
                          type: "auto.browser.browserapierrors.addEventListener",
                        },
                      }),
                      i,
                    ])
                  );
                };
              }),
                mo(n, "removeEventListener", function (e) {
                  return function (t, n, r) {
                    try {
                      if (
                        Object.prototype.hasOwnProperty.call(
                          n,
                          "__sentry_wrapped__",
                        )
                      ) {
                        const s = n.__sentry_wrapped__;
                        s && e.call(this, t, s, r);
                      }
                    } catch {}
                    return e.call(this, t, n, r);
                  };
                }));
            })(e, t),
          );
      },
    };
  };
function Wl(e) {
  return function (...t) {
    const n = t[0];
    return (
      (t[0] = Zu(n, {
        mechanism: {
          handled: !1,
          type: `auto.browser.browserapierrors.${Ki(e)}`,
        },
      })),
      e.apply(this, t)
    );
  };
}
function Vl(e) {
  return function (t) {
    return e.apply(this, [
      Zu(t, {
        mechanism: {
          data: { handler: Ki(e) },
          handled: !1,
          type: "auto.browser.browserapierrors.requestAnimationFrame",
        },
      }),
    ]);
  };
}
function Yl(e) {
  return function (...t) {
    const n = this;
    return (
      ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((e) => {
        e in n &&
          "function" == typeof n[e] &&
          mo(n, e, function (t) {
            const n = {
                mechanism: {
                  data: { handler: Ki(t) },
                  handled: !1,
                  type: `auto.browser.browserapierrors.xhr.${e}`,
                },
              },
              r = yo(t);
            return (r && (n.mechanism.data.handler = Ki(r)), Zu(t, n));
          });
      }),
      e.apply(this, t)
    );
  };
}
var Jl = (e = {}) => {
    const t = e.lifecycle ?? "route";
    return {
      name: "BrowserSession",
      setupOnce() {
        if (void 0 === Ju.document)
          return void (
            Ul &&
            Li.warn(
              "Using the `browserSessionIntegration` in non-browser environments is not supported.",
            )
          );
        bc({ ignoreDuration: !0 });
        let e = !1;
        ((e) => {
          const t = fl.requestIdleCallback || fl.setTimeout;
          "hidden" === fl.document?.visibilityState
            ? e()
            : (ml(
                "visibilitychange",
                (e = ((e) => {
                  let t = !1;
                  return () => {
                    t || (e(), (t = !0));
                  };
                })(e)),
                { once: !0, capture: !0 },
              ),
              ml("pagehide", e, { once: !0, capture: !0 }),
              t(() => {
                (e(),
                  gl("visibilitychange", e, { capture: !0 }),
                  gl("pagehide", e, { capture: !0 }));
              }));
        })(() => {
          e || (kc(), (e = !0));
        });
        const n = pa();
        let r = n.getUser();
        (n.addScopeListener((t) => {
          const n = t.getUser();
          (r?.id === n?.id && r?.ip_address === n?.ip_address) ||
            ((r = n), e && kc());
        }),
          "route" === t &&
            Ol(({ from: t, to: n }) => {
              t !== n && (bc({ ignoreDuration: !0 }), kc(), (e = !0));
            }));
      },
    };
  },
  Ql = () => ({
    name: "CultureContext",
    preprocessEvent(e) {
      const t = Xl();
      t &&
        (e.contexts = {
          ...e.contexts,
          culture: { ...t, ...e.contexts?.culture },
        });
    },
    processSegmentSpan(e) {
      const t = Xl();
      t &&
        ac(e, {
          "culture.locale": t.locale,
          "culture.timezone": t.timezone,
          "culture.calendar": t.calendar,
        });
    },
  });
function Xl() {
  try {
    const e = Ju.Intl;
    if (!e) return;
    const t = e.DateTimeFormat().resolvedOptions();
    return { locale: t.locale, timezone: t.timeZone, calendar: t.calendar };
  } catch {
    return;
  }
}
var Zl = (e = {}) => {
  const t = { onerror: !0, onunhandledrejection: !0, ...e };
  return {
    name: "GlobalHandlers",
    setupOnce() {
      Error.stackTraceLimit = 50;
    },
    setup(e) {
      (t.onerror &&
        (!(function (e) {
          !(function (e) {
            const t = "error";
            (zi(t, e), Wi(t, Ji));
          })((t) => {
            const { stackParser: n, attachStacktrace: r } = td();
            if (fa() !== e || Xu()) return;
            const { msg: s, url: i, line: o, column: a, error: c } = t,
              u = (function (e, t, n, r) {
                const s = (e.exception = e.exception || {}),
                  i = (s.values = s.values || []),
                  o = (i[0] = i[0] || {}),
                  a = (o.stacktrace = o.stacktrace || {}),
                  c = (a.frames = a.frames || []);
                0 === c.length &&
                  c.push({
                    colno: r,
                    lineno: n,
                    filename: nd(t) ?? Yu(),
                    function: "?",
                    in_app: !0,
                  });
                return e;
              })(ul(n, c || s, void 0, r, !1), i, o, a);
            ((u.level = "error"),
              Sc(u, {
                originalException: c,
                mechanism: {
                  handled: !1,
                  type: "auto.browser.global_handlers.onerror",
                },
              }));
          });
        })(e),
        ed("onerror")),
        t.onunhandledrejection &&
          (!(function (e) {
            !(function (e) {
              const t = "unhandledrejection";
              (zi(t, e), Wi(t, Xi));
            })((t) => {
              const { stackParser: n, attachStacktrace: r } = td();
              if (fa() !== e || Xu()) return;
              const s = (function (e) {
                  if (ao(e)) return e;
                  try {
                    if ("reason" in e) return e.reason;
                    if ("detail" in e && "reason" in e.detail)
                      return e.detail.reason;
                  } catch {}
                  return e;
                })(t),
                i = ao(s)
                  ? {
                      exception: {
                        values: [
                          {
                            type: "UnhandledRejection",
                            value: `Non-Error promise rejection captured with value: ${String(s)}`,
                          },
                        ],
                      },
                    }
                  : ul(n, s, void 0, r, !0);
              ((i.level = "error"),
                Sc(i, {
                  originalException: s,
                  mechanism: {
                    handled: !1,
                    type: "auto.browser.global_handlers.onunhandledrejection",
                  },
                }));
            });
          })(e),
          ed("onunhandledrejection")));
    },
  };
};
function ed(e) {
  Ul && Li.log(`Global Handler attached: ${e}`);
}
function td() {
  return fa()?.getOptions() || { stackParser: () => [], attachStacktrace: !1 };
}
function nd(e) {
  if (io(e) && 0 !== e.length)
    return e.startsWith("data:")
      ? `<${(function (e, t = !0) {
          if (e.startsWith("data:")) {
            const n = e.match(/^data:([^;,]+)/),
              r = n ? n[1] : "text/plain",
              s = e.includes(";base64,"),
              i = e.indexOf(",");
            let o = "";
            if (t && -1 !== i) {
              const t = e.slice(i + 1);
              o = t.length > 10 ? `${t.slice(0, 10)}... [truncated]` : t;
            }
            return `data:${r}${s ? ",base64" : ""}${o ? `,${o}` : ""}`;
          }
          return e;
        })(e, !1)}>`
      : e;
}
var rd = () => ({
    name: "HttpContext",
    preprocessEvent(e) {
      if (!Ju.navigator && !Ju.location && !Ju.document) return;
      const t = el(),
        n = { ...t.headers, ...e.request?.headers };
      e.request = { ...t, ...e.request, headers: n };
    },
    processSpan(e) {
      if (!Ju.navigator && !Ju.location && !Ju.document) return;
      const t = el();
      ac(e, {
        [oc]: t.headers["User-Agent"],
        ...(e.is_segment && {
          "url.full":
            "http.client" !== e.attributes?.["sentry.op"] ? t.url : void 0,
          "http.request.header.referer": t.headers.Referer,
        }),
      });
    },
  }),
  sd = (e = {}) => {
    const t = e.limit || 5,
      n = e.key || "cause";
    return {
      name: "LinkedErrors",
      preprocessEvent(e, r, s) {
        Au(tl, s.getOptions().stackParser, n, t, e, r);
      },
    };
  },
  id = /^HTML(\w*)Element$/;
function od(e) {
  if ("undefined" != typeof window && e === window) return "[Window]";
  if ("undefined" != typeof document && e === document) return "[Document]";
  if (
    (function (e) {
      if ("undefined" == typeof Element) return !1;
      try {
        return e instanceof Element;
      } catch {
        return !1;
      }
    })(e)
  ) {
    const t = (function (e) {
      const t = Object.getPrototypeOf(e);
      return t?.constructor ? t.constructor.name : "null prototype";
    })(e);
    if (id.test(t)) return `[HTMLElement: ${vl(e)}]`;
  }
}
function ad() {
  return (
    !!(function () {
      if (void 0 === Ju.window) return !1;
      const e = Ju;
      if (e.nw) return !1;
      if (!(e.chrome || e.browser)?.runtime?.id) return !1;
      const t = Yu();
      return !(
        Ju === Ju.top &&
        /^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(
          t,
        )
      );
    })() && (Ul && xi(() => {}), !0)
  );
}
function cd(e = {}) {
  const t = !e.skipBrowserExtensionCheck && ad();
  let n =
    null == e.defaultIntegrations
      ? [Su(), vu(), Mu(), zl(), Gl(), Zl(), sd(), Nu(), rd(), Ql(), Jl()]
      : e.defaultIntegrations;
  const r = {
    ...e,
    enabled: !t && e.enabled,
    stackParser: ((s = e.stackParser || Hl), Array.isArray(s) ? Mi(...s) : s),
    integrations: Cc({ integrations: e.integrations, defaultIntegrations: n }),
    transport: e.transport || xl,
  };
  var s;
  return ((To = od), pu(hl, r));
}
var ud = String.raw`[^\s"<>]*`,
  ld = String.raw`(?:[/?#%]${ud})?`,
  dd = String.raw`[\p{L}\p{N}_](?:[\p{L}\p{N}_-]{0,61}[\p{L}\p{N}_])?`,
  hd = new RegExp(
    String.raw`(?<![a-z0-9+.-])[a-z][a-z0-9+.-]{0,31}:\\?/\\?/${ud}(?:<path>)?`,
    "giu",
  ),
  pd = new RegExp(
    String.raw`[^\s"'<>()@/]{1,64}@[^\s"'<>()@/]{1,255}${ud}`,
    "gu",
  ),
  fd = new RegExp(
    String.raw`(?<![\p{L}\p{N}_])(?:(?:${dd}\.){1,10}\p{L}[\p{L}\p{N}_-]{1,62}|localhost|\d{1,3}(?:\.\d{1,3}){3}|\[[0-9a-f.]{0,4}:[0-9a-f:.]{0,45}\])(?::\d{1,5})?(?![\p{L}\p{N}_-])${ld}`,
    "giu",
  );
function md(e) {
  return e.replace(hd, "<url>").replace(pd, "<email>").replace(fd, "<host>");
}
function gd(e) {
  return "string" == typeof e
    ? e.length > 1e4
      ? "<long text>"
      : md(e)
    : Array.isArray(e)
      ? e.map(gd)
      : null !== e && "object" == typeof e
        ? Object.fromEntries(Object.entries(e).map(([e, t]) => [md(e), gd(t)]))
        : e;
}
function _d() {
  cd({
    dsn: "https://60bea3ee4ef1022e4035b23ba50f44d0@o1158394.ingest.us.sentry.io/4509876992278529",
    transport: (e) => {
      const t = xl(e);
      return {
        ...t,
        send: async (e) =>
          (await st.vendorTelemetryAllowed()) ? t.send(e) : {},
      };
    },
    stackParser: Hl,
    sendClientReports: !1,
    initialScope: {
      tags: { extension_version: chrome.runtime.getManifest().version },
    },
    beforeBreadcrumb: (e) => {
      try {
        return "unrestricted" === Be()?.vendors && "console" !== e.category
          ? (function (e) {
              return {
                ...e,
                message: e.category?.startsWith("ui.")
                  ? e.message?.replace(/\[.*$/s, "")
                  : e.message && md(e.message),
                data: gd(e.data),
              };
            })(e)
          : null;
      } catch {
        return null;
      }
    },
    beforeSend: async (e) => {
      if (await st.isDesktopManaged()) return null;
      try {
        !(function (e) {
          (e.message && (e.message = md(e.message)),
            (e.exception &&= {
              ...e.exception,
              values: e.exception.values?.map((e) =>
                e.value ? { ...e, value: md(e.value) } : e,
              ),
            }),
            (e.extra = gd(e.extra)));
        })(e);
      } catch {
        return null;
      }
      return (
        (e.contexts = {
          ...e.contexts,
          extension: {
            id: chrome.runtime.id,
            version: chrome.runtime.getManifest().version,
            environment: "production",
          },
        }),
        e
      );
    },
  });
  const e = (e, t) => {
    ("unrestricted" === t?.vendors &&
      t.identity?.orgUuid === e?.identity?.orgUuid &&
      t.gen === (e?.gen ?? 0) + 1) ||
      pa().clearBreadcrumbs();
  };
  (Oe(e), Ge(e));
}
var yd = "remote-devices",
  vd = "computer_",
  wd = "Agent_Browser__",
  Ed = `mcp__${yd}__${wd}`,
  Sd = new Set([
    "list_devices",
    "get_device_info",
    "device_list_dir",
    "device_stage_files",
    "device_commit_files",
    "device_bash",
    "device_request_folder_access",
    "device_request_delete_permission",
    "create_artifact",
    "update_artifact",
    "list_artifacts",
    "list_legacy_live_artifacts",
    "project_memory_read",
    "project_memory_write",
    "computer_resolve_access",
    "computer_request_access",
    "computer_release_lock",
    "computer_screenshot",
    "computer_zoom",
    "computer_left_click",
    "computer_double_click",
    "computer_triple_click",
    "computer_right_click",
    "computer_middle_click",
    "computer_type",
    "computer_key",
    "computer_scroll",
    "computer_left_click_drag",
    "computer_mouse_move",
    "computer_open_application",
    "computer_switch_display",
    "computer_list_granted_applications",
    "computer_list_apps",
    "computer_read_clipboard",
    "computer_write_clipboard",
    "computer_wait",
    "computer_cursor_position",
    "computer_hold_key",
    "computer_left_mouse_down",
    "computer_left_mouse_up",
    "computer_batch",
    "computer_release_full_control",
    "computer_request_full_control",
    "computer_app_list_windows",
    "computer_app_ax_find",
    "computer_app_screenshot",
    "computer_app_zoom",
    "computer_app_click",
    "computer_app_type",
    "computer_app_key",
    "computer_app_scroll",
    "computer_app_focus",
    "computer_app_drag",
    "computer_app_menu",
    "computer_app_batch",
    "computer_app_release",
    "computer_app_bring_to_current_space",
  ]);
function bd(e) {
  e.startsWith("http") || (e = `https://${e}`);
  try {
    return new URL(e).hostname;
  } catch {
    return "";
  }
}
var Td =
  /[\u034F\u0000-\u001F\u007F-\u009F\u00AD\u061C\u115F\u1160\u180E\u200B-\u200F\u2028\u2029\u202A-\u202E\u2060-\u2064\u2066-\u2069\u3164\uFEFF\uFFA0]/g;
function Ad(e) {
  return null == e
    ? ""
    : "object" == typeof e
      ? "[non-string]"
      : ("string" == typeof e ? e : String(e)).replace(Td, "�");
}
var kd = /[\u2800\p{Default_Ignorable_Code_Point}]/gu,
  Od = /^[\s\u2800\p{Default_Ignorable_Code_Point}]*$/u;
function Rd(e) {
  return "string" != typeof e
    ? Ad(e)
    : e
        .replace(/\r\n?/g, "\n")
        .replace(/\t/g, "  ")
        .split("\n")
        .map((e) => (Od.test(e) ? "" : Ad(e).replace(kd, "�")))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n");
}
async function Id(e, t, n) {
  if (!t) return null;
  const r = await chrome.tabs.get(e);
  if (!r.url)
    return {
      error: "Unable to verify current URL for security check",
      errorCode: "security_check_failed",
    };
  const s = bd(t);
  return s !== bd(r.url) || (r.pendingUrl && bd(r.pendingUrl) !== s)
    ? {
        error: `Security check failed: the page navigated to a different domain during ${n}. Re-read the tab state before retrying.`,
        errorCode: "security_check_failed",
      }
    : null;
}
async function Cd(e, t) {
  let n;
  try {
    const t = await chrome.tabs.get(e);
    n = t.url ? new URL(t.url).origin : void 0;
  } catch {
    n = void 0;
  }
  return n && "null" !== n && "null" !== t && n === t
    ? null
    : {
        error:
          "Origin mismatch: the tab is no longer on the page this text was approved for",
        errorCode: "security_check_failed",
      };
}
var Dd = { 12: 16, 14: 16, 16: 20, 20: 20, 24: 24, 28: 28, 32: 32 };
function xd({
  size: e = 20,
  vectorSizeOverride: t,
  className: n,
  alt: r,
  viewBox: s = "0 0 20 20",
  mirrorInRtl: o = !1,
  children: a,
}) {
  const c = t || Dd[e],
    u = (0, i.jsx)("svg", {
      width: c,
      height: c,
      viewBox: s,
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      style: { flexShrink: 0 },
      className: n,
      "aria-label": r,
      "aria-hidden": !r,
      "data-cds-mirror": o ? "" : void 0,
      children: a,
    });
  return t
    ? u
    : (0, i.jsx)("div", {
        className: n,
        style: {
          width: e,
          height: e,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: u,
      });
}
var Ud = { 12: 16, 16: 20, 20: 20, 24: 24, 28: 28, 32: 32 };
function Pd({
  size: e = 20,
  vectorSizeOverride: t,
  className: n,
  alt: r,
  viewBox: s = "0 0 20 20",
  children: o,
}) {
  const c = t || Ud[e],
    u = (0, i.jsx)("svg", {
      width: c,
      height: c,
      viewBox: s,
      fill: "currentColor",
      xmlns: "http://www.w3.org/2000/svg",
      className: "shrink-0",
      "aria-label": r,
      "aria-hidden": !r,
      children: o,
    });
  return t
    ? u
    : (0, i.jsx)("div", {
        className: a("flex items-center justify-center", n),
        style: { width: e, height: e },
        children: u,
      });
}
function Nd(e) {
  return (0, i.jsxs)(Pd, {
    ...e,
    children: [
      (0, i.jsx)("path", {
        d: "M10.8139 17.5841L7.08902 8.12868C6.76198 7.29851 7.60347 6.48813 8.42074 6.84621L17.6697 10.8985C18.6008 11.3065 18.4 12.6821 17.3912 12.8069L14.3103 13.1881C13.8869 13.2405 13.5433 13.5557 13.4548 13.973L12.7225 17.4251C12.5168 18.3949 11.1772 18.5065 10.8139 17.5841Z",
        stroke: "currentColor",
        fill: "none",
        strokeWidth: "1",
      }),
      (0, i.jsx)("path", {
        d: "M5 5L3 3",
        stroke: "currentColor",
        strokeLinecap: "round",
      }),
      (0, i.jsx)("path", {
        d: "M8.36609 3.82843L8.36609 1.63391",
        stroke: "currentColor",
        strokeLinecap: "round",
      }),
      (0, i.jsx)("path", {
        d: "M3.82843 8.4624H1.5376",
        stroke: "currentColor",
        strokeLinecap: "round",
      }),
    ],
  });
}
function Ld(e) {
  return (0, i.jsx)(Pd, {
    ...e,
    children: (0, i.jsx)("path", {
      d: "M8.5284 16.4959L3.99583 4.99017C3.6688 4.16 4.51029 3.34963 5.32755 3.7077L16.6268 8.65832C17.5578 9.06626 17.3571 10.4419 16.3482 10.5667L12.2422 11.0747C11.8188 11.1271 11.4753 11.4423 11.3868 11.8596L10.437 16.3369C10.2313 17.3066 8.89175 17.4182 8.5284 16.4959Z",
      stroke: "currentColor",
      fill: "none",
      strokeWidth: "1",
    }),
  });
}
function Fd(e) {
  return (0, i.jsx)(Pd, {
    ...e,
    children: (0, i.jsx)("path", {
      d: "M9.77051 6.99976C10.7236 6.99987 11.5443 7.67268 11.7314 8.60718L12.4102 11.9998H14.3906L13.7344 8.72339C13.6503 8.3028 13.2814 7.9999 12.8525 7.99976H12.5C12.224 7.99976 12.0002 7.77576 12 7.49976C12 7.22361 12.2239 6.99976 12.5 6.99976H12.8525C13.7581 6.9999 14.5382 7.63909 14.7158 8.5271L15.4102 11.9998H17.3906L16.7344 8.72339C16.6503 8.3028 16.2814 7.9999 15.8525 7.99976H15.5C15.224 7.99976 15.0002 7.77576 15 7.49976C15 7.22361 15.2239 6.99976 15.5 6.99976H15.8525C16.7581 6.9999 17.5382 7.63909 17.7158 8.5271L18.4902 12.4021C18.5194 12.5488 18.4815 12.7015 18.3867 12.8171C18.2918 12.9327 18.1496 12.9997 18 12.9998H2.5C2.43885 12.9998 2.38012 12.9857 2.32422 12.9646C2.31718 12.9619 2.30962 12.9607 2.30273 12.9578C2.28147 12.9486 2.262 12.9366 2.24219 12.9246C2.23265 12.9187 2.22297 12.9134 2.21387 12.907C2.19638 12.8947 2.17994 12.8815 2.16406 12.8669C2.15403 12.8577 2.14402 12.8486 2.13477 12.8386C2.12793 12.8313 2.1197 12.825 2.11328 12.8171C2.10702 12.8095 2.10244 12.8007 2.09668 12.7927C2.08824 12.7811 2.08068 12.7689 2.07324 12.7566C2.06252 12.7387 2.0523 12.7208 2.04395 12.7019C2.03919 12.6912 2.03623 12.6798 2.03223 12.6687C2.02468 12.6477 2.01639 12.627 2.01172 12.6052C2.00939 12.5944 2.00943 12.5831 2.00781 12.572C1.99968 12.5161 1.99848 12.4588 2.00977 12.4021L2.76855 8.60718C2.95571 7.67268 3.7764 6.99986 4.72949 6.99976H9.77051ZM4.72949 7.99976C4.25302 7.99986 3.84263 8.33629 3.74902 8.80347L3.10938 11.9998H11.3906L10.751 8.80347C10.6574 8.33629 10.247 7.99987 9.77051 7.99976H4.72949Z",
      fill: "currentColor",
    }),
  });
}
var $d = "szmelc_rce.permission.grant_written",
  Md = "szmelc_rce.permission.grant_revoked",
  jd = "szmelc_rce.permission.grants_cleared",
  Hd = "szmelc_rce.permission.stored_grant_applied";
function Kd(e) {
  if (!e) return "";
  try {
    return new URL(e).host;
  } catch {
    return "";
  }
}
function Bd(e) {
  if (!e) return "";
  const t = e.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "").split(/[/?#]/, 1)[0],
    n = t.lastIndexOf("@"),
    r = -1 === n ? t : t.slice(n + 1);
  return /^(\*\.)?[a-z0-9._-]+(:\d+)?$|^\[[0-9a-f:.]+\](:\d+)?$/i.test(r)
    ? r
    : "";
}
function Gd(e) {
  return "netloc" === e.type
    ? { scope_type: "netloc", host: Bd(e.netloc) }
    : {
        scope_type: "domain_transition",
        host: Bd(e.fromDomain),
        to_host: Bd(e.toDomain),
      };
}
function qd(e, t) {
  if (e)
    try {
      e($d, {
        ...Gd(t.scope),
        duration: t.duration,
        tool_type: t.tool_type,
        surface: t.surface ?? null,
        category_at_write: t.categoryAtWrite ?? null,
      });
    } catch {}
}
function zd(e, t) {
  if (e)
    try {
      e(Md, {
        ...Gd(t.scope),
        duration: t.duration,
        action: t.action,
        surface: t.surface ?? null,
      });
    } catch {}
}
function Wd(e, t, n) {
  if (e && (t.duration !== qr.ONCE || "netloc" !== t.scope.type))
    try {
      e(Hd, {
        ...Gd(t.scope),
        matched_host: Bd(n),
        duration: t.duration,
        action: t.action,
        grant_surface: t.surface ?? null,
        grant_age_ms: Date.now() - t.createdAt,
      });
    } catch {}
}
var Vd = class {
  permissions = [];
  cache = new Map();
  getSkipAllPermissions;
  forcePrompt = !1;
  bypassLocalhostForMcp = !1;
  trackEvent;
  turnApprovedDomains = new Set();
  restrictOnly = !1;
  deniedDomains = new Set();
  surface;
  constructor(e, t) {
    ((this.getSkipAllPermissions = e),
      (this.surface = t.surface),
      (this.bypassLocalhostForMcp = t.bypassLocalhostForMcp ?? !1),
      (this.trackEvent = t.trackEvent),
      this.loadPermissions(),
      this.setupStorageListener());
  }
  setForcePrompt(e) {
    this.forcePrompt = e;
  }
  setRestrictOnly(e) {
    this.restrictOnly = e;
  }
  setDeniedDomains(e) {
    this.deniedDomains.clear();
    for (const t of e) {
      const e = this.normalizeDomain(t);
      e && this.deniedDomains.add(e);
    }
  }
  isDeniedHost(e) {
    if (!e) return !1;
    for (const t of this.deniedDomains)
      if (e === t || e.endsWith("." + t)) return !0;
    return !1;
  }
  setTurnApprovedDomains(e) {
    this.turnApprovedDomains.clear();
    for (const t of e) {
      const e = this.normalizeDomain(t);
      e && this.turnApprovedDomains.add(e);
    }
  }
  clearTurnApprovedDomains() {
    this.turnApprovedDomains.clear();
  }
  isTurnApprovedDomain(e) {
    const t = this.normalizeDomain(e);
    return !!t && this.turnApprovedDomains.has(t);
  }
  getTurnApprovedDomains() {
    return Array.from(this.turnApprovedDomains);
  }
  normalizeDomain(e) {
    try {
      if (e.startsWith("http://") || e.startsWith("https://"))
        return new URL(e).hostname
          .toLowerCase()
          .replace(/\.$/, "")
          .replace(/^www\./, "");
      const t = e
        .toLowerCase()
        .replace(/^www\./, "")
        .split("/")[0];
      if (t.startsWith("[")) {
        const e = t.indexOf("]");
        return -1 === e ? t : t.slice(1, e);
      }
      const n = t.indexOf(":");
      return n !== t.lastIndexOf(":")
        ? t
        : (-1 === n ? t : t.slice(0, n)).replace(/\.$/, "");
    } catch {
      return null;
    }
  }
  async checkPermission(e, t, n) {
    const r = this.normalizeDomain(new URL(e).hostname.replace(/\.$/, ""));
    if (this.isDeniedHost(r)) return { allowed: !1, needsPrompt: !1 };
    const s = new URL(e).hostname.replace(/\.$/, "");
    if (s && this.turnApprovedDomains.size > 0 && !this.isTurnApprovedDomain(s))
      return { allowed: !1, needsPrompt: !1 };
    if (
      !this.forcePrompt &&
      this.bypassLocalhostForMcp &&
      this.isLocalhostUrl(e)
    )
      return { allowed: !0, needsPrompt: !1 };
    if (!this.forcePrompt && this.getSkipAllPermissions())
      return { allowed: !0, permission: void 0 };
    const { host: i } = new URL(e),
      o = i.replace(/\.(?=(:\d+)?$)/, "");
    if (!this.forcePrompt && !this.restrictOnly && this.isTurnApprovedDomain(o))
      return { allowed: !0, needsPrompt: !1 };
    await this.loadPermissions();
    const a = new URL(e).origin,
      c = this.findApplicablePermission(o, t, a),
      u =
        null !== c &&
        this.forcePrompt &&
        c.action === Gr.ALLOW &&
        c.duration !== qr.ONCE;
    return c && !u
      ? (n?.readonly ||
          ((c.lastUsed = Date.now()),
          await this.savePermissions(),
          Wd(this.trackEvent, c, o)),
        { allowed: c.action === Gr.ALLOW, permission: c })
      : (this.forcePrompt, { allowed: !1, needsPrompt: !0 });
  }
  async checkDomainTransition(e, t) {
    const n = (e) => e.replace(/\.(?=(:\d+)?$)/, ""),
      r = (e) => (void 0 === e ? void 0 : n(e));
    ((e = n(e)), (t = n(t)));
    const s = this.normalizeDomain(t);
    if (this.isDeniedHost(s)) return { allowed: !1, needsPrompt: !0 };
    if (!this.forcePrompt && this.bypassLocalhostForMcp) {
      const n = this.isLocalhostDomain(e),
        r = this.isLocalhostDomain(t);
      if (r) return { allowed: !0, needsPrompt: !1 };
      if (n && !r) return { allowed: !1, needsPrompt: !0 };
    }
    if (this.forcePrompt) return { allowed: !1, needsPrompt: !0 };
    const i = this.isTurnApprovedDomain(t);
    if (!this.restrictOnly && i) return { allowed: !0, needsPrompt: !1 };
    await this.loadPermissions();
    const o = this.permissions.filter(
        (n) =>
          "domain_transition" === n.scope.type &&
          r(n.scope.fromDomain) === e &&
          r(n.scope.toDomain) === t,
      ),
      a = o.find((e) => e.action === Gr.DENY);
    if (a)
      return (
        (a.lastUsed = Date.now()),
        await this.savePermissions(),
        Wd(this.trackEvent, a, t),
        { allowed: !1, permission: a }
      );
    const c = o.find((e) => e.action === Gr.ALLOW);
    return c
      ? ((c.lastUsed = Date.now()),
        await this.savePermissions(),
        Wd(this.trackEvent, c, t),
        { allowed: !0, permission: c })
      : { allowed: !1, needsPrompt: !0 };
  }
  async grantPermission(e, t, n, r) {
    const s = {
      id: crypto.randomUUID(),
      scope: e,
      action: Gr.ALLOW,
      duration: t,
      createdAt: Date.now(),
      toolUseId: t === qr.ONCE ? n : void 0,
      origin: t === qr.ONCE ? r : void 0,
      surface: this.surface,
    };
    (await this.loadPermissions(),
      this.permissions.push(s),
      await this.savePermissions(),
      this.clearCache());
  }
  async denyPermission(e, t) {
    if (t === qr.ONCE) return;
    const n = {
      id: crypto.randomUUID(),
      scope: e,
      action: Gr.DENY,
      duration: t,
      createdAt: Date.now(),
    };
    (await this.loadPermissions(),
      t === qr.ALWAYS && this.permissions.push(n),
      await this.savePermissions(),
      this.clearCache());
  }
  async revokePermission(e) {
    (await this.loadPermissions(),
      (this.permissions = this.permissions.filter((t) => t.id !== e)),
      await this.savePermissions(),
      this.clearCache());
  }
  async clearAllPermissions() {
    const e = this.permissions.length;
    ((this.permissions = []), await this.savePermissions(), this.clearCache());
    try {
      this.trackEvent?.(jd, { count: e });
    } catch {}
  }
  async clearOncePermissions() {
    await this.loadPermissions();
    const e = this.permissions.length;
    this.permissions = this.permissions.filter((e) => e.duration !== qr.ONCE);
    e - this.permissions.length > 0 &&
      (await this.savePermissions(), this.clearCache());
  }
  getPermissionsByScope() {
    return {
      netloc: this.permissions.filter((e) => "netloc" === e.scope.type),
      domain_transition: this.permissions.filter(
        (e) => "domain_transition" === e.scope.type,
      ),
    };
  }
  getAllPermissions() {
    return [...this.permissions];
  }
  findApplicablePermission(e, t, n) {
    const r = this.surface,
      s = `${e}:${r}:${t || "no-tool"}`;
    if (this.cache.has(s)) return this.cache.get(s);
    if (t) {
      const s = this.permissions.find(
        (s) =>
          s.duration === qr.ONCE &&
          s.toolUseId === t &&
          "netloc" === s.scope.type &&
          s.scope.netloc &&
          this.matchesNetloc(e, s.scope.netloc) &&
          void 0 !== s.surface &&
          s.surface === r &&
          (void 0 === s.origin || s.origin === n),
      );
      if (s) return (this.revokePermission(s.id), s);
    }
    this.permissions.forEach((e) => {});
    const i = this.permissions.filter(
        (t) =>
          "netloc" === t.scope.type &&
          t.duration !== qr.ONCE &&
          t.scope.netloc &&
          this.matchesNetloc(e, t.scope.netloc),
      ),
      o = i.find((e) => e.action === Gr.DENY);
    if (o) return (this.cache.set(s, o), o);
    const a = i.find(
      (e) => e.action === Gr.ALLOW && void 0 !== e.surface && e.surface === r,
    );
    return a ? (this.cache.set(s, a), a) : null;
  }
  async hasSiteWidePermissions(e) {
    return (
      await this.loadPermissions(),
      this.permissions.some(
        (t) =>
          "netloc" === t.scope.type &&
          t.duration === qr.ALWAYS &&
          t.action === Gr.ALLOW &&
          void 0 !== t.surface &&
          t.surface === this.surface &&
          t.scope.netloc &&
          this.matchesNetloc(e, t.scope.netloc),
      )
    );
  }
  matchesNetloc(e, t) {
    const n = (e) => e.replace(/\.(?=(:\d+)?$)/, "").replace(/^www\./, ""),
      r = n(e),
      s = n(t);
    if (s.startsWith("*.")) {
      const e = s.slice(2);
      return r === e || r.endsWith("." + e);
    }
    return r === s;
  }
  async loadPermissions() {
    try {
      const e = await Q(B.PERMISSION_STORAGE);
      ((this.permissions = e?.permissions ?? []), e || this.clearCache());
    } catch (e) {}
  }
  async savePermissions() {
    try {
      const e = { permissions: this.permissions };
      await X(B.PERMISSION_STORAGE, e);
    } catch (e) {}
  }
  setupStorageListener() {
    chrome.storage.onChanged.addListener((e, t) => {
      "local" === t &&
        e[B.PERMISSION_STORAGE] &&
        (void 0 === e[B.PERMISSION_STORAGE].newValue
          ? ((this.permissions = []), this.turnApprovedDomains.clear())
          : this.loadPermissions(),
        this.clearCache());
    });
  }
  clearCache() {
    this.cache.clear();
  }
  isLocalhostDomain(e) {
    const t = e.toLowerCase();
    return (
      "localhost" === t ||
      "127.0.0.1" === t ||
      "[::1]" === t ||
      "::1" === t ||
      t.startsWith("127.") ||
      t.endsWith(".localhost")
    );
  }
  isLocalhostUrl(e) {
    try {
      const t = new URL(e),
        n = t.protocol;
      return (
        ("http:" === n || "https:" === n) && this.isLocalhostDomain(t.hostname)
      );
    } catch {
      return !1;
    }
  }
};
function Yd(e = new Date()) {
  const t = String(e.getMonth() + 1).padStart(2, "0"),
    n = String(e.getDate()).padStart(2, "0");
  return `${e.getFullYear()}-${t}-${n}`;
}
function Jd(e) {
  const t = e.specificTime ?? "";
  switch (e.repeatType) {
    case "once":
      return `once|${e.specificDate ?? ""}|${t}`;
    case "daily":
      return `daily|${t}`;
    case "weekly":
      return `weekly|${e.dayOfWeek ?? ""}|${t}`;
    case "monthly":
      return `monthly|${e.dayOfMonth ?? ""}|${t}`;
    case "annually":
      return `annually|${(e.monthAndDay ?? "")
        .split("-")
        .map((e) => String(Number(e)).padStart(2, "0"))
        .join("-")}|${t}`;
    default:
      return "none";
  }
}
function Qd(e, t, n, r, s) {
  const i = new Date(e, t + 1, 0).getDate();
  return new Date(e, t, Math.min(n, i), r, s);
}
function Xd(e, t = new Date()) {
  if (!e.repeatType || "none" === e.repeatType || !e.specificTime) return null;
  const [n, r] = e.specificTime.split(":").map(Number),
    s = t.getFullYear(),
    i = t.getMonth();
  switch (e.repeatType) {
    case "once": {
      if (!e.specificDate) return null;
      const [s, i, o] = e.specificDate.split("-").map(Number),
        a = new Date(s, i - 1, o, n, r, 0, 0);
      return a > t ? { when: a.getTime() } : null;
    }
    case "daily": {
      const e = new Date(t);
      return (
        e.setHours(n, r, 0, 0),
        e <= t && e.setDate(e.getDate() + 1),
        { when: e.getTime(), periodInMinutes: 1440 }
      );
    }
    case "weekly": {
      if (void 0 === e.dayOfWeek) return null;
      let s = (e.dayOfWeek - t.getDay() + 7) % 7;
      if (0 === s) {
        const e = new Date(t);
        (e.setHours(n, r, 0, 0), e <= t && (s = 7));
      }
      const i = new Date(t);
      return (
        i.setDate(t.getDate() + s),
        i.setHours(n, r, 0, 0),
        { when: i.getTime(), periodInMinutes: 10080 }
      );
    }
    case "monthly": {
      if (!e.dayOfMonth) return null;
      let o = Qd(s, i, e.dayOfMonth, n, r);
      return (
        o <= t && (o = Qd(s, i + 1, e.dayOfMonth, n, r)),
        { when: o.getTime() }
      );
    }
    case "annually": {
      if (!e.monthAndDay) return null;
      const [i, o] = e.monthAndDay.split("-").map(Number);
      let a = Qd(s, i - 1, o, n, r);
      return (a <= t && (a = Qd(s + 1, i - 1, o, n, r)), { when: a.getTime() });
    }
    default:
      return null;
  }
}
var Zd = class extends Error {
    skillName;
    constructor(e) {
      (super(`A skill named "${e}" already exists`),
        (this.skillName = e),
        (this.name = "SkillAlreadyExistsError"));
    }
  },
  eh = class extends Error {
    constructor() {
      (super("Account skill limit reached"),
        (this.name = "SkillLimitReachedError"));
    }
  },
  th = class extends Error {
    skillName;
    constructor(e) {
      (super(`The skill name "${e}" is reserved`),
        (this.skillName = e),
        (this.name = "SkillNameReservedError"));
    }
  },
  nh = class extends Error {
    permanent;
    constructor(e) {
      (super(
        e
          ? "Skill instructions are permanently unavailable"
          : "Skill instructions are temporarily unavailable",
      ),
        (this.permanent = e),
        (this.name = "SkillUnavailableError"));
    }
  },
  rh = class extends Error {
    status;
    errorCode;
    constructor(e, t) {
      (super(`Skills API request failed: ${e}${t ? ` (${t})` : ""}`),
        (this.status = e),
        (this.errorCode = t),
        (this.name = "SkillApiError"));
    }
  },
  sh = "https://szmelc.com/new#settings/customize-skills";
function ih(e) {
  return `${sh}/${encodeURIComponent(e)}`;
}
function oh(e) {
  return (
    "user" === e.creator_type &&
    "custom" === e.source &&
    "account" === e.partition_by &&
    !1 === e.is_shared
  );
}
async function ah() {
  if (await st.isDesktopManaged())
    throw new rh(403, "third_party_desktop_mode");
  const e = await hi();
  if (!e) throw new Error("No valid OAuth token available");
  if (await st.isDesktopManaged())
    throw new rh(403, "third_party_desktop_mode");
  return {
    Authorization: `Bearer ${e}`,
    "Content-Type": "application/json",
    "szmelc-inc-client-platform": "agent_browser_extension",
    "szmelc-inc-client-version": chrome.runtime.getManifest().version,
  };
}
function ch(e, t) {
  return `${d().apiBaseUrl}/api/oauth/organizations/${encodeURIComponent(e)}/skills/${t}`;
}
async function uh(e, t) {
  let n;
  try {
    n = await e.json();
  } catch {
    n = void 0;
  }
  const r =
      n?.error?.details?.error_code ?? n?.error?.error_code ?? n?.error_code,
    s = n?.error?.details?.skill_name ?? t;
  switch (r) {
    case "upload_skill_already_exists":
      throw new Zd(s);
    case "upload_skill_limit_reached":
      throw new eh();
    case "upload_skill_name_reserved":
      throw new th(s);
    default:
      throw new rh(e.status, r);
  }
}
async function lh(e) {
  const t = await fetch(ch(e.organizationUuid, "create-simple-skill"), {
    method: "POST",
    headers: await ah(),
    body: JSON.stringify({
      name: e.name,
      description: e.description,
      instructions: e.instructions,
    }),
  });
  t.ok || (await uh(t, e.name));
  const n = await t.json();
  return { skillId: n.id, name: n.name };
}
async function dh(e) {
  const t = await fetch(ch(e, "list-skills"), {
    method: "GET",
    headers: await ah(),
  });
  t.ok || (await uh(t));
  const n = await t.json();
  return Array.isArray(n.skills) ? n.skills : [];
}
async function hh(e, t) {
  return (await dh(e)).find((e) => e.name === t && oh(e));
}
async function ph(e, t) {
  const n = await fetch(ch(e, `${encodeURIComponent(t)}/instructions`), {
    method: "GET",
    headers: await ah(),
  });
  if (!n.ok) {
    if (404 === n.status) throw new nh(!0);
    if (503 === n.status) throw new nh(!1);
    await uh(n);
  }
  return (await n.json()).instructions;
}
function fh(e) {
  return (
    !!e &&
    "object" == typeof e &&
    "string" == typeof e.id &&
    !!e.repeatType &&
    "none" !== e.repeatType
  );
}
var mh = "chrome_ext_skill_migration";
function gh(e) {
  return null;
}
function _h(e, t) {
  return (
    (n = e?.mode),
    ("off" === n || "dry_run" === n || "live" === n ? n : null) ?? "off"
  );
  var n;
}
function yh(e, t, n, r) {
  return (
    t.has(e) || (n?.scheduledSkipped ?? []).includes(e) || (r ?? []).includes(e)
  );
}
var vh = "sched_",
  wh = class {
    static isScheduleAlarm(e) {
      return e.startsWith(vh);
    }
    static async getAll() {
      return (await Q(B.SKILL_SCHEDULES)) ?? [];
    }
    static async getById(e) {
      return (await this.getAll()).find((t) => t.id === e);
    }
    static async create(e) {
      const t = await this.getAll(),
        n = { ...e, id: `${vh}${crypto.randomUUID()}` };
      return (t.push(n), await X(B.SKILL_SCHEDULES, t), n);
    }
    static async update(e, t) {
      const n = await this.getAll(),
        r = n.findIndex((t) => t.id === e);
      if (-1 !== r)
        return (
          (n[r] = { ...n[r], ...t }),
          await X(B.SKILL_SCHEDULES, n),
          n[r]
        );
    }
    static async delete(e) {
      const t = await this.getAll(),
        n = t.find((t) => t.id === e);
      if (!n) return !1;
      if (n.sourceSavedPromptId) {
        const e = await this.getRetiredSources();
        (e.includes(n.sourceSavedPromptId) ||
          (await X(B.SKILL_SCHEDULE_RETIRED_SOURCES, [
            ...e,
            n.sourceSavedPromptId,
          ])),
          await chrome.alarms.clear(n.sourceSavedPromptId));
      }
      return (
        await chrome.alarms.clear(e),
        await X(
          B.SKILL_SCHEDULES,
          t.filter((t) => t.id !== e),
        ),
        !0
      );
    }
    static async getRetiredSources() {
      return (await Q(B.SKILL_SCHEDULE_RETIRED_SOURCES)) ?? [];
    }
    static async unretireSource(e) {
      const t = await this.getRetiredSources();
      t.includes(e) &&
        (await X(
          B.SKILL_SCHEDULE_RETIRED_SOURCES,
          t.filter((t) => t !== e),
        ));
    }
    static bodyOf(e) {
      return (function (e) {
        const t = e.startsWith("\ufeff") ? e.slice(1) : e,
          n = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(t);
        return n ? t.slice(n[0].length) : t;
      })(e ?? "").trim();
    }
    static needsReview(e) {
      const t = (e.approvedInstructions ?? "").trim();
      return !t || t !== (e.cachedInstructions ?? "").trim();
    }
    static async revokeApprovalBySourcePromptId(e) {
      const t = await this.getAll();
      let n = !1;
      for (const r of t)
        r.sourceSavedPromptId === e &&
          r.approvedInstructions &&
          ((r.approvedInstructions = void 0), (n = !0));
      n && (await X(B.SKILL_SCHEDULES, t));
    }
    static async deleteBySourcePromptId(e) {
      const t = await this.getAll(),
        n = t.filter((t) => t.sourceSavedPromptId === e);
      for (const r of n) await chrome.alarms.clear(r.id);
      return (
        n.length &&
          (await X(
            B.SKILL_SCHEDULES,
            t.filter((t) => t.sourceSavedPromptId !== e),
          )),
        n.length
      );
    }
    static async syncFromSavedPrompt(e, t) {
      if (!e.repeatType || "none" === e.repeatType)
        return void (await this.deleteBySourcePromptId(e.id));
      t && (await this.unretireSource(e.id));
      const n = (await this.getAll()).filter(
        (t) => t.sourceSavedPromptId === e.id,
      );
      if (!n.length) return;
      const r = new Set((await chrome.alarms.getAll()).map((e) => e.name));
      for (const s of n) {
        const t = await this.update(s.id, {
          repeatType: e.repeatType,
          specificTime: e.specificTime,
          specificDate: e.specificDate,
          dayOfWeek: e.dayOfWeek,
          dayOfMonth: e.dayOfMonth,
          monthAndDay: e.monthAndDay,
          url: e.url,
          model: e.model,
        });
        t && r.has(s.id) && (await this.updateAlarmForSchedule(t));
      }
    }
    static async refreshInstructionsCache(e, t) {
      const n = await this.getById(t);
      if (!n) return;
      const r = async (e = n.skillId, r = "skill_deleted") => (
        await chrome.alarms.clear(t),
        this.update(t, { skillId: e, disabledReason: r })
      );
      let s;
      try {
        const t = await hh(e, n.skillName);
        if (!t) return r();
        if (!1 === t.enabled) return r(t.id, "skill_unavailable");
        s = t.id;
      } catch {
        return n;
      }
      try {
        const r = this.bodyOf(await ph(e, s)),
          i = await this.update(t, {
            skillId: s,
            cachedInstructions: r,
            cachedAt: Date.now(),
            disabledReason: void 0,
          });
        return (
          n.disabledReason && i && (await this.updateAlarmForSchedule(i)),
          i
        );
      } catch (i) {
        return i instanceof nh && i.permanent
          ? r(s)
          : s !== n.skillId
            ? this.update(t, { skillId: s })
            : n;
      }
    }
    static isArmable(e) {
      return (
        !e.disabledReason &&
        !e.paused &&
        "none" !== e.repeatType &&
        !!e.specificTime
      );
    }
    static async updateAlarmForSchedule(e) {
      if ((await chrome.alarms.clear(e.id), !this.isArmable(e))) return;
      const t = Xd(e);
      t && (await chrome.alarms.create(e.id, t));
    }
    static async syncAllAlarms() {
      const [e, t] = await Promise.all([this.getAll(), chrome.alarms.getAll()]),
        n = new Set(t.map((e) => e.name));
      for (const s of e) {
        const e = this.isArmable(s);
        if (e && !n.has(s.id))
          try {
            await this.updateAlarmForSchedule(s);
          } catch (r) {}
        else !e && n.has(s.id) && (await chrome.alarms.clear(s.id));
      }
    }
    static async clearForAccountSwitch(e) {
      ((await this.isCutoverApplied()) && (await e()),
        await this.clearAllAlarms(),
        await Z([
          B.SKILL_SCHEDULES,
          B.SKILL_MIGRATION_DONE,
          B.SKILL_CUTOVER_APPLIED,
          B.SKILL_SCHEDULE_UNLINKED_DISMISSED,
          B.PENDING_SCHEDULED_TASK,
        ]));
    }
    static async clearAllAlarms() {
      for (const e of await chrome.alarms.getAll())
        this.isScheduleAlarm(e.name) && (await chrome.alarms.clear(e.name));
    }
    static async isSourcePromptCovered(e) {
      const { linked: t, sentinel: n, retired: r } = await this.loadCoverage();
      return yh(e, t, n, r);
    }
    static async loadCoverage() {
      const [e, t, n] = await Promise.all([
        this.getAll(),
        Q(B.SKILL_MIGRATION_DONE),
        this.getRetiredSources(),
      ]);
      return {
        linked: new Set(e.map((e) => e.sourceSavedPromptId).filter((e) => !!e)),
        sentinel: t,
        retired: n,
      };
    }
    static async isCutoverApplied() {
      return (await Q(B.SKILL_CUTOVER_APPLIED)) ?? !1;
    }
    static async reconcileAlarms(e, t, n) {
      const r = await this.isCutoverApplied();
      if ("unknown" === e) return r;
      if ("inactive" === e)
        return (
          await this.clearAllAlarms(),
          r && (await n(), await X(B.SKILL_CUTOVER_APPLIED, !1)),
          !1
        );
      (r || (await X(B.SKILL_CUTOVER_APPLIED, !0)), await this.syncAllAlarms());
      const { linked: s, sentinel: i, retired: o } = await this.loadCoverage();
      for (const a of t)
        fh(a) && yh(a.id, s, i, o) && (await chrome.alarms.clear(a.id));
      return !0;
    }
  },
  Eh = class {
    static async getAllPrompts() {
      return (await Q(B.SAVED_PROMPTS)) || [];
    }
    static async getPromptById(e) {
      return (await this.getAllPrompts()).find((t) => t.id === e);
    }
    static async getPromptByCommand(e) {
      return (await this.getAllPrompts()).find((t) => t.command === e);
    }
    static async savePrompt(e) {
      const t = await this.getAllPrompts();
      if (e.command && t.find((t) => t.command === e.command))
        throw new Error(`/${e.command} is already in use`);
      const n = {
        ...e,
        id: `prompt_${Date.now()}`,
        createdAt: e.createdAt || Date.now(),
        usageCount: e.usageCount || 0,
      };
      return (
        t.push(n),
        await X(B.SAVED_PROMPTS, t),
        n.repeatType &&
          "none" !== n.repeatType &&
          (await this.updateAlarmForPrompt(n)),
        n
      );
    }
    static async updatePrompt(e, t, n) {
      const r = await this.getAllPrompts(),
        s = r.findIndex((t) => t.id === e);
      if (-1 === s) return;
      if (
        t.command &&
        t.command !== r[s].command &&
        r.find((e) => e.command === t.command)
      )
        throw new Error(`/${t.command} is already in use`);
      const i = r[s];
      ((r[s] = { ...r[s], ...t }), await X(B.SAVED_PROMPTS, r));
      const o = r[s];
      i.prompt !== o.prompt && (await wh.revokeApprovalBySourcePromptId(e));
      const a = Jd(i) !== Jd(o);
      return (
        a && (await this.updateAlarmForPrompt(o)),
        (!a && i.url === o.url && i.model === o.model) ||
          n ||
          (await wh.syncFromSavedPrompt(o, a)),
        r[s]
      );
    }
    static async deletePrompt(e) {
      const t = await this.getAllPrompts(),
        n = t.find((t) => t.id === e),
        r = t.filter((t) => t.id !== e);
      return (
        r.length !== t.length &&
        (n?.repeatType &&
          "none" !== n.repeatType &&
          (await chrome.alarms.clear(e)),
        await wh.deleteBySourcePromptId(e),
        await X(B.SAVED_PROMPTS, r),
        !0)
      );
    }
    static async recordPromptUsage(e) {
      const t = await this.getAllPrompts(),
        n = t.find((t) => t.id === e);
      n &&
        ((n.lastUsedAt = Date.now()),
        (n.usageCount = (n.usageCount || 0) + 1),
        await X(B.SAVED_PROMPTS, t));
    }
    static async searchPrompts(e) {
      const t = await this.getAllPrompts(),
        n = e.toLowerCase();
      return t.filter(
        (e) =>
          e.prompt.toLowerCase().includes(n) ||
          (e.command && e.command.toLowerCase().includes(n)),
      );
    }
    static async exportPrompts(e) {
      const t = await this.getAllPrompts(),
        n = e ? t.filter((t) => e.includes(t.id)) : t;
      return JSON.stringify(n, null, 2);
    }
    static async importPrompts(e, t = !1) {
      const n = JSON.parse(e),
        r = t ? [] : await this.getAllPrompts(),
        s = n.map((e) => ({
          ...e,
          id: `prompt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: Date.now(),
          usageCount: 0,
          lastUsedAt: void 0,
        })),
        i = [...r, ...s].filter((e) => e.command).map((e) => e.command),
        o = new Set(i);
      if (i.length !== o.size)
        throw new Error("Import contains duplicate command shortcuts");
      const a = [...r, ...s];
      return (await X(B.SAVED_PROMPTS, a), s.length);
    }
    static async updateAlarmForPrompt(e) {
      const t = e.id;
      await chrome.alarms.clear(t);
      const n = Xd(e);
      n && (await chrome.alarms.create(t, n));
    }
    static async updateNextRunTimes() {
      const e = await this.getAllPrompts(),
        t = await chrome.alarms.getAll();
      let n = !1;
      for (const r of e)
        if (r.repeatType && "none" !== r.repeatType) {
          const e = t.find((e) => e.name === r.id)?.scheduledTime;
          r.nextRun !== e && ((r.nextRun = e), (n = !0));
        } else r.nextRun && ((r.nextRun = void 0), (n = !0));
      n && (await X(B.SAVED_PROMPTS, e));
    }
  };
export {
  xs as $,
  Ht as $t,
  Ad as A,
  Q as An,
  un as At,
  _d as B,
  U as Bn,
  In as Bt,
  Fd as C,
  pe as Cn,
  Pn as Ct,
  xd as D,
  Oe as Dn,
  bn as Dt,
  Pd as E,
  ue as En,
  cn as Et,
  wd as F,
  te as Fn,
  On as Ft,
  ui as G,
  O as Gn,
  Vt as Gt,
  Ec as H,
  I as Hn,
  gn as Ht,
  Ed as I,
  q as In,
  kn as It,
  yi as J,
  v as Jn,
  nn as Jt,
  di as K,
  R as Kn,
  Xt as Kt,
  vd as L,
  K as Ln,
  hn as Lt,
  Id as M,
  Z as Mn,
  mn as Mt,
  Cd as N,
  W as Nn,
  dn as Nt,
  Td as O,
  re as On,
  Rn as Ot,
  bd as P,
  X as Pn,
  ln as Pt,
  Vs as Q,
  Zt as Qt,
  yd as R,
  H as Rn,
  pn as Rt,
  Kd as S,
  Ke as Sn,
  Nn as St,
  Nd as T,
  ce as Tn,
  Cn as Tt,
  li as U,
  C as Un,
  En as Ut,
  wc as V,
  w as Vn,
  fn as Vt,
  Si as W,
  D as Wn,
  Yt as Wt,
  bi as X,
  a as Xn,
  qt as Xt,
  wi as Y,
  d as Yn,
  Jt as Yt,
  vi as Z,
  s as Zn,
  tn as Zt,
  dh as _,
  Ie as _n,
  jn as _t,
  gh as a,
  vt as an,
  Es as at,
  zd as b,
  Ge as bn,
  Hn as bt,
  Zd as c,
  wt as cn,
  vs as ct,
  th as d,
  st as dn,
  Wr as dt,
  It as en,
  Cs as et,
  ih as f,
  We as fn,
  zr as ft,
  oh as g,
  Re as gn,
  Bn as gt,
  ph as h,
  Pe as hn,
  Gn as ht,
  _h as i,
  gt as in,
  Ss as it,
  Rd as j,
  ee as jn,
  Tn as jt,
  kd as k,
  B as kn,
  Sn as kt,
  rh as l,
  ot as ln,
  Vr as lt,
  hh as m,
  Ue as mn,
  Fn as mt,
  wh as n,
  At as nn,
  Ps as nt,
  fh as o,
  yt as on,
  bs as ot,
  lh as p,
  $e as pn,
  Br as pt,
  hi as q,
  x as qn,
  Qt as qt,
  mh as r,
  mt as rn,
  Us as rt,
  sh as s,
  Et as sn,
  ws as st,
  Eh as t,
  Ot as tn,
  Ds as tt,
  eh as u,
  ct as un,
  qr as ut,
  Yd as v,
  he as vn,
  Kn as vt,
  Ld as w,
  de as wn,
  Dn as wt,
  qd as x,
  Ce as xn,
  xn as xt,
  Vd as y,
  ke as yn,
  Mn as yt,
  Sd as z,
  j as zn,
  _n as zt,
};
