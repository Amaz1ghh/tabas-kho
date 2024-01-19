import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const hamburgerMenu = document.querySelector('.hamburger-menu')
const navButtons = document.querySelector('.navbar ul')

hamburgerMenu.addEventListener('click', (e) => {
  e.preventDefault();

  hamburgerMenu.classList.toggle('active');
  navButtons.classList.toggle('active');
});


// animation de la navbar au scroll
gsap.to('.navbar', {
  scrollTrigger: {
    trigger: ".navbar",
    start: "10px top",
    toggleActions: "restart pause reverse pause",
    scrub: true,
  },
  background: "rgba(var(--color-background), .8)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgb(var(--color-secondary))"
})