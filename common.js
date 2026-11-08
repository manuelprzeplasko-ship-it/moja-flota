export const drives={"petrol-lpg":"Benzyna + LPG","hybrid-lpg":"Hybryda + LPG",diesel:"Diesel",electric:"Elektryk"};
export function intervals(d){return {oil:d==='petrol-lpg'?10000:d==='electric'?null:15000,gas:d.endsWith('-lpg')?30000:null};}
export const formatKm=n=>Number(n||0).toLocaleString('pl-PL')+' km';
export function dateString(v){return v?.toDate?.().toLocaleDateString('pl-PL')||'—';}
export function dueText(last,interval,km){if(interval===null)return 'Nie dotyczy';if(last==null)return 'Uzupełnij ostatnią wymianę';const left=last+interval-km;return left<0?`Przekroczono o ${formatKm(-left)}`:`Pozostało ${formatKm(left)}`;}
export function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function dateISO(d){return d instanceof Date?d.toISOString().slice(0,10):'';}
