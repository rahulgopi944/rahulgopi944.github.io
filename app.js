/* =========================================================
   SETTINGS — fill in when the email addresses are ready.
   Forms send through FormSubmit.co. Leave "" to show a
   friendly "please call us" message instead of sending.
   ========================================================= */
const CONFIG = {
  hireEmail: "",   // hiring & consulting enquiries, e.g. "sales@rasnode.com"
  cvEmail:   ""    // CV submissions, e.g. "hr@rasnode.com"
};

(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const PHONES='+91 90724 99072 or +91 97467 99493';
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));

  /* ---------- Reveal on scroll ---------- */
  const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);} }),{threshold:.18,rootMargin:'0px 0px -40px 0px'});
  $$('.rv,.step-ill,.fvis,.ras-art,[data-watch]').forEach(el=>io.observe(el));

  /* ---------- Nav ---------- */
  const nav=$('.navbar'), mbar=$('#mbar'), burger=$('#burger');
  const onScroll=()=>{ nav.classList.toggle('scrolled',scrollY>10); if(mbar) mbar.classList.toggle('show',scrollY>innerHeight*.5); };
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  burger.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',o);});
  $$('.mmenu a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));

  /* ---------- Hero toasts ---------- */
  const toast=$('#toast');
  if(toast){
    const items=[
      ['Shortlist sent','Retail · Store Manager'],
      ['Offer accepted','Healthcare · Front Office Executive'],
      ['Interview booked','Manufacturing · Production Supervisor'],
      ['Shortlist sent','IT · Software Developer'],
      ['Offer accepted','Finance · Accounts Executive'],
      ['New system live','IT consulting · Team onboarded'],
      ['Interview booked','Logistics · Operations Executive']
    ];
    let i=0;
    if(!reduce) setInterval(async()=>{
      toast.classList.add('swap'); await sleep(380);
      i=(i+1)%items.length; $('b',toast).textContent=items[i][0]; $('small',toast).textContent=items[i][1];
      toast.classList.remove('swap');
    },3200);
  }

  /* ---------- Hero candidate card & industry chips ---------- */
  const cr=$('#candRole'), ct=$('#candTags'), chips=$$('#ichips span');
  if(cr){
    const C=[['Store Manager · Retail',['Team lead','Sales','6 yrs'],0],['Staff Nurse · Healthcare',['Patient care','Shifts','4 yrs'],1],['Production Supervisor · Manufacturing',['Quality','Safety','8 yrs'],2],['Software Developer · IT',['React','APIs','5 yrs'],3],['Accounts Executive · Finance',['Tally','GST','3 yrs'],4],['Operations Executive · Logistics',['Dispatch','Vendors','5 yrs'],5],['Guest Relations · Hospitality',['Front office','Languages','2 yrs'],6]];
    const card=cr.closest('.vcard'); let k=0;
    const show=()=>{ chips.forEach((c,i)=>c.classList.toggle('on',i===C[k][2])); };
    show();
    if(!reduce) setInterval(async()=>{
      card.classList.add('swap'); await sleep(350);
      k=(k+1)%C.length; cr.textContent=C[k][0]; ct.innerHTML=C[k][1].map(t=>`<span>${t}</span>`).join(''); show();
      card.classList.remove('swap');
    },3600);
  }


  /* ---------- Hero open-roles panel ---------- */
  const rl=$('#roleList');
  if(rl){
    const rows=$$('.role',rl), ST=['Sourcing','Screening','Shortlisted','Interview'];
    const paint=r=>{ const n=+r.dataset.s; $$('.seg i',r).forEach((s,i)=>s.classList.toggle('f',i<=n)); $('em',r).textContent=ST[n]; };
    rows.forEach(paint); let k=0; rows[0].classList.add('on');
    if(!reduce) setInterval(()=>{
      rows[k].classList.remove('on'); k=(k+1)%rows.length;
      const r=rows[k]; r.dataset.s=(+r.dataset.s+1)%4; paint(r); r.classList.add('on');
    },2200);
  }

  /* ---------- Hero tile spotlight ---------- */
  const tl=$$('.nd');
  if(tl.length && !reduce){ let t=0; setInterval(()=>{ tl.forEach(x=>x.classList.remove('lit')); tl[t=(t+1)%tl.length].classList.add('lit'); const co=$('#codeOut'); if(co){co.textContent=['→ shortlisted','→ interview booked','→ offer accepted','→ placed'][t%4];} },1300); tl[0].classList.add('lit'); }

  /* ---------- Hero pipeline board ---------- */
  const board=$('#board');
  if(board){
    const P=[['Store Manager','Retail'],['Staff Nurse','Healthcare'],['Java Developer','IT'],['Warehouse Lead','Logistics'],['Accounts Executive','Finance'],['Production Supervisor','Manufacturing'],['Chef de Partie','Hospitality'],['Science Teacher','Education'],['QA Engineer','IT'],['Site Engineer','Construction'],['Sales Executive','FMCG'],['Front Office Executive','Hospitality']];
    let n=0; const cols=[[],[],[]];
    const mk=()=>{const p=P[n++%P.length],el=document.createElement('div');el.className='bc';
      el.innerHTML=`<div class="av">${p[0].split(' ').map(w=>w[0]).slice(0,2).join('')}</div><b>${p[0]}</b><small>${p[1]}</small>`;board.appendChild(el);return el;};
    const lay=()=>cols.forEach((c,ci)=>c.forEach((el,ri)=>{el.style.setProperty('--c',ci);el.style.setProperty('--r',ri);el.classList.toggle('off',ci===2);}));
    const add=(ci)=>{const el=mk();cols[ci].push(el);lay();requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));};
    [0,0,0,1,1,2].forEach(add);
    const tick=()=>{
      const gone=cols[2].shift(); if(gone){gone.classList.remove('in');setTimeout(()=>gone.remove(),600);}
      if(cols[1].length) cols[2].push(cols[1].shift());
      if(cols[0].length) cols[1].push(cols[0].shift());
      lay();
      if(cols[0].length<3) setTimeout(()=>add(0),500);
    };
    if(!reduce) setInterval(tick,2200);
  }

  /* ---------- Hero industry index ---------- */
  const ixl=$('#ixl');
  if(ixl){
    const rows=$$('.ix',ixl), nEl=$('#ixn'); let k=0;
    const set=i=>{ rows.forEach(r=>r.classList.remove('on')); void ixl.offsetWidth; rows[i].classList.add('on'); nEl.textContent=String(i+1).padStart(2,'0'); };
    set(0);
    if(!reduce) setInterval(()=>{ k=(k+1)%rows.length; set(k); },2400);
    rows.forEach((r,i)=>r.addEventListener('mouseenter',()=>{k=i;set(i);}));
  }

  /* ---------- Scroll progress ---------- */
  (()=>{ const bar=document.createElement('div'); bar.className='sprog'; document.body.appendChild(bar);
    const f=()=>{ const h=document.documentElement.scrollHeight-innerHeight; bar.style.transform=`scaleX(${h>0?Math.min(1,scrollY/h):0})`; };
    addEventListener('scroll',f,{passive:true}); f(); })();

  /* ---------- Step illustrations ---------- */
  // toggles flip on one by one
  $$('.brief').forEach(b=>{
    const sws=$$('.sw',b); let k=0;
    const run=()=>{ if(reduce){sws.forEach(s=>s.classList.add('on'));return;}
      setInterval(()=>{ sws.forEach(s=>s.classList.remove('on')); k=(k+1)%sws.length; sws[k].classList.add('on'); if(k===sws.length-1) sws[0].classList.add('on'); },1800); sws[0].classList.add('on'); };
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){run();o.disconnect();}}).observe(b);
  });
  // profiles get checked
  $$('.stack').forEach(st=>{
    const ps=$$('.prof',st);
    ps.forEach((p,i)=>p.style.transform=`translateY(${i*62}px)`);
    const run=async()=>{
      while(true){
        for(const p of ps){ await sleep(reduce?0:650); p.classList.add('ok'); }
        if(reduce) return;
        await sleep(1800); ps.forEach(p=>p.classList.remove('ok')); await sleep(500);
      }
    };
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){run();o.disconnect();}}).observe(st);
  });
  // big switch
  $$('.big-sw').forEach(s=>{
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){setTimeout(()=>s.classList.add('on'),500);o.disconnect();}},{threshold:.6}).observe(s);
    s.closest('.box')?.addEventListener('click',()=>s.classList.toggle('on'));
  });

  /* ---------- Card carousel ---------- */
  $$('[data-carousel]').forEach(c=>{
    const track=$('.track',c), prev=$('.prev',c), next=$('.next',c);
    const step=()=>($('.scard',track)?.offsetWidth||320)+16;
    const upd=()=>{ prev.disabled=track.scrollLeft<10; next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-10; };
    prev.addEventListener('click',()=>track.scrollBy({left:-step(),behavior:'smooth'}));
    next.addEventListener('click',()=>track.scrollBy({left:step(),behavior:'smooth'}));
    track.addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd();
  });

  /* ---------- Roles wheel ---------- */
  const wheel=$('#wheel');
  if(wheel){
    const lis=$$('li',wheel); let cur=0, timer;
    const layout=()=>{
      const n=lis.length, gap=innerWidth<600?60:72;
      lis.forEach((li,i)=>{
        let d=i-cur; if(d>n/2) d-=n; if(d<-n/2) d+=n;
        const ad=Math.abs(d);
        li.style.transform=`translateY(calc(-50% + ${d*gap}px))`;
        li.style.opacity=ad>3?0:1-ad*.28;
        li.style.fontSize=(ad===0?40:ad===1?30:24)+'px';
        li.style.color=ad===0?'':'#9aa1b0';
        li.classList.toggle('cur',ad===0);
      });
    };
    const go=i=>{cur=(i+lis.length)%lis.length;layout();};
    const auto=()=>{clearInterval(timer); if(!reduce) timer=setInterval(()=>go(cur+1),1900);};
    layout(); auto(); addEventListener('resize',layout);
    lis.forEach((li,i)=>li.addEventListener('click',()=>{go(i);auto();}));
    const inp=$('#rinput'), hint=$('#rhint'), sug=$('#rsug');
    let ROLES=window.ROLES||[];
    if(!ROLES.length){ const sc=document.createElement('script'); sc.src='roles.js'; sc.onload=()=>{ROLES=window.ROLES||[];}; document.head.appendChild(sc); }
    const norm=s=>s.toLowerCase().replace(/[^a-z0-9+#. ]/g,' ').replace(/\s+/g,' ').trim();
    const SYN={dev:'developer',sde:'software engineer',hr:'human resources hr',cook:'chef',nurse:'nurse nursing',doc:'doctor',ca:'chartered accountant',cs:'company secretary',ui:'ui ux designer',ux:'ui ux designer',qa:'qa tester testing',ml:'machine learning',ai:'ai',driver:'driver',sales:'sales',teacher:'teacher'};
    const search=q=>{
      q=norm(q); if(q.length<2||!ROLES.length) return [];
      const qs=(SYN[q]?SYN[q]+' '+q:q).split(' ').filter(Boolean);
      const out=[];
      for(const r of ROLES){
        const t=norm(r[0]); let sc=0;
        if(t===q) sc=100; else if(t.startsWith(q)) sc=60; else if(t.split(' ').some(w=>w.startsWith(q))) sc=40; else if(t.includes(q)) sc=25;
        else if(qs.length>1 && qs.every(w=>t.includes(w))) sc=20;
        else if(SYN[q] && SYN[q].split(' ').some(w=>w.length>2&&t.includes(w))) sc=8;
        if(sc) out.push([sc,r]);
      }
      return out.sort((x,y)=>y[0]-x[0]||x[1][0].length-y[1][0].length).map(x=>x[1]);
    };
    const say=(r,more)=>{
      hint.innerHTML=`Yes, we hire <b>${r[0]}</b> <span style="opacity:.7">· ${r[1]}</span>${more>0?` and ${more} similar roles`:''}. <a class="tlink" href="contact.html#cv">Send your CV</a> or <a class="tlink" href="contact.html#hire">share a requirement</a>.`;
    };
    const close=()=>{sug.hidden=true;sug.innerHTML='';};
    const pick=r=>{ inp.value=r[0]; close(); const k=lis.findIndex(l=>norm(l.dataset.k).includes(norm(r[0]).split(' ')[0])); if(k>=0) go(k); clearInterval(timer); say(r,0); };
    const find=()=>{
      const q=inp.value.trim(); if(!q){hint.textContent='';close();return;}
      const res=search(q);
      if(res.length){
        clearInterval(timer);
        sug.innerHTML=res.slice(0,8).map((r,i)=>`<li role="option" data-i="${i}"><b>${r[0]}</b><small>${r[1]}</small></li>`).join('');
        sug.hidden=false;
        sug._r=res.slice(0,8);
        hint.textContent=res.length+(res.length===1?' matching title':' matching titles')+', pick one below';
      } else {
        close();
        hint.innerHTML=`We didn't find that exact title, but we hire across every industry. <a class="tlink" href="contact.html#hire">Tell us what you need</a> and our team will take it from there.`;
      }
    };
    sug.addEventListener('click',e=>{const li=e.target.closest('li'); if(li) pick(sug._r[+li.dataset.i]);});
    document.addEventListener('click',e=>{ if(!e.target.closest('#rform')) close(); });
    inp.addEventListener('input',()=>{ if(inp.value.trim().length>1) find(); else {hint.textContent='';close();auto();} });
    inp.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    $('#rform').addEventListener('submit',e=>{e.preventDefault();const r=search(inp.value); if(r.length) pick(r[0]); else find();});
  }

  /* ---------- FAQ accordion (smooth) ---------- */
  $$('.faq details').forEach(d=>{
    const s=$('summary',d), a=$('.ans',d);
    if(d.open) a.style.height='auto';
    s.addEventListener('click',e=>{
      e.preventDefault();
      if(d.open){ a.style.height=a.scrollHeight+'px'; requestAnimationFrame(()=>a.style.height='0'); setTimeout(()=>d.open=false,reduce?0:450); }
      else{ $$('.faq details[open]').forEach(o=>{ if(o!==d){ const oa=$('.ans',o); oa.style.height=oa.scrollHeight+'px'; requestAnimationFrame(()=>oa.style.height='0'); setTimeout(()=>o.open=false,450);} });
        d.open=true; a.style.height='0'; requestAnimationFrame(()=>{a.style.height=a.scrollHeight+'px';}); setTimeout(()=>{ if(d.open) a.style.height='auto'; },reduce?0:460); }
    });
  });

  /* ---------- Consulting attendance grid ---------- */
  const att=$('#att');
  if(att){
    const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    att.innerHTML='<div class="att-row"><span></span>'+days.map(d=>`<span style="text-align:center">${d}</span>`).join('')+'</div>'+
      ['Team A','Team B','Team C','Team D','Team E'].map((t,ri)=>`<div class="att-row"><span>${t}</span>`+days.map((d,di)=>{const c=di>4?'':(((ri*3+di*5)%7===0)?'l':'p');return `<b class="${c}" style="transition-delay:${(ri*7+di)*.03}s"></b>`;}).join('')+'</div>').join('');
  }

  /* ---------- Contact: tabs, file, forms ---------- */
  const tabs=$('#tabs');
  if(tabs){
    if(CONFIG.hireEmail||CONFIG.cvEmail){
      $('#emailItem').hidden=false;
      $('#emailLinks').innerHTML=[...new Set([CONFIG.hireEmail,CONFIG.cvEmail].filter(Boolean))].map(e=>`<a href="mailto:${e}">${e}</a>`).join('');
    }
    const setTab=t=>{tabs.dataset.active=t;$$('button',tabs).forEach(b=>{const on=b.dataset.t===t;b.classList.toggle('on',on);b.setAttribute('aria-selected',on);});$('#f-hire').classList.toggle('on',t==='hire');$('#f-cv').classList.toggle('on',t==='cv');};
    $$('button',tabs).forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.t)));
    const fromHash=()=>{const h=location.hash.replace('#','');
      if(h==='cv') setTab('cv'); else if(h==='hire'||h==='software'){ setTab('hire'); if(h==='software'){const s=$('#h-need'); if(s&&!s.value) s.value='IT consulting';} } };
    fromHash(); addEventListener('hashchange',fromHash);

    const dz=$('#dropzone'), fi=$('#c-file'), fl=$('#fileLabel');
    const showFile=()=>{fl.textContent=fi.files[0]?('✓ '+fi.files[0].name):'Click to upload or drop your CV here';};
    fi.addEventListener('change',showFile);
    ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));
    ['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));
    dz.addEventListener('drop',e=>{if(e.dataTransfer.files.length){fi.files=e.dataTransfer.files;showFile();}});

    $$('form[data-kind]').forEach(f=>{
      $$('input,select',f).forEach(i=>i.addEventListener('input',()=>i.closest('.field')?.classList.remove('bad')));
      f.addEventListener('submit',async e=>{
        e.preventDefault();
        const st=$('.status',f), btn=$('button[type=submit]',f), say=(c,m)=>{st.className='status show '+c;st.textContent=m;};
        const bad=$$(':invalid',f).filter(x=>x.matches('input,select,textarea'));
        $$('.field',f).forEach(x=>x.classList.remove('bad'));
        if(bad.length){bad.forEach(x=>{const fd=x.closest('.field');if(fd){void fd.offsetWidth;fd.classList.add('bad');}});bad[0].focus();say('err','Please fill in the required fields marked *.');return;}
        const file=$('input[type=file]',f);
        if(file&&file.files[0]&&file.files[0].size>5*1024*1024){say('err','Your CV is larger than 5 MB. Please upload a smaller file.');return;}
        const to=f.dataset.kind==='cv'?(CONFIG.cvEmail||CONFIG.hireEmail):(CONFIG.hireEmail||CONFIG.cvEmail);
        if(!to){say('info','Thanks! Online submissions open very soon. Until then, please call us on '+PHONES+'.');return;}
        btn.disabled=true;const old=btn.innerHTML;btn.textContent='Sending…';
        try{
          const fd=new FormData(f);fd.append('_subject',f.dataset.subject);fd.append('_template','table');fd.append('_captcha','false');
          const r=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(to),{method:'POST',body:fd,headers:{Accept:'application/json'}});
          const j=await r.json().catch(()=>({}));
          if(!r.ok||j.success===false||j.success==='false') throw 0;
          say('ok','Thank you! Your '+(f.dataset.kind==='cv'?'CV':'enquiry')+' has reached us. We’ll be in touch soon.');
          f.reset(); file&&showFile();
        }catch(_){say('err','Sorry, we couldn’t send that just now. Please try again, or call us on '+PHONES+'.');}
        finally{btn.disabled=false;btn.innerHTML=old;}
      });
    });
  }

  const yr=$('#yr'); if(yr) yr.textContent=new Date().getFullYear();
})();
