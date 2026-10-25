(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const header = document.querySelector('.site-header');
  const toggle = header.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const call = header.querySelector('.header-call');
  const navList = nav.querySelector('.nav-list');
  const links = [...nav.querySelectorAll('a[href^="#"]')];

  /* ----- Hero CTA според оформлението ----- */
  const heroSecondary = document.querySelector('.hero-secondary');
  const heroSecondaryLabel = heroSecondary.querySelector(
    '.hero-secondary-label',
  );
  const heroTwoColumns = window.matchMedia('(min-width: 900px)');
  const setHeroSecondary = () => {
    if (heroTwoColumns.matches) {
      heroSecondary.href = '#uslugi';
      heroSecondaryLabel.textContent = 'Научи повече';
    } else {
      heroSecondary.href = '#zayavka';
      heroSecondaryLabel.textContent = 'Направи запитване';
    }
  };

  setHeroSecondary();
  heroTwoColumns.addEventListener('change', setHeroSecondary);

  /* ----- CTA в мобилното меню ----- */
  const callItem = document.createElement('li');
  const mobileCall = window.matchMedia('(max-width: 520px)');
  const setCallLocation = () => {
    if (mobileCall.matches) {
      callItem.append(call);
      navList.append(callItem);
    } else {
      toggle.before(call);
      callItem.remove();
    }
  };

  setCallLocation();
  mobileCall.addEventListener('change', setCallLocation);

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
