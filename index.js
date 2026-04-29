/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

function nextSlide(btn) {
  const box = btn.closest(".work__image-box");
  const slides = box.querySelectorAll(".work__image");

  let activeIndex = [...slides].findIndex(img =>
    img.classList.contains("active")
  );

  slides[activeIndex].classList.remove("active");
  activeIndex = (activeIndex + 1) % slides.length;
  slides[activeIndex].classList.add("active");
}

function prevSlide(btn) {
  const box = btn.closest(".work__image-box");
  const slides = box.querySelectorAll(".work__image");

  let activeIndex = [...slides].findIndex(img =>
    img.classList.contains("active")
  );

  slides[activeIndex].classList.remove("active");
  activeIndex = (activeIndex - 1 + slides.length) % slides.length;
  slides[activeIndex].classList.add("active");
}

// Parallax Effect
document.addEventListener("scroll", function () {
  const parallaxElements = document.querySelectorAll(".parallax");
  
  parallaxElements.forEach(function(el) {
    let speed = el.getAttribute("data-speed");
    if (!speed) return;
    
    // Get element's position relative to viewport
    const rect = el.getBoundingClientRect();
    
    // Only apply effect if element is somewhat visible in viewport
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Calculate how far the element is from the vertical center of the screen
      const elementCenter = rect.top + (rect.height / 2);
      const viewportCenter = window.innerHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      // Calculate Y translation based on speed and distance
      const yPos = distance * parseFloat(speed);
      
      el.style.transform = `translateY(${yPos}px)`;
    }
  });
});