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
