import { MENU_DATA, SITE_CONFIG } from './menu-data.js';

const formatWhatsAppLink = (message = '') => {
  const sanitized = SITE_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${sanitized}${text}`;
};

const hydrateLinks = () => {
  document.querySelectorAll('[data-whatsapp]').forEach((btn) => {
    const message = btn.dataset.whatsapp || '';
    btn.setAttribute('href', formatWhatsAppLink(message));
  });
  document.querySelectorAll('[data-maps]').forEach((btn) => {
    btn.setAttribute('href', SITE_CONFIG.mapsUrl);
  });
};

const renderMenu = (data, container, context) => {
  if (!container || !data?.length) return;
  const frag = document.createDocumentFragment();

  data.forEach((section) => {
    const card = document.createElement('article');
    card.className = 'menu-card';

    const header = document.createElement('div');
    header.className = 'menu-card-header';

    const title = document.createElement('h3');
    title.textContent = `${section.icon ? `${section.icon} ` : ''}${section.title}`;
    header.appendChild(title);

    if (section.badge) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = section.badge;
      header.appendChild(badge);
    }

    card.appendChild(header);

    if (section.description) {
      const desc = document.createElement('p');
      desc.textContent = section.description;
      card.appendChild(desc);
    }

    const list = document.createElement('div');
    list.className = 'menu-items';

    section.items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'menu-item-row';

      const info = document.createElement('div');
      info.className = 'info';

      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = item.name;
      info.appendChild(name);

      if (item.description) {
        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = item.description;
        info.appendChild(desc);
      }

      if (item.badge) {
        const pill = document.createElement('span');
        pill.className = 'badge-outline';
        pill.textContent = item.badge;
        info.appendChild(pill);
      }

      const price = document.createElement('div');
      price.className = 'price';
      price.textContent = item.price;

      row.appendChild(info);
      row.appendChild(price);
      list.appendChild(row);
    });

    card.appendChild(list);

    const ctas = document.createElement('div');
    ctas.className = 'menu-cta';

    const waBtn = document.createElement('a');
    waBtn.className = 'btn btn-primary';
    waBtn.href = formatWhatsAppLink(`${context.prefix} ${section.title}`);
    waBtn.textContent = context.waLabel || 'WhatsApp Order';
    waBtn.setAttribute('aria-label', `WhatsApp about ${section.title}`);
    ctas.appendChild(waBtn);

    const mapBtn = document.createElement('a');
    mapBtn.className = 'btn btn-ghost';
    mapBtn.href = SITE_CONFIG.mapsUrl;
    mapBtn.textContent = 'Open in Google Maps';
    mapBtn.setAttribute('aria-label', 'Open location in Google Maps');
    ctas.appendChild(mapBtn);

    card.appendChild(ctas);
    frag.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(frag);
};

const initMenus = () => {
  const butcherTarget = document.querySelector('[data-menu="butcher"]');
  if (butcherTarget) {
    renderMenu(MENU_DATA.butcher, butcherTarget, { prefix: 'Butcher:', waLabel: 'WhatsApp Order' });
  }

  const steakTarget = document.querySelector('[data-menu="steakhouse"]');
  if (steakTarget) {
    renderMenu(MENU_DATA.steakhouse, steakTarget, { prefix: 'Steakhouse:', waLabel: 'Reserve via WhatsApp' });
  }
};

const heroStack = () => {
  const heroCards = document.querySelectorAll('.hero-card');
  heroCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
    card.classList.add('enter');
  });
};

const init = () => {
  hydrateLinks();
  initMenus();
  heroStack();
};

document.addEventListener('DOMContentLoaded', init);

export { formatWhatsAppLink };
