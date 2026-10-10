(function(){
    const store=window.CycafeContent;
    const originals=new Map();
    const categoryLabels={
        identity:'Identity & Citizenship', agriculture:'Agriculture & Farmers', health:'Health & Medical',
        education:'Education & Exams', jobs:'Jobs & Recruitment', business:'Tax & Business',
        banking:'Banking & Finance', transport:'Travel & Transport', legal:'Legal & Security',
        welfare:'Social Welfare', govt:'Government Portals', print:'Printing & Media',
        state:'State Government', other:'Other Services'
    };
    const text=value=>Array.isArray(value)?value.filter(v=>v!==null&&v!==undefined).join(', '):String(value??'').trim();
    function authority(item){
        const names=Array.isArray(item.authorities)?item.authorities.map(text).filter(Boolean):[];
        return names.length?[...new Set(names)].join(' • '):text(item.authority);
    }
    function categoryLabel(item){
        const categories=text(item.category).split(/\s+/).filter(Boolean);
        const category=categories.find(c=>c!=='govt')||categories[0]||'other';
        return categoryLabels[category]||category.replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    }
    function categoryChip(item){
        const chip=document.createElement('span');
        chip.className='service-category-label text-[10px] font-bold bg-violet-50 text-violet-700 px-2 py-0.5 rounded border border-violet-200 text-right';
        chip.textContent=categoryLabel(item);chip.title='Service category';
        return chip;
    }
    function issuerLine(item){
        const issuer=authority(item);
        if(!issuer)return null;
        const line=document.createElement('p');line.className='service-authority text-[11px] font-semibold text-gray-600 mb-1 leading-relaxed break-words';
        line.textContent=issuer;line.title='Issuing authority / institution';return line;
    }
    function jurisdictionLine(item){
        if(!text(item.jurisdiction))return null;
        const line=document.createElement('p');line.className='service-jurisdiction text-[11px] text-gray-600 mb-3 leading-relaxed';
        line.textContent='Government / jurisdiction: '+text(item.jurisdiction);return line;
    }
    function searchMetadata(el,item){
        el.dataset.serviceId=item.id;
        el.dataset.category=text(item.category||'other')+(item.id.startsWith('base-catalog-')?' govt':'');
        el.dataset.name=[item.name,item.category,item.desc,item.url,item.badge,authority(item),item.jurisdiction,item.keywords].map(text).join(' ').toLowerCase();
    }
    function decorateOriginal(original,item){
        // Keep the original specialty controls (e.g. PAN Forms) and fee labels.
        const el=original.cloneNode(true);searchMetadata(el,item);
        const header=el.querySelector('.flex.items-center.justify-between');
        const chip=categoryChip(item);
        if(header){
            const badges=document.createElement('div');badges.className='flex flex-col items-end gap-1 max-w-[70%]';
            const originalBadge=header.querySelector('span');
            if(originalBadge)badges.append(originalBadge);
            badges.prepend(chip);header.append(badges);
        }else el.prepend(chip);
        const title=el.querySelector('h4'),issuer=issuerLine(item),jurisdiction=jurisdictionLine(item);
        if(issuer){if(title)title.before(issuer);else el.prepend(issuer);}
        if(jurisdiction){const description=title?.nextElementSibling;if(description)description.after(jurisdiction);else title?.after(jurisdiction);}
        return el;
    }
    function card(item){
        const el=document.createElement('div');
        el.className='service-card bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between';
        searchMetadata(el,item);
        const body=document.createElement('div');
        const header=document.createElement('div');header.className='flex items-start justify-between gap-2 mb-2';
        const iconBox=document.createElement('div');iconBox.className='w-10 h-10 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-lg shrink-0';
        const icon=document.createElement('i'); icon.className=item.icon||'fa-solid fa-laptop-code';
        iconBox.append(icon);
        const badges=document.createElement('div');badges.className='flex flex-col items-end gap-1 max-w-[70%]';
        badges.append(categoryChip(item));
        if(item.badge){const badge=document.createElement('span');badge.className='text-[10px] text-violet-600 font-semibold text-right';badge.textContent=item.badge;badges.append(badge);}
        header.append(iconBox,badges);body.append(header);
        const issuer=issuerLine(item);if(issuer)body.append(issuer);
        const title=document.createElement('h4'); title.className='font-bold text-gray-900 text-sm mb-1 break-words'; title.textContent=item.name;
        const desc=document.createElement('p'); desc.className='text-xs text-gray-500 mb-3 leading-relaxed whitespace-pre-line break-words'; desc.textContent=item.desc||'';
        body.append(title,desc);
        const jurisdiction=jurisdictionLine(item);if(jurisdiction)body.append(jurisdiction);
        const actions=document.createElement('div'); actions.className='flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100';
        if(item.defaultFee!==undefined&&item.defaultFee!==null&&item.defaultFee!==''){
            const fee=document.createElement('span');fee.className='text-xs font-semibold text-gray-700 mr-auto';fee.textContent='Service fee: ₹'+item.defaultFee;actions.append(fee);
        }
        const apply=document.createElement('button'); apply.type='button'; apply.className='px-3 py-1 bg-violet-600 text-white rounded-md text-xs'; apply.textContent='Apply';
        apply.addEventListener('click',()=>window.openServiceApplyModal(item));
        actions.append(apply);
        const url=store.safeUrl(item.url);
        if(url){
            const link=document.createElement('a'); link.href=url; link.textContent='Visit'; link.className='px-3 py-1 bg-gray-100 rounded-md text-xs';
            if(!url.startsWith('#')){link.target='_blank';link.rel='noopener noreferrer';}
            actions.append(link);
        }
        if(item.id==='base-inline-0'){
            const forms=document.createElement('button'); forms.textContent='Forms';forms.className='text-xs';
            forms.onclick=()=>window.openPanApplicationModal();actions.append(forms);
        }
        el.append(body,actions);
        return el;
    }
    function render(){
        const grid=document.getElementById('services-grid');if(!grid)return;
        const nodes=store.list('services').map(item=>{
            const original=originals.get(item.id);
            return original && !item.updatedAt ? decorateOriginal(original,item) : card(item);
        });
        grid.replaceChildren(...nodes);
        const count=document.getElementById('services-count-badge');
        if(count)count.textContent=nodes.length+' Services Available';
        const tab=document.querySelector('#service-category-tabs button');
        if(tab)tab.textContent='All Services ('+nodes.length+')';
        if(typeof window.filterServices==='function')window.filterServices();
    }
    function init(){
        const cards=document.querySelectorAll('#services-grid .service-card');
        store.base.services.forEach((item,i)=>{if(cards[i])originals.set(item.id,cards[i].cloneNode(true));});
        render();
        store.subscribe(kind=>{if(kind==='services')render();});
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
    else init();
})();

