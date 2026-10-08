// ============ ROLE SWITCHING ============
const roleButtons = document.querySelectorAll('.role-btn');
const loginForms = document.querySelectorAll('.login-form');

roleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const role = button.dataset.role;

    // Deactivate all buttons and forms
    roleButtons.forEach(b => b.classList.remove('active'));
    loginForms.forEach(f => f.classList.remove('active'));

    // Activate the clicked button and its matching form
    button.classList.add('active');
    document.getElementById(`form-${role}`).classList.add('active');
  });
});

// ============ FORM SUBMISSIONS (placeholder for now) ============
loginForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = form.id.replace('form-', '');
    alert(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} login submitted!\n\n(Real login logic comes in Stage 3.)`);
  });
});

// ============ AUTO YEAR IN FOOTER ============
document.getElementById('year').textContent = new Date().getFullYear();