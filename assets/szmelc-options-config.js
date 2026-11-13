/**
 * Szmelc-RCE — options page configuration panel.
 * Renders a standalone "Szmelc-RCE Configuration" section below the main
 * options UI and persists changes via the central config module.
 */

(() => {
    const key = 'szmelcRceConfig';

    const fields = [
        { id: 'webUrl', label: 'Web origin', placeholder: 'https://szmelc.com',
          help: 'Bootstrap API, OAuth pages, embedded web app.' },
        { id: 'apiBaseUrl', label: 'REST API base', placeholder: 'https://szmelc.com',
          help: 'API key lookup, MCP client, event logging.' },
        { id: 'wsApiBaseUrl', label: 'WebSocket API base', placeholder: 'wss://szmelc.com',
          help: 'WebSocket upgrade target for the REST API.' },
        { id: 'bridgeUrl', label: 'Control bridge (WebSocket)', placeholder: 'wss://szmelc.com',
          help: 'Remote-control endpoint. The extension connects to <bridgeUrl>/chrome/<userId>. Point this at YOUR bridge server (self-hosted) — it can be any implementation that speaks the execute_tool JSON protocol.' },
        { id: 'localBridgeUrl', label: 'Local bridge (WebSocket)', placeholder: 'ws://localhost:8765',
          help: 'Used when "Local bridge" is enabled, e.g. a desktop app on this machine.' },
        { id: 'authorizeUrl', label: 'OAuth authorize URL', placeholder: '(default follows web origin)',
          help: 'Optional full URL for the OAuth authorize step.' },
        { id: 'tokenUrl', label: 'OAuth token URL', placeholder: '(default follows web origin)',
          help: 'Optional full URL for token exchange.' },
        { id: 'revokeUrl', label: 'OAuth revoke URL', placeholder: '(default follows web origin)',
          help: 'Optional full URL for token revocation.' },
        { id: 'oauthClientId', label: 'OAuth client id', placeholder: '(built-in default)',
          help: 'Used for your own OAuth server; leave empty to keep the built-in.' },
    ];
    const flags = [
        { id: 'localBridge', label: 'Use local bridge', help: 'Prefer the local bridge over the remote one.' },
        { id: 'bridgeAnonymous', label: 'Anonymous bridge connect', help: 'When signed out, connect to the remote bridge as an anonymous device (no OAuth needed) — lets any self-hosted bridge work out of the box.' },
    ];
    const multi = [
        { id: 'nativeHosts', label: 'Native messaging hosts', listHelp:
          'One per line. Matching host scripts live in native-host/ (see README).' },
    ];

    function load() {
        return new Promise((res) => {
            try {
                chrome.storage.local.get(key, (s) => res(s && s[key] ? s[key] : null));
            } catch { res(null); }
        });
    }

    async function render() {
        const saved = await load();
        const cfg = Object.assign({}, window.__SZMELC_DEFAULTS || window.__SZMELC_CFG, saved || {});

        const section = document.createElement('section');
        section.id = 'szmelc-rce-config-section';
        section.style.cssText = 'margin:24px;padding:20px;border:1px solid var(--cds-border-2,#e5e7eb);border-radius:12px;background:var(--cds-bg-3,#fff);font-family:system-ui,sans-serif;color:var(--cds-text-1,#111)';

        section.innerHTML = `
        <h2 style="margin:0 0 4px;font-size:18px">Szmelc-RCE Configuration</h2>
        <p style="margin:0 0 16px;font-size:13px;opacity:.7">All hardwired endpoints live here. Changes take effect after the extension reloads (automatic).</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 20px">
        ${fields.map(f => `
            <label style="display:flex;flex-direction:column;gap:4px;font-size:13px;font-weight:600">
                ${f.label}
                <input data-szconf="${f.id}" type="text" value="" placeholder="${f.placeholder}"
                    style="padding:6px 8px;border:1px solid #d1d5db;border-radius:6px;font:inherit;font-weight:400">
                <span style="font-weight:400;font-size:11px;opacity:.6">${f.help}</span>
            </label>`).join('')}
        </div>
        <div style="display:flex;gap:24px;margin-top:16px;font-size:13px;flex-wrap:wrap">
            ${flags.map(f => `
            <label style="display:flex;align-items:center;gap:8px;font-weight:600">
                <input data-szconf-flag="${f.id}" type="checkbox"> ${f.label}
                <span style="font-weight:400;font-size:11px;opacity:.6">${f.help}</span>
            </label>`).join('')}
        </div>
        <div style="margin-top:16px">
            <div style="font-size:13px;font-weight:600">${multi[0].label}</div>
            <textarea data-szconf-list="nativeHosts" rows="3"
                style="margin-top:4px;width:100%;padding:6px 8px;border:1px solid #d1d5db;border-radius:6px;font:inherit;font-family:ui-monospace,monospace;font-size:12px"></textarea>
            <div style="font-size:11px;opacity:.6">${multi[0].listHelp}</div>
        </div>
        <div style="margin-top:16px;display:flex;gap:12px;align-items:center">
            <button data-szconf-action="save" style="padding:8px 16px;border-radius:8px;border:1px solid transparent;background:#4f46e5;color:#fff;font:inherit;font-size:13px;cursor:pointer">Save &amp; restart extension</button>
            <button data-szconf-action="reset" style="padding:8px 16px;border-radius:8px;border:1px solid #d1d5db;background:transparent;font:inherit;font-size:13px;cursor:pointer">Reset to defaults</button>
            <button data-szconf-action="json" style="padding:8px 16px;border-radius:8px;border:1px solid #d1d5db;background:transparent;font:inherit;font-size:13px;cursor:pointer">Export / import JSON</button>
            <span data-szconf-status style="font-size:12px;opacity:.7"></span>
        </div>`;

        // Populate the form. Scope queries to the section: it isn't in the
        // document yet (it's prepended at the end of this function).
        section.querySelectorAll('[data-szconf]').forEach(el => {
            const v = cfg[el.dataset.szconf];
            if (typeof v === 'string' && v) el.value = v;
        });
        section.querySelectorAll('[data-szconf-flag]').forEach(el => {
            el.checked = !!cfg[el.dataset.szconfFlag];
        });
        const listEl = section.querySelector('[data-szconf-list]');
        if (listEl) listEl.value = (cfg.nativeHosts || []).join('\n');

        const status = section.querySelector('[data-szconf-status]');
        const set = (m) => { status.textContent = m; setTimeout(() => status.textContent = '', 4000); };

        section.addEventListener('click', async (ev) => {
            const action = ev.target?.dataset?.szconfAction;
            if (!action) return;
            const patch = {};
            document.querySelectorAll('[data-szconf]').forEach(el => {
                const v = el.value.trim();
                patch[el.dataset.szconf] = v;
            });
            document.querySelectorAll('[data-szconf-flag]').forEach(el => {
                patch[el.dataset.szconfFlag] = el.checked;
            });
            patch.nativeHosts = section.querySelector('[data-szconf-list]')
                .value.split('\n').map(s => s.trim()).filter(Boolean);

            if (action === 'save') {
                try {
                    await chrome.storage.local.set({ [key]: patch });
                    set('Saved. Restarting extension…');
                    setTimeout(() => chrome.runtime.reload(), 600);
                } catch (err) { set('Failed: ' + err.message); }
            } else if (action === 'reset') {
                try {
                    await chrome.storage.local.remove(key);
                    set('Reset. Restarting extension…');
                    setTimeout(() => chrome.runtime.reload(), 600);
                } catch (err) { set('Failed: ' + err.message); }
            } else if (action === 'json') {
                const text = prompt('Your config JSON (edit and confirm to import):',
                    JSON.stringify(patch, null, 2));
                if (text) {
                    try {
                        const parsed = JSON.parse(text);
                        document.querySelectorAll('[data-szconf]').forEach(el => {
                            el.value = typeof parsed[el.dataset.szconf] === 'string' ? parsed[el.dataset.szconf] : '';
                        });
                        document.querySelectorAll('[data-szconf-flag]').forEach(el => {
                            el.checked = !!parsed[el.dataset.szconfFlag];
                        });
                        section.querySelector('[data-szconf-list]').value =
                            (parsed.nativeHosts || []).join('\n');
                        set('Patched from JSON — press Save.');
                    } catch { set('Invalid JSON'); }
                }
            }
        });

        // Insert near top of the page so it's easy to find.
        document.body.prepend(section);
    }

    let booted = false;
    function start() {
        if (booted) return;
        booted = true;
        render().catch((err) => console.error('[Szmelc-RCE config]', err));
    }
    document.addEventListener('DOMContentLoaded', start);
    if (document.readyState !== 'loading') start();
})();
