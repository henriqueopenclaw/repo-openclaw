/* Decodificador de Ciúme™ — LP Script */

function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay para filhos do mesmo pai
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(entry.target);
          const delay = idx * 80;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-item__answer');
      const isOpen = item.classList.contains('is-open');

      // Fechar todos
      document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
        const openAnswer = openItem.querySelector('.faq-item__answer');
        openItem.classList.remove('is-open');
        openAnswer.style.maxHeight = '0';
        openItem.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
      });

      // Abrir o clicado (se não estava aberto)
      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function init() {
  initIcons();
  initScrollReveal();
  initSmoothScroll();
  initFAQ();
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();

// ── Countdown de urgência ──
(function() {
  function pad(n) { return String(n).padStart(2,'0'); }

  function formatDate(d) {
    const days = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    const months = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    return `${d.getDate()} de ${months[d.getMonth()]} (${days[d.getDay()]})`;
  }

  function tick() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 0);
    const diff = midnight - now;

    if (diff <= 0) {
      document.querySelectorAll('.countdown__timer').forEach(el => el.textContent = '00:00:00');
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const str = `${pad(h)}:${pad(m)}:${pad(s)}`;
    document.querySelectorAll('.countdown__timer').forEach(el => el.textContent = str);
  }

  function init() {
    const now = new Date();
    const dateStr = formatDate(now);

    // Injetar banner de urgência após a seção hero (abaixo da primeira dobra)
    const heroSection = document.querySelector('.section--hero');
    if (heroSection) {
      const bar = document.createElement('div');
      bar.className = 'urgency-bar';
      bar.innerHTML = `
        <span class="urgency-bar__text">
          🔥 Valor promocional encerra <strong>HOJE, ${dateStr}</strong> às 23h59 —
          após isso, volta para <s>R$47</s>
        </span>
        <span class="countdown__timer urgency-bar__timer">00:00:00</span>
      `;
      heroSection.insertAdjacentElement('afterend', bar);
    }

    // Injetar countdown também dentro do box da oferta, antes do botão
    const cta = document.querySelector('.btn--cta');
    if (cta) {
      const block = document.createElement('div');
      block.className = 'countdown-oferta';
      block.innerHTML = `
        <div class="countdown-oferta__label">⏰ Esse preço encerra em</div>
        <div class="countdown__timer countdown-oferta__timer">00:00:00</div>
        <div class="countdown-oferta__sub">Hoje, ${dateStr} às 23h59</div>
      `;
      cta.insertAdjacentElement('beforebegin', block);
    }

    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
