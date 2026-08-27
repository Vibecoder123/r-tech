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
    updateSlider(94);
  }

  // ---- Gallery lightbox ----
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose   = document.getElementById('lightboxClose');
  const lightboxPrev    = document.getElementById('lightboxPrev');
  const lightboxNext    = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let currentImages = [];
  let currentIndex  = 0;

  const openLightbox = (images, index) => {
    currentImages = images;
    currentIndex  = index;
    showImage();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  const showImage = () => {
    const current = currentImages[currentIndex];
    lightboxImg.src = current.src;
    lightboxCaption.textContent = current.caption || '';
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    lightboxPrev.style.display = currentImages.length <= 1 ? 'none' : '';
    lightboxNext.style.display = currentImages.length <= 1 ? 'none' : '';
  };

  const prevImage = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
  };
  const nextImage = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
  };

  document.querySelectorAll('.gallery-item').forEach(card => {
    const images = JSON.parse(card.dataset.gallery || '[]');
    if (!images.length) return;

    const badge = document.createElement('span');
    badge.className = 'gallery-item__badge';
    badge.textContent = `${images.length} photos`;
    card.appendChild(badge);

    card.addEventListener('click', () => openLightbox(images, 0));
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev)  lightboxPrev.addEventListener('click', prevImage);
  if (lightboxNext)  lightboxNext.addEventListener('click', nextImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // ---- Contact form (AJAX submit + inline success state) ----
  const contactForm = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      const formData = new FormData(contactForm);
      formData.append('_replyto', formData.get('email'));

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) throw new Error('Formspree submission failed');

        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        contactForm.reset();
      } catch (err) {
        alert("Sorry, something went wrong sending your enquiry. Please call us directly on 07766 864696, or try again in a moment.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Enquiry';
        }
      }
    });
  }

});
