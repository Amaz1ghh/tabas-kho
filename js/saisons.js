// IMPORTS
import {LenisSmoothScroll} from "./smooth-scroll.js";
import {SlideUp} from "./slideUp";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

/********************************************
 * DEFINITION DES FONCTIONS
 */
const get_siblings = (elem) => {
  let siblings = [];
  // cas où il n'y a pas de parent. Ne retourne rien...
  if (!elem.parentNode) {
      return siblings;
  }

  // Premier enfant
  let sibling = elem.parentNode.firstElementChild;
  // boucler jusqu'à l'enfant "NULL"
  do {
      // ajout de l'enfant à la liste
      if (sibling != elem) {
          siblings.push(sibling);
      }
  } while (sibling = sibling.nextElementSibling);
  return siblings;
};

/********************************************
 * DEFINITION DES EVENEMENTS && ANIMATIONS
 ********************************************/

// CADRES DE PRESENTATION DES SAISONS
const cadres = document.querySelectorAll('.cadre_presentation_saison')

// affichage des textes après avoir cliqué sur les boutons
cadres.forEach(cadre => {

  // Identifier les éléments nécessaires
  const allButtons = cadre.querySelectorAll('.trigger')
  const allTexts = cadre.querySelectorAll('.text')
  var is_responsive;

  // fonction sur chaque bouton
  allButtons.forEach(btn => {
    
    btn.addEventListener('click', (e) => {
      e.preventDefault()

      // condition de responsive
      is_responsive = window.matchMedia("(max-width: 728px)")
      // div de droite dans le cadre de présentation
      const divRight = btn.parentElement.parentElement.parentElement;
      // obtenir les siblings
      const allSiblings = get_siblings(divRight);

      // couleur plus foncée sur le bouton cliqué
      allButtons.forEach(btn_sibling => {
        if (btn_sibling != btn) {
          btn_sibling.classList.remove('active');
        }
      })
      if (!btn.classList.contains('active')) {
        btn.classList.add('active');
      }
      else if (is_responsive.matches) {
        btn.classList.remove('active');
      }
      
      // texte correspondant affiché
      allTexts.forEach(txt => {
        if (txt.getAttribute('data-text') == btn.getAttribute('data-button')) {
          txt.classList.add('active')
        }
        else {
          txt.classList.remove('active')
        }
      })

      // Effacer les éléments frères pour le repsonsive
      Array.prototype.forEach.call(allSiblings, sib => {
        if (btn.classList.contains('active')) {
          sib.classList.add('hidden');
        }
        else {
          sib.classList.remove('hidden');
        }
      });

      // GESTION DU RESPONSIVE AVEC DES CLASSES (C'est super pratique ce truc quand-même)

      // enlever par défaut l'affichage des likes
      const div_avis_responsive = divRight.querySelector('.text-zone').querySelector('div');
      div_avis_responsive.classList.remove('show');

      // gestion du reste
      if (btn.classList.contains('active')) {
        divRight.classList.add('on-display');
        cadre.classList.add('on-display');

        // Boutons spécifique aux avis, cliqué
        if (btn.getAttribute('data-button') == 'avis') {
          // activer 'show' sur la div des likes
          div_avis_responsive.classList.add('show');
        }
      }
      else {
        divRight.classList.remove('on-display');
        cadre.classList.remove('on-display');
      }
    })
  })
});

// ANIMATION d'entrée des cadres + stylysation (alternance des sombre clair à chaque cadre)
var cadreElements = document.querySelectorAll(".cadre_presentation_saison");

cadreElements.forEach((cadre, idx_cadre) => {

  // alternance sombre/clair des cadres
  if (idx_cadre%2) {
    cadre.classList.add('even');
  }

  gsap.from(cadre, {
    scrollTrigger: {
      start: "top bottom",
      trigger: cadre,
      toggleActions: "restart none none none",
    },
    x: 200,
    duration: .8,
    ease: "power1.out",
    opacity: 0,
  })
});

// VIDEO DE BACKGROUND DANS LE HEADER
const video_bg = document.querySelector("header video.background");
video_bg.playbackRate = 1;

  // animation de la vidéo
const video_tl = gsap.timeline({
  scrollTrigger: {
    trigger: video_bg,
    start: "top top",
    end: "center top",
    scrub: true,
  },
})

video_tl.to(video_bg, {
  opacity: 0,
})

new LenisSmoothScroll();
new SlideUp();