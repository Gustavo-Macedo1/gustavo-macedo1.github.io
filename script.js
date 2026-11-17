const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('modal-open', open);
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('modal-open');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px' });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...menu.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -68% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const gallery = document.querySelector('[data-gallery-modal]');
const galleryImage = gallery.querySelector('[data-gallery-image]');
const galleryTitle = gallery.querySelector('[data-gallery-title]');
const galleryCount = gallery.querySelector('[data-gallery-count]');
let galleryItems = [];
let galleryIndex = 0;

const renderGallery = () => {
  galleryImage.src = galleryItems[galleryIndex];
  galleryImage.alt = `${galleryTitle.textContent}, imagem ${galleryIndex + 1} de ${galleryItems.length}`;
  galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`;
};

document.querySelectorAll('[data-gallery]').forEach((button) => {
  button.addEventListener('click', () => {
    galleryItems = JSON.parse(button.dataset.gallery);
    galleryIndex = 0;
    galleryTitle.textContent = button.dataset.title;
    renderGallery();
    gallery.showModal();
    document.body.classList.add('modal-open');
  });
});

const moveGallery = (delta) => {
  galleryIndex = (galleryIndex + delta + galleryItems.length) % galleryItems.length;
  renderGallery();
};
gallery.querySelector('[data-gallery-prev]').addEventListener('click', () => moveGallery(-1));
gallery.querySelector('[data-gallery-next]').addEventListener('click', () => moveGallery(1));
gallery.querySelector('[data-gallery-close]').addEventListener('click', () => gallery.close());
gallery.addEventListener('click', (event) => {
  if (event.target === gallery) gallery.close();
});
gallery.addEventListener('close', () => document.body.classList.remove('modal-open'));
gallery.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') moveGallery(-1);
  if (event.key === 'ArrowRight') moveGallery(1);
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

// Reaplica âncoras após imagens e fontes estabilizarem o layout.
window.addEventListener('load', () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
});
