/* =========================================================
   FASTER · carta, pedido por WhatsApp y fondo animado
   ========================================================= */

/* ---------- 1) CONFIGURACIÓN ---------- */
// Número de WhatsApp del local: código de país + código de área + número, sin signos ni espacios.
// Ejemplo Argentina (Santiago del Estero): '5493851234567'. Vacío = WhatsApp deja elegir el contacto.
const WA_NUMBER = '';
const PAPAS_INC = 'Con porción de papas fritas.';

/* ---------- 2) DATOS DE LA CARTA (editá nombres, precios e ingredientes acá) ---------- */
const MENU = [
  { id:'lomitos', scene:'lomito', cap:2, name:'Lomitos', h:'Lomitos, <span class="grad-text">cortados a la mitad.</span>',
    sub:'Bife de lomito a la plancha en pan especial. Mirá cómo viene por dentro.', items:[
    { id:'lo-e', name:'Lomito Especial', price:9500, ing:'Bife de lomito, doble queso, paleta, huevo, lechuga y tomate en pan especial. '+PAPAS_INC },
    { id:'lo-s', name:'Lomito Simple',   price:8000, ing:'Bife de lomito, lechuga y tomate en pan especial. '+PAPAS_INC } ] },
  { id:'milanesas', scene:'milanesa', cap:3, name:'Milanesas', h:'Milanesas con <span class="grad-text">papas encima.</span>',
    sub:'Milanesa crocante, recién hecha, con su porción de papas.', items:[
    { id:'mi-e', name:'Milanesa Especial', price:8000, ing:'Milanesa, queso, paleta, huevo, lechuga y tomate en pan especial. '+PAPAS_INC },
    { id:'mi-s', name:'Milanesa Simple',   price:7000, ing:'Milanesa, lechuga y tomate en pan especial. '+PAPAS_INC } ] },
  { id:'hamburguesas', scene:'hamburguesa', cap:4, name:'Hamburguesas', h:'Hamburguesas <span class="grad-text">armadas al momento.</span>',
    sub:'Medallón de carne, pan de hamburguesa y cada ingrediente en su lugar.', items:[
    { id:'ha-e', name:'Hamburguesa Especial', price:5000, ing:'Medallón de carne, queso, paleta, huevo, lechuga y tomate en pan de hamburguesa. '+PAPAS_INC },
    { id:'ha-s', name:'Hamburguesa Simple',   price:4200, ing:'Medallón de carne, lechuga y tomate en pan de hamburguesa. '+PAPAS_INC } ] },
  // Papas y pizzas: datos de ejemplo
  { id:'papas', scene:'papas', cap:5, name:'Papas', h:'Papas fritas <span class="grad-text">con cheddar de más.</span>',
    sub:'Bastones dorados, porción de 250 g.', items:[
    { id:'pa-c',  name:'Papas clásicas',              price:3500, ing:'Papas fritas y sal.' },
    { id:'pa-ch', name:'Papas con cheddar',           price:5200, ing:'Papas fritas bañadas en cheddar derretido.' },
    { id:'pa-cp', name:'Papas con cheddar y panceta', price:6200, ing:'Papas fritas, cheddar derretido y panceta crocante.' },
    { id:'pa-r',  name:'Papas rústicas',              price:4200, ing:'Papas con cáscara, ajo y perejil.' } ] },
  { id:'pizzas', scene:'pizza', cap:6, name:'Pizzas', h:'Pizzas <span class="grad-text">que se estiran.</span>',
    sub:'Masa fina, mucho queso y la porción que se levanta con hilos.', items:[
    { id:'pi-m', name:'Muzzarella',    price:9800,  ing:'Salsa de tomate, muzzarella, orégano y aceitunas.' },
    { id:'pi-n', name:'Napolitana',    price:10800, ing:'Salsa de tomate, muzzarella, tomate fresco, ajo y albahaca.' },
    { id:'pi-f', name:'Fugazzeta',     price:11500, ing:'Muzzarella, cebolla y orégano.' },
    { id:'pi-q', name:'Cuatro quesos', price:12500, ing:'Muzzarella, provolone, roquefort y parmesano.' } ] }
];
const PROMOS = [
  { id:'pr-lo', name:'Dos Lomitos Especiales',      price:18000, normal:19000, ing:'2 lomitos especiales, cada uno con su porción de papas fritas.' },
  { id:'pr-mi', name:'Dos Milanesas Especiales',    price:15000, normal:16000, ing:'2 milanesas especiales, cada una con su porción de papas fritas.' },
  { id:'pr-ha', name:'Dos Hamburguesas Especiales', price:9000,  normal:10000, ing:'2 hamburguesas especiales, cada una con su porción de papas fritas.' }
];

