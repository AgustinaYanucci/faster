/* =========================================================
   FASTER · escenas de fondo (SVG animado por tiempo, sin librerías)
   Cada escena define build() -> HTML y update(raiz, t) -> dibuja el instante t (segundos).
   ========================================================= */
/* ===== Escenas de fondo (SVG animado por tiempo) ===== */
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const eIO=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
const eOut=x=>1-Math.pow(1-x,3);
const eIn=x=>x*x;
const lerp=(a,b,u)=>a+(b-a)*u;
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const Q=(r,k)=>r.querySelector('[data-k="'+k+'"]');
function band(x0,x1,yT,yB,amp,len){const n=Math.max(1,Math.round((x1-x0)/len)),l=(x1-x0)/n;let d=`M${x0} ${yT}`;
  for(let i=0;i<n;i++)d+=` q${l/4} ${-amp} ${l/2} 0 t${l/2} 0`;d+=` L${x1} ${yB}`;
  for(let i=0;i<n;i++)d+=` q${-l/4} ${amp} ${-l/2} 0 t${-l/2} 0`;return d+'Z'}
const seeds=(n,seed,fn)=>{const r=rng(seed);let s='';for(let i=0;i<n;i++)s+=fn(r,i);return s};
const GRAD=(id,a,b,vert=true)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${vert?0:1}" y2="${vert?1:0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const SCENES={};

/* --- Lomito cortado a la mitad --- */
SCENES.lomito={dur:9.4,still:4.6,
build(){
  const layers=`<g id="lm-layers">
    <path d="M105 400H495C495 452 470 468 440 468H160C130 468 105 452 105 400Z" fill="url(#lm-bb)"/>
    <path d="${band(112,488,352,402,3,26)}" fill="url(#lm-st)" stroke="#6d3a20" stroke-width="2"/>
    ${seeds(7,3,(r,i)=>`<path d="M${135+i*48} 362l22 26" stroke="#4a2412" stroke-width="5" stroke-linecap="round" opacity=".55"/>`)}
    <path d="M130 328C112 332 118 346 150 350H450C484 346 488 332 470 328C420 322 180 322 130 328Z" fill="#fffaf0" stroke="#e5dcc8" stroke-width="1.5"/>
    <path d="M240 330C250 312 350 312 360 330Z" fill="#f2a60c"/><ellipse cx="282" cy="324" rx="14" ry="5" fill="#fff3b0" opacity=".7"/>
    <path d="M120 312H480V326H436L424 344L412 326H230L216 340L204 326H120Z" fill="#f6c431" stroke="#d99e12" stroke-width="1.5"/>
    <path d="${band(110,490,298,314,3,28)}" fill="#eba3a2" stroke="#cf7b7c" stroke-width="1.5"/>
    ${[0,1,2,3].map(i=>`<rect x="${122+i*90}" y="280" width="84" height="22" rx="11" fill="#d94430"/><rect x="${132+i*90}" y="287" width="64" height="7" rx="3.5" fill="#f0735a"/>`).join('')}
    <path d="${band(94,506,262,284,6,30)}" fill="#7db247" stroke="#5a8d33" stroke-width="2"/>
    <path d="M105 266C105 204 170 190 300 190C430 190 495 204 495 266Z" fill="url(#lm-bt)" stroke="#a8692b" stroke-width="2"/>
    <path d="M110 256H490V268H110Z" fill="#f1d194"/>
  </g>`;
  return `<svg viewBox="0 0 600 600" role="img"><defs>
    ${GRAD('lm-bt','#eab76f','#c88a3e')}${GRAD('lm-bb','#d99d51','#b9772f')}${GRAD('lm-st','#a9623a','#7a4326')}${GRAD('lm-kn','#9aa3aa','#f4f7f9',false)}
    ${layers}
    <clipPath id="lm-cL"><rect x="0" y="0" width="300" height="700"/></clipPath><clipPath id="lm-cR"><rect x="300" y="0" width="300" height="700"/></clipPath>
    <clipPath id="lm-ab"><rect data-k="ab" x="-200" y="0" width="1000" height="130"/></clipPath><clipPath id="lm-be"><rect data-k="be" x="-200" y="130" width="1000" height="700"/></clipPath>
  </defs>
  <g data-k="all">
    <ellipse cx="300" cy="494" rx="270" ry="22" fill="#000" opacity=".35"/>
    <rect x="50" y="468" width="500" height="30" rx="8" fill="#6b4a2e"/><rect x="50" y="468" width="500" height="6" rx="3" fill="#8a6540"/>
    <g clip-path="url(#lm-be)"><path d="M100 266C100 196 175 186 300 186C425 186 500 196 500 266V440C500 462 482 470 452 470H148C118 470 100 462 100 440Z" fill="url(#lm-bt)" stroke="#a8692b" stroke-width="2"/>
      <ellipse cx="240" cy="226" rx="90" ry="14" fill="#fff" opacity=".18"/>
      <path d="${band(96,504,268,280,4,30)}" fill="#7db247"/><rect x="98" y="304" width="12" height="12" rx="4" fill="#f6c431"/><rect x="490" y="304" width="12" height="12" rx="4" fill="#f6c431"/></g>
    <g clip-path="url(#lm-ab)"><g data-k="hl" clip-path="url(#lm-cL)"><use href="#lm-layers"/></g><g data-k="hr" clip-path="url(#lm-cR)"><use href="#lm-layers"/></g>
      <line data-k="cut" x1="300" y1="190" x2="300" y2="468" stroke="#000" stroke-opacity=".28" stroke-width="2"/></g>
    <g data-k="steam" fill="none" stroke="#f1ece2" stroke-width="4" stroke-linecap="round" opacity="0">
      <path d="M215 170q-14-26 0-48t0-44"/><path d="M300 160q-14-26 0-48t0-44"/><path d="M385 170q-14-26 0-48t0-44"/></g>
    <g data-k="knife"><rect x="287" y="-430" width="26" height="140" rx="12" fill="#2b2420"/><circle cx="300" cy="-340" r="4" fill="#d9a441"/><circle cx="300" cy="-390" r="4" fill="#d9a441"/>
      <path d="M274 -300H326V-20Q326 -4 300 0Q274 -4 274 -20Z" fill="url(#lm-kn)" stroke="#7d868d" stroke-width="1.5"/><path d="M286 -290V-20" stroke="#fff" stroke-opacity=".7" stroke-width="3"/></g>
  </g></svg>`},
update(r,t){
  Q(r,'all').style.opacity=seg(t,0,.5)*(1-seg(t,8.3,9));
  const dn=eIO(seg(t,.9,2.2)),sep=eIO(seg(t,2.6,4.0)),tip=130+350*dn,up=eIO(seg(t,2.3,3.1));
  const reveal=t<2.25?tip:700;
  Q(r,'ab').setAttribute('height',reveal);Q(r,'be').setAttribute('y',reveal);
  const k=Q(r,'knife');k.setAttribute('transform',`translate(0 ${tip-700*up})`);k.style.opacity=seg(t,.85,1.05)*(1-seg(t,2.7,3.1));
  Q(r,'hl').setAttribute('transform',`translate(${-72*sep} 0) rotate(${-6*sep} 105 468)`);
  Q(r,'hr').setAttribute('transform',`translate(${72*sep} 0) rotate(${6*sep} 495 468)`);
  Q(r,'cut').style.opacity=clamp(1-sep*2);
  const st=Q(r,'steam');st.style.opacity=seg(t,3.6,4.6)*.4*(.75+.25*Math.sin(t*2.2));st.setAttribute('transform',`translate(0 ${-(t*9%14)})`);
}};

/* --- Milanesa: caen papas fritas junto al sándwich --- */
const FR=(()=>{const r=rng(11),a=[];for(let i=0;i<34;i++){const x=345+r()*185,peak=Math.max(0,1-Math.abs(x-435)/110);
  a.push({x,y:436-70*peak-r()*16,rot:(r()-.5)*150,len:30+r()*8,spin:(r()-.5)*260})}
  a.sort((p,q)=>q.y-p.y);return a})();
SCENES.milanesa={dur:9.6,still:6,
build(){
  return `<svg viewBox="0 0 600 600" role="img"><defs>${GRAD('mi-bt','#e6b06a','#c98a40')}${GRAD('mi-bb','#d89c52','#b9772f')}${GRAD('mi-mi','#d6933a','#b8731f')}${GRAD('mi-fr','#f7cd4a','#e8a91f',false)}</defs>
  <g data-k="all">
    <ellipse cx="300" cy="494" rx="270" ry="18" fill="#000" opacity=".35"/>
    <rect x="50" y="438" width="500" height="58" rx="16" fill="#b53b2b"/><rect x="50" y="438" width="500" height="8" rx="4" fill="#d4584a"/>
    <path d="M100 402H310C310 430 296 440 276 440H134C114 440 100 430 100 402Z" fill="url(#mi-bb)"/>
    ${[0,1,2].map(i=>`<rect x="${112+i*68}" y="390" width="66" height="18" rx="9" fill="#d94430"/>`).join('')}
    <path d="${band(92,318,372,396,6,26)}" fill="#7db247" stroke="#5a8d33" stroke-width="2"/>
    <path d="${band(76,334,336,378,4,18)}" fill="url(#mi-mi)" stroke="#8f5518" stroke-width="2"/>
    ${seeds(46,5,(r)=>`<circle cx="${90+r()*230}" cy="${342+r()*30}" r="${1.4+r()*2}" fill="${r()>.5?'#8f5518':'#edc16a'}" opacity=".8"/>`)}
    <path d="M100 342C100 278 150 268 205 268C260 268 310 278 310 342Z" fill="url(#mi-bt)" stroke="#a8692b" stroke-width="2"/>
    ${seeds(16,9,(r)=>`<ellipse cx="${135+r()*140}" cy="${284+r()*40}" rx="4" ry="2.2" fill="#f8e7c0" transform="rotate(${r()*60-30} 0 0)"/>`).replace(/transform="[^"]*"/g,'')}
    ${FR.map((f,i)=>`<g data-k="f${i}" opacity="0"><rect x="-6" y="-${f.len}" width="12" height="${f.len*2}" rx="3" fill="url(#mi-fr)" stroke="#c98a15" stroke-width="1"/></g>`).join('')}
  </g></svg>`},
update(r,t){
  Q(r,'all').style.opacity=seg(t,0,.4)*(1-seg(t,8.4,9.2));
  FR.forEach((f,i)=>{const d=.4+i*.12,u=seg(t,d,d+.85),el=Q(r,'f'+i);
    if(u<=0){el.setAttribute('opacity',0);return}
    const s=seg(t,d+.85,d+1.25),bounce=-9*Math.sin(Math.PI*s)*(1-s);
    const y=lerp(-160,f.y,eIn(u))+bounce;
    el.setAttribute('opacity',1);el.setAttribute('transform',`translate(${f.x} ${y}) rotate(${f.rot+(1-u)*f.spin})`)});
}};
/* --- Hamburguesa: los ingredientes caen y se arma --- */
const BL=[
 {h:46,d:`<path d="M-170 -46H170C170 -14 156 0 130 0H-130C-156 0 -170 -14 -170 -46Z" fill="url(#bg-bb)"/>`},
 {h:40,d:`<path d="${band(-165,165,-40,0,3,22)}" fill="url(#bg-pa)" stroke="#42210f" stroke-width="2"/>`+seeds(12,2,r=>`<circle cx="${-150+r()*300}" cy="${-34+r()*28}" r="2" fill="#2d1608" opacity=".5"/>`)},
 {h:14,d:`<path d="M-178 -12H178L196 6L170 6L150 0H-150L-170 6L-196 6Z" fill="#f6c431" stroke="#d99e12" stroke-width="1.5"/>`},
 {h:12,d:`<path d="${band(-176,176,-12,0,3,24)}" fill="#eba3a2" stroke="#cf7b7c" stroke-width="1.5"/>`},
 {h:30,d:`<path d="M-150 0C-170 -6 -165 -18 -120 -20C-60 -24 60 -24 120 -20C170 -18 170 -6 150 0Z" fill="#fffaf0" stroke="#e5dcc8" stroke-width="1.5"/><path d="M-58 -18C-50 -42 50 -42 58 -18Z" fill="#f2a60c"/><ellipse cx="-20" cy="-28" rx="12" ry="4" fill="#fff3b0" opacity=".7"/>`},
 {h:24,d:`<path d="${band(-190,190,-24,0,6,28)}" fill="#7db247" stroke="#5a8d33" stroke-width="2"/>`},
 {h:18,d:[-1,0,1].map(i=>`<rect x="${i*108-52}" y="-18" width="104" height="17" rx="8.5" fill="#d94430"/><rect x="${i*108-42}" y="-13" width="84" height="5" rx="2.5" fill="#f0735a"/>`).join('')},
 {h:74,d:`<path d="M-170 0C-170 -58 -110 -74 0 -74C110 -74 170 -58 170 0Z" fill="url(#bg-bt)" stroke="#a8692b" stroke-width="2"/><path d="M-170 0H170V-6H-170Z" fill="#f1d194"/>`+seeds(18,4,r=>{const x=-120+r()*240,y=-62+r()*40;return `<ellipse cx="${x}" cy="${y}" rx="5" ry="2.6" fill="#f8e7c0"/>`})}
];
(()=>{let c=470;BL.forEach((l,i)=>{l.y=c;c-=l.h-(i?3:0)})})();
SCENES.hamburguesa={dur:9.6,still:6.4,
build(){
  return `<svg viewBox="0 0 600 600" role="img"><defs>${GRAD('bg-bt','#eab76f','#c88a3e')}${GRAD('bg-bb','#d99d51','#b9772f')}${GRAD('bg-pa','#7a4426','#55291a')}</defs>
  <g data-k="all"><ellipse cx="300" cy="492" rx="250" ry="26" fill="#000" opacity=".35"/>
   <ellipse cx="300" cy="478" rx="240" ry="26" fill="#e3dccf"/><ellipse cx="300" cy="474" rx="212" ry="17" fill="#f6f1e6"/>
   ${BL.map((l,i)=>`<g data-k="l${i}">${l.d}</g>`).join('')}</g></svg>`},
update(r,t){
  Q(r,'all').style.opacity=seg(t,0,.3)*(1-seg(t,8.4,9.2));
  BL.forEach((l,i)=>{const d=i?.5+(i-1)*.66:0,u=seg(t,d,d+.5),el=Q(r,'l'+i);
    if(i&&u<=0){el.setAttribute('opacity',0);return}
    const dy=i?-(l.y+150)*(1-eIn(u)):0,s=seg(t,d+.5,d+.95),sq=Math.sin(Math.PI*s)*(1-s);
    el.setAttribute('opacity',1);
    el.setAttribute('transform',`translate(300 ${l.y+dy}) rotate(${(1-u)*(i%2?5:-5)}) scale(${1+.05*sq} ${1-.12*sq})`)});
}};

/* --- Papas fritas con cheddar derretido --- */
const PF=(()=>{const r=rng(21),a=[];for(let i=0;i<28;i++){const x=206+i*(188/27)+(r()-.5)*8;
  a.push({x,len:150-Math.abs(x-300)*.45+r()*34,rot:(x-300)/190*17+(r()-.5)*7,ph:r()*6})}return a})();
const DR=[226,252,280,318,346,374,396].map((x,i)=>({x,L:[150,95,190,120,170,100,140][i],d:2.3+i*.28}));
SCENES.papas={dur:9.6,still:6.5,
build(){
  return `<svg viewBox="0 0 600 600" role="img"><defs>${GRAD('pp-fr','#f7cd4a','#e8a91f',false)}${GRAD('pp-bx','#d3412f','#b02a20',false)}${GRAD('pp-ch','#ffd24a','#f0a91c')}</defs>
  <g data-k="all"><ellipse cx="300" cy="506" rx="170" ry="16" fill="#000" opacity=".35"/>
   <path d="M184 326H416L392 502H208Z" fill="#8f241c"/>
   ${PF.map((f,i)=>`<g data-k="f${i}"><rect x="-6" y="-${f.len}" width="12" height="${f.len+50}" rx="3" fill="url(#pp-fr)" stroke="#c98a15" stroke-width="1"/></g>`).join('')}
   <path d="M190 332H410L388 500H212Z" fill="url(#pp-bx)"/>
   <path d="M232 332L240 500M272 332L276 500M312 332L312 500M352 332L348 500M390 332L384 500" stroke="#f6e9dc" stroke-width="16" opacity=".9" transform="translate(-6 0)"/>
   <path d="M190 332H410L388 500H212Z" fill="none" stroke="#7d1d17" stroke-width="2"/>
   <rect x="182" y="322" width="236" height="16" rx="7" fill="#a52a21"/>
   <g data-k="cheese" opacity="0"><line data-k="stream" x1="300" y1="-60" x2="300" y2="-60" stroke="url(#pp-ch)" stroke-width="22" stroke-linecap="round"/>
    <line data-k="gloss" x1="294" y1="-60" x2="294" y2="-60" stroke="#fff" stroke-opacity=".5" stroke-width="4" stroke-linecap="round"/>
    <ellipse data-k="pud" cx="300" cy="216" rx="0" ry="0" fill="url(#pp-ch)"/>
    ${DR.map((d,i)=>`<g data-k="dr${i}"><line x1="0" y1="0" x2="0" y2="0" stroke="#f3b21f" stroke-width="13" stroke-linecap="round"/><circle r="8.5" fill="#f3b21f"/><circle cx="-2.5" cy="-2" r="2.4" fill="#fff" opacity=".6"/></g>`).join('')}</g>
  </g></svg>`},
update(r,t){
  Q(r,'all').style.opacity=seg(t,0,.4)*(1-seg(t,8.4,9.2));
  PF.forEach((f,i)=>Q(r,'f'+i).setAttribute('transform',`translate(${f.x} 346) rotate(${f.rot+Math.sin(t*1.4+f.ph)*1.1})`));
  Q(r,'cheese').setAttribute('opacity',seg(t,.45,.6));
  const y2=lerp(-60,214,eIn(seg(t,.5,1.5))),y1=lerp(-60,214,eIO(seg(t,2.3,3.1))),x=300+Math.sin(t*5)*3;
  const s=Q(r,'stream'),g=Q(r,'gloss'),on=y1<y2-1;
  [s,g].forEach((e,j)=>{e.setAttribute('x1',x-j*6);e.setAttribute('x2',x-j*6);e.setAttribute('y1',y1);e.setAttribute('y2',y2);e.style.opacity=on?1:0});
  const pu=eOut(seg(t,1.4,2.8)),p=Q(r,'pud');p.setAttribute('rx',125*pu);p.setAttribute('ry',30*pu);
  DR.forEach((d,i)=>{const L=d.L*eOut(seg(t,d.d,d.d+2.4)),el=Q(r,'dr'+i),ln=el.firstElementChild;
    el.setAttribute('transform',`translate(${d.x} 222)`);ln.setAttribute('y2',L);el.children[1].setAttribute('cy',L);el.children[2].setAttribute('cy',L-2);el.style.opacity=L>1?1:0});
}};

/* --- Pizza: video real de una porción levantada con el queso estirándose --- */
SCENES.pizza={dur:1,still:0,
build(){return `<video src="video/pizza-cheese.mp4" muted loop playsinline preload="auto" aria-hidden="true"></video>`},
update(){}};
