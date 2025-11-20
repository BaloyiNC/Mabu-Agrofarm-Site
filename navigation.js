
const pages = document.querySelectorAll('.page-section');
const navLinks = [];

export function navigate(pageId, updateHistory=true) {
  pages.forEach(p => p.classList.add('hidden'));
  const page = document.getElementById(pageId);
  if (page) page.classList.remove('hidden');
  if (updateHistory) history.pushState(null, '', '#' + pageId);
  window.scrollTo({ top:0, behavior:'smooth' });
}

export function initNavigation() {
  window.addEventListener('popstate', () => navigate(location.hash.slice(1) || 'home', false));
  navigate(location.hash.slice(1) || 'home', false);
}