/* ---------- 3) UTILIDADES ---------- */
const $ = s => document.querySelector(s);
const money = n => '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const ALL = {};
MENU.forEach(s => s.items.forEach(i => ALL[i.id] = i));
PROMOS.forEach(p => ALL[p.id] = { ...p, name: 'Promo 2x · ' + p.name });

/* ---------- 4) RENDER DE LA CARTA (clases de Bootstrap) ---------- */
const ctrl = id => `<div class="d-flex align-items-center gap-3 mt-2" data-ctrl="${id}"></div>`;
$('#sections').innerHTML =
  `<section class="promos" id="promos" data-scene=""><div class="container">
     <p class="eyebrow">Cap. 1 · Promos</p>
     <h2 class="sec-title">Dos sándwiches, <span class="grad-text">un solo precio.</span></h2>
     <p class="sub">Promos 2x en versión Especial. Ahorrás en cada par.</p>
     <div class="row g-4">${PROMOS.map(p => `
       <div class="col-md-6 col-xl-4"><article class="promo">
         <div class="x2 grad-text">2x</div><h3>${p.name}</h3><p class="ing">${p.ing}</p>
         <p class="small text-body-secondary mb-0">Por separado <s>${money(p.normal)}</s></p>
         <span class="price">${money(p.price)}</span>${ctrl(p.id)}
       </article></div>`).join('')}
     </div></div></section>` +
  MENU.map(s => `
    <section class="menu-sec" id="${s.id}" data-scene="${s.scene}"><div class="container"><div class="row"><div class="col-lg-6">
      <div class="menu-col">
        <p class="eyebrow">Cap. ${s.cap} · ${s.name}</p>
        <h2 class="sec-title">${s.h}</h2><p class="sub">${s.sub}</p>
        ${s.items.map(i => `
          <article class="menu-item">
            <div class="d-flex align-items-baseline gap-3"><h3>${i.name}</h3><span class="leader"></span><span class="price">${money(i.price)}</span></div>
            <p class="ing">${i.ing}</p>${ctrl(i.id)}
          </article>`).join('')}
      </div></div></div></div></section>`).join('');

/* ---------- 5) PEDIDO ---------- */
const cart = {};
const qty = id => cart[id] || 0;
const totals = () => { let n = 0, t = 0; for (const id in cart) { n += cart[id]; t += cart[id] * ALL[id].price } return { n, t } };
let canvasOpen = false;

