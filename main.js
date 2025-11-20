import { initNavigation, navigateToHash } from './navigation.js';
import { Modal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render lucide icons
  if (window.lucide && lucide.createIcons) {
    lucide.createIcons();
  }

  // Wire up year
  const y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();

  // Initialize navigation and modal
  initNavigation();
  window.appModal = new Modal({
    modalSelector: '#app-modal',
    closeSelector: '#modal-close',
    backdropSelector: '[data-modal-backdrop]',
    iconContainer: '#modal-icon',
    messageContainer: '#modal-text',
    titleContainer: '#modal-title'
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', () => {
    const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
    mobileBtn.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu on link click (improves UX)
  document.querySelectorAll('#mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth hash navigation for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        navigateToHash(id);
        // close mobile menu on small screens
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});
