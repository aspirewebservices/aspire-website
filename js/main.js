const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
    // Agar 300px se zyada scroll kiya toh dikhao
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Initialize Reviews Swiper
const reviewsSwiper = new Swiper('.reviews-slider', {
  slidesPerView: 1, // Mobile pe 1 card
  spaceBetween: 20,
  loop: true,
  autoHeight: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Ye part main hai 3 cards dikhane ke liye
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3, // Desktop pe 3 cards pakka dikhenge
      spaceBetween: 30,
    },
  },
});


// Function to open Lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageSrc;
    lightbox.style.display = 'flex';
}

// Function to close Lightbox
function closeLightbox() {
    document.getElementById('portfolio-lightbox').style.display = 'none';
}

// Esc key se close karne ke liye (Optional but Pro)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});
