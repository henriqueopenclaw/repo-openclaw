/**
 * Protocolo Geladeira Inteligente — script.js
 * Funcionalidades: Scroll Reveal (Intersection Observer) + Smooth Scroll
 * Sem dependências externas. Vanilla JS puro.
 */

(function () {
  'use strict';

  /* ─── SCROLL REVEAL ──────────────────────────────────────── */
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    // IntersectionObserver com threshold e rootMargin para uma revelação suave
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Para de observar depois de revelar — performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el, index) {
      // Stagger delay baseado na ordem de aparição dentro do mesmo pai
      const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
      const siblingIndex = siblings.indexOf(el);

      if (siblingIndex > 0) {
        el.style.transitionDelay = siblingIndex * 80 + 'ms';
      }

      observer.observe(el);
    });
  }

  /* ─── SMOOTH SCROLL para âncoras internas ───────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignora links sem destino real
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();

        const headerOffset = 20; // Margem do topo
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      });
    });
  }

  /* ─── PROBLEMA ITEMS — animação de entrada escalonada ────── */
  function initProblemStagger() {
    const items = document.querySelectorAll('.problem__item');
    items.forEach(function (item, i) {
      item.style.transitionDelay = i * 90 + 'ms';
    });
  }

  /* ─── LUCIDE ICONS ──────────────────────────────────────── */
  function initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* ─── INICIALIZAÇÃO ──────────────────────────────────────── */
  function init() {
    initIcons();
    initProblemStagger();
    initScrollReveal();
    initSmoothScroll();
  }

  // Aguarda o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
