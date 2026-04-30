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

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 300);
}, { passive: true });
function smoothScrollTo(target, duration) {
  return new Promise(resolve => {
    const start = window.scrollY;
    const t0 = performance.now();
    function step(now) {
      const p = Math.min((now - t0) / duration, 1);
      const e = p < 0.5 ? 2*p*p : -1 + (4 - 2*p)*p;
      window.scrollTo(0, start + (target - start) * e);
      if (p < 1) requestAnimationFrame(step); else resolve();
    }
    requestAnimationFrame(step);
  });
}
backToTop.addEventListener('click', async () => {
  await smoothScrollTo(0, 350);
  await smoothScrollTo(40, 150);
  await smoothScrollTo(0, 100);
  await smoothScrollTo(20, 100);
  await smoothScrollTo(0, 100);
  await smoothScrollTo(8, 80);
  await smoothScrollTo(0, 100);
});

// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

// Project filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === 'highlight';
      card.style.display = show ? '' : 'none';
    });
  });
});
// Hide school projects by default
document.querySelectorAll('.project-card[data-cat="school"]').forEach(c => c.style.display = 'none');

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
