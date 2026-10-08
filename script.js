/* =========================================================
   OUR FUTURE — Dashboard interactions
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

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!signinWrap.contains(e.target)) {
    signinWrap.classList.remove('open');
    signinToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ---------- 2. OPEN LOGIN MODAL ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose   = document.getElementById('modalClose');
const modalTitle   = document.getElementById('modalTitle');
const modalSubtitle= document.getElementById('modalSubtitle');
const loginForms   = document.querySelectorAll('.login-form');

const roleTitles = {
  admin:   'Administrator Login',
  teacher: 'Teacher Login',
  parent:  'Parent Login'
};

function openLogin(role) {
  // Close dropdown
  signinWrap.classList.remove('open');

  // Hide all forms, show the chosen one
  loginForms.forEach(f => f.classList.remove('active'));
  const form = document.getElementById('form-' + role);
  if (form) form.classList.add('active');

  // Update modal header text
  modalTitle.textContent = roleTitles[role] || 'Sign In';
  modalSubtitle.textContent = 'Enter your details to continue';

  // Show modal
  modalOverlay.classList.add('open');
}

signinMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => openLogin(btn.dataset.role));
});

/* ---------- 3. CLOSE MODAL ---------- */
function closeModal() {
  modalOverlay.classList.remove('open');
}

modalClose.addEventListener('click', closeModal);

// Close when clicking outside the modal card
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close with Escape key
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

/* ---------- 5. HERO SLIDESHOW ---------- */
const slides = document.querySelectorAll('.hero-slide');
const dots   = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function startSlideshow() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 6000); // changes every 6 seconds
}

// Dot clicks
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.goto, 10));
    startSlideshow(); // reset timer after manual selection
  });
});

// Start on load
startSlideshow();

/* ---------- 6. AUTO YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();