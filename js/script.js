/* ==========================================================================
   R-Tech Developments Ltd — Interaction scripts
   1. Scroll-reveal (IntersectionObserver, respects prefers-reduced-motion via CSS)
   2. Signature before/after "squeegee" slider
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---- Before/after slider ----
  const range = document.getElementById('sliderRange');
  const after = document.getElementById('sliderAfter');
  const handle = document.getElementById('sliderHandle');

  function updateSlider(val) {
    after.style.clipPath = `inset(0 0 0 ${val}%)`;
    handle.style.left = val + '%';
  }

  if (range) {
    range.addEventListener('input', (e) => updateSlider(e.target.value));
    updateSlider(50);
  }

});
