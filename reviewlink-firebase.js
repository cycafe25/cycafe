import {getFirestore,collection,doc,getDoc,onSnapshot,writeBatch} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import {getAuth,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

// Private inventory and public redirect mappings are updated in one atomic batch.
export function connectReviewLink(app) {
  const db=getFirestore(app), auth=getAuth(app), core=window.CycafeReviewCore;
  let stop=null, generation=0;
  const store={boards:[],status:'signed-out',error:'',listeners:new Set()};
  function emit() { store.listeners.forEach(fn=>fn()); }
  function fail(error) { store.status='error'; store.error=error.code==='permission-denied' ? 'Publish the updated firestore.rules to enable QR management.' : 'QR connection failed. Check your internet connection and retry.'; emit(); }
  store.subscribe=fn=>{store.listeners.add(fn);fn();return()=>store.listeners.delete(fn);};
  async function admin() {
    const user=auth.currentUser;
    if (!user || !(await getDoc(doc(db,'admins',user.uid))).exists()) throw new Error('Sign in with an authorized Cycafe admin account.');
    return user;
  }
  store.refresh=async()=>{
    const ticket=++generation;
    if(stop)stop(); stop=null; store.boards=[]; store.error='';
    if(!auth.currentUser){store.status='signed-out';emit();return;}
    store.status='loading';emit();
    try {
      await admin(); if(ticket!==generation)return;
      stop=onSnapshot(collection(db,'reviewBoards'),snap=>{
        if(ticket!==generation)return;
        store.boards=snap.docs.map(d=>({...d.data(),code:d.id})).sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
        store.status='ready';store.error='';emit();
      },error=>{if(ticket===generation)fail(error);});
    }catch(error){if(ticket===generation)fail(error);}
  };
  store.create=async(count,prefix,base)=>{
    const user=await admin();
    if(!Number.isInteger(count)||count<1||count>100)throw new Error('Create between 1 and 100 boards.');
    prefix=core.text(prefix,'Board name',60,true);
    base=core.scanBase(base);
    const now=new Date().toISOString(), codes=[];
    // Eight pairs per commit stay within Firestore's cross-document rule lookup limit.
    for(let offset=0;offset<count;offset+=8){
      const batch=writeBatch(db), chunk=[];
      for(let i=offset;i<Math.min(offset+8,count);i++){
        const code=core.code();chunk.push(code);
        batch.set(doc(db,'reviewBoards',code),{label:count===1?prefix:prefix+' '+String(i+1).padStart(3,'0'),business_name:'',location:'',review_url:'',status:'unassigned',created_at:now,updated_at:now,created_by:user.uid,scan_base:base});
        batch.set(doc(db,'reviewRedirects',code),{status:'unassigned',review_url:''});
      }
      try { await batch.commit();codes.push(...chunk); }
      catch(error){if(codes.length)throw new Error(codes.length+' boards were created before the connection failed. Refresh the inventory before retrying.');throw error;}
    }
    return codes;
  };
  store.save=async(code,fields)=>{
    await admin();if(!core.validCode(code))throw new Error('Invalid board code.');
    const value=core.board(fields), ref=doc(db,'reviewBoards',code);
    if(!(await getDoc(ref)).exists())throw new Error('Board no longer exists. Refresh the inventory.');
    const batch=writeBatch(db);
    batch.update(ref,{...value,updated_at:new Date().toISOString()});
    batch.set(doc(db,'reviewRedirects',code),{status:value.status,review_url:value.status==='active'?value.review_url:''});
    await batch.commit();
  };
  window.CycafeReview=store;window.dispatchEvent(new Event('cycafe-review-ready'));
  onAuthStateChanged(auth,()=>void store.refresh());
  window.addEventListener('pagehide',()=>{generation++;if(stop)stop();});
}
