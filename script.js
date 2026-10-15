/* =========================================================
   OUR FUTURE — Stage 2 (v2)
   ========================================================= */

/* ---------- FAKE SCHOOL DATABASE ---------- */
const SCHOOLS = {
  STMARY:    { name: "St. Mary's Basic School",   location: "Accra, Ghana",  password: "stmary123"  },
  ACCRA01:   { name: "Accra Model Primary School", location: "Accra, Ghana",  password: "accra123"   },
  KUMASI02:  { name: "Kumasi Hope Academy",        location: "Kumasi, Ghana", password: "kumasi123"  }
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

/* ---------- 2. PASSWORD EYE TOGGLES ---------- */
document.querySelectorAll('.eye-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    let input;
    if (targetId) {
      input = document.getElementById(targetId);
    } else {
      // fallback: find the input inside the same wrapper
      input = btn.parentElement.querySelector('input');
    }
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      btn.classList.add('showing');
      btn.setAttribute('aria-label', 'Hide password');
    } else {
      input.type = 'password';
      btn.classList.remove('showing');
      btn.setAttribute('aria-label', 'Show password');
    }
  });
});

/* ---------- 3. SCHOOL GATE ---------- */
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
    openSchoolWelcome();
  });
}

/* ---------- 4. SCHOOL WELCOME PAGE ---------- */
const schoolWelcome       = document.getElementById('schoolWelcome');
const portalClose         = document.getElementById('portalClose');
const portalSchoolName    = document.getElementById('portalSchoolName');
const portalSchoolLoc     = document.getElementById('portalSchoolLocation');
const portalSchoolNameForm = document.getElementById('portalSchoolNameForm');
const portalStepRoles     = document.getElementById('portalStepRoles');
const portalStepForm      = document.getElementById('portalStepForm');
const backToRoles         = document.getElementById('backToRoles');
const roleFormTitle       = document.getElementById('roleFormTitle');
const changeSchool        = document.getElementById('changeSchool');
const loginForms          = document.querySelectorAll('.login-form');

const roleTitles = {
  admin:   'Administrator Login',
  teacher: 'Teacher Login',
  parent:  'Parent Login'
};

function openSchoolWelcome() {
  if (!currentSchoolId) return;
  const school = SCHOOLS[currentSchoolId];

  portalSchoolName.textContent     = school.name;
  portalSchoolLoc.textContent      = school.location;
  portalSchoolNameForm.textContent = school.name;

  // Reset view: show roles, hide form
  portalStepRoles.style.display = 'block';
  portalStepForm.style.display  = 'none';
  loginForms.forEach(f => f.classList.remove('active'));

  schoolWelcome.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSchoolWelcome() {
  schoolWelcome.classList.remove('open');
  document.body.style.overflow = '';
}

if (portalClose) portalClose.addEventListener('click', closeSchoolWelcome);

/* ---------- 5. ROLE BUTTONS ---------- */
document.querySelectorAll('.role-button').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.dataset.role;

    portalStepRoles.style.display = 'none';
    portalStepForm.style.display  = 'block';

    roleFormTitle.textContent = roleTitles[role] || 'Login';

    loginForms.forEach(f => f.classList.remove('active'));
    const form = document.getElementById('form-' + role);
    if (form) form.classList.add('active');

    if (role === 'admin' && currentSchoolId) {
      const adminIdInput = document.getElementById('adminSchoolId');
      if (adminIdInput) adminIdInput.value = currentSchoolId;
    }
  });
});

/* ---------- 6. BACK TO ROLES ---------- */
if (backToRoles) {
  backToRoles.addEventListener('click', () => {
    portalStepForm.style.display  = 'none';
    portalStepRoles.style.display = 'block';
  });
}

/* ---------- 7. CHANGE SCHOOL ---------- */
if (changeSchool) {
  changeSchool.addEventListener('click', () => {
    currentSchoolId = null;
    closeSchoolWelcome();
    openGate();
  });
}

/* ---------- 8. ROLE FORM SUBMISSIONS (placeholder) ---------- */
loginForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const role   = form.id.replace('form-', '');
    const school = currentSchoolId ? SCHOOLS[currentSchoolId].name : '';
    alert(
      '✅ Login submitted!\n\n' +
      'Role: ' + role + '\n' +
      'School: ' + school + '\n\n' +
      '(Real dashboard comes in Stage 3.)'
    );
  });
});

/* ---------- 9. PAGE 1 LOGO INVERT ---------- */
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

/* ---------- 10. ESC KEY ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (gateOverlay && gateOverlay.classList.contains('open'))     closeGate();
    if (schoolWelcome && schoolWelcome.classList.contains('open')) closeSchoolWelcome();
  }
});

/* ---------- 11. FADE-IN PAGES ON SCROLL ---------- */
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

/* ---------- 12. AUTO YEAR ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();