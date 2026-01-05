import { openModal } from './modal.js';

const grid = document.getElementById('instagram-grid');
const status = document.getElementById('instagram-status');

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const setStatus = (message) => {
  if (status) {
    status.textContent = message;
  }
};

const renderSkeletons = () => {
  if (!grid) return;
  grid.innerHTML = '';
  Array.from({ length: 9 }).forEach(() => {
    const skel = document.createElement('div');
    skel.className = 'skeleton masonry-item';
    grid.appendChild(skel);
  });
};

const lazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');
  if (!('IntersectionObserver' in window)) {
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  images.forEach((img) => observer.observe(img));
};

const renderMedia = (media = []) => {
  if (!grid) return;
  grid.innerHTML = '';

  if (!media.length) {
    setStatus('Instagram is quiet right now. Follow @themeatemporiumbali for fresh moments.');
    const fallback = document.createElement('div');
    fallback.className = 'fallback';
    fallback.textContent = 'No Instagram media to show yet. We will surface the latest cuts as soon as posts are available.';
    grid.appendChild(fallback);
    return;
  }

  setStatus('Latest from Instagram');

  media.slice(0, 12).forEach((item) => {
    const article = document.createElement('article');
    article.className = 'masonry-item';

    const img = document.createElement('img');
    img.dataset.src = item.media_url;
    img.alt = item.caption || 'The Meat Emporium Bali';
    img.loading = 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'masonry-overlay';
    const text = document.createElement('div');
    text.innerHTML = `<strong>${item.caption ? item.caption.slice(0, 60) : 'The Meat Emporium Bali'}</strong><br><span class="light-text">${formatDate(item.timestamp)}</span>`;
    overlay.appendChild(text);

    article.appendChild(img);
    article.appendChild(overlay);
    article.addEventListener('click', () => {
      openModal({
        src: item.media_url,
        caption: item.caption,
        meta: formatDate(item.timestamp),
        link: item.permalink,
      }, article);
    });

    grid.appendChild(article);
  });

  lazyLoad();
};

const fetchInstagram = async () => {
  if (!grid) return;
  renderSkeletons();
  try {
    const response = await fetch('/.netlify/functions/instagram');
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error || 'Unable to load Instagram right now.');
    }
    renderMedia(data.media);
  } catch (error) {
    setStatus('Instagram unavailable right now.');
    const fallback = document.createElement('div');
    fallback.className = 'fallback';
    fallback.textContent = 'We could not reach Instagram. Please check back soon or tap through to our profile on Instagram.';
    grid.innerHTML = '';
    grid.appendChild(fallback);
  }
};

if (grid) {
  fetchInstagram();
}
