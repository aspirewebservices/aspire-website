// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const carousel = document.getElementById('portfolioCarousel');
  let scrollAmount = 0;
  let intervalId;

  function autoSlide() {
    if (scrollAmount <= carousel.scrollWidth - carousel.clientWidth) {
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      scrollAmount += 320; // Adjust this to match one card width + margin
    } else {
      scrollAmount = 0;
      carousel.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  function startAutoSlide() {
    intervalId = setInterval(autoSlide, 1000); // every 3 sec
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  // Start by default
  startAutoSlide();

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);