function drawCtrl(id) {
  document.querySelectorAll(`[data-ctrl="${id}"]`).forEach(el => {
    const q = qty(id);
    el.innerHTML = q
      ? `<div class="step-ctl"><button type="button" data-dec="${id}" aria-label="Quitar uno">−</button><output aria-live="polite">${q}</output><button type="button" data-inc="${id}" aria-label="Agregar uno">+</button></div><span class="inorder">En tu pedido</span>`
      : `<button class="add" type="button" data-inc="${id}">Agregar +</button>`;
  });
}
function waMessage() {
  const { t } = totals();
  const lines = Object.keys(cart).map(id => `• ${cart[id]}x ${ALL[id].name} — ${money(cart[id] * ALL[id].price)}`);
  const name = $('#cName').value.trim(), notes = $('#cNotes').value.trim();
  const entrega = document.querySelector('input[name=entrega]:checked').value;
  return `Hola Faster! Quiero hacer este pedido:\n\n${lines.join('\n')}\n\nTotal: ${money(t)}\nEntrega: ${entrega}` +
         (name ? `\nNombre: ${name}` : '') + (notes ? `\nAclaraciones: ${notes}` : '');
}
function refresh() {
  const { n, t } = totals();
  ['#cartCount', '#barCount'].forEach(s => $(s).textContent = n);
  $('#barTotal').textContent = money(t); $('#sheetTotal').textContent = money(t);
  $('#cartbar').hidden = !n || canvasOpen;
  $('#lines').innerHTML = n
    ? Object.keys(cart).map(id => `<li class="list-group-item"><span class="nm">${ALL[id].name}</span><span class="ln">${money(cart[id] * ALL[id].price)}</span>
        <div class="step-ctl"><button type="button" data-dec="${id}" aria-label="Quitar uno">−</button><output>${cart[id]}</output><button type="button" data-inc="${id}" aria-label="Agregar uno">+</button></div></li>`).join('')
    : `<li class="list-group-item cart-empty">Todavía no agregaste nada.</li>`;
  const a = $('#sendWa');
  a.classList.toggle('disabled', !n); a.setAttribute('aria-disabled', n ? 'false' : 'true');
  a.href = n ? 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waMessage()) : '#';
}
const toastEl = $('#addToast'), toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1500 });
function change(id, d) {
  const q = Math.max(0, qty(id) + d);
  if (q) cart[id] = q; else delete cart[id];
  drawCtrl(id); refresh();
  if (d > 0 && !canvasOpen) { $('#toastMsg').textContent = ALL[id].name + ' agregado'; toast.show(); }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-inc],[data-dec]'); if (!b) return;
  b.dataset.inc ? change(b.dataset.inc, 1) : change(b.dataset.dec, -1);
});
const canvas = $('#cartCanvas');
canvas.addEventListener('show.bs.offcanvas', () => { canvasOpen = true; toast.hide(); refresh() });
canvas.addEventListener('hidden.bs.offcanvas', () => { canvasOpen = false; refresh() });
['#cName', '#cNotes'].forEach(s => $(s).addEventListener('input', refresh));
document.querySelectorAll('input[name=entrega]').forEach(r => r.addEventListener('change', refresh));
Object.keys(ALL).forEach(drawCtrl); refresh();

/* ---------- 6) FONDO ANIMADO POR SECCIÓN ---------- */
const stage = $('#stage'), reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
Object.keys(SCENES).forEach(k => {
  const d = document.createElement('div'); d.className = 'scene'; d.dataset.scene = k; d.innerHTML = SCENES[k].build(); stage.appendChild(d);
});
let active = '', t0 = 0;
function activate(k) {
  if (k === active) return;
  active = k; t0 = performance.now();
  stage.querySelectorAll('.scene').forEach(s => {
    const on = s.dataset.scene === k; s.classList.toggle('on', on);
    const v = s.querySelector('video'); if (v) { on && !reduce ? v.play().catch(() => {}) : v.pause() }
  });
  if (k) SCENES[k].update(stage.querySelector(`.scene[data-scene="${k}"]`), reduce ? SCENES[k].still : 0);
}
const sceneIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) activate(e.target.dataset.scene || '') }),
  { rootMargin: '-42% 0px -42% 0px' });
document.querySelectorAll('section[data-scene]').forEach(s => sceneIO.observe(s));
function frame(now) {
  if (active && !reduce) { const sc = SCENES[active]; sc.update(stage.querySelector(`.scene[data-scene="${active}"]`), ((now - t0) / 1000) % sc.dur) }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

/* ---------- 7) DETALLES: aparición de ítems y link activo del menú ---------- */
const revealIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target) } }), { threshold: .15 });
document.querySelectorAll('.menu-item').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; revealIO.observe(el) });
const links = [...document.querySelectorAll('.faster-nav .nav-link')];
const navIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)) }),
  { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => navIO.observe(s));
