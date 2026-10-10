// Admin and public pages share CycafeContent and the same Firestore collections.
(function(){
    const store=window.CycafeContent;
    const value=id=>document.getElementById(id).value.trim();
    const set=(id,v)=>{document.getElementById(id).value=v??'';};
    // Ministry names checked against https://igod.gov.in/ug/categories (2026-10-02).
    // State departments and other institutes can always be entered manually.
    const ministries=['AYUSH','Agriculture and Farmers Welfare','Chemicals and Fertilizers','Civil Aviation','Coal','Commerce and Industry','Communications','Consumer Affairs, Food and Public Distribution','Cooperation','Corporate Affairs','Culture','Defence','Development of North Eastern Region','Earth Sciences','Education','Electronics and Information Technology','Environment, Forest and Climate Change','External Affairs','Finance','Fisheries, Animal Husbandry and Dairying','Food Processing Industries','Health and Family Welfare','Heavy Industries','Home Affairs','Housing and Urban Affairs','Information and Broadcasting','Jal Shakti','Labour and Employment','Law and Justice','Micro, Small and Medium Enterprises','Mines','Minority Affairs','New and Renewable Energy','Panchayati Raj','Parliamentary Affairs','Personnel, Public Grievances and Pensions','Petroleum and Natural Gas','Planning','Ports, Shipping and Waterways','Power','Railways','Road Transport and Highways','Rural Development','Science and Technology','Skill Development and Entrepreneurship','Social Justice and Empowerment','Statistics and Programme Implementation','Steel','Textiles','Tourism','Tribal Affairs','Women and Child Development','Youth Affairs and Sports'].map(n=>'Ministry of '+n);
    const states=['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'];
    const agencies=['Staff Selection Commission (SSC)','Union Public Service Commission (UPSC)','Railway Recruitment Boards (RRB)','Institute of Banking Personnel Selection (IBPS)','State Bank of India (SBI)','National Testing Agency (NTA)','West Bengal Public Service Commission (WBPSC)','West Bengal Police Recruitment Board (WBPRB)','India Post','Indian Army','Indian Navy','Indian Air Force','Supreme Court of India','Rajya Sabha','Lok Sabha','eCourts','Unique Identification Authority of India (UIDAI)','Election Commission of India','National Health Authority'];
    const jobStages=['Registration Open','Applying Now','Application Closed','Correction Window Open','Exam Dates Announced','Exam Schedule Released','Admit Card Released','Preliminary Exam (PT) Scheduled','Main Exam Scheduled','PET / PMT Scheduled','PEMT Scheduled','TRO Notice','Answer Key Released','Result Declared','Merit List Released','Document Verification','Interview Scheduled','Final Selection List','Recruitment Completed','Update'];
    const schemeStages=['Applications Open','Active','e-KYC Mandatory','Active Monthly DBT','Farm Registration Open','Beneficiary Registration Open','Verification in Progress','Installment Released','Beneficiary List Released','Renewal Open','Documents Required','Application Closed','Update'];
    const qualifications=['10th (Matriculation) Pass','12th (Higher Secondary) Pass','ITI','Diploma','Graduate','Postgraduate','Engineering Degree','Professional Qualification','As per official notice'];
    const noticeFields={category:'Category',badge:'Current stage / status',org:'Publishing institute / department',authority:'Primary ministry / authority',vacancies:'Total posts / vacancies',qualification:'Eligibility criteria / qualification',ageLimit:'Age limit display / additional conditions',fee:'Application fee',benefit:'Financial assistance / benefit',targetAudience:'Beneficiaries / eligibility',requiredDocs:'Mandatory documents',badgeColor:'Status badge colour'};
    const groups={};
    const root=document.getElementById('notice-editor-fields');
    function field(parent,id,label,type='text',choices=[]){
        const group=document.createElement('div');group.className='fg';groups[id]=group;
        const l=document.createElement('label');l.className='fl';l.htmlFor=id;l.textContent=label;
        const input=document.createElement(type==='textarea'?'textarea':'input');input.id=id;input.className=type==='textarea'?'fta':'fi';if(type!=='textarea')input.type=type;
        group.append(l,input);parent.append(group);
        if(choices.length) preset(id,choices);return input;
    }
    function preset(id,choices){
        let select=document.getElementById(id.replace('n-extra-','n-preset-'));
        if(!select){select=document.createElement('select');select.id=id.replace('n-extra-','n-preset-');select.className='fs';select.style.marginBottom='6px';select.setAttribute('aria-label','Choose '+noticeFields[id.replace('n-extra-','')]);document.getElementById(id).before(select);select.addEventListener('change',()=>{if(select.value!=='')set(id,select.value);});}
        select.replaceChildren(new Option('Choose an option, or type below',''),...choices.map(v=>new Option(v,v)));
    }
    function section(title){const box=document.createElement('section');box.className='editor-section';const h=document.createElement('h4');h.textContent=title;box.append(h);root.append(box);return box;}
    const common=section('Publishing details');
    field(common,'n-extra-org',noticeFields.org,'text',agencies);
    field(common,'n-extra-category',noticeFields.category,'text',['central','railway','state','defence','banking']);
    field(common,'n-extra-badge',noticeFields.badge,'text',jobStages);
    field(common,'n-extra-badgeColor',noticeFields.badgeColor,'text',['emerald','blue','amber','purple','rose','teal','indigo']);
    const job=section('Job eligibility and schedule');
    field(job,'n-extra-vacancies',noticeFields.vacancies).placeholder='e.g. 39481 Posts / To be announced';
    field(job,'n-extra-qualification',noticeFields.qualification,'textarea',qualifications);
    const ages=document.createElement('div');ages.className='fg2';job.append(ages);
    for(const [id,label] of [['n-age-min','Minimum age (years)'],['n-age-max','Maximum age (years)']]){const input=field(ages,id,label,'number');input.min='0';input.max='120';input.step='0.5';}
    field(job,'n-age-asof','Age calculated as on','date');
    field(job,'n-age-relaxation','Age relaxation / category conditions','textarea');
    field(job,'n-extra-ageLimit',noticeFields.ageLimit).placeholder='Keep legacy text, or set the numeric range above';
    field(job,'n-extra-fee',noticeFields.fee);
    field(job,'n-job-start','Application start date / schedule').placeholder='e.g. 05 Sep 2026 / To be announced';
    field(job,'n-job-exam','Exam date / schedule').placeholder='e.g. Jan - Feb 2027';
    const scheme=section('Scheme authority, benefits and latest update');
    field(scheme,'n-extra-authority',noticeFields.authority,'text',ministries);
    const picker=document.createElement('details');picker.id='n-authority-picker';picker.className='authority-picker';
    const summary=document.createElement('summary');summary.textContent='Choose ministries / institutes (multiple)';picker.append(summary);
    const search=document.createElement('input');search.className='fi';search.placeholder='Search ministry, institute or state';search.setAttribute('aria-label','Search authorities');picker.append(search);
    const authorities=document.createElement('div');authorities.id='n-authorities';authorities.className='authority-options';picker.append(authorities);scheme.append(picker);
    function authorityOption(name){if([...authorities.querySelectorAll('input')].some(i=>i.value===name))return;const label=document.createElement('label');const check=document.createElement('input');check.type='checkbox';check.value=name;const text=document.createElement('span');text.textContent=name;label.append(check,text);authorities.append(label);}
    function refreshAuthorityChoices(){const names=[...ministries,...agencies,...states.map(s=>'Government of '+s),...store.list('notices').flatMap(n=>[n.authority,n.org,...(Array.isArray(n.authorities)?n.authorities:[])])];names.filter(Boolean).forEach(authorityOption);}
    refreshAuthorityChoices();
    function authorityCount(){summary.textContent='Choose ministries / institutes ('+authorities.querySelectorAll('input:checked').length+' selected)';}
    authorities.addEventListener('change',authorityCount);
    search.addEventListener('input',()=>{const query=search.value.toLowerCase();[...authorities.children].forEach(l=>l.hidden=!l.textContent.toLowerCase().includes(query));});
    field(scheme,'n-other-authorities','Other ministries / departments (one per line)','textarea');
    field(scheme,'n-extra-benefit',noticeFields.benefit,'textarea').placeholder='e.g. ₹2,000 DBT per installment / ₹6,000 per year';
    field(scheme,'n-extra-targetAudience',noticeFields.targetAudience,'textarea',['Small and Marginal Farmers','Women','Students','Small Merchants','Senior Citizens','Persons with Disabilities','As per scheme eligibility']);
    field(scheme,'n-extra-requiredDocs',noticeFields.requiredDocs,'textarea',['Aadhaar Card, Bank Passbook, Mobile Number','Aadhaar Card, Land Record, Bank Passbook','Aadhaar Card, Income Certificate, Education Certificates']);
    field(scheme,'n-key-update','Latest update','textarea');
    field(scheme,'n-effective','Effective date / payment schedule').placeholder='e.g. Monthly / Next installment / 01 Nov 2026';
    document.getElementById('n-last-date').addEventListener('input',()=>set('n-date',value('n-last-date')));
    document.getElementById('n-last-date').addEventListener('change',()=>set('n-date',value('n-last-date')));
    document.getElementById('n-date').addEventListener('input',()=>set('n-last-date',dateInput(value('n-date'))));
    function dateInput(date){if(/^\d{4}-\d{2}-\d{2}$/.test(date||''))return date;if(/^\d{1,2} [A-Za-z]{3} \d{4}$/.test(date||'')){const d=new Date(date+' 00:00:00 UTC');if(!isNaN(d))return d.toISOString().slice(0,10);}return '';}
    function ageDisplay(){const min=value('n-age-min'),max=value('n-age-max'),relax=value('n-age-relaxation');if(min!==''||max!=='')set('n-extra-ageLimit',(min!==''&&max!==''?min+' - '+max:min!==''?min+' and above':'Up to '+max)+' Years'+(relax?' ('+relax+')':''));}
    ['n-age-min','n-age-max','n-age-relaxation'].forEach(id=>document.getElementById(id).addEventListener('input',ageDisplay));
    const svcPreset=document.getElementById('s-authority-preset');
    svcPreset.replaceChildren(new Option('Choose an institute, or type below',''),...[...new Set([...agencies,...ministries,...store.base.services.map(s=>s.name)])].map(v=>new Option(v,v)));
    svcPreset.addEventListener('change',()=>{if(svcPreset.value)set('s-authority',svcPreset.value);});
    const jurisdiction=document.getElementById('s-jurisdiction');jurisdiction.replaceChildren(...['','Central Government / India',...states,'Private / CSC / Other'].map(v=>new Option(v||'Not specified',v)));
    const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    function option(id,v){
        const select=document.getElementById(id);
        if(![...select.options].some(o=>o.value===v))select.add(new Option(v,v));
        select.value=v;
    }
    function actions(kind,id){
        const box=document.createElement('div');box.style.cssText='display:flex;gap:6px';
        for(const [label,fn] of [['Edit',()=>kind==='services'?editSvc(id):editNotice(id)],['Delete',async()=>{
            if(!confirm('Remove this item from the website?'))return;
            try{await store.remove(kind,id);toast('Removed from website.');}catch(e){toast(e.message,true);}
        }]]){
            const b=document.createElement('button');b.type='button';b.className='btn '+(label==='Delete'?'btn-danger':'btn-outline');b.textContent=label;b.onclick=fn;box.append(b);
        }
        return box;
    }
    function status(kind,container){
        if(store.status[kind]==='error'){
            const p=document.createElement('p');p.style.color='#dc2626';
            p.textContent='Cloud sync failed. Showing built-in/last received items. Publish Firestore rules and check your connection before editing.';
            container.prepend(p);
        }
    }
    window.renderServices=function(){
        const query=(document.getElementById('srv-srch').value||'').toLowerCase();
        const list=store.list('services').filter(s=>(s.name+' '+s.category).toLowerCase().includes(query));
        fbData.services=store.list('services');
        document.getElementById('srv-chip').textContent=list.length+' services';
        const tb=document.getElementById('srv-tbody');tb.replaceChildren();
        if(store.status.services==='error'){
            const tr=tb.insertRow();const td=tr.insertCell();td.colSpan=6;td.textContent='Cloud sync failed. Check Firebase rules/connection.';td.style.color='#dc2626';
        }
        for(const [i,s] of list.entries()){
            const tr=tb.insertRow();
            [String(i+1),s.name,s.category,s.url,s.badge].forEach(text=>{tr.insertCell().textContent=text||'';});
            tr.insertCell().append(actions('services',s.id));
        }
    };
    window.openServiceEditor=function(id){
        document.getElementById('srv-form').reset();set('s-edit-id',id||'');
        const s=store.list('services').find(n=>n.id===id);
        if(s){for(const [key,field] of Object.entries({name:'s-name',url:'s-url',desc:'s-desc',badge:'s-badge',icon:'s-icon',authority:'s-authority'}))set(field,s[key]);option('s-cat',s.category||'other');option('s-jurisdiction',s.jurisdiction||'');}
        document.querySelector('#add-srv-modal .modal-title').textContent=s?'Edit Service':'Add Service';
        document.querySelector('#srv-form [type=submit]').textContent='Save to website';
        openModal('add-srv-modal');
        document.querySelector('#add-srv-modal .modal-box').scrollTop=0;
    };
    window.editSvc=id=>openServiceEditor(id);
    async function commit(event,kind,id,fields,modal){
        event.preventDefault();
        const btn=event.target.querySelector('[type=submit]');btn.disabled=true;
        try{
            if(!store.save)throw new Error('Firebase is still connecting.');
            await store.save(kind,id,fields);
            closeModal(modal);toast('Saved to Firebase. Website updates automatically.');
        }catch(e){toast(e.message,true);}finally{btn.disabled=false;}
    }
    window.saveSvc=function(event){
        event.preventDefault();
        const url=store.safeUrl(value('s-url'));
        if(!url){toast('Enter a valid HTTP/HTTPS URL.',true);return;}
        return commit(event,'services',value('s-edit-id'),{name:value('s-name'),url,desc:value('s-desc'),category:value('s-cat'),badge:value('s-badge'),icon:value('s-icon'),authority:value('s-authority'),jurisdiction:value('s-jurisdiction'),deleted:false},'add-srv-modal');
    };
    window.openNoticeModal=function(type,id){
        document.getElementById('notice-form').reset();set('n-edit-id',id||'');
        const n=store.list('notices').find(n=>n.id===id);
        const isJob=type==='notice';
        job.hidden=!isJob;scheme.hidden=isJob;groups['n-extra-org'].hidden=!isJob;
        document.getElementById('n-title-label').textContent=isJob?'Post / recruitment notice heading *':'Scheme / installment / notice heading *';
        preset('n-extra-badge',isJob?jobStages:schemeStages);
        preset('n-extra-category',isJob?['central','railway','state','defence','banking']:['farmer','women','health','housing','scholarship','solar','business','welfare','other']);
        refreshAuthorityChoices();search.value='';[...authorities.children].forEach(l=>l.hidden=false);picker.open=false;
        root.querySelectorAll('input,textarea,select').forEach(input=>{input.disabled=Boolean(input.closest('[hidden]'));});
        authorities.querySelectorAll('input').forEach(input=>{input.checked=false;});
        set('notice-type',type==='notice'?'notice':'scheme');
        document.getElementById('notice-mtitle').textContent=(id?'Edit ':'Add ')+(type==='notice'?'Job Notice':'Government Scheme');
        if(n){
            Object.keys(noticeFields).forEach(key=>set('n-extra-'+key,n[key]));
            set('n-title',n.title);set('n-desc',n.desc||n.keyUpdate);set('n-link',n.officialUrl||n.link);
            set('n-date',n.lastDate||(n.type==='notice'?n.dates?.last:n.dates?.deadline));
            set('n-last-date',dateInput(value('n-date')));
            set('n-age-min',n.ageMin);set('n-age-max',n.ageMax);set('n-age-asof',n.ageAsOf);set('n-age-relaxation',n.ageRelaxation);
            set('n-job-start',n.dates?.start);set('n-job-exam',n.dates?.exam);
            set('n-key-update',n.keyUpdate||n.desc);set('n-effective',n.dates?.effective);
            const selected=Array.isArray(n.authorities)?n.authorities:[];
            authorities.querySelectorAll('input').forEach(input=>{input.checked=selected.includes(input.value);});
        }else{
            set('n-extra-category',isJob?'central':'other');set('n-extra-badge',isJob?'Applying Now':'Applications Open');set('n-extra-badgeColor','emerald');
        }
        authorityCount();
        openModal('add-notice-modal');
        document.querySelector('#add-notice-modal .modal-box').scrollTop=0;
    };
    window.editNotice=id=>{const n=store.list('notices').find(n=>n.id===id);if(n)openNoticeModal(n.type,id);};
    window.saveNotice=function(event){
        event.preventDefault();
        const link=value('n-link'),url=store.safeUrl(link);
        if(link&&!url){toast('Enter a valid HTTP/HTTPS URL.',true);return;}
        const id=value('n-edit-id'),type=value('notice-type'),lastDate=value('n-date')||value('n-last-date');
        const previous=store.list('notices').find(n=>n.id===id);
        const dates={...(previous?.dates||{})};
        dates[type==='notice'?'last':'deadline']=lastDate;
        const commonKeys=['category','badge','badgeColor'];
        const relevant=type==='notice'?['org','vacancies','qualification','ageLimit','fee']:['authority','benefit','targetAudience','requiredDocs'];
        const details=Object.fromEntries([...commonKeys,...relevant].map(key=>[key,value('n-extra-'+key)]));
        if(type==='notice'){
            const min=value('n-age-min'),max=value('n-age-max');
            if([min,max].some(v=>v!==''&&(!Number.isFinite(Number(v))||Number(v)<0||Number(v)>120))||min!==''&&max!==''&&Number(min)>Number(max)){toast('Enter a valid age range (minimum must not exceed maximum).',true);return;}
            Object.assign(details,{ageMin:min===''?null:Number(min),ageMax:max===''?null:Number(max),ageAsOf:value('n-age-asof'),ageRelaxation:value('n-age-relaxation')});
            dates.start=value('n-job-start');dates.exam=value('n-job-exam');
        }else{
            const selected=[...authorities.querySelectorAll('input:checked')].map(input=>input.value);
            const typed=value('n-other-authorities').split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
            details.authorities=[...new Set([value('n-extra-authority'),...selected,...typed].filter(Boolean))];
            details.authority=value('n-extra-authority')||details.authorities[0]||'';
            details.keyUpdate=value('n-key-update')||value('n-desc');
            dates.effective=value('n-effective');
        }
        return commit(event,'notices',id,{...details,title:value('n-title'),desc:value('n-desc'),type,link:url,officialUrl:url,lastDate,dates,deleted:false},'add-notice-modal');
    };
    function renderNotices(type,target){
        const container=document.getElementById(target);container.replaceChildren();
        status('notices',container);
        const list=store.list('notices').filter(n=>n.type===type);
        for(const n of list){
            const card=document.createElement('div');card.className='card';card.style.padding='18px';
            card.innerHTML='<h3>'+escape(n.title)+'</h3><p style="margin:10px 0;color:var(--muted)">'+escape(n.desc||n.keyUpdate)+'</p>';
            const meta=document.createElement('p');meta.className='editor-hint';meta.textContent=[type==='notice'?n.org:n.authority,n.badge,type==='notice'?n.vacancies:n.benefit].filter(Boolean).join(' · ');card.prepend(meta);
            if(n.officialUrl){const a=document.createElement('a');a.href=n.officialUrl;a.textContent='Official link';a.target='_blank';a.rel='noopener noreferrer';card.append(a);}
            card.append(actions('notices',n.id));container.append(card);
        }
        if(!list.length){const p=document.createElement('p');p.textContent='No published items.';container.append(p);}
        // Recover posts created by older releases, including the old undefined
        // storage-key bug. Never erase the source until the user has reviewed it.
        const drafts=new Map();
        for(const key of ['cycafe_local_notices_v1','undefined']){
            try{
                const saved=JSON.parse(localStorage.getItem(key)||'[]');
                if(Array.isArray(saved))for(const n of saved){
                    if(!n.title||!(n.desc||n.keyUpdate))continue;
                    const kind=['scheme','schemes'].includes(n.type)?'scheme':'notice';
                    const id='legacy-'+encodeURIComponent(String(n.id||kind+'-'+n.title)).slice(0,900);
                    if(kind===type&&!store.has('notices',id))drafts.set(id,n);
                }
            }catch(error){console.warn('Could not read older saved notices.');}
        }
        for(const [id,n] of drafts){
            const card=document.createElement('div');card.className='card';card.style.padding='18px';
            const title=document.createElement('h3');title.textContent=n.title;
            const description=document.createElement('p');description.textContent=n.desc||n.keyUpdate;
            const button=document.createElement('button');button.className='btn btn-primary';button.textContent='Publish saved draft';
            button.onclick=async()=>{button.disabled=true;try{await store.save('notices',id,{...n,type,deleted:false});toast('Saved draft published to website.');}catch(e){toast(e.message,true);}finally{button.disabled=false;}};
            card.append(title,description,button);container.append(card);
        }
    }
    window.renderSchemes=()=>renderNotices('scheme','schemes-list');
    window.renderJobs=()=>renderNotices('notice','jobs-list');
    function refresh(kind){
        if(kind==='services')renderServices();
        else{renderSchemes();renderJobs();}
    }
    store.subscribe(refresh);
    refresh('services');refresh('notices');
})();

