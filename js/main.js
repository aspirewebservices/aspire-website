document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Mobile Navigation & Scrollspy
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-menu .btn');
  const sections = document.querySelectorAll('section[id]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('active');
      }
    });
  }

  // Active link scrollspy
  window.addEventListener(
    'scroll',
    () => {
      const scrollPosition = window.scrollY + 140;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (link) {
          if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    },
    { passive: true }
  );

  /* ==========================================================================
     2. Scroll To Top Button
     ========================================================================== */
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  if (scrollToTopBtn) {
    let isTicking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!isTicking) {
          window.requestAnimationFrame(() => {
            if (window.scrollY > 300) {
              scrollToTopBtn.classList.add('visible');
            } else {
              scrollToTopBtn.classList.remove('visible');
            }
            isTicking = false;
          });
          isTicking = true;
        }
      },
      { passive: true }
    );

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ==========================================================================
     3. Swiper Testimonials Slider
     ========================================================================== */
  const sliderEl = document.querySelector('.reviews-slider');

  if (sliderEl && typeof Swiper !== 'undefined') {
    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoHeight: false,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  /* ==========================================================================
     4. Portfolio Lightbox
     ========================================================================== */
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  function openLightbox(src) {
    if (!lightbox || !lightboxImg || !src) return;
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  portfolioItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-image') || item.querySelector('img')?.src;
      openLightbox(src);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = item.getAttribute('data-image') || item.querySelector('img')?.src;
        openLightbox(src);
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('close-btn')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     5. Formspree Async AJAX Submission
     ========================================================================== */
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
          formStatus.classList.add('success');
          contactForm.reset();
        } else {
          const data = await response.json();
          if (data && Object.hasOwn(data, 'errors')) {
            formStatus.textContent = data.errors.map((error) => error.message).join(', ');
          } else {
            formStatus.textContent = 'Oops! There was a problem submitting your form.';
          }
          formStatus.classList.add('error');
        }
      } catch {
        formStatus.textContent = 'Network error. Please try again or reach out on WhatsApp.';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});
