/* Local conversion only. Unsupported input/output pairs are never offered. */
(() => {
  'use strict';
  const $ = id => document.getElementById('converter-' + id);
  const images = ['png','jpg','jpeg','webp','bmp'];
  const sheets = ['xlsx','csv','tsv','json','txt'];
  const labels = {jpg:'JPG image',png:'PNG image',webp:'WebP image',pdf:'PDF document',xlsx:'Excel (.xlsx)',csv:'CSV spreadsheet',tsv:'TSV spreadsheet',json:'JSON data',txt:'Plain text'};
  let file, kind, busy = false, resultURL;
  const loads = new Map();
  function library(global, url) {
    if (window[global]) return Promise.resolve(window[global]);
    if (!loads.has(global)) loads.set(global, new Promise((resolve,reject) => {
      const script = document.createElement('script'); script.src = url;
      script.onload = () => window[global] ? resolve(window[global]) : reject(new Error('Conversion library did not load.'));
      script.onerror = () => reject(new Error('Cannot load conversion library. Check internet and try again.'));
      document.head.append(script);
    }).catch(error => { loads.delete(global); throw error; }));
    return loads.get(global);
  }
  const excel = () => library('XLSX','https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js');
  function clear() { if (resultURL) URL.revokeObjectURL(resultURL); resultURL = null; $('result').classList.add('hidden'); $('preview').replaceChildren(); $('download').removeAttribute('href'); }
  function status(message) { $('status').textContent = message; }
  function optionsFor(ext) { return ext === 'pdf' ? ['jpg','png','webp','txt'] : images.includes(ext) ? ['pdf','jpg','png','webp','xlsx','csv','tsv','txt','json'] : ['xlsx','xls','csv','tsv','txt','json'].includes(ext) ? sheets.filter(x => x !== ext) : []; }
  function note() {
    const ocr = images.includes(kind) && sheets.includes($('format').value);
    $('language-label').classList.toggle('hidden',!ocr);
    $('note').textContent = ocr ? 'OCR extracts editable text/table cells, not an exact copy of the layout. Check the preview and verify numbers before use.' : kind === 'pdf' ? 'Images: one file per page, multiple pages downloaded as ZIP (maximum 50 pages). Text: selectable PDF text only; scanned PDFs need image OCR.' : kind === 'xlsx' || kind === 'xls' ? 'CSV, TSV, JSON and TXT export the first worksheet only. Excel output preserves worksheets; advanced formatting/macros may not be preserved.' : '';
  }
  function selected() {
    if (busy) return;
    clear(); file = $('file').files[0]; kind = file?.name.split('.').pop().toLowerCase();
    const outputs = file && file.size <= 25*1024*1024 ? optionsFor(kind) : [];
    $('format').replaceChildren(...(outputs.length ? outputs : ['']).map(value => { const option=document.createElement('option'); option.value=value; option.textContent=labels[value] || 'Upload a supported file first'; return option; }));
    $('format').disabled = !outputs.length; $('submit').disabled = !outputs.length;
    $('file-info').textContent = file ? `${file.name} · ${(file.size/1024/1024).toFixed(2)} MB` : '';
    status(!file ? '' : file.size > 25*1024*1024 ? 'File too large. Maximum 25 MB.' : !outputs.length ? 'Unsupported file. Choose PDF, an image, Excel, CSV, TSV, TXT or JSON.' : 'Ready to convert.'); note();
  }
  async function canvasFor(blob) {
    const bitmap = await createImageBitmap(blob);
    if (bitmap.width*bitmap.height > 24000000) { bitmap.close(); throw new Error('Image too large: maximum 24 megapixels.'); }
    const canvas=document.createElement('canvas'); canvas.width=bitmap.width; canvas.height=bitmap.height;
    const ctx=canvas.getContext('2d'); ctx.fillStyle='white'; ctx.fillRect(0,0,canvas.width,canvas.height); ctx.drawImage(bitmap,0,0); bitmap.close(); return canvas;
  }
  function encoded(canvas, format) { return new Promise((resolve,reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image encoding failed.')), 'image/'+(format === 'jpg' ? 'jpeg' : format),0.94)); }
  // Group words by baseline, then split cells at large horizontal gaps.
  function ocrRows(tsv) {
    const lines=[];
    for (const line of (tsv || '').split('\n').slice(1)) {
      const a=line.split('\t'); if(a[0] !== '5' || !a.slice(11).join('\t').trim()) continue;
      const word={x:+a[6],y:+a[7],w:+a[8],h:+a[9],text:a.slice(11).join('\t')};
      let row=lines.find(r=>Math.abs(r.y-word.y)<Math.max(r.h,word.h)*0.6);
      if(!row) { row={y:word.y,h:word.h,words:[]}; lines.push(row); } row.words.push(word);
    }
    return lines.sort((a,b)=>a.y-b.y).map(row=> {
      const words=row.words.sort((a,b)=>a.x-b.x), cells=[]; let text='',end=0;
      for(const word of words) { if(text && word.x-end > row.h*1.5) { cells.push(text); text=''; } text+=(text?' ':'')+word.text; end=word.x+word.w; } if(text) cells.push(text); return cells;
    });
  }
  async function readOCR(blob) {
    status('Loading OCR engine and language data…');
    const t = await library('Tesseract','https://cdn.jsdelivr.net/npm/tesseract.js@6.0.1/dist/tesseract.min.js');
    const worker = await t.createWorker($('language').value,1,{logger:m=>status(`${m.status}${Number.isFinite(m.progress) ? ' · '+Math.round(m.progress*100)+'%' : ''}`)});
    try { await worker.setParameters({preserve_interword_spaces:'1'}); const {data}=await worker.recognize(blob,{}, {text:true,tsv:true}); const rows=ocrRows(data.tsv); if(!rows.length) throw new Error('No readable text found. Use a sharper, well-lit image.'); return {rows,text:data.text}; }
    finally { await worker.terminate(); }
  }
  function preview(rows) { const table=document.createElement('table'); table.className='w-full border-collapse'; rows.slice(0,20).forEach(row=>{const tr=table.insertRow(); row.slice(0,15).forEach(value=>{const td=tr.insertCell(); td.textContent=String(value ?? ''); td.className='border p-2';});}); $('preview').append(table); }
  async function tableOutput(rows, format, workbook) {
    const X=await excel();
    const sheet=X.utils.aoa_to_sheet(rows);
    if(format==='xlsx') { const book=workbook || X.utils.book_new(); if(!workbook) X.utils.book_append_sheet(book,sheet,'Converted'); return new Blob([X.write(book,{bookType:'xlsx',type:'array'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}); }
    const text=format==='json' ? JSON.stringify(rows,null,2) : X.utils.sheet_to_csv(sheet,{FS:format==='csv'?',':'\t'});
    return new Blob([format==='csv'||format==='tsv' ? '\ufeff'+text : text],{type:format==='json'?'application/json':'text/plain;charset=utf-8'});
  }
  async function convert(input, output) {
    const ext=input.name.split('.').pop().toLowerCase(); let rows;
    if(!optionsFor(ext).includes(output)) throw new Error('Unsupported conversion.');
    if(ext==='pdf') {
      const P=await library('pdfjsLib','https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'); P.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const doc=await P.getDocument({data:new Uint8Array(await input.arrayBuffer())}).promise;
      try {
        if(doc.numPages>50) throw new Error('Maximum 50 PDF pages per conversion. Split this PDF using PDF Tools first.');
        const zip=output!=='txt'&&doc.numPages>1 ? new (await library('JSZip','https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'))() : null;
        let blob, text='';
        for(let i=1;i<=doc.numPages;i++) { status(`Converting PDF page ${i} / ${doc.numPages}…`); const page=await doc.getPage(i);
          if(output==='txt') { const content=await page.getTextContent(); text+=content.items.map(v=>v.str+(v.hasEOL?'\n':' ')).join('')+'\n\n'; }
          else { const original=page.getViewport({scale:1}); const scale=Math.min(2,Math.sqrt(16000000/(original.width*original.height))); const viewport=page.getViewport({scale}); const canvas=document.createElement('canvas'); canvas.width=Math.ceil(viewport.width); canvas.height=Math.ceil(viewport.height); await page.render({canvasContext:canvas.getContext('2d'),viewport,background:'white'}).promise; blob=await encoded(canvas,output); if(zip) zip.file(`page-${String(i).padStart(3,'0')}.${output}`,await blob.arrayBuffer()); canvas.width=canvas.height=0; } page.cleanup();
        }
        if(output==='txt') { if(!text.trim()) throw new Error('This PDF has no selectable text. Convert its pages to images, then use image OCR.'); blob=new Blob([text],{type:'text/plain;charset=utf-8'}); }
        return {blob:zip?await zip.generateAsync({type:'blob'}):blob,ext:zip?'zip':output};
      } finally { await doc.destroy(); }
    }
    if(images.includes(ext)) {
      const canvas=await canvasFor(input);
      if(['jpg','png','webp'].includes(output)) return {blob:await encoded(canvas,output),ext:output};
      if(output==='pdf') { const P=await library('PDFLib','https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js'); const doc=await P.PDFDocument.create(); const image=await doc.embedPng(await (await encoded(canvas,'png')).arrayBuffer()); const page=doc.addPage([595.28,841.89]); const scale=Math.min(555.28/image.width,801.89/image.height); const width=image.width*scale,height=image.height*scale; page.drawImage(image,{x:(595.28-width)/2,y:(841.89-height)/2,width,height}); return {blob:new Blob([await doc.save()],{type:'application/pdf'}),ext:output}; }
      const data=await readOCR(canvas); rows=data.rows; preview(rows);
      return {blob:output==='txt'?new Blob([data.text],{type:'text/plain;charset=utf-8'}):await tableOutput(rows,output),ext:output,ocr:true};
    }
    const X=await excel(); let workbook;
    if(ext==='json') { const value=JSON.parse(await input.text()); if(!Array.isArray(value)) throw new Error('JSON input must be an array of rows or objects.'); if(value.every(Array.isArray)) rows=value; else if(value.every(v=>v&&typeof v==='object'&&!Array.isArray(v))) rows=X.utils.sheet_to_json(X.utils.json_to_sheet(value),{header:1}); else rows=value.map(v=>[v]); }
    else { workbook=X.read(ext==='xlsx'||ext==='xls'?await input.arrayBuffer():await input.text(),{type:ext==='xlsx'||ext==='xls'?'array':'string',raw:true,FS:ext==='tsv'?'\t':undefined}); rows=X.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],{header:1,defval:''}); }
    preview(rows); return {blob:await tableOutput(rows,output,ext==='xlsx'||ext==='xls'?workbook:null),ext:output};
  }
  window.openFileConverterModal = options => openModal('fileConverterModal',options || {});
  window.CycafeConverter = {optionsFor,ocrRows,convert};
  $('file').addEventListener('change',selected);
  $('format').addEventListener('change',()=>{clear();note();status('Ready to convert.');});
  $('language').addEventListener('change',()=>{clear();status('Ready to convert.');});
  $('form').addEventListener('submit',async event=> {
    event.preventDefault(); if(busy||!file) return; clear(); busy=true;
    ['file','format','language','submit'].forEach(id=>$(id).disabled=true); status('Preparing conversion…');
    try { const result=await convert(file,$('format').value); resultURL=URL.createObjectURL(result.blob); $('download').href=resultURL; $('download').download=file.name.replace(/\.[^.]+$/,'')+'-converted.'+result.ext; $('result').classList.remove('hidden'); status(result.ocr?'Converted using OCR. Verify the extracted text/cells before using the file.':'Conversion complete. Your download is ready.'); }
    catch(error) { clear(); status('Conversion failed: '+(error.message || 'Please try another file.')); }
    finally { busy=false; ['file','format','language','submit'].forEach(id=>$(id).disabled=false); }
  });
  window.addEventListener('pagehide',()=>{if(resultURL) URL.revokeObjectURL(resultURL);});
})();
