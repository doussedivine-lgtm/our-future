/* =========================================================
   OUR FUTURE — Stage 2
   ========================================================= */

/* ---------- FAKE SCHOOL DATABASE (for testing only) ---------- */
const SCHOOLS = {
  STMARY:    { name: "St. Mary's Basic School",      location: "Accra, Ghana",   password: "stmary123"  },
  ACCRA01:   { name: "Accra Model Primary School",    location: "Accra, Ghana",   password: "accra123"   },
  KUMASI02:  { name: "Kumasi Hope Academy",           location: "Kumasi, Ghana",  password: "kumasi123"  }
};

let currentSchoolId = null;

/* ---------- 1. ADAPTIVE TOPBAR ---------- */
const siteTopbar = document.querySelector('.topbar');
function updateSiteTopbar() {
  if (!siteTopbar) return;
  if (window.scrollY > 40) siteTopbar.classList.add('scrolled');
  else siteTopbar.classList.remove('scrolled');
}
window.addEventListener('scroll', updateSiteTopbar, { passive: true });
updateSiteTopbar();

/* ---------- 2. SCHOOL GATE ---------- */
const gateOverlay  = document.getElementById('gateOverlay');
const gateClose    = document.getElementById('gateClose');
const gateForm     = document.getElementById('gateForm');
const gateSchoolId = document.getElementById('gateSchoolId');
const gatePassword = document.getElementById('gatePassword');
const gateError    = document.getElementById('gateError');
const enterBtn     = document.getElementById('enterSchoolBtn');

function openGate() {
  if (gateOverlay) gateOverlay.classList.add('open');
  if (gateError) gateError.textContent = '';
  if (gateSchoolId) gateSchoolId.focus();
}
function closeGate() {
  if (gateOverlay) gateOverlay.classList.remove('open');
}

if (enterBtn) enterBtn.addEventListener('click', openGate);
if (gateClose) gateClose.addEventListener('click', closeGate);
if (gateOverlay) {
  gateOverlay.addEventListener('click', (e) => {
    if (e.target === gateOverlay) closeGate();
  });
}

if (gateForm) {
  gateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id  = gateSchoolId.value.trim().toUpperCase();
    const pwd = gatePassword.value;

    if (!SCHOOLS[id]) {
      gateError.textContent = 'School not found. Check the ID and try again.';
      return;
    }
    if (SCHOOLS[id].password !== pwd) {
      gateError.textContent = 'Incorrect password. Please try again.';
      return;
    }

    // Success
    currentSchoolId = id;
    gateError.textContent = '';
    gateForm.reset();
    closeGate();
    openPortal();
  });
}

/* ---------- 3. SCHOOL PORTAL ---------- */
const portalOverlay    = document.getElementById('portalOverlay');
const portalClose      = document.getElementById('portalClose');
const portalSchoolName = document.getElementById('portalSchoolName');
const portalSchoolLoc  = document.getElementById('portalSchoolLocation');
const portalStepRoles  = document.getElementById('portalStepRoles');
const portalStepForm   = document.getElementById('portalStepForm');
const backToRoles      = document.getElementById('backToRoles');
const roleFormTitle    = document.getElementById('roleFormTitle');
const changeSchool     = document.getElementById('changeSchool');
const loginForms       = document.querySelectorAll('.login-form');

const roleTitles = {
  admin:   'Administrator Login',
  teacher: 'Teacher Login',
  parent:  'Parent Login'
};

function openPortal() {
  if (!currentSchoolId) return;
  const school = SCHOOLS[currentSchoolId];
  portalSchoolName.textContent = school.name;
  portalSchoolLoc.textContent  = school.location;

  // Always start at the role chooser
  portalStepRoles.style.display = 'block';
  portalStepForm.style.display  = 'none';
  loginForms.forEach(f => f.classList.remove('active'));

  portalOverlay.classList.add('open');
}

function closePortal() {
  if (portalOverlay) portalOverlay.classList.remove('open');
}

if (portalClose) portalClose.addEventListener('click', closePortal);
if (portalOverlay) {
  portalOverlay.addEventListener('click', (e) => {
    if (e.target === portalOverlay) closePortal();
  });
}

/* ---------- 4. ROLE BUTTONS ---------- */
document.querySelectorAll('.role-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.dataset.role;

    // Hide roles, show form
    portalStepRoles.style.display = 'none';
    portalStepForm.style.display  = 'block';

    // Set title
    roleFormTitle.textContent = roleTitles[role] || 'Login';

    // Show the matching form
    loginForms.forEach(f => f.classList.remove('active'));
    const form = document.getElementById('form-' + role);
    if (form) form.classList.add('active');

    // Pre-fill admin School ID with the school they just entered
    if (role === 'admin' && currentSchoolId) {
      const adminSchoolIdInput = document.getElementById('adminSchoolId');
      if (adminSchoolIdInput) adminSchoolIdInput.value = currentSchoolId;
    }
  });
});

/* ---------- 5. BACK TO ROLES ---------- */
if (backToRoles) {
  backToRoles.addEventListener('click', () => {
    portalStepForm.style.display  = 'none';
    portalStepRoles.style.display = 'block';
  });
}

/* ---------- 6. CHANGE SCHOOL ---------- */
if (changeSchool) {
  changeSchool.addEventListener('click', () => {
    currentSchoolId = null;
    closePortal();
    openGate();
  });
}

/* ---------- 7. ROLE FORM SUBMISSIONS (placeholder) ---------- */
loginForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const role  = form.id.replace('form-', '');
    const school = currentSchoolId ? SCHOOLS[currentSchoolId].name : '';
    alert(
      '✅ Login submitted!\n\n' +
      'Role: ' + role + '\n' +
      'School: ' + school + '\n\n' +
      '(Real dashboard comes in Stage 3.)'
    );
  });
});

/* ---------- 8. PAGE 1 LOGO INVERT ---------- */
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

/* ---------- 9. ESC KEY ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (gateOverlay && gateOverlay.classList.contains('open'))   closeGate();
    if (portalOverlay && portalOverlay.classList.contains('open')) closePortal();
  }
});

/* ---------- 10. FADE-IN PAGES ON SCROLL ---------- */
const pages = document.querySelectorAll('.page-content');
if ('IntersectionObserver' in window) {
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
}

/* ---------- 11. AUTO YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();