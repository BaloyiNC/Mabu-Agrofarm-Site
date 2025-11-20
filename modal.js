// modal.js - accessible modal with focus trap and keyboard support
export class Modal {
  constructor(opts) {
    this.modal = document.querySelector(opts.modalSelector);
    this.closeBtn = document.querySelector(opts.closeSelector);
    this.backdrop = document.querySelector(opts.backdropSelector);
    this.iconContainer = document.querySelector(opts.iconContainer);
    this.messageContainer = document.querySelector(opts.messageContainer);
    this.titleContainer = document.querySelector(opts.titleContainer);

    this._boundKey = this._onKeyDown.bind(this);
    this._boundTrap = this._trapFocus.bind(this);

    // attach close handlers
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.hide());
    if (this.backdrop) this.backdrop.addEventListener('click', () => this.hide());
  }

  show({ title = 'Notice', message = '', type = 'info' } = {}) {
    if (!this.modal) return;
    // set content
    if (this.titleContainer) document.querySelector(this.titleContainer).textContent = title;
    if (this.messageContainer) document.querySelector(this.messageContainer).textContent = message;

    // set icon using lucide API if available
    if (window.lucide && lucide.icons) {
      const name = type === 'success' ? 'check-circle' : 'info';
      try {
        const svg = lucide.icons[name].toSvg({ class: 'w-6 h-6 text-amber-400' });
        if (this.iconContainer) document.querySelector(this.iconContainer).innerHTML = svg;
      } catch (e) {
        // fallback to text
        if (this.iconContainer) document.querySelector(this.iconContainer).textContent = type === 'success' ? '✓' : 'i';
      }
    }

    // show modal
    this.modal.classList.remove('hidden');
    this.modal.setAttribute('aria-hidden', 'false');

    // save focused element and move focus to modal
    this._previousActive = document.activeElement;
    this._firstFocusable = this.modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (this._firstFocusable) this._firstFocusable.focus();

    // keyboard and focus trap
    document.addEventListener('keydown', this._boundKey);
    document.addEventListener('focus', this._boundTrap, true);
  }

  hide() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    this.modal.setAttribute('aria-hidden', 'true');

    // remove listeners
    document.removeEventListener('keydown', this._boundKey);
    document.removeEventListener('focus', this._boundTrap, true);

    // restore focus
    if (this._previousActive) this._previousActive.focus();
  }

  _onKeyDown(e) {
    if (e.key === 'Escape') {
      this.hide();
    } else if (e.key === 'Tab') {
      // Basic trap: keep focus inside modal
      const focusable = Array.from(this.modal.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
      if (focusable.length === 0) { e.preventDefault(); return; }
      const first = focusable[0], last = focusable[focusable.length -1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  _trapFocus(e) {
    if (this.modal && !this.modal.contains(e.target)) {
      e.stopPropagation();
      this._firstFocusable && this._firstFocusable.focus();
    }
  }

  // helper for easier usage
  showMessage(message, type='info') {
    this.show({ title: type === 'success' ? 'Success' : 'Notice', message, type });
  }
}
