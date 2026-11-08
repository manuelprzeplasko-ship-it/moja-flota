import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth,signInAnonymously} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFirestore,doc,getDoc,collection,addDoc,serverTimestamp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import {firebaseConfig,configured} from './firebase-config.js';
const $=id=>document.getElementById(id);const id=new URLSearchParams(location.search).get('pojazd');
if(!configured){$('vehicleName').textContent='Strona nie jest jeszcze skonfigurowana.';}else if(!id||!/^[a-zA-Z0-9]{10,40}$/.test(id)){$('vehicleName').textContent='Nieprawidłowy link QR.';}else{
 const app=initializeApp(firebaseConfig),db=getFirestore(app),auth=getAuth(app);
 (async()=>{try{const s=await getDoc(doc(db,'publicVehicles',id));if(!s.exists()||s.data().active!==true){$('vehicleName').textContent='Pojazd nieaktywny lub nieznany.';return;}$('vehicleName').textContent=s.data().name;$('vehiclePlate').textContent=s.data().plate;$('reportForm').hidden=false;
 $('reportForm').onsubmit=async e=>{e.preventDefault();const button=$('send');button.disabled=true;$('message').textContent='Wysyłanie…';try{await signInAnonymously(auth);const km=Number($('odometer').value);if(!Number.isSafeInteger(km)||km<0||km>9999999)throw Error('Nieprawidłowy przebieg');await addDoc(collection(db,'reports'),{vehicleId:id,driverName:$('driverName').value.trim(),odometer:km,note:$('note').value.trim(),status:'new',createdAt:serverTimestamp()});$('reportForm').reset();$('message').textContent='Dziękujemy! Zgłoszenie wysłane do administratora.';}catch(err){$('message').textContent='Nie udało się wysłać zgłoszenia. '+err.message;}finally{button.disabled=false;}};
 }catch(e){$('vehicleName').textContent='Nie udało się wczytać pojazdu.';$('message').textContent=e.message;}})();}
