import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger)

// SMOOTH SCROLL LENIS
function initLenis() {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

initLenis()

// CADRES DE PRESENTATION DES SAISON

// chaque cadre
const cadres = document.querySelectorAll('.cadre_presentation_saison')

cadres.forEach(cadre => {

  // get tous les boutons
  const allButtons = cadre.querySelectorAll('.trigger')
  const allTexts = cadre.querySelectorAll('.text')

  // fonction sur chaque bouton
  allButtons.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      // couleur plus foncée sur le bouton cliqué
      allButtons.forEach(btn => {
        btn.classList.remove('active')
      })
      btn.classList.add('active')

      // texte correspondant affiché
      allTexts.forEach(txt => {
        if (txt.getAttribute('data-text') == btn.getAttribute('data-button')) {
          txt.classList.add('active')
        }
        else {
          txt.classList.remove('active')
        }
      })
    })
  })
});


// ANIMATION DE REVEAL POUR LE TEXTE "TOUTES LES SAISONS"
// gsap.utils.toArray("main>h1").forEach(function (elem) {
//   ScrollTrigger.create({
//     trigger: elem,
//     start: "top 80%",
//     end: "bottom 20%",
//     markers: true,
//     onEnter: function () {
//       gsap.fromTo(
//         elem,
//         { y: 100, autoAlpha: 0 },
//         {
//           duration: 0.75,
//           y: 0,
//           autoAlpha: 1,
//           ease: "back",
//           overwrite: "auto"
//         }
//       );
//     },
//     onLeave: function () {
//       gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
//     },
//     onEnterBack: function () {
//       gsap.fromTo(
//         elem,
//         { y: -100, autoAlpha: 0 },
//         {
//           duration: 0.15,
//           y: 0,
//           autoAlpha: 1,
//           ease: "back",
//           overwrite: "auto"
//         }
//       );
//     },
//     onLeaveBack: function () {
//       gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
//     }
//   });
// });
