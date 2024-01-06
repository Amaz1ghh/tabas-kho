// IMPORTS
import {LenisSmoothScroll} from "./smooth-scroll.js";
import { SlideUp } from "./slideUp";
new LenisSmoothScroll();
new SlideUp();

/********************************************
 * DEFINITION DES FONCTIONS
 */

const get_siblings = (elem) => {
  // create an empty array
  let siblings = [];
  // if no parent, return empty list
  if (!elem.parentNode) {
      return siblings;
  }

  // first child of the parent node
  let sibling = elem.parentNode.firstElementChild;
  // loop through next siblings until `null`
  do {
      // push sibling to array
      if (sibling != elem) {
          siblings.push(sibling);
      }
  } while (sibling = sibling.nextElementSibling);
  return siblings;
};

// CADRES DE PRESENTATION DES SAISON
// chaque cadre
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

// RESOPNSIVE
// var is_responsive = window.matchMedia("(max-width: 728px)")
