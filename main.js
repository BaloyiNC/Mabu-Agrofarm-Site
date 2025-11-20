
import { initNavigation } from './navigation.js';
import { initModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavigation();
  initModal();
});
