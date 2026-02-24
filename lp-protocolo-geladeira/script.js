/**
 * Protocolo Geladeira Inteligente — script.js v4 (Redesign)
 *
 * Funcionalidades:
 *   1. Page Load — staggered reveal orquestrado para o hero
 *   2. Scroll Reveal — IntersectionObserver com stagger por pai
 *   3. Smooth Scroll — âncoras internas
 *   4. Lucide Icons — inicialização
 *
 * Sem dependências externas. Vanilla JS puro.
 */

(function () {
  'use strict';

  /* ─── PAGE LOAD — hero orquestrado ─────────────────────────
   * Os elementos do hero entram em sequência logo no load,
   * sem aguardar scroll. Cada filho do hero__content recebe
   * um delay crescente (stagger), criando o reveal fluido.
   * A imagem entra da direita com delay ligeiramente maior.
   * ─────────────────────────────────────────────────────────── */
  function initPageLoad() {
    var heroContent  = document.querySelector('.hero__content');
    var heroImageCol = document.querySelector('.hero__image-col');

    if (heroContent) {
      var heroItems = heroContent.querySelectorAll('.reveal');
      heroItems.forEach(function (el, i) {
        // Stagger: 80ms base + 130ms por elemento
        el.style.transitionDelay = (80 + i * 130) + 'ms';
      });
    }

    if (heroImageCol) {
      // Imagem entra após o conteúdo principal
      heroImageCol.style.transitionDelay = '360ms';
    }

    // Dispara em requestAnimationFrame para garantir que
    // o browser já calculou o layout antes de animar
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.querySelectorAll('.hero .reveal').forEach(function (el) {
          el.classList.add('is-visible');
        });
      });
    });
  }

  /* ─── SCROLL REVEAL ─────────────────────────────────────────
   * Elementos com .reveal fora do hero são ativados pelo
   * IntersectionObserver conforme entram na viewport.
   * Stagger automático por posição entre irmãos .reveal.
   * ─────────────────────────────────────────────────────────── */
  function initScrollReveal() {
    // Exclui elementos do hero (já tratados pelo initPageLoad)
    var elements = Array.from(document.querySelectorAll('.reveal')).filter(function (el) {
      return !el.closest('.hero');
    });

    if (!elements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      // Stagger por posição entre irmãos .reveal no mesmo pai
      var siblings      = Array.from(el.parentElement.querySelectorAll('.reveal'));
      var siblingIndex  = siblings.indexOf(el);

      if (siblingIndex > 0) {
        el.style.transitionDelay = siblingIndex * 85 + 'ms';
      }

      observer.observe(el);
    });
  }

  /* ─── PROBLEMA ITEMS — stagger na entrada ───────────────── */
  function initProblemStagger() {
    var items = document.querySelectorAll('.problem__item');
    items.forEach(function (item, i) {
      item.style.transitionDelay = i * 90 + 'ms';
    });
  }

  /* ─── SMOOTH SCROLL para âncoras internas ───────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') return;

        var targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        e.preventDefault();

        var headerOffset    = 20;
        var elementPosition = targetEl.getBoundingClientRect().top;
        var offsetPosition  = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      });
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
    initPageLoad();
    initProblemStagger();
    initScrollReveal();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
