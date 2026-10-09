/* =========================================================
   OUR FUTURE — script.js (clean)
   ========================================================= */

/* ---------- 1. ADAPTIVE TOPBAR ---------- */
const topbar = document.querySelector('.topbar');

function updateTopbar() {
  if (!topbar) return;
  if (window.scrollY > 40) topbar.classList.add('scrolled');
  else topbar.classList.remove('scrolled');
}
window.addEventListener('scroll', updateTopbar, { passive: true });
updateTopbar();

/* ---------- 2. SIDEBAR ---------- */
const sidebar         = document.getElementById('sidebar');
const sidebarOpenBtn  = document.getElementById('sidebarOpen');
const sidebarCloseBtn = document.getElementById('sidebarClose');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.add('open');
}
function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('open');
}

if (sidebarOpenBtn)  sidebarOpenBtn.addEventListener('click', openSidebar);
if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

/* ---------- 3. LOGIN MODAL ---------- */
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
  if (modalTitle) modalTitle.textContent = roleTitles[role] || 'Sign In';
  if (modalSubtitle) modalSubtitle.textContent = 'Enter your details to continue';
  if (modalOverlay) modalOverlay.classList.add('open');
}

document.querySelectorAll('.sidebar-role').forEach(btn => {
  btn.addEventListener('click', () => openLogin(btn.dataset.role));
});

function closeModal() {
  if (modalOverlay) modalOverlay.classList.remove('open');
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* ---------- 4. FORM SUBMISSIONS (placeholder) ---------- */
loginForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = form.id.replace('form-', '');
    alert('Login submitted as: ' + role);
  });
});

/* ---------- 5. PAGE 1 LOGO INVERT ---------- */
function attachInvert(el) {
  if (!el) return;
  el.addEventListener('click', () => el.classList.toggle('inverted'));
  el.addEventListener('touchend', (e) => {
    e.preventDefault();
    el.classList.toggle('inverted');
  }, { passive: false });
}
attachInvert(document.getElementById('page1LogoDesktop'));
attachInvert(document.getElementById('page1LogoMobile'));

/* ---------- 6. ESC KEY ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSidebar();
    if (modalOverlay && modalOverlay.classList.contains('open')) closeModal();
  }
});

/* ---------- 7. AUTO YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();