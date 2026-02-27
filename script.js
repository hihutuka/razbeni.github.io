/* script.js — razbeni Portfolio */
'use strict';

/* ----------------------------------------
   Intersection Observer — scroll fade in
   ---------------------------------------- */
const observeElements = () => {
  const items = document.querySelectorAll('.fade-in, .fade-in-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
};

/* ----------------------------------------
   Hero items — appear immediately
   ---------------------------------------- */
const showHeroItems = () => {
  const heroItems = document.querySelectorAll('.hero .fade-in, .hero .fade-in-up');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 140);
  });
};

/* ----------------------------------------
   Mobile navigation hamburger
   ---------------------------------------- */
const initNav = () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
};

/* ----------------------------------------
   Sticky header shadow on scroll
   ---------------------------------------- */
const initHeaderShadow = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
};

/* ----------------------------------------
   Active nav link highlight on scroll
   ---------------------------------------- */
const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((l) => {
            l.classList.toggle(
              'active',
              l.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
};

/* ----------------------------------------
   YouTube Modal
   ---------------------------------------- */
const initYouTubeModal = () => {
  const cards = document.querySelectorAll('.card[data-youtube-id]');
  const modal = document.getElementById('youtube-modal');
  const iframe = document.getElementById('youtube-iframe');

  if (!modal || !iframe || cards.length === 0) return;

  const closeElements = modal.querySelectorAll('[data-close]');

  const openModal = (videoId) => {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      iframe.src = ''; // Stop video playback
    }, 300); // Wait for CSS transition
    document.body.style.overflow = '';
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-youtube-id');
      if (videoId) openModal(videoId);
    });
  });

  closeElements.forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
};

/* ----------------------------------------
   Boot
   ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  showHeroItems();
  observeElements();
  initNav();
  initHeaderShadow();
  initActiveNav();
  initYouTubeModal();
});
