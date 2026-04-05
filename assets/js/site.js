// ============================================
// Le Zhang — Site Interactions
// ============================================

(() => {
  'use strict';

  // --- Theme toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');

  // Apply saved preference or default to dark
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // --- Navbar scroll effect ---
  const nav = document.getElementById('navbar');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile menu toggle ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
    });
  });

  // --- Publication filter ---
  const filterBtns = document.querySelectorAll('.pub-filter');
  const pubCards = document.querySelectorAll('.pub-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pubCards.forEach((card, i) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('filter-hidden');
          card.classList.add('filter-show');
          card.style.animationDelay = `${i * 0.04}s`;
        } else {
          card.classList.add('filter-hidden');
          card.classList.remove('filter-show');
        }
      });
    });
  });

  // --- Scroll reveal (IntersectionObserver) ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- Smooth anchor scroll offset for fixed nav ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
