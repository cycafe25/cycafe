// One catalogue model for the public site and admin. Built-ins are overlaid by
// Firestore records; tombstones keep deleted built-ins hidden after reload.
(function () {
    const cloud = {services: [], notices: []};
    const status = {services: 'loading', notices: 'loading'};
    const listeners = new Set();
    const base = {
        services: [...(window.CYCAFE_INLINE_SERVICES || []),
            ...(window.CYBER_GOVT_SERVICES || []).map((s,i)=>({...s,id:'base-catalog-'+i}))],
        notices: window.CYCAFE_BASE_NOTICES || []
    };
    const safeUrl = value => {
        const s = String(value || '').trim();
        if (s.startsWith('#/')) return s;
        try { const u = new URL(s); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; }
        catch { return ''; }
    };
    function normalize(kind, item) {
        const n = {...item};
        if (kind === 'services') {
            n.url = safeUrl(n.url);
            n.name = n.name || '';
        } else {
            n.type = ['scheme','schemes'].includes(n.type) ? 'scheme' : 'notice';
            n.desc = n.desc || n.keyUpdate || '';
            n.keyUpdate = n.keyUpdate || n.desc;
            n.officialUrl = safeUrl(n.officialUrl || n.link);
            n.link = n.officialUrl;
            n.dates = {...(n.dates || {})};
            if (n.lastDate) {
                if (n.type === 'notice') n.dates.last = n.lastDate;
                else n.dates.deadline = n.lastDate;
            }
            n.dates.last = n.dates.last || 'See official notice';
            n.badge = n.badge || 'Update';
            // Public visitors cannot delete global announcements.
            n.isCustom = false;
        }
        return n;
    }
    function list(kind) {
        const records = new Map(base[kind].map(n=>[n.id, n]));
        cloud[kind].forEach(n=>records.set(n.id,{...(records.get(n.id)||{}),...n}));
        return [...records.values()].filter(n=>!n.deleted).map(n=>normalize(kind,n));
    }
    function notify(kind) { listeners.forEach(fn=>fn(kind)); }
    window.CycafeContent = {
        list, safeUrl, status, base,
        has(kind,id) { return cloud[kind].some(n=>n.id===id); },
        subscribe(fn) { listeners.add(fn); return ()=>listeners.delete(fn); },
        receive(kind, records) { cloud[kind]=records; status[kind]='ready'; notify(kind); },
        fail(kind,error) { status[kind]='error'; console.error('Content sync failed: '+kind,error); notify(kind); },
        changed: notify
    };
    window.dispatchEvent(new Event('cycafe-content-ready'));
})();

