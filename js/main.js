// Mobile menu toggle
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('menu-open', open);
  });
}

// Solid header once the page is scrolled
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// Footer year
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Gallery lightbox: click a photo to view it full size, use arrows/Escape to navigate
const galleryButtons = [...document.querySelectorAll('.gallery-item')];
if (galleryButtons.length) {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Photo viewer');
  box.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">×</button>
    <button type="button" class="lightbox-nav prev" aria-label="Previous photo">‹</button>
    <img alt="">
    <button type="button" class="lightbox-nav next" aria-label="Next photo">›</button>`;
  document.body.appendChild(box);

  const img = box.querySelector('img');
  let current = 0;

  const show = (i) => {
    current = (i + galleryButtons.length) % galleryButtons.length;
    const thumb = galleryButtons[current].querySelector('img');
    img.src = thumb.src;
    img.alt = thumb.alt;
    box.hidden = false;
  };
  const close = () => {
    box.hidden = true;
    galleryButtons[current].focus();
  };

  galleryButtons.forEach((btn, i) => btn.addEventListener('click', () => show(i)));
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  box.querySelector('.next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });
}

// Contact form: opens the visitor's email app with the message filled in
const form = document.querySelector('.contact-form');
if (form) {
  const error = form.querySelector('.form-error');
  const success = form.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.hidden = true;
    if (!form.checkValidity()) {
      error.hidden = false;
      return;
    }
    error.hidden = true;

    const data = new FormData(form);
    const name = data.get('name').trim();
    const subject = data.get('subject').trim() || `Website enquiry from ${name}`;
    const body = `${data.get('message').trim()}\n\nFrom: ${name}\nEmail: ${data.get('email').trim()}`;
    const to = form.dataset.to;

    window.location.href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    success.hidden = false;
  });
}
