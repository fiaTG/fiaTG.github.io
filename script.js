// Scroll-based fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Skill bar animation on scroll
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(fill => {
        const pct = fill.dataset.pct;
        if (pct) fill.style.width = pct;
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

// Hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Contact form — show success message, prevent default submit for demo
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  // Remove this block once Formspree ID is set — then let the form submit normally
  if (contactForm.action.includes('DEINE_FORM_ID')) {
    e.preventDefault();
    formSuccess.classList.add('visible');
    contactForm.reset();
  }
});
