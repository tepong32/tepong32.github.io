(function () {
  const yearTarget = document.getElementById('year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll('#mainNav .nav-link');
  const navCollapse = document.getElementById('mainNav');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });
})();
