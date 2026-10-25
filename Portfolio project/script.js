// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const setTheme = (theme) => {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.setAttribute('aria-pressed', 'true');
    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    root.removeAttribute('data-theme');
    themeToggle.setAttribute('aria-pressed', 'false');
    themeToggle.setAttribute('aria-label', 'Switch to light theme');
  }
  try { localStorage.setItem('theme', theme); } catch (e) {}
};

setTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

themeToggle.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});


// ===== Header shadow on scroll =====
const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');

const onScroll = () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 12);
  if (y > 600) {
    backToTop.classList.add('show');
    backToTop.hidden = false;
  } else {
    backToTop.classList.remove('show');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile navigation =====
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

const closeNav = () => {
  primaryNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// ===== Scrollspy: active nav link =====
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => spyObserver.observe(section));

// ===== Reveal animations =====
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  revealObserver.observe(el);
});

// ===== Smooth anchor scrolling with header offset =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id.length <= 1) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
