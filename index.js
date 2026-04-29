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

const nav = document.querySelector(".nav");
const headerText = document.querySelector(".header__text");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;

  // Navbar scroll effect
  if (scrollPos > 50) {
    nav.classList.add("nav--scrolled");
  } else {
    nav.classList.remove("nav--scrolled");
  }

  // Parallax effect for header text
  if (headerText && scrollPos < window.innerHeight) {
    headerText.style.transform = `translateY(calc(-50% + ${scrollPos * 0.4}px))`;
    headerText.style.opacity = 1 - (scrollPos / 600);
  }

  // Back to top button
  if (scrollPos > 700) {
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