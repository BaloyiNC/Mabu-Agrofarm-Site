
export function showMessage(message, type='info') {
  const modal = document.getElementById('message-modal');
  const text = document.getElementById('modal-message');
  const icon = document.getElementById('modal-icon');

  text.textContent = message;
  icon.innerHTML = lucide.icons[type==='success'?'check-circle':'info'].toSvg({ class:'w-10 h-10' });

  modal.classList.remove('hidden');
}

export function initModal() {
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('message-modal').classList.add('hidden');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('message-modal').classList.add('hidden');
  });
}
