/* ============================================================
   YALCO — BUILDING AFRICA — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  document.body.classList.add('js-ready');

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backdrop = document.querySelector('.menu-backdrop');

  function closeMenu() {
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu() {
    toggle.classList.add('open');
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- Language switch (FR / EN) ---------- */
  const langButtons = document.querySelectorAll('.lang-switch button');
  const html = document.documentElement;

  function setLang(lang) {
    html.setAttribute('lang', lang);
    langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.setlang === lang));
    try { localStorage.setItem('yalco-lang', lang); } catch (e) {}
  }

  let savedLang = 'fr';
  try { savedLang = localStorage.getItem('yalco-lang') || 'fr'; } catch (e) {}
  setLang(savedLang);

  langButtons.forEach(btn => btn.addEventListener('click', () => setLang(btn.dataset.setlang)));

  /* ---------- Scroll reveal (fade + blur-to-sharp) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 12 ? '0 8px 24px -12px rgba(0,0,0,0.5)' : 'none';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Africa progress rail (signature element) ---------- */
  const railFill = document.getElementById('rail-fill-mask');
  if (railFill) {
    function updateRail() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = (doc.scrollHeight - doc.clientHeight) || 1;
      const ratio = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      // mask rect height grows from bottom to top of the silhouette viewBox (0..700)
      const fullHeight = 400;
      const fillHeight = fullHeight * ratio;
      railFill.setAttribute('y', fullHeight - fillHeight);
      railFill.setAttribute('height', fillHeight);
    }
    window.addEventListener('scroll', updateRail, { passive: true });
    window.addEventListener('resize', updateRail);
    updateRail();
  }

});
