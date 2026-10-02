// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
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
