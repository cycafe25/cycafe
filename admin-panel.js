// Cycafe Admin Control Center Engine
// Handles Admin Authentication, Cyber Services CRUD, Customer & Transaction Administration,
// Business Reports Analytics, and Govt Schemes/Job Notice Publishing.

(function() {
    'use strict';

    // Admin session state
    let isAdmin = sessionStorage.getItem('cycafe_admin_logged_in') === 'true';
    let currentAdminWorkspace = 'services'; // 'services' | 'customers' | 'transactions' | 'reports' | 'updates'

    // Local Storage Keys
    const STORAGE_CUSTOM_SERVICES = 'cycafe_custom_services';
    const STORAGE_DELETED_SERVICES = 'cycafe_deleted_services';
    const STORAGE_MODIFIED_SERVICES = 'cycafe_modified_services';
    const STORAGE_LOCAL_CUSTOMERS = 'cycafe_local_customers_v1';
    const STORAGE_LOCAL_TXNS = 'cycafe_local_txns_v1';

    // Helper: Safe HTML
    function esc(s) {
        if (!s) return '';
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Helper: Toast
    function showToast(msg, type = 'success') {
        const toast = document.createElement('div');
        const icon = type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-exclamation text-amber-400';
        toast.className = 'fixed bottom-5 right-5 z-[1000] bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gray-700 text-xs font-semibold flex items-center gap-2.5 animate-bounce';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${esc(msg)}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    // ==========================================
    // 1. ADMIN AUTHENTICATION (Firebase Only)
    // ==========================================
    function verifyAdminLogin(identifier, secret) {
        // Direct local bypass disabled - all authentication flows through Firebase Auth
        return sessionStorage.getItem('cycafe_admin_logged_in') === 'true';
    }

    function setAdminLoggedIn(status) {
        isAdmin = status;
        if (status) {
            sessionStorage.setItem('cycafe_admin_logged_in', 'true');
        } else {
            sessionStorage.removeItem('cycafe_admin_logged_in');
        }
        updateAdminUIVisibility();
    }

    function updateAdminUIVisibility() {
        const adminShortcut = document.getElementById('admin-dashboard-shortcut');
        const adminBadge = document.getElementById('admin-header-badge');
        const adminSection = document.getElementById('admin-section');
        const adminLockScreen = document.getElementById('admin-lock-screen');
        const adminMainDashboard = document.getElementById('admin-main-dashboard');

        if (adminShortcut) {
            adminShortcut.classList.toggle('hidden', !isAdmin);
        }
        if (adminBadge) {
            adminBadge.classList.toggle('hidden', !isAdmin);
        }

        if (adminSection) {
            if (isAdmin) {
                if (adminLockScreen) adminLockScreen.classList.add('hidden');
                if (adminMainDashboard) adminMainDashboard.classList.remove('hidden');
                refreshAdminWorkspace();
            } else {
                if (adminLockScreen) adminLockScreen.classList.remove('hidden');
                if (adminMainDashboard) adminMainDashboard.classList.add('hidden');
            }
        }
    }

    // ==========================================
    // 2. CYBER SERVICES MANAGEMENT (CRUD)
    // ==========================================
    function getDeletedServiceNames() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_DELETED_SERVICES) || '[]');
        } catch (e) { return []; }
    }

    function getCustomServices() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_CUSTOM_SERVICES) || '[]');
        } catch (e) { return []; }
    }

    function getModifiedServices() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_MODIFIED_SERVICES) || '{}');
        } catch (e) { return {}; }
    }

    function getAllLiveServices() {
        const deleted = getDeletedServiceNames();
        const custom = getCustomServices();
        const modified = getModifiedServices();

        const base = (window.CYBER_GOVT_SERVICES || []).filter(item => !deleted.includes(item.name));
        const mergedBase = base.map(item => modified[item.name] || item);

        return [...custom, ...mergedBase];
    }

    function addCustomService(service) {
        const custom = getCustomServices();
        service.id = 'custom-srv-' + Date.now();
        service.isCustom = true;
        custom.unshift(service);
        localStorage.setItem(STORAGE_CUSTOM_SERVICES, JSON.stringify(custom));
        syncPublicServicesGrid();
        renderAdminServicesTable();
        showToast(`Service "${service.name}" added successfully!`);
    }

    function deleteService(serviceName) {
        if (!confirm(`Are you sure you want to remove "${serviceName}" from the website catalog?`)) return;

        // Check if custom
        let custom = getCustomServices();
        const customIdx = custom.findIndex(s => s.name === serviceName || s.id === serviceName);
        if (customIdx >= 0) {
            custom.splice(customIdx, 1);
            localStorage.setItem(STORAGE_CUSTOM_SERVICES, JSON.stringify(custom));
        } else {
            const deleted = getDeletedServiceNames();
            if (!deleted.includes(serviceName)) {
                deleted.push(serviceName);
                localStorage.setItem(STORAGE_DELETED_SERVICES, JSON.stringify(deleted));
            }
        }

        syncPublicServicesGrid();
        renderAdminServicesTable();
        showToast(`Service "${serviceName}" removed.`);
    }

    function syncPublicServicesGrid() {
        const grid = document.getElementById('services-grid');
        if (!grid) return;

        // Fetch live services
        const liveServices = getAllLiveServices();

        // Update counter badges
        const countBadge = document.getElementById('services-count-badge');
        if (countBadge) countBadge.textContent = `${liveServices.length} Services Available`;
        const allTab = document.querySelector('#service-category-tabs button');
        if (allTab) allTab.textContent = `All Services (${liveServices.length})`;

        // Re-render grid cards
        const fragment = document.createDocumentFragment();
        liveServices.forEach(item => {
            const card = document.createElement('div');
            card.className = 'service-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between';
            card.dataset.category = `${item.category || 'govt'} govt`;
            card.dataset.name = `${item.name} ${item.desc || ''} ${item.keywords || ''}`.toLowerCase();

            const iconClass = item.icon || 'fa-solid fa-laptop-code';
            const color = item.color || 'indigo';
            const safeName = esc(item.name);
            const safeUrl = esc(item.url || 'https://www.india.gov.in/');
            const safeCategory = esc(item.category || 'govt');
            const safeIcon = esc(iconClass);

            card.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <div class="w-10 h-10 rounded-lg bg-${color}-100 text-${color}-700 flex items-center justify-center text-lg">
                            <i class="${iconClass}"></i>
                        </div>
                        <span class="text-[10px] font-bold bg-${color}-50 text-${color}-700 px-2 py-0.5 rounded border border-${color}-200">${esc(item.badge || 'Portal')}</span>
                    </div>
                    <h4 class="font-bold text-gray-900 text-sm mb-1 line-clamp-1" title="${safeName}">${safeName}</h4>
                    <p class="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">${esc(item.desc || '')}</p>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                    <span class="text-xs font-semibold text-gray-700">Govt Portal</span>
                    <div class="flex items-center gap-1.5">
                        <button type="button" onclick="openServiceApplyModal({ name: '${safeName}', url: '${safeUrl}', category: '${safeCategory}', icon: '${safeIcon}' })" class="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-xs font-semibold transition inline-flex items-center gap-1 shadow-sm active:scale-95" title="Apply for ${safeName}">
                            <i class="fa-solid fa-file-pen text-[10px]"></i> Apply
                        </button>
                        <button type="button" onclick="window.open('${safeUrl}', '_blank', 'noopener,noreferrer')" class="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition inline-flex items-center gap-1 active:scale-95" title="Visit official ${safeName} portal">
                            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Visit
                        </button>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });

        grid.innerHTML = '';
        grid.appendChild(fragment);
    }

    function renderAdminServicesTable() {
        const tbody = document.getElementById('admin-services-table-body');
        const countChip = document.getElementById('admin-services-count');
        const searchInput = document.getElementById('admin-services-search');
        if (!tbody) return;

        let services = getAllLiveServices();
        const query = (searchInput?.value || '').trim().toLowerCase();

        if (query) {
            services = services.filter(s => 
                (s.name || '').toLowerCase().includes(query) || 
                (s.category || '').toLowerCase().includes(query) || 
                (s.badge || '').toLowerCase().includes(query)
            );
        }

        if (countChip) countChip.textContent = `${services.length} Services`;

        if (!services.length) {
            tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-xs text-gray-400">No services match your search query.</td></tr>`;
            return;
        }

        tbody.innerHTML = services.slice(0, 100).map((s, idx) => {
            const icon = s.icon || 'fa-solid fa-laptop-code';
            const safeName = esc(s.name);
            const safeUrl = esc(s.url || '#');
            const isCustom = s.isCustom;

            return `
                <tr class="hover:bg-gray-50 transition border-b border-gray-100 text-xs">
                    <td class="p-3 text-gray-400 font-mono text-[11px]">${idx + 1}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-sm shrink-0">
                                <i class="${icon}"></i>
                            </div>
                            <div>
                                <span class="font-bold text-gray-900 block truncate max-w-xs" title="${safeName}">${safeName}</span>
                                <span class="text-[11px] text-gray-400 truncate block max-w-xs">${esc(s.desc || 'Government digital service')}</span>
                            </div>
                        </div>
                    </td>
                    <td class="p-3">
                        <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                            ${esc(s.category || 'govt')}
                        </span>
                        ${isCustom ? '<span class="ml-1 inline-flex px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">Custom</span>' : ''}
                    </td>
                    <td class="p-3">
                        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline flex items-center gap-1 font-mono text-[11px] max-w-[180px] truncate" title="${safeUrl}">
                            <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i> ${safeUrl.replace(/^https?:\/\//, '')}
                        </a>
                    </td>
                    <td class="p-3 text-right">
                        <button type="button" onclick="window.CycafeAdmin.deleteService('${esc(s.name)}')" class="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-semibold transition" title="Delete or Hide Service">
                            <i class="fa-solid fa-trash-can"></i> Remove
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ==========================================
    // 3. CUSTOMER MANAGEMENT (ADMIN)
    // ==========================================
    function getAdminCustomers() {
        if (typeof window.getCycafeCustomers === 'function') {
            const list = window.getCycafeCustomers();
            if (list && list.length) return list;
        }
        try {
            return JSON.parse(localStorage.getItem(STORAGE_LOCAL_CUSTOMERS) || '[]');
        } catch (e) { return []; }
    }

    function saveAdminCustomers(list) {
        localStorage.setItem(STORAGE_LOCAL_CUSTOMERS, JSON.stringify(list));
    }

    function updateCustomerStatus(id, newStatus) {
        let list = getAdminCustomers();
        const item = list.find(c => c.id === id);
        if (item) {
            item.status = newStatus;
            saveAdminCustomers(list);
            renderAdminCustomersTable();
            showToast(`Customer status updated to "${newStatus}"`);
        }
    }

    function deleteCustomerRecord(id) {
        if (!confirm('Are you sure you want to remove this customer record?')) return;
        let list = getAdminCustomers();
        list = list.filter(c => c.id !== id);
        saveAdminCustomers(list);
        renderAdminCustomersTable();
        showToast('Customer record deleted.');
    }

    function renderAdminCustomersTable() {
        const tbody = document.getElementById('admin-customers-table-body');
        const countChip = document.getElementById('admin-customers-count');
        const filterSelect = document.getElementById('admin-customers-filter');
        const searchInput = document.getElementById('admin-customers-search');
        if (!tbody) return;

        let customers = getAdminCustomers();
        const statusFilter = filterSelect?.value || 'all';
        const query = (searchInput?.value || '').trim().toLowerCase();

        if (statusFilter !== 'all') {
            customers = customers.filter(c => (c.status || 'Pending').toLowerCase() === statusFilter.toLowerCase());
        }

        if (query) {
            customers = customers.filter(c => 
                (c.name || '').toLowerCase().includes(query) ||
                (c.mobile || c.number || '').includes(query) ||
                (c.service || '').toLowerCase().includes(query)
            );
        }

        if (countChip) countChip.textContent = `${customers.length} Customers`;

        if (!customers.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="p-8 text-center text-xs text-gray-500">
                        <div class="flex flex-col items-center justify-center gap-2">
                            <i class="fa-solid fa-users text-2xl text-gray-300"></i>
                            <span>No customer records found. Add a customer order to view records here.</span>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = customers.map((c, idx) => {
            const status = c.status || 'Pending';
            const statusColors = {
                'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
                'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
                'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                'Cancelled': 'bg-rose-100 text-rose-800 border-rose-200'
            };
            const badgeClass = statusColors[status] || 'bg-gray-100 text-gray-800';
            const mobile = c.mobile || c.number || '—';
            const whatsappUrl = mobile !== '—' ? `https://api.whatsapp.com/send?phone=91${mobile.replace(/[^0-9]/g, '')}&text=Hello%20${encodeURIComponent(c.name || 'Customer')},%20regarding%20your%20service%20at%20Cycafe...` : '#';

            return `
                <tr class="hover:bg-gray-50 transition border-b border-gray-100 text-xs">
                    <td class="p-3 text-gray-400 font-mono text-[11px]">${idx + 1}</td>
                    <td class="p-3">
                        <span class="font-bold text-gray-900 block">${esc(c.name || 'Customer')}</span>
                        <span class="text-[11px] text-gray-500">${esc(c.email || '')}</span>
                    </td>
                    <td class="p-3">
                        <span class="font-mono text-gray-700">${esc(mobile)}</span>
                    </td>
                    <td class="p-3">
                        <span class="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded border border-violet-100 text-[11px]">
                            ${esc(c.service || 'Cyber Cafe Service')}
                        </span>
                    </td>
                    <td class="p-3 font-bold text-gray-800">
                        ₹${c.amount || c.fee || '0'}
                    </td>
                    <td class="p-3">
                        <select onchange="window.CycafeAdmin.updateCustomerStatus('${c.id}', this.value)" class="text-xs font-semibold px-2 py-1 rounded-lg border border-gray-200 bg-white">
                            <option value="Pending" ${status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
                            <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>🔄 In Progress</option>
                            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>✅ Completed</option>
                            <option value="Cancelled" ${status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                        </select>
                    </td>
                    <td class="p-3 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                            ${mobile !== '—' ? `
                                <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg" title="WhatsApp Customer">
                                    <i class="fa-brands fa-whatsapp text-sm"></i>
                                </a>
                            ` : ''}
                            <button type="button" onclick="window.CycafeAdmin.deleteCustomerRecord('${c.id}')" class="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg" title="Delete Record">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ==========================================
    // 4. TRANSACTION LEDGER (ADMIN)
    // ==========================================
    function getAdminTransactions() {
        if (typeof window.getCycafeTransactions === 'function') {
            const list = window.getCycafeTransactions();
            if (list && list.length) return list;
        }
        try {
            return JSON.parse(localStorage.getItem(STORAGE_LOCAL_TXNS) || '[]');
        } catch (e) { return []; }
    }

    function saveAdminTransactions(list) {
        localStorage.setItem(STORAGE_LOCAL_TXNS, JSON.stringify(list));
    }

    function addAdminTransaction(txn) {
        let list = getAdminTransactions();
        txn.id = 'txn-' + Date.now();
        txn.createdAt = new Date().toISOString();
        list.unshift(txn);
        saveAdminTransactions(list);
        renderAdminTransactionsTable();
        renderAdminReports();
        showToast(`Transaction of ₹${txn.amount} recorded.`);
    }

    function deleteAdminTransaction(id) {
        if (!confirm('Are you sure you want to remove this transaction?')) return;
        let list = getAdminTransactions();
        list = list.filter(t => t.id !== id);
        saveAdminTransactions(list);
        renderAdminTransactionsTable();
        renderAdminReports();
        showToast('Transaction removed.');
    }

    function renderAdminTransactionsTable() {
        const tbody = document.getElementById('admin-transactions-table-body');
        const countChip = document.getElementById('admin-transactions-count');
        const filterSelect = document.getElementById('admin-transactions-filter');
        if (!tbody) return;

        let txns = getAdminTransactions();
        const filter = filterSelect?.value || 'all';

        if (filter === 'Income') txns = txns.filter(t => t.type === 'Income');
        else if (filter === 'Expense') txns = txns.filter(t => t.type === 'Expense');

        if (countChip) countChip.textContent = `${txns.length} Transactions`;

        if (!txns.length) {
            tbody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-xs text-gray-400">No transactions recorded yet.</td></tr>`;
            return;
        }

        tbody.innerHTML = txns.map((t, idx) => {
            const isIncome = t.type === 'Income';
            return `
                <tr class="hover:bg-gray-50 transition border-b border-gray-100 text-xs">
                    <td class="p-3 text-gray-400 font-mono text-[11px]">${idx + 1}</td>
                    <td class="p-3 font-bold text-gray-900">${esc(t.name || t.customer || 'Customer Transaction')}</td>
                    <td class="p-3 text-gray-600">${esc(t.category || 'Cyber Service')}</td>
                    <td class="p-3">
                        <span class="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                            ${(t.type || 'Income').toUpperCase()}
                        </span>
                    </td>
                    <td class="p-3 font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}">
                        ${isIncome ? '+' : '-'}₹${t.amount || 0}
                    </td>
                    <td class="p-3 text-gray-600 font-mono text-[11px]">${esc(t.method || 'Cash')}</td>
                    <td class="p-3 text-right">
                        <button type="button" onclick="window.CycafeAdmin.deleteAdminTransaction('${t.id}')" class="p-1 text-rose-500 hover:bg-rose-50 rounded" title="Delete Transaction">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ==========================================
    // 5. BUSINESS REPORTS & ANALYTICS
    // ==========================================
    function renderAdminReports() {
        const txns = getAdminTransactions();
        const customers = getAdminCustomers();

        let totalIncome = 0;
        let totalExpense = 0;

        txns.forEach(t => {
            const amt = Number(t.amount) || 0;
            if (t.type === 'Income') totalIncome += amt;
            else if (t.type === 'Expense') totalExpense += amt;
        });

        const netProfit = totalIncome - totalExpense;

        const incomeEl = document.getElementById('admin-report-income');
        const expenseEl = document.getElementById('admin-report-expense');
        const profitEl = document.getElementById('admin-report-profit');
        const custCountEl = document.getElementById('admin-report-customers');

        if (incomeEl) incomeEl.textContent = `₹${totalIncome.toLocaleString('en-IN')}`;
        if (expenseEl) expenseEl.textContent = `₹${totalExpense.toLocaleString('en-IN')}`;
        if (profitEl) profitEl.textContent = `₹${netProfit.toLocaleString('en-IN')}`;
        if (custCountEl) custCountEl.textContent = customers.length;
    }

    // ==========================================
    // 6. GOVT SCHEMES & JOB NOTICES ADMIN
    // ==========================================
    function renderAdminUpdates() {
        const container = document.getElementById('admin-updates-list');
        if (!container) return;

        const localNotices = JSON.parse(localStorage.getItem('cycafe_local_notices_v1') || '[]');
        if (!localNotices.length) {
            container.innerHTML = `
                <div class="p-6 text-center text-xs text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No custom announcements or notices posted yet. Use the buttons above to post new job alerts or welfare scheme news.
                </div>
            `;
            return;
        }

        container.innerHTML = localNotices.map(n => `
            <div class="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-200 shadow-2xs">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="text-xs font-bold text-gray-900">${esc(n.title)}</span>
                        <span class="text-[10px] font-bold px-2 py-0.2 rounded-full ${n.type === 'notice' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'}">
                            ${n.type === 'notice' ? 'Job Alert' : 'Govt Scheme'}
                        </span>
                    </div>
                    <p class="text-[11px] text-gray-500 line-clamp-1">${esc(n.desc || n.keyUpdate || '')}</p>
                </div>
                <button type="button" onclick="window.CycafeAdmin.deleteNotice('${n.id}')" class="px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition font-semibold">
                    <i class="fa-solid fa-trash-can"></i> Remove
                </button>
            </div>
        `).join('');
    }

    // Switch Admin Workspace
    function switchAdminWorkspace(ws) {
        currentAdminWorkspace = ws;
        document.querySelectorAll('.admin-workspace-pane').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.admin-ws-btn').forEach(btn => {
            btn.classList.remove('bg-violet-700', 'text-white', 'shadow-sm');
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-50');
        });

        const activePane = document.getElementById(`admin-pane-${ws}`);
        if (activePane) activePane.classList.remove('hidden');

        const activeBtn = document.getElementById(`admin-tab-btn-${ws}`);
        if (activeBtn) {
            activeBtn.classList.add('bg-violet-700', 'text-white', 'shadow-sm');
            activeBtn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-50');
        }

        refreshAdminWorkspace();
    }

    function refreshAdminWorkspace() {
        if (currentAdminWorkspace === 'services') renderAdminServicesTable();
        else if (currentAdminWorkspace === 'customers') renderAdminCustomersTable();
        else if (currentAdminWorkspace === 'transactions') renderAdminTransactionsTable();
        else if (currentAdminWorkspace === 'reports') renderAdminReports();
        else if (currentAdminWorkspace === 'updates') renderAdminUpdates();
    }

    // Expose Admin API to window
    window.CycafeAdmin = {
        verifyLogin: verifyAdminLogin,
        login: function(identifier, secret) {
            if (verifyAdminLogin(identifier, secret)) {
                setAdminLoggedIn(true);
                showToast('Welcome Akshay Santra! Admin Panel unlocked.');
                if (window.AppRouter) window.AppRouter.go('/admin');
                if (typeof window.closeAuthModal === 'function') window.closeAuthModal();
                return true;
            }
            return false;
        },
        logout: function() {
            setAdminLoggedIn(false);
            showToast('Admin logged out.');
            if (window.AppRouter) window.AppRouter.go('/dashboard');
        },
        isLoggedIn: () => isAdmin,
        switchWorkspace: switchAdminWorkspace,
        addService: addCustomService,
        deleteService: deleteService,
        updateCustomerStatus: updateCustomerStatus,
        deleteCustomerRecord: deleteCustomerRecord,
        addTransaction: addAdminTransaction,
        deleteAdminTransaction: deleteAdminTransaction,
        deleteNotice: function(id) {
            if (typeof window.deleteCustomNotice === 'function') {
                window.deleteCustomNotice(id);
                renderAdminUpdates();
            }
        },
        openAddServiceModal: function() {
            const m = document.getElementById('adminAddServiceModal');
            if (m) m.classList.remove('hidden');
        },
        closeAddServiceModal: function() {
            const m = document.getElementById('adminAddServiceModal');
            if (m) m.classList.add('hidden');
        },
        openAddTransactionModal: function(type = 'Income') {
            const m = document.getElementById('adminAddTransactionModal');
            const typeInput = document.getElementById('admin-txn-type');
            if (typeInput) typeInput.value = type;
            if (m) m.classList.remove('hidden');
        },
        closeAddTransactionModal: function() {
            const m = document.getElementById('adminAddTransactionModal');
            if (m) m.classList.add('hidden');
        }
    };

    window.submitAdminLoginForm = function() {
        const id = document.getElementById('admin-login-id')?.value?.trim();
        const secret = document.getElementById('admin-login-secret')?.value?.trim();
        const alertEl = document.getElementById('admin-login-alert');

        if (window.CycafeAdmin && window.CycafeAdmin.verifyLogin(id, secret)) {
            window.CycafeAdmin.login(id, secret);
            if (alertEl) alertEl.innerHTML = '';
            sessionStorage.setItem('cycafe_admin_logged_in', 'true');
            window.location.href = 'admin.html';
        } else {
            if (alertEl) {
                alertEl.innerHTML = '<div class="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-700 mb-3 flex items-center gap-2"><i class="fa-solid fa-triangle-exclamation"></i><span>Invalid Admin credentials! Use <b>admin</b> / <b>admin123</b></span></div>';
            }
        }
    };

    // DOM Ready Initialization
    document.addEventListener('DOMContentLoaded', () => {
        updateAdminUIVisibility();

        // Admin Services Search
        const sSearch = document.getElementById('admin-services-search');
        if (sSearch) {
            sSearch.addEventListener('input', () => renderAdminServicesTable());
        }

        // Admin Customers Search & Filter
        const cSearch = document.getElementById('admin-customers-search');
        const cFilter = document.getElementById('admin-customers-filter');
        if (cSearch) cSearch.addEventListener('input', () => renderAdminCustomersTable());
        if (cFilter) cFilter.addEventListener('change', () => renderAdminCustomersTable());

        // Admin Transactions Filter
        const tFilter = document.getElementById('admin-transactions-filter');
        if (tFilter) tFilter.addEventListener('change', () => renderAdminTransactionsTable());

        // Add Service Form
        const addServiceForm = document.getElementById('admin-add-service-form');
        if (addServiceForm) {
            addServiceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('admin-new-srv-name')?.value?.trim();
                const category = document.getElementById('admin-new-srv-category')?.value || 'govt';
                const url = document.getElementById('admin-new-srv-url')?.value?.trim();
                const badge = document.getElementById('admin-new-srv-badge')?.value?.trim() || 'Portal';
                const icon = document.getElementById('admin-new-srv-icon')?.value?.trim() || 'fa-solid fa-laptop-code';
                const desc = document.getElementById('admin-new-srv-desc')?.value?.trim() || '';

                if (!name || !url) {
                    alert('Please enter service name and URL.');
                    return;
                }

                addCustomService({
                    name: name,
                    category: category,
                    url: url,
                    badge: badge,
                    icon: icon,
                    color: 'violet',
                    desc: desc,
                    keywords: `${name} ${category} ${desc}`.toLowerCase()
                });

                addServiceForm.reset();
                window.CycafeAdmin.closeAddServiceModal();
            });
        }

        // Add Transaction Form
        const addTxnForm = document.getElementById('admin-add-txn-form');
        if (addTxnForm) {
            addTxnForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('admin-new-txn-name')?.value?.trim();
                const type = document.getElementById('admin-new-txn-type')?.value || 'Income';
                const amount = Number(document.getElementById('admin-new-txn-amount')?.value) || 0;
                const category = document.getElementById('admin-new-txn-category')?.value?.trim() || 'Service Fee';
                const method = document.getElementById('admin-new-txn-method')?.value || 'Cash';

                if (!name || !amount) {
                    alert('Please enter particulars and amount.');
                    return;
                }

                addAdminTransaction({
                    name: name,
                    type: type,
                    amount: amount,
                    category: category,
                    method: method
                });

                addTxnForm.reset();
                window.CycafeAdmin.closeAddTransactionModal();
            });
        }
    });

})();
