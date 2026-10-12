import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {getFirestore,doc,getDocFromServer} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Public route: intentionally no Auth SDK, sign-in, or ChatGPT integration.
const db=getFirestore(initializeApp(window.FIREBASE_CONFIG)),core=window.CycafeReviewCore;
const title=document.getElementById('review-title'), message=document.getElementById('review-message'), retry=document.getElementById('review-retry'), next=document.getElementById('review-continue');
async function openReview(){
  retry.hidden=true;next.hidden=true;title.textContent='Opening your review page…';
  const code=new URL(location.href).searchParams.get('code');
  if(!core.validCode(code)){title.textContent='Invalid QR link';message.textContent='Please scan the complete QR code or ask the business for its review link.';return;}
  try {
    // Always read the latest mapping; do not redirect to a stale offline destination.
    const snap=await getDocFromServer(doc(db,'reviewRedirects',code));
    if(!snap.exists()){title.textContent='Board not found';message.textContent='Please ask the business to check this QR code.';return;}
    const record=snap.data(),url=core.destination(record);
    if(!url){title.textContent=record.status==='unassigned'?'This QR is waiting to be connected':'This review link is paused';message.textContent='Please ask the business owner to connect or activate this QR board.';return;}
    next.href=url;next.hidden=false;message.textContent='Taking you directly to Google reviews…';location.replace(url);
  }catch(error){title.textContent='Unable to open this review link';message.textContent=error.code==='permission-denied'?'This QR service is not configured yet. Please ask the business owner to publish the QR database rules.':'Check your internet connection and try again.';retry.hidden=false;}
}
retry.addEventListener('click',()=>void openReview());void openReview();
