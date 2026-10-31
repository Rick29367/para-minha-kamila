import './style.css';

const defaults = {
  title:'Luiz & Kamila',
  phrase:'Entre tantos caminhos, meu favorito sempre será aquele que me leva até você.',
  startDate:'2022-10-03',
  counterPhrase:'E eu escolheria você em todas as versões da minha vida. ♥',
  reasons:[
    'Seu sorriso ilumina até o meu dia mais cansativo.',
    'Seu jeito carinhoso faz qualquer lugar parecer casa.',
    'Eu amo nossas conversas, até as mais bobas.',
    'Seu abraço tem o poder de acalmar meu mundo.',
    'Porque até os dias comuns ficam especiais com você.'
  ],
  timeline:[
    {tag:'O começo',title:'O primeiro olhar',desc:'Aquele dia especial em que conversamos por horas. Eu soube que você era diferente.'},
    {tag:'Inesquecível',title:'Nosso primeiro encontro',desc:'O frio na barriga, o riso fácil e a vontade de prolongar cada minuto.'},
    {tag:'Oficial',title:'O pedido de namoro',desc:'A decisão de começar a escrever uma história lado a lado.'},
    {tag:'Para sempre',title:'Nossa caminhada juntos',desc:'Cada passeio, cada momento simples e cada conquista compartilhada.'}
  ],
  coupons:[
    {title:'Massagem relaxante',desc:'Uma massagem nas costas depois de um dia longo.',used:false},
    {title:'Noite da pizza',desc:'Você escolhe o sabor e a noite fica por minha conta.',used:false},
    {title:'Sessão de cinema',desc:'Você escolhe o filme e eu preparo tudo.',used:false},
    {title:'Vale perdão instantâneo',desc:'Um abraço, uma conversa e paz no coração.',used:false},
    {title:'Vale surpresa',desc:'Um presente escolhido especialmente para você.',used:false}
  ],
  photos:[
    {label:'MEU AMOR',caption:'Seu sorriso é o meu lar.',url:''},
    {label:'AVENTURAS',caption:'Com você em qualquer lugar do mundo.',url:''},
    {label:'PARCERIA',caption:'O abraço que acalma tudo.',url:''},
    {label:'LOUCURAS',caption:'Só nós entendemos o quanto somos assim.',url:''},
    {label:'MINHA MULHER',caption:'A pessoa que eu quero ao meu lado.',url:''},
    {label:'NOSSOS GATINHOS',caption:'Não podiam faltar nossos filhos e netos.',url:''}
  ]
};
const clone = x => JSON.parse(JSON.stringify(x));
let data = {...clone(defaults), ...JSON.parse(localStorage.getItem('lk-data')||'{}')};
let reasonIndex=0;
const $ = id => document.getElementById(id);
const save = () => localStorage.setItem('lk-data',JSON.stringify(data));
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
function modal(title,msg){$('modalTitle').textContent=title;$('modalText').textContent=msg;$('modal').classList.add('show')}
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('active',s.id===id));document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('selected',b.dataset.screen===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='settings')renderSettings()}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.screen)));
$('settingsShortcut').onclick=()=>showScreen('settings');
$('closeModal').onclick=()=>$('modal').classList.remove('show');
$('yesBtn').onclick=()=>modal('Meu coração sorriu! 💗','Obrigado por continuar escolhendo viver essa história comigo. Te amo!');
$('noBtn').onmouseenter=e=>{const b=e.currentTarget;b.style.transform=`translate(${Math.random()*80-40}px,${Math.random()*35-17}px)`};
$('noBtn').onclick=()=>toast('Ops! Esse botão está tímido 😜');
function updateCounter(){
 const start=new Date((data.startDate||defaults.startDate)+'T00:00:00');const now=new Date();
 if(Number.isNaN(start.getTime())||start>now)return;
 let y=now.getFullYear()-start.getFullYear(),m=now.getMonth()-start.getMonth(),d=now.getDate()-start.getDate();
 if(d<0){m--;d+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}if(m<0){y--;m+=12}
 $('years').textContent=y;$('months').textContent=m;$('days').textContent=d;
 $('hours').textContent=String(now.getHours()).padStart(2,'0');
}
function renderHome(){
 $('coupleTitle').value=data.title;$('heroPhrase').value=data.phrase;
 $('counterMessage').textContent=data.counterPhrase;
 document.querySelector('.hero h1').innerHTML=data.title.replace('&','<em>&</em><br>');
 document.querySelector('.hero-subtitle').textContent=data.phrase;
 $('reasonText').textContent=data.reasons[reasonIndex%data.reasons.length]||'O amor mora nos detalhes.';
 updateCounter();
}
$('nextReason').onclick=()=>{reasonIndex++;$('reasonText').textContent=data.reasons[reasonIndex%data.reasons.length]||'O amor mora nos detalhes.'};
function renderTimeline(){
 $('timelineList').innerHTML=data.timeline.map((x,i)=>`<article class="timeline-item"><div class="timeline-dot">${i+1}</div><div class="timeline-content"><span class="tag">${esc(x.tag)}</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div></article>`).join('');
}
function renderCoupons(){
 $('couponList').innerHTML=data.coupons.map((x,i)=>`<article class="coupon ${x.used?'redeemed':''}"><div class="coupon-icon">♡</div><div class="coupon-copy"><span class="section-kicker">UM MIMO PARA VOCÊ</span><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p><button class="${x.used?'soft-btn':'coupon-btn'}" data-coupon="${i}">${x.used?'Resgatado ✓':'Resgatar este carinho 🎟'}</button></div></article>`).join('');
 document.querySelectorAll('[data-coupon]').forEach(b=>b.onclick=()=>{const c=data.coupons[+b.dataset.coupon];if(!c.used){c.used=true;save();renderCoupons();modal('Cupom resgatado! 🎉',`Você resgatou: ${c.title}. Tire um print e mande para o Luiz combinar esse momento com você. ❤️`)}});
}
function renderGallery(){
 $('galleryGrid').innerHTML=data.photos.map(x=>`<article class="photo-card">${x.url?`<img src="${esc(x.url)}" alt="">`:'<div class="photo-placeholder">♡<small>UMA LEMBRANÇA</small></div>'}<div class="photo-caption"><b>${esc(x.label)}</b><p>${esc(x.caption)}</p></div></article>`).join('');
}
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderSettings(){
 $('coupleTitle').value=data.title;$('heroPhrase').value=data.phrase;$('startDate').value=data.startDate;$('counterPhrase').value=data.counterPhrase;$('reasonsInput').value=data.reasons.join('\n');
 $('timelineEditor').innerHTML=data.timeline.map((x,i)=>`<div class="editor-item"><b>Lembrança ${i+1}</b><input data-tl="tag" data-i="${i}" placeholder="Categoria" value="${esc(x.tag)}"><input data-tl="title" data-i="${i}" placeholder="Título" value="${esc(x.title)}"><textarea data-tl="desc" data-i="${i}" placeholder="Descrição">${esc(x.desc)}</textarea><button class="remove-btn" data-remove-tl="${i}">Remover</button></div>`).join('');
 $('couponEditor').innerHTML=data.coupons.map((x,i)=>`<div class="editor-item"><b>Cupom ${i+1}</b><input data-cp="title" data-i="${i}" value="${esc(x.title)}"><textarea data-cp="desc" data-i="${i}">${esc(x.desc)}</textarea><label class="checkline"><input type="checkbox" data-cp="used" data-i="${i}" ${x.used?'checked':''}> Já resgatado</label><button class="remove-btn" data-remove-cp="${i}">Remover</button></div>`).join('');
 $('galleryEditor').innerHTML=data.photos.map((x,i)=>`<div class="editor-item"><b>Foto ${i+1}</b><input data-ph="label" data-i="${i}" placeholder="Legenda curta" value="${esc(x.label)}"><textarea data-ph="caption" data-i="${i}" placeholder="Frase">${esc(x.caption)}</textarea><input data-ph="url" data-i="${i}" placeholder="URL pública da imagem" value="${esc(x.url)}"><button class="remove-btn" data-remove-ph="${i}">Remover</button></div>`).join('');
 document.querySelectorAll('[data-tl]').forEach(el=>el.oninput=()=>data.timeline[+el.dataset.i][el.dataset.tl]=el.value);
 document.querySelectorAll('[data-cp]').forEach(el=>el.onchange=()=>data.coupons[+el.dataset.i][el.dataset.cp]=el.type==='checkbox'?el.checked:el.value);
 document.querySelectorAll('[data-cp]:not([type=checkbox])').forEach(el=>el.oninput=()=>data.coupons[+el.dataset.i][el.dataset.cp]=el.value);
 document.querySelectorAll('[data-ph]').forEach(el=>el.oninput=()=>data.photos[+el.dataset.i][el.dataset.ph]=el.value);
 document.querySelectorAll('[data-remove-tl]').forEach(b=>b.onclick=()=>{data.timeline.splice(+b.dataset.removeTl,1);renderSettings()});
 document.querySelectorAll('[data-remove-cp]').forEach(b=>b.onclick=()=>{data.coupons.splice(+b.dataset.removeCp,1);renderSettings()});
 document.querySelectorAll('[data-remove-ph]').forEach(b=>b.onclick=()=>{data.photos.splice(+b.dataset.removePh,1);renderSettings()});
}
$('addTimeline').onclick=()=>{data.timeline.push({tag:'Nova lembrança',title:'Um momento especial',desc:'Conte aqui essa lembrança.'});renderSettings()};
$('addCoupon').onclick=()=>{data.coupons.push({title:'Novo cupom',desc:'Descreva esse carinho.',used:false});renderSettings()};
$('addPhoto').onclick=()=>{data.photos.push({label:'LEMBRANÇA',caption:'Uma frase especial.',url:''});renderSettings()};
$('saveSettings').onclick=()=>{
 data.title=$('coupleTitle').value;data.phrase=$('heroPhrase').value;data.startDate=$('startDate').value;data.counterPhrase=$('counterPhrase').value;
 data.reasons=$('reasonsInput').value.split('\n').map(x=>x.trim()).filter(Boolean);
 save();renderHome();renderTimeline();renderCoupons();renderGallery();toast('Tudo salvo neste aparelho! 💗');
};
$('exportBackup').onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='luiz-kamila-backup.json';a.click();URL.revokeObjectURL(a.href)};
$('importBackup').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{data={...clone(defaults),...JSON.parse(await f.text())};save();renderAll();toast('Backup restaurado!')}catch{toast('Não foi possível ler esse backup.')}};
function renderAll(){renderHome();renderTimeline();renderCoupons();renderGallery()}
renderAll();setInterval(updateCounter,60000);
