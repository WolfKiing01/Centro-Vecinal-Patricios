/* Interacciones del sitio. No requiere librerías ni conexión para funcionar. */
'use strict';
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#main-menu');
function closeMenu() { if (!menu) return; menu.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
}
const viewer = document.querySelector('#photo-viewer');
let activeGallery = null;
let restoreFocus = null;
function updateViewer() {
  if (!activeGallery) return;
  const source = activeGallery.slides[activeGallery.index].querySelector('img');
  const img = viewer.querySelector('img'); img.src = source.src; img.alt = source.alt;
  const oldFrame = img.closest(".crop-frame"); if (oldFrame) oldFrame.replaceWith(img);
  if (source.dataset.crop) { const frame = document.createElement("span"); frame.className = "crop-frame"; frame.dataset.crop = source.dataset.crop; img.replaceWith(frame); frame.append(img); }
  img.removeAttribute("style"); requestAnimationFrame(fitCrops);
  viewer.querySelector('figcaption').textContent = `${activeGallery.index + 1} / ${activeGallery.slides.length} · ${source.alt}`;
  viewer.querySelectorAll('.viewer-prev,.viewer-next').forEach(button => { button.hidden = activeGallery.slides.length < 2; });
}
function closeViewer() { viewer.close(); }
viewer.querySelector('.viewer-close').addEventListener('click', closeViewer);
viewer.addEventListener('close', () => { document.body.classList.remove('viewer-open'); restoreFocus?.focus(); });
viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
viewer.querySelector('.viewer-prev').addEventListener('click', () => activeGallery?.move(-1));
viewer.querySelector('.viewer-next').addEventListener('click', () => activeGallery?.move(1));
viewer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); activeGallery?.move(e.key === 'ArrowLeft' ? -1 : 1); }
});
function swipe(element, callback) {
  let origin = null;
  element.addEventListener('touchstart', e => { origin = {x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY}; }, {passive:true});
  element.addEventListener('touchend', e => {
    if (!origin) return;
    const dx = e.changedTouches[0].clientX - origin.x, dy = e.changedTouches[0].clientY - origin.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) callback(dx < 0 ? 1 : -1);
    origin = null;
  }, {passive:true});
}
swipe(viewer, delta => activeGallery?.move(delta));
document.querySelectorAll('[data-gallery]').forEach(element => {
  const gallery = {
    slides: [...element.querySelectorAll('[data-slide]')], index: 0,
    move(delta) {
      requestAnimationFrame(fitCrops);
      this.index = (this.index + delta + this.slides.length) % this.slides.length;
      this.slides.forEach((slide, i) => { slide.hidden = i !== this.index; });
      const count = element.querySelector('[data-count]');
      if (count) count.textContent = `${this.index + 1} / ${this.slides.length}`;
      if (viewer.open && activeGallery === this) updateViewer();
    }
  };
  element.querySelector('[data-prev]')?.addEventListener('click', () => gallery.move(-1));
  element.querySelector('[data-next]')?.addEventListener('click', () => gallery.move(1));
  element.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); gallery.move(e.key === 'ArrowLeft' ? -1 : 1); }
  });
  swipe(element, delta => gallery.move(delta));
  gallery.slides.forEach((slide, i) => slide.addEventListener('click', () => {
    gallery.index = i; activeGallery = gallery; restoreFocus = slide; updateViewer();
    viewer.showModal(); document.body.classList.add('viewer-open');
  }));
});

// Ajusta únicamente el encuadre visible; conserva las fotos originales.
function fitCrops() {
 document.querySelectorAll('.crop-frame').forEach(frame => {
  const [w,h,top,bottom] = frame.dataset.crop.split(',').map(Number);
  const parent = frame.parentElement; const isViewer = parent.tagName === 'FIGURE';
  const maxWidth = parent.clientWidth, maxHeight = Math.max(0,parent.clientHeight-(isViewer?65:0));
  if(!maxWidth||!maxHeight)return;
  const scale = Math.min(maxWidth/w,maxHeight/(bottom-top));
  frame.style.width = `${w*scale}px`; frame.style.height = `${(bottom-top)*scale}px`;
  const img = frame.querySelector('img');img.style.cssText = `position:absolute;left:0;top:${-top*scale}px;width:${w*scale}px;height:${h*scale}px;max-width:none;object-fit:fill!important`;
 });
}
window.addEventListener('resize',fitCrops);
window.addEventListener('load',fitCrops);
requestAnimationFrame(fitCrops);
