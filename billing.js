// Build a receipt-only document for printing and the browser's Save as PDF.
(function(){
    const el=id=>document.getElementById(id);
    const text=id=>el(id)?.value?.trim()||'';
    const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const money=cents=>'₹'+(cents/100).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
    let lastUid=null,printing=false;
    function feedback(message,error=false){
        const node=el('bill-feedback');node.textContent=message;
        node.style.color=error?'#b91c1c':'';
    }
    function newReceipt(){
        const suffix=(window.crypto?.randomUUID?.()||Math.random().toString(36).slice(2)).slice(0,8).toUpperCase();
        el('inv-no').textContent='INV-'+Date.now().toString(36).toUpperCase()+'-'+suffix;
        el('inv-date').textContent=new Date().toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric'});
    }
    function syncHeader(){
        const profile=window.getBillingOperatorProfile?.();
        el('bill-operator-center').textContent=profile?.centerName||'Add your café name in Profile';
        el('bill-operator-address').textContent=profile?.address||'Add your café address in Profile';
        el('bill-operator-mobile').textContent=profile?.mobile?'Mobile: '+profile.mobile:'Add your mobile number in Profile';
        const uid=profile?.uid||null;
        if(lastUid!==uid){lastUid=uid;newReceipt();}
    }
    function readBill(){
        syncHeader();
        const profile=window.getBillingOperatorProfile?.();
        if(!profile?.uid)throw new Error('Sign in and wait for your operator profile to load.');
        if(!profile.centerName?.trim()||!profile.address?.trim()||!profile.mobile?.trim()){
            throw new Error('Add your café name, address and mobile number in Profile before printing.');
        }
        const name=text('bill-cust-name'),service=text('bill-service-name');
        if(!name||!service)throw new Error('Enter the customer name and service before printing.');
        const rawAmount=text('bill-amount'),rawFee=text('bill-gst');
        const amount=Number(rawAmount),fee=Number(rawFee||'0');
        if(!rawAmount||!Number.isFinite(amount)||!Number.isFinite(fee)||amount<0||fee<0||amount>99999999||fee>99999999){
            throw new Error('Enter valid, non-negative amounts.');
        }
        const amountCents=Math.round(amount*100),feeCents=Math.round(fee*100);
        return {uid:profile.uid,centerName:profile.centerName.trim(),address:profile.address.trim(),mobile:profile.mobile.trim(),
            receipt:el('inv-no').textContent,date:el('inv-date').textContent,name,phone:text('bill-cust-phone'),service,
            amountCents,feeCents,totalCents:amountCents+feeCents};
    }
    function receiptDocument(data){
        const logo=new URL('images/cycafe-logo.png',document.baseURI).href;
        return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>'+escape(data.receipt)+' - Cycafe Receipt</title><style>'+
            '@page{size:A4 portrait;margin:14mm}*{box-sizing:border-box}body{margin:0;background:#fff;color:#172033;font:13px Arial,Helvetica,sans-serif;line-height:1.5}.receipt{max-width:175mm;margin:auto;padding:8mm;border:1px solid #dce2eb}header{text-align:center;border-bottom:2px solid #244f9e;padding-bottom:5mm;margin-bottom:6mm}.logo{display:block;width:18mm;height:18mm;object-fit:contain;margin:0 auto 1mm}.brand{font-size:17px;font-weight:800;color:#244f9e;margin-bottom:3mm}h1{font-size:22px;line-height:1.3;margin:0 0 2mm;overflow-wrap:anywhere}.address{white-space:pre-line;overflow-wrap:anywhere}.label{font-size:10px;color:#627087;text-transform:uppercase;letter-spacing:1px}.receipt-type{margin-top:3mm;font-size:11px;font-weight:bold;letter-spacing:2px}.meta{display:flex;justify-content:space-between;gap:5mm;flex-wrap:wrap;margin-bottom:5mm}.customer{padding:4mm;background:#f7f9fd;border:1px solid #e6ebf2;margin-bottom:5mm;overflow-wrap:anywhere}.customer strong{display:block;font-size:15px}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{text-align:left;padding:3mm 2mm;border-bottom:1px solid #e1e6ed;vertical-align:top;overflow-wrap:anywhere}th{font-size:10px;text-transform:uppercase;color:#627087}th:last-child,td:last-child{width:38mm;text-align:right;white-space:nowrap}tfoot td{font-size:17px;font-weight:bold;color:#244f9e;border-bottom:2px solid #244f9e}.footer{text-align:center;color:#627087;font-size:11px;margin-top:8mm}header,.meta,.customer,tr{break-inside:avoid}thead{display:table-header-group}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.receipt{border:0;padding:0}}'+
            '</style></head><body><article class="receipt"><header><img class="logo" src="'+escape(logo)+'" alt="Cycafe logo"><div class="brand">Cycafe</div><h1>'+escape(data.centerName)+'</h1><div class="address">'+escape(data.address)+'</div><div>Mobile: '+escape(data.mobile)+'</div><div class="receipt-type">SERVICE RECEIPT</div></header>'+
            '<div class="meta"><div><div class="label">Receipt number</div><strong>'+escape(data.receipt)+'</strong></div><div><div class="label">Date</div><strong>'+escape(data.date)+'</strong></div></div>'+
            '<section class="customer"><div class="label">Customer</div><strong>'+escape(data.name)+'</strong>'+(data.phone?'<div>Mobile: '+escape(data.phone)+'</div>':'')+'</section>'+
            '<table><thead><tr><th>Particulars</th><th>Amount</th></tr></thead><tbody><tr><td>'+escape(data.service)+'</td><td>'+money(data.amountCents)+'</td></tr><tr><td>GST / Government fee</td><td>'+money(data.feeCents)+'</td></tr></tbody><tfoot><tr><td>Total payable</td><td>'+money(data.totalCents)+'</td></tr></tfoot></table>'+
            '<div class="footer">Thank you for visiting '+escape(data.centerName)+'.</div></article></body></html>';
    }
    window.printInvoice=async function(){
        if(printing)return;
        let data;
        try{data=readBill();}catch(error){feedback(error.message,true);return;}
        printing=true;el('bill-print-button').disabled=true;
        const frame=document.createElement('iframe');
        frame.title='Receipt print document';frame.setAttribute('aria-hidden','true');
        frame.style.cssText='position:fixed;left:-10000px;top:0;width:794px;height:1123px;border:0;pointer-events:none';
        const cleanup=()=>{
            if(!frame.isConnected)return;
            frame.remove();printing=false;el('bill-print-button').disabled=false;
        };
        try{
            feedback('Preparing receipt…');
            const loaded=new Promise((resolve,reject)=>{
                const timeout=setTimeout(()=>reject(new Error('Receipt could not load. Please try again.')),10000);
                frame.onload=()=>{clearTimeout(timeout);resolve();};
            });
            frame.srcdoc=receiptDocument(data);document.body.append(frame);
            await loaded;
            const doc=frame.contentDocument;
            await Promise.all([...doc.images].map(img=>img.complete?Promise.resolve():new Promise(resolve=>{
                const timeout=setTimeout(resolve,4000);
                const done=()=>{clearTimeout(timeout);resolve();};
                img.addEventListener('load',done,{once:true});img.addEventListener('error',done,{once:true});
            })));
            await doc.fonts?.ready;
            if(window.getBillingOperatorProfile?.()?.uid!==data.uid)throw new Error('Account changed. Open the bill again before printing.');
            frame.contentWindow.addEventListener('afterprint',cleanup,{once:true});
            feedback('Choose your printer, or “Save as PDF” to download this receipt.');
            frame.contentWindow.focus();
            frame.contentWindow.print();
            // Also clean up browsers that do not emit afterprint for child frames.
            setTimeout(cleanup,300000);
        }catch(error){cleanup();feedback(error.message||'Receipt could not be printed.',true);}
    };
    // Keep sharing consistent with the operator's receipt letterhead.
    window.shareInvoiceWhatsApp=function(){
        let data;try{data=readBill();}catch(error){feedback(error.message,true);return;}
        const message='*Cycafe*\n*'+data.centerName+'*\n'+data.address+'\nMobile: '+data.mobile+
            '\n\nReceipt: '+data.receipt+'\nDate: '+data.date+'\nCustomer: '+data.name+
            '\nService: '+data.service+'\nTotal payable: '+money(data.totalCents)+'\n\nThank you for visiting '+data.centerName+'.';
        const digits=data.phone.replace(/\D/g,'');
        const recipient=digits.length===10?'91'+digits:digits;
        const url='https://api.whatsapp.com/send?'+(recipient?'phone='+recipient+'&':'')+'text='+encodeURIComponent(message);
        window.open(url,'_blank','noopener,noreferrer');
    };
    window.CycafeBilling={readBill,receiptDocument,syncHeader};
    function init(){
        syncHeader();
        const modal=el('billModal');let wasOpen=!modal.classList.contains('hidden');
        new MutationObserver(()=>{
            const open=!modal.classList.contains('hidden');
            if(open&&!wasOpen){syncHeader();newReceipt();feedback('For a PDF, choose “Save as PDF” in the print window.');}
            wasOpen=open;
        }).observe(modal,{attributes:true,attributeFilter:['class']});
        window.addEventListener('cycafe-operator-profile-changed',syncHeader);
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

