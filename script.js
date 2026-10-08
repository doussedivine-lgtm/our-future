/* =========================================================
   OUR FUTURE — interactions
   ========================================================= */

/* ---------- 1. SIDEBAR (Sign In) ---------- */
const sidebar         = document.getElementById('sidebar');
const sidebarOpenBtn  = document.getElementById('sidebarOpen');
const sidebarCloseBtn = document.getElementById('sidebarClose');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

function openSidebar() {
  sidebar.classList.add('open');
  sidebarBackdrop.classList.add('open');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarBackdrop.classList.remove('open');
}

sidebarOpenBtn.addEventListener('click', openSidebar);
sidebarCloseBtn.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

/* ---------- 2. OPEN LOGIN MODAL FROM SIDEBAR ---------- */
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
  closeSidebar();
  loginForms.forEach(f => f.classList.remove('active'));
  const form = document.getElementById('form-' + role);
  if (form) form.classList.add('active');

  modalTitle.textContent = roleTitles[role] || 'Sign In';
  modalSubtitle.textContent = 'Enter your details to continue';
  modalOverlay.classList.add('open');
}

document.querySelectorAll('.sidebar-role').forEach(btn => {
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

/* ---------- 5. PAGE 1 LOGO CLICK — INVERT COLORS ---------- */
const page1Logo = document.getElementById('page1Logo');
if (page1Logo) {
  page1Logo.addEventListener('click', () => {
    page1Logo.classList.toggle('inverted');
  });
}

/* ---------- 6. FADE-IN PAGES ON SCROLL ---------- */
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

/* ---------- 7. AUTO YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();