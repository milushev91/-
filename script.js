(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const header = document.querySelector('.site-header');
  const toggle = header.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const links = [...nav.querySelectorAll('a[href^="#"]')];

  /* ----- Мобилно меню ----- */
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.forEach((a) => a.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) setMenu(false);
  });

  window.matchMedia('(min-width: 860px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ----- Активен линк при скролиране ----- */
  if ('IntersectionObserver' in window) {
    const targets = [document.getElementById('hero'), ...links.map((a) => document.querySelector(a.hash))].filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = nav.querySelector(`a[href="#${entry.target.id}"]`);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    targets.forEach((t) => observer.observe(t));
  }

  /* ----- Форма (демо) ----- */
  const form = document.getElementById('request-form');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.classList.remove('is-error');

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Проверете маркираните полета.';
      status.classList.add('is-error');
      return;
    }

    // Тук се добавя реалното изпращане, напр. fetch('/api/request', { method: 'POST', body: new FormData(form) })
    status.textContent = 'Благодаря! Ще ви се обадим до няколко минути.';
    form.reset();
  });
})();
