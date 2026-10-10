import {getFirestore, collection, onSnapshot, doc, setDoc, getDoc} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import {getAuth} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

// Called with the page's already-initialized Firebase app.
const contentConnections = new WeakSet();
export function connectContent(app) {
    // Module scripts may run while readyState is "interactive", before the
    // later deferred classic scripts have created the shared store.
    if (!window.CycafeContent) {
        window.addEventListener('cycafe-content-ready', () => connectContent(app), {once:true});
        return;
    }
    if (contentConnections.has(app)) return;
    contentConnections.add(app);
    const store = window.CycafeContent;
    const db = getFirestore(app);
    const auth = getAuth(app);
    const stops = [];
    for (const kind of ['services','notices']) {
        stops.push(onSnapshot(collection(db,kind), snap=>{
            store.receive(kind,snap.docs.map(d=>({...d.data(),id:d.id})));
        }, error=>store.fail(kind,error)));
    }
    store.save = async (kind,id,fields) => {
        if (!['services','notices'].includes(kind)) throw new Error('Unknown content type.');
        if (!auth.currentUser) throw new Error('Please sign in as admin.');
        if (!(await getDoc(doc(db,'admins',auth.currentUser.uid))).exists()) {
            throw new Error('Admin permission required.');
        }
        if (store.status[kind] !== 'ready') throw new Error('Content sync is unavailable. Check Firebase rules and connection.');
        const ref = id ? doc(db,kind,id) : doc(collection(db,kind));
        const previous = store.list(kind).find(n=>n.id===id) || {};
        const data = {...previous,...fields,updatedAt:new Date().toISOString()};
        delete data.id;
        if (!data.createdAt) data.createdAt=new Date().toISOString();
        await setDoc(ref,data,{merge:true});
        return ref.id;
    };
    store.remove = (kind,id)=>store.save(kind,id,{deleted:true});
    window.addEventListener('pagehide',event=>{if(!event.persisted)stops.forEach(stop=>stop());});
}

