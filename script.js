/* =========================================================
   OUR FUTURE — interactions
   ========================================================= */

/* ---------- 1. SIGN-IN DROPDOWN ---------- */
const signinWrap = document.querySelector('.signin-wrap');
const signinToggle = document.getElementById('signinToggle');
const signinMenu = document.getElementById('signinMenu');

signinToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = signinWrap.classList.toggle('open');
  signinToggle.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!signinWrap.contains(e.target)) {
    signinWrap.classList.remove('open');
    signinToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- 2. OPEN LOGIN MODAL ---------- */
const modalOverlay  = document.getElementById('modalOverlay');
const modalClose    = document.getElementById('modalClose');
const modalTitle    = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const loginForms    = document.querySelectorAll('.login-form');

const roleTitles = {
  admin:   'Administrator Login',
  teacher: 'Teacher Login',
  parent:  'Parent Login'
};

function openLogin(role) {
  signinWrap.classList.remove('open');
  loginForms.forEach(f => f.classList.remove('active'));
  const form = document.getElementById('form-' + role);
  if (form) form.classList.add('active');

  modalTitle.textContent = roleTitles[role] || 'Sign In';
  modalSubtitle.textContent = 'Enter your details to continue';
  modalOverlay.classList.add('open');
}

signinMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => openLogin(btn.dataset.role));
});

/* ---------- 3. CLOSE MODAL ---------- */
function closeModal() { modalOverlay.classList.remove('open'); }

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeModal();
  }
});

/* ---------- 4. FORM SUBMISSIONS (placeholder) ---------- */
loginForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = form.id.replace('form-', '');
    alert(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} login submitted!\n\n(Real login logic comes next.)`);
  });
});

/* ---------- 5. FADE-IN PAGES ON SCROLL ---------- */
const pages = document.querySelectorAll('.page-content');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.25 });

pages.forEach(p => {
  p.style.animationPlayState = 'paused';
  observer.observe(p);
});

/* ---------- 6. AUTO YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();