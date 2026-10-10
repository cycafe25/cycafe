// Govt Schemes & Job Notifications Engine for Cycafe CSC Dashboard
// Interactive notices, daily welfare scheme news, search, filters & customer application workflow

(function() {
    'use strict';

    // 1. Data Store: Job Notifications & Recruitment Notices
    const JOB_NOTICES = window.CYCAFE_BASE_NOTICES.filter(n=>n.type==='notice');
    const SCHEME_UPDATES = window.CYCAFE_BASE_NOTICES.filter(n=>n.type==='scheme');

    // State Variables
    let activeTab = 'notice'; // 'notice' | 'schemes'
    let currentCategoryFilter = 'all';
    let searchQuery = '';

    // Local Storage for custom notices posted by the CSC operator
    const LOCAL_NOTICES_KEY = 'cycafe_local_notices_v1';
    function getLocalNotices() {
        try {
            return JSON.parse(localStorage.getItem(LOCAL_NOTICES_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    async function saveLocalNotice(notice) {
        if (!window.CycafeContent.save) throw new Error('Firebase is still connecting.');
        return window.CycafeContent.save('notices', null, notice);
    }

    function deleteLocalNotice(id) {
        let list = getLocalNotices();
        list = list.filter(item => item.id !== id);
        localStorage.setItem(LOCAL_NOTICES_KEY, JSON.stringify(list));
        renderContent();
    }

    // Initialize UI on DOM Ready
    function init() {
        bindEvents();
        document.getElementById('updates-cards-grid')?.addEventListener('click', event=>{
            const button=event.target.closest('[data-apply-title]');
            if(button) window.openCustomerModalForService(button.dataset.applyTitle);
        });
        renderContent();
        setupBreakingNewsTicker();
    }

    function bindEvents() {
        // Tab switching
        const tabNoticeBtn = document.getElementById('updates-tab-notice');
        const tabSchemesBtn = document.getElementById('updates-tab-schemes');

        if (tabNoticeBtn && tabSchemesBtn) {
            tabNoticeBtn.addEventListener('click', () => switchTab('notice'));
            tabSchemesBtn.addEventListener('click', () => switchTab('schemes'));
        }

        // Search Input
        const searchInput = document.getElementById('updates-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = (e.target.value || '').trim().toLowerCase();
                renderContent();
            });
        }

        // Add Notice Form Submission
        const addNoticeForm = document.getElementById('add-custom-notice-form');
        if (addNoticeForm) {
            addNoticeForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const title = document.getElementById('custom-notice-title')?.value?.trim();
                const type = document.getElementById('custom-notice-type')?.value || 'notice';
                const desc = document.getElementById('custom-notice-desc')?.value?.trim();
                const deadline = document.getElementById('custom-notice-deadline')?.value?.trim() || 'Active Notice';

                if (!title || !desc) {
                    alert('Please enter a title and description for the notice.');
                    return;
                }

                const newNotice = {
                    id: 'custom-' + Date.now(),
                    isCustom: true,
                    title: title,
                    org: 'Akshay Santra Cycafe Notice Board',
                    authority: 'Cycafe CSC Announcement',
                    type: type, // 'notice' or 'schemes'
                    category: 'custom',
                    badge: 'CSC Notice',
                    badgeColor: 'rose',
                    vacancies: 'Local Notice',
                    benefit: 'Local Citizen Announcement',
                    qualification: 'Citizen Service',
                    targetAudience: 'Local Cycafe Visitors',
                    ageLimit: 'All Ages',
                    dates: {
                        start: 'Today',
                        last: deadline,
                        exam: 'N/A'
                    },
                    fee: 'CSC Assistance Available',
                    desc: desc,
                    keyUpdate: desc,
                    requiredDocs: 'Aadhaar Card, Mobile OTP, Relevant Certificates',
                    officialUrl: '',
                    isHot: true
                };

                try { await saveLocalNotice(newNotice); }
                catch(error) { alert('Not published: '+error.message); return; }
                addNoticeForm.reset();
                closeCustomNoticeModal();
                renderContent();
                showToastNotification('Notice published to Cycafe board successfully!');
            });
        }
    }

    function switchTab(tab) {
        activeTab = tab;
        currentCategoryFilter = 'all';
        const searchInput = document.getElementById('updates-search-input');
        if (searchInput) {
            searchInput.placeholder = tab === 'notice' 
                ? 'Search jobs, SSC, Police, Railway, 10th pass...' 
                : 'Search schemes, PM Kisan, Lakshmir Bhandar, Ration, SVMCM...';
        }

        // Style Tab Buttons
        const tabNoticeBtn = document.getElementById('updates-tab-notice');
        const tabSchemesBtn = document.getElementById('updates-tab-schemes');

        if (tab === 'notice') {
            tabNoticeBtn?.classList.add('bg-violet-600', 'text-white', 'shadow-md');
            tabNoticeBtn?.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            tabSchemesBtn?.classList.remove('bg-emerald-600', 'text-white', 'shadow-md');
            tabSchemesBtn?.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        } else {
            tabSchemesBtn?.classList.add('bg-emerald-600', 'text-white', 'shadow-md');
            tabSchemesBtn?.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
            tabNoticeBtn?.classList.remove('bg-violet-600', 'text-white', 'shadow-md');
            tabNoticeBtn?.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        }

        renderFilterPills();
        renderContent();
    }

    function renderFilterPills() {
        const pillsContainer = document.getElementById('updates-filter-pills');
        if (!pillsContainer) return;

        let filters = [];
        if (activeTab === 'notice') {
            filters = [
                { id: 'all', label: 'All Jobs (सभी भर्ती)', icon: 'fa-solid fa-list' },
                { id: 'central', label: 'Central Govt / SSC', icon: 'fa-solid fa-building-columns' },
                { id: 'railway', label: 'Indian Railways', icon: 'fa-solid fa-train' },
                { id: 'state', label: 'West Bengal State', icon: 'fa-solid fa-flag' },
                { id: 'defence', label: 'Police & Defence', icon: 'fa-solid fa-shield-halved' },
                { id: 'banking', label: 'Banking & Postal', icon: 'fa-solid fa-wallet' }
            ];
        } else {
            filters = [
                { id: 'all', label: 'All Schemes (सभी योजनाएं)', icon: 'fa-solid fa-list' },
                { id: 'farmer', label: 'Farmers (कृषक / PM Kisan)', icon: 'fa-solid fa-wheat-awn' },
                { id: 'women', label: 'Women & Child (लक्ष्मी भंडार)', icon: 'fa-solid fa-person-dress' },
                { id: 'health', label: 'Health & Ration (स्वास्थ्य)', icon: 'fa-solid fa-notes-medical' },
                { id: 'housing', label: 'Housing (Awas Yojana)', icon: 'fa-solid fa-house-chimney' },
                { id: 'scholarship', label: 'Scholarships (छात्रवृत्ति)', icon: 'fa-solid fa-graduation-cap' },
                { id: 'solar', label: 'PM Surya Ghar (Solar)', icon: 'fa-solid fa-solar-panel' }
            ];
        }

        pillsContainer.innerHTML = filters.map(f => {
            const isActive = currentCategoryFilter === f.id;
            const activeClass = activeTab === 'notice'
                ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                : 'bg-emerald-600 text-white border-emerald-600 shadow-sm';
            const inactiveClass = 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';

            return `
                <button type="button" 
                    data-filter-id="${f.id}" 
                    class="filter-pill-btn text-xs font-semibold px-3 py-1.5 rounded-full border transition flex items-center gap-1.5 shrink-0 ${isActive ? activeClass : inactiveClass}">
                    <i class="${f.icon}"></i> ${f.label}
                </button>
            `;
        }).join('');

        // Attach click listeners to filter pills
        pillsContainer.querySelectorAll('.filter-pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCategoryFilter = btn.dataset.filterId;
                renderFilterPills();
                renderContent();
            });
        });
    }

    function renderContent() {
        const container = document.getElementById('updates-cards-grid');
        const emptyState = document.getElementById('updates-empty-state');
        const countChip = document.getElementById('updates-count-chip');
        if (!container) return;

        let items = window.CycafeContent.list('notices').filter(n=>n.type === (activeTab==='notice'?'notice':'scheme'));

        // Apply Category Filter
        if (currentCategoryFilter !== 'all') {
            items = items.filter(item => {
                if (item.isCustom) return true; // always show custom local notices
                if (activeTab === 'notice') {
                    if (currentCategoryFilter === 'banking') {
                        return item.category === 'banking' || item.category === 'postal';
                    }
                    if (currentCategoryFilter === 'defence') {
                        return item.category === 'defence' || item.id.includes('wbp');
                    }
                    return item.category === currentCategoryFilter;
                } else {
                    return item.category === currentCategoryFilter;
                }
            });
        }

        // Apply Search Filter
        if (searchQuery) {
            items = items.filter(item => {
                const combined = [
                    item.title,
                    item.org, item.authority, textValue(item.authorities),
                    item.badge, item.desc, item.keyUpdate,
                    item.qualification, item.benefit, item.targetAudience,
                    item.requiredDocs || '',
                    item.vacancies || '', item.ageLimit, item.ageMin, item.ageMax
                ].join(' ').toLowerCase();
                return combined.includes(searchQuery);
            });
        }

        if (countChip) {
            countChip.textContent = `${items.length} ${activeTab === 'notice' ? 'Notices' : 'Schemes'}`;
        }

        if (items.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        if (activeTab === 'notice') {
            container.innerHTML = items.map(renderJobCard).join('');
        } else {
            container.innerHTML = items.map(renderSchemeCard).join('');
        }
    }

    function renderJobCard(job) {
        const badgeColors = {
            emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            blue: 'bg-blue-100 text-blue-800 border-blue-200',
            purple: 'bg-purple-100 text-purple-800 border-purple-200',
            amber: 'bg-amber-100 text-amber-800 border-amber-200',
            rose: 'bg-rose-100 text-rose-800 border-rose-200',
            teal: 'bg-teal-100 text-teal-800 border-teal-200',
            indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
        };
        const badgeClass = badgeColors[job.badgeColor] || badgeColors.blue;
        const department = textValue(job.org || job.authority) || 'Department not specified';
        const eligibility = textValue(job.qualification) || 'See official notice';
        const vacancies = textValue(job.vacancies) || 'See official notice';
        const deadline = formatDate(job.dates?.last || job.lastDate) || 'See official notice';
        const ageLimit = formatAgeLimit(job) || 'See official notice';
        const officialUrl = window.CycafeContent.safeUrl(job.officialUrl || job.link);
        const extraDates = [
            detailRow('Application opens', formatDate(job.dates?.start)),
            detailRow('Exam / test date', formatDate(job.dates?.exam)),
            detailRow('Application fee', textValue(job.fee))
        ].join('');

        const whatsappText = encodeURIComponent(
            `*Cycafe Job Alert: ${job.title}*\n` +
            `🏢 Department: ${department}\n` +
            `📌 Stage: ${textValue(job.badge) || 'Update'}\n` +
            `🎯 Vacancies: ${vacancies}\n` +
            `🎓 Qualification: ${eligibility}\n` +
            `📅 Last Date: ${deadline}\n\n` +
            `Visit *Akshay Santra Common Services Centre (Cycafe)* to apply online today with photo & signature scanning!`
        );

        return `
            <div class="relative flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md hover:border-violet-300 transition duration-200 group">
                ${job.isHot ? '<div class="absolute -top-2.5 -right-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1"><i class="fa-solid fa-fire text-amber-200"></i> Hot Notice</div>' : ''}
                
                <div>
                    <!-- Top Authority & Badge -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <span class="inline-flex items-start gap-1 text-[11px] font-semibold text-gray-500 min-w-0 break-words">
                            <i class="fa-solid fa-building text-violet-600 mt-0.5 shrink-0"></i> ${escapeHtml(department)}
                        </span>
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 max-w-[48%] ${badgeClass}" title="Current stage">
                            <i class="fa-solid fa-circle text-[6px] shrink-0"></i> ${escapeHtml(job.badge || 'Update')}
                        </span>
                    </div>

                    <!-- Job Title -->
                    <h4 class="text-base font-bold text-gray-900 group-hover:text-violet-700 transition leading-snug mb-2">
                        ${escapeHtml(job.title)}
                    </h4>

                    <!-- Key Details Grid -->
                    <div class="grid grid-cols-2 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-xs mb-3">
                        <div>
                            <span class="block text-[10px] font-bold uppercase text-slate-400">Total Posts</span>
                            <span class="font-bold text-slate-800 flex items-center gap-1">
                                <i class="fa-solid fa-user-group text-violet-500 text-[11px]"></i> ${escapeHtml(vacancies)}
                            </span>
                        </div>
                        <div>
                            <span class="block text-[10px] font-bold uppercase text-slate-400">Eligibility</span>
                            <span class="font-semibold text-slate-800 flex items-start gap-1 break-words" title="${escapeHtml(eligibility)}">
                                <i class="fa-solid fa-graduation-cap text-indigo-500 text-[11px] mt-0.5 shrink-0"></i> ${escapeHtml(eligibility)}
                            </span>
                        </div>
                        <div>
                            <span class="block text-[10px] font-bold uppercase text-slate-400">Age Limit</span>
                            <span class="text-slate-700 text-[11px]">${escapeHtml(ageLimit)}</span>
                            ${job.ageAsOf ? `<span class="block text-[10px] text-slate-500 mt-1">As of ${escapeHtml(formatDate(job.ageAsOf))}</span>` : ''}
                            ${job.ageRelaxation ? `<span class="block text-[10px] text-slate-500 mt-1">${escapeHtml(job.ageRelaxation)}</span>` : ''}
                        </div>
                        <div>
                            <span class="block text-[10px] font-bold uppercase text-slate-400">Last Date</span>
                            <span class="font-bold text-rose-600 flex items-center gap-1 text-[11px]">
                                <i class="fa-solid fa-clock text-[10px]"></i> ${escapeHtml(deadline)}
                            </span>
                        </div>
                    </div>

                    ${extraDates ? `<dl class="space-y-1 text-[11px] text-slate-600 mb-3">${extraDates}</dl>` : ''}

                    <!-- Description -->
                    <p class="text-xs text-gray-600 leading-relaxed mb-4 whitespace-pre-line break-words">
                        ${escapeHtml(job.desc || job.keyUpdate)}
                    </p>
                </div>

                <!-- Footer Action Buttons -->
                <div class="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    <button type="button" 
                        data-apply-title="${escapeHtml(job.title)}"
                        class="flex-1 min-w-[120px] px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
                        <i class="fa-solid fa-user-plus"></i> Apply at Cycafe
                    </button>
                    ${officialUrl ? `
                        <a href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer"
                            class="px-2.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                            title="Official Website / Portal">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    ` : ''}
                    <a href="https://api.whatsapp.com/send?text=${whatsappText}" target="_blank" rel="noopener noreferrer"
                        class="px-2.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-emerald-200"
                        title="Share on WhatsApp to Customer">
                        <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> Share
                    </a>
                    ${job.isCustom ? `
                        <button type="button" onclick="window.deleteCustomNotice('${job.id}')" class="px-2 py-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs" title="Delete Announcement">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    function renderSchemeCard(scheme) {
        const badgeColors = {
            emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            blue: 'bg-blue-100 text-blue-800 border-blue-200',
            purple: 'bg-purple-100 text-purple-800 border-purple-200',
            amber: 'bg-amber-100 text-amber-800 border-amber-200',
            rose: 'bg-rose-100 text-rose-800 border-rose-200',
            teal: 'bg-teal-100 text-teal-800 border-teal-200',
            indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            slate: 'bg-slate-100 text-slate-800 border-slate-200'
        };
        const badgeClass = badgeColors[scheme.badgeColor] || badgeColors.emerald;
        const authority = authorityNames(scheme) || 'Authority not specified';
        const benefit = textValue(scheme.benefit) || 'See official scheme details';
        const beneficiaries = textValue(scheme.targetAudience) || 'See official eligibility';
        const documents = textValue(scheme.requiredDocs) || 'See official scheme details';
        const update = textValue(scheme.keyUpdate || scheme.desc);
        const description = textValue(scheme.desc);
        const officialUrl = window.CycafeContent.safeUrl(scheme.officialUrl || scheme.link);
        const schemeDates = [
            detailRow('Effective / opens', formatDate(scheme.dates?.effective || scheme.dates?.start)),
            detailRow('Last date / deadline', formatDate(scheme.dates?.deadline || scheme.lastDate))
        ].join('');

        const whatsappText = encodeURIComponent(
            `*Cycafe Govt Scheme Alert: ${scheme.title}*\n` +
            `🏛️ Authority: ${authority}\n` +
            `📌 Stage: ${textValue(scheme.badge) || 'Update'}\n` +
            `💰 Benefit: ${benefit}\n` +
            `👥 For: ${beneficiaries}\n` +
            `📋 Documents: ${documents}\n\n` +
            `Check your status, apply or complete e-KYC at *Akshay Santra Common Services Centre (Cycafe)*!`
        );

        return `
            <div class="relative flex flex-col justify-between bg-white rounded-2xl border border-gray-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition duration-200 group">
                ${scheme.isHot ? '<div class="absolute -top-2.5 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1"><i class="fa-solid fa-star text-amber-200"></i> High Priority</div>' : ''}
                
                <div>
                    <!-- Top Authority & Badge -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                        <span class="inline-flex items-start gap-1 text-[11px] font-semibold text-gray-500 min-w-0 break-words" title="${escapeHtml(authority)}">
                            <i class="fa-solid fa-landmark text-emerald-600 mt-0.5 shrink-0"></i> ${escapeHtml(authority)}
                        </span>
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 max-w-[48%] ${badgeClass}" title="Current stage">
                            <i class="fa-solid fa-check text-[7px] shrink-0"></i> ${escapeHtml(scheme.badge || 'Update')}
                        </span>
                    </div>

                    <!-- Scheme Title -->
                    <h4 class="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition leading-snug mb-2">
                        ${escapeHtml(scheme.title)}
                    </h4>

                    <!-- Benefit Highlight Box -->
                    <div class="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100/90 text-xs mb-3">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0">
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                            </span>
                            <div>
                                <span class="block text-[10px] font-bold uppercase text-emerald-800">Financial Assistance / Benefit</span>
                                <span class="font-extrabold text-emerald-950 text-xs whitespace-pre-line break-words">${escapeHtml(benefit)}</span>
                            </div>
                        </div>
                        <p class="text-[11px] text-emerald-800/90 mt-1 pl-8">
                            <strong>Beneficiary:</strong> ${escapeHtml(beneficiaries)}
                        </p>
                    </div>

                    <!-- Latest News & Update -->
                    <div class="text-xs text-gray-700 leading-relaxed mb-3">
                        <p class="font-semibold text-gray-900 mb-1 flex items-center gap-1">
                            <i class="fa-solid fa-newspaper text-emerald-600 text-[11px]"></i> Latest Update:
                        </p>
                        <p class="text-gray-600 text-[11.5px] whitespace-pre-line break-words">${escapeHtml(update)}</p>
                    </div>
                    ${description && description !== update ? `<p class="text-xs text-gray-600 leading-relaxed mb-3 whitespace-pre-line break-words">${escapeHtml(description)}</p>` : ''}
                    ${schemeDates ? `<dl class="space-y-1 text-[11px] text-slate-600 mb-3">${schemeDates}</dl>` : ''}

                    <!-- Required Documents Pill -->
                    <div class="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">
                        <strong class="text-slate-700 block mb-0.5"><i class="fa-solid fa-file-invoice text-slate-400"></i> Mandatory Documents:</strong>
                        <span class="whitespace-pre-line break-words">${escapeHtml(documents)}</span>
                    </div>
                </div>

                <!-- Footer Action Buttons -->
                <div class="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    <button type="button" 
                        data-apply-title="${escapeHtml(scheme.title)}"
                        class="flex-1 min-w-[120px] px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs">
                        <i class="fa-solid fa-hand-holding-hand"></i> Apply / Status Check
                    </button>
                    ${officialUrl ? `
                        <a href="${escapeHtml(officialUrl)}" target="_blank" rel="noopener noreferrer"
                            class="px-2.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                            title="Official Portal Link">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    ` : ''}
                    <a href="https://api.whatsapp.com/send?text=${whatsappText}" target="_blank" rel="noopener noreferrer"
                        class="px-2.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition flex items-center gap-1 border border-emerald-200"
                        title="Share on WhatsApp to Customer">
                        <i class="fa-brands fa-whatsapp text-emerald-600 text-sm"></i> Share
                    </a>
                    ${scheme.isCustom ? `
                        <button type="button" onclick="window.deleteCustomNotice('${scheme.id}')" class="px-2 py-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs" title="Delete Announcement">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    function setupBreakingNewsTicker() {
        const ticker = document.getElementById('updates-ticker-content');
        if (!ticker) return;

        let index = 0;
        const update=()=>{
            const notices=window.CycafeContent.list('notices');
            ticker.textContent=notices.length?notices[index++ % notices.length].title:'No current announcements.';
        };
        update();setInterval(update,5000);
        window.CycafeContent.subscribe(kind=>{if(kind==='notices')update();});
    }

    function showToastNotification(msg) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl border border-gray-700 text-xs font-semibold flex items-center gap-2 animate-bounce';
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> ${escapeHtml(msg)}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    function textValue(value) {
        if (Array.isArray(value)) return value.map(textValue).filter(Boolean).join(', ');
        return value === undefined || value === null ? '' : String(value).trim();
    }

    function authorityNames(item) {
        const names = Array.isArray(item.authorities) ? item.authorities.map(textValue).filter(Boolean) : [];
        return names.length ? [...new Set(names)].join(' • ') : textValue(item.authority || item.org);
    }

    function formatDate(value) {
        const raw = textValue(value);
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
        if (!match) return raw;
        const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
        if (date.getUTCFullYear() !== Number(match[1]) || date.getUTCMonth() !== Number(match[2]) - 1 || date.getUTCDate() !== Number(match[3])) return raw;
        return `${match[3]} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][date.getUTCMonth()]} ${match[1]}`;
    }

    function formatAgeLimit(job) {
        const validAge = value => textValue(value) !== '' && Number.isFinite(Number(value)) && Number(value) >= 0;
        const hasMin = validAge(job.ageMin), hasMax = validAge(job.ageMax);
        if (hasMin && hasMax) return `${job.ageMin} – ${job.ageMax} years`;
        if (hasMin) return `${job.ageMin}+ years`;
        if (hasMax) return `Up to ${job.ageMax} years`;
        return textValue(job.ageLimit);
    }

    function detailRow(label, value) {
        return value ? `<div class="flex flex-wrap gap-x-1"><dt class="font-semibold">${escapeHtml(label)}:</dt><dd class="break-words whitespace-pre-line">${escapeHtml(value)}</dd></div>` : '';
    }

    function escapeHtml(text) {
        return textValue(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Modal Control Helpers for Custom Notice
    window.openCustomNoticeModal = function() {
        const modal = document.getElementById('customNoticeModal');
        if (modal) modal.classList.remove('hidden');
    };

    window.closeCustomNoticeModal = function() {
        const modal = document.getElementById('customNoticeModal');
        if (modal) modal.classList.add('hidden');
    };

    window.deleteCustomNotice = deleteLocalNotice;

    window.CycafeContent.subscribe(kind=>{ if(kind==='notices') renderContent(); });

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
