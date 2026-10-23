(()=>{'use strict';const rail=document.querySelector('.rail'),box=document.querySelector('.lightbox');let previous;document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{previous=b;box.querySelector('img').src=b.dataset.photo;box.querySelector('img').alt=b.querySelector('img').alt;box.showModal()}));if(box){box.querySelector('button').addEventListener('click',()=>box.close());box.addEventListener('click',e=>{if(e.target===box)box.close()});box.addEventListener('close',()=>previous?.focus())}if(rail){
 const items=rail.querySelectorAll('[data-photo]');
 rail.classList.toggle('rail-pair',items.length===2);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 let paused=reduced.matches,hover=false,keyboard=false,until=0,last=0,direction=1,visible=false,position=rail.scrollLeft;
 const pause=document.querySelector('[data-pause]');
 const controls=document.querySelector('.controls');
 if(items.length<2&&controls)controls.hidden=true;
 function toggle(){if(!pause)return;pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Paleisti galeriją':'Pristabdyti galeriją');pause.setAttribute('aria-pressed',String(paused))}
 function delay(){until=performance.now()+5000;position=rail.scrollLeft}
 function move(sign){delay();direction=sign;rail.scrollBy({left:sign*(items[0]?.getBoundingClientRect().width||rail.clientWidth*.7),behavior:reduced.matches?'instant':'smooth'})}
 document.querySelector('[data-prev]')?.addEventListener('click',()=>move(-1));
 document.querySelector('[data-next]')?.addEventListener('click',()=>move(1));
 toggle();pause?.addEventListener('click',()=>{paused=!paused;position=rail.scrollLeft;toggle()});
 reduced.addEventListener('change',e=>{paused=e.matches;toggle()});
 new IntersectionObserver(es=>visible=es[0].isIntersecting).observe(rail);
 rail.addEventListener('mouseenter',()=>{if(fine.matches)hover=true});
 rail.addEventListener('mouseleave',()=>hover=false);
 rail.addEventListener('keydown',()=>keyboard=true);
 rail.addEventListener('focusout',e=>{if(!rail.contains(e.relatedTarget))keyboard=false});
 ['pointerdown','touchstart','wheel'].forEach(t=>rail.addEventListener(t,()=>{keyboard=false;delay()},{passive:true}));
 rail.addEventListener('scroll',()=>{if(performance.now()<until||hover||keyboard||paused)position=rail.scrollLeft},{passive:true});
 window.addEventListener('resize',()=>{position=rail.scrollLeft});
 function tick(now){
  const dt=last?Math.min(now-last,50):0;last=now;
  if(visible&&!paused&&!hover&&!keyboard&&now>until&&!document.hidden&&!box?.open){
   const max=rail.scrollWidth-rail.clientWidth;
   if(max>2){
    position=Math.min(max,Math.max(0,position+direction*dt*.038));
    rail.scrollLeft=position;
    if(position>=max){direction=-1;until=now+900}
    else if(position<=0){direction=1;until=now+900}
   }
  }else position=rail.scrollLeft;
  requestAnimationFrame(tick)
 }
 requestAnimationFrame(tick)
}const search=document.querySelector('[data-search]');if(search){search.addEventListener('input',()=>{const q=search.value.toLocaleLowerCase('lt').trim();let count=0;document.querySelectorAll('.catalog-card').forEach(c=>{c.hidden=!c.dataset.search.includes(q);if(!c.hidden)count++});document.querySelector('.empty-search').style.display=count?'none':'block'})}})();
