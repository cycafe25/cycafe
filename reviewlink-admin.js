(function(){
  'use strict';
  const core=window.CycafeReviewCore, $=id=>document.getElementById(id);
  let store=null, selected=null, busy=false, unsubscribe=null;
  function message(value,error=false){$('rl-message').textContent=value;$('rl-message').dataset.error=String(error);}
  function control(tag,value,cls){const e=document.createElement(tag);if(value)e.textContent=value;if(cls)e.className=cls;return e;}
  function linkFor(board){return core.scanUrl(board.code,board.scan_base);}
  function qr(value){if(!window.qrcode)throw new Error('QR library unavailable. Refresh the page.');const result=window.qrcode(0,'M');result.addData(value,'Byte');result.make();return result;}
  function svg(value){return qr(value).createSvgTag({cellSize:4,margin:16,scalable:true});}
  function download(blob,name){const url=URL.createObjectURL(blob),a=control('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function button(label,action){const b=control('button',label,'btn btn-outline');b.type='button';b.addEventListener('click',()=>void action());return b;}
  function errorText(error){return error.code==='permission-denied'?'Publish the updated firestore.rules in Firebase to enable QR management.':error.message || 'Unable to complete operation.';}
  async function run(action){if(busy)return;busy=true;renderControls();try{await action();}catch(error){message(errorText(error),true);}finally{busy=false;renderControls();}}
  function renderControls(){const ready=!!store&&store.status==='ready'&&!busy;$('rl-create-button').disabled=!ready;$('rl-save-button').disabled=!ready||!selected;$('rl-export').disabled=!ready||!store.boards.length;$('rl-print-all').disabled=!ready||!store.boards.length;}
  function render(){
    renderControls();
    if(store.status!=='ready'){message(store.error || (store.status==='loading'?'Loading QR inventory…':'Sign in to your Cycafe admin account.'),store.status==='error');$('rl-table').replaceChildren();$('rl-empty').hidden=false;$('rl-empty').textContent='QR inventory is unavailable until connected.';$('rl-editor').hidden=true;selected=null;return;}
    message('Connected to Firebase. QR records are shared across your devices.');
    for(const [id,status]of [['rl-total',null],['rl-active','active'],['rl-unassigned','unassigned'],['rl-paused','paused']])$(id).textContent=String(store.boards.filter(b=>!status||b.status===status).length);
    const search=$('rl-search').value.toLowerCase(),filter=$('rl-filter').value;
    const boards=store.boards.filter(b=>(filter==='all'||b.status===filter)&&[b.label,b.business_name,b.code,b.location].join(' ').toLowerCase().includes(search));
    $('rl-table').replaceChildren();$('rl-empty').hidden=boards.length>0;$('rl-empty').textContent=store.boards.length?'No boards match your search.':'Create your first QR board above.';
    for(const b of boards){const tr=control('tr');const name=control('td');name.append(control('strong',b.business_name||b.label),control('div',b.label+' · '+b.code));tr.append(name,control('td',b.status),control('td',b.location||'—'));const actions=control('td');actions.append(button('Manage',()=>select(b)));tr.append(actions);$('rl-table').append(tr);}
    if(selected){const current=store.boards.find(b=>b.code===selected.code);if(!current){selected=null;$('rl-editor').hidden=true;}}
  }
  function select(board){
    selected=board;$('rl-editor').hidden=false;$('rl-placeholder').hidden=true;
    for(const key of ['label','business_name','location','review_url','status'])$('rl-edit-'+key).value=board[key]||'';
    const url=linkFor(board);$('rl-permanent').textContent=url;$('rl-permanent').href=url;
    $('rl-qr').innerHTML=svg(url);$('rl-code').textContent=board.code;renderControls();
    if(window.innerWidth<1100)$('rl-editor').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function init(){if(unsubscribe)unsubscribe();store=window.CycafeReview;unsubscribe=store.subscribe(render);}
  $('rl-domain').value=new URL('./',location.href).href;
  $('rl-create-form').addEventListener('submit',event=>{event.preventDefault();void run(async()=>{
    const base=core.scanBase($('rl-domain').value);
    if(['localhost','127.0.0.1','[::1]'].includes(new URL(base).hostname)&&!confirm('This QR will point to localhost and will not work on customer phones. Use your deployed website URL for sale. Create a local test QR?'))return;
    const codes=await store.create(Number($('rl-count').value),$('rl-prefix').value,base);
    message(codes.length+' QR board(s) created. Assign a business using Manage.');
  });});
  $('rl-edit-form').addEventListener('submit',event=>{event.preventDefault();if(!selected)return;void run(async()=>{
    const fields={};for(const key of ['label','business_name','location','review_url','status'])fields[key]=$('rl-edit-'+key).value;
    const value=core.board(fields);await store.save(selected.code,value);select({...selected,...value});message('Saved. The printed QR address stays the same.');
  });});
  $('rl-search').addEventListener('input',()=>{if(store)render();});$('rl-filter').addEventListener('change',()=>{if(store)render();});
  $('rl-refresh').addEventListener('click',()=>{if(store)void store.refresh();});
  $('rl-copy').addEventListener('click',()=>void run(async()=>{if(!selected)return;await navigator.clipboard.writeText(linkFor(selected));message('Permanent QR link copied.');}));
  $('rl-download-svg').addEventListener('click',()=>void run(async()=>{if(selected)download(new Blob([svg(linkFor(selected))],{type:'image/svg+xml'}),'review-'+selected.code+'.svg');}));
  $('rl-download-png').addEventListener('click',()=>void run(async()=>{
    if(!selected)return;const code=qr(linkFor(selected)),n=code.getModuleCount(),scale=16,canvas=document.createElement('canvas');canvas.width=canvas.height=(n+8)*scale;const context=canvas.getContext('2d');if(!context)throw new Error('PNG export unavailable. Use SVG.');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.fillStyle='#000';for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(code.isDark(r,c))context.fillRect((c+4)*scale,(r+4)*scale,scale,scale);const blob=await new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('PNG export failed.')),'image/png'));download(blob,'review-'+selected.code+'.png');
  }));
  $('rl-export').addEventListener('click',()=>{if(!store)return;const rows=[['Board','Code','Business','Location','Status','Permanent URL','Google review URL'],...store.boards.map(b=>[b.label,b.code,b.business_name,b.location,b.status,linkFor(b),b.review_url])];download(new Blob([core.csv(rows)],{type:'text/csv;charset=utf-8'}),'cycafe-review-boards.csv');});
  function print(boards){const root=$('rl-print-root');root.replaceChildren();for(const b of boards){const card=control('section',null,'rl-print-board');card.append(control('h2',b.business_name||b.label),control('p','Scan to review us'));const image=control('div');image.innerHTML=svg(linkFor(b));card.append(image,control('p',linkFor(b)));root.append(card);}window.print();}
  $('rl-print-all').addEventListener('click',()=>{if(store&&store.boards.length)print(store.boards);});$('rl-print-one').addEventListener('click',()=>{if(selected)print([selected]);});
  window.addEventListener('cycafe-review-ready',init);if(window.CycafeReview)init();
})();
