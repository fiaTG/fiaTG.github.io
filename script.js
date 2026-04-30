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
backToTop.addEventListener('click', () => {
  const start = window.scrollY;
  const startTime = performance.now();
  const duration = 700;
  function easeOutBounce(t) {
    if (t < 1/2.75)      return 7.5625*t*t;
    else if (t < 2/2.75) { t -= 1.5/2.75;   return 7.5625*t*t + 0.75; }
    else if (t < 2.5/2.75){ t -= 2.25/2.75; return 7.5625*t*t + 0.9375; }
    else                  { t -= 2.625/2.75; return 7.5625*t*t + 0.984375; }
  }
  function step(now) {
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start * (1 - easeOutBounce(p)));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
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
