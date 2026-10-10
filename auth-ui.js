// Modal UI must exist before Firebase modules load (including file:// previews).
(() => {
    'use strict';
    const byId = id => document.getElementById(id);
    let ready = false;
    let timedOut = false;
    const isFile = location.protocol === 'file:';
    const forms = ['login-form', 'register-form', 'admin-login-form'];
    const buttons = ['login-btn', 'register-btn', 'admin-login-submit-btn'];
    let timeout;

    function updateStartup() {
        const box = byId('auth-startup-status');
        if (!box) return;
        box.replaceChildren();
        box.hidden = ready;
        if (ready) return;
        buttons.forEach(id => { const button = byId(id); if (button) button.disabled = true; });
        const text = document.createElement('p');
        text.textContent = isFile
            ? 'Login cannot run from a directly opened HTML file. Start start-server.ps1 in the website folder, then open the website below.'
            : !navigator.onLine
                ? 'You are offline. Connect to the internet and reload to use Firebase login.'
                : timedOut
                    ? 'Firebase login has not loaded. Check your internet connection and reload the website.'
                    : 'Connecting to Firebase… Please wait before signing in.';
        box.append(text);
        if (isFile) {
            const link = document.createElement('a');
            link.href = 'http://localhost:8080/';
            link.textContent = 'Open Cycafe at localhost:8080';
            link.className = 'block mt-2 font-bold underline';
            box.append(link);
        }
    }

    window.switchAuthModeTab = function(mode) {
        const active = mode === 'admin' ? 'admin-login-screen' : mode === 'register' ? 'register-screen' : 'login-screen';
        ['login-screen', 'register-screen', 'admin-login-screen'].forEach(id => {
            const panel = byId(id); if (!panel) return;
            const selected = id === active;
            panel.classList.toggle('hidden', !selected);
            panel.style.display = selected ? 'block' : 'none';
            panel.setAttribute('aria-hidden', String(!selected));
        });
        ['operator', 'admin'].forEach(tab => {
            const button = byId('auth-tab-' + tab + '-btn'); if (!button) return;
            const selected = tab === (mode === 'admin' ? 'admin' : 'operator');
            button.classList.toggle('is-active', selected);
            button.classList.toggle('is-admin-active', selected && tab === 'admin');
            button.setAttribute('aria-selected', String(selected));
            button.tabIndex = selected ? 0 : -1;
        });
        updateStartup();
        const fieldId = mode === 'admin' ? 'admin-login-id' : mode === 'register' ? 'reg-name' : 'login-email';
        const deferFocus = window.requestAnimationFrame || ((callback) => setTimeout(callback, 0));
        deferFocus(() => {
            if (!byId('authModal')?.classList.contains('hidden')) byId(fieldId)?.focus();
        });
    };

    window.toggleAuthPassword = function(fieldId, button) {
        const field = byId(fieldId);
        if (!field || !button) return;
        const showPassword = field.type === 'password';
        field.type = showPassword ? 'text' : 'password';
        button.setAttribute('aria-pressed', String(showPassword));
        button.setAttribute('aria-label', showPassword ? 'Hide password' : 'Show password');
        const icon = button.querySelector('i');
        if (icon) icon.className = showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    };

    window.openAuthModal = function(message = '') {
        const modal = byId('authModal'); if (!modal) return;
        modal.classList.remove('hidden'); modal.classList.add('flex');
        window.switchAuthModeTab('operator');
        const alert = byId('login-alert');
        if (alert) {
            alert.replaceChildren();
            if (message) {
                const text = document.createElement('div');
                text.className = 'rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 mb-3';
                text.textContent = message; alert.append(text);
            }
        }
    };
    window.closeAuthModal = function() {
        const modal = byId('authModal'); if (!modal) return;
        modal.classList.add('hidden'); modal.classList.remove('flex');
        byId('login-alert')?.replaceChildren();
        // Never leave credentials visible in a hidden modal. Keep the email
        // field for convenience, but clear passwords and reset their controls.
        ['login-password', 'admin-login-secret', 'reg-password'].forEach(fieldId => {
            const field = byId(fieldId);
            if (field) field.value = '';
            const button = document.querySelector(`[onclick*="toggleAuthPassword('${fieldId}'"]`);
            if (!button) return;
            button.setAttribute('aria-pressed', 'false');
            button.setAttribute('aria-label', 'Show password');
            const icon = button.querySelector('i');
            if (icon) icon.className = 'fa-regular fa-eye';
            if (field) field.type = 'password';
        });
    };
    // Prevent native form navigation and inline admin calls until handlers exist.
    document.addEventListener('submit', event => {
        if (!forms.includes(event.target.id) || ready) return;
        event.preventDefault(); event.stopImmediatePropagation(); updateStartup();
    }, true);
    document.addEventListener('click', event => {
        const link = event.target.closest?.('#show-register, #show-login');
        if (link) { event.preventDefault(); window.switchAuthModeTab(link.id === 'show-register' ? 'register' : 'operator'); }
        if (event.target === byId('authModal')) window.closeAuthModal();
    });
    window.CycafeAuthUI = {
        setReady() {
            if (isFile || ready) return;
            ready = true; clearTimeout(timeout);
            buttons.forEach(id => { const button = byId(id); if (button) button.disabled = false; });
            updateStartup();
        },
        isReady: () => ready
    };
    // Module imports can delay DOMContentLoaded indefinitely; start the timer now.
    if (!isFile) timeout = setTimeout(() => { timedOut = true; updateStartup(); }, 15000);
    function init() { updateStartup(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
    window.addEventListener('online', updateStartup);
    window.addEventListener('offline', updateStartup);
})();
