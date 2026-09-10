const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if(e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); } });
const cards = [...document.querySelectorAll('[data-category]')];
function filter(category) {
 let count=0;
 cards.forEach(c=>{c.hidden=category!=='all'&&!c.dataset.category.split(' ').includes(category);if(!c.hidden)count++;});
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
 document.querySelector('.filter-count').textContent=`${count} projects`;
 document.querySelector('#hardware').hidden=!cards.some(c=>c.classList.contains('hardware-card')&&!c.hidden);
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
document.querySelectorAll('.highlight-grid a').forEach(a=>a.addEventListener('click',()=>filter('all')));
filter('all');
const dialog=document.querySelector('#image-dialog');let opener;
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||!a.getAttribute('href')?.match(/^(images|documents)\/.*\.(png|jpg|webp)$/i)||e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();opener=a;const img=dialog.querySelector('img');img.src=a.href;img.alt=a.querySelector('img')?.alt||'Document preview';dialog.querySelector('p').textContent=img.alt;dialog.showModal();});
dialog.querySelector('button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>opener?.focus());

// Link the homepage CV action to the current engineering CV hosted in this portfolio.
const cvLink = [...document.querySelectorAll('a')].find(a => a.textContent.trim().startsWith('Request CV'));
if (cvLink) {
  cvLink.href = 'documents/CV_Engineering_AI_Robotics_2026.html';
  cvLink.textContent = 'View Engineering CV ↗';
  cvLink.removeAttribute('target');
}
