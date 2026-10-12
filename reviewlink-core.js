(function(root) {
  'use strict';
  const statuses = ['unassigned', 'active', 'paused'];
  function text(value, name, max, required = false) {
    if (typeof value !== 'string') throw new Error(name + ' must be text.');
    const clean = value.trim();
    if (clean.length > max || (required && !clean) || /[\u0000-\u001f\u007f]/.test(clean)) throw new Error('Check ' + name + '.');
    return clean;
  }
  function reviewUrl(value) {
    let url;
    try { url = new URL(text(value, 'Google review link', 2048, true)); } catch { throw new Error('Paste a full HTTPS Google review-request link.'); }
    if (url.protocol !== 'https:' || url.username || url.password || url.port) throw new Error('Use a secure Google review-request link.');
    const host = url.hostname, path = url.pathname;
    const valid = (host === 'g.page' && /^\/r\/[^/]+\/review\/?$/.test(path))
      || (host === 'search.google.com' && path === '/local/writereview' && !!url.searchParams.get('placeid'))
      || (['google.com','www.google.com'].includes(host) && path === '/maps/place' && url.searchParams.get('q')?.startsWith('place_id:') && url.searchParams.get('action') === 'write-review')
      || (host === 'maps.google.com' && /^\/maps\/?$/.test(path) && !!url.searchParams.get('cid') && url.searchParams.get('review') === '1');
    if (!valid) throw new Error('Use Google Business Profile → Get more reviews → Copy link (not a general Maps listing).');
    url.hash = ''; return url.href;
  }
  function board(value) {
    if (!statuses.includes(value.status)) throw new Error('Choose a valid status.');
    const result = {label:text(value.label,'Board name',80,true), business_name:text(value.business_name || '', 'Business name',120), location:text(value.location || '', 'Location',120), review_url:value.review_url ? reviewUrl(value.review_url) : '', status:value.status};
    if (result.status === 'active' && (!result.business_name || !result.review_url)) throw new Error('Add business name and review link before activating.');
    if (result.status === 'unassigned' && (result.business_name || result.review_url)) throw new Error('Assigned boards must be active or paused.');
    return result;
  }
  function code() {
    return Array.from(root.crypto.getRandomValues(new Uint8Array(10)), b=>b.toString(16).padStart(2,'0')).join('');
  }
  function validCode(value) { return typeof value === 'string' && /^[a-f0-9]{20}$/.test(value); }
  function scanUrl(id, base = root.location.href) {
    if (!validCode(id)) throw new Error('Invalid board code.');
    const url = new URL('review.html', base); url.search = ''; url.hash = ''; url.searchParams.set('code',id); return url.href;
  }
  function scanBase(value) {
    value=text(value,'Deployment URL',2048,true);
    let url; try { url=new URL(value); } catch { throw new Error('Enter the full deployment URL, including https://.'); }
    const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
    if ((url.protocol!=='https:' && !(local && url.protocol==='http:')) || url.username || url.password) throw new Error('Use HTTPS for your deployed website.');
    return new URL('review.html',url).href;
  }
  function destination(record) {
    if (!record || record.status !== 'active') return null;
    try { return reviewUrl(record.review_url); } catch { return null; }
  }
  function csv(rows) {
    return '\ufeff' + rows.map(row=>row.map(value=>'"'+String(value ?? '').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"').join(',')).join('\r\n');
  }
  root.CycafeReviewCore = {statuses,text,reviewUrl,board,code,validCode,scanUrl,scanBase,destination,csv};
})(typeof window === 'undefined' ? globalThis : window);
