const modal = document.getElementById('media-modal');
const modalImage = modal?.querySelector('img');
const modalTitle = modal?.querySelector('[data-modal-title]');
const modalMeta = modal?.querySelector('[data-modal-meta]');
const modalLink = modal?.querySelector('[data-modal-link]');
let lastFocused;

const closeModal = () => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.classList.remove('open');
  if (lastFocused) {
    lastFocused.focus();
  }
};

const openModal = ({ src, caption, meta, link }, trigger) => {
  if (!modal) return;
  lastFocused = trigger;
  modalImage.src = src;
  modalImage.alt = caption || 'The Meat Emporium Bali';
  modalTitle.textContent = caption || 'The Meat Emporium Bali';
  modalMeta.textContent = meta || '';
  if (link) {
    modalLink.href = link;
    modalLink.style.display = 'inline-flex';
  } else {
    modalLink.style.display = 'none';
  }
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  modal.querySelector('.modal-close')?.focus();
};

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

document.addEventListener('keydown', handleEscape);

modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);

export { openModal, closeModal };
