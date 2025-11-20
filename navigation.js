// navigation.js
const sections = Array.from(document.querySelectorAll('.page-section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

export function showSection(id) {
  sections.forEach(s => {
    if (s.id === id) {
      s.classList.remove('hidden');
      s.setAttribute('aria-hidden', 'false');
    } else {
      s.classList.add('hidden');
      s.setAttribute('aria-hidden', 'true');
    }
  });

  // update active link styles
  navLinks.forEach(l => {
    const href = l.getAttribute('href') || '';
    if (href.endsWith('#' + id) || href === '#' + id) {
      l.classList.add('text-amber-500');
    } else {
      l.classList.remove('text-amber-500');
    }
  });
}

export function navigateToHash(id, push = true) {
  const target = document.getElementById(id);
  if (!target) { showSection('home'); history.replaceState(null, '', '#home'); return; }
  showSection(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (push) history.pushState(null, '', '#' + id);
}

export function initNavigation() {
  // initial
  const initial = location.hash ? location.hash.slice(1) : 'home';
  navigateToHash(initial, false);

  // handle back/forward
  window.addEventListener('popstate', () => {
    const id = location.hash ? location.hash.slice(1) : 'home';
    navigateToHash(id, false);
  });
}
