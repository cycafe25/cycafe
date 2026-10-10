// Notifications derive from the signed-in user's tasks and published content.
(function(){
    const DAY=86400000;
    function timestamp(value){
        if(value?.toMillis)return value.toMillis();
        if(value?.seconds!==undefined)return Number(value.seconds)*1000;
        if(typeof value==='number')return value;
        const result=Date.parse(value||'');return Number.isFinite(result)?result:0;
    }
    function build(state,notices,now=Date.now()){
        const tasks=state.uid?(state.customers||[]).filter(c=>
            ['pending','paid','in progress','processing','draft','unpaid'].includes(String(c.status||'Pending').toLowerCase())
        ).map(c=>({
            id:'task:'+c.id,kind:'task',title:c.name||'Customer task',
            detail:(c.service||'Service')+' · '+(c.status==='Paid'?'Paid — service not completed':c.status||'Pending'),
            time:timestamp(c.updatedAt||c.createdAt),
            version:String(timestamp(c.updatedAt||c.createdAt))+':'+(c.status||'Pending'),
            search:c.name||c.service||''
        })):[];
        const news=notices.filter(n=>{
            const t=timestamp(n.updatedAt||n.createdAt);
            return !n.deleted && t>0 && t<=now+300000 && t>=now-30*DAY;
        }).map(n=>({
            id:'notice:'+n.id,kind:['scheme','schemes'].includes(n.type)?'scheme':'job',
            title:n.title||'New announcement',detail:n.desc||n.keyUpdate||'Open to view details.',
            time:timestamp(n.updatedAt||n.createdAt),version:String(timestamp(n.updatedAt||n.createdAt)),
            search:n.title||''
        }));
        return [...tasks,...news].sort((a,b)=>b.time-a.time);
    }
    window.CycafeNotifications={build};
    let items=[],read=new Set(),account;
    const sessionKey=()=> 'cycafe-notification-read:'+(account||'guest');
    function saveRead(){
        try{sessionStorage.setItem(sessionKey(),JSON.stringify([...read].slice(-500)));}catch{}
    }
    const key=n=>n.id+'@'+n.version;
    function render(){
        const list=document.getElementById('notification-list');if(!list)return;
        const state=window.getNotificationTaskState?.()||{uid:null,customers:[]};
        if(account!==state.uid){
            account=state.uid;read=new Set();
            try{const stored=JSON.parse(sessionStorage.getItem(sessionKey())||'[]');if(Array.isArray(stored))read=new Set(stored);}catch{}
        }
        const store=window.CycafeContent;
        items=build(state,store?.list('notices')||[]);
        list.replaceChildren();
        const unread=items.filter(n=>!read.has(key(n))).length;
        const badge=document.getElementById('notification-count');
        badge.hidden=unread===0;badge.style.display=unread?'inline-flex':'none';badge.textContent=unread>99?'99+':String(unread);
        document.getElementById('notification-bell').setAttribute('aria-label',unread?unread+' unread notifications':'Open notifications');
        document.getElementById('notification-mark-read').disabled=!unread;
        const hint=text=>{const p=document.createElement('p');p.className='p-2 text-xs text-gray-500';p.textContent=text;list.append(p);};
        if(!state.uid)hint('Sign in to see your unfinished customer tasks.');
        if(state.error)hint('Customer tasks could not be loaded. Please check your connection.');
        if(store?.status.notices==='error')hint('Latest announcements could not be loaded. Please try again later.');
        else if(store?.status.notices==='loading')hint('Checking for latest announcements…');
        if(!items.length)hint('No notifications to show right now.');
        for(const n of items){
            const row=document.createElement('button');row.type='button';
            row.className='block w-full text-left p-3 rounded-xl border transition hover:shadow-sm '+(
                read.has(key(n))?'bg-white border-gray-200':n.kind==='task'?'bg-amber-50 border-amber-100':n.kind==='job'?'bg-violet-50 border-violet-100':'bg-emerald-50 border-emerald-100');
            const meta=document.createElement('div');meta.className='text-[10px] font-semibold text-gray-500 mb-1';
            const label={task:'Unfinished task',job:'Job notice',scheme:'Government scheme'}[n.kind];
            meta.textContent=label+(read.has(key(n))?'':' · Unread')+(n.time?' · '+new Date(n.time).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):'');
            const title=document.createElement('div');title.className='font-semibold text-gray-900';title.textContent=n.title;
            const detail=document.createElement('div');detail.className='text-gray-600 mt-1 line-clamp-2';detail.textContent=n.detail;
            row.append(meta,title,detail);row.addEventListener('click',()=>{
                read.add(key(n));saveRead();render();
                window.closeModal?.('notificationModal',{skipRoute:true});
                window.AppRouter?.go(n.kind==='task'?'/customers':'/updates');
                if(n.kind==='task'){
                    window.clearCustomerFilters?.();
                    const search=document.getElementById('customer-search-input');
                    if(search){search.value=n.search;window.filterCustomerTable?.();}
                }else{
                    document.getElementById(n.kind==='job'?'updates-tab-notice':'updates-tab-schemes')?.click();
                    const search=document.getElementById('updates-search-input');
                    if(search){search.value=n.search;search.dispatchEvent(new Event('input'));}
                }
            });
            list.append(row);
        }
    }
    function init(){
        const button=document.getElementById('notification-mark-read');if(!button)return;
        button.addEventListener('click',()=>{items.forEach(n=>read.add(key(n)));saveRead();render();});
        document.getElementById('notification-bell').addEventListener('click',render);
        window.addEventListener('cycafe-tasks-changed',render);
        const attach=()=>{window.CycafeContent.subscribe(kind=>{if(kind==='notices')render();});render();};
        if(window.CycafeContent)attach();else window.addEventListener('cycafe-content-ready',attach,{once:true});
        setInterval(render,60000);
        render();
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